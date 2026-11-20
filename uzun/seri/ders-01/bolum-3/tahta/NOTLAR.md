# Ders 1 - Bölüm 3/3 — tahta (whiteboard) üretim notları

Metin sürüm 1, kanal sahibi onayı 20.11.2026 14:38Z (`onaylar/metin-1-3`).

## Ses (20.11.2026 ~15:20Z)
- ElevenLabs eleven_v4, voice_id sLFd2sFq5fDrVDNCuUfI, her parça 1 take; toplam 13.158 kredi (kalan ~76.500). curl ile indirildi (`../ses/`), Drive yüklemesi gerekmedi.
- Süreler (ham): selam 10,45; parça 1 58,51; 2 112,43; 3 98,04; 4 104,99; 5 172,51; 6 239,65; 7 62,75 sn.
- Generation id (flow Fz7URx4Jqm7gKH0LZDfT): selam QhfTnPsWIuwWFSgLvsUN; 1 x9XdbzPky1zNVGiodHVX; 2 2jHdetOfb8Dg7AAzD5Is; 3 TEaHa4rg2AwWbbxUERSi; 4 b5b9OLZNFzjNFL3xuoSH; 5 vMh4bqeCFadbZTPLe48f; 6 dJznv9X9TArKqZxw10y8; 7 TUOCq32lom29QRBcLxwe.

| Dosya | İş |
|---|---|
| `ses_hazirla.sh` | Parçalar + selam loudnorm iki geçişli −19,5 LUFS, tepe ≤ −1,5 dBTP (sessizlik eklemesi yok). Çıktı scratchpad'e. |
| `zamanla.py` | Bölüm 2 sürümü; `[SELAM` paragrafı atlanır. |
| `zamanlama-1..7.json` | Cümle/kelime zamanları (normalize sesten). |
| `parcalar.json` | Parça 1: 46,0 sn'de 11,4 sn intro kartı + selam; abone kartları parça 2 109,51 sn ve parça 7 52,71 sn (sözlü çağrı başlangıcı); parça 7 sonunda 20 sn bitiş ekranı. |
| `motor.js` | Bölüm 2 motoru; köşe başlığı "Ders 1 - Bölüm 3: Gerilim, kısa devre ve ideal kaynak". Not: `_` yalnızca SONRAKİ TEK karakteri alt simge yapar (v_a_b). |
| `parca-1..7.js` | metin.md sahne planları. |
| `birlestir.sh` | 7 parça + abone katmanı (2 kez) + −16 LUFS. |
| `muzik_f.sh` | İş emri F müzik kuralı (Bölüm 2'den aynen). |

Render: `node render.mjs N --out wip/uzun-d01-b3/parca-N.mp4 --ses SES` (parça 1 sesi: parca-1.wav 0–46,0 + 0,3 sn sessizlik + selam.wav 11,1 sn'ye doldurulmuş + kalan).
Abone katmanı: `abone.mjs` (OZEL: profil-kucuk.jpg'den yuvarlak profil-daire.png + kalin.ttf = DejaVuSans-Bold (Condensed bu ortamda yok; kart içine sığdığı karelerle doğrulandı); scratchpad, depoda yok), `abone_ses.py`.

## İş emri M (20.11.2026 ~16:35Z) — kısmen
- (1) Parça 4 "Örnek" (5:38): düz siyah cetvel çizgileri + toprak sembolleri kaldırıldı → kesikli gri gerilim ekseni (`dashed`, GR), üstte "Gerilim (V)", her seviyede gri çentik, "0 V (toprak)" / "b: 0 V (toprak)". `qc.sh 4` temiz (kalem 0, taşma/çakışma/durağan 0); kare 103 sn gözle kontrol edildi. Ses değişmedi. **Henüz render edilip birleşik videoya konmadı.**
- (2) Parça 5 başlığı "Dersin girişindeki devre" (kodda). Yeni cümle sesi üretildi: ElevenLabs flow Fz7URx4Jqm7gKH0LZDfT, generation pBjbSn4ea44AuH4YeMqm ("Şimdi dersin girişindeki devreyi kuralım.", 2,8 sn, 41 kredi). **İndirme engellendi (elevenlabsusercontent.com 403)** → Drive `Uzun Video Sesleri/ders-01-bolum-3/cumle-5-14.mp3` bekleniyor (panel `onaylar/ses-1-3`).
- Sonraki çalışma: Drive'dan `cumle-5-14.mp3` al → `ses_hazirla.sh` düzeyine (−19,5 LUFS) getir → parca-5.wav'da 48,40–50,10 sn aralığını (cümle 14) yenisiyle değiştir (sonrası Δ kadar kayar) → zamanlama-5.json cümle 14 metni/kelimeleri + 15'ten sonrası +Δ → parça 4 ve 5'i render et → diğer parçaları birleşik videodan değil, yeniden render ile al (parça mp4'leri yok) veya birleşik videodan kes → birlestir.sh + muzik_f.sh → tam QC → yayin.json 7:20 sonrası zaman damgalarını +Δ güncelle.
