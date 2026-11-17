# 008b — kalite kontrolü (bölüm 7), 17.11.2026 — 1. tur: GEÇTİ

**A. İçerik:** dogruluk.md'de her iddia Razavi Ders 3 zaman damgasıyla ✔; ekrandaki sayılar sahnede hesaplanıp check() ile doğrulandı (render konsolunda doğrulama hatası yok). Gerekli bilgi 5/5. Bağımsız metin denetimi: SEVİYE üniversite, 2 zorunlu düzeltme + 1 öneri uygulandı (render öncesi).
**A2. Görsel öğretim:** cevabın ilk görüntüsü 4,2 sn (R 3 → 1 kΩ, sağ grafikte eğri; kıyas için kesik düz çizgi). Her yazı ilgili animasyondan sonra. Elektronlar − → + (ön kenarda soldan sağa), geleneksel akım oku + → − (sağ kenarda aşağı). Yasa/kart en sonda. Gerçek hayat: laboratuvar düzeneği (ayarlı güç kaynağı, ampermetre, renk kodlu direnç); ayrı mini model sahnesi süre sınırı nedeniyle yok.
**B. Görüntü:** son videodan 29 kare (her yazının ilk görünüşü +0,5 sn, yazı geçişleri, her 6 sn) 4 kontak sayfasında incelendi: kesilen/taşan yazı yok, yazı–nesne çakışması yok, grafik etiketleri (1/2/3 kΩ, eksenler, "doğrusal değil") ayrık, kalem imleci yazı bitince kayboluyor. --safe: güvenli alan 0 ihlal, yazı–nesne kesişimi 0; doluluk ihlali yalnızca kart sırasında (devre %80'e küçülür, kural 2a-16; 2e/doluluk precedent 007, 008a). freezedetect: 0 donuk aralık. Sahne geçişi yok (tek kadraj).
**C. Ses:** −16,2 LUFS, gerçek tepe −2,0 dBTP; 4 kHz üstü en yüksek −19,1 dB; seslendirme/müzik yok, yalnızca olay efektleri (pop, tık, thud, hafif uğultu).
**D. Teknik:** 1080×1920, 30 fps, H.264 + AAC, 56,17 sn (≤ 60 sn).

## v2 — renk bandı iş emri (17.11.2026, 20:25 UTC) — GEÇTİ (1. tur)
- Değişiklik: ayarlı direncin gövdesindeki renk bantları kaldırıldı (`bands: []`); değer yalnızca R etiketiyle (1/2/3 kΩ) verilir. Yazı, süre, zamanlama, kamera değişmedi → güvenli alan / kesişim ölçümü (guvenli_alan.json) ve bağımsız metin denetimi geçerli kalır.
- Kare kontrolü (3; 14,9/15,05; 29,9/30,05; 44,9/45,05; 55 sn): bant yok, parça birleşimlerinde zıplama/renk farkı yok, devre ve yazılar v1 ile aynı.
- D: 1080×1920, 30 fps, H.264 + AAC, 56,2 sn. C: −16,2 LUFS, tepe −2,0 dB, 4 kHz üstü max −19,1 dB. Donuk an (freezedetect 0,5 sn): 0.
- v1: media/008b-ohm-iv-karakteristigi/eski/008b-ohm-iv-karakteristigi-v1.mp4
