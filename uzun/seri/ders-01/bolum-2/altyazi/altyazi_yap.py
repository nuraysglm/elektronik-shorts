#!/usr/bin/env python3
"""Ders 1 - Bolum 2 (is emri N sonrasi intro'lu son video) TR + EN altyazi (UZUN.md "Altyazi"; Bolum 1 altyazi_yap.py uyarlamasi).
Zaman esleme: zamanlama-N.json cumle/kelime baslari + parca baslangiclari (parca mp4 sureleri, 21.11 render)
  + parcalar.json 'ara' (p1: 37,5'te 11,4 sn intro karti + selam; p2: 158,45'te 0,85 sn; p6: 73,03'te 1,0 sn)
  -> birlesik zaman D; intro'lu videoda D < 37,5 ise D, degilse D + 9,3 (onayli Blender intro, tahta/introlu.py).
Selam: ses/selam.mp3, intro'lu videoda 47,1 sn'de (37,5 + 0,3 + 9,3).
Kullanim: python3 altyazi_yap.py DEPO CIKTI_TR.srt CIKTI_EN.srt"""
import json, sys, re, importlib.util, os
DEPO, OTR, OEN = sys.argv[1:4]
B = f'{DEPO}/uzun/seri/ders-01/bolum-2'
spec = importlib.util.spec_from_file_location('m', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'metinler.py'))
M = importlib.util.module_from_spec(spec); spec.loader.exec_module(M); T = M.T
DUR = [60.8, 216.633333, 112.2, 132.5, 139.3, 135.733333, 140.266667]   # wip/uzun-d01-b2 parca mp4 (is emri N)
PB = {1: 0}
for i, d in enumerate(DUR, 2): PB[i] = PB[i - 1] + d
KAYMA = {p: 0.0 for p in range(1, 9)}
CFG = json.load(open(f'{B}/tahta/parcalar.json'))
T0, SHIFT, SELAM_T = 37.5, 9.3, 47.1
SELAM = [(0.05, 3.75, 's.01'), (4.05, 10.58, 's.2')]   # selam.wav icinde (silencedetect -40 dB)
T['s.01'] = (T['s.0'][0] + ' ' + T['s.1'][0], T['s.0'][1] + ' ' + T['s.1'][1])

def vid(p, t):
    t += sum(s for a, s in CFG[str(p)].get('ara', []) if t >= a)
    d = PB[p] + t
    return (d if d < T0 else d + SHIFT) + KAYMA[p]

cum = []   # (bas, son, anahtar, sozlu, kelimeler[(t, kelime)])
for p in range(1, 9):
    for k, c in enumerate(json.load(open(f'{B}/tahta/zamanlama-{p}.json'))['cumleler']):
        cum.append((vid(p, c['start']), vid(p, c['end']), f'{p}.{k}', c['text'], [(vid(p, w['t0']), w['w']) for w in c['words']]))
for a, b, key in SELAM:
    cum.append((SELAM_T + a, SELAM_T + b, key, None, None))
cum.sort()
assert len(cum) == len(T) - 2 + 0, (len(cum), len(T))

MAXL, MAXC, MAXD, MIND = 42, 2, 6.0, 1.0
def wrap(s):
    w = s.split(' '); lines = ['']
    for x in w:
        if len(lines[-1]) + len(x) + (1 if lines[-1] else 0) <= MAXL: lines[-1] = (lines[-1] + ' ' + x).strip()
        else: lines.append(x)
    return lines if all(len(l) <= MAXL for l in lines) else None
def fits(s):
    l = wrap(s); return l is not None and len(l) <= MAXC
NB = '\u00a0'
UNIT = re.compile(r"^(mC|µC|µJ|µA|mV/A|mV|mA|ms|kΩ|Ω|V|s|A|C|J|W|saniye\w*|seconds?|milisaniye\w*|days?|hours?|gün\w*|saat\w*|(mC|µC|µJ|µA|mV|mA|kΩ|Ω|ms|V|C|A)'\w+)[,.;:?]?$")
OPS = {'×', '/', '=', '−', '+'}
KOTU_SON = {'the', 'a', 'an', 'at', 'to', 'of', 'and', 'from', 'in', 'on', 'by', 'is', 'for', 'with', 'that', 'as',
            'between', 'than', 've', 'bir', 'ile', 'nasıl', 'its', 'their', 'his', 'her'}
def yapistir(w, times):
    """sayi+birim ve islem isaretlerini bolunmez yap (NBSP)"""
    W, Tm = [], []
    for x, t in zip(w, times):
        son = W[-1].split(NB)[-1].lower() if W else ''
        if W and (son in BAGLA or (x == 'ile' and re.search(r'\d$', son))):
            W[-1] += NB + x
        elif W and ((UNIT.match(x) and re.search(r'[\d²]\)?$', W[-1])) or x in OPS or W[-1].split(NB)[-1] in OPS):
            W[-1] += NB + x
        else: W.append(x); Tm.append(t)
    return W, Tm
BAGLA = {'the', 'a', 'an', 'at', 'to', 'of', 'from', 'in', 'on', 'by', 'for', 'with', 'per', 'as', 'between', 'than',
         "we'd", 'have', 'share', 'en', 'ile', 'anlık', 'işlemsel'}   # bir sonraki kelimeden ayrilmaz
def kotu(a): return a.split(NB)[-1].split(' ')[-1].lower() in KOTU_SON
def balanced(s):
    l = wrap(s)
    if len(l) == 1: return [x.replace(NB, ' ') for x in l]
    w = s.split(' '); best = None
    for i in range(1, len(w)):
        a, b = ' '.join(w[:i]), ' '.join(w[i:])
        if len(a) <= MAXL and len(b) <= MAXL:
            sc = abs(len(a) - len(b)) - (12 if re.search(r'[,:;.?]$', a) else 0) + (25 if kotu(a) else 0) + (25 if re.match(r'(de|da|ise|mi|mı)\b', b) else 0) + (30 if re.search(r'\d,$', a) and re.match(r'−?\d', b) else 0)
            if best is None or sc < best[0]: best = (sc, [a, b])
    return [x.replace(NB, ' ') for x in best[1]]

def split(words, t0, t1, times):
    """words: kelime listesi, times: her kelimenin baslangici; -> [(metin, bas, son)]"""
    s = ' '.join(words)
    if fits(s) and t1 - t0 <= MAXD: return [(s, t0, t1)]
    n = len(words); best = None
    for i in range(1, n):
        a = ' '.join(words[:i]); b = ' '.join(words[i:])
        frac = len(a) / len(s)
        sc = abs(frac - 0.5) * 2 - (0.9 if re.search(r'[,:;.?]$', words[i - 1]) else 0) + (0.8 if kotu(words[i - 1]) else 0)
        if not fits(a): sc += 1.5
        if min(times[i] - t0, t1 - times[i]) < 1.2: sc += 1.5
        if best is None or sc < best[0]: best = (sc, i)
    i = best[1]
    return split(words[:i], t0, times[i], times[:i]) + split(words[i:], times[i], t1, times[i:])

def kartlar(lang):
    out = []
    for j, (b, e, key, sozlu, kel) in enumerate(cum):
        tr, en = T[key]
        txt = en if lang == 'en' else (tr if tr is not None else sozlu)
        w = txt.split()
        if lang == 'tr' and tr is None and kel:
            times = [t for t, _ in kel]; assert [x for _, x in kel] == w, key
        else:
            L = len(txt); pos = 0; times = []
            for x in w:
                times.append(b + (e - b) * pos / L); pos += len(x) + 1
        w, times = yapistir(w, times)
        for s, a, z in split(w, b, e, times):
            out.append([a, z, s, key])
    # son zamanlar: konusma sonundan 0,4 sn sarkma, sonraki kartin 0,08 sn oncesine kadar; en az 1 sn
    for i, c in enumerate(out):
        nxt = out[i + 1][0] if i + 1 < len(out) else c[1] + 3
        lim = nxt - 0.08
        if c[0] < T0: lim = min(lim, T0 - 0.01)          # kanca altyazisi intro'ya tasmaz
        c[1] = min(max(c[1] + 0.4, c[0] + MIND), lim, c[0] + MAXD)
    # 1 sn'den kisa kalanlari bir sonrakiyle birlestir (sigarsa)
    i = 0
    while i < len(out):
        c = out[i]
        if c[1] - c[0] < MIND - 1e-6 and i + 1 < len(out):
            n = out[i + 1]; s = c[2] + ' ' + n[2]
            tam = lambda j: (j == 0 or out[j - 1][3] != out[j][3]) and (j + 1 >= len(out) or out[j + 1][3] != out[j][3])
            ok_n = n[3] == c[3] or (tam(i + 1) and tam(i))
            if fits(s) and n[1] - c[0] <= MAXD and ok_n:
                out[i] = [c[0], n[1], s, c[3] + '+' + n[3]]; del out[i + 1]; continue
            if i > 0:
                p = out[i - 1]; s = p[2] + ' ' + c[2]
                if fits(s) and c[1] - p[0] <= MAXD and (p[3] == c[3] or (tam(i - 1) and tam(i))):
                    out[i - 1] = [p[0], c[1], s, p[3] + '+' + c[3]]; del out[i]; continue
        if c[1] - c[0] < MIND - 1e-6:
            # birlesmiyorsa: once bir sonraki kartin basini en fazla 0,25 sn ertele, sonra bu kartin basini
            # onceki kartin sarkmasindan al (komsular >= 1 sn kalir)
            eks = MIND - (c[1] - c[0])
            if i + 1 < len(out):
                n = out[i + 1]; d = min(eks, 0.25, n[1] - n[0] - MIND)
                if d > 0: n[0] += d; c[1] += d; eks -= d
            if eks > 1e-6 and i > 0:
                p = out[i - 1]; d = min(eks + 0.001, p[1] - p[0] - MIND, 0.4)
                if d > 0: p[1] -= d; c[0] -= d; eks -= d
            assert eks <= 1e-3, (lang, c)
        i += 1
    return out

def ts(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
for lang, fn in (('tr', OTR), ('en', OEN)):
    k = kartlar(lang)
    with open(fn, 'w', encoding='utf-8', newline='\n') as f:
        for n, (a, z, s, key) in enumerate(k, 1):
            f.write(f'{n}\n{ts(a)} --> {ts(z)}\n' + '\n'.join(balanced(s)) + '\n\n')
    print(lang, len(k), 'kart', fn)
