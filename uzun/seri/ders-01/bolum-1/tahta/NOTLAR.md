# Ders 1 - Bölüm 1/3 — tahta (whiteboard) üretim notları

Altyapı `uzun/ornek-02/`'den uyarlandı (örnek klasörü değiştirilmedi).

| Dosya | İş |
|---|---|
| `ses_hazirla.sh` | Parça seslerini hazırlar: parça 5'e 32,82 sn'de 1,5 sn sessizlik ("tahmin et" sorusundan sonra, metin.md); her parça loudnorm iki geçişli, hedef −19,5 LUFS, tepe ≤ −1,5 dBTP. Çıktı scratchpad'e (depoya girmez). |
| `zamanla.py` | `ornek-02/zamanla.py`'nin parça parça sürümü: cümle/kelime zamanları → `zamanlama-N.json` (normalize edilmiş sesten). |
| `parcalar.json` | Parça ayarları: parça 1'de 32,96 sn'ye 4 sn sessiz intro kartı; parça 3 (0,15 sn) ve 6 (0,25 sn) abone kartı başlangıcı; parça 7 sonunda 20 sn bitiş ekranı alanı. |
| `motor.js` | Ortak tahta motoru. **Tek kalem**: kalemle çizilen her öğe build sonrası sıraya konur, iki öğenin çizim aralığı çakışmaz, kalem sonraki öğenin başına ≤0,3 sn'lik görünür hareketle gider. Silme 0,2 sn. Kalem durduğunda son yazılan yazı hafifçe vurgulanır (≥2 sn durağan an yok). Δ yazı tipinde olmadığı için elle çizilir. |
| `parca-1.js` … `parca-7.js` | Her parçanın sahnesi (metin.md sahne planları). |
| `render.mjs` | Parçayı kare kare çizer → H.264 CRF 23 + AAC. `--stills`, `--meta`. |
| `kontrol.mjs` | Otomatik QC: yazı–yazı ve yazı–çizgi çakışması, kadraj/alt bant (y > 821) taşması, ≥1 sn durağan aralık, tek kalem çakışması, konuşmadan >0,6 sn gecikme, kullanılan karakterler. |
| `abone.js`, `abone.html`, `abone.mjs` | "Abone ol + zil" kartı (ornek-02 çizimi) **ayrı saydam katman** (ProRes 4444) olarak; birleştirmede parça 3 ve 6'nın üstüne bindirilir. Profil fotoğrafı ve kalın yazı tipi `OZEL` klasöründen (scratchpad) okunur, depoya girmez. |

Parça videoları: `wip/uzun-d01-b1/parca-N.mp4` (abone kartı yok; birleştirmede eklenir).

## Birleştirme (Cuma) için sıra
1. `OZEL` klasörüne `profil-daire.png` (yüz/omuz, yuvarlak kırpılmış) + `kalin.ttf` → `node abone.mjs --out abone.mov`.
2. Parça 3 ve 6'ya `overlay` (parcalar.json `abone` zamanı); diğer parçalar olduğu gibi.
3. `ffmpeg concat` → `media/uzun/devre-teorisi-1-ders-01-bolum-1.mp4`; tam QC (UZUN.md 5).

## İş emri C (19.11.2026)
- `abone.js`: animasyon 4,5 sn; kart 0,4 sn'de girer, tık 1,0 sn (ABONE OL), 1,9 sn (zil), zil sallanması 1,0 sn. Kart sözlü çağrı cümlesinin başında girer.
- `abone_ses.py`: fare tıkı + tık/zil sesi (numpy, telifsiz) → `abone.wav` (scratchpad).
- `birlestir.sh PARCA_KLASORU abone.mov abone.wav CIKTI.mp4`: abone anları parça 3 0,05 sn ve parça 7 49,35 sn (parça 6'daki eski an kaldırıldı: orada sözlü çağrı yok); tepe sınırlama + iki geçişli doğrusal loudnorm → −16 LUFS, ≤ −1,5 dBTP; efektler −7,3 dB (anlık en yüksek ≈ −28 LUFS, konuşmanın ~12 dB altı).

## İş emri D (19.11.2026)
- `motor.js`: `G` (#1E7B4A koyu yeşil), `L` = 120 / `RX` = 1000 sütun hizaları, `kose()` sol üst kırmızı "Ders 1 - Bölüm 1: Akım nedir?" (parça 1'de kalemle yazılır; parça 2–7'de `sabit: true` = önceki parçadan sürüyor, kalem sırasına girmez), `baslik()` kırmızı sola hizalı başlık (+ alt çizgi). Köşe başlığı durağan-vurgu adayı değildir.
- Parça 1: intro aralığı 8,4 sn (`parcalar.json`); ses = `parca-1.wav` 0–32,96 + 0,3 sn sessizlik + `selam.wav` (8,1 sn'ye doldurulmuş) + kalan. Selam −19,5 LUFS'e normalize edilir (ses_hazirla.sh ile aynı loudnorm).
- Parça 7: bitiş ekranından önce köşe başlığı silinir; "Oynatma listesi" koyu yeşil.
- Abone anları birleşik videoda: 3:41,3 ve 14:45,3 (parça yerel zamanları değişmedi: 3 → 0,05 sn; 7 → 49,35 sn).
- Müzik yok (Drive'da `seri-muzik` bulunmadı).

## İş emri E (19.11.2026)
- `muzik_ekle.sh GIRIS.mp4 acilis.mp3 kapanis.mp3 CIKTI.mp4`: birleşik videoya (iş emri D çıktısı) seri müziği. Açılış kesiti 32,96 sn'de (intro kartı) girer, 33,26 sn'de (selam) 0,25 sn içinde −7,3 dB → −19,3 dB'e iner (konuşmanın ~14 dB altı), 8 sn sonunda yumuşak biter; kapanış kesiti son 10 sn −7,6 dB (~−24 LUFS); son 2 sn `fade` (görüntü) + `afade` (ses); `alimiter` 0,78. Sonuç −16,1 LUFS, tepe −1,8 dBTP.
- Müzik dosyaları Drive'dan scratchpad'e indirildi, depoya girmez.
