# Devre Teorisi I: Ders 1 - Bölüm 2/3 — Akımın yönü, açık devre ve akım grafiğinden geçen yük

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA) [17:01–27:52]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`).
**Sürüm 3 (19.11.2026):** `inceleme.md` uygulandı: yeni Parça 2 "Uygulamada: datasheet'teki akımlar" (eski 2–7 → 3–8), kanca vaadine datasheet/pil maddesi, buton + çekme direnci örneği (eski tek pil paragrafının yerine), "de te" okunuşları, birim kolaylığı ve "pil = alan" köprüleri, kapanışa uygulama cümlesi; süre için üç kısaltma (eski Parça 5 integral kontrolü, eski Parça 5 q(t) grafiği, eski Parça 6 alternatif çözüm). Selam (UZUN.md 4a) ve yeni tahta düzeni (UZUN.md 4, 19.11.2026) eklendi. Abone kartları sözlü çağrılarla eşzamanlı (Bölüm 1 iş emri C düzeni): 1. kart Parça 2 sonundaki çağrıda (~4. dk), 2. kart kapanıştaki "Kanala abone olursan…" cümlesinde.

**En sık yapılan hata:** "Açık devrede akım sıfır olduğuna göre gerilim de sıfırdır." Doğrusu: açık devre yalnızca akımın sıfır olduğunu garanti eder; uçlarındaki gerilimi çevresindeki devre belirler (Razavi bu noktayı açıkça uyarır [19:08–19:32]). Örnekte açık anahtarın uçlarında 9 V var. Bölümde tek "En sık yapılan hata" budur; Parça 2'deki tepe/ortalama karışıklığı "tasarımda pahalıya patlayan hata" diye düz anlatılır, ayrı kart almaz.
Az bilinen nokta: doğrusal artan akımda sürenin ilk yarısında toplam yükün yarısı değil, dörtte biri geçer (Parça 6).

Ön bilgi (açıklamaya): Bölüm 1 (i = dq / dt, ortalama akım); Ohm yasası (v = R × i); integral kavramı.

Gösterim: anlık akım küçük i; yük küçük q. Büyük harf I, Q kullanılmaz; **tek istisna** Parça 2'deki datasheet tablosu: sembol datasheet'te yazdığı gibi (I_F(AV), I_FSM, I_D, I_DM; alt simge küçük ve aşağı kaydırılmış), öğrenci sayfada aynısını arayacağı için. Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" hiç kullanılmaz. Referans oku her akımın yanında. Anahtarlar şemada "1. anahtar", "2. anahtar".

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok. "q" sesle "kü", "t" sesle "te", "i" sesle "i". **"de te" yalnızca cümle başında veya bir işlem sözcüğünden ("eşittir", "bölü", "çarpı") sonra geçer, hiçbir zaman bir isimden sonra; `dogrula.py` otomatik denetler** (isimden sonra "de" bağlaç gibi duyulur: inceleme B5). Parça numaraları (1N4007, 2N7002E, TLHR540x, CR2032) ve datasheet sembolleri seste okunmaz: seste "çok kullanılan bir doğrultucu diyot", "elektronik bir anahtar", "bir led", "düğme pil", "ortalama ileri akım", "ani darbe akımı". "mAh" seste "miliamper saat". "datasheet" seste hiç geçmez, yalnızca "veri sayfası" (okunuş riski); ekranda başlıkta "datasheet" yazar. Parça 7'deki "nasıl kurardın?" sonrasına üretimden sonra 1,5 sn sessizlik eklenir (görüntüde kalem hareket eder).

Zaman bütçesi (2,6 kelime/sn: Bölüm 1'in gerçek ölçümü): `dogrula.py` çıktısı. Intro kartı selamla birlikte (~8,4 sn); bitiş ekranı alanı (son 20 sn) Parça 8'in sonunda sessiz.

> **Tahta düzeni (UZUN.md 4 "Tahta düzeni ve yazım", kanal sahibi 19.11.2026; Bölüm 1 iş emri D ile aynı motor):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 1 - Bölüm 2: Akımın yönü, açık devre ve yük"** (Parça 1'de intro kartından sonra kalemle yazılır; sonraki parçalarda sabit; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı, gövdeden büyük. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre), kenar payı ~120 px. Yardımcı etiketler, tablo başlıkları, kaynak satırları ve ara bilgiler **koyu yeşil (#1E7B4A)**; soluk gri yazı yok (gri yalnızca grafikteki kesikli yardımcı çizgiler). Renk anahtarı: siyah ana metin; mavi değişkenler, denklemler, akımlar; kırmızı başlıklar ve "En sık yapılan hata" çerçevesi; koyu yeşil etiketler. Yanıp sönen açık fon vurgusu kalır. Alt %24'lük bant yalnızca abone kartı ve kapanış için.

---

## [PARÇA 1] Kanca, selam, intro kartı (~1:05)

```
Açık bir anahtarın iki ucu arasında kaç volt vardır? İlk akla gelen cevap sıfır. Ne de olsa anahtardan akım geçmiyor.

Ama birazdan çizeceğimiz devrede, açık anahtarın uçları arasında tam dokuz volt var. Akım sıfır, gerilim sıfır değil. Bu konudaki en sık yapılan hata da tam olarak bu ikisini karıştırmak.

Bu bölümün sonunda açık bir anahtarın gerilimini bulacaksın. Akımı yönüyle yazacak, akım grafiğinden geçen yükü bulacaksın. İstenen akımı veren bir devre kuracaksın. Bir veri sayfasında sürekli akımı darbe akımından ayıracak, bir pilin ömrünü de ortalama akımdan hesaplayacaksın.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün Ders Bir'in ikinci bölümünde akımın yönünü, açık devreyi ve akımdan yüke geçişi konuşacağız.

Birinci bölümde akımı, yükün kesitten geçme hızı olarak tanımlamıştık. Konuya girmeden önce, oradaki ortalama ve anlık akımın gerçek bir tasarımda nereye karşılık geldiğine bakalım.
```

Sahne planı:
- 0:00 (ilk kare) kalem sağ sütunda açık bir anahtar sembolü çizer (iki bağlantı noktası, kalkık kol; uçlarda küçük siyah daireler). Uçların arasına mavi "v = ?". Solda kırmızı başlık "Açık anahtar".
- "İlk akla gelen cevap sıfır": sol sütuna kırmızı "v = 0 V ?"; altına mavi "i = 0".
- "tam dokuz volt": "v = 0 V ?" kırmızıyla üstü çizilir, yanına mavi "v = 9 V" (yanıp sönen fon).
- "Bu bölümün sonunda": sol sütunda kırmızı başlık "Bu bölümde", altında sırayla beş madde: "- Açık anahtarın gerilimi", "- Akımın yönü ve akım grafiğinden yük", "- İstenen akımı veren devre", "- Veri sayfasında sürekli ve darbe akımı", "- Pil ömrü ortalama akımdan". Tahta silinir (≤0,3 sn).
- **[INTRO KARTI + SELAM — ~8,4 sn]** Ortada: "Devre Teorisi I: Ders 1 - Bölüm 2/3" (siyah, kırmızı alt çizgi), altına "Akımın yönü, açık devre ve akım grafiğinden yük" (mavi); kart selam cümlesiyle eşzamanlı yazılır, selam bitince silinir.
- "Birinci bölümde": sol üstte kırmızı köşe başlığı yazılır (kanca ve intro kartında köşe başlığı bilerek yok: ilk karede doğrudan çizime başlanır, UZUN.md 4a); altında kırmızı başlık "Bölüm 1'den"; sol sütunda "- Akım i = dq / dt" (i ve denklem mavi), "- Ortalama akım Δq / Δt"; sağ sütunda koyu yeşil "Şimdi: tasarımda karşılığı".

## [PARÇA 2] Uygulamada: datasheet'teki akımlar + abone çağrısı 1 (~3:05)

```
Bir elemanın veri sayfasını aç. Üreticinin verdiği bu sayfada akım için çoğu zaman tek bir satır değil, iki satır görürsün. Birincisi sürekli akım: elemanın uzun süre dayanabildiği akım. İkincisi darbe akımı: yalnızca çok kısa bir süre dayanabildiği akım.

Çok kullanılan bir doğrultucu diyota bakalım. Veri sayfasında ortalama ileri akım bir amper yazıyor. Bu bir amper, yetmiş beş derece ortam sıcaklığında verilmiş. Bu satırın adında ortalama sözcüğü açıkça geçiyor. Hemen yanında ani darbe akımı otuz amper yazıyor, ama yalnızca sekiz virgül üç milisaniyelik tek bir darbe için. Yani bu diyot kısa bir zorlanmaya dayanır, ama sürekli otuz amper taşıyamaz.

Elektronik bir anahtarda ve bir ledde de iki satır görürsün. Ama orada ilk satırın adı ortalama değil, sürekli akım. Bu değerler aşılmaması gereken sınırlardır, çalışma noktası değil. Sürekli akım çoğunlukla ısınmayla sınırlıdır ve sıcaklık arttıkça düşer. Örneğin anahtarın sürekli akımı yirmi beş derecede iki yüz altmış miliamper, seksen beş derecede yüz doksan miliamper.

Bu yüzden bir akım satırını okurken kendine üç soru sor. Bu değer sürekli mi, darbe mi? Hangi süre için verilmiş? Hangi sıcaklıkta ve nasıl monte edilmiş? Koşulunu okumadığın bir değeri, aslında okumamışsın demektir.

Şimdi küçük bir tasarım yapalım. Bir sıcaklık sensörü her saniyede bir uyanıyor ve iki milisaniye boyunca on miliamper çekiyor. Kalan dokuz yüz doksan sekiz milisaniyede uyuyor ve beş mikroamper çekiyor. Onu besleyen düğme pilin üstünde iki yüz yirmi beş miliamper saat yazıyor.

Miliamper saat aslında bir yük birimi. Bir saat üç bin altı yüz saniye. Bir miliamper çarpı üç bin altı yüz saniye, üç bin altı yüz milikulon eder, çünkü miliamperi saniyeyle çarpınca milikulon bulursun. Bu da üç virgül altı kulon. Yani pil bize, verebileceği toplam yükü söylüyor.

Bir saniyede ne kadar yük çekiliyor? Sabit akımda yük, akım çarpı süre. Uyanıkken on miliamper çarpı iki milisaniye, yirmi mikrokulon. Miliamperi milisaniyeyle çarparsan doğrudan mikrokulon bulursun. Uykuda beş mikroamper çarpı dokuz yüz doksan sekiz milisaniye. Beş çarpı dokuz yüz doksan sekiz, dört bin dokuz yüz doksan. Mikroamperi milisaniyeyle çarpınca nanokulon bulursun. Yani dört bin dokuz yüz doksan nanokulon. Bin nanokulon bir mikrokulon olduğu için bu, dört virgül doksan dokuz mikrokulon. Toplam, yirmi artı dört virgül doksan dokuz, yirmi dört virgül doksan dokuz mikrokulon. Bunu bir saniyeye bölünce ortalama akım yaklaşık yirmi beş mikroamper.

Pilin ömrü, kapasite bölü ortalama akım. Yirmi beş mikroamper, sıfır virgül sıfır yirmi beş miliamper. Miliamper saati miliampere bölünce saat kalır. Sıfır virgül sıfır yirmi beşe bölmek, kırkla çarpmak demek. İki yüz yirmi beş çarpı kırk, dokuz bin saat. Dokuz bini yirmi dörde bölünce üç yüz yetmiş beş gün, yani yaklaşık bir yıl. Gerçek ömür sıcaklık ve darbeler yüzünden biraz daha kısa olabilir, tasarımcı pay bırakır.

Tasarımda pahalıya patlayan bir hata da şu: sensörün on miliamper çektiğini görüp ömrü bu tepe değerle hesaplamak. İki yüz yirmi beş bölü on, yirmi iki virgül beş saat. Bir gün bile etmiyor. Dokuz bin bölü yirmi iki virgül beş, dört yüz. Yani doğru sonuçtan yaklaşık dört yüz kat kısa. Kısacası pilin ömrünü ortalama akım belirler, kısa tepeleri ise veri sayfasındaki darbe satırı sınırlar.

Bu serinin devamı için kanala abone olabilirsin.
```

Sahne planı:
- Kırmızı başlık "Uygulamada: datasheet'teki akımlar" (sol, alt çizgili).
- "iki satır görürsün": sol sütunda "- Sürekli akım: uzun süre dayanılan" , "- Darbe akımı: yalnızca çok kısa süre" (siyah; "sürekli" ve "darbe" mavi).
- "doğrultucu diyotla": sağ sütunda kendi çizdiğimiz iki sütunlu tablo (datasheet tablosu kopyalanmaz). Tablo başlıkları koyu yeşil, büyük harfle: "Parça" | "Sürekli" | "Kısa darbe". 1. satır: "1N4007 diyot" | "I_F(AV) = 1 A" altında küçük koyu yeşil "Ortalama, T_A = 75 °C, 9,5 mm bacak" | "I_FSM = 30 A" altında "Tek darbe, 8,3 ms". "ortalama sözcüğü" anında "(AV)" kısmı yanıp sönen fonla vurgulanır.
- "Elektronik bir anahtarda ve bir ledde": tabloya iki satır daha, sırayla: "2N7002E anahtar" | "I_D = 260 mA (25 °C)", altında "190 mA (85 °C)" ve koyu yeşil "FR4 kart, 1 inç² bakır" | "I_DM = 1,2 A", altında "tp = 10 µs"; "TLHR540x LED" | "I_F = 30 mA (≤ 65 °C)" | "I_FSM = 1 A", altında "tp ≤ 10 µs". Tablonun altında koyu yeşil küçük kaynak satırı: "Kaynak: Vishay 1N4001–1N4007 (2020), onsemi 2N7002E (2023), Vishay TLHR540x (2024) datasheet'leri". **Render öncesi:** 2N7002E I_DM koşulu (tp = 10 µs) PDF s. 1'de gözle doğrulanır (`icerik.md` 5b notu).
- "aşılmaması gereken sınırlardır": tablonun üstüne kırmızı küçük "Sınır, çalışma noktası değil". "yetmiş beş derece": "T_A = 75 °C" yanıp söner. "seksen beş derecede": "260 mA (25 °C)" ve "190 mA (85 °C)" sırayla yanıp söner. "ilk satırın adı ortalama değil": anahtar ve LED satırlarının "Sürekli" hücresinin üstüne koyu yeşil "Sürekli (DC), ortalama değil".
- "üç soru sor": tablo silinir (≤0,3 sn); sağ sütunda kırmızı başlık "Üç soru", altında "1. Sürekli mi, darbe mi?", "2. Hangi süre için?", "3. Hangi sıcaklıkta, nasıl monte edilmiş?".
- "küçük bir tasarım": sahne silinir; köşe başlığı kalır. Kırmızı başlık "Mini tasarım: sensör + düğme pil". Sol sütun: "- Her 1 s'de bir uyanır", "- Uyanık: 2 ms boyunca 10 mA", "- Uyku: 998 ms boyunca 5 µA", "- Pil: CR2032, 225 mAh" (koyu yeşil küçük: "Kaynak: Panasonic CR2032 datasheet (2026)"). Sağ sütunda akım grafiği: yatay eksen "t (ms)" işaretler 0, 2, 1000, 1002; dikey eksen "i"; 0–2 ms ve 1000–1002 ms'de dar mavi darbe "10 mA", aralarda tabana çok yakın ince mavi çizgi "5 µA"; koyu yeşil "Ölçekli değil".
- "Miliamper saat aslında bir yük birimi": sol sütunda maddelerin altına "1 saat = 3600 s", "1 mAh = 1 mA × 3600 s = 3600 mC = 3,6 C" (mavi), koyu yeşil "mA × s = mC", "- Miliamper saat (mAh) bir yük birimidir" (yanıp sönen fon).
- "Bir saniyede ne kadar yük": sol sütun silinir; sağ grafik kalır. Sol sütunda sırayla (mavi): "Uyanıkken q = 10 mA × 2 ms = 20 µC", koyu yeşil "mA × ms = µC", "Uykuda q = 5 µA × 998 ms", "5 × 998 = 4990", koyu yeşil "µA × ms = nC", "q = 4990 nC = 4,99 µC", koyu yeşil "1000 nC = 1 µC", "Toplam q = 20 + 4,99 = 24,99 µC", "Ortalama i = 24,99 µC / 1 s ≈ 25 µA" (daire). Sol sütun en çok y ≤ %76.
- "Pilin ömrü": sağ grafik silinir; sağ sütunda "Ömür = kapasite / ortalama akım", "25 µA = 0,025 mA", koyu yeşil "mAh / mA = saat", "225 / 0,025 = 225 × 40 = 9000 saat", "9000 / 24 = 375 gün ≈ 1 yıl" (mavi, daire), koyu yeşil "Gerçek ömür daha kısa olabilir: pay bırak". Bu satırlar "pahalıya patlayan" adımında sol sütuna küçülmeden taşınmaz; sağ sütun silinir (≤0,3 sn), yalnızca "375 gün" satırı kalır.
- "pahalıya patlayan bir hata": sağ sütunda "375 gün" satırının altına siyah düz yazı "Tepe değerle hesap yanlış" ve kırmızı "225 mAh / 10 mA = 22,5 saat"; altına "9000 / 22,5 = 400" ve "- Yaklaşık 400 kat kısa" (kırmızı alt çizgi). Altına mavi kutu iki satır: "Pil ömrünü ortalama akım belirler", "Kısa tepeyi darbe satırı sınırlar". Hepsi y ≤ %76 (abone kartı 1 hemen ardından alt banda girer).
- "Bu serinin devamı için kanala abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda (±0,2 sn) alt banttan girer; iki tık cümle bitmeden (UZUN.md 4b; Bölüm 1 iş emri C). Kalem bu sırada mavi kutunun altını yavaşça çizer.

## [PARÇA 3] Akımın değeri ve yönü, referans oku (~1:45)

```
Şimdi akımla ilgili üç önemli noktaya geçelim. İlk nokta: bir akımı anlatmak için tek bir sayı yetmez. Her akımın bir değeri, bir de yönü vardır.

Yönü şemada bir okla gösteriyoruz. Bu oka referans yönü diyoruz. Oku hangi yöne çizeceğimize biz karar veririz. Kuralımız şu: okun gösterdiği yönde geçen artı yük, artı sayılır. Okun tersine geçen artı yük ise eksi sayılır.

Bir örnekle bakalım. Bir telde, her milisaniyede üç mikrokulonluk artı yük soldan sağa geçiyor. Üç mikrokulon bölü bir milisaniye, üç miliamper. Oku sağa çizersek akım, artı üç miliamper. Oku sola çizersek yük okun tersine gidiyor, akım eksi üç miliamper olur.

Peki hangisi doğru? İkisi de. İki cevap da aynı fiziksel durumu anlatıyor. Eksi işaret, yanlış yön seçtin demek değil. Sadece, yük okun tersine gidiyor demek. Yeter ki ok şemada çizili olsun.

Peki gerçekte ne oluyor? Metal bir telde hareket eden aslında elektronlardır ve elektronun yükü eksidir. Elektronlar sağa doğru gidiyor ve her milisaniyede sağa eksi dört mikrokulon taşıyor olsun. Oku sağa çizelim. Eksi dört mikrokulon bölü bir milisaniye, eksi dört miliamper. Oku sola çevirirsek artı dört miliamper. Yani sağa giden elektronlar, sola doğru dört miliamperlik bir akım demektir. Akımın yönü, artı yükün gittiği yön olarak tanımlanır. Bu yüzden elektronların hareketine ters düşer.

Birinci bölümün son örneğinde bulduğumuz eksi iki miliamper de tam buydu. Dördüncü saniyede altı eksi iki çarpı dört, eksi iki miliamper. Üç saniyeden sonra yük, kesitten ters yönde geçmeye başlamıştı.

Kısacası, şemada her akımın yanına bir ok çiz. Oku olmayan bir akım değeri, eksik bir bilgidir.
```

Sahne planı:
- Kırmızı başlık "1. Değer ve yön". Sağ sütunda kalın yatay tel; iki ucu küçük "Devre" kutularına bağlı (kapalı yol). Kesit dik kesik çizgi. Mavi "+" işaretli noktalar yalnızca telin içinde soldan sağa hareket eder; yanında koyu yeşil "Artı yük varsayalım".
- "referans yönü": telin üstüne mavi ok (sağa), yanında "i"; altına koyu yeşil "Referans yönü". Sol sütunda iki madde: "- Okun yönünde geçen artı yük artı sayılır", "- Okun tersine geçen artı yük eksi sayılır".
- "Bir örnekle bakalım": sol sütun maddelerin altına "Her 1 ms'de 3 µC sağa", "i = 3 µC / 1 ms = 3 mA" (mavi). Sağda iki küçük tel kopyası alt alta: üstte ok sağa, "i = 3 mA" (mavi); altta ok sola, "i = −3 mA" (kırmızı). Yanlarına koyu yeşil "Aynı durum" ve iki satırı birleştiren ince çizgi.
- Silme. "elektronlar": kırmızı başlık "Elektronlar"; tel yeniden; mavi noktalar "−" işaretli, sağa hareket eder. Sol: "Her 1 ms'de sağa −4 µC". Ok sağa: "i = −4 µC / 1 ms = −4 mA" (kırmızı). Ok sola: "i = 4 mA" (mavi). Altına "- Akımın yönü, artı yükün yönüdür" (siyah), "- Elektronların hareketine terstir" (kırmızı alt çizgi).
- "birinci bölümün son örneği": sağ altta koyu yeşil "Bölüm 1: i(4 s) = 6 − 2 × 4 = −2 mA", yanına "Yük ters yönde".
- "her akımın yanına bir ok çiz": son satır "Her akımın yanına ok" (mavi, kutu içinde).

## [PARÇA 4] Açık devre: en sık yapılan hata, buton örneği (~2:20)

```
İkinci nokta açık devre. Şimdi şu devreyi kuralım. Dokuz voltluk bir batarya, üç kiloohmluk bir direnç ve bir anahtar, tek bir halka oluşturacak biçimde bağlı.

Önce anahtar kapalı olsun. Kapalı ideal bir anahtar, bir tel parçası gibidir. Bataryanın dokuz voltu doğrudan direncin uçlarına gelir. Ohm yasasına göre akım, gerilim bölü direnç. Dokuz volt bölü üç kiloohm, üç miliamper. Volt bölü kiloohm, miliamper eder.

Şimdi anahtarı açalım. Açık bir anahtar, açık devredir. İki ucu arasında yükün geçebileceği bir yol yoktur. Yol yoksa akım da yoktur. Halkada tek yol olduğu için halkanın her yerinde akım sıfır.

Peki açık anahtarın uçları arasındaki gerilim ne? İşte en sık yapılan hata burada yapılıyor. Akım sıfır olduğuna göre gerilim de sıfırdır, deyip sıfır volt yazmak.

Doğrusu şu. Direncin içinden akım geçmiyor. Ohm yasasına göre direncin gerilimi, üç kiloohm çarpı sıfır miliamper, yani sıfır volt. Demek ki direncin iki ucu aynı gerilimde. Anahtarın alt ucu, bir telle bataryanın eksi ucuna bağlı. Üst ucu ise direnç üzerinden bataryanın artı ucuna bağlı ve direnç hiçbir gerilim farkı eklemiyor. Böylece anahtarın uçları arasında, bataryanın tam dokuz voltu kalıyor.

Bunu neredeyse her elektronik kartta görürsün. Bir mikrodenetleyicinin girişi, on kiloohmluk bir direnç üzerinden üç virgül üç volta bağlı. Buton ise girişle toprak arasında. Girişin kendisi neredeyse hiç akım çekmez. Buton açıkken bir açık devredir, dirençten akım geçmez. Direncin gerilimi, on kiloohm çarpı sıfır, sıfır volt. Yani giriş üç virgül üç voltta ve butonun uçları arasında da üç virgül üç volt var. Butona basınca akım, üç virgül üç volt bölü on kiloohm, sıfır virgül otuz üç miliamper olur. Kapalı buton bir tel gibidir, girişi doğrudan toprağa bağlar. Bu yüzden giriş sıfır volta iner.

Yani açık devre bize yalnızca bir şeyi garanti eder: içinden geçen akım sıfırdır. Uçları arasındaki gerilim hakkında tek başına hiçbir şey söylemez. O gerilim, açık devreye bağlı olan elemanlardan çıkar.
```

Sahne planı:
- Kırmızı başlık "2. Açık devre". Devre (sol sütun, y %15–72): dikdörtgen halka. Sol kolda batarya (uzun/kısa çizgi, "+" üstte, "9 V"); üst kolda direnç (zikzak, "3 kΩ"); sağ kolda anahtar (önce **kapalı** çizilir); alt kol düz tel. Tel kesintisiz, köşeler bağlı.
- "Kapalı ideal bir anahtar": anahtarın yanına koyu yeşil "Kapalı anahtar tel gibidir". Üst kolda mavi referans oku "i". Sağ sütunda "i = 9 V / 3 kΩ = 3 mA" (mavi), altına koyu yeşil "V / kΩ = mA".
- "anahtarı açalım": kalem anahtarın kolunu kaldırır (kapalı çizim silinir, açık konum çizilir; uçlarda iki küçük daire). Sağa mavi kutu "Açık devrede i = 0". Halkadaki ok yanına "i = 0".
- "en sık yapılan hata": sağ sütunda kırmızı çerçeve, başlık "En sık yapılan hata", altında kırmızı "i = 0 olduğuna göre v = 0 V". Anahtar uçları arasında kırmızı "0 V ?".
- "Doğrusu": kırmızı çerçevenin altına koyu yeşil başlık "Doğrusu", altında sırayla: "Direncin gerilimi = 3 kΩ × 0 mA = 0 V" (siyah), "- Direncin iki ucu aynı gerilimde" (siyah). Devrede anahtarın alt ucundan alt kol üzerinden bataryanın "−" ucuna giden tel mavi kalınlaşır; üst ucundan direnç üzerinden "+" ucuna giden yol da mavi kalınlaşır (sırayla, tek kalem). Anahtarın üst ucuna "+", alt ucuna "−", aralarına mavi "9 V" (kırmızı "0 V ?" üstü çizili).
- "her elektronik kartta": sahne silinir (köşe başlığı kalır). Kırmızı başlık "Uygulamada: buton". Sağ sütunda devre: üstte "3,3 V" ucu; 10 kΩ direnç aşağı; direncin alt ucu bağlantı noktası → sağa "Giriş" oku (mikrodenetleyici kutusu, koyu yeşil "Mikrodenetleyici"); bağlantı noktasından aşağı buton (açık çizilir), butonun altı toprak sembolü. Direnç yanında mavi ok "i". Sol sütunda: "- Giriş neredeyse hiç akım çekmez", "Buton açıkken i = 0", "Direncin gerilimi = 10 kΩ × 0 = 0 V", "Giriş = 3,3 V", "Butonun uçları arasında 3,3 V" (mavi). "Butona basınca": sol sütun silinir; buton kapalı çizilir; "Buton kapalıyken i = 3,3 V / 10 kΩ = 0,33 mA", "- Kapalı buton tel gibidir", "Giriş = 0 V" (mavi).
- "yalnızca bir şeyi garanti eder": sol sütunda (y ≤ %76) mavi kutu "Açık devre yalnızca i = 0'ı garanti eder", altında "- Gerilim, bağlı elemanlardan çıkar" (mavi alt çizgi).

## [PARÇA 5] Akımdan yüke: integral ve alan (~1:55)

```
Üçüncü nokta, birinci bölümde yaptığımızın tersi. Orada yükten akıma gitmiştik: yükün zamana göre türevini aldık. Şimdi elimizde akım var. Belli bir sürede ne kadar yük geçtiğini nasıl buluruz?

Kısacık bir zaman aralığı düşün. De te, işte bu çok kısa zaman aralığının adı. Bu kadar kısa bir sürede akım hemen hemen sabit kalır. O aralıkta geçen yük eşittir i çarpı de te. Grafikte bu, ince bir şerittir. Yüksekliği i. Genişliği ise o kısacık süre. De te. Sıfır anından te bir anına kadar bütün bu şeritleri toplarsak, geçen toplam yükü buluruz. Bu toplamın adı integral. Kü eşittir, sıfırdan te bire, i çarpı de te ifadesinin integrali.

Bunun grafikteki anlamı çok net. Geçen yük, akım grafiğinin altında kalan alandır. Hatırla: pil hesabında akım çarpı süre diye bulduğumuz yükler de aslında dar dikdörtgenlerin alanıydı. Pilin miliamper saati de, pilin verebileceği en büyük alan.

En basit durumla deneyelim. Dört miliamperlik sabit bir akım, üç saniye boyunca akıyor. Grafik bir dikdörtgen. Yüksekliği dört miliamper, genişliği üç saniye. Alan, yükseklik çarpı genişlik. Dört çarpı üç, on iki. Miliamper çarpı saniye, milikulon eder. Yani üç saniyede on iki milikulon geçmiş.

Bu yöntemi birinci bölümdeki örnekle de sınayalım. Orada yük, iki te kare milikulondu ve türevini alıp akımı dört te miliamper bulmuştuk. Şimdi tersinden gidelim. Dört te ifadesinin integrali, te karenin dört katının yarısı, yani iki çarpı te kare. Sıfırdan üç saniyeye integral alırsak, iki çarpı üçün karesi, iki çarpı dokuz, on sekiz milikulon. Birinci bölümde bulduğumuz on sekiz milikulonun aynısı. Türev ile integral, birbirinin tersi.

Bir de işaret meselesi var. Akım eksiyse grafiğin eğrisi yatay eksenin altına iner. Eksenin altındaki alan eksi sayılır. Çünkü o sürede yük, referans okunun tersine geçiyor. Örneğin eksi iki miliamperlik bir akım iki saniye akarsa, iki çarpı eksi iki, eksi dört milikulon. Yani dört milikulonluk yük, okun tersine geçmiş demektir.

Pil hesabında gördüğümüz birim kolaylığını da hatırla: miliamperi milisaniyeyle çarparsan doğrudan mikrokulon bulursun. Bunu hemen şimdi yine kullanacağız.
```

Sahne planı:
- Kırmızı başlık "3. Akımdan yük". Sol sütunda koyu yeşil "Bölüm 1'de yükten akıma: i = dq / dt"; altına mavi "Şimdi akımdan yüke".
- Grafik (sağ sütun, y %25–72): yatay eksen "t", dikey eksen "i"; mavi düzgün bir eğri (genel). "ince bir şerit": eğrinin altında tek ince dikdörtgen, yüksekliği "i", genişliği "dt"; sol sütuna "dq = i × dt" (mavi). Ardından aynı aralıkta birkaç şerit sırayla (kalem her birini tek tek çizer; en fazla 6).
- "Bu toplamın adı integral": sol sütunda büyük "q = ∫₀^t₁ i dt" (mavi; alt ve üst sınır küçük yazı).
- "altında kalan alandır": eğrinin altı 0 ile t₁ arası açık mavi taranır (soldan sağa); sol sütuna "- Yük = alan" (yanıp sönen fon). "Hatırla: pil hesabında": koyu yeşil "Pilin mAh'i de bir alan (akım × süre)".
- Silme. "En basit durum": kırmızı başlık "Sabit akım". Sağ sütunda grafik: yatay eksen "t (s)" işaretler 0, 1, 2, 3; dikey eksen "i (mA)" işaretler 0, 2, 4 (eksen 0–5). Mavi yatay çizgi 0–3 s arası 4 mA; altı taranır. Sol sütunda "q = 4 mA × 3 s = 12 mC" (mavi), altına koyu yeşil "mA × s = mC".
- "birinci bölümdeki örnekle": sol sütun silinir; koyu yeşil "Bölüm 1: q = 2t² mC, i = 4t mA"; mavi "∫ 4t dt = 4t² / 2 = 2t²", "∫₀³ 4t dt = 2 × 3² − 2 × 0² = 18 − 0 = 18 mC"; siyah "- Türev ve integral birbirinin tersi" (mavi alt çizgi).
- "işaret meselesi": sağ altta küçük kroki: eksen altında bir dikdörtgen, içinde kırmızı "−", yanında koyu yeşil "Eksen altındaki alan eksi sayılır". Altına kırmızı "(−2 mA) × 2 s = −4 mC".
- "birim kolaylığını": sol alt kutu "mA × ms = µC".

## [PARÇA 6] Örnek: rampa, sabit ve ters yönlü akım (~2:05)

```
Şimdi daha ilginç bir akım grafiği. Akım, sıfır anında sıfırdan başlıyor ve iki milisaniyede doğrusal olarak altı miliampere çıkıyor. İki ile beş milisaniye arasında altı miliamperde sabit kalıyor. Beş milisaniyede yön değiştiriyor ve sekiz milisaniyeye kadar eksi iki miliamper oluyor. Soru şu: sıfır ile sekiz milisaniye arasında, ok yönünde net ne kadar yük geçti?

Alanı parçalara bölelim. İlk parça bir üçgen. Üçgenin alanı, taban çarpı yükseklik bölü iki. Taban iki milisaniye, yükseklik altı miliamper. İki çarpı altı on iki, on ikinin yarısı altı. Yani ilk iki milisaniyede altı mikrokulon geçmiş.

İkinci parça bir dikdörtgen. Genişliği beş eksi iki, üç milisaniye. Yüksekliği altı miliamper. Üç çarpı altı, on sekiz mikrokulon.

Üçüncü parça yine bir dikdörtgen, ama bu kez eksenin altında. Genişliği sekiz eksi beş, üç milisaniye. Yüksekliği eksi iki miliamper. Üç çarpı eksi iki, eksi altı mikrokulon. Bu sürede yük okun tersine geçiyor.

Şimdi toplayalım. Altı artı on sekiz, yirmi dört. Yirmi dörtten altıyı çıkarınca on sekiz mikrokulon.

Birinci bölümü hatırla: net yükü süreye bölersen ortalama akımı bulursun. On sekiz mikrokulon bölü sekiz milisaniye, iki virgül yirmi beş miliamper. Grafiğe bak: akım hiçbir aralıkta bu değerde kalmıyor, rampada yalnızca bir an bu değerden geçiyor. Bu yine yalnızca bir ortalama. Pil ömrü hesabında işimize yarayan da tam bu ortalamaydı.

Bir de şuna bakalım. Bir milisaniye anında, yani rampanın tam ortasında, ne kadar yük geçmiş? Akım iki milisaniyede altı miliamper artıyor. Altı bölü iki, her milisaniyede üç miliamper. O anda akım, üç çarpı bir, üç miliamper. Küçük üçgenin alanı, bir çarpı üç bölü iki, bir virgül beş mikrokulon. Bu, ilk üçgendeki altı mikrokulonun yarısı mı? Hayır. Bir virgül beşi altıya bölünce sıfır virgül yirmi beş çıkıyor. Yani dörtte biri.

Neden dörtte bir? Çünkü rampanın ilk yarısında akım hâlâ küçük. Yükün çoğu, akımın büyüdüğü ikinci yarıda geçiyor. Zamanın yarısı, yükün yarısı demek değil.
```

Sahne planı:
- Kırmızı başlık "Örnek". Sol sütunda soru (mavi): "- 0–2 ms: 0'dan 6 mA'e doğrusal", "- 2–5 ms: 6 mA", "- 5–8 ms: −2 mA", "0–8 ms net q = ?".
- Grafik (sağ sütun, y %25–72): yatay eksen "t (ms)" işaretler 0, 1, 2, 3, 4, 5, 6, 7, 8; dikey eksen "i (mA)" işaretler −2, 0, 2, 4, 6 (eksen −3…7). Mavi: 0–2 ms rampa (0 → 6), 2–5 ms 6 mA, 5–8 ms −2 mA (5 ms'deki dikey geçiş ince gri kesik). Değerler kodda `console.assert` (i(1) = 3, i(2) = 6, i(6) = −2). Grafiğin üstünde küçük tel çiziminde mavi referans oku (sağa).
- "Alanı parçalara bölelim": soru satırları silinir (sol sütun). Üçgen taranır (açık mavi), içinde "1"; sol sütunda "1. Üçgen: (2 ms × 6 mA) / 2 = 12 / 2 = 6 µC".
- "İkinci parça": dikdörtgen taranır ("2"); "2. Dikdörtgen: (5 − 2) ms × 6 mA = 3 × 6 = 18 µC".
- "Üçüncü parça": eksen altı dikdörtgen kırmızı taranır ("3"); kırmızı "3. Dikdörtgen: (8 − 5) ms × (−2 mA) = 3 × (−2) = −6 µC".
- "toplayalım": "q(5 ms) = 6 + 18 = 24 µC", "q(8 ms) = 24 − 6 = 18 µC" (mavi, daire).
- "ortalama akımı": sol sütun silinir; "Ortalama = 18 µC / 8 ms = 2,25 mA" (siyah); grafikte 2,25 mA'de gri kesikli yatay çizgi, ucunda koyu yeşil "Ortalama". "Pil ömrü hesabında": koyu yeşil "Pil ömrü de ortalamayla".
- "Bir milisaniye anında": grafikte 0–1 ms küçük üçgen koyu mavi; t = 1 ms'de nokta "3 mA". Sol sütunda "Artış hızı = 6 mA / 2 ms = 3 mA / ms", "i(1 ms) = 3 mA / ms × 1 ms = 3 mA", "q(1 ms) = (1 ms × 3 mA) / 2 = 1,5 µC", "1,5 / 6 = 0,25 = dörtte bir" (kırmızı alt çizgi).
- "Neden dörtte bir? … Zamanın yarısı": sol sütunda (y ≤ %76) mavi kutu "Zamanın yarısında yükün dörtte biri".

## [PARÇA 7] Devre kurmak: istenen akımı veren devre (~2:05)

```
Son olarak işi tersine çevirelim. Bu kez bize bir akım dalga biçimi veriliyor. Bizden de bu akımı üreten bir devre kurmamız isteniyor.

İstediğimiz akım şöyle. Bir saniyeye kadar sıfır. Bir ile üç saniye arasında iki miliamper. Üç ile dört saniye arasında altı miliamper. Dört saniyeden sonra yine sıfır. Bu akım bir bataryadan çekilecek.

Elinde on iki voltluk bir batarya, iki direnç ve iki anahtar var. Bir an dur ve düşün: bu devreyi nasıl kurardın?

Bir çözüm şu. Bataryanın iki ucu arasına iki ayrı kol bağlıyoruz. Birinci kolda birinci anahtar ile altı kiloohmluk bir direnç var. İkinci kolda ikinci anahtar ile iki kiloohmluk bir direnç var. İki anahtar hiçbir an aynı anda kapalı değil.

Peki bu direnç değerlerini nereden bulduk? Ohm yasasını tersinden kullandık. Direnç, gerilim bölü akım. İki miliamper istiyorsak, on iki volt bölü iki miliamper, altı kiloohm. Altı miliamper istiyorsak, on iki volt bölü altı miliamper, iki kiloohm. Volt bölü miliamper, kiloohm eder.

Şimdi adım adım izleyelim. Bir saniyeye kadar iki anahtar da açık. Açık devre akımın sıfır olduğunu garanti eder. Bataryadan akım çekilmez.

Bir saniye anında birinci anahtar kapanıyor. Altı kiloohmluk direncin uçlarına bataryanın on iki voltu geliyor. Ohm yasasına göre akım, on iki volt bölü altı kiloohm, iki miliamper. İkinci kol açık, ondan akım geçmiyor. Yani bataryadan çekilen akım iki miliamper.

Üç saniye anında birinci anahtar açılıyor, aynı anda ikinci anahtar kapanıyor. Şimdi on iki volt, iki kiloohmluk direncin uçlarında. Akım, on iki bölü iki, altı miliamper.

Dört saniye anında ikinci anahtar da açılıyor. Akım yeniden sıfır. Ama dikkat et: iki dirençten de akım geçmediği için, iki açık anahtarın uçlarında da on iki volt var. Açık devre örneğindeki dokuz voltluk devrenin aynısı.

Son olarak bu akımın taşıdığı toplam yükü alandan bulalım. İlk dikdörtgen: üç eksi bir, iki saniye. İki saniye çarpı iki miliamper, dört milikulon. İkinci dikdörtgen: dört eksi üç, bir saniye. Bir saniye çarpı altı miliamper, altı milikulon. Toplam, dört artı altı, on milikulon.
```

Sahne planı:
- Kırmızı başlık "İstenen akımı veren devre". İstenen grafik (sağ sütun üst, y %15–45): yatay eksen "t (s)" işaretler 0, 1, 2, 3, 4, 5; dikey eksen "i (mA)" işaretler 0, 2, 4, 6 (eksen 0–7). Mavi basamak: 0–1 s 0; 1–3 s 2 mA; 3–4 s 6 mA; 4 s sonrası 0 (geçişler ince gri kesik). `console.assert`.
- "Elinde": sol sütunda "- 12 V batarya", "- 2 direnç", "- 2 anahtar". "Bir an dur ve düşün": kalem bu üç maddenin etrafına yavaşça daire çizer (1,5 sn sessizlik boyunca hareket sürer).
- Devre (sol sütun, maddeler silindikten sonra, y %15–72): solda batarya ("+" üstte, "12 V"); üst ve alt ana teller; aralarında iki dikey kol: 1. kol "1. anahtar" ve "6 kΩ"; 2. kol "2. anahtar" ve "2 kΩ". İki anahtar başlangıçta açık çizilir. Bataryanın üst telinde mavi referans oku "i" (bataryadan çekilen akım). Tel kesintisiz, bağlantı noktaları dolu siyah nokta.
- "direnç değerlerini nereden bulduk": sağ alt "R = v / i", "R = 12 V / 2 mA = 6 kΩ", "R = 12 V / 6 mA = 2 kΩ" (mavi), koyu yeşil "V / mA = kΩ". Sonra bu satırlar silinir (≤0,3 sn).
- Anahtar zamanları devrenin altına (y ≤ %72), koyu yeşil: "1. anahtar: 1 s'de kapanır, 3 s'de açılır", "2. anahtar: 3 s'de kapanır, 4 s'de açılır".
- "Bir saniye anında": 1. anahtar kapalı çizilir; sağ altta "1 ile 3 s arası: i = 12 V / 6 kΩ = 2 mA" (mavi); 2. kolun yanına koyu yeşil "2. kol açık, i = 0".
- "Üç saniye anında": 1. anahtar açılır, 2. anahtar kapanır; "3 ile 4 s arası: i = 12 V / 2 kΩ = 6 mA" (mavi).
- "Dört saniye anında": 2. anahtar açılır; "4 s'den sonra: i = 0"; iki anahtar ucuna küçük mavi "12 V".
- "toplam yükü": grafikteki iki dikdörtgen taranır; sağ altta "q = (3 − 1) s × 2 mA = 2 × 2 = 4 mC", "q = (4 − 3) s × 6 mA = 1 × 6 = 6 mC", "Toplam yük = 4 + 6 = 10 mC" (mavi, daire).

## [PARÇA 8] Kapanış, abone çağrısı 2 (~1:10 + 20 sn bitiş ekranı)

```
Toparlayalım. Her akımın bir değeri, bir de yönü var. Açık devre yalnızca akımın sıfır olduğunu garanti eder. Uçlarındaki gerilimi çevresindeki devre belirler. Akımdan yüke gitmek için integral alırız. Geçen yük, akım grafiğinin altındaki alandır ve eksenin altındaki alan eksi sayılır. Veri sayfasında da bu iki büyüklükle karşılaştık: pilin ömrünü ortalama akım belirler, kısa zorlanmanın sınırını ise darbe akımı verir.

Sana da bir soru bırakayım. Bir telden iki saniye boyunca beş miliamper, sonraki bir saniye boyunca da eksi üç miliamper akım geçiyor. Üç saniyenin sonunda, ok yönünde net ne kadar yük geçmiştir? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan üçüncü bölümü kaçırmazsın.

Üçüncü bölümde gerilimin ne olduğunu, kısa devrenin bize neyi garanti ettiğini ve ideal kaynağı göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (sol sütun, y %15–65; ≥4 sn okunur): kırmızı başlık "Bilmen gerekenler"; maddeler: "- Her akımın değeri ve yönü var (referans okuyla)", "- Açık devre yalnızca i = 0'ı garanti eder", "- Yük, akım grafiğinin altındaki alandır". (Kart 3 maddede kalır; 4. madde "Datasheet'te sürekli ve darbe akımı ayrı; koşulu oku" yalnızca açıklamadaki listede.) Sağ sütunda "Veri sayfasında": koyu yeşil "- Pil ömrünü ortalama akım belirler", "- Kısa zorlanmanın sınırını darbe akımı verir".
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağda küçük grafik krokisi (0–2 s 5 mA, 2–3 s −3 mA), solda "3 s'de net q = ?" (mavi), "Cevabını yorumlara yaz" (siyah).
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başladığı anda (±0,2 sn) alt banttan girer; iki tık cümle bitmeden (Bölüm 1 iş emri C düzeni).
- "Üçüncü bölümde": silme (köşe başlığı da silinir); son 20 sn **bitiş ekranı**: yalnızca sol üstte koyu "Sıradaki: Bölüm 3 — Gerilim, kısa devre ve ideal kaynak" ve altında küçük koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş (YouTube bitiş ekranı kutuları). Kalem sol üstteki yazının altını yavaşça çizerek hareketi sürdürür (≥2 sn durağan an yok). Ses yok.
