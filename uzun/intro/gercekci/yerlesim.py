# Gercekci PCB intro (is emri K, 20.11.2026): kart yerlesimi + prosedurel dokular.
# Tamamen kodla: bakir yollar, pad'ler, viyalar, dokme bakir, serigrafi, cip ust yazisi, akim darbesi varis haritasi.
# Kullanim: python3 yerlesim.py CIKTI_KLASORU   (dokular depoya girmez, her calistirmada ayni sonuc: seed sabit)
import sys, os, json, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from shapely.geometry import LineString, Point, box, Polygon
from shapely.ops import unary_union
from shapely import affinity

OUT = sys.argv[1] if len(sys.argv) > 1 else "doku"
os.makedirs(OUT, exist_ok=True)
random.seed(7); np.random.seed(7)
W, H = 90.0, 60.0          # kart (mm)
S = 90                     # px/mm ana dokular
SA = 45                    # px/mm varis haritasi
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"
FONT_SILK = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

traces = []   # dict(line, w, t0, v, rev)  t0: darbenin baslangici, v: mm/sn
pads = []     # shapely poligon (acik altin pad)
vias = []     # (x, y, halka_r, delik_r, acik)
comps = []    # Blender icin bilesen listesi
silk_geo = [] # (geometri, kalinlik)
silk_txt = [] # (metin, x, y, boy, aci)

def rot(g, a, o=(0, 0)):
    return affinity.rotate(g, a, origin=o, use_radians=False)

def rect(cx, cy, w, h, a=0):
    return rot(box(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2), a, (cx, cy))

def pt_rot(x, y, a):
    c, s = math.cos(math.radians(a)), math.sin(math.radians(a))
    return (x * c - y * s, x * s + y * c)

# ---------------- U1: QFP-64, 10x10 govde ----------------
comps.append(dict(tip="qfp", ad="U1", x=0, y=0, a=0, govde=10.0, n=16, aralik=0.5))
TW = 0.2
for side in range(4):
    a = side * 90
    for k in range(16):
        u = (k - 7.5) * 0.5
        p = rect(u, 6.0, 0.28, 1.5)
        pads.append(rot(p, a))
        if random.random() < 0.1:
            continue
        y1 = 7.2; xu = 1.8 * u; y2 = y1 + 0.8 * abs(u)
        L3 = random.uniform(0.8, 6.5)
        pts = [(u, 6.6), (u, y1), (xu, y2)]
        kind = "via"
        if k % 4 == 1:
            kind = "res"
        y_end = y2 + L3
        if kind == "res":
            yr = y2 + (2.2 if (k // 4) % 2 == 0 else 4.4)
            pts.append((xu, yr - 0.75))
            seg1 = [pt_rot(*q, a) for q in pts]
            cx, cy = pt_rot(xu, yr, a)
            comps.append(dict(tip="r0603", ad="R%d" % (len([c for c in comps if c['ad'].startswith('R')]) + 1),
                              x=cx, y=cy, a=a + 90, kod=random.choice(["103", "472", "221", "102", "331", "47R"])))
            for sgn in (-1, 1):
                pads.append(rot(rect(xu, yr + sgn * 0.75, 0.8, 0.8), a))
            ye = yr + 0.75 + random.uniform(1.2, 4.5)
            seg2 = [pt_rot(xu, yr + 0.75, a), pt_rot(xu, ye, a)]
            vias.append((*pt_rot(xu, ye + 0.0, a), 0.3, 0.15, False))
            L = LineString(seg1).length + 1.6 + LineString(seg2).length
            t_end = random.uniform(3.25, 3.45)   # cipe varis
            v = 9.0
            # dis uctan cipe: varis(s) = t_end - (kalan yol)/v
            traces.append(dict(line=LineString(seg2[::-1]), w=TW, t0=t_end - L / v, v=v))
            traces.append(dict(line=LineString(seg1[::-1]), w=TW, t0=t_end - LineString(seg1).length / v, v=v))
        else:
            pts.append((xu, y_end))
            seg = [pt_rot(*q, a) for q in pts]
            vias.append((*seg[-1], 0.3, 0.15, random.random() < 0.25))
            ln = LineString(seg[::-1])
            v = 9.0; t_end = random.uniform(3.2, 3.5)
            traces.append(dict(line=ln, w=TW, t0=t_end - ln.length / v, v=v))

# kose dekuplaj kondansatorleri + LED + kristal
def add_2pad(tip, ad, x, y, a, L=1.6, Wd=0.8, pl=0.9, pw=0.8, **kw):
    comps.append(dict(tip=tip, ad=ad, x=x, y=y, a=a, **kw))
    for sgn in (-1, 1):
        dx, dy = pt_rot(sgn * L / 2 * 0.95, 0, a)
        pads.append(rect(x + dx, y + dy, pl, pw, a))

add_2pad("c0603", "C1", 8.4, 8.4, -45)
add_2pad("c0603", "C2", -8.4, 8.4, 45)
add_2pad("c0603", "C3", -8.4, -8.4, -45)
add_2pad("c0603", "C4", 8.4, -8.4, 45)
add_2pad("led0805", "D1", 11.0, 11.0, -45, L=2.0, Wd=1.25, pl=1.0, pw=1.2)
comps.append(dict(tip="xtal", ad="Y1", x=-11.2, y=11.2, a=45))
for sgn in (-1, 1):
    for sg2 in (-1, 1):
        dx, dy = pt_rot(sgn * 1.1, sg2 * 0.8, 45)
        pads.append(rect(-11.2 + dx, 11.2 + dy, 1.2, 1.0, 45))
add_2pad("r0603", "R40", -11.0, -11.0, 45, kod="100")

# SOIC'ler
def soic(ad, x, y, a, n, kod):
    comps.append(dict(tip="soic", ad=ad, x=x, y=y, a=a, n=n, kod=kod))
    rows = n // 2
    for side in (-1, 1):
        for i in range(rows):
            yy = (i - (rows - 1) / 2) * 1.27
            dx, dy = pt_rot(side * 2.7, yy, a)
            pads.append(rect(x + dx, y + dy, 1.55, 0.6, a))

soic("U2", -24.0, 9.0, 0, 8, "NS 2611")
soic("U3", 24.0, -10.0, 90, 14, "DT1 0A21")
# elektrolitik kondansator
comps.append(dict(tip="elko", ad="C9", x=-22.0, y=-12.0, a=0))
for sgn in (-1, 1):
    pads.append(rect(-22.0 + sgn * 2.5, -12.0, 2.6, 1.6))
# rastgele pasifler (dis bolge)
occupied = unary_union([t["line"].buffer(t["w"] / 2 + 0.25) for t in traces] + [p.buffer(0.25) for p in pads] +
                       [Point(v[0], v[1]).buffer(v[2] + 0.25) for v in vias] +
                       [rect(c["x"], c["y"], 5.5 if c["tip"] == "soic" else 7.5, 6.5 if c["tip"] == "soic" else 7.5, c["a"]) for c in comps if c["tip"] in ("soic", "elko")] +
                       [rect(0, 0, 12, 12)])
n_r = 41; n_c = 10
passive_pads = []
for i in range(160):
    x = random.uniform(-W / 2 + 4, W / 2 - 4); y = random.uniform(-H / 2 + 4, H / 2 - 4)
    if abs(x) < 15 and abs(y) < 15:
        continue
    a = random.choice([0, 90])
    tip = random.choice(["r0603", "r0603", "c0603"])
    fp = rect(x, y, 3.0, 1.7, a)
    if fp.intersects(occupied) or not box(-W / 2 + 2, -H / 2 + 2, W / 2 - 2, H / 2 - 2).contains(fp):
        continue
    if tip == "r0603":
        ad = "R%d" % n_r; n_r += 1
        add_2pad(tip, ad, x, y, a, kod=random.choice(["103", "472", "221", "102", "331", "4R7", "000"]))
    else:
        ad = "C%d" % n_c; n_c += 1
        add_2pad(tip, ad, x, y, a)
    for sgn in (-1, 1):
        dx, dy = pt_rot(sgn * 0.76, 0, a)
        passive_pads.append((x + dx, y + dy, a + (0 if sgn > 0 else 180)))
    occupied = occupied.union(fp.buffer(0.2))
    if n_r + n_c > 85:
        break

# rastgele yuruyuslu yollar ("sehir haritasi")
def walk(x, y, d, tstart):
    pts = [(x, y)]
    for step in range(random.randint(2, 6)):
        L = random.uniform(1.5, 9.0)
        nx = pts[-1][0] + L * math.cos(math.radians(d)); ny = pts[-1][1] + L * math.sin(math.radians(d))
        seg = LineString([pts[-1], (nx, ny)])
        test = LineString([pts[-1], (nx, ny)]).buffer(TW / 2 + 0.12)
        cut = Point(pts[-1]).buffer(0.5)
        if test.difference(cut).intersects(occupied) or not box(-W / 2 + 1.5, -H / 2 + 1.5, W / 2 - 1.5, H / 2 - 1.5).contains(seg):
            break
        pts.append((nx, ny))
        d += random.choice([-45, 45, 0, 0])
    return pts

made = 0
starts = [(px, py, pa) for px, py, pa in passive_pads]
for i in range(1400):
    if starts and i < len(passive_pads) * 3:
        px, py, pa = starts[i % len(starts)]
        d = pa
        ox, oy = pt_rot(0.45, 0, pa); x, y = px + ox, py + oy
    else:
        x = random.uniform(-W / 2 + 3, W / 2 - 3); y = random.uniform(-H / 2 + 3, H / 2 - 3)
        d = random.choice(range(0, 360, 45))
        if Point(x, y).buffer(0.6).intersects(occupied):
            continue
    pts = walk(x, y, d, 0)
    if len(pts) < 2:
        continue
    ln = LineString(pts)
    if ln.length < 3:
        continue
    w = random.choice([TW, TW, TW, 0.3, 0.45])
    tv = random.uniform(1.95, 3.0)
    traces.append(dict(line=ln, w=w, t0=tv, v=random.uniform(9, 14)))
    endp = pts[-1]
    vias.append((endp[0], endp[1], 0.3, 0.15, random.random() < 0.2))
    occupied = occupied.union(ln.buffer(w / 2 + 0.22)).union(Point(endp).buffer(0.55))
    made += 1
print("rastgele yol:", made, "toplam yol:", len(traces), "bilesen:", len(comps))

# test noktalari (acik altin daireler)
for i in range(40):
    x = random.uniform(-W / 2 + 3, W / 2 - 3); y = random.uniform(-H / 2 + 3, H / 2 - 3)
    c = Point(x, y).buffer(0.75)
    if c.buffer(0.3).intersects(occupied):
        continue
    pads.append(Point(x, y).buffer(0.5, 24)); occupied = occupied.union(c)
    silk_txt.append(("TP%d" % (i + 1), x, y - 1.25, 0.65, 0))
# montaj delikleri
holes_big = [(-W / 2 + 4, H / 2 - 4), (W / 2 - 4, H / 2 - 4), (-W / 2 + 4, -H / 2 + 4), (W / 2 - 4, -H / 2 + 4)]

copper_feat = unary_union([t["line"].buffer(t["w"] / 2, cap_style=1, join_style=1) for t in traces] + pads +
                          [Point(v[0], v[1]).buffer(v[2], 24) for v in vias])
pour = box(-W / 2 + 1.0, -H / 2 + 1.0, W / 2 - 1.0, H / 2 - 1.0).difference(copper_feat.buffer(0.3))
pour = pour.difference(rect(0, 0, 11, 11))
for hx, hy in holes_big:
    pour = pour.difference(Point(hx, hy).buffer(3.2))
pour = pour.buffer(-0.2).buffer(0.2)
# dikis viyalari (ortulu)
for gx in np.arange(-W / 2 + 3, W / 2 - 2, 2.54):
    for gy in np.arange(-H / 2 + 3, H / 2 - 2, 2.54):
        if pour.contains(Point(gx, gy).buffer(0.9)) and random.random() < 0.55:
            vias.append((gx, gy, 0.3, 0.15, False))

# serigrafi: bilesen cerceveleri + etiketler
def body_outline(c):
    t = c["tip"]
    if t == "qfp":
        g = []
        s = 5.6
        for sx in (-1, 1):
            for sy in (-1, 1):
                g.append(LineString([(sx * s, sy * (s - 0.9)), (sx * s, sy * s), (sx * (s - 0.9), sy * s)]))
        silk_geo.append((Point(-6.4, 6.4).buffer(0.25), 0))
        return g
    if t == "soic":
        rows = c["n"] // 2; h = rows * 1.27 + 0.4
        return [rot(LineString([(-1.75, -h / 2), (-1.75, h / 2)]), c["a"], (0, 0)),
                rot(LineString([(1.75, -h / 2), (1.75, h / 2)]), c["a"], (0, 0))]
    if t == "elko":
        return [LineString([(-3.4, 1.7), (-3.4, 3.4), (2.6, 3.4), (3.4, 2.6), (3.4, 1.7)]),
                LineString([(-3.4, -1.7), (-3.4, -3.4), (2.6, -3.4), (3.4, -2.6), (3.4, -1.7)])]
    if t in ("r0603", "c0603"):
        return [LineString([(-0.35, 0.75), (0.35, 0.75)]), LineString([(-0.35, -0.75), (0.35, -0.75)])]
    if t == "led0805":
        return [LineString([(-1.9, 1.0), (1.5, 1.0)]), LineString([(-1.9, -1.0), (1.5, -1.0)]), LineString([(-1.9, 1.0), (-1.9, -1.0)])]
    if t == "xtal":
        return [box(-2.0, -1.6, 2.0, 1.6).exterior]
    return []

for c in comps:
    for g in body_outline(c):
        if c["tip"] in ("qfp", "elko"):
            gg = affinity.translate(rot(g, c["a"]), c["x"], c["y"])
        elif c["tip"] == "soic":
            gg = affinity.translate(g, c["x"], c["y"])
        else:
            gg = affinity.translate(rot(g, c["a"]), c["x"], c["y"])
        silk_geo.append((gg, 0.15))

pads_u = unary_union(pads)
silk_occ = pads_u.buffer(0.25)
body_keep = unary_union([rect(c["x"], c["y"], {"qfp": 10.4, "soic": 4.2, "elko": 6.8, "xtal": 3.4, "led0805": 2.2}.get(c["tip"], 1.8),
                              {"qfp": 10.4, "soic": c.get("n", 8) // 2 * 1.27 + 0.6, "elko": 6.8, "xtal": 2.6, "led0805": 1.4}.get(c["tip"], 1.0),
                              c["a"] if c["tip"] != "soic" else c["a"]) for c in comps])
_fnt_cache = {}
def text_box(txt, x, y, size):
    f = ImageFont.truetype(FONT_SILK, 100)
    l, t, r, b = f.getbbox(txt)
    wmm = (r - l) / (b - t) * size
    return box(x - wmm / 2, y - size / 2, x + wmm / 2, y + size / 2)

silk_txt_ok = []
for c in comps:
    offs = [(0, 1.6), (0, -1.6), (1.9, 0), (-1.9, 0), (0, 2.2), (0, -2.2)]
    if c["tip"] == "qfp":
        offs = [(-7.2, 7.6)]
    if c["tip"] == "soic":
        offs = [(0, c["n"] // 2 * 0.635 + 1.4), (0, -(c["n"] // 2 * 0.635 + 1.4)), (4.2, 0)]
    if c["tip"] == "elko":
        offs = [(0, 4.3), (0, -4.3)]
    if c["tip"] in ("xtal", "led0805"):
        offs = [(-2.2, 2.2), (2.2, -2.2), (0, 2.8)]
    for ox, oy in offs:
        tb = text_box(c["ad"], c["x"] + ox, c["y"] + oy, 0.8)
        if not tb.intersects(silk_occ) and not tb.intersects(body_keep):
            silk_txt_ok.append((c["ad"], c["x"] + ox, c["y"] + oy, 0.8, 0)); silk_occ = silk_occ.union(tb.buffer(0.15)); break
for tt in silk_txt:
    tb = text_box(tt[0], tt[1], tt[2], tt[3])
    if not tb.intersects(silk_occ):
        silk_txt_ok.append(tt); silk_occ = silk_occ.union(tb.buffer(0.15))
for tt in [("DT-1  REV A", 30.0, 25.5, 1.3, 0), ("2611", -38.0, -26.0, 1.0, 0), ("+5V", -30.0, 2.0, 0.9, 0), ("GND", 33.0, 4.0, 0.9, 0)]:
    tb = text_box(tt[0], tt[1], tt[2], tt[3])
    if not tb.intersects(pads_u.buffer(0.2)):
        silk_txt_ok.append(tt)
# polarite isaretleri
silk_geo.append((LineString([(-25.0, -15.6), (-23.6, -15.6)]), 0.15))

# ---------------- rasterlestirme ----------------
PW, PH = int(W * S), int(H * S)
def tp(x, y, s=S):
    return ((x + W / 2) * s, (H / 2 - y) * s)

def draw_geom(dr, g, fill, s=S):
    if g.is_empty:
        return
    if g.geom_type in ("Polygon",):
        dr.polygon([tp(*q, s) for q in g.exterior.coords], fill=fill)
        for it in g.interiors:
            dr.polygon([tp(*q, s) for q in it.coords], fill=0)
    elif g.geom_type in ("MultiPolygon", "GeometryCollection"):
        for gg in g.geoms:
            draw_geom(dr, gg, fill, s)

def draw_line(dr, ln, w, fill, s=S):
    c = [tp(*q, s) for q in ln.coords]
    dr.line(c, fill=fill, width=max(1, int(round(w * s))), joint="curve")
    r = w * s / 2
    for q in (c[0], c[-1]):
        dr.ellipse([q[0] - r, q[1] - r, q[0] + r, q[1] + r], fill=fill)

cu = Image.new("L", (PW, PH), 0); dcu = ImageDraw.Draw(cu)
tr = Image.new("L", (PW, PH), 0); dtr = ImageDraw.Draw(tr)
au = Image.new("L", (PW, PH), 0); dau = ImageDraw.Draw(au)
sk = Image.new("L", (PW, PH), 0); dsk = ImageDraw.Draw(sk)
ho = Image.new("L", (PW, PH), 0); dho = ImageDraw.Draw(ho)
draw_geom(dcu, pour, 255)
# dokme bakirin kendi yollari: ayni dokme bolgesi akim darbesi almaz
for t in traces:
    draw_line(dcu, t["line"], t["w"], 255); draw_line(dtr, t["line"], t["w"], 255)
for p in pads:
    draw_geom(dcu, p, 255); draw_geom(dau, p, 255)
for (x, y, r, hr, acik) in vias:
    X, Y = tp(x, y); R = r * S; HR = hr * S
    dcu.ellipse([X - R, Y - R, X + R, Y + R], fill=255)
    if acik:
        dau.ellipse([X - R, Y - R, X + R, Y + R], fill=255)
        dho.ellipse([X - HR, Y - HR, X + HR, Y + HR], fill=255)
    else:
        dho.ellipse([X - HR, Y - HR, X + HR, Y + HR], fill=110)
for hx, hy in holes_big:
    X, Y = tp(hx, hy)
    dau.ellipse([X - 2.6 * S, Y - 2.6 * S, X + 2.6 * S, Y + 2.6 * S], fill=255)
    dcu.ellipse([X - 2.6 * S, Y - 2.6 * S, X + 2.6 * S, Y + 2.6 * S], fill=255)
    dho.ellipse([X - 1.6 * S, Y - 1.6 * S, X + 1.6 * S, Y + 1.6 * S], fill=255)
    dau.ellipse([X - 1.6 * S, Y - 1.6 * S, X + 1.6 * S, Y + 1.6 * S], fill=0)
for g, w in silk_geo:
    if g.geom_type in ("LineString", "LinearRing"):
        draw_line(dsk, LineString(g.coords), w, 255)
    else:
        draw_geom(dsk, g, 255)
for (txt, x, y, size, a) in silk_txt_ok:
    f = ImageFont.truetype(FONT_SILK, int(size * S * 1.35))
    X, Y = tp(x, y)
    dsk.text((X, Y), txt, font=f, fill=255, anchor="mm")
# serigrafi pad uzerine basilmaz
skn = np.array(sk); skn[np.array(au.filter(ImageFilter.MaxFilter(9))) > 0] = 0
# basi dokusu: kucuk kopukluklar
noise = np.random.rand(PH // 4 + 1, PW // 4 + 1)
noise = np.array(Image.fromarray((noise * 255).astype(np.uint8)).resize((PW, PH), Image.BILINEAR)) / 255.0
skn = (skn * np.clip(0.75 + 0.5 * noise, 0, 1)).astype(np.uint8)
cun = np.array(cu)
hgt = np.array(Image.fromarray(cun).filter(ImageFilter.GaussianBlur(2.2)))
Image.merge("RGB", (Image.fromarray(cun), au, Image.fromarray(skn))).save(os.path.join(OUT, "kart_maske.png"), optimize=False, compress_level=1)
Image.merge("RGB", (ho, tr, Image.fromarray(hgt))).save(os.path.join(OUT, "kart_detay.png"), compress_level=1)

# varis haritasi (16 bit, 0..8 sn), yollarin cevresine tasirilmis
AW, AH = int(W * SA), int(H * SA)
ar = Image.new("I", (AW, AH), 65535); dar = ImageDraw.Draw(ar)
for t in sorted(traces, key=lambda t: -t["t0"]):
    ln = t["line"]; L = ln.length; n = max(2, int(L / 0.15))
    for i in range(n):
        s0 = L * i / n; s1 = L * (i + 1) / n
        p0 = ln.interpolate(s0); p1 = ln.interpolate(s1)
        tv = t["t0"] + s0 / t["v"]
        val = int(np.clip(tv / 8.0, 0, 1) * 65534)
        dar.line([tp(p0.x, p0.y, SA), tp(p1.x, p1.y, SA)], fill=val, width=int((t["w"] + 0.5) * SA))
for (x, y, r, hr, acik) in vias:
    pass
arn = np.array(ar).astype(np.uint16)
Image.fromarray(arn).save(os.path.join(OUT, "varis.png"))

# cip ust yazisi (10x10 mm, 2048 px) - lazer markalama maskesi
CS = 2048
chip = Image.new("L", (CS, CS), 0); dc = ImageDraw.Draw(chip)
def fit(txt, wmax, hmax, fontp):
    sz = int(hmax)
    while True:
        f = ImageFont.truetype(fontp, sz)
        l, t, r, b = f.getbbox(txt)
        if r - l <= wmax or sz < 10:
            return f
        sz -= 4
f1 = fit("Devre Teorisi I", CS * 0.86, CS * 0.155, FONT)
dc.text((CS / 2, CS * 0.42), "Devre Teorisi I", font=f1, fill=255, anchor="mm")
f2 = fit("Öğr. Gör. Nuray SAĞLAM", CS * 0.80, CS * 0.075, FONT)
dc.text((CS / 2, CS * 0.585), "Öğr. Gör. Nuray SAĞLAM", font=f2, fill=255, anchor="mm")
f3 = ImageFont.truetype(FONT, int(CS * 0.045))
dc.text((CS * 0.5, CS * 0.80), "DT1-2611  REV A", font=f3, fill=200, anchor="mm")
chip.save(os.path.join(OUT, "cip_yazi.png"))
def mark(txt, name):
    im = Image.new("L", (1024, 512), 0); d = ImageDraw.Draw(im)
    f = fit(txt, 900, 200, FONT)
    d.text((512, 256), txt, font=f, fill=230, anchor="mm"); im.save(os.path.join(OUT, name))
mark("NS 2611", "u2_yazi.png"); mark("DT1 0A21", "u3_yazi.png")

json.dump(dict(W=W, H=H, comps=comps, holes=holes_big), open(os.path.join(OUT, "yerlesim.json"), "w"), ensure_ascii=False, indent=1)
print("tamam", PW, PH, "pad", len(pads), "via", len(vias), "serigrafi", len(silk_txt_ok))
