# 006 (2. sürüm) — kalite kontrolü (bölüm 7)

**Sonuç: GEÇTİ (2. turda).** Süre 87,2 sn (≤ 90).

## A. İçerik doğruluğu ve eksiksizlik
- dogruluk.md: 17 iddia, hepsi Razavi Ders 1 transkript zaman damgası veya hesapla doğrulandı ✔
- Ekrandaki sayılar kodda hesaplanıyor, check() ile doğrulanıyor; render konsolunda DOĞRULAMA HATASI yok ✔
- Gerekli bilgi listesi (senaryo.md) tam ✔
- Bağımsız metin denetimi (alt ajan, yalnızca metin, render öncesi): seviye "üniversite". Uygulanan düzeltmeler: "anahtar uçlarında 9 V" (hangi uç olduğu belirtildi), "anahtarda V = 0", "anahtarda ≈ 230 V (AC)" (lambanın değil anahtarın uçları), V_ab = 9 J ÷ 1 C = 9 V, "Yük = i(t) altındaki alan", "Gerilim: iki nokta arası", son satır 1 V = 1 J/C. Öneri olup uygulanmayanlar: V_ab = −V_ba ve referans okun ters seçilmesi (90 sn sınırı ve "en fazla 2 nokta" kuralı nedeniyle); "ideal" kelimesi üst satırdan çıkarıldı (genişlik), dogruluk.md'de ideal anahtar varsayımı yazılı.

## A2. Görsel öğretim
- Yazısız izlenince: anahtar kapanır → elektronlar akar, grafik 0 → 3 mA, alan dolar; anahtar açılır → akış durur, grafik 0; voltmetre açık anahtarda 9,00 V, kapalıda 0,00 V ✔
- Gerçek hayat mini modeli: duvar lamba anahtarı + sönük ampul ✔; kurallar en sonda (f1, f2) ✔
- Elektronlar yeşil − → +, akım oku kırmızı + → − (sağ kenarda pilin + ucundan arkaya), ilk görünüşte "elektronlar" / "akım yönü" etiketli ✔

## B. Görüntü
- Kontak sayfaları: 41 kare (her 3 sn + her yazının ilk tam görünüşü + iki kesmenin ±0,5 sn'si), 6 sayfa.
- Tur 1 bulguları (düzeltildi, parca-01..03 yeniden render): (1) o2'de "i = 3 mA" etiketi voltmetre ekranının üstüne biniyordu → direncin iç arka köşesine alındı; (2) v1'de "+1 C" ile "a (+)" etiketleri üst üste → +1 C etiketi varışta söner; "W = … J" etiketi yükün yolundan yukarı alındı; (3) gerçek hayat sahnesinde sol tel ekran kenarından taşıyordu → kısaltıldı.
- Tur 2: SONUÇ_TUR2
- Kesmeler (≈ 61,6 sn ve 70,6 sn): aynı kadraj, doğrudan kesme, kayma/yakınlaşma yok ✔
- Üst %11 boş, karartma/gradyan yok ✔
- Güvenli alan: guvenli_alan.json 587 kutu, 0 ihlal ✔
- freezedetect (n=0,001, d=0,5): FREEZE

## C. Ses
- SES_OLCUM
- Seslendirme/müzik yok; yalnızca olay efektleri (anahtar tıkı, akım uğultusu, pop, thud) ✔
- Okuma süresi: penTimeline (yazma 0,27 sn/kelime + 1,2 sn + 0,35 sn × kelime) kodda check ile ✔

## D. Teknik
- TEKNIK
