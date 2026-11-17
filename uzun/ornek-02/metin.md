# Uzun video örnek 02 — Çevre akımları yöntemi: çözümlü soru (Aşama 1: metin)

Başlık önerisi (Büyüme Ajanı'na öneri): "Çevre akımları yöntemi: çözümlü soru ve ortak dirençte işaret tuzağı". "Final tipi" denmez: bu devre seri-paralel indirgemeyle de çözülebilir (bağımsız denetim Ö4).

Vurgulanan yanlış: **Ortak dirençte iki çevre akımının farkını ikinci çevrede ters sırayla yazmak** (birinci çevrenin denklemindeki i₁ − i₂ ifadesini sağ çevrenin denklemine aynen kopyalamak). Doğrusu: denklemi yazılan çevrenin kendi akımı önce yazılır, komşu akım çıkarılır; sağ çevrede ortak direncin terimi 3 kΩ × (i₂ − i₁) olur. Kural, kendi akımının yönünde dolaşılırken yazılan düşüm içindir ve çevre akımlarının dönme yönü aynıysa geçerlidir (burada ikisi de saat yönünde); dönme yönleri farklıysa ortak dirençte akımlar toplanır. Razavi sağ çevrede aynı terimi +(i₁ − i₂) × R₂ diye, gerilim yükselişi olarak yazar (Ders 8 [19:08–19:24]); bu, (i₂ − i₁) × R₂ düşümüyle aynı şeydir.

Soru (özgün tasarım): Alt hat kesintisiz tel. Sol kolda 24 V gerilim kaynağı (artı ucu üstte). Üst telde soldan sağa R₁ = 6 kΩ ve R₃ = 2 kΩ. R₁ ile R₃'ün birleştiği noktadan (orta düğüm M) alt hatta R₂ = 3 kΩ (ortak direnç). Sağ kolda, üst telden alt hatta R₄ = 4 kΩ. Çevre akımları i₁ (sol çevre) ve i₂ (sağ çevre), ikisi de saat yönünde. İstenen: i₁ ve i₂.
Cevap: **i₁ = 3 mA, i₂ = 1 mA**. Tuzağa düşülürse: i₁ = 2 mA, i₂ = −2 mA (yanlış). Hesap ve bağımsız kontroller: `dogruluk.md`, `dogrula.py`.

Kelime sayısı: seslendirme metni **280 kelime** (hedef 250–280; kanal sahibinin 2 dk talimatı). Süre tahmini: örnek 01'in gerçek sesinden ölçülen hız (398 kelime / 169,2 sn ≈ 2,35 kelime/sn) ile konuşma ≈ 1:59, sondaki 4 sn kartla birlikte ≈ **2:03** (hedef 1:50–2:05). Bu bölümde Shorts işareti yoktur. Sözlü abone çağrısı yoktur; abone animasyonu yalnızca görüntüdedir (sahne planı, sahne 8: ilk cevaptan hemen sonra).

İlk 30 sn düzeni (Büyüme Ajanı rehberi bölüm 3, onay bekliyor): 0–4 sn soru ve konu (paragraf 1), 4–11 sn tuzak (paragraf 2), 11–15 sn vaat (paragraf 3). Vaat tahminen 15. saniyeden biraz önce başlar; metin kısa tutulduğu için kayma bu yöndedir.

## (a) Seslendirme metni

Aşağıdaki metin olduğu gibi ElevenLabs'e yapıştırılır.

```
Çevre akımları yöntemiyle bir soru çözüyoruz. İki çevre akımını arıyoruz.

Tuzak, ortadaki ortak dirençte. İki akımın farkını ters yazan, denklemleri kurar ama yanlış cevap bulur.

İşaretin kuralını göreceğiz ve sonucu sonunda iki yoldan kontrol edeceğiz.

Solda yirmi dört voltluk gerilim kaynağı var; artı ucu üstte. Üst telde soldan sağa altı ve iki kiloohm var. İki direncin arasından alt hatta üç kiloohm iniyor; bu, ortak direnç. Sağ kolda, üst telden alt hatta dört kiloohm iniyor.

Sol çevrenin akımı i bir, sağ çevreninki i iki; dönme yönleri saat yönü.

Sol çevrede, kaynakta kazanılan yirmi dört volt, düşümlerin toplamıdır. Ortak dirençte akımlar zıt yönde geçer. Altı kiloohm çarpı i bir, artı üç kiloohm çarpı, i bir eksi i iki farkı, eşittir yirmi dört volt. Üç kiloohma bölünce: üç çarpı i bir, eksi i iki, eşittir sekiz miliamper.

Sağ çevre; tuzak burada. Birinci denklemdeki farkı düşüm olarak aynen kopyalamak akla gelir. Bu, işareti ters çevirir. Kural: kendi akımın yönünde dolaşırken ortak dirençte önce o çevrenin akımı yazılır, komşu akım çıkarılır. Bu, iki akımın dönme yönü aynıysa geçerlidir. Kaynak yok; düşümlerin toplamı sıfır. Üç kiloohm çarpı, i iki eksi i bir farkı, artı iki kiloohm çarpı i iki, artı dört kiloohm çarpı i iki, eşittir sıfır. Sadeleşince: i bir eşittir üç çarpı i iki.

Yerine koyunca: sekiz çarpı i iki eşittir sekiz miliamper; yani i iki eşittir bir miliamper, i bir eşittir üç miliamper. Farkı ters yazsaydık, i bir eşittir iki miliamper, i iki eşittir eksi iki miliamper çıkardı. Sayılar düzgün ama yanlış.

Kontrol: ortak dirençten iki miliamper iner, uçlarında altı volt. Sol yoldan: yirmi dört volt eksi altı kiloohmdaki on sekiz volt, altı volt. Sağ yoldan: iki volt artı dört volt, altı volt. Tutuyor.
```

Sesli okunuş notları:
- Akım adları küçük harfle "i bir", "i iki" yazıldı: büyük "I" Türkçe okumada "ı" sesine dönebilir. Ekranda da küçük harf i₁, i₂ kullanılır (Razavi Ders 8'deki gösterim).
- Cümle başında "İ iki" yok; sonuç cümlesi "…; yani i iki eşittir bir miliamper, i bir eşittir üç miliamper."
- "çarpı," sonrasındaki virgül ve "farkı" sözcüğü, çarpmanın farkın tamamına uygulandığını sesle ayırır ("üç kiloohm çarpı i bir, eksi i iki" gibi yanlış gruplanmasın diye).
- "i bir ve i iki" gibi yan yana okunan ad çifti yok; sonuçlar "i iki eşittir bir miliamper, i bir eşittir üç miliamper" biçiminde ("i iki de bir" dizilişi "ikide bir" diye duyulabileceği için kullanılmadı).
- Direnç değerleri birbirinden farklı (altı, üç, iki, dört kiloohm): "altı kiloohmdaki on sekiz volt" sesle tek bir direnci gösterir.
- "zıt yönde geçer" yalnızca ortak dirençteki akımlar için; çevre akımları için her yerde "dönme yönü" denir (denetim Ö2).
- Rakam, simge, parantez yok (otomatik kontrol: `[0-9=+/()-]` bulunmadı).

## (b) Sahne planı (beyaz tahta, 16:9, 1920×1080)

Kalemler: siyah (devre, denklemler), mavi (çevre akımları i₁ ve i₂, akım okları, sonuçlar), kırmızı (tuzak, yanlış terim, vurgu). Çarpma işareti yalnızca "×". Bütün sayılar ondalıksız çıkar.

**Tahta yerleşimi (bütün video boyunca aynı):**
- Başlık bandı: y %3–9, x %4–70.
- Devre alanı: x %2–45, y %13–62 ("24 V" etiketi için solda x %2–8 boş bırakılır).
- Denklem sütunu: x %48–97, y %12–74 (satır yüksekliği ~%7; Patrick Hand ~40 px; en uzun satır 2. çevrenin açık denklemi ~42 karakter — sığmazsa yazı boyutu küçültülür, satır bölünmez).
- **Alt bant: y %76–100 bütün video boyunca boş tutulur.** Yalnızca abone animasyonu (sahne 8) ve sondaki "Bilmen gerekenler" kartı (sahne 10) burayı kullanır. Hiçbir denklem, yanlış sonuç satırı veya etiket y %74'ün altına inmez.

**Devrenin tam tarifi:**
- "M" yalnızca bu plandaki addır (orta düğüm); **tahtaya "M" harfi yazılmaz.**
- Alt hat: y %58'de, x %10–44 arası kesintisiz yatay tel.
- Üst hat: y %20'de, x %10–44 arası; üzerinde iki direnç.
- Sol dikey kol (x %10): gerilim kaynağı (daire; içinde + üstte, − altta), alt hat ile üst hattın sol köşesi arasında; solunda (x %2–8, y %37–41) "24 V".
- Üst telde sol yatay direnç, x %13–24: üstünde (y %14–17) "R₁ = 6 kΩ".
- Orta düğüm M: x %27, y %20; dolu nokta. Alt hattaki karşılığı (x %27, y %58) de dolu nokta.
- Orta dikey kol (x %27): R₂ dikey direnç (y %30–48), M ile alt hat arasında; sağında "R₂ = 3 kΩ" ve altında küçük kırmızı "ortak direnç".
- Üst telde sağ yatay direnç, x %30–41: üstünde (y %14–17) "R₃ = 2 kΩ".
- Sağ dikey kol (x %44): R₄ dikey direnç, üst hattın sağ köşesi ile alt hat arasında; solunda (sağ çevrenin içinde, x %39–43) "R₄ = 4 kΩ" — denklem sütununa taşmaz.
- Köşeler kesintisiz tel (nokta yok); yalnızca M ve alt hattaki karşılığı bağlantı noktasıdır. Etiketler tellerin ve elemanların üstüne binmez.
- Çevre akımları: sol çevrenin ortasında (x %18, y %42) saat yönünde mavi dairesel ok ve "i₁"; sağ çevrenin ortasında (x %35, y %42) saat yönünde mavi dairesel ok ve "i₂". Oklar y %32–52 arasında kalır (direnç etiketlerinin ve sahne 9'daki kontrol yazılarının altında).

Zamanlar örnek 01'in ölçülen konuşma hızına göre **tahmindir**; Aşama 2'de gerçek sesin cümle sınırlarına oturtulur.

| # | Tahmini zaman | Paragraf (ilk sözcükler) | Tahtada ne çizilir / yazılır |
|---|---|---|---|
| 1 | 0:00–0:04 | "Çevre akımları yöntemiyle bir soru…" | İlk karede başlık yazılmaya başlar: "Çevre akımları yöntemi: çözümlü soru". Aynı anda devre alanında R₂ (orta dikey direnç) son konumunda çizilir. "İki çevre akımını arıyoruz" denince denklem sütununun en üstüne: "İstenen: iki çevre akımı". |
| 2 | 0:04–0:11 | "Tuzak, ortadaki ortak dirençte…" | R₂'nin çevresine kırmızı daire; yanına kırmızı "ortak direnç". "ters yazan" denince dairenin yanına kırmızı soru işareti. |
| 3 | 0:11–0:15 | "İşaretin kuralını göreceğiz…" | Kırmızı soru işaretinin altı çizilir; "iki yoldan kontrol" denince orta düğümün dolu noktası konur ve üst tel oradan sola ve sağa doğru çizilmeye başlar (sahne durmaz). |
| 4 | 0:15–0:32 | "Solda yirmi dört voltluk gerilim kaynağı…" | Devre konuşma sırasıyla çizgi çizgi tamamlanır: sol kaynak ve "24 V" (artı işareti "artı ucu üstte" denirken) → R₁ ve "R₁ = 6 kΩ" → R₃ ve "R₃ = 2 kΩ" → R₂'nin etiketi "R₂ = 3 kΩ" (R₂ ve kırmızı "ortak direnç" yerinde kalır) ve alt hattaki bağlantı noktası → R₄ ve "R₄ = 4 kΩ" → alt hat soldan sağa kesintisiz. |
| 5 | 0:32–0:37 | "Sol çevrenin akımı i bir…" | Sol çevrede mavi saat yönü oku ve "i₁"; sonra sağ çevrede mavi saat yönü oku ve "i₂". "dönme yönleri saat yönü" denince iki okun ucu mavi ile kalınlaştırılır. |
| 6 | 0:37–0:57 | "Sol çevrede, kaynakta kazanılan…" | Sol çevrenin mavi oku kalınlaşır. "kazanılan yirmi dört volt" denince "24 V" altı çizilir. "zıt yönde geçer" denince R₂'nin solunda aşağı bakan kısa mavi ok "i₁", sağında yukarı bakan kısa mavi ok "i₂". Denklem sütununa terim terim (söylenen terimin altı o an mavi çizilir), y ~%20:<br>`6 kΩ × i₁ + 3 kΩ × (i₁ − i₂) = 24 V`<br>"Üç kiloohma bölünce" denince altına (y ~%28), çerçeve içinde: `3i₁ − i₂ = 8 mA` ve yanına "(1. denklem)". |
| 7 | 0:57–1:29 | "Sağ çevre; tuzak burada…" | Sağ çevrenin mavi oku kalınlaşır. "düşüm olarak aynen kopyalamak akla gelir" denince denklem sütununda (y ~%36) kırmızı ile: `3 kΩ × (i₁ − i₂)`; "Bu, işareti ters çevirir" denince üstüne kırmızı çarpı, yanına kırmızı "ters işaret". "Kural" denince altına (y ~%42–56) dört satır kalemle: "Kural: kendi akımın yönünde dolaşırken" / "ortak dirençte önce o çevrenin akımı yazılır," / "komşu akım çıkarılır." / "Kural, çevre akımlarının dönme yönü aynıysa geçerli." (parantez yok); dördüncü satırın altı kırmızı çizilir. "Kaynak yok" denince sağ çevrenin içindeki "i₂" okunun altı çizilir. Sonra (y ~%61) terim terim:<br>`3 kΩ × (i₂ − i₁) + 2 kΩ × i₂ + 4 kΩ × i₂ = 0`<br>"(i₂ − i₁)" yazılırken altı kırmızı çizilir. "Sadeleşince" denince altına (y ~%68), çerçeve içinde: `i₁ = 3i₂` ve yanına "(2. denklem)". |
| 8 | 1:29–1:46 | "Yerine koyunca: sekiz çarpı…" | Kırmızı yanlış terim, kural satırları ve iki açık denklem silinir (≤ 0,3 sn); iki çerçeveli denklem yerinde kalır (y ~%28 ve ~%68). Boşalan yere (y ~%36–52): `3 × 3i₂ − i₂ = 8 mA`, altında `8i₂ = 8 mA`; sonra ayrı satırlarda, mavi, kırmızı çerçeve içinde `i₂ = 1 mA` ve `i₁ = 3 mA`. Devredeki "i₁" ve "i₂" etiketleri "i₁ = 3 mA", "i₂ = 1 mA" olur.<br>**Abone ol + zil animasyonu (UZUN.md 3b, ~6 sn):** ilk cevaptan hemen sonra, "…i bir eşittir üç miliamper." cümlesi bitince (tahmini **1:37**) kart alttan girer; tahmini **1:43**'te, "…eksi iki miliamper çıkardı." cümlesinin sonunda (en geç "Sayılar düzgün ama yanlış." başlamadan) çıkışını tamamlar. Kart ekrandayken "Farkı ters yazsaydık" denince denklem sütununda **y ~%56–62** satırına (çerçeveli 2. denklemin üstü, alt bandın çok üstü) kırmızı: "Ters işaretle çıkan: i₁ = 2 mA, i₂ = −2 mA". **Alt bant (y %76–100) bu sürede boştur;** devre, denklemler ve yanlış sonuç satırı oraya girmez. "Sayılar düzgün ama yanlış" denince (kart çıkmıştır) satırın yanına kırmızı "yanlış" ve üstüne kırmızı çizgi. Seslendirmede sözlü çağrı yok. |
| 9 | 1:46–1:59 | "Kontrol: ortak dirençten iki miliamper…" | Kırmızı yanlış sonuç satırı ve ara satırlar silinir; çerçeveli sonuçlar kalır. R₂'nin solunda aşağı bakan mavi ok ve "2 mA"; **R₂'nin yanına "6 V"**, R₂'nin üst ucunda "+", alt ucunda "−" (kırmızı alt çizgi). Denklem sütununa: `2 mA × 3 kΩ = 6 V`. "Sol yoldan" denince R₁'in **altına** (y %23–27; "R₁ = 6 kΩ" etiketi üstte kaldığı için çakışmaz) küçük `3 mA × 6 kΩ = 18 V`; sütuna `24 V − 18 V = 6 V` ve siyah onay işareti. "Sağ yoldan" denince R₃'ün altına (y %23–27) küçük `1 mA × 2 kΩ = 2 V`, R₄'ün solunda etiketin altına küçük `1 mA × 4 kΩ = 4 V`; sütuna `2 V + 4 V = 6 V` ve siyah onay işareti. "Tutuyor" denince R₂'nin yanındaki "6 V" kırmızı daire içine alınır. Kalem imleci yazı bitince kaybolur. |
| 10 | 1:59–2:03 (ses yok, 4 sn) | — | "Bilmen gerekenler" kartı alt banda (y %78–97) kalemle yazılır; devre ve sonuçlar küçülmeden yerinde kalır. |

## (c) "Bilmen gerekenler" kartı

- Ortak dirençte kendi akımından komşu akım çıkarılır
- Kural, çevre akımlarının dönme yönü aynıysa geçerli
- Ters işaret düzgün ama yanlış sonuç verir

Açıklama için kaynak atfı: "Kaynak: B. Razavi, Basic Circuits, Ders 8" (yalnızca yöntem; soru özgündür).
