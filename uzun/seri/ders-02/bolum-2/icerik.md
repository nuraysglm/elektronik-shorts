# İçerik paketi — Devre Teorisi I: Ders 2 - Bölüm 2/3

Hazırlayan: İçerik Ajanı (ICERIK.md), kredi sprinti çalışması, 21.11.2026. Sürüm 3 (iki tur bağımsız denetimden sonra düzeltildi; bkz. "Denetim" başlığı, dosyanın sonunda).
Doğrulama: `icerik_dogrula.py` (çalıştırıldı, "TÜM KONTROLLER GEÇTİ"; özet bölüm 7'de).
Durum: bu bölümün metni (`metin.md`) henüz yazılmadı; bu yüzden `inceleme.md` yok. Bölümleme `uzun/seri/ders-02/plan.md` "Bölüm 2/3" ile aynıdır.
Not: 19.11.2026'da bir önceki İçerik Ajanı çalışması `claude/icerik-2-2-20261119` dalında bir taslak bırakmıştı (main'e girmedi). Bu paket o taslağın fikirlerinden (INA180 + LM358, anahtarlı örnek, şönt seçimi) yararlanır, ama **transkript ve datasheet'ler bu çalışmada yeniden okundu**; hata kartı, sayısal örnekler ve yorum sorusu yeniden kuruldu (Bölüm 1 ve 3 ile tekrar/çakışma olmasın; yeni soru kuralı).

## 1. Künye

- **Ders / bölüm:** Ders 2 - Bölüm 2/3.
- **Konu:** Bağımsız gerilim kaynağı; bağımlı gerilim kaynağı ve eşkenar dörtgen sembolü; bağımlılık türleri (bir gerilime ya da bir akıma bağlı; doğrusal k × v_x; doğrusal olmayan yalnızca adıyla); neden çalışılır (satın alınmaz, kuvvetlendiriciyi modeller); kontrol eden ve kontrol edilen taraf; kuvvetlendirici = bir işaretin ölçeklenmiş kopyası. **Uygulamada:** "Gerçek bir kuvvetlendirici, bağımlı kaynağın hangi sözünü tutar?" (TI INA180A2 akım ölçme kuvvetlendiricisi, TI LM358 işlemsel kuvvetlendirici).
- **Razavi transkripti:** Ders 2 (videoId `Hd0ZTXM572U`), **[15:12–31:33]** (kanal sahibinin özel Drive klasörü, `1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`; 21.11.2026 baştan sona yeniden okundu; depoya kopyalanmadı).
  - [15:23–17:21] bağımsız gerilim kaynağı: "değeri devredeki başka hiçbir büyüklüğe bağlı değil", "kendiliğinden üretir"; [17:28–18:44] bağımlı gerilim kaynağı: "değeri başka bir büyüklüğe bağlı"; karışmasın diye ayrı sembol: eşkenar dörtgen içinde + ve − [18:11–18:36]; [18:44–20:12] bağımlılık: doğrusal k × v_x (v_x devrenin başka yerinde iki nokta arasındaki gerilim; kaynak "başka bir yere bakar" [19:22]); k 1'den büyük ya da küçük olabilir [19:31–19:40]; k × v_x² olabilir; bir akıma da bağlı olabilir [19:48–20:12]; [20:12–21:08] "abartma" fikri ve robot benzetmesi (**kullanılmaz**); [21:08–22:40] neden: satın alınmaz [21:15–21:24], daha karmaşık devreleri modeller; örnek: kuvvetlendirici, işlemsel kuvvetlendirici dersin sonuna doğru [21:24–22:40]; [22:47–28:01] örnek 1: 3·v1 ve −5·v1 kaynakları, i–v1 doğruları (**kullanılmaz**); [25:19–25:43] "kontrol eden kaynağın bir yere bağlı olmaması kafa karıştırmasın; o yalnızca iki nokta arasındaki gerilime bakar"; [28:08–31:27] örnek 2: mikrofon işareti × 10 = kuvvetlendirici (**kullanılmaz**, yalnızca fikir: "aynı şekil, daha büyük").
- **Tahmini süre:** 13–15 dk (metin ~1.800–2.100 kelime). "Uygulamada" **~3:30 (≤ ~550 kelime)**.
- **Önceki/sonraki bölümle bağ:** Bölüm 1: ideal gerilim kaynağı "uç gerilimi içinden geçen akıma bağlı değil", v–i'de yatay doğru; gerçek pil (iç direnç); anahtar eşdeğerlikleri. Bu bölüm: gerilim kendi akımına bağlı değil ama **devrenin başka bir yerindeki bir büyüklüğe bağlı olabilir**. Bölüm 3 (paketi hazır): akım kaynağı; bağımlı **akım** kaynakları orada da yalnızca adıyla. Bölüm 1'in "ideal model ne zaman yeter?" sorusu burada "bağımlı kaynak modeli hangi aralıkta geçerli?" olur.

## 2. Öğrenme hedefleri

Bu bölümün sonunda öğrenci:
1. Bağımsız ve bağımlı gerilim kaynağını tanımlar; sembollerini (daire / eşkenar dörtgen) ayırt eder.
2. Bir bağımlı kaynağın **kontrol büyüklüğünü** (v_x ya da i_x), **katsayısını** ve katsayının birimini söyler (gerilime bağlıysa V/V, birimsiz; akıma bağlıysa V/A = Ω).
3. Kontrol tarafı bağımlı kaynaktan etkilenmeyen bir devrede üç adımı uygular: kontrol büyüklüğünü bul, kaynağın değerini hesapla, yükün akımını Ohm yasasıyla bul; negatif katsayıda ve negatif akımda işareti referans yönüne göre yorumlar.
4. İdeal gerilimle kontrol edilen kaynağın kontrol uçlarından **akım çekmediğini**, gerilimi yalnızca "okuduğunu" açıklar; bağımlı kaynakla kontrol ettiği yer arasında tel olmasa da iki tarafın birbirine bağlı olduğunu (bağıntıyla) gösterir.
5. Bir kuvvetlendirici datasheet'inde kazancı (V/V ya da V/mV), çıkışın gidebildiği sınırı ve giriş akımını bulur; "bağımlı kaynak modeli bu girişte geçerli mi?" sorusunu sayıyla cevaplar.

## 3. Ön bilgi

- Ders 1 - Bölüm 1–3: akım i = dq/dt, referans yönü ve işaret; gerilim iki nokta arasında, + ve − ile; **açık devre yalnızca i = 0'ı, kısa devre yalnızca v = 0'ı garanti eder.**
- Ders 2 - Bölüm 1: ideal tel; ideal anahtar (açık = açık devre, kapalı = kısa devre); ideal gerilim kaynağı (akımı yük belirler); gerçek pilde iç direnç.
- Ohm yasası v = R × i (yalnızca direnç için).
- Ön ekler m, µ, n; **V/mV** bu bölümde ilk kez: 1 V/mV = 1000 V/V.

## 4. Kavramlar

| Kavram | Doğru tanım (öğrenci diliyle) | Birim / işaret kuralı | Geçerlilik sınırı |
|---|---|---|---|
| Bağımsız gerilim kaynağı | Gerilimi devredeki **başka hiçbir büyüklüğe bağlı olmayan** kaynak; değerini kendisi belirler (sabit de olabilir, zamanla değişen bir işaret de) [15:56–17:21]. Bölüm 1'deki ideal gerilim kaynağı budur. | Daire içinde + ve − (Bölüm 1). | İdeal modeldir; gerçek pilde iç direnç (Bölüm 1). |
| Bağımlı gerilim kaynağı | Gerilimi **devrenin başka bir yerindeki bir gerilime ya da akıma bağlı** olan kaynak [17:35–18:01], [19:57–20:12]. Kendi uçlarına ne bağlandığına göre değil, "baktığı" yere göre gerilim üretir [19:22–19:31]. | **Eşkenar dörtgen** içinde + ve −, yanında bağıntı (ör. "−4 v_x") [18:19–18:36]. Kontrol büyüklüğü şekilde **mutlaka** gösterilir: v_x'in + ve − uçları ya da i_x'in referans oku. | Bir **modeldir**; tek parça olarak satılmaz [21:15–21:24]. Gerçek karşılığı kuvvetlendiricidir ve modele ancak belli bir çıkış aralığında uyar (bölüm 5). |
| Gerilimle kontrol edilen gerilim kaynağı (İng. kısaltması VCVS; ekranda tam Türkçe adı) | v = k × v_x; v_x iki nokta arasındaki gerilim [19:00–19:40]. k 1'den büyük de, küçük de olabilir [19:31–19:40]; **negatif** de olabilir (Razavi'nin örneğinde [26:00–26:23]): o zaman işaret ters döner. | k birimsiz (V/V). | İdeal VCVS'nin kontrol uçlarından **akım geçmez**; kaynak yalnızca o iki nokta arasındaki gerilimi okur, kontrol uçlarının "bir yere bağlı görünmemesi" sorun değildir [25:19–25:43]. Gerçek kuvvetlendiricide giriş akımı küçüktür ama sıfır değildir (bölüm 5). |
| Akımla kontrol edilen gerilim kaynağı (CCVS) | v = r × i_x; i_x devrenin bir kolundaki akım [19:57–20:12] (Razavi yalnızca adıyla). | r'nin birimi **V/A = Ω**; ama r bir direnç **değildir** (direnç kendi akımıyla kendi gerilimini bağlar; r başka bir kolun akımıyla bu kaynağın gerilimini bağlar). i_x'in referans oku şekilde çizilir; ok ters çizilirse i_x'in, dolayısıyla v'nin işareti ters döner. | İdeal CCVS'nin kontrol kolu (akımı "okuduğu" yer) bir ideal tel gibidir: üzerinde gerilim düşmez, o kolun akımını değiştirmez. |
| Doğrusal olmayan bağımlılık | v = k × v_x² gibi bağıntılar da olabilir [19:48–19:57]. | — | Bu derste yalnızca adı geçer; hesap yok. |
| Kontrol eden / kontrol edilen taraf (üç adım kuralı) | Kontrol tarafı bağımlı kaynaktan etkilenmiyorsa (bu bölümdeki bütün devreler böyle): (1) kontrol büyüklüğünü bul, (2) kaynağın değerini hesapla, (3) kaynağın bağlı olduğu tarafı çöz. | — | Kontrol büyüklüğü kaynağın çıkışından da etkileniyorsa (geri besleme) denklemler birlikte çözülür: **ileride** (yalnızca adıyla, "işlemsel kuvvetlendiricide göreceğiz"). |
| Kuvvetlendirici (amplifikatör) | Bir işaretin (ses, sensör, video) **şeklini koruyup** ölçeklenmiş bir kopyasını üreten devre [30:46–31:14]. En basit modeli bir VCVS'dir: v_çıkış = A × v_giriş; A = kazanç [31:14–31:27]. İçi transistörlerle dolu bir devre, analizde tek bir bağımlı kaynakla temsil edilir [22:31–22:40]. Örnek (özgün): 20 mV'luk bir işaret, kazancı 50 olan bir kuvvetlendiricide 50 × 20 mV = 1 V olur. | A birimsiz (V/V); datasheet'lerde çoğu zaman V/mV (bölüm 5). | Model yalnızca çıkış, kuvvetlendiricinin gidebildiği sınırlar içinde kaldıkça geçerlidir; dışına çıkacak bir girişte çıkış sınıra "yapışır" (doyma: yalnızca sözlü, bir kez). |

## 5. Uygulamada: gerçek bir kuvvetlendirici bağımlı kaynağın hangi sözünü tutar? (zorunlu; ~3:30)

### 5a. Ana fikir (tek cümle)
İdeal bağımlı kaynak üç söz verir: **(1) çıkış = katsayı × kontrol büyüklüğü, (2) bu her değerde geçerli, (3) kontrol tarafından akım çekmem.** Gerçek bir kuvvetlendirici (1)'i belli bir doğrulukla, (2)'yi yalnızca **çıkışın gidebildiği aralıkta**, (3)'ü **neredeyse** tutar. Tasarımcı datasheet'te bu üç sözün sınırını okur.

### 5b. Datasheet karşılığı (21.11.2026'da sayfalar açılıp okundu)

| Parça | Datasheet değeri (koşuluyla) | Bağımlı kaynak modeliyle bağı | Ne işe yarar / not |
|---|---|---|---|
| **INA180A2** akım ölçme kuvvetlendiricisi — Texas Instruments, *INAx180 Low- and High-Side Voltage Output, Current-Sense Amplifiers*, **SBOS741H** (Nisan 2017, rev. Temmuz 2022) | **Kazanç G:** A1 = 20, **A2 = 50**, A3 = 100, A4 = 200 V/V (s. 8, Electrical Characteristics; Tablo 5-1 s. 4). **Kazanç hatası:** tipik ±%0,1, en çok **±%1**, koşul V_OUT = 0,5 V … V_S − 0,5 V, T_A = −40 … 125 °C (s. 8). **Besleme V_S:** 2,7 … 5,5 V (s. 7, 7.3). **Pozitif uca yaklaşma V_SP:** tipik V_S − 0,02 V, en kötü **V_S − 0,03 V** (R_L = 10 kΩ, toprağa; T_A = −40 … 125 °C; s. 8; 8.3.4 s. 18–19, sayfa gözle teyit edilsin: "pozitif uca en çok 30 mV" — yani çıkış en kötü durumda V_S'nin 30 mV altına kadar çıkabilir, V_S'yi geçemez). **8.4.2 (s. 19):** giriş farkı × kazanç bu sınırı aşarsa çıkış pozitif beslemeye olabildiğince yakın sürülür ve ölçüm doğru olmaz. **Giriş akımı I_IB:** 0,1 µA (V_SENSE = 0, V_IN+ = 0 V); 12 V ortak mod geriliminde tipik 80 µA (s. 8; 9.1.2 s. 22). | **VCVS:** v_çıkış = 50 × v_şönt; v_şönt, akımın geçtiği küçük bir direncin (şönt) uçlarındaki gerilim. Söz (1): ±%1 içinde. Söz (2): yalnızca 0,5 V … V_S − 0,5 V arasında garanti; V_S'yi hiç geçemez. Söz (3): şönt toprak tarafındayken 0,1 µA; ölçülen amperlerin yanında ihmal edilir. Ayrıca ideal bağımlı kaynak istenen her akımı verir; gerçek bir kuvvetlendiricinin çıkışından geçebilecek akımın da bir sınırı vardır (bu pakette sayı verilmez; yorum sorusunda kullanılır). | Pille çalışan bir cihazın, motorun, şarj devresinin **akımını** ölçmek: çıkış mikrodenetleyicinin analog girişine gider. Ders 1'de tanımlanan akım burada sayıya dönüşür. |
| **LM358** çift işlemsel kuvvetlendirici — Texas Instruments, *LMx58, LMx58x, LM2904x Industry-Standard Dual Operational Amplifiers*, **SLOS068AB** (Haziran 1976, rev. Ekim 2024), 5.7 *Electrical Characteristics: LM358, LM358A*, s. 10 | **Açık çevrim kazancı A_OL:** en az **25 V/mV**, tipik **100 V/mV** (V_S = 15 V, V_O = 1 … 11 V, R_L ≥ 2 kΩ, T_A = 25 °C); 0 … 70 °C'de en az 15 V/mV. **Giriş akımı I_IB:** tipik −20 nA, en çok −250 nA (V_O = 1,4 V, V_S = 5 V, 25 °C; eksi işaret akımın yönünü gösterir). **Besleme:** 3 … 30 V (5.3, s. 5). | **VCVS:** v_çıkış = A × (v₊ − v₋); 100 V/mV = 100 × 1000 = **100 000 V/V**. Model 10 V çıkış için yalnızca 10 V / 100 000 = **0,1 mV** giriş farkı ister (en az kazançla 10 / 25 000 = 0,4 mV). Kazanç **çok büyük ve belirsiz**: en az 25 000, tipik 100 000 (100 000 / 25 000 = **4 kat** fark). 1 mV fark için model 100 000 × 1 mV = 100 V der; 15 V'luk beslemede bu imkânsız: çıkış gidebildiği en yüksek değere (beslemenin biraz altına) yapışır. | Bu "açık" hâliyle doğrudan kuvvetlendirici olarak kullanılmaz; dirençlerle **geri besleme** içinde kullanılır (Razavi: işlemsel kuvvetlendirici dersin sonuna doğru [22:13–22:31]; ileride). |

**Okuma notu (dürüstlük):** Her iki PDF'te en az / tipik / en çok sütunları metin çıkarımında ayrışmıyor; atamalar tablo düzeninden çıkarıldı (LM358 5.7 tablosunda A_OL satırı "25 100" okunuyor; ayrı tablolarda LM158/LM258 için "50 100", LM358B için "70 140" düzeni aynı: en az, tipik; INA180'de 8.3.4'teki "en çok 30 mV" cümlesi V_SP atamasını doğruluyor). LM358 A_OL "en az 25 / tipik 100" ataması ekrana konmadan önce PDF tablosunda gözle bakılarak teyit edilsin (bölüm 10). Bu pakette LM358'in çıkış salınımı satırları (sütunları belirsiz) **kullanılmadı**.

**Okuma kuralı (öğrenciye):** Bir kuvvetlendiricinin datasheet'inde üç satıra bak: **(1) kazanç ve hatası, (2) çıkışın gidebildiği en uç değer, (3) giriş akımı.** Sonra kendi en büyük girişinle "kazanç × giriş" hesapla ve (2) ile karşılaştır.

### 5c. Tasarımcı hangi değere ne zaman bakar, hangi hata pahalıya patlar
- **Kazanç ve giriş aralığını seçerken → çıkış sınırı.** Bağımlı kaynak modeli sınır tanımaz; gerçek kuvvetlendirici tanır. **Pahalı hata:** en büyük akımda "kazanç × giriş" çıkış sınırını aşar; cihaz belli bir akımın üstünde hep aynı değeri okur. Bir koruma ya da pil yönetimi bu okumaya güveniyorsa aşırı akım fark edilmez. Doğrusu: en büyük girişte çıkışın, doğruluğun garanti edildiği aralıkta (INA180'de 0,5 V … V_S − 0,5 V) kaldığını hesapla (5d).
- **İşlemsel kuvvetlendiriciyi tek başına kullanırken → kazancın belirsizliği.** LM358'de kazanç parçadan parçaya en az 25 000 ile tipik 100 000 arasında: böyle bir kazanca güvenilerek "10 kat" bir kuvvetlendirici yapılamaz; dirençlerle geri besleme gerekir (ileride). (Paket içi, videoya girmez: LM358'in giriş ofset gerilimi tipik 3 mV, en çok 7 mV — 5.7, s. 10, 25 °C; bu, 10 V çıkış için gereken 0,1 mV'tan 3 / 0,1 = 30 kat büyük. Bu yüzden açık çevrimde "0,1 mV ver, 10 V al" pratikte kurulamaz.)
- **Kontrol tarafının yüklenmesi → giriş akımı.** İdeal modelde sıfır; INA180'de 0,1 µA (alçak taraf), LM358'de en çok 250 nA. mA–A düzeyinde ölçümde ihmal edilir; çok küçük akımlı, yüksek dirençli bir sensörde önem kazanır (ileride).
- Not: bu maddeler "En sık yapılan hata" etiketi **almaz** (bölüm 6'da tek hata); "tasarımda pahalıya patlayan hata" diye düz anlatılır.

### 5d. Mini tasarım örneği (tam hesaplı; özgün)
**Görev:** 3,3 V ile beslenen bir kartta bir motorun akımını (0 … 2 A) INA180A2 (G = 50) ile ölçeceğiz. Akım, motorun toprak tarafına konan küçük bir şönt dirençten geçer (alçak taraf; şemada şönt toprak tarafında çizilsin). INA180 şöntün gerilimini 50 ile çarpıp mikrodenetleyiciye verir. Şönt direnci ne olmalı? (3,3 V, 2,7 … 5,5 V besleme aralığının içinde.)

**Model:** v_şönt = R_şönt × i (Ohm), v_çıkış = 50 × v_şönt (VCVS); yani v_çıkış = 50 × R_şönt × i.

**(a) İlk deneme: R_şönt = 50 mΩ**
1. En büyük akımda şönt gerilimi: v_şönt = 2 A × 0,05 Ω = **0,1 V**.
2. Model: v_çıkış = 50 × 0,1 V = **5 V**.
3. Çıkış ne kadar yükselebilir? En kötü durumda beslemenin 0,03 V altına kadar: 3,3 − 0,03 = **3,27 V**; 3,3 V'u hiç geçemez.
4. 5 V, 3,3 V'tan bile büyük: **model bu akımda geçersiz**; çıkış beslemenin hemen altında takılır.
5. Takılma hangi akımda başlar? En kötü durumda 3,27 = 50 × 0,05 × i, yani i = 3,27 / 2,5 ≈ **1,31 A** (videoda "yaklaşık 1,3 A"; tipik tavanla 3,28 / 2,5 ≈ 1,31 A, kazanç hatası da biraz kaydırır). Bunun üstündeki bütün akımlar aynı okunur. (Doğruluk garantisi daha önce biter: (3,3 − 0,5) / 2,5 = 2,8 / 2,5 = **1,12 A**.)

**(b) Doğru seçim**
1. ±%1 doğruluk çıkış 0,5 V … V_S − 0,5 V arasında garanti; üst sınır 3,3 − 0,5 = **2,8 V**.
2. 50 × R_şönt × 2 A ≤ 2,8 V, yani R_şönt ≤ 2,8 / (50 × 2) = 2,8 / 100 = 0,028 Ω = **28 mΩ**.
3. Aşağı yuvarlayıp yaygın bir şönt değeri: **25 mΩ**.
4. Kontrol (üst uç): v_çıkış(2 A) = 50 × 0,025 × 2 = **2,5 V** ≤ 2,8 V → **model geçerli.** Alt uçta da aynı kontrol: çıkış 0,5 V'a i = 0,5 / (50 × 0,025) = 0,5 / 1,25 = **0,4 A**'de iner; ±%1 garantisi **0,4 … 2 A** arasında. Daha küçük akımları da ölçer, ama datasheet o bölgede ±%1 garanti etmez.
5. Okuma: her 1 A için çıkış 50 × 0,025 = **1,25 V** artar. Mikrodenetleyici 1,0 V okursa akım 1,0 / 1,25 = **0,8 A**.
6. Bedeli: şönt yükün yoluna küçük bir direnç ekler; 2 A'de uçlarında 2 × 0,025 = **50 mV** düşer (Bölüm 1'deki "gerçek tel" gibi küçük bir kayıp).

**Öğrencinin çıkaracağı kural:** "Bağımlı kaynak modeliyle hesapla (çıkış = kazanç × giriş), sonra en büyük (ve en küçük) girişte çıkışı datasheet'in sınırıyla karşılaştır. Sınırı aşıyorsa model artık geçerli değil: girişi (şöntü) ya da kazancı küçült."

Paket içi (ekrana konmaz): dışarıdan bakınca bütün düzen bir **CCVS**'dir: v_çıkış = (50 × 0,025 Ω) × i = 1,25 Ω × i (örnek 1 ile bağ; Uzun Video Ajanı isterse tek cümle). ±%1 kazanç hatası 1,0 V okumada akımı 0,792 … 0,808 A aralığına koyar (≈ ±8 mA); şönt toleransı da benzer katkı yapar. 0,4 A'in altındaki doğruluk ofset gerilimine bağlıdır (bu bölümün konusu değil). Şöntte ısınan güç 2² × 0,025 = 0,1 W (güç ileride; şönt yeterli güç değerinde seçilir).

## 6. En sık yapılan hata ve Doğrusu (bölümde tek)

- **En sık yapılan hata:** "Bağımlı kaynak, kontrol ettiği yere hiçbir telle bağlı değil; o hâlde iki taraf birbirini etkilemez. Soldaki anahtarı açıp kapamak sağdaki yükü değiştirmez." Yanlış sonuç (örnek 2): "anahtar açılınca da yük akımı 0 kalır".
- **Doğrusu:** Bağımlı kaynak kontrol ettiği yere telle değil, **bağıntıyla** bağlıdır: değeri, o iki nokta arasındaki gerilimi okuyup hesaplanır (−4 × v_x). Anahtar kapalıyken v_x = 0, kaynak 0 V, yük akımı 0; anahtar açıkken v_x = 3 V, kaynak −4 × 3 = **−12 V**, yük akımı **−6 mA** (okun tersine 6 mA). Anahtar sağ taraftaki akımı tamamen değiştirdi.
- **Gerekçe (gerçekten yaygın mı?):** Kaynağın kendisi bu karışıklığa karşı uyarıyor: Razavi kontrol eden kaynağın "hiçbir şeye bağlı olmadan orada durmasının kafa karıştırmaması gerektiğini", bağımlı kaynağın yalnızca o iki nokta arasındaki gerilime baktığını ve oraya bir şey bağlı olup olmamasını umursamadığını söyler [25:19–25:43]; plan.md bu noktayı vurgulanacak nokta olarak işaretledi. AGENT.md 2f-0 ("kaynağın kendisi uyarıyorsa") için yeterli. Ayrı bir eğitim araştırması künyesi doğrulanmadı; "araştırmalar gösteriyor" denmez.
- **Önceki kartlarla ilişki:** Ders 1 - Bölüm 2'nin kartı ("açık devrede akım yok, o hâlde gerilim de yok") bu bölümde **kart olmaz**; açık anahtarın uçlarında 3 V görünmesi yalnızca hatırlatma olarak (bir cümle) kullanılır. Bu bölümün yeni hatası "tel yok, etki yok"tur.
- **Kart önerisi (örnek 2'nin devresiyle aynı ekranda; anahtar önce kapalı, sonra açık):** kırmızı "En sık yapılan hata: İki taraf arasında tel yok, anahtar sağ tarafı etkilemez." Altında: "Anahtar açılınca da yük akımı 0 kalır (yanlış)". Yeşil "Doğrusu: Bağımlı kaynak gerilimi okur." Altında iki satır: "Kapalı: v_x = 0 V, kaynak −4 × 0 = 0 V, akım 0" · "Açık: v_x = 3 V, kaynak −4 × 3 = −12 V, akım −12 V / 2 kΩ = −6 mA" (satırlar alt alta; "·" ekrana konmaz).

## 7. Sayısal örnekler (özgün; hepsi `icerik_dogrula.py` ile doğrulandı)

Razavi'nin örnekleri (3·v1, −5·v1 ve i–v1 doğruları; mikrofon × 10) **kullanılmaz**; i–v_kontrol grafiği çizilmez. Sayılar Bölüm 1 (4,5 V / 1,5 kΩ; 1,5 V pil; 300 Ω) ve Bölüm 3 (6 V / 4 mA; 500 Ω / 2,5 kΩ) ile mümkün olduğunca çakışmayacak biçimde seçildi; kalan küçük rastlantılar (örnek 1'in 1,8 V'u ile Bölüm 3'teki NSI45025A'nın 1,8 V'u, yorum sorusunun 3 mA'i ile Bölüm 1 örnek 1'in 3 mA'i) farklı bağlamlarda ve zararsız (mini tasarımdaki 2,5 V ve 25 mΩ'luk şönt gerçek tasarımdan geliyor; Bölüm 3'ün 25 mA'iyle ilgisi yok).

1. **Akımla kontrol edilen gerilim kaynağı (CCVS):** Sol tarafta 5 V bağımsız kaynak ve 1 kΩ direnç tek bir halka; i_x, kaynağın + ucundan çıkıp 1 kΩ'dan geçen akım (ok bu kolun üstünde). Sağ tarafta değeri 360 Ω × i_x olan bağımlı kaynak (+ ucu üstte) ve 900 Ω yük; i_y, bağımlı kaynağın + ucundan çıkıp 900 Ω'dan geçen akım.
   - Adım 1: i_x = 5 V / 1000 Ω = 0,005 A = **5 mA**.
   - Adım 2: v_b = 360 Ω × 5 mA = 360 × 0,005 = **1,8 V** (ohm × amper = volt; 360 Ω bir direnç değil, katsayı).
   - Adım 3: i_y = 1,8 V / 900 Ω = 0,002 A = **2 mA**.
2. **Kontrol gerilimi bir anahtarın uçlarından (negatif katsayılı VCVS):** Sol tarafta tek halka: 3 V bağımsız kaynağın + ucu, 3 kΩ direnç, ideal anahtar ve kaynağın − ucu. v_x = **anahtarın uçları arasındaki gerilim**; + ucu anahtarın dirence bağlı ucu. Sağ tarafta değeri −4 × v_x olan bağımlı kaynak (+ ucu üstte) ve 2 kΩ yük; yük akımının oku bağımlı kaynağın + ucundan çıkacak yönde. Sol ve sağ taraf ortak toprak ya da ortak düğüm olmadan ayrı çizilir.
   - **Anahtar açık:** i = 0 (açık devre); direncin uçlarında 3000 Ω × 0 = 0 V, bu yüzden kaynağın 3 V'u anahtarın uçlarında: v_x = **3 V** (Ders 2 - Bölüm 1, örnek 1'deki gibi; KVL adı geçmez). v_b = −4 × 3 V = **−12 V**. Yük akımı −12 V / 2000 Ω = **−6 mA**: akım okun **tersine** 6 mA.
   - **Anahtar kapalı:** v_x = 0 (kısa devre). Sol taraftaki akım 3 V / 3000 Ω = **1 mA**; ama kaynak akıma değil gerilime bakar: v_b = −4 × 0 = **0 V**, yük akımı 0.
   - Ders: sol tarafta akım varken bağımlı kaynak sıfır, akım yokken −12 V. Belirleyen kontrol **gerilimidir** (bölüm 6: bağımlı kaynak gerilimi okur); iki taraf arasında tel olmaması bunu değiştirmez.
3. **Gerçek parçalar (5b) ve mini tasarım (5d):** LM358: 100 V/mV = 100 000 V/V; 10 V için 0,1 mV (en az kazançla 0,4 mV); 4 kat; 1 mV için model 100 V. Kuvvetlendirici fikri: 50 × 20 mV = 1 V. Mini (a): 0,1 V; 5 V; 3,27 V; ≈ 1,31 A (betik 1,308); 1,12 A. Mini (b): 2,8 V; 28 mΩ; 25 mΩ; 2,5 V; 0,4 A (alt sınır); 1,25 V/A; 0,8 A; 50 mV.

`icerik_dogrula.py` çıktısı (21.11.2026): 46 kontrolün hepsi geçti, son satır "TÜM KONTROLLER GEÇTİ" (paket içi sayılar ve yorum sorusu dahil).

## 8. Yorum sorusu (Soru Çözümü videosu için; ICERIK.md 3/8)

**Soru metni (seslendirmeye uygun):** "Solda 4 voltluk bir kaynak ve 1,6 kiloohmluk bir direnç tek bir halka oluşturuyor; i_x, kaynağın artı ucundan çıkıp dirençten geçen akım. Ortada, değeri 320 ohm çarpı i_x olan, akımla kontrol edilen bir gerilim kaynağı var; artı ucu üstte. Uçlarına 2 kiloohmluk bir direnç bağlı; bu direncin gerilimine v_y diyelim, artı ucu üstte. Sağda, değeri eksi k çarpı v_y olan, gerilimle kontrol edilen bir kaynak var; artı ucu üstte ve 1 kiloohmluk bir yükü sürüyor. Yük akımının oku bu kaynağın artı ucundan dışarı çıkıyor. Bu son kaynak aslında gerçek bir kuvvetlendirici: çıkış gerilimi yalnızca eksi 5 volt ile artı 5 volt arasında olabilir ve çıkışından iki yönde de en çok 3 miliamper akım geçebilir. (a) k = 4,5 iken model yük akımı için ne der; model bu durumda geçerli mi? (b) Model geçerli kalsın diye k en çok kaç olabilir?"

**Tahtaya yazılacak kısa hâli (satırlar alt alta; kelime yerine işaret yok):**
- Sol halka: 4 V kaynak ve 1,6 kΩ (akım i_x, kaynağın + ucundan çıkan)
- Kaynak 1: 320 Ω × i_x (+ ucu üstte), uçlarında 2 kΩ (gerilimi v_y, + ucu üstte)
- Kaynak 2: −k × v_y (+ ucu üstte), yük 1 kΩ (akımın oku + ucundan çıkıyor)
- Kuvvetlendirici sınırları: çıkış −5 V ile +5 V arasında; çıkış akımı iki yönde de en çok 3 mA
- (a) k = 4,5 için yük akımı? Model geçerli mi?
- (b) k en çok kaç?

**Tam çözüm:**
1. i_x = 4 V / 1600 Ω = 0,0025 A = **2,5 mA**.
2. Kaynak 1: v_1 = 320 Ω × 2,5 mA = 320 × 0,0025 = **0,8 V**. 2 kΩ doğrudan bu kaynağın uçlarına bağlı, + uçları aynı tarafta → v_y = **0,8 V**. (2 kΩ'dan geçen 0,8 / 2000 = 0,4 mA cevabı etkilemez; kaynak 2 akıma değil v_y'ye bakar.)
3. (a) v_2 = −4,5 × 0,8 V = **−3,6 V**: −5 … +5 V aralığında, gerilim sınırı tutuyor. Yük akımı i = −3,6 V / 1000 Ω = **−3,6 mA**: okun tersine 3,6 mA. Bu akım yükten kuvvetlendiriciye giriyor; sınır iki yön için de 3 mA: 3,6 mA > 3 mA → **model geçersiz** (çıkış gerilimi sınırın içinde olduğu hâlde).
4. (b) İki şart birden: gerilim |−k × 0,8 V| ≤ 5 V → k ≤ 5 / 0,8 = **6,25**; akım |−k × 0,8 V| / 1000 Ω ≤ 3 mA → |k × 0,8 V| ≤ 3 V → k ≤ 3 / 0,8 = **3,75**. İkisinin küçüğü: **k en çok 3,75** (önce akım sınırı devreye girer). Kontrol: k = 3,75 → v_2 = −3,75 × 0,8 = −3 V, akım −3 V / 1 kΩ = −3 mA (tam sınırda).

**Cevap:** (a) Model −3,6 mA der (okun tersine 3,6 mA), ama bu 3 mA sınırını aştığı için **model geçersiz**; (b) **k en çok 3,75**.

**Zorluk gerekçesi (neden orta–üst):** Üç kavramı zincirler (CCVS'nin ohm birimli katsayısı, VCVS'nin negatif katsayısı, gerçek kuvvetlendiricinin iki ayrı sınırı); 4 adım. Asıl tuzak: öğrenci yalnızca gerilim sınırına bakıp (a)'da "−3,6 V, sınırın içinde, geçerli" ve (b)'de "6,25" der; doğru cevap için iki sınırın hangisinin önce devreye girdiğini bulmak gerekir. Ek tuzaklar: negatif çıkışta sınırın mutlak değerle kontrolü, 2 kΩ'un akımı (çeldirici), mA–A dönüşümü. Yalnızca bu bölüme kadar anlatılanlarla (Ohm, üç adım kuralı, Uygulamada'daki "gerçek kuvvetlendiricinin sınırları") çözülür; KVL gerekmez. (Akım sınırı Uygulamada'da sayıyla anlatılmadı; soruda açıkça veriliyor, kavramı "çıkışın gidebildiği sınır" fikrinin uzantısıdır.)

**Sık yapılacak yanlışlar:** (1) Yalnızca ±5 V'a bakmak: (a) "geçerli", (b) "6,25". (2) Birim karışıklığı: 320 × 2,5 = 800 "V". (3) İşareti atıp yönü söylememek. (4) 2 kΩ'un akımını (0,4 mA) kaynak 2'nin kontrolüne katmak.

**Soru bankası satırı (öneri; `uzun/seri/soru-bankasi.md` main'de henüz yok — dosya oluşturulmadı, normal günlük İçerik Ajanı çalışmasının "İlk iş"i):** `| D2B2 | Ders 2 - Bölüm 2 | Zincir bağımlı kaynaklar ve gerçek kuvvetlendiricinin iki sınırı (4 V, 1,6 kΩ; 320 Ω × i_x; −k × v_y; ±5 V, 3 mA) | orta–üst | önerildi (çözüm Drive "Soru Bankası – Çözümler"e yazılacak) |`. Çözümün kendisi bu pakette (metin onayı için gerekli); soru bankası kurulunca çözüm Drive'a taşınır.

## 9. Kapsam dışı / sonraya bırakılan

- **Bağımlı akım kaynakları** (gerilim ya da akım kontrollü) ve **bağımsız akım kaynağı**: Bölüm 3 / ileride. Dört bağımlı kaynak tablosu verilmez; yalnızca VCVS ve CCVS. İstenirse tek cümle: "akım kaynaklarını sonraki bölümde göreceğiz".
- **İşlemsel kuvvetlendirici devreleri, geri besleme:** yalnızca adı ("dersin sonuna doğru"; Razavi [22:13–22:31]).
- **Transistörün bağımlı kaynakla modellenmesi:** anılmaz (Bölüm 3'te akım kaynağı için adıyla geçer).
- **Doyma** kelimesi yalnızca sözlü ve bir kez. **Ofset gerilimi, bant genişliği, CMRR, dB, ortak mod gerilimi:** anılmaz.
- **KVL, seri dirençler, gerilim bölücü:** Ders 3. Bu yüzden örneklerde kontrol büyüklüğü ya tek halkalı bir devreden (Ohm yasası) ya da bir anahtarın uçlarından alınır.
- **Güç (p = v × i), şöntün ısınması:** ileride.
- **Yüksek taraf / alçak taraf ölçüm:** yalnızca bir kez, adıyla (mini tasarımda şönt toprak tarafında).
- **Doğrusal olmayan bağımlılık (k × v_x²):** yalnızca adı.

## 10. Uzun Video Ajanı'na notlar

- **Parça önerisi (7 parça, ~14 dk):** (1) dersin girişindeki soru + intro kartı: "Sağdaki devre soldakine hiçbir telle bağlı değil. Soldaki anahtarı açarsak sağdaki yükün akımı değişir mi?" (bölümün hatasını soru olarak sorar, AGENT.md 2b-2; cevabı P4'te: evet, 0'dan −6 mA'e) (~0:40); (2) Bölüm 1'den köprü: bağımsız kaynak (~1:00); (3) bağımlı gerilim kaynağı: tanım, eşkenar dörtgen, kontrol büyüklüğü, VCVS ve CCVS, katsayının birimi, üç adım + örnek 1 (~3:30); (4) örnek 2 (anahtarlı, negatif katsayı, açık/kapalı) + "En sık yapılan hata" aynı devrede (~3:00); (5) kuvvetlendirici: ölçeklenmiş kopya, VCVS modeli, 20 mV × 50 = 1 V (mikrofon değil) (~1:30); (6) **Uygulamada** (~3:30); (7) "Bilmen gerekenler" + yorum sorusu + kapanış (~1:00).
- **"Uygulamada" akışı (~550 kelime):** (a) üç söz (~25 sn); (b) INA180 satırı: kazanç 50, doğruluk 0,5 V … V_S − 0,5 V'ta, çıkış beslemeyi geçemez, giriş akımı 0,1 µA (~40 sn); (c) LM358: 100 V/mV = 100 000, 10 V için 0,1 mV; en az 25 000 (4 kat) (~40 sn); (d) mini tasarım (a) ve (b) adım adım, 0,4 A alt sınırı dahil (~100 sn); (e) kural + köprü (~20 sn). **Videoya girmez:** ±8 mA, eşdeğer CCVS 1,25 Ω (isteğe bağlı tek cümle), 80 µA, 15 V/mV, şönt gücü, LM358 ofseti.
- **Telif / özgünlük:** Razavi'nin robot benzetmesi, örnek 1 (3·v1, −5·v1, i–v1 doğruları) ve mikrofon × 10 **kullanılmaz**. Kuvvetlendirici fikri için kendi örneğimiz: şönt gerilimi (milivoltlar → voltlar) ve 20 mV × 50.
- **Seslendirme:** "VCVS/CCVS" seste okunmaz: "gerilimle kontrol edilen gerilim kaynağı", "akımla kontrol edilen gerilim kaynağı"; ekranda da tam ad (AGENT.md 2d-5). "INA180", "LM358" seste "bir akım ölçme kuvvetlendiricisi", "yaygın bir işlemsel kuvvetlendirici"; parça adı ekranda küçük gri kaynak satırında. "V/mV" seste "volt bölü milivolt", "V/V" seste "volt bölü volt", "mΩ" seste "miliohm". "v_x" seste "v iks" ("ve" ile karışmasın; ilk geçişte "kontrol gerilimine v iks diyelim"). "Şönt" ilk geçtiği yerde: "akımı ölçmek için yola konan çok küçük bir direnç".
- **İfade dikkati:**
  - "Bağımlı kaynak satın alınamaz" (Razavi [21:15–21:24]) denince hemen ardından "ama her kuvvetlendiricinin içinde onu buluruz" denmeli.
  - "Bağımlı kaynak enerji üretmez" gibi kaynaksız iddialar yok.
  - Katsayı r için "birimi ohm ama bu bir direnç değil" cümlesi söylensin.
  - Negatif akım: "−6 mA, yani okun tersine 6 mA" — ikisi birlikte.
  - "Doyma" kullanılırsa tek cümle: "çıkış gidebildiği sınıra yapışır; buna doyma denir".
  - INA180 için "çıkış en çok 3,27 V" **denmez**; doğrusu "en kötü durumda bile 3,27 V'a kadar çıkabilir, 3,3 V'u geçemez".
  - "Kanca" kelimesi hiçbir yerde kullanılmaz (7a-6).
- **Ekran:** eşkenar dörtgen ile daire yan yana, ikisinde de + ve −. Kontrol büyüklüğü (v_x'in uçları ya da i_x oku) **bağımlı kaynakla aynı renkte** (ör. ikisi de mavi), bağımsız kaynak siyah (7a-4). Örnek 2'de sol ve sağ devre **ortak toprak ya da ortak düğüm olmadan** ayrı çizilsin (kartın "tel yok" iddiası çizimde de doğru olsun). Örnek 2'de anahtar ilk geçtiğinde "Açık anahtar (kontak ayrık, akım yok)" / "Kapalı anahtar (kontak birleşik, iletiyor)" (Bölüm 1 ile aynı etiket). Datasheet tabloları kopyalanmaz; kendi tablomuz: "söz | ideal bağımlı kaynak | INA180 | LM358". Kaynak satırı: "TI INA180 datasheet (SBOS741H, 2022)", "TI LM358 datasheet (SLOS068AB, 2024)". Mini tasarım grafiği çizilecekse: yatay eksen akım 0 … 2 A, dikey eksen 0 … 5,5 V (5 V noktası sınıra yapışmasın, 2e-1); 50 mΩ modeli gri kesikli, gerçek çıkış (yaklaşık 1,3 A'den sonra yatay, 3,27 … 3,3 V) kırmızı, 25 mΩ doğrusu mavi (0 … 2,5 V); besleme 3,3 V ve doğruluk sınırları 2,8 V / 0,5 V ince yatay **kesikli** çizgiler, farklı renk ve etiketle (7a-4, 7a-7); doğrular formülden hesaplanır (2e-2).
- **Görsel doğrulama (zorunlu, ekrana koymadan önce):** LM358 A_OL "en az 25 / tipik 100 V/mV" sütun ataması PDF tablosunda (SLOS068AB 5.7, s. 10) gözle teyit edilsin; teyit edilemezse ekranda yalnızca "tipik 100 000" kalır, "en az 25 000 / 4 kat" çıkarılır (mini tasarım buna dayanmıyor). INA180 8.3.4'ün sayfası (s. 18 ya da 19) da teyit edilsin (yalnızca kaynak satırı için).
- **Sayılar:** her ara adım ekranda ve seste (AGENT.md 2b-7): özellikle "1 V/mV = 1000 V/V, o hâlde 100 V/mV = 100 000 V/V", "3,3 − 0,03 = 3,27 V", "3,27 / (50 × 0,05) = 3,27 / 2,5", "2,8 / (50 × 2) = 2,8 / 100 = 0,028 Ω = 28 mΩ", "0,5 / (50 × 0,025) = 0,4 A".
- **"Bilmen gerekenler" kartı (3 madde):** "Bağımlı kaynak: değeri başka bir büyüklüğe bağlı" · "Önce kontrol büyüklüğünü bul" · "Gerçek kuvvetlendirici: çıkış sınırını aşamaz". Açıklamaya dördüncü: "İdeal bağımlı kaynak kontrol tarafından akım çekmez". (Ekranda maddeler alt alta; "·" yalnızca bu notta ayırıcı.)
- **Ekrana taşınmayacaklar:** paketin düz metnindeki ve tablolarındaki "→" işaretleri ekrana aynen konmaz (7a-5, AGENT.md 2d-5); ekranda tam Türkçe cümle.
- **Tutarlılık:** Bölüm 1'deki çarpma işareti "×", referans yönü kuralı ("akım + ucundan dışarı"), anahtar etiketleri; Bölüm 3'teki "bağımlı akım kaynakları yalnızca adıyla" ile aynı.

## 11. Kaynaklar

- B. Razavi, *Basic Circuit Theory*, Ders 2 (UCLA), YouTube `Hd0ZTXM572U` [15:12–31:33]; transkript kanal sahibinin özel Drive klasörü (`1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`), 21.11.2026 okundu.
- Texas Instruments, *INAx180 Low- and High-Side Voltage Output, Current-Sense Amplifiers*, SBOS741H (Nisan 2017, rev. Temmuz 2022): s. 4 (Tablo 5-1), s. 7 (7.1, 7.3), s. 8 (7.5 Electrical Characteristics), s. 18–19 (8.3.4; sayfa gözle teyit edilsin), s. 19 (8.4.1–8.4.2), s. 22 (9.1.2), s. 25 (9.2.2). https://www.ti.com/lit/ds/symlink/ina180.pdf (ürün sayfası https://www.ti.com/product/INA180/datasheet), 21.11.2026 okundu.
- Texas Instruments, *LMx58, LMx58x, LM2904x Industry-Standard Dual Operational Amplifiers*, SLOS068AB (Haziran 1976, rev. Ekim 2024): 5.3 (s. 5), 5.7 (s. 10). https://www.ti.com/lit/gpn/LM358, 21.11.2026 okundu.
- (19.11 taslağında kullanılan H. Ma, *Fundamentals of Electronic Circuit Design* §1.3 ve §8.1 atıfları bu çalışmada yeniden açılmadı; bu yüzden pakette **dayanak olarak kullanılmadı**. Eşkenar dörtgen sembolü Razavi [18:19–18:36]'ya, çıkış sınırı datasheet'lere dayanır.)

## Kaynakta düzeltme

Razavi transkriptinde [15:12–31:33] kavramsal bir hata bulunmadı. Notlar (bilgi; kanal sahibinin kararını gerektirmez, panelde kaynak onayı açılmadı):
1. [26:39–27:28] Razavi ikinci bağımlı kaynağın akımını önce "−5v1 / R1" yazar, sonra kendisi "R2 olmalı" diye düzeltir. Örnek videoda kullanılmıyor.
2. [15:32] "in-depend dent", [18:01] "circle" (circuit), [26:55] "r over r one": otomatik altyazı/konuşma sürçmeleri.
3. [17:13] "kendiliğinden üretir, devrede başka hiçbir şeyden etkilenmez": **ideal** bağımsız kaynak için doğru (gerçek pilin iç direnci Bölüm 1'de).
4. TI INA180 SBOS741H içinde küçük bir iç tutarsızlık: Electrical Characteristics tablosu V_OS'yi V_IN+ = 0 V'ta en çok ±150 µV verirken 9.2.2 metni (s. 25) aynı koşul için "en çok 125 µV" der (aynı bölümün örnek hesabı 150 µV kullanır). Ofset bu pakette kullanılmadığı için etkisi yok.
Datasheet'ler arasında çelişki yok. Belirsizlik: LM358 A_OL sütun ataması (bölüm 10).

## Denetim

Bağımsız denetçi (Agent aracıyla başlatılan, paketi görmemiş doktora düzeyi elektronik mühendisi rolünde bir alt ajan), 21.11.2026, iki tur. Yaptıkları: betiği çalıştırdı; bütün sayıları Python ile ayrıca hesapladı (hesap hatası yok); Razavi Ders 2 transkriptinin tamamını okuyup bütün zaman damgalarını ve atıfları karşılaştırdı; SBOS741H (INA180) ve SLOS068AB (LM358) PDF'lerini açıp her değeri, koşulu, sayfayı ve revizyonu doğruladı; Bölüm 1/3 paketleri, plan.md ve Ders 1 - Bölüm 2 ile tutarlılığa baktı.

- **Kritik:** iki turda da yok.
- **1. tur, önemli (6, hepsi düzeltildi):** (Ö1) yorum sorusunda referans yönleri tanımsızdı, cevap tek değildi → i_x, iki kaynağın + uçları, v_y kutbu ve yük akımının oku soruya ve tahtaya yazıldı. (Ö2) soru "orta"daydı ve k = 5 ile Razavi'nin −5·v1 kaynağına yakındı → k = 4,5 ve iki sınır (±5 V, 3 mA): doğru cevap için hangi sınırın önce devreye girdiğini bulmak gerekiyor (k en çok 3,75; yalnızca gerilime bakan 6,25 bulur). (Ö3) hata kartı Ders 1 - Bölüm 2'nin kartını tekrarlıyordu → yeni hata Razavi'nin uyarısına [25:19–25:43] dayanıyor: "tel yok, o hâlde iki taraf etkileşmez"; D1B2 kartı yalnızca hatırlatma. (Ö4) giriş sorusu hatayı soru olarak sormuyordu → "Sağdaki devre soldakine hiçbir telle bağlı değil; anahtarı açarsak yükün akımı değişir mi?". (Ö5) tahta hâlinde "→" ve "·" ayırıcı → satırlar alt alta, tam Türkçe. (Ö6) mini tasarım alt doğruluk sınırını (0,4 A) atlıyordu → adım 4'e hesabıyla eklendi.
- **1. tur, küçük (uygulandı):** INA180 sayfa numaraları (Tablo 5-1 s. 4; 8.3.4 s. 18–19 teyit notu), V_SP sıcaklık koşulu, LM358 okuma notunun ifadesi (ayrı tablolar), "beslemenin biraz altına yapışır", LM358 ofset notu (paket içi), örnek 1 sayıları (300 Ω / 750 Ω → 360 Ω / 900 Ω), "Kaynakta düzeltme" 1 zaman damgası [26:39–27:28], "yaklaşık 1,3 A", "→" ekrana taşınmaz notu.
- **2. tur, önemli (2, düzeltildi):** (Ö-A) 3 mA sınırı "verebilir" diye yalnız bir yönde okunabiliyordu (a'da akım kuvvetlendiriciye giriyor) → "çıkışından iki yönde de en çok 3 mA". (Ö-B) 0,4 A bölüm 10'da "videoya girmez" listesindeydi ve sonraki adımın sayısıyla hesaplanıyordu → listeden çıkarıldı, hesap yerinde yazıldı.
- **2. tur, küçük (uygulandı):** kaynak listesindeki sayfalar eşitlendi; kartın yanlış sonucu sayıyla ("yük akımı 0 kalır"); örnek 2'de iki taraf ortak toprak olmadan çizilsin notu; Uygulamada'ya "çıkış akımının da sınırı var" cümlesi (sayısız); sayı rastlantıları notu; iki atıf/ifade düzeltmesi.
- **Açık kalan (küçük):** LM358 A_OL "en az 25 / tipik 100" sütun ataması ve INA180 8.3.4 sayfası PDF'te gözle teyit edilsin (Uzun Video Ajanı ekrana koymadan önce; denetçi de metin çıkarımından aynı atamayı okudu). Hata için ayrı bir eğitim araştırması künyesi yok (dayanak Razavi'nin uyarısı).
- Genel değerlendirme (denetçi): teori, sayılar ve datasheet değerleri doğru; düzey birinci sınıfa uygun; yorum sorusu özgün ve orta–üst; Ö-A ve Ö-B düzeltilince paket metin yazımına hazır (bu iki düzeltme için ek tur gerekmedi; işlendiği kontrol edildi).
