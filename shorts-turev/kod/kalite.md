# Türev Short QC (d1b1-1, d1b1-2) — 20.11.2026

## d1b1-1
```
süre 57.39 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 3 vurgu, en kısa 1.28 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 29 yazı, seste 15 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 29 yazı x 65-929, y 211-1306; 19 çizgi y <= 1382
okuma süresi: 29 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=57.408000
    I:         -15.9 LUFS
    Peak:       -1.8 dBFS
```
## d1b1-2
```
süre 58.89 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 4 vurgu, en kısa 1.43 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 26 yazı, seste 17 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 26 yazı x 65-929, y 211-1306; 13 çizgi y <= 1382
okuma süresi: 26 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=58.901000
    I:         -15.9 LUFS
    Peak:       -1.7 dBFS
```

## Gözle kontrol
- Kontak sayfaları (her tahtanın ortası ve sonu, kart) + YouTube arayüzü maskeli 12 kare (alt %32, sağ düğme sütunu, üst %11) incelendi: yazı/etiket maskeye girmiyor, kesilen satır yok.
- Tam çözünürlük kırpıntılarında Δ, ², ’ ve × doğru çiziliyor; yedek yazı tipine düşen karakter yok.
- Tek kalem: çakışma 0, konuşmadan gecikme > 0,6 sn yok. ≥ 2 sn durağan an motorun nabız vurgusuyla önleniyor (son kartta nabız + alt çizgi).

## Notlar / kararlar
- Ders etiketi (AGENT.md 4a-6 "DERS 1" yok kuralı): tahtada sol üst "Ders 1 - Bölüm 1" köşe başlığı kullanılmadı; bölüm adı yalnızca UZUN.md'nin zorunlu son kartında.
- Son kart 3,0 sn (kanal sahibinin 2–3 sn kuralı); okuma süresi formülü 9 kelime için 4,35 sn verir — kart başlık niteliğinde, kural önceliği kanal sahibinin özel kuralında.
- İçerik: bütün sayılar uzun videonun doğrulanmış metninden (uzun/seri/ders-01/bolum-1/dogruluk.md); yeni iddia yok. İlk yorum sorusu (d1b1-1): 0,25–0,75 s penceresi → +2,5 − 2,5 = 0 mC → 0.
- Ses: Ders 1 - Bölüm 1 parça 1, 2, 6 mp3'lerinden cümle sınırlarında kesit (ses_kur.py), kesit arası 0,4 sn; kesit zamanları intro'lu yayın sürümüyle çapraz korelasyonla doğrulandı (sapma ≤ 0,05 sn). Yeni seslendirme yok, kredi 0. Müzik yok.

## Etiket düzeltmesi — 21.11.2026 (kanal sahibi 08:50: beğendi, yayınlansın)
```
süre 57.39 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 3 vurgu, en kısa 1.28 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 30 yazı, seste 15 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 30 yazı x 65-929, y 211-1306; 19 çizgi y <= 1382
etiket 'Devre Teorisi I · Ders 1, Bölüm 1' kutu [109, 220, 555, 267], 0 sn - son (57.39); içeriğe en yakın dikey boşluk 21 px (>= 15)
okuma süresi: 30 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=57.408000
    I:         -15.9 LUFS
    Peak:       -1.8 dBFS

süre 58.89 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 4 vurgu, en kısa 1.43 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 27 yazı, seste 17 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 27 yazı x 65-929, y 211-1306; 13 çizgi y <= 1382
etiket 'Devre Teorisi I · Ders 1, Bölüm 1' kutu [109, 220, 555, 267], 0 sn - son (58.89); içeriğe en yakın dikey boşluk 21 px (>= 15)
okuma süresi: 27 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=58.901000
    I:         -15.9 LUFS
    Peak:       -1.7 dBFS

```
- Etiket "Devre Teorisi I · Ders 1, Bölüm 1": 0 sn'den sona kadar sabit (yazılmaz/silinmez), Patrick Hand 38 px, koyu gri, kutu y 220–267 (üst %11 = 211 px'in altında). Tahta içeriği aşağı kaydırıldı (d1b1-1: A +30 px, B +60 px ve grafik kutusu 1000–1215; d1b1-2: A satır aralıkları sıkıştırıldı, B +45 px). Etiket ile içerik arası en az 21 px.
- Ses: eski dosyadaki AAC akışı birebir kopyalandı (bayt düzeyinde aynı); süre değişmedi. Giriş sorusu ve "Dersin tamamı" kartı aynen.
- Gözle: ilk (0 sn), orta ve son kareler YouTube maskesiyle ve tam çözünürlük kırpıntısıyla incelendi; etiket okunur, "·" yazı tipinde var, çakışma/taşma yok.
- Not: AGENT.md 4a-6 ("ders etiketi yok") kuralına bu iki türev Short için kanal sahibinin 21.11 kararıyla istisna.

## v3 — yönlendirme etiketi + Beğen–Paylaş–Abone ol animasyonu (21.11.2026, kanal sahibi 08:50 ve 13:14)
```
süre 57.89 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 2 vurgu, en kısa 1.28 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 28 yazı, seste 15 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 28 yazı x 65-929, y 211-1306; 18 çizgi y <= 1382
etiket 'Dersin tamamı için:' / 'Devre Teorisi I oynatma listesi · Ders 1 - Bölüm 1' kutu [109, 215, 755, 302], 0 sn - son (57.89); içeriğe en yakın dikey boşluk 21 px (>= 15)
son animasyon: 54.39-57.89 sn (3.5 sn), 7 kutu x 260-780, y 526-1276; sıra Beğen 0.4 / Paylaş 1 / Abone 1.6 (tık 2.08, zil 2.12)
okuma süresi: 28 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=57.890000
    I:         -15.7 LUFS
    Peak:       -1.5 dBFS

süre 59.39 sn (50-60, kesin üst sınır 60,0)
(a) vurgu -> silme: 3 vurgu, en kısa 4.93 sn
(b) abone kartı/çağrısı yok (Short) -> uygulanmaz
(c) "kanca" kelimesi: 0 (ekranda 25 yazı, seste 17 cümle tarandı)
(d) gerilim seviyesi çizimi yok (yalnızca akım/yük grafikleri) -> geçti
(e) intro: Short'ta intro yok (türev Short kuralı; müzik yok) -> uygulanmaz
güvenli alan: 25 yazı x 65-929, y 211-1306; 12 çizgi y <= 1382
etiket 'Dersin tamamı için:' / 'Devre Teorisi I oynatma listesi · Ders 1 - Bölüm 1' kutu [109, 215, 755, 302], 0 sn - son (59.39); içeriğe en yakın dikey boşluk 18 px (>= 15)
son animasyon: 55.89-59.39 sn (3.5 sn), 7 kutu x 260-780, y 526-1276; sıra Beğen 0.4 / Paylaş 1 / Abone 1.6 (tık 2.08, zil 2.12)
okuma süresi: 25 yazı kontrol edildi (1,2 + 0,35 x kelime)
tek kalem çakışması 0, gecikme > 0,6 sn: 0
QC otomatik: GEÇTİ

stream|codec_name=h264|width=1080|height=1920|r_frame_rate=30/1
stream|codec_name=aac|r_frame_rate=0/0
format|duration=59.390000
    I:         -15.7 LUFS
    Peak:       -1.3 dBFS

```
- Süre ≤ 60,0 sn: d1b1-1 57,89 sn, d1b1-2 59,39 sn → cümle çıkarılmadı (konuşma kesitleri v2 ile aynı; ses_kur.py yeniden çalıştırıldı, cümle zamanları birebir aynı).
- Etiket: iki satır, 0 sn–son sabit, kutu y 215–302 (üst %11 = 211 px'in altında), x 109–755 (≤ 929). İçerik remapY ile aşağı alındı; yazı–yazı çakışması 0, en yakın içerik boşluğu 21 / 18 px.
- Son animasyon (3,5 sn): kutular x 260–780, y 526–1276 (yazı alanı y ≤ 1306, sağ düğme sütunu x ≥ 929 boş); etiketle ve birbiriyle çakışma yok (qc.py).
- Gözle: her iki videonun mp4'ünden animasyonun 10 anı (0,15 / 0,35 / 0,55 / 0,85 / 1,2 / 1,75 / 2,15 / 2,6 / 3,1 sn + son kare) ve tahtanın ilk/orta/son kareleri tam çözünürlükte incelendi: bulanıklaşma, boş başparmak → mavi dolu, paylaş whoosh çizgileri, ABONE OL → ABONE OLUNDU + zil sallanması doğru sırada; "Beğen" / "Paylaş" 70 px, alt satır 52/66 px, etiket 34/36 px telefonda okunur.
- Ses: konuşma −15 LUFS (değişmedi); efektler numpy (pop, tık, whoosh, zil 0,95 sn; 4 kHz üstü alçak geçiren), tepe −4,5 dBTP (≤ −3), efekt bölümü ~−22 LUFS (konuşmadan ~6–7 dB alçak). Toplam −15,7 LUFS, tepe ≤ −1,3 dBTP.
- Eski dosyalar (d1b1-1.mp4, d1b1-2.mp4; Metricool'da planlı) değiştirilmedi.
