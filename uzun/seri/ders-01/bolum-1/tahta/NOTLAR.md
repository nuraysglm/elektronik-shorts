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
