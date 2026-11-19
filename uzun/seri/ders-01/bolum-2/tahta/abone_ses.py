#!/usr/bin/env python3
"""Abone animasyonu sesleri (UZUN.md 4b, kanal sahibi 19.11.2026): kodla (numpy) uretilir, telifli/kutuphane sesi yok.
  python3 abone_ses.py CIKTI.wav   -> 4,5 sn mono 48 kHz: klik1'de fare tiklamasi, klik2'de tik + zil (<= 1 sn, sonumlenen).
Zamanlar abone.js ABONE ile ayni (klik1 1,0 sn; klik2 1,9 sn; zil 1,0 sn). Duzey birlestir.sh'de konusmanin ~12 dB altina ayarlanir."""
import sys, wave, numpy as np
SR, DUR, K1, K2, ZIL = 48000, 4.5, 1.0, 1.9, 1.0
rng = np.random.default_rng(7)
def tik(sure=0.018, f=3200):
    n = int(SR * sure); t = np.arange(n) / SR
    g = rng.standard_normal(n) * np.exp(-t / 0.0025)            # kisa gurultu patlamasi (mekanik tik)
    g += 0.6 * np.sin(2 * np.pi * f * t) * np.exp(-t / 0.004)   # tiz govde
    g += 0.4 * np.sin(2 * np.pi * 900 * t) * np.exp(-t / 0.006) # alt govde
    return g / np.abs(g).max()
def zil(sure=ZIL, f0=1320.0):
    n = int(SR * sure); t = np.arange(n) / SR
    oran = [(1.0, 1.0, 0.45), (2.76, 0.5, 0.28), (5.40, 0.25, 0.16), (8.93, 0.12, 0.10)]  # metal zil kismi tonlari
    y = sum(a * np.sin(2 * np.pi * f0 * r * t) * np.exp(-t / d) for r, a, d in oran)
    y *= 1 + 0.25 * np.sin(2 * np.pi * 6.4 * t)                 # sallanma titresimi (3,2 Hz x2)
    y *= np.clip(t / 0.004, 0, 1) * np.clip((sure - t) / 0.08, 0, 1)  # yumusak giris/cikis, sure <= 1 sn
    return y / np.abs(y).max()
out = np.zeros(int(SR * DUR))
def koy(x, t0, k): i = int(t0 * SR); out[i:i + len(x)] += k * x
koy(tik(), K1, 1.0); koy(tik(f=2800), K2, 0.9); koy(zil(), K2 + 0.02, 0.55)
out = out / np.abs(out).max() * 0.5
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes())
print('->', sys.argv[1])
