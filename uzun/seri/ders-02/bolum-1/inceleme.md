# İnceleme — Ders 2 - Bölüm 1: yorum sorusu (Parça 7)

İçerik Ajanı, 21.11.2026 (ICERIK.md 7 "İlk iş" ve 3/8; UZUN.md KREDİ SPRİNTİ: "Parça 7 bekler"). Yalnızca Parça 7'deki "Sana da bir soru" kısmı için öneridir; metnin geri kalanına dokunulmadı. Metni Uzun Video Ajanı günceller ve kanal sahibine `onaylar/metin-2-1-p7` kartıyla sunar.

## Neden değişmeli?

Onaylı sorudaki (9 V pil, 2 Ω iç direnç, 900 Ω ve 9 Ω yük) hesap, Parça 6'daki mini tasarımın (150 Ω ve 1,5 Ω yük) aynısı: iki kez "ideal akım × iç direnç" ve bir oran. Tek kavram, yeni bir şey yok → **kolay–orta**. Yeni kural (kanal sahibi 20.11.2026) orta–üst zorluk istiyor: en az iki kavramı birleştirsin ya da bir tuzak içersin.

## Önerilen soru

**Seslendirme metni (yapay sese uygun; rakam ve simge yok):**

> Sana da bir soru bırakayım. Bir kalem pil, altı milimetrelik bir basmalı buton ve bir yük direnci tek bir halka oluşturuyor. Pilin iç direnci en çok sıfır virgül üç ohm. Butonun kontak direnci en çok sıfır virgül bir ohm, buton da en çok elli miliamper için yapılmış. Teli ideal kabul et, akımı da ideal modelle tahmin et. İki şart koyuyoruz: buton sınırının içinde kalsın, pilde ve butonda kaybolan toplam gerilim de pilin bir buçuk voltunun yüzde birini geçmesin. Birinci soru: yük direnci en az kaç ohm olmalı, iki şarttan hangisi belirleyici? İkinci soru: buton basılıyken, bu en küçük yük direncinde butonun iki ucu arasında kaç milivolt vardır? Kapalı anahtarın sıfır volt modeli burada yeterli mi? Cevabını yorumlara yaz.

(≈ 118 kelime, ≈ 45–47 sn. Mevcut sorudan ≈ 70 kelime uzun; Parça 7 süresine ≈ +30 sn.)

**Tahtaya yazılacak kısa hâli (kırmızı başlık "Sana bir soru"; satırlar alt alta; kelime yerine işaret yok):**
- Sağ sütun: halka kroki — pil ("+", "1,5 V", koyu yeşil "R_iç en çok 0,3 Ω"), buton (kapalı kolla; koyu yeşil "Kontak direnci en çok 0,1 Ω, en çok 50 mA"), yük "R_yük", koyu yeşil "Tel ideal; akımı ideal modelle tahmin et".
- Sol: "Şart 1: Buton sınırı içinde (i ≤ 50 mA)"
- "Şart 2: Pil ve butonda kaybolan gerilim en çok 1,5 V'un %1'i"
- "(a) R_yük en az kaç? Hangi şart belirleyici?"
- "(b) Buton basılıyken, en küçük R_yük'te v_buton = ? (mV) Sıfır volt modeli yeter mi?"
- koyu yeşil "Cevabını yorumlara yaz"

**Cevap kısa (yalnızca Uzun Video Ajanı'nın kontrolü için; videoda söylenmez; tam çözüm Drive "Soru Bankası – Çözümler (2)"):** (a) en az 40 Ω, kayıp şartı belirleyici (buton şartı yalnızca 30 Ω ister); (b) yaklaşık 3,7 mV (0,1 Ω × 37,5 mA = 3,75 mV; tam akımla 3,71 mV), 1,5 V'un %0,25'i: model yeterli. Python ile doğrulandı (çözüm dosyası depoya konmadı; ICERIK.md 3/8).

## Neden orta–üst? (dürüst değerlendirme: sınırda)

- İki şart ayrı ayrı yük direncine çevrilir, büyük olanı seçilir (ters yönden tasarım: "akım ne?" değil "direnç en az ne?").
- Tuzak: kayıpta butonun kontak direncini unutmak (yalnızca pil) → yanlış cevap 30 Ω; bu da buton şartıyla aynı sayıya çıktığı için öğrenci "iki şart aynı" sanır.
- (b) "kapalı anahtar = sıfır volt" idealleştirmesinin sınırını sorar: kontak direnciyle gerçek gerilim hesaplanır ve modelin yeterliliğine karar verilir.
- Dürüst not (bağımsız denetim): kısımlar Parça 3 ve Parça 6'daki çözümlü örneklerin üzerine kurulu; gerçekten yeni olan belirleyici şartı seçmek ve kapalı anahtarın sınırını sayıyla değerlendirmek. Zorluk orta–üstün alt sınırında; yine de onaylı sorudan (iki aynı hesap) belirgin biçimde güçlü.
- Yalnızca bu bölümde anlatılanlarla çözülür: ideal akım ile kayıp tahmini (Parça 5: "kaybolan gerilim ≈ iç direnç × akım"), parçalardaki kayıpların toplanması ve buton sınırı (Parça 6). Seri devrenin tam çözümü (Ders 3) gerekmez; soru "ideal modelle tahmin et" dediği için cevap tektir (tam çözüm 39,6 Ω verir; Drive'da gösterildi).
- Değerler Parça 6'daki gerçek parçalarla aynı (C&K PTS645 50 mA ve en çok 100 mΩ; Energizer E91 iç direnç üst sınırı 0,3 Ω; D2B1 paketi bölüm 5) → yeni datasheet iddiası yok.

## Uzun Video Ajanı'na notlar

- "Yüzde bir" seste açıkça; ekranda "%1".
- "Butonun iki ucu arasında" ifadesi önemli: gerilim iki nokta arasında (Ders 1 - Bölüm 3). "Milivolt" seste açıkça.
- Parça 7'deki "Bilmen gerekenler" kartı değişmez.
- Soru bankası satırı: `uzun/seri/soru-bankasi.md` "D2B1-yeni". Bu öneri kabul edilmezse onaylı soru seslendirilir (UZUN.md sprint kuralı: 21.11 18:00).
