#!/usr/bin/env python3
"""Is emri L3 (20.11.2026): 8 sn'lik stok intro'yu Ders 1 - Bolum 1'e yerlestirir (UZUN.md 6-S).

Kullanim: python3 birlestir.py ASIL.mp4 INTRO_SESSIZ.mp4 SELAM.mp3 ACILIS.mp3 CIKTI.mp4 [--intro INTRO_MUZIKLI.mp4] [--onizleme ONIZ.mp4]
  ASIL      : media/uzun/devre-teorisi-1-ders-01-bolum-1.mp4 (muzik_f.sh ciktisi; DEGISMEZ)
  INTRO     : kurgu.py ciktisi (240 kare, sessiz)  -- depoya girmez (Canva lisansi)
  ACILIS    : seri-muzik-acilis.mp3 (Drive)       -- depoya girmez
Goruntu (30 fps, kare numaralari):
  0-988 kanca (asil) | 989-1228 intro (8 sn) | 1229-1234 tahta, kartin ilk karesi (0,2 sn)
  1235-1324 intro karti BASTAN, asil videodaki 2x yavas ilk 3 sn yeniden dogal hizda (asil 989..1167 tek kareler)
  1325- asil 1169'dan itibaren (yeni = asil + 156 kare = +5,2 sn)
Ses:
  kanca aynen (konusma 32,81'de biter) -> 32,967'de intro, muzik 0,12 sn sonra tek basina (~-18 LUFS)
  selam: ses/selam.mp3 (asil karisimla esle: kazanc 1,601, konum) 41,468'de (konusma 41,56; gecis sonu 40,967)
  muzik selamda konusmanin ~8 dB altina iner (41,25-41,55); kesintisiz: acilis kesiti 4,174 sn'lik (2 olcu) aralikla
  3 kez ust uste, 0,3 sn esit guclu capraz gecisle (5,98 sn vurusunda); son kopya kendi sonunda (~49,4) biter.
  49,2 sn'den (selam ile ders arasindaki sessizlik) sonrasi asil ses +5,2 sn. Son: alimiter + -16 LUFS kontrolu.
"""
import sys, subprocess, json, os, tempfile
import numpy as np, soundfile as sf

ASIL, INTRO, SELAM, ACILIS, OUT = sys.argv[1:6]
opt = lambda k: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else None
SR, FPS = 48000, 30
I0 = 989 / FPS                     # intro baslangici (kanca sonu)
SHIFT = 156 / FPS                  # 5,2 sn
SELAM_T = 36.26796 + SHIFT         # selam.mp3'un 0 ani (asil karisimdaki konumu + kayma)
SELAM_G = 1.6014
CUT = 49.2                         # bu andan sonra asil ses (kaydirilmis)
M0, LAG, XF = 0.12, 4.1742, 0.30    # muzik ofseti, tekrar araligi, capraz gecis
SOLO_LUFS, DUCK_DB = -18.0, 8.0
tmp = tempfile.mkdtemp()

def wav(src, dst):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-c:a', 'pcm_f32le', dst], check=True)
    return sf.read(dst)[0]
def lufs(x):
    p = f'{tmp}/m.wav'; sf.write(p, x, SR, subtype='FLOAT')
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', p, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(json.loads(r[r.rindex('{'):])['input_i'])
i_ = lambda t: int(round(t * SR))

A = wav(ASIL, f'{tmp}/a.wav'); S = wav(SELAM, f'{tmp}/s.wav'); AC = wav(ACILIS, f'{tmp}/ac.wav')

# --- muzik (birim kazanc, yeni zaman ekseninde) ---
def music(total, t0, copies, end_fade=None):
    m = np.zeros(total)
    xc = 5.98                                             # capraz gecis merkezi (kopya ici zaman, vurus)
    for c in range(copies):
        st = t0 + c * LAG; seg = AC.copy(); tt = np.arange(len(seg)) / SR
        g = np.ones(len(seg))
        if c > 0:                                         # giris: onceki kopyanin xc anina denk
            ci = xc - LAG; g *= np.clip(np.sin(np.pi / 2 * np.clip((tt - (ci - XF / 2)) / XF, 0, 1)), 0, 1)
            g[tt < ci - XF / 2] = 0
        if c < copies - 1:
            g *= np.cos(np.pi / 2 * np.clip((tt - (xc - XF / 2)) / XF, 0, 1)); g[tt > xc + XF / 2] = 0
        a0 = i_(st); n = min(len(seg), total - a0)
        m[a0:a0 + n] += (seg * g)[:n]
    if end_fade:
        f0, f1 = end_fade; t = np.arange(total) / SR
        m *= np.clip((f1 - t) / (f1 - f0), 0, 1)
    return m

# 1) tek basina intro (Drive icin, 8 sn)
N8 = 8 * SR
mi = music(N8, M0, 2, end_fade=(7.55, 8.0))
gs = 10 ** ((SOLO_LUFS - lufs(mi[i_(0.5):i_(7.3)])) / 20)
if opt('--intro'):
    p = f'{tmp}/intro.wav'; sf.write(p, np.clip(mi * gs, -0.95, 0.95), SR, subtype='FLOAT')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', INTRO, '-i', p, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow',
                    '-crf', '22', '-maxrate', '8M', '-bufsize', '8M', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart',
                    '-shortest', opt('--intro')], check=True)

# 2) bolum 1 sesi
total = len(A) + i_(SHIFT)
out = np.zeros(total)
k0 = i_(I0); out[:k0] = A[:k0] * np.clip((I0 - np.arange(k0) / SR) / 0.01, 0, 1)   # kanca (son 10 ms yumusak)
c0 = i_(CUT); out[c0:] = A[c0 - i_(SHIFT):][:total - c0]
s0 = i_(SELAM_T); sp = np.zeros(total); n = min(len(S), c0 - s0); sp[s0:s0 + n] = S[:n] * SELAM_G
out += sp
m = music(total, I0 + M0, 3)
t = np.arange(total) / SR
sp_l = lufs(sp[i_(41.5):i_(48.8)])
gd = 10 ** ((sp_l - DUCK_DB - lufs(m[i_(42.0):i_(47.5)])) / 20)
r = np.clip((t - 41.25) / 0.30, 0, 1)
env = gs * (1 - r) + gd * r
out += m * env
print(f'muzik tek basina kazanc {20*np.log10(gs):.1f} dB, selamda {20*np.log10(gd):.1f} dB; konusma {sp_l:.1f} LUFS')
p = f'{tmp}/bolum.wav'; sf.write(p, out, SR, subtype='FLOAT')

# 3) goruntu + ses
vf = ('[0:v]setpts=PTS-STARTPTS[v1];[1:v]fps=30,setpts=PTS-STARTPTS[v2];[5:v]trim=end_frame=1,setpts=PTS-STARTPTS,loop=loop=5:size=1,setpts=N/30/TB[v3];'
      "[2:v]select='not(mod(n\\,2))',setpts=N/30/TB[v4];[3:v]setpts=PTS-STARTPTS[v5];"
      '[v1][v2][v3][v4][v5]concat=n=5:v=1:a=0,fps=30,format=yuv420p[v];'
      '[4:a]alimiter=limit=0.78:level=disabled:attack=3:release=50[a]')
# ayri girisler (bellek): asil 0-988 | intro | asil 989-1168 | asil 1169-
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-t', '32.95', '-i', ASIL, '-i', INTRO, '-ss', '32.95', '-t', '6.0', '-i', ASIL,
                '-ss', '38.95', '-i', ASIL, '-i', p, '-ss', '32.95', '-t', '0.1', '-i', ASIL, '-filter_complex', vf, '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-r', '30', '-colorspace', 'bt709', '-color_primaries', 'bt709',
                '-color_trc', 'bt709', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', OUT], check=True)
if opt('--onizleme'):                                    # kancanin son ~4 sn'si + intro + selamin ilk ~4 sn'si, 720p
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '29.0', '-t', '16.5', '-i', OUT, '-vf', 'scale=1280:720', '-c:v', 'libx264',
                    '-preset', 'slow', '-crf', '23', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', opt('--onizleme')], check=True)
print('tamam', OUT)
