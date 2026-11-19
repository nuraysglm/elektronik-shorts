# Devre Teorisi I: Ders 1 - Bölüm 2/3 — Akımın yönü, açık devre ve akım grafiğinden geçen yük

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA) [17:01–27:52]. Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Sürüm 1 (19.11.2026).

**En sık yapılan hata:** "Açık devrede akım sıfır olduğuna göre gerilim de sıfırdır." Doğrusu: açık devre yalnızca akımın sıfır olduğunu garanti eder; uçlarındaki gerilimi çevresindeki devre belirler (Razavi bu noktayı açıkça uyarır [19:08–19:32]). Örnekte açık anahtarın uçlarında 9 V var.
Az bilinen nokta: doğrusal artan akımda sürenin ilk yarısında toplam yükün yarısı değil, dörtte biri geçer (Örnek 2).

Ön bilgi (açıklamaya): Bölüm 1 (i = dq / dt); Ohm yasası (v = R × i); integral kavramı.

Gösterim: anlık akım küçük i; yük küçük q. Büyük harf I, Q kullanılmaz. Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" hiç kullanılmaz. Referans oku her akımın yanında. Anahtarlar şemada "S1", "S2" yerine "1. anahtar", "2. anahtar" (alt simge motorda küçük rakam; gerekirse yalnızca kodda S₁).

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1). Metinde rakam, simge, parantez yok. "q" sesle "kü", "t" sesle "te", "i" sesle "i". "de te" ve "de kü" yalnızca "eşittir/bölü" sonrasında veya cümle başında geçer. Parça 6'daki "nasıl kurardın?" sonrasına üretimden sonra 1,5 sn sessizlik eklenir (görüntüde kalem hareket eder).

Zaman bütçesi (2,6 kelime/sn: Bölüm 1'in gerçek ölçümü, 2050 kelime → 788 sn ses; 2,35 ile hesap ~15,6 dk, ikisi de 13–17 dk aralığında): `dogrula.py` çıktısı. Intro kartı (4 sn, sessiz) parça 1'deki işarette; bitiş ekranı alanı (son 20 sn) parça 7'nin sonunda sessiz.

---

## [PARÇA 1] Kanca, intro kartı (~0:55)

```
Açık bir anahtarın iki ucu arasında kaç volt vardır? İlk akla gelen cevap sıfır. Ne de olsa anahtardan akım geçmiyor.

Ama birazdan çizeceğimiz devrede, açık anahtarın uçları arasında tam dokuz volt var. Akım sıfır, gerilim sıfır değil. Bu konudaki en sık yapılan hata da tam olarak bu ikisini karıştırmak.

Bu bölümün sonunda açık bir anahtarın gerilimini bulabileceksin. Ayrıca bir akımı yönüyle birlikte doğru yazacaksın. Bir akım grafiğinden, geçen yükü bulacaksın. Bir de istediğin biçimde akım veren basit bir devre kuracaksın.

Birinci bölümde akımı, yükün kesitten geçme hızı olarak tanımlamıştık. Şimdi bu tanımın üstüne, akımla ilgili üç önemli noktayı koyuyoruz.
```

Sahne planı:
- 0:00 (ilk kare) kalem ortada açık bir anahtar sembolü çizer (iki bağlantı noktası, kalkık kol). İki ucuna küçük siyah daireler. Uçların arasına mavi "v = ?".
- "İlk akla gelen cevap sıfır": sağa kırmızı "v = 0 V ?" (soru işareti kırmızı); altına küçük "i = 0".
- "tam dokuz volt": "v = 0 V ?" kırmızıyla üstü çizilir, yanına mavi "v = 9 V".
- "Bu bölümün sonunda": sol altta (y ≤ %72) madde işaretli üç satır (numarasız): "• açık anahtarın gerilimi", "• akım grafiğinden yük", "• istenen akımı veren devre". Tahta silinir (≤0,3 sn).
- **[INTRO KARTI — 4 sn, sessiz; üretimden sonra parça 1 sesine 4 sn sessizlik eklenir]** Ortada: "Devre Teorisi I: Ders 1 - Bölüm 2/3" (siyah), altına "Akımın yönü, açık devre ve akım grafiğinden yük" (mavi). Silinir.
- "Birinci bölümde": sol üstte "Bölüm 1'de i = dq / dt" (mavi), altında numaralı üç başlık sırayla: "1. değer ve yön", "2. açık devre", "3. akımdan yük".

## [PARÇA 2] Akımın değeri ve yönü, referans oku (~2:00)

```
İlk nokta: bir akımı anlatmak için tek bir sayı yetmez. Her akımın bir değeri, bir de yönü vardır.

Yönü şemada bir okla gösteriyoruz. Bu oka referans yönü diyoruz. Oku hangi yöne çizeceğimize biz karar veririz. Kuralımız şu: okun gösterdiği yönde geçen artı yük, artı sayılır. Okun tersine geçen artı yük ise eksi sayılır.

Bir örnekle bakalım. Bir telde, her milisaniyede üç mikrokulonluk artı yük soldan sağa geçiyor. Üç mikrokulon bölü bir milisaniye, üç miliamper. Oku sağa çizersek akım, artı üç miliamper. Oku sola çizersek yük okun tersine gidiyor, akım eksi üç miliamper olur.

Peki hangisi doğru? İkisi de. İki cevap da aynı fiziksel durumu anlatıyor. Eksi işaret, yanlış yön seçtin demek değil. Sadece, yük okun tersine gidiyor demek.

Bir sınavda sen oku sağa çizip artı üç miliamper bulursun, sıra arkadaşın oku sola çizip eksi üç miliamper bulur. İkiniz de haklısınız. Yeter ki okunuzu şemaya çizmiş olun. Ok yoksa, artı üç ile eksi üçün ne anlattığı anlaşılmaz.

Peki gerçekte ne oluyor? Metal bir telde hareket eden aslında elektronlardır ve elektronun yükü eksidir. Elektronlar sağa doğru gidiyor ve her milisaniyede sağa eksi dört mikrokulon taşıyor olsun. Oku sağa çizelim. Eksi dört mikrokulon bölü bir milisaniye, eksi dört miliamper. Oku sola çevirirsek artı dört miliamper. Yani sağa giden elektronlar, sola doğru dört miliamperlik bir akım demektir. Akımın yönü, artı yükün gittiği yön olarak tanımlanır. Bu yüzden elektronların hareketine ters düşer.

Birinci bölümün son örneğinde bulduğumuz eksi iki miliamper de tam buydu. Üç saniyeden sonra yük, kesitten ters yönde geçmeye başlamıştı.

Kısacası, şemada her akımın yanına bir ok çiz. Oku olmayan bir akım değeri, eksik bir bilgidir.
```

Sahne planı:
- Üstte kalın yatay tel; iki ucu küçük "devre" kutularına bağlı (kapalı yol). Kesit dik kesik çizgi. Mavi noktalar yalnızca telin içinde soldan sağa hareket eder ("+" işaretli; yanında küçük "artı yük varsayalım").
- "referans yönü": telin üstüne mavi ok (sağa), yanında "i"; altına "referans yönü" (siyah). Kural iki satır: "okun yönünde geçen artı yük artı sayılır", "okun tersine geçen artı yük eksi sayılır".
- "Bir örnekle bakalım": sol (y %35–72) "her 1 ms'de 3 µC sağa", "i = 3 µC / 1 ms = 3 mA". İki küçük tel kopyası alt alta: üstte ok sağa, "i = 3 mA" (mavi); altta ok sola, "i = −3 mA" (kırmızı). Yanlarına "aynı durum" (siyah) ve iki satırı birleştiren ince çizgi.
- Silme. "elektronlar": tel yeniden; mavi noktalar "−" işaretli, sağa hareket eder. "her 1 ms'de sağa −4 µC". Ok sağa: "i = −4 µC / 1 ms = −4 mA" (kırmızı). Ok sola: "i = 4 mA" (mavi). Altına "akımın yönü, artı yükün yönüdür" (siyah), "elektronların hareketine terstir" (kırmızı alt çizgi).
- "birinci bölümün son örneği": sağ üstte küçük "Bölüm 1: i(4 s) = 6 − 2 × 4 = −2 mA" (gri), yanına "yük ters yönde".
- "her akımın yanına bir ok çiz": son satır "her akımın yanına ok" (mavi, kutu içinde).
- Abone animasyonu 1 parça 3'ün başında.

## [PARÇA 3] Abone çağrısı, açık devre: en sık yapılan hata (~2:40)

```
Bu serinin devamı için kanala abone olabilirsin.

İkinci nokta açık devre. Şimdi şu devreyi kuralım. Dokuz voltluk bir batarya, üç kiloohmluk bir direnç ve bir anahtar, tek bir halka oluşturacak biçimde bağlı.

Önce anahtar kapalı olsun. Kapalı ideal bir anahtar, bir tel parçası gibidir. Bataryanın dokuz voltu doğrudan direncin uçlarına gelir. Ohm yasasına göre akım, gerilim bölü direnç. Dokuz volt bölü üç kiloohm, üç miliamper. Volt bölü kiloohm, miliamper eder.

Şimdi anahtarı açalım. Açık bir anahtar, açık devredir. İki ucu arasında yükün geçebileceği bir yol yoktur. Yol yoksa akım da yoktur. Halkada tek yol olduğu için halkanın her yerinde akım sıfır.

Peki açık anahtarın uçları arasındaki gerilim ne? İşte en sık yapılan hata burada yapılıyor. Akım sıfır olduğuna göre gerilim de sıfırdır, deyip sıfır volt yazmak.

Doğrusu şu. Direncin içinden akım geçmiyor. Ohm yasasına göre direncin gerilimi, üç kiloohm çarpı sıfır miliamper, yani sıfır volt. Demek ki direncin iki ucu aynı gerilimde. Anahtarın alt ucu, bir telle bataryanın eksi ucuna bağlı. Üst ucu ise direnç üzerinden bataryanın artı ucuna bağlı ve direnç hiçbir gerilim farkı eklemiyor. Böylece anahtarın uçları arasında, bataryanın tam dokuz voltu kalıyor. Bir voltmetreyle ölçsen dokuz volt okursun.

İki durumu yan yana koyalım. Anahtar kapalıyken akım üç miliamper. Direncin gerilimi, üç kiloohm çarpı üç miliamper, dokuz volt. Bataryanın bütün gerilimi dirençte, tel gibi davranan anahtarın uçları arasında ise sıfır volt. Anahtar açıkken akım sıfır, anahtarın uçları arasındaki gerilim dokuz volt. Yani akım sıfıra inerken, anahtarın gerilimi sıfırdan dokuz volta çıktı.

Aslında bunu her gün görüyorsun. Dokuz voltluk bir pilin uçlarına yalnızca açık bir anahtar bağlı olsun. Anahtar açık, yani pilin uçları arasında bir açık devre var. Pilden akım çekilmiyor. Ama uçları arasında dokuz volt duruyor.

Yani açık devre bize yalnızca bir şeyi garanti eder: içinden geçen akım sıfırdır. Uçları arasındaki gerilim hakkında tek başına hiçbir şey söylemez. O gerilim, açık devreye bağlı olan elemanlardan çıkar. Bunun gündelik bir karşılığı da var. Bir devrede bir bağlantı kopmuşsa, oradan akım geçmez. Ama kopuk noktanın iki ucu arasında yine bir gerilim olabilir. Bu ayrım şu an basit görünüyor. Ama ileride karmaşık devrelerde çok işimize yarayacak.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 1** (UZUN.md 4b; alt bant). Üstte kalem başlık yazar: "2. açık devre".
- Devre (sol, y %15–72): dikdörtgen halka. Sol kolda batarya (uzun/kısa çizgi, "+" üstte, "9 V"); üst kolda direnç (zikzak, "3 kΩ"); sağ kolda anahtar (önce **kapalı** çizilir); alt kol düz tel. Tel kesintisiz, köşeler bağlı.
- "Kapalı ideal bir anahtar": anahtarın yanına "kapalı anahtar tel gibidir" (siyah). Üst kolda mavi referans oku "i". Sağda (x ≥ %55) "i = 9 V / 3 kΩ = 3 mA" (mavi), altına küçük "V / kΩ = mA".
- "anahtarı açalım": kalem anahtarın kolunu kaldırır (kapalı çizim silinir, açık konum çizilir; anahtar uçlarında iki küçük daire). Sağa "açık devrede i = 0" (mavi, kutu). Halkadaki mavi ok gri olur, yanına "i = 0".
- "en sık yapılan hata": sağda kırmızı başlık "En sık yapılan hata", altında kırmızı "i = 0 olduğuna göre v = 0 V". Anahtar uçları arasında kırmızı "0 V ?".
- "Doğrusu": yeşil başlık "Doğrusu", altında sırayla: "direncin gerilimi = 3 kΩ × 0 mA = 0 V" (siyah), "direncin iki ucu aynı gerilimde" (siyah). Devrede anahtarın alt ucundan alt kol üzerinden bataryanın "−" ucuna giden tel mavi kalınlaşır; üst ucundan üst koldaki direnç üzerinden "+" ucuna giden yol da mavi kalınlaşır (sırayla, tek kalem). Anahtarın üst ucuna "+", alt ucuna "−", aralarına mavi "9 V" (kırmızı "0 V ?" üstü çizili). Yanına küçük voltmetre dairesi ("V"), iki ucu anahtar uçlarına bağlı, içinde "9 V".
- "İki durumu yan yana koyalım": sağ altta (y ≤ %72) önce "kapalıyken direnç: 3 kΩ × 3 mA = 9 V", sonra iki satırlık tablo, sütunlar "anahtar", "i", "anahtarın gerilimi": "kapalı", "3 mA", "0 V"; "açık", "0", "9 V".
- "Dokuz voltluk bir pilin": tahtanın sağ üstünde küçük pil, iki ucu kesintisiz tellerle açık bir anahtarın iki ucuna bağlı; anahtarın yanına "i = 0", uçları arasına "9 V" (mavi).
- "yalnızca bir şeyi garanti eder": alta kutu "açık devre yalnızca i = 0'ı garanti eder" ve altında "gerilimi çevresindeki devre belirler" (mavi alt çizgi).

## [PARÇA 4] Akımdan yüke: integral ve alan (~2:00)

```
Üçüncü nokta, birinci bölümde yaptığımızın tersi. Orada yükten akıma gitmiştik: yükün zamana göre türevini aldık. Şimdi elimizde akım var. Belli bir sürede ne kadar yük geçtiğini nasıl buluruz?

Kısacık bir süre düşün. Bu kısa süreye de te adını verelim. Bu kadar kısa bir sürede akım hemen hemen sabit kalır. O sürede geçen yük, akım çarpı de te olur. Grafikte bu, ince bir şerittir. Yüksekliği i. Genişliği, de te. Sıfır anından te bir anına kadar bütün bu şeritleri toplarsak, geçen toplam yükü buluruz. Bu toplamın adı integral. Kü eşittir, sıfırdan te bire, i çarpı de te ifadesinin integrali.

Bunun grafikteki anlamı çok net. Geçen yük, akım grafiğinin altında kalan alandır.

En basit durumla deneyelim. Dört miliamperlik sabit bir akım, üç saniye boyunca akıyor. Grafik bir dikdörtgen. Yüksekliği dört miliamper, genişliği üç saniye. Alan, yükseklik çarpı genişlik. Dört çarpı üç, on iki. Miliamper çarpı saniye, milikulon eder. Yani üç saniyede on iki milikulon geçmiş.

Bu yöntemi birinci bölümdeki örnekle de sınayalım. Orada yük, iki te kare milikulondu ve türevini alıp akımı dört te miliamper bulmuştuk. Şimdi tersinden gidelim. Dört te ifadesinin integrali, te karenin dört katının yarısı, yani iki çarpı te kare. Sıfırdan üç saniyeye integral alırsak, iki çarpı üçün karesi, iki çarpı dokuz, on sekiz milikulon. Birinci bölümde bulduğumuz on sekiz milikulonun aynısı. Türev ile integral, birbirinin tersi.

Bir de işaret meselesi var. Akım eksiyse grafiğin eğrisi yatay eksenin altına iner. Eksenin altındaki alan eksi sayılır. Çünkü o sürede yük, referans okunun tersine geçiyor. Örneğin eksi iki miliamperlik bir akım iki saniye akarsa, iki çarpı eksi iki, eksi dört milikulon. Yani dört milikulonluk yük, okun tersine geçmiş demektir.

Bir de küçük bir birim kolaylığı. Miliamperi milisaniyeyle çarparsan, doğrudan mikrokulon bulursun. Bunu hemen şimdi kullanacağız.
```

Sahne planı:
- Üstte "3. akımdan yük" (siyah). Sol üstte küçük "Bölüm 1'de yükten akıma (i = dq / dt)" (gri); altına "şimdi akımdan yüke" (mavi).
- Grafik (sol, y %25–72): yatay eksen "t", dikey eksen "i"; mavi düzgün bir eğri (genel). "ince bir şerit": eğrinin altında tek ince dikdörtgen, yüksekliği "i", genişliği "dt"; yanına "dq = i × dt". Ardından aynı aralıkta birkaç şerit sırayla (kalem her birini tek tek çizer; en fazla 6).
- "Bu toplamın adı integral": sağda büyük "q = ∫₀^t₁ i dt" (mavi; alt ve üst sınır küçük yazı).
- "altında kalan alandır": eğrinin altı 0 ile t₁ arası açık mavi taranır (kalem yatay taramayı soldan sağa çizer); yanına "yük = alan".
- Silme. "En basit durum": grafik: yatay eksen "t (s)" işaretler 0, 1, 2, 3; dikey eksen "i (mA)" işaretler 0, 2, 4 (eksen 0–5). Mavi yatay çizgi 0–3 s arası 4 mA; altı taranır. Sağda "q = 4 mA × 3 s = 12 mC" (mavi), altına küçük "mA × s = mC".
- "birinci bölümdeki örnekle": sağ sütun silinir; "Bölüm 1'de q = 2t² mC, i = 4t mA" (gri), "∫ 4t dt = 4t² / 2 = 2t²", "∫₀³ 4t dt = 2 × 3² = 2 × 9 = 18 mC" (mavi), "türev ve integral birbirinin tersi" (mavi alt çizgi).
- "işaret meselesi": sağ altta küçük kroki: eksen altında bir dikdörtgen, içinde kırmızı "−", yanında "eksen altındaki alan eksi sayılır". Altına "(−2 mA) × 2 s = −4 mC" (kırmızı).
- "birim kolaylığı": sağ alt "mA × ms = µC" (kutu).

## [PARÇA 5] Örnek: rampa, sabit ve ters yönlü akım (~3:10)

```
Şimdi daha ilginç bir akım grafiği. Akım, sıfır anında sıfırdan başlıyor ve iki milisaniyede doğrusal olarak altı miliampere çıkıyor. İki ile beş milisaniye arasında altı miliamperde sabit kalıyor. Beş milisaniyede yön değiştiriyor ve sekiz milisaniyeye kadar eksi iki miliamper oluyor. Soru şu: sıfır ile sekiz milisaniye arasında, ok yönünde net ne kadar yük geçti?

Alanı parçalara bölelim. İlk parça bir üçgen. Üçgenin alanı, taban çarpı yükseklik bölü iki. Taban iki milisaniye, yükseklik altı miliamper. İki çarpı altı on iki, on ikinin yarısı altı. Yani ilk iki milisaniyede altı mikrokulon geçmiş.

Bunu integralle de kontrol edelim. Bu aralıkta akım, iki milisaniyede altı miliamper artıyor. Altıyı ikiye bölünce, her milisaniyede üç miliamper. Yani akım, üç te miliamper. Burada te, milisaniye cinsinden. İki milisaniyede üç çarpı iki, altı miliamper ediyor, grafikle uyumlu. Üç te ifadesinin integrali, te karenin üç katının yarısı. Te yerine iki yazalım. İkinin karesi dört, üç çarpı dört on iki, on ikinin yarısı altı. Aynı sonuç: altı mikrokulon.

İkinci parça bir dikdörtgen. Genişliği beş eksi iki, üç milisaniye. Yüksekliği altı miliamper. Üç çarpı altı, on sekiz mikrokulon.

Üçüncü parça yine bir dikdörtgen, ama bu kez eksenin altında. Genişliği sekiz eksi beş, üç milisaniye. Yüksekliği eksi iki miliamper. Üç çarpı eksi iki, eksi altı mikrokulon. Bu sürede yük okun tersine geçiyor.

Şimdi toplayalım. Altı artı on sekiz, yirmi dört. Yirmi dörtten altıyı çıkarınca on sekiz mikrokulon. Yani beşinci milisaniyede geçen yük yirmi dört mikrokulona ulaşmıştı. Sonraki üç milisaniyede bunun altı mikrokulonu geri döndü ve net on sekiz mikrokulon kaldı.

Birinci bölümü hatırla: net yükü süreye bölersen ortalama akımı bulursun. On sekiz mikrokulon bölü sekiz milisaniye, iki virgül yirmi beş miliamper. Grafiğe bak: akım hiçbir aralıkta bu değerde kalmıyor, rampada yalnızca bir an bu değerden geçiyor. Bu yine yalnızca bir ortalama.

Bir de şuna bakalım. Bir milisaniye anında, yani rampanın tam ortasında, ne kadar yük geçmiş? O anda akım, üç çarpı bir, üç miliamper. Küçük üçgenin alanı, bir çarpı üç bölü iki, bir virgül beş mikrokulon. Bu, ilk üçgendeki altı mikrokulonun yarısı mı? Hayır. Bir virgül beşi altıya bölünce sıfır virgül yirmi beş çıkıyor. Yani dörtte biri.

Neden dörtte bir? Çünkü rampanın ilk yarısında akım hâlâ küçük. Yükün çoğu, akımın büyüdüğü ikinci yarıda geçiyor. Zamanın yarısı, yükün yarısı demek değil.

Geçen yükü zamana göre çizersek ne görürüz? İlk iki milisaniyede yük, gittikçe dikleşen bir eğriyle altı mikrokulona çıkar. İki ile beş milisaniye arasında düz bir çizgiyle artar. Bu çizginin eğimi, yirmi dört eksi altı, yani on sekiz mikrokulon, bölü beş eksi iki, yani üç milisaniye. Sonuç altı miliamper. Bu da o aralıktaki akımın ta kendisi. Beşinci milisaniyeden sonra ise yük azalır. Birinci bölümdeki eğim fikri burada da geçerli: yük grafiğinin eğimi akımdır.
```

Sahne planı:
- Üstte soru: "0–2 ms: 0'dan 6 mA'e doğrusal", "2–5 ms: 6 mA", "5–8 ms: −2 mA", "0–8 ms net q = ?" (mavi).
- Grafik (sol, y %25–72): yatay eksen "t (ms)" işaretler 0, 1, 2, 3, 4, 5, 6, 7, 8; dikey eksen "i (mA)" işaretler −2, 0, 2, 4, 6 (eksen −3…7). Mavi: 0–2 ms rampa (0 → 6), 2–5 ms 6 mA, 5–8 ms −2 mA (5 ms'deki dikey geçiş ince kesik). Değerler kodda `console.assert` (i(1) = 3, i(2) = 6, i(6) = −2). Mavi referans oku grafiğin üstünde küçük tel çiziminde (sağa).
- "Alanı parçalara bölelim": üçgen taranır (açık mavi), içinde "1"; sağda (x ≥ %55) "1. üçgen: (2 ms × 6 mA) / 2 = 12 / 2 = 6 µC".
- "integralle de kontrol": altına "6 mA / 2 ms = 3 mA her ms'de", "i = 3t mA, t milisaniye cinsinden", "i(2) = 3 × 2 = 6 mA", "∫ 3t dt = 3t² / 2", "∫₀² 3t dt = 3 × 2² / 2 = 3 × 4 / 2 = 6 µC" (mavi, "aynı sonuç" yanında).
- Silme yok; sağ sütun dolarsa sağ sütun silinir (≤0,3 sn), grafik kalır.
- "İkinci parça": dikdörtgen taranır ("2"); "2. dikdörtgen: (5 − 2) ms × 6 mA = 3 × 6 = 18 µC".
- "Üçüncü parça": eksen altı dikdörtgen kırmızı taranır ("3"); "3. dikdörtgen: (8 − 5) ms × (−2 mA) = 3 × (−2) = −6 µC" (kırmızı).
- "toplayalım": "q(5 ms) = 6 + 18 = 24 µC", "q(8 ms) = 24 − 6 = 18 µC" (mavi, daire).
- "ortalama akımı": "ortalama = 18 µC / 8 ms = 2,25 mA" (siyah); grafikte 2,25 mA'de gri kesikli yatay çizgi, ucunda "ortalama".
- "Bir milisaniye anında": grafikte 0–1 ms küçük üçgen koyu mavi; t = 1 ms'de nokta "3 mA". Sağda "i(1 ms) = 3 × 1 = 3 mA", "q(1 ms) = (1 ms × 3 mA) / 2 = 1,5 µC", "1,5 / 6 = 0,25 = dörtte bir" (kırmızı alt çizgi).
- "Neden dörtte bir? … Zamanın yarısı": alta kutu "zamanın yarısında yükün dörtte biri".
- "zamana göre çizersek": sağ sütun silinir; küçük q(t) grafiği (sağ, y %25–72): yatay eksen "t (ms)" 0, 2, 5, 8; dikey eksen "q (µC)" 0, 6, 18, 24 (eksen 0–26). Mavi eğri: 0–2 ms parabol (ekranda formül yazılmaz), 2–5 ms doğru (6 → 24), 5–8 ms azalan doğru (24 → 18). `console.assert` q(2) = 6, q(5) = 24, q(8) = 18. Yanına "eğim = (24 − 6) µC / (5 − 2) ms = 18 µC / 3 ms = 6 mA".

## [PARÇA 6] Abone 2, devre kurmak: istenen akımı veren devre (~2:50)

```
Son olarak işi tersine çevirelim. Bu kez bize bir akım dalga biçimi veriliyor. Bizden de bu akımı üreten bir devre kurmamız isteniyor.

İstediğimiz akım şöyle. Bir saniyeye kadar sıfır. Bir ile üç saniye arasında iki miliamper. Üç ile dört saniye arasında altı miliamper. Dört saniyeden sonra yine sıfır. Bu akım bir bataryadan çekilecek.

Elinde on iki voltluk bir batarya, iki direnç ve iki anahtar var. Bir an dur ve düşün: bu devreyi nasıl kurardın?

Bir çözüm şu. Bataryanın iki ucu arasına iki ayrı kol bağlıyoruz. Birinci kolda birinci anahtar ile altı kiloohmluk bir direnç var. İkinci kolda ikinci anahtar ile iki kiloohmluk bir direnç var. İki anahtar hiçbir an aynı anda kapalı değil.

Peki bu direnç değerlerini nereden bulduk? Ohm yasasını tersinden kullandık. Direnç, gerilim bölü akım. İki miliamper istiyorsak, on iki volt bölü iki miliamper, altı kiloohm. Altı miliamper istiyorsak, on iki volt bölü altı miliamper, iki kiloohm. Volt bölü miliamper, kiloohm eder.

Şimdi devrenin zaman içinde ne yaptığını adım adım izleyelim. Bir saniyeye kadar iki anahtar da açık. Açık devre akımın sıfır olduğunu garanti eder. Bataryadan akım çekilmez.

Bir saniye anında birinci anahtar kapanıyor. Altı kiloohmluk direncin uçlarına bataryanın on iki voltu geliyor. Ohm yasasına göre akım, on iki volt bölü altı kiloohm, iki miliamper. İkinci kol açık, ondan akım geçmiyor. Yani bataryadan çekilen akım iki miliamper.

Üç saniye anında birinci anahtar açılıyor, aynı anda ikinci anahtar kapanıyor. Şimdi on iki volt, iki kiloohmluk direncin uçlarında. Akım, on iki bölü iki, altı miliamper.

Dört saniye anında ikinci anahtar da açılıyor. Akım yeniden sıfır. Ama dikkat et: iki dirençten de akım geçmediği için, iki açık anahtarın uçlarında da on iki volt var. Az önceki dokuz voltluk devrenin aynısı.

Bu arada, tasarımın tek bir doğru cevabı yok. Örneğin tek bir iki kiloohmluk direnci, bir seçici anahtarla önce dört voltluk, sonra on iki voltluk bir bataryaya bağlayabilirdik. Dört bölü iki, iki miliamper. On iki bölü iki, altı miliamper. İstenen akımı veren her devre doğru bir cevaptır.

Son olarak bu akımın taşıdığı toplam yükü alandan bulalım. İlk dikdörtgen: üç eksi bir, iki saniye. İki saniye çarpı iki miliamper, dört milikulon. İkinci dikdörtgen: dört eksi üç, bir saniye. Bir saniye çarpı altı miliamper, altı milikulon. Toplam, dört artı altı, on milikulon.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 2** (alt bant; son çözümlü sorudan önce). Kart bir katmandır; tahtadaki kalem yazmaya devam eder (başlık "istenen akımı veren devre").
- İstenen grafik (sağ üst, y %15–45): yatay eksen "t (s)" işaretler 0, 1, 2, 3, 4, 5; dikey eksen "i (mA)" işaretler 0, 2, 4, 6 (eksen 0–7). Mavi basamak: 0–1 s 0; 1–3 s 2 mA; 3–4 s 6 mA; 4 s sonrası 0 (geçişler ince kesik). `console.assert`.
- "Bir an dur ve düşün": kalem "elimizde: 12 V batarya, 2 direnç, 2 anahtar" satırının etrafına yavaşça daire çizer (1,5 sn sessizlik boyunca hareket sürer).
- Devre (sol, y %15–72): solda batarya ("+" üstte, "12 V"); üst ve alt ana teller; aralarında iki dikey kol: 1. kol 1. anahtar ve 6 kΩ; 2. kol 2. anahtar ve 2 kΩ (yazı: "1. anahtar", "6 kΩ", "2. anahtar", "2 kΩ"). İki anahtar başlangıçta açık çizilir. Bataryanın üst telinde mavi referans oku "i" (bataryadan çekilen akım). Tel kesintisiz, bağlantı noktaları dolu siyah nokta.
- "direnç değerlerini nereden bulduk": sağ altta "R = v / i", "R = 12 V / 2 mA = 6 kΩ", "R = 12 V / 6 mA = 2 kΩ" (mavi), küçük "V / mA = kΩ". Sonra bu üç satır silinir (≤0,3 sn).
- Anahtar zamanları devrenin altına (y ≤ %72): "1. anahtar: 1 s'de kapanır, 3 s'de açılır", "2. anahtar: 3 s'de kapanır, 4 s'de açılır".
- "Bir saniye anında": 1. anahtar kapalı çizilir; sağ altta "1 ile 3 s arası: i = 12 V / 6 kΩ = 2 mA" (mavi); 2. kolun yanına "2. kol açık, i = 0".
- "Üç saniye anında": 1. anahtar açılır, 2. anahtar kapanır; "3 ile 4 s arası: i = 12 V / 2 kΩ = 6 mA" (mavi).
- "Dört saniye anında": 2. anahtar açılır; "4 s'den sonra: i = 0"; iki anahtar ucuna küçük mavi "12 V" (kırmızı daire yok; mavi).
- "tek bir doğru cevabı yok": sağ altta küçük not "başka bir çözüm: tek 2 kΩ direnç, seçici anahtar, 4 V ve 12 V batarya", "4 V / 2 kΩ = 2 mA", "12 V / 2 kΩ = 6 mA" (gri); sonra silinir.
- "toplam yükü": grafikteki iki dikdörtgen taranır; sağ altta "q = (3 − 1) s × 2 mA = 2 × 2 = 4 mC", "q = (4 − 3) s × 6 mA = 1 × 6 = 6 mC", "toplam yük = 4 + 6 = 10 mC" (mavi, daire).

## [PARÇA 7] Kapanış (~1:05 + 20 sn bitiş ekranı)

```
Toparlayalım. Her akımın bir değeri, bir de yönü var. Yönü referans okuyla gösteriyoruz ve yük okun tersine gidiyorsa akım eksi çıkıyor. Açık devre yalnızca akımın sıfır olduğunu garanti eder. Uçlarındaki gerilimi çevresindeki devre belirler. Akımdan yüke gitmek için integral alırız. Geçen yük, akım grafiğinin altındaki alandır ve eksenin altındaki alan eksi sayılır. Şunu da unutma: akım doğrusal artarken, sürenin ilk yarısında yükün yalnızca dörtte biri geçer.

Bugün kurduğumuz iki devrede de aynı şeyi gördük. Açık anahtardan akım geçmedi, ama uçlarında bataryanın gerilimi vardı.

Sana da bir soru bırakayım. Bir telden iki saniye boyunca beş miliamper, sonraki bir saniye boyunca da eksi üç miliamper akım geçiyor. Üç saniyenin sonunda, ok yönünde net ne kadar yük geçmiştir? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan üçüncü bölümü kaçırmazsın.

Üçüncü bölümde gerilimin ne olduğunu, kısa devrenin bize neyi garanti ettiğini ve ideal kaynağı göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (tahtanın ortası, y %15–65; ≥4 sn okunur): başlık "Bilmen gerekenler"; maddeler: "• Her akımın değeri ve yönü var (referans okuyla)", "• Açık devre yalnızca i = 0'ı garanti eder", "• Yük, akım grafiğinin altındaki alandır".
- "Sana da bir soru": kart silinir; ortada küçük grafik krokisi (0–2 s 5 mA, 2–3 s −3 mA), altına "3 s'de net q = ?" (mavi), "cevabını yorumlara yaz".
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "Üçüncü bölümde": silme; son 20 sn **bitiş ekranı**: yalnızca sol üstte koyu "Sıradaki: Bölüm 3 — Gerilim, kısa devre ve ideal kaynak" ve altında küçük gri "Oynatma listesi: Devre Teorisi I". Orta ve alt boş (YouTube bitiş ekranı kutuları). Kalem sol üstteki yazının altını yavaşça çizerek hareketi sürdürür (≥2 sn durağan an yok). Ses yok.
