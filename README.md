# Elektronik Shorts

@NuraySaglamBedir kanalı için her gün bir elektronik kavramını anlatan animasyonlu YouTube Shorts üreten ajan.

- **Ajanın talimatı:** [AGENT.md](AGENT.md). Ajana yeni bir şey öğretmek için bu dosyayı düzenleyin.
- **Konu sırası:** [konular.md](konular.md)
- **Ne yayınlandı:** [gunluk.md](gunluk.md)
- **Animasyon motoru:** `tools/` (three.js sahneleri, Playwright ile kare kare render, numpy ile ses)

Zamanlanmış görev çalışınca sıradaki konuyu seçer, gerçekçi 3D sahneyi three.js ile kodla kurar, kareleri kontrol eder, videoyu render eder, `media/` altına koyar ve Metricool üzerinden YouTube Shorts olarak planlar.
