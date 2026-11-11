# 005 — Akım, gerilim ve direnç arasındaki ilişki (Ohm yasası) — 4'lü serinin 4. videosu

Kaynak: kaynaklar.md'de bu konu için kanal sahibinin verdiği kaynak yok; ders kitabı bilgisi (Ohm yasası, V = I × R) kullanıldı, hesaplar dogruluk.md'de.
Yapı: kanca → animasyonla gösterim (gerilimi artır/azalt → akım ve ampul; direnci artır/azalt → akım ve ampul) → gerçek hayat (aynı ampul, üç kaynak) → yasa en sonda (V = I × R, gerçek değerli örnek).
Devre: ayarlı güç kaynağı (V, ekranda) + ampul (30 Ω, sabit kabul) + ampermetre (I, ekranda) + sol kenarda eklenip çıkarılan 30 Ω direnç. Tüm sayılar I = V / R_toplam ile kodda hesaplanır.
Sahne geçişleri aynı kadrajda kesme ile (kural 15); kamera yalnızca yerinde çok yavaş yaklaşır/döner.

## Gerekli bilgi (videoda geçtiği yer)
- [x] Akım ampermetreyle ölçülür (m1)
- [x] Direnç sabitken gerilim 2 katına çıkınca akım 2 katına çıkar, ampul daha parlak yanar (v1)
- [x] Gerilim azalınca akım azalır (v2)
- [x] Gerilim sabitken toplam direnç 2 katına çıkınca akım yarıya iner, ampul kararır (r1)
- [x] Direnç azalınca akım artar (r2)
- [x] Gerçek hayat: aynı ampul farklı kaynaklarla (AA pil 1,5 V, 9 V pil, araba aküsü 12 V) farklı akım çeker (g1)
- [x] Ohm yasası: V = I × R; harflerin anlamı (f1, f2 — en sonda)
- [x] Gerçek değerli örnek: I = 9 V ÷ 30 Ω = 0,30 A (f2; ekrandaki güç kaynağı ve ampermetre değerleriyle aynı)

## Sahneler (animasyon → kalemle doğrulama etiketi), toplam ~70 sn
| # | Yazı aralığı (sn) | Animasyon (yazısız anlaşılmalı) | Etiket (sonra) | Efekt |
|---|------|------|------|------|
| h1 | 0–5,3 | Devre çalışıyor: güç kaynağı ekranı 4,5 V, ampermetre 0,15 A, ampul sönükçe yanar, yeşil elektronlar akar. Alt satır "Güç kaynağı, ampul, ampermetre", köşede "BÖLÜM 4" | Gerilim 2 katına çıkarsa / akım ne olur? | uğultu |
| m1 | 6,5–9,5 | Ampermetre çevresinde kırmızı halka; "ampermetre", "elektronlar" (− → +), kırmızı akım oku (+ → −, "akım yönü") | Ampermetre akımı ölçer | pop |
| v1 | 13,4–20,2 | Düğme döner, ekran 4,5 → 9,0 V (sarı halka); elektronlar hızlanır, ampul parlaklaşır, ampermetre 0,15 → 0,30 A | Gerilim 2 katı → akım 2 katı / Ampul daha parlak | pop |
| v2 | 23,9–27,0 | Düğme geri döner, 9,0 → 4,5 V; elektronlar yavaşlar, ampul kararır, 0,30 → 0,15 A | Gerilim yarıya → akım yarıya | pop |
| r1 | ~33–38 | Gerilim yeniden 9,0 V (0,30 A, ampulün yanında "30 Ω"); sol kenara 30 Ω'luk direnç yerine oturur (köprü teli kaybolur, mavi halka); elektronlar yavaşlar, ampul kararır, 0,30 → 0,15 A; "30 Ω", "toplam: 60 Ω" | Direnç 2 katı → akım yarıya / Ampul kararır | pop, thud |
| r2 | ~42–45 | Direnç çıkar, köprü teli geri gelir; akış hızlanır, ampul parlar, 0,15 → 0,30 A; "toplam: 30 Ω" | Direnç azalır → akım artar | thud |
| g1 | ~49–55 | Aynı kadrajda kesme: üç platformda AA pil (1,5 V), 9 V pil, araba aküsü (12 V), her birine aynı küçük ampul bağlı; ampuller sırayla yanar, parlaklık artan sırada; üstlerinde 0,05 A / 0,30 A / 0,40 A | Aynı ampul, farklı kaynak / Gerilim büyük → akım büyük | pop ×3 |
| f1 | ~57–61 | Kesme ile devre geri gelir: 9,0 V, 0,30 A, ampul 30 Ω | Ohm yasası: V = I × R / V: gerilim · I: akım · R: direnç | thud, uğultu |
| f2 | ~61–70 | Aynı sahne, kamera yavaşça yaklaşır (döngüye uygun son kare) | yani I = V ÷ R / 9 V ÷ 30 Ω = 0,30 A | — |

Seslendirme ve müzik yok. Ampulün direnci sabit (30 Ω) kabul edilir (idealleştirme; gerçek ampulde direnç sıcaklıkla değişir). Parlaklık görsel ölçektir (güç I²R ile artar).
