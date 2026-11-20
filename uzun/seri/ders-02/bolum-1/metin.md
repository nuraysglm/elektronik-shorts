# Devre Teorisi I: Ders 2 - Bölüm 1/3 — İdeal tel, anahtar ve gerçek pil

Kaynak: B. Razavi, Basic Circuit Theory, Ders 2 (UCLA) [1:26–15:12]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Razavi'nin örneği (pil + ayarlı direnç, i1'in R1'e göre hiperbolü [12:54–15:12]) ve "1 kΩ, 100 Ω ya da 1 Ω" cümlesi [10:45–10:53] kullanılmadı; yerine ideal ve gerçek kaynağın v–i grafiği ve 150 Ω / 1,5 Ω yükler.
**Sürüm 1 (20.11.2026 gece çalışması 3)**, bağımsız denetimden sonra düzeltildi (1 kritik + 10 önemli + küçük bulgular uygulandı; bkz. dogruluk.md "Denetim").

**En sık yapılan hata:** "Pil her zaman aynı akımı verir" — pili sabit bir akım kaynağı sanmak (yanlış sonuç: 1,5 Ω'dan da 150 Ω'daki gibi 10 mA). Doğrusu: ideal gerilim kaynağı gerilimi sabit tutar, akımı yük belirler (10 mA ve 1 A; ikisinde de 1,5 V). Gerekçe: derslerde bilinen klasik yanlış (icerik.md bölüm 6; fizik eğitimi literatüründe McDermott & Shaffer 1992); Razavi tanımı bu ayrım üzerine kurar [10:36–12:03]. Bölümde tek "En sık yapılan hata" budur; Uygulamadaki buton hatası "tasarımda pahalıya patlayan hata" diye düz anlatılır.
Az bilinen nokta: devre teorisinde "açık anahtar" iletmeyen anahtardır; günlük dildeki "ışığı açmak" (iletmek) ile terstir (Parça 3).

Ön bilgi (açıklamaya): Ders 1 (akım i = dq/dt, gerilim, referans oku, açık devre i = 0, kısa devre v = 0); Ohm yasası (v = R × i).

Gösterim: gerilim küçük v, akım i, direnç R, iç direnç R_iç (ekranda "R_iç", seste "iç direnç"). Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" ve "→" yok. Her gerilimin yanında + ve − işaretleri, her akımın yanında referans oku.

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok. Parça adları (Alpha Wire 3071, PTS645, Energizer E91) ve "AWG", "AA", "datasheet" seste yok: "yirmi iki numara bir bağlantı teli", "altı milimetrelik küçük bir basmalı buton", "kalem pil", "veri sayfası". "mΩ" seste "miliohm", "mV" "milivolt". "ft" seste "fit". Çok sıfırlı ondalıklar seste söylenmez: tel direnci miliohmla ("elli üç virgül bir miliohm").

Zaman bütçesi (2,6 kelime/sn: Ders 1 ölçümü): `dogrula.py` çıktısı. Intro kartı selamla birlikte (~11 sn); bitiş ekranı alanı (son 20 sn) Parça 7'nin sonunda.

> **Kanal intro'su (onaylar/intro-1):** onaylanırsa Parça 1'de kancadan hemen sonra, intro kartından önce 6 sn'lik intro eklenir (müzik açılış kesiti intro boyunca tek başına; UZUN.md 4a-I). Onaylanmazsa Ders 1 düzeni (müzik 3 sn tek başına + intro kartı + selam).

> **Tahta düzeni (UZUN.md 4, Ders 1 motoruyla aynı):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 2 - Bölüm 1: İdeal tel, anahtar ve gerçek pil"** (Parça 1'de intro kartından sonra kalemle yazılır; sonraki parçalarda sabit; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre). Etiketler ve ara bilgiler koyu yeşil (#1E7B4A); gri yalnızca yardımcı çizgiler. Alt %24'lük bant yalnızca abone kartı ve kapanış için.

---

## [PARÇA 1] Kanca, selam, intro kartı (~0:50)

```
Aynı kalem pile önce yüz elli ohmluk, sonra bir buçuk ohmluk bir direnç bağlarsan, pil ikisinden de aynı akımı mı geçirir?

Akla ilk gelen cevap evet olabilir: pil sabit bir akım verir. Bu konudaki en sık yapılan hata da bu. Pili ideal kabul edersek birinci dirençten on miliamper, ikincisinden bir amper geçer. Arada yüz kat fark var. Pilin sabit tutmaya çalıştığı şey akım değil, gerilim. Üstelik bir amper civarında, gerçek bir pilin gerilimi belirgin biçimde düşüyor.

Bu bölümün sonunda ideal teli, ideal anahtarı ve ideal gerilim kaynağını birer model olarak tanıyacaksın. Sonra gerçek parçaların veri sayfasına bakıp ideal modelin ne zaman yettiğine karar vereceksin.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün ikinci dersin ilk bölümünde ideal teli, ideal anahtarı ve gerçek bir pili konuşacağız.
```

Sahne planı:
- 0:00 (ilk kare) sağ sütunda kalem bir pil sembolü çizer ("+" üstte, "1,5 V"), iki kolla bir dirence bağlar; direncin yanında "150 Ω". Kolda mavi referans oku "i = ?". Solda kırmızı başlık "Aynı pil, iki direnç".
- "sonra bir buçuk ohmluk": 150 Ω'un altına ikinci kopya devre, "1,5 Ω", "i = ?".
- "pil sabit bir akım verir": sol sütunda kırmızı "Pil hep aynı akımı verir?"; altında küçük kırmızı "En sık yapılan hata".
- "Pili ideal kabul edersek": soru satırının üstü kırmızıyla çizilir; birinci devrede mavi "i = 10 mA", ikincide "i = 1 A" (yanıp sönen fon), ikisinin yanında koyu yeşil "(ideal pil)"; koyu yeşil "100 kat fark (hesabı birazdan)". (Hesap Parça 4'te tam gösterilir.)
- "sabit tutmaya çalıştığı … gerilim": siyah "Pil gerilimi sabit tutmaya çalışır"; "belirgin biçimde düşüyor": ikinci devrede "1,5 V" yanında kırmızı "Gerçek pilde belirgin biçimde düşer".
- "Bu bölümün sonunda": sahne silinir; kırmızı başlık "Bu bölümde", dört madde: "- İdeal tel ve ideal anahtar", "- İdeal gerilim kaynağı", "- Veri sayfasında tel, buton ve pil". Silinir.
- **[KANAL İNTRO'SU — yalnızca onaylar/intro-1 onaylanırsa]**
- **[INTRO KARTI + SELAM]** Ortada: "Devre Teorisi I: Ders 2 - Bölüm 1/3" (siyah, kırmızı alt çizgi), altına "İdeal tel, anahtar ve gerçek pil" (mavi); selam bitince silinir. Ardından köşe başlığı yazılır.

## [PARÇA 2] Ders 1'den kısa tekrar (~0:55)

```
Birinci dersten birkaç şeyi hatırlayalım. Akım, yükün akış hızıdır: çok kısa bir sürede geçen yükün o süreye bölümü, yani yükün zamana göre türevi. Birimi amper. Gerilim ise hep iki nokta arasında tanımlanır: bir kulonluk pozitif yükü bir noktadan ötekine taşımak için gereken enerji. Birimi volt. Bir direnç için bu iki büyüklük Ohm yasasıyla birbirine bağlanır: gerilim, direnç çarpı akım. Bu yasanın yalnızca dirençler için geçerli olduğunu unutmayalım.

Bir de iki garantimiz vardı. Açık devre yalnızca akımın sıfır olduğunu garanti eder. Kısa devre yalnızca gerilimin sıfır olduğunu garanti eder. Bu iki cümle, bugün göreceğimiz elemanlarda yeniden karşımıza çıkacak.

Büyüklükleri hatırladık. Şimdi bu büyüklüklerle çalışan elemanlara geçiyoruz. Bugün üç eleman var: tel, anahtar ve gerilim kaynağı. Karmaşık devreler kurmadan önce, bu elemanların her birinin neyi garanti ettiğini bilmemiz gerekiyor.
```

Sahne planı:
- Kırmızı başlık "Ders 1'den". Sol sütun: "- Akım: i = dq/dt (A)", "- Gerilim: iki nokta arasında (V)", "- Ohm yasası: v = R × i" (mavi), koyu yeşil "Yalnızca direnç için".
- "iki garantimiz": sağ sütunda iki sütunlu küçük tablo, koyu yeşil başlıklar "Açık devre" | "Kısa devre": "i = 0" | "v = 0" (mavi).
- "üç eleman var": sol silinir; kırmızı başlık "Bugün: üç eleman"; "- Tel", "- Anahtar", "- Gerilim kaynağı" (her biri yazılırken sağda küçük sembolü: düz çizgi, anahtar kolu, daire içinde + ve −).

## [PARÇA 3] İdeal tel, abone çağrısı 1, ideal anahtar ve eşdeğerlikler (~3:00)

```
İlk eleman tel. Gerçek bir telin küçük de olsa bir direnci var. Devre çözerken ise teli ideal kabul ederiz: direnci sıfır. Kapasitansı ve endüktansı da sıfır sayılır; bu iki büyüklüğü ilerideki derslerde tanıyacağız. Bu varsayım hesaplarımızı çok sadeleştirir. Birazdan veri sayfasında göreceğimiz gibi, masa üstündeki küçük devrelerde gerçeğe de çok yakındır.

Direnci sıfır olan bir bağlantıyı aslında tanıyoruz. Birinci dersin üçüncü bölümünde kısa devre için gördüğümüz gibi, direnç sıfırsa ve akım sonluysa, gerilim de sıfırdır. Yani ideal tel bir kısa devredir. Bir şemada gördüğün her tel parçası için ilk düşünmen gereken şey bu: bu telin bütün noktaları aynı gerilimde.

Bu serinin devamı için kanala abone olabilirsin.

İkinci eleman anahtar. Burada önce bir dil tuzağını aradan çıkaralım. Günlük hayatta ışığı açmak, akımı geçirmek demektir. Devre teorisinde ise tersi. Açık anahtar, kontakları birbirinden ayrık olan anahtardır; akım geçmez. Kapalı anahtar, kontakları birleşik olan anahtardır; akımı iletir.

İdeal anahtar açıkken açık devre gibi davranır. Garanti ettiği tek şey, akımın sıfır olması. Kapalıyken direnci sıfırdır, yani bir tel gibi davranır; bir kısa devredir. Garanti ettiği tek şey, uçları arasındaki gerilimin sıfır olması.

Peki öbür büyüklük ne olacak? Açık anahtarın gerilimi ya da kapalı anahtarın akımı, anahtarın kendisinden okunamaz. İkisini de anahtara bağlı olan devre belirler.

Bir örnekle görelim. Dört buçuk voltluk ideal bir gerilim kaynağı, bir buçuk kiloohmluk bir direnç ve bir anahtar, seri bağlanıp tek bir halka oluşturuyor. Önce anahtarı kapatalım. Kapalı anahtar bir tel gibidir, uçlarında sıfır volt var. O zaman direnç doğrudan kaynağa bağlanmış olur ve uçlarında dört buçuk volt görür. Akım, dört buçuk volt bölü bir buçuk kiloohm, üç miliamper.

Şimdi anahtarı açalım. Açık anahtar açık devredir, akım sıfır. Direncin uçlarındaki gerilim, direnç çarpı akım: bir buçuk kiloohm çarpı sıfır, sıfır volt. Akım taşımayan direncin iki ucu aynı gerilimde, tıpkı bir tel gibi. Direnç sıfır volt alıyor. Kaynağın dört buçuk voltundan sıfırı çıkarınca dört buçuk volt kalır; bu gerilim anahtarın uçlarında görünür. Birinci dersin ikinci bölümündeki açık devre örneğini hatırla.

İki durumda da anahtar bir büyüklüğü garanti etti: kapalıyken gerilimi, açıkken akımı. Diğer büyüklüğü devre belirledi.

Buradan iki eşdeğerlik çıkıyor ve ileride bunları sürekli kullanacağız. Açık devre, sıfır akım ve açık anahtar aynı şeydir. Kısa devre, ideal tel, kapalı anahtar ve sıfır gerilim farkı da aynı şeydir.
```

Sahne planı:
- Kırmızı başlık "İdeal tel". Sol: "- Direnci sıfır (R = 0)", koyu yeşil "Kapasitansı ve endüktansı da sıfır (C = 0, L = 0), ileride", "- Bir modeldir". Sağ sütunda yatay bir tel, üzerinde iki nokta "a" ve "b".
- "kısa devre için gördüğümüz gibi": sol: "v = R × i = 0 × i = 0" (mavi), koyu yeşil "i sonlu olduğu sürece (Ders 1 - Bölüm 3)". Sağ: a ile b arasına "+" ve "−", mavi "v_ab = 0". "ideal tel bir kısa devredir": mavi kutu "İdeal tel bir kısa devredir"; koyu yeşil "Telin bütün noktaları aynı gerilimde".
- "abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda alt banttan girer (Ders 1 düzeni); kalem mavi kutunun altını yavaşça çizer. Bütün yazılar y ≤ %76.
- Silme (köşe başlığı kalır). Kırmızı başlık "İdeal anahtar". "dil tuzağı": iki sütunlu kutu (kırmızı çerçeve) koyu yeşil başlıklar "Günlük dil" | "Devre teorisi": "Işığı açmak: akım geçer" | "Açık anahtar: kontak ayrık, akım yok"; altına "Kapalı anahtar: kontak birleşik, iletir" (sağ sütunda). Sağda iki anahtar sembolü: kolu havada (açık), kolu temas eden (kapalı).
- "İdeal anahtar açıkken": kutu silinir; açık anahtarın altına "Açık anahtar bir açık devredir", "i = 0" (mavi); kapalı anahtarın altına "Kapalı anahtar bir kısa devredir (R = 0)", "v = 0" (mavi).
- "öbür büyüklük": açık anahtarın yanına kırmızı "v = ?", kapalı anahtarın yanına kırmızı "i = ?"; koyu yeşil "Bağlı olduğu devre belirler".
- Silme. Kırmızı başlık "Örnek". Sağ sütunda dikdörtgen halka: sol kolda ideal gerilim kaynağı (daire, "+" üstte, "4,5 V"), üst kolda "1,5 kΩ" (+ solda, − sağda, "v_R"), sağ kolda anahtar ("v_anahtar", + üstte); üst kolda mavi referans oku "i". "anahtarı kapatalım": anahtar kolu kapanır; sol sütun: "Kapalıyken v_anahtar = 0", "v_R = 4,5 V", "i = v_R / R = 4,5 V / 1,5 kΩ = 3 mA" (mavi).
- "anahtarı açalım": anahtar kolu açılır; sol sütun altına: "Açıkken i = 0", "v_R = R × i = 1,5 kΩ × 0 = 0 V", "v_anahtar = 4,5 V − v_R = 4,5 − 0 = 4,5 V" (mavi, yanıp sönen fon). Koyu yeşil "Ders 1 - Bölüm 2'deki açık devre gibi".
- "İki durumda da": koyu yeşil "Kapalıyken v = 0 garantili; akımı devre belirler", "Açıkken i = 0 garantili; gerilimi devre belirler".
- Silme. Kırmızı başlık "Eşdeğerlikler". İki satır, kalemle soldan sağa: "- Açık devre, sıfır akım (i = 0) ve açık anahtar aynı şeydir", "- Kısa devre, ideal tel (R = 0), kapalı anahtar ve sıfır gerilim farkı (v = 0) aynı şeydir" (ikinci satır iki satıra bölünür; her terimin altında küçük sembolü).

## [PARÇA 4] Gerilim kaynağı: semboller, tanım, grafik, en sık yapılan hata (~3:00)

```
Üçüncü eleman gerilim kaynağı. Şemada iki sembolle karşılaşırsın. Birincisi bir daire, içinde artı ve eksi işaretleri, yanında değeri ya da adı. Bu genel semboldür: gerilim sabit de olabilir, zamanla değişen de. İkincisi, uzunlu kısalı paralel çizgilerden oluşan pil sembolü. Bu derste pil sembolünü yalnızca zamanla değişmeyen, sabit bir gerilim için kullanacağız. Hangisini kullanırsan kullan, artı ve eksi uçları yazmayı unutma.

Birinci derste ideal kaynağın, uçlarındaki gerilimi aynı tuttuğunu söylemiştik. Şimdi bunu bir tanım olarak yazalım. İdeal gerilim kaynağı, uçları arasındaki gerilimi içinden geçen akıma bağlı olmayan iki uçlu bir elemandır. Bu gerilim sabit olabilir ya da zamanla değişebilir. Önemli olan akıma bağlı olmaması.

Kaynağın ne yaptığını en açık biçimde bir grafik gösterir. Yatay eksene kaynaktan çıkan akımı, dikey eksene kaynağın uç gerilimini koyalım. Akımın referans yönü, kaynağın artı ucundan dışarı doğru. Bir buçuk voltluk ideal bir kaynakta akım sıfırken gerilim bir buçuk volt. Yarım amperde yine bir buçuk volt. Bir amperde de bir buçuk volt. Noktaları birleştirirsek yatay bir doğru çıkar. İdeal gerilim kaynağının imzası bu yatay doğrudur: akım ne olursa olsun, gerilim aynı.

Dikkat et, grafik kaynağın hangi akımda çalışacağını söylemiyor. Onu kaynak seçmez, bağladığımız yük seçer.

İşte en sık yapılan hata tam burada yapılıyor: pili sabit bir akım veren bir eleman sanmak. Bu hatayla, yüz elli ohmda on miliamper geçtiğini bulan biri, bir buçuk ohmda da on miliamper geçeceğini söyler. Direnç yüz kat küçülse bile akım aynı kalır sanılır.

Doğrusu şu. Gerilim kaynağı gerilimi sabit tutar, akımı bağlanan yük belirler. Yüz elli ohmda akım, bir buçuk volt bölü yüz elli ohm, sıfır virgül sıfır bir amper, yani on miliamper. Bir buçuk ohmda, bir buçuk volt bölü bir buçuk ohm, bir amper. Bir amper bin miliamper eder; bin bölü on, yüz. Akım yüz kat değişti. İki durumda da ideal kaynağın uçlarında bir buçuk volt var. Bu iki çalışma noktası, aynı yatay doğrunun üzerinde iki ayrı nokta.

Ama dersin başında bir şey daha söylemiştik: bir amper civarında gerçek bir pilin gerilimi belirgin biçimde düşüyor. Yani gerçek pil ideal bir kaynak değil. Nedenine şimdi bakalım.
```

Sahne planı:
- Kırmızı başlık "Gerilim kaynağı". Sağ sütunda iki sembol yan yana: daire içinde "+" ve "−", yanında "v_1"; pil sembolü (uzun ve kısa çizgiler), yanında "+" ve "−" ayrıca yazılı, "1,5 V". Sol: "- Daire: genel sembol (sabit ya da değişen)", "- Pil sembolü: bu derste yalnızca sabit gerilim", "- Artı (+) ve eksi (−) uçları yaz".
- "tanım olarak yazalım": sol silinir; mavi kutu (iki satır): "İdeal gerilim kaynağı: uç gerilimi", "içinden geçen akıma bağlı olmayan iki uçlu eleman". Koyu yeşil "Gerilim sabit ya da zamanla değişen olabilir".
- "bir grafik gösterir": sağ sütunda grafik: yatay eksen "i (A)" 0 … 1,1 (işaretler 0; 0,5; 1), dikey eksen "v (V)" 0 … 1,6 (işaretler 0,5; 1; 1,5). Grafiğin solunda küçük kroki: kaynak, + ucundan dışarı mavi ok "i". Noktalar sırayla: (0; 1,5), (0,5; 1,5), (1; 1,5) mavi; sol sütunda koyu yeşil "i = 0 iken v = 1,5 V", "i = 0,5 A iken v = 1,5 V", "i = 1 A iken v = 1,5 V"; sonra mavi yatay doğru; mavi etiket (doğrunun üstünde, ortada) "İdeal kaynak: yatay doğru". (Eğri kodda formülden; assert: i = 0, 0,5, 1 A'de y piksel aynı.)
- "hangi akımda çalışacağını": koyu yeşil "Çalışma noktasını yük seçer".
- "En sık yapılan hata": sol silinir; sol sütunda kırmızı çerçeve "En sık yapılan hata: Pil hep aynı akımı verir", içinde kırmızı "150 Ω'da 10 mA ise 1,5 Ω'da da 10 mA" (yanlış sonuç).
- "Doğrusu": koyu yeşil "Doğrusu: Pil gerilimi sabit tutar; akımı yük belirler (i = v / R)", altında mavi "150 Ω: i = 1,5 V / 150 Ω = 0,01 A = 10 mA", "1,5 Ω: i = 1,5 V / 1,5 Ω = 1 A", "1 A = 1000 mA; 1000 mA / 10 mA = 100 kat"; koyu yeşil "İkisinde de v = 1,5 V (ideal)". Grafikte (0,01; 1,5) ve (1; 1,5) noktaları yanıp söner; etiketleri doğrunun **üstünde**: "150 Ω" noktanın sağ üstünde (y ekseni etiketinden ve "İdeal kaynak" etiketinden uzak; kontrol.mjs çakışma taraması), "1,5 Ω" sağ üstte.
- "gerçek bir pilin gerilimi": kartın altına kırmızı küçük "Gerçek pilde büyük akımda gerilim de düşer" (paket 6 kart önerisi).

## [PARÇA 5] Gerçek pil: iç direnç ve eğimli doğru (~2:00)

```
Bir kalem pilin veri sayfası, anma geriliminin yanında bir sayı daha verir: iç direnç. Bu sayı, pilin neden ideal olmadığını anlatıyor.

Gerçek pil, ideal bir gerilim kaynağı ile ona seri bağlı küçük bir direnç gibi davranır. Bu dirence iç direnç diyoruz. Pilin içinde gerçekten ayrı bir direnç parçası yok; pil, böyle bir direnç varmış gibi davranıyor. İç dirençten akım geçince, onun uçlarında iç direnç çarpı akım kadar gerilim kaybolur. Pilin uç gerilimi de bu kadar düşer. Akım küçükse kayıp küçük, akım büyüdükçe kayıp da büyür.

Sayılarla görelim. Üreticinin veri sayfasına göre, taze bir alkalin kalem pilin iç direnci sıfır virgül on beş ile sıfır virgül üç ohm arasında. Büyük olanı alalım: sıfır virgül üç ohm. Modelin içindeki ideal kaynak, pilin bir buçuk voltluk anma gerilimi. Uç gerilimi, bir buçuk eksi sıfır virgül üç çarpı akım.

Akım sıfırken, sıfır virgül üç çarpı sıfır, sıfır. Uç gerilimi bir buçuk volt. Yarım amperde, sıfır virgül üç çarpı sıfır virgül beş, sıfır virgül on beş volt kaybolur. Bir buçuk eksi sıfır virgül on beş, bir virgül otuz beş volt. Bir amperde, sıfır virgül üç çarpı bir, sıfır virgül üç volt kaybolur. Bir buçuk eksi sıfır virgül üç, bir virgül iki volt.

Bu noktaları aynı grafiğe koyarsak, yatay doğrunun altında aşağı eğimli bir doğru çıkar. Eğimin büyüklüğü iç direncin kendisi: her amper için sıfır virgül üç volt düşüş. Akım küçükken iki doğru neredeyse üst üste. Akım büyüdükçe aralarındaki fark açılıyor. Akım küçük kaldıkça gerçek pil ideal modele çok yakın davranır.

Bu modelin devre olarak tam çözümünü, seri dirençleri göreceğimiz üçüncü derste yapacağız. Şimdilik şu tahmin yeter: pilin kaybettiği gerilim, yaklaşık olarak iç direnç çarpı akım.
```

Sahne planı:
- Kırmızı başlık "Gerçek pil". Sağ sütunda kesikli bir kutu (koyu yeşil "Gerçek pil"); içinde ideal kaynak (daire, "+", "1,5 V") ve ona seri küçük direnç "R_iç"; kutunun iki ucunda "+" ve "−", mavi "v". Dışarı mavi ok "i". Koyu yeşil "Bir model: pilin içinde ayrı bir direnç parçası yok". Sol: "- İç direnç (R_iç)", "- Kaybolan gerilim: R_iç × i" (mavi), "- Akım büyüdükçe kayıp büyür".
- "Sayılarla görelim": sol: koyu yeşil "Taze alkalin kalem pil: R_iç 0,15 Ω ile 0,3 Ω arası (veri sayfası)", "R_iç = 0,3 Ω alalım", koyu yeşil "Anma gerilimi 1,5 V", mavi kutu "v = 1,5 − 0,3 × i".
- Kroki silinir, Parça 4'teki grafik sağ sütunda yeniden (mavi yatay doğruyla) çizilir. Sol sütunda sırayla: "i = 0 iken v = 1,5 − 0,3 × 0 = 1,5 V", "i = 0,5 A iken 0,3 × 0,5 = 0,15 V; v = 1,5 − 0,15 = 1,35 V", "i = 1 A iken 0,3 × 1 = 0,3 V; v = 1,5 − 0,3 = 1,2 V" (mavi). Her satırla grafikte kırmızı nokta: (0; 1,5), (0,5; 1,35), (1; 1,2).
- "aşağı eğimli bir doğru": kırmızı doğru noktalardan geçer; kırmızı etiket (doğrunun altında) "Gerçek pil: v = 1,5 − 0,3 × i"; koyu yeşil "Her 1 A için 0,3 V düşüş"; 1 A'de iki doğru arasına küçük koyu yeşil dikey çizgi "0,3 V". (Eğri kodda formülden; assert: i = 0,5 A'de 1,35 V, 1 A'de 1,2 V.)
- "üçüncü derste": koyu yeşil "Tam çözüm: Ders 3 (seri dirençler)", mavi kutu "Kaybolan gerilim ≈ R_iç × i".

## [PARÇA 6] Uygulamada: gerçek tel, gerçek buton, gerçek pil (~3:50)

```
Şimdi bu modelleri gerçek parçalarla karşılaştıralım. Tel, kapalı anahtar ve pil, gerçek parçalarda küçük birer dirençle karşımıza çıkıyor. Tasarımcı her birinde aynı soruyu sorar: bu akımda, bu direncin uçlarındaki gerilim devrem için önemli mi? Önemsizse ideal model yeter.

Önce tel. Yirmi iki numara bir bağlantı telinin veri sayfası, bin fit uzunluk için on altı virgül iki ohm direnç veriyor. Bir fit, sıfır virgül üç sıfır dört sekiz metre. Bin çarpı sıfır virgül üç sıfır dört sekiz, üç yüz dört virgül sekiz metre. On altı virgül iki ohm bölü üç yüz dört virgül sekiz metre, metre başına yaklaşık sıfır virgül sıfır beş üç ohm; bin ile çarparsak, elli üç virgül bir miliohm. Yirmi santimetre, sıfır virgül iki metre eder. Metre başına elli üç virgül bir miliohm çarpı sıfır virgül iki metre, yaklaşık on virgül altı miliohm.

Sonra buton. Altı milimetrelik küçük bir basmalı butonun veri sayfasında iki satır önemli. Kapalıyken kontak direnci en çok yüz miliohm, yani sıfır virgül bir ohm. Bir de buton en çok elli miliamper ve on iki volt için yapılmış. Yani bu buton, yalnızca bu sınırlar içinde ideal bir anahtara benzer.

Pilin iç direncini zaten biliyoruz: en çok sıfır virgül üç ohm.

Şimdi bu üç parçayla küçük bir tasarım yapalım. Bir kalem pil, bir buton ve yirmi santimetrelik bir telle bir yükü çalıştıracağız. İki yük deneyeceğiz.

Birincisi yüz elli ohm. İdeal modelde akım, bir buçuk volt bölü yüz elli ohm, on miliamper. Buton için uygun mu? On miliamper elli miliamperden küçük, bir buçuk volt da on iki volttan küçük. Uygun. Peki gerçek parçalarda ne kadar gerilim kaybolur? En kötü değerlerle hesaplayalım. Pilin iç direncinde, sıfır virgül üç ohm çarpı on miliamper, üç milivolt. Butonda, sıfır virgül bir ohm çarpı on miliamper, bir milivolt. Telde, on virgül altı miliohm çarpı on miliamper, yaklaşık sıfır virgül on bir milivolt. Toplam, üç artı bir artı sıfır virgül on bir, yaklaşık dört virgül bir milivolt. Bir buçuk volt, bin beş yüz milivolt eder. Dört virgül bir bölü bin beş yüz, çarpı yüz, yaklaşık yüzde sıfır virgül yirmi yedi. İdeal model burada çok iyi.

İkincisi bir buçuk ohm; küçük bir motor ya da ısıtıcı gibi. İdeal modelde akım, bir buçuk bölü bir buçuk, bir amper. Buton için uygun mu? Bir amper bin miliamper eder. Bin bölü elli, yirmi. Akım butonun sınırının yirmi katı. Uygun değil. Pilde kaybolan gerilimi ideal akımla tahmin edelim: sıfır virgül üç ohm çarpı bir amper, en fazla sıfır virgül üç volt kadar. Sıfır virgül üç bölü bir buçuk, sıfır virgül iki; yani yüzde yirmi. İdeal model burada yetmez. Pilin gerilimi belirgin biçimde düşer, akım da bir amperin altında kalır.

Pil için pratik bir kural var: yük direnci, pilin iç direncinin en az on katı olsun. Bu pil için on çarpı sıfır virgül üç, üç ohm. Bu sınırda ideal akım, bir buçuk bölü üç, yarım amper. Kaybolan gerilim yaklaşık sıfır virgül üç çarpı sıfır virgül beş, sıfır virgül on beş volt. Sıfır virgül on beş bölü bir buçuk, sıfır virgül bir; yani yaklaşık yüzde on. Yüz elli ohm bu kuralı rahatça sağlıyor, bir buçuk ohm sağlamıyor.

Tasarımda pahalıya patlayan bir hata da şu: kontak direnci küçük diye butonun her akımı taşıyacağını sanmak. Bu butonla bir amperlik bir motoru doğrudan açıp kapatırsan, buton veri sayfasının güvence verdiği sınırın dışında çalışır ve kontakları zarar görebilir. Bunun yerine buton, küçük bir akımla bir elektronik anahtarı kumanda eder; motorun akımını o anahtar taşır. Bu elektronik anahtarları ileride göreceğiz.
```

Sahne planı:
- Kırmızı başlık "Uygulamada: gerçek tel, buton ve pil" (altında koyu yeşil küçük "Veri sayfası"). Sol: mavi kutu "Soru: Bu akımda v = R × i önemli mi?", koyu yeşil "Önemsizse ideal model yeter".
- Kendi tablomuz (veri sayfası tablosu kopyalanmaz), sağ sütun ve alt, koyu yeşil başlıklar: "Parça" | "İdeal modeli" | "Gerçek değeri". Satır 1 (tel): "22 AWG bağlantı teli" | "R = 0" | "16,2 Ω (1000 ft için)". "Bir fit": tablonun altında mavi "1 ft = 0,3048 m; 1000 × 0,3048 m = 304,8 m", "16,2 Ω / 304,8 m ≈ 0,053 Ω/m = 53,1 mΩ/m", "20 cm = 0,20 m: 53,1 mΩ/m × 0,20 m ≈ 10,6 mΩ".
- Satır 2 (buton): "6 mm basmalı buton" | "Kapalıyken R = 0" | "Kontak direnci en çok 100 mΩ (0,1 Ω); en çok 50 mA ve 12 V DC". "bu sınırlar içinde": "50 mA ve 12 V" yanıp söner.
- Satır 3 (pil): "Alkalin kalem pil (AA)" | "R_iç = 0" | "R_iç 0,15 Ω ile 0,3 Ω arası (taze)". Kaynak satırı (koyu yeşil, küçük): "Kaynak: Alpha Wire 3071 (2013), C&K PTS645 (2022), Energizer E91 (E91NA0323) veri sayfaları".
- Silme. Kırmızı başlık "Mini tasarım". Sağ sütun üst: halka devre: pil ("+", "1,5 V", koyu yeşil "R_iç"), buton, "20 cm tel" etiketi, yük "R_yük"; mavi ok "i".
- "Birincisi yüz elli ohm": sol sütun, koyu yeşil alt başlık "(a) R_yük = 150 Ω": "i = 1,5 V / 150 Ω = 10 mA" (mavi); koyu yeşil "Buton uygun (10 mA < 50 mA, 1,5 V < 12 V)"; "Pil: 0,3 Ω × 10 mA = 3 mV", "Buton: 0,1 Ω × 10 mA = 1 mV", "Tel: 10,6 mΩ × 10 mA ≈ 0,11 mV"; "Toplam ≈ 3 + 1 + 0,11 ≈ 4,1 mV" (mavi); "1,5 V = 1500 mV", "4,1 mV / 1500 mV ≈ 0,0027 = %0,27" (mavi kutu), koyu yeşil "İdeal model çok iyi".
- Silme (devre kalır). "(b) R_yük = 1,5 Ω": "i = 1,5 V / 1,5 Ω = 1 A" (mavi); "1 A = 1000 mA; 1000 mA / 50 mA = 20 kat", kırmızı "Buton uygun değil"; "Pil: 0,3 Ω × 1 A = 0,3 V (en fazla; ideal akımla tahmin)", "0,3 V / 1,5 V = 0,2 = %20" (mavi); kırmızı "İdeal model yetmez".
- "pratik bir kural": sağ sütunda mavi kutu "Kural: R_yük ≥ 10 × R_iç", "10 × 0,3 Ω = 3 Ω", "Sınırda: i = 1,5 V / 3 Ω = 0,5 A", "0,3 Ω × 0,5 A = 0,15 V", "0,15 V / 1,5 V = 0,1 ≈ %10"; koyu yeşil "150 Ω sağlıyor, 1,5 Ω sağlamıyor". Koyu yeşil küçük kaynak "Hayes ve Horowitz, The Art of Electronics: Student Manual".
- "pahalıya patlayan": kırmızı "Butonla 1 A'lik motoru doğrudan sürmek: sınırın 20 katı"; koyu yeşil "Bunun yerine: buton küçük akımla bir elektronik anahtarı kumanda eder (ileride)". Bütün yazılar y ≤ %76.

## [PARÇA 7] Kapanış, yorum sorusu, abone çağrısı 2 (~1:05 + 20 sn bitiş ekranı)

```
Toparlayalım. İdeal tel ve kapalı anahtar, uçları arasındaki gerilimin sıfır olduğunu garanti eder; akımı çevre belirler. Açık anahtar, akımın sıfır olduğunu garanti eder; gerilimi çevre belirler. İdeal gerilim kaynağının uç gerilimi akıma bağlı değildir; grafiği yatay bir doğrudur. Gerçek bir pil ise büyük akımda, iç direnci yüzünden gerilim kaybeder.

Sana da bir soru bırakayım. Dokuz voltluk bir pilin iç direncini iki ohm kabul edelim. Bu pile önce dokuz yüz ohmluk, sonra dokuz ohmluk bir yük bağlıyoruz. İdeal akımla tahmin edersek, her durumda pilin içinde ne kadar gerilim kaybolur? Hangisinde ideal model yeter? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan ikinci bölümü kaçırmazsın.

İkinci bölümde bağımsız ve bağımlı gerilim kaynaklarını, bir de bağımlı bir kaynağın bir kuvvetlendiriciyi nasıl modellediğini göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥4 sn okunur): kırmızı başlık; üç madde: "- Kapalı anahtar ve tel: gerilim sıfır", "- İdeal kaynak: akım ve gerilim grafiği yatay doğru", "- Gerçek pil: büyük akımda gerilim düşer". (Dördüncü madde "Açık anahtar: akım sıfır" yalnızca açıklamada.)
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağda kroki: kesikli kutu içinde "9 V" ideal kaynak + "R_iç = 2 Ω", dışında yük "R_yük"; sol: "R_yük: önce 900 Ω, sonra 9 Ω", "Pilin içinde kaybolan gerilim = ?" (mavi), "İdeal model hangisinde yeter?", koyu yeşil "Cevabını yorumlara yaz".
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başında girer.
- "İkinci bölümde": kırmızı başlık "Sıradaki: Ders 2 - Bölüm 2/3", maddeler "- Bağımsız ve bağımlı gerilim kaynakları", "- Kuvvetlendirici modeli". Silme (köşe başlığı da); son 20 sn **bitiş ekranı**: sol üstte "Sıradaki: Bölüm 2 — Bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli" (ön tanıtım cümlesiyle ve plan.md Bölüm 2 adıyla aynı; uzun tire UZUN.md 4a bitiş ekranı kalıbı), altında koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş. Müzik (iş emri F kuralı), konuşma yok.
