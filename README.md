# Elektronik Shorts

@NuraySaglamBedir kanalı için her gün bir elektronik kavramını anlatan animasyonlu YouTube Shorts üreten ajan.

- **Ajanın talimatı:** [AJAN.md](AJAN.md). Ajana yeni bir şey öğretmek için bu dosyayı düzenleyin.
- **Konu sırası:** [konular.md](konular.md)
- **Ne yayınlandı:** [gunluk.md](gunluk.md)
- **Animasyon motoru:** `motor/shortsmotor.py` (Python, matplotlib, ffmpeg)

Her sabah zamanlanmış görev çalışır: sıradaki konuyu seçer, animasyonu kodla çizer, kareleri kontrol eder, videoyu render eder, `videolar` dalına koyar ve Metricool üzerinden YouTube Shorts olarak 12:30'a (Türkiye) planlar.
