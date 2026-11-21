#!/usr/bin/env python3
"""Is emri M (i) (21.11.2026): ONAYLI Blender introsunu Ders 1 - Bolum 3e (Bolum 2 introlu.py kopyasi) 6-S akisiyla ekler + seri muzigi.
(uzun/intro/gercekci/birlestir.py'nin Bolum 2 uyarlamasi; intro dosyalarina dokunulmaz.)
Girdi muziksiz birlesik videodur (birlestir.sh ciktisi; konusma -16 LUFS); muzik_f.sh'in yerine gecer.

Kullanim: python3 introlu.py HAM.mp4 INTRO_SESSIZ.mp4 ACILIS.mp3 KAPANIS.mp3 CIKTI.mp4
  INTRO_SESSIZ: media/uzun/devre-teorisi-1-intro-gercekci-sessiz.mp4 (285 kare; 8,5-9,2 sn tahtaya gecis)
Akis (UZUN.md 4a-I "ONAYLI KANAL INTRO'SU", 6-S):
  0-T0 kanca (muzik yok; konusma 45,79 sn biter) -> T0'da intro'nun ilk 276 karesi (9,2 sn; muzik 0,12 sn sonra
  tek basina ~-18 LUFS) -> 3 kare tahta + kalem (kartin ilk karesi) -> intro karti BASTAN normal hizda ->
  selam kart baslangicindan 0,3 sn sonra (gecis sonundan ~0,5 sn sonra) -> ders.
  Muzik selamda konusmanin >= 18 dB altina iner (kanal sahibi 20.11 19:20; hedef 20 dB), ~0,3 sn'de yumusakca;
  acilis kesiti 4,174 sn aralikla ust uste (0,3 sn capraz gecis), selam bitince yumusakca biter.
  Bitis ekrani (son 20 sn): muzik_f.sh ile ayni (acilis 8 sn -> kapanis 10 sn -> acilis basi), son 2 sn kararma.
  T0'dan sonraki her sey HAM + 9,3 sn.
"""
import sys, subprocess, json, tempfile
import numpy as np, soundfile as sf

HAM, INTRO, ACILIS, KAPANIS, OUT = sys.argv[1:6]
SR, FPS = 48000, 30
T0 = 46.0                       # parca 1de intro kartinin basi (Bolum 3 parcalar.json ara [46,0, 11,4]; kanca 45,79 sn biter)
IN_FR, HOLD = 276, 3
SHIFT = (IN_FR + HOLD) / FPS    # 9,3 sn
M0, LAG, XF, XC = 0.12, 4.1742, 0.30, 5.98
SOLO_LUFS, DUCK_DB = -18.0, 20.0
END_LEN = 20.0
tmp = tempfile.mkdtemp()
i_ = lambda t: int(round(t * SR))

def wav(src, dst):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-c:a', 'pcm_f32le', dst], check=True)
    return sf.read(dst)[0]
def lufs(x):
    p = f'{tmp}/m.wav'; sf.write(p, x, SR, subtype='FLOAT')
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', p, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(json.loads(r[r.rindex('{'):])['input_i'])
def place(dst, seg, t, g=1.0):
    a0 = i_(t); n = min(len(seg), len(dst) - a0)
    if n > 0: dst[a0:a0 + n] += seg[:n] * g
def fade(n, a, b):  # a: giris, b: cikis (sn)
    g = np.ones(n); t = np.arange(n) / SR
    if a: g *= np.clip(t / a, 0, 1)
    if b: g *= np.clip((n / SR - t) / b, 0, 1)
    return g

A = wav(HAM, f'{tmp}/a.wav'); AC = wav(ACILIS, f'{tmp}/ac.wav'); KP = wav(KAPANIS, f'{tmp}/kp.wav')
total = len(A) + i_(SHIFT)
sp = np.zeros(total)
k0 = i_(T0); sp[:k0] = A[:k0] * np.clip((T0 - np.arange(k0) / SR) / 0.01, 0, 1)
sp[k0 + i_(SHIFT):] = A[k0:][:total - k0 - i_(SHIFT)]

# selamin konusma araligi (HAM'da ilk/son hece; -45 dBFS esigi, 20 ms pencere)
def onsets(x, t0, t1):
    seg = x[i_(t0):i_(t1)]; w = i_(0.02); e = np.sqrt(np.convolve(seg ** 2, np.ones(w) / w, 'same')); on = np.where(e > 10 ** (-45 / 20))[0]
    return t0 + on[0] / SR, t0 + on[-1] / SR
s_on, s_off = onsets(A, T0 + 0.25, T0 + 11.35)   # parcalar.json: kart araligi 11,4 sn, icinde yalnizca selam
SP0, SP1 = s_on + SHIFT, s_off + SHIFT
print(f'selam konusmasi {SP0:.2f}-{SP1:.2f} sn (gecis sonu {T0 + IN_FR / FPS:.2f})')

def music(total, t0, copies, end_fade):
    m = np.zeros(total)
    for c in range(copies):
        st = t0 + c * LAG; seg = AC.copy(); tt = np.arange(len(seg)) / SR; g = np.ones(len(seg))
        if c > 0:
            ci = XC - LAG; g *= np.clip(np.sin(np.pi / 2 * np.clip((tt - (ci - XF / 2)) / XF, 0, 1)), 0, 1); g[tt < ci - XF / 2] = 0
        if c < copies - 1:
            g *= np.cos(np.pi / 2 * np.clip((tt - (XC - XF / 2)) / XF, 0, 1)); g[tt > XC + XF / 2] = 0
        place(m, seg * g, st)
    f0, f1 = end_fade; t = np.arange(total) / SR; m *= np.clip((f1 - t) / (f1 - f0), 0, 1)
    return m

I0 = T0
fade_end = (SP1 + 0.05, SP1 + 0.45)
copies = int(np.ceil((fade_end[1] - (I0 + M0) - XC) / LAG)) + 1
m = music(total, I0 + M0, copies, fade_end)
gs = 10 ** ((SOLO_LUFS - lufs(m[i_(I0 + 0.6):i_(I0 + 8.6)])) / 20)
sp_l = lufs(sp[i_(SP0):i_(SP1)])
gd = 10 ** ((sp_l - DUCK_DB - lufs(m[i_(SP0):i_(SP1)])) / 20)
t = np.arange(total) / SR; r = np.clip((t - (SP0 - 0.30)) / 0.30, 0, 1)
mo = m * (gs * (1 - r) + gd * r)
print(f'acilis: {copies} kopya, tek basina {20*np.log10(gs):.1f} dB, selamda {20*np.log10(gd):.1f} dB; selam konusmasi {sp_l:.1f} LUFS')

# bitis ekrani (muzik_f.sh ile ayni duzen ve kazanclar)
DUR = total / SR; ES = DUR - END_LEN; F0 = DUR - 2
db = lambda x: 10 ** (x / 20)
me = np.zeros(total)
place(me, AC * fade(len(AC), 0.3, 0) * np.clip((7.5 + 0.5 - np.arange(len(AC)) / SR) / 0.5, 0, 1), ES, db(-9.3))
place(me, KP * fade(len(KP), 0.4, 0), ES + 7.8, db(-3.6))
place(me, AC * fade(len(AC), 0.5, 0), ES + 17.3, db(-9.3))

out = sp + mo + me
out *= np.clip((DUR - t) / 2.0, 0, 1)                        # son 2 sn ses de kararir
p = f'{tmp}/bolum.wav'; sf.write(p, out, SR, subtype='FLOAT')

vf = (f'[0:v]setpts=PTS-STARTPTS[v1];[1:v]fps=30,trim=end_frame={IN_FR},setpts=PTS-STARTPTS[v2];'
      f'[2:v]trim=end_frame=1,setpts=PTS-STARTPTS,loop=loop={HOLD - 1}:size=1,setpts=N/30/TB[v3];[3:v]setpts=PTS-STARTPTS[v4];'
      f'[v1][v2][v3][v4]concat=n=4:v=1:a=0,fps=30,fade=t=out:st={F0:.3f}:d=2,format=yuv420p[v];'
      '[4:a]alimiter=limit=0.78:level=disabled:attack=3:release=50[a]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-t', f'{T0 - 0.001:.3f}', '-i', HAM, '-i', INTRO, '-ss', f'{T0:.3f}', '-t', '0.1', '-i', HAM,
                '-ss', f'{T0:.3f}', '-i', HAM, '-i', p, '-filter_complex', vf, '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-r', '30', '-colorspace', 'bt709', '-color_primaries', 'bt709',
                '-color_trc', 'bt709', '-c:a', 'pcm_s16le', '-ar', '48000', f'{tmp}/ham.mkv'], check=True)
rr = subprocess.run(['ffmpeg', '-hide_banner', '-i', f'{tmp}/ham.mkv', '-vn', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float([l for l in rr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
gn = round(-16.0 - I, 2); print(f'olculen {I} LUFS -> kazanc {gn} dB')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{tmp}/ham.mkv', '-map', '0:v', '-map', '0:a', '-c:v', 'copy', '-af', f'volume={gn}dB',
                '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', OUT], check=True)
json.dump({'T0': T0, 'kayma': SHIFT, 'intro': [T0, T0 + IN_FR / FPS], 'selam': [SP0, SP1], 'bitis_ekrani': ES, 'sure': DUR}, open(OUT + '.json', 'w'))
print('tamam', OUT, f'sure {DUR:.2f}, bitis ekrani {ES:.2f}')
