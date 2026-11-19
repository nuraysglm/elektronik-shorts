# Doğruluk kaydı — Devre Teorisi I: Ders 1 - Bölüm 2/3

Tarih: 19.11.2026. Aşama: metin **sürüm 3** (`inceleme.md` uygulandı; bölüm 7–8). Sürüm 2 kaydı aşağıda korunuyor; parça numaraları sürüm 3'te birer kaydı (eski 2–7 → 3–8). Ses ve görüntü yok.

> **Sürüm 3 notu:** Bölüm 2–4 sürüm 2'nin kaydıdır. Sürüm 3'te çıkarılanlar: #8 (tek başına pil; yerine buton örneği #25), #9 (kopuk bağlantı), #14 (q(t) eğimi), bölüm 3'teki eski P5 integral kontrolü (∫₀² 3t dt) ve eski P6 alternatif çözüm (4 V / 2 kΩ). Bölüm 2–4'teki "Parça N" numaraları sürüm 2'ye göredir (sürüm 3'te +1). Güncel liste bölüm 7–9.

## 1. Kaynaklar (onaylı, `kaynaklar.md`)
- B. Razavi, Basic Circuit Theory, **Ders 1** (videoId `U_4q0sfChOk`) [17:01–27:52]. Transkript kanal sahibinin özel Drive klasöründen (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`) okundu; depoya konmadı. Aşağıda yalnızca zaman damgası ve kısa özet var.
- Wikipedia, "Electric current" (onaylı, 08.11.2026), bölüm "Conventions": geleneksel akım yönü artı yükün akış yönü olarak tanımlanır; metal telde yük taşıyıcıları elektronlardır ve geleneksel akımın tersine akarlar (19.11.2026'da okundu).

## 2. İddia → dayanak

| # | Metindeki iddia | Dayanak |
|---|---|---|
| 1 | Her akımın bir değeri ve bir yönü vardır; yön okla gösterilir; ok yönünü biz seçeriz | [17:12–18:07] ("each current has a value and a direction", "you could put the arrow the other way, it's up to you") |
| 2 | Okun yönünde geçen artı yük artı, tersine geçen eksi sayılır; ok ters çevrilince işaret değişir (3 mA / −3 mA aynı durum) | #1'den ve Bölüm 1 tanımı i = dq/dt [16:38]; hesap `dogrula.py` |
| 3 | Metal telde hareket eden elektronlardır, yükleri eksidir; akımın yönü artı yükün yönü olarak tanımlanır, elektron hareketine terstir | Wikipedia "Electric current", Conventions; elektron yükü negatif [12:15] |
| 4 | Bölüm 1 son örneğindeki −2 mA ters yönde geçiş demekti | Bölüm 1 `dogruluk.md` #13, i = 6 − 2t |
| 5 | Açık devre = iki ucu arasında yük için yol yok → akım sıfır (garanti) | [18:25–19:08] |
| 6 | **En sık yapılan hata:** "akım sıfır ⇒ gerilim sıfır". Doğrusu: açık devre yalnızca i = 0'ı garanti eder, uçlardaki gerilimi çevresindeki devre belirler | Razavi'nin açık uyarısı [19:08–19:32] ("an open circuit only guarantees a zero current but it knows nothing about the voltage… given by the circuitry surrounding") → "kaynağın kendisi uyarıyor" şartı (UZUN.md 2) sağlanıyor |
| 7 | 9 V, 3 kΩ, anahtar halkası: kapalı ideal anahtar tel gibi → i = 9 V / 3 kΩ = 3 mA; açıkken i = 0, direnç gerilimi 3 kΩ × 0 = 0 V → anahtar uçlarında 9 V | Ohm yasası [10:43–10:59]; kapalı anahtar = iletken, açık = iletmiyor [26:19–27:00]; bağımsız kontrol: KVL (`dogrula.py`; KVL videoda adı geçmeden kullanılmaz, yalnızca doğrulama) |
| 8 | Tek başına duran pilin uçları açık devredir: akım yok, uçlar arasında gerilim var | #6 ile aynı ilke; ideal pilin gerilimi bağlanan şeyden bağımsız [42:54–43:19] |
| 9 | Kopuk bağlantıdan akım geçmez ama iki ucu arasında yine bir gerilim olabilir | #6'nın uygulaması ("olabilir"; her durumda sıfırdan farklı olduğu iddia edilmiyor) |
| 10 | Akımdan yüke: q = ∫₀^t₁ i dt; yük = akım grafiğinin altındaki alan; ince şerit dq = i dt | [19:48–21:02], [23:08–23:31] |
| 11 | Eksen altındaki alan eksi yük (okun tersine geçiş) | #2 ve #10'un birleşimi; `dogrula.py` sayısal integral |
| 12 | Türev ve integral birbirinin tersi (Bölüm 1 örneği: ∫₀³ 4t dt = 18 mC = q(3)) | [21:02] ("we can go back and forth"); `dogrula.py` |
| 13 | Doğrusal artan akımda sürenin yarısında yükün dörtte biri geçer | (½·(T/2)·(k T/2)) / (½·T·kT) = 1/4; `dogrula.py` genel kontrol |
| 14 | q(t) grafiğinin eğimi akımdır (2–5 ms: 18 µC / 3 ms = 6 mA) | Bölüm 1 #15 (türevin geometrik anlamı) |
| 15 | İstenen akım dalga biçimini anahtar, batarya ve dirençle kurmak; anahtar kapanınca Ohm yasası i = V/R | Konu: [23:39–27:43]. Örnek özgün (bkz. bölüm 4) |
| 16 | Açık koldan akım geçmediği için bataryadan çekilen akım kapalı kolun akımıdır | #5 (açık devre i = 0). Not: tam gerekçe KCL'dir (Ders 2+); metin yalnızca açık devre ilkesine dayanır |
| 17 | Bölüm 3 ön tanıtımı: gerilim, kısa devre, ideal kaynak | [28:00–43:19] |

## 3. Sayısal sonuçlar (`python3 dogrula.py`, kesirli tam aritmetik + bağımsız kontrol)
- Parça 2: 3 µC / 1 ms = 3 mA (ok sola −3 mA); elektronlar −4 µC / 1 ms = −4 mA (ok sola 4 mA).
- Parça 3: 9 V / 3 kΩ = 3 mA; açık: 3 kΩ × 0 = 0 V, anahtar 9 V (KVL ile bağımsız kontrol).
- Parça 4: 4 mA × 3 s = 12 mC; (−2 mA) × 2 s = −4 mC; ∫₀³ 4t dt = 4 × 3² / 2 = 2 × 9 = 18 mC (sayısal integral de 18).
- Parça 5: üçgen (2 × 6) / 2 = 12 / 2 = 6 µC; i = 3t (i(2) = 3 × 2 = 6); ∫₀² 3t dt = 3 × 2² / 2 = 3 × 4 / 2 = 6 µC; (5 − 2) × 6 = 18 µC; (8 − 5) × (−2) = −6 µC; 6 + 18 = 24 µC; 24 − 6 = 18 µC; ortalama 18 / 8 = 2,25 mA; i(1) = 3 mA, q(1 ms) = (1 × 3) / 2 = 1,5 µC; 1,5 / 6 = 0,25; 2–5 ms eğim 18 / 3 = 6 mA. Bağımsız: orta nokta kuralıyla sayısal integral (0–1, 0–2, 0–5, 0–8 ms).
- Parça 6: R = 12 V / 2 mA = 6 kΩ, 12 V / 6 mA = 2 kΩ; i = 12 / 6 = 2 mA, 12 / 2 = 6 mA; açık anahtarlar 12 V; alternatif çözüm 4 V / 2 kΩ = 2 mA, 12 V / 2 kΩ = 6 mA; yük (3 − 1) × 2 = 4 mC, (4 − 3) × 6 = 6 mC, toplam 10 mC (sayısal integral de 10).
- Yorum sorusu: 2 s × 5 mA + 1 s × (−3 mA) = 10 − 3 = 7 mC.

## 4. Özgünlük
Razavi Ders 1'in bu aralıktaki örnekleri — 0 → i1 → 0 darbe akımının yükü (t2 − t1)·i1 [21:35–23:31] ve tek batarya + tek anahtar + tek direnç (R1) ile bu darbeyi kurma [23:39–27:43] — kullanılmadı. Bu bölümün örnekleri bu çalışma için tasarlandı: 3 µC/ms ve elektron (−4 µC/ms) referans örnekleri; 9 V–3 kΩ halkasında açık anahtar gerilimi; tek başına pil; rampa–sabit–ters (0–8 ms) akım grafiği ve "yarı zamanda dörtte bir yük"; iki seviyeli (2 mA, 6 mA) akımı iki kollu (6 kΩ, 2 kΩ) ve iki anahtarlı devreyle kurma ve alternatif çözüm; yorum sorusu. Kavram sırası Razavi'yi izler (yön → açık devre → integral → sentez), cümleler özgündür. Su borusu benzetmesi yok.

## 5. Ekrandaki yazılar
Tam liste `metin.md` sahne planlarında. Gösterim: küçük i, q; çarpma "×"; ondalık virgül; ekranda "·" yok; integral sınırları yazılı (∫₀^t₁, ∫₀², ∫₀³); birimler mA, µC, mC, kΩ, V.

## 6. Bağımsız denetim (19.11.2026)
Denetim 1 (alt ajan, transkriptle karşılaştırmalı): sayılar doğru, seviye üniversite 1. sınıf, kopya riski düşük (darbe örneği ve R1 sentezi kullanılmamış; iki kollu devre özgün). KRİTİK 1: parça 3'te anahtarın bağlantı tarifi çizimle tersti → ses ve sahne düzeltildi. ÖNEMLİ: hesabı gösterilmeyen sayılar (3 mA/ms, eğim 24 − 6, kapalı anahtarda 0 V, i(4 s) = 6 − 2 × 4, ters türev satırı), gruplama belirsizliği ("üç te kare bölü iki" → "te karenin üç katının yarısı"), "de te" okunuşu, ekranda kelime yerine ":" (tam cümlelere çevrildi), kaynaksız arıza arama iddiası (çıkarıldı), "hiçbir an bu değeri" (düzeltildi: rampada bir an geçiyor), uçları boşta pil çizimi (açık anahtarlı pile çevrildi). KÜÇÜK bulguların hepsi uygulandı.
Denetim 2 (değişen kısımlar): yeni KRİTİK/ÖNEMLİ yok. 5 küçük not (3 mA/ms birimi, alt sınır adımı, ses–ekran ifade birliği, pil girişi, uzun eğim cümlesi) uygulandı.

## 7. Sürüm 3 (19.11.2026): `inceleme.md` ↔ uygulama

| İnceleme | Uygulama |
|---|---|
| A1 "Uygulamada" parçası | Yeni Parça 2 (428 kelime ≤ 540): iki satır fikri (1N4007), "üç soru" kuralı, anahtar ve LED yalnızca tabloda + tek cümle, mini tasarım (CR2032, 25 µA → 375 gün), tepeyle yanlış hesap (22,5 saat, 400 kat). İç direnç ve 50 µA varyantı yok (paket 10). Isınma cümlesi paketin doğru ifadesiyle ("çoğunlukla ısınmayla sınırlıdır ve sıcaklık arttıkça düşer"); "ortalama" yalnızca diyot ve pil için. |
| A2 kanca vaadi | Parça 1'e "veri sayfasında sürekli/darbe akımı, pil ömrü ortalama akımdan" cümlesi + ekranda madde. |
| A3 birim kolaylığı ve köprü | mA × ms = µC ilk kez Parça 2'de; Parça 5 sonunda "pil hesabında gördüğümüz birim kolaylığını hatırla". mAh = yük Parça 2'de; Parça 5'te "Hatırla: … dar dikdörtgenlerin alanıydı. Pilin miliamper saati de tam böyle bir alan." |
| A4 buton + çekme direnci | Parça 4'te eski tek pil paragrafının ve "kopuk bağlantı" cümlelerinin yerine (süre). |
| B5 "de te" | "De te, işte bu çok kısa zaman aralığının adı." (cümle başı); "Genişliği ise o kısacık süre, yani de te."; kural: yalnızca cümle başı veya işlem sözcüğü ("eşittir/bölü/çarpı") ya da "yani" sonrasında; `dogrula.py` otomatik denetliyor. |
| B6 ısınma | Bkz. A1. |
| C7 voltmetre iç direnci | Uygulanmadı (isteğe bağlı; süre). |
| C8 ortalama köprüsü | Parça 6: "Pil ömrü hesabında işimize yarayan da tam bu ortalamaydı." |
| C9 kart | Kart 3 maddede; 4. madde yalnızca açıklamada. |
| C10 toparlayalım | Parça 8'e "Veri sayfasında da bu iki büyüklükle karşılaştık: …" |
| D kısaltmalar | Üçü de yapıldı: eski P5 integral kontrolü, eski P5 q(t) grafiği, eski P6 alternatif çözüm. Ek kısaltma (süre): eski P2 "Bir sınavda…" paragrafı (tek cümleyle özetlendi), eski P3 "İki durumu yan yana" paragrafı ve tablosu. Eski P5'teki "her milisaniyede üç miliamper" adımı Parça 6'ya tek satır olarak taşındı (i(1 ms) = 3 mA'in hesabı gösterilsin diye). |
| F telif | Parça 7 (eski 6) bilgi olarak metin onayı açıklamasında. |

Diğer: selam (UZUN.md 4a) Parça 1'de ayrı dosya; yeni tahta düzeni (UZUN.md 4) sahne planlarında; abone kartları sözlü çağrılarla eşzamanlı: 1. kart Parça 2 sonu (~4. dk; ilk önemli sonuç 375 gün'den hemen sonra), 2. kart Parça 8 "Kanala abone olursan…" (Bölüm 1 iş emri C düzeni; eski P6 başındaki sessiz kart kaldırıldı). Süre: 2.211 kelime → konuşma ~14,2 dk, video ~16,3 dk (`dogrula.py`).

## 8. Sürüm 3 yeni iddialar → dayanak

| # | İddia | Dayanak |
|---|---|---|
| 18 | Datasheet'te akım için iki satır: sürekli ve darbe; sürekli değer çoğunlukla ısınmayla sınırlı, sıcaklıkla düşer; sınırlar çalışma noktası değil | `icerik.md` 4, 5a, 5b (İçerik Ajanı + bağımsız denetim; datasheet'ler) |
| 19 | 1N4007: I_F(AV) = 1,0 A (ortalama, 9,5 mm bacak, T_A = 75 °C); I_FSM = 30 A (8,3 ms tek yarım sinüs) | Vishay doc 88503 rev. 29-Apr-2020 s. 1 (`icerik.md` 5b, 11) |
| 20 | 2N7002E: I_D = 260 mA (25 °C), 190 mA (85 °C); I_DM = 1,2 A (tp = 10 µs) | onsemi 2N7002E/D Rev. 8 s. 1 (`icerik.md` 5b). **tp = 10 µs PDF s. 1'de render öncesi gözle doğrulanacak** (paket notu). |
| 21 | TLHR540x: I_F = 30 mA (≤ 65 °C); I_FSM = 1 A (tp ≤ 10 µs) | Vishay doc 83012 Rev. 2.7 s. 2 |
| 22 | CR2032 225 mAh; mAh bir yük birimi, 1 mAh = 3,6 C | Panasonic CR2032 datasheet (Şubat 2026); hesap `dogrula.py` |
| 23 | Mini tasarım: 10 mA × 2 ms = 20 µC; 5 µA × 998 ms = 4990 nC = 4,99 µC; toplam 24,99 µC; ortalama ≈ 25 µA; 225 / 0,025 = 9000 saat; 9000 / 24 = 375 gün; tepeyle 225 / 10 = 22,5 saat; 9000 / 22,5 = 400 | `dogrula.py` (kesirli tam aritmetik + 1 s periyodun sayısal integrali 24 990 nC); `icerik_dogrula.py` |
| 24 | Pil ömrünü ortalama akım belirler; kısa tepeleri darbe satırı sınırlar | `icerik.md` 5c, 5d "öğrencinin çıkaracağı kural" |
| 25 | Buton + 10 kΩ çekme direnci (3,3 V): buton açık → i = 0, direnç 0 V, giriş 3,3 V, buton uçları 3,3 V; kapalı → 3,3 V / 10 kΩ = 0,33 mA, giriş 0 V; giriş neredeyse hiç akım çekmez | `icerik.md` 7-3; `dogrula.py`; #6 ile aynı ilke |
| 26 | Parça 6: rampa eğimi 6 mA / 2 ms = 3 mA/ms → i(1 ms) = 3 mA | `dogrula.py` |

## 9. Bağımsız denetim, sürüm 3 (19.11.2026)
Denetçi alt ajan (transkripti Drive'dan okudu, kaydetmedi; `dogrula.py` çalıştırdı; sürüm 2 ile karşılaştırdı). **KRİTİK yok**; bütün datasheet değerleri `icerik.md` 5b ile birebir, bütün hesaplar doğru. **ÖNEMLİ 8, hepsi düzeltildi:** (1) mAh → C ara adımı (3600 mC) ve "mA × s = mC" ilk kullanımda açıklandı; (2) "ortalama"nın anahtar/LED'e kayması: "orada ilk satırın adı ortalama değil, sürekli akım"; (3) pil ömrüne pay cümlesi + ekranda not; (4) Parça 8 "darbe akımı belirler" → "kısa zorlanmanın sınırını darbe akımı verir"; (5) butonda girişin neden 0 V olduğu ("kapalı buton tel gibidir, girişi toprağa bağlar"); (6) tablodaki koşullar seste: 75 °C, 260 → 190 mA; (7) "datasheet" seste hiç geçmiyor, yalnızca "veri sayfası"; (8) Parça 2, 4, 6'da y ≤ %76 sınırı, Parça 2'de ömür satırları "pahalıya patlayan" adımından önce temizlenir. **KÜÇÜK (uygulanan):** 225 / 0,025 = 225 × 40 adımı ve "mAh / mA = saat", "1000 nC = 1 µC"; "yaklaşık 400 kat"; montaj koşulu tabloda (9,5 mm bacak; FR4 1 inç² bakır); ilk cümle ikiye bölündü; "diyota bakalım"; ekranda iki nokta kelime yerine kaldırıldı ("Uyanıkken q = …", "Buton açıkken i = 0"); Parça 6 "Artış hızı = 6 mA / 2 ms = 3 mA / ms", "i(1 ms) = 3 mA / ms × 1 ms"; Parça 5 "pilin verebileceği en büyük alan"; Parça 7 "açık devre örneğindeki dokuz voltluk devre"; Parça 1 vaadine devre kurma geri eklendi, ekranda "Veri sayfasında"; Parça 3 sesinde "altı eksi iki çarpı dört"; "de te" kuralı "Genişliği ise o kısacık süre. De te." ile tek biçime indi; "- Miliamper saat (mAh) bir yük birimidir"; kanca/intro'da köşe başlığı yokluğu not edildi. **Kanal sahibine bilgi (karar):** bitiş ekranındaki "—" (UZUN.md 4.3 ↔ 4a), "Doğrusu" başlığının rengi (koyu yeşil), 2. abone kartının kapanışta olması (Bölüm 1 iş emri C), Parça 7'nin Razavi'nin sınıf sorusundan türemesi. Süre için ayrıca kısaltıldı: voltmetre cümlesi, Parça 8'de iki cümle, Parça 6'da "beşinci milisaniyede…" iki cümle, Parça 2'de köprü cümlesi (köprü Parça 5'te). Sonuç: 2.248 kelime, video ~16,5 dk; `dogrula.py` TAMAM.
