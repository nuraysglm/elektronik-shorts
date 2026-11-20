# Devre Teorisi I: Ders 2 - Bölüm 1/3 — İdeal tel, anahtar ve gerçek pil

Kaynak: B. Razavi, Basic Circuit Theory, Ders 2 (UCLA) [1:26–15:12]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Razavi'nin örneği (pil + ayarlı direnç, i1'in R1'e göre hiperbolü [12:54–15:12]) ve "1 kΩ, 100 Ω ya da 1 Ω" cümlesi [10:45–10:53] kullanılmadı; yerine ideal ve gerçek kaynağın v–i grafiği ve 150 Ω / 1,5 Ω yükler.
**Sürüm 1 (20.11.2026 gece çalışması 3)**, bağımsız denetimden sonra düzeltildi (bkz. dogruluk.md "Denetim").

**En sık yapılan hata:** "Pil her zaman aynı akımı verir" — pili sabit bir akım kaynağı sanmak (yanlış sonuç: 150 Ω'dan da 1,5 Ω'dan da aynı akım). Doğrusu: ideal gerilim kaynağı gerilimi sabit tutar, akımı yük belirler (10 mA ve 1 A; ikisinde de 1,5 V). Gerekçe: McDermott & Shaffer (1992) yanılgısı; Razavi tanımı bu ayrım üzerine kurar [10:36–12:03] (icerik.md bölüm 6). Bölümde tek "En sık yapılan hata" budur; Uygulamadaki buton hatası "tasarımda pahalıya patlayan hata" diye düz anlatılır.
Az bilinen nokta: devre teorisinde "açık anahtar" iletmeyen anahtardır; günlük dildeki "ışığı açmak" (iletmek) ile terstir (Parça 3).

Ön bilgi (açıklamaya): Ders 1 (akım i = dq/dt, gerilim, referans oku, açık devre i = 0, kısa devre v = 0); Ohm yasası (v = R × i).

Gösterim: gerilim küçük v, akım i, direnç R, iç direnç R_iç (ekranda "R_iç", seste "iç direnç"). Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" ve "→" yok. Her gerilimin yanında + ve − işaretleri, her akımın yanında referans oku.

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok. Parça adları (Alpha Wire 3071, PTS645, Energizer E91) ve "AWG", "AA", "datasheet" seste yok: "yirmi iki numara bir bağlantı teli", "altı milimetrelik bir dokunmatik buton", "kalem pil", "veri sayfası". "mΩ" seste "miliohm", "mV" "milivolt". "ft" seste "fit".

Zaman bütçesi (2,6 kelime/sn: Ders 1 ölçümü): `dogrula.py` çıktısı. Intro kartı selamla birlikte (~11 sn); bitiş ekranı alanı (son 20 sn) Parça 7'nin sonunda.

> **Kanal intro'su (onaylar/intro-1):** onaylanırsa Parça 1'de kancadan hemen sonra, intro kartından önce 6 sn'lik intro eklenir (müzik açılış kesiti intro boyunca tek başına; UZUN.md 4a-I). Onaylanmazsa Ders 1 düzeni (müzik 3 sn tek başına + intro kartı + selam).

> **Tahta düzeni (UZUN.md 4, Ders 1 motoruyla aynı):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 2 - Bölüm 1: İdeal tel, anahtar ve gerçek pil"** (Parça 1'de intro kartından sonra kalemle yazılır; sonraki parçalarda sabit; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre). Etiketler ve ara bilgiler koyu yeşil (#1E7B4A); gri yalnızca yardımcı çizgiler. Alt %24'lük bant yalnızca abone kartı ve kapanış için.

---

## [PARÇA 1] Kanca, selam, intro kartı (~1:00)

```
Bir kalem pile önce yüz elli ohmluk bir direnç bağlıyoruz, sonra bir buçuk ohmluk bir direnç. Pil, iki dirençten de aynı akımı mı geçirir?

Akla gelen ilk cevap çoğu zaman evet olur: pil sabit bir akım verir. Bu, bu konudaki en sık yapılan hata. Oysa birinci dirençten on miliamper geçiyor, ikincisinden tam bir amper. Arada yüz kat fark var. Pilin sabit tutmaya çalıştığı şey akım değil, gerilim. Üstelik bir amperde, gerçek bir pilin gerilimi de düşmeye başlıyor.

Bu bölümün sonunda ideal teli ve ideal anahtarı birer model olarak tanımlayacaksın. İdeal bir gerilim kaynağını akım ve gerilim grafiğinde göreceksin. Gerçek bir pilin geriliminin neden ve ne kadar düştüğünü hesaplayacaksın. Bir de gerçek bir telin, butonun ve pilin veri sayfasına bakıp ideal modelin ne zaman yettiğine karar vereceksin.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün Ders İki'nin ilk bölümünde ideal teli, ideal anahtarı ve gerçek bir pili konuşacağız.
```

Sahne planı:
- 0:00 (ilk kare) sağ sütunda kalem bir pil sembolü çizer ("+" üstte, "1,5 V"), iki kolla bir dirence bağlar; direncin yanında "150 Ω". Kolda mavi referans oku "i = ?". Solda kırmızı başlık "Aynı pil, iki direnç".
- "sonra bir buçuk ohmluk": 150 Ω'un altına ikinci kopya devre, "1,5 Ω", "i = ?".
- "pil sabit bir akım verir": sol sütunda kırmızı "Pil hep aynı akımı verir?" (soru işareti kırmızı); altında küçük kırmızı "En sık yapılan hata".
- "on miliamper … bir amper": soru satırının üstü kırmızıyla çizilir; birinci devrede mavi "i = 10 mA", ikincide "i = 1 A" (yanıp sönen fon); koyu yeşil "1 A / 10 mA = 100 kat". (Hesap Parça 4'te tam gösterilir; burada yalnızca sonuçlar ve koyu yeşil not "Hesabı birazdan".)
- "sabit tutmaya çalıştığı … gerilim": siyah "Pil gerilimi sabit tutmaya çalışır"; "gerçek bir pilin gerilimi de düşmeye başlıyor": ikinci devrede "1,5 V" yanında kırmızı küçük aşağı ok çizgisi ve "Gerçek pilde düşer".
- "Bu bölümün sonunda": sahne silinir; kırmızı başlık "Bu bölümde", dört madde: "- İdeal tel ve ideal anahtar", "- İdeal gerilim kaynağı (v–i grafiği)", "- Gerçek pil: iç direnç", "- Veri sayfasında tel, buton ve pil". Silinir.
- **[KANAL İNTRO'SU — yalnızca onaylar/intro-1 onaylanırsa]**
- **[INTRO KARTI + SELAM]** Ortada: "Devre Teorisi I: Ders 2 - Bölüm 1/3" (siyah, kırmızı alt çizgi), altına "İdeal tel, anahtar ve gerçek pil" (mavi); selam bitince silinir. Ardından köşe başlığı yazılır.

## [PARÇA 2] Ders 1'den kısa tekrar (~0:55)

```
Birinci dersten birkaç şeyi hatırlayalım. Akım, yükün akış hızıdır: çok kısa bir sürede geçen yükün o süreye bölümü, yani yükün zamana göre türevi. Birimi amper. Gerilim ise hep iki nokta arasında tanımlanır: bir kulonluk pozitif yükü bir noktadan ötekine taşımak için gereken enerji. Birimi volt. Bir direnç için bu iki büyüklük Ohm yasasıyla birbirine bağlanır: gerilim, direnç çarpı akım. Bu yasanın yalnızca dirençler için geçerli olduğunu unutmayalım.

Bir de iki garantimiz vardı. Açık devre yalnızca akımın sıfır olduğunu garanti eder. Kısa devre yalnızca gerilimin sıfır olduğunu garanti eder. Bu iki cümle, bugün göreceğimiz elemanların içinde yeniden karşımıza çıkacak.

Büyüklükleri tanıdık. Şimdi bu büyüklüklerle çalışan elemanlara geçiyoruz. Bugün üç eleman var: tel, anahtar ve gerilim kaynağı. Karmaşık devreler kurmadan önce, bu elemanların her birinin neyi garanti ettiğini bilmemiz gerekiyor.
```

Sahne planı:
- Kırmızı başlık "Ders 1'den". Sol sütun: "- Akım: i = dq/dt (A)", "- Gerilim: iki nokta arasında (V)", "- Ohm yasası: v = R × i" (mavi), koyu yeşil "Yalnızca direnç için".
- "iki garantimiz": sağ sütunda iki sütunlu küçük tablo, koyu yeşil başlıklar "Açık devre" | "Kısa devre": "i = 0" | "v = 0" (mavi).
- "üç eleman var": sol silinir; kırmızı başlık "Bugün: üç eleman"; "- Tel", "- Anahtar", "- Gerilim kaynağı" (her biri yazılırken sağda küçük sembolü: düz çizgi, anahtar kolu, daire içinde + ve −).

## [PARÇA 3] İdeal tel, abone çağrısı 1, ideal anahtar ve eşdeğerlikler (~3:10)

```
İlk eleman tel. Gerçek bir telin küçük de olsa bir direnci var. Ama devre çözerken teli ideal kabul ederiz. İdeal telin direnci sıfırdır. Kapasitansı ve endüktansı da sıfır kabul edilir; bu iki büyüklüğü ilerideki derslerde tanıyacağız. Bu bir modeldir. Analizi çok kolaylaştırır ve çoğu devrede gerçeğe de çok yakındır.

İdeal telin direnci sıfırsa, Ohm yasası bize ne söyler? Gerilim, direnç çarpı akım. Direnç sıfır. Akım sonlu olduğu sürece, sıfır çarpı akım yine sıfır. Örneğin telden iki amper geçse bile, sıfır ohm çarpı iki amper, sıfır volt. Yani bir tel boyunca hangi iki noktayı seçersen seç, aralarındaki gerilim sıfırdır. Kısacası ideal tel, iyi bir kısa devredir. Bir şemada gördüğün her tel parçası için ilk düşünmen gereken şey bu: bu telin bütün noktaları aynı gerilimde.

Bu serinin devamı için kanala abone olabilirsin.

İkinci eleman anahtar. Burada önce bir dil tuzağını aradan çıkaralım. Günlük hayatta ışığı açmak, akımı geçirmek demektir. Devre teorisinde ise tersi. Açık anahtar, kontakları birbirinden ayrık olan anahtardır; akım geçmez. Kapalı anahtar, kontakları birleşik olan anahtardır; akımı iletir.

İdeal anahtar açıkken açık devre gibi davranır. Garanti ettiği tek şey, akımın sıfır olması. Kapalıyken direnci sıfırdır, yani bir tel gibi davranır; bir kısa devredir. Garanti ettiği tek şey, uçları arasındaki gerilimin sıfır olması.

Peki açık bir anahtarın uçlarında ne kadar gerilim var? Anahtar bunu söylemez. Kapalı bir anahtardan ne kadar akım geçiyor? Bunu da söylemez. Bu iki soruyu anahtarın çevresindeki devre cevaplar.

Bir örnekle görelim. Dört buçuk voltluk ideal bir gerilim kaynağı, bir buçuk kiloohmluk bir direnç ve bir anahtar, seri bağlanıp tek bir halka oluşturuyor. Önce anahtarı kapatalım. Kapalı anahtar bir tel gibidir, uçlarında sıfır volt var. O zaman direnç doğrudan kaynağa bağlanmış olur ve uçlarında dört buçuk volt görür. Akım, dört buçuk volt bölü bir buçuk kiloohm, üç miliamper.

Şimdi anahtarı açalım. Açık anahtar açık devredir, akım sıfır. Direncin uçlarındaki gerilim, direnç çarpı akım: bir buçuk kiloohm çarpı sıfır, sıfır volt. Akım taşımayan direncin iki ucu aynı gerilimde, tıpkı bir tel gibi. Bu yüzden kaynağın dört buçuk voltu bu kez anahtarın uçlarında görünür. Birinci dersin ikinci bölümündeki açık devre örneğini hatırla.

İki durumda da anahtar bir büyüklüğü garanti etti: kapalıyken gerilimi, açıkken akımı. Diğer büyüklüğü devre belirledi.

Buradan iki eşdeğerlik çıkıyor ve ileride bunları sürekli kullanacağız. Açık devre, sıfır akım ve açık anahtar aynı şeydir. Kısa devre, ideal tel, kapalı anahtar ve sıfır gerilim farkı da aynı şeydir.
```

Sahne planı:
- Kırmızı başlık "İdeal tel". Sol: "- Direnci sıfır: R = 0", koyu yeşil "Kapasitansı ve endüktansı da sıfır: C = 0, L = 0 (ileride)", "- Bir modeldir". Sağ sütunda yatay bir tel, üzerinde iki nokta "a" ve "b".
- "Ohm yasası bize ne söyler": sol: "v = R × i = 0 × i = 0" (mavi), koyu yeşil "i sonlu olduğu sürece", "Örnek: 0 Ω × 2 A = 0 V". Sağ: a ile b arasına "+" ve "−", mavi "v_ab = 0". "iyi bir kısa devredir": mavi kutu "İdeal tel = kısa devre"; koyu yeşil "Telin bütün noktaları aynı gerilimde".
- "abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda alt banttan girer (Ders 1 düzeni); kalem "İdeal tel = kısa devre" kutusunun altını yavaşça çizer. Bütün yazılar y ≤ %76.
- Silme (köşe başlığı kalır). Kırmızı başlık "İdeal anahtar". "dil tuzağı": iki sütunlu kutu (kırmızı çerçeve) koyu yeşil başlıklar "Günlük dil" | "Devre teorisi": "Işığı açmak: akım geçer" | "Açık anahtar: kontak ayrık, akım yok"; altına "Kapalı anahtar: kontak birleşik, iletir" (sağ sütunda). Sağda iki anahtar sembolü: kolu havada (açık), kolu temas eden (kapalı).
- "İdeal anahtar açıkken": kutu silinir; açık anahtarın altına "Açık = açık devre", "i = 0" (mavi); kapalı anahtarın altına "Kapalı = kısa devre (R = 0)", "v = 0" (mavi).
- "Anahtar bunu söylemez": açık anahtarın yanına kırmızı "v = ?", kapalı anahtarın yanına kırmızı "i = ?"; koyu yeşil "Çevredeki devre belirler".
- Silme. Kırmızı başlık "Örnek". Sağ sütunda dikdörtgen halka: sol kolda ideal gerilim kaynağı (daire, "+" üstte, "4,5 V"), üst kolda "1,5 kΩ" (+ solda, − sağda), sağ kolda anahtar; üst kolda mavi referans oku "i". "anahtarı kapatalım": anahtar kolu kapanır; sol sütun: "Kapalı: v_anahtar = 0", "v_R = 4,5 V", "i = v / R = 4,5 V / 1,5 kΩ = 3 mA" (mavi).
- "anahtarı açalım": anahtar kolu açılır; sol sütun altına: "Açık: i = 0", "v_R = R × i = 1,5 kΩ × 0 = 0 V", "v_anahtar = 4,5 V" (mavi, yanıp sönen fon); anahtarın uçlarına "+" ve "−". Koyu yeşil "Ders 1 - Bölüm 2'deki açık devre gibi".
- "İki durumda da": koyu yeşil "Kapalı: v garanti, i devreden", "Açık: i garanti, v devreden".
- Silme. Kırmızı başlık "Eşdeğerlikler". İki satır, her biri kalemle soldan sağa: "Açık devre = sıfır akım (i = 0) = açık anahtar" ve "Kısa devre = ideal tel (R = 0) = kapalı anahtar = sıfır gerilim farkı (v = 0)" (her terimin altında küçük sembolü; "=" yalnızca aynı şeyi gösteren terimler arasında; satırlar iki satıra bölünebilir).

## [PARÇA 4] Gerilim kaynağı: semboller, tanım, v–i grafiği, en sık yapılan hata (~3:10)

```
Üçüncü eleman gerilim kaynağı. Şemada iki sembolle karşılaşırsın. Birincisi bir daire, içinde artı ve eksi işaretleri, yanında değeri ya da adı. Bu genel semboldür: gerilim sabit de olabilir, zamanla değişen de. İkincisi, uzunlu kısalı paralel çizgilerden oluşan pil sembolü. Bu derste ve çoğu kitapta pil sembolü yalnızca zamanla değişmeyen, sabit bir gerilim için kullanılır. Hangisini kullanırsan kullan, gerilimin işaretini, yani artı ve eksi uçları yazmayı unutma.

Peki bir pilin üstünde bir buçuk volt yazması tam olarak ne demek? Birinci derste kısaca söylemiştik: ideal bir kaynak, ona ne bağlarsak bağlayalım uçlarındaki gerilimi aynı tutar. Şimdi bunu bir tanım olarak yazalım. İdeal gerilim kaynağı, uçları arasındaki gerilim, içinden geçen akıma bağlı olmayan iki uçlu bir elemandır. Bu gerilim sabit olabilir ya da zamanla değişebilir. Önemli olan akıma bağlı olmaması.

Bu tanımı bir grafikle görelim. Yatay eksene kaynaktan çıkan akımı, dikey eksene kaynağın uç gerilimini koyalım. Akımın referans yönü, kaynağın artı ucundan dışarı doğru. Bir buçuk voltluk ideal bir kaynakta akım sıfırken gerilim bir buçuk volt. Yarım amperde yine bir buçuk volt. Bir amperde de bir buçuk volt. Noktaları birleştirirsek yatay bir doğru çıkar. İdeal gerilim kaynağının imzası bu yatay doğrudur: akım ne olursa olsun, gerilim aynı.

Dikkat et, grafik kaynağın hangi akımda çalışacağını söylemiyor. Onu kaynak seçmez, bağladığımız yük seçer.

İşte en sık yapılan hata tam burada yapılıyor: pili sabit bir akım veren bir eleman sanmak. Bu hatayla, kancadaki iki dirençten de aynı akımın geçtiği sonucuna varılır. Direnç yüz kat küçülse bile akım aynı kalır sanılır.

Doğrusu şu. Gerilim kaynağı gerilimi sabit tutar, akımı bağlanan yük belirler. Tek bir direnç bağlıysa akım, kaynak gerilimi bölü direnç. Yüz elli ohmda, bir buçuk volt bölü yüz elli ohm, sıfır virgül sıfır bir amper, yani on miliamper. Bir buçuk ohmda, bir buçuk volt bölü bir buçuk ohm, bir amper. İki durumda da ideal kaynağın uçlarında bir buçuk volt var. Değişen gerilim değil, akım. Bir amper bölü on miliamper, yüz kat. Bu iki çalışma noktası, aynı yatay doğrunun üzerinde iki ayrı nokta.

Ama kancada bir şey daha söylemiştik: bir amperde gerçek bir pilin gerilimi de düşmeye başlıyor. Yani gerçek pil ideal bir kaynak değil. Nedenine şimdi bakalım.
```

Sahne planı:
- Kırmızı başlık "Gerilim kaynağı". Sağ sütunda iki sembol yan yana: daire içinde "+" ve "−", yanında "v_1"; pil sembolü (uzun ve kısa çizgiler), yanında "+" ve "−" ayrıca yazılı, "1,5 V". Sol: "- Daire: genel sembol (sabit ya da değişen)", "- Pil sembolü: yalnızca sabit gerilim", koyu yeşil "Bu derste ve çoğu kitapta", "- İşaretleri (+ ve −) yaz".
- "tanım olarak yazalım": sol silinir; mavi kutu (iki satır): "İdeal gerilim kaynağı: uç gerilimi,", "içinden geçen akıma bağlı olmayan iki uçlu eleman". Koyu yeşil "Gerilim sabit ya da zamanla değişen olabilir".
- "grafikle görelim": sağ sütunda grafik: yatay eksen "i (A)" 0 … 1,1 (işaretler 0; 0,5; 1), dikey eksen "v (V)" 0 … 1,6 (işaretler 0,5; 1; 1,5). Grafiğin solunda küçük kroki: kaynak, + ucundan dışarı mavi ok "i". Noktalar sırayla: (0; 1,5), (0,5; 1,5), (1; 1,5) mavi; yanlarında koyu yeşil "i = 0: v = 1,5 V", "i = 0,5 A: v = 1,5 V", "i = 1 A: v = 1,5 V"; sonra mavi yatay doğru; mavi etiket "İdeal kaynak: yatay doğru". (Eğri kodda formülden; assert: i = 0, 0,5, 1 A'de y piksel aynı.)
- "hangi akımda çalışacağını": koyu yeşil "Çalışma noktasını yük seçer".
- "En sık yapılan hata": sol sütunda kırmızı çerçeve "En sık yapılan hata: Pil hep aynı akımı verir", içinde "150 Ω'da da 1,5 Ω'da da aynı i" (yanlış sonuç, kırmızı).
- "Doğrusu": koyu yeşil "Doğrusu: Pil gerilimi sabit tutar; akımı yük belirler (i = v / R)", altında mavi "150 Ω: i = 1,5 V / 150 Ω = 0,01 A = 10 mA", "1,5 Ω: i = 1,5 V / 1,5 Ω = 1 A", "1 A / 10 mA = 100 kat"; koyu yeşil "İkisinde de v = 1,5 V (ideal)". Grafikte (0,01; 1,5) ve (1; 1,5) noktaları yanıp söner, etiketleri "150 Ω", "1,5 Ω".
- "gerçek bir pilin gerilimi": kartın altına kırmızı küçük "Gerçek pilde büyük akımda gerilim de düşer" (paket 6 kart önerisi).

## [PARÇA 5] Gerçek pil: iç direnç ve eğimli doğru (~2:05)

```
Gerçek bir pile giderek daha küçük dirençler bağladığını düşün. Bir noktadan sonra pilin uç gerilimi bir buçuk voltun altına iner. Akım büyüdükçe bu düşüş de büyür. Yani gerçek pil, belli bir akım aralığında ideal bir kaynağa yakındır, ama her akımda değil.

Bunu açıklayan basit bir model var. Gerçek pil, ideal bir gerilim kaynağı ile ona seri bağlı küçük bir direnç gibi davranır. Bu dirence iç direnç diyoruz. Pilin içinde gerçekten ayrı bir direnç parçası yok; pil, böyle bir direnç varmış gibi davranıyor. İç dirençten akım geçince, onun uçlarında iç direnç çarpı akım kadar gerilim kaybolur. Pilin uç gerilimi de bu kadar düşer.

Sayılarla görelim. Taze bir kalem pilin iç direnci, veri sayfasına göre sıfır virgül on beş ile sıfır virgül üç ohm arasında. Büyük olanı alalım: sıfır virgül üç ohm. Uç gerilimi, bir buçuk eksi sıfır virgül üç çarpı akım.

Akım sıfırken, sıfır virgül üç çarpı sıfır, sıfır. Uç gerilimi bir buçuk volt. Yarım amperde, sıfır virgül üç çarpı sıfır virgül beş, sıfır virgül on beş volt kaybolur. Bir buçuk eksi sıfır virgül on beş, bir virgül otuz beş volt. Bir amperde, sıfır virgül üç çarpı bir, sıfır virgül üç volt kaybolur. Bir buçuk eksi sıfır virgül üç, bir virgül iki volt.

Bu noktaları aynı grafiğe koyarsak, yatay doğrunun altında aşağı eğimli bir doğru çıkar. Eğimin büyüklüğü iç direncin kendisi: her amper için sıfır virgül üç volt düşüş. Akım küçükken iki doğru neredeyse üst üste. Akım büyüdükçe aralarındaki fark açılıyor.

Bu modelin devre olarak tam çözümünü, seri dirençleri göreceğimiz üçüncü derste yapacağız. Şimdilik şu tahmin yeter: pilin kaybettiği gerilim, yaklaşık olarak iç direnç çarpı akım.
```

Sahne planı:
- Kırmızı başlık "Gerçek pil". Sol: "- Akım büyüdükçe uç gerilimi düşer", "- Belli bir akım aralığında ideale yakın".
- "basit bir model": sağ sütunda kesikli bir kutu (koyu yeşil "Gerçek pil"); içinde ideal kaynak (daire, "+", "1,5 V") ve ona seri küçük direnç "R_iç"; kutunun iki ucunda "+" ve "−", mavi "v". Dışarı mavi ok "i". Koyu yeşil "Bir model: pilin içinde ayrı bir direnç parçası yok". Sol: "- Kaybolan gerilim: R_iç × i" (mavi).
- "Sayılarla görelim": sol: koyu yeşil "Taze kalem pil: R_iç = 0,15 … 0,3 Ω (veri sayfası)", "R_iç = 0,3 Ω alalım", mavi kutu "v = 1,5 − 0,3 × i".
- Kroki silinir, Parça 4'teki grafik sağ sütunda yeniden (mavi yatay doğruyla) çizilir. Sol sütunda sırayla: "i = 0: v = 1,5 − 0,3 × 0 = 1,5 V", "i = 0,5 A: 0,3 × 0,5 = 0,15 V; v = 1,5 − 0,15 = 1,35 V", "i = 1 A: 0,3 × 1 = 0,3 V; v = 1,5 − 0,3 = 1,2 V" (mavi). Her satırla grafikte kırmızı nokta: (0; 1,5), (0,5; 1,35), (1; 1,2).
- "aşağı eğimli bir doğru": kırmızı doğru noktalardan geçer; kırmızı etiket "Gerçek pil: v = 1,5 − 0,3 × i"; koyu yeşil "Her 1 A için 0,3 V düşüş"; 1 A'de iki doğru arasına küçük koyu yeşil dikey çizgi "0,3 V". (Eğri kodda formülden; assert: i = 0,5 A'de 1,35 V, 1 A'de 1,2 V.)
- "üçüncü derste": koyu yeşil "Tam çözüm: Ders 3 (seri dirençler)", mavi kutu "Kaybolan gerilim ≈ R_iç × i".

## [PARÇA 6] Uygulamada: gerçek tel, gerçek buton, gerçek pil (~3:40)

```
Şimdi bu modelleri gerçek parçalarla karşılaştıralım. Bu bölümdeki üç ideal eleman, gerçek parçalarda küçük birer dirençle karşımıza çıkıyor. Tasarımcı her birinde aynı soruyu sorar: bu akımda, bu direncin uçlarındaki gerilim devrem için önemli mi? Önemsizse ideal model yeter.

Önce tel. Yirmi iki numara bir bağlantı telinin veri sayfası, bin fit, yani üç yüz dört virgül sekiz metre için on altı virgül iki ohm direnç veriyor. On altı virgül iki bölü üç yüz dört virgül sekiz, metre başına yaklaşık sıfır virgül sıfır beş yüz otuz bir ohm. Yirmi santimetrelik bir telde, sıfır virgül sıfır beş yüz otuz bir çarpı sıfır virgül iki, yaklaşık sıfır virgül sıfır yüz altı ohm, yani on virgül altı miliohm.

Sonra buton. Altı milimetrelik bir dokunmatik butonun veri sayfasında iki satır önemli. Kapalıyken kontak direnci en çok yüz miliohm. Kontak değeri ise en çok elli miliamper ve on iki volt. Yani bu buton, yalnızca bu sınırlar içinde ideal bir anahtara benzer.

Son olarak pil: biraz önce gördüğümüz gibi, taze bir kalem pilin iç direnci sıfır virgül on beş ile sıfır virgül üç ohm arasında.

Şimdi bu üç parçayla küçük bir tasarım yapalım. Bir kalem pil, bir buton ve yirmi santimetrelik bir telle bir yükü çalıştıracağız. İki yük deneyeceğiz.

Birincisi yüz elli ohm. İdeal modelde akım, bir buçuk volt bölü yüz elli ohm, on miliamper. Buton için uygun mu? On miliamper elli miliamperden küçük, bir buçuk volt da on iki volttan küçük. Uygun. Peki gerçek parçalarda ne kadar gerilim kaybolur? En kötü değerlerle hesaplayalım. Pilin iç direncinde, sıfır virgül üç ohm çarpı on miliamper, üç milivolt. Butonda, sıfır virgül bir ohm çarpı on miliamper, bir milivolt. Telde, on virgül altı miliohm çarpı on miliamper, yaklaşık sıfır virgül on bir milivolt. Toplam, üç artı bir artı sıfır virgül on bir, yaklaşık dört virgül bir milivolt. Bir buçuk volt, bin beş yüz milivolt eder. Dört virgül bir bölü bin beş yüz, yaklaşık yüzde sıfır virgül yirmi yedi. İdeal model burada çok iyi.

İkincisi bir buçuk ohm; küçük bir motor ya da ısıtıcı gibi. İdeal modelde akım, bir buçuk bölü bir buçuk, bir amper. Buton için uygun mu? Bir amper bölü elli miliamper, yirmi. Akım butonun sınırının yirmi katı. Uygun değil. Pilde kaybolan gerilimi ideal akımla tahmin edelim: sıfır virgül üç ohm çarpı bir amper, en çok yaklaşık sıfır virgül üç volt. Sıfır virgül üç bölü bir buçuk, yaklaşık yüzde yirmi. İdeal model burada yetmez. Pilin gerilimi belirgin biçimde düşer, akım da bir amperin altında kalır.

Pil için pratik bir kural var: yük direnci, pilin iç direncinin en az on katı olsun. Bu pil için on çarpı sıfır virgül üç, üç ohm. Bu sınırda ideal akım, bir buçuk bölü üç, yarım amper. Kaybolan gerilim yaklaşık sıfır virgül üç çarpı sıfır virgül beş, sıfır virgül on beş volt. Sıfır virgül on beş bölü bir buçuk, yaklaşık yüzde on. Yüz elli ohm bu kuralı rahatça sağlıyor, bir buçuk ohm sağlamıyor.

Tasarımda pahalıya patlayan bir hata da şu: kontak direnci küçük diye butonun her akımı taşıyacağını sanmak. Bu butonla bir amperlik bir motoru doğrudan açıp kapatırsan, buton veri sayfasının güvence verdiği sınırın dışında çalışır ve kontakları zarar görebilir. Doğrusu, butonun yalnızca küçük bir akımla bir elektronik anahtarı kumanda etmesi; motorun akımını o anahtar taşır. Bu elektronik anahtarları ileride göreceğiz.
```

Sahne planı:
- Kırmızı başlık "Uygulamada: gerçek tel, buton ve pil" (altında koyu yeşil küçük "datasheet"). Sol: mavi kutu "Soru: Bu akımda v = R × i önemli mi?", koyu yeşil "Önemsizse ideal model yeter".
- Kendi tablomuz (datasheet tablosu kopyalanmaz), sağ sütun ve alt, koyu yeşil başlıklar: "Parça" | "İdeal modeli" | "Gerçek değeri". Satır 1 (tel): "22 AWG bağlantı teli" | "R = 0" | "16,2 Ω / 1000 ft (304,8 m)". "metre başına": tablonun altında mavi "16,2 Ω / 304,8 m ≈ 0,0531 Ω/m", "20 cm: 0,0531 Ω/m × 0,20 m ≈ 0,0106 Ω = 10,6 mΩ".
- Satır 2 (buton): "6 mm dokunmatik buton" | "Kapalı: R = 0" | "Kontak direnci en çok 100 mΩ; en çok 50 mA, 12 V DC". "bu sınırlar içinde": "50 mA, 12 V" yanıp söner.
- Satır 3 (pil): "Kalem pil (AA alkalin)" | "R_iç = 0" | "R_iç = 0,15 … 0,3 Ω (taze)". Kaynak satırı (koyu yeşil, küçük): "Kaynak: Alpha Wire 3071 (2013), C&K PTS645 (2022), Energizer E91 (E91NA0323) datasheet'leri".
- Silme. Kırmızı başlık "Mini tasarım". Sağ sütun üst: halka devre: pil ("+", "1,5 V", koyu yeşil "R_iç"), buton, "20 cm tel" etiketi, yük "R_yük"; mavi ok "i".
- "Birincisi yüz elli ohm": sol sütun, koyu yeşil alt başlık "(a) R_yük = 150 Ω": "i = 1,5 V / 150 Ω = 10 mA" (mavi); "Buton: 10 mA ≤ 50 mA, 1,5 V ≤ 12 V: uygun" (koyu yeşil); "Pil: 0,3 Ω × 10 mA = 3 mV", "Buton: 0,1 Ω × 10 mA = 1 mV", "Tel: 10,6 mΩ × 10 mA ≈ 0,11 mV"; "Toplam ≈ 3 + 1 + 0,11 ≈ 4,1 mV" (mavi); "4,1 mV / 1500 mV ≈ %0,27" (mavi kutu), koyu yeşil "İdeal model çok iyi".
- Silme (devre kalır). "(b) R_yük = 1,5 Ω": "i = 1,5 V / 1,5 Ω = 1 A" (mavi); kırmızı "Buton: 1 A / 50 mA = 20 kat: uygun değil"; "Pil: 0,3 Ω × 1 A ≈ 0,3 V (en çok, ideal akımla tahmin)", "0,3 V / 1,5 V ≈ %20" (mavi); kırmızı "İdeal model yetmez".
- "pratik bir kural": sağ sütunda mavi kutu "Kural: R_yük ≥ 10 × R_iç", "10 × 0,3 Ω = 3 Ω", "Sınırda: i = 1,5 V / 3 Ω = 0,5 A", "0,3 Ω × 0,5 A = 0,15 V; 0,15 V / 1,5 V ≈ %10"; koyu yeşil "150 Ω: sağlıyor; 1,5 Ω: sağlamıyor". Koyu yeşil küçük kaynak "Hayes ve Horowitz, The Art of Electronics: Student Manual".
- "pahalıya patlayan": kırmızı "Butonla 1 A'lik motoru doğrudan sürmek: sınırın 20 katı"; koyu yeşil "Doğrusu: buton küçük akımla bir elektronik anahtarı kumanda eder (ileride)". Bütün yazılar y ≤ %76.

## [PARÇA 7] Kapanış, yorum sorusu, abone çağrısı 2 (~1:05 + 20 sn bitiş ekranı)

```
Toparlayalım. İdeal tel ve kapalı anahtar, uçları arasındaki gerilimin sıfır olduğunu garanti eder; akımı çevre belirler. Açık anahtar, akımın sıfır olduğunu garanti eder; gerilimi çevre belirler. İdeal gerilim kaynağının uç gerilimi akıma bağlı değildir; akımı yük belirler. Gerçek bir pil ise büyük akımda, iç direnci yüzünden gerilim kaybeder.

Sana da bir soru bırakayım. Dokuz voltluk ideal bir gerilim kaynağına sırayla otuz kiloohm, üç yüz ohm ve üç ohmluk dirençler bağlıyoruz. Her durumda direncin uçlarındaki gerilim ve içinden geçen akım ne olur? Gerçek bir dokuz voltluk pilde, ideal model hangisinde en çok yanılır? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan ikinci bölümü kaçırmazsın.

İkinci bölümde bağımsız ve bağımlı gerilim kaynaklarını, bir de bağımlı bir kaynağın bir kuvvetlendiriciyi nasıl modellediğini göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥4 sn okunur): kırmızı başlık; maddeler: "- Kapalı anahtar ve tel: gerilim sıfır", "- Gerilim kaynağı: akımı yük belirler", "- Gerçek pil: büyük akımda gerilim düşer". Koyu yeşil ek satır: "Açık anahtar: akım sıfır".
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağda kroki: ideal kaynak "9 V" + direnç "R"; sol: "R = 30 kΩ, 300 Ω, 3 Ω", "v = ?, i = ?" (mavi), "Gerçek 9 V pilde ideal model en çok hangisinde yanılır?", koyu yeşil "Cevabını yorumlara yaz".
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başında girer.
- "İkinci bölümde": kırmızı başlık "Sıradaki: Ders 2 - Bölüm 2/3", maddeler "- Bağımsız ve bağımlı gerilim kaynakları", "- Kuvvetlendirici modeli". Silme (köşe başlığı da); son 20 sn **bitiş ekranı**: sol üstte "Sıradaki: Bölüm 2 — Bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli" (ön tanıtım cümlesiyle ve plan.md Bölüm 2 adıyla aynı), altında koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş. Müzik (iş emri F kuralı), konuşma yok.
