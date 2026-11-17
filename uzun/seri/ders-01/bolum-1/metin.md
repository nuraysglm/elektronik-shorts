# Devre Teorisi I · Ders 1 · Bölüm 1/3 — Akım nedir? Ortalama akım ile anlık akım

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA) [1:27–17:01]. Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`).

Vurgulanan nokta: **Yükü süreye bölmek (Δq/Δt) yalnızca seçilen penceredeki ortalama akımı verir; akım anlık bir büyüklüktür, i = dq/dt.** Pencere kötü seçilirse sonuç gerçek akımdan yüzlerce kat farklı çıkabilir (kanca örneği: 500 kat).
Az bilinen nokta: "Yük nedir?" sorusunun cevabı bir modeldir [12:07–12:30].

Ön bilgi (açıklamaya): türev kavramı; Ohm yasası (v = i × R).

Gösterim: anlık akım küçük i; yük küçük q; pencere Δq ve Δt. Büyük harf I, Q, T kullanılmaz. Çarpma yalnızca "×". Birimler: µC, mC, ms, mA, µA, A, C. Ondalık virgül (12,2 mA).

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1). Metinde rakam, simge, parantez yok. "q" sesle "kü", "t" sesle "te", "Δ" sesle "delta", "R" sesle "er".

Zaman bütçesi (2,35 kelime/sn): kelime sayıları `dogrula.py` çıktısında. Intro kartı (4 sn, sessiz) parça 1'deki işarette; bitiş ekranı alanı (son 20 sn) parça 7'nin sonunda sessiz.

---

## [PARÇA 1] Kanca, intro kartı, neden devre teorisi (~1:45)

```
Bir telden geçen akımı nasıl hesaplarsın? İlk akla gelen cevap şu: geçen yükü, geçen süreye bölmek.

Peki bu basit bölme işlemi, gerçek akımı beş yüz kat küçük gösterebilir mi? Hem de hiçbir hesap hatası yapmadan? Evet, gösterebilir. Birazdan nasıl olduğunu göreceğiz.

Bu bölümün sonunda akımın gerçek tanımını kurmuş olacağız. Üç özgün örnekte de ortalama akımla anlık akımı birbirinden ayırmayı öğreneceğiz. Sonuncusunda şaşırtıcı bir şey göreceğiz: telden geçen yük en büyük değerindeyken akım sıfır olabiliyor.

Önce kısa bir soru soralım. Devreler yüz yılı aşkın süredir var, değil mi? Peki akla gelebilecek her devre çoktan icat edildi mi? Hayır. Her yıl yeni devreler tasarlanıyor. Çünkü yeni uygulamalar daha yüksek performans istiyor, bu da devre tasarımında yenilik gerektiriyor.

Ama ne tasarlarsan tasarla, ilk adım hep aynı. Devredeki büyüklükleri doğru tanımlamak. Bir büyüklüğü yanlış tanımlarsan, en güzel denklemler bile seni yanlış sonuca götürür. İşte bu seriye tam da buradan başlıyoruz. Bugünkü iki büyüklüğümüz yük ve akım. Önce yükü tanıyacağız, sonra akımı. Akımı tanımlarken de ilk akla gelen yolun neden yetmediğini adım adım göreceğiz. Gerilimi de bu dersin üçüncü bölümünde ele alacağız.
```

Sahne planı:
- 0:00 (ilk kare) kalem, sol üstte yatay bir tel çizer (siyah), telin ortasına dik kesik çizgiyle kesit. Kesitin yanına mavi "i = ?" yazılır.
- "geçen yükü geçen süreye bölmek": telin altına "akım = yük / süre ?" (soru işareti kırmızı). (Yazı formül değil, sözlü ifade; "/" burada bölme anlamında.)
- "beş yüz kat küçük": sağda kırmızı "500 kat" yazılır, altı çizilir.
- "Bu bölümün sonunda": "i = ?" sözcüğünün altı mavi çizilir. Kanca biter → tahta silinir (≤0,3 sn).
- **[INTRO KARTI — 4 sn, sessiz; ses bu noktada 4 sn boşluk]** Kalem ortada yazar: "Devre Teorisi I · Ders 1 · Bölüm 1/3" (siyah), altına "Akım nedir? Ortalama akım ile anlık akım" (mavi). Kart bitince silinir.
- "Devreler yüz yılı aşkın": sol yarıya zaman oku (çizgi + çizgiyle ok ucu), üstüne "100 yılı aşkın". Sağa "yeni uygulama" → "daha yüksek performans" → "yeni devre" kutuları sırayla, aralarında çizgi oklar.
- "Bugünkü iki büyüklüğümüz": tahta silinir, ortaya iki başlık: "yük" ve "akım".

## [PARÇA 2] Yük, akımın ilk tanımı, pencere sorunu, i = dq/dt (~2:20)

```
Önce yük. Yükü kü harfiyle gösteriyoruz, birimi kulon.

Peki yük tam olarak nedir? Dürüst cevap şu: bilmiyoruz. Yük, elektron ve proton gibi temel parçacıklara yüklediğimiz bir özellik. Elektronun yükü negatif, protonunki pozitif diyoruz. Bu bir model. Parçacıkların davranışını açıklamamıza yarayan bir soyutlama. Bizim için bu kadarı yeterli. Bu serinin geri kalanında yükün kendisinden çok, nereden nereye ve ne hızla gittiğiyle ilgileneceğiz.

Asıl ilginç olan, yükün hareket etmeye başladığı an. Çünkü yük hareket edince akım oluşur.

Şimdi bir tel çizelim. Telin içinden geçen hayalî bir kesit düşün, bu kesite de bir sayaç koyalım. Sayaç, kesitten geçen yükü sayıyor. Bir yönde geçen yükü artı, ters yönde geçeni eksi sayıyor diyelim. Şimdilik yükün hep aynı yönde aktığını düşünelim. Bir süre bekliyoruz. Bu süreye delta te, bu sürede geçen yüke de delta kü diyelim. İlk akla gelen tanım: akım, delta kü bölü delta te.

Mantıklı görünüyor, değil mi? Ama bir sorun var. Delta te'yi nasıl seçeceğiz?

Bir saniye seçelim. Şimdi şöyle bir devre düşün. Her saniyenin yalnızca iki milisaniyesinde çalışıyor, kalan sürede tamamen susuyor. Çalıştığı sürede kesitten her milisaniyede düzgün biçimde on mikrokulon geçiyor. Yani bir saniyelik pencerede toplam yirmi mikrokulon geçmiş oluyor. Bunu bir saniyeye bölersek yirmi mikroamper buluruz.

Oysa devre çalışırken her milisaniyede on mikrokulon geçiyordu. Bu da on miliamper eder. Yirmi mikroamper ise bunun beş yüzde biri. Hiçbir hesap hatası yapmadık. Sadece pencereyi yanlış seçtik.

Peki pencereyi bir milisaniye seçsek sorun biter mi? Pencere tam da devrenin çalıştığı sürenin içine düşerse evet, on miliamper buluruz. Ama pencereyi biraz kaydıralım. Yarısı devrenin çalıştığı son yarım milisaniyeye, yarısı da sustuğu ana denk gelsin. Bu kez pencerede yalnızca beş mikrokulon var ve sonuç beş miliamper çıkıyor. Yani sonuç, pencerenin nerede durduğuna göre değişiyor. Bu, iyi bir tanımda olmaması gereken bir şey. Bizim istediğimiz evrensel bir tanım. Hangi devreye, hangi ana bakarsak bakalım aynı kuralla çalışsın.

Çözüm, pencereyi küçültmek. Hem de çok küçültmek. Sonsuz küçük bir de te süresi alıyoruz, bu sürede geçen sonsuz küçük yüke de de kü diyoruz. Akımın resmî tanımı işte bu: akım, yükün kesitten geçme hızıdır. Yani i eşittir de kü bölü de te. Birimi amper. Saniyede bir kulon yük geçiyorsa akım bir amperdir. Örneğin her milisaniyede iki mikrokulon geçiyorsa akım iki miliamper. Bu, saniyede iki milikulon demek.
```

Sahne planı:
- Sol üst: "yük: q" (q mavi), altına "birim: kulon (C)".
- "bilmiyoruz": sağa "Yük nedir?" ve altına "bir model" (kırmızı altı çizgi). "elektron" yanına küçük daire ve "−", "proton" yanına daire ve "+".
- Silme. Ortada kalın yatay tel (siyah), kesit kesik çizgi; kesitin üstüne küçük sayaç kutusu "sayaç". Telin içinde mavi noktalar (yükler) yalnızca telin içinde soldan sağa ilerler (AGENT.md 2c).
- "delta te ... delta kü": altına "akım = Δq / Δt ?" (soru işareti kırmızı).
- "Bir saniye seçelim": sağ yarıya zaman ekseni (0–1 s, işaret 0,5 s ve 1 s). Eksenin başında 2 ms genişliğinde dar bir dikdörtgen darbe (mavi), üstüne "10 mA". Eksen ölçeği: darbe genişliği gerçek oranda çok dar olacağından eksen kırık işaretiyle ikiye bölünür (0–2 ms büyütülmüş, sonra kırık, 1 s'ye kadar); kırık işareti açıkça çizilir.
- Denklem sütunu satır satır: "Δq = 20 µC", "Δt = 1 s", "Δq / Δt = 20 µA" (kırmızı), sonra "çalışırken: 10 µC / 1 ms = 10 mA" (mavi), "10 mA / 20 µA = 500" (kırmızı daire).
- "Çözüm, pencereyi küçültmek": darbe üstünde pencere çerçevesi (kesik dikdörtgen) üç adımda daralır (her adım ayrı çizim; tek kalem).
- "resmî tanımı": ortada büyük "i = dq / dt" (mavi), altına "birim: amper (A)", "1 A = 1 C / s".
- Sonda tahta tamamen dolu → **abone animasyonu 1** parça 3'ün başında.

## [PARÇA 3] Abone çağrısı, yol haritası, ön bilgi (~2:10)

```
Bu serinin devamı için kanala abone olabilirsin.

Fark ettin mi? Artık akım bir ortalama değil. Her an için ayrı bir değeri olan, zamana bağlı bir büyüklük.

Şimdi bir adım geri çekilip yol haritamıza bakalım. Bu sıra rastgele değil, her adım bir öncekinin üstüne kuruluyor. Önce elektriksel büyüklükleri tanıyacağız. Yük ve akımla başladık, sırada gerilim var. Sonra devre elemanlarına geçeceğiz. Gerilim kaynağı, akım kaynağı, direnç, kondansatör gibi. Bir devreyi kurmadan önce, onu oluşturan elemanların nasıl davrandığını, onlar için hangi denklemleri yazabileceğimizi bilmemiz gerekiyor.

Bu elemanları birbirine bağladığımızda bir devre elde ediyoruz. Ardından devrelerin davranışını belirleyen yasalara geleceğiz, yani Kirchhoff yasalarına. Onları fizik derslerinden hatırlıyor olabilirsin. Aslında bu bilgiyle her devreyi çözebiliriz. Peki neden daha fazlasına ihtiyaç duyuyoruz? Çünkü devreler karmaşıklaştıkça hem hesap uzuyor hem de devrenin nasıl çalıştığını sezmek zorlaşıyor. Bu yüzden analizi adım adım izlenen bir yönteme dönüştüren sistematik yollar ve devreye bakar bakmaz ne yapacağını söyleten teoremler istiyoruz. Onlardan sonra direnç ve kondansatörlü, direnç ve bobinli devreleri, son olarak da üçünün bir arada olduğu devreleri ele alacağız. Zaman kalırsa işlemsel kuvvetlendirici devrelerine de bakacağız. İşlemsel kuvvetlendirici, ilginç devreler kurmamızı sağlayan çok kullanışlı bir eleman.

Bir de ön bilgi hatırlatalım: Ohm yasası. Değeri er olan bir dirençten i akımı geçiyorsa, direncin uçlarında i çarpı er kadar gerilim oluşur. Örneğin iki kiloohmluk bir dirençten üç miliamper geçiyorsa, uçlarında altı volt vardır. Bu yasayı serinin her yerinde kullanacağız.

Peki akımın tanımını neden bu kadar titizlikle kurduk? Çünkü bundan sonraki derslerde akımı hep bu anlık tanımla kullanacağız. Ohm yasasında geçen i de bir ortalama değil, o andaki akım. Şimdi bunu üç örnekle sağlamlaştıralım.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 1** (UZUN.md 4b; alt bant). Tahtanın üst kısmında parça 2'nin son hâli durur; kalem "i = dq / dt" yanına "(t)" ekleyerek "i(t)" yazar ("zamana bağlı" ile eşzamanlı), sonra altını yavaşça mavi çizer (durağanlık yok).
- Silme. Yol haritası: soldan sağa basamaklar halinde kutular, her biri sırayla yazılır, aralarında çizgi oklar: "elektriksel büyüklükler" → "devre elemanları" → "Kirchhoff yasaları" → "analiz yöntemleri" → "teoremler" → "RC, RL, RLC devreleri" → "işlemsel kuvvetlendirici". İlk kutunun içine küçük "yük, akım, gerilim"; ikincisine "kaynaklar, direnç, kondansatör". İlk kutu mavi daire ("buradayız").
- "Ohm yasası": silme; sol tarafa direnç (zikzak) ve üstünden geçen mavi akım oku "i", uçlarında "+" ve "−"; sağda "v = i × R".
- "anlık tanımla": sağ altta "i = dq / dt" tekrar yazılır, mavi daire.

## [PARÇA 4] Örnek 1 — ortalama tuzağı (~2:55)

```
İlk örneğimize geçelim. Bir telden dört milisaniye boyunca yük geçiyor. İlk bir milisaniyede beş mikrokulon geçiyor. Sonraki üç milisaniyede ise yalnızca üç mikrokulon. Her aralığın içinde yük düzgün biçimde akıyor. Soru şu: bu teldeki akım nedir?

İlk refleks, toplam yükü toplam süreye bölmek. Sekiz mikrokulon bölü dört milisaniye, iki miliamper. Hesap doğru. Peki teldeki akım herhangi bir anda gerçekten iki miliamper oldu mu?

Hadi bakalım. İlk aralıkta beş mikrokulon, bir milisaniyede geçti. Bu da beş miliamper eder. Burada küçük bir kolaylık var: mikrokulonu milisaniyeye bölünce doğrudan miliamper buluyoruz. İkinci aralıkta üç mikrokulon, üç milisaniyede geçti. Bu da bir miliamper.

Şimdi grafiği çizelim. Yatay eksen zaman, milisaniye cinsinden. Dikey eksen akım, miliamper cinsinden. Sıfırla bir milisaniye arasında akım beş miliamper. Birle dört milisaniye arasında bir miliamper.

Buradan iki soruyu hemen cevaplayabiliriz. Yarım milisaniye anında akım nedir? Beş miliamper. Üç milisaniye anında akım nedir? Bir miliamper. Her an için tek bir cevap var.

Bir de pencereyi sıfırla iki milisaniye arasında seçelim. Bu aralıkta beş artı bir, altı mikrokulon geçiyor. İki milisaniyeye bölünce üç miliamper. Bu da hiçbir anın değeri değil. Pencereyi değiştirdikçe ortalama da değişiyor.

Peki iki miliamper nerede? Grafikte iki miliamperlik çizgiyi kesik çizgiyle çizelim. Gördüğün gibi, akım hiçbir an bu değeri almıyor. İki miliamper, bu dört milisaniyedeki ortalama akım.

Ortalama yanlış değil. Sadece başka bir soruya cevap veriyor. Toplamda ne kadar yük geçti, diye soruyorsan ortalama işini görür. İki miliamper çarpı dört milisaniye, yine sekiz mikrokulon eder. Ama şu anda telden ne kadar akım geçiyor, diye soruyorsan ortalama sana cevap vermez.

Burada dikkat edilmesi gereken tuzak şu. Soru ortalama akımı mı istiyor, yoksa belirli bir andaki akımı mı? Buna bakmadan delta kü bölü delta te yazmak. Bir de şunu fark et: her aralığın içinde yük düzgün aktığı için, o aralıkta delta kü bölü delta te zaten anlık akıma eşit. Pencereyi akımın sabit kaldığı aralığın içinde seçersen sorun kalmıyor.
```

Sahne planı:
- Üstte soru metni kısa satırlarla: "0–1 ms: 5 µC", "1–4 ms: 3 µC", "her aralıkta düzgün", "akım = ?" (mavi).
- "İlk refleks": sağda "8 µC / 4 ms = 2 mA" (siyah), yanına kırmızı "?".
- "Hadi bakalım": altına "5 µC / 1 ms = 5 mA", "3 µC / 3 ms = 1 mA" (mavi sonuçlar). "µC / ms = mA" küçük not.
- Grafik (sol alt, y %40–72): eksenler, "t (ms)" ve "i (mA)" etiketleri; işaretler 0, 1, 2, 3, 4 ms ve 0, 1, 2, 3, 4, 5 mA (eksen 0–6 mA, 2e-1). Mavi basamak: 0–1 ms'de 5 mA, 1–4 ms'de 1 mA (eğri değerleri kodda `console.assert`).
- "iki miliamperlik çizgi": kırmızı kesik yatay çizgi 2 mA'de, ucuna "ortalama: 2 mA".
- "toplamda ne kadar yük": grafikte iki dikdörtgen alan sırayla açık mavi taranır: "5 µC" ve "3 µC"; sonra kesik çizginin altındaki dikdörtgen kırmızı çerçeve: "2 mA × 4 ms = 8 µC".
- "tuzak şu": sağ üstte kırmızı kutu "ortalama akım mı, anlık akım mı?".
- (Parça 5'e geçiş.)

## [PARÇA 5] Örnek 2 — akım her an değişirse (~2:50)

```
Şimdi biraz daha zor bir örnek. Burada akım her an değişiyor.

Bir telin kesitinden geçen toplam yük, sıfır anından itibaren şöyle artıyor: kü eşittir iki çarpı te kare milikulon. Burada te, saniye cinsinden. Soru: te eşittir üç saniye anında akım nedir?

Önce ortalama yoldan gidelim. Üç saniyede geçen yük, iki çarpı dokuz, yani on sekiz milikulon. Bunu üç saniyeye bölünce altı miliamper.

Bir an dur ve tahmin et: üç saniyedeki akım bu ortalamadan büyük mü, küçük mü?

Şimdi tanımı kullanalım. Akım, yükün zamana göre türevi. İki çarpı te karenin türevi, dört çarpı te. Yani akım, dört çarpı te miliamper. Üç saniye anında bu, on iki miliamper eder. Ortalamanın tam iki katı. Birime de bakalım: milikulon bölü saniye, miliamper eder. Birimler de tutuyor.

Bu iki kat bir tesadüf değil. Yük zamanın karesiyle artıyorsa, sıfırdan te anına kadarki ortalama akım, o andaki akımın her zaman yarısıdır. Çünkü akım başta sıfırdan başlıyor ve düzgün biçimde artıyor. Ortalama, başlangıçla son değerin tam ortasında kalıyor.

Bunu türev almadan da görebiliriz. Zaten tanımın özü bu. Üçüncü saniyeden başlayan bir pencere açalım ve onu adım adım daraltalım.

Pencere bir saniye olsun. Üç ile dört saniye arasında yük on sekiz milikulondan otuz iki milikulona çıkıyor. Bir saniyede on dört milikulon geçmiş, yani on dört miliamper. Şimdi pencereyi saniyenin onda birine indirelim. Bu kez sonuç on iki virgül iki miliamper. Bir de yüzde birine indirelim: on iki virgül sıfır iki miliamper.

Gördün mü? Pencere küçüldükçe sonuç on iki miliampere yaklaşıyor. De kü bölü de te tam olarak bu sınır değer.

Bunu grafikte de görelim. Yükü zamana göre çizdiğimizde, iki nokta arasındaki ortalama akım, o iki noktayı birleştiren doğrunun eğimidir. Pencere daraldıkça bu doğru, üç saniyedeki noktada eğriye teğet olan doğruya yaklaşır. Yani anlık akım, yük grafiğinin o andaki eğimidir. Bu bakış açısı bir sonraki örnekte çok işimize yarayacak.

Peki baştaki altı miliamper yanlış mıydı? Hayır. Sıfırla üç saniye arasındaki ortalama akım gerçekten altı miliamper. Ama üçüncü saniyedeki akım on iki miliamper. İkisi farklı soruların cevabı.
```

Sahne planı:
- 0:00 üstte kalem soruyu yazmaya başlar ("q(t) = 2t² mC", "t saniye cinsinden", "i(3 s) = ?"). 
- "ortalama yoldan": "q(3 s) = 2 × 9 = 18 mC", "18 mC / 3 s = 6 mA" (siyah).
- "tanımı kullanalım": "i = dq / dt = 4t mA" (mavi), "i(3 s) = 12 mA" (mavi, daire). Yanına kırmızı "ortalamanın 2 katı".
- Grafik (sol alt): q(t) eğrisi 0–4 s (eksen 0–35 mC), t = 3 s'de nokta (18 mC). Pencere adımlarında 3 s noktasından kesik kirişler çizilir (3–4 s kirişi; 3–3,1 s yakınlaştırma notu).
- Tablo (sağ alt, y ≤ %72): "Δt | Δq / Δt" satırları: "1 s | 14 mA", "0,1 s | 12,2 mA", "0,01 s | 12,02 mA", alt satır "Δt küçüldükçe sonuç 12 mA'e yaklaşır".
- "İkisi farklı": "0–3 s ortalama: 6 mA" ve "t = 3 s anında: 12 mA" iki satır yan yana, farklı renk.

## [PARÇA 6] Örnek 3 — yük en büyükken akım sıfır (~2:40)

```
Son örneğimiz biraz düşündürücü. Bu kez yük şöyle değişiyor: kü eşittir altı çarpı te, eksi te kare milikulon. Te yine saniye cinsinden ve sıfırla dört saniye arasına bakıyoruz.

Önce sana bir soru. Üç saniye anında yük kaç milikulon, akım kaç miliamper? Bir an durup kendin bulmaya çalış.

Yükten başlayalım. Üç saniyede altı çarpı üç, on sekiz. Eksi üçün karesi, dokuz. Yani yük dokuz milikulon. Bu aralıktaki en büyük değer bu.

Şimdi akım. Türevi alalım: altı çarpı te teriminin türevi altı, te karenin türevi iki çarpı te. Yani akım, altı eksi iki çarpı te miliamper. Üç saniye anında altı eksi altı, sıfır miliamper.

İlginç değil mi? Yük en büyük değerindeyken akım sıfır. Aslında bir önceki örnekteki eğim yorumu bunu hemen söylüyor. Yük grafiği üç saniyede tepe noktasında. Tepede teğet yatay, yani eğim sıfır. Akım yükün ne kadar olduğuna değil, ne kadar hızlı değiştiğine bakar.

Bir de başka anlara bakalım. Bir saniyede akım altı eksi iki, dört miliamper. Dört saniyede ise altı eksi sekiz, eksi iki miliamper. Eksi işaret ne demek? Üç saniyeden sonra yük azalmaya başlıyor. Yani yük kesitten artık ters yönde geçiyor. Akımın bir de yönü olduğunu, işaretin bu yönü nasıl taşıdığını bir sonraki bölümde ayrıntılı göreceğiz.

Bir de sıfırla dört saniye arasındaki ortalamaya bakalım. Dört saniyede yük, yirmi dört eksi on altı, sekiz milikulon. Sekizi dörde bölünce iki miliamper. Oysa bu aralıkta akım dört, sıfır, eksi iki gibi çok farklı değerler aldı. Ortalama, bu hikâyenin tamamını tek bir sayıya sıkıştırıyor.

Tuzak burada şu. Yük büyükse akım da büyüktür sanmak. Az önce gördük: yük en büyükken akım sıfırdı.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 2** (alt bant; son çözümlü sorudan önce). Kart bir katmandır; tahtadaki kalem yazmaya devam eder.
- Üstte: "q(t) = 6t − t² mC", "0 ≤ t ≤ 4 s", "t = 3 s anında q = ?  i = ?" (mavi). "Bir an durup": kalem soru işaretlerinin etrafına yavaşça daire çizer (durağanlık yok).
- "Yükten başlayalım": "q(3 s) = 18 − 9 = 9 mC" (siyah).
- "Türevi alalım": "i = dq / dt = 6 − 2t mA" (mavi), "i(3 s) = 6 − 6 = 0 mA" (mavi, kırmızı daire).
- Grafik (sol alt): q(t) parabolü 0–4 s, eksen 0–10 mC (değerler q(0)=0, q(1)=5, q(3)=9, q(4)=8; `console.assert`). t = 3 s'de tepe noktası, oradan yatay kesik teğet (kırmızı), yanına "eğim = 0".
- "Bir saniyede": t = 1 s'de pozitif eğimli kısa teğet, "i = 4 mA"; t = 4 s'de negatif eğimli kısa teğet, "i = −2 mA" (kırmızı).
- "Tuzak burada": sağ üstte kırmızı kutu: "yük en büyük, akım sıfır".

## [PARÇA 7] Kapanış (~1:00 + 20 sn bitiş ekranı)

```
Toparlayalım. Akım, yükün kesitten geçme hızıdır: i eşittir de kü bölü de te. Delta kü bölü delta te ise yalnızca seçtiğin penceredeki ortalamayı verir. Pencere küçüldükçe bu ortalama, anlık akıma yaklaşır. Ve akımı belirleyen, geçen yükün miktarı değil, değişme hızıdır.

Üç örnekte de aynı şeyi gördük. Basamaklı akımda ortalama hiçbir anın değeri değildi. Sürekli artan akımda anlık değer ortalamanın iki katıydı. Son örnekte de yük en büyükken akım sıfırdı.

Sana da bir soru bırakayım. Yük, dört çarpı te, eksi te kare milikulon olsaydı, akım hangi anda sıfır olurdu? İpucu: tepe noktasını düşün. Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan Bölüm ikiyi kaçırmazsın.

Bölüm ikide akımın yönünü, açık devrenin bize neyi garanti ettiğini ve akım grafiğinden geçen yükü nasıl bulacağımızı göreceğiz. Yani bugün yaptığımızın tersini: akımdan yüke gideceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥4 sn okunur, alt bant kartı değil, tahtanın ortası; y %15–65): başlık "Bilmen gerekenler", maddeler: "• Akım, yükün geçiş hızı: i = dq / dt", "• Δq / Δt yalnızca penceredeki ortalama", "• Pencere küçülürse ortalama, anlık akıma yaklaşır", "• Akımı belirleyen yükün miktarı değil, değişme hızı".
- "beğenip paylaşır mısın": kart durur, kalem "i = dq / dt"nin altını mavi çizer.
- "Bölüm ikide": silme; üstte "Sıradaki: Bölüm 2/3" ve "akımın yönü · açık devre · yük = alan" (burada "·" ayırıcı olarak **kullanılmaz** → "akımın yönü, açık devre, akım grafiğinden yük").
- Son 20 sn **bitiş ekranı alanı**: orta ve alt boş; yalnızca sol üstte küçük, yavaşça yazılan "Devre Teorisi I" (hareket sürer, ≥2 sn durağan yok). Ses yok.
