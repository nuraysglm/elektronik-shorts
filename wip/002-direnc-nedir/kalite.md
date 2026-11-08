# Kalite kontrolü — 002-direnc-nedir (2. sürüm)

Sonuç: **GEÇTİ** (render öncesi ve 1. render turundaki görüntü/ses hataları düzeltildi; ayrıntı aşağıda)

## A. İçerik doğruluğu ve eksiksizlik
- `dogruluk.md`: her iddia için satır ✔. Sahne kodunda `check` ile bağımsız doğrulama: tel direnci ρL/A ≈ 0,0336 Ω (ekranda 0,03 Ω), toplam ≈ 90 Ω, akım azalır, 9 V = 6 V + 3 V paylaşımı, ampul gücü ~1/9, tel payı < %0,1, renk kodu 60 Ω (mavi-siyah-siyah), sütun oranı 60/30, borudaki debi 1/3. Render günlüklerinde doğrulama hatası yok.
- Gerekli bilgi listesi (senaryo.md) tam: devre + adım adım açıklama zinciri (ampulün direnci → toplam direnç ↑ → akım her yerde ↓ → pil hâlâ 9 V → ampule daha az gerilim → ampul kararır), daralan boru benzetmesi (borunun tamamında akış azalır, daralmada su yerel olarak hızlı), cihazların direnci (ampul, elektrikli soba, ütü, su ısıtıcısı, şarj olan telefon), bakır telin çok küçük direnci (sütun grafiği), en sonda R / ohm ve seri toplam formülü.
- Bağımsız alt ajan (yalnızca metin) denetledi; 11 düzeltme render'dan önce uygulandı (dogruluk.md).
- Kaynak: Wikipedia "Resistor" bu çalışmada açılamadı (en.wikipedia.org ağ izni yok); kanal sahibine bildirildi.

## A2. Görsel öğretim
- Yazılar okunmadan da anlaşılıyor: direnç iner → tüm elektronlar yavaşlar, ampul kararır; zincirde direnç kalkıp yeniden iner (akım ↑ / ↓ tekrar gösterilir); 9 V halkası, 6 V / 3 V etiketleri; daralma büyüyünce çark ve debi ibresi yavaşlar.
- Her yazı ilgili animasyondan sonra geliyor (`pre`), kalemle yazılıyor (0,27 sn/kelime), okuma süresi yazma bitince başlıyor (`penTimeline` içinde `check`). Formül en sonda. Kanca istisnası: soru ilk karede hazır.
- Akım yönü kuralı: yeşil elektronlar dış devrede − → +, ayrı renkte kırmızı geleneksel akım oku + → −, ilk göründüklerinde "elektronlar" / "akım yönü" etiketleri ✔.

## B. Görüntü
- Render öncesi 2 kontak sayfası + parça karelerinden 3 sayfa + son videodan 2 sayfa (her yazının ilk anı/yazma sonu, geçiş ortaları, ~3 sn aralıklı kareler) incelendi.
- Düzeltilenler: kanca alt satırı ampulün üstüne biniyordu ve pil alt %20 sınırını aşıyordu → kanca kamerası uzaklaştırıldı, alt satır başlığın altına alındı (0. parça yeniden render); kalem maskesi yazı başlamadan ilk harfin ince şeridini gösteriyordu → `stage.js` maskesi düzeltildi; tel sütunu üstten bakışta kısa kutu gibi görünüyordu → ince şerit yapıldı, sütun etiketleri sütunların altına alındı (2–5. parçalar yeniden render). Ekran kenarında kesilen etiketler (60 Ω, 6 V, 9 V, daralma, debi) içeri alındı.
- Üst %10 boş, alt %20'de önemli nesne yok, yazılar %14 / %21 bandında, en fazla 2 satır, nesnelere binmiyor. Karartma/gradyan yok. Titreme, iç içe geçme görülmedi.
- Not: kamera uçuşlarının ortasında (~45,5 sn, ~63 sn, ~79,5 sn) kısa bir an kadrajda yalnızca zemin görünüyor (hareketli geçiş; kamera hareket ettiği için donuk kare değil).
- freezedetect (n=0,001, d=0,5): 0 donuk aralık ✔. Render konsolunda sayfa hatası yok.

## C. Ses
- Seslendirme ve müzik yok; yalnızca olay efektleri (akıma göre seviyesi değişen uğultu, direnç oturunca thud, anahtar tık, değer değişiminde yumuşak pop).
- 1. ölçümde 4 kHz üstü tepe −3,3 dB'di (anahtar "tık" efekti: gürültü + 2,4 kHz). `tools/audio.py` click efekti yumuşatıldı (900 Hz gövde + 1,8 kHz alçak geçiren). Yeni ölçüm: 4 kHz üstü tepe −24,3 dB (genel tepeden ~23 dB aşağı).
- ebur128: entegre −16,4 LUFS, gerçek tepe −1,6 dBTP ✔.

## D. Teknik
- ffprobe: 1080×1920, 30 fps, H.264 + AAC, 105,6 sn (3167 kare) ✔ (senaryo/sahne süresiyle aynı).
- Süre hedefin (45–90 sn) üstünde: iş emrindeki 4 sahne + adım adım açıklama bu süreyi gerektirdi; panelde kanal sahibine not edildi.
