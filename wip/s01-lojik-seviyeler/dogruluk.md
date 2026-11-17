# S1 — doğruluk (AGENT.md 7A, 2i-5)

Onaylı kaynak: Floyd, *Digital Fundamentals* 11e, Bölüm 1 (Drive `floyd_bolum1.txt`, id 1zdDgb7nPUAn-tqTNH42bOgetBWKlGVwv). Sayfa = PDF sayfası.

| İddia (ekranda) | Dayanak | ✔ |
|---|---|---|
| 1 = HIGH, 0 = LOW (pozitif lojik); panelde "HIGH (1)", "LOW (0)" | Floyd PDF s. 20: "1 is represented by the higher voltage … HIGH, and a 0 … LOW. This is called positive logic" | ✔ |
| 1 tek bir gerilim değildir, bir aralıktır | Floyd s. 21: "a HIGH can be any voltage between a specified minimum value and a specified maximum value. Likewise, a LOW …" | ✔ |
| CMOS örneği: 1 için 2–3,3 V, 0 için 0–0,8 V | Floyd s. 21: "the HIGH input values for … CMOS may range from 2 V to 3.3 V and the LOW input values may range from 0 V to 0.8 V" | ✔ |
| 2,5 V → 1 okunur (kanca sorusu ve cevabı) | Floyd s. 21: "If a voltage of 2.5 V is applied, the circuit will accept it as a HIGH or binary 1" | ✔ |
| 0,5 V ve 0,2 V → 0 | Floyd s. 21: "If a voltage of 0.5 V is applied, the circuit will accept it as a LOW"; 0,2 V aynı aralıkta | ✔ |
| 0,8 V ile 2 V arası kabul edilemez | Floyd s. 21: "voltages between 0.8 V and 2 V are unacceptable" | ✔ |
| Devre bunu 1 de 0 da okuyabilir (gösterge düzensiz 1/0) | Floyd s. 21: "A voltage in the unacceptable range can appear as either a HIGH or a LOW to a given circuit" | ✔ |
| Gürültü aralığın içinde kalırsa okunan bit değişmez | Floyd s. 18: "Noise (unwanted voltage fluctuations) does not affect digital data nearly as much as it does analog signals" + s. 21 (aralıktaki her gerilim aynı bit olarak kabul edilir). Sahnede gürültülü LOW 0,15–0,65 V, gürültülü HIGH 2,65–3,15 V; `check()` her 1/240 sn'de bandın içinde kaldığını doğrular | ✔ |
| Kart: 'Örnekte 1, 2 V ile 3,3 V arasıdır', 'Örnekte 0, 0 V ile 0,8 V arasıdır', '0,8 V ile 2 V arası kabul edilemez' | s. 21 (Floyd'un 'a certain type of … CMOS' örneği; genelleme yapılmadı) | ✔ |
| Ekrandaki V değerleri (güç kaynağı göstergesi) | Sahne kodunda Vof(t)'den hesaplanır; 3,3 V eksen içinde (eksen 0–3,5 V), `check()` | ✔ |

Not: "gürültü payı" (noise margin) terimi ve formülü onaylı metin dosyalarında (Floyd Bölüm 1 ve 3) tanımlı bulunmadığı için videoda kullanılmadı (2i-5).

**İlk yorum sorusu (9a-3):** "Aynı CMOS girişine 1,9 V veriliyor. Devre bunu 1 olarak okur mu? Neden? Cevabını yaz 👇" — Cevap: Hayır, garanti edilemez; 1,9 V, 0,8–2 V kabul edilemez aralığındadır, devre 1 de 0 da okuyabilir (Floyd s. 21). ✔
