# 006 (2. sürüm) — Elektrik yükü, akım ve gerilim (Temel Devre Teorisi I, ders 1)

**Vurgulanan yanlış/nokta:** (1) "Açık devrede gerilim de sıfırdır" yanlışı: açık devre yalnızca i = 0'ı garanti eder; kısa devre (kapalı ideal anahtar) yalnızca V = 0'ı garanti eder. (2) Yük, i(t) eğrisinin altındaki alandır (q = ∫ i dt; i = dq/dt).

Kaynak: B. Razavi, Basic Circuits, Ders 1 (YouTube U_4q0sfChOk) transkripti; zaman damgaları dogruluk.md'de.
Seviye: üniversite 1. sınıf (bölüm 2b). Ortaokul benzetmeleri (balon-yün, atom modeli) çıkarıldı.
Süre: 87,1 sn (≤ 90). Seslendirme/müzik yok; yalnızca olay efektleri (anahtar tıkı, akım uğultusu, pop, thud).

## Gerekli bilgi (videoda geçtiği yer)
- [x] Akımın değeri ve yönü vardır; referans ok (c1: kırmızı "akım yönü" oku, "i: değer + yön")
- [x] Akım = yük akışı; i = dq/dt (f2)
- [x] q = ∫ i dt = i(t) eğrisinin altındaki alan (c2: canlı grafik, alan yeşil dolar, q sayacı; 3 mA × 9 s = 27 mC)
- [x] Gerilim yalnızca iki nokta arasında anlamlı, işaretli; +1 C'yi b'den a'ya taşıma enerjisi (v1: a(+), b(−), W = 9 J → 9 V)
- [x] Açık devre: i = 0, ama uçlarda gerilim olabilir (o1: voltmetre açık anahtarda 9,00 V)
- [x] Kısa devre (kapalı anahtar): V = 0, ama akım çevre devreyle belirlenir (o2: 0,00 V, i = 3 mA)
- [x] Gerçek hayat: söndürülmüş lamba anahtarı: i = 0, uçlarında ≈ 230 V (AC) (g1)
- [x] Kurallar en sonda (f1, f2)
- [x] Elektronlar − → + (yeşil), geleneksel akım oku + → − (kırmızı)

## Sahneler (zamanlar sahne kodundan)
| # | Yazı (sn) | Animasyon (yazısız anlaşılmalı) | Etiket (sonra) | Efekt |
|---|---|---|---|---|
| h1 | 0–4,4 | 9 V pil, açık bıçaklı anahtar (sol), 3 kΩ direnç (sağ); elektronlar yerinde titrer. Köşede "DERS 1", alt satır "Anahtar açık: akım yok. Ya gerilim?" | Açık devrede / gerilim sıfır mı? | — |
| c1 | 8,1–14,8 | Arkada i(t) paneli belirir, çizilmeye başlar; anahtar kapanır (6,55 s), elektronlar − → + akar, kırmızı akım oku belirir, eğri 0 → 3 mA sıçrar, alan dolmaya başlar | i: değer + yön / 9 V ÷ 3 kΩ = 3 mA | tık, uğultu |
| c2 | 18,3–25,7 | Anahtar 9 s sonra açılır; eğri 0'a iner; dikdörtgen alan tamamlanır; sayaç q = 27 mC | Yük = eğrinin altındaki alan / 3 mA × 9 s = 27 mC | tık |
| v1 | 30,2–38,8 | +1 C test yükü pilin − ucundan (b) + ucuna (a) yay üzerinde taşınır, W sayacı 0 → 9,0 J; pil kutbu parlar | Gerilim: iki nokta arasında / +1 C, b → a: 9 J → 9 V | pop |
| o1 | 42,4–49,2 | Voltmetre yerinde belirir, uçları açık anahtarın iki ucuna değer; ekran 0 → 9,00 V; uçlarda + / −; dirençte "i = 0" | Açık devre: i = 0 / ama uçlarında 9 V var! | thud, pop |
| o2 | 52,6–60,0 | Anahtar kapanır; voltmetre 0,00 V; elektronlar akar; "i = 3 mA" | Kapalı anahtar = kısa devre / V = 0, ama i = 3 mA | tık, uğultu |
| g1 | 63,2–68,7 | Kesme (aynı kadraj): duvar lamba anahtarı + sönük ampul mini modeli; anahtar uçları arasında soluk sarı yay, "≈ 230 V (AC)" | Lamba söndürülünce: / i = 0, uçlarında ≈ 230 V | thud |
| f1 | 70,1–77,5 | Kesme: aynı devre (kapalı), elektronlar akar, kamera yavaşça yaşar | Açık devre → yalnızca i = 0 / Kısa devre → yalnızca V = 0 | uğultu |
| f2 | 77,8–87,1 | Aynı devre, döngüye uygun son kare | i = dq/dt · q = ∫ i dt / V: birim (+) yük başına enerji | — |
