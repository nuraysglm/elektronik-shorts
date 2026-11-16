# Uzun video örnek 01 — Düğüm gerilimleri yöntemi: final tipi çözümlü soru (Aşama 1: metin)

Vurgulanan yanlış: **Akım kaynağına seri bağlı direnç için düğüm denklemine terim yazmak.** Doğrusu: akım kaynağı kolunun akımı bellidir (kaynağın akımı); seri direnç akım kaynağının uçlarındaki gerilimi değiştirir, düğüm gerilimlerini değiştirmez. Koşul: yalnızca seri direnç ve ideal akım kaynağı için; akım kaynağına paralel direnç denkleme girer.

Soru (özgün tasarım): Alt hat referans. 10 V gerilim kaynağı (alt hat ile A düğümü arasında, artı uç A'da); R₁ = 1 kΩ (A ile 1. düğüm arası); R₂ = 2 kΩ (1. düğüm ile alt hat arası); R₃ = 1 kΩ (1. ve 2. düğüm arası); R₄ = 1 kΩ (2. düğüm ile alt hat arası); 4 mA ideal akım kaynağı ile R₅ = 3 kΩ seri, alt hat ile 2. düğüm arasında; akım alt hattan 2. düğüme doğru. Kaynak ile R₅ arasındaki nokta 3. düğümdür. İstenen: V₁ ve V₂.
Cevap: **V₁ = 6 V, V₂ = 5 V** (hesap ve bağımsız kontroller: `dogruluk.md`, `dogrula.py`).

Kelime sayısı: seslendirme metni **398 kelime** (hedef 380–400; sondaki 4 sn kart ile birlikte en çok 3:10); Shorts bölümü **117 kelime** (hedef 110–118; 4 sn kart ile birlikte en çok 60 sn). İşaret satırları (`[SHORTS …]`) sayıya dahil değildir ve okunmaz.

## (a) Seslendirme metni

Aşağıdaki metin ElevenLabs'e yapıştırılır. `[SHORTS BAŞLANGIÇ]` ve `[SHORTS BİTİŞ]` satırları okunmaz, yapıştırmadan önce silinir.

```
Final tipi bir düğüm gerilimleri sorusu çözüyoruz. İki düğümün gerilimini arıyoruz. Tuzak şu: akım kaynağına seri bağlı bir direnç. Bu tuzağa düşen, doğru yöntemle yanlış cevabı bulur.

Solda on voltluk gerilim kaynağı var; eksi ucu alt hatta. Artı ucundan bir kiloohmluk direnç birinci düğüme gidiyor. Birinci düğümden alt hatta iki kiloohm iniyor. Birinci ve ikinci düğüm arasında bir kiloohm var. İkinci düğümden alt hatta bir kiloohm iniyor. Alt hat ile ikinci düğüm arasında dört miliamperlik ideal akım kaynağı ve ona seri üç kiloohm var. Akım, alt hattan ikinci düğüme doğru.

Referans düğümü alt hat, orası sıfır volt. Birinci düğümün gerilimine V bir, ikincisine V iki diyoruz. Gerilim kaynağının artı ucu on volttur. Akım kaynağı ile üç kiloohm arasındaki nokta da bir düğümdür. Orada yeni bilgi yok; gerilimini en sonda buluruz.

Birinci düğümde, dirençlerle çıkan akımların toplamı sıfırdır. Çünkü bu düğüme akım kaynağı bağlı değil. Sola: V bir eksi on volt, bölü bir kiloohm. Aşağı: V bir bölü iki kiloohm. Sağa: V bir eksi V iki, bölü bir kiloohm. İki kiloohmla çarpıp toplayalım. Beş çarpı V bir, eksi iki çarpı V iki, eşittir yirmi volt.

[SHORTS BAŞLANGIÇ]
Akım kaynağına seri bağlı direnç, düğüm denklemine girer mi? Girmez. Dikkat edilmesi gereken bir tuzaktır. İkinci düğüme bakalım. Bu düğüme bir kiloohmluk iki direnç bağlı. Biri, gerilimi V bir olan komşu düğüme, öbürü referansa gidiyor. Bir de dört miliamperlik ideal akım kaynağı var. Ona seri üç kiloohmluk direnç bağlı. Bu direnç için bir terim yazmak akla gelir. Yanlıştır; çünkü ideal akım kaynağı kendi akımını dayatır. Seri kolda akım her yerde aynıdır. Düğüme dört miliamper girer. Dirençlerle çıkan akımların toplamı, bu giren akıma eşittir. V iki eksi V bir, bölü bir kiloohm. Artı V iki bölü bir kiloohm. Eşittir dört miliamper. Seri direnç, akım kaynağının uçlarındaki gerilimi değiştirir. Düğüm gerilimlerini değiştirmez. Akım kaynağına paralel direnç ise denkleme girer.
[SHORTS BİTİŞ]

İkinci denklemi bir kiloohmla çarpalım. Eksi V bir, artı iki çarpı V iki, eşittir dört volt. İki denklemi toplayınca V iki terimleri birbirini götürür. Dört çarpı V bir eşittir yirmi dört volt. V bir altı volttur. Yerine koyunca V iki beş volttur.

Kontrol edelim. Gerilim kaynağından dört miliamper geliyor. Üç miliamperi iki kiloohmdan aşağı iniyor. Kalan bir miliamper ikinci düğüme geçiyor. Akım kaynağından dört miliamper ekleniyor. Beş miliamper, ikinci düğümdeki bir kiloohmdan aşağı iniyor. Beş volt eder, tutuyor. Üç kiloohmun uçlarında dört miliamper çarpı üç kiloohm, on iki volt var. Akım kaynağının üst ucu on yedi volttur.
```

## (b) Sahne planı (beyaz tahta, 16:9)

Kalemler: siyah (devre, denklemler), mavi (düğüm adları, akım okları, V₁ ve V₂), kırmızı (hata ve vurgu). Bir videoda çarpma işareti yalnızca "×". Sayılar ondalıksız çıktığı için virgül gerekmez.

**Devrenin tam tarifi (bütün sahnelerde aynı yerleşim):**
- Alt hat: tahtanın altında soldan sağa kesintisiz yatay tel; ortasında toprak simgesi. Etiketi (sahne 3'te yazılır): "referans düğümü (0 V)".
- Üst sıra, soldan sağa dört bağlantı noktası: A, 1. düğüm, 2. düğüm, 3. düğüm (dolu nokta ile gösterilir).
- Sol dikey kol: gerilim kaynağı (daire, içinde + üstte, − altta), alt hat ile A arasında; yanında "10 V".
- A ile 1 arasında yatay direnç: "R₁ = 1 kΩ".
- 1'den alt hatta dikey direnç: "R₂ = 2 kΩ".
- 1 ile 2 arasında yatay direnç: "R₃ = 1 kΩ".
- 2'den alt hatta dikey direnç: "R₄ = 1 kΩ".
- 2. düğüm ile 3. düğüm arasında yatay direnç: "R₅ = 3 kΩ".
- Sağ dikey kol: akım kaynağı (daire, içinde yukarı ok), alt hat ile 3. düğüm arasında; yanında "4 mA". Ok yukarı bakar: akım alt hattan 3. düğüme, R₅ üzerinden 2. düğüme girer.
- Teller kesintisiz; her bağlantı noktası dolu nokta. Etiketler tellerin ve elemanların üstüne binmez.

| # | Paragraf (ilk sözcükler) | Tahtada ne çizilir / yazılır |
|---|---|---|
| 1 | "Final tipi bir düğüm gerilimleri sorusu…" | Üstte başlık el yazısıyla yazılır: "Düğüm gerilimleri yöntemi: final tipi soru". "İki düğümün gerilimini arıyoruz" denince altına: "İstenen: 1. ve 2. düğümün gerilimi". Altında devrenin sağ kolu (akım kaynağı ve R₅) hızlı çizilir; "akım kaynağına seri bağlı direnç" derken R₅'in çevresine kırmızı daire ve kırmızı soru işareti. |
| 2 | "Solda on voltluk gerilim kaynağı var…" | Tahta silinir. Devre konuşma sırasıyla, çizgi çizgi çizilir: gerilim kaynağı ve "10 V" → R₁ → 1. düğüm noktası → R₂ → R₃ → 2. düğüm noktası → R₄ → akım kaynağı ve "4 mA" → R₅ → alt hat. Her eleman adı geçtiği anda değeriyle belirir. Gerilim kaynağının eksi ucunun alt hatta bağlandığı tel, "eksi ucu alt hatta" denirken çizilir. Akım kaynağının içindeki yukarı ok, "alt hattan ikinci düğüme doğru" denirken mavi ile üstünden geçilir. |
| 3 | "Referans düğümü alt hat…" | Devre yerinde kalır. Alt hat mavi ile üstünden geçilir, toprak simgesi çizilir, yanına "referans düğümü (0 V)". 1. düğümün üstüne mavi "V₁", 2. düğümün üstüne mavi "V₂". A noktasının üstüne siyah "10 V (biliniyor)". Akım kaynağı ile R₅ arasındaki noktanın üstüne mavi "3. düğüm"; yanına küçük not: "gerilimi en sonda bulunur". |
| 4 | "Birinci düğümde, dirençlerle çıkan akımların toplamı…" | 1. düğümün çevresinde üç mavi ok sırayla çizilir: sola (R₁ üzerinde), aşağı (R₂ üzerinde), sağa (R₃ üzerinde). Devrenin altına denklem terim terim yazılır; söylenen terimin altı o an mavi çizilir:<br>`(V₁ − 10 V)/(1 kΩ) + V₁/(2 kΩ) + (V₁ − V₂)/(1 kΩ) = 0`<br>Alt satır (çarpma söylenince): `2(V₁ − 10 V) + V₁ + 2(V₁ − V₂) = 0`<br>Alt satır, çerçeve içinde: `5V₁ − 2V₂ = 20 V` ve yanında "(1. denklem)". |
| 5 | SHORTS bölümü: "Akım kaynağına seri bağlı direnç…" | Denklem alanı silinir (1. denklem çerçevesi sol altta kalır). Üstte soru yazılır: "Akım kaynağına seri bağlı direnç düğüm denklemine girer mi?"; "Girmez" denince yanına kırmızı "Girmez". 2. düğüm mavi daire içine alınır; R₃ ve R₄ üzerinde düğümden çıkan mavi oklar. "ideal akım kaynağı" denince kaynağın yanına "ideal akım kaynağı, 4 mA". "terim yazmak akla gelir" denince kırmızı ile yanlış terim yazılır: `V₂/(3 kΩ)`; "Yanlıştır" denince üstüne kırmızı çarpı atılır, yanına kırmızı "yanlış terim". "Seri kolda akım her yerde aynıdır" denince akım kaynağından R₅ boyunca 2. düğüme kadar tek mavi ok kalınlaştırılır, üstüne "4 mA". Sonra doğru denklem siyahla terim terim:<br>`(V₂ − V₁)/(1 kΩ) + V₂/(1 kΩ) = 4 mA`<br>Son üç cümlede 3. düğümün yanına iki satır: "Seri direnç akım kaynağının uçlarındaki gerilimi değiştirir." ve "Düğüm gerilimlerini değiştirmez." En altta kırmızı alt çizgili uyarı: "Akım kaynağına paralel direnç denkleme girer." |
| 6 | "İkinci denklemi bir kiloohmla çarpalım…" | Altına: `−V₁ + 2V₂ = 4 V` ve "(2. denklem)". İki denklem alt alta hizalanır, altına toplama çizgisi:<br>`5V₁ − 2V₂ = 20 V`<br>`−V₁ + 2V₂ = 4 V`<br>çizginin altında `4V₁ = 24 V`; `− 2V₂` ile `+ 2V₂` terimlerinin üstü ince çizilir. Sonra: `V₁ = 6 V` (kırmızı çerçeve). "Yerine koyunca" denince: `2V₂ = 4 V + 6 V = 10 V`, `V₂ = 5 V` (kırmızı çerçeve). Devrede V₁ ve V₂ etiketleri "V₁ = 6 V", "V₂ = 5 V" olur. |
| 7 | "Kontrol edelim…" | Denklemler silinir, devre kalır. Akımlar mavi oklarla sırayla yazılır: R₁ üzerinde sağa "4 mA"; R₂ üzerinde aşağı "3 mA"; R₃ üzerinde sağa "1 mA"; R₅ üzerinde sola (2. düğüme doğru) "4 mA"; R₄ üzerinde aşağı "5 mA". Yanına: `5 mA × 1 kΩ = 5 V` ve siyah bir onay işareti. Son iki cümlede önce R₅'in üstüne: `4 mA × 3 kΩ = 12 V`; sonra 3. düğümün üstüne: `5 V + 12 V = 17 V`; "17 V" kırmızı alt çizgi. |
| 8 | (ses yok, 4 sn) | "Bilmen gerekenler" kartı kalemle yazılır; devre küçülmeden yerinde kalır, kart boş alana yazılır. |

**Shorts (9:16) için not:** Sahne 5 dikey olarak yeniden çizilir: üstte soru, ortada devrenin tamamı (eleman değerleri ve V₁, V₂ adlarıyla), altta denklem. İlk 8 saniyede "Girmez" cevabı görünür; yanlış terim ve üstündeki kırmızı çarpı konuşmayla birlikte gelir. Sonda aynı "Bilmen gerekenler" kartının ilk iki maddesi.

## (c) "Bilmen gerekenler" kartı

- Akım kaynağına seri direnç düğüm denklemine girmez
- Akım kaynağına paralel direnç denkleme girer
- Sonuç: V₁ = 6 V, V₂ = 5 V

Açıklama için kaynak atfı: "Kaynak: B. Razavi, Basic Circuits, Ders 5 ve Ders 6" (yalnızca yöntem; soru özgündür).
