# İçerik paketi — Devre Teorisi I: Ders 1 - Bölüm 2/3

Hazırlayan: İçerik Ajanı (ICERIK.md), 19.11.2026. Sürüm 2 (bağımsız denetimden sonra düzeltildi; bkz. `## Denetim`).
Doğrulama: `icerik_dogrula.py` (çalıştırıldı, "TÜM KONTROLLER GEÇTİ"; özet bölüm 7'de).

## 1. Künye

- **Ders / bölüm:** Ders 1 - Bölüm 2/3.
- **Konu:** Akımın değeri ve yönü (referans oku), açık devre yalnızca i = 0'ı garanti eder, akımdan yüke (q = ∫ i dt, grafiğin altındaki alan), istenen akımı veren basit devre. **Başa eklenen parça:** "Uygulamada: datasheet'teki akımlar" (kanal sahibinin 19.11.2026 kararı).
- **Razavi transkripti:** Ders 1 [17:01–27:52] (kanal sahibinin özel Drive klasörü; depoya kopyalanmadı). "Uygulamada" parçasının Razavi'de karşılığı yoktur; dayanağı Bölüm 1'deki ortalama/anlık akım [14:11–16:54] ve bu bölümdeki q = ∫ i dt [19:48–21:02] + üretici datasheet'leri (bölüm 11).
- **Tahmini süre:** mevcut metin ~14,6 dk (1.953 kelime) + "Uygulamada". 17 dk sınırı için "Uygulamada" en çok **~540 kelime (~3:30)** olmalı **ve** bölüm 10'daki üç kısaltmanın üçü de yapılmalı (denetim Ö1).

## 2. Öğrenme hedefleri

Bu bölümün sonunda öğrenci:
1. Bir datasheet'te bir akım değerinin **sürekli (DC)** değer mi (diyotta: ortalama), yoksa **darbe (tepe)** değeri mi olduğunu ve hangi koşulda (süre, sıcaklık, montaj) verildiğini ayırt edebilir.
2. Darbeli çalışan bir devrenin ortalama akımını yükten (q = ∫ i dt) hesaplayıp bir pilin ömrünü bulabilir; tepe akımı ise darbe sınırıyla karşılaştırması gerektiğini bilir.
3. Her akımı bir referans okuyla yazar; eksi işaretin "yük okun tersine gidiyor" demek olduğunu açıklar.
4. Açık devrenin yalnızca akımın sıfır olduğunu garanti ettiğini, uçlarındaki gerilimin çevreden belirlendiğini bir örnekte (anahtar, buton) gösterebilir.
5. Bir akım grafiğinin altındaki alandan geçen yükü (eksen altını eksi sayarak) bulabilir; istenen basamaklı akımı anahtar + kaynak + dirençle kurabilir.

## 3. Ön bilgi

- Bölüm 1: yük (C), akım i = dq/dt, ortalama akım = Δq/Δt ve pencere seçimi; "ortalama, anlık değer değildir".
- Ohm yasası v = R × i (Razavi [10:43–11:05]).
- İntegral kavramı (alan olarak); türev–integral ilişkisi.
- Birim ön ekleri: m, µ, k; saat = 3600 s.

## 4. Kavramlar

| Kavram | Doğru tanım (öğrenci diliyle) | Birim / işaret kuralı | Geçerlilik sınırı |
|---|---|---|---|
| Referans yönü | Akımın yanına çizilen ok. Okun yönünde geçen artı yük artı sayılır. Ok yönünü biz seçeriz [17:51–18:07]. | i (A). Ok ters çizilirse aynı durumda işaret değişir. | Ok yoksa işaretli sayı anlamsızdır. Gerilimin +/− işareti Bölüm 3'te. |
| Geleneksel akım yönü | Akım yönü artı yükün hareket yönü olarak tanımlanır; metal telde hareket eden elektronlar (eksi) bunun tersine gider (Wikipedia "Electric current", Conventions — onaylı). | — | Devre teorisinde taşıyıcının ne olduğu hesabı değiştirmez; yalnızca işaret kuralı. |
| Açık devre | İki nokta arasında yükün geçebileceği yol yok. **Garanti ettiği tek şey: i = 0** [18:32–19:32]. | i = 0. Uçlar arasındaki gerilim çevredeki devreden çıkar. | İdeal açık devre. Gerçek açık anahtarda/girişte çok küçük bir sızıntı akımı olabilir; bu bölümde yalnızca "çok küçük" diye anılabilir. |
| İdeal anahtar | Kapalıyken tel (gerilimi 0), açıkken açık devre (akımı 0) [26:19–27:00]. | — | Gerçek anahtarın/MOSFET'in kapalıyken küçük bir direnci var (2N7002E: R_DS(on) en çok 2,5 Ω, V_GS = 10 V). İleride. |
| Akımdan yük | t = 0 ile t₁ arasında geçen yük q = ∫₀^t₁ i dt [20:38–21:02]. | C. mA × s = mC; mA × ms = µC; mA × h = mAh. | Yük "net"tir: eksen altındaki alan eksi sayılır (yük okun tersine). |
| Yük = alan | Akım grafiğinin altında kalan alan [23:08–23:31]. | Alanın birimi = (akım birimi) × (zaman birimi). | Dikdörtgen, üçgen gibi basit şekiller; eğri için integral. |
| **mAh bir yük birimidir** | 1 mAh = 1 mA × 3600 s = 3,6 C. Pil kapasitesi "pilin verebileceği toplam yük"tür. | 225 mAh = 810 C. | Gerçek kapasite akıma, sıcaklığa ve kesme gerilimine bağlıdır (Energizer el kitabı s. 2–4). Nominal değer bir koşulda ölçülmüştür. |
| Sürekli akım (datasheet) | Elemanın uzun süre taşıyabileceği **sabit (DC)** akım; çoğunlukla ısınmayla sınırlı ve sıcaklık/montaj koşuluna bağlı. Doğrultucu diyotta bu değer bir **ortalama** olarak verilir (I_F(AV)). MOSFET ve LED'de "ortalama" denmez, "sürekli (DC)" denir. | A, koşulla birlikte okunur. | Darbeli akımın ortalamasını MOSFET'in/LED'in DC değeriyle karşılaştırmak yanlış olabilir: dirençte ve MOSFET'te ısınma akımın karesiyle ilgilidir, ölçüsü "etkin değer"dir (RMS) — **ileride**, bu bölümde yalnızca adı. (Diyotta kayıp yaklaşık V_F × ortalama akım olduğu için diyot ortalama akımla anılır.) Bunlar **aşılmaması gereken** sınırlardır, çalışma noktası değil. |
| Darbe / tepe akımı (datasheet) | Çok kısa süre (µs–ms) dayanılabilen anlık akım. Süresi (tp) yazılır, bazen doluluk oranı ya da "tek darbe" (single) ifadesi de. | A, tp koşuluyla. | Süre belirtilmeden kullanılmaz; sürekli akım yerine geçmez. |

## 5. Uygulamada: datasheet'teki akımlar (zorunlu; Bölüm 2'nin başına, 3–4 dk)

### 5a. Ana fikir (tek cümle)
Bölüm 1'deki "uzun bir süreye yayılan değer" ile "tek bir anın değeri" ayrımı datasheet'te iki ayrı satır olarak karşımıza çıkar: **sürekli akım** (elemanın uzun süre dayanabildiği akım; çoğunlukla ısınmayla sınırlı, sıcaklığa bağlı; doğrultucu diyotta adı doğrudan "ortalama") ve **darbe (tepe) akımı** (yalnızca çok kısa bir süre için). Pilde ise **ortalama akım** doğrudan ömrü belirler. Not: darbeli akımda ısınmayı ortalama tek başına anlatmaz (etkin değer, ileride); videoda "ortalama" sözcüğü yalnızca diyot ve pil için kullanılsın.

### 5b. Datasheet karşılığı (gerçek parçalar, değerler sayfadan okundu)

| Parça | Sürekli (DC) — diyotta ortalama | Darbe / tepe | Oran | Ne işe yarar |
|---|---|---|---|---|
| **1N4007** doğrultucu diyot (Vishay, doc 88503, rev. 29-Apr-2020, s. 1, "Maximum ratings") | **I_F(AV) = 1,0 A** — "maximum average forward rectified current", 0,375" (9,5 mm) bacak boyu, T_A = 75 °C | **I_FSM = 30 A** — "8.3 ms single half sine-wave superimposed on rated load" (tek yarım sinüs, anma yüküne ek; 8,3 ms = 60 Hz'in yarım periyodu, Türkiye'de şebeke 50 Hz → 10 ms; videoda koşul olarak yazmak yeter) | 30 / 1 = 30 | Adı bile "ortalama" (AV = average). Diyot, adaptörde/doğrultucuda ortalama 1 A'e göre seçilir; devre ilk açıldığında oluşan kısa ani akım için I_FSM'ye bakılır. |
| **2N7002E** küçük sinyal N-kanal MOSFET (onsemi, 2N7002E/D Rev. 8, Ekim 2023, s. 1, "Maximum ratings") | **I_D = 260 mA** — sürekli, kararlı durum, T_A = 25 °C; **190 mA** T_A = 85 °C (FR4 kart, 1 inç² bakır; Not 1). Datasheet başlığındaki **310 mA** ise "t < 5 s, T_A = 25 °C" değeri (85 °C'de 220 mA): "üç soru"nun 2. sorusu için iyi örnek | **I_DM = 1,2 A** — darbeli, tp = 10 µs | 1,2 / 0,26 ≈ 4,6 | Elektronik bir anahtar (seste yalnızca bu kadar). Sürekli akım sıcaklık artınca düşer. Darbe değeri yalnızca 10 µs için. Not: I_DM'nin "tp = 10 µs" koşulu PDF metninde µ işareti düştüğü için "10 s" görünüyor; aynı belgede bütün µ'lar düşüyor (ör. "pulse width ≤ 300 s" = 300 µs), değer dolaylı doğrulandı. Görsel doğrulanmadı: ekrana yazmadan önce PDF s. 1'e bakılsın. |
| **TLHR540x** 5 mm kırmızı LED (Vishay, doc 83012, Rev. 2.7, 25-Jan-2024, s. 2, "Absolute maximum ratings") | **I_F = 30 mA** — DC, T_amb ≤ 65 °C | **I_FSM = 1 A** — tp ≤ 10 µs | 1 / 0,03 ≈ 33 | "Mutlak en büyük değerler" tablosundan: aşılmaması gereken sınır, çalışma noktası değil; tasarımda altında kalınır (datasheet'in kendisi ışık değerlerini 10 mA'de veriyor). 1 A yalnızca ≤ 10 µs'lik darbe. (Optik değerler I_F = 10 mA'de, V_F = 2 V tipik / 3 V en çok, I_F = 20 mA'de.) |
| **CR2032** lityum düğme pil (Panasonic datasheet, "As of February, 2026"; Energizer Lithium Coin Handbook, Form No. 12006-A) | Nominal kapasite **225 mAh** (Panasonic); "continuous drain" **0,2 mA** (Panasonic standart deşarj akımı). Energizer CR2032: 240 mAh, 15 kΩ yük (~190 µA), 2 V'a kadar (el kitabı s. 2) | Sayısal darbe sınırı Panasonic metninde yok ("high-rate pulse discharge" diye özellik). Energizer el kitabı s. 3: yüksek darbede pil gerilimindeki düşüş hesaba katılmalı; yeni 2032'nin iç direnci ~10 Ω (s. 4) | — | Pilin ömrünü **ortalama akım** belirler (kapasite = toplam yük). Tepe akım, iç direnç üzerinden gerilimi düşürür. |

Okuma kuralı (öğrenciye verilecek üç soru): **(1) Bu değer sürekli mi, darbe mi? (2) Hangi süre için? (3) Hangi sıcaklıkta, nasıl monte edilmiş?** Koşulu okunmayan değer, okunmamış sayılır.

### 5c. Tasarımcı hangi değere ne zaman bakar, hangi hata pahalıya patlar
- **Pil ömrü / toplam yük → ortalama akım.** Kapasite mAh ise bir yüktür; ömür = kapasite / ortalama akım. Bu, bu bölümün q = ∫ i dt fikrinin doğrudan uygulamasıdır.
- **Anlık zorlanma → tepe akım ve süresi.** Darbenin tepesi datasheet'teki darbe değerinin altında olmalı ve darbe süresi verilen tp'den uzun olmamalı.
- **Pahalı hata 1 (tepeyle ömür hesabı):** Sensörün 10 mA çektiğini görüp ömrü 225 mAh / 10 mA = 22,5 saat bulmak → gereksiz büyük pil, yanlış ürün kararı. Doğrusu ortalamayla: ~375 gün.
- **Pahalı hata 2 (küçük ortalamaya güvenmek):** Ortalama akım küçük diye kısa ama büyük darbeyi görmezden gelmek → diyot/LED/MOSFET darbe sınırını aşar ya da pil gerilimi darbe anında düşer ve devre sıfırlanır.
- **Pahalı hata 3 (koşulu okumamak):** 2N7002E'nin 260 mA'ini 85 °C'lik bir kutuda kullanmak (orada 190 mA), başlıktaki 310 mA'i sürekli sanmak (yalnızca 5 s'den kısa) ya da I_DM = 1,2 A'i sürekli akım sanmak.
- (Yalnızca Uzun Video Ajanı'na bilgi, videoya girmez: darbeli bir MOSFET akımının ortalaması DC sınırın altında olsa bile etkin değeri üstünde olabilir; ör. %50 doluluk, 360 mA darbe: ortalama 180 mA < 190 mA ama etkin değer ≈ 255 mA > 190 mA. Bu yüzden videoda "ortalamayı I_D ile karşılaştır" denmez.)
- Not: Bu üç madde "En sık yapılan hata" etiketi **almaz** (bölüm 6; bir videoda tek "En sık yapılan hata" var, o da açık devre). "Tasarımda pahalıya patlayan hata" gibi düz bir ifadeyle anlatılabilir.

### 5d. Mini tasarım örneği (tam hesaplı; özgün)
**Görev:** Bir sıcaklık sensörü düğümü her saniyede bir uyanıyor, **2 ms** boyunca **10 mA** çekiyor (ölçüm + kısa radyo), kalan **998 ms** boyunca **5 µA** uyku akımı çekiyor (uyku akımı bizim tasarım hedefimiz; varsayım). CR2032 (225 mAh) bu düğümü ne kadar çalıştırır?

1. Bir saniyede geçen yük (Bölüm 1'den: sabit akımda yük = akım × süre; "alan" sözcüğü burada kullanılmaz, Parça 4'te geriye bağlanır):
   - aktif: q = 10 mA × 2 ms = 20 µC (mA × ms = µC)
   - uyku: q = 5 µA × 998 ms = 4,99 µC (µA × ms = nC: 5 × 998 = 4990 nC = 4,99 µC)
   - toplam: q(1 s) = 20 + 4,99 = 24,99 µC
2. Ortalama akım: i_ort = q / T = 24,99 µC / 1 s = 24,99 µA ≈ 25 µA.
3. Ömür: 225 mAh / 0,025 mA = 9000 saat; 9000 / 24 = 375 gün ≈ 1 yıl.
   - Kulonla aynı sonuç: 225 mAh = 225 × 3,6 C = 810 C; 810 C / 25 µA = 32 400 000 s; 32 400 000 / 3600 = 9000 saat.
4. Kontroller:
   - Ortalama 25 µA, Panasonic'in verdiği standart deşarj akımı (0,2 mA) düzeyinin altında; bu yüzden 225 mAh varsayımı makul. (0,2 mA bir üst sınır değildir; kapasitenin ölçüm koşulu sayfada yazmıyor.)
   - Tepe 10 mA'de pil iç direncinde düşüm: 10 mA × 10 Ω = 0,1 V → pil gerilimi darbe anında yaklaşık 0,1 V düşer (Energizer el kitabı s. 4: yeni 2032 için ~10 Ω). Pil eskidikçe iç direnç artar, düşüm büyür: tasarımcı devrenin en düşük çalışma gerilimine bakar. **Videoya girmez** (iç direnç yeni kavram; ileride).
5. Yanlış yol: 225 mAh / 10 mA = 22,5 saat — doğru sonucun 400'de biri.
6. Tasarımcının kazancı: Uyku akımı ortalamanın %20'si (4,99 / 24,99). Uyku 50 µA olsaydı ortalama 20 + 49,9 = 69,9 µA, ömür ~134 gün olurdu (225 / 0,0699 = 3219 saat; 3219 / 24 ≈ 134). **Videoya girmez** (süre); yalnızca ilgi için.
7. Gerçekçilik notu (ekrana kısa): Nominal kapasite bir deney koşulunda ölçülür; gerçek ömür sıcaklık, darbe ve kesme gerilimiyle daha kısa olabilir (Energizer el kitabı s. 2–4). Tasarımcı pay bırakır.

**Öğrencinin çıkaracağı kural:** "Pil = toplam yük. Toplam yük = akım × süre (bu bölümde: grafiğin altındaki alan). Ömrü ortalama akım belirler; kısa tepeleri datasheet'in darbe satırı sınırlar."

## 6. En sık yapılan hata ve Doğrusu (bölümde tek)

- **En sık yapılan hata:** "Açık devrede akım sıfır olduğuna göre gerilim de sıfırdır." (Yanlış sonuç: açık anahtarın uçlarında 0 V.)
- **Doğrusu:** Açık devre yalnızca i = 0'ı garanti eder; uçlarındaki gerilimi çevresindeki devre belirler. 9 V + 3 kΩ + açık anahtar halkasında dirençten akım geçmez, direncin gerilimi 3 kΩ × 0 = 0 V, anahtarın uçlarında 9 V vardır.
- **Gerekçe (gerçekten yaygın mı?):** Razavi bu noktayı açıkça uyarır [19:08–19:32] ("an open circuit only guarantees a zero current but it knows nothing about the voltage…") ve kısa devre ikiliğiyle birlikte tekrarlar [38:40–38:47]. AGENT.md 2f-0 şartı sağlanıyor. Mevcut metindeki seçim doğru; değiştirilmesin.
- "Uygulamada" parçasındaki tepe/ortalama karışıklığı ikinci bir "En sık yapılan hata" kartı **olmaz**.

## 7. Sayısal örnekler (özgün; hepsi `icerik_dogrula.py` ile doğrulandı)

1. **mAh → kulon** (Uygulamada parçasında): 1 mAh = 1 mA × 3600 s = 1 × 10⁻³ A × 3600 s = 3,6 C. 225 mAh = 225 × 3,6 = 810 C.
2. **Mini tasarım (5d):** q(1 s) = 10 mA × 2 ms + 5 µA × 998 ms = 20 + 4,99 = 24,99 µC → i_ort ≈ 25 µA → 225 mAh / 0,025 mA = 9000 saat = 375 gün. Sayısal integral (10⁶ adım) aynı sonucu veriyor (24,9900 µC). Yanlış yol 22,5 saat; oran 400.
3. **Buton + çekme direnci (açık devrenin uygulaması):** Mikrodenetleyici girişi, 10 kΩ'luk direnç üzerinden 3,3 V'a bağlı; buton girişle toprak arasında. Buton açık (açık devre): direnç akımı 0 (ideal giriş) → direncin gerilimi 10 kΩ × 0 = 0 V → giriş 3,3 V, butonun uçları arasında 3,3 V. Buton kapalı: i = 3,3 V / 10 kΩ = 0,33 mA, giriş 0 V. Bu, metindeki 9 V'luk açık anahtar örneğinin her elektronik kartta karşılaştığımız hâlidir. (Gerçek giriş çok küçük akım sızdırır; örneğin 1 µA olsaydı düşüm 10 kΩ × 1 µA = 10 mV, giriş 3,29 V — "neredeyse 3,3 V".)

Ek (oranlar; yalnızca paket içi bilgi, **ekrana konmaz** — konursa adım adım gösterilmeli): 1N4007 30 A / 1 A = 30; 2N7002E 1,2 A / 0,26 A ≈ 4,6; TLHR540x 1 A / 0,03 A ≈ 33; 2N7002E 85 °C'de 1 − 190/260 = 1 − 0,73 = 0,27 → %27 düşüş.

`icerik_dogrula.py` çıktısı: tüm assert'ler geçti (19.11.2026).

## 8. Yorum sorusu (cevabıyla)

Mevcut metindeki soru (5 mA 2 s, −3 mA 1 s → net yük?) iyi; cevap: 5 mA × 2 s + (−3 mA) × 1 s = 10 − 3 = **7 mC** (`icerik_dogrula.py`). Korunabilir.

"Uygulamada"ya bağlı alternatif (Uzun Video Ajanı seçer): *"Bir LED her 1 saniyede 4 ms boyunca 20 mA çekiyor, geri kalanda hiç çekmiyor. Ortalama akımı kaç mikroamper? 225 mAh'lik bir pil bu LED'i yaklaşık kaç gün yakıp söndürür?"* Cevap: q = 20 mA × 4 ms = 80 µC → i_ort = 80 µA; 225 mAh / 0,08 mA = 2812,5 saat ≈ 117 gün. (Not: 20 mA, TLHR540x'in 30 mA sürekli sınırının da altında.) (`icerik_dogrula.py`'de doğrulandı.)

## 9. Kapsam dışı / sonraya bırakılan

- **Etkin değer (RMS)** ve ısınmanın akımın karesiyle ilişkisi: yalnızca "ileride" diye adı geçebilir (MOSFET sürekli akımının ısıl sınır olduğunu söylerken). Hesap yok.
- I²t (sigorta) değeri, termal direnç (°C/W), derating eğrisinin kendisi: anılmaz (yalnızca "sıcaklık artınca sürekli akım düşer" cümlesi).
- Yarım sinüs darbenin integrali (I_FSM'nin taşıdığı yük): anılmaz.
- Pilin iç direnci ve gerilim düşümü: yalnızca tek cümle ("tepe akım pil gerilimini anlık düşürür"); Thevenin modeli ileride.
- KCL: Parça 6'da "bataryadan çekilen akım kapalı kolun akımıdır" gerekçesi yalnızca açık devre ilkesiyle verilsin (mevcut metin böyle; doğru).
- Kısa devre, gerilim tanımı: Bölüm 3.

## 10. Uzun Video Ajanı'na notlar

- **Yer:** "Uygulamada" parçası kanca + intro kartından sonra, "Birinci bölümde akımı…" geçişinin hemen ardından **yeni Parça 2** olarak (mevcut parçalar birer kayar). Geçiş cümlesi önerisi: "Konuya girmeden önce, birinci bölümdeki ortalama ve anlık akımın gerçek bir devre tasarımında nereye karşılık geldiğine bakalım."
- **Süre (denetim Ö1, gerçek kelime sayımıyla):** 17 dk sınırı için "Uygulamada" en çok **~540 kelime (~3:30, 2,6 kelime/sn)** ve aşağıdaki üç kısaltmanın **üçü de** yapılmalı. (Kısaltmasız kalan pay yalnızca ~374 kelime ≈ 2:24.) Önerilen akış: (1) iki satır fikri, 1N4007 örneğiyle (~40 sn); (2) "üç soru" kuralı; 2N7002E ve LED **yalnızca ekrandaki tabloda**, seste tek cümle ("elektronik bir anahtarda ve bir LED'de de aynı iki satırı görürsün; sınırlar aşılmaması gereken değerlerdir") (~35 sn); (3) mini tasarım, mAh = yük, 3 adım (~90 sn); (4) pahalı hata (tepeyle ömür hesabı: 22,5 saat ↔ 375 gün) + bu bölüme köprü: "pilin miliamper saati de bir yük; bu bölümde yükü akım grafiğinden nasıl bulduğumuzu göreceğiz" (~30 sn). İç direnç düşümü ve 50 µA varyantı **videoya girmez**.
- **Düzey (denetim Ö2):** Parça 2'de yeni kavram sayısı az tutulsun: tek yeni fikir "datasheet'te iki tür akım satırı + koşul", tek yeni birim "mAh = yük". Yük hesabı Bölüm 1'deki "sabit akımda yük = akım × süre" ile yapılır; "alan" sözcüğü Parça 4'te geriye bağlanır ("Hatırla: pilin yükünü hesaplarken çizdiğimiz o dar dikdörtgenlerin alanıydı"). MOSFET/kondansatör/röle jargonu yok.
- **Kısaltmalar (17 dk için; kelime sayıları metin.md'den):** Parça 5 "Bunu integralle de kontrol edelim" paragrafı (68 kelime); Parça 5 son paragraf, q(t) grafiği (76 kelime); Parça 6 "tek bir doğru cevabı yok" alternatif çözümü (46 kelime). Toplam ~190 kelime ≈ 73 sn. Ekrandaki karşılık gelen satırlar da çıkarılmalı ve `dogrula.py` güncellenmeli. Karar Uzun Video Ajanı'nın / kanal sahibinin.
- **Seslendirme:** "I_F(AV)", "I_FSM", "I_DM" ekranda yazılır ama **seste harf harf okunmaz**; seste "ortalama ileri akım", "ani darbe akımı", "darbeli akım" denir. Parça numaraları seste okunmaz (yapay ses riski): seste "çok kullanılan bir doğrultucu diyot", "elektronik bir anahtar", "bir LED", "düğme pil"; ekranda tam parça numarası. "mAh" seste "miliamper saat".
- **Ekran:** Datasheet tablosu kopyalanmaz (telif); tahtaya kendi iki sütunlu tablomuz çizilir: "sürekli" | "kısa darbe", satırlar parça adı, her hücrede değer + kısa koşul ("T_A = 75 °C", "8,3 ms"). Kaynak satırı küçük gri, ekranda görünen **her** parça için: "Vishay 1N4001–1N4007 datasheet (2020)", "onsemi 2N7002E datasheet (2023)", "Vishay TLHR540x datasheet (2024)", "Panasonic CR2032 datasheet (2026)". Mini tasarımda akım grafiği (10 mA, 2 ms dar darbe; 5 µA çok ince taban) **ölçeksiz** çizilecekse "ölçekli değil" notu yazılsın (2e-1).
- **Sayılar:** her ara adım ekranda ve seste (UZUN.md 0, AGENT.md 2b-7): özellikle "5 µA × 998 ms = 4990 nC = 4,99 µC" adımı atlanmasın; istenirse uyku süresi "yaklaşık 1 s" alınıp 5 µC denebilir ama o zaman ekranda "≈" ve "998 ms ≈ 1 s" yazılmalı.
- **İfade dikkati:** "Isınmayı ortalama akım belirler" denmesin (genel olarak doğru değil; RMS ileride). Doğru ifade: "sürekli akım değeri çoğunlukla ısınmayla sınırlıdır ve sıcaklığa bağlıdır". "Ortalama" sözcüğü yalnızca diyot (I_F(AV)) ve pil için; MOSFET ve LED için "sürekli". Datasheet sınırları "en çok bu kadar", "aşılmaması gereken" diye anılır; "bu akımla sür" denmez.
- **Telif notu (denetçiden, bilgi):** Mevcut Parça 6 (istenen akımı veren devre) Razavi'nin "quiz of the day" sorusunun [23:46–27:43] iki basamaklı, iki kollu genişletilmiş hâlidir; sayılar ve yapı farklı ama fikir aynı. UZUN.md 0a'ya göre kanal sahibi metin onayında bilsin.
- `inceleme.md`: mevcut metin için ayrıntılı bulgular.

## 11. Kaynaklar

- B. Razavi, Basic Circuit Theory, Ders 1 (UCLA), YouTube `U_4q0sfChOk` [17:01–27:52]; transkript kanal sahibinin özel Drive klasörü (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`), 19.11.2026 okundu.
- Wikipedia, "Electric current" (onaylı; Conventions) — mevcut `dogruluk.md`'de.
- Vishay General Semiconductor, *1N4001 thru 1N4007 General Purpose Plastic Rectifier*, Document Number 88503, Revision 29-Apr-2020, s. 1–2. https://www.vishay.com/docs/88503/1n4001.pdf (19.11.2026 okundu).
- onsemi, *2N7002E Small Signal MOSFET, 60 V, 310 mA, Single, N-Channel, SOT-23*, 2N7002E/D Rev. 8, October 2023, s. 1–2. https://www.onsemi.com/pdf/datasheet/2n7002e-d.pdf (19.11.2026 okundu).
- Vishay Semiconductors, *TLHR540., TLHY540. High Efficiency LED, Ø 5 mm Tinted Diffused Package*, Document Number 83012, Rev. 2.7, 25-Jan-2024, s. 2. https://wwwlegacy.vishay.com/docs/83012/tlhr540x_tlhy540x.pdf (19.11.2026 okundu).
- Panasonic Energy, *CR2032 Datasheet*, "As of February, 2026". https://energy.panasonic.com/dam/master/pdf/en/datasheet/lithium/CR2032_Datasheet_EN.pdf (19.11.2026 okundu).
- Energizer, *Lithium Coin Handbook and Application Manual (Li/MnO2)*, Form No. 12006-A, s. 1–5. https://data.energizer.com/pdfs/lithiumcoin_appman.pdf (19.11.2026 okundu). (Energizer CR2032 datasheet'i https://data.energizer.com/pdfs/cr2032.pdf bu çalışmada açılamadı; değerleri kullanılmadı.)

## Kaynakta düzeltme

Razavi transkriptinde [17:01–27:52] teknik bir hata bulunmadı. Datasheet'ler arasında çelişki yok; yalnızca **farklı üreticilerin CR2032 kapasiteleri farklı** (Panasonic 225 mAh, Energizer 240 mAh, farklı koşullarda): bu bir hata değil, "kapasite üreticiye ve ölçüm koşuluna bağlıdır" notu için kullanılabilir. Panelde ayrı kaynak onayı açılmadı.

## Denetim

Bağımsız denetçi (Agent; doktora düzeyi elektronik mühendisi rolü, paketi görmemiş), 19.11.2026. Beş kaynağın beşini de açtı, Razavi transkriptini okudu, bütün sayıları Python ile ayrıca hesapladı.

- **Sayılar:** hepsi doğru (1 mAh = 3,6 C; 810 C; 20 + 4,99 = 24,99 µC; 9000 saat = 375 gün; 22,5 saat, oran 400; %20; 69,9 µA → 134 gün; 0,1 V; oranlar 30 / 4,6 / 33; %27; 80 µA → 117 gün; 0,33 mA; 10 mV; 7 mC).
- **Datasheet değerleri:** hepsi kaynakla örtüşüyor. 2N7002E I_DM'nin tp = 10 µs koşulu dolaylı doğrulandı (PDF metninde µ işaretleri düşüyor); görsel doğrulama önerildi (bölüm 5b notu). 1N4007 I_FSM için "tekrarsız" sözcüğü sayfada yok → datasheet'in kendi ifadesi ("single half sine-wave") yazıldı.
- **Kritik 1 bulgu (düzeltildi):** "sürekli = ortalama" eşlemesi MOSFET ve LED için yanıltıcıydı ve 5a'daki "ısınma" ifadesi bölüm 10 ile çelişiyordu → 4. kavram tablosu, 5a, 5b başlığı ve notları yeniden yazıldı; "ortalama" yalnızca diyot ve pil için; RMS uyarısı yalnızca Uzun Video Ajanı'na bilgi (örnek: %50 doluluk, 360 mA → ortalama 180 mA ama etkin ≈ 255 mA).
- **Önemli 5 bulgu (düzeltildi):** (Ö1) süre bütçesi: "Uygulamada" ≤ ~540 kelime ve üç kısaltmanın üçü de (gerçek kelime sayıları yazıldı); (Ö2) düzey: tek yeni fikir + tek yeni birim, iç direnç ve 50 µA videodan çıkarıldı, "alan" Parça 4'e bırakıldı, jargon azaltıldı; (Ö3) "mutlak en büyük değer çalışma noktası değildir" uyarısı eklendi; (Ö4) 2N7002E başlığındaki 310 mA (t < 5 s) açıklandı; (Ö5) `inceleme.md`'deki "de te" bulgusuna "Genişliği, de te." cümlesi ve diğer kullanımlar eklendi.
- **Küçük bulgular (düzeltildi):** 0,2 mA'in üst sınır gibi okunması; "3,0 → 2,9 V" yerine "0,1 V düşer"; 1N4007 sızıntı örneği kavram tablosundan çıkarıldı; darbe tanımı daraltıldı; 8,3 ms = 60 Hz notu; oranlar ekrana konmuyor; kaynak satırı her parça için; script'e asıl yorum sorusu (7 mC) eklendi, künye/sürüm tutarlılığı.
- **Bilgi:** Mevcut Parça 6 Razavi'nin sınıf sorusunun genişletilmiş hâli (bölüm 10 telif notu).
- Telif: datasheet tablosu/metni kopyalanmamış; "Uygulamada"da Razavi örneği yok.
