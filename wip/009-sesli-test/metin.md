# 009 sesli test — Kirchhoff gerilim yasasında işaret (Aşama 1: metin ve sahne planı)

Konu 9 (Razavi, Basic Circuits, Ders 4, videoId `UOQxyJGCo3U`). İlk seslendirmeli Short denemesi. Bu aşamada ses, render ve yayın yok.

**Vurgulanan yanlış/nokta:** Gerilim yasasında işaret için iki kural vardır: (1) artıdan eksiye geçilirse eksi, eksiden artıya geçilirse artı; (2) elemana girilen uçtaki işaret yazılır. İkisi birbirinin tam tersidir ve ikisi de doğru denklemi verir. Aynı denklemde ikisi karıştırılırsa bu örnekte doğru cevap yedi volt yerine eksi on yedi volt bulunur.

**Neden bu nokta:** Razavi Ders 4'te işaret seçimini açıkça "kafa karıştırıcı" diye anar ve iki yaklaşımı da yazdıktan sonra birini seçip onunla devam etmeyi söyler (`dogruluk.md` 3–7). Fikir tek (AGENT.md 2g-1), sesle anlatılabilir, sayısal örnekle sonucu gözle görülür.

**Örnek (özgün):** Tek döngü. 12 V kaynak, ona seri iki direnç. Birinci direncin uçlarında 5 V. İkinci direncin gerilimi V₂ bilinmiyor. Kaynağın eksi ucundan başlanır; sıra kaynak, birinci direnç, ikinci direnç. Her dirence artı ucundan girilir.
- Birinci kural: +12 V − 5 V − V₂ = 0, V₂ = 7 V
- İkinci kural: −12 V + 5 V + V₂ = 0, V₂ = 7 V
- Karışık (kaynakta birinci, dirençlerde ikinci): +12 V + 5 V + V₂ = 0, V₂ = −17 V (yanlış)
Doğrulama: `dogrula.py` (bütün kontroller geçti).

**Kelime sayısı:** **118 kelime** (hedef 105–120).
**Süre tahmini:** dakikada 130 kelimeyle 54,5 sn; `uzun/ornek-01/ses.mp3`'ten ölçülen hızla (aynı klon ses, hece başına 0,189 sn) 51,3 sn. Sondaki 4 sn kartla toplam **≈ 55–58,5 sn** (60 sn sınırının altında). Ses 56 sn'yi aşarsa son cümle ("Bir kural seç, …", 8 kelime, ≈ 3,5 sn) çıkarılır; kart aynı şeyi söyler.

## (a) Seslendirme metni

ElevenLabs'e olduğu gibi yapıştırılır (rakam, simge, parantez, kısaltma yok).

```
Kaynak geriliminin önüne artı mı yazılır, eksi mi? İkisi de olur. Yeter ki tek denklemde tek kural kullan.

On iki voltluk kaynağa seri iki direnç bağlı. Birincisinin uçlarında beş volt var. İkincisinin gerilimi bilinmiyor. Kaynağın eksi ucundan başlayalım; önce kaynaktan, sonra birinci, sonra ikinci dirençten geçelim. Her dirence artı ucundan giriyoruz.

Birinci kural: artıdan eksiye geçersen eksi, tersinde artı yaz. Artı on iki, eksi beş, eksi bilinmeyen gerilim, eşittir sıfır. Sonuç yedi volt.

İkinci kural: girdiğin uçtaki işareti yaz. Eksi on iki, artı beş, artı bilinmeyen. Yine yedi volt.

Şimdi karıştıralım. Kaynakta birinci kural, dirençlerde ikinci kural. Artı on iki, artı beş, artı bilinmeyen. Sonuç eksi on yedi volt; yanlış. Bir kural seç, döngü kapanana kadar onunla git.
```

Not: "Kirchhoff" sözcüğü bilerek seslendirmede yok (yapay sesin yanlış okuma riski); ekranda ilk karede yazılıdır. Sesle "V bir / V iki" gibi harf adları da okunmaz: ses "birinci direnç", "ikinci direnç", "bilinmeyen gerilim" der; ekranda V₁, V₂ etiketleri bu sözlerin karşılığı olarak durur.

## (b) Sahne planı (9:16, koyu tema, three.js)

**Görsel dil:** AGENT.md 1, 2a, 2c, 4, 4a. Koyu mat zemin (karartma ve gradyan yok), çok silik ızgara. Gerilim ve işaretler sarı (`hl`), dirençler mavi gövde (`bl`), akım oku kırmızı (`rd`), yanlış sonuç kırmızı, doğru sonuç yeşil (`gr`). Çarpma işareti kullanılmaz (gerekmiyor). Sayılar ondalık virgülle (5,00 V).

**Devre (bütün video boyunca aynı yerleşim, aynı kadraj; kamera yalnızca yerinde çok yavaş yaşar):**
- Tek dikdörtgen döngü, ana sahne x ≈ %8–84, y ≈ %30–74 (AGENT.md 4 dengeli doluluk).
- **Kaynak:** sol dikey kolda kodla çizilmiş küçük bir **12 V akü** modeli (gerçek hayat bağlantısı, 2a-4); artı kutup üstte, eksi kutup altta; kutupların yanında sarı "+" ve "−". Değer etiketi "12 V" akünün sağında, döngünün içinde.
- **Birinci direnç (R₁):** üst yatay kolda, x ≈ %32–58, y ≈ %34. Sol ucu (kaynağın artı tarafı) sarı "+", sağ ucu sarı "−".
- **İkinci direnç (R₂):** sağ dikey kolda, x ≈ %74–80, y ≈ %42–60. Üst ucu sarı "+", alt ucu sarı "−". Etiketleri döngünün içinde, solunda (sağ düğme sütunu x ≥ %86'ya hiçbir şey girmez).
- **Dirençlerin gövdesinde renk bandı yok** (direnç değeri videoda verilmiyor; 8b'deki bant–etiket çelişkisi yaşanmasın).
- Alt yatay tel y ≈ %70–72 (nesne; alt %32'de yazı yok). Bakır tel kesintisiz ve hep görünür (2c-1).
- **Elektronlar** telin içinde sönük ve sürekli akar, gerçek yönde (kaynağın eksi ucundan alt tel, R₂, R₁ üzerinden artı uca); **akım oku** kırmızı, ters yönde (2a-7). İkisi ilk göründüğünde 2 sn kısa etiket: "elektronlar", "akım yönü" (sahne 2). Dolaşma başlayınca akım oku söner, elektronlar sönük akmaya devam eder (durağan an yok, 2a-13).
- **Dolaşma işaretçisi:** beyaz-sarı parlak küçük halka; telin üstünde, kaynağın eksi ucundan başlayıp kaynak, R₁, R₂ sırasıyla ilerler. Geçtiği eleman kısa süre parlar; bir terimin yazılışı işaretçinin o elemandan geçişiyle aynı anda olur. Yanında küçük beyaz yön oku.
- **Ölçü aleti:** döngünün içinde (x ≈ %34–60, y ≈ %44–58) kodla çizilmiş multimetre; uçları önce R₁'e bağlı, ekranında "5,00 V". Sahne 4'ün sonunda uçları yavaşça (≥ 1,2 sn) R₂'ye geçer, ekranda "7,00 V". Kırmızı uç her zaman elemanın "+" ucunda.

**Yazı bandı:** y %12–26 (en fazla %34), x %6–86, satır ≤ 864 px. Bir anda en fazla 2 satır yazı + 1 formül satırı. Ses varken ekranda yalnızca sesin söylediğini kısaltan başlık/etiket ve denklemler; uzun cümle yok. Yazılar kalemle yazılır (2a-8); geçişler anlık (≤ 0,3 sn), kayma/yakınlaşma yok (2a-15). Formüller tek satır.

Süreler ölçülen ses hızıyla tahmindir (Aşama 2'de gerçek sesten kelime zamanları çıkarılıp cümle sınırlarına oturtulur).

| # | ~Zaman (sn) | Seslendirme cümlesi | Ekranda |
|---|---|---|---|
| 1 | 0,0–3,6 | "Kaynak geriliminin önüne artı mı yazılır, eksi mi?" | **İlk kare kapak:** devrenin tamamı görünür, elektronlar akıyor, akü hafif parlıyor. Akünün yanında iki küçük sarı kutucuk: "+12 V ?" ve "−12 V ?". Yazı bandı (3 satır): küçük satır "Kirchhoff gerilim yasası"; büyük iki satır "Kaynak geriliminin önüne" / "**artı mı, eksi mi?**" (son satır sarı). |
| 2 | 3,6–4,7 | "İkisi de olur." | İki kutucuğun yanına aynı anda yeşil onay işareti. Band anında değişir; 1. satır: "İkisi de olur". (Cevabın ilk görüntüsü ≈ 4 sn, AGENT.md 2g-2.) |
| 3 | 4,7–7,0 | "Yeter ki tek denklemde tek kural kullan." | 2. satır yazılır: "Tek denklemde tek kural". İki satır sahne 6'ya kadar bandda kalır (tez cümlesi). |
| 4 | 7,0–10,0 | "On iki voltluk kaynağa seri iki direnç bağlı." | Kutucuklar silinir. Akünün yanına "12 V" yazılır; R₁ ve R₂ sırayla kısa süre mavi parlar. Kırmızı akım oku ve elektronlar belirginleşir; kısa etiketler "akım yönü", "elektronlar" (2 sn, sonra kaybolur). |
| 5 | 10,0–12,3 | "Birincisinin uçlarında beş volt var." | Multimetre uçları R₁'in iki ucuna bağlanır, ekranda "5,00 V". R₁'in altına (döngünün içine) "V₁ = 5 V". |
| 6 | 12,3–14,7 | "İkincisinin gerilimi bilinmiyor." | R₂'nin soluna "V₂ = ?" yazılır, soru işareti hafif titreşir. |
| 7 | 14,7–20,9 | "Kaynağın eksi ucundan başlayalım; önce kaynaktan, sonra birinci, sonra ikinci dirençten geçelim." | Akım oku söner. Dolaşma işaretçisi akünün eksi kutbunda belirir; "önce kaynaktan…" denirken soluk bir yön çizgisi işaretçinin gideceği yolu kaynak, R₁, R₂ sırasıyla bir kez gösterir (işaretçi yerinde bekler). Band değişmez. |
| 8 | 20,9–23,4 | "Her dirence artı ucundan giriyoruz." | R₁'in sol ucundaki ve R₂'nin üst ucundaki sarı "+" işaretleri sırayla büyüyüp parlar (giriş uçları). |
| 9 | 23,4–27,5 | "Birinci kural: artıdan eksiye geçersen eksi, tersinde artı yaz." | Band anında değişir; 1. satır "Birinci kural", 2. satır (daha küçük) "Artıdan eksiye geçersen eksi". |
| 10 | 27,5–31,7 | "Artı on iki, eksi beş, eksi bilinmeyen gerilim, eşittir sıfır." | İşaretçi akünün içinden eksiden artıya, sonra R₁'den, sonra R₂'den geçer; geçtiği anda formül satırına terimi yazılır: `+12 V` → `− 5 V` → `− V₂` → `= 0`. Formül satırı: `+12 V − 5 V − V₂ = 0`. |
| 11 | 31,7–32,6 | "Sonuç yedi volt." | R₂'nin etiketi "V₂ = ?" → "V₂ = 7 V" (yeşil). |
| 12 | 32,6–35,6 | "İkinci kural: girdiğin uçtaki işareti yaz." | Band anında değişir; 1. satır "İkinci kural", 2. satır "Girdiğin uçtaki işareti yaz". Önceki formül silinir. İşaretçi R₂'nin sonunda söner ve akünün eksi kutbunda yeniden belirir (≤ 0,3 sn solma; kayma ya da zıplama yok). |
| 13 | 35,6–38,3 | "Eksi on iki, artı beş, artı bilinmeyen." | İşaretçi aynı yoldan geçer; her elemana girdiği anda o uçtaki sarı işaret parlar ve formül terimi yazılır: `−12 V` → `+ 5 V` → `+ V₂` → `= 0`. Formül satırı: `−12 V + 5 V + V₂ = 0`. |
| 14 | 38,3–39,2 | "Yine yedi volt." | "V₂ = 7 V" etiketi yeşil kısa nabız; multimetrenin uçları yavaşça R₂'ye geçer, ekranda "7,00 V". |
| 15 | 39,2–40,5 | "Şimdi karıştıralım." | Band anında değişir; 1. satır (kırmızı) "Kurallar karışırsa". Formül silinir; işaretçi aynı biçimde (söner, akünün eksi kutbunda yeniden belirir) başlangıca alınır. |
| 16 | 40,5–43,7 | "Kaynakta birinci kural, dirençlerde ikinci kural." | Nesne etiketleri: akünün yanına küçük "birinci kural", R₁ ve R₂'nin yanına küçük "ikinci kural" (döngünün içinde, nesnelere binmeden). |
| 17 | 43,7–46,4 | "Artı on iki, artı beş, artı bilinmeyen." | İşaretçi yine aynı yoldan geçer; formül satırı terim terim: `+12 V` → `+ 5 V` → `+ V₂` → `= 0`. Formül satırı: `+12 V + 5 V + V₂ = 0`. |
| 18 | 46,4–47,9 | "Sonuç eksi on yedi volt;" | R₂ etiketi "V₂ = −17 V" (kırmızı). Multimetre "7,00 V" göstermeye devam eder (çelişki görünür). |
| 19 | 47,9–48,3 | "yanlış." | Band 2. satır (kırmızı) "Yanlış"; "V₂ = −17 V" etiketinin üstüne kırmızı çarpı çizilir. |
| 20 | 48,3–51,3 | "Bir kural seç, döngü kapanana kadar onunla git." | Band anında değişir; 1. satır "Bir kural seç", 2. satır "Döngü kapanana kadar onunla git". Kural etiketleri ve formül silinir. İşaretçi döngünün tamamını dolaşıp arkasında sarı iz bırakır; iz başlangıç noktasında kapanınca kısa halka parlaması. |
| 21 | 51,3–55,3 | (ses yok, 4 sn) | **"Bilmen gerekenler" kartı** yazı bandında (y %12–34), kalemle: başlık + iki madde (aşağıda). Devre yaşamaya devam eder (elektronlar akar, kamera çok yavaş). |

Toplam ≈ 55,3 sn (ölçülen hızla); dakikada 130 kelimeyle ≈ 58,5 sn.

**Ekrandaki bütün yazılar (denetim listesi, sırayla):** "Kirchhoff gerilim yasası" · "Kaynak geriliminin önüne" · "artı mı, eksi mi?" · "+12 V ?" · "−12 V ?" · "İkisi de olur" · "Tek denklemde tek kural" · "12 V" · "akım yönü" · "elektronlar" · "5,00 V" · "V₁ = 5 V" · "V₂ = ?" · "Birinci kural" · "Artıdan eksiye geçersen eksi" · `+12 V − 5 V − V₂ = 0` · "V₂ = 7 V" · "İkinci kural" · "Girdiğin uçtaki işareti yaz" · `−12 V + 5 V + V₂ = 0` · "7,00 V" · "Kurallar karışırsa" · "birinci kural" · "ikinci kural" · `+12 V + 5 V + V₂ = 0` · "V₂ = −17 V" · "Yanlış" · "Bir kural seç" · "Döngü kapanana kadar onunla git" · kart.

Gösterim notları (AGENT.md 2d): işaretler yalnızca formül ve değer içinde, kelime yerine değil; ":" ve "→" ekranda kullanılmaz; her denklem tek satır; büyük harf V (doğru gerilim değerleri) baştan sona; "=" yalnızca eşitlik.

## (c) "Bilmen gerekenler" kartı (≈ 4 sn, seslendirme bitince)

- İki işaret kuralı da doğrudur
- Bir denklemde tek kural kullan

(İki madde, 10 kelime: kalemle yazma ≈ 3 sn + okuma. Üçüncü madde 4 sn'ye sığmadığı için açıklamada.)

## (d) Başlık, açıklama, ilk yorum (AGENT.md 9a; vidIQ bu çalışmada çağrılmadı, kredi 0)

Kelime kaynağı: `buyume/anahtar-kelimeler.md` ("kirchhoff yasaları / kirchhoff akım yasası" < 750/ay; "devre analizi 1" ~9.200/ay; "devre teorisi" ~8.200/ay) ve `buyume/shorts-ipuclari.md` ipucu 1, 4, 6 (başlıkta tam ad "Kirchhoff Gerilim Yasası", açıklamada "KVL", ilk cümlede "Devre analizi 1 / devre teorisi").

**Başlık (43 karakter):** Kirchhoff Gerilim Yasası: Artı mı, Eksi mi?

**Açıklama:**
```
Devre analizi 1 / devre teorisi dersinde Kirchhoff gerilim yasası (KVL): döngüde kaynağın önüne artı mı, eksi mi yazılır? İki işaret kuralı da doğru denklemi verir; ama aynı denklemde karıştırılırsa bu örnekte 7 V yerine −17 V bulunur.

Bilmen gerekenler:
• Kapalı döngüde gerilimlerin toplamı sıfırdır; döngü kapanmadan toplanan gerilimler sıfır olmak zorunda değildir.
• Birinci kural: artıdan eksiye geçerken eksi, eksiden artıya geçerken artı yazılır.
• İkinci kural: elemana girilen uçtaki işaret yazılır.
• İki kural birbirinin tam tersidir; ikisi de doğrudur, ama bir denklemde yalnızca biri kullanılır.

Önce bilmen gereken: Seri bağlı elemanlar aynı akımı taşır. Direncin gerilimi, akımın girdiği uç artı olacak şekilde işaretlenir.

Kaynak: B. Razavi, Basic Circuits, Ders 4 (yöntem; örnek özgündür).

#elektronik #kirchhoff #devreanalizi
```

**Etiketler:** kirchhoff gerilim yasası, kirchhoff yasaları, KVL, devre analizi 1, devre teorisi, elektrik devreleri

**İlk yorum (firstCommentText):** "9 V kaynağa seri iki direnç bağlı, birincisinin uçlarında 4 V var. İkinci direncin gerilimi kaç volt? Kuralları karıştıran kaç bulur? Cevabını yaz."
Cevap (`dogrula.py`): doğrusu 5 V; karışık kuralla −13 V.

**Kanal sahibinin kararı gereken nokta:** Ses kanal sahibinin ElevenLabs klon sesi olacak. AGENT.md bölüm 11-7'deki `isAiGeneratedContent: false` ayarı sessiz videolar için yazılmıştı; sentetik ses için YouTube'un "değiştirilmiş veya sentetik içerik" beyanının gerekip gerekmediğine yayın öncesinde kanal sahibi karar verir (ajan bu ayarı kendisi değiştirmez).

## (e) İkinci okuma (ajanın kendi kontrolü)

1. **Sesli okunuş:** Metinde rakam, simge, parantez, kısaltma yok (otomatik kontrol). Harfle değişken adı okunmuyor ("V bir ve V iki" sorunu yok). "Kirchhoff" seslendirmede yok. "eksi" hem işaret hem uç adı olarak geçiyor ("eksi on iki", "eksi ucu"); her geçişte yanındaki sözcük anlamı belirliyor. Duraklama için tek noktalı virgül ("…başlayalım;" ve "…volt;") var; ses üretilince bu iki yer dinlenip kontrol edilmeli.
2. **Tek anlamlı devre tarifi:** Sesle verilen bilgiler denklemi tek biçimde kurmaya yetiyor: kaynak 12 V; seri iki direnç; birincide 5 V; başlangıç kaynağın eksi ucu; sıra kaynak, birinci, ikinci; her dirence artı ucundan giriliyor. Buradan kaynağa eksi ucundan girildiği de çıkıyor. İkinci kuralın "girdiğin uç" ifadesi bu yüzden kaynakta "eksi", dirençlerde "artı" verir. Önceki taslaktaki "kaynağın artı ucu tarafında" ifadesi, ikinci direnç için iki yana da okunabildiğinden "her dirence artı ucundan giriyoruz" ile değiştirildi.
3. **Süre:** 118 kelime. Ölçülen hızla 51,3 sn, dakikada 130 kelimeyle 54,5 sn; kartla 55–58,5 sn. 60 sn'ye en kötü tahminde 1,5 sn pay var. Ses beklenenden yavaşsa son cümle çıkarılır (bkz. üst).
4. **İlk 8 saniye:** Soru 0–3,6 sn; sözlü cevap "İkisi de olur" ≈ 3,6 sn; ekranda yeşil onaylar ≈ 4 sn.
5. **Mutlak ifade ve sıklık:** "her zaman", "asla", "çoğu öğrenci", "sık yapılan hata" yok. "İkisi de olur" seçilen kurala bağlı olarak doğru; "yanlış" yalnızca bu örneğin sonucu için. Kartta "İki işaret kuralı da doğrudur" ikinci maddeyle (tek kural) birlikte okunur. Açıklamada "karıştırılırsa … bu örnekte" diye sınırlandı.
6. **Ses–ekran tutarlılığı:** Her ekran yazısı aynı anda söylenen cümlenin kısaltılmışı ya da onun değeridir; ekranda sesin söylemediği iddia yok. Sesin söylemediği yalnızca iki görsel kanıt var: multimetre ekranı (5,00 V ve 7,00 V, sesteki değerlerin aynısı) ve "akım yönü / elektronlar" etiketleri (AGENT.md 2a-7 zorunluluğu). Dolaşma işaretçisi akımla aynı yönde ilerlediği için, akım oku dolaşma başlamadan söndürülür (dolaşma yönü akıma bağlı sanılmasın).
7. **Kural istisnaları (bilerek):** AGENT.md 2a-3 ("formül en sonda") ve 2a-2 ("yazı animasyondan sonra") seslendirmesiz videolar için yazılmıştır; bu testte denklem sesle eş zamanlı terim terim yazılır, çünkü videonun konusu denklemin kendisidir. AGENT.md 3 ve 6'daki "seslendirme yok" kuralının istisnası kanal sahibinin sesli test kararıdır (`konular.md` satır 20).
8. **Açık kalan:** Karışık kuralın yanlış sonuç verdiği bilgisi Razavi'de açık cümle olarak yok; Razavi'nin "birini seç ve onunla devam et" uyarısından çıkarım ve hesapla gösterildi (`dogruluk.md` 9). Bağımsız denetçi (AGENT.md 7 A) bu aşamada çalıştırılmadı.
