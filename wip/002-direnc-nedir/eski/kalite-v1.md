# Kalite kontrolü — 002-direnc-nedir

Sonuç: **GEÇTİ** (1. tur; içerik denetimi düzeltmeleri ve alt güvenli alan düzeltmesi render'dan önce/sonra uygulandı)

## A. İçerik doğruluğu ve eksiksizlik
- `dogruluk.md`: her iddia için satır ✔. Sahne kodunda `check` ile: R ↑ → I ↓ sıralaması, renk kodları (100/300/50 Ω). Render konsolunda doğrulama hatası yok.
- Gerekli bilgi listesi (senaryo.md) tam: tanım (akıma engel), metafor, R ↑ → I ↓, R ↓ → I ↑, elektron − → + ve akım + → −, gerçek hayat modelleri, R ve ohm (Ω) en sonda.
- Bağımsız alt ajan (yalnızca metin) denetledi: "söndü" → "karardı", telefon → su ısıtıcısı, "akışa" → "akıma engel" düzeltildi (render'dan önce; ayrıntı dogruluk.md).

## A2. Görsel öğretim
- Yazılar okunmadan da anlaşılıyor: direnç devreye girince ampul kararır; dar boruda seyrek akış; anahtar fiziksel olarak kapanınca akış başlar; R artınca elektronlar yavaşlar, ampul kararır; R azalınca hızlanır, parlar.
- Her etiket ilgili animasyondan 0,4–4,2 sn sonra geliyor (timeline `pre`). Gerçek hayat mini modelleri (ısıtıcı teli, ampul, ütü, su ısıtıcısı) var; ısıtıcı teli devredeki dirence dönüşüyor. Tanım/birim en sonda.
- Akım yönü kuralı: yeşil elektronlar − → +, ayrı renkte kırmızı geleneksel akım oku + → − ✔; ilk göründüklerinde "elektronlar", "akım yönü" etiketleri.

## B. Görüntü
- Son videodan 2 tur kontak sayfası (29 + 16 kare: her yazının ilk anı + 0,5 sn, her yazı geçişinin ortası, ~3 sn aralıklı genel kareler) incelendi.
- 1. turda pilin alt kenarı ekranın ~%82'sine iniyordu (alt %20 kuralı) → kamera %6 uzaklaştırıldı, tüm parçalar yeniden render edildi; şimdi ≤ %80.
- Üst %10 boş, yazılar %14/%21 bandında, tek satır (son karede 2 satır), nesnelere binmiyor; geçişlerde iki yazı üst üste yok. Karartma/gradyan yok, zemin mat koyu. Titreme, kesilme, iç içe geçme görülmedi. Kamera geçişlerinde (≈4–5,6 sn ve 12,6–13,9 sn) kısa bir an kadrajda yalnızca zemin/kenar görünüyor (hareketli geçiş).
- Render konsolunda sayfa hatası yok.

## C. Ses
- Seslendirme ve müzik yok; yalnızca olay efektleri (akış uğultusu akıma göre seviye değiştirir, direnç oturunca alçak thud, anahtar tık, değer değişiminde yumuşak pop).
- ebur128: entegre −15,5 LUFS, gerçek tepe −2,5 dBTP. Efektler 3,2 kHz alçak geçirenden geçirildi; 4 kHz üstü bant tepe −23,2 dB (genel tepeden ~21 dB aşağı), keskin ton yok.
- Okuma süresi: her yazı ≥ 1,03 × (1,2 sn + 0,35 sn × kelime) (`timeline` içinde `check`).

## D. Teknik
- ffprobe: 1080×1920, 30 fps, H.264 + AAC, 47,2 sn, 1416 kare ✔
