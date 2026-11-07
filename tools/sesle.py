#!/usr/bin/env python3
"""sesle.py — Piper (tr_TR-dfki-medium) ile satırları seslendirir.
Kullanım: python3.13 tools/sesle.py satirlar.json model.onnx ses.wav zaman.json
Her satırı ayrı üretir, aralarına 'gap' saniye sessizlik koyar; zaman.json: {id: [başlangıç, bitiş]}."""
import json, sys, wave, numpy as np
from piper import PiperVoice
satir, model, out, zaman = sys.argv[1:5]
v = PiperVoice.load(model)
SR = v.config.sample_rate
parts, t, z = [], 0.0, {}
lead = 0.4
parts.append(np.zeros(int(lead * SR), dtype=np.int16)); t = lead
for s in json.load(open(satir, encoding='utf8')):
    chunks = [c.audio_int16_array for c in v.synthesize(s['text'])]
    a = np.concatenate(chunks)
    z[s['id']] = [round(t, 3), round(t + len(a) / SR, 3)]
    parts.append(a); t += len(a) / SR
    g = int(s['gap'] * SR); parts.append(np.zeros(g, dtype=np.int16)); t += s['gap']
parts.append(np.zeros(int(0.8 * SR), dtype=np.int16)); t += 0.8
x = np.concatenate(parts)
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(x.tobytes())
json.dump({'duration': round(t, 3), 'satir': z}, open(zaman, 'w'), ensure_ascii=False, indent=1)
print('süre', round(t, 2))
