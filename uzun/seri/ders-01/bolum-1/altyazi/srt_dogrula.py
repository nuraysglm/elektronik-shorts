#!/usr/bin/env python3
"""SRT dogrulayici (UZUN.md Altyazi): sira numaralari, zaman bicimi, cakisma, 1-6 sn, <=2 satir, <=42 karakter, UTF-8,
istege bagli bos aralik (intro: --bos 32.97 42.57) ve video suresi (--sure)."""
import sys, re
def t(s):
    h, m, r = s.split(':'); sec, ms = r.split(','); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000
def dogrula(fn, bos=None, sure=None):
    raw = open(fn, 'rb').read(); hata = []
    if raw.startswith(b'\xef\xbb\xbf'): hata.append('BOM var')
    txt = raw.decode('utf-8')
    if '\r' in txt: hata.append('CR satir sonu')
    bloklar = txt.strip('\n').split('\n\n'); onceki = 0; n = 0
    for i, b in enumerate(bloklar, 1):
        L = b.split('\n')
        if L[0] != str(i): hata.append(f'#{i}: sira numarasi {L[0]!r}')
        m = re.fullmatch(r'(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)', L[1] if len(L) > 1 else '')
        if not m: hata.append(f'#{i}: zaman satiri {L[1:2]}'); continue
        a, z = t(m[1]), t(m[2]); d = z - a; satir = L[2:]
        if a < onceki - 1e-9: hata.append(f'#{i}: onceki kartla cakisiyor ({a:.3f} < {onceki:.3f})')
        if not (1.0 - 1e-9 <= d <= 6.0 + 1e-9): hata.append(f'#{i}: sure {d:.3f} sn')
        if not 1 <= len(satir) <= 2: hata.append(f'#{i}: {len(satir)} satir')
        for s in satir:
            if len(s) > 42: hata.append(f'#{i}: {len(s)} karakter: {s}')
            if not s.strip(): hata.append(f'#{i}: bos satir')
        if bos and a < bos[1] and z > bos[0]: hata.append(f'#{i}: intro araligina giriyor')
        if sure and z > sure: hata.append(f'#{i}: video sonundan sonra')
        onceki = z; n += 1
    return n, hata
if __name__ == '__main__':
    a = sys.argv[1:]; bos = sure = None
    if '--bos' in a: k = a.index('--bos'); bos = (float(a[k + 1]), float(a[k + 2])); del a[k:k + 3]
    if '--sure' in a: k = a.index('--sure'); sure = float(a[k + 1]); del a[k:k + 2]
    kotu = 0
    for fn in a:
        n, h = dogrula(fn, bos, sure); print(f'{fn}: {n} kart, {len(h)} hata'); [print('  ', x) for x in h]; kotu += len(h)
    sys.exit(1 if kotu else 0)
