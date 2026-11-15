# 007 — notlar
- 08:15 UTC: transkript (Razavi Lec 2) alındı; senaryo.md, dogruluk.md, scene.js yazıldı; kare kontrolü 2 tur (düzeltmeler: ayarlı direnç oku yeri, ampermetre yönü, kanca alt satırı, gerçek hayat ölçeği, grafik ∞ etiketi).
- Sıradaki: bağımsız metin denetimi → hareket kontrolü → parça parça render (render_parts.sh) → birlestir.sh → kalite.md → Metricool.
- 08:3x UTC: bağımsız denetim (üniversite düzeyi) 4 düzeltme uygulandı; güvenli alan kontrolü düzeltildi; parça parça render başladı.
- parca-03: tamam (09:03 UTC)
- parca-02: tamam (09:04 UTC)
- parca-01: tamam (09:05 UTC)
- parca-00: tamam (09:05 UTC)
- 09:16 UTC: birleştirildi + ses → media/007-…/ (83,0 sn). Kalite kontrolü GEÇTİ (kalite.md). scenes/007-gerilim-akim-kaynagi.js. Sıradaki: main'de doğrula → Metricool 2026-11-16 16:00.
- 09:18 UTC: Metricool'da planlandı: 2026-11-16 16:00 Londra (uuid 7591375855375960443). Parçalar silindi. İş bitti.

## 2. sürüm (yeniden düzenle, 13.11.2026: yalnızca ekran düzeni) — 14.11.2026
- 12:20 UTC: yerleşim: devre X=1,0 ZH=1,4; grafik döngü içinde (GX −0,05, GZ −0,5, GW 1,3), voltmetre (0,22; 0,75), ampermetre arka-sol (AMZ −0,95), anahtar SWZ 0,35; kamera CD 9,6 / 62°. Kaynak etiketi ("ideal … kaynağı", 2 satır) devre içinde sola, kablolardan uzak; R etiketi direncin solunda; gerçek hayat dikdörtgen kaide, ölçek 1,25. render.mjs --safe: güvenli alan 0, yazı–nesne/yazı–yazı 0, doluluk 0 ihlal (ANA x ≈ %8–89, y ≈ %27–80). İçerik/yazılar/süre aynı (83,0 sn).
- Sıradaki: 4 parça render → birleştir → kalite → v1 eski/'ye → Metricool (7591375855375960443) yalnızca video, tarih 16.11 16:00 aynı.
- parca-03: tamam (12:53 UTC)
- parca-01: tamam (12:53 UTC)
- parca-00: tamam (12:53 UTC)
- parca-02: tamam (12:53 UTC)
- 12:54 UTC: 4 parça render, birleştirildi; kalite GEÇTİ (kalite.md). v1 eski/'ye. Parçalar silindi. Sıradaki: main'de doğrula → Metricool yalnızca video (tarih 16.11 16:00 aynı).

- 12:55 UTC: Metricool gönderisinin yalnızca videosu güncellendi (tarih 16.11 16:00 aynı). İş bitti.

## 3. sürüm (kanal sahibinin 3. iş emri, 14.11.2026: i–R grafiği + 'Bilmen gerekenler' kartı) — 15.11.2026
- 12:40 UTC: grafik yeniden yazıldı: V modu R 0–3 kΩ, i 0–30 mA (24 mA eksen içinde); I modu R 0–4 kΩ, V 0–8 V, açık devrede nokta V = 2R doğrusunda köşeye gider, ötesi 'eksen dışı' oku + voltmetreyle aynı değer (V = … V / V → ∞). Eksen etiketleri çizim alanı dışında; '↑ ∞' dik ucun sağında; 'i ∝ 1/R — doğrusal değil' notu. check(): i(3 kΩ)=2, i(1 kΩ)=6, i(0,25 kΩ)=24 mA konumları. f1 karta taşındı; kart (başlık + 4 madde), devre %80'e küçülür. Süre 88,4 sn. --safe: güvenli alan 0, kesişim 0, doluluk yalnızca kart sırasında (küçülme, 2a-16).
- Sıradaki: 4 parça render (render_parts.sh) → birlestir.sh → kalite → v2 eski/'ye → Metricool yalnızca video + açıklama, tarih 16.11 16:00 aynı. Son tarih 16.11 15:30.
- parca-01: tamam (12:47 UTC)
- parca-00: tamam (12:47 UTC)
- parca-02: tamam (12:47 UTC)
- parca-03: tamam (12:49 UTC)
- 12:50 UTC: 4 parça birleştirildi + ses; kalite 1. turda GEÇTİ (89,6 sn, −16,4 LUFS). v2 eski/'ye. Sıradaki: main'de doğrula → Metricool yalnızca video + açıklama (tarih 16.11 16:00 aynı).
