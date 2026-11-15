# 007 (2. sürüm) — kalite kontrolü (bölüm 7)

**Sonuç: GEÇTİ (1. turda).** Süre 83,0 sn (≤ 90). 1. sürümün raporu: `kalite-v1.md`.
Kanal sahibinin iş emri (13.11.2026): YALNIZCA ekran düzeni + yazıların grafiğe/nesnelere binmesi. İçerik, ekran yazıları, zamanlama ve süre v1 ile aynı. v1 → `media/…/eski/007-gerilim-akim-kaynagi-v1.mp4`.

## İş emri
- Devre büyütüldü (X 0,85 → 1,0; ZH 0,95 → 1,4), kamera 10,6 → 9,6 / 58° → 62°. Ana sahne x ≈ %8–89, y ≈ %27–80 (kaynak gövdesi; yazısız).
- Grafik ekranı devre döngüsünün içinde, yazı bandının altında (v1'de üst yazılar ve kanca alt satırı grafiğe biniyordu). Kanca alt satırı "İdeal kaynak: ne sabit kalır?" grafikle arasında boşlukla.
- "R = … kΩ" etiketi direncin soluna alındı (v1'de direncin üstündeydi). "ideal gerilim/akım kaynağı" etiketi iki satır, devre içinde sol tarafta; voltmetre kablolarından ve alt %32'den uzak (v1'de kabloların üstündeydi). Voltmetre sağa (x 0,22), ampermetre sol-arka köşeye alındı.
- Gerçek hayat sahnesi: tek dikdörtgen kaide, ölçek 1,05 → 1,25; önde AA pil + akü, arkada şarj olan telefon; etiketler model yanında.

## Otomatik ölçüm (`render.mjs --safe`, guvenli_alan.json)
- Güvenli alan: 666 kutu, **0 ihlal**. Yazı–nesne (kaynak, anahtar, ampermetre, voltmetre, voltmetre kabloları, direnç, grafik, akım oku, AA pil, akü, telefon) ve yazı–yazı kesişimi: **0**. Doluluk (≥ %70 genişlik, ≥ %50 yükseklik): 167 örnek, **0 ihlal**.

## A. İçerik
- v1 ile aynı (dogruluk.md; bağımsız denetim v1'de yapıldı, içerik değişmedi → tekrarlanmadı). Render günlüklerinde DOĞRULAMA HATASI yok.

## B. Görüntü
- Kontak sayfaları (son videodan): 0,3 / 4 / 11 / 16 / 21,7 / 27 / 35,5 / 42,3 / 47,3 / 51 / 53,4 / 57,4 / 61,8 / 66 / 69,9 / 76,4 sn + render öncesi YouTube maskeli 6+6 kare. Kesilme, taşma, titreme, çakışma yok; tel kesintisiz, elektronlar telde; açık devre = açık anahtar; üst %11 boş; karartma/gradyan yok; ders etiketi yok.
- Kesmeler (≈ 35,0 / 57,3 / 69,5 sn): aynı kadraj, doğrudan kesme. 57,3 sn'de gerçek hayat kaidesi 0,3 sn boş görünür, sonra modeller belirir (v1 ile aynı zamanlama).
- freezedetect: 0 donma.

## C. Ses
- Entegre −16,3 LUFS, tepe −2,0 dBFS; 4 kHz üstü max −18,5 dB. Seslendirme/müzik yok (efektler v1 ile aynı).

## D. Teknik
- 1080×1920, 30 fps, H.264 + AAC, 83,0 sn.
