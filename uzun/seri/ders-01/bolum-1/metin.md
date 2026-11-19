# Devre Teorisi I · Ders 1 · Bölüm 1/3 — Akım nedir? Ortalama akım ile anlık akım

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA) [1:27–17:01]. Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Sürüm 2: bağımsız denetimden sonra yeniden yazıldı (denetim özeti `dogruluk.md` bölüm 6).

Vurgulanan nokta: **Yükü süreye bölmek (Δq/Δt) yalnızca seçilen penceredeki ortalama akımı verir; akım anlık bir büyüklüktür, i = dq/dt.** Kanca: telde akım hiç durmadan akarken ortalama sıfır çıkabilir.
Az bilinen nokta: yük en büyük değerindeyken akım sıfır olabilir (Örnek 3).

Ön bilgi (açıklamaya): türev kavramı; Ohm yasası (v = R × i).

Gösterim: anlık akım küçük i; yük küçük q; pencere Δq ve Δt. Büyük harf I, Q, T kullanılmaz. Çarpma yalnızca "×". Birim bütün ifadeye aitse parantez: "(6t − t²) mC". Ondalık virgül. Ekranda "·" hiç kullanılmaz (intro kartı dahil; UZUN.md 4a kalıbı ile AGENT.md 2d çelişkisi kanal sahibine soruldu, karar gelene kadar tire ve virgül).

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1). Metinde rakam, simge, parantez yok. "q" sesle "kü", "t" sesle "te", "Δ" sesle "delta", "R" sesle "er", "Kirchhoff" seste "Kirşof". "de te" ve "de kü" yalnızca cümle başında veya "eşittir/bölü" sonrasında geçer. Çarpımlar gruplama belirsizliği olmasın diye "iki te kare", "altı te eksi te kare" biçiminde okunur. Parça 5'teki "tahmin et" sonrasına üretimden sonra 1,5 sn sessizlik eklenir (görüntüde kalem hareket eder).

Zaman bütçesi (2,35 kelime/sn): `dogrula.py` çıktısı. Intro kartı (4 sn, sessiz) parça 1'deki işarette; bitiş ekranı alanı (son 20 sn) parça 7'nin sonunda sessiz.

---

## [PARÇA 1] Kanca, intro kartı (~1:00)

```
Bir telden geçen akımı nasıl hesaplarsın? İlk akla gelen cevap şu: geçen yükü, geçen süreye bölmek.

Peki telde akım bir an bile durmadan akarken, bu bölme işlemi sana sıfır diyebilir mi? Hem de hiçbir hesap hatası yapmadan? Evet, diyebilir. Birazdan nasıl olduğunu göreceğiz.

Bu bölümün sonunda akımın asıl tanımını kurmuş olacağız. Üç örnekle de ortalama akımı anlık akımdan ayırmayı öğreneceğiz. Sonuncusunda şaşırtıcı bir şey göreceğiz: telden geçen yük en büyük değerindeyken akım sıfır olabiliyor.

[SELAM — intro kartıyla birlikte; kanal sahibinin önerisi, 19.11.2026, iş emri D; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün Ders Bir'in ilk bölümünde akımı konuşacağız.

Devre teorisinde ne tasarlarsan tasarla, işe büyüklükleri doğru tanımlayarak başlarsın. Bu seriye de tam buradan giriyoruz. Bugünün konusu yük ve akım. Gerilimi bu dersin üçüncü bölümünde ele alacağız.
```

Sahne planı:
- 0:00 (ilk kare) kalem, sol üstte bir kutu ("devre") ve kutunun iki ucundan çıkıp yine kutuya dönen kapalı bir tel halkası çizer (siyah; tel uçları boşta değil). Halkanın üst kolunda dik kesik çizgi: kesit. Kesitin yanına mavi "i = ?".
- "geçen yükü geçen süreye bölmek": telin altına "akım = geçen yük / süre ?" (soru işareti kırmızı).
- "sana sıfır diyebilir mi": sağa kırmızı "ortalama = 0 ?" yazılır; kesitin iki yanına zıt yönlü iki küçük mavi ok.
- "Bu bölümün sonunda": "i = ?" altı mavi çizilir. Kanca biter, tahta silinir (≤0,3 sn).
- **[INTRO KARTI + SELAM — 8,4 sn]** Ortada: "Devre Teorisi I: Ders 1 - Bölüm 1/3" (siyah, kırmızı alt çizgi), altına "Akım nedir? Ortalama akım ile anlık akım" (mavi); kart selam cümlesiyle birlikte yazılır, selam bitince silinir. (Eski: 4 sn sessiz kart.)
- "büyüklükleri doğru tanımlayarak": sol üstte kırmızı köşe başlığı "Ders 1 - Bölüm 1: Akım nedir?", altında kırmızı başlık "Temel büyüklükler"; solda maddeler "- Yük", "- Akım"; sağda koyu yeşil "Gerilim: bu dersin üçüncü bölümünde".

> **Tahta düzeni (iş emri D, 19.11.2026; UZUN.md 4 "Tahta düzeni ve yazım"):** Bütün parçalarda sol üstte kırmızı "Ders 1 - Bölüm 1: Akım nedir?" (bitiş ekranında silinir); sahne başlıkları kırmızı ve sola hizalı ("Örnek 1", "Bilmen gerekenler" …); listeler "- " ile ve büyük harfle başlar; iki sütun (sol x ≈ 120, sağ x ≈ 1000); soluk gri yazılar koyu yeşil (#1E7B4A); gri yalnızca kesen çizgileri. Aşağıdaki sahne planlarındaki küçük harfli/gri ifadeler ekranda bu kurallarla yazılır.

## [PARÇA 2] Yük, ilk tanım, pencere sorunu, i = dq/dt (~3:00)

```
Önce yük. Yükü kü harfiyle gösteriyoruz, birimi kulon.

Devre teorisinde yükü, sayabildiğimiz ve toplayıp çıkarabildiğimiz bir miktar olarak kullanırız. Elektronun yükü eksi, protonunki artı işaretlidir. Yükün derindeki doğası ise bir fizik sorusu, bizim işimiz değil. Bizim sorumuz başka: bu miktar nereden nereye, ne hızla gidiyor?

Yük yerinden oynadığı anda işin içine akım giriyor. Peki akımı nasıl ölçeriz?

Telin içinden geçen hayalî bir kesit düşün. Bu kesite bir sayaç koyalım. Sayaç, sağa geçen yükü artı, sola geçen yükü eksi sayıyor. Bir süre bekleyelim. Bu süreye delta te, sayacın gösterdiği net yüke de delta kü diyelim. İlk akla gelen tanım: akım eşittir delta kü bölü delta te.

Mantıklı görünüyor, değil mi? Ama bir sorun var. Delta te değerini nasıl seçeceğiz?

Şöyle bir tel düşünelim. İlk yarım saniyede kesitten sağa doğru, düzgün biçimde beş milikulon geçiyor. Sonraki yarım saniyede bu kez sola doğru, yine düzgün biçimde beş milikulon geçiyor. Pencereyi bir saniye seçersek sayaç artı beş ile eksi beşi toplar ve sıfır gösterir. Delta kü bölü delta te sıfır çıkar.

Peki telde hiç akım yok mu? Var, hem de hiç durmadan. İlk yarım saniyede yük, saniyede on milikulonluk bir hızla sağa gidiyor, sonra aynı hızla sola. Yani akım önce artı on miliamper, sonra eksi on miliamper. Hiçbir anda sıfır değil. Hesap hatası yapmadık, sadece pencereyi kötü seçtik. O bir saniye boyunca kesitten hiç durmadan yük geçti. Ama net olarak taşınan yük sıfır olduğu için ortalama sıfır çıktı. Pencere ne kadar genişse, içinde olup bitenler o kadar çok tek bir sayıya sıkışıyor.

Pencereyi daraltırsak ne olur? İlk yarım saniyenin içine yerleştirirsek on miliamper buluruz. Ama aynı genişlikteki pencereyi kaydırıp tam ortaya, yükün yön değiştirdiği ana oturtursak sonuç yine sıfır olur. Burada yön değişiminin ani olduğunu kabul ediyoruz, tam o anın kendisini bir kenara bırakalım. Sorun şu: geniş bir pencere, iki farklı davranışı tek bir sayıya karıştırıyor. Oysa iyi bir tanım tek bir anı anlatmalı.

Çözüm, pencereyi sınırsız küçültmek. De te, sıfıra yaklaşan kısacık bir süre. De kü ise bu kısacık sürede kesitten geçen çok küçük yük. İşte akımın asıl tanımı: akım, yükün kesitten geçme hızıdır. Yani i eşittir de kü bölü de te. Birimi amper. Saniyede bir kulon yük geçiyorsa akım bir amperdir. Örneğin her milisaniyede iki mikrokulon geçiyorsa akım iki miliamper eder. Bu, saniyede iki milikulon demek. Bu tanımla akım artık tek bir sayı değil, zamanın bir fonksiyonu. Grafiğini çizebilir, türevini alabiliriz.
```

Sahne planı:
- Sol üst: "yük: q" (q mavi), altına "birim: kulon (C)". Yanına "elektron: negatif", "proton: pozitif", altında kırmızı altı çizili "bir model".
- Silme. Üstte kalın yatay tel; tel iki ucunda "devre" kutusuna bağlanır (kapalı yol). Kesit kesik çizgi; üstünde küçük "sayaç" kutusu, içinde "sağa geçen artı", "sola geçen eksi". Mavi noktalar yalnızca telin içinde hareket eder (önce sağa, sonra sola).
- "akım eşittir delta kü bölü delta te": altına "akım = Δq / Δt ?" (soru işareti kırmızı).
- "Şöyle bir tel": sağ yarıda grafik, y %32–72. Yatay eksen "t (s)", işaretler 0; 0,5; 1. Dikey eksen "i (mA)", işaretler −10, 0, 10 (eksen −15…15). Mavi: 0–0,5 s arası +10 mA, 0,5–1 s arası −10 mA (0,5 s'deki dikey geçiş ince kesik).
- Denklem sütunu (sol, y %32–72): iki sütunlu tablo, başlıklar "aralık" ve "geçen yük": "0 ile 0,5 s arası" ve "+5 mC", "0,5 ile 1 s arası" ve "−5 mC"; altında "Δq = 5 mC − 5 mC = 0", "Δq / Δt = 0" (kırmızı). Sonra mavi "5 mC / 0,5 s = 10 mA".
- "Pencereyi daraltırsak": grafiğe kesik çerçeve pencereler, her biri ayrı çizilir: önce 0–1 s (kırmızı "0"), sonra 0,1–0,3 s (mavi "10 mA"), sonra 0,4–0,6 s (kırmızı "0").
- "asıl tanımı": silme; ortada büyük "i = dq / dt" (mavi), altına "birim: amper (A)", "1 A = 1 C / s", "2 µC / 1 ms = 2 mA".
- Abone animasyonu 1 parça 3'ün başında.

## [PARÇA 3] Abone çağrısı, seri haritası (~1:20)

```
Bu serinin devamı için kanala abone olabilirsin.

Fark ettin mi? Artık akım bir ortalama değil. Her an için ayrı bir değeri olan, zamana bağlı bir büyüklük.

Bu seride nereye gideceğimize de kısaca bakalım. Yük ve akımdan sonra gerilimi tanıyacağız. Ardından kaynakları, direnci ve kondansatörü inceleyeceğiz. Sonra Kirşof yasalarını, onların üstüne kurulan analiz yöntemlerini ve devre teoremlerini göreceğiz. Daha sonra önce direnç ile kondansatörden oluşan devrelere, ardından direnç ile bobinden oluşan devrelere, sonra da üçünün bir arada olduğu devrelere geçeceğiz. Son durağımız da işlemsel kuvvetlendiriciler.

Her dersi on beş dakika civarında üç bölümde işliyoruz. Bütün bu yolda akımı bugünkü tanımla kullanacağız. Şimdi bunu üç örnekle pekiştirelim.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 1** (UZUN.md 4b; alt bant). Üstte kalem "i = dq / dt" yanına "(t)" ekleyerek "i(t)" yazar ("zamana bağlı" ile eşzamanlı), sonra altını mavi çizer.
- Silme. Seri haritası iki sıra numaralı basamak (ok ucu yok, basamaklar ince çizgiyle bağlı), sırayla yazılır. 1. sıra (y %15–35): "1. yük, akım, gerilim", "2. kaynaklar, direnç, kondansatör", "3. Kirchhoff yasaları", "4. analiz yöntemleri ve teoremler". 2. sıra (y %42–62): "5. direnç–kondansatör ve direnç–bobin devreleri", "6. direnç, bobin ve kondansatörlü devreler", "7. işlemsel kuvvetlendirici". Basamak 1 mavi daire ("buradayız").
- "bugünkü tanımla": sağ altta (y ≤ %72) "i = dq / dt", mavi daire.

## [PARÇA 4] Örnek 1 — basamaklı akım ve ortalama (~2:50)

```
İlk örneğimize geçelim. Bir telden dört milisaniye boyunca yük geçiyor. İlk bir milisaniyede beş mikrokulon geçiyor. Sonraki üç milisaniyede ise yalnızca üç mikrokulon. Her aralığın içinde yük düzgün biçimde akıyor. Soru şu: bu teldeki akım nedir?

İlk refleks, toplam yükü toplam süreye bölmek. Sekiz mikrokulon bölü dört milisaniye, iki miliamper. Hesap doğru. Peki teldeki akım herhangi bir anda gerçekten iki miliamper oldu mu?

Hadi bakalım. İlk aralıkta beş mikrokulon bir milisaniyede geçti, bu da beş miliamper eder. Burada küçük bir kolaylık var: mikrokulonu milisaniyeye bölünce doğrudan miliamper buluyoruz. İkinci aralıkta üç mikrokulon üç milisaniyede geçti, bu da bir miliamper.

Şimdi grafiği çizelim. Yatay eksen zaman, milisaniye cinsinden. Dikey eksen akım, miliamper cinsinden. Sıfır ile bir milisaniye arasında akım beş miliamper. Bir ile dört milisaniye arasında bir miliamper.

Buradan iki soruyu hemen cevaplayabiliriz. Yarım milisaniye anında akım nedir? Beş miliamper. Üç milisaniye anında akım nedir? Bir miliamper. Her an için tek bir cevap var.

Bir de sıfır ile yarım milisaniye arasında bir pencere seçelim. Bu sürede iki buçuk mikrokulon geçer, yarım milisaniyeye bölünce yine beş miliamper. Pencere akımın sabit olduğu aralıkta kaldıkça, genişliği ne olursa olsun aynı cevabı alırız.

Şimdi de pencereyi sıfır ile iki milisaniye arasında seçelim. İlk milisaniyede beş, sonraki milisaniyede bir mikrokulon geçiyor, toplam altı mikrokulon. İki milisaniyeye bölünce üç miliamper. Bu da hiçbir anın değeri değil. Pencereyi değiştirdikçe ortalama da değişiyor.

Peki iki miliamper nerede? Grafikte iki miliamperlik çizgiyi kesik çizgiyle çizelim. Gördüğün gibi, akım hiçbir an bu değeri almıyor. İki miliamper, bu dört milisaniyedeki ortalama akım.

Ortalama yanlış değil, sadece başka bir soruya cevap veriyor. Dört milisaniyede toplam ne kadar yük geçti diye soruyorsan ortalama işini görür. Ama şu anda telden ne kadar akım geçiyor diye soruyorsan, ortalama sana cevap vermez.

Buradaki tuzak, sorunun ne istediğine bakmadan delta kü bölü delta te yazmak. Soru ortalamayı mı soruyor, yoksa belirli bir andaki akımı mı? Bir de şunu fark et: her aralığın içinde yük düzgün aktığı için, pencereyi akımın sabit kaldığı bir aralığın içinde seçersen, delta kü bölü delta te zaten anlık akıma eşit çıkar.
```

Sahne planı:
- Üstte soru: "0–1 ms: 5 µC", "1–4 ms: 3 µC", "her aralıkta düzgün", "akım = ?" (mavi).
- "İlk refleks": sağda "8 µC / 4 ms = 2 mA" (siyah), altına kırmızı "her an 2 mA mı?".
- "Hadi bakalım": altına "5 µC / 1 ms = 5 mA", "3 µC / 3 ms = 1 mA" (mavi). Küçük not "µC / ms = mA".
- Grafik (sol, y %40–72): yatay eksen "t (ms)" işaretler 0, 1, 2, 3, 4; dikey eksen "i (mA)" işaretler 0, 1, 2, 3, 4, 5 (eksen 0–6). Mavi basamak: 0–1 ms 5 mA, 1–4 ms 1 mA; t = 1 ms'deki dikey geçiş ince kesik. Değerler kodda `console.assert`.
- "Yarım milisaniye anında": t = 0,5 ms'de mavi nokta "5 mA"; t = 3 ms'de mavi nokta "1 mA".
- "sıfır ile iki milisaniye": grafikte 0–2 ms kesik çerçeve, yanında "6 µC / 2 ms = 3 mA".
- "iki miliamperlik çizgi": kırmızı kesik yatay çizgi 2 mA'de, ucunda "ortalama 2 mA".
- "toplam ne kadar yük": yanında "2 mA × 4 ms = 8 µC" (tarama yok; alan konusu Bölüm 2'de).
- "Buradaki tuzak": sağ üstte kırmızı kutu "ortalama akım mı, anlık akım mı?".

## [PARÇA 5] Örnek 2 — akım her an değişiyor (~4:25)

```
Şimdi biraz daha zor bir örnek. Burada akım her an değişiyor.

Bir telin kesitinden geçen toplam yük, sıfır anından itibaren şöyle artıyor: kü eşittir iki te kare milikulon. Burada te, saniye cinsinden. Soru şu: te eşittir üç saniye anında akım ne kadar?

Önce ortalama yoldan gidelim. Üç saniyede ne kadar yük geçmiş, onu bulalım. Formülde te yerine üç yazıyoruz. Üçün karesi dokuz, dokuzun iki katı on sekiz. Yani üç saniyede on sekiz milikulon geçmiş. Ortalama akım, geçen yük bölü geçen süre. On sekiz milikulonu üç saniyeye bölünce altı miliamper.

Bir an dur ve tahmin et: üç saniyedeki akım bu ortalamadan büyük mü, küçük mü?

Şimdi tanımı kullanalım. Akım, yükün zamana göre türevi. Te karenin türevi iki te. Bunu da iki ile çarpınca dört te buluyoruz. Yani akım, dört te miliamper. Üç saniye anında te yerine üç yazalım. Dört çarpı üç, on iki miliamper. Bu, ortalamanın tam iki katı, çünkü on ikiyi altıya bölünce iki çıkıyor. Birime de bakalım: milikulon bölü saniye, miliamper eder.

Bu iki kat bir tesadüf değil. Yük sıfırdan başlayıp zamanın karesiyle artıyorsa, sıfırdan o ana kadarki ortalama akım, o andaki akımın tam yarısıdır. Çünkü akım sıfırdan başlıyor ve zamanla doğrusal olarak artıyor. Ortalama da başlangıç ile son değerin tam ortasında kalıyor. Sıfır ile on ikinin tam ortası da altı.

Bunu türev almadan da görebiliriz. Üç saniye anından başlayan bir pencere açalım ve onu adım adım daraltalım. Her pencerede aynı üç adımı izleyeceğiz. Önce pencerenin sonundaki yükü formülden bulacağız. Sonra bundan, üç saniyedeki on sekiz milikulonu çıkaracağız. Bu fark, pencerede geçen yük. En son bu farkı pencerenin genişliğine böleceğiz.

Pencere bir saniye olsun, yani üç ile dört saniye arası. Dördün karesi on altı, iki katı otuz iki milikulon. Otuz ikiden on sekizi çıkarınca on dört milikulon kalıyor. Bunu bir saniyeye bölünce on dört miliamper.

Şimdi pencereyi saniyenin onda birine indirelim. Pencerenin sonu üç virgül bir saniye. Üç virgül birin karesi, dokuz virgül altmış bir. Bunun iki katı, on dokuz virgül yirmi iki milikulon. On sekizi çıkarınca bir virgül yirmi iki milikulon kalıyor. Bunu sıfır virgül bir saniyeye bölünce on iki virgül iki miliamper.

Bir de pencereyi yüzde birine indirelim. Pencerenin sonu üç virgül sıfır bir saniye. Üç virgül sıfır birin karesi, dokuz virgül sıfır altı sıfır bir. Bunun iki katı, on sekiz virgül bir iki sıfır iki milikulon. On sekizi çıkarınca sıfır virgül bir iki sıfır iki milikulon kalıyor. Bunu sıfır virgül sıfır bir saniyeye bölünce on iki virgül sıfır iki miliamper.

Gördün mü? Önce on dört, sonra on iki virgül iki, sonra on iki virgül sıfır iki. Pencere küçüldükçe sonuç on iki miliampere yaklaşıyor. De kü bölü de te tam olarak bu sınır değer.

Bunu grafikte de görelim. Yükü zamana göre çizdiğimizde, iki nokta arasındaki ortalama akım, o iki noktayı birleştiren doğrunun eğimidir. Bu doğruya kesen diyoruz. Pencere daraldıkça kesen, üç saniyedeki noktada eğriye teğet olan doğruya yaklaşır. Bu teğetin eğimi on iki miliamper. Yani anlık akım, yük grafiğinin o andaki eğimidir.

Bir soru daha soralım. Akım hangi anda ortalama değere, yani altı miliampere eşit oluyor? Akım dört te olduğuna göre, dört te eşittir altı yazıyoruz. Altıyı dörde bölünce te, bir buçuk saniye çıkıyor. Demek ki ortalama değer de aslında akımın bir anda aldığı bir değer. Ama o an, bizim sorduğumuz üç saniye değil, bir buçuk saniye. Grafikte de bunu görebilirsin: sıfırdan üçe uzanan kesene paralel teğet, tam bir buçuk saniyede eğriye değiyor.

Bu akım iki kiloohmluk bir dirençten geçseydi ne olurdu? Ohm yasasına göre direncin uçlarındaki gerilim, direnç ile akımın çarpımıdır. Üç saniye anında iki kiloohm çarpı on iki miliamper. İki çarpı on iki yirmi dört eder. Kiloohm ile miliamperin çarpımı da volt verir. Yani yirmi dört volt. Ortalama akımı kullansaydık iki kiloohm çarpı altı miliamper, yani on iki volt bulurduk. Bu, o andaki gerilimin yarısı. Yani bu örnekte akımda yapılan hata, gerilime de aynen taşınıyor.
```

Sahne planı (sürüm 3, iş emri 18.11: her sayının hesabı adım adım; grafik renkleri kanal sahibinin onayıyla):
- **Tahta A.** Üstte: "q(t) = 2t² mC", "t saniye cinsinden", "i(3 s) = ?" (mavi).
- "ortalama yoldan": "q(3 s) = 2 × 3² = 2 × 9 = 18 mC" (siyah), "ortalama = 18 mC / 3 s = 6 mA" (siyah).
- "tahmin et": kalem "i(3 s) = ?" etrafına yavaş daire (1,5 sn sessizlik boyunca hareket sürer).
- "tanımı kullanalım": "i = dq / dt = 2 × 2t = 4t mA" (mavi), "i(3 s) = 4 × 3 = 12 mA" (mavi, daire). Yanına kırmızı "12 mA, ortalamanın 2 katıdır (12 / 6 = 2)"; altına küçük "mC / s = mA".
- "Sıfır ile on ikinin": altına "(0 + 12) / 2 = 6 mA" (siyah).
- **Tahta B (silme): pencere hesapları.** Üstte başlık "Her pencerede üç adım", altında numaralı üç satır: "1. q(son)", "2. Δq = q(son) − q(3 s)", "3. Δq / Δt" (ok ve iki nokta yok). Altında üç sütun, her sütun sesle eşzamanlı üç satır:
  - Δt = 1 s: "q(4 s) = 2 × 4² = 2 × 16 = 32 mC", "Δq = 32 − 18 = 14 mC", "Δq / Δt = 14 mC / 1 s = 14 mA".
  - Δt = 0,1 s: "q(3,1 s) = 2 × 3,1² = 2 × 9,61 = 19,22 mC", "Δq = 19,22 − 18 = 1,22 mC", "Δq / Δt = 1,22 mC / 0,1 s = 12,2 mA".
  - Δt = 0,01 s: "q(3,01 s) = 2 × 3,01² = 2 × 9,0601 = 18,1202 mC", "Δq = 18,1202 − 18 = 0,1202 mC", "Δq / Δt = 0,1202 mC / 0,01 s = 12,02 mA".
  - Uzun satırlar sığmazsa sütunlar yerine üç satır bloğu alt alta (yazı boyu küçültülmez < 40 px). "Gördün mü": üç sonucun altı sırayla mavi çizilir, altına "Δt küçüldükçe sonuç 12 mA'e yaklaşır".
- **Tahta C (silme): grafik** (sol, y %15–72): yatay eksen "t (s)" işaretler 0, 1, 2, 3, 4; dikey eksen "q (mC)" işaretler 0, 10, 20, 30 (eksen 0–35). Eğri q = 2t² **mavi** (q(3) = 18, q(4) = 32 `console.assert`). t = 3 s'de nokta.
  - "kesen diyoruz": 3–4 s keseni **gri kesikli**, yanında gri "kesen, Δt = 1 s, eğim = 14 mC / 1 s = 14 mA"; ardından 3–3,1 s keseni gri kesikli (etiketsiz).
  - "teğetin eğimi": t = 3 s teğeti **kırmızı düz**, yanında kırmızı "teğet, eğim = i(3 s) = 4 × 3 = 12 mA".
  - Sağda küçük özet tablo (y %15–50): "Δt" ve "Δq / Δt": 1 s ve 14 mA; 0,1 s ve 12,2 mA; 0,01 s ve 12,02 mA (hesapları Tahta B'de gösterildi).
  - "Bir soru daha": sağda (y %52–72) "i = 4t mA = 6 mA", altında "4t = 6", "t = 6 / 4 = 1,5 s" (mavi); grafikte 0–3 s keseni **gri kesikli** ("kesen, eğim = 18 / 3 = 6 mA") ve t = 1,5 s'de ona paralel teğet **kırmızı düz** ("teğet, eğim = 4 × 1,5 = 6 mA").
- **Tahta D (silme): Ohm.** Küçük direnç çizimi, akım oku (mavi "i") direncin "+" ucundan girer, uçlarda "+" ve "−"; yanında "v = R × i", "v(3 s) = 2 kΩ × 12 mA = 24 V" (mavi), altında küçük "kΩ × mA = V", "ortalama akımla: 2 kΩ × 6 mA = 12 V" (kırmızı), "12 V, 24 V'un yarısıdır (24 / 2 = 12)".

## [PARÇA 6] Örnek 3 — yük en büyükken akım sıfır (~2:50)

```
Son örneğimiz biraz düşündürücü. Bu kez kesitten geçen net yük şöyle değişiyor: kü eşittir altı te eksi te kare milikulon. Te yine saniye cinsinden ve sıfır ile dört saniye arasına bakıyoruz.

Önce sana bir soru. Üç saniye anında yük kaç milikulon, akım kaç miliamper? Bir an durup kendin bulmaya çalış.

Yükten başlayalım. Üç saniyede altı te, on sekiz eder. Te kare ise dokuz. On sekizden dokuzu çıkarınca yük dokuz milikulon. Bu aralıktaki en büyük değer bu. Bunu sayılarla da kontrol edelim. İki buçuk saniyede de üç buçuk saniyede de yük sekiz virgül yetmiş beş milikulon. Üç saniyenin iki yanında yük daha küçük, yani üç saniye gerçekten tepe noktası.

Şimdi akım. Türevi alalım. Altı te teriminin türevi altı, te karenin türevi iki te. Yani akım, altıdan iki te çıkarılarak bulunuyor: altı eksi iki te miliamper. Üç saniye anında iki te altı eder, altıdan altıyı çıkarınca sıfır miliamper.

İlginç değil mi? Yük en büyük değerindeyken akım sıfır. Aslında bir önceki örnekteki eğim yorumu bunu hemen söylüyor. Yük grafiği üç saniyede tepe noktasında. Tepede teğet yatay, yani eğim sıfır. Akım yükün ne kadar olduğuna değil, ne kadar hızlı değiştiğine bakar.

Bir de başka anlara bakalım. Bir saniyede iki te iki eder, altıdan ikiyi çıkarınca akım dört miliamper. Dört saniyede iki te sekiz eder, altıdan sekizi çıkarınca akım eksi iki miliamper. Eksi işaret ne demek? Üç saniyeden sonra yük azalmaya başlıyor. Yani yük kesitten artık ters yönde geçiyor. Akımın yönünü ve işaretin bu yönü nasıl taşıdığını ikinci bölümde ayrıntılı göreceğiz.

Peki akım hangi anda en büyük? Altı eksi iki te ifadesi te büyüdükçe küçülüyor. Yani en büyük değer başlangıçta, te sıfırken: altı miliamper. O anda yük ise sıfır. Tablo tam ters döndü. Yük sıfırken akım en büyük, yük en büyükken akım sıfır.

Bir de sıfır ile dört saniye arasındaki ortalamaya bakalım. Dört saniyede yük, yirmi dörtten on altıyı çıkarınca sekiz milikulon. Sekizi dörde bölünce iki miliamper. Oysa bu aralıkta akım dört, sıfır, eksi iki gibi çok farklı değerler aldı. Ortalama, bu hikâyenin tamamını tek bir sayıya sıkıştırıyor.

Buradaki tuzak, yük büyükse akımın da büyük olacağını sanmak. Az önce gördük: yük en büyükken akım sıfırdı.
```

Sahne planı:
- 0:00–0:06 **abone animasyonu 2** (alt bant; son çözümlü sorudan önce). Kart bir katmandır; tahtadaki kalem yazmaya devam eder.
- Üstte: "q(t) = (6t − t²) mC", "0 ≤ t ≤ 4 s", "t = 3 s anında: q = ?, i = ?" (mavi). "Bir an durup": kalem soru işaretlerinin etrafına yavaşça daire çizer.
- "Yükten başlayalım": "q(3 s) = 18 − 9 = 9 mC" (siyah); "sayılarla kontrol": "q(2,5 s) = 8,75 mC", "q(3,5 s) = 8,75 mC".
- "Türevi alalım": "i = dq / dt = (6 − 2t) mA" (mavi), "i(3 s) = 6 − 6 = 0 mA" (mavi, kırmızı daire).
- Grafik (sol, y %40–72): yatay eksen "t (s)" işaretler 0, 1, 2, 3, 4; dikey eksen "q (mC)" işaretler 0, 2, 4, 6, 8, 10 (eksen 0–10). Parabol değerleri q(0)=0, q(1)=5, q(3)=9, q(4)=8 (`console.assert`). t = 3 s tepe noktasında yatay kesik teğet (kırmızı), "eğim = 0".
- "Bir saniyede": t = 1 s'de pozitif eğimli kısa teğet, "i = 4 mA"; t = 4 s'de negatif eğimli kısa teğet, "i = −2 mA" (kırmızı).
- "en büyük": t = 0'da pozitif eğimli kısa teğet, "i(0) = 6 mA", "q(0) = 0".
- "ortalamaya bakalım": sağda "q(4 s) = 24 − 16 = 8 mC", "8 mC / 4 s = 2 mA".
- "Buradaki tuzak": sağ üstte kırmızı kutu "yük en büyükken akım sıfır".

## [PARÇA 7] Kapanış (~1:05 + 20 sn bitiş ekranı)

```
Toparlayalım. Akım, yükün kesitten geçme hızıdır: i eşittir de kü bölü de te. Delta kü bölü delta te ise yalnızca seçtiğin penceredeki ortalamayı verir, pencere küçüldükçe de anlık akıma yaklaşır. Akımı belirleyen, geçen yükün miktarı değil, değişme hızıdır.

Üç örnekte de aynı şeyi gördük. Basamaklı akımda ortalama hiçbir anın değeri değildi. Sürekli artan akımda anlık değer ortalamanın iki katıydı. Son örnekte de yük en büyükken akım sıfırdı. Ohm yasasıyla gerilimi bulurken de anlık akımı kullandık.

Sana da bir soru bırakayım. Yük, dört te eksi te kare milikulon olsaydı, akım hangi anda sıfır olurdu? İpucu: tepe noktasını düşün. Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan ikinci bölümü kaçırmazsın.

İkinci bölümde akımın yönünü, açık devrenin bize neyi garanti ettiğini ve bugün yaptığımızın tersini, yani akım grafiğinden geçen yükü bulmayı göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (tahtanın ortası, y %15–65; ≥4 sn okunur): başlık "Bilmen gerekenler"; maddeler: "• Akım, yükün geçiş hızıdır (i = dq / dt)", "• Yük bölü süre yalnızca ortalamadır (Δq / Δt)", "• Yük en büyükken akım sıfır olabilir".
- "Sana da bir soru": kart silinir; ortada "q(t) = (4t − t²) mC", "akım hangi anda sıfır olur?" (mavi), "cevabını yorumlara yaz".
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "İkinci bölümde": silme; üstte "Sıradaki: Bölüm 2/3", altında "akımın yönü, açık devre, akım grafiğinden yük".
- Son 20 sn **bitiş ekranı alanı**: orta ve alt boş; yalnızca sol üstte küçük, yavaşça yazılan "Devre Teorisi I" (hareket sürer). Ses yok.
