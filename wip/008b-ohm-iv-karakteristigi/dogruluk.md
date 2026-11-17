# 008b — doğruluk (bölüm 7 A, 2b-3, 2d, 2i)
Kaynak: Razavi, Basic Circuits Lec 3 (LUfU9LgClsA) transkripti (vidIQ, 17.11.2026). Hiperbol ayrımı: kanal sahibinin notu (konular.md 8b, 14.11.2026) — i = V/R'nin V sabitken matematiksel sonucu.

| İddia | Dayanak | Hesap / kontrol | |
|---|---|---|---|
| Ohm kanunu: V = i·R, eşdeğeri i = V/R | [16:22–16:37] "v is equal to i r so this is ohm's law"; [24:26] "i is equal to v over r" | — | ✔ |
| Gerilim uygulanıp akım ölçülürse i–V grafiği düz çizgidir, eğimi 1/R | [26:22–27:11] "i as a function of v and this is also a straight line except that the slope of this line is 1 over r" | 1 kΩ: 6 V → 6 mA; 1/R = 1 mA/V (check) | ✔ |
| Ohm kanununun grafiği orijinden geçen düz çizgidir | [32:54] "ohm's law was always a straight line passing through the origin" | doğrular (0, 0)'dan çizilir | ✔ |
| Her R ayrı bir doğrudur; R büyüdükçe eğim (1/R) azalır | [26:54] eğim 1/R | 1/1 > 1/2 > 1/3 mA/V | ✔ |
| V sabitken i = V/R, i ∝ 1/R: grafik hiperboldür, doğrusal değildir | [24:26] i = V/R; kanal sahibinin notu | R: 1, 2, 3 kΩ → 6, 3, 2 mA (check); R 3 katı → i 1/3 (doğrusal olsaydı (1;6)–(3;2) doğrusunda 2 kΩ'da 4 mA olurdu, gerçek 3 mA) | ✔ |
| "Akım R ile ters orantılıdır" (V sabitken) | i = V/R | 6 V sabit | ✔ |
| i–V doğrularının V = 6 V ile kesişimleri i–R hiperbolünün noktalarıdır | i = 6/R her iki grafikte aynı değer | kesişimler (6 V; 6, 3, 2 mA) → (1, 2, 3 kΩ; 6, 3, 2 mA), aynı yükseklik (check) | ✔ |
| Grafik eksenleri: i 0–8 mA, V 0–8 V, R 0–4 kΩ; gösterilen en büyük akım 6 mA eksen içinde; hiperbol R = 0,75 kΩ'da 8 mA'e ulaşır, öncesi çizim alanı dışında (kırpılır) | bölüm 2e | check() | ✔ |
| Elektronlar dış devrede − → +, geleneksel akım + → − (güç kaynağının + ucundan dirence) | Ders 1 referans yönü; bölüm 2a-7 | ok +z (check), elektron u yönü | ✔ |
| Renk bantları kırmızı-siyah-kırmızı (sahnede ayarlı direncin gövdesi; değer etiketi ayrı) | süs; değer R etiketiyle verilir | — | ✔ |

İlk yorum sorusu: "12 V sabit bir kaynağa önce 3 kΩ, sonra 6 kΩ direnç bağlanıyor. Akım kaç mA'den kaç mA'e düşer? i–R grafiği bu iki noktayı düz çizgiyle mi birleştirir? Cevabını yaz 👇" Cevap: 12/3 = 4 mA, 12/6 = 2 mA; hayır, i = 12/R hiperboldür (ör. 4,5 kΩ'da 2,67 mA, düz çizgi 3 mA derdi). ✔
