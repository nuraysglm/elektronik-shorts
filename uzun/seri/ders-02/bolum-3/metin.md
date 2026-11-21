# Devre Teorisi I: Ders 2 - Bölüm 3/3 — Akım kaynağı

Kaynak: B. Razavi, Basic Circuit Theory, Ders 2 (UCLA) [31:35–50:53]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım, sayılar ve örnekler özgündür (`../plan.md`, `dogruluk.md`). Razavi'nin örnekleri kullanılmadı: elektrikli otomobil / motor eviricisi, saat işareti ve "büyük akım" gerekçesi [31:59–36:19]; v1–R1 doğrusu [40:38–42:10]; 2 V / 3 A devresi [42:24–44:38]; 3 V'luk şarj cihazı ile 1 V'luk pil ve "sonsuz akım" [46:08–46:47]; açık bırakılan i1 şekli [49:15–50:44]. **Dürüst not (yeniden denetim 21.11):** iki yerde Razavi'nin *fikri* (sayısı ya da şekli değil) kullanılıyor: (1) evirici ara hikâyesi: doğru gerilimden anahtarlarla ± gerilim elde etmek genel ders kitabı bilgisidir (H-köprüsü); kurgu, sayılar, kısa devre uyarısı ve kare dalga bizim; (2) Parça 5'teki "iki gerilim kaynağını telle bağlamak yerine akım kaynağıyla şarj" fikri [45:08–48:32]; bizim sürümümüz D2B1'in iç direnç fikriyle sayısal (0,1 Ω, 13 A) ve CC/CV + veri sayfası kısmı özgün.
**Kaynak notu kararı (onaylar/kaynak-2-3, kanal sahibi 20.11 08:28: "düzelt"):** evirici, Razavi'nin hikâyesi değil, **kendi kurgumuzla kısa bir ara hikâye** (≤ 1 dk, Parça 2'nin başı): 12 V akü, dört anahtarlı köprü, ±12 V; bizim eklediğimiz nokta: aynı koldaki (üst üste duran) iki anahtar birlikte kapanırsa akü kısa devre olur (Ders 1 - Bölüm 3'e köprü).
**Sürüm 3 (21.11.2026 kredi sprinti)**: yazan oturumun bağımsız denetiminden (sürüm 2) sonra ayrı bir oturumun **2. bağımsız denetimi** ile düzeltildi (bkz. dogruluk.md "Denetim" ve "2. denetim").
**Sürüm 4 (21.11.2026, YENİDEN DENETİM — kanal sahibinin isteği: "hızlı olduğu için kalitesiz olmasın")**: ayrı bir oturum + iki bağımsız denetçi (devre teorisi; öğretim/anlatım). Değişenler: "En sık yapılan hata" sırası (önce hata + yanlış sonuç, sonra Doğrusu), vurgu ≥ 1 sn notları, **yeni yorum sorusu** (eski LED sorusu "orta/kolay" ve tek cevaplı değildi), seste "bir ce" harfi kaldırıldı, şarj entegresinin besleme payı (4,2 + 0,3 = 4,5 V), "en kötü durum" ifadesi düzeltildi, Parça 7'deki açık devre açıklaması, Parça 5 iç dirençle sayısal. Ayrıntı: dogruluk.md "Yeniden denetim 21.11".

**En sık yapılan hata:** "Akım kaynağının uçlarındaki gerilim sıfırdır" (yanlış sonuç: 4 mA'lik kaynağa 2,5 kΩ bağlıyken kaynağın uçlarında 0 V). Doğrusu: akım kaynağı yalnızca akımı söyler, gerilimi devre belirler (v = R × i = 2,5 kΩ × 4 mA = 10 V). Gerekçe: icerik.md bölüm 6 (Razavi'nin "sezgiye ters" [31:43–31:56] ve "uçlarındaki gerilim artı, eksi ya da sıfır olabilir" [38:27–38:51] vurgusu). Bölümde tek "En sık yapılan hata" budur; Uygulamadaki değerler düz anlatılır.
Az bilinen nokta: gerilim kaynağı kısa devre edilmez ama açık bırakılabilir; akım kaynağı tam tersi (ikilik).

Ön bilgi (açıklamaya): Ders 1 (akım, gerilim, açık devre i = 0, kısa devre v = 0, gerilim kaynağı kısa devre edilmez, mAh bir yüktür); Ders 2 - Bölüm 1 (ideal anahtar, ideal gerilim kaynağı, v–i grafiğinde yatay doğru); Ohm yasası.

Gösterim: akım küçük i, gerilim v, direnç R, ayar direnci R_PROG (ekranda "R_PROG", seste "ayar direnci"), akım I_REG yalnızca datasheet formülünde (ekranda "I_REG", seste "entegrenin akımı"), besleme V_DD (ekranda, seste "besleme"). Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" ve "→" yok; iki denklem aynı satırda yalnızca noktalı virgülle ayrılır, "iki nokta" ayırıcı değildir (AGENT.md 2d-2). Her gerilimin yanında + ve −, her akımın yanında referans oku. Akım kaynağı: siyah daire içinde **mavi ok**, + / − yok; bağımlı akım kaynağı (yalnızca Parça 3'te, adıyla): mavi eşkenar dörtgen içinde mavi ok (D2B2, D3B1 ile aynı).

**Vurgu süresi (UZUN.md, bütün parçalar):** her çember, alt çizgi, üstünü çizme, kutu ve çerçeve **tamamen çizildikten sonra en az 1,0 sn** tam görünür kalır; tahta ancak ondan sonra silinir (gerekirse sese 0,5–1 sn sessizlik). Sahne planlarında "(≥ 1,0 sn)" ile işaretli.

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok; **tek harfli simge ya da harf okunmaz** (D2B2 kararı). Parça adları (MCP73831, NSI45025A), marka adları, "USB", "LED" kısaltması, "1C", "mAh", "datasheet" seste yok: "bir şarj entegresi", "iki uçlu, yirmi beş miliamperlik bir sabit akım regülatörü", "telefon adaptörü", "led", "kapasite akımı" (ekranda "1C"), "miliamper saat", "veri sayfası".

Zaman bütçesi: `dogrula.py` çıktısı; yeniden denetimde gerçek hız **2,42 kelime/sn** (D2B1 parça 1–6'nın ölçülen ses süresi, aynı ses) ile de hesaplanır. Intro kartı selamla birlikte; bitiş ekranı alanı (son 20 sn) Parça 8'in sonunda.

> **Açılış (UZUN.md 6-S, onaylı Blender intro'su):** Parça 1'de giriş sorusundan sonra müzik ~1 sn tek başına → intro (`media/uzun/devre-teorisi-1-intro-gercekci.mp4`) → beyaz tahtaya geçiş → intro kartı baştan yazılır → selam (geçişten ~0,5 sn sonra; müzik konuşmanın ≥ 18 dB altında).

> **Tahta düzeni (UZUN.md 4, Ders 1 motoruyla aynı):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 2 - Bölüm 3: Akım kaynağı"** (Parça 1'de intro kartından sonra; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre). Etiketler ve ara bilgiler koyu yeşil (#1E7B4A); gri yalnızca yardımcı çizgiler. Alt %24'lük bant yalnızca abone kartı ve kapanış için. "kanca" kelimesi ekranda yok.

---

## [PARÇA 1] Giriş sorusu, selam, intro kartı (~0:55)

```
Dört miliamperlik ideal bir akım kaynağına iki buçuk kiloohmluk bir direnç bağlıyoruz. Kaynağın uçlarında kaç volt var? Sıfır mı?

Akla ilk gelen cevap sıfır olabilir. Sonuçta kaynağın üstünde yalnızca akım yazıyor, gerilim yazmıyor. Akım kaynağıyla ilgili en sık yapılan hata da tam bu. Cevap sıfır değil; birazdan adım adım bulacağız.

Bu bölümün sonunda akım kaynağının neyi garanti ettiğini, neyi garanti etmediğini bileceksin. Sonra bir şarj entegresinin veri sayfasına bakıp, bir pilin şarj akımını tek bir dirençle kendin seçeceksin.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün ikinci dersin son bölümünde akım kaynağını konuşacağız.
```

Sahne planı:
- 0:00 (ilk kare) sağ sütunda kalem akım kaynağını çizer: daire, içinde yukarı bakan mavi ok, yanında mavi "4 mA"; iki kolla bir dirence bağlar, direncin yanında "2,5 kΩ". Kaynağın iki ucunda kırmızı "+" (okun ucunun gösterdiği üst uç) ve "−", aralarında kırmızı "v = ?". Solda kırmızı başlık "Uçlarında kaç volt?".
- "Akla ilk gelen cevap sıfır": sol sütunda kırmızı "v = 0?"; altında küçük kırmızı "En sık yapılan hata".
- "Cevap sıfır değil": "v = 0?" satırının üstü kırmızıyla çizilir (≥ 1,0 sn); koyu yeşil "Cevabı birazdan". Sayı bu parçada yazılmaz.
- "Bu bölümün sonunda": sahne silinir; kırmızı başlık "Bu bölümde", maddeler: "- Akım kaynağı neyi garanti eder?", "- Gerilim kaynağının ikizi", "- Veri sayfasından şarj akımı seçmek". Silinir.
- **[KANAL İNTRO'SU — onaylı Blender intro'su, 6-S]**
- **[INTRO KARTI + SELAM]** Ortada: "Devre Teorisi I: Ders 2 - Bölüm 3/3" (siyah, kırmızı alt çizgi), altına "Akım kaynağı" (mavi); selam bitince silinir. Ardından köşe başlığı yazılır.

## [PARÇA 2] Ara hikâye: anahtarlarla doğru gerilimden alternatif gerilime; abone çağrısı 1; akım kaynağının tanımı ve sembolü (~3:15)

```
Akım kaynağına geçmeden önce, ideal anahtarla ideal gerilim kaynağının birlikte yaptığı bir işe bakalım. Kamptayız ve elimizde on iki voltluk bir akü var. Akünün gerilimi sabit; buna doğru gerilim diyoruz. Ama cihazımız, yönü sürekli değişen bir gerilim, yani alternatif gerilim istiyor. Kapalı bir anahtarın bir tel gibi davrandığını biliyoruz. Yükün sol ucunu iki anahtarla bağlayalım: üstteki akünün artısına, alttaki eksisine gider. Sağ ucunu da aynı şekilde bağlayalım. Sol üstteki ile sağ alttaki anahtar kapalıyken yük artı on iki volt görür. Öbür çapraz çifti, yani sağ üstteki ile sol alttakini kapatırsak, bağlantı tersine döner ve yük eksi on iki volt görür. Bu iki durumu sırayla tekrarlarsak, yükün gerilimi ikisi arasında gidip gelir. Böyle bir devreye evirici denir. Bir de uyarı: aynı koldaki, yani üst üste duran iki anahtar birlikte kapanırsa akünün iki ucu birleşir. Bu, gerilim kaynağını kısa devre etmek demek. Gerçek eviriciler daha karmaşıktır; bu, fikrin en sade hâli.

Bu serinin devamı için kanala abone olabilirsin.

Şimdi bu dersin son elemanına geçelim: akım kaynağı. Birinci bölümde ideal gerilim kaynağını, gerilimi içinden geçen akıma bağlı olmayan iki uçlu bir eleman diye tanımlamıştık. Akım kaynağı bunun ikizidir. İdeal akım kaynağı da iki uçlu bir eleman, ama bu kez sabit kalan şey akım. Uçlarındaki gerilim ne olursa olsun, içinden geçen akım aynı. Gerilimle akımın rolü yer değiştirdi; ikiz dememizin nedeni bu. İdeal modelde ona ne bağlarsak bağlayalım, aynı akımı aynı yönde iter. Onu, önüne ne çıkarsa çıksın her saniye aynı miktarda yükü iten bir eleman gibi düşünebilirsin. Yol zorlaştıkça daha çok bastırır.

Sembolü bir daire, içinde de bir ok. Ok, kaynağın akımı ittiği yönü gösterir; yanına da değerini yazarız, örneğin dört miliamper. Dairenin içinde artı ve eksi işareti yok. Bu sembolü gerilim kaynağınınkiyle karıştırmayalım.

Peki uçlarındaki gerilim kaç volt? Tanım bu konuda hiçbir şey söylemiyor. Bu gerilim artı olabilir, eksi olabilir, sıfır olabilir. Onu, kaynağa bağladığımız devre belirler.
```

Sahne planı:
- Kırmızı başlık "Ara hikâye: Dört anahtarla yön değiştirmek". Sol: "- Akü: doğru gerilim (12 V, sabit)", "- Cihaz: alternatif gerilim (yönü değişen)".
- "Kapalı bir anahtarın": sağ sütunda köprü çizilir (tek kalem, sırayla): solda akü (pil sembolü, "+" üstte, "12 V"); üstte artı hattı, altta eksi hattı; iki dikey kol; sol kolda üstte anahtar "A1", altta "A2"; sağ kolda üstte "A3", altta "A4" (anahtarlar açık çizilir). Ortada yatay yük direnci "Yük" (iki kolun orta noktaları arasında); yükün üstünde "+" (sol uç) ve "−" (sağ uç), mavi "v_yük". (A1–A4 yalnızca ekran etiketi; seste "sol üstteki" vb.)
- "Sol üstteki ile sağ alttaki": A1 ve A4 kolları kapanır; yükten geçen yol mavi ok çizgisiyle (artı hat → A1 → yük soldan sağa → A4 → eksi hat). Sol: mavi "A1 ve A4 kapalı: v_yük = +12 V".
- "Öbür çapraz çifti": A1, A4 açılır; A3, A2 kapanır; mavi yol: artı hat → A3 → yük sağdan sola → A2 → eksi hat. Sol: mavi "A3 ve A2 kapalı: v_yük = −12 V".
- "sırayla tekrarlarsak": köprünün altında (y ≤ %76) küçük grafik: yatay eksen "t", dikey eksen "v_yük (V)", işaretler "+12" ve "−12"; mavi kare dalga 3 periyot (kalem soldan sağa). Koyu yeşil etiket "Kare dalga". Sol: kırmızı alt başlık "Evirici".
- "Bir de uyarı": A2, A3 açılır; A1 ve A2 kırmızıyla kapanır; kırmızı yol artı hat → A1 → A2 → eksi hat; kırmızı çerçeve "Aynı koldaki iki anahtar birlikte kapanırsa akü kısa devre olur!" (≥ 1,0 sn); koyu yeşil "Ders 1 - Bölüm 3: Kısa devrede ideal gerilim kaynağı çelişkiye düşer". A1, A2 yeniden açılır.
- "Gerçek eviriciler": koyu yeşil "Gerçek eviriciler daha karmaşıktır; bu fikrin en sade hâli".
- "abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda alt banttan girer (hikâye bittikten sonra); kalem "Evirici" alt başlığının altını çizer (vurgu bitişi ile silme arası ≥ 1,0 sn). Bütün yazılar y ≤ %76. Kart kapanır kapanmaz (≤ 0,5 sn) ses devam eder.
- Abone kartı kapanınca silme (köşe başlığı kalır).
- Kırmızı başlık "Akım kaynağı". "Birinci bölümde": sol, koyu yeşil "Bölüm 1: İdeal gerilim kaynağının gerilimi akıma bağlı değil"; mavi kutu (iki satır): "İdeal akım kaynağı: içinden geçen akımı", "uçlarındaki gerilime bağlı olmayan iki uçlu eleman" (≥ 1,0 sn). Koyu yeşil "Gerilim kaynağının ikizi: akımla gerilimin rolü yer değiştirdi". "her saniye aynı miktarda yükü": koyu yeşil "Her saniye aynı yük; yol zorlaşınca daha çok bastırır".
- "Sembolü bir daire": sağ sütunda daire + yukarı bakan **mavi ok**, yanında mavi "4 mA"; yanında aynı boyutta gerilim kaynağı (daire içinde + ve −, "6 V"); altlarında koyu yeşil "Akım kaynağı: ok (akımın yönü)" | "Gerilim kaynağı: + ve −". Akım kaynağının yanında kırmızı küçük "Artı ve eksi işareti yok".
- "uçlarındaki gerilim kaç volt": akım kaynağının iki ucuna kırmızı "+" ve "−", "v = ?"; sol: "- Artı olabilir", "- Eksi olabilir", "- Sıfır olabilir"; mavi kutu "Gerilimi bağlanan devre belirler" (≥ 1,0 sn).

## [PARÇA 3] Neden çalışıyoruz; dersin başındaki soru; en sık yapılan hata; aynı üç yük, iki kaynak; v–i grafiği (~3:35)

```
İdeal bir akım kaynağını dükkânda bulamazsın; peki neden bu kadar uğraşıyoruz? Çünkü birçok gerçek parça, belli bir çalışma aralığında buna çok yakın davranıyor; uygulama kısmında ikisini göreceğiz. İleride transistörü de bu gözle modelleyeceğiz. Bağımlı akım kaynakları da var; onları bir sonraki derste göreceğiz.

Şimdi dersin başındaki soruya dönelim. Dört miliamperlik kaynağa iki buçuk kiloohmluk bir direnç bağlı. Akla ilk gelen cevap sıfır volttu. İşte en sık yapılan hata bu: akım kaynağının uçlarındaki gerilimi sıfır sanmak. Kaynağın üstünde gerilim yazmıyor diye gerilimi yok sayarsak, kaynağın uçlarında sıfır volt buluruz.

Doğrusu şu: akım kaynağı yalnızca akımı söyler; gerilimi, bağlanan devre belirler. Bakalım bu devre ne diyor. Kaynağın ittiği akımın gidebileceği başka bir yol yok; akımın hepsi dirençten geçer. Direncin gerilimi, direnç çarpı akım. İki buçuk kiloohm çarpı dört miliamper: iki buçuk çarpı dört, on. Kiloohm ile miliamperin çarpımı volt verir; yani on volt. Direnç doğrudan kaynağın uçlarına bağlı, ikisi aynı iki nokta arasında. O hâlde kaynağın uçlarında da on volt var. Aynı iki nokta arasında hem sıfır hem on volt olamaz; doğru cevap on volt.

Bunu bir gerilim kaynağıyla yan yana görelim. Altı voltluk ideal bir gerilim kaynağını ve dört miliamperlik ideal bir akım kaynağını, aynı üç yüke sırayla bağlayalım.

Birinci yük beş yüz ohm. Gerilim kaynağında akımı yük belirler: altı volt bölü beş yüz ohm, sıfır virgül sıfır on iki amper, yani on iki miliamper. Akım kaynağında gerilimi yük belirler. Dört miliamper, sıfır virgül sıfır sıfır dört amper eder. Beş yüz çarpı sıfır virgül sıfır sıfır dört, iki volt.

İkinci yük iki buçuk kiloohm. Gerilim kaynağında, volt bölü kiloohm miliamper verir; altı bölü iki buçuk, iki virgül dört, yani iki virgül dört miliamper. Akım kaynağında, az önce bulduğumuz gibi on volt.

Üçüncü yük kısa devre, yani sıfır ohm. Gerilim kaynağını kısa devre etmenin bir çelişki olduğunu birinci dersten biliyoruz. Akım kaynağında ise sıfır çarpı dört miliamper, sıfır volt. Hiçbir sorun yok.

Tabloya bak. Gerilim kaynağının sütununda gerilim hep altı volt; değişen şey akım. Akım kaynağının sütununda akım hep dört miliamper; değişen şey gerilim.

Aynı şeyi birinci bölümdeki gibi bir grafikte görelim. Yatay eksende akım, dikey eksende gerilim var. Akımı okun yönünde ölçüyoruz. Okun gösterdiği uca da artı diyelim. Böylece birinci bölümdeki gibi, akım artı uçtan dışarı çıkıyor. Altı voltluk gerilim kaynağı bu grafikte yatay bir doğrudur. Akım kaynağında gerilim sıfır da olsa, on volt da, kırk volt da, akım hep dört miliamper. Devrede başka bir kaynak varsa gerilim eksi bile olabilir, örneğin eksi beş volt; akım yine dört miliamper. Bu noktalar dikey bir doğru üzerinde. Gerilim kaynağının imzası yatay doğruysa, akım kaynağınınki dikey doğru.
```

Sahne planı:
- Kırmızı başlık "Neden çalışıyoruz?". Sol: "- İdeal olanı satılmaz", "- Akım kaynağı gibi davranan parçalar (Uygulamada)", "- Transistör modeli (ileride)", "- Bağımlı akım kaynakları (Ders 3)". Sağda küçük **mavi** eşkenar dörtgen içinde mavi ok, koyu yeşil "Bağımlı akım kaynağı".
- Silme. Kırmızı başlık "Dersin başındaki soru". Sağ sütunda Parça 1'deki devre yeniden: akım kaynağı (mavi ok, "4 mA"), direnç "2,5 kΩ" (+ üstte, − altta, "v_R"); kaynağın uçlarında "+" üstte, "−" altta, "v". Mavi akım oku dirençte aşağı doğru "i = 4 mA".
- "İşte en sık yapılan hata": sol sütunda kırmızı çerçeve "En sık yapılan hata: Akım kaynağının uçlarındaki gerilim sıfırdır", içinde kırmızı "4 mA, 2,5 kΩ ise kaynağın uçlarında 0 V (yanlış)" (çerçeve bitişinden sonra ≥ 1,0 sn; çerçeve silinmez, küçülmez, sol üstte kalır).
- "Doğrusu şu": çerçevenin altına koyu yeşil "Doğrusu: Akım kaynağı yalnızca akımı söyler; gerilimi devre belirler". "başka bir yol yok": devrede koyu yeşil "Akımın gidecek başka yolu yok". "Direncin gerilimi": sol: "v_R = R × i" (mavi), "v_R = 2,5 kΩ × 4 mA = 2,5 × 4 = 10 V", koyu yeşil "kΩ × mA = V". "kaynağın uçlarında da": "v = v_R = 10 V" (mavi, yanıp sönen fon, kırmızı çember; çember bitişi ile silme arası ≥ 1,0 sn). "hem sıfır hem on volt olamaz": hata çerçevesindeki "0 V" üstü kırmızıyla çizilir (≥ 1,0 sn).
- Silme. Kırmızı başlık "Aynı üç yük, iki kaynak". Tahtanın üst kısmında iki küçük sembol yan yana: gerilim kaynağı "6 V", akım kaynağı (mavi ok) "4 mA". Tablo (kendi tablomuz), koyu yeşil başlıklar: "Yük" | "6 V gerilim kaynağı: i = v / R" | "4 mA akım kaynağı: v = R × i". Satırlar sesle sırayla:
  - "500 Ω" | "i = 6 V / 500 Ω = 0,012 A = 12 mA" | "4 mA = 0,004 A; v = 500 Ω × 0,004 A = 2 V"
  - "2,5 kΩ" | "i = 6 V / 2,5 kΩ = 2,4 mA" | "v = 2,5 kΩ × 4 mA = 10 V"
  - "Kısa devre (0 Ω)" | kırmızı "Çelişki (kısa devre edilmez)" | "v = 0 × 4 mA = 0 V"; koyu yeşil "Sorun yok".
- "Tabloya bak": sol sütunun altına mavi "Gerilim hep 6 V; akım değişir"; sağ sütunun altına mavi "Akım hep 4 mA; gerilim değişir". (Satırlar v–R doğrusu olarak çizilmez.)
- Silme. Kırmızı başlık "Akım ve gerilim grafiği". Sağ sütunda grafik: yatay eksen "i (mA)" 0 … 8 (işaretler 2, 4, 6, 8), dikey eksen "v (V)" −10 … 45 (işaretler −5, 0, 10, 20, 30, 40). Koyu yeşil küçük not (grafiğin altında): "i: okun yönünde; v: okun ucunun gösterdiği uç artı". Önce gri kesikli yatay doğru v = 6 V, koyu yeşil etiket "6 V gerilim kaynağı: yatay doğru". Sonra mavi noktalar sesle aynı sırada (4; 0), (4; 10), (4; 40), (4; −5); sol sütunda koyu yeşil "v = 0 iken i = 4 mA", "v = 10 V iken i = 4 mA", "v = 40 V iken i = 4 mA", "v = −5 V iken i = 4 mA (devrede başka kaynak varsa)"; sonra mavi dikey doğru i = 4 mA, mavi etiket "4 mA akım kaynağı: dikey doğru" (doğrunun sağında; etiketler çakışmaz, kontrol.mjs taraması). (Eğri kodda formülden; assert: dört noktanın x pikseli aynı.)

## [PARÇA 4] Akım kaynağı açık bırakılmaz; ikilik kuralı (~1:40)

```
Kısa devre akım kaynağı için sorun değilse, sorun nerede? Tersini deneyelim, direnci büyütelim. Dört miliamperlik kaynağa on kiloohm, yani on bin ohm bağlarsak, on kiloohm çarpı dört miliamper, on çarpı dört, kırk volt. Bir megaohm, yani bir milyon ohm bağlarsak, bir milyon çarpı sıfır virgül sıfır sıfır dört amper, dört bin volt.

Şimdi en uç durum. Kaynağı hiçbir şeye bağlamayalım; uçları açık kalsın. Açık devre, akımın sıfır olmasını garanti eder. İdeal akım kaynağı ise dört miliamper ister. İkisi aynı anda doğru olamaz; ideal model burada çelişkiye düşer ve gerilim sınırsız büyümek zorunda kalır. Gerçek bir akım kaynağı bunu yapamaz. Kendi sınırına gelir ve artık akım kaynağı gibi davranamaz.

Buradan bir kural çıkıyor. Çalışan bir akım kaynağının akımı için mutlaka bir yol olmalı. Kısacası akım kaynağı açık bırakılmaz.

Birinci dersten tanıdık bir sonucu da kural olarak yanına yazalım: ideal gerilim kaynağı kısa devre edilmez. Bu iki kural birbirinin ikizi. Gerilim kaynağı açık bırakılabilir ama kısa devre edilmez. Akım kaynağı kısa devre edilebilir ama açık bırakılmaz.
```

Sahne planı:
- Kırmızı başlık "Direnci büyütelim". Sağ: akım kaynağı (mavi ok, "4 mA") + ayarlı direnç sembolü (oklu) "R", uçlarında "+" "−" "v". Sol, sırayla (mavi): "R = 10 kΩ = 10 000 Ω iken", "v = 10 kΩ × 4 mA = 10 × 4 = 40 V", "R = 1 MΩ = 1 000 000 Ω iken", "v = 1 000 000 Ω × 0,004 A = 4000 V"; mavi "Direnç büyüdükçe gerilim de aynı oranda büyür (v = R × i)".
- "uçları açık kalsın": direnç silinir, kaynağın uçları açık iki çizgi; kırmızı "Açık devre: i = 0" | mavi "Akım kaynağı: i = 4 mA"; kırmızı çerçeve "Çelişki: ideal modelde gerilim sınırsız büyümek zorunda" (≥ 1,0 sn); koyu yeşil "Gerçek kaynak: sınırına gelir, artık akım kaynağı gibi davranamaz (Uygulamada)".
- "Buradan bir kural": mavi kutu "Kural: Akım kaynağının akımı için mutlaka bir yol olmalı", altında "Akım kaynağı açık bırakılmaz" (≥ 1,0 sn).
- Silme. Kırmızı başlık "İkizler". İki sütunlu tablo, koyu yeşil başlıklar "Gerilim kaynağı" | "Akım kaynağı" (her başlığın altında küçük sembolü): "Gerilim sabit; akımı yük belirler" | "Akım sabit; gerilimi yük belirler"; "Grafiği yatay doğru" | "Grafiği dikey doğru"; "Açık bırakılabilir" | "Kısa devre edilebilir"; kırmızı "Kısa devre edilmez" | kırmızı "Açık bırakılmaz". (Ekranda "asla açık devreyle değiştirilmez" yazılmaz; icerik.md 10.)

## [PARÇA 5] Şarj neden akımla yapılır (~1:40)

```
Akım kaynağının en tanıdık işlerinden biri şarj. Telefonunu şarj ederken adaptör ile pil arasında ne oluyor?

Bir telefon adaptörünü beş voltluk bir gerilim kaynağı gibi düşünelim. Pil de o an, örneğin üç virgül yedi voltta duran bir gerilim kaynağı gibi. Bu ikisini tellerle doğrudan birbirine bağlarsak ne olur? İki kaynak, aynı iki noktaya farklı gerilim dayatmaya çalışır. Tamamen ideal tellerle bu bir çelişkidir; ideal model burada da anlamını yitirir.

Gerçeğe biraz yaklaşalım. Birinci bölümde gerçek bir pilin küçük bir iç direnci olduğunu görmüştük. Pilin ve tellerin toplam direnci yalnızca sıfır virgül bir ohm olsun. Aradaki fark, beş eksi üç virgül yedi, bir virgül üç volt. Bu fark o küçük direncin üzerine düşer. Adaptör bu akımı verebilseydi, akım bir virgül üç volt bölü sıfır virgül bir ohm, on üç amper olurdu. Küçük bir telefon pili için bu çok büyük bir akım; pil ısınır ve zarar görebilir.

Bunun yerine pile elektrik yükünü, akımını bildiğimiz ve seçebildiğimiz bir kaynakla iteriz. Birinci dersten hatırla: sabit akımda taşınan yük, akım çarpı süre. Pil bu yükü yavaş yavaş alır, gerilimi de yavaş yavaş yükselir.

Peki telefonun şarj devresi sabit gerilim mi veriyor, sabit akım mı? Cevap: ikisini de, sırayla. Önce sabit akım aşaması gelir; bu hızlı şarj aşamasında devre akım kaynağı gibi davranır. Pilin gerilimi tavan değere, örneğin dört virgül iki volta gelince, şarj devresi bu kez gerilim kaynağı gibi davranmaya başlar. Akım azalır ve yeterince küçülünce şarj biter. Burada akım kaynağı gibi davranan şey adaptör değil, telefonun içindeki şarj entegresidir.
```

Sahne planı:
- Kırmızı başlık "Şarj: gerilimle mi, akımla mı?". Sağ: solda gerilim kaynağı "5 V" (koyu yeşil "Adaptör (gerilim kaynağı gibi)"), sağda gerilim kaynağı "3,7 V" (koyu yeşil "Pil, o an (örnek)"); artı uçları ve eksi uçları ideal tellerle doğrudan bağlı.
- "farklı gerilim dayatmaya": kırmızı çerçeve "İdeal tellerle: iki kaynak aynı iki noktaya farklı gerilim dayatır, çelişki" (≥ 1,0 sn).
- "Gerçeğe biraz yaklaşalım": tellerin arasına bir direnç sembolü, koyu yeşil "Pil ve tellerin toplam direnci: 0,1 Ω (örnek)"; sol (mavi): "Fark: 5 V − 3,7 V = 1,3 V", "i = 1,3 V / 0,1 Ω = 13 A" (koyu yeşil "adaptör ideal olsaydı"); kırmızı "Telefon pili için çok büyük: ısınır, zarar görebilir". Akım oku mavi, adaptörün + ucundan pilin + ucuna.
- "Bunun yerine": 5 V kaynak ve direnç silinir, yerine akım kaynağı (mavi ok, "i", koyu yeşil "Akımı seçilebilir") çizilir, pile bağlanır. Sol: "q = i × t" (mavi), koyu yeşil "Ders 1 - Bölüm 2: Sabit akımda yük", "- Pil yükü yavaş yavaş alır", "- Gerilimi yavaş yavaş yükselir".
- "sabit gerilim mi … sabit akım mı?": kırmızı alt başlık "Telefonun şarj devresi"; alt alta üç numaralı kutu (aralarında bağlantı çizgisi ya da ok yok; devre teliyle karışmasın, 7a-7): "1. Sabit akım (akım kaynağı gibi)", "2. Pil 4,2 V'a gelince sabit gerilim (gerilim kaynağı gibi)", "3. Akım küçülünce şarj biter". Koyu yeşil "Örnek tavan değer: 4,2 V". Mavi kutu "Akım kaynağı gibi davranan: telefonun içindeki şarj entegresi, adaptör değil" (≥ 1,0 sn).

## [PARÇA 6] Uygulamada (1): şarj entegresiyle mini tasarım (~3:30)

```
Şimdi akım kaynağı gibi davranan iki gerçek parçaya bakalım. Böyle bir parçanın veri sayfasında iki sorunun cevabını ararız. Birincisi: akımı ne ayarlıyor? İkincisi: bu akımı tutabilmesi için parçaya ne kadar gerilim payı gerekiyor?

Birinci parça, tek hücreli lityum iyon ve lityum polimer piller için küçük bir şarj entegresi. Veri sayfasına göre akımı tek bir dirençle ayarlanıyor. Entegrenin akımı, bin volt bölü ayar direncine eşit. Direnci kiloohm olarak koyarsak akım miliamper çıkar. Buradaki bin volt yalnızca formülün sabiti; entegrenin hiçbir yerinde bin volt yok. Ayar direnci iki ile altmış yedi kiloohm arasında olmalı.

İkinci sorunun cevabı besleme tarafında. Entegre, akımı beslemeden pile iter; bunun için beslemenin pilden yeterince yüksek olması gerekir. Veri sayfası özelliklerini, beslemenin pilin tavan geriliminden en az sıfır virgül üç volt yüksek olduğu durum için veriyor. Tavan dört virgül iki voltsa, dört virgül iki artı sıfır virgül üç, dört virgül beş volt. Beslemenin üst sınırı da altı volt. Beş voltluk bir telefon adaptörü bu aralıkta. Pilin uçlarındaki gerilimi ise pilin kendisi belirler.

Bununla küçük bir tasarım yapalım. Dört yüz miliamper saatlik bir lityum polimer pili şarj edeceğiz. Entegrenin üreticisi hızlı şarj için, pilin kapasitesindeki sayı kadar miliamper öneriyor; buna kapasite akımı diyelim. Dört yüz miliamper saatlik pil için kapasite akımı dört yüz miliamper. Mutlak üst sınır bunun iki katı: iki çarpı dört yüz, sekiz yüz miliamper. Pilin kendi veri sayfasının da kapasite akımına izin verdiğini varsayıyoruz.

Formülü direnç için yazalım: ayar direnci, bin volt bölü akım. Bin bölü dört yüz, iki virgül beş kiloohm. Ama dirençler her değerde üretilmez, belli standart değerlerde satılır. Yüzde beşlik dirençlerin standart değerleri arasında iki virgül beş kiloohm yok; en yakınları iki virgül dört ve iki virgül yedi. Kuralımız şu: akımı hedefin altında kalan direnci seçeriz. İki virgül dört kiloohm, bin bölü iki virgül dört, yaklaşık dört yüz on altı virgül yedi miliamper verir; bu hedefin üstünde. İki virgül yedi kiloohmu deneyelim. Bin bölü iki virgül yedi, yaklaşık üç yüz yetmiş virgül dört miliamper. Hedefin altında ve izinli aralıkta.

Entegrenin akımı tam bu değer olmaz. Veri sayfası, iki kiloohm ve on kiloohm için akımın yaklaşık yüzde on aşağı ya da yukarı sapabileceğini veriyor. İki virgül yedi kiloohm bu ikisinin arasında; aynı oranı kullanalım. Yüzde on aşağısı, bir eksi sıfır virgül bir, sıfır virgül dokuz kat; yukarısı bir artı sıfır virgül bir, bir virgül bir kat. Sıfır virgül dokuz çarpı üç yüz yetmiş virgül dört, yaklaşık üç yüz otuz üç miliamper. Bir virgül bir çarpı üç yüz yetmiş virgül dört, yaklaşık dört yüz yedi virgül dört miliamper. Bu üst değer, sekiz yüz miliamperlik mutlak sınırın çok altında. Kapasite akımını ise biraz aşabiliyor, direncin kendi sapması da buna ekler; son sözü pilin kendi veri sayfası söyler. Seçimimiz iki virgül yedi kiloohm.

Bu tasarımda dersin ikiliği de görünüyor. Sabit akım aşamasında pilin uçlarındaki gerilimi pil belirler; diyelim o an üç virgül yedi volt. Pilin içinden geçen akımı entegre belirler. Her biri yalnızca kendi büyüklüğünü belirler.

Tasarımda pahalıya patlayan bir hata da şu: hızlı şarj olsun diye en küçük ayar direncini, iki kiloohmu, yüz elli miliamper saatlik küçük bir pilde kullanmak. Bin bölü iki, beş yüz miliamper. Bu pil için iki katlık mutlak sınır, iki çarpı yüz elli, üç yüz miliamper. Beş yüz miliamper bu sınırın çok üstünde; pil ısınabilir ve ömrü kısalabilir.
```

Sahne planı:
- Kırmızı başlık "Uygulamada: gerçek akım kaynakları" (altında koyu yeşil küçük "Veri sayfası"). Sol: mavi kutu "Soru 1: Akımı ne ayarlıyor?", "Soru 2: Akımı tutması için ne kadar gerilim payı gerekiyor?" (≥ 1,0 sn).
- "Birinci parça": sağ sütun, kendi tablomuz (datasheet tablosu kopyalanmaz), koyu yeşil başlıklar "Parça" | "Akımı ne ayarlıyor?" | "Ne kadar gerilim payı gerekiyor?". Satır 1: "MCP73831 şarj entegresi (tek hücreli lityum iyon ve lityum polimer)" | "Tek direnç: I_REG = 1000 V / R_PROG (R_PROG kiloohm, I_REG miliamper cinsinden)" | "Besleme, pilin tavan geriliminden en az 0,3 V yüksek; en çok 6 V". Koyu yeşil "R_PROG: 2 kΩ ile 67 kΩ arası"; koyu yeşil "1000 V yalnızca formülün sabiti".
- "İkinci sorunun cevabı": tablonun altına mavi "V_DD ≥ 4,2 V + 0,3 V = 4,5 V", "V_DD ≤ 6 V"; koyu yeşil "5 V adaptör: uygun"; koyu yeşil "Pilin gerilimini pil belirler".
- Silme (tablo küçülmez; silinir). Kırmızı başlık "Mini tasarım: 400 mAh pil". Sol, sırayla (mavi): "Hedef: 1C = 400 mA" (koyu yeşil "1C, kapasite akımı: kapasitedeki sayı kadar mA"), "Mutlak en çok: 2C = 2 × 400 = 800 mA", koyu yeşil "Pilin veri sayfası da 1C'ye izin veriyor (varsayım)".
- "Formülü direnç için": "R_PROG = 1000 V / I_REG = 1000 / 400 = 2,5 kΩ"; koyu yeşil "%5'lik dirençlerin standart değerlerinde 2,5 kΩ yok; en yakınları 2,4 kΩ ve 2,7 kΩ"; koyu yeşil "Kural: akımı hedefin altında kalan direnç"; "2,4 kΩ ise I_REG = 1000 / 2,4 ≈ 416,7 mA" (kırmızı "Hedefin üstünde"); "2,7 kΩ ise I_REG = 1000 / 2,7 ≈ 370,4 mA" (koyu yeşil "Hedefin altında; 2 kΩ ≤ 2,7 kΩ ≤ 67 kΩ").
- "yaklaşık yüzde on": sağ sütun: koyu yeşil "Veri sayfası: 2 kΩ ve 10 kΩ'da yaklaşık ±%10; arası için aynı oran (yaklaşık)", "1 − 0,1 = 0,9; 1 + 0,1 = 1,1", "0,9 × 370,4 ≈ 333 mA", "1,1 × 370,4 ≈ 407,4 mA" (mavi), koyu yeşil "800 mA mutlak sınırın çok altında", koyu yeşil "1C'yi biraz aşabilir (direncin sapması da ekler): son söz pilin veri sayfasında". Mavi kutu "Seçim: R_PROG = 2,7 kΩ" (kırmızı çember; bitişten sonra ≥ 1,0 sn görünür).
- "dersin ikiliği": sağ altta küçük kroki: entegre (akım kaynağı sembolü, mavi ok, "yaklaşık 370 mA") pile bağlı (pil sembolü, "örnek: 3,7 V"); koyu yeşil "Gerilimi pil belirler", "Akımı entegre belirler".
- "pahalıya patlayan bir hata": kırmızı alt başlık "Tasarımda pahalıya patlayan hata"; "R_PROG = 2 kΩ ise I_REG = 1000 / 2 = 500 mA", koyu yeşil "150 mAh pil", koyu yeşil "Mutlak en çok 2C = 2 × 150 = 300 mA", kırmızı "500 mA > 300 mA" (≥ 1,0 sn); kırmızı "Pil ısınabilir, ömrü kısalabilir". ("En sık yapılan hata" çerçevesi kullanılmaz.)

## [PARÇA 7] Uygulamada (2): sabit akım regülatörü (~0:50)

```
İkinci parça, iki uçlu, yirmi beş miliamperlik bir sabit akım regülatörü. Ledleri sabit parlaklıkta sürmek için kullanılır. Ayarı yok; başka bir akım için başka bir parça seçilir. Veri sayfası, regülatörün uçlarında yedi buçuk volt varken akımı yüzde on toleransla yirmi beş miliamper olarak garanti ediyor. Uçlarındaki gerilim bir virgül sekiz volta inerse, akım tipik olarak hedefin yalnızca yüzde sekseni olur: sıfır virgül sekiz çarpı yirmi beş, yirmi miliamper. Gerilim çok büyükse de parça ısınır; sürekli çalışmada üst sınırı ısınma koyar. Yani gerçek bir akım kaynağı, yalnızca belli bir gerilim aralığında akım kaynağıdır.

Şimdi açık devreye dönebiliriz. Böyle bir parça gücünü bir beslemeden alır ve beslemenin verebileceğinden büyük bir gerilim üretemez. Akımın yolu koparsa ideal model sınırsız gerilim ister. Besleme bunu veremez. Beslemenin hepsi kopukluğun uçlarında kalır, regülatörün uçlarında pay kalmaz ve akım sıfırdır. Akım kaynağının kendi sınırına gelmesi işte budur; burada ısınma değil, besleme sınırı rol oynar.

Peki on iki voltluk bir beslemeyle bu regülatör kaç led sürebilir? Bunu Kirchhoff'un gerilim yasasını öğrenince hesaplayacağız.
```

Sahne planı:
- Silme (köşe başlığı kalır). Kırmızı başlık "Uygulamada: sabit akım regülatörü". "İkinci parça": tablo satırı 2 (aynı başlıklar yeniden yazılır): "NSI45025A sabit akım regülatörü (iki uçlu, 25 mA)" | "Ayar yok; akım parça numarasıyla seçilir" | "25 mA ± %10, 7,5 V'ta garanti; 1,8 V'ta tipik %80; yüksek gerilimde ısınır". Sol (mavi): "%80 = 0,8", "0,8 × 25 mA = 20 mA". Sağ: küçük temsilî grafik, **Parça 3 ile aynı eksen düzeni** (yatay eksen "i (mA)" 0 … 30, işaretler 10, 20, 25, 30; dikey eksen "Regülatörün uçlarındaki gerilim (V)"; 2. denetim: eksenler değişirse öğrenci "akım kaynağı dikey değil miydi?" diye karışır, 7a-7): önce gri kesikli dikey doğru i = 25 mA, koyu yeşil etiket "İdeal: dikey doğru"; sonra kırmızı eğri (gerçek parça; D2B1'deki gerçek pil doğrusu da kırmızıydı): orta bölgede 25 mA civarında neredeyse dikey, alt uçta (düşük gerilimde) daha küçük akıma doğru bükülür; alt uçta (20 mA; 1,8 V) mavi nokta ve koyu yeşil etiket "1,8 V'ta tipik 20 mA" (soldaki 0,8 × 25 mA = 20 mA satırıyla aynı yer), koyu yeşil "Gerilim azalınca akım düşer"; üst uçta koyu yeşil "Isınma sınırı"; koyu yeşil "Temsilî, ölçekli değil". Turuncu kullanılmaz (renk anahtarı).
- "Yani gerçek bir akım kaynağı": mavi kutu "Gerçek akım kaynağı: yalnızca belli bir gerilim aralığında akım kaynağıdır" (≥ 1,0 sn).
- "açık devreye dönebiliriz": grafiğin altında koyu yeşil "Açık devre: besleme sınırsız gerilim veremez", "Regülatörde pay kalmaz, akım sıfır", "Nedeni ısınma değil, besleme sınırı"; grafikteki kırmızı eğri alt uçta (0 mA; 0 V) noktasına iner, orada mavi küçük ok.
- "Kirchhoff'un gerilim yasası": koyu yeşil "12 V'tan kaç LED? Kirchhoff'un gerilim yasasından sonra". (Sayı yazılmaz.) Kaynak satırı (koyu yeşil, küçük): "Kaynak: Microchip MCP73831/2, onsemi NSI45025A (Rev. 6, 2024) veri sayfaları" (MCP73831 revizyonu `onaylar/datasheet-2-3` teyidinden sonra yazılır: okunan Rev. F 2013, üreticinin güncel sürümü Rev. H). Bütün yazılar y ≤ %76.

## [PARÇA 8] Kapanış, yorum sorusu, abone çağrısı 2 (~1:10 + 20 sn bitiş ekranı)

```
Toparlayalım. İdeal akım kaynağı akımı sabit tutar; uçlarındaki gerilimi bağlanan devre belirler. Grafiği dikey bir doğrudur. Kısa devre edilebilir ama açık bırakılmaz; gerilim kaynağı ise tam tersi. Ama gerçek bir akım kaynağı, yalnızca uçlarındaki gerilim uygun aralıktayken akım kaynağı gibi davranır.

Sana da bir soru bırakayım. Bir kulaklığın yüz elli miliamper saatlik lityum polimer pilini, bu bölümdeki şarj entegresiyle şarj edeceksin. Pilin veri sayfası, şarj akımının hiçbir durumda yüz elli miliamperi geçmemesini istiyor. Entegrenin akımı, formülün verdiği değerden yüzde on aşağı ya da yukarı sapabiliyor; dirençlerin kendi sapmasını yok sayalım. Elinde altı virgül sekiz, yedi virgül beş ve sekiz virgül iki kiloohmluk dirençler var. Pili en hızlı ama her durumda güvenli şarj eden direnç hangisi? Bu dirençle akım en çok kaç miliamper olabilir? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan üçüncü dersin ilk bölümünü kaçırmazsın.

Böylece ikinci dersi bitirdik. Üçüncü dersin ilk bölümünün konusu bağımlı akım kaynakları. Onlarla bir kuvvetlendirici kuracak, bir kaynağın nasıl direnç gibi davrandığını göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥ 4 sn okunur): kırmızı başlık; üç madde: "- İdeal akım kaynağı: akım sabit, gerilimi devre belirler", "- Akım kaynağı kısa devre edilebilir, açık bırakılmaz", "- Gerçek akım kaynağı yalnızca bir gerilim aralığında akım kaynağı gibi davranır".
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağda küçük kroki: şarj entegresi (akım kaynağı sembolü, mavi ok) pile bağlı, pilin yanında "150 mAh", entegrenin ayar ucunda "R_PROG = ?". Sol: "- Pil: 150 mAh; akım en çok 150 mA", "- I_REG = 1000 V / R_PROG; sapma ±%10", "- Dirençler: 6,8 kΩ, 7,5 kΩ, 8,2 kΩ" (direnç toleransı yok sayılır), mavi "En hızlı ama her durumda güvenli olan hangisi?", mavi "Bu dirençle akım en çok kaç mA olabilir?", koyu yeşil "Cevabını yorumlara yaz". (Cevap verilmez; soru bankasına yazılır, UZUN.md "Soru bankası".)
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer (≥ 1,0 sn; soru abone kartı boyunca görünür kalır, silinmez).
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başında girer.
- "Böylece ikinci dersi bitirdik": kırmızı başlık "Sıradaki: Ders 3 - Bölüm 1/3", maddeler "- Bağımlı akım kaynakları", "- Kuvvetlendirici modeli". Silme (köşe başlığı da); son 20 sn **bitiş ekranı**: sol üstte "Sıradaki: Ders 3 - Bölüm 1 — Bağımlı akım kaynakları" (UZUN.md 4a ders sonu kalıbı; Ders 3 plan.md Bölüm 1/3 adı "Bağımlı akım kaynakları: kuvvetlendirici ve direnç gibi davranan kaynak" ile uyumlu; ses ön tanıtımıyla aynı konu), altında koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş. Müzik (kapanış kuralı), konuşma yok; son 2 sn kararma.
