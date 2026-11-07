# NOTLAR — 001
- Ses: `python3.13 tools/sesle.py satirlar.json <model.onnx> ses.wav zaman.json`, ardından zaman.js zaman.json'dan üretilir.
- Piper `pip` ile python3.13'e kuruluyor (`python3` 3.11 ayrı); `python3.13 -m piper`.
- Son render: `node tools/render.mjs wip/001-akim-gerilim-direnc/scene.js --out media/001-akim-gerilim-direnc/001-akim-gerilim-direnc.mp4`

## Yeniden düzenleme (iş emri) — 2026-11-07
- Sahne kodu yeniden düzenlendi (seslendirme yok, anlatım akan yazılarla, yeni efekt zamanları, `tools/audio.py` hum süreli). Kare kontrolü yapıldı, iyi.
- Sıradaki: parça parça sessiz render (`--from/--to --no-audio --out wip/001-akim-gerilim-direnc/parca-NN.mp4`, 15 sn'lik: 00=0–15 … 06=90–104,089), sonra birleştir + ses + loudnorm + kalite kontrolü.
- Parça durumu: parca-00: tamam; parca-01: tamam; parca-02: tamam; parca-03: tamam; parca-04: tamam; parca-05: tamam
