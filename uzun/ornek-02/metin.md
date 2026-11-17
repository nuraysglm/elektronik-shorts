# Uzun video örnek 02 — Çevre akımları yöntemi: final tipi çözümlü soru (Aşama 1: metin)

Vurgulanan yanlış: **Ortak dirençte iki çevre akımının farkını ikinci çevrede ters sırayla yazmak** (birinci çevrenin denklemindeki i₁ − i₂ ifadesini sağ çevrenin denklemine aynen kopyalamak). Doğrusu: denklemi yazılan çevrenin kendi akımı önce yazılır, komşu akım çıkarılır; sağ çevrede ortak direncin terimi 3 kΩ × (i₂ − i₁) olur. Koşul: bu kural iki çevre akımı aynı yönde döndüğünde geçerlidir (burada ikisi de saat yönünde); biri saat yönünde, öbürü tersindeyse ortak dirençte akımlar toplanır.

Soru (özgün tasarım): Alt hat kesintisiz tel. Sol kolda 24 V gerilim kaynağı (artı ucu üstte). Üst telde soldan sağa R₁ = 6 kΩ ve R₃ = 2 kΩ. R₁ ile R₃'ün birleştiği noktadan (orta düğüm M) alt hatta R₂ = 3 kΩ (ortak direnç). Sağ kolda, üst telden alt hatta R₄ = 4 kΩ. Çevre akımları i₁ (sol çevre) ve i₂ (sağ çevre), ikisi de saat yönünde. İstenen: i₁ ve i₂.
Cevap: **i₁ = 3 mA, i₂ = 1 mA**. Tuzağa düşülürse: i₁ = 2 mA, i₂ = −2 mA (yanlış). Hesap ve bağımsız kontroller: `dogruluk.md`, `dogrula.py`.

Kelime sayısı: seslendirme metni **278 kelime** (hedef 250–280). Süre tahmini: örnek 01'in gerçek sesinden ölçülen hız (398 kelime / 169,2 sn ≈ 2,35 kelime/sn) ile konuşma ≈ 1:58, sondaki 4 sn kartla birlikte ≈ **2:02** (hedef 1:50–2:05). Bu bölümde Shorts işareti yoktur. Sözlü abone çağrısı yoktur; abone animasyonu yalnızca görüntüdedir (sahne planı, sahne 6).

İlk 30 sn düzeni (Büyüme Ajanı rehberi bölüm 3, onay bekliyor): 0–5 sn soru ve konu (paragraf 1), 5–12 sn tuzak (paragraf 2), 12–16 sn vaat (paragraf 3). Vaat tahminen 15. saniyeden biraz önce başlar; metin kısa tutulduğu için kayma bu yöndedir.

## (a) Seslendirme metni

Aşağıdaki metin olduğu gibi ElevenLabs'e yapıştırılır.

```
Çevre akımları yöntemiyle final tipi bir soru çözüyoruz. İki çevre akımını arıyoruz.

Tuzak, ortadaki ortak dirençte. İki akımın farkını ters sırayla yazan, denklemleri kurar ama yanlış cevap bulur.

Sonunda işaretin kuralını göreceğiz ve sonucu iki yoldan kontrol edeceğiz.

Solda yirmi dört voltluk gerilim kaynağı var; artı ucu üstte. Üst telde soldan sağa önce altı kiloohm, sonra iki kiloohm var. İki direncin arasından alt hatta üç kiloohm iniyor; bu, ortak direnç. Sağ kolda üst telden alt hatta dört kiloohm iniyor.

Sol çevrenin akımı i bir, sağınki i iki; ikisi de saat yönünde.

Sol çevrede, kaynakta kazanılan yirmi dört volt, düşümlerin toplamına eşittir. Ortak dirençte iki akım zıt yönde geçer. Altı kiloohm çarpı i bir, artı üç kiloohm çarpı, i bir eksi i iki farkı, eşittir yirmi dört volt. Üç kiloohma bölünce: üç çarpı i bir, eksi i iki, eşittir sekiz miliamper.

Sağ çevre; tuzak burada. Birinci denklemdeki farkı aynen kopyalamak akla gelir. Bu, işareti ters çevirir. Kural: ortak dirençte önce o çevrenin kendi akımı yazılır, komşu akım çıkarılır. İki akım aynı yönde dönüyorsa geçerlidir. Bu çevrede kaynak yok; düşümlerin toplamı sıfır. Üç kiloohm çarpı, i iki eksi i bir farkı, artı iki kiloohm çarpı i iki, artı dört kiloohm çarpı i iki, eşittir sıfır. Sadeleşince: i bir eşittir üç çarpı i iki.

Yerine koyunca: sekiz çarpı i iki eşittir sekiz miliamper. İ iki eşittir bir miliamper, i bir eşittir üç miliamper. Farkı ters yazsaydık, i bir eşittir iki miliamper, i iki eşittir eksi iki miliamper çıkardı. Sayılar düzgün ama yanlış.

Kontrol: ortak dirençten iki miliamper iner, uçlarında altı volt. Soldan: yirmi dört volt eksi on sekiz volt, altı volt. Sağdan: iki volt artı dört volt, yine altı volt. Tutuyor.
```

Sesli okunuş notları:
- Akım adları küçük harfle "i bir", "i iki" yazıldı: büyük "I" Türkçe okumada "ı" sesine dönebilir. Ekranda da küçük harf i₁, i₂ kullanılır (Razavi Ders 8'deki gösterim).
- "çarpı," sonrasındaki virgül ve "farkı" sözcüğü, çarpmanın farkın tamamına uygulandığını sesle ayırır ("üç kiloohm çarpı i bir, eksi i iki" gibi yanlış gruplanmasın diye).
- "i bir ve i iki" gibi yan yana okunan ad çifti yok; sonuçlar "i iki eşittir bir miliamper, i bir eşittir üç miliamper" biçiminde ("i iki de bir" dizilişi "ikide bir" diye duyulabileceği için kullanılmadı).
- Direnç değerleri birbirinden farklı (altı, üç, iki, dört kiloohm): "iki kiloohm" sesle tek bir direnci gösterir.
- Rakam, simge, parantez yok (otomatik kontrol: `[0-9=+/()-]` bulunmadı).

## (b) Sahne planı (beyaz tahta, 16:9, 1920×1080)

Kalemler: siyah (devre, denklemler), mavi (çevre akımları i₁ ve i₂, akım okları, sonuçlar), kırmızı (tuzak, yanlış terim, vurgu). Çarpma işareti yalnızca "×". Bütün sayılar ondalıksız çıkar.

**Tahta yerleşimi (bütün video boyunca aynı):**
- Başlık bandı: y %3–9, x %4–70.
- Devre alanı: x %4–44, y %14–62.
- Denklem sütunu: x %48–97, y %12–74 (satır yüksekliği ~%8; Patrick Hand ~40 px; en uzun satır 2. çevrenin açık denklemi ~42 karakter — sığmazsa yazı boyutu küçültülür, satır bölünmez).
- **Alt bant: y %76–100 bütün video boyunca boş tutulur.** Yalnızca abone animasyonu (sahne 6) ve sondaki "Bilmen gerekenler" kartı (sahne 10) burayı kullanır.

**Devrenin tam tarifi:**
- Alt hat: y %58'de, x %8–44 arası kesintisiz yatay tel.
- Üst hat: y %20'de, x %8–44 arası; üzerinde iki direnç.
- Sol dikey kol (x %8): gerilim kaynağı (daire; içinde + üstte, − altta), alt hat ile üst hattın sol köşesi arasında; solunda "24 V".
- Üst telde sol yatay direnç, x %12–24: üstünde "R₁ = 6 kΩ".
- Orta düğüm M: x %27, y %20; dolu nokta. Alt hattaki karşılığı (x %27, y %58) de dolu nokta.
- Orta dikey kol (x %27): R₂ dikey direnç, M ile alt hat arasında; sağında "R₂ = 3 kΩ" ve altında küçük kırmızı "ortak direnç".
- Üst telde sağ yatay direnç, x %30–41: üstünde "R₃ = 2 kΩ".
- Sağ dikey kol (x %44): R₄ dikey direnç, üst hattın sağ köşesi ile alt hat arasında; sağında "R₄ = 4 kΩ".
- Köşeler kesintisiz tel (nokta yok); yalnızca M ve alt hattaki karşılığı bağlantı noktasıdır. Etiketler tellerin ve elemanların üstüne binmez.
- Çevre akımları: sol çevrenin ortasında (x %17, y %40) saat yönünde mavi dairesel ok ve "i₁"; sağ çevrenin ortasında (x %36, y %40) saat yönünde mavi dairesel ok ve "i₂".

Zamanlar örnek 01'in ölçülen konuşma hızına göre **tahmindir**; Aşama 2'de gerçek sesin cümle sınırlarına oturtulur.

| # | Tahmini zaman | Paragraf (ilk sözcükler) | Tahtada ne çizilir / yazılır |
|---|---|---|---|
| 1 | 0:00–0:05 | "Çevre akımları yöntemiyle final tipi…" | İlk karede başlık yazılmaya başlar: "Çevre akımları yöntemi: final tipi soru". Aynı anda devre alanında R₂ (orta dikey direnç) son konumunda çizilir. "İki çevre akımını arıyoruz" denince denklem sütununun en üstüne: "İstenen: iki çevre akımı". |
| 2 | 0:05–0:12 | "Tuzak, ortadaki ortak dirençte…" | R₂'nin çevresine kırmızı daire; yanına kırmızı "ortak direnç". "ters sırayla yazan" denince dairenin yanına kırmızı soru işareti. |
| 3 | 0:12–0:16 | "Sonunda işaretin kuralını…" | Kırmızı soru işaretinin altı çizilir; "iki yoldan kontrol" denince M düğümünün dolu noktası konur ve üst tel M'den sola ve sağa doğru çizilmeye başlar (sahne durmaz). |
| 4 | 0:16–0:34 | "Solda yirmi dört voltluk gerilim kaynağı…" | Devre konuşma sırasıyla çizgi çizgi tamamlanır: sol kaynak ve "24 V" (artı işareti "artı ucu üstte" denirken) → R₁ ve "R₁ = 6 kΩ" → R₃ ve "R₃ = 2 kΩ" → R₂'nin etiketi "R₂ = 3 kΩ" (R₂ ve kırmızı "ortak direnç" yerinde kalır) ve alt hattaki bağlantı noktası → R₄ ve "R₄ = 4 kΩ" → alt hat soldan sağa kesintisiz. |
| 5 | 0:34–0:39 | "Sol çevrenin akımı i bir…" | Sol çevrede mavi saat yönü oku ve "i₁"; sonra sağ çevrede mavi saat yönü oku ve "i₂". "ikisi de saat yönünde" denince iki okun ucu mavi ile kalınlaştırılır. |
| 6 | 0:39–1:00 | "Sol çevrede, kaynakta kazanılan…" | Sol çevrenin mavi oku kalınlaşır. "kazanılan yirmi dört volt" denince "24 V" altı çizilir. "zıt yönde geçer" denince R₂'nin solunda aşağı bakan kısa mavi ok "i₁", sağında yukarı bakan kısa mavi ok "i₂". Denklem sütununa terim terim (söylenen terimin altı o an mavi çizilir):<br>`6 kΩ × i₁ + 3 kΩ × (i₁ − i₂) = 24 V`<br>"Üç kiloohma bölünce" denince altına, çerçeve içinde: `3i₁ − i₂ = 8 mA` ve yanına "(1. denklem)".<br>**Abone ol + zil animasyonu (UZUN.md 3b, ~6 sn):** açık denklemin son terimi "= 24 V" yazılınca (cümle sınırı "…eşittir yirmi dört volt." bitişi, tahmini **0:54**) kart alttan girer; tahmini **1:00**'da (cümle sınırı "…sekiz miliamper." bitişi; en geç "Sağ çevre; tuzak burada." bitişi, ~1:01) çıkışını tamamlar. Bu sürede tahtada yalnızca denklem sütununun üst kısmı (y ≤ %36) ve devre alanı kullanılır; **alt bant (y %76–100) boştur.** Kart, sahne 7'deki kırmızı yanlış terim yazılmadan önce tamamen çıkmış olur. Seslendirmede sözlü çağrı yok. |
| 7 | 1:00–1:30 | "Sağ çevre; tuzak burada…" | Sağ çevrenin mavi oku kalınlaşır. "aynen kopyalamak akla gelir" denince denklem sütununda (y ~%40) kırmızı ile: `3 kΩ × (i₁ − i₂)`; "Bu, işareti ters çevirir" denince üstüne kırmızı çarpı, yanına kırmızı "ters işaret". "Kural" denince altına (y ~%46–56) üç satır kalemle: "Kural: ortak dirençte önce o çevrenin kendi akımı yazılır," / "sonra komşu akım çıkarılır." / "(iki akım aynı yönde dönüyorsa)"; üçüncü satırın altı kırmızı çizilir. "Bu çevrede kaynak yok" denince sağ çevrenin içindeki "i₂" okunun altı çizilir. Sonra (y ~%60) terim terim:<br>`3 kΩ × (i₂ − i₁) + 2 kΩ × i₂ + 4 kΩ × i₂ = 0`<br>"(i₂ − i₁)" yazılırken altı kırmızı çizilir. "Sadeleşince" denince altına, çerçeve içinde: `i₁ = 3i₂` ve yanına "(2. denklem)". |
| 8 | 1:30–1:46 | "Yerine koyunca: sekiz çarpı…" | Kırmızı yanlış terim, kural satırları ve iki açık denklem silinir (≤ 0,3 sn); iki çerçeveli denklem yerinde kalır. Boşalan yere (y ~%40–56): `3 × 3i₂ − i₂ = 8 mA`, altında `8i₂ = 8 mA`; sonra ayrı satırlarda, mavi, kırmızı çerçeve içinde `i₂ = 1 mA` ve `i₁ = 3 mA`. Devredeki "i₁" ve "i₂" etiketleri "i₁ = 3 mA", "i₂ = 1 mA" olur. "Farkı ters yazsaydık" denince altına kırmızı: "Ters işaretle çıkan: i₁ = 2 mA, i₂ = −2 mA"; "Sayılar düzgün ama yanlış" denince yanına kırmızı "yanlış" ve üstüne kırmızı çizgi. |
| 9 | 1:46–1:58 | "Kontrol: ortak dirençten iki miliamper…" | Kırmızı yanlış sonuç satırı ve ara satırlar silinir; çerçeveli sonuçlar kalır. R₂ üzerinde aşağı bakan mavi ok ve "2 mA"; denklem sütununa: `2 mA × 3 kΩ = 6 V`. "Soldan" denince R₁'in üstüne küçük `3 mA × 6 kΩ = 18 V`, sütuna `24 V − 18 V = 6 V` ve siyah onay işareti. "Sağdan" denince R₃'ün üstüne küçük `1 mA × 2 kΩ = 2 V`, R₄'ün yanına küçük `1 mA × 4 kΩ = 4 V`, sütuna `2 V + 4 V = 6 V` ve siyah onay işareti. "Tutuyor" denince M düğümünün yanına mavi "6 V", kırmızı alt çizgi. Kalem imleci yazı bitince kaybolur. |
| 10 | 1:58–2:02 (ses yok, 4 sn) | — | "Bilmen gerekenler" kartı alt banda (y %78–97) kalemle yazılır; devre ve sonuçlar küçülmeden yerinde kalır. |

## (c) "Bilmen gerekenler" kartı

- Ortak dirençte kendi akımından komşu akım çıkarılır
- Kural, akımlar aynı yönde dönüyorsa geçerli
- Sonuç: i₁ = 3 mA, i₂ = 1 mA

Açıklama için kaynak atfı: "Kaynak: B. Razavi, Basic Circuits, Ders 8" (yalnızca yöntem; soru özgündür).
