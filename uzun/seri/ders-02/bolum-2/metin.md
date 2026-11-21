# Devre Teorisi I: Ders 2 - Bölüm 2/3 — Bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli

Kaynak: B. Razavi, Basic Circuit Theory, Ders 2 (UCLA) [15:12–31:33]; "Uygulamada" parçası İçerik Ajanı'nın paketi (`icerik.md` bölüm 5; üretici datasheet'leri). Referanstır, çeviri değildir: anlatım ve bütün örnekler özgündür (`../plan.md`, `dogruluk.md`). Razavi'nin örnekleri kullanılmadı: robot kol benzetmesi [20:37–21:08]; 3·v1 ve −5·v1 kaynaklı devre ve i–v1 doğruları [22:56–27:53]; mikrofon işaretini 10 kat büyüten kaynak [28:16–31:27]; "10vx" örneği [20:12–20:30]. Yerine: 360 Ω × i_x (akımla kontrol), anahtarlı −4 × v_x (gerilimle kontrol), 20 mV × 50 = 1 V, INA180 ile şönt seçimi.
**Sürüm 2 (21.11.2026 kredi sprinti)**: yazan oturumun bağımsız denetimi (2 tur: 1. tur 7 önemli + 13 küçük, 2. tur 4 önemli + küçükler; kritik yok) ve **2. bağımsız denetim** (ayrı oturum + doktora düzeyi denetçi; kritik yok, 3 önemli + 13 küçük düzeltildi; bkz. dogruluk.md "2. denetim") sonrası. Panelde `onaylar/metin-2-2`.

**En sık yapılan hata:** "Bağımlı kaynak, baktığı yere (kendisini kontrol eden yere) hiçbir telle bağlı değil; o hâlde iki taraf birbirini etkilemez" (yanlış sonuç: anahtar açılınca da yük akımı 0 kalır). Doğrusu: bağımlı kaynak baktığı yere telle değil **bağıntıyla** bağlıdır; o iki nokta arasındaki gerilimi okur (anahtar açıkken v_x = 3 V, kaynak −4 × 3 = −12 V, yük akımı −6 mA). Gerekçe: Razavi'nin kendi uyarısı [25:19–25:43] (icerik.md bölüm 6). Bölümde tek "En sık yapılan hata" budur; Uygulamadaki şönt hatası "tasarımda pahalıya patlayan hata" diye düz anlatılır.
Az bilinen nokta: akımla kontrol edilen gerilim kaynağının katsayısının birimi ohm'dur ama bu katsayı bir direnç değildir (Parça 3).

Ön bilgi (açıklamaya): Ders 1 (akım, gerilim, referans yönü, açık devre i = 0, kısa devre v = 0); Ders 2 - Bölüm 1 (ideal anahtar, ideal gerilim kaynağı, v–i grafiğinde yatay doğru); Ohm yasası (v = R × i).

Gösterim: gerilim küçük v, akım i, direnç R. Kontrol gerilimi v_x, kontrol akımı i_x, yorum sorusunda v_y; **seste tek harfli simge okunmaz** (yapay seste "v" harfi "ve" bağlacıyla karışır; 1. denetim Ö1–Ö2): seste "kontrol gerilimi", "kontrol akımı", "katsayı", "ortadaki direncin gerilimi". Ekranda simgenin yanında ilk geçişte adı yazılır (ör. "v_x: kontrol gerilimi"). Bağımlı kaynağın değeri v_b (ekranda "v_b", seste "kaynağın değeri"). Katsayılar k (gerilimle kontrol, birimsiz) ve r (akımla kontrol, ohm). Kazanç ekranda "A", seste "kazanç". Çarpma yalnızca "×". Ondalık virgül. Ekranda "·" ve "→" yok. Her gerilimin yanında + ve −, her akımın yanında referans oku. Bağımsız gerilim kaynağı: siyah daire içinde + ve −. **Bağımlı gerilim kaynağı: mavi eşkenar dörtgen içinde + ve −; kontrol büyüklüğü (v_x'in + / − uçları ya da i_x oku) de mavi** (icerik.md 10; Ders 3 - Bölüm 1 paketi aynı renk kuralını kullanıyor). "VCVS/CCVS" kısaltması ne seste ne ekranda; ekranda tam Türkçe ad.

Seslendirme: her parça ayrı üretilir (ElevenLabs, voice_id sLFd2sFq5fDrVDNCuUfI, eleven_v4, generations_count 1); selam ayrı dosya (`ses/selam.mp3`). Metinde rakam, simge, parantez yok. Parça adları (INA180A2, LM358), marka adı, "datasheet" seste yok: "bir akım ölçme kuvvetlendiricisi", "yaygın bir işlemsel kuvvetlendirici", "veri sayfası". "V/mV" seste "volt bölü milivolt", "V/V" "volt bölü volt", "mΩ" "miliohm", "µA" "mikroamper".

Zaman bütçesi (2,6 kelime/sn: Ders 1 ölçümü): `dogrula.py` çıktısı. Intro kartı selamla birlikte; bitiş ekranı alanı (son 20 sn) Parça 7'nin sonunda.

> **Açılış (UZUN.md 6-S, onaylı Blender intro'su):** Parça 1'de giriş sorusundan sonra müzik ~1 sn tek başına → intro (`media/uzun/devre-teorisi-1-intro-gercekci.mp4`) → beyaz tahtaya geçiş → intro kartı baştan yazılır → selam (geçişten ~0,5 sn sonra; müzik konuşmanın ≥ 18 dB altında).

> **Tahta düzeni (UZUN.md 4, Ders 1 motoruyla aynı):** Bütün parçalarda sol üstte kırmızı köşe başlığı **"Ders 2 - Bölüm 2: Bağımsız ve bağımlı kaynaklar"** (Parça 1'de intro kartından sonra; bitiş ekranında silinir). Sahne başlıkları kırmızı, sola hizalı. Listeler "- " ile ve büyük harfle başlar; uzun tire yok; TDK imla. İki sütun (sol x ≈ 120: başlık + maddeler; sağ x ≈ 1000: denklem, grafik, devre). Etiketler ve ara bilgiler koyu yeşil (#1E7B4A); gri yalnızca yardımcı çizgiler. Alt %24'lük bant yalnızca abone kartı ve kapanış için. "kanca" kelimesi ekranda yok. Vurgu (çember, alt çizgi, kutu) bittikten sonra en az 1,0 sn silme yok.

---

## [PARÇA 1] Giriş sorusu, selam, intro kartı (~0:50)

```
Sağdaki devre soldakine hiçbir telle bağlı değil. Soldaki anahtar şu an kapalı. Onu açarsak, sağdaki yükün akımı değişir mi?

Akla ilk gelen cevap hayır olabilir. Arada tel yoksa iki taraf birbirini nasıl etkilesin? Bağımlı kaynaklarla ilgili en sık yapılan hata da tam bu. Cevap evet; akım değişiyor. Ne kadar değiştiğini birazdan adım adım bulacağız.

Bu bölümün sonunda bağımlı bir kaynağın devrenin neresine baktığını bulup değerini hesaplayabileceksin. Sonra gerçek bir kuvvetlendiricinin veri sayfasına bakıp, bir motorun akımını ölçmek için doğru direnci kendin seçeceksin.

[SELAM — intro kartıyla birlikte; ayrı ses dosyası ses/selam.mp3]
Merhaba arkadaşlar, Devre Teorisi Bir serisine hoş geldiniz. Bugün ikinci dersin ikinci bölümünde bağımsız ve bağımlı gerilim kaynaklarını, bir de kuvvetlendirici modelini konuşacağız.
```

Sahne planı:
- 0:00 (ilk kare) sağ sütunda kalem **iki ayrı devre** çizer, aralarında belirgin boşluk; ortak toprak ya da ortak düğüm **yok** (icerik.md 10). Sol devre: siyah daire gerilim kaynağı ("+" üstte, "3 V"), üst kolda "3 kΩ", sağ kolda anahtar (kapalı çizilir); anahtarın iki ucunda mavi "+" (üst uç, dirence bağlı) ve "−", mavi "v_x". Sağ devre: mavi eşkenar dörtgen ("+" üstte), yanında mavi "−4 × v_x"; sağ kolda yük "2 kΩ"; üst kolda **siyah** ok (kaynağın + ucundan dışarı) "i_yük = ?" (yük akımı kontrol büyüklüğü değildir; mavi yalnızca bağımlı kaynak ve kontrol büyüklüğü). Solda kırmızı başlık "Tel yok. Etki de yok mu?".
- "Soldaki anahtar şu an kapalı": koyu yeşil küçük etiket "Kapalı anahtar". "Onu açarsak": anahtar kolu yarı açılıp yeniden kapanır (yalnızca soruyu göstermek için; çözüm Parça 4'te).
- "Akla ilk gelen cevap hayır": sol sütunda kırmızı "Anahtar sağ tarafı etkilemez?"; altında küçük kırmızı "En sık yapılan hata".
- "Cevap evet": "Anahtar sağ tarafı etkilemez?" satırının üstü kırmızıyla çizilir (çizgi bittikten sonra ≥ 1,0 sn silme yok); koyu yeşil "Akım değişir. Ne kadar? Birazdan". Sayı bu parçada yazılmaz.
- "Bu bölümün sonunda": sahne silinir; kırmızı başlık "Bu bölümde", maddeler: "- Bağımsız ve bağımlı kaynak", "- Bağımlı kaynak neye bakar?", "- Kuvvetlendirici modeli ve veri sayfası". Silinir.
- **[KANAL İNTRO'SU — onaylı Blender intro'su, 6-S]**
- **[INTRO KARTI + SELAM]** Ortada: "Devre Teorisi I: Ders 2 - Bölüm 2/3" (siyah, kırmızı alt çizgi), altına "Bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli" (mavi; iki satır olabilir); selam bitince silinir. Ardından köşe başlığı yazılır.

## [PARÇA 2] Bölüm 1'den köprü: bağımsız gerilim kaynağı (~0:55)

```
Birinci bölümde ideal gerilim kaynağını tanımlamıştık: uç gerilimi, içinden geçen akıma bağlı değil. Grafiği yatay bir doğruydu ve akımı bağlanan yük belirliyordu. Bugün bu kaynağa daha tam bir ad veriyoruz: bağımsız gerilim kaynağı.

Neden bağımsız? Çünkü değeri, devredeki başka hiçbir büyüklüğe bağlı değil. Bir pil olabilir, bir işaret üreteci olabilir. Gerilimi sabit de olabilir, zamanla değişen bir işaret de. Hangisi olursa olsun, o gerilimi kaynak kendisi belirler. İdeal modelde devrenin geri kalanında olan hiçbir şey onu etkilemez.

Sembolünü biliyoruz: içinde artı ve eksi olan bir daire. Bugün bunun yanına ikinci bir sembol ekleyeceğiz.
```

Sahne planı:
- Kırmızı başlık "Bağımsız gerilim kaynağı". Sol: koyu yeşil "Bölüm 1: Uç gerilimi akıma bağlı değil; akımı yük belirler". Sağ sütunda Bölüm 1'deki küçük v–i grafiği (yatay eksen "i (A)", dikey eksen "v (V)", mavi yatay doğru, koyu yeşil etiket "İdeal kaynak: yatay doğru"); grafiğin solunda küçük kroki: kaynak, + ucundan dışarı mavi ok "i" (Bölüm 1 ile aynı referans yönü).
- "Neden bağımsız?": grafik silinir; sol: mavi kutu (iki satır): "Bağımsız gerilim kaynağı: değeri devredeki", "başka hiçbir büyüklüğe bağlı değil". Altında: "- Pil ya da işaret üreteci", "- Sabit ya da zamanla değişen", koyu yeşil "İdeal modelde devrenin geri kalanından etkilenmez".
- "Sembolünü biliyoruz": sağ sütunda siyah daire, içinde "+" ve "−"; altında koyu yeşil "Bağımsız: daire". Yanına boş bir yer bırakılır (Parça 3'te eşkenar dörtgen gelir).

## [PARÇA 3] Bağımlı gerilim kaynağı, abone çağrısı 1, üç adım ve birinci örnek (~3:35)

```
Bağımlı gerilim kaynağı, değeri devrenin başka bir yerindeki bir büyüklüğe bağlı olan kaynaktır. Bu büyüklük bir gerilim olabilir, bir akım da olabilir. Kaynak, kendi uçlarına ne bağlandığına bakmaz; devrenin başka bir yerine bakar ve oradaki değere göre gerilim üretir.

İki kaynak birbirine karışmasın diye bağımlı kaynağa ayrı bir sembol veriyoruz: bir eşkenar dörtgen. İçinde yine artı ve eksi var, yanında da değerini veren bağıntı yazılı. Şemada bir eşkenar dörtgen gördüğün anda şunu bilirsin: bu kaynağın değeri başka bir yere bağlı.

En basit bağımlılık doğrusal olanı. Devrenin bir yerinde iki nokta seçelim. Aralarındaki gerilime kontrol gerilimi diyelim. Kaynak bu gerilimi okur ve onun belli bir katını üretir: kaynağın değeri, bir katsayı çarpı kontrol gerilimi. Bu kaynağın tam adı, gerilimle kontrol edilen gerilim kaynağı. Burada katsayının birimi yok, çünkü volt bölü volt. Bu katsayı birden büyük de olabilir, küçük de. Birazdan göreceğimiz gibi eksi de olabilir; o zaman işaret ters döner.

Kaynak bir akıma da bakabilir. Devrenin bir kolundaki akıma kontrol akımı diyelim. Kaynağın değeri, bir katsayı çarpı kontrol akımı olsun. Bunun adı, akımla kontrol edilen gerilim kaynağı. Burada katsayının birimi volt bölü amper, yani ohm. Ama dikkat: bu katsayı bir direnç değil. Direnç, kendi akımını kendi gerilimine bağlar. Bu katsayı ise başka bir kolun akımını bu kaynağın gerilimine bağlar. Bir de şu var: bağımlılık doğrusal olmak zorunda değil. Örneğin kontrol geriliminin karesiyle orantılı bir kaynak da olabilir; bu derste onu yalnızca adıyla anıyoruz.

Bu serinin devamı için kanala abone olabilirsin.

Peki bağımlı bir kaynak gördüğümüzde ne yapacağız? Bu bölümdeki bütün devrelerde kontrol tarafı, bağımlı kaynaktan etkilenmiyor. O zaman üç adım yeter. Birinci adım, kontrol büyüklüğünü bul. İkinci adım, kaynağın değerini hesapla. Üçüncü adım, kaynağın bağlı olduğu tarafı çöz.

Bir örnekle görelim. Solda beş voltluk bağımsız bir kaynak ve bir kiloohmluk bir direnç tek bir halka oluşturuyor. Kaynağın artı ucundan çıkıp dirençten geçen akım, bizim kontrol akımımız. Sağda, değeri üç yüz altmış ohm çarpı kontrol akımı olan, akımla kontrol edilen bir gerilim kaynağı var; artı ucu üstte. Uçlarına dokuz yüz ohmluk bir yük bağlı.

Birinci adım: kontrol akımı, beş volt bölü bin ohm. Bu, sıfır virgül sıfır sıfır beş amper, yani beş miliamper. İkinci adım. Kaynağın değeri, üç yüz altmış ohm çarpı beş miliamper. Üç yüz altmış çarpı sıfır virgül sıfır sıfır beş, bir virgül sekiz. Ohm çarpı amper volt eder; yani bir virgül sekiz volt. Üçüncü adım. Yük doğrudan kaynağın uçlarına bağlı, o hâlde yükün uçlarında da bir virgül sekiz volt var. Yükün akımı, bir virgül sekiz volt bölü dokuz yüz ohm: sıfır virgül sıfır sıfır iki amper, yani iki miliamper.

Bir not düşelim. Kontrol büyüklüğü bağımlı kaynağın kendisinden de etkileniyorsa, bu üç adım yetmez; denklemleri birlikte çözmemiz gerekir. Bunu ileride göreceğiz; en önemli örneği işlemsel kuvvetlendirici.
```

Sahne planı:
- Silme (köşe başlığı kalır). Kırmızı başlık "Bağımlı gerilim kaynağı". Sol: mavi kutu (iki satır): "Bağımlı gerilim kaynağı: değeri devrenin başka", "bir yerindeki bir gerilime ya da akıma bağlı". Koyu yeşil "Kendi uçlarına değil, başka bir yere bakar".
- "ayrı bir sembol": sağ sütunda Parça 2'nin siyah dairesi yeniden çizilir; yanına **mavi eşkenar dörtgen** (içinde "+" üstte, "−" altta); altlarında koyu yeşil "Bağımsız: daire" | "Bağımlı: eşkenar dörtgen". Eşkenar dörtgenin yanında mavi "v_b = ?".
- "En basit bağımlılık": sağ sütunda küçük temsilî şekil: solda bir kutu "Devrenin bir kısmı", içinde iki nokta, aralarında mavi "+ v_x −" ve koyu yeşil "v_x: kontrol gerilimi"; sağda mavi eşkenar dörtgen, yanında mavi "k × v_x" (ikisi arasında tel yok). Sol: kırmızı alt başlık "Gerilimle kontrol edilen gerilim kaynağı", mavi "v_b = k × v_x", koyu yeşil "k: katsayı, birimsiz (V/V)", "- k birden büyük ya da küçük olabilir", "- k negatif olabilir: işaret ters döner". (Ekranda kelime yerine "<, >" yok.)
- "Kaynak bir akıma da bakabilir": temsilî şekilde kutunun içinde bir kol, üzerinde mavi ok "i_x" ve koyu yeşil "i_x: kontrol akımı"; eşkenar dörtgenin yanı "r × i_x". Sol: kırmızı alt başlık "Akımla kontrol edilen gerilim kaynağı", mavi "v_b = r × i_x", koyu yeşil "r: katsayı, birimi V/A = Ω". Kırmızı çerçeve (küçük) "r bir direnç değil"; altında iki satır: "Direnç: kendi akımı ve kendi gerilimi (v = R × i)", "r: başka bir kolun akımı ve bu kaynağın gerilimi".
- "doğrusal olmak zorunda değil": koyu yeşil "Doğrusal olmayan da olabilir (örneğin k × v_x²): bu derste yalnızca adı".
- "abone olabilirsin": **abone kartı 1** bu cümlenin başladığı anda alt banttan girer; kalem "r bir direnç değil" çerçevesinin altını çizer (vurgu bitişi ile silme arası ≥ 1,0 sn). Bütün yazılar y ≤ %76. Kart kapanır kapanmaz (≤ 0,5 sn) ses devam eder.
- Kart kapanınca silme (köşe başlığı kalır). Kırmızı başlık "Üç adım". Sol: "1. Kontrol büyüklüğünü bul (v_x ya da i_x)", "2. Kaynağın değerini hesapla", "3. Kaynağın bağlı olduğu tarafı çöz"; koyu yeşil "Kontrol tarafı bağımlı kaynaktan etkilenmiyorsa".
- "Bir örnekle görelim": sağ sütunda iki ayrı halka (aralarında tel yok). Sol halka: siyah daire "5 V" (+ üstte), üst kolda "1 kΩ", üst kolda mavi ok "i_x" (kaynağın + ucundan çıkan yönde). Sağ halka: mavi eşkenar dörtgen (+ üstte), yanında mavi "360 Ω × i_x"; sağ kolda "900 Ω", yükün yanında "+" üstte, "−" altta; üst kolda siyah ok "i_yük" (kaynağın + ucundan dışarı). Kırmızı alt başlık "Örnek 1".
- "Birinci adım": sol sütun (üç adım listesinin altına, gerekirse liste silinip): "1. i_x = 5 V / 1000 Ω = 0,005 A = 5 mA" (mavi; yanıp sönen fon; bittikten sonra ≥ 1,0 sn silme yok).
- "İkinci adım": "2. v_b = 360 Ω × 5 mA = 360 × 0,005 = 1,8 V" (mavi); koyu yeşil "Ω × A = V".
- "Üçüncü adım": "3. 900 Ω'un uçlarında 1,8 V", "i_yük = 1,8 V / 900 Ω = 0,002 A = 2 mA" (mavi kutu). Kutu bittikten sonra ≥ 1,0 sn görünür.
- "Bir not düşelim": koyu yeşil "Kontrol büyüklüğü kaynağın kendisinden de etkileniyorsa: denklemler birlikte çözülür (ileride; en önemli örneği işlemsel kuvvetlendirici)".

## [PARÇA 4] Dersin başındaki devre ve en sık yapılan hata (~3:05)

```
Şimdi dersin başındaki devreye dönelim. Solda üç voltluk bağımsız bir kaynak, üç kiloohmluk bir direnç ve ideal bir anahtar tek bir halka oluşturuyor. Kontrol gerilimi, anahtarın uçları arasındaki gerilim; artı ucu, anahtarın dirence bağlı ucu. Sağda, değeri eksi dört çarpı kontrol gerilimi olan, gerilimle kontrol edilen bir gerilim kaynağı var; artı ucu üstte. Uçlarına iki kiloohmluk bir yük bağlı. Yük akımının oku, kaynağın artı ucundan dışarı çıkıyor. İki taraf arasında hiçbir tel yok, ortak bir nokta bile yok.

Önce anahtar kapalı. Kapalı anahtar bir kısa devredir; uçları arasındaki gerilim sıfır. Yani kontrol gerilimi sıfır volt. Sol tarafta akım var: üç volt bölü üç kiloohm, bir miliamper. Ama bu kaynak akıma bakmıyor, gerilime bakıyor. Kaynağın değeri, eksi dört çarpı sıfır, sıfır volt. Yükün akımı da sıfır.

Şimdi anahtarı açalım. Açık anahtar bir açık devredir; akım sıfır. Direncin uçlarındaki gerilim, üç bin ohm çarpı sıfır, sıfır volt. Direnç gerilim almayınca, kaynağın üç voltunun tamamı anahtarın uçlarında görünür. Bunu birinci bölümde de görmüştük. Yani kontrol gerilimi artık üç volt. Kaynağın değeri, eksi dört çarpı üç volt, eksi on iki volt. Yükün akımı, eksi on iki volt bölü iki bin ohm: eksi sıfır virgül sıfır sıfır altı amper, yani eksi altı miliamper. Eksi işareti şunu söylüyor: akım okun tersine, altı miliamper.

Fark ettin mi? Sol tarafta akım varken bağımlı kaynağın değeri sıfırdı. Sol taraftaki akım sıfır olunca eksi on iki volt oldu. Belirleyen, sol taraftaki akım değil, kontrol gerilimi.

İşte en sık yapılan hata burada yapılıyor: bağımlı kaynak, baktığı yere hiçbir telle bağlı değil, o hâlde iki taraf birbirini etkilemez demek. Bu hatayla düşünen biri, anahtar açılınca da yük akımının sıfır kalacağını söyler.

Doğrusu şu. Bağımlı kaynak baktığı yere telle değil, bağıntıyla bağlıdır. O iki nokta arasındaki gerilimi okur ve değerini ondan hesaplar. Oraya başka bir şey bağlı olup olmaması da, iki taraf arasında tel olmaması da bunu değiştirmez. Üstelik ideal bir kaynak bu gerilimi okurken kontrol uçlarından akım çekmez; sol taraf, sağ taraftan etkilenmez. Bu devrede etki tek yönlü: soldan sağa. Anahtarı açmak, yükün akımını sıfırdan eksi altı miliampere getirdi.
```

Sahne planı:
- Silme. Kırmızı başlık "Dersin girişindeki devre" (kanal sahibinin dil kuralı; "kanca" yok). Sağ sütunda Parça 1'deki iki devre aynen yeniden çizilir (ortak toprak ya da ortak düğüm yok): sol halka siyah "3 V" (+ üstte), üst kolda "3 kΩ", sağ kolda anahtar, anahtarın uçlarında mavi "+" (üst, dirence bağlı uç) "v_x" "−"; sağ halka mavi eşkenar dörtgen (+ üstte) mavi "−4 × v_x", sağ kolda "2 kΩ" (+ üstte), üst kolda siyah ok "i_yük" (kaynağın + ucundan dışarı). Anahtarın yanında koyu yeşil küçük etiket (Bölüm 1 ile aynı biçim): "Kapalı anahtar: kontak birleşik, iletir".
- "İki taraf arasında hiçbir tel yok": iki devrenin arasındaki boşluğa koyu yeşil "Tel yok, ortak nokta yok".
- "Önce anahtar kapalı": sol sütun, koyu yeşil alt başlık "Anahtar kapalı": "v_x = 0 V (kısa devre)", "Sol halkanın akımı: 3 V / 3 kΩ = 1 mA", koyu yeşil "Kaynak akıma değil, v_x'e bakar", "v_b = −4 × 0 = 0 V", "i_yük = 0" (mavi).
- "Şimdi anahtarı açalım": anahtar kolu açılır; etiket "Açık anahtar: kontak ayrık, akım yok" olur. Sol sütunun "Anahtar kapalı" satırları kalır (yukarıda); altına koyu yeşil alt başlık "Anahtar açık": "Sol halkanın akımı = 0 (açık devre)", "v_R = 3000 Ω × 0 = 0 V" (3 kΩ'un uçlarında + solda, − sağda, "v_R"), "v_x = 3 V − v_R = 3 − 0 = 3 V", koyu yeşil "Bölüm 1'deki örnekteki gibi"; mavi "v_b = −4 × 3 V = −12 V", "i_yük = −12 V / 2000 Ω = −0,006 A = −6 mA" (yanıp sönen fon; bittikten sonra ≥ 1,0 sn silme yok); koyu yeşil "Okun tersine 6 mA". Sağ devrede üst kolda, referans okunun tersine (sağdan sola, yükten kaynağın + ucuna doğru) kırmızı küçük ok "6 mA (gerçek yön)".
- "Fark ettin mi?": sol iki satır yan yana vurgulanır: "Kapalı: sol akım 1 mA, kaynak 0 V" | "Açık: sol akım 0, kaynak −12 V"; mavi kutu "Belirleyen: kontrol gerilimi v_x". Kutu bittikten sonra ≥ 1,0 sn.
- Silme (devre kalır, sağ sütunda). "En sık yapılan hata": sol sütunda kırmızı çerçeve "En sık yapılan hata: İki taraf arasında tel yok, anahtar sağ tarafı etkilemez", içinde kırmızı "Anahtar açılınca da yük akımı 0 kalır (yanlış)" (çerçeve bittikten sonra ≥ 1,0 sn silme yok; iş emri N'deki ihlal türü).
- "Doğrusu": koyu yeşil "Doğrusu: Bağımlı kaynak gerilimi okur (bağıntıyla bağlı)", altında iki satır alt alta (mavi): "Kapalı: v_x = 0 V, kaynak −4 × 0 = 0 V, akım 0", "Açık: v_x = 3 V, kaynak −4 × 3 = −12 V, akım −12 V / 2 kΩ = −6 mA". Koyu yeşil "İdeal kaynak kontrol uçlarından akım çekmez". İki devrenin arasındaki boşluğa yalnızca koyu yeşil yazı: "Bu devrede etki tek yönlü: soldan sağa" (devreler arasına hiçbir çizgi ya da ok çekilmez; öğrenci tel sanmasın, 7a-7).

## [PARÇA 5] Kuvvetlendirici: ölçeklenmiş kopya (~1:20)

```
Peki böyle bir kaynağı gidip satın alabilir miyiz? Hayır; bağımlı gerilim kaynağı tek bir parça olarak satılmaz. Ama kuvvetlendiricileri çözümlerken onu bir model olarak sürekli kullanırız.

Kuvvetlendirici, bir işaretin şeklini koruyup ölçeklenmiş bir kopyasını üreten devredir. Bu işaret bir ses olabilir, bir sensörün gerilimi olabilir, bir görüntü işareti olabilir. Kuvvetlendiricinin içi transistörlerle dolu karmaşık bir devre olabilir. Ama en basit modelde onu tek bir bağımlı kaynakla temsil ederiz: gerilimle kontrol edilen bir gerilim kaynağı. Çıkış gerilimi, kazanç çarpı giriş gerilimi. Kazancın birimi yok.

Bir örnek verelim. Giriş, tepe değeri yirmi milivolt olan bir işaret olsun, kazanç da elli. Çıkışın tepe değeri, elli çarpı yirmi milivolt: bin milivolt, yani bir volt. Giriş yükselirken çıkış da yükselir, giriş düşerken çıkış da düşer. Şekil aynı; yalnızca elli kat büyük.

Ama burada bir soru var. İdeal bağımlı kaynak her değeri üretebilir. Giriş bir volt olsa, model elli volt der. Gerçek bir kuvvetlendirici bunu yapabilir mi? Şimdi gerçek parçalara bakalım.
```

Sahne planı:
- Silme. Kırmızı başlık "Kuvvetlendirici". Sol: koyu yeşil "Bağımlı kaynak tek parça olarak satılmaz", "Kuvvetlendiricinin modelidir".
- "Kuvvetlendirici, bir işaretin": mavi kutu (iki satır) "Kuvvetlendirici: işaretin şeklini koruyup", "ölçeklenmiş kopyasını üretir". "- Ses, sensör gerilimi, görüntü işareti".
- "tek bir bağımlı kaynakla temsil": sağ sütunda kesikli bir kutu (koyu yeşil "Kuvvetlendirici"); kutunun içinde koyu yeşil küçük "İçi: transistörlerle dolu bir devre" yazısı silinir, yerine iki giriş ucu ("+ v_giriş −", mavi) ve çıkışta mavi eşkenar dörtgen (+ üstte) "A × v_giriş", uçlarında "+ v_çıkış −". Sol: mavi "v_çıkış = A × v_giriş", koyu yeşil "A: kazanç, birimsiz (V/V)".
- "Bir örnek verelim": sol: mavi "Giriş tepe değeri 20 mV, A = 50", "Çıkış tepe değeri: 50 × 20 mV = 1000 mV = 1 V" (yanıp sönen fon; bittikten sonra ≥ 1,0 sn silme yok). Sağ sütunun altında (y ≤ %76) **aynı zaman eksenini paylaşan iki küçük grafik alt alta** (2. denetim Ö2: tek eksende 20 mV görünmüyordu): üstte "Giriş", dikey eksen "v_giriş (mV)" −25 … 25, işaretler −20; 20; mavi dalga (tepe 20 mV); altta "Çıkış", dikey eksen "v_çıkış (V)" −1,2 … 1,2, işaretler −1; 1; kırmızı aynı biçimli dalga (tepe 1 V); ortak yatay eksen "t". İki dalga aynı yükseklikte görünür. Koyu yeşil "Eksen ölçekleri farklı: 20 mV ve 1 V", "Aynı şekil, 50 kat büyük". (Dalgalar formülden: v_çıkış(t) = 50 × v_giriş(t); assert tepe oranı 50.)
- "Giriş bir volt olsa": kırmızı "v_giriş = 1 V ise model: 50 × 1 V = 50 V?"; koyu yeşil "Gerçek kuvvetlendirici bunu yapabilir mi?".

## [PARÇA 6] Uygulamada: gerçek bir kuvvetlendirici bağımlı kaynağın hangi sözünü tutar? (~3:45)

```
İdeal bağımlı kaynak bize üç söz veriyor. Birincisi, çıkış tam olarak katsayı çarpı kontrol büyüklüğü. İkincisi, bu her değerde geçerli. Üçüncüsü, kontrol tarafını etkilemiyor; gerilime bakıyorsa oradan akım çekmiyor. Veri sayfasında bu üç sözün sınırını okuruz.

Önce bir akım ölçme kuvvetlendiricisi. Akımın yoluna şönt denen çok küçük bir direnç konur; parça bu şöntün gerilimini okuyup kazancıyla çarpar. Seçtiğimiz sürümde kazanç elli volt bölü volt. Yani gerilimle kontrol edilen bir gerilim kaynağı gibi davranıyor. Veri sayfasına göre kazancın hatası en çok yüzde bir; birinci söz bu kadar tutuluyor. Ama bu yüzde birlik sınır yalnızca çıkış, sıfır virgül beş volt ile besleme eksi sıfır virgül beş volt arasındayken garanti. Çıkış beslemeyi hiç geçemez; en kötü durumda bile beslemenin otuz milivolt altına kadar çıkabilir. İkinci söz yalnızca bir aralıkta tutuluyor. Şönt toprak tarafındayken giriş akımı yalnızca yaklaşık sıfır virgül bir mikroamper; ölçtüğümüz amperlerin yanında ihmal edilir. Üçüncü söz neredeyse tutuluyor. Çıkışından geçebilecek akımın da bir sınırı var.

Sonra yaygın bir işlemsel kuvvetlendirici. Bunun iki girişi var; kazanç, bu iki girişin gerilim farkıyla çarpılır. Veri sayfası kazancı on beş voltluk beslemede, volt bölü milivolt cinsinden veriyor: tipik olarak yüz volt bölü milivolt. Bir volt bölü milivolt, bin volt bölü volt eder. O hâlde yüz volt bölü milivolt, yüz çarpı bin, yüz bin. On voltluk bir çıkış için model yalnızca on bölü yüz bin, sıfır virgül bir milivoltluk bir giriş farkı ister. Bir milivolt girersek model, yüz bin çarpı bir milivolt, yüz volt der. On beş voltluk beslemede bu imkânsız; çıkış gidebildiği sınıra yapışır. Buna doyma denir. Üstelik yüz bin yalnızca tipik bir değer; bu yüzden onu dirençlerle birlikte kullanırız.

Küçük bir tasarım yapalım. Üç virgül üç voltla beslenen bir kartta, bir motorun sıfır ile iki amper arasındaki akımını bu kuvvetlendiriciyle ölçeceğiz. Şönt, motorun toprak tarafında; direnci ne olmalı? Modelimiz şu: şöntün gerilimi, şönt direnci çarpı akım; çıkış, elli çarpı şöntün gerilimi.

İlk deneme elli miliohm olsun. İki amperde şöntün gerilimi, iki çarpı sıfır virgül sıfır beş, sıfır virgül bir volt. Model, elli çarpı sıfır virgül bir, beş volt der. Ama çıkış en kötü durumda üç virgül üç eksi sıfır virgül sıfır üç, yani üç virgül yirmi yedi volta kadar çıkabilir. Beş volt, beslemenin kendisinden bile büyük; model bu akımda geçersiz. Çıkış hangi akımda tavana takılır? Elli çarpı sıfır virgül sıfır beş ohm, iki virgül beş ohm eder; yani her amper için çıkış iki virgül beş volt artar. Üç virgül yirmi yedi volt bölü iki virgül beş ohm, yaklaşık bir virgül üç amper. Bunun üstündeki bütün akımlar aynı okunur; bu okumaya güvenen bir koruma devresi aşırı akımı fark etmez. Tasarımda pahalıya patlayan hata budur.

Doğru seçim için, yüzde birlik garantinin geçerli olduğu en yüksek çıkışı kullanalım: üç virgül üç eksi sıfır virgül beş, iki virgül sekiz volt. Elli çarpı şönt direnci çarpı iki amper, iki virgül sekiz volttan büyük olmamalı. Elli çarpı iki, yüz eder. Şönt direnci en çok iki virgül sekiz bölü yüz, sıfır virgül sıfır yirmi sekiz ohm, yani yirmi sekiz miliohm. Aşağı yuvarlayıp yaygın bir değer seçelim: yirmi beş miliohm. Kontrol edelim: elli çarpı sıfır virgül sıfır yirmi beş ohm, bir virgül yirmi beş ohm; yani her amper için çıkış bir virgül yirmi beş volt artar. İki amperde, bir virgül yirmi beş çarpı iki, iki virgül beş volt. Sınırın altında. Alt uçta çıkış hangi akımda sıfır virgül beş volta iner? Sıfır virgül beş bölü bir virgül yirmi beş, sıfır virgül dört amper. Yüzde birlik kazanç hatası garantisi, sıfır virgül dört ile iki amper arasında geçerli. Daha küçük akımlarda bu garanti yok. Ölçümün toplam hatası ayrıca şöntün kendi toleransına da bağlı. Mikrodenetleyici bir volt okursa akım, bir bölü bir virgül yirmi beş, sıfır virgül sekiz amper.

Kural şu: önce bağımlı kaynak modeliyle hesapla. Sonra en büyük ve en küçük girişte çıkışı veri sayfasının sınırıyla karşılaştır. Üst sınırı aşıyorsa şöntü ya da kazancı küçült; ama garantinin başladığı en küçük akımın da büyüyeceğini unutma.
```

Sahne planı:
- Silme. Kırmızı başlık "Uygulamada: kuvvetlendirici hangi sözü tutar?" (altında koyu yeşil küçük "Veri sayfası"). Sol: üç madde: "- Söz 1: Çıkış = katsayı × kontrol büyüklüğü", "- Söz 2: Her değerde geçerli", "- Söz 3: Kontrol tarafını etkilemez (gerilimi okurken akım çekmez)".
- Kendi tablomuz (veri sayfası tablosu kopyalanmaz), sağ sütun ve alt; koyu yeşil başlıklar: "Söz" | "İdeal bağımlı kaynak" | "Akım ölçme kuvvetlendiricisi". İdeal sütunu: "Tam", "Her değerde", "Akım çekmez". Satırlar sesle birlikte dolar:
  - "Akım ölçme kuvvetlendiricisi": sağ üstte küçük şema: motor yolunda şönt (toprak tarafında), şöntün uçları "+ v_şönt −" mavi, kuvvetlendirici kutusu (mavi eşkenar dörtgen "50 × v_şönt"); koyu yeşil "Şönt: akımı ölçmek için yola konan çok küçük direnç". Tablo sütunu: Söz 1 "50 V/V, kazanç hatası en çok %1"; Söz 2 "%1 garantisi: çıkış 0,5 V ile V_S − 0,5 V arası; V_S'yi geçemez (en kötü durumda V_S − 0,03 V'a kadar; 30 mV = 0,03 V)" ve tablonun altında koyu yeşil "V_S: besleme gerilimi"; Söz 3 "Giriş akımı yaklaşık 0,1 µA (şönt toprak tarafında)". Koyu yeşil satır altı "Çıkış akımının da sınırı var".
  - "işlemsel kuvvetlendirici": sol: mavi "1 V/mV = 1000 V/V", "100 V/mV = 100 × 1000 = 100 000 V/V", "10 V için: 10 V / 100 000 = 0,0001 V = 0,1 mV", "1 mV için model: 100 000 × 1 mV = 100 V", kırmızı "15 V beslemede imkânsız: çıkış sınıra yapışır (doyma)". Tablo silinir; işlemsel kuvvetlendirici tabloya konmaz (yalnızca seste söylenenler ekranda). Sağ sütun: üçgen kuvvetlendirici sembolü, iki girişi "+" ve "−" (mavi "v_+", "v_−"; alt simge motorla küçültülür), çıkışı "v_çıkış"; altında mavi "v_çıkış = A × (v_+ − v_−)", koyu yeşil "A: kazanç; iki girişin gerilim farkıyla çarpılır"; koyu yeşil "Yaygın bir işlemsel kuvvetlendirici", mavi "Kazanç: tipik 100 V/mV (15 V beslemede)", koyu yeşil "Yalnızca tipik bir değer". Koyu yeşil "Bu hâliyle kullanılmaz; dirençlerle kurulur (ileride)". **Not (2. denetim için):** "en az 25 V/mV / 4 kat" değeri bu metinde **kullanılmadı** (icerik.md 10: PDF tablosunda gözle teyit edilemedi; bkz. dogruluk.md).
  - Kaynak satırı (koyu yeşil, küçük): "Kaynak: TI INA180 veri sayfası (SBOS741H, 2022), TI LM358 veri sayfası (SLOS068AB, 2024)". (Parça adları yalnızca burada, ekranda.)
- Silme. Kırmızı başlık "Mini tasarım". Sağ sütun üst: 3,3 V besleme, motor, motorun toprak tarafında şönt "R_şönt", akım oku "i (0 ile 2 A)" siyah (şöntün içinden toprağa doğru; kontrol büyüklüğü v_şönt'tür); şöntün uçları mavi "+ v_şönt −" ("+" motor tarafında, üstte; "−" toprak tarafında); kuvvetlendirici (mavi eşkenar dörtgen "50 × v_şönt"), çıkışı "v_çıkış" "Mikrodenetleyiciye". Sol: mavi "v_şönt = R_şönt × i", "v_çıkış = 50 × v_şönt = 50 × R_şönt × i".
- "İlk deneme": koyu yeşil alt başlık "(a) R_şönt = 50 mΩ = 0,05 Ω": "v_şönt = 2 A × 0,05 Ω = 0,1 V", "Model: v_çıkış = 50 × 0,1 V = 5 V", "Gerçek çıkış en kötü durumda: 3,3 − 0,03 = 3,27 V'a kadar", kırmızı "Model geçersiz: 5 V beslemeden büyük (5 V > 3,3 V)"; "50 × 0,05 Ω = 2,5 Ω (her 1 A için 2,5 V)", "Tavana takılma: i = 3,27 V / 2,5 Ω ≈ 1,3 A" (mavi); kırmızı "Bunun üstünde bütün akımlar aynı okunur"; kırmızı "Pahalıya patlayan hata: aşırı akım fark edilmez".
- Silme (devre kalır). "Doğru seçim": koyu yeşil alt başlık "(b) %1 garantisinin üst sınırı: 3,3 − 0,5 = 2,8 V": "50 × R_şönt × 2 A ≤ 2,8 V", "50 × 2 = 100", "R_şönt ≤ 2,8 / 100 = 0,028 Ω = 28 mΩ", "Seçim: 25 mΩ" (mavi kutu; kutu bittikten sonra ≥ 1,0 sn); "Kontrol: 50 × 0,025 Ω = 1,25 Ω (her 1 A için 1,25 V)", "1,25 Ω × 2 A = 2,5 V ≤ 2,8 V" (mavi), koyu yeşil "Model geçerli"; "Alt uç: 0,5 V / 1,25 Ω = 0,4 A", koyu yeşil "Kazanç hatası en çok %1: 0,4 A ile 2 A arası (daha küçük akımda garanti yok)", "Toplam hata şöntün toleransına da bağlı"; "1 V okunursa: 1 V / 1,25 Ω = 0,8 A".
- Sağ sütunun altında (y ≤ %76) grafik (formülden; icerik.md 10): yatay eksen "i (A)" 0 … 2 (işaretler 0,4; 1; 1,3; 2), dikey eksen "v_çıkış (V)" 0 … 5,5 (işaretler 1; 2; 3; 5); 50 mΩ modeli gri kesikli (0 … 5 V); gerçek çıkış kırmızı (≈ 1,3 A'e kadar 50 mΩ doğrusunun üstünde, sonra en kötü durum 3,27 V'ta yatay; etiket "Tavan: en kötü 3,27 V", besleme etiketiyle çakışmaz); 25 mΩ doğrusu mavi (0 … 2,5 V). Yatay ince kesikli çizgiler, farklı renk ve etiket: "Besleme 3,3 V" (siyah kesikli), "%1 garantisi üst sınırı 2,8 V" ve "Alt sınır 0,5 V" (koyu yeşil kesikli). Kesikli çizgiler yalnızca grafik çizgisidir, devre teli değil (eksenler ve başlık "Çıkış ve akım" görünür; 7a-7).
- "Kural şu": mavi kutu (üç satır): "1. Bağımlı kaynak modeliyle hesapla", "2. En büyük ve en küçük girişte çıkışı sınırla karşılaştır", "3. Üst sınırı aşıyorsa şöntü ya da kazancı küçült (garantinin başladığı en küçük akım büyür)" (kutu bittikten sonra ≥ 1,0 sn silme yok). Bütün yazılar y ≤ %76.

## [PARÇA 7] Kapanış, yorum sorusu, abone çağrısı 2 (~1:30 + 20 sn bitiş ekranı)

```
Toparlayalım. Bağımsız gerilim kaynağının değeri başka hiçbir büyüklüğe bağlı değil. Bağımlı gerilim kaynağı ise devrenin başka bir yerindeki bir gerilime ya da akıma bakar; sembolü eşkenar dörtgen. Çözerken önce kontrol büyüklüğünü buluruz, sonra kaynağın değerini, sonra kalan tarafı. Kuvvetlendiriciyi bağımlı bir kaynakla modelleriz; ama gerçek bir kuvvetlendirici çıkış sınırını aşamaz.

Sana da bir soru bırakayım. Solda dört voltluk bir kaynak ve bir virgül altı kiloohmluk bir direnç tek bir halka oluşturuyor; kontrol akımı, kaynağın artı ucundan çıkıp dirençten geçen akım. Ortada, değeri üç yüz yirmi ohm çarpı bu kontrol akımı olan, akımla kontrol edilen bir gerilim kaynağı var; artı ucu üstte. Uçlarına iki kiloohmluk bir direnç bağlı; bu direncin gerilimini, artı ucu üstte olacak şekilde ölçüyoruz. Sağda, gerilimle kontrol edilen bir gerilim kaynağı var. Bu kaynağın değeri, eksi katsayı çarpı ortadaki direncin gerilimi; artı ucu üstte ve bir kiloohmluk bir yükü sürüyor. Yük akımının oku, bu kaynağın artı ucundan dışarı çıkıyor. Bu son kaynak aslında gerçek bir kuvvetlendirici: çıkış gerilimi yalnızca eksi beş volt ile artı beş volt arasında olabilir ve çıkışından iki yönde de en çok üç miliamper akım geçebilir. Birinci soru: katsayı dört virgül beş iken model yük akımı için ne der, model bu durumda geçerli mi? İkinci soru: model geçerli kalsın diye katsayı en çok kaç olabilir? Cevabını yorumlara yaz.

Bu ders işine yaradıysa videoyu beğenip sınıf arkadaşlarınla paylaşır mısın? Kanala abone olursan üçüncü bölümü kaçırmazsın.

Üçüncü bölümde akım kaynağını göreceğiz: akımını kendisi belirleyen, gerilimini ise bağlandığı devreye bırakan kaynak.
```

Sahne planı:
- **"Bilmen gerekenler" kartı** (≥ 4 sn okunur): kırmızı başlık; üç madde: "- Bağımlı kaynak: değeri başka bir büyüklüğe bağlı", "- Önce kontrol büyüklüğünü bul", "- Gerçek kuvvetlendirici: çıkış sınırını aşamaz". (Dördüncü madde "İdeal gerilimle kontrol edilen kaynak kontrol uçlarından akım çekmez" yalnızca açıklamada.)
- "Sana da bir soru": kart silinir; kırmızı başlık "Sana bir soru"; sağ sütunda üç halka yan yana, aralarında tel yok (ortak toprak çizilmez): (1) siyah "4 V" (+ üstte), "1,6 kΩ", mavi ok "i_x" (kaynağın + ucundan çıkan; koyu yeşil "kontrol akımı"); (2) mavi eşkenar dörtgen (+ üstte) "320 Ω × i_x", uçlarında "2 kΩ", "+ v_y −" (mavi, + üstte; koyu yeşil "ortadaki direncin gerilimi"); (3) mavi eşkenar dörtgen (+ üstte) "−k × v_y" (koyu yeşil "k: katsayı"), yük "1 kΩ", siyah ok "i_yük" (+ ucundan dışarı). Sol, satırlar alt alta (icerik.md 8 tahta hâli; kelime yerine işaret yok): "Kuvvetlendirici sınırları:", "- Çıkış −5 V ile +5 V arasında", "- Çıkış akımı iki yönde de en çok 3 mA", "(a) k = 4,5 için i_yük? Model geçerli mi?", "(b) k en çok kaç?", koyu yeşil "Cevabını yorumlara yaz". (Cevap verilmez; soru bankasına yazılır, UZUN.md "Soru bankası".)
- "beğenip paylaşır mısın": kalem sorunun altını mavi çizer (çizgi bittikten sonra ≥ 1,0 sn silme yok).
- "Kanala abone olursan": **abone kartı 2** bu cümlenin başında girer.
- "Üçüncü bölümde": kırmızı başlık "Sıradaki: Ders 2 - Bölüm 3/3", madde "- Akım kaynağı". Silme (köşe başlığı da); son 20 sn **bitiş ekranı**: sol üstte "Sıradaki: Bölüm 3 — Akım kaynağı" (plan.md Bölüm 3/3 adı ve Bölüm 3 metninin başlığıyla aynı; ses ön tanıtımıyla aynı konu), altında koyu yeşil "Oynatma listesi: Devre Teorisi I". Orta ve alt boş. Müzik (kapanış kuralı), konuşma yok; son 2 sn kararma.
