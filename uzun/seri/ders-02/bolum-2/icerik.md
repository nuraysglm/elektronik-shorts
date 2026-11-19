# İçerik paketi — Devre Teorisi I: Ders 2 - Bölüm 2/3

Hazırlayan: İçerik Ajanı (ICERIK.md), 19.11.2026. Sürüm 2 (bağımsız denetimden sonra düzeltildi; bkz. `## Denetim`).
Doğrulama: `icerik_dogrula.py` (çalıştırıldı, "TÜM KONTROLLER GEÇTİ"; özet bölüm 7'de).
Durum: bu bölümün metni (`metin.md`) ve ders planı (`uzun/seri/ders-02/plan.md`) henüz yazılmadı; bu yüzden `inceleme.md` yok. Bölümleme, Ders 2 - Bölüm 1 paketindeki öneriye uyar (B2 = [15:12–31:33]); ders planı Uzun Video Ajanı'nındır.

## 1. Künye

- **Ders / bölüm:** Ders 2 - Bölüm 2/3.
- **Konu:** Bağımsız gerilim kaynağı ile bağımlı gerilim kaynağı farkı; bağımlı kaynağın sembolü (eşkenar dörtgen); bağımlılık türleri (bir gerilime ya da bir akıma bağlı; doğrusal k × vx, daha karmaşık bağıntılar yalnızca adıyla); bağımlı kaynak neden çalışılır (satın alınmaz, ama kuvvetlendiriciyi modeller); kontrol eden ve kontrol edilen taraflar; kuvvetlendirici = bir işaretin ölçeklenmiş kopyası. **Uygulamada:** "Gerçek bir kuvvetlendirici bağımlı kaynağın hangi sözünü tutar, hangisini tutmaz?" (TI INA180 akım ölçme kuvvetlendiricisi, TI LM358 işlemsel kuvvetlendirici).
- **Razavi transkripti:** Ders 2 (videoId `Hd0ZTXM572U`), **[15:12–31:33]** (kanal sahibinin özel Drive klasörü, `1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`; depoya kopyalanmadı).
  - [15:12–17:21] bağımsız gerilim kaynağı tanımı; [17:21–18:44] bağımlı kaynak tanımı ve eşkenar dörtgen sembolü; [18:44–20:12] bağımlılık türleri (k × vx; k × vx²; bir akıma bağlı); [20:12–21:08] "abartma" fikri (Razavi'nin robot benzetmesi — **kullanılmaz**); [21:08–22:40] neden çalışılır: satın alınmaz, kuvvetlendiriciyi ve ileride işlemsel kuvvetlendiriciyi modeller; [22:47–28:01] örnek 1 (iki bağımlı kaynak, i–v doğruları — **kullanılmaz**); [28:08–31:33] örnek 2 (mikrofon işaretinin 10 katı: kuvvetlendirici — **kullanılmaz**, yalnızca fikir).
- **Tahmini süre:** 13–15 dk (metin ~1.800–2.100 kelime). "Uygulamada" **~3:30 (≤ ~550 kelime)**.
- **Önceki bölümle bağ:** Bölüm 1 "ideal gerilim kaynağı: uç gerilimi akıma bağlı değil" dedi. Bu bölüm bir adım öteye gider: gerilim akıma bağlı değil ama **devrenin başka bir yerindeki bir büyüklüğe bağlı olabilir**. Bölüm 1'deki gerçek pil (iç direnç) ile buradaki gerçek kuvvetlendirici aynı soruyu sorar: "Model bu koşulda yeter mi?"

## 2. Öğrenme hedefleri

Bu bölümün sonunda öğrenci:
1. Bağımsız ve bağımlı gerilim kaynağını tanımlar; sembollerini (daire / eşkenar dörtgen) ayırt eder.
2. Bir bağımlı kaynağın **kontrol büyüklüğünü** (vx ya da ix), **katsayısını** ve katsayının birimini (gerilime bağlıysa V/V, yani birimsiz; akıma bağlıysa V/A = Ω) söyler.
3. Basit bir devrede (Ohm yasasıyla) önce kontrol büyüklüğünü, sonra bağımlı kaynağın gerilimini, sonra yükün akımını adım adım bulur; negatif katsayıda akımın referans yönüne göre işaretini doğru yorumlar.
4. İdeal gerilim kontrollü bağımlı kaynağın kontrol uçlarından **akım çekmediğini** (gerilimi yalnızca "okuduğunu") açıklar.
5. Bir kuvvetlendirici datasheet'inde kazancı (V/V veya V/mV), çıkışın besleme sınırını ve giriş akımını bulur; "bağımlı kaynak modeli bu çalışma noktasında geçerli mi?" sorusunu sayıyla cevaplar.

## 3. Ön bilgi

- Ders 1 - Bölüm 1–3: akım i = dq/dt, referans yönü ve işaret; gerilim iki nokta arasında, + ve − işaretiyle.
- Ders 2 - Bölüm 1: ideal tel, ideal anahtar, ideal gerilim kaynağı (uç gerilimi akıma bağlı değil; akımı yük belirler); gerçek pilde iç direnç; "ideal model ne zaman yeter?" sorusu.
- Ohm yasası v = R × i (yalnızca direnç için).
- Ön ekler: m, µ; V/mV birimi bu bölümde ilk kez (1 V/mV = 1000 V/V).

## 4. Kavramlar

| Kavram | Doğru tanım (öğrenci diliyle) | Birim / işaret kuralı | Geçerlilik sınırı |
|---|---|---|---|
| Bağımsız gerilim kaynağı | Gerilimi devredeki **hiçbir başka büyüklüğe bağlı olmayan** kaynak; değerini kendisi belirler (sabit 1,5 V da olabilir, zamanla değişen bir işaret de) [15:56–17:21]. Bölüm 1'deki ideal gerilim kaynağı budur. | Daire içinde + ve − (Bölüm 1). | Bölüm 1'deki sınırlar (gerçek pilde iç direnç). |
| Bağımlı gerilim kaynağı | Gerilimi **devrenin başka bir yerindeki bir gerilime ya da akıma bağlı** olan kaynak [17:28–18:11], [18:36–18:44]. Kendi uçlarına ne bağlandığına değil, "baktığı" yere göre gerilim üretir (Razavi: kaynak "başka bir yere bakar") [19:22–19:40]. | **Eşkenar dörtgen** içinde + ve −, yanında bağıntı (ör. "6vx") [18:19–18:36]; H. Ma, *Fundamentals of Electronic Circuit Design* §1.3, s. 10 de aynı gösterimi verir (bağımsız: daire, bağımlı: eşkenar dörtgen). Kontrol büyüklüğü (vx'in + ve − uçları ya da ix'in referans oku) şekilde **mutlaka** gösterilir. | Bir **modeldir**: tek başına parça olarak satılmaz [21:15–21:24]. Gerçek karşılığı kuvvetlendiricidir; o da yalnızca belli bir çıkış aralığında bu modele uyar (bölüm 5). |
| Gerilim kontrollü gerilim kaynağı (VCVS; seste "gerilimle kontrol edilen gerilim kaynağı") | v = k × vx; vx iki nokta arasındaki gerilim [19:00–19:48]. k 1'den büyük de, küçük de, **negatif** de olabilir (negatifse işaret ters çevrilir). | k birimsizdir (V/V). | İdeal VCVS'nin kontrol uçlarından **akım geçmez** (gerilimi yalnızca okur); Razavi kontrol eden kaynağa "başka hiçbir şey bağlı değil, bu kafa karıştırmasın; o yalnızca iki nokta arasındaki gerilime bakıyor" der [25:19–25:43]. Gerçek kuvvetlendiricide giriş akımı küçüktür ama sıfır değildir (bölüm 5). |
| Akım kontrollü gerilim kaynağı (CCVS) | v = r × ix; ix devrenin bir kolundaki akım [19:57–20:12] (Razavi yalnızca adıyla verir). | r'nin birimi **V/A = Ω** (bu bir direnç değildir, yalnızca birimi ohm'dur). ix'in referans oku şekilde çizilir. | İdeal CCVS'nin kontrol kolu bir **ideal tel** gibidir (üzerinde gerilim düşmez). |
| Doğrusal olmayan bağımlılık | v = k × vx² gibi bağıntılar da olabilir [19:48–19:57]. | — | Bu derste yalnızca adı geçer; hesap yok. |
| Kuvvetlendirici (amplifikatör) | Bir işaretin (ses, video) **şeklini koruyup** ölçeklenmiş kopyasını üreten devre [30:46–31:14]. Basit modeli bir VCVS'dir: v_çıkış = A × v_giriş; A = kazanç [31:18–31:27]. İçi transistörlerle dolu karmaşık bir devre, analizde tek bir bağımlı kaynakla temsil edilir [22:24–22:40]. | A birimsiz (V/V); datasheet'lerde bazen V/mV (bölüm 5). | Model yalnızca çıkış, besleme gerilimlerinin izin verdiği aralıkta kaldıkça geçerlidir; dışına çıkınca çıkış "tavana" yapışır (doyma; adı bu bölümde yalnızca sözlü). |

**Kontrol eden / kontrol edilen ayrımı (öğrenciye kural):** Kontrol tarafı bağımlı kaynaktan etkilenmiyorsa (bu bölümdeki bütün devreler böyle) sıra şudur: (1) kontrol büyüklüğünü (vx ya da ix) bul, (2) bağımlı kaynağın değerini hesapla, (3) bağımlı kaynağın bağlı olduğu tarafı çöz. Bu bölümdeki bütün örnekler bu üç adımla çözülür. (Kontrol büyüklüğü bağımlı kaynağın çıkışından da etkileniyorsa — geri besleme — denklemler birlikte çözülür; ileride.)

## 5. Uygulamada: gerçek bir kuvvetlendirici bağımlı kaynağın hangi sözünü tutar? (zorunlu; ~3:30)

### 5a. Ana fikir (tek cümle)
Bağımlı kaynak üç söz verir: **(1) çıkış = katsayı × kontrol büyüklüğü, (2) bu her değerde geçerli, (3) kontrol tarafından akım çekmem.** Gerçek bir kuvvetlendirici birinci sözü belli bir doğrulukla tutar; ikincisini yalnızca **besleme geriliminin izin verdiği aralıkta** tutar; üçüncüsünü **neredeyse** tutar. Tasarımcı datasheet'te bu üç sözün sınırını okur.

### 5b. Datasheet karşılığı (gerçek parçalar; değerler sayfadan okundu)

| Parça | Datasheet değeri (koşuluyla) | Bağımlı kaynak modeliyle bağı | Ne işe yarar / not |
|---|---|---|---|
| **INA180A2** akım ölçme kuvvetlendiricisi — Texas Instruments, *INAx180 Low- and High-Side Voltage Output, Current-Sense Amplifiers*, **SBOS741H** (Nisan 2017, rev. Temmuz 2022), 7.3 *Recommended Operating Conditions*, 7.5 *Electrical Characteristics*, 8.4.2 | **Kazanç (G):** A1 = 20, **A2 = 50**, A3 = 100, A4 = 200 V/V (tipik). **Kazanç hatası:** tipik ±%0,1, en çok **±%1** (V_OUT = 0,5 V … V_S − 0,5 V, T_A = −40 … 125 °C). **Besleme V_S:** 2,7 … 5,5 V. **Çıkışın beslemeye yaklaşması (V_SP):** tipik V_S − 0,02 V, en kötü **V_S − 0,03 V** (R_L = 10 kΩ, GND'ye); yani çıkışın en az V_S − 0,03 V'a kadar çıkabildiği garanti edilir, V_S'yi ise geçemez. **Giriş akımı I_IB:** tipik **0,1 µA** (V_SENSE = 0, V_IN+ = 0 V), tipik 80 µA (V_IN+ = 12 V). | **VCVS:** v_çıkış = 50 × v_şönt; v_şönt, akımın geçtiği küçük bir direncin (şönt) uçlarındaki gerilim. Söz (1): ±%1 içinde. Söz (2): çıkış beslemeye ancak yaklaşabilir (garanti: V_S − 0,03 V'a kadar), onu geçemez; 8.4.2'ye göre kazanç × giriş bu sınırı aşarsa çıkış besleme gerilimine olabildiğince yakın kalır ve ölçüm doğru olmaz; çare "şöntü küçült ya da düşük kazançlı modeli seç". Söz (3): 0,1 µA (şönt toprak tarafında, V_IN+ = 0 V), şönt yüksek tarafta 12 V'ta ise tipik 80 µA; ikisi de ölçülen amperler yanında önemsiz. | Pil ile çalışan bir cihazın, motorun, şarj devresinin **akımını** ölçmek (Ders 1 - Bölüm 1'in akımı burada sayıya dönüşür). Çıkışı bir mikrodenetleyicinin analog girişine gider. |
| **LM358** çift işlemsel kuvvetlendirici — Texas Instruments, *LMx58, LMx58x, LM2904x Industry-Standard Dual Operational Amplifiers*, **SLOS068AB** (Haziran 1976, rev. Ekim 2024), 5.7 *Electrical Characteristics: LM358, LM358A* | **Büyük işaret açık çevrim kazancı A_OL:** en az **25 V/mV**, tipik **100 V/mV** (V_S = 15 V, V_O = 1 … 11 V, R_L ≥ 2 kΩ, T_A = 25 °C); 0 … 70 °C'de en az 15 V/mV. **Giriş akımı I_IB:** tipik −20 nA, en çok −250 nA (25 °C). (V_O = 1,4 V, V_S = 5 V). Besleme 3 … 30 V. | **VCVS:** v_çıkış = A × (v₊ − v₋). 100 V/mV = 100 000 V/V. Kazancın ne kadar büyük olduğunu görmek için: 10 V çıkış, modelde yalnızca 10 V / 100 000 = 0,1 mV giriş farkına karşılık gelir (bu, LM358'in mV düzeyindeki ofsetinden bile küçüktür; "0,1 mV verirsek 10 V alırız" diye bir tasarım cümlesi kurulmaz). Kazanç **çok büyük ve belirsizdir** (en az 25 000, tipik 100 000: dört kat fark). | İşlemsel kuvvetlendirici bu "açık" hâliyle doğrudan kuvvetlendirici olarak kullanılmaz; çok küçük bir giriş farkı bile çıkışı beslemeye yapıştırır (H. Ma, §8.1, s. 43–44: pratik işlemsel kuvvetlendiricide fark kazancı 10⁵'i aşar, çok küçük bir giriş farkı çıkışı en büyük ya da en küçük değerine götürür; çıkış besleme aralığını aşamaz). Geri besleme ile kullanılır (Razavi: dersin sonuna doğru [22:13–22:40]; ileride). |

Not (LM358 tablosu): datasheet metninin otomatik çıkarımında bazı satırlarda en az/tipik sütunları ayrışmıyor; A_OL için "25 100" okunuşu yaygın sütun düzenine göre en az 25 / tipik 100 olarak alındı. Ekrana konmadan önce PDF tablosunda gözle doğrulanmalı (bkz. bölüm 10). LM358'in çıkış gerilimi satırları (V_OH) aynı nedenle pakette **kullanılmadı**; yalnızca "çıkış besleme aralığını aşamaz" genel bilgisi (Ma) kullanıldı.

**Okuma kuralı (öğrenciye):** Bir kuvvetlendiricinin datasheet'inde üç satıra bak: **(1) kazanç ve hatası, (2) çıkışın gidebildiği en uç değer (besleme sınırı), (3) giriş akımı.** Sonra kendi en büyük girişinle "kazanç × giriş" hesapla ve (2) ile karşılaştır.

### 5c. Tasarımcı hangi değere ne zaman bakar, hangi hata pahalıya patlar
- **Kazanç seçerken → çıkış sınırı.** Bağımlı kaynak modeli "çıkış = kazanç × giriş" der ve sınır tanımaz; gerçek kuvvetlendirici tanır. **Pahalı hata:** ölçülecek en büyük akımda "kazanç × giriş" çıkış sınırını aşar; cihaz büyük akımlarda hep aynı değeri okur. Koruma ya da pil yönetimi bu okumaya güveniyorsa aşırı akım fark edilmez. Doğrusu: en büyük girişte çıkışın, datasheet'in doğruluğu garanti ettiği aralıkta kaldığını hesapla (INA180'de 0,5 V … V_S − 0,5 V).
- **Doğruluk isterken → kazanç hatası.** INA180'de en çok ±%1. Daha iyisi gerekiyorsa başka parça (ileride; ofset gerilimi de katkı yapar, bu bölümde anılmaz).
- **İşlemsel kuvvetlendiriciyi "tek başına" kullanırken → kazancın belirsizliği.** LM358'de kazanç parçadan parçaya en az 25 000 ile tipik 100 000 arasında değişir; böyle bir kazanca güvenilerek "10 kat" bir kuvvetlendirici yapılamaz. Bu yüzden işlemsel kuvvetlendirici dirençlerle geri besleme içinde kullanılır (ileride).
- **Kontrol tarafının yüklenmesi → giriş akımı.** İdeal modelde sıfır. INA180'de tipik 0,1 µA (V_IN+ = 0 V) … 80 µA (V_IN+ = 12 V), LM358'de en çok 250 nA. Ölçtüğün akım mA ya da A düzeyindeyse ihmal edilir; çok küçük akımlı bir kaynağı (yüksek dirençli bir sensör) ölçerken önemli olur (ileride).
- Not: Bu maddeler "En sık yapılan hata" etiketi **almaz** (bölüm 6: videoda tek "En sık yapılan hata" var). "Tasarımda pahalıya patlayan hata" gibi düz bir ifadeyle anlatılır.

### 5d. Mini tasarım örneği (tam hesaplı; özgün)
**Görev:** 3,3 V ile beslenen bir kartta, bir motorun çektiği akımı (0 … 2 A) INA180A2 (G = 50) ile ölçeceğiz. Akım, motorun toprak tarafına konan küçük bir şönt dirençten geçiyor (alçak taraf; şemada şönt toprak tarafında çizilsin); INA180 şöntün uçlarındaki gerilimi 50 ile çarpıp mikrodenetleyiciye veriyor. Şönt direnci ne olmalı?

**Model:** v_şönt = R_şönt × i (Ohm), v_çıkış = 50 × v_şönt (VCVS). Yani v_çıkış = 50 × R_şönt × i.

**(a) İlk deneme: R_şönt = 50 mΩ**
1. En büyük akımda şönt gerilimi: v_şönt = 2 A × 0,05 Ω = 0,1 V.
2. Bağımlı kaynak modeli: v_çıkış = 50 × 0,1 V = **5 V**.
3. Çıkış ne kadar yükselebilir? Datasheet en kötü durumda beslemeye 0,03 V kadar yaklaşabileceğini garanti eder: 3,3 − 0,03 = **3,27 V**. Bunun ötesi garanti değildir; 3,3 V'u ise hiç geçemez.
4. 5 V, 3,3 V'tan bile büyük → **model bu akımda geçersiz.** Çıkış beslemenin hemen altında (yaklaşık 3,27 … 3,3 V) takılır.
5. Takılma hangi akımda başlar (en kötü durum)? 3,27 V = 50 × 0,05 Ω × i → i = 3,27 / (50 × 0,05) = 3,27 / 2,5 = **yaklaşık 1,31 A**. Bu akımın üstündeki bütün akımlar aynı okunur. (Aslında doğruluk garantisi daha önce biter: 2,8 V / 2,5 = 1,12 A; bkz. (b).)

**(b) Doğru seçim**
1. Datasheet ±%1 kazanç doğruluğunu çıkış 0,5 V ile V_S − 0,5 V arasındayken garanti eder. Üst sınır: 3,3 − 0,5 = **2,8 V**.
2. En büyük şönt: 50 × R_şönt × 2 A ≤ 2,8 V → R_şönt ≤ 2,8 / (50 × 2) = 2,8 / 100 = 0,028 Ω = **28 mΩ**.
3. Aşağı yuvarlayıp **25 mΩ** seçiyoruz.
4. Kontrol: v_çıkış(2 A) = 50 × 0,025 Ω × 2 A = **2,5 V** ≤ 2,8 V → **model geçerli.**
5. Okuma: her 1 A için çıkış 50 × 0,025 = **1,25 V** artar. Mikrodenetleyici 1,0 V okursa akım 1,0 / 1,25 = **0,8 A**.
6. Bedeli: şönt yükün yoluna küçük bir direnç ekler; 2 A'de uçlarında 2 × 0,025 = **50 mV** düşer (Bölüm 1'deki "gerçek tel" gibi küçük bir kayıp).

**Öğrencinin çıkaracağı kural:** "Bağımlı kaynak modeliyle hesapla (çıkış = kazanç × giriş), sonra en büyük girişte çıkışı datasheet'in sınırıyla karşılaştır. Sınırı aşıyorsa model yalan söylüyor: girişi (şöntü) ya da kazancı küçült."

Ek (paket içi, ekrana konmaz): bütün düzen dışarıdan bakınca bir **akım kontrollü gerilim kaynağıdır**: v_çıkış = (50 × 0,025 Ω) × i = 1,25 Ω × i (bölüm 7 örnek 1 ile bağ). ±%1 kazanç hatası 0,8 A okumada ±8 mA eder; şöntün toleransı (ör. ±%1) da aynı ölçüde katkı yapar. Çıkışın alt garanti sınırı 0,5 V, 0,5 / 1,25 = 0,4 A'e karşılık gelir; bunun altındaki doğruluk (ofset) bu bölümün konusu değildir. Şönt gücü (p = i² × R) ileride.

## 6. En sık yapılan hata ve Doğrusu (bölümde tek)

- **En sık yapılan hata:** "Kontrol tarafında akım yoksa (oraya başka bir şey bağlı değilse) kontrol gerilimi de yoktur; bağımlı kaynak çalışmaz." Yanlış sonuç (örnek 2, açık anahtar): "anahtar açık, akım sıfır, o hâlde vx = 0 ve v_b = −4 × 0 = 0 V".
- **Doğrusu:** Bağımlı kaynak **gerilimi okur**; kontrol uçlarında akım olması gerekmez. Açık anahtar yalnızca i = 0'ı garanti eder (Ders 1 - Bölüm 2); direncin uçlarında 3000 × 0 = 0 V olduğu için kaynağın 1,5 V'u anahtarın uçlarında görünür: vx = 1,5 V. Bağımlı kaynak: v_b = −4 × 1,5 = **−6 V**.
- **Gerekçe (gerçekten yaygın mı?):** Kaynağın kendisi bu karışıklığa karşı uyarıyor: Razavi örneğinde kontrol eden kaynağa "hiçbir şey bağlı değil" diye öğrencinin kafasının karışmamasını açıkça söyler ve bağımlı kaynağın yalnızca iki nokta arasındaki gerilime baktığını vurgular [25:19–25:43]. Kökü de bilinen bir yanlışa dayanır: "akım yoksa gerilim de yoktur" (açık devrede gerilim; Ders 1 - Bölüm 2'nin hatası). AGENT.md 2f-0 ("kaynağın kendisi uyarıyorsa") için yeterli. Ayrı bir eğitim araştırması künyesi bu çalışmada doğrulanmadı; "araştırmalar gösteriyor" denmez.
- **Kart önerisi (örnek 2'nin devresiyle aynı ekranda):** kırmızı "En sık yapılan hata: Anahtar açık, akım yok, o hâlde bağımlı kaynak sıfır volt." Yeşil "Doğrusu: Bağımlı kaynak gerilimi okur: vx = 1,5 V, v = −4 × 1,5 = −6 V."

## 7. Sayısal örnekler (özgün; hepsi `icerik_dogrula.py` ile doğrulandı)

Razavi'nin örnekleri (3v1 ve −5v1 kaynaklı i–v doğruları [22:56–28:01]; mikrofon işaretinin 10 katı [28:25–31:27]) **kullanılmaz**. Bizim örneklerimiz farklı yapıdadır: biri akım kontrollü, biri kontrol gerilimini bir anahtarın uçlarından alan (açık ve kapalı iki durum, negatif katsayı), üçüncüsü gerçek parçalı.

1. **Akım kontrollü gerilim kaynağı (CCVS):** Sol tarafta 3 V bağımsız kaynak ve 600 Ω direnç tek bir halka oluşturur; ix, kaynağın + ucundan çıkıp 600 Ω'dan geçen akımdır (referans oku şekilde bu kolun üstünde). Sağ tarafta değeri 400 Ω × ix olan bağımlı kaynak (+ ucu üstte) ve 1 kΩ yük; i_y, bağımlı kaynağın + ucundan çıkıp 1 kΩ'dan geçen akım.
   - Adım 1: ix = 3 V / 600 Ω = 0,005 A = **5 mA**.
   - Adım 2: v_b = 400 Ω × 5 mA = 400 × 0,005 = **2 V**. (Katsayının birimi ohm: ohm × amper = volt; bu bir direnç değil.)
   - Adım 3: i_y = 2 V / 1000 Ω = **2 mA**.
   - Not: ideal CCVS'nin kontrol kolu ideal tel gibidir; sol tarafın akımını değiştirmez.
2. **Kontrol gerilimi açık anahtarın uçlarından (negatif katsayılı VCVS):** Sol tarafta tek halka: kaynağın + ucu → 3 kΩ direnç → ideal anahtar → kaynağın − ucu (1,5 V bağımsız kaynak; Bölüm 1'deki anahtarlı devreyi hatırlatır). vx = **anahtarın uçları arasındaki gerilim**; vx'in + ucu anahtarın dirence bağlı ucu, − ucu kaynağın − ucuna bağlı ucu. Ekranda ilk geçtiği yerde "Açık anahtar (kontak ayrık, akım yok)" ve "Kapalı anahtar (kontak birleşik, iletiyor)" yazılsın. Sağ tarafta değeri −4 × vx olan bağımlı kaynak (+ ucu üstte) ve 2 kΩ yük; yük akımının referans oku bağımlı kaynağın + ucundan çıkacak yönde.
   - **Anahtar açık:** Adım 1: i = 0 (açık devre). Direncin uçlarında 3000 Ω × 0 = 0 V; bu yüzden kaynağın 1,5 V'u anahtarın uçlarında görünür: vx = **1,5 V** (Ders 1 - Bölüm 2'deki gibi; KVL adı geçmez). Adım 2: v_b = −4 × 1,5 V = **−6 V**. Adım 3: i = −6 V / 2000 Ω = **−3 mA**: akım referans okunun **tersine** 3 mA.
   - **Anahtar kapalı:** vx = 0 (kısa devre). Sol taraftaki akım 1,5 V / 3000 Ω = **0,5 mA**; ama bağımlı kaynak akıma değil gerilime bakar: v_b = −4 × 0 = **0 V**, yük akımı 0.
   - Ders: Sol tarafta akım varken bağımlı kaynak sıfır, akım yokken −6 V. Bağımlı kaynağı belirleyen kontrol **gerilimidir** (bölüm 6). Bu, Razavi'nin örneklerinden yapı olarak farklıdır: kontrol bir anahtarın durumuyla değişir ve Ders 2 - Bölüm 1'in anahtar eşdeğerliklerini kullanır.
3. **Gerçek parçalar (5b) ve mini tasarım (5d):**
   - LM358: 100 V/mV = 100 000 V/V; 10 V çıkış için giriş farkı 10 / 100 000 = 0,1 mV (tipik), 10 / 25 000 = 0,4 mV (en kötü); 1 mV giriş farkında model 100 000 × 1 mV = 100 V der (15 V beslemede imkânsız).
   - Mini (a): 2 × 0,05 = 0,1 V; 50 × 0,1 = 5 V; 3,3 − 0,03 = 3,27 V; 3,27 / 2,5 ≈ 1,31 A (betik 1,308 A); doğruluk sınırı 2,8 / 2,5 = 1,12 A.
   - Mini (b): 3,3 − 0,5 = 2,8 V; 2,8 / 100 = 28 mΩ; seçim 25 mΩ; 50 × 0,025 × 2 = 2,5 V; 50 × 0,025 = 1,25 V/A; 1,0 / 1,25 = 0,8 A; 2 × 0,025 = 50 mV.

`icerik_dogrula.py` çıktısı (19.11.2026): bütün assert'ler geçti, son satır "TÜM KONTROLLER GEÇTİ". Ek kontroller: 1,12 A doğruluk sınırı; ±%1 → 0,8 A'de ±8 mA; 0,1 µA / 2 A = 5 × 10⁻⁸; eşdeğer CCVS katsayısı 1,25 Ω; yorum sorusu.

## 8. Yorum sorusu (cevabıyla)

*"Katsayısı 20 olan gerilim kontrollü bir bağımlı kaynağa 2 kΩ'luk bir yük bağlı (yük, bağımlı kaynağın iki ucuna doğrudan bağlı) ve kaynağın + ucundan çıkıp yükten geçen akım 1,5 mA ölçülüyor. Kontrol gerilimi kaç volt? Bu kaynak aslında 5 V ile beslenen gerçek bir kuvvetlendiriciyse, kontrol gerilimi 0,3 V'a çıkınca model hâlâ doğru mu?"*
Cevap: Yükün gerilimi v = 1,5 mA × 2000 Ω = 3 V; bu bağımlı kaynağın gerilimidir, o hâlde vx = 3 V / 20 = **0,15 V**. Kontrol gerilimi 0,3 V olunca model 20 × 0,3 = 6 V der; gerçek kuvvetlendiricinin çıkışı 5 V'luk beslemeyi geçemeyeceği için **model geçersizdir** (çıkış beslemenin hemen altında takılır).

## 9. Kapsam dışı / sonraya bırakılan

- **Bağımlı akım kaynakları** (gerilim ya da akım kontrollü akım kaynağı) ve **bağımsız akım kaynağı**: Bölüm 3 / ileride. Bu bölümde dört bağımlı kaynak türünün tablosu **verilmez**; yalnızca iki gerilim kaynağı türü (VCVS, CCVS). İstenirse "akım kaynaklarını sonra göreceğiz" cümlesi.
- **İşlemsel kuvvetlendirici devreleri, geri besleme**: yalnızca adı ("dersin sonuna doğru"; Razavi [22:13–22:31]).
- **Transistörün bağımlı kaynakla modellenmesi**: anılmaz (ileri dersler).
- **Doyma** kelimesi yalnızca sözlü ve bir kez; ayrıntısı yok. **Ofset gerilimi, bant genişliği, CMRR, desibel (dB)**: anılmaz.
- **KVL, seri dirençler, gerilim bölücü**: Ders 3. Bu yüzden örneklerde kontrol büyüklüğü ya tek halkalı bir devreden (Ohm yasası) ya da bir anahtarın uçlarından alınır; bölücü yok.
- **Güç (p = v × i), şöntün ısınması**: ileride; yalnızca "şönt küçük bir kayıp ekler" (50 mV).
- **Yüksek taraf / alçak taraf ölçüm**: yalnızca bir kez, adıyla (mini tasarımda şönt toprak tarafında). **Ortak mod gerilimi**: anılmaz.
- **Doğrusal olmayan bağımlılık (k × vx²)**: yalnızca adı.

## 10. Uzun Video Ajanı'na notlar

- **Parça önerisi (7 parça, ~14 dk):** (1) kanca + intro kartı: "Satın alamayacağın bir kaynak neden ders kitabında?" (~0:40); (2) Bölüm 1'den köprü: bağımsız kaynak (~1:00); (3) bağımlı gerilim kaynağı: tanım, eşkenar dörtgen sembolü, kontrol büyüklüğü, VCVS ve CCVS, katsayının birimi, üç adım kuralı + örnek 1 (~3:30); (4) örnek 2 (anahtarlı kontrol, negatif katsayı, açık ve kapalı durum) + "En sık yapılan hata" aynı devrede (~3:00); (5) kuvvetlendirici: işaretin ölçeklenmiş kopyası, VCVS modeli (~1:30; kendi örneğimizle, mikrofon değil — ör. bir sensörün küçük gerilimi); (6) **Uygulamada** (~3:30); (7) "Bilmen gerekenler" + yorum sorusu + kapanış (~1:00).
- **"Uygulamada" akışı (~550 kelime):** (a) üç söz (~25 sn); (b) INA180 satırı: kazanç 50, çıkış beslemeye en kötü durumda 0,03 V yaklaşır ve onu geçemez, giriş akımı 0,1 µA (~40 sn); (c) LM358 satırı: kazanç 100 V/mV = 100 000, 10 V için 0,1 mV; en az 25 000 (~40 sn); (d) mini tasarım (a) ve (b) adım adım (~100 sn); (e) kural + köprü cümlesi (~20 sn). **Kısaltma:** ±8 mA, 0,4 A alt sınırı, eşdeğer CCVS (1,25 Ω) ve 80 µA satırı videoya girmez (açıklamaya yazılabilir). LM358'in sıcaklık satırı (15 V/mV) girmez.
- **Telif / özgünlük:** Razavi'nin robot benzetmesi [20:37–21:08], örnek 1 (3v1, −5v1 ve i–v doğruları) ve örnek 2 (mikrofon × 10) **kullanılmaz**; i'nin v1'e göre grafiği de çizilmez (Razavi'nin örneğinin yapısı). Kuvvetlendirici fikri için kendi örneğimiz: mini tasarımdaki şönt gerilimi (milivoltlar → voltlar) bunu zaten gösteriyor.
- **Seslendirme:** "VCVS", "CCVS" seste okunmaz: "gerilimle kontrol edilen gerilim kaynağı", "akımla kontrol edilen gerilim kaynağı"; ekranda da tam ad (AGENT.md 2d-5: kısaltma yok), kısaltma en çok parantez içinde küçük. "INA180", "LM358" seste "bir akım ölçme kuvvetlendiricisi", "yaygın bir işlemsel kuvvetlendirici"; ekranda parça adı küçük gri kaynak satırında. "V/mV" seste "volt bölü milivolt", "V/V" seste "volt bölü volt". "mΩ" seste "miliohm". "v_x" seste "ve iks" değil, "v iks" (Uzun Video Ajanı'nın "ve" ile karışma kuralı: "kontrol gerilimine v iks diyelim"). "Şönt" ilk geçtiği yerde açıklansın: "akımı ölçmek için yola konan çok küçük bir direnç".
- **İfade dikkati:**
  - "Bağımlı kaynak satın alınamaz" denebilir (Razavi [21:15–21:24]), ama hemen ardından "onu kuvvetlendiricinin içinde buluruz" denmeli; öğrenci "gereksiz konu" sanmasın.
  - "Bağımlı kaynak enerji üretmez" gibi kaynaksız iddialar yok. (Gerçek kuvvetlendiricinin enerjiyi beslemeden aldığı yalnızca "beslemesi 3,3 V" diye ima edilir; güç ileride.)
  - Katsayı r'nin birimi ohm olsa da "bu bir direnç değil" cümlesi söylensin.
  - Negatif katsayıda "akım ters yönde 3 mA" ifadesi, "−3 mA" ile birlikte (örnek 2); "eksi akım" denip bırakılmasın.
  - "Doyma" kelimesi kullanılırsa tek cümleyle: "çıkış besleme sınırına yapışır, buna doyma denir".
- **Ekran:** Eşkenar dörtgen sembolü ile daire sembolü yan yana, ikisinde de + ve −. Kontrol büyüklüğü (vx'in + ve − uçları ya da ix'in oku) **bağımlı kaynakla aynı renkte** (ör. ikisi de mavi), böylece "neye baktığı" görülür; bağımsız kaynak siyah (7a-4: karışabilecek öğeler renkle ayrılır). Datasheet tabloları kopyalanmaz (telif); kendi tablomuz: sütunlar "söz" | "ideal bağımlı kaynak" | "INA180" | "LM358". Kaynak satırı küçük gri: "TI INA180 datasheet (SBOS741H, 2022)", "TI LM358 datasheet (SLOS068AB, 2024)". Mini tasarımda besleme 3,3 V koyu kırmızı ince çizgi, en kötü çıkış sınırı kırmızı kesikli (3,27 V), 2,8 V turuncu kesikli, modelin 5 V'u gri; eksen 0 … 5,5 V ki 5 V noktası sınıra yapışmasın (AGENT.md 2e-1). Grafik çizilecekse: yatay eksen akım (0 … 2 A), dikey eksen çıkış gerilimi; 50 mΩ için model doğrusu gri, gerçek çıkış (1,31 A'den sonra yatay) kırmızı; 25 mΩ doğrusu mavi (0 … 2,5 V). Doğrusu formülden hesaplansın (2e-2).
- **Görsel doğrulama (zorunlu, ekrana koymadan önce):** LM358 A_OL "en az 25 / tipik 100 V/mV" sütun ataması PDF'teki tabloda (SLOS068AB, 5.7) gözle doğrulanmalı. Doğrulanamazsa ekranda yalnızca "tipik yüz bin" kalır ve "en az 25 000" cümlesi çıkarılır (mini tasarım bu değere dayanmıyor). INA180'in V_OUT denklemi datasheet'te görsel denklem olarak var; pakette kazanç tanımından yazıldı (G = V/V); 9.2.2'deki örnek sayılar (40 A, 0,5 mΩ, en büyük kazanç 248,5) bu denklemle tutarlı: (5 − 0,03) / (40 × 0,0005) = 248,5.
- **Sayılar:** her ara adım ekranda ve seste (AGENT.md 2b-7): özellikle "100 V/mV = 100 000 V/V" (1 V/mV = 1000 V/V çevirisi), "3,3 − 0,03 = 3,27 V", "3,27 / (50 × 0,05) = 3,27 / 2,5", "2,8 / (50 × 2) = 2,8 / 100 = 0,028 Ω = 28 mΩ" adımları atlanmasın. "Yaklaşık 1,31 A" (betikte 1,308).
- **"Bilmen gerekenler" kartı önerisi (3 madde):** "Bağımlı kaynak: değeri başka bir büyüklüğe bağlı" · "Önce kontrol büyüklüğünü bul" · "Gerçek kuvvetlendirici: çıkış besleme sınırını aşamaz". Açıklamaya dördüncü madde: "Kontrol tarafından akım çekmez (ideal)".
- `inceleme.md` yok (metin yazılmadı).

## 11. Kaynaklar

- B. Razavi, *Basic Circuit Theory*, Ders 2 (UCLA), YouTube `Hd0ZTXM572U` [15:12–31:33]; transkript kanal sahibinin özel Drive klasörü (`1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`), 19.11.2026 okundu.
- Texas Instruments, *INAx180 Low- and High-Side Voltage Output, Current-Sense Amplifiers*, SBOS741H (Nisan 2017 – Temmuz 2022): 7.1, 7.3, 7.5, 8.1, 8.3.3, 8.3.4, 8.4.2, 9.1.2, 9.2.1–9.2.2. https://www.ti.com/product/INA180/datasheet (TI belge görüntüleyici bölümleri, 19.11.2026 okundu).
- Texas Instruments, *LMx58, LMx58x, LM2904x Industry-Standard Dual Operational Amplifiers*, SLOS068AB (Haziran 1976 – Ekim 2024): 5.1, 5.3, 5.7. https://www.ti.com/lit/gpn/LM358 (PDF, 19.11.2026 okundu).
- H. Ma, *Fundamentals of Electronic Circuit Design* (taslak ders kitabı, © 2005), Part I: §1.3 "Sources of Electrical Energy" (s. 10; bağımsız/bağımlı kaynak sembolleri, bağımlı kaynakların kuvvetlendirmeyi modellemesi) ve §8.1 "Op amp Basics" (s. 43–44; çıkış besleme aralığını aşamaz, fark kazancı 10⁵'in üstünde). Kanal sahibinin Drive'ı (`16jnm5p94s2z5gipBjQaYdQl9kyIcweAt`); sayfa numaraları PDF'teki altbilgi işaretlerinden çıkarıldı (±1); depoya kopyalanmadı, metin/şekil alınmadı.
- (Denenmedi:) AoE Student Manual ve Sedra/Smith bu bölüm için açılmadı; Ma kitabı kavramları ve sınırları karşıladı.

## Kaynakta düzeltme

Razavi transkriptinde [15:12–31:33] kavramsal bir hata bulunmadı. Notlar (hata değil ya da kaynağın kendisi düzeltmiş):
1. [27:12–27:53] Razavi ikinci bağımlı kaynağın akımını önce "−5v1 / R1" diye yazar, sonra kendisi "R2 olmalı" diye düzeltir. Bu örnek videoda kullanılmıyor; kullanılırsa doğrusu R2'dir.
2. [15:32] altyazıda "in-depend dent", [18:01] "circle" (circuit) geçiyor: otomatik altyazı hataları.
3. [17:13] Razavi bağımsız kaynağı "kendiliğinden üretir, devrede başka hiçbir şeyden etkilenmez" diye anlatır; bu **ideal** kaynak için doğrudur (Bölüm 1'deki gerçek pilin iç direnci hatırlatılabilir).
Datasheet'ler arasında çelişki yok. Belirsizlik: LM358 A_OL sütun ataması (bölüm 10, görsel doğrulama). Panelde ayrı kaynak onayı açılmadı.

## Denetim

Bağımsız denetçi (Agent aracıyla başlatılan, paketi görmemiş doktora düzeyi elektronik mühendisi rolü), 19.11.2026. Yaptıkları: betiği çalıştırdı; bütün sayıları ayrıca yeniden hesapladı (hepsi doğru); INA180 (SBOS741H 7.3, 7.5, 8.4.2, 9.2.2) ve LM358 (SLOS068AB 5.7) sayfalarını açıp her değeri ve koşulu doğruladı (hepsi doğru; LM358 A_OL "en az 25 / tipik 100" ataması kendi okumasıyla da aynı); Razavi Ders 2 [15:12–31:33] zaman damgalarını ve atıfları karşılaştırdı (hepsi doğru); Ma kitabı sayfalarını doğruladı.

- **Kritik:** yok.
- **Önemli (5, hepsi düzeltildi):** (1) "En sık yapılan hata" kartı örnek 2'nin devresiyle uyuşmuyordu ve iki ayrı hata içeriyordu → tek hata ("kontrol tarafında akım yoksa bağımlı kaynak sıfır"), hatanın doğal olarak doğduğu yeni örnek 2'de (kontrol gerilimi açık anahtarın uçlarından) gösteriliyor. (2) Eski örnek 2 (negatif katsayılı kaynak bir direnci sürüyor) Razavi'nin örneğine yapıca çok yakındı (UZUN.md 0a) → yerine anahtarlı, açık/kapalı iki durumlu özgün örnek; yorum sorusu ters soru (yük akımından kontrol gerilimine) + doyma olarak yeniden kuruldu. (3) "Sıra hep aynıdır" geri beslemede yanlış → "kontrol tarafı bağımlı kaynaktan etkilenmiyorsa" koşulu eklendi. (4) Örnek 1'de referans yönleri ve + uçları tanımsızdı → tanımlandı. (5) INA180 V_SP "çıkış en çok 3,27 V" diye yanlış okunuyordu → "en kötü durumda en az 3,27 V'a kadar çıkabilir, 3,3 V'u geçemez".
- **Küçük (uygulandı):** doğruluk garantisinin 1,12 A'de bittiği notu; INA180 giriş akımı 0,1 µA yalnız alçak tarafta (şönt toprak tarafında çizilsin; yüksek tarafta tipik 80 µA); şönt toleransı ek notu; "ideal voltmetre" benzetmesi çıkarıldı; "paralel" kelimesi kaldırıldı (yeni örnekte yok); LM358 I_IB koşulu ve "0,1 mV verirsek 10 V alırız denmez" (ofset) uyarısı.
- **İkinci tur (değişen kısımlar):** kritik ve önemli yok; 5 küçük bulgu (bölüm 9'daki iki eski cümle, bölüm 10'daki 2 mA → 3 mA, örnek 2'de halka sırası ve anahtar etiketi, yorum sorusunda yük bağlantısı) düzeltildi.
- **Açık kalan (küçük):** LM358 A_OL sütun ataması PDF tablosunda gözle bakılarak teyit edilsin (Uzun Video Ajanı ekrana koymadan önce); INA180 V_OUT denklemi datasheet'te görsel denklem, pakette kazanç tanımından yazıldı (9.2.2 sayılarıyla tutarlı).
