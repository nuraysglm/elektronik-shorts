# S1 — zor noktalar (AGENT.md 2f-1)

Kaynak: Floyd, Digital Fundamentals 11e, Bölüm 1 (PDF s. 18, 20, 21). Kanal sahibinin Ders 1 videosu (I4o4vBcORSo) kaynak değil, yalnızca ilgili video.

**Öğrencilerin karıştırdığı noktalar**
1. "1 = 5 V (ya da 3,3 V), 0 = 0 V" sanılır; oysa pratik devrede HIGH ve LOW birer gerilim **aralığıdır** (Floyd s. 21: "a HIGH can be any voltage between a specified minimum value and a specified maximum value").
2. İki aralık arasında kalan gerilimler "yarı 1" değildir; **kabul edilemez** bölgedir, devre bunu 1 de 0 da okuyabilir (Floyd s. 21).
3. Gürültü (istenmeyen gerilim dalgalanması) aralığın içinde kaldığı sürece okunan bit değişmez; sayısal verinin gürültüden az etkilenmesinin sebebi budur (Floyd s. 18 + s. 21).

**Ön bilgi**
- Gerilim (V) kavramı
- Pozitif lojik: 1 = HIGH (yüksek gerilim), 0 = LOW (Floyd s. 20)

**Vurgulanan nokta (2b-2):** Sayısal 1 ve 0 tek bir gerilim değil, birer gerilim aralığıdır; arası kabul edilemez.
