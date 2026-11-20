#!/usr/bin/env python3
"""Is emri K2 (20.11.2026): 9,5 sn'lik Blender intro'yu Ders 1 - Bolum 1'e yerlestirir (UZUN.md 6-S) + muzikli intro.
(uzun/intro-stok/birlestir.py'nin [L3] Blender intro icin uyarlanmis kopyasi; stok dosyalarina dokunulmaz.)

Kullanim: python3 birlestir.py ASIL.mp4 INTRO_SESSIZ.mp4 SELAM.mp3 ACILIS.mp3 CIKTI.mp4 [--intro INTRO_MUZIKLI.mp4]
  ASIL   : media/uzun/devre-teorisi-1-ders-01-bolum-1.mp4 (DEGISMEZ)
  INTRO  : intro_video.sh ciktisi (285 kare, sessiz; 8,5-9,2 sn tahtaya gecis, 9,2-9,5 tahta)
  ACILIS : seri-muzik-acilis.mp3 (Drive) -- depoya girmez
Goruntu (30 fps, kare numaralari):
  0-988 kanca (asil) | 989-1264 intro'nun ilk 276 karesi (9,2 sn; gecis 41,47-42,17'de biter)
  1265-1267 tahta + kalem (kartin ilk karesi, 0,1 sn)
  1268-1357 intro karti BASTAN, asil videodaki 2x yavas ilk 3 sn dogal hizda (asil 989..1167 cift kareler)
  1358- asil 1169'dan itibaren (yeni = asil + 189 kare = +6,3 sn)
Ses:
  kanca aynen (konusma 32,81'de biter) -> 32,967'de intro, muzik 0,12 sn sonra tek basina (~-18 LUFS)
  selam: ses/selam.mp3 (asil karisimla eslesik kazanc/konum) 42,568'de (konusma ~42,66; gecis sonu 42,167 -> ~0,5 sn sonra)
  muzik selamda konusmanin ~8 dB altina iner (42,36-42,66); kesintisiz: acilis kesiti 4,174 sn'lik (2 olcu) aralikla
  4 kez ust uste, 0,3 sn esit guclu capraz gecisle (5,98 sn vurusunda); 49,9-50,5'te yumusakca biter (ders 50,8'de).
  50,3 sn'den sonrasi asil ses +6,3 sn. Son: alimiter + -16 LUFS.
"""
import sys, subprocess, json, os, tempfile
import numpy as np, soundfile as sf

ASIL, INTRO, SELAM, ACILIS, OUT = sys.argv[1:6]
opt = lambda k: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else None
SR, FPS = 48000, 30
I0 = 989 / FPS
IN_FR, HOLD = 276, 3
SHIFT = (IN_FR + HOLD + 90 - 180) / FPS          # 6,3 sn
SELAM_T = 36.26796 + SHIFT
SELAM_G = 1.6014
CUT = 44.0 + SHIFT
M0, LAG, XF = 0.12, 4.1742, 0.30
SOLO_LUFS, DUCK_DB = -18.0, 8.0
SPEECH0 = SELAM_T + 0.092                         # konusmanin ilk hecesi
END_FADE = (49.9, 50.5)
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

def music(total, t0, copies, end_fade=None):
    m = np.zeros(total); xc = 5.98
    for c in range(copies):
        st = t0 + c * LAG; seg = AC.copy(); tt = np.arange(len(seg)) / SR; g = np.ones(len(seg))
        if c > 0:
            ci = xc - LAG; g *= np.clip(np.sin(np.pi / 2 * np.clip((tt - (ci - XF / 2)) / XF, 0, 1)), 0, 1); g[tt < ci - XF / 2] = 0
        if c < copies - 1:
            g *= np.cos(np.pi / 2 * np.clip((tt - (xc - XF / 2)) / XF, 0, 1)); g[tt > xc + XF / 2] = 0
        a0 = i_(st)
        if a0 >= total: continue
        n = min(len(seg), total - a0); m[a0:a0 + n] += (seg * g)[:n]
    if end_fade:
        f0, f1 = end_fade; t = np.arange(total) / SR; m *= np.clip((f1 - t) / (f1 - f0), 0, 1)
    return m

# 1) tek basina intro (onay icin, 9,5 sn)
N = int(9.5 * SR)
mi = music(N, M0, 2, end_fade=(9.0, 9.5))
gs = 10 ** ((SOLO_LUFS - lufs(mi[i_(0.5):i_(8.5)])) / 20)
if opt('--intro'):
    p = f'{tmp}/intro.wav'; sf.write(p, np.clip(mi * gs, -0.95, 0.95), SR, subtype='FLOAT')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', INTRO, '-i', p, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', '-shortest', opt('--intro')], check=True)

# 2) bolum 1 sesi
total = len(A) + i_(SHIFT)
out = np.zeros(total)
k0 = i_(I0); out[:k0] = A[:k0] * np.clip((I0 - np.arange(k0) / SR) / 0.01, 0, 1)
c0 = i_(CUT); out[c0:] = A[c0 - i_(SHIFT):][:total - c0]
s0 = i_(SELAM_T); sp = np.zeros(total); n = min(len(S), c0 - s0); sp[s0:s0 + n] = S[:n] * SELAM_G
out += sp
m = music(total, I0 + M0, 4, end_fade=END_FADE)
t = np.arange(total) / SR
sp_l = lufs(sp[i_(SPEECH0):i_(CUT - 0.4)])
gd = 10 ** ((sp_l - DUCK_DB - lufs(m[i_(SPEECH0 + 0.5):i_(END_FADE[0])])) / 20)
r = np.clip((t - (SPEECH0 - 0.30)) / 0.30, 0, 1)
out += m * (gs * (1 - r) + gd * r)
print(f'muzik tek basina kazanc {20*np.log10(gs):.1f} dB, selamda {20*np.log10(gd):.1f} dB; konusma {sp_l:.1f} LUFS; kayma +{SHIFT:.2f} sn')
p = f'{tmp}/bolum.wav'; sf.write(p, out, SR, subtype='FLOAT')

# 3) goruntu + ses
vf = (f'[0:v]setpts=PTS-STARTPTS[v1];[1:v]fps=30,trim=end_frame={IN_FR},setpts=PTS-STARTPTS[v2];'
      f'[5:v]trim=end_frame=1,setpts=PTS-STARTPTS,loop=loop={HOLD - 1}:size=1,setpts=N/30/TB[v3];'
      "[2:v]select='not(mod(n\\,2))',setpts=N/30/TB[v4];[3:v]setpts=PTS-STARTPTS[v5];"
      '[v1][v2][v3][v4][v5]concat=n=5:v=1:a=0,fps=30,format=yuv420p[v];'
      '[4:a]alimiter=limit=0.78:level=disabled:attack=3:release=50[a]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-t', '32.95', '-i', ASIL, '-i', INTRO, '-ss', '32.95', '-t', '6.0', '-i', ASIL,
                '-ss', '38.95', '-i', ASIL, '-i', p, '-ss', '32.95', '-t', '0.1', '-i', ASIL, '-filter_complex', vf, '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-r', '30', '-colorspace', 'bt709', '-color_primaries', 'bt709',
                '-color_trc', 'bt709', '-c:a', 'pcm_s16le', '-ar', '48000', f'{tmp}/ham.mkv'], check=True)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', f'{tmp}/ham.mkv', '-vn', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float([l for l in r.splitlines() if l.strip().startswith('I:')][-1].split()[1])
gn = round(-16.0 - I, 2); print(f'olculen {I} LUFS -> kazanc {gn} dB')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{tmp}/ham.mkv', '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', f'volume={gn}dB',
                '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', OUT], check=True)
print('tamam', OUT)
