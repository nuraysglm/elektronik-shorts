# Doğruluk kaydı — uzun/ornek-01 (düğüm gerilimleri yöntemi, final tipi soru)

Tarih: 16.11.2026. Aşama 1 (yalnızca metin). Görüntü ve ses üretilmedi.

## 1. Okunan kaynaklar (onaylı, `kaynaklar.md`)

- B. Razavi, Basic Circuits, **Ders 5** (videoId `Ron0vdYaBAE`) — transkript vidIQ `vidiq_video_transcript`, `language: en` ile alındı (16.11.2026).
- B. Razavi, Basic Circuits, **Ders 6** (videoId `JEw5iCdhVFw`) — aynı yolla alındı (16.11.2026).

Başka kaynak kullanılmadı. Kaynaklar yalnızca yöntem ve kavram için kullanıldı.

## 2. Özgünlük

Soru, devre ve sayılar bu çalışma için tasarlandı. Razavi'nin Ders 5–6'daki örnekleri: (Ders 6 [11:18]) bir akım kaynağı ve üç direnç; ([18:44]) üç akım kaynağı ve dört direnç; ([25:50]) bağımlı akım kaynaklı devre; ([37:49]) dirençler arasında yüzen gerilim kaynağı (süper düğüm). Hepsi sembolik (sayısız) çözülür. Bu sorudaki yapı (referansa bağlı 10 V gerilim kaynağı, dirençle seri 4 mA akım kaynağı, beş direnç, sayısal çözüm) bunlardan hiçbirinin kopyası veya sayıları değiştirilmiş uyarlaması değildir. Akım kaynağına seri direnç içeren bir örnek Ders 5–6 transkriptlerinde yoktur.

## 3. Soru

Alt hat referans (0 V). Gerilim kaynağı 10 V (alt hat ile A arası, artı uç A'da). R₁ = 1 kΩ (A–1), R₂ = 2 kΩ (1–alt hat), R₃ = 1 kΩ (1–2), R₄ = 1 kΩ (2–alt hat). Akım kaynağı 4 mA (alt hattan 3 noktasına doğru), R₅ = 3 kΩ (3–2), yani akım kaynağıyla seri. İstenen V₁, V₂.

Birimler: V, kΩ, mA (1 V = 1 kΩ × 1 mA).

Düğüm denklemleri:
- 1. düğüm (çıkan akımların toplamı sıfır): (V₁ − 10 V)/(1 kΩ) + V₁/(2 kΩ) + (V₁ − V₂)/(1 kΩ) = 0; 2 kΩ ile çarpılınca 5V₁ − 2V₂ = 20 V.
- 2. düğüm (dirençlerle çıkan = kaynaktan giren): (V₂ − V₁)/(1 kΩ) + V₂/(1 kΩ) = 4 mA; 1 kΩ ile çarpılınca −V₁ + 2V₂ = 4 V.
- Toplam: 4V₁ = 24 V; V₁ = 6 V; 2V₂ = 10 V; V₂ = 5 V.

## 4. Hesap çıktısı (`python3 dogrula.py`, kesirli tam aritmetik)

```
Yontem 1 (videodaki iki denklem): V1 = 6 V, V2 = 5 V
  sadelesmis: 5*V1-2*V2 = 20  ; -V1+2*V2 = 4
Yontem 2 (tam MNA, 5 bilinmeyen): VA,V1,V2,V3,Ivs = 10 6 5 17 4
Kol akimlari (mA): R1 (A->1) = 4  R2 (1->alt) = 3  R3 (1->2) = 1  R4 (2->alt) = 5  R5 = 4
KCL dugum 1 (giren-cikan): 0
KCL dugum 2: 0
KCL dugum A: 0
KCL alt hat (referans): 0
Akim kaynaginin uclarindaki gerilim V3 = 17 V ( = V2 + Is*R5 = 17 )
Guc (mW): gerilim kaynagi = 40  akim kaynagi = 68  toplam verilen = 108
Guc (mW): R1..R5 = 16 18 1 25 48  toplam harcanan = 108
R5 taramasi (tam MNA): 
  R5 = 0.001 k ->  V1 = 6  V2 = 5  V3 = 1251/250
  R5 = 1.0 k ->  V1 = 6  V2 = 5  V3 = 9
  R5 = 3.0 k ->  V1 = 6  V2 = 5  V3 = 17
  R5 = 300.0 k ->  V1 = 6  V2 = 5  V3 = 1205
  R5 = 1000000.0 k ->  V1 = 6  V2 = 5  V3 = 4000005
YANLIS denklem (V2/3k eklenirse): V1 = 164/29 = 5.655172413793103  V2 = 120/29 = 4.137931034482759
TUM KONTROLLER GECTI
```

Yapılan kontroller: (1) videodaki iki denklemin çözümü; (2) bağımsız yöntem: R₅ ve 3 noktası dahil beş bilinmeyenli tam düğüm sistemi (VA, V₁, V₂, V₃ ve gerilim kaynağının akımı) — aynı sonuç; (3) A, 1, 2 düğümlerinde ve referansta KCL = 0; (4) güç dengesi: kaynakların verdiği 108 mW = dirençlerin harcadığı 108 mW; (5) R₅ 0,001 kΩ – 1 000 000 kΩ arasında değiştirildiğinde V₁ ve V₂ değişmiyor, yalnızca V₃ değişiyor; (6) yanlış terim (V₂/(3 kΩ)) eklenirse sonuç V₁ ≈ 5,66 V, V₂ ≈ 4,14 V olur (yanlış).

## 5. İddialar ve dayanakları

| # | Metindeki iddia | Dayanak |
|---|---|---|
| 1 | Önce referans düğümü seçilir; referans sıfır volt kabul edilir | Ders 5 [42:02–43:27]; Ders 6 [3:19–4:08] |
| 2 | Referans olarak alt hat seçildi | Ders 6 [12:21–12:37] (referansı sayfanın altında seçmek görsel olarak yardımcı; zorunlu değil) |
| 3 | Kalan düğümlere gerilim adı verilir (V₁, V₂); bunlar referansa göre ölçülür | Ders 5 [43:27–45:50]; Ders 6 [4:28–5:16] |
| 4 | Gerilim kaynağının artı ucu 10 V'tur, bilinmeyen değildir | Ders 5 [21:36–21:53] (gerilim kaynağı kendi gerilimini dayatır) + düğüm geriliminin tanımı (Ders 6 [4:59–5:16]): kaynak referans ile A arasında olduğundan VA = 10 V. Razavi bu özel durumu (referansa bağlı kaynak) Ders 5–6'da ayrıca işlemez; Ders 6 [50:05–50:38]'deki "kaynak üzerinden KVL" adımının bir ucu referans olan hâlidir. Sayısal doğrulama: bölüm 4, yöntem 2 (VA = 10). |
| 5 | Dirençten geçen akım: (bir uçtaki gerilim − öbür uçtaki gerilim) / direnç; okun yönünde | Ders 6 [6:54–8:17] |
| 6 | 1. düğümden çıkan akımların toplamı sıfırdır | Ders 5 [3:02–3:17] (KCL); Ders 6 [9:06–9:40] (referans dışındaki her düğümde KCL). Denklem ve sadeleştirme: bölüm 3–4 |
| 7 | 5V₁ − 2V₂ = 20 V | Hesap çıktısı ("sadelesmis" satırı: 20) |
| 8 | Akım kaynağı kendi akımını dayatır; o kolun akımı bellidir, denklem yazılmaz | Ders 6 [15:07–15:22], [21:55–22:13]; Ders 5 [21:36–21:53] |
| 9 | Seri kolda akım her yerde aynıdır | Ders 5 [15:15–15:33] (seri = aynı akım) |
| 10 | Akım kaynağına seri direnç düğüm denklemine girmez; direnç 3 kΩ da 300 kΩ da olsa düğüme giren akım 4 mA'dır | **Çıkarım:** 8 ve 9'dan. Razavi Ders 5–6'da bu cümle açıkça geçmez. Sayısal doğrulama: bölüm 4, R₅ taraması (R₅ = 300 kΩ dahil, V₁ = 6, V₂ = 5 değişmiyor). İdeal akım kaynağı için geçerlidir (soru ideal kaynak içerir). |
| 11 | "Bu, sık yapılan bir hatadır", "Birçok öğrenci … terim yazar" | Razavi transkriptlerinde yok. Dayanak yalnızca kanal talimatı (`UZUN.md` bölüm 2: bilinen yanlış örnekleri arasında "akım kaynağı içeren dalda direnci denkleme yanlış katmak"). **Onaylı ders kaynağıyla doğrulanmamış bir sıklık iddiasıdır**; kanal sahibi isterse "Dikkat edilmesi gereken bir tuzak" biçiminde yumuşatılabilir. |
| 12 | Doğru denklem: (V₂ − V₁)/(1 kΩ) + V₂/(1 kΩ) = 4 mA; giren = çıkan biçimi | Ders 6 [15:56–16:28] (giren akımlar = çıkan akımlar); hesap: bölüm 3–4 |
| 13 | −V₁ + 2V₂ = 4 V; toplam 4V₁ = 24 V; V₁ = 6 V; 2V₂ = 10 V; V₂ = 5 V | Hesap çıktısı |
| 14 | Kontrol: gerilim kaynağından 4 mA; R₂'den 3 mA; R₃'ten 1 mA; akım kaynağından 4 mA; R₄'ten 5 mA; 5 mA × 1 kΩ = 5 V | Hesap çıktısı ("Kol akimlari" ve KCL satırları) |
| 15 | Akım kaynağının uçlarındaki gerilim 5 V + 12 V = 17 V; R₅'in tek etkisi budur | Hesap çıktısı (V₃ = 17 V; R₅ taramasında yalnızca V₃ değişiyor). "Tek etki" düğüm gerilimleri ve kol akımları açısındandır; R₅'te harcanan güç (48 mW) ve akım kaynağının verdiği güç (68 mW) de R₅'e bağlıdır — metinde güçten söz edilmez. |
| 16 | "Bu tuzağa düşen, doğru yöntemle yanlış cevabı bulur" | Hesap çıktısı (yanlış denklemle V₁ ≈ 5,66 V, V₂ ≈ 4,14 V) |

## 6. Gösterim kontrolü (AGENT.md 2d)

- Çarpma işareti yalnızca "×" (kart ve sahne planı); "·" kullanılmadı. Her denklem ayrı satırda. Oklar eşittir yerine kullanılmadı.
- Birimler: V, kΩ, mA; denklemlerde birimler yazılı. Büyük harf V (doğru akım değerleri), baştan sona aynı.
- Ekran yazılarında kısaltma yok ("gerilim kaynağı", "akım kaynağı", "referans düğümü" tam yazılır).
- Seslendirme metninde rakam ve simge yok (otomatik kontrol: rakam, =, +, /, parantez bulunmadı).

## 7. Bağımsız denetim

**Yapılamadı.** Görev tanımındaki ayrı alt ajan (Agent aracı) bu oturumda mevcut değildi. Yerine yalnızca yazarın kendi ikinci okuması yapıldı (bağımsız denetim sayılmaz). Bu okumada yapılan düzeltmeler:
- "beş V bir eksi iki V iki" biçimi sesli okunuşta "V bir" ile "iki V" karışabileceği için "beş çarpı V bir, eksi iki çarpı V iki" yapıldı.
- Shorts bölümü tek başına anlaşılsın diye V bir'in ne olduğu ("gerilimi V bir olan komşu düğüm") eklendi.
- "Dirençlerden çıkan akımlar" ifadesi "düğümden dirençlerle çıkan akımlar" yapıldı (akımın nereden çıktığı belirsizdi).
- "En sık yapılan hatalardan biri" iddiası "sık yapılan bir hata"ya indirildi (bkz. iddia 11).
- İkinci bir yanlış ("akım yönü korkusu") metinden çıkarıldı; video tek yanlışa odaklanır.

Kanal sahibine/genel müdüre açık kalan noktalar: (a) bağımsız denetim yapılmalı; (b) iddia 11; (c) yapay sesin "V bir", "V iki", "kiloohm" sözcüklerini nasıl okuduğu ancak ses üretilince görülebilir — bu aşamada denenmedi.
