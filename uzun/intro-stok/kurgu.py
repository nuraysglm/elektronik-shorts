#!/usr/bin/env python3
"""Is emri L (20.11.2026): kanal sahibinin sectigi 4 Canva Pro stok klibinden 6 sn'lik intro.

Ham klipler ve cikan intro DEPOYA GIRMEZ (Canva lisansi). Bu betik yalnizca kurgu tarifidir.
Kullanim: python3 kurgu.py KLIP_KLASORU CIKTI.mp4 [--kare KLASOR]
  KLIP_KLASORU: klip-1.mp4 ... klip-4.mp4 (Drive "Uzun Video Sesleri")
Zamanlama (30 fps, muzik ofseti 0 = seri-muzik-acilis.mp3'un basi; vurus zamanlari olculdu):
  0      - 1,267 klip 1 (havya + anakart; markali entegre izlenip bulaniklastirilir)
  1,267  - 2,567 klip 2 (isikli makro kart)        kesim: muzik 1,277 sn vurusu
  2,567  - 3,500 klip 3 (turkuaz devre grafigi)    kesim: 2,577 sn vurusu
  3,500  - 6,000 klip 4 (parlayan cip)              kesim: 3,495 sn vurusu
     3,6-5,5 arka plan (cip disi) yavasca bulaniklasir ve kararir
     4,17 "Devre Teorisi I" (4,15 sn vurusu), 4,43 "Ogr. Gor. Nuray SAGLAM"
     5,47-6,00 beyaz tahtaya gecis (5,46 sn vurusu) (tahta rengi 249,249,244)
Renk: dort klip ayni gradyan haritasiyla koyu turkuaz-yesil + bakir tonuna getirilir (gri cip dahil).
"""
import sys, subprocess, os
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]
KARE = sys.argv[sys.argv.index('--kare') + 1] if '--kare' in sys.argv else None
W, H, FPS, N = 1920, 1080, 30, 180
TAHTA = np.array([249, 249, 244], np.float32)
FONT = '/usr/share/fonts/truetype/google-fonts/ofl/montserrat/Montserrat[wght].ttf'

# --- gradyan haritasi (parlaklik -> renk) ---
stops = [(0, (2, 10, 11)), (45, (5, 34, 34)), (95, (11, 72, 70)), (140, (22, 112, 104)),
         (180, (70, 128, 110)), (210, (196, 118, 64)), (236, (236, 168, 104)), (255, (255, 226, 186))]
xs = np.array([s[0] for s in stops], np.float32)
LUT = np.stack([np.interp(np.arange(256), xs, [s[1][c] for s in stops]) for c in range(3)], 1).astype(np.float32)

def grade(rgb, keep=0.0, gain=1.0, gamma=1.0):
    y = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32)
    y = np.clip(255 * (np.clip(y * gain, 0, 255) / 255) ** gamma, 0, 255).astype(np.uint8)
    g = LUT[y]
    if keep > 0:
        g = g * (1 - keep) + rgb.astype(np.float32) * keep
    return g

def frames(path, start, count, step=1):
    cap = cv2.VideoCapture(path); cap.set(cv2.CAP_PROP_POS_MSEC, start * 1000)
    out = []
    while len(out) < count:
        ok, f = cap.read()
        if not ok: break
        out.append(f)
        for _ in range(step - 1): cap.read()
    return out

def zoom(img, s, cx=0.5, cy=0.5):
    h, w = img.shape[:2]; cw, ch = w / s, h / s
    x0 = min(max(cx * w - cw / 2, 0), w - cw); y0 = min(max(cy * h - ch / 2, 0), h - ch)
    M = np.float32([[s, 0, -x0 * s], [0, s, -y0 * s]])
    return cv2.warpAffine(img, M, (w, h), flags=cv2.INTER_LANCZOS4)

ease = lambda x: 0 if x <= 0 else 1 if x >= 1 else x * x * (3 - 2 * x)

# --- klip 1: markali entegreyi izle ve bulaniklastir ---
c1 = frames(f'{SRC}/klip-1.mp4', 1.40, 38)
ref = frames(f'{SRC}/klip-1.mp4', 2.50, 1)[0]
tpl = ref[345:475, 1180:1365]
def gizle(f):
    # entegrenin ustundeki marka logosu ve yazilari: acik renkli izleri maskeleyip inpaint (duz siyah govde kalir)
    r = cv2.matchTemplate(f, tpl, cv2.TM_CCOEFF_NORMED); _, _, _, (x, y) = cv2.minMaxLoc(r)
    x0, y0, x1, y1 = x + 48, y + 6, x + 160, y + 100
    roi = f[y0:y1, x0:x1]; g = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    m = (g > np.percentile(g, 35) + 18).astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((5, 5), np.uint8))
    clean = cv2.inpaint(roi, m, 6, cv2.INPAINT_TELEA)
    clean = cv2.GaussianBlur(clean, (0, 0), 2.5)
    a = np.zeros(g.shape, np.float32); cv2.rectangle(a, (6, 6), (a.shape[1] - 6, a.shape[0] - 6), 1, -1)
    a = cv2.GaussianBlur(a, (0, 0), 3)[..., None]
    f[y0:y1, x0:x1] = (roi * (1 - a) + clean * a).astype(np.uint8)
    return f
c1 = [gizle(f) for f in c1]
c2 = frames(f'{SRC}/klip-2.mp4', 0.0, 39)
c3 = frames(f'{SRC}/klip-3.mp4', 0.30, 28, step=2)          # 60 fps -> 30 fps
c4 = frames(f'{SRC}/klip-4.mp4', 1.00, 75)

# --- yazi katmani ---
def font(size, wght):
    f = ImageFont.truetype(FONT, size); f.set_variation_by_axes([wght]); return f
def spaced(draw, text, f, track):
    ws = [draw.textlength(ch, font=f) for ch in text]; return sum(ws) + track * (len(text) - 1), ws
def text_layer(text, size, wght, track, color, glow, cy, dy=0, a=1.0):
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay); f = font(size, wght)
    tw, ws = spaced(d, text, f, track); x = (W - tw) / 2; asc, desc = f.getmetrics()
    y = cy - (asc + desc) / 2 + dy
    for ch, w_ in zip(text, ws):
        d.text((x, y), ch, font=f, fill=color + (255,)); x += w_ + track
    g = lay.copy(); g = Image.composite(Image.new('RGBA', (W, H), glow + (255,)), Image.new('RGBA', (W, H), (0, 0, 0, 0)), g.split()[3])
    g = g.filter(ImageFilter.GaussianBlur(size * 0.22))
    out = Image.alpha_composite(g, lay)
    arr = np.asarray(out).astype(np.float32); arr[..., 3] *= a
    return arr

def comp(base, lay):
    a = lay[..., 3:4] / 255.0
    return base * (1 - a) + lay[..., :3] * a

# cip maskesi (klip 4: cip merkezde ~300 px kare)
mask = np.zeros((H, W), np.float32); cv2.rectangle(mask, (790, 370), (1130, 710), 1, -1)
mask = cv2.GaussianBlur(mask, (0, 0), 40)[..., None]
yy, xx = np.mgrid[0:H, 0:W]
PLATE = np.exp(-(((xx - W / 2) / 560) ** 2 + ((yy - 575) / 150) ** 2) ** 1.5)[..., None].astype(np.float32)

enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', str(FPS),
                        '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', OUT],
                       stdin=subprocess.PIPE)
T_TITLE, T_SUB, T_WH = 125, 133, 164
for n in range(N):
    t = n / FPS
    if n < 38:
        f = cv2.cvtColor(c1[n], cv2.COLOR_BGR2RGB); f = zoom(f, 1.10 + 0.05 * n / 37, 0.62, 0.40)
        img = grade(f, keep=0.12, gain=1.05)
    elif n < 77:
        k = n - 38; f = cv2.cvtColor(c2[k], cv2.COLOR_BGR2RGB); f = zoom(f, 1.04 + 0.04 * k / 38, 0.45, 0.45)
        img = grade(f, keep=0.15, gain=1.25, gamma=0.9)
    elif n < 105:
        k = n - 77; f = cv2.cvtColor(c3[k], cv2.COLOR_BGR2RGB)
        f = cv2.resize(f[0:720, 0:1280], (W, H), interpolation=cv2.INTER_LANCZOS4)
        img = grade(f, keep=0.10, gain=1.15)
    else:
        k = n - 105; f = cv2.cvtColor(c4[k], cv2.COLOR_BGR2RGB); f = zoom(f, 1.0 + 0.10 * ease(k / 74))
        img = grade(f, gain=0.95, gamma=1.1)
        b = ease((t - 3.6) / 1.9)                        # arka plan bulaniklasir + kararir
        if b > 0:
            bl = cv2.GaussianBlur(img, (0, 0), 1 + 13 * b)
            bg = bl * (1 - 0.45 * b)
            pulse = 1 + 0.25 * ease((t - 4.05) / 0.25) * (1 - 0.6 * ease((t - 4.6) / 0.6))   # cip parlar
            img = bg * (1 - mask) + np.clip(img * pulse, 0, 255) * mask
            vig = (np.linspace(-1, 1, W)[None, :] ** 2 * 0.6 + np.linspace(-1, 1, H)[:, None] ** 2 * 0.6)
            img = img * (1 - 0.35 * b * np.clip(vig, 0, 1))[..., None]
        if n >= T_TITLE - 6:                             # yazilarin arkasinda yumusak koyu alan (okunurluk)
            q = ease((n - T_TITLE + 6) / 14)
            img = img * (1 - 0.55 * q * PLATE)
        if n >= T_TITLE:
            p = ease((n - T_TITLE) / 12)
            img = comp(img, text_layer('Devre Teorisi I', 128, 650, 3 + 6 * (1 - p), (250, 242, 230), (214, 132, 72), 515, dy=18 * (1 - p), a=p))
            line = ease((n - T_TITLE - 4) / 12)
            if line > 0:
                L = int(300 * line); cv2.line(img, (W // 2 - L // 2, 592), (W // 2 + L // 2, 592), (222, 150, 92), 2, cv2.LINE_AA)
        if n >= T_SUB:
            p = ease((n - T_SUB) / 12)
            img = comp(img, text_layer('Öğr. Gör. Nuray SAĞLAM', 50, 520, 5, (242, 190, 138), (60, 30, 10), 650, dy=12 * (1 - p), a=p))
    if n >= T_WH:                                        # beyaz tahtaya gecis
        w = ease((n - T_WH) / (N - 1 - T_WH))
        img = cv2.GaussianBlur(img.astype(np.float32), (0, 0), 1 + 20 * w) * (1 - w) + TAHTA * w
    img = np.clip(img, 0, 255).astype(np.uint8)
    if KARE and n in (20, 60, 90, 150, 170):
        Image.fromarray(img).save(f'{KARE}/n{n:03d}.png')
    enc.stdin.write(img.tobytes())
enc.stdin.close(); enc.wait()
print('tamam', OUT)
