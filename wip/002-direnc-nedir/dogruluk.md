# Doğruluk — 002 Direnç nedir?

| İddia (ekranda / animasyonda) | Neden doğru | |
|---|---|---|
| Devreye direnç eklenince ampul söner (kancada) | Seri devrede toplam direnç artar (30 Ω → 130 Ω), V sabitken I = V / R_toplam azalır; ampul gücü P = I²R_ampul düşer | ✔ |
| Aynı itmede dar boruda daha az akış | Su borusu benzetmesi: aynı basınç farkında dar borunun akışa direnci büyüktür, debi küçüktür (elektrikteki direncin yaygın benzetmesi) | ✔ |
| "Bu engel: direnç" — direnç akışa karşı koyan özelliktir | Direncin tanımı: bir malzemenin/elemanın elektrik akımına karşı koyma özelliği | ✔ |
| Anahtar kapanınca akış başlar, açıkken akmaz | Açık devrede kapalı yol yoktur, akım 0 | ✔ |
| Elektronlar pilin − ucundan + ucuna akar (dış devrede) | Elektronlar negatif yüklüdür; dış devrede − kutuptan + kutba hareket eder | ✔ |
| Geleneksel akım yönü + → − | Akım yönü pozitif yük hareketi yönü olarak tanımlanır; dış devrede + kutuptan − kutba | ✔ |
| Direnç ↑ → Akım ↓ (100 Ω → 300 Ω, ampul kararır) | 9 / (30+100) = 69 mA > 9 / (30+300) = 27 mA (sahne kodunda `check`) | ✔ |
| Direnç ↓ → Akım ↑ (300 Ω → 50 Ω, ampul parlar) | 9 / (30+50) = 112,5 mA > 27 mA | ✔ |
| Renk kodları: kahverengi-siyah-kahverengi = 100 Ω, turuncu-siyah-kahverengi = 300 Ω, yeşil-siyah-siyah = 50 Ω, 4. bant altın (±%5) | (1·10+0)×10 = 100; (3·10+0)×10 = 300; (5·10+0)×1 = 50 (sahne kodunda `check`) | ✔ |
| Isıtıcı teli, ampul, ütü, su ısıtıcısı: her cihazın bir direnci (direnç eşdeğeri) var | Akım çeken her yük, uçlarındaki gerilim ve çektiği akımla R_eş = V / I olarak modellenebilir; ısıtıcı teli, ütü ve su ısıtıcısının rezistansı doğrudan dirençtir | ✔ |
| Isıtıcı teli = direnç | Isıtıcı teli (ör. nikrom) elektrik enerjisini ısıya çeviren bir dirençtir | ✔ |
| Direncin sembolü R, birimi ohm (Ω) | SI birimi ohm, sembolü Ω; büyüklük sembolü R | ✔ |
| 9 V pil | Ekrandaki değer, görsel model | ✔ |

Not: Ampul filaman direnci (30 Ω) yalnızca parlaklık/hız hesaplaması için kullanılır, ekranda gösterilmez. Akım değerleri ekranda yok (Ohm yasası serinin 4. videosu).

## Bağımsız denetim (alt ajan, yalnızca metin) — sonuç ve yapılanlar
- "Ampul neden söndü?" → animasyonda ampul kararıyor, sönmüyor: **"Ampul neden karardı?"** yapıldı.
- Şarj olan telefon sabit bir direnç gibi davranmaz: model **su ısıtıcısı** ile değiştirildi (içinde direnç teli var).
- Son etiket "akışa engel" → **"akıma engel"**.
- Seri devrede akım her yerde aynı olmalı: sahne kodunda tüm döngüdeki elektronlar aynı hızla yavaşlar/hızlanır, sayıları değişmez ✔ (yalnızca direnç içinde hafif titreşim).
- 50 Ω E24 değeri değil (renk kodu doğru); değiştirilmedi, ekrandaki renk kodu 50 Ω ile tutarlı.
