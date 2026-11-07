#!/usr/bin/env python3
"""audio.py — Short'un sesini kodla üretir (numpy). Müzik altlığı + zamanlanmış efektler (+ isteğe bağlı seslendirme).

Kullanım:  python3 tools/audio.py cues.json cikti.wav
cues.json (render.mjs sahnenin `meta`sından yazar):
  {
    "duration": 30, "offset": 0,
    "music": {"bpm": 92, "key": "A", "mood": "merak", "gain": 0.8},     # isteğe bağlı
    "cues": [{"t": 2.4, "kind": "whoosh", "gain": 1.0}, ...],
    "voice": "wip/<id>/ses.wav"                                         # isteğe bağlı; varsa müzik altına çekilir
  }
Efekt türleri: click, pop, whoosh, rise, ding, hum, zap, thud, tick, sparkle, swoosh
"""
import json
import os
import sys
import wave

import numpy as np

SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def t_axis(sec):
    return np.arange(int(sec * SR)) / SR


def env(n, a=0.005, d=0.2, s=0.0, r=0.05, hold=None):
    """ADSR benzeri zarf (örnek sayısı n)."""
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    dec = s + (1 - s) * np.exp(-np.maximum(0, t - a) / max(d, 1e-4))
    e = e * dec
    rel = int(r * SR)
    if rel and rel < n:
        e[-rel:] *= np.linspace(1, 0, rel)
    return e


def lowpass(x, cutoff):
    """Tek kutuplu alçak geçiren (ileri-geri, faz kaymasız)."""
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):  # kısa sinyaller için yeterince hızlı
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def lp_fast(x, cutoff):
    """Uzun sinyaller için FFT tabanlı yumuşak alçak geçiren."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, n=len(x))


def reverb(x, seconds=1.6, mix=0.18, seed=3):
    """Gürültü tabanlı dürtü yanıtıyla konvolüsyon yankısı."""
    rng = np.random.default_rng(seed)
    n = int(seconds * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * (6.9 / seconds))
    ir = lp_fast(ir, 5000)
    ir /= np.sqrt(np.sum(ir ** 2)) + 1e-9
    wet = np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir, len(x) + n))[: len(x)]
    return (1 - mix) * x + mix * wet


NOTE = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# ------------------------------------------------------------------ müzik
def music(duration, bpm=92, key="A", gain=0.8, seed=0):
    """Sakin, merak uyandıran eğitim altlığı: pad + bas + arpej + hafif ritim. Telifsiz, her seferinde koddan."""
    rng = np.random.default_rng(seed)
    n = int(duration * SR)
    out = np.zeros(n)
    root = 57 + NOTE.get(key, 9) - 9  # A3 civarı
    prog = [[0, 3, 7, 10], [-4, 0, 3, 7], [-7, -3, 0, 5], [-2, 2, 5, 9]]  # i - VI - III - VII (minör, sıcak)
    beat = 60 / bpm
    bar = 4 * beat
    nbars = int(np.ceil(duration / bar)) + 1
    for b in range(nbars):
        ch = prog[b % 4]
        s0 = int(b * bar * SR)
        if s0 >= n:
            break
        L = min(n - s0, int((bar + 0.6) * SR))
        tt = np.arange(L) / SR
        # pad: hafif detune edilmiş testere dalgaları, alçak geçiren ile yumuşatılmış
        pad = np.zeros(L)
        for iv in ch:
            f = hz(root + iv)
            for det in (-0.12, 0.0, 0.12):
                ph = 2 * np.pi * f * 2 ** (det / 12) * tt
                pad += (2 * ((ph / (2 * np.pi)) % 1) - 1) * 0.5 + 0.5 * np.sin(ph)
        pad = lp_fast(pad, 900) * 0.016
        e = np.minimum(1, tt / 0.8) * np.minimum(1, np.maximum(0, (L / SR - tt)) / 0.6)
        out[s0:s0 + L] += pad * e
        # bas: kök nota, yumuşak sinüs
        fb = hz(root + ch[0] - 12)
        bass = np.sin(2 * np.pi * fb * tt) * env(L, 0.02, 1.2, 0.5, 0.3) * 0.11
        out[s0:s0 + L] += bass
        # arpej: sekizlik notalar, pluck
        for k in range(8):
            t0 = b * bar + k * beat / 2
            i0 = int(t0 * SR)
            if i0 >= n:
                break
            iv = ch[[0, 1, 2, 3, 2, 1, 2, 3][k]] + 12
            m = int(0.45 * SR)
            m = min(m, n - i0)
            tp = np.arange(m) / SR
            f = hz(root + iv)
            pl = (np.sin(2 * np.pi * f * tp) + 0.3 * np.sin(4 * np.pi * f * tp)) * env(m, 0.003, 0.18, 0, 0.05)
            out[i0:i0 + m] += pl * 0.035 * (0.8 + 0.4 * rng.random())
    # ritim: yumuşak tekme 1 ve 3'te, hi-hat sekizliklerde
    k = 0
    while k * beat < duration:
        i0 = int(k * beat * SR)
        if k % 2 == 0:
            m = min(int(0.3 * SR), n - i0)
            tp = np.arange(m) / SR
            f = 50 + 80 * np.exp(-tp * 25)
            out[i0:i0 + m] += np.sin(2 * np.pi * np.cumsum(f) / SR) * env(m, 0.002, 0.12, 0, 0.02) * 0.18
        for half in (0, 0.5):
            j0 = int((k + half) * beat * SR)
            if j0 < n:
                m = min(int(0.04 * SR), n - j0)
                hat = np.diff(rng.standard_normal(m + 1)) * env(m, 0.001, 0.012, 0, 0.005)
                out[j0:j0 + m] += hat * (0.018 if half else 0.012)
        k += 1
    out = reverb(out, 1.8, 0.22)
    fade = int(1.2 * SR)
    out[:fade] *= np.linspace(0, 1, fade)
    out[-fade:] *= np.linspace(1, 0, fade)
    return out * gain


# ------------------------------------------------------------------ efektler
def sfx(kind, seed=1, d=None):
    rng = np.random.default_rng(seed)
    if kind == "click":
        n = int(0.06 * SR)
        return 0.5 * rng.standard_normal(n) * env(n, 0.0005, 0.008) + 0.4 * np.sin(2 * np.pi * 2400 * t_axis(0.06)) * env(n, 0.0005, 0.015)
    if kind == "tick":
        n = int(0.03 * SR)
        return 0.35 * np.sin(2 * np.pi * 3200 * t_axis(0.03)) * env(n, 0.0005, 0.006)
    if kind == "pop":
        t = t_axis(0.22)
        f = 1100 * np.exp(-t * 22) + 260
        return 0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, 0.07)
    if kind == "thud":
        t = t_axis(0.4)
        f = 45 + 110 * np.exp(-t * 30)
        return 0.8 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, 0.14)
    if kind in ("whoosh", "swoosh"):
        d = 0.7 if kind == "whoosh" else 0.45
        n = int(d * SR)
        x = rng.standard_normal(n)
        sweep = np.linspace(400, 4000, n) if kind == "swoosh" else 600 + 2500 * np.sin(np.linspace(0, np.pi, n))
        X = np.fft.rfft(x)
        f = np.fft.rfftfreq(n, 1 / SR)
        X *= np.exp(-((f - sweep.mean()) / 1500) ** 2)
        y = np.fft.irfft(X, n=n)
        return 1.4 * y / (np.abs(y).max() + 1e-9) * np.hanning(n) * 0.5
    if kind == "rise":
        t = t_axis(1.2)
        f = 200 * 2 ** (t * 2)
        return 0.18 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 1.0) * env(len(t), 0.9, 2, 1, 0.15)
    if kind == "ding":
        t = t_axis(1.6)
        return 0.22 * (np.sin(2 * np.pi * 1318.5 * t) + 0.45 * np.sin(2 * np.pi * 1975.5 * t) + 0.2 * np.sin(2 * np.pi * 2637 * t)) * env(len(t), 0.002, 0.5)
    if kind == "sparkle":
        out = np.zeros(int(0.9 * SR))
        for i, f in enumerate([1568, 2093, 2637, 3136]):
            s = int(i * 0.07 * SR)
            t = t_axis(0.5)
            tone = 0.12 * np.sin(2 * np.pi * f * t) * env(len(t), 0.002, 0.18)
            out[s:s + len(tone)] += tone[: len(out) - s]
        return out
    if kind == "hum":  # elektrik vızıltısı (50 Hz ve harmonikleri); d verilirse o süre kadar, yumuşak girip çıkar
        if d:
            t = t_axis(d)
            x = sum(np.sin(2 * np.pi * 50 * h * t) / h for h in (1, 2, 3, 5))
            fi, fo = int(min(0.4, d / 2) * SR), int(min(0.4, d / 2) * SR)
            e = np.ones(len(t)); e[:fi] = np.linspace(0, 1, fi) ** 2; e[-fo:] *= np.linspace(1, 0, fo) ** 2
            return 0.12 * x * e
        t = t_axis(1.0)
        x = sum(np.sin(2 * np.pi * 50 * h * t) / h for h in (1, 2, 3, 5))
        return 0.12 * x * env(len(t), 0.08, 2, 1, 0.2)
    if kind == "zap":
        n = int(0.35 * SR)
        x = rng.standard_normal(n) * (rng.random(n) > 0.7)
        t = t_axis(0.35)
        return 0.35 * (x + np.sign(np.sin(2 * np.pi * 120 * t))) * env(n, 0.001, 0.08)
    raise ValueError(f"bilinmeyen efekt: {kind}")


def read_wav(path):
    with wave.open(path) as w:
        sr, ch, n = w.getframerate(), w.getnchannels(), w.getnframes()
        x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float64) / 32768
    if ch > 1:
        x = x.reshape(-1, ch).mean(axis=1)
    if sr != SR:
        x = np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x)
    return x


def main(cues_path, out_path):
    c = json.load(open(cues_path, encoding="utf8"))
    dur = float(c["duration"])
    off = float(c.get("offset", 0))
    n = int(dur * SR)
    m = c.get("music") or {}
    mix = np.zeros(n)
    if m is not False and m.get("off") is not True:
        bed = music(dur + off, m.get("bpm", 92), m.get("key", "A"), m.get("gain", 0.8))[int(off * SR):][:n]
        mix[: len(bed)] += bed
    for i, q in enumerate(c.get("cues", [])):
        t = float(q["t"]) - off
        if t < 0 or t >= dur:
            continue
        s = sfx(q["kind"], seed=i + 1, d=q.get("d")) * float(q.get("gain", 1.0))
        a = int(t * SR)
        e = min(n, a + len(s))
        mix[a:e] += s[: e - a]
    if c.get("voice"):
        v = read_wav(os.path.join(ROOT, c["voice"]))
        vt = float(c.get("voice_at", 0)) - off
        a = max(0, int(vt * SR))
        v = v[: max(0, n - a)]
        voice = np.zeros(n)
        voice[a:a + len(v)] = v
        # konuşma varken müziği %35'e çek (yumuşak ducking)
        lvl = np.convolve(np.abs(voice), np.ones(4800) / 4800, mode="same")
        duck = 1 - 0.65 * np.clip(lvl / (lvl.max() + 1e-9) * 4, 0, 1)
        mix = mix * duck + voice * 1.0
    peak = np.abs(mix).max()
    if peak > 0.98:
        mix *= 0.98 / peak
    st = (np.stack([mix, mix], axis=1) * 32767).astype(np.int16)
    with wave.open(out_path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(st.tobytes())
    print("ses:", out_path)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
