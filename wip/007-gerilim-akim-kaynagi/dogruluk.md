# 007 — doğruluk

Okunan kaynak: B. Razavi, Basic Circuits, Lecture 2 (YouTube Hd0ZTXM572U), vidIQ transkripti (13.11.2026). Video açıklamasına atıf: "Kaynak: B. Razavi, Basic Circuits, Ders 2".

| İddia (ekranda) | Neden doğru | Kaynak | ✔ |
|---|---|---|---|
| İdeal gerilim kaynağı: V sabit, akımdan bağımsız | Tanım: "a two terminal device whose voltage does not depend on the current through it" | [11:16–12:06] | ✔ |
| i = V/R yüke bağlı; 6 V / 3, 2, 1 kΩ = 2, 3, 6 mA | Ohm yasası; Razavi i1 = v1/r1 hiperbol örneği | [14:02–14:21]; check() | ✔ |
| R → 0 ise i → ∞ (ideal) | "if r1 is very very small i1 is getting close to infinity … if this voltage source were ideal" | [14:36] | ✔ |
| Gerçek pilde V düşer | "the current doesn't go to infinity because the voltage provided by the battery drops" | [14:52]; ayrıca [12:22] | ✔ |
| 6 V / 0,25 kΩ = 24 mA | hesap; check() | — | ✔ |
| İdeal akım kaynağı: i sabit, gerilimden bağımsız; sembol daire içinde ok | "a two terminal device whose current is independent of the voltage across it"; sembol | [37:06–38:10] | ✔ |
| V = i·R yüke bağlı; 2 mA × 1, 2, 3 kΩ = 2, 4, 6 V; V(R) doğrusu eğim i | Razavi v1 = r1·i1 doğrusu | [41:14–41:46]; check() | ✔ |
| Seri devrede ampermetre her R'de 2,00 mA | Akım kaynağı akımını dayatır; seri kolda tek akım | [38:10], [44:12] | ✔ |
| Açık devre = R → ∞; V = i·R → ∞ | "open circuit is equivalent to an infinite resistance … this voltage has to be infinity, v = i1 × r" | [49:30–50:04] | ✔ |
| Açık devrede akım 0 (ampermetre 0,00 mA, elektronlar durur) | "the open circuit will win … I do not allow any current" | [49:47] | ✔ |
| Akım kaynağı asla açık bırakılmaz | "we never want to leave a current source open" | [50:35] | ✔ |
| Pil ≈ gerilim kaynağı (belli akım aralığında) | "for some range of currents we can consider it a relatively ideal voltage source" | [12:39] | ✔ |
| Araba aküsü ≈ gerilim kaynağı | Akü bir pil grubudur; aynı tanım (Razavi elektrikli araç örneğinde aküyü DC gerilim kaynağı olarak ele alır) | [32:28–32:46] | ✔ |
| Telefon şarjı ≈ akım kaynağı (sabit akımla şarj) | "we charge the battery by a constant current … current sources … approximate a charger" | [47:17], [48:20] | ✔ |
| Elektronlar − → +, geleneksel akım + → − | Akım yönü tanımı (kanal kuralı 2a-7) | Ders 1 | ✔ |
| Renk kodu kırmızı-siyah-kırmızı (20 × 100 = 2 kΩ) — direnç gövdesi yalnızca simge; değer etiketi R değişkeni | Ayarlı direnç; bantlar sabit, ekrandaki R etiketi esas | — | ✔ |

## v3 eklemeleri (15.11.2026)
| İddia (ekranda) | Neden doğru | Kaynak | ✔ |
|---|---|---|---|
| Grafik i = 6/R: R = 3 kΩ'da 2 mA, 1 kΩ'da 6 mA, 0,25 kΩ'da 24 mA; eksen 0–30 mA hepsini kapsar | check() kontrol noktaları (gpy konumları %6,7 / %20 / %80) | hesap | ✔ |
| i ∝ 1/R — doğrusal değil (V sabitken) | i = V/R hiperbol; Razavi i1 = v1/r1 eğrisi | [14:02–14:21] | ✔ |
| Açık devrede grafik: V = i·R doğrusu 2 mA dayatılırsa; R → ∞ ⇒ V → ∞ (eksen dışı) | "this voltage has to be infinity, v = i1 × r" | [49:30–50:04] | ✔ |
| 2 mA dayatılır (c2) | Akım kaynağı akımını dayatır; açık devre akıma izin vermez → ideal modelde çelişki | [38:10], [49:47] | ✔ |
| Sabit akımla şarj ≈ akım kaynağı | "we charge the battery by a constant current" | [47:17], [48:20] | ✔ |
| Kart • İdeal V kaynağı: V sabit, i yüke bağlı | tanım | [11:16–12:06], [14:02] | ✔ |
| Kart • İdeal i kaynağı: i sabit, V yüke bağlı | tanım | [37:06–38:10], [41:14] | ✔ |
| Kart • Akım kaynağı açık bırakılmaz | "we never want to leave a current source open" | [50:35] | ✔ |
| Kart • V sabitken i ∝ 1/R (doğrusal değil) | i = V/R | [14:02–14:21] | ✔ |

İlk yorum sorusu: "2 mA'lik ideal akım kaynağına 4 kΩ direnç bağlı. Direncin uçlarındaki gerilim kaç volt? Cevabını yaz 👇" → V = 2 mA × 4 kΩ = 8 V ✔
