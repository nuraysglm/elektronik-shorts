#!/usr/bin/env python3
"""Is emri N (20.11.2026): render icin parca sesini kurar; parcalar.json 'ara' listesindeki anlara sessizlik ekler.
  python3 ses_ara.py SES_KLASORU PARCA CIKTI.wav
  SES_KLASORU: ses_hazirla.sh ciktisi (parca-N.wav, selam.wav; 48 kHz mono, -19,5 LUFS).
  Parca 1: parca-1.wav 0-37,5 + 0,3 sn sessizlik + selam.wav (ara suresinin kalanina doldurulur) + kalan (eski el ile kurulan duzen).
  Diger parcalar: her [an, sure] icin ham ses zamaninda 'an'da 'sure' sn sessizlik (motor.js shift ile ayni).
"""
import sys, json, os
import numpy as np, soundfile as sf
D, P, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
cfg = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'parcalar.json')))[P]
x, sr = sf.read(os.path.join(D, f'parca-{P}.wav'))
i_ = lambda t: int(round(t * sr))
parts, last = [], 0
for an, sure in cfg.get('ara', []):
    parts.append(x[last:i_(an)])
    if P == '1':
        s, _ = sf.read(os.path.join(D, 'selam.wav'))
        blk = np.zeros(i_(sure)); n = min(len(s), len(blk) - i_(0.3)); blk[i_(0.3):i_(0.3) + n] = s[:n]
    else:
        blk = np.zeros(i_(sure))
    parts.append(blk); last = i_(an)
parts.append(x[last:])
y = np.concatenate(parts)
sf.write(OUT, y, sr, subtype='PCM_16')
print(OUT, f'{len(y) / sr:.3f} sn')
