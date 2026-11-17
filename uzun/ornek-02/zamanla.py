"""Seslendirme metnindeki cumleleri ses.mp3'teki duraklamalara esler -> zamanlama.json
Yontem: 10 ms'lik RMS enerji; esik alti >=0.10 sn bolgeler duraklama adayi.
Dinamik programlama: her cumle sonu bir duraklamaya atanir; maliyet = (olculen sesli sure - hece sayisi x ortalama hece suresi)^2
- duraklama uzunlugu odulu (paragraf sonlarinda daha buyuk). Konusma tanima yok; ses dinlenmedi."""
import re, json, sys, subprocess, numpy as np
raw = sys.argv[1]
x = np.fromfile(raw, dtype=np.int16).astype(np.float64) / 32768
sr = 16000; hop = 160
n = len(x) // hop
rms = np.sqrt((x[:n*hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
db = 20 * np.log10(rms)
T = n * hop / sr
thr = -38.0
sil = db < thr
# duraklamalar
pa = []; i = 0
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        if (j - i) * 0.01 >= 0.10: pa.append((i * 0.01, j * 0.01))
        i = j
    else: i += 1
voiced_cum = np.concatenate([[0], np.cumsum(~sil) * 0.01])
def voiced(a, b): return voiced_cum[int(round(b * 100))] - voiced_cum[int(round(a * 100))]

m = open('metin.md', encoding='utf8').read()
body = re.search(r'```\n(.*?)```', m, re.S).group(1)
paras = [p.strip() for p in body.split('\n\n') if p.strip()]
sents = []
for pi, p in enumerate(paras):
    shorts = '[SHORTS' in p
    p = re.sub(r'\[SHORTS [^\]]*\]', '', p).strip()
    ss = re.findall(r'[^.?!]+[.?!]', p)
    for k, s in enumerate(ss):
        sents.append(dict(p=pi + 1, text=s.strip(), last=(k == len(ss) - 1), shorts=shorts))
def syl(s):
    s = re.sub(r'\bV\b', 've', s)
    return len(re.findall(r'[aeıioöuüAEIİOÖUÜ]', s))
for s in sents: s['syl'] = syl(s['text'])
N = len(sents)
# aday sinirlar: duraklama ortalari; ilk baslangic ve son bitis
first = 0.0 if not sil[0] else next(k for k in range(n) if not sil[k]) * 0.01
last = (n - next(k for k in range(n) if not sil[n - 1 - k])) * 0.01
tot_syl = sum(s['syl'] for s in sents)
rate = voiced(first, last) / tot_syl
cands = pa + [(last, T)]
M = len(cands)
INF = 1e18
cost = np.full((N + 1, M + 1), INF); back = np.zeros((N + 1, M + 1), int)
# durum: i cumle bitti, son sinir aday j-1 (j=0: baslangic)
cost[0][0] = 0
def start_of(j): return first if j == 0 else cands[j - 1][1]
for i in range(1, N + 1):
    s = sents[i - 1]
    for j in range(i, M + 1):
        e0, e1 = cands[j - 1]
        plen = min(e1 - e0, 0.8)
        bonus = (3.0 if s['last'] else 1.5) * plen
        best = INF; bk = -1
        for k in range(i - 1, j):
            if cost[i - 1][k] >= INF: continue
            a = start_of(k)
            if e0 <= a: continue
            d = voiced(a, e0); ex = s['syl'] * rate
            c = cost[i - 1][k] + (d - ex) ** 2 / (0.15 + 0.1 * ex) - bonus
            if c < best: best = c; bk = k
        cost[i][j] = best; back[i][j] = bk
j = M; assert cost[N][M] < INF
bounds = []
for i in range(N, 0, -1):
    bounds.append(j); j = back[i][j]
bounds = bounds[::-1]
BELIRSIZ = [5, 19, 27, 28]
# Elle duzeltme: DP'nin 0,10-0,12 sn'lik cok kisa duraklamaya koydugu iki sinir, hemen yanindaki
# belirgin duraklamaya (>=0,23 sn) tasindi (formul cumleleri yavas okunuyor). Belirsizlik: +-0,5 sn.
# ornek-02: cumle 5 sonu (20,30-20,55 duraklamasi; DP 'Ust' hecesinden sonraki kisa kapanmaya koymustu)
# ve cumle 27 sonu (124,80-125,24 duraklamasi; 'Tutuyor' 125,24-125,60 ses obegi) enerji zarfina bakilarak elle.
ELLE = {5: 20.45, 27: 125.0}   # cumle no -> sinirin icinde olmasi gereken an (sn)
for k, tt in ELLE.items():
    jj = next(j for j in range(1, M + 1) if cands[j - 1][0] - 0.05 <= tt <= cands[j - 1][1] + 0.05)
    print("elle: cumle", k, "sinir", cands[bounds[k] - 1], "->", cands[jj - 1]); bounds[k] = jj
def t_at_voiced(a, b, frac):
    ia, ib = int(round(a * 100)), int(round(b * 100))
    target = voiced_cum[ia] + frac * (voiced_cum[ib] - voiced_cum[ia])
    return float(np.searchsorted(voiced_cum, target, side='left')) / 100
prev = 0
out = []
for s, j in zip(sents, bounds):
    a = start_of(prev); e0, e1 = cands[j - 1]
    inner = [(round(c[0], 2), round(c[1], 2)) for c in cands[prev:j - 1]]
    d = voiced(a, e0)
    ws = s['text'].split(); sy = [max(syl(w), 0.3) for w in ws]; tot = sum(sy); acc = 0; words = []
    for w, n_ in zip(ws, sy):
        t0 = t_at_voiced(a, e0, acc / tot); acc += n_; t1 = t_at_voiced(a, e0, acc / tot)
        words.append(dict(w=w, t0=round(max(a, t0), 2), t1=round(min(e0, t1), 2)))
    s.update(no=len(out), start=round(a, 2), end=round(e0, 2), pause_after=round(e1 - e0, 2), voiced=round(d, 2),
             syl_per_s=round(s['syl'] / d, 2), inner_pauses=inner, words=words)
    out.append(s); prev = j
# ---- tutarlilik kontrolleri (enerji)
def mdb(a, b): return float(db[max(0, int(a * 100)):max(1, int(b * 100))].mean())
kont = []
bad = 0
for s in out:
    p = mdb(s['end'] + 0.02, s['end'] + max(0.06, s['pause_after'] - 0.02)); b = mdb(s['end'] - 0.30, s['end'] - 0.03)
    nxt = mdb(s['end'] + s['pause_after'] + 0.03, s['end'] + s['pause_after'] + 0.30) if s['no'] < len(out) - 1 else None
    s['sinir_db'] = dict(once=round(b, 1), duraklama=round(p, 1), sonra=None if nxt is None else round(nxt, 1))
    if not (p < thr and b > p + 8 and (nxt is None or nxt > p + 8)): bad += 1; print("ZAYIF SINIR", s['no'], s['sinir_db'])
kont.append(str(len(out))+" cumle sinirinin %d tanesinde: duraklama enerjisi < %.0f dBFS ve onceki/sonraki 0,3 sn en az 8 dB daha yuksek" % (len(out) - bad, thr))
for s in out:
    for w in s['words'][:-1]:
        if w['w'][-1] in ',:;':
            near = min(s['inner_pauses'], key=lambda c: abs((c[0] + c[1]) / 2 - w['t1'])) if s['inner_pauses'] else None
            kont.append("noktalama cumle %d '%s' tahmin %.2f sn; en yakin ic duraklama %s; fark %s" % (s['no'], w['w'], w['t1'], near, 'yok' if near is None else "%.2f sn" % abs((near[0] + near[1]) / 2 - w['t1'])))
rates = [s['syl_per_s'] for s in out]
kont.append("hece hizi (sesli sure uzerinden): ortalama %.2f, std %.2f, en dusuk %.2f (cumle %d), en yuksek %.2f (cumle %d)" % (np.mean(rates), np.std(rates), min(rates), int(np.argmin(rates)), max(rates), int(np.argmax(rates))))
print("\n".join(kont))
json.dump(dict(yontem="RMS enerji (10 ms, esik %.0f dBFS, en az 0,10 sn) duraklamalari + hece sayisina gore dinamik programlama; cumle 5 ve 27 sinirlari enerji zarfina bakilarak elle komsu duraklamaya tasindi; kelime zamanlari cumle icinde hece sayisiyla orantili tahmindir; konusma tanima yok, ses dinlenmedi" % thr,
               ses_suresi=round(T, 2), ortalama_hece_suresi=round(rate, 4), belirsiz_sinirlar=BELIRSIZ, kontroller=kont, cumleler=out), open('zamanlama.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
