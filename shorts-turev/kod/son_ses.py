#!/usr/bin/env python3
"""v3 son animasyon sesleri (UZUN.md türev Short standardı, kanal sahibi 21.11.2026 13:14) + konuşmayla karışım.
Sesler numpy ile üretilir (pop, tık, whoosh, zil <= 1 sn); telifli/kütüphane sesi yok. 4 kHz üstü yumuşatılır (AGENT.md 6).
Zamanlar ortak.js'deki SON tablosundan okunur (tek kaynak).
Kullanım: python3 son_ses.py ID KONUSMA.wav CIKTI.wav
  Konuşma (ses_kur.py, -15 LUFS) değişmez; efektler tepe -4,5 dBFS'e ayarlanıp konuşma bittikten sonra eklenir (tepe <= -3 dBTP)."""
import sys, os, re, json, wave, subprocess, numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
sid, konusma, cikti = sys.argv[1], sys.argv[2], sys.argv[3]
SR = 48000
src = open(os.path.join(HERE, 'ortak.js'), encoding='utf-8').read()
T = {k: float(v) for k, v in re.findall(r'(\w+): ([\d.]+)', re.search(r'export const SON = \{([^}]*)\}', src).group(1))}
Z = json.load(open(os.path.join(HERE, f'zamanlama-{sid}.json')))
DUR = Z['ses_suresi'] + Z['kuyruk']; T0 = DUR - Z['kart']
rng = np.random.default_rng(21)

def lp(x, fc):  # basit tek kutuplu alçak geçiren (iki kez)
    a = np.exp(-2 * np.pi * fc / SR)
    for _ in range(2):
        y = np.empty_like(x); s = 0.0
        for i, v in enumerate(x): s = (1 - a) * v + a * s; y[i] = s
        x = y
    return x
def pop(f0=520, f1=180, d=0.09):
    t = np.arange(int(SR * d)) / SR; f = f1 + (f0 - f1) * np.exp(-t / 0.018)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.028) * np.clip(t / 0.002, 0, 1)
def tik(d=0.03):
    t = np.arange(int(SR * d)) / SR
    g = rng.standard_normal(len(t)) * np.exp(-t / 0.003) + 0.7 * np.sin(2 * np.pi * 1900 * t) * np.exp(-t / 0.005) + 0.5 * np.sin(2 * np.pi * 700 * t) * np.exp(-t / 0.008)
    return lp(g, 3800)
def whoosh(d=0.42):
    t = np.arange(int(SR * d)) / SR; n = rng.standard_normal(len(t))
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    a = lp(n, 900) * 2.2; b = lp(n, 2600) - lp(n, 1200)           # alçak + orta bant, ikisi arasında süpürme
    m = np.clip(t / d, 0, 1)
    return (a * (1 - m) + b * m * 1.6) * env
def zil(d=0.95, f0=880.0):
    t = np.arange(int(SR * d)) / SR
    y = sum(a * np.sin(2 * np.pi * f0 * r * t) * np.exp(-t / dd) for r, a, dd in [(1.0, 1.0, 0.42), (2.0, 0.35, 0.25), (2.76, 0.28, 0.2), (4.1, 0.10, 0.1)])
    y *= 1 + 0.25 * np.sin(2 * np.pi * 6.4 * t)
    y *= np.clip(t / 0.004, 0, 1) * np.clip((d - t) / 0.08, 0, 1)
    return lp(y, 4000)
nrm = lambda x: x / np.abs(x).max()
fx = np.zeros(int(SR * (DUR + 0.1)))
def koy(x, t, k): i = int(round((T0 + t) * SR)); fx[i:i + len(x)] += k * nrm(x)
koy(pop(), T['b1'], 0.8); koy(tik(), T['b1tik'], 0.75)
koy(pop(560, 200), T['b2'], 0.8); koy(whoosh(), T['b2whoosh'], 0.6)
koy(pop(600, 220), T['b3'], 0.8); koy(tik(), T['b3tik'], 0.8); koy(zil(), T['zil'], 0.5)
fx = fx / np.abs(fx).max() * 10 ** (-4.5 / 20)
with wave.open(konusma) as w: sp = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(float) / 32768; assert w.getframerate() == SR
n = int(round(DUR * SR)); out = np.zeros(n); out[:min(n, len(sp))] += sp[:n]; out += fx[:n]
assert np.abs(out).max() < 1
with wave.open(cikti, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes())
fxo = cikti.replace('.wav', '-efekt.wav')
with wave.open(fxo, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((fx[:n] * 32767).astype('<i2').tobytes())
print(sid, 'süre', round(DUR, 3), 'animasyon', round(T0, 3), '->', cikti)
