#!/usr/bin/env python3
"""Kapak arka plan devresi, UZUN.md 6-D tarzı (kanal sahibi 20.11.2026):
düz beyaz zemin (kareli doku yok, iş emri J2), ders kitabı şeması (sinüs kaynak, bağımlı kaynaklar, R/L/C değerleri),
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
    if kind == 'DC':  # batarya: uzun plaka a tarafı (+)
        return '<line x1="-6" y1="-24" x2="-6" y2="24"/><line x1="6" y1="-12" x2="6" y2="12" style="stroke-width:6"/>'
    if kind == 'SW':  # açık anahtar
        return ('<circle cx="-24" cy="0" r="5" class="src"/><circle cx="24" cy="0" r="5" class="src"/>'
                '<line x1="-20" y1="-3" x2="22" y2="-26"/>')
    return ''
HALF = {'R': 32, 'L': 34, 'C': 7, 'AC': 28, 'DV': 30, 'DI': 30, 'W': 0, 'DC': 6, 'SW': 29}

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

def kur(X, Y, H, V, oklar):
    """Genel ağ: X sütunları, Y satırları; H[(j,i)] yatay kenar (Y[j], X[i]->X[i+1]),
    V[(j,i)] dikey kenar (X[i], Y[j]->Y[j+1]); değer (tür, değer, v_alt, ters_yön)."""
    deg = {}
    def add(p): deg[p] = deg.get(p, 0) + 1
    for (j, i), e in H.items():
        a, b = (X[i], Y[j]), (X[i + 1], Y[j])
        if len(e) > 3 and e[3]: a, b = b, a
        el(e[0], a, b, (e[1],) if isinstance(e[1], str) else e[1], e[2] if len(e) > 2 else None); add(a); add(b)
    for (j, i), e in V.items():
        a, b = (X[i], Y[j]), (X[i], Y[j + 1])
        if len(e) > 3 and e[3]: a, b = b, a
        el(e[0], a, b, (e[1],) if isinstance(e[1], str) else e[1], e[2] if len(e) > 2 else None); add(a); add(b)
    for p, n in deg.items():
        if n >= 3: dot(p)
    for o in oklar: arr(*o)

def devre_b():
    """Bölüm 2 kapak A: açık anahtarlı kol + 9 V batarya, sinüs kaynak, VCCS 0,5·v2 (mS), CCVS 200·i3."""
    X = [80, 400, 720, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('R','3 kΩ','1'), (0,1): ('SW','S'), (0,2): ('L','10 mH','2'),
         (1,0): ('C','47 µF','3'), (1,1): ('R','1,2 kΩ','4'), (1,2): ('W',None),
         (2,0): ('R','5,6 kΩ','5'), (2,1): ('L','3,3 mH'), (2,2): ('R','330 Ω','6')}
    V = {(0,0): ('DC','9 V',None,True), (0,1): ('DI',('0,5·v','2'),None,True), (0,2): ('R','2 kΩ','7'), (0,3): ('C','220 nF','8'),
         (1,0): ('AC','6 sin ωt V',None,True), (1,1): ('R','750 Ω','9'), (1,2): ('DV',('200·i','3')), (1,3): ('L','1 mH')}
    kur(X, [T, M, B], H, V, [((X[0]+48,T),'r','1'), ((X[2]+345,T),'r','2'), ((X[1]+250,M),'r','3'),
                             ((X[3]-60,M),'r','4'), ((X[0]+45,B),'l','5',-1), ((X[2]+345,B),'r','6',-1)])

def devre_c():
    """Bölüm 2 kapak B: 5 sütunlu merdiven-ağ; sinüs kaynak, VCVS 3·v1, CCCS 2·i4."""
    X = [80, 330, 580, 830, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('L','2 mH','1'), (0,1): ('R','1,8 kΩ','2'), (0,2): ('C','33 µF','3'), (0,3): ('R','390 Ω','4'),
         (1,0): ('W',None), (1,1): ('R','2,7 kΩ','5'), (1,2): ('L','6,8 mH'), (1,3): ('R','100 Ω','6'),
         (2,0): ('R','1 kΩ'), (2,1): ('W',None), (2,2): ('R','4,7 kΩ','7'), (2,3): ('W',None)}
    V = {(0,0): ('AC','12 sin ωt V',None,True), (0,1): ('C','4,7 µF','8'), (0,2): ('R','560 Ω'), (0,3): ('DV',('3·v','1')), (0,4): ('L','15 mH'),
         (1,0): ('R','8,2 kΩ','9'), (1,1): ('DI',('2·i','4'),None,True), (1,2): ('C','1 µF'), (1,3): ('R','1,5 kΩ'), (1,4): ('R','220 Ω')}
    kur(X, [T, M, B], H, V, [((X[0]+40,T),'r','1'), ((X[1]+200,T),'r','2'), ((X[3]+270,T),'r','4'),
                             ((X[2]+45,M),'r','3'), ((X[1]+120,B),'l','5',-1), ((X[3]+180,B),'r','6',-1)])

def devre_d():
    """Bölüm 2 kapak C: köprülü ağ; sinüs kaynak, CCVS 100·i2, VCCS 0,2·v5 (mS), batarya."""
    X = [80, 360, 640, 920, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('R','2,2 kΩ','1'), (0,1): ('C','10 µF','2'), (0,2): ('L','4,7 mH'), (0,3): ('R','680 Ω','3'),
         (1,0): ('L','1 mH','4'), (1,1): ('W',None), (1,2): ('R','1 kΩ','5'), (1,3): ('C','68 µF'),
         (2,0): ('W',None), (2,1): ('R','3,9 kΩ','6'), (2,2): ('W',None), (2,3): ('R','270 Ω','7')}
    V = {(0,0): ('AC','8 sin ωt V',None,True), (0,1): ('R','470 Ω','8'), (0,2): ('DV',('100·i','2')), (0,3): ('C','2,2 µF'), (0,4): ('R','1,2 kΩ'),
         (1,0): ('DC','3 V',None,True), (1,1): ('L','22 mH'), (1,2): ('DI',('0,2·v','5'),None,True), (1,3): ('R','5,6 kΩ','9'), (1,4): ('C','470 nF')}
    kur(X, [T, M, B], H, V, [((X[0]+48,T),'r','1'), ((X[2]+230,T),'r','2'), ((X[4],M-90+0),'d','3'),
                             ((X[1]+140,M),'r','4'), ((X[0]+140,B),'l','5',-1), ((X[2]+140,B),'r','6',-1)])

def devre_e():
    """Bölüm 3 kapak A: kısa devre telli ağ; sinüs kaynak, batarya, VCVS 4·v2, CCCS 3·i1."""
    X = [80, 380, 680, 960, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('R','2 kΩ','1'), (0,1): ('L','2,2 mH'), (0,2): ('R','1 kΩ','2'), (0,3): ('C','15 µF'),
         (1,0): ('R','1,5 kΩ','3'), (1,1): ('C','6,8 µF','4'), (1,2): ('W',None), (1,3): ('R','430 Ω','5'),
         (2,0): ('W',None), (2,1): ('R','6,8 kΩ'), (2,2): ('L','8,2 mH'), (2,3): ('R','91 Ω','6')}
    V = {(0,0): ('DC','6 V',None,True), (0,1): ('R','910 Ω','7'), (0,2): ('W',None), (0,3): ('DV',('4·v','2')), (0,4): ('R','2,4 kΩ'),
         (1,0): ('AC','5 sin ωt V',None,True), (1,1): ('DI',('3·i','1'),None,True), (1,2): ('R','3,6 kΩ','8'), (1,3): ('C','330 nF'), (1,4): ('L','12 mH','9')}
    kur(X, [T, M, B], H, V, [((X[0]+48,T),'r','1'), ((X[2]+200,T),'r','2'), ((X[1]+45,M),'r','3'),
                             ((X[3]+36,M),'r','4'), ((X[1]+50,B),'l','5',-1), ((X[3]+36,B),'r','6',-1)])

def devre_f():
    """Bölüm 3 kapak B: regülatörlü görünümlü merdiven; batarya, CCVS 50·i3, VCCS 0,1·v4 (mS), sinüs kaynak."""
    X = [80, 320, 600, 880, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('R','330 Ω','1'), (0,1): ('C','22 µF'), (0,2): ('R','66 Ω','2'), (0,3): ('L','3,3 mH','3'),
         (1,0): ('L','4,7 mH'), (1,1): ('R','33 Ω','4'), (1,2): ('W',None), (1,3): ('R','1,8 kΩ','5'),
         (2,0): ('R','2,7 kΩ'), (2,1): ('W',None), (2,2): ('R','510 Ω','6'), (2,3): ('C','3,3 µF')}
    V = {(0,0): ('DC','5 V',None,True), (0,1): ('R','22 Ω','7'), (0,2): ('DV',('50·i','3')), (0,3): ('C','100 nF'), (0,4): ('R','6,6 Ω','8'),
         (1,0): ('AC','3 sin ωt V',None,True), (1,1): ('L','10 mH'), (1,2): ('DI',('0,1·v','4'),None,True), (1,3): ('R','1,2 kΩ','9'), (1,4): ('C','47 µF')}
    kur(X, [T, M, B], H, V, [((X[0]+45,T),'r','1'), ((X[2]+215,T),'r','2'), ((X[2]+140,M),'r','3'),
                             ((X[3]+215,M),'r','4'), ((X[0]+45,B),'l','5',-1), ((X[3]+50,B),'r','6',-1)])

def devre_g():
    """Bölüm 3 kapak C: toprak referanslı çok çevreli ağ; iki batarya, VCVS 2·v6, CCCS 5·i2, sinüs kaynak."""
    X = [80, 360, 620, 900, 1150]; T, M, B = 128, 492, 662
    H = {(0,0): ('C','10 µF','1'), (0,1): ('R','1,7 kΩ','2'), (0,2): ('L','1,5 mH'), (0,3): ('R','750 Ω','3'),
         (1,0): ('R','3,3 kΩ','4'), (1,1): ('W',None), (1,2): ('R','2,2 kΩ','5'), (1,3): ('L','5,6 mH'),
         (2,0): ('W',None), (2,1): ('R','1,1 kΩ'), (2,2): ('C','2,2 µF','6'), (2,3): ('W',None)}
    V = {(0,0): ('DC','12 V',None,True), (0,1): ('R','4,3 kΩ','7'), (0,2): ('DI',('5·i','2'),None,True), (0,3): ('C','680 nF'), (0,4): ('DV',('2·v','6')),
         (1,0): ('AC','7 sin ωt V',None,True), (1,1): ('DC','3,3 V',None,True), (1,2): ('R','620 Ω','8'), (1,3): ('R','5,1 kΩ','9'), (1,4): ('L','18 mH')}
    kur(X, [T, M, B], H, V, [((X[0]+48,T),'r','1'), ((X[3]+200,T),'r','2'), ((X[0]+50,M),'r','3'),
                             ((X[2]+50,M),'r','4'), ((X[1]+45,B),'l','5',-1), ((X[3]+130,B),'r','6',-1)])

DEVRELER = {'a': devre_a, 'b': devre_b, 'c': devre_c, 'd': devre_d, 'e': devre_e, 'f': devre_f, 'g': devre_g}
KAPAKLAR = [
    # ad, devre, satır1, satır2 (vurgu <em>), şerit
    ('1-1-a', 'a', 'Akım akıyor ama', 'ortalaması <em>sıfır?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 1/3'),
    ('1-2-a', 'b', 'Akım sıfır…', 'gerilim neden <em>9 V?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
    ('1-2-b', 'c', 'Zamanın yarısı,', 'yükün <em>dörtte biri?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
    ('1-2-c', 'd', 'Pil 1 gün mü,', '<em>1 yıl mı?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
    ('1-3-a', 'e', 'Kısa devrede', 'akım <em>sıfır mı?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 3/3'),
    ('1-3-b', 'f', '3,3 V yazıyor…', 'neden <em>3,3 V değil?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 3/3'),
    ('1-3-c', 'g', 'Bu nokta 12 V…', '<em>neye göre?</em>', 'DEVRE TEORİSİ I: DERS 1 - BÖLÜM 3/3'),
]

def svg():
    o = '<svg class="devre" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">' + '<g class="sema">' + ''.join(S) + '</g></svg>'
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
