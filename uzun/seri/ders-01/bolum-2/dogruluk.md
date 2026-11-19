# Doğruluk kaydı — Devre Teorisi I: Ders 1 - Bölüm 2/3

Tarih: 19.11.2026. Aşama: metin sürüm 2 (bağımsız denetim 2 tur, bölüm 6). Ses ve görüntü yok.

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
