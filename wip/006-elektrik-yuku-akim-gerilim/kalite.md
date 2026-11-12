# 006 (3. sürüm) — kalite kontrolü (bölüm 7)

**Sonuç: GEÇTİ (1. turda).** Süre 87,2 sn (≤ 90). Kanal sahibinin 2. iş emri (12.11.2026) uygulandı; içerik ve ekran yazıları v2 ile aynı.

## İş emri maddeleri
1. Açılışta üst (arka) bakır tel görünmüyordu: sebep, tel döngüsünün u = 0 başlangıcının direncin içinde olması (direnç aralığı neredeyse bütün döngüyü kaplıyordu). Başlangıç arka kenarın ortasına alındı, `check` ile aralıkların kısa olduğu doğrulanıyor. 18 karelik kontak sayfasında tel her sahnede kesintisiz, elektronlar telin üstünde ✔
2. "DERS 1" etiketi kaldırıldı ✔ (bölüm 4a-6)
3. Gerçek hayat sahnesi: priz (230 V AC) → açık bıçaklı anahtar → sönük lamba, kapalı bakır tel döngüsü; havada biten tel yok. "≈ 230 V (AC)" ve "anahtar açık" etiketleri anahtarda, "i = 0" telde ✔ (bölüm 2c-2)

## A. İçerik
- v2 ile aynı (dogruluk.md, bağımsız denetim v2'de yapıldı; içerik değişmedi, bölüm 7 A gereği tekrarlanmadı). Açık anahtar uçlarında ≈ 230 V: lamba teli iletken, anahtarın lamba tarafı nötr potansiyelinde ✔
- Render konsolunda DOĞRULAMA HATASI yok ✔

## B. Görüntü
- Kontak sayfası: 18 kare (0,5 / 5 / 9 / 15 / 27 / 34 / 44 / 50 / 58 / 61,2 / 62 / 64 / 67 / 70,2 / 71 / 76 / 82 / 86,8 sn) + render öncesi YouTube maskeli 6 kare. Çakışma, taşma, titreme yok ✔
- Kesmeler (≈ 61,6 ve 70,6 sn): aynı kadraj, doğrudan kesme ✔
- Güvenli alan: guvenli_alan.json 630 kutu, 0 ihlal ✔ (1. denemede "lamba sönük" sağ sütuna taşıyordu, render öncesi düzeltildi)
- freezedetect: 0 donma ✔

## C. Ses
- Entegre −16,6 LUFS, tepe −2,1 dB; 4 kHz üstü max −30,5 dB ✔. Seslendirme/müzik yok ✔

## D. Teknik
- 1080×1920, 30 fps, H.264 + AAC, 87,2 sn ✔
