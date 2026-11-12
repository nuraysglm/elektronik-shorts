# 006 (2. sürüm) — doğruluk

Okunan kaynak: B. Razavi, Basic Circuits, Lecture 1 (YouTube U_4q0sfChOk), transkript vidIQ ile alındı (12.11.2026). Ders 1 = konu 6 (kaynaklar.md).

| İddia (videoda) | Neden doğru / kaynak | ✔ |
|---|---|---|
| Akım, yük hareket edince oluşur | [12:55] "current occurs when electric charge moves" | ✔ |
| i = dq/dt (anlık değer; birimi amper) | [16:35] "the official definition of current is … dq over dt; the unit of current is amperes" | ✔ |
| Akımın değeri ve yönü vardır (ok ile gösterilir; ok yönü seçimi keyfidir) | [17:40]–[17:56] "each current has a value and a direction … you could put the arrow the other way, it's up to you" | ✔ |
| q = ∫ i dt; yük i(t) eğrisinin altındaki alandır | [20:38] "q is equal to integral of the current with respect to time"; [23:08] "the charge is actually the area under the current plot" | ✔ |
| Anahtar t1'de kapanıp t2'de açılınca akım darbe olur, q = I1 (t2 − t1) | [22:51]–[23:08] ve [26:52]–[27:25] (pil + anahtar + R1 devresi, I = VB/R1) | ✔ |
| 9 V ÷ 3 kΩ = 3 mA | Ohm yasası [10:47]; 9/3000 = 0,003 A; kodda check | ✔ |
| 3 mA × 9 s = 27 mC | 0,003 × 9 = 0,027 C; kapalı kalma süresi kodda tam saniye (DQ = 9), check ile | ✔ |
| Direnç renk kodu turuncu-siyah-kırmızı = 3 kΩ | 3, 0, ×10² → 30 × 100 = 3000 Ω; kodda check | ✔ |
| Gerilim iki nokta arasında anlamlıdır; değeri ve işareti vardır | [34:29] "a voltage has a value and a sign"; [35:54]–[36:44] "voltage is meaningful only between two points" | ✔ |
| V_ab = +1 C'yi b'den a'ya taşımak için gereken enerji; 9 V → 9 J | [29:33]–[30:59] tanım; 1 V = 1 J/C → 1 C × 9 V = 9 J | ✔ |
| Açık devre yalnızca i = 0'ı garanti eder; gerilim çevre devreyle belirlenir | [18:29]–[19:34] "an open circuit only guarantees a zero current but it knows nothing about the voltage" | ✔ |
| Açık anahtarın uçlarında 9 V: arka uç +, ön uç − | Akım 0 → dirençte gerilim 0 (V = IR); arka uç dirençten pilin + ucuna, ön uç pilin − ucuna bağlı → V = 9 V (KVL, ideal pil [42:56]) | ✔ |
| Kısa devre yalnızca V = 0'ı garanti eder; akım çevre devreyle belirlenir | [37:01]–[38:36] "a short circuit guarantees v equals zero … what does it tell us about the current … nothing" | ✔ |
| Kapalı (ideal) anahtar = kısa devre | [40:27]–[40:44] "the switch begins to conduct so it shorts this node to this node" | ✔ |
| Kapalı anahtarda i = 3 mA, V = 0 | V_anahtar = 0 → direnç uçlarında 9 V → i = 9/3 kΩ = 3 mA | ✔ |
| Söndürülmüş lamba anahtarı: i = 0, uçlarında ≈ 230 V (AC) | Türkiye şebekesi 230 V (etkin) AC; anahtar açıkken akım yok → ampul flamanında gerilim düşümü yok → şebeke gerilimi açık anahtar uçlarında görülür (aynı KVL akıl yürütmesi; anma gerilimi IEC 60038: 230 V, Türkiye şebekesi 230 V / 50 Hz) | ✔ |
| Elektronlar dış devrede − → +, geleneksel akım + → − | Elektron yükü negatif; akım yönü pozitif yük akışı yönü olarak tanımlıdır (kanal kuralı 2a.7) | ✔ |

## İlk yorum sorusu
"9 V'luk pile 3 kΩ direnç ve açık bir anahtar seri bağlı. Açık anahtarın uçları arasındaki gerilim kaç volt? Cevabını yaz 👇" → Cevap: 9 V (i = 0 → dirençte 0 V → tüm 9 V anahtarda). Videodaki o1 ile aynı akıl yürütme.
