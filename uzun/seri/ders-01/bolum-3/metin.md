# Devre Teorisi I: Ders 1 - Bölüm 3/3 — Gerilim, kısa devre ve ideal kaynak

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA) [28:08–43:19]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Razavi'nin iki örneği (iki iletken levha [31:42–34:05]; anahtar + batarya + R1, sonra paralel R2 [39:06–43:19]) kullanılmadı; levha resmi yerine kendi "tepe ve vadi" benzetmemiz, R1/R2 dizisi yerine regülatöre yük değiştirme.
**Sürüm 1 (20.11.2026 gece çalışması)**, bağımsız denetimden sonra düzeltildi (kritik yok; 10 önemli + 10 küçük bulgu uygulandı, bkz. dogruluk.md "Denetim").

**En sık yapılan hata:** Açık devre ile kısa devreyi karıştırmak: "kısa devrede akım sıfırdır" deyip kısa devre edilen telden akım geçmediğini, akımın yine iki dirençten geçtiğini sanmak (yanlış sonuç: 2 mA). Doğrusu: kısa devre yalnızca gerilimin sıfır olduğunu garanti eder; akımı çevre belirler (doğru sonuç: telden 3 mA, 1 kΩ'dan 0). Razavi ayrımı açıkça vurgular [38:16–38:47]; Bölüm 2'deki açık devre hatasının ikizi (icerik.md bölüm 6). Bölümde tek "En sık yapılan hata" budur; Uygulamadaki ideal kaynak sınırı "tasarımda pahalıya patlayan hata" diye düz anlatılır.
Az bilinen nokta: "bir noktanın gerilimi" her zaman bir referansa (toprağa) göredir; referans değişince noktaların gerilimi değişir, iki nokta arasındaki gerilim değişmez (Parça 4).

Ön bilgi (açıklamaya): Bölüm 1 (yük, akım); Bölüm 2 (referans oku, açık devre); Ohm yasası (v = R × i); fizikten iş/enerji (jul).

Gösterim: gerilim küçük v (v_ab = v_a − v_b), enerji W, yük q, akım i. **Tek istisna** Parça 6'daki datasheet tablosu: sembol datasheet'te yazdığı gibi (V_DSS, V_GS, V_F, V_RRM, I_OUT, I_CL, I_SC). Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" yok. Her gerilimin yanında + ve − işaretleri, her akımın yanında referans oku.

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok. Nokta adları seste "a" ve "be" (yazıda b; seste harf "be" diye yazıldı ki yapay ses doğru okusun). "q" sesle "kü". Parça numaraları (TLV75533P, 2N7002E, 1N4007) ve datasheet sembolleri seste okunmaz: "üç virgül üç voltluk bir regülatör", "elektronik anahtar", "diyot". "datasheet" seste hiç geçmez, yalnızca "veri sayfası". "mV" seste "milivolt", "Ω" "ohm", "µJ" "mikrojul", "µC" "mikrokulon". "USB", "LDO" gibi kısaltmalar seste yok.

Zaman bütçesi (2,6 kelime/sn: Bölüm 1–2'nin ölçümü): `dogrula.py` çıktısı. Intro kartı selamla birlikte (~11 sn); bitiş ekranı alanı (son 20 sn) Parça 7'nin sonunda sessiz.

> **Tahta düzeni (UZUN.md 4, Bölüm 2 motoruyla aynı):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 1 - Bölüm 3: Gerilim, kısa devre ve ideal kaynak"** (Parça 1'de intro kartından sonra kalemle yazılır; sonraki parçalarda sabit; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre). Etiketler ve ara bilgiler koyu yeşil (#1E7B4A); gri yalnızca yardımcı çizgiler. Alt %24'lük bant yalnızca abone kartı ve kapanış için.

---

## [PARÇA 1] Kanca, selam, intro kartı (~1:05)

```
Bir direncin iki ucunu bir telle birbirine bağlarsan, o dirençten ne kadar akım geçer? Akla gelen ilk düşünce şu olabilir: kısa devrede akım sıfırdır, telden akım geçmez.

Oysa birazdan kuracağımız devrede, telin içinden tam üç miliamper geçiyor, direncin içinden ise hiç akım geçmiyor. Kısa devrede sıfır olan akım değil, gerilimdir. Açık devreyle kısa devreyi karıştırmak, bu konudaki en sık yapılan hata.

Bu bölümün sonunda gerilimi enerjiden hesaplayacak, her gerilimi işaretiyle yazacaksın. Bir noktanın geriliminin neye göre ölçüldüğünü bileceksin. Kısa devrede akımı bulacak, ideal bir gerilim kaynağının neyi garanti ettiğini göreceksin. Bir veri sayfasında da gerçek bir kaynağın nerede ideal olmaktan çıktığını öğreneceksin.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün Ders Bir'in üçüncü bölümünde gerilimi, kısa devreyi ve ideal gerilim kaynağını konuşacağız.

İkinci bölümde akımın bir değeri ve bir yönü olduğunu, açık devrenin de yalnızca akımın sıfır olduğunu garanti ettiğini görmüştük. Şimdi devre teorisinin ikinci temel büyüklüğüne geçiyoruz: gerilim.
```

Sahne planı:
- 0:00 (ilk kare) sağ sütunda kalem bir direnç (zikzak, "1 kΩ") çizer; iki ucundan çıkan teller; ardından iki ucu birleştiren kırmızı tel (kısa devre). Tel üstünde mavi "i = ?". Solda kırmızı başlık "Kısa devre".
- "kısa devrede akım sıfırdır": sol sütunda kırmızı "Telden i = 0 ?".
- "tam üç miliamper": "Telden i = 0 ?" kırmızıyla üstü çizilir; yanına mavi "Telden i = 3 mA"; altına "Dirençten i = 0" (yanıp sönen fon); telin üstünde mavi referans oku.
- "Kısa devrede sıfır olan … gerilimdir": siyah "Kısa devrede sıfır olan gerilimdir (v = 0)"; altında kırmızı "Açık ve kısa devreyi karıştırmak: en sık yapılan hata".
- "Bu bölümün sonunda": sahne silinir; kırmızı başlık "Bu bölümde", beş madde: "- Gerilim enerjiden", "- Gerilimin işareti", "- Bir noktanın gerilimi neye göre?", "- Kısa devre ve ideal gerilim kaynağı", "- Veri sayfasında gerçek kaynak". Silinir.
- **[INTRO KARTI + SELAM]** Ortada: "Devre Teorisi I: Ders 1 - Bölüm 3/3" (siyah, kırmızı alt çizgi), altına "Gerilim, kısa devre ve ideal kaynak" (mavi); selam bitince silinir.
- "İkinci bölümde": köşe başlığı yazılır; kırmızı başlık "Bölüm 2'den"; "- Akımın değeri ve yönü (referans oku)", "- Açık devre: i = 0"; sağ sütunda koyu yeşil "Şimdi: gerilim".

## [PARÇA 2] Gerilimin tanımı, örnek + abone çağrısı 1 (~2:30)

```
Fizikte bu büyüklüğe potansiyel farkı da denir. Biz devre teorisinde gerilim ya da gerilim farkı diyeceğiz. Birimi volt. Peki tanımı tam olarak ne?

Büyük bir devrede iki nokta seçelim. Birine a, diğerine be diyelim. a ile be arasındaki gerilimi şöyle tanımlıyoruz: bir kulonluk pozitif bir yükü be noktasından a noktasına taşımak için harcamamız gereken enerji. Sıraya dikkat et: yük be'den başlıyor, a'ya gidiyor. Bu sıra, gerilimin işaretini belirleyecek.

Bir kulonluk yükle çalışmak zorunda değiliz. Herhangi bir pozitif yükü taşıyıp, harcanan enerjiyi o yüke bölebiliriz. Yani gerilim, enerji bölü yük. Enerjinin birimi jul, yükün birimi kulon. Bir jul bölü bir kulon, bir volt eder. Örneğin bir pilin üstünde bir buçuk volt yazıyorsa, bir kulonluk pozitif yükü pilin eksi ucundan artı ucuna taşımak bir buçuk jul enerji ister.

Bir örnek yapalım. Dört mikrokulonluk pozitif bir yükü be'den a'ya taşımak, on sekiz mikrojul enerji istiyor. a ile be arasındaki gerilim, enerji bölü yük. On sekiz mikrojul bölü dört mikrokulon. Mikrolar birbirini götürür, kalan on sekiz bölü dört, dört virgül beş volt.

Şimdi yükü iki katına çıkaralım: sekiz mikrokulon. Bu kez taşımak otuz altı mikrojul istiyor. Otuz altı bölü sekiz, yine dört virgül beş volt. Yük iki katına çıktı, enerji de iki katına çıktı, gerilim değişmedi. Çünkü gerilim, taşıdığımız yükün miktarına değil, iki noktanın kendisine bağlı.

Peki aynı dört mikrokulonu bu kez a'dan be'ye götürürsek? O zaman bu enerjiyi harcamayız, geri alırız. Harcanan enerji eksi on sekiz mikrojul olur. Eksi on sekiz bölü dört, eksi dört virgül beş volt. Yani be ile a arasındaki gerilim, eksi dört virgül beş volt.

Bu serinin devamı için kanala abone olabilirsin.
```

Sahne planı:
- Kırmızı başlık "Gerilim". Sol: "- Fizikte: potansiyel farkı", "- Birimi volt (V)".
- "iki nokta seçelim": sağ sütunda büyük bir devre kutusu (koyu yeşil "Devre"); üzerinde iki nokta "a" (üstte) ve "b" (altta), siyah dolu noktalar. "harcamamız gereken enerji": mavi "+" yük b'den a'ya hareket eder (kesikli yol, ok); sol sütunda tanım (mavi kutu, iki satır): "v_ab: 1 C pozitif yükü b'den a'ya", "taşımak için gereken enerji". "Sıraya dikkat": koyu yeşil "Sıra: b'den a'ya".
- "enerji bölü yük": "v_ab = W / q" (mavi, büyük, kırmızı çerçeve); "1 V = 1 J / 1 C" (koyu yeşil "W: enerji (J), q: yük (C)"). "bir buçuk volt": sağda küçük pil sembolü "1,5 V" (+ üstte), koyu yeşil "1 C'yi − uçtan + uca taşımak: 1,5 J".
- Silme (köşe başlığı kalır). Kırmızı başlık "Örnek". Sol sütunda sırayla: "q = 4 μC, W = 18 μJ", "v_ab = W / q = 18 μJ / 4 μC = 18 / 4 = 4,5 V" (mavi), koyu yeşil "μ'lar sadeleşir: J / C = V". "iki katına": "q = 8 μC, W = 36 μJ", "v_ab = 36 μJ / 8 μC = 36 / 8 = 4,5 V" (mavi), siyah "- Gerilim yüke değil, iki noktaya bağlı" (mavi alt çizgi). Sağda küçük kroki: a üstte, b altta, yükün yolu oku.
- "a'dan be'ye": kroki okunun yönü ters çizilir (kırmızı); sol sütunda "a'dan b'ye: W = −18 μJ", "v_ba = −18 μJ / 4 μC = −4,5 V" (kırmızı).
- "abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda alt banttan girer (Bölüm 2 düzeni); kalem son satırın altını yavaşça çizer. Bütün yazılar y ≤ %76.

## [PARÇA 3] Tepe ve vadi benzetmesi, gerilimin değeri ve işareti (~2:00)

```
Bu tanımı gözünde canlandırmanın kolay bir yolu var. Gerilimi bir yükseklik farkı gibi düşünebilirsin. Pozitif bir yük için artı uç bir tepe, eksi uç bir vadi. Yükü vadiden tepeye çıkarmak enerji ister. Tepeden vadiye inerken ise bu enerjiyi geri alırsın. Bir kulon başına bu enerji, iki nokta arasındaki gerilimdir. Bu yalnızca bir benzetme, ama işareti hatırlamak için çok işe yarar.

İkinci bölümde akımın bir değeri ve bir yönü vardı. Gerilimin de bir değeri ve bir işareti var. Bir direncin uçlarında yedi volt var diyorsak, bunu tek başına söylemek yetmez. Uçlardan birine artı, diğerine eksi koyarız. Bunun anlamı şu: artı uç, eksi uçtan yedi volt yüksek.

İşaretleri ters koyarsak ne olur? Aynı direnç, aynı durum. Ama bu kez artıyı öbür uca koyduk. O zaman yazmamız gereken sayı eksi yedi volt olur. Kısacası be ile a arasındaki gerilim, a ile be arasındaki gerilimin eksisidir.

Bunu tersinden de okuyabilirsin. Bir direncin sol ucuna artı, sağ ucuna eksi koyduk ve hesapta eksi üç volt bulduk. Bu, hesabın yanlış olduğu anlamına gelmez. Sadece sağ ucun, sol uçtan üç volt yüksek olduğunu söyler. İşaretleri baştan doğru tahmin etmek zorunda değilsin; sonuç işaretiyle birlikte doğruyu söyler.

Örneğimize dönelim. a ile be arasında dört virgül beş volt vardı. Artıyı a'ya, eksiyi be'ye koyarız. Yani a noktası, be noktasından dört virgül beş volt yüksek. Yeter ki işaretler şemada çizili olsun. İşaretleri olmayan bir gerilim, oku olmayan bir akım gibi eksik bir bilgidir.
```

Sahne planı:
- Kırmızı başlık "Tepe ve vadi". Sağ sütunda kalem bir tepe-vadi eğrisi çizer; tepeye "+" ve "Artı uç", vadiye "−" ve "Eksi uç" (koyu yeşil). Mavi "+" yük vadiden tepeye çıkar (yanında kırmızı "Enerji harcanır"), sonra tepeden iner ("Enerji geri alınır", koyu yeşil). Sol: "- Yükseklik farkı gibi", "- 1 C başına enerji = gerilim"; koyu yeşil "Yalnızca bir benzetme".
- Silme. Kırmızı başlık "Değer ve işaret". Sağda yatay direnç (zikzak), solda "+" sağda "−", üstte mavi "7 V". Sol: "- Akım: değer ve yön", "- Gerilim: değer ve işaret", "Artı (+) uç, eksi (−) uçtan 7 V yüksek".
- "ters koyarsak": altına ikinci kopya direnç, işaretler ters ("−" solda, "+" sağda), üstte kırmızı "−7 V"; koyu yeşil "Aynı durum" ve iki kopyayı birleştiren ince çizgi. Sol: "v_ba = −v_ab" (mavi, çerçeve).
- "tersinden de okuyabilirsin": üçüncü kopya direnç, solda "+", sağda "−", üstte kırmızı "−3 V"; koyu yeşil "Sağ uç, sol uçtan 3 V yüksek".
- "Örneğimize dönelim": sol: "a, b'den 4,5 V yüksek (v_ab = 4,5 V)"; "- Eksi işaret yanlış değildir"; mavi kutu "İşaretsiz gerilim eksik bilgidir".

## [PARÇA 4] Gerilim iki nokta arasında: toprak ve referans (~2:00)

```
Gelelim çok önemli bir noktaya: gerilim yalnızca iki nokta arasında anlamlıdır. Bir arkadaşın ölçüm yapıp şu noktada on iki volt var dese, ilk sorman gereken şu: neye göre? On iki volt, o noktayla başka bir nokta arasındaki farktır. O başka nokta belli değilse, söylenen sayı eksik kalır.

Pratikte o başka nokta çoğu zaman devrenin toprağıdır. Toprak, devrede referans olarak seçtiğimiz ortak bir uç. Şemada bu sembolle gösterilir. Bir noktanın gerilimi dediğimizde, o noktayla toprak arasındaki gerilimi kastederiz. Neden böyle yaparız? Bir devrede onlarca nokta olabilir. Her biri için ayrı ayrı neye göre olduğunu söylemek yerine, hepsini aynı uca göre veririz. Böylece iki noktanın gerilimini birbirinden çıkararak aralarındaki gerilimi hemen buluruz.

Bir örnek yapalım. Toprağa göre a noktası beş volt, be noktası üç virgül üç volt. a ile be arasındaki gerilim, a'nın gerilimi eksi be'nin gerilimi. Beş eksi üç virgül üç, bir virgül yedi volt. Tersinden, be ile a arasındaki gerilim eksi bir virgül yedi volt.

Şimdi referansı değiştirelim. Toprağı be noktasına taşıyalım. be'nin gerilimi artık sıfır volt. a'nın gerilimi ise, beş eksi üç virgül üç, bir virgül yedi volt. Eski toprağın gerilimi de artık sıfır eksi üç virgül üç, eksi üç virgül üç volt. Noktaların gerilimleri değişti, çünkü referans değişti. Peki a ile be arasındaki gerilim? Bir virgül yedi eksi sıfır, yine bir virgül yedi volt. İki nokta arasındaki gerilim, referansa bağlı değildir.

Bu bir virgül yedi volt sayısını aklında tut. Birazdan gerçek bir regülatörün giriş ve çıkışı arasında aynı sayıyla karşılaşacağız.
```

Sahne planı:
- Kırmızı başlık "Gerilim iki nokta arasında". Sol: "- 'Şu noktada 12 V var': neye göre?" (kırmızı soru işareti), "- Referans söylenmezse sayı eksik".
- "toprağıdır": sağ sütunda toprak sembolü (üç yatay çizgi) + koyu yeşil "Toprak: ortak referans ucu"; sol: "v_a: a ile toprak arasındaki gerilim (v_toprak = 0 V)".
- "Neden böyle yaparız?": koyu yeşil "Bütün noktalar aynı uca göre: farkı çıkararak bul".
- "Bir örnek": sağda dikey bir "gerilim cetveli" (siyah dikey çizgi): altta toprak "0 V", üstünde "b: 3,3 V", en üstte "a: 5 V" (mavi noktalar). Sol: "v_ab = v_a − v_b = 5 − 3,3 = 1,7 V" (mavi), "v_ba = −1,7 V" (kırmızı). Cetvelde a ile b arasına mavi ok "1,7 V".
- "Toprağı be'ye taşıyalım": cetvelin yanına ikinci cetvel: toprak b'nin hizasında; "b: 0 V", "a: 5 − 3,3 = 1,7 V"; eski toprak "0 − 3,3 = −3,3 V" (koyu yeşil). Sol: "Yeni referansla: v_a = 1,7 V, v_b = 0 V", "v_ab = 1,7 − 0 = 1,7 V" (mavi), mavi kutu "İki nokta arasındaki gerilim referansa bağlı değil".
- "aklında tut": "1,7 V" yanıp söner; koyu yeşil "Regülatörde yeniden".

## [PARÇA 5] Kısa devre, en sık yapılan hata, ideal gerilim kaynağı (~3:00)

```
Sıra kısa devrede. Kısa devre, iki noktayı direnci sıfır kabul edilen bir telle birbirine bağlamak demek. Kısa devre bize tek bir şeyi garanti eder: bağladığı iki nokta arasındaki gerilim sıfırdır.

Bunu Ohm yasasından görebiliriz. Gerilim, direnç çarpı akım. Telin direnci sıfır. Akım sonlu bir değer olduğu sürece, sıfır çarpı akım yine sıfır. Örneğin telden on miliamper geçse bile, sıfır ohm çarpı on miliamper, sıfır volt. Akım için aynı şeyi söyleyebilir miyiz? Hayır. Tel yalnızca gerilimi sıfırlar; içinden ne kadar akım geçeceğine devrenin geri kalanı karar verir.

İkinci bölümle yan yana koyalım. Açık devre akımın sıfır olduğunu garanti eder, gerilimi çevre belirler. Kısa devre gerilimin sıfır olduğunu garanti eder, akımı çevre belirler.

Şimdi kancadaki devreyi kuralım. Altı voltluk bir gerilim kaynağı, iki kiloohmluk ve bir kiloohmluk iki direnç, seri bağlanıp tek bir halka oluşturuyor. Seri bağlı iki dirençten aynı akım geçer ve gerilimleri toplanır; bu yüzden akıma toplam iki artı bir, üç kiloohmluk bir direnç gösterirler. Bunu ileride ayrıntılı göreceğiz. Tel yokken akım, altı volt bölü üç kiloohm, iki miliamper. Şimdi bir kiloohmluk direncin iki ucunu bir telle birbirine bağlıyoruz.

En sık yapılan hata burada yapılıyor. Kısa devrede akım sıfırdır deyip, telden akım geçmediğini ve akımın yine iki dirençten geçtiğini sanmak. Bu hatayla akım yine iki miliamper bulunur.

Doğrusu şu. Tel, bir kiloohmluk direncin uçları arasındaki gerilimi sıfıra indirir. Ohm yasasına göre bu direncin akımı, sıfır volt bölü bir kiloohm, yani sıfır. Akım dirence uğramaz, telden geçer. Artık iki kiloohmluk direnç, kaynağın altı voltunu tek başına görüyor. Akım, altı volt bölü iki kiloohm, üç miliamper. Bu üç miliamper telin içinden geçiyor. Kısa devre edilen direnç, artık devrede hiç yokmuş gibi davranır. Kısa devrede sıfır olan gerilimdir, akım değil.

Bu örnekte kaynağı ideal kabul ettik. İdeal gerilim kaynağı, uçları arasındaki gerilimi, ona ne bağlanırsa bağlansın aynı tutan elemandır. Akımı ise kaynak değil, bağlanan yük belirler. Tek bir direnç bağlıysa akım, kaynak gerilimi bölü direnç.

Bu modelin bir sınırı var. İdeal kaynağın uçlarını doğrudan bir telle kısa devre edersek bir çelişki çıkar. Kaynak, uçlarım arasında altı volt var der. Tel, sıfır volt der. Bunu görmek için kaynağa bağladığımız direnci adım adım küçültelim. Bir ohmda akım, altı bölü bir, altı amper. Sıfır virgül bir ohmda, altı bölü sıfır virgül bir, altmış amper. Sıfır virgül sıfır bir ohmda altı yüz amper. Direnç sıfıra yaklaştıkça akım sınırsız büyür. Yani ideal kaynak modeli kısa devrede anlamını yitirir. Gerçek bir kaynakta ne olduğunu şimdi bir veri sayfasında göreceğiz.
```

Sahne planı:
- Kırmızı başlık "Kısa devre". Sağda iki nokta a ve b, aralarına kırmızı kalın tel; koyu yeşil "Direnç = 0". Sol: "- Kısa devre: v = 0", "v = R × i = 0 × i = 0" (mavi), koyu yeşil "i sonlu olduğu sürece", "Örnek: 0 Ω × 10 mA = 0 V", "- Akımı çevre belirler".
- "yan yana koyalım": sağ alt iki sütunlu tablo (koyu yeşil başlıklar "Açık devre" | "Kısa devre"): "i = 0" | "v = 0" (mavi), "v: çevre belirler" | "i: çevre belirler".
- Silme. "kancadaki devre" (sol sütun, y %15–72): dikdörtgen halka; sol kolda ideal gerilim kaynağı (daire, "+" üstte, "6 V"); üst kolda "2 kΩ"; sağ kolda "1 kΩ"; alt kol tel. Üst kolda mavi referans oku "i". Sağ: "Seri: 2 kΩ + 1 kΩ = 3 kΩ", "Tel yokken i = 6 V / 3 kΩ = 2 mA" (mavi). "telle bağlıyoruz": 1 kΩ'un iki ucuna paralel kırmızı tel çizilir.
- "En sık yapılan hata": sağ sütunda kırmızı çerçeve "En sık yapılan hata", içinde "Telden akım geçmez, akım yine iki dirençten geçer", "i = 6 V / (2 kΩ + 1 kΩ) = 2 mA" (yanlış sonuç).
- "Doğrusu": koyu yeşil "Doğrusu", altında: "1 kΩ'un gerilimi = 0 V", "1 kΩ'un akımı = 0 V / 1 kΩ = 0 mA", "i = 6 V / 2 kΩ = 3 mA" (mavi), "- 3 mA telden geçer" (mavi alt çizgi). Devrede telin üstüne mavi ok "3 mA", 1 kΩ yanına "0". Kırmızı kart: "Kısa devrede sıfır olan gerilimdir".
- Silme. Kırmızı başlık "İdeal gerilim kaynağı". Sağ: daire sembolü "+ / −", "6 V"; uçlara sırayla farklı dirençler (kroki). Sol: "- Uç gerilimi sabit", "- Akımı yük belirler: i = v / R" (mavi).
- "Bu modelin bir sınırı": kırmızı "Kaynak 6 V der, tel 0 V der (çelişki)"; kaynağa bağlı direnç sırayla küçülür: "R = 1 Ω iken i = 6 V / 1 Ω = 6 A", "R = 0,1 Ω iken i = 6 V / 0,1 Ω = 60 A", "R = 0,01 Ω iken i = 6 V / 0,01 Ω = 600 A"; en sonda direncin yerine kırmızı tel çizilir; koyu yeşil "İdeal model kısa devrede anlamını yitirir".

## [PARÇA 6] Uygulamada: datasheet'teki gerilimler ve gerçek bir gerilim kaynağı (~3:30)

```
Bir veri sayfasında gerilim satırlarına bakalım. Orada her gerilim iki uç arasında verilir. Çoğu satırda adı o iki ucu söyler; söylemiyorsa gerilim toprağa göredir. İkinci bölümdeki elektronik anahtarın veri sayfasında iki gerilim sınırı var. Birincisi, akımın geçtiği iki uç arasında altmış volt. İkincisi, kontrol ucu ile anahtarın alt ucu arasında: kontrol ucu en çok yirmi volt yukarıda ya da yirmi volt aşağıda olabilir. Parça altmış voltluk diye kontrol ucuyla alt uç arasına yirmi dört volt uygularsan, kontrol ucunu bozabilirsin. Diyotta da aynı iki uç arasında iki ayrı satır var: ileri yönde en çok bir virgül bir volt düşer, ters yönde bin volta dayanır. Aynı iki nokta, ters işaret, bambaşka bir değer.

Bu yüzden bir gerilim satırını okurken iki soru sor. Bu gerilim hangi iki uç arasında? Hangi işaretle, yani hangi uç daha yüksek? Ardından ikinci bölümdeki gibi koşula da bak: hangi sıcaklıkta, hangi akımda?

Şimdi gerçek bir gerilim kaynağına bakalım: üç virgül üç voltluk bir regülatör. Regülatör, çıkışındaki gerilimi sabit tutan bir entegre devre. Girişine bir telefon şarj cihazından beş volt veriyoruz.

Giriş yeterli mi? Bu regülatörün girişi, en kötü durumda çıkışından en az iki yüz otuz sekiz milivolt yüksek olmalı. İki yüz otuz sekiz milivolt, yani sıfır virgül iki yüz otuz sekiz volt. Üç virgül üç artı sıfır virgül iki yüz otuz sekiz, üç virgül beş yüz otuz sekiz volt. Beş volt bundan büyük, önerilen en büyük giriş olan beş virgül beş voltun da altında. Giriş ile çıkış arasındaki gerilim, beş eksi üç virgül üç, bir virgül yedi volt. Biraz önceki sayının aynısı.

Çıkışa sırayla üç yük bağlayalım. Üç yüz otuz ohm: akım, üç virgül üç volt bölü üç yüz otuz ohm, on miliamper. Altmış altı ohm: üç virgül üç bölü altmış altı, elli miliamper. Otuz üç ohm: üç virgül üç bölü otuz üç, yüz miliamper. Her durumda yükün uçlarında üç virgül üç volt var, değişen yalnızca akım. İdeal gerilim kaynağı tam olarak böyle davranır.

Model ne kadar iyi? Veri sayfasına göre çıkış, akımın her amperi için yaklaşık altmış milivolt değişiyor. On miliamperden yüz miliampere çıkınca fark doksan miliamper. Doksan miliamper, yani sıfır virgül sıfır doksan amper. Sıfır virgül sıfır altmış çarpı sıfır virgül sıfır doksan, sıfır virgül sıfır sıfır elli dört volt, yani beş virgül dört milivolt. Önerilen aralığın tamamında bile değişim, altmış milivolt bölü amper çarpı yaklaşık yarım amper, yaklaşık otuz milivolt. Ama bu aralık beş yüz miliampere kadar. Akım açısından bağlanabilecek en küçük direnç, üç virgül üç volt bölü sıfır virgül beş amper, altı virgül altı ohm. Ama bu kurulumda o kadar akım, regülatörü kapanacak kadar ısıtır. Isınmayı güç konusunda hesaplayacağız; örneğimizde bu yüzden en çok yüz miliamper kullandık.

Peki çıkışa üç virgül üç ohm bağlarsak? İdeal model, üç virgül üç bölü üç virgül üç, bir amper der. Ama bu regülatörün akım sınırı en çok sekiz yüz altmış beş miliamper. Regülatör akımı sınırlar, çıkış üç virgül üç voltta kalamaz. Artık ideal bir kaynak gibi davranmaz.

Çıkışı bir telle kısa devre edersek? Telin uçları arasındaki gerilim sıfır; kısa devrenin garantisi bu. Akımı ise çevre belirler. Burada çevre, regülatörün kendi akım sınırı. Çıkış çok düşünce regülatör akımı kendiliğinden daha da kısar; kısa devrede akım tipik olarak üç yüz elli beş miliampere iner. Regülatör ısınır, aşırı ısınınca kapanır, soğuyunca yeniden açılır.

Tasarımda pahalıya patlayan bir hata da şu: üç virgül üç volt yazan bir kaynağın, ne bağlarsan bağla üç virgül üç volt vereceğini sanmak. Gerçek bir kaynak, ideal davranışını yalnızca veri sayfasındaki akım ve ısınma sınırları içinde korur.
```

Sahne planı:
- Kırmızı başlık "Uygulamada: veri sayfasındaki gerilimler" (altında koyu yeşil küçük "datasheet"). Kendi tablomuz (datasheet tablosu kopyalanmaz), sütunlar koyu yeşil: "Parça" | "Hangi iki uç arasında" | "Değer ve işaret". Satırlar: "2N7002E anahtar" | "Savak (D) ile kaynak ucu (S) arası: akımın geçtiği uçlar" | "V_DSS = 60 V"; "2N7002E anahtar" | "Kapı (G) ile kaynak ucu (S) arası: kontrol ucu" | "V_GS = ±20 V"; "1N4007 diyot" | "İleri yön" | "V_F en çok 1,1 V (1 A, 25 °C)"; "1N4007 diyot" | "Ters yön" | "V_RRM = 1000 V". "kontrol ucuna yirmi dört volt": "V_GS = ±20 V" yanıp söner, kırmızı "Kapı ile S arasına 24 V uygulanırsa kapı bozulabilir (24 V > 20 V)". Kaynak satırı (koyu yeşil, küçük): "Kaynak: onsemi 2N7002E (2023), Vishay 1N4001–1N4007 (2020) datasheet'leri".
- "iki soru sor": tablo silinir; sağ sütunda kırmızı başlık "İki soru": "1. Hangi iki uç arasında?", "2. Hangi işaretle (hangi uç yüksek)?".
- Silme. Kırmızı başlık "Mini tasarım: 3,3 V regülatör". Devre (sağ sütun üst): soldan sağa "5 V" kaynak → kutu "Regülatör" (koyu yeşil küçük "TLV75533P") → yük direnci R; yükün uçlarında "+", "−" ve mavi "3,3 V"; akım oku "i". Koyu yeşil kaynak satırı "Kaynak: TI TLV755P datasheet (SBVS320D, 2024)".
- "Giriş yeterli mi?": sol: "En az giriş = 3,3 V + 0,238 V = 3,538 V", "5 V ≥ 3,538 V ve 5 V ≤ 5,5 V" (mavi), "v_giriş − v_çıkış = 5 − 3,3 = 1,7 V" (mavi, yanıp sönen fon; koyu yeşil "Toprak örneğindeki sayı").
- "üç yük": sol silinir; tablo: "R" | "i = 3,3 V / R": "330 Ω" | "3,3 / 330 = 0,01 A = 10 mA"; "66 Ω" | "3,3 / 66 = 0,05 A = 50 mA"; "33 Ω" | "3,3 / 33 = 0,1 A = 100 mA"; yanında mavi kutu "Gerilim hep 3,3 V, değişen akım".
- "Model ne kadar iyi?": "Δv ≈ 0,060 V/A × (0,100 − 0,010) A = 0,060 × 0,090 = 0,0054 V = 5,4 mV" (mavi), mavi "Tüm aralıkta Δv ≈ 0,060 V/A × (0,5 − 0,0001) A ≈ 0,030 V = 30 mV" (koyu yeşil "0,1 mA ile 500 mA arasında"); "R_en küçük = 3,3 V / 0,5 A = 6,6 Ω"; kırmızı "Bu kurulumda 500 mA'de regülatör aşırı ısınır", koyu yeşil "Isınma: güç konusunda".
- "üç virgül üç ohm": kırmızı "3,3 Ω bağlanırsa i = 3,3 V / 3,3 Ω = 1 A", "Akım sınırı en çok 865 mA (I_CL)", "Çıkış 3,3 V'ta kalamaz".
- "kısa devre": yük yerine kırmızı tel; telin yanında koyu yeşil "v = 0"; mavi "i ≈ 355 mA (tipik, I_SC)", koyu yeşil "Çıkış düşünce akım sınırı daha da kısılır (865 mA'den 355 mA'e)", koyu yeşil "Akımı çevre belirler: regülatörün akım sınırı", "Isınınca kapanır, soğuyunca açılır".
- "pahalıya patlayan": mavi kutu "Gerçek kaynak: akım ve ısınma sınırları içinde ideal". Bütün yazılar y ≤ %76.

## [PARÇA 7] Kapanış, abone çağrısı 2 (~1:10 + 20 sn bitiş ekranı)

```
Toparlayalım. Gerilim, bir birim pozitif yükü bir noktadan diğerine taşımak için gereken enerjidir ve hep iki nokta arasında, işaretiyle yazılır. Bir noktanın gerilimi bir referansa, çoğu zaman toprağa göredir. Açık devre yalnızca akımın, kısa devre yalnızca gerilimin sıfır olduğunu garanti eder; diğer büyüklüğü çevre belirler. İdeal gerilim kaynağı gerilimi sabit tutar, akımı yük belirler. Gerçek bir kaynak bunu yalnızca veri sayfasındaki akım ve ısınma sınırları içinde yapar.

Sana da bir soru bırakayım. Üç virgül üç voltluk bir regülatörün çıkışına yirmi iki ohmluk bir direnç bağlıyoruz. Regülatörün en büyük çıkış akımı beş yüz miliamper. Direncin uçlarındaki gerilim ve içinden geçen akım ne olur? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan ikinci dersi kaçırmazsın.

İkinci dersin ilk bölümünde ideal teli, ideal anahtarı ve gerçek bir pilin neden ideal olmadığını göreceğiz.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥4 sn okunur): kırmızı başlık; maddeler: "- Gerilim iki nokta arasında, işaretiyle (v_ab = W / q)", "- Kısa devre yalnızca v = 0'ı garanti eder", "- İdeal gerilim kaynağı: gerilim sabit, akımı yük belirler". Koyu yeşil ek satırlar: "Bir noktanın gerilimi toprağa göredir", "Gerçek kaynak: veri sayfasındaki sınırlar içinde".
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağda kroki: "3,3 V" regülatör kutusu + "22 Ω"; solda "v = ?, i = ?" (mavi), koyu yeşil "En büyük çıkış akımı 500 mA", "Cevabını yorumlara yaz".
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer.
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başında girer.
- "İkinci dersin ilk bölümünde": kırmızı başlık "Sıradaki: Ders 2 - Bölüm 1/3", maddeler "- İdeal tel", "- İdeal anahtar", "- Gerçek pil". Silme (köşe başlığı da); son 20 sn **bitiş ekranı**: sol üstte "Sıradaki: Ders 2 - Bölüm 1 — İdeal tel, anahtar ve gerçek pil", altında koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş. Ses yok.
