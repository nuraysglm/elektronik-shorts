# 007 — Gerilim kaynağı ve akım kaynağı (Temel Devre Teorisi I, ders 2)

**Vurgulanan yanlış/nokta:** (1) "Akım kaynağı da pil gibi açık bırakılabilir" yanlışı: ideal akım kaynağı açık devrede (R → ∞) V = i·R → ∞ üretmek zorunda kalır; akım kaynağı asla açık bırakılmaz. (2) İkilisi: ideal gerilim kaynağı V'yi sabit tutar, akım yüke bağlıdır; R → 0 iken i = V/R → ∞ (gerçek pilde gerilim düşer).

Kaynak: B. Razavi, Basic Circuits, Ders 2 (YouTube Hd0ZTXM572U) transkripti; zaman damgaları dogruluk.md'de.
Seviye: üniversite 1. sınıf (bölüm 2b): ideal kaynak tanımları, I(R) ve V(R) grafikleri, limit davranışı.
Süre: 81,8 sn (≤ 90). Seslendirme/müzik yok; yalnızca olay efektleri (pop: R adımı, click: anahtar, thud: ∞ / model, hum: akım).

## Gerekli bilgi (videoda geçtiği yer)
- [x] İdeal gerilim kaynağı: iki uçlu; gerilimi içinden geçen akımdan bağımsız (v1: R 3 → 2 → 1 kΩ, voltmetre hep 6,00 V, ampermetre 2 → 3 → 6 mA, grafik i = 6/R hiperbolü)
- [x] i = V/R yüke bağlı; R → 0 ⇒ i → ∞ (ideal); gerçek pilde V düşer (v2: R → 0,25 kΩ, 24 mA, grafik taşar "→ ∞")
- [x] İdeal akım kaynağı: akımı uçlarındaki gerilimden bağımsız; sembol: daire içinde ok (c1: R 1 → 2 → 3 kΩ, ampermetre hep 2,00 mA, voltmetre 2 → 4 → 6 V, grafik V = 2R doğrusu)
- [x] Akım kaynağı açık bırakılırsa V → ∞; asla açık bırakılmaz (c2, c3: anahtar açılır, voltmetre → ∞, kaynak kırmızı uyarı)
- [x] Gerçek hayat: AA pil, araba aküsü ≈ gerilim kaynağı; telefon şarjı (sabit akımla) ≈ akım kaynağı (g1)
- [x] Kurallar en sonda (f1, f2)
- [x] Elektronlar − → + (yeşil), geleneksel akım oku + → − (kırmızı); semboller: gerilim kaynağı daire + / −, akım kaynağı daire + ok

## Sahneler (zamanlar sahne kodundan)
| # | Yazı (sn) | Animasyon (yazısız anlaşılmalı) | Etiket (sonra) | Efekt |
|---|---|---|---|---|
| h1 | 0–3,8 | 6 V ideal gerilim kaynağı, ampermetre, kapalı anahtar, 3 kΩ ayarlı direnç; elektronlar akar; arkada boş I(R) grafiği; alt satır "İdeal kaynak: ne sabit kalır?" | Akım kaynağını / açık bırakırsan? | hum |
| v1 | 10,5–17,3 | R 3 → 2 kΩ (bekle) → 1 kΩ; voltmetre 6,00 V sabit; ampermetre 2 → 3 → 6 mA; elektronlar hızlanır; grafik hiperbol üzerinde nokta | Gerilim kaynağı: V sabit / i = V/R → yüke bağlı | pop ×2 |
| v2 | 21,2–27,3 | R → 0,25 kΩ; ampermetre 24,0 mA; grafik üstten taşar "→ ∞" | R → 0 ise i → ∞ / gerçek pilde V düşer | pop |
| c1 | 35,0–41,8 | Kesme (aynı kadraj): kaynak 2 mA ideal akım kaynağı, R = 1 kΩ; R 1 → 2 → 3 kΩ; ampermetre 2,00 mA sabit; voltmetre 2 → 4 → 6 V; grafik V = 2R doğrusu | Akım kaynağı: i sabit / V = i·R → yüke bağlı | thud, pop ×2 |
| c2 | 46,8–51,7 | Anahtar açılır ("açık devre"); elektronlar durur, ampermetre 0; voltmetre hızla büyür → ∞; grafik sağ üstten taşar; kaynak kırmızı yanıp söner | Anahtar açık: R → ∞ / V = i·R → ∞ ! | click, thud |
| c3 | 52,2–56,5 | Aynı görüntü yaşar (kaynak kırmızı nabız) | Akım kaynağı asla / açık bırakılmaz | — |
| g1 | 60,7–66,9 | Kesme: AA pil, araba aküsü, şarj olan telefon kaidelerde sırayla; "≈ gerilim kaynağı", "≈ akım kaynağı" | Pil, akü ≈ gerilim kaynağı / Şarj devresi ≈ akım kaynağı | thud ×3 |
| f1 | 68,2–74,3 | Kesme: akım kaynağı devresi kapalı, 3 kΩ, 2 mA, 6 V; kamera yavaşça yaşar | Gerilim kaynağı → V sabit / Akım kaynağı → i sabit | hum |
| f2 | 74,6–81,8 | Aynı devre, döngüye uygun son kare | V kaynağı + R → 0: i → ∞ / i kaynağı + açık: V → ∞ | — |
