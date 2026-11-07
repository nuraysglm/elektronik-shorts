"""
shortsmotor.py — Elektronik ders Shorts'ları için kodla animasyon motoru.

1080x1920 (9:16), 30 fps, H.264 + AAC. Bağımlılık: numpy, matplotlib, ffmpeg.

Koordinat sistemi: piksel, sol-alt (0,0), sağ-üst (1080,1920).
YouTube Shorts güvenli alanı: x 60..940, y 380..1700
(altta açıklama/butonlar, sağda beğen/yorum butonları üst üste biner).

Kullanım (özet):
    from shortsmotor import *
    v = Video(duration=30)
    v.add(0, 30, lambda ax, t, p: ...)   # sahne: t = sahne içi saniye, p = 0..1
    v.sfx(5.0, "click")
    v.render("cikti.mp4")
"""
from __future__ import annotations

import math
import os
import subprocess
import wave
from dataclasses import dataclass, field
from typing import Callable, List, Sequence, Tuple

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, Circle, Polygon, Rectangle

W, H, FPS = 1080, 1920, 30
SAFE = dict(x0=60, x1=940, y0=380, y1=1700)

# ---------------------------------------------------------------- tema
THEME = dict(
    bg="#0A0F1E",
    bg2="#111831",
    grid="#1C2546",
    wire="#9FB3D9",
    text="#F4F7FF",
    muted="#8C9AC0",
    accent="#22D3EE",   # camgöbeği
    current="#FACC15",  # akım / elektron
    plus="#F87171",
    minus="#60A5FA",
    good="#4ADE80",
    card="#141C38",
)

# ---------------------------------------------------------------- yazı tipi
def _load_fonts():
    fams = {}
    for path, key in [
        ("/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf", "display"),
        ("/usr/share/fonts/opentype/inter/Inter-SemiBold.otf", "semibold"),
        ("/usr/share/fonts/opentype/inter/Inter-Medium.otf", "medium"),
        ("/usr/share/fonts/opentype/inter/Inter-Regular.otf", "regular"),
    ]:
        if os.path.exists(path):
            font_manager.fontManager.addfont(path)
            fams[key] = font_manager.FontProperties(fname=path)
    fallback = font_manager.FontProperties(family="DejaVu Sans")
    for k in ("display", "semibold", "medium", "regular"):
        fams.setdefault(k, fallback)
    return fams


FONTS = _load_fonts()
plt.rcParams["mathtext.fontset"] = "dejavusans"

# ---------------------------------------------------------------- yumuşatma
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def ease_out(p):
    p = clamp(p)
    return 1 - (1 - p) ** 3


def ease_in_out(p):
    p = clamp(p)
    return 3 * p * p - 2 * p * p * p


def seg(t, a, b):
    """t'nin [a,b] aralığındaki ilerlemesi (0..1)."""
    if b <= a:
        return 1.0 if t >= b else 0.0
    return clamp((t - a) / (b - a))


def fade(t, t_in, t_out, d=0.35):
    """t_in'de belir, t_out'ta kaybol."""
    return ease_out(seg(t, t_in, t_in + d)) * (1 - ease_out(seg(t, t_out - d, t_out)))


# ---------------------------------------------------------------- yazı
def text(ax, x, y, s, size=48, color=None, alpha=1.0, weight="semibold",
         ha="center", va="center", **kw):
    if alpha <= 0.001:
        return None
    return ax.text(x, y, s, fontsize=size, color=color or THEME["text"], alpha=alpha,
                   fontproperties=FONTS[weight], ha=ha, va=va, zorder=kw.pop("zorder", 20), **kw)


def rich_lines(ax, x, y, lines: Sequence[Tuple[str, dict]], gap=1.25, alpha=1.0):
    """Alt alta satırlar: [(metin, {size, color, weight}), ...] — y ilk satır."""
    cy = y
    for s, st in lines:
        size = st.get("size", 44)
        text(ax, x, cy, s, size=size, color=st.get("color"), weight=st.get("weight", "semibold"),
             alpha=alpha)
        cy -= size * gap * 1.39  # pt -> px yaklaşık (dpi=100)


def card(ax, x0, y0, x1, y1, alpha=1.0, color=None, edge=None, r=36, z=15):
    if alpha <= 0.001:
        return
    ax.add_patch(FancyBboxPatch((x0, y0), x1 - x0, y1 - y0,
                                boxstyle=f"round,pad=0,rounding_size={r}",
                                fc=color or THEME["card"], ec=edge or THEME["grid"], lw=3,
                                alpha=alpha, zorder=z))


def pill(ax, x, y, s, size=30, fg=None, bg=None, alpha=1.0, z=15):
    w = len(s) * size * 0.78 + 60
    h = size * 2.1
    card(ax, x - w / 2, y - h / 2, x + w / 2, y + h / 2, alpha=alpha, color=bg or THEME["accent"],
         edge=bg or THEME["accent"], r=h / 2, z=z)
    text(ax, x, y, s, size=size, color=fg or THEME["bg"], weight="semibold", alpha=alpha, zorder=z + 1)


# ---------------------------------------------------------------- yol / tel
class Path:
    """Köşe noktalarından oluşan kırık çizgi; uzunluk boyunca konum hesaplar."""

    def __init__(self, pts, closed=False):
        pts = list(pts)
        if closed:
            pts.append(pts[0])
        self.pts = np.array(pts, dtype=float)
        d = np.diff(self.pts, axis=0)
        self.seglen = np.hypot(d[:, 0], d[:, 1])
        self.cum = np.concatenate([[0], np.cumsum(self.seglen)])
        self.length = self.cum[-1]

    def at(self, s):
        s = s % self.length
        i = int(np.searchsorted(self.cum, s, side="right") - 1)
        i = min(i, len(self.seglen) - 1)
        f = (s - self.cum[i]) / max(self.seglen[i], 1e-9)
        return self.pts[i] + f * (self.pts[i + 1] - self.pts[i])

    def partial(self, p):
        """Yolun ilk p kesri (çizilme animasyonu için)."""
        s_end = clamp(p) * self.length
        out = [self.pts[0]]
        for i in range(len(self.seglen)):
            if self.cum[i + 1] <= s_end:
                out.append(self.pts[i + 1])
            else:
                out.append(self.at(s_end))
                break
        return np.array(out)


def wire(ax, pts, p=1.0, color=None, lw=7, alpha=1.0, z=5):
    if p <= 0 or alpha <= 0:
        return
    path = pts if isinstance(pts, Path) else Path(pts)
    xy = path.partial(p)
    ax.plot(xy[:, 0], xy[:, 1], color=color or THEME["wire"], lw=lw, alpha=alpha,
            solid_capstyle="round", solid_joinstyle="round", zorder=z)


def charges_on_path(ax, path: Path, offset, n=18, skip=(), color=None, r=9, alpha=1.0):
    """Yol boyunca eşit aralıklı hareketli yük noktaları. skip: [(s0,s1), ...] gizli bölgeler."""
    if alpha <= 0:
        return
    step = path.length / n
    for k in range(n):
        s = (k * step + offset) % path.length
        if any(a <= s <= b for a, b in skip):
            continue
        x, y = path.at(s)
        ax.add_patch(Circle((x, y), r, fc=color or THEME["current"], ec="none", alpha=alpha, zorder=12))
        ax.add_patch(Circle((x, y), r * 2.2, fc=color or THEME["current"], ec="none",
                            alpha=alpha * 0.18, zorder=11))


# ---------------------------------------------------------------- devre sembolleri
# Hepsi (x, y) merkezli; orient "h" (yatay) veya "v" (dikey). Bacak uçlarını döndürür.
def _rot(pts, orient):
    pts = np.asarray(pts, float)
    return pts if orient == "h" else pts[:, ::-1]


def resistor(ax, x, y, length=180, orient="h", alpha=1.0, color=None, label=None, label_side=1):
    c = color or THEME["text"]
    n, amp = 6, 26
    xs = np.linspace(-length / 2, length / 2, 2 * n + 1)
    ys = [0] + [amp * (1 if i % 2 else -1) for i in range(1, 2 * n)] + [0]
    pts = _rot(np.c_[xs, ys], orient) + [x, y]
    ax.plot(pts[:, 0], pts[:, 1], color=c, lw=7, alpha=alpha, solid_joinstyle="round", zorder=8)
    if label:
        if orient == "h":
            text(ax, x, y + label_side * 75, label, size=34, color=THEME["muted"], alpha=alpha)
        else:
            text(ax, x + label_side * 110, y, label, size=34, color=THEME["muted"], alpha=alpha)
    a, b = _rot([[-length / 2, 0], [length / 2, 0]], orient) + [x, y]
    return tuple(a), tuple(b)


def capacitor(ax, x, y, gap=34, plate=120, orient="v", alpha=1.0, label=None,
              charge=0.0, nmax=6, label_side=1):
    """orient='v': akım dikey yönde geçer, plakalar yatay. charge 0..1 -> +/- işaretleri."""
    c = THEME["text"]
    p1 = _rot([[-gap / 2, -plate / 2], [-gap / 2, plate / 2]], "h" if orient == "v" else "v")
    # plakaları doğrudan kur (okunaklılık için)
    if orient == "v":
        top = [[x - plate / 2, y + gap / 2], [x + plate / 2, y + gap / 2]]
        bot = [[x - plate / 2, y - gap / 2], [x + plate / 2, y - gap / 2]]
        ends = ((x, y + gap / 2), (x, y - gap / 2))
    else:
        top = [[x - gap / 2, y - plate / 2], [x - gap / 2, y + plate / 2]]
        bot = [[x + gap / 2, y - plate / 2], [x + gap / 2, y + plate / 2]]
        ends = ((x - gap / 2, y), (x + gap / 2, y))
    for pl, col in ((top, THEME["plus"]), (bot, THEME["minus"])):
        pl = np.array(pl)
        glow = charge * 0.9
        ax.plot(pl[:, 0], pl[:, 1], color=c, lw=10, alpha=alpha, solid_capstyle="butt", zorder=8)
        if glow > 0.02:
            ax.plot(pl[:, 0], pl[:, 1], color=col, lw=22, alpha=alpha * glow * 0.35,
                    solid_capstyle="butt", zorder=7)
    k = int(round(clamp(charge) * nmax))
    if orient == "v" and k:
        xs = np.linspace(x - plate / 2 + 12, x + plate / 2 - 12, nmax)[:k]
        for xx in xs:
            text(ax, xx, y + gap / 2 + 26, "+", size=24, color=THEME["plus"], weight="display", alpha=alpha)
            text(ax, xx, y - gap / 2 - 28, "−", size=24, color=THEME["minus"], weight="display", alpha=alpha)
    if label:
        if orient == "v":
            text(ax, x + label_side * (plate / 2 + 95), y, label, size=34, color=THEME["muted"], alpha=alpha)
        else:
            text(ax, x, y + label_side * (plate / 2 + 50), label, size=34, color=THEME["muted"], alpha=alpha)
    return ends


def battery(ax, x, y, orient="v", alpha=1.0, label=None, label_side=-1, cells=2):
    """orient='v': + üstte. Uzun çizgi = +."""
    c = THEME["text"]
    gap, long_, short_ = 22, 110, 56
    total = (2 * cells - 1) * gap
    start = y + total / 2
    for i in range(2 * cells):
        yy = start - i * gap
        L = long_ if i % 2 == 0 else short_
        lw = 7 if i % 2 == 0 else 12
        if orient == "v":
            ax.plot([x - L / 2, x + L / 2], [yy, yy], color=c, lw=lw, alpha=alpha, solid_capstyle="butt", zorder=8)
        else:
            ax.plot([x + (yy - y), x + (yy - y)], [y - L / 2, y + L / 2], color=c, lw=lw, alpha=alpha, zorder=8)
    if orient == "v":
        text(ax, x + 75, start + 18, "+", size=34, color=THEME["plus"], weight="display", alpha=alpha)
        if label:
            text(ax, x + label_side * 105, y, label, size=36, color=THEME["muted"], alpha=alpha)
        return (x, start), (x, start - (2 * cells - 1) * gap)
    return (x - total / 2, y), (x + total / 2, y)


def switch(ax, x, y, length=120, closed=0.0, orient="h", alpha=1.0, label=None):
    """closed 0..1 (animasyonlu kapanma). Sol bacak sabit, kol dönerek kapanır."""
    c = THEME["text"]
    a = np.array([x - length / 2, y])
    b = np.array([x + length / 2, y])
    ang = math.radians(32 * (1 - ease_in_out(closed)))
    tip = a + length * np.array([math.cos(ang), math.sin(ang)])
    for pt in (a, b):
        ax.add_patch(Circle(pt, 11, fc=THEME["bg"], ec=c, lw=5, alpha=alpha, zorder=9))
    ax.plot([a[0], tip[0]], [a[1], tip[1]], color=c, lw=7, alpha=alpha, solid_capstyle="round", zorder=9)
    if label:
        text(ax, x, y + 70, label, size=30, color=THEME["muted"], alpha=alpha)
    return tuple(a), tuple(b)


def led(ax, x, y, orient="v", alpha=1.0, on=0.0, color="#F87171"):
    """Diyot üçgeni + çubuk; on 0..1 parıltı."""
    c = THEME["text"]
    s = 44
    tri = np.array([[-s, s * 0.9], [s, s * 0.9], [0, -s * 0.8]]) + [x, y]
    if on > 0.02:
        ax.add_patch(Circle((x, y), 120, fc=color, ec="none", alpha=alpha * on * 0.25, zorder=6))
    ax.add_patch(Polygon(tri, closed=True, fc=color if on > 0.5 else THEME["bg"], ec=c, lw=5,
                         alpha=alpha, zorder=8))
    ax.plot([x - s, x + s], [y - s * 0.8, y - s * 0.8], color=c, lw=7, alpha=alpha, zorder=8)
    return (x, y + s * 0.9), (x, y - s * 0.8)


def ground(ax, x, y, alpha=1.0):
    c = THEME["text"]
    for i, w in enumerate((70, 46, 22)):
        ax.plot([x - w / 2, x + w / 2], [y - i * 16, y - i * 16], color=c, lw=6, alpha=alpha, zorder=8)
    return (x, y)


# ---------------------------------------------------------------- grafik paneli
@dataclass
class Plot:
    x0: float
    y0: float
    x1: float
    y1: float
    xlim: Tuple[float, float]
    ylim: Tuple[float, float]
    xlabel: str = ""
    ylabel: str = ""
    xticks: Sequence[Tuple[float, str]] = ()
    yticks: Sequence[Tuple[float, str]] = ()

    def X(self, v):
        return self.x0 + (np.asarray(v) - self.xlim[0]) / (self.xlim[1] - self.xlim[0]) * (self.x1 - self.x0)

    def Y(self, v):
        return self.y0 + (np.asarray(v) - self.ylim[0]) / (self.ylim[1] - self.ylim[0]) * (self.y1 - self.y0)

    def frame(self, ax, alpha=1.0):
        if alpha <= 0:
            return
        card(ax, self.x0 - 95, self.y0 - 95, self.x1 + 40, self.y1 + 60, alpha=alpha * 0.9)
        ax.plot([self.x0, self.x1], [self.y0, self.y0], color=THEME["muted"], lw=4, alpha=alpha, zorder=16)
        ax.plot([self.x0, self.x0], [self.y0, self.y1], color=THEME["muted"], lw=4, alpha=alpha, zorder=16)
        for v, s in self.yticks:
            yy = self.Y(v)
            ax.plot([self.x0, self.x1], [yy, yy], color=THEME["grid"], lw=2, alpha=alpha, zorder=16)
            text(ax, self.x0 - 20, yy, s, size=24, color=THEME["muted"], ha="right", alpha=alpha)
        for v, s in self.xticks:
            xx = self.X(v)
            ax.plot([xx, xx], [self.y0, self.y1], color=THEME["grid"], lw=2, alpha=alpha, zorder=16)
            text(ax, xx, self.y0 - 35, s, size=24, color=THEME["muted"], alpha=alpha)
        if self.xlabel:
            text(ax, self.x1, self.y0 - 72, self.xlabel, size=26, color=THEME["muted"], ha="right", alpha=alpha)
        if self.ylabel:
            text(ax, self.x0, self.y1 + 32, self.ylabel, size=28, color=THEME["text"], ha="left", alpha=alpha)

    def curve(self, ax, f: Callable, upto, color=None, lw=8, alpha=1.0, n=300, dot=True):
        """f(x) eğrisini xlim[0]..upto arasında çiz; uçta parlayan nokta."""
        if alpha <= 0 or upto <= self.xlim[0]:
            return
        xs = np.linspace(self.xlim[0], upto, n)
        ys = f(xs)
        col = color or THEME["accent"]
        ax.plot(self.X(xs), self.Y(ys), color=col, lw=lw * 2.4, alpha=alpha * 0.15,
                solid_capstyle="round", zorder=17)
        ax.plot(self.X(xs), self.Y(ys), color=col, lw=lw, alpha=alpha, solid_capstyle="round", zorder=18)
        if dot:
            ax.add_patch(Circle((self.X(xs[-1]), self.Y(ys[-1])), 14, fc=col, ec="white", lw=3,
                                alpha=alpha, zorder=19))

    def marker(self, ax, xv, yv, label, color=None, alpha=1.0, label_dx=0, label_dy=55):
        if alpha <= 0:
            return
        col = color or THEME["current"]
        X, Y = self.X(xv), self.Y(yv)
        ax.plot([X, X], [self.y0, Y], color=col, lw=3, ls=(0, (6, 6)), alpha=alpha, zorder=17)
        ax.plot([self.x0, X], [Y, Y], color=col, lw=3, ls=(0, (6, 6)), alpha=alpha, zorder=17)
        ax.add_patch(Circle((X, Y), 13, fc=col, ec="none", alpha=alpha, zorder=19))
        text(ax, X + label_dx, Y + label_dy, label, size=30, color=col, weight="display", alpha=alpha)


# ---------------------------------------------------------------- arka plan & çerçeve
def background(ax, t, brand="@NuraySaglamBedir", tag="ELEKTRONİK • 30 SN", progress=None):
    ax.add_patch(Rectangle((0, 0), W, H, fc=THEME["bg"], ec="none", zorder=0))
    # breadboard nokta ızgarası, çok yavaş kayar
    off = (t * 6) % 60
    gx = np.arange(-60, W + 60, 60) + off
    gy = np.arange(0, H + 60, 60)
    XX, YY = np.meshgrid(gx, gy)
    ax.scatter(XX.ravel(), YY.ravel(), s=5, c=THEME["grid"], zorder=1, linewidths=0)
    # üst etiket
    pill(ax, W / 2, 1790, tag, size=24, alpha=0.95)
    # kanal adı (güvenli alanın altında, sol)
    text(ax, SAFE["x0"], 415, brand, size=26, color=THEME["muted"], ha="left", weight="medium")
    if progress is not None:
        ax.add_patch(Rectangle((0, 1880), W, 10, fc=THEME["grid"], ec="none", zorder=30))
        ax.add_patch(Rectangle((0, 1880), W * clamp(progress), 10, fc=THEME["accent"], ec="none", zorder=31))


# Katmanlar: arka plan 0-1, devre 5-12, grafik 15-19, yazı 20,
# karartma 35, üst kart (overlay) 40+. Overlay sahnelerinde card(z=OVER), text(zorder=OVER+5).
OVER = 40


def dim(ax, a):
    if a > 0:
        ax.add_patch(Rectangle((0, 0), W, H, fc=THEME["bg"], ec="none", alpha=a, zorder=35))


# ---------------------------------------------------------------- ses
SR = 44100


def _env(n, a=0.005, r=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / max(r, 1e-4))


def synth_sfx(kind):
    if kind == "click":
        n = int(0.08 * SR)
        noise = np.random.default_rng(1).standard_normal(n)
        return 0.5 * noise * _env(n, 0.001, 0.012) + 0.4 * np.sin(2 * np.pi * 1800 * np.arange(n) / SR) * _env(n, 0.001, 0.02)
    if kind == "pop":
        n = int(0.25 * SR)
        t = np.arange(n) / SR
        f = 900 * np.exp(-t * 18) + 300
        return 0.45 * np.sin(2 * np.pi * np.cumsum(f) / SR) * _env(n, 0.002, 0.08)
    if kind == "whoosh":
        n = int(0.6 * SR)
        noise = np.random.default_rng(2).standard_normal(n)
        k = np.hanning(n)
        # basit alçak geçiren
        out = np.convolve(noise, np.ones(40) / 40, mode="same")
        return 0.9 * out * k
    if kind == "ding":
        n = int(1.2 * SR)
        t = np.arange(n) / SR
        return 0.25 * (np.sin(2 * np.pi * 1318.5 * t) + 0.5 * np.sin(2 * np.pi * 1975.5 * t)) * _env(n, 0.002, 0.45)
    raise ValueError(kind)


def music_bed(duration, bpm=100, seed=0):
    """Telifsiz, kodla üretilmiş sakin elektronik altlık (pad + yumuşak ritim)."""
    n = int(duration * SR)
    t = np.arange(n) / SR
    chords = [  # Am - F - C - G (Hz)
        [220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 261.6, 329.6], [196.0, 246.9, 293.7]]
    bar = 4 * 60 / bpm
    out = np.zeros(n)
    for i, ch in enumerate(chords * int(math.ceil(duration / (bar * 4)) + 1)):
        s0 = int(i * bar * SR)
        if s0 >= n:
            break
        s1 = min(n, int((i + 1) * bar * SR) + int(0.3 * SR))
        tt = np.arange(s1 - s0) / SR
        env = np.minimum(1, tt / 0.6) * np.minimum(1, (tt[-1] - tt + 1e-3) / 0.6)
        tone = sum(np.sin(2 * np.pi * f * tt) + 0.5 * np.sin(2 * np.pi * f * 1.003 * tt) for f in ch)
        out[s0:s1] += 0.045 * tone * env
    # yumuşak tekme + hi-hat
    beat = 60 / bpm
    kick = np.sin(2 * np.pi * np.cumsum(60 + 90 * np.exp(-np.arange(int(0.25 * SR)) / SR * 30)) / SR) * _env(int(0.25 * SR), 0.002, 0.09)
    hat = np.random.default_rng(seed).standard_normal(int(0.05 * SR)) * _env(int(0.05 * SR), 0.001, 0.01)
    k = 0
    while k * beat < duration:
        s = int(k * beat * SR)
        e = min(n, s + len(kick))
        out[s:e] += 0.22 * kick[: e - s]
        s2 = int((k + 0.5) * beat * SR)
        e2 = min(n, s2 + len(hat))
        if s2 < n:
            out[s2:e2] += 0.05 * hat[: e2 - s2]
        k += 1
    # giriş/çıkış
    fade_n = int(1.0 * SR)
    out[:fade_n] *= np.linspace(0, 1, fade_n)
    out[-fade_n:] *= np.linspace(1, 0, fade_n)
    return out


def write_wav(path, mono):
    mono = np.clip(mono, -1, 1)
    st = (np.c_[mono, mono] * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(st.tobytes())


# ---------------------------------------------------------------- video
@dataclass
class Scene:
    start: float
    end: float
    fn: Callable


@dataclass
class Video:
    duration: float
    brand: str = "@NuraySaglamBedir"
    tag: str = "ELEKTRONİK • 30 SN"
    music: bool = True
    scenes: List[Scene] = field(default_factory=list)
    effects: List[Tuple[float, str]] = field(default_factory=list)
    voice_wav: str | None = None  # isteğe bağlı seslendirme dosyası

    def add(self, start, end, fn):
        self.scenes.append(Scene(start, end, fn))
        return fn

    def sfx(self, t, kind):
        self.effects.append((t, kind))

    def draw_frame(self, ax, t):
        ax.cla()
        ax.set_xlim(0, W)
        ax.set_ylim(0, H)
        ax.axis("off")
        background(ax, t, self.brand, self.tag, progress=t / self.duration)
        for sc in self.scenes:
            if sc.start <= t < sc.end:
                p = (t - sc.start) / max(sc.end - sc.start, 1e-9)
                sc.fn(ax, t - sc.start, p)

    def _figure(self):
        fig = plt.figure(figsize=(W / 100, H / 100), dpi=100)
        ax = fig.add_axes([0, 0, 1, 1])
        return fig, ax

    def still(self, t, path):
        fig, ax = self._figure()
        self.draw_frame(ax, t)
        fig.savefig(path, dpi=100)
        plt.close(fig)

    def contact_sheet(self, times, path, width=1800):
        """Kontrol için seçili anların kareleri yan yana tek görselde (Read ile bakılır)."""
        tmp = []
        for i, t in enumerate(times):
            f = f"{path}.{i}.png"
            self.still(t, f)
            tmp.append(f)
        args = []
        for f in tmp:
            args += ["-i", f]
        n = len(tmp)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args, "-filter_complex",
                        "".join(f"[{i}]" for i in range(n)) + f"hstack={n},scale={width}:-1", path],
                       check=True)
        for f in tmp:
            os.remove(f)
        return path

    def audio(self, path):
        n = int(self.duration * SR)
        mix = music_bed(self.duration) * (1.0 if self.music else 0.0)
        mix = mix[:n] if len(mix) >= n else np.pad(mix, (0, n - len(mix)))
        for t0, kind in self.effects:
            s = synth_sfx(kind)
            a = int(t0 * SR)
            e = min(n, a + len(s))
            if a < n:
                mix[a:e] += s[: e - a]
        write_wav(path, mix * 0.9)

    def render(self, out_path, workdir=None):
        workdir = workdir or os.path.dirname(os.path.abspath(out_path))
        silent = os.path.join(workdir, "_video.mp4")
        audio = os.path.join(workdir, "_audio.wav")
        fig, ax = self._figure()
        nframes = int(round(self.duration * FPS))
        proc = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgba",
             "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", silent],
            stdin=subprocess.PIPE)
        for i in range(nframes):
            self.draw_frame(ax, i / FPS)
            fig.canvas.draw()
            proc.stdin.write(fig.canvas.buffer_rgba().tobytes())
        proc.stdin.close()
        proc.wait()
        plt.close(fig)
        self.audio(audio)
        inputs = ["-i", silent, "-i", audio]
        if self.voice_wav:
            inputs += ["-i", self.voice_wav]
            filt = "[1:a]volume=0.35[m];[m][2:a]amix=inputs=2:duration=first[a]"
            amap = ["-filter_complex", filt, "-map", "0:v", "-map", "[a]"]
        else:
            amap = ["-map", "0:v", "-map", "1:a"]
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, *amap,
                        "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest",
                        "-movflags", "+faststart", out_path], check=True)
        for f in (silent, audio):
            if os.path.exists(f):
                os.remove(f)
        return out_path
