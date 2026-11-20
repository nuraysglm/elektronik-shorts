# S2 — zor noktalar (AGENT.md 2f-1)

Kaynak: Mano & Ciletti, Digital Design 4e, Bölüm 1.2 (PDF s. 16–17; Drive `mano_bolum1.txt`). Kanal sahibinin Ders 2 videosu (bIOWChqPS1E) kaynak değil, yalnızca ilgili video.

**Öğrencilerin karıştırdığı noktalar**
1. "10" yazısı her tabanda "on" okunur; oysa r tabanında (10)ᵣ = 1 × r + 0 × 1 = r, yani tabanın kendisidir (Mano s. 17: r tabanında katsayılar r'nin kuvvetleriyle çarpılır). Mano sayıları bu yüzden parantez + taban alt simgesiyle yazar (s. 17: "To distinguish between numbers of different bases, we enclose the coefficients in parentheses and write a subscript equal to the base used").
2. r tabanında rakamlar 0'dan r − 1'e kadardır (Mano s. 17: "The coefficients a_j range in value from 0 to r − 1"; "the digits 8 and 9 cannot appear in an octal number"). Taban sayısının kendisi tek rakamla yazılamaz; bu yüzden iki basamağa (10) geçilir.
3. Basamağın değeri = rakam × basamak ağırlığı; ağırlıklar sağdan sola r⁰, r¹, r², … (Mano s. 16–17; s. 17 örnekleri (4021.2)₅, (127.4)₈).

**Ön bilgi**
- Onluk sistemde basamak değeri (birler, onlar, yüzler)
- Üs: r⁰ = 1, r¹ = r, r² = r × r

**Vurgulanan nokta (2b-2 / 2f-0, sürüm 2):** En sık yapılan hata: (0,1)₂ = onda bir sanmak. Doğrusu: (0,1)₂ = 1 × 2⁻¹ = 0,5. Virgülün sağındaki ağırlıklar tabanın eksi kuvvetleridir (Mano s. 16–17: "radix point distinguishes positive powers … from negative powers"; 11010.11 = 26.75 örneği).
4. Virgülün sağındaki basamaklar onluk gibi okunur ((0,1)₂ = 0,1 sanılır); oysa ağırlıklar r⁻¹, r⁻² … (Mano s. 16–17).
