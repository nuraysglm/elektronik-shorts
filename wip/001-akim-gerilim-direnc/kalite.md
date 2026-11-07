# Kalite kontrolü — 001-akim-gerilim-direnc

Sonuç: **GEÇTİ** (2. turda; 1. turdaki iki görüntü hatası düzeltildi)

## A. İçerik
- `dogruluk.md`: tüm iddia, formül ve sayılar ✔; ekrandaki sayılar sahne kodunda hesaplanıyor ve `console.assert` ile doğrulanıyor (render konsolunda hata/uyarı yok).
- Gerekli bilgi listesi (senaryo.md) tam: tanımlar, birimler (A, C, V, Ω, mA), I = Q/t, V = I × R, I = V/R, örnek 9 V / 450 Ω = 20 mA, 2 kat gerilim → 2 kat akım, 2 kat direnç → yarı akım, özet.
- Bağımsız alt ajan değerlendirmesi: sayısal hata yok. Önerileri uygulandı: "itme gücü" yerine "itme etkisi", "direnç zorlar" yerine "direnç engeller", 2. pilin ve 2. direncin seri eklendiği seslendirmede söyleniyor, miliamper önce tanımlanıyor, o7'de "diğeri sabitken" koşulu, kapalı devre vurgusu.
- Harf okunuşları Piper fonem çıktısıyla kontrol edildi (I → ı, V → ve, R → re).

## B. Görüntü
- Son render'dan her 1 sn'de bir kare (104 kare, 6 kontak sayfası) ve 71–87 sn aralığında 0,5 sn'de bir kare incelendi.
- 1. turda bulunan hatalar:
  1. Pil/direnç geçişinde etiketler 0,5 sn boyunca ara değer gösteriyordu (32 mA, 14 V, 864 Ω). Etiketler artık yalnızca gerçek değerlere atlıyor.
  2. 2. pil yukarı kalkarken üst yazı bandına giriyordu. Artık yerinde büyüyerek takılıp küçülerek çıkıyor.
  Düzeltilen 72–86 sn aralığı yeniden render edildi ve videoya kare kare yerleştirildi (3123 kare).
- Yazılar üst bantta (%4–24), en fazla 2 satır; etiketler nesnelere binmiyor; alt %20 boş; sağ kenar boşluğu korunuyor; titreme ve iç içe geçme yok.
- Render konsolunda sayfa hatası yok.

## C. Ses
- Entegre ses −16,0 LUFS; tepe −1,5 dBFS.
- 4 kHz üstü: en yüksek −7,4 dB, kaynağı yalnızca seslendirmedeki ıslıklı sesler; efektlerde 4 kHz üstü enerji yok (≤ −53 dB).
- Efekt tepeleri konuşmanın en az 14 dB altında (thud −14, pop −16,5); müzik ortalaması konuşmanın ~16 dB altında ve konuşma sırasında kısılıyor.
- Seslendirme: 21 cümle ayrı ayrı üretildi, aralarında boşluk var; üst üste binen cümle yok.

## D. Teknik
- ffprobe: 1080×1920, 30 fps, H.264 + AAC, 104,1 sn (seslendirme zamanlaması: 104,09 sn) ✔
