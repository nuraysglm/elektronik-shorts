#!/usr/bin/env python3
"""Is emri M (2): parca 5 cumle 14 ("Şimdi kancadaki devreyi kuralım." -> "Şimdi dersin girişindeki devreyi kuralım.")
ses_hazirla.sh ciktisindaki parca-5.wav'da eski cumleyi (48,40-50,10 sn) yeni kayitla degistirir.
Yeni kayit: ElevenLabs generation pBjbSn4ea44AuH4YeMqm (eleven_v4, voice sLFd2sFq5fDrVDNCuUfI, 1 take, 41 kredi).
Duzey: yeni cumlenin konusma RMS'i eski cumleninkine esitlenir (komsu cumlelerle ayni ses duzeyi), tepe <= -1,5 dBFS.
Cumle oncesi/sonrasi duraklamalar (47,83-48,40 ve 50,10-50,36) aynen korunur; sonrasi Delta kadar kayar.
  python3 ses_m.py SES_KLASORU cumle-5-14.mp3   (SES_KLASORU/parca-5.wav ve parca-5.raw yerinde guncellenir)"""
import sys, subprocess, numpy as np, soundfile as sf, os, tempfile
D, NEW = sys.argv[1], sys.argv[2]
x, sr = sf.read(f'{D}/parca-5.wav'); i_ = lambda t: int(round(t * sr))
tmp = tempfile.mkdtemp(); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', NEW, '-ac', '1', '-ar', str(sr), f'{tmp}/n.wav'], check=True)
n, _ = sf.read(f'{tmp}/n.wav')
w = i_(0.02); e = np.sqrt(np.convolve(n ** 2, np.ones(w) / w, 'same')); on = np.where(e > 10 ** (-45 / 20))[0]
a, b = max(on[0] - i_(0.03), 0), min(on[-1] + i_(0.05), len(n))
seg = n[a:b] * np.clip(np.arange(b - a) / i_(0.01), 0, 1) * np.clip((b - a - np.arange(b - a)) / i_(0.02), 0, 1)
old = x[i_(48.40):i_(50.10)]
rms = lambda v: np.sqrt(np.mean(v[np.abs(v) > 1e-3] ** 2))
g = rms(old) / rms(seg); seg = seg * g
pk = 10 ** (-1.5 / 20)
if np.max(np.abs(seg)) > pk: seg *= pk / np.max(np.abs(seg))
y = np.concatenate([x[:i_(48.40)], seg, x[i_(50.10):]])
delta = len(y) / sr - len(x) / sr
sf.write(f'{D}/parca-5.wav', y, sr, subtype='PCM_16')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/parca-5.wav', '-ac', '1', '-ar', '16000', '-f', 's16le', f'{D}/parca-5.raw'], check=True)
print(f'yeni cumle {len(seg)/sr:.3f} sn (eski 1,700), kazanc {20*np.log10(g):+.1f} dB, Delta {delta:+.3f} sn, parca 5 {len(y)/sr:.3f} sn')
