# 006 — Kalite kontrolü (bölüm 7)

Sonuç: **GEÇTİ** (2. turda; 1. turda devredeki elektronlar beyazımsı görünüyordu → yeşil / enerjili sarı-yeşil yapıldı, parça 02–03 yeniden render edildi).

**A. İçerik:** dogruluk.md'de 13 iddia ✔; sayılar kodda hesaplanıp check() ile doğrulandı (render konsolunda DOĞRULAMA HATASI yok). Gerekli bilgi listesinin tüm maddeleri videoda. Bağımsız metin denetimi (render öncesi): kritik hata yok, 7 ifade/animasyon düzeltmesi uygulandı (senaryo.md sonu).
**A2. Görsel öğretim:** her fikir önce animasyonla (protonların/elektronların parlaması, sayım, elektron geçişi, balonun eğilmesi, sayaç, LCD, enerji rengi), etiket sonra. Gerçek hayat: balon + yün kumaş, 9 V pil + ampul. Formüller en sonda (f1, f2). Elektronlar − → + (yeşil), ayrı kırmızı akım oku + → − (tel ve devre sahnesinde "elektronlar", "akım yönü" etiketleriyle).
**B. Görüntü:** son render'dan 4 kontak sayfası (her yazının ilk anı + yazma süresi, kesmeler ±0,15 sn, her ~3 sn genel kare, kapak). Kesmeler aynı kadrajda tek karede; kayma/yakınlaşma yok. Üst %11 boş, karartma/gradyan yok. Güvenli alan: guvenli_alan.json 482 kutu, 0 ihlal; YouTube maskeli kontrol kareleri incelendi. Donukluk: freezedetect (0,5 sn) 0 olay. İlk kare: soru başlığı + atom.
**C. Ses:** −16,7 LUFS, tepe −2,4 dBFS; 4 kHz üstü en yüksek −27,6 dB; yalnızca olaylara bağlı yumuşak efektler (pop, thud, uğultu); seslendirme/müzik yok. Okuma süresi kuralı penTimeline'da check ile sağlandı.
**D. Teknik:** ffprobe 1080×1920, 30 fps, H.264 + AAC, 85,8 sn (≤ 90 sn sınırı).
