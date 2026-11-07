"""Örnek Short: Kondansatör neden anında dolmaz? (RC şarj)"""
import math
import sys

import numpy as np

sys.path.insert(0, __file__.rsplit("/", 2)[0] + "/motor")
from shortsmotor import *  # noqa

# ---- fizik değerleri (doğrulanmış: tau = R*C = 10e3 * 100e-6 = 1.0 s)
V, R, C = 9.0, 10e3, 100e-6
TAU = R * C
vc = lambda ts: V * (1 - np.exp(-ts / TAU))
ic = lambda ts: V / R * np.exp(-ts / TAU)

T_CLOSE = 5.0          # anahtar kapanır
T_START = 5.3          # şarj başlar
T_FULL = 17.3          # 5τ'ya ulaşılır
SCALE = (T_FULL - T_START) / (5 * TAU)   # video saniyesi / gerçek saniye


def tsim(t):
    return clamp((t - T_START) / SCALE, 0, 5 * TAU)


# ---- devre yerleşimi
XL, XR, YT, YB = 190, 860, 1450, 1100
YM = (YT + YB) / 2
BAT_TOP, BAT_BOT = YM + 33, YM - 33
CAP_TOP, CAP_BOT = YM + 17, YM - 17

loop = Path([(XL, BAT_TOP), (XL, YT), (XR, YT), (XR, CAP_TOP), (XR, CAP_BOT),
             (XR, YB), (XL, YB), (XL, BAT_BOT)], closed=True)
SKIP = [(loop.cum[3], loop.cum[4]), (loop.cum[7], loop.cum[8])]  # kondansatör aralığı, pil içi

WIRES = [
    [(XL, BAT_TOP), (XL, YT), (260, YT)],
    [(380, YT), (530, YT)],
    [(710, YT), (XR, YT), (XR, CAP_TOP)],
    [(XR, CAP_BOT), (XR, YB), (XL, YB), (XL, BAT_BOT)],
]

v = Video(duration=30.0)
v.sfx(2.45, "whoosh")
v.sfx(T_CLOSE, "click")
v.sfx(T_FULL, "ding")
for k, tt in enumerate((19.2, 20.6, 22.0, 23.4)):
    v.sfx(tt, "pop")
v.sfx(26.0, "whoosh")


# ---- 1) kanca başlık (0 → 30 sn, 2.5'te yukarı kayar)
def title(ax, t, p):
    m = ease_in_out(seg(t, 2.5, 3.1))
    size = 80 + (46 - 80) * m
    y1 = 1170 + (1690 - 1170) * m
    gap = size * 1.39 * 1.2
    a = ease_out(seg(t, 0, 0.4))
    if t < 2.5:  # hafif zıplama
        size *= 1 + 0.04 * math.sin(t * 5)
    text(ax, W / 2, y1, "Kondansatör neden", size=size, weight="display", alpha=a)
    text(ax, W / 2, y1 - gap, "ANINDA dolmaz?", size=size, weight="display",
         color=THEME["accent"], alpha=a)


v.add(0, 30, title)


# ---- 2) devre
def circuit(ax, t, p):
    ta = t + 3.0  # mutlak zaman
    a = 1.0 - 0.75 * seg(ta, 18.0, 18.5) * (1 - seg(ta, 30, 31))
    draw = ease_in_out(seg(ta, 3.0, 4.6))
    comp = ease_out(seg(ta, 3.6, 4.4)) * a
    for wpts in WIRES:
        wire(ax, wpts, p=draw, alpha=a)
    ts = tsim(ta)
    battery(ax, XL, YM, alpha=comp, label="9 V")
    switch(ax, 320, YT, closed=seg(ta, T_CLOSE, T_CLOSE + 0.25), alpha=comp)
    resistor(ax, 620, YT, alpha=comp, label="R = 10 kΩ", label_side=-1)
    capacitor(ax, XR, YM, alpha=comp, label="100 µF", label_side=-1, charge=vc(ts) / V)

    # hareketli yükler: hız ∝ akım (üstel azalır)
    tau_v = TAU * SCALE
    tv = max(0.0, ta - T_START)
    offset = 520 * tau_v * (1 - math.exp(-tv / tau_v))
    q_alpha = (0.45 + 0.55 * seg(ta, T_START, T_START + 0.3)) * ease_out(seg(ta, 4.4, 4.9)) * a
    charges_on_path(ax, loop, offset, n=22, skip=SKIP, alpha=q_alpha)



v.add(3.0, 30, circuit)


# ---- 3) altyazılar
CAPS = [
    (3.2, 5.1, "Pil  •  Direnç  •  Kondansatör", THEME["text"]),
    (5.1, 9.6, "Anahtar kapandı → akım EN YÜKSEK", THEME["current"]),
    (9.6, 13.6, "Doldukça akım azalıyor", THEME["current"]),
    (13.6, 18.1, "Gerilim yavaşça 9 V'a yaklaşıyor", THEME["accent"]),
]


def captions(ax, t, p):
    for a0, a1, s, col in CAPS:
        al = fade(t, a0, a1, 0.3)
        if al > 0:
            dy = 18 * (1 - ease_out(seg(t, a0, a0 + 0.3)))
            text(ax, W / 2, 1000 - dy, s, size=40, color=col, weight="display", alpha=al)


v.add(0, 30, captions)

# ---- 4) grafik
plot = Plot(x0=240, y0=545, x1=875, y1=845, xlim=(0, 5), ylim=(0, 10),
            xlabel="zaman →", ylabel="",
            xticks=[(k, f"{k}τ") for k in range(1, 6)], yticks=[(9, "9 V")])


def graph(ax, t, p):
    ta = t + 4.6
    a = ease_out(seg(ta, 4.6, 5.1)) * (1.0 - 0.75 * seg(ta, 18.0, 18.5))
    plot.frame(ax, alpha=a)
    ts = tsim(ta)
    tr = lambda x: f"{x:.2f}".replace(".", ",")
    text(ax, plot.x0 - 40, plot.y1 + 18, f"Gerilim  {tr(vc(ts))} V", size=32, ha="left",
         color=THEME["accent"], weight="display", alpha=a)
    text(ax, plot.x1, plot.y1 + 18, f"Akım  {tr(ic(ts) * 1e3)} mA", size=32, ha="right",
         color=THEME["current"], weight="display", alpha=a)
    if ts > 0:
        plot.curve(ax, vc, ts, alpha=a)
    if ts >= 1 * TAU:
        plot.marker(ax, 1, vc(1), "%63", alpha=a * ease_out(seg(ts, 1, 1.25)), label_dx=-10, label_dy=50)
    if ts >= 4.99 * TAU:
        plot.marker(ax, 5, vc(5), "%99", color=THEME["good"], alpha=a * ease_out(seg(ta, T_FULL, T_FULL + 0.4)),
                    label_dx=-70, label_dy=-50)


v.add(4.6, 30, graph)


# ---- 5) formül kartı (üst katman)
Z = OVER


def formula(ax, t, p):
    ta = t + 18.0
    out = 1 - ease_out(seg(ta, 25.6, 26.0))
    dim(ax, 0.6 * ease_out(seg(ta, 18.0, 18.5)) * out)
    a = ease_out(seg(ta, 18.2, 18.7)) * out
    card(ax, 100, 720, 920, 1430, alpha=a, edge=THEME["accent"], z=Z)
    pill(ax, 510, 1350, "ZAMAN SABİTİ", size=26, alpha=a, z=Z + 2)
    b = lambda t0: ease_out(seg(ta, t0, t0 + 0.35)) * out
    text(ax, 510, 1225, "τ  =  R × C", size=82, weight="display", alpha=b(19.2), zorder=Z + 5)
    text(ax, 510, 1090, "10 kΩ × 100 µF  =  1 saniye", size=40, color=THEME["muted"], alpha=b(20.6), zorder=Z + 5)
    text(ax, 510, 960, "1τ  →  %63 dolu", size=50, color=THEME["current"], weight="display", alpha=b(22.0), zorder=Z + 5)
    text(ax, 510, 840, "5τ  →  ~%99  (dolu sayılır)", size=44, color=THEME["good"], weight="display", alpha=b(23.4), zorder=Z + 5)


v.add(18.0, 26.1, formula)


# ---- 6) kapanış
def outro(ax, t, p):
    ta = t + 25.8
    dim(ax, 0.8 * ease_out(seg(ta, 25.8, 26.3)))
    a = ease_out(seg(ta, 26.1, 26.6))
    card(ax, 100, 820, 920, 1360, alpha=a, edge=THEME["accent"], z=Z)
    text(ax, 510, 1255, "Özetle", size=40, color=THEME["muted"], alpha=a, zorder=Z + 5)
    text(ax, 510, 1155, "Dolması ≈ 5τ sürer", size=54, weight="display", alpha=a, zorder=Z + 5)
    text(ax, 510, 1060, "τ = R × C", size=54, weight="display", color=THEME["accent"], alpha=a, zorder=Z + 5)
    a2 = ease_out(seg(ta, 27.2, 27.7))
    pill(ax, 510, 925, "Kaydet • Takip et", size=32, alpha=a2, z=Z + 2)


v.add(25.8, 30, outro)

if __name__ == "__main__":
    import os
    out = sys.argv[1] if len(sys.argv) > 1 else "kondansator.mp4"
    if os.environ.get("STILLS"):
        for tt in [1.0, 4.0, 7.0, 12.0, 17.8, 24.5, 28.5]:
            v.still(tt, out.replace(".mp4", f"_{tt:04.1f}.png"))
    else:
        v.render(out)
        print("ok", out)
