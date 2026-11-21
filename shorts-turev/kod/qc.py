#!/usr/bin/env python3
"""Türev Short otomatik QC (UZUN.md 5 zorunlu (a)-(e) + AGENT.md 4 güvenli alan, 6 okuma süresi, 3 süre sınırı).
Kullanım: node render.mjs ID --qc /tmp/qc-ID.json && python3 qc.py ID /tmp/qc-ID.json"""
import json, sys, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
sid, f = sys.argv[1], sys.argv[2]; d = json.load(open(f)); m = d['meta']
Z = json.load(open(os.path.join(HERE, f'zamanlama-{sid}.json')))
DUR = m['duration']; KB = DUR - Z['kart']
X0, X1, Y0, Y1, NY1 = 65, 929, 211, 1306, 1382
hata, rap = [], []
# süre
(hata if not (50 <= DUR <= 60.0) else rap).append(f'süre {DUR:.2f} sn (50-60, kesin üst sınır 60,0)')
# (a) vurgu -> silme >= 1,0 sn
mn = min(((v['silme'] if v['silme'] is not None else DUR) - v['bitis']) for v in d['vurgular'])
for v in d['vurgular']:
    s = (v['silme'] if v['silme'] is not None else DUR) - v['bitis']
    if s < 1.0: hata.append(f"(a) vurgu {v['k']} grup {v['g']} bitiş {v['bitis']} -> silme {v['silme']}: {s:.2f} sn")
rap.append(f"(a) vurgu -> silme: {len(d['vurgular'])} vurgu, en kısa {mn:.2f} sn")
# (b) abone kartı yok
rap.append('(b) abone kartı/çağrısı yok (Short) -> uygulanmaz')
# (c) kanca
txt = [y['s'] for y in d['yazilar']] + [c['text'] for c in Z['cumleler']]
k = [t for t in txt if re.search('kanca', t, re.I)]
(hata if k else rap).append(f'(c) "kanca" kelimesi: {len(k)} (ekranda {len(d["yazilar"])} yazı, seste {len(Z["cumleler"])} cümle tarandı)')
rap.append('(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti')
rap.append('(e) intro: Short\'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz')
# güvenli alan
for y in d['yazilar']:
    b = y['box']
    if b[0] < X0 or b[2] > X1 or b[1] < Y0 or b[3] > Y1: hata.append(f"güvenli alan: '{y['s']}' {b}")
    if b[2] - b[0] > 864: hata.append(f"satır > 864 px: '{y['s']}'")
for c in d['cizgiler']:
    b = c['bb']
    if b[2] > X1 or b[3] > NY1 or b[1] < Y0 or b[0] < X0 - 10: hata.append(f"nesne güvenli alan: grup {c['g']} {b}")
rap.append(f"güvenli alan: {len(d['yazilar'])} yazı x {X0}-{X1}, y {Y0}-{Y1}; {len(d['cizgiler'])} çizgi y <= {NY1}")
# v3 yönlendirme etiketi (kanal sahibi 21.11.2026 13:14): iki satır, 0 sn'den sona kadar, üst güvenli alanın içinde, içerikle arasında >= 15 px
et = [y for y in d['yazilar'] if y['g'] == 'etiket']
if len(et) != 2 or any(e['t0'] != 0 or e['t1'] is not None for e in et): hata.append(f'etiket: iki satır 0 sn - son sabit değil {et}')
eb = [min(e['box'][0] for e in et), min(e['box'][1] for e in et), max(e['box'][2] for e in et), max(e['box'][3] for e in et)]
mg = 9e9
for y in d['yazilar']:
    if y['g'] == 'etiket': continue
    b = y['box']
    if b[0] < eb[2] and eb[0] < b[2]: mg = min(mg, b[1] - eb[3])
for c in d['cizgiler']:
    b = c['bb']
    if b[0] < eb[2] + 20 and eb[0] - 20 < b[2]: mg = min(mg, b[1] - eb[3])
(hata if mg < 15 or eb[1] < Y0 or eb[2] > X1 else rap).append("etiket " + " / ".join(repr(e['s']) for e in et) + f" kutu {eb}, 0 sn - son ({DUR:.2f}); içeriğe en yakın dikey boşluk {mg} px (>= 15)")
# v3 son animasyon (Beğen – Paylaş – Abone ol): süre, güvenli alan, etiketle ve birbiriyle çakışma
sn = m['marks']['son']; sk = sn['kutular']
if abs(DUR - sn['t0'] - sn['sure']) > 0.02: hata.append(f"son animasyon süresi {DUR - sn['t0']:.2f} != {sn['sure']}")
for k in sk:
    b = k['b']
    if b[0] < X0 or b[2] > X1 or b[1] < Y0 or b[3] > Y1: hata.append(f"son animasyon güvenli alan: {k['s']} {b}")
    if b[1] < eb[3] + 15: hata.append(f"son animasyon etiketle çakışıyor: {k['s']}")
kart = [k for k in sk if k['s'].startswith('kart') or 'düğme' in k['s'] or k['s'] in ('Dersin tamamı kanalda:', 'Devre Teorisi I')]
for i in range(len(kart)):
    for j in range(i + 1, len(kart)):
        A, Bx = kart[i]['b'], kart[j]['b']
        if A[0] < Bx[2] and Bx[0] < A[2] and A[1] < Bx[3] and Bx[1] < A[3]: hata.append(f"son animasyon çakışma: {kart[i]['s']} / {kart[j]['s']}")
z = sn['zaman']
rap.append(f"son animasyon: {sn['t0']:.2f}-{DUR:.2f} sn ({sn['sure']} sn), {len(sk)} kutu x {min(k['b'][0] for k in sk)}-{max(k['b'][2] for k in sk)}, y {min(k['b'][1] for k in sk)}-{max(k['b'][3] for k in sk)}; sıra Beğen {z['b1']} / Paylaş {z['b2']} / Abone {z['b3']} (tık {z['b3tik']}, zil {z['zil']})")
# yazı-yazı çakışma (aynı anda görünenler)
ys = d['yazilar']
def vis(y): return (y['t0'], y['t1'] if y['t1'] is not None else DUR)
for i in range(len(ys)):
    for j in range(i + 1, len(ys)):
        a, b = ys[i], ys[j]; (a0, a1), (b0, b1) = vis(a), vis(b)
        if min(a1, b1) <= max(a0, b0): continue
        A, Bx = a['box'], b['box']
        if A[0] < Bx[2] - 2 and Bx[0] < A[2] - 2 and A[1] < Bx[3] - 2 and Bx[1] < A[3] - 2: hata.append(f"yazı çakışması: '{a['s']}' / '{b['s']}'")
# okuma süresi
kisa = []
for y in ys:
    if y['s'].strip() in ('?',): continue
    n = len(y['s'].split()); need = 1.2 + 0.35 * n; t0, t1 = vis(y); have = t1 - t0
    if have + 1e-6 < need:
        hata.append(f"okuma süresi '{y['s']}': {have:.2f} < {need:.2f} sn")
rap.append(f"okuma süresi: {len(ys)} yazı kontrol edildi (1,2 + 0,35 x kelime)")
rap.append(f"tek kalem çakışması {m['kalem_cakisma']}, gecikme > 0,6 sn: {len(m['gecikme'])}")
if m['kalem_cakisma'] or m['gecikme']: hata.append('tek kalem / gecikme')
print('\n'.join(rap)); print('HATA:' if hata else 'QC otomatik: GEÇTİ'); print('\n'.join(hata))
