#!/usr/bin/env python3
"""Kapak arka plan devresi, UZUN.md 6-D tarzı (kanal sahibi 20.11.2026):
kareli açık zemin, ders kitabı şeması (sinüs kaynak, bağımlı kaynaklar, R/L/C değerleri),
kırmızı + / − ve v1…v9, mavi akım okları i1…i6, düğüm noktaları. Topolojiler özgündür.
Kullanım: python3 devre.py  -> uzun/kapak-6-d/html/<ad>.html   (render: node kapak.mjs CIKTI)"""
import math, os
HERE = os.path.dirname(os.path.abspath(__file__))
S = []

def P(s): S.append(s)
def ln(a, b): P(f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}"/>')
def dot(p): P(f'<circle cx="{p[0]}" cy="{p[1]}" r="6" class="d"/>')
def lab(x, y, base, sub=None, cls='l', anc='middle'):
    t = f'<text x="{x:.0f}" y="{y:.0f}" class="{cls}" text-anchor="{anc}">{base}'
    if sub: t += f'<tspan class="sub" dy="7">{sub}</tspan>'
    P(t + '</text>')

# --- eleman gövdeleri: yerel eksende (0,0)->(L,0) ortalanmış, sonra döndürülür ----------
def body(kind, Lb):
    if kind == 'R':
        pts = [(-32, 0)] + [(-32 + 64 * (k + .5) / 6, -13 if k % 2 == 0 else 13) for k in range(6)] + [(32, 0)]
        return '<polyline points="' + ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts) + '"/>'
    if kind == 'L':
        return '<path d="M-34,0 ' + ' '.join('a8.5,10 0 0 1 17,0' for _ in range(4)) + '"/>'
    if kind == 'C':
        return '<line x1="-7" y1="-22" x2="-7" y2="22"/><line x1="7" y1="-22" x2="7" y2="22"/>'
    if kind == 'AC':  # sinüs gerilim kaynağı
        return ('<circle cx="0" cy="0" r="28" class="src"/>'
                '<path d="M-15,0 C-10,-16 -5,-16 0,0 S10,16 15,0" class="sin"/>')
    if kind in ('DV', 'DI'):  # bağımlı kaynak: eşkenar dörtgen
        s = '<polygon points="-30,0 0,-30 30,0 0,30" class="src"/>'
        if kind == 'DI':  # yerel eksen yönünde ok (akım kaynağı)
            s += '<line x1="-14" y1="0" x2="12" y2="0"/><polyline points="4,-7 13,0 4,7"/>'
        return s
    return ''
HALF = {'R': 32, 'L': 34, 'C': 7, 'AC': 28, 'DV': 30, 'DI': 30, 'W': 0}

def el(kind, a, b, val=None, v=None, flip=False, vsub=None):
    """a->b yatay veya dikey eleman. val: değer etiketi (siyah). v: gerilim etiketi alt simgesi
    (kırmızı + a tarafında, − b tarafında; flip=True ters). Bağımlı DV: +/− gövde içinde."""
    x1, y1 = a; x2, y2 = b
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    hor = abs(y2 - y1) < 1
    ang = 0 if hor else 90
    if (hor and x2 < x1) or (not hor and y2 < y1): ang += 180
    h = HALF[kind]
    if kind == 'W':
        ln(a, b); return
    ux, uy = (1, 0) if hor else (0, 1)
    sg = 1 if (hor and x2 > x1) or (not hor and y2 > y1) else -1
    ln(a, (mx - sg * ux * h, my - sg * uy * h)); ln((mx + sg * ux * h, my + sg * uy * h), b)
    P(f'<g transform="translate({mx},{my}) rotate({0 if kind == 'AC' else ang})">{body(kind, 0)}</g>')
    if kind == 'AC':  # + ucu b tarafında (kaynak a->b yönünde yükseltir)
        if hor: lab(mx + sg * 42, my - 12, '+', cls='p')
        else: lab(mx - 22, my + sg * 46 + 8, '+', cls='p')
    if kind == 'DV':
        o = 15
        if hor: lab(mx - sg * o, my + 9, '+', cls='pk'); lab(mx + sg * o, my + 9, '−', cls='pk')
        else: lab(mx, my - sg * o + 9, '+', cls='pk'); lab(mx, my + sg * o + 9, '−', cls='pk')
    if val:
        if hor: lab(mx, my - (40 if kind in ('AC', 'DV', 'DI') else 26), val[0], val[1] if len(val) > 1 else None)
        else: lab(mx + (42 if kind in ('AC', 'DV', 'DI') else 28), my + 9, val[0], val[1] if len(val) > 1 else None, anc='start')
    if v:
        s1, s2 = ('−', '+') if flip else ('+', '−')
        d = 44
        if hor:
            lab(mx - sg * d, my + 40, s1, cls='p'); lab(mx + sg * d, my + 40, s2, cls='p')
            lab(mx, my + 42, 'v', v, cls='p')
        else:
            lab(mx - 30, my - sg * d + 10, s1, cls='p'); lab(mx - 30, my + sg * d + 10, s2, cls='p')
            lab(mx - 30, my + 10, 'v', v, cls='p', anc='middle')

def arr(p, d, k, side=1):
    """Mavi akım oku: p merkez, d yön r/l/u/d, k alt simge."""
    x, y = p
    vx, vy = {'r': (1, 0), 'l': (-1, 0), 'u': (0, -1), 'd': (0, 1)}[d]
    px, py = -vy, vx
    P(f'<line class="ab" x1="{x - vx * 20}" y1="{y - vy * 20}" x2="{x + vx * 6}" y2="{y + vy * 6}"/>')
    P(f'<polygon class="a" points="{x + vx * 16},{y + vy * 16} {x - vx * 2 + px * 9},{y - vy * 2 + py * 9} {x - vx * 2 - px * 9},{y - vy * 2 - py * 9}"/>')
    if d in 'rl': lab(x, y - 18 * side if side > 0 else y + 34, 'i', k, cls='a')
    else: lab(x + 18, y + 8, 'i', k, cls='a', anc='start')

# --- topolojiler (hepsi özgün) ------------------------------------------------------------
def devre_a():
    """Bölüm 1 kapak A: 4×2 çevreli ağ; sinüs kaynak, gerilim kontrollü gerilim kaynağı 2·v1,
    akım kontrollü akım kaynağı 4·i1."""
    X = [80, 350, 620, 890, 1150]; T, M, B = 128, 492, 662
    # üst hat
    el('R', (X[0], T), (X[1], T), ('1 kΩ',), '1')
    el('L', (X[1], T), (X[2], T), ('1 mH',), '2')
    el('R', (X[2], T), (X[3], T), ('470 Ω',), '3')
    el('C', (X[3], T), (X[4], T), ('100 µF',), '4')
    # üst dikeyler
    el('AC', (X[0], M), (X[0], T), ('10 sin ωt V',))
    el('R', (X[1], T), (X[1], M), ('2,2 kΩ',), '5')
    el('DV', (X[2], T), (X[2], M), ('2·v', '1'))
    el('C', (X[3], T), (X[3], M), ('10 µF',), '6')
    el('R', (X[4], T), (X[4], M), ('3,3 kΩ',))
    # orta hat
    el('R', (X[0], M), (X[1], M), ('4,7 kΩ',), '7')
    el('L', (X[1], M), (X[2], M), ('2 mH',))
    el('W', (X[2], M), (X[3], M))
    el('R', (X[3], M), (X[4], M), ('680 Ω',), '8')
    # alt dikeyler
    el('W', (X[0], M), (X[0], B))
    el('DI', (X[1], B), (X[1], M), ('4·i', '1'))
    el('R', (X[2], M), (X[2], B), ('820 Ω',), '9')
    el('L', (X[3], M), (X[3], B), ('4,7 mH',))
    el('C', (X[4], M), (X[4], B), ('22 µF',))
    # alt hat
    el('W', (X[0], B), (X[1], B))
    el('R', (X[1], B), (X[2], B), ('10 kΩ',))
    el('W', (X[2], B), (X[3], B))
    el('R', (X[3], B), (X[4], B), ('150 Ω',))
    for x in X[1:4]: dot((x, T)); dot((x, B))
    for x in X: dot((x, M))
    arr((X[0] + 48, T), 'r', '1')
    arr((X[2] + 60, T), 'r', '2')
    arr((X[3] + 205, T), 'r', '3')
    arr((X[2] + 140, M), 'r', '4')
    arr((X[0] + 140, B), 'l', '5', side=-1)
    arr((X[2] + 140, B), 'r', '6', side=-1)

DEVRELER = {'a': devre_a}
KAPAKLAR = [
    # ad, devre, satır1, satır2 (vurgu <em>), şerit
    ('1-1-a', 'a', 'Akım akıyor ama', 'ortalaması <em>sıfır?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 1/3'),
]

def izgara():
    return ('<defs><pattern id="mm" width="10" height="10" patternUnits="userSpaceOnUse">'
            '<path d="M10,0 L0,0 0,10" class="g1"/></pattern>'
            '<pattern id="cm" width="50" height="50" patternUnits="userSpaceOnUse">'
            '<rect width="50" height="50" fill="url(#mm)"/><path d="M50,0 L0,0 0,50" class="g2"/></pattern></defs>'
            '<rect width="1280" height="720" fill="url(#cm)"/>')

def svg():
    o = '<svg class="devre" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">' + izgara() + '<g class="sema">' + ''.join(S) + '</g></svg>'
    S.clear(); return o

if __name__ == '__main__':
    import sys
    CSS = open(os.path.join(HERE, 'kapak.css')).read()
    os.makedirs(os.path.join(HERE, 'html'), exist_ok=True)
    sec = sys.argv[1:] or [k[0] for k in KAPAKLAR]
    for ad, dv, s1, s2, serit in KAPAKLAR:
        if ad not in sec: continue
        DEVRELER[dv](); g = svg()
        h = (f'<!doctype html><meta charset="utf-8"><style>{CSS}</style><body><div class="k">{g}'
             f'<div class="bant"></div><div class="yazi"><div class="s1">{s1}</div><div class="s2">{s2}</div></div>'
             f'<div class="serit">{serit}</div></div>')
        open(os.path.join(HERE, 'html', ad + '.html'), 'w').write(h)
        print('->', ad)
