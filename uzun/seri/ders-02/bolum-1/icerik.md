# İçerik paketi — Devre Teorisi I: Ders 2 - Bölüm 1/3

Hazırlayan: İçerik Ajanı (ICERIK.md), 19.11.2026. Sürüm 2 (bağımsız denetimden sonra düzeltildi; bkz. `## Denetim`).
Doğrulama: `icerik_dogrula.py` (çalıştırıldı, "TÜM KONTROLLER GEÇTİ"; özet bölüm 7'de).
Durum: bu bölümün metni (`metin.md`) ve ders planı (`uzun/seri/ders-02/plan.md`) henüz yazılmadı; bu yüzden `inceleme.md` yok. Aşağıdaki bölümleme bir **öneridir**; ders planı Uzun Video Ajanı'nındır.

## 1. Künye

- **Ders / bölüm:** Ders 2 - Bölüm 1/3.
- **Konu:** Ders 1'in kısa tekrarı; ideal tel; ideal anahtar (açık = açık devre, kapalı = kısa devre) ve eşdeğerlikler; gerilim kaynağı sembolleri; ideal gerilim kaynağının tanımı ("gerilimi, içinden geçen akıma bağlı değildir"); gerçek pil ideal değildir. **Uygulamada:** "Gerçek tel, gerçek buton, gerçek pil: ideal model ne zaman yeter?"
- **Razavi transkripti:** Ders 2 (videoId `Hd0ZTXM572U`), **[1:26–15:12]** (kanal sahibinin özel Drive klasörü, `1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`; depoya kopyalanmadı).
  - Önerilen ders bölümlemesi (plan.md için öneri): **B1** [1:26–15:12] tel, anahtar, ideal gerilim kaynağı; **B2** [15:12–31:33] bağımsız ve bağımlı gerilim kaynakları, kuvvetlendirici modeli; **B3** [31:35–50:59] evirici (DC → AC) örneği, akım kaynağı, şarj cihazı, açık bırakılan akım kaynağı.
- **Tahmini süre:** 13–15 dk (metin ~1.800–2.100 kelime). "Uygulamada" **~3:30 (≤ ~550 kelime)**.
- **Önceki bölümle örtüşme (önemli):** Ders 1 - Bölüm 3 kısa devreyi ve ideal gerilim kaynağını zaten anlattı (paketinde TLV75533P regülatörü). Bu bölüm onu **tekrar etmez, derinleştirir**: (1) tel ve anahtarı "ideal eleman" olarak tanımlar, (2) ideal kaynağı **v–i grafiğinde yatay bir doğru** olarak gösterir (yeni bakış), (3) gerçek pili **iç direnciyle** ilk kez sayıyla gösterir (Ders 1 - Bölüm 3 paketi bunu "ileride" diye bırakmıştı).

## 2. Öğrenme hedefleri

Bu bölümün sonunda öğrenci:
1. İdeal telin direncinin sıfır kabul edildiğini ve bu yüzden (akım sonlu olduğu sürece) telin her iki noktası arasındaki gerilimin sıfır olduğunu (v = R × i = 0 × i = 0) gösterebilir.
2. Açık anahtar = açık devre (i = 0), kapalı anahtar = kısa devre (v = 0) eşdeğerliklerini kurar; her durumda **diğer büyüklüğü çevrenin belirlediğini** söyler.
3. İdeal gerilim kaynağını "uç gerilimi, içinden geçen akıma bağlı olmayan iki uçlu eleman" diye tanımlar; v–i grafiğinde yatay bir doğru olarak çizer; daire sembolü ile pil sembolü arasındaki farkı bilir.
4. Gerçek bir pilin uç geriliminin akım arttıkça düştüğünü, bunun nedenini (iç direnç) ve düşümün büyüklüğünü v = R_iç × i ile tahmin edebilir.
5. Bir tel, buton ya da pil datasheet'inden ilgili değeri (Ω/m, kontak direnci, akım değeri, iç direnç) okuyup "ideal model burada yeter mi?" sorusunu sayıyla cevaplar.

## 3. Ön bilgi

- Ders 1 - Bölüm 1: akım i = dq/dt (A).
- Ders 1 - Bölüm 2: referans oku; **açık devre yalnızca i = 0'ı garanti eder.**
- Ders 1 - Bölüm 3: gerilim iki nokta arasında, işaretiyle; **kısa devre yalnızca v = 0'ı garanti eder**; ideal kaynağın akımını yük belirler.
- Ohm yasası v = R × i (Razavi Ders 2 [3:07–3:33]); yalnızca direnç için geçerli.
- Ön ekler: m, µ, n, k; 1 ft = 0,3048 m (yalnızca tel hesabında; ekranda metreye çevrilmiş hâli).

## 4. Kavramlar

| Kavram | Doğru tanım (öğrenci diliyle) | Birim / işaret kuralı | Geçerlilik sınırı |
|---|---|---|---|
| İdeal tel | Direnci, kapasitansı ve endüktansı sıfır kabul edilen bağlantı (R = 0, C = 0, L = 0) [4:04–4:30]. R = 0 olduğu için tel üzerindeki **herhangi iki nokta arasındaki gerilim sıfırdır**: v = R × i = 0, akım ne olursa olsun (sonsuz olmadıkça) [4:47–5:18]. Yani ideal tel = iyi bir kısa devre [5:18–5:45]. | v = 0 (telin üzerindeki her iki nokta arasında). | **Bir modeldir.** Gerçek telin küçük bir direnci vardır (22 AWG bakır telde metre başına ≈ 0,053 Ω; bölüm 5). Büyük akımda ya da uzun telde bu direnç ihmal edilemez. C ve L yalnızca adıyla ("ileride"); bu bölümde hesaplanmaz. |
| İdeal anahtar — açık (kapalı değil) | Hiçbir şeyin geçemediği konum: **açık devre** [6:24–6:48]. Garanti: **i = 0** [7:26–7:33]. | Sembolde kol havada çizilir. Razavi "open = off" der [6:24–6:32]. | Açık anahtarın uçlarındaki gerilimi anahtar **söylemez**; çevredeki devre belirler [7:55–8:13]. Gerçek anahtarın açıkken bile çok büyük ama sonlu bir yalıtım direnci vardır (bölüm 5). |
| İdeal anahtar — kapalı | Direnci sıfır olan konum; tel gibi davranır: **kısa devre** [6:48–7:26]. Garanti: **v = 0** [7:33–7:55]. | "closed = on". | İçinden geçen akımı anahtar **söylemez**; çevre belirler [7:55–8:13]. Gerçek anahtarın küçük bir kontak direnci ve **en büyük akım/gerilim değeri** vardır (bölüm 5). |
| Eşdeğerlikler | **Açık devre = sıfır akım = kapalı olmayan (off) anahtar**; **kısa devre = ideal tel (R = 0) = kapalı (on) anahtar = sıfır gerilim farkı** [8:13–8:45]. | — | Bu eşdeğerlikler ileride devre çözümünde sürekli kullanılır (Razavi "remember these equivalencies"). |
| Gerilim kaynağı sembolleri | **Daire içinde + ve −** genel semboldür: gerilim sabit de olabilir, zamanla değişen de [9:00–9:55]. **Pil sembolü** (uzun ve kısa çizgiler) yalnızca **zamanla değişmeyen (sabit)** gerilim için kullanılır [9:40–10:04]. | Her kaynakta işaret (+/−) yazılır [9:16–9:32]. Pil sembolünde de + ve − **ayrıca yazılsın** (yaygın gösterimde uzun çizgi + uçtur; bu çalışmada onaylı bir kaynaktan sayfa doğrulanamadı, bu yüzden videoda bu kural sözle söylenmez, işaretler sembolün yanına yazılır). | Değişen bir gerilim pil sembolüyle çizilmez (bu derste ve çoğu kitapta). |
| İdeal gerilim kaynağı | **İki uçlu ve uç gerilimi, içinden geçen akıma bağlı olmayan eleman** [11:09–11:55]. Ona ne bağlarsak bağlayalım (1 kΩ, 100 Ω, 1 Ω…) uç gerilimi aynı kalır; değişen akımdır (i = V / R, Ohm yasası) [10:36–12:03]. Gerilim sabit de olabilir, zamanla değişen de; önemli olan **akıma bağlı olmaması** [12:10–12:19]. **v–i grafiğinde yatay bir doğrudur** (i: kaynağın + ucundan dışarı çıkan akım, referans oku çizilir; yeni bakış; Razavi'nin i–R hiperbolünden farklı, bkz. bölüm 10). | v (V) yatay doğru: her i değerinde aynı v. Akımın işareti/yönü bile uç gerilimini değiştirmez (kaynaktan akım çekmek de, içine akım itmek de). | **Model sınırı:** İdeal kaynağı kısa devre etmek çelişkidir (Ders 1 - Bölüm 3). Gerçek pilde uç gerilimi akım büyüdükçe düşer [12:28–12:54], [14:48–15:12]. "Belli bir akım aralığında görece ideal" sayılır [12:45–12:54]. |
| Gerçek pil (iç direnç) | Gerçek pil, **ideal bir kaynak ile ona bağlı küçük bir iç direnç** gibi davranır. İç dirençten akım geçince onun uçlarında v = R_iç × i kadar gerilim "kaybolur"; pilin uç gerilimi bu kadar düşer. (Bu model Thevenin eşdeğerinin ilk örneğidir; adı ileride.) | R_iç: ohm. Taze bir AA alkalin pilde 150–300 mΩ (Energizer E91 datasheet). v–i grafiğinde (i: + ucundan dışarı çıkan akım, yalnızca i ≥ 0) **aşağı eğimli doğru**: v = 1,5 − 0,3 × i (ör. i = 0 iken 1,5 V; i = 1 A iken 1,2 V). | R_iç sabit değildir: datasheet yalnızca "taze" pilin değerini verir; pil boşaldıkça büyüdüğü bu nottan anlaşılır (bu bölümde sabit alınır; sıcaklık etkisi anılmaz). İç direncin seri devre olarak kesin hesabı Ders 3'te (seri dirençler/KVL) yapılır; bu bölümde yalnızca **düşüm ≈ R_iç × i** kullanılır. |

## 5. Uygulamada: gerçek tel, gerçek buton, gerçek pil — ideal model ne zaman yeter? (zorunlu; 3–4 dk)

### 5a. Ana fikir (tek cümle)
Bu bölümdeki üç ideal eleman (tel, anahtar, gerilim kaynağı) gerçek parçalarda **küçük bir direnç**, **büyük ama sonlu bir yalıtım direnci** ve **bir iç direnç** olarak karşımıza çıkar; tasarımcı her birinde aynı soruyu sorar: **"Bu akımda, bu direnç üzerindeki gerilim (v = R × i) devrem için önemli mi?"** Önemsizse ideal model yeter.

### 5b. Datasheet karşılığı (gerçek parçalar; değerler sayfadan okundu)

| Parça | Datasheet değeri (koşuluyla) | İdeal modelle bağı | Ne işe yarar / not |
|---|---|---|---|
| **Alpha Wire 3071**, 22 AWG (7/30 örgülü) bağlantı teli — Alpha Wire, *Customer Specification*, ©2013 (RoHS sayfası 19.05.2017), s. 1 | **İletken DC direnci: 16,2 Ω / 1000 ft, 20 °C, nominal.** Metreye çeviri: 16,2 Ω / 304,8 m ≈ **0,0531 Ω/m**. Gerilim değeri 600 V RMS (yalıtım), sıcaklık −40 … 105 °C. Akım değeri **verilmiyor**. | İdeal tel R = 0 der. 20 cm'lik bir tel: 0,0531 × 0,20 ≈ **10,6 mΩ**. 10 mA'de uçlarında 10,6 mΩ × 10 mA ≈ **0,11 mV** → ideal tel modeli çok iyi. 2 A'de ≈ **21 mV** → hâlâ küçük ama artık ölçülebilir. | "Tel" de bir direnç: değeri uzunlukla artar. Büyük akımlı devrede (motor, şarj) telin kesiti bu yüzden kalın seçilir. "Akım değeri yok" notu önemli: telin taşıyabileceği akım ısınmaya ve ortama bağlıdır, ayrı tablolardan bakılır (ileride). |
| **PTS645** 6 mm dokunmatik (tact) buton, SPST, normalde açık — C&K (Littelfuse), *PTS645 Series 6 mm Tact Switches*, çizim sayfaları "14 Nov 22", "Specification" bloğu s. B–143 | **Kontak değeri: 50 mA, 12 V DC.** **Kontak direnci: en çok 100 mΩ (başlangıçta).** **Yalıtım direnci: en az 10¹¹ Ω** (PDF metninde "1011" olarak çıkıyor; üs biçimi görsel olarak doğrulanmalı, bkz. bölüm 10). Dielektrik dayanım: en az 250 V AC. Mekanik ömür: 100.000 basış. Çalışma sıcaklığı −40 … 85 °C. | **Kapalıyken = neredeyse kısa devre:** 50 mA'de uçlarında en çok 0,1 Ω × 50 mA = **5 mV**. **Açıkken = neredeyse açık devre:** 12 V'ta sızıntı akımı en çok 12 V / 10¹¹ Ω = **0,12 nA**. İkisi de ihmal edilebilir → ideal anahtar modeli yeter, **ama yalnızca 50 mA ve 12 V'a kadar.** | Buton bir "kullanıcı arayüzü" parçasıdır: bir mikrodenetleyici girişine sinyal verir (birkaç mA'den az). Yük akımını (motor, LED şeridi) **doğrudan** taşımak için değildir; bunun için butonun kontrol ettiği bir elektronik anahtar (MOSFET; ileride) kullanılır. |
| **Energizer E91** AA alkalin pil (Zn/MnO₂, IEC LR6) — Energizer, *Product Datasheet*, Form No. **E91NA0323**, s. 1 | **Anma gerilimi 1,5 V.** **İç direnç (nominal): 150 … 300 mΩ (taze pil).** Kapasite bir çubuk grafikle verilir (21 °C, 0,8 V'a kadar sürekli boşalma; 25/100/250/500 mA); sayısal değer metin olarak yok, bu yüzden pakette kullanılmadı. Çalışma sıcaklığı −18 … 55 °C. | **İdeal gerilim kaynağına yakın, ama yalnızca küçük akımda.** İç dirençteki düşüm v = R_iç × i: 10 mA'de 0,15 … 0,3 Ω × 10 mA = **1,5 … 3 mV** (1,5 V'un en çok %0,2'si) → ideal model yeter. 1 A'de **0,15 … 0,30 V** (en çok %20) → ideal model **yetmez**. | Razavi'nin "direnci küçülttükçe bir noktada pilin gerilimi düşer" sözünün [12:36–12:45] sayısal karşılığı. Datasheet'in "taze" notu: pil boşaldıkça iç direnç büyür; aynı cihaz eski pille daha erken "pil zayıf" uyarısı verir. |

**Kitap dayanağı (10 kat kuralı):** T. C. Hayes, P. Horowitz, *The Art of Electronics: Student Manual* (Cambridge UP, 1989), Bölüm 1 "Foundations", Class 1 "DC Circuits" notları: her gerçek kaynak yüklenince gerilimi "sarkar" ve bu, kaynağın iç (çıkış) direncine bağlıdır (Thevenin modeli tartışması, ≈ s. 8–9); tasarımda yükü süren kaynağın iç direncini, yükün direncinin **en çok onda biri** yapmak pratik kuraldır ve sonuç ideal durumdan yaklaşık %10 içinde kalır (≈ s. 13–14 ve s. 22). (Sayfa numaraları PDF metninden çıkarıldı; ±1 sayfa olabilir. Kitaptan metin, şekil veya soru alınmadı.)

**Okuma kuralı (öğrenciye):** Bir "ideal" elemanın gerçek parçasına bakarken iki şey sorulur: **(1) Direnci ne kadar (ya da iç direnci)? (2) En çok hangi akım/gerilimde kullanılabilir?** Sonra kendi akımınla v = R × i hesaplanır ve devrenin gerilimiyle karşılaştırılır.

### 5c. Tasarımcı hangi değere ne zaman bakar, hangi hata pahalıya patlar
- **Pil seçerken → iç direnç ve devrenin en büyük akımı.** Küçük akımda (sensör, saat, uzaktan kumanda) iç direnç önemsizdir. Büyük, ani akımda (motor kalkışı, kablosuz verici, fotoğraf flaşı) iç direnç uç gerilimini düşürür; cihaz "pil bitti" sanıp kapanabilir. Pratik kural: yük direnci iç direncin **en az 10 katı** olsun (Hayes & Horowitz). E91 için: 10 × 0,3 Ω = **3 Ω**. Tek tanım: "iç dirençteki düşüm ≈ R_iç × (ideal akım), pil geriliminin yüzdesi olarak". 3 Ω'da: ideal akım 1,5 / 3 = 0,5 A, düşüm ≈ 0,3 × 0,5 = 0,15 V, 0,15 / 1,5 = **yaklaşık %10**. Daha küçük yükte bu oran büyür.
- **Buton/anahtar seçerken → kontak değeri (akım ve gerilim).** Kontak direnci düşük diye her akımı taşıyacağı sanılmamalı. **Pahalı hata:** PTS645 ile 1 A'lik küçük bir motoru doğrudan açıp kapamak: 1 A / 50 mA = **20 kat** fazla. Buton, datasheet'in güvence verdiği sınırın dışında çalışır; kontaklar zarar görür ve buton kısa sürede bozulabilir. Doğrusu: buton yalnızca bir elektronik anahtarı kumanda eder.
- **Tel seçerken → uzunluk ve akım.** Masa üstü devrede (cm, mA) ideal tel varsayımı rahatça yeter. Uzun kablo ve büyük akımda (ör. 1 m'lik 22 AWG telden 5 A) telin kendi gerilim düşümü 0,0531 × 1 × 5 ≈ 0,27 V olur (yalnızca gidiş teli için); 1,5 V'luk bir pil devresinde bu çok büyüktür. (Bu sayı videoda kullanılmayacaksa yalnızca açıklamaya; bkz. bölüm 10.)
- Not: Bu maddeler "En sık yapılan hata" etiketi **almaz** (bölüm 6: videoda tek "En sık yapılan hata" var). "Tasarımda pahalıya patlayan hata" gibi düz bir ifadeyle anlatılır.

### 5d. Mini tasarım örneği (tam hesaplı; özgün)
**Görev:** Tek bir AA pil (Energizer E91), bir PTS645 buton ve 20 cm'lik 22 AWG tel ile bir yükü çalıştıracağız. İki yük deneyelim: (a) 150 Ω'luk bir yük, (b) 1,5 Ω'luk bir yük (küçük bir motor ya da ısıtıcı gibi). Her biri için: ideal model ne der, gerçek parçalar ne der?

**(a) 150 Ω'luk yük**
1. İdeal model (pil ideal kaynak, buton ve tel ideal): i = V / R = 1,5 V / 150 Ω = 0,01 A = **10 mA**.
2. Buton uygun mu? 10 mA ≤ 50 mA ve 1,5 V ≤ 12 V → **uygun.**
3. Gerçek parçalarda kaybolan gerilimler (v = R × i, en kötü değerlerle):
   - Pilin iç direnci: 0,3 Ω × 10 mA = **3 mV**.
   - Buton (kapalı): 0,1 Ω × 10 mA = **1 mV**.
   - Tel (20 cm): 10,6 mΩ × 10 mA ≈ **0,11 mV**.
   - Toplam ≈ 3 + 1 + 0,11 ≈ **4,1 mV**; 4,1 mV / 1500 mV ≈ **%0,27** (ideal akımla tahmin; bu kadar küçük düşümde tahmin ile kesin değer aynıdır).
4. Sonuç: **ideal model çok iyi.** Yük 150 Ω, pilin iç direncinin 150 / 0,3 = 500 katı (10 kat kuralının çok üstünde).

**(b) 1,5 Ω'luk yük**
1. İdeal model: i = 1,5 V / 1,5 Ω = **1 A**.
2. Buton uygun mu? 1 A / 50 mA = **20 kat fazla** → **uygun değil** (5c'deki pahalı hata).
3. Pilin iç direncinde kaybolan gerilim (ideal akımla tahmin): 0,3 Ω × 1 A = **en çok yaklaşık 0,3 V**; 0,3 V / 1,5 V = **yaklaşık %20**. (Gerçek akım 1 A'den biraz küçük olduğu için gerçek düşüm de biraz daha küçüktür; ama ideal modelin "hiç düşmez" tahmininden çok uzaktır.)
4. 10 kat kuralı: yük 1,5 Ω, en az 10 × 0,3 = 3 Ω olmalıydı → **sağlanmıyor.**
5. Sonuç: **ideal model yetmez.** Pilin uç gerilimi belirgin biçimde düşer; akım da 1 A'den az çıkar. (Kesin değer, paket içi bilgi, ekrana konmaz: seri dirençler Ders 3'te; i = 1,5 / (1,5 + 0,3) ≈ 0,83 A, iç dirençteki düşüm 0,3 × 0,833 = 0,25 V (%16,7), uç gerilimi ≈ 1,25 V.)

**Öğrencinin çıkaracağı kural:** "Tel, anahtar ve pil gerçekte küçük dirençler taşır. Akımı bu dirençle çarp (v = R × i); çıkan gerilim devrenin geriliminin yanında küçükse ideal model yeter. Pilde pratik kural: yük direnci, iç direncin en az 10 katı. Anahtarda ayrıca kontak değerine (en büyük akım) bak."

## 6. En sık yapılan hata ve Doğrusu (bölümde tek)

- **En sık yapılan hata:** "Pil her zaman aynı akımı verir." Yani pili sabit bir **akım** kaynağı sanmak. Yanlış sonuç: aynı pile 150 Ω da bağlansa 1,5 Ω da bağlansa "aynı akım geçer" demek; ya da direnç küçülünce akımın değil gerilimin değiştiğini sanmak.
- **Doğrusu:** (İdeal) gerilim kaynağı **gerilimi** sabit tutar; **akımı bağlanan yük belirler**: i = V / R. 150 Ω'da 1,5 / 150 = 10 mA, 1,5 Ω'da 1,5 / 1,5 = 1 A; ikisinde de uç gerilimi (ideal modelde) 1,5 V. Gerçek pilde gerilim de büyük akımda biraz düşer (iç direnç), ama akım yine yüke göre değişir.
- **Gerekçe (gerçekten yaygın mı?):** Evet; fizik eğitimi araştırmasında iyi bilinen bir öğrenci yanılgısıdır: L. C. McDermott, P. S. Shaffer, "Research as a guide for curriculum development: An example from introductory electricity. Part I: Investigation of student understanding", *American Journal of Physics* 60(11), 994–1003 (1992), doi:10.1119/1.17003. (Künye ComPADRE kaydından doğrulandı; "pil, devreden bağımsız olarak sabit akım verir" inancının makalede bildirildiği Helsinki Üniversitesi ders özetinden doğrulandı; makalenin kendi metni açılamadı, sayfa numarası verilmedi.) Razavi de tanımı tam bu ayrım üzerine kurar: pil "bağlanan direnç 1 kΩ, 100 Ω ya da 1 Ω olsa da 1,5 V" verir, akım ise Ohm yasasıyla değişir [10:36–12:03]. AGENT.md 2f-0 için yeterli.
- **Kart önerisi:** kırmızı "En sık yapılan hata: Pil her zaman aynı akımı verir." Yeşil "Doğrusu: Pil gerilimi sabit tutar; akımı yük belirler (i = V / R)." Altında iki satır: "150 Ω: i = 1,5 / 150 = 10 mA", "1,5 Ω: i = 1,5 / 1,5 = 1 A". Bu bölümün yeni katkısı kartta öne çıkarılsın: "Gerçek pilde büyük akımda gerilim de biraz düşer." (Ders 1 - Bölüm 3'ün "akımı yük belirler" mesajının tekrarı değil, gerçek pile uzantısı.)
- Ders 1 - Bölüm 3'ün hatası (açık/kısa devre karıştırma) bu bölümde tekrar kart olmaz; anahtar eşdeğerliklerinde yalnızca hatırlatılır.

## 7. Sayısal örnekler (özgün; hepsi `icerik_dogrula.py` ile doğrulandı)

1. **İdeal anahtarın iki durumu (Ders 1 - Bölüm 2'ye köprü):** 4,5 V ideal kaynak, 1,5 kΩ direnç ve bir anahtar seri. **Kapalı:** anahtar bir tel gibidir, uçlarında 0 V; direnç doğrudan kaynağa bağlanmış olur, uçlarında 4,5 V; akım i = V / R = 4,5 V / 1,5 kΩ = 3 mA. **Açık:** anahtar açık devredir, i = 0; direncin uçlarında v = R × i = 1,5 kΩ × 0 = 0 V, yani direnç akım taşımayan bir tel gibi davranır ve kaynağın 4,5 V'u anahtarın uçlarında görünür (Ders 1 - Bölüm 2'deki gibi; KVL adı geçmez). Her durumda anahtar bir büyüklüğü garanti etti (kapalı → v = 0, açık → i = 0), diğerini devre belirledi.
2. **İdeal ve gerçek kaynağın v–i grafiği:** İdeal 1,5 V kaynak: her akımda v = 1,5 V (yatay doğru). Gerçek pil (iç direnç 0,3 Ω, E91'in üst değeri): v = 1,5 − 0,3 × i. i = 0 → v = 1,5 − 0,3 × 0 = 1,5 V; i = 0,5 A → v = 1,5 − 0,3 × 0,5 = 1,5 − 0,15 = 1,35 V; i = 1 A → v = 1,5 − 0,3 × 1 = 1,2 V. Eğim: her 1 A için 0,3 V düşüş. (Grafik: ideal doğru mavi, gerçek pil kırmızı, ICERIK 7a-4.)
3. **Gerçek parçalar (5b) ve mini tasarım (5d):** tel 16,2 / 304,8 ≈ 0,0531 Ω/m, 20 cm ≈ 10,6 mΩ, 10 mA'de ≈ 0,11 mV, 2 A'de ≈ 21 mV; buton 0,1 × 0,05 = 5 mV, 12 / 10¹¹ = 0,12 nA; pil 10 mA'de 1,5–3 mV, 1 A'de 0,15–0,30 V; mini (a) 10 mA, toplam ≈ 4,1 mV (%0,27); mini (b) 1 A, 20 kat, 0,3 V (%20); 10 kat kuralı 3 Ω (bu sınırda düşüm ≈ 0,3 × 0,5 = 0,15 V, yaklaşık %10).

Ek (yalnızca paket içi bilgi, **ekrana konmaz**): mini (a) kesin akım 9,973 mA (ideal model hatası %0,27); mini (b) kesin akım 0,833 A, düşüm 0,25 V (%16,7), uç gerilimi 1,25 V; 10 kat sınırında kesin sapma 0,3 / 3,3 ≈ %9,1 (videoda yalnızca "yaklaşık %10" tek tanımı kullanılır).

`icerik_dogrula.py` çıktısı (19.11.2026): bütün assert'ler geçti, son satır "TÜM KONTROLLER GEÇTİ".

## 8. Yorum sorusu (cevabıyla)

*"9 V'luk ideal bir gerilim kaynağına sırayla 30 kΩ, 300 Ω ve 3 Ω'luk dirençler bağlıyoruz. Her durumda direncin uçlarındaki gerilim ve akım nedir? Gerçek bir 9 V pilde hangisinde ideal model en çok yanılır?"*
Cevap: İdeal kaynakta gerilim her üçünde de 9 V. Akımlar: 9 V / 30 kΩ = 0,3 mA; 9 V / 300 Ω = 30 mA; 9 V / 3 Ω = 3 A. Gerçek pilde iç dirençteki düşüm v = R_iç × i en büyük akımda en büyük olduğu için ideal model en çok **3 Ω**'da yanılır.

## 9. Kapsam dışı / sonraya bırakılan

- **Bağımlı kaynaklar, kuvvetlendirici modeli**: Bölüm 2. **Akım kaynağı**: Bölüm 3. Bu bölümde yalnızca "ideal gerilim kaynağı"; "bağımsız" kelimesi gerekirse adıyla, açıklaması Bölüm 2'de.
- **Seri dirençler, KVL, gerilim bölücü**: Ders 3. Gerçek pilin kesin akımı (0,83 A) ekrana konmaz; yalnızca "düşüm ≈ R_iç × i".
- **Thevenin eşdeğeri**: yalnızca adı ("ileride"), istenirse.
- **Telin kapasitansı ve endüktansı**: Razavi'nin dediği gibi yalnızca "ideal telde bunlar da sıfır"; ne oldukları ileride.
- **Kontak sıçraması (bounce), kıvılcım, MOSFET ile anahtarlama**: yalnızca adı ("ileride"). Telin akım taşıma kapasitesi (ısınma) tabloları: anılmaz.
- **Pil kimyası, kapasite (mAh) ve boşalma eğrileri**: anılmaz (kapasite Ders 1 - Bölüm 2 paketinde CR2032 ile kullanıldı).
- **Güç (p = v × i)**: Ders 2'nin sonraki konuları/ileride; "buton ısınır" diye yalnızca sözlü.

## 10. Uzun Video Ajanı'na notlar

- **Parça önerisi (7 parça, ~14 dk):** (1) kanca + intro kartı: "Pile 150 Ω da bağlasan 1,5 Ω da, aynı akımı mı verir?" (~0:40); (2) Ders 1 tekrarı, **kısa** (i = dq/dt, gerilim, Ohm) — Razavi de [2:06–3:41] tekrar eder; 60 sn'yi geçmesin, çünkü önceki üç bölümde anlatıldı; (3) ideal tel + ideal anahtar + eşdeğerlikler + örnek 1 (~3:00); (4) gerilim kaynağı sembolleri + ideal gerilim kaynağı tanımı + v–i yatay doğrusu + "En sık yapılan hata" (~3:00); (5) gerçek pil: iç direnç, v–i eğimli doğrusu, örnek 2 (~2:00); (6) **Uygulamada** (~3:30); (7) "Bilmen gerekenler" + yorum sorusu + kapanış (~1:00).
- **"Uygulamada" akışı (~550 kelime):** (a) soru: "ideal model ne zaman yeter?" ve v = R × i kuralı (~20 sn); (b) üç parça tablosu (tel, buton, pil) ekranda, seste her biri için **bir** sayı: tel 20 cm ≈ 10,6 mΩ, buton en çok 0,1 Ω ve en çok 50 mA, pil 0,15–0,3 Ω (~70 sn); (c) mini tasarım (a) ve (b) adım adım (~90 sn); (d) 10 kat kuralı + butonla motor sürme hatası + köprü cümlesi (~30 sn). **Kısaltma:** 5c'deki 1 m / 5 A tel örneği, yalıtım direnci (0,12 nA) ve 2 A tel hesabı videoya girmez ya da yalnızca ekrandaki tabloda kalır; açıklamaya yazılabilir. Tabloda kalan her sayının hesabı en az bir kez (formül + yerine koyma) gösterilir (AGENT.md 2b-7); bu yüzden tabloya yalnızca seste/ekranda hesaplanan sayılar konsun.
- **Telif / özgünlük:** Razavi'nin örneği (pil + ayarlı direnç, i1'in R1'e göre hiperbolü [12:54–15:12]) **kullanılmaz**. Onun yerine: ideal ve gerçek kaynağın **v–i grafiği** (yatay doğru / eğimli doğru) ve mini tasarımdaki iki yük. Hiperbol konusu (i ∝ 1/R) zaten Ders 1 - Bölüm 3 mini tasarımında 330/66/33 Ω tablosuyla göründü; tekrar edilmesin. Razavi'nin "pil 1 kΩ, 100 Ω ya da 1 Ω" cümlesi [10:45–10:53] aynen kullanılmasın; bizim sayılarımız 150 Ω / 1,5 Ω.
- **Seslendirme:** "AWG" seste "a-ve-ge" değil, "yirmi iki numara tel" (ekranda "22 AWG"). "mΩ" seste "miliohm"; "nA" "nanoamper"; "10¹¹ Ω" seste "yüz milyar ohm" (seste kullanılacaksa). "R_iç" seste "iç direnç". "PTS645", "E91", "3071" seste okunmaz; seste "altı milimetrelik bir buton", "bir kalem pil (AA alkalin)", "yirmi iki numara bir bağlantı teli". "SPST" söylenmez.
- **İfade dikkati:**
  - "Kapalı anahtar" = iletiyor (on); "açık anahtar" = iletmiyor (off). Türkçede "açmak" (ışığı açmak = iletmek) ile karışabilir: **ekranda ilk geçtiği yerde** "Açık anahtar (kontak ayrık, akım yok)" ve "Kapalı anahtar (kontak birleşik, iletiyor)" diye yazılsın; seste de bir kez söylensin. Bu, bölümün en büyük dil tuzağıdır.
  - "İdeal kaynak sonsuz akım verir" denmez (Ders 1 - Bölüm 3 notu).
  - "Pil 1,5 V'tur" yerine "pilin anma gerilimi 1,5 V; uç gerilimi akıma göre biraz değişir".
  - İç direnç için "pilin içinde gizli küçük bir direnç varmış gibi davranır" denebilir (model olduğu vurgulansın; pilin içinde gerçekten ayrı bir direnç parçası yoktur).
  - "Gerilim kaynağının akımı sıfırdır/sabittir" denmez; "gerilim kaynağı akımı **söylemez**, akımı yük belirler".
- **Ekran:** Datasheet tabloları kopyalanmaz (telif); kendi tablomuz: sütunlar "parça" | "ideal modeli" | "gerçek değeri" | "bu akımda v = R × i". Kaynak satırı küçük gri: "Energizer E91 datasheet (Form E91NA0323)", "C&K PTS645 datasheet (2022)", "Alpha Wire 3071 spec (2013)". v–i grafiği: yatay eksen i (A), dikey eksen v (V); ideal kaynak mavi yatay doğru, gerçek pil kırmızı eğimli doğru, noktalar 0 / 0,5 / 1 A'de etiketli (1,5 / 1,35 / 1,2 V). Eksen 0 … 1,6 V ve 0 … 1,1 A olsun ki 1 A noktası sınıra yapışmasın (AGENT.md 2e-1).
- **Görsel doğrulama (zorunlu, ekrana koymadan önce):** PTS645 yalıtım direnci PDF metninde "1011 Ω min." çıkıyor; bunun 10¹¹ Ω olduğu PDF'in kendisinde (s. B–143, "Specification") gözle doğrulanmadan ekrana yazılmasın. Doğrulanamazsa bu satır videodan çıkarılsın (mini tasarım bu değere dayanmıyor). Yalıtım direncinin test gerilimi datasheet'te yok; 12 V / 10¹¹ Ω = 0,12 nA hesabı yalnızca "kabaca" bir büyüklük göstergesidir.
- **Sayılar:** her ara adım ekranda ve seste (UZUN.md 0, AGENT.md 2b-7): özellikle "16,2 Ω / 304,8 m ≈ 0,0531 Ω/m", "0,0531 × 0,20 ≈ 0,0106 Ω = 10,6 mΩ", "3 + 1 + 0,11 ≈ 4,1 mV", "1 A / 50 mA = 20" ve "10 × 0,3 = 3 Ω" adımları atlanmasın. Ekranda kelime yerine işaret yok (7a-5).
- **"Bilmen gerekenler" kartı önerisi (ekranda 3 madde, AGENT.md 2f-2):** "Kapalı anahtar ve tel: gerilim sıfır" · "Gerilim kaynağı: akımı yük belirler" · "Gerçek pil: büyük akımda gerilim düşer". Açıklamaya dördüncü madde: "Açık anahtar: akım sıfır".
- **Ekrana taşınmayacaklar:** Paketin düz metnindeki "→" işaretleri ekrana aynen konmaz (7a-5, AGENT.md 2d-5). v–i grafiğinde referans oku ("i: + ucundan çıkan akım") çizilir; grafik yalnızca i ≥ 0. Razavi'nin [12:10–12:19] cümlesi alıntılanmaz (bkz. Kaynakta düzeltme 4).
- `inceleme.md` yok (metin yazılmadı).

## 11. Kaynaklar

- B. Razavi, *Basic Circuit Theory*, Ders 2 (UCLA), YouTube `Hd0ZTXM572U` [1:26–15:12] (bölümleme önerisi için tüm ders [1:26–50:59] okundu); transkript kanal sahibinin özel Drive klasörü (`1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`), 19.11.2026 okundu.
- Energizer, *Energizer E91 Specifications — Product Datasheet*, Form No. E91NA0323, s. 1. https://data.energizer.com/pdfs/E91_Max_NA.pdf (19.11.2026 okundu).
- C&K (Littelfuse), *PTS645 Series — 6 mm Tact Switches*, çizim sayfaları "14 Nov 22", Specification s. B–143. https://www.mouser.com/datasheet/2/240/pts645-3050759.pdf (19.11.2026 okundu; üreticinin kendi bağlantısı https://www.ckswitches.com/media/1471/pts645.pdf Littelfuse sitesine yönlendiriyor, otomatik erişimle açılamadı).
- Alpha Wire, *Customer Specification — Part No. 3071* (22 AWG 7/30, PVC), ©2013, s. 1. https://www.farnell.com/datasheets/2346075.pdf (19.11.2026 okundu; Farnell'in barındırdığı üretici belgesi). Not: ilk seçilen 3051/1 telinin DC direnci açık sayfalarda yok; bu yüzden 3071 kullanıldı.
- T. C. Hayes, P. Horowitz, *The Art of Electronics: Student Manual*, Cambridge University Press, 1989; Bölüm 1, Class 1 "DC Circuits" notları (≈ s. 8–9, 13–14, 22). Kanal sahibinin Drive'ı (`1DQ8z5bkHa9cNUx4lmmCYH4MlhdTn2_gM`); depoya kopyalanmadı.
- L. C. McDermott, P. S. Shaffer, *American Journal of Physics* 60(11), 994–1003 (1992), doi:10.1119/1.17003 — künye: https://www.compadre.org/portal/items/detail.cfm?ID=2722 ; yanılgının içeriği: Helsinki Üniversitesi ders özeti https://www.mv.helsinki.fi/home/aohamala/dfk/McDermott.pdf (ikincil kaynak).
- (Denendi, kullanılamadı:) M. Geier, *How to Diagnose and Fix Everything Electronic* (Drive `1ZL2383fkP0mnqrGYlSL4M1CT3LXs1ZzS`): 12,9 MB, Drive aracı yalnızca ilk bölümleri (≈ Bölüm 4'e kadar) verdi; anahtar (Bölüm 7) ve pil (Bölüm 14) kısımlarına ulaşılamadı. AoE Student Manual da (25 MB) yalnızca Bölüm 1–2'nin bir kısmına kadar okunabildi.

## Kaynakta düzeltme

Razavi transkriptinde [1:26–15:12] teknik bir hata bulunmadı. Hassaslık notları (hata değil):
1. [7:03] Transkriptte "audio switch" geçiyor; konuşmada kastedilen "ideal switch"tir (otomatik altyazı hatası, Razavi'nin değil).
2. [4:54–5:03] "R sıfırsa akım ne olursa olsun v sıfırdır, akım sonsuz olmadıkça": doğru; bu yüzden ideal teli ideal gerilim kaynağının uçlarına bağlamak çelişkidir (Ders 1 - Bölüm 3 paketindeki not).
3. [9:40–10:04] Pil sembolünün yalnızca sabit gerilim için kullanılması bir **gösterim alışkanlığıdır** (kurallar kitaba göre değişebilir); IEC 60617 vb. standartlar bu pakette açılıp doğrulanmadı, videoda "bu derste ve çoğu kitapta" diye söylenmesi yeterli.
4. [12:10–12:19] Altyazıda cümle "…given by the voltage source and not an independent of the current…" diye çıkıyor; kelimesi kelimesine "akımdan bağımsız değil" anlamına gelir ve tanımla çelişir. Konuşma sürçmesi ya da altyazı hatası; kastedilen "akımdan bağımsız"dır ([11:35–11:55] ve [12:03–12:10] bunu açıkça söyler). Videoda bu cümle alıntılanmaz.
Datasheet'ler arasında çelişki yok. Bir belirsizlik: PTS645 yalıtım direncinin üs biçimi (bkz. bölüm 10, görsel doğrulama). Panelde ayrı kaynak onayı açılmadı.

## Denetim

Bağımsız denetçi (Agent aracıyla başlatılan, paketi görmemiş doktora düzeyi elektronik mühendisi rolü), 19.11.2026. Yaptıkları: betiği çalıştırdı; bütün sayıları Python'da bağımsız yeniden hesapladı (hepsi doğru); Razavi Ders 2 transkriptindeki bütün zaman damgalarını karşılaştırdı (hepsi doğru, bölümleme önerisi uyumlu); E91, PTS645 ve Alpha Wire 3071 sayfalarını açıp değerleri doğruladı (hepsi doğru; PTS645 yalıtım direncinin üssü gözle doğrulanamadı, paketteki uyarı yerinde).

- **Kritik:** yok.
- **Önemli (4, hepsi düzeltildi):** (1) yüzdeler iki farklı tabana göre verilmişti (%9,1 / "%10'dan fazla" / "%20 yanlış") → tek tanım: "düşüm ≈ R_iç × ideal akım, pil geriliminin yüzdesi"; 3 Ω'da "yaklaşık %10". (2) 1,5 Ω örneğindeki 0,3 V düşüm kesin gibi sunulmuştu → "ideal akımla tahmin, en çok yaklaşık 0,3 V"; kesin değer (0,25 V, %16,7) yalnızca paket içi. (3) v–i grafiğinde akımın referans yönü yoktu → "i: + ucundan çıkan akım", yalnızca i ≥ 0. (4) Kaynaksız iddialar: "pil sembolünde uzun çizgi +" (videoda kural olarak söylenmez, işaretler yazılır), "iç direnç soğukta büyür" (çıkarıldı), "kontak kaynaşıp kapalı kalabilir / kıvılcım" (yumuşatıldı: "datasheet sınırı dışında, kontaklar zarar görür").
- **Küçük (uygulandı):** betiğe %0,27, %16,7, "yaklaşık %10", eğim ve yorum sorusu kontrolleri eklendi; örnek 1'in sayıları Ders 1 - Bölüm 3 ile aynıydı → 4,5 V / 1,5 kΩ; açık anahtar gerilimi KVL'siz gerekçelendirildi; hata kartında gerçek pil uzantısı öne çıkarıldı; parça sayısı (7) ve "Bilmen gerekenler" (3 madde) düzeltildi; "→" ekrana taşınmaz notu; sızıntı akımı "kabaca"; Razavi [12:10–12:19] dil sürçmesi "Kaynakta düzeltme"ye eklendi.
- **Açık kalan (küçük):** McDermott & Shaffer makalesinin kendi metni okunamadı (ikincil özet + künye); Hayes & Horowitz sayfa numaraları (≈ ±1) bağımsız doğrulanmadı; PTS645 10¹¹ Ω üssü görsel doğrulama bekliyor (Uzun Video Ajanı ekrana koymadan önce).
