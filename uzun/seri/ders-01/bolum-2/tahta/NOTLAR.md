# Ders 1 - Bölüm 2/3 — tahta (whiteboard) üretim notları

Metin sürüm 3, kanal sahibi onayı 19.11.2026 21:13Z (`onaylar/metin-1-2`).

## Ses (19.11.2026 22:15Z)
- ElevenLabs eleven_v4, voice_id sLFd2sFq5fDrVDNCuUfI, her parça 1 take; toplam 14.926 kredi. curl ile indirildi (`../ses/`), Drive yüklemesi gerekmedi.
- Süreler (ham): selam 10,76; parça 1 48,59; 2 214,44; 3 111,65; 4 131,63; 5 138,76; 6 134,19; 7 137,72 (+1,5 sn sessizlik = 139,18); 8 56,53 sn.
- Generation id: selam B32lCewBTY58rWN8D37h; 1 zZwRfvJ6ds4NuLJiBMlh; 2 3R3lGLPnHwSbeGy56FlN; 3 Bsjxjf2D2VGdWZLxlwOo; 4 vCgouEGOYxQ2qYb6kJx7; 5 716WmCez2zSYpnLluzzo; 6 a9As4Fl600NbgOG29On3; 7 zPCEggNIqUlvenKFsXYm; 8 Y4KDoTiHTY9u8qpHDLMx (flow Fz7URx4Jqm7gKH0LZDfT).

| Dosya | İş |
|---|---|
| `ses_hazirla.sh` | Parça 7'ye 29,77 sn'de 1,5 sn sessizlik ("nasıl kurardın?"); parçalar + selam loudnorm iki geçişli −19,5 LUFS, tepe ≤ −1,5 dBTP. Çıktı scratchpad'e. |
| `zamanla.py` | Bölüm 1 sürümü; `[SELAM` paragrafı atlanır (selam ayrı dosya). |
| `zamanlama-1..8.json` | Cümle/kelime zamanları (normalize sesten). Zayıf sınır yalnızca parça 5 cümle 40. |
| `parcalar.json` | Parça 1: 37,5 sn'de 11,4 sn intro + selam; abone kartları parça 2 211,62 sn ve parça 8 46,97 sn (sözlü çağrı başlangıcı); parça 8 sonunda 20 sn bitiş ekranı. |

Tahmini birleşik süre: 16:53 (13–17 dk içinde).

## Sıradaki
1. Render öncesi: 2N7002E I_DM koşulu (tp = 10 µs) PDF s. 1'de gözle doğrula (`icerik.md` 5b).
2. `motor.js`, `tahta.html`, `render.mjs`, `kontrol.mjs`, `abone.*` Bölüm 1'den kopyalanır (köşe başlığı "Ders 1 - Bölüm 2: Akımın yönü, açık devre ve yük"); `parca-1.js … parca-8.js` sahne planlarına göre yazılır → otomatik QC → render.
3. Birleştirme: Bölüm 1 `birlestir.sh` + `muzik_ekle.sh` (açılış kesiti intro kartıyla 37,5 sn'de, selam 37,8 sn'de).
