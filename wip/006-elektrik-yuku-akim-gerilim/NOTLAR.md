# NOTLAR — 006 (Elektrik yükü, akım ve gerilim)
- 21:05 UTC: stok 1 (005 Ohm 12.11 16:00) → yeni video. Main birleştirme Actions'ta "queued" (005 dalı main'e geçmedi); bu dal 005 dalının üstünden açıldı.
- 21:24 UTC: senaryo, dogruluk, scene.js (86,2 sn) yazıldı; kare kontrolü 3 sayfa (atom sayı etiketleri güvenli alana alındı, LCD sığdırma, devre yukarı, tel kısaltıldı).
- Sıradaki: bağımsız metin denetimi → güvenli alan + hareket kontrolü → parça render → birleştir → kalite → Metricool (ilk boş 16:00: 2026-11-13).
- parca-00: tamam (21:47 UTC)
- parca-01: tamam (21:48 UTC)
- parca-03: tamam (21:50 UTC)
- parca-02: tamam (21:50 UTC)
- 21:59 UTC: kalite turu 1: devredeki elektronlar beyazımsı → yeşil/sarı-yeşil yapıldı; parca-02, 03 yeniden
- parca-02: tamam (22:11 UTC)
- parca-03: tamam (22:11 UTC)
- 22:1x UTC: birleştirildi, kalite geçti (85,8 sn). Sıradaki: Metricool taslağı (670534653296070172) güncelle → 13.11 16:00.
- 22:14 UTC: Metricool taslağı güncellendi → 2026-11-13 16:00 Londra (planlandı). İş bitti; parçalar yayından sonra silinecek.

## 2. sürüm (yeniden düzenle, bölüm 2b) — 12.11.2026
- 08:07 UTC: Razavi Lec 1 transkripti alındı (vidIQ). Eski senaryo/doğruluk/kalite/sahne eski/ altına taşındı, eski parçalar silindi.
- 08:35 UTC: yeni scene.js (87,1 sn) yazıldı; kare kontrolü 2 sayfa (grafik yazı bandından aşağı alındı, elektron rengi koyulaştırıldı).
- Sıradaki: senaryo.md + dogruluk.md → bağımsız metin denetimi → güvenli alan → parça render → birleştir → kalite → eski MP4'ü media/…/eski/'ye taşı → Metricool taslağı (670534653296070172) güncelle → 15.11 16:00.
- parca-01: tamam (08:42 UTC)
- parca-02: tamam (08:43 UTC)
- parca-00: tamam (08:43 UTC)
- parca-03: tamam (08:43 UTC)
- 08:52 UTC: kalite turu 1: li3 etiketi voltmetreyle çakışıyordu, +1 C / a(+) ve W etiketleri, gerçek hayatta kenardan taşan tel düzeltildi; parca-01..03 yeniden
- parca-01: tamam (09:05 UTC)
- parca-02: tamam (09:05 UTC)
- parca-03: tamam (09:06 UTC)
- 09:10 UTC: birleştirildi, kalite 2. turda geçti (87,2 sn, −16,6 LUFS, güvenli alan 0 ihlal). Sıradaki: main doğrula → Metricool taslağı güncelle → 15.11 16:00.
- 09:09 UTC: Metricool taslağı güncellendi → 2026-11-15 16:00 Londra (planlandı, draft:false). Parçalar yayından sonra silinecek.

## 3. sürüm (kanal sahibinin 2. iş emri, 12.11.2026) — v2 üzerinde düzeltme
- 09:40 UTC: (1) tel döngüsünün başlangıcı arka kenara alındı (eski başlangıç direncin içindeydi → arka tel parçası hiç çizilmiyordu); tel kesintisiz, elektronlar telin üstünde. (2) "DERS 1" etiketi kaldırıldı. (3) Gerçek hayat: priz (230 V AC) → açık bıçaklı anahtar → lamba, kapalı bakır tel döngüsü; "≈ 230 V (AC)", "anahtar açık", "i = 0" etiketleri anahtara göre. Güvenli alan 0 ihlal.
- Sıradaki: 4 parça render → birleştir → kalite → v2'yi eski/'ye taşı → Metricool (670534653296070172) güncelle → 15.11 16:00, draft:false.
- parca-01: tamam (10:03 UTC)
- parca-00: tamam (10:04 UTC)
- parca-02: tamam (10:04 UTC)
- parca-03: tamam (10:04 UTC)
- 10:10 UTC: birleştirildi, kalite 1. turda geçti (87,2 sn). v2 eski/'ye taşındı. Sıradaki: Metricool güncelle → 15.11 16:00.
- 10:12 UTC: Metricool güncellendi → 2026-11-15 16:00 Londra (draft:false, autoPublish:true). İş bitti.

## 4. sürüm (yeniden düzenle, 13.11.2026: yalnızca ekran düzeni) — 14.11.2026
- 08:25 UTC: render.mjs --safe artık yazı–nesne kesişimini (userData.box) ve ana sahne doluluğunu (userData.main; ≥ %70 genişlik, ≥ %50 yükseklik) ölçüyor. v3 ölçümü: doluluk x %19–80, y %36–68 (yetersiz); 16 çakışma (3 kΩ×direnç, a/b×pil, üst yazılar×grafik vb.).
- Sıradaki: devre büyütülür/aşağı iner, grafik devre içine alınır, etiketler nesne yanına → güvenli alan 0/0/0 → 4 parça render → birleştir → kalite → v3 eski/'ye → Metricool (670534653296070172) yalnızca video, tarih 15.11 16:00 aynı.
- 08:20 UTC: v4 yerleşim bitti: devre X=1,0 ZH=1,4, grafik döngü içinde, kamera CD 9,3 / 62°; etiketler nesne yanına; gerçek hayat dikdörtgen kaide. Ölçüm: güvenli alan 0, kesişim 0, doluluk 0 ihlal (ANA x ≈ %7–86, y ≈ %27–79). Sıradaki: 4 parça render.
- parca-01: tamam (08:59 UTC)
- parca-00: tamam (09:00 UTC)
- parca-02: tamam (09:01 UTC)
- parca-03: tamam (09:02 UTC)
