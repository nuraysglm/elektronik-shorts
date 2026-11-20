# S2 — doğruluk (sürüm 3)

Kaynak: Mano & Ciletti, Digital Design 4e, Bölüm 1.2, PDF s. 16–17 (Drive `mano_bolum1.txt`, id 1QnOo3NpXnTq7LUcWP0rocvs3HGore9Bv). Hesaplar: `dogrula.py` (TAMAM).

| İddia | Dayanak | ✔ |
|---|---|---|
| r tabanında katsayılar r'nin kuvvetleriyle çarpılıp toplanır; virgülün sağında kuvvetler negatiftir (a₋₁r⁻¹ + a₋₂r⁻² …) | Mano s. 16–17 (genel açılım; "radix point distinguishes positive powers … from negative powers") | ✔ |
| (0,1)₂ = 1 × 2⁻¹ = 0,5; (0,1)₂'yi 0,1 okumak hata | Mano s. 17: 11010.11 = 26.75 (… + 1 × 2⁻¹ + 1 × 2⁻²) | ✔ |
| 2⁻² = 1 ÷ (2 × 2) = 1 ÷ 4 = 0,25; 8⁻¹ = 0,125 | `dogrula.py`; Mano s. 17 ((127.4)₈ = … + 4 × 8⁻¹) | ✔ |
| Sağa doğru her ağırlık bir öncekinin 1/r katı | r⁻⁽ᵏ⁺¹⁾ = r⁻ᵏ / r; `dogrula.py` | ✔ |
| (10,11)₂ = 2 + 0 + 0,5 + 0,25 = 2,75 | `dogrula.py`; yöntem Mano s. 17 | ✔ |
| Farklı tabanlar parantez + alt simgeyle yazılır | Mano s. 17 | ✔ |
| "En sık yapılan hata" adı | Virgülün sağındaki basamağı onluk gibi okumak (ikilik kesiri onluk kesir sanmak) derslerde bilinen klasik hatadır; Mano'nun alt simge notu (s. 17) bu karışıklığı önler. Kanal sahibine onay isteğinde ayrıca soruldu. | ✔ (onaya bağlı) |
| İlk yorum: (0,11)₂ = 0,75 | `dogrula.py` | ✔ |
