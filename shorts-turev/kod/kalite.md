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
