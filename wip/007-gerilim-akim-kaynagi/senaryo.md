# 007 — Gerilim kaynağı ve akım kaynağı (Temel Devre Teorisi I, ders 2)

**Vurgulanan yanlış/nokta:** (1) "Akım kaynağı da pil gibi açık bırakılabilir" yanlışı: ideal akım kaynağı açık devrede (R → ∞) V = i·R → ∞ üretmek zorunda kalır; akım kaynağı asla açık bırakılmaz. (2) İkilisi: ideal gerilim kaynağı V'yi sabit tutar, akım yüke bağlıdır; R → 0 iken i = V/R → ∞ (gerçek pilde gerilim düşer).

Kaynak: B. Razavi, Basic Circuits, Ders 2 (YouTube Hd0ZTXM572U) transkripti; zaman damgaları dogruluk.md'de.
Seviye: üniversite 1. sınıf (bölüm 2b): ideal kaynak tanımları, I(R) ve V(R) grafikleri, limit davranışı.
Süre: 89,6 sn (≤ 90; v3). Seslendirme/müzik yok; yalnızca olay efektleri (pop: R adımı, click: anahtar, thud: ∞ / model, hum: akım).

## Gerekli bilgi (videoda geçtiği yer)
- [x] İdeal gerilim kaynağı: iki uçlu; gerilimi içinden geçen akımdan bağımsız (v1: R 3 → 2 → 1 kΩ, voltmetre hep 6,00 V, ampermetre 2 → 3 → 6 mA, grafik i = 6/R hiperbolü)
- [x] i = V/R yüke bağlı; R → 0 ⇒ i → ∞ (ideal); gerçek pilde V düşer (v2: R → 0,25 kΩ, 24 mA, grafik taşar "→ ∞")
- [x] İdeal akım kaynağı: akımı uçlarındaki gerilimden bağımsız; sembol: daire içinde ok (c1: R 1 → 2 → 3 kΩ, ampermetre hep 2,00 mA, voltmetre 2 → 4 → 6 V, grafik V = 2R doğrusu)
- [x] Akım kaynağı açık bırakılırsa V → ∞; asla açık bırakılmaz (c2, c3: anahtar açılır, voltmetre → ∞, kaynak kırmızı uyarı)
- [x] Gerçek hayat: AA pil, araba aküsü ≈ gerilim kaynağı; telefon şarjı (sabit akımla) ≈ akım kaynağı (g1)
- [x] Kurallar en sonda (f2) + 'Bilmen gerekenler' kartı (bölüm 2f)
- [x] Elektronlar − → + (yeşil), geleneksel akım oku + → − (kırmızı); semboller: gerilim kaynağı daire + / −, akım kaynağı daire + ok

## Sahneler (zamanlar sahne kodundan)
| # | Yazı (sn) | Animasyon (yazısız anlaşılmalı) | Etiket (sonra) | Efekt |
|---|---|---|---|---|
| h1 | 0–3,8 | 6 V ideal gerilim kaynağı, ampermetre, kapalı anahtar, 3 kΩ ayarlı direnç; elektronlar akar; arkada boş I(R) grafiği; alt satır "İdeal kaynak: ne sabit kalır?" | Akım kaynağını / açık bırakırsan? | hum |
| v1 | 10,5–17,3 | R 3 → 2 kΩ (bekle) → 1 kΩ; voltmetre 6,00 V sabit; ampermetre 2 → 3 → 6 mA; elektronlar hızlanır; grafik hiperbol üzerinde nokta | Gerilim kaynağı: V sabit / i = V/R: yüke bağlı | pop ×2 |
| v2 | 21,2–27,3 | R → 0,25 kΩ; ampermetre 24,0 mA; grafik üstten taşar "→ ∞" | R → 0 ise i → ∞ / gerçek pilde V düşer | pop |
| c1 | 35,0–41,8 | Kesme (aynı kadraj): kaynak 2 mA ideal akım kaynağı, R = 1 kΩ; R 1 → 2 → 3 kΩ; ampermetre 2,00 mA sabit; voltmetre 2 → 4 → 6 V; grafik V = 2R doğrusu | Akım kaynağı: i sabit / V = i·R: yüke bağlı | thud, pop ×2 |
| c2 | 46,8–51,7 | Anahtar açılır ("açık devre"); elektronlar durur, ampermetre 0; voltmetre hızla büyür → ∞; grafik sağ üstten taşar; kaynak kırmızı yanıp söner | Anahtar açık: R → ∞ / 2 mA dayatılır: V = i·R → ∞ | click, thud |
| c3 | 52,2–56,5 | Aynı görüntü yaşar (kaynak kırmızı nabız) | Akım kaynağı asla / açık bırakılmaz | — |
| g1 | 60,7–66,9 | Kesme: AA pil, araba aküsü, şarj olan telefon kaidelerde sırayla; "≈ gerilim kaynağı", "≈ akım kaynağı" | Pil, akü ≈ gerilim kaynağı / Sabit akımla şarj ≈ akım kaynağı | thud ×3 |
| f2 | 74,6–81,8 | Aynı devre, döngüye uygun son kare | V kaynağı + R → 0: i → ∞ / i kaynağı + açık: V → ∞ | — |
| kart | 77–89,6 | f2 okunurken devre yerinde %80'e küçülür; kart satır satır kalemle; devre yaşar (elektronlar, kamera) | Bilmen gerekenler: • İdeal V kaynağı: V sabit, i yüke bağlı • İdeal i kaynağı: i sabit, V yüke bağlı • Akım kaynağı açık bırakılmaz • V sabitken i ∝ 1/R (doğrusal değil) | hum |

## v3 (kanal sahibinin 3. iş emri, 14.11.2026)
- i–R grafiği: gerilim kaynağı bölümünde eksenler R 0–3 kΩ, i 0–30 mA; nokta her an ampermetre değerinde (2 → 3 → 6 → 24 mA); '↑ ∞' dik ucun sağında, eksen etiketleri çizim alanı dışında; 'i ∝ 1/R — doğrusal değil' notu (2e-3). Akım kaynağı bölümünde R 0–4 kΩ, V 0–8 V; açık devrede nokta V = 2R doğrusunda köşeye gider, ötesi 'eksen dışı' oku + voltmetreyle aynı değer; '(2 mA dayatılırsa)', 'R → ∞' notları.
- f1 kaldırıldı (içeriği karta); bağımsız denetim düzeltmeleri: '→ yüke bağlı' yerine ': yüke bağlı' (ok yalnızca sonuç/limit), c2 '2 mA dayatılır: V = i·R → ∞' (ampermetre 0 iken 0·∞ okunmasın), 'CC' kısaltması yerine 'Sabit akımla şarj'.

## v4 (kanal sahibinin 4. iş emri + panel kararı A, 15–16.11.2026) — 87,5 sn
Ekran yazıları (bölüm 2d-5: işaret kelime yerine yok, kısaltma yok):
- h1 'Akım kaynağını / açık bırakırsan?' (2,6 sn)
- v1 'Gerilim sabit kalır / akım yüke bağlıdır (i = V/R)'
- v2 'R küçüldükçe akım büyür / sıfırda akım sonsuza gider'
- c1 'Akım sabit kalır / gerilim yüke bağlıdır (V = i·R)'
- c2 'Anahtar açılınca gerilim / sonsuza gider (V = 2 mA·R → ∞)' (ampermetre 0 iken 0·∞ okunmasın diye sabit 2 mA yazılır)
- g1 'Pil gerilim kaynağı gibidir / şarj cihazı akım kaynağı gibidir'; etiketler 'gerilim kaynağı gibi', 'akım kaynağı gibi', 'şarj cihazı'
- f2a 'Gerilim kaynağı kısa devre edilirse / akım sonsuza gider' (görüntü: R 1 kΩ → 0, ampermetre ∞, 'kısa devre')
- f2b 'Akım kaynağı açık bırakılırsa / gerilim sonsuza gider' (görüntü: anahtar açılır, voltmetre ∞, 'açık devre')
- Kart: 'Bilmen gerekenler' • İdeal gerilim kaynağında gerilim sabittir • İdeal akım kaynağında akım sabittir • Gerilim sabitken i ∝ 1/R (doğrusal değil)
- c3 kaldırıldı. Grafik notu '(i = 2 mA sabit tutulursa)'. R adımları 1,3 sn.
