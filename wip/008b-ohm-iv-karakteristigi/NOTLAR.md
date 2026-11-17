# 008b — notlar
- 17.11.2026 ~08:10 UTC: stok 1 (yalnızca 008a, 17.11 16:00). İlk boş yayın günü 18.11 Çarşamba → Razavi serisi → 8b. Transkript (LUfU9LgClsA) alındı; zor-noktalar.md, senaryo.md, dogruluk.md, scene.js (58,6 sn) yazıldı. lcd/meter/psu → tools/lib/olcum.js (ikinci kullanım).
- Kare kontrolü 6 tur: yerleşim (güç kaynağı arka kenara, direnç ön kenara; grafik paneli arkada büyük), etiketler; --safe: güvenli alan 0, kesişim 0, doluluk yalnızca kart sırasında (kural 2a-16).
- Sıradaki: bağımsız metin denetimi → render_parts.sh (4 parça) → birlestir.sh → kalite.md → scenes/ + media/ → Metricool 2026-11-18 16:00 Londra.
- parca-03: tamam (08:50 UTC)
- parca-00: tamam (08:55 UTC)
- parca-01: tamam (08:55 UTC)
- parca-02: tamam (08:55 UTC)
- 08:57 UTC: birleştirildi + ses → media/008b-…/ (56,2 sn). Kalite 1. turda GEÇTİ (kalite.md). Sıradaki: main'de doğrula → Metricool 2026-11-18 16:00.
- 08:58 UTC: Metricool'da planlandı: 2026-11-18 16:00 Londra (uuid 5936940515449914811). Parçalar silindi. İş bitti.

## v2 — renk bandı iş emri (17.11.2026, ~20:05 UTC)
- İş emri: gövdedeki kırmızı-siyah-kırmızı bantlar R etiketiyle (1/2/3 kΩ) çelişiyor. R sürekli değiştiği (3 → 1 → 2 → 3 kΩ, ara değerler) için her an uyan bant hızlı renk değişimi (titreme) yapardı → iş emrindeki 2. seçenek: gövdede renk bandı yok (`bands: []`). Başka değişiklik yok.
- Direnç bütün videoda göründüğü için 4 parçanın hepsi yeniden render ediliyor (dal: claude/008b-ohm-iv-karakteristigi-renk).
- parca-03: tamam (20:17 UTC)
- parca-01: tamam (20:22 UTC)
- parca-00: tamam (20:23 UTC)
- parca-02: tamam (20:23 UTC)
