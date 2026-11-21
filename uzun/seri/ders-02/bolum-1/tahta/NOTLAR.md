# Ders 2 - Bölüm 1/3 — tahta (whiteboard) üretim notları

Metin onayı: `onaylar/metin-2-1` (20.11.2026 08:29Z). Parça 7: `onaylar/metin-2-1-p7` kararı bekleniyor (yeni soru) — 18:00 kuralı (UZUN.md sprint).

## Ses
- ElevenLabs eleven_v4, voice_id sLFd2sFq5fDrVDNCuUfI, 1 take; selam + parça 1–6 = 11.677 kredi (flow o1NxGtQkGrn67vii9T3A; id'ler `../ses/uretim.json`).
- 21.11 15:40Z düzenli çalışmada curl ile indirildi (`../ses/`, HTTP 200); Drive yüklemesine gerek kalmadı.
- Süreler (ham): selam 10,76; 1 43,81; 2 58,67; 3 159,56; 4 141,71; 5 112,27; 6 223,71 sn (toplam 750,5 sn).

| Dosya | İş |
|---|---|
| `ses_hazirla.sh` | Ders 1-B3 sürümü; `PARCALAR="1 2 3 4 5 6"` ile parça listesi. loudnorm iki geçişli −19,5 LUFS, tepe ≤ −1,5 dBTP (6/6 parça −19,5 / −1,5; selam −19,1 / −1,9). Çıktı scratchpad'e (wav/raw depoda yok). |
| `zamanla.py` | Ders 1-B3 sürümü; `[SELAM` paragrafı atlanır. |
| `zamanlama-1..6.json` | Cümle/kelime zamanları (normalize sesten). Zayıf sınır yok: 9 + 15 + 42 + 36 + 26 + 55 = 183/183 sınır güçlü. |

- Abone çağrısı 1: parça 3 cümle 10 "Bu serinin devamı için kanala abone olabilirsin." 42,43 sn (kart girişi bu an ±0,2 sn).
- Parça 1 kanca sonu 43,53 sn → ardından onaylı Blender intro'su (6-S) + intro kartı + selam.

## Sıradaki
1. Parça 7 sesi (metin-2-1-p7 kararı; karar yoksa 18:00'den sonra onaylı eski parça 7).
2. Sahneler (`parca-1..7.js`, Ders 1-B3 motoru, köşe başlığı "Ders 2 - Bölüm 1: İdeal tel, anahtar ve gerçek pil"), otomatik QC, render, birleştirme + intro + müzik, tam QC (a)–(f), kapak, yayin.json, altyazı → `onaylar/uzun-2-1` (en geç 26.11 13:00 Londra; yayın 28.11).
