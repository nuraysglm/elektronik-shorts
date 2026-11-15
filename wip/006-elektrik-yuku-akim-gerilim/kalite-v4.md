# 006 (4. sürüm) — kalite kontrolü (bölüm 7)

**Sonuç: GEÇTİ (1. turda; render sonrası 2 etiket düzeltildi, 7–15 ve 50–61 sn aralıkları yeniden render edilip parçalara eklendi).** Süre 87,2 sn (≤ 90).
Kanal sahibinin iş emri (13.11.2026): YALNIZCA ekran düzeni. İçerik, ekran yazıları, zamanlama ve süre v3 ile aynı. v3 → `media/…/eski/006-elektrik-yuku-akim-gerilim-v3.mp4`.

## İş emri: dengeli doluluk (bölüm 4)
- Devre büyütüldü (X 0,85 → 1,0; ZH 0,95 → 1,4), kamera yaklaştı (10,6 → 9,3) ve 62°'ye çıktı; ana sahne yazı bandının hemen altından (y ≈ %27) pil altına (y ≈ %79) uzanıyor, genişlik x ≈ %7–86.
- Otomatik ölçüm (`render.mjs --safe`, yeni): ana sahne kutusu her 0,5 sn'de ≥ %70 genişlik ve ≥ %50 yükseklik → 175 örnek, **0 ihlal** (v3: 175/175 ihlal, x %19–80, y %36–68).
- i(t) grafik ekranı devre döngüsünün içine alındı (yazı bandının altında; v3'te üst yazılar grafiğe biniyordu). Arka tel grafiğin üstünde kesintisiz görünüyor.
- Gerçek hayat sahnesi: yuvarlak kaide → dikdörtgen kaide, ölçek 1,3 → 1,55, aynı kadraj.
- Alt boşluk mat masa yüzeyi ve gölgeyle dolu; karartma/gradyan yok.

## Yazı–nesne ve yazı–yazı çakışması (bölüm 4, yeni otomatik kontrol)
- Nesne kutuları: pil, anahtar, direnç, grafik, voltmetre, akım oku, priz, lamba (userData.box). v3'te 16 çeşit çakışma vardı (3 kΩ×direnç, a/b×pil, üst yazılar×grafik, +/−×anahtar, priz etiketi×priz…).
- v4: yazı–nesne **0**, yazı–yazı **0**; güvenli alan 627 kutu **0 ihlal** (`guvenli_alan.json`).
- Render sonrası kontak sayfasında "i = 3 mA" ve "akım yönü" etiketlerinin akım okuna değdiği görüldü (ok kutusu ölçüme eklenmemişti) → ok ölçüme eklendi, etiketler sola alındı, ilgili aralıklar yeniden render edildi; birleşim noktaları (7, 15, 50, 61 sn) kare kare kontrol edildi, sıçrama yok.

## A. İçerik
- v3 ile aynı (dogruluk.md; bağımsız denetim v2'de yapıldı, içerik değişmedi → bölüm 7 A gereği tekrarlanmadı). Render konsolunda DOĞRULAMA HATASI yok.

## B. Görüntü
- Kontak sayfaları: 0,5 / 6 / 8,2 / 13 / 18,4 / 24 / 30,3 / 36 / 42,5 / 47 / 52,7 / 58 / 61,2 / 62,1 / 70,3 / 71,1 / 78,8 / 84 / 87,1 sn + düzeltme sonrası 10 kare. Kesme, taşma, titreme yok; tel kesintisiz, elektronlar telde; üst %11 boş.
- Kesmeler (≈ 60,4 ve 69,4 sn): aynı kadraj, doğrudan kesme.
- freezedetect: 0 donma.

## C. Ses
- Entegre −16,6 LUFS, tepe −2,1 dB; 4 kHz üstü max −30,5 dB. Seslendirme/müzik yok (efektler v3 ile aynı).

## D. Teknik
- 1080×1920, 30 fps, H.264 + AAC, 87,2 sn.
