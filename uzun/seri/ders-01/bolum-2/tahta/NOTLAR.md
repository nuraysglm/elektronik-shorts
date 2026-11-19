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

## Render ve birleştirme (gece çalışması 19/20.11.2026)
- 2N7002E I_DM koşulu: PDF metninde µ işareti düşüyor ("tp = 10 s"); görsel doğrulama bu ortamda yapılamadı (onsemi sitesi curl'e kapalı, WebFetch yalnızca metin). Dolaylı kanıt: aynı belgede bütün µ'lar düşüyor (pulse width ≤ 300 s = 300 µs; I_D = 250 A = 250 µA) ve SOA grafiğinin eksen dizisi "10 s, 100 s, 1 ms, 10 ms…" → 10 µs. Ekranda "t_p = 10 μs".
- `motor.js`: Bölüm 1 motoru + `^` üst simge ve `` ` `` (üst simgenin alt simgesi; ∫ sınırları) + `shade`, `strike`, `subBox`, `kutu` yardımcıları. Köşe başlığı "Ders 1 - Bölüm 2: Akımın yönü, açık devre ve yük".
- `parca-1.js … parca-8.js`: metin.md sahne planları. Değişiklikler: "Mini tasarım: sensör + düğme pil" → "sensör ve düğme pil" (2d-5: "+" kelime yerine yok); Parça 5'e "Bölüm 1 ile sınama" ve "İşaret" başlıkları; Parça 6 x işaret etiketleri 18 px sağa (5 ms kesikli çizgisiyle çakışmasın).
- `qc.sh N`: otomatik QC özeti (kontrol.mjs). 8/8: tek kalem çakışması 0, taşma 0, yazı–yazı çakışması 0, ≥1 sn durağan 0; yazı–çizgi yalnızca bilerek üstü çizilen "v = 0 V ?" ve "0 V ?".
- Render: `node render.mjs N --out wip/uzun-d01-b2/parca-N.mp4 --ses SES` (ses: ses_hazirla.sh çıktısı; parça 1 = parca-1.wav 0–37,5 + 0,3 sn sessizlik + selam.wav 11,1 sn'ye doldurulmuş + kalan). Süreler: 60,56 / 216,8 / 112,2 / 132,2 / 139,32 / 134,76 / 139,77 / 77,07 sn.
- Abone katmanı: `abone.mjs` (OZEL: profil-kucuk.jpg'den yuvarlak profil-daire.png + DejaVuSansCondensed-Bold → kalin.ttf; scratchpad, depoda yok), `abone_ses.py`.
- `birlestir.sh` (8 parça; abone 272,18 sn ve 982,50 sn) → `muzik_ekle.sh` (T0 37,5, selam 37,8) → `media/uzun/devre-teorisi-1-ders-01-bolum-2.mp4`: 16:52,6, 1920×1080, 30 fps, 33,4 MB, −16,1 LUFS, tepe −1,8 dBTP.
- Tam QC: 49 kare gözle kontrol (kanca, intro, her sahne, abone 1 ve 2'nin 4 anı, bitiş ekranı, kararma); zaman damgaları 6:29, 8:41, 13:15, 15:35 karelerle doğrulandı.
- Bilinen: 1. abone kartı 4:32'de (UZUN.md 4a "en geç 4. dk"; onaylı metinde çağrı Parça 2'nin sonunda, Parça 2 "Uygulamada" eklemesiyle uzadı). Panelde not edildi.
