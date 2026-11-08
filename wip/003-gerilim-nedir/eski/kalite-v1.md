# Kalite kontrolü — 003-gerilim-nedir

Sonuç: **GEÇTİ** (1. tur; render sonrası bulunan 2 görüntü hatası düzeltildi, kontrol tekrarlandı)

## A. İçerik doğruluğu ve eksiksizlik
- `dogruluk.md`: her iddia için satır ✔. Sahne kodunda `check`: V ↑ → I ↑, kanca 1,5 V → 9 V, v1/v2 etiket anlarındaki gerilim, pil yokken V = 0, kaynak etiketleri (1,5 / 3,7 / 5 / 12 V), yol sırası + → ampul → −. Render konsolunda doğrulama hatası yok.
- Gerekli bilgi listesi (senaryo.md) tam: potansiyel farkı, + yüksek / − düşük (renk geçişi), yükleri iter, V ↑ → I ↑ ve V ↓ → I ↓, elektron − → + ve akım + → −, gerçek hayat kaynakları, volt (V) en sonda.
- Bağımsız alt ajan (yalnızca metin) render'dan önce denetledi; uygulananlar: "(kabul)" eki, "Gerilim, yükleri iter" virgülü, son satırda "Gerilim (V)" → "Gerilim" (birimle karışmasın), renk kontrastı artırıldı.

## A2. Görsel öğretim
- Yazılar okunmadan da anlaşılıyor: AA pil yerine 9 V pil gelince ampul parlar, elektronlar hızlanır; pil çıkarılınca akış durur; telde + taraf sarı, − taraf koyu turuncu, geçiş ampulde; düşük gerilimde renk farkı azalır, elektronlar yavaşlar, ampul kararır.
- Her etiket ilgili animasyondan 0,5–4 sn sonra geliyor (timeline `pre`). Gerçek hayat mini modelleri (AA pil, telefon pili, şarj adaptörü, araba aküsü); AA pil platformdan uçup devredeki pile dönüşüyor. Tanım/birim en sonda.
- Akım yönü: yeşil elektronlar − → +, ayrı renkte kırmızı geleneksel akım oku + → − ✔; ilk göründüklerinde "elektronlar", "akım yönü" etiketleri.

## B. Görüntü
- Son videodan kontak sayfaları (34 + 12 kare: her yazının ilk anı + 0,5 sn, her geçişin ortası, ~3 sn aralıklı genel kareler) incelendi; ayrıca tüm video sahne değişim ölçüsüyle (ffmpeg `scene`) tarandı.
- Bulunan ve düzeltilen hatalar: (1) 33. saniyeden başlayan parçada platform AA modeli varsayılan konumda devrenin ortasında görünüyordu → kod düzeltildi, parça yeniden render edildi. (2) 9,0 sn ve 35,6 sn'de tek karelik render (SwiftShader gölge) bozukluğu → 35,6 sn karesi 5 ms kaydırılmış zamanla yeniden üretildi; 9,0 sn karesi komşu kareyle değiştirildi (1 kare). Yeniden taramada bozuk kare yok (kalan işaretler kamera kaydırma başlangıcı).
- Üst %10 boş, yazılar %14/%21 bandında, tek satır (son karede 2 satır), nesnelere binmiyor; geçişlerde iki yazı üst üste yok. Karartma/gradyan yok. Pil alt kenarı ≤ %78. Render konsolunda sayfa hatası yok.

## C. Ses
- Seslendirme ve müzik yok; yalnızca olay efektleri (akış uğultusu gerilime göre seviye değiştirir, pil oturunca alçak thud, ok ve renk katmanı gelince yumuşak pop, mini modeller için thud).
- ebur128: entegre −16,0 LUFS, tepe −2,4 dBFS. 4 kHz üstü bant tepe −29,4 dB (keskin ton yok).
- Okuma süresi: her yazı ≥ 1,03 × (1,2 sn + 0,35 sn × kelime) (`timeline` içinde `check`).

## D. Teknik
- ffprobe: 1080×1920, 30 fps, H.264 + AAC, 42,6 sn, 1279 kare ✔
