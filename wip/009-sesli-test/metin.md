# 009 sesli test — Kirchhoff gerilim yasasında işaret (Aşama 1: metin ve sahne planı)

Konu 9 (Razavi, Basic Circuits, Ders 4, videoId `UOQxyJGCo3U`). İlk seslendirmeli Short denemesi.

**Durum (17.11.2026):** Bağımsız denetim yapıldı (kritik bulgu yok). Kanal sahibi metni onayladı; ses aşağıdaki **son metinle üretildi — metin artık değişmez.** Bu sürüm denetçi bulgularını (Ö1–Ö4, K1, K4, K5) uygular. Render ve yayın bu aşamada yok.

**Vurgulanan yanlış/nokta:** Gerilim yasasında işaret için iki kural vardır: (1) artıdan eksiye geçilirse eksi, eksiden artıya geçilirse artı; (2) elemana girilen uçtaki işaret yazılır. İkisi birbirinin tam tersidir ve ikisi de doğru denklemi verir. Aynı denklemde ikisi karıştırılırsa bu örnekte doğru cevap yedi volt yerine eksi on yedi volt bulunur.

**Neden bu nokta:** Razavi Ders 4'te işaret seçimini açıkça "kafa karıştırıcı" diye anar ve iki yaklaşımı da yazdıktan sonra birini seçip onunla devam etmeyi söyler (`dogruluk.md` 3–7). Fikir tek (AGENT.md 2g-1), sesle anlatılabilir, sayısal örnekle sonucu gözle görülür.

**Örnek (özgün):** Tek döngü. 12 V kaynak, ona seri iki direnç. Birinci direncin uçlarında 5 V. İkinci direncin gerilimi V₂ bilinmiyor. Kaynağın eksi ucundan başlanır; sıra kaynak, birinci direnç, ikinci direnç. Her dirence artı ucundan girilir.
- Birinci kural: +12 V − 5 V − V₂ = 0, V₂ = 7 V
- İkinci kural: −12 V + 5 V + V₂ = 0, V₂ = 7 V
- Karışık (kaynakta birinci, dirençlerde ikinci): +12 V + 5 V + V₂ = 0, V₂ = −17 V (yanlış)
Doğrulama: `dogrula.py` (yeniden çalıştırıldı, bütün kontroller geçti).

**Kelime sayısı:** **113 kelime** (hedef 105–120).
**Süre tahmini:** Ses: `uzun/ornek-01/ses.mp3`'ten ölçülen hızla (aynı klon ses, hece başına 0,189 sn) ≈ 49,6 sn; dakikada 130 kelimeyle ≈ 52,2 sn. Kart "Bu yanlış." biter bitmez yazılmaya başlar: yazılış ≈ 3 sn + en az 4 sn okunur kalma ≈ 7 sn. **Toplam ≈ 56,6 sn** (130 kelime/dk ile ≈ 59,2 sn). Kesin süre Aşama 2'de üretilmiş sesten ölçülür; toplam 60,0 sn'yi geçecekse kartın okuma süresi 4 sn'de tutulur, yazılışı hızlandırılır (kelime başına 0,25 sn), son kare en geç 60,0 sn.

## (a) Seslendirme metni (SON — sesi bu metinle üretildi, değiştirme)

```
Kaynak geriliminin önüne artı mı yazılır, eksi mi? İkisi de olur. Yeter ki tek denklemde tek kural kullan.

On iki voltluk kaynağa seri iki direnç bağlı. Birincisinin uçlarında beş volt var. İkincisinin gerilimi bilinmiyor. Kaynağın eksi ucundan başlayalım. Önce kaynaktan, sonra birinci, sonra ikinci dirençten geçelim. Her dirence artı ucundan giriyoruz.

Birinci kural: artıdan eksiye geçersen eksi, eksiden artıya geçersen artı yaz. Artı on iki, eksi beş, eksi bilinmeyen gerilim, eşittir sıfır. Sonuç yedi volt.

İkinci kural: girdiğin uçtaki işareti yaz. Eksi on iki, artı beş, artı bilinmeyen. Yine yedi volt.

Şimdi karıştıralım. Kaynakta birinci kural, dirençlerde ikinci kural. Artı on iki, artı beş, artı bilinmeyen. Sonuç eksi on yedi volt. Bu yanlış.
```

Not: "Kirchhoff" sözcüğü seslendirmede yok; ekranda ilk karede yazılıdır. Sesle harf adları ("V bir / V iki") okunmaz: ses "birinci direnç", "ikinci direnç", "bilinmeyen gerilim" der; ekranda V₁, V₂ etiketleri bu sözlerin karşılığıdır.

## (b) Sahne planı (9:16, koyu tema, three.js)

> **Kanal sahibinin onayı bekleniyor (Ö4):** Bu planda denklemler sesle eş zamanlı, terim terim yazılır. Bu, AGENT.md 2a-2 ("yazı animasyondan sonra gelir") ve 2a-3 ("yasa ve formül en sonda") kurallarına sesli Short için istisnadır. Karar kanal sahibinindir; genel müdür iletecek. Onay gelmezse Aşama 2'ye bu bölüm onaylanmadan geçilmez.

**Görsel dil:** AGENT.md 1, 2a, 2c, 4, 4a. Koyu mat zemin (karartma ve gradyan yok), çok silik ızgara. Gerilim ve işaretler sarı (`hl`), dirençler mavi gövde (`bl`), akım oku kırmızı (`rd`), yanlış sonuç kırmızı, doğru sonuç yeşil (`gr`). Çarpma işareti gerekmiyor. Sayılar ondalık virgülle (5,00 V).

**Devre (bütün video boyunca aynı yerleşim, aynı kadraj; kamera yalnızca yerinde çok yavaş yaşar):**
- Tek dikdörtgen döngü, ana sahne x ≈ %8–84, y ≈ %30–72 (AGENT.md 4 dengeli doluluk). Alt yatay tel y ≈ %70–72 (yalnızca tel; alt %32'de hiçbir yazı yok). Bakır tel kesintisiz ve hep görünür (2c-1).
- **Kaynak:** sol dikey kolda kodla çizilmiş küçük bir **12 V akü** modeli (gerçek hayat bağlantısı, 2a-4), x ≈ %9–17, **y ≈ %40–62 (akü ve bütün etiketleri y ≤ %68)**. Artı kutup üstte, eksi kutup altta; kutupların yanında sarı "+" ve "−" (en alttaki "−" y ≈ %62). Değer etiketi "12 V" akünün sağında, döngünün içinde (x ≈ %19–27, y ≈ %50).
- **Birinci direnç (R₁):** üst yatay kolda, x ≈ %32–58, y ≈ %34. Sol ucu (kaynağın artı tarafı) sarı "+", sağ ucu sarı "−". Etiketi "V₁ = 5 V" R₁'in altında, döngünün içinde (y ≈ %38–40).
- **İkinci direnç (R₂):** sağ dikey kolda, x ≈ %74–80, y ≈ %42–60. Üst ucu sarı "+", alt ucu sarı "−". Etiketi döngünün içinde, R₂'nin solunda (x ≈ %62–72, y ≈ %50). Sağ düğme sütununa (x ≥ %86) hiçbir şey girmez.
- **Dirençlerin gövdesinde renk bandı yok** (direnç değeri videoda verilmiyor; 8b'deki bant–etiket çelişkisi yaşanmasın).
- **Ölçü aleti:** döngünün içinde kodla çizilmiş multimetre, **x ≈ %32–56, y ≈ %46–60**; uçları R₁'in iki ucuna bağlı, ekranında "5,00 V" (kırmızı uç R₁'in "+" ucunda). Etiketlerle arasındaki boşluk: "V₁ = 5 V" ile dikeyde ≈ %6 (≈ 115 px), "V₂ = …" ile yatayda ≈ %6, "12 V" ile yatayda ≈ %5 — hepsi ≥ 2 vw (21,6 px) (K4). **Multimetre sahne 5'te bağlanır ve video sonuna kadar R₁'de kalır; uçları taşınmaz** (K4: hareket sahne sınırını aşmasın; önceki plandaki R₂'ye taşıma ≥ 1,2 sn'lik hareket gerektirdiği ve 0,9 sn'lik cümleye sığmadığı için çıkarıldı).
- **Elektronlar** telin içinde sönük ve sürekli akar, gerçek yönde (kaynağın eksi ucundan alt tel, R₂, R₁ üzerinden artı uca); **akım oku** kırmızı, ters yönde (2a-7). Etiketleri sahne 4'te (aşağıda). Dolaşma başlarken (sahne 7) akım oku söner, elektronlar sönük akmaya devam eder (durağan an yok, 2a-13). Dolaşma işaretçisi akımla aynı yönde ilerlediği için akım oku dolaşma sırasında görünmez (dolaşma yönü akıma bağlı sanılmasın).
- **Dolaşma işaretçisi:** beyaz-sarı parlak küçük halka; telin üstünde, kaynağın eksi ucundan başlayıp kaynak, R₁, R₂ sırasıyla ilerler. Geçtiği eleman kısa süre parlar; bir terimin yazılışı işaretçinin o elemandan geçişiyle aynı anda olur. Yanında küçük beyaz yön oku. Başa alınırken R₂'nin sonunda söner ve akünün eksi kutbunda yeniden belirir (≤ 0,3 sn solma; kayma ya da zıplama yok).

**Yazı bandı:** y %12–26 (kart için en fazla %34), x %6–86, satır ≤ 864 px. Bir anda en fazla 2 satır yazı + 1 formül satırı. Ekranda yalnızca sesin söylediğini kısaltan başlık/etiket ve denklemler; uzun cümle yok. Yazılar kalemle yazılır (2a-8); band değişimleri anlık (≤ 0,3 sn), kayma/yakınlaşma yok (2a-15). Formüller tek satır. **Bir anda tek değişiklik:** bir sahnede birden çok olay varsa sırayla gelir, üst üste binmez (2a-9).

Zamanlar ölçülen ses hızıyla tahmindir; Aşama 2'de üretilmiş sesten kelime zamanları çıkarılıp cümle sınırlarına oturtulur.

| # | ~Zaman (sn) | Seslendirme cümlesi | Ekranda |
|---|---|---|---|
| 1 | 0,0–3,6 | "Kaynak geriliminin önüne artı mı yazılır, eksi mi?" | **İlk kare kapak:** devrenin tamamı görünür, elektronlar sönük akıyor, akü hafif parlıyor. Akünün sağında (döngünün içinde) iki küçük sarı kutucuk: "+12 V ?" ve "−12 V ?". Yazı bandı (3 satır): küçük satır "Kirchhoff gerilim yasası"; büyük iki satır "Kaynak geriliminin önüne" / "**artı mı, eksi mi?**" (son satır sarı). |
| 2 | 3,6–4,7 | "İkisi de olur." | İki kutucuğun yanına aynı anda yeşil onay işareti. Band anında değişir; 1. satır: "İkisi de olur". (Cevabın ilk görüntüsü ≈ 4 sn, AGENT.md 2g-2.) |
| 3 | 4,7–7,0 | "Yeter ki tek denklemde tek kural kullan." | 2. satır yazılır: "Tek denklemde tek kural". İki satır sahne 8'in sonuna kadar bandda kalır (tez cümlesi). |
| 4 | 7,0–10,0 | "On iki voltluk kaynağa seri iki direnç bağlı." | Sırayla, üst üste binmeden (K4): (a) 7,0–7,3 kutucuklar silinir; (b) 7,3–8,1 akünün sağına "12 V" yazılır; (c) 8,1–9,3 R₁ ve R₂ birlikte, yavaşça mavi parlayıp söner (tek olay); (d) 9,3–10,0 kırmızı akım oku belirginleşir ve kısa etiketler "akım yönü", "elektronlar" yazılır (sahne 5'in başında 10,9'a kadar kalır, sonra söner). |
| 5 | 10,0–12,3 | "Birincisinin uçlarında beş volt var." | Sırayla: (a) 10,9'da akım/elektron etiketleri söner; (b) 10,9–12,1 multimetre uçları R₁'in iki ucuna yavaşça bağlanır, ekranda "5,00 V"; (c) 12,1'den sonra (sahne 6'nın başına taşarak, 12,6'ya kadar) R₁'in altına "V₁ = 5 V" yazılır. |
| 6 | 12,3–14,7 | "İkincisinin gerilimi bilinmiyor." | 12,6'dan sonra R₂'nin soluna "V₂ = ?" yazılır; soru işareti hafif titreşir. |
| 7 | 14,7–17,0 | "Kaynağın eksi ucundan başlayalım." | Akım oku söner; ardından dolaşma işaretçisi akünün eksi kutbunda belirir ve yerinde hafifçe parlar. |
| 8 | 17,0–20,9 | "Önce kaynaktan, sonra birinci, sonra ikinci dirençten geçelim." | Soluk bir yön çizgisi, işaretçinin gideceği yolu sözlerle eş zamanlı gösterir: kaynak, R₁, R₂ (işaretçi yerinde bekler). Band değişmez. |
| 9 | 20,9–23,4 | "Her dirence artı ucundan giriyoruz." | R₁'in sol ucundaki, sonra R₂'nin üst ucundaki sarı "+" işareti sırayla büyüyüp parlar (giriş uçları). |
| 10 | 23,4–28,7 | "Birinci kural: artıdan eksiye geçersen eksi, eksiden artıya geçersen artı yaz." | Band anında değişir; 1. satır "Birinci kural", 2. satır (daha küçük) **"Artıdan eksiye eksi, eksiden artıya artı"** (Ö2; kuralın iki yarısı; satır 864 px'e sığmazsa punto küçülür, en az 4,5 vw). |
| 11 | 28,7–32,8 | "Artı on iki, eksi beş, eksi bilinmeyen gerilim, eşittir sıfır." | İşaretçi akünün içinden eksiden artıya, sonra R₁'den, sonra R₂'den geçer; geçtiği anda formül satırına terimi yazılır: `+12 V` → `− 5 V` → `− V₂` → `= 0`. Formül satırı: `+12 V − 5 V − V₂ = 0`. |
| 12 | 32,8–33,7 | "Sonuç yedi volt." | R₂'nin etiketi "V₂ = ?" → "V₂ = 7 V" (yeşil). |
| 13 | 33,7–36,8 | "İkinci kural: girdiğin uçtaki işareti yaz." | Band anında değişir; 1. satır "İkinci kural", 2. satır "Girdiğin uçtaki işareti yaz". Önceki formül silinir. Ardından işaretçi başa alınır (söner, akünün eksi kutbunda yeniden belirir). |
| 14 | 36,8–39,4 | "Eksi on iki, artı beş, artı bilinmeyen." | İşaretçi aynı yoldan geçer; her elemana girdiği anda o uçtaki sarı işaret parlar ve formül terimi yazılır: `−12 V` → `+ 5 V` → `+ V₂` → `= 0`. Formül satırı: `−12 V + 5 V + V₂ = 0`. |
| 15 | 39,4–40,3 | "Yine yedi volt." | "V₂ = 7 V" etiketi yeşil kısa nabız. |
| 16 | 40,3–41,7 | "Şimdi karıştıralım." | Band anında değişir; 1. satır (kırmızı) "Kurallar karışırsa". Formül silinir; ardından işaretçi başa alınır. |
| 17 | 41,7–44,9 | "Kaynakta birinci kural, dirençlerde ikinci kural." | Sırayla nesne etiketleri: önce akünün sağına küçük "birinci kural", sonra R₁'in altına ve R₂'nin soluna küçük "ikinci kural" (döngünün içinde; V₁/V₂ etiketleri bu sırada yerinde küçülerek yer açar, etiketler ve multimetre arasında ≥ 2 vw). |
| 18 | 44,9–47,5 | "Artı on iki, artı beş, artı bilinmeyen." | İşaretçi yine aynı yoldan geçer; formül satırı terim terim: `+12 V` → `+ 5 V` → `+ V₂` → `= 0`. Formül satırı: `+12 V + 5 V + V₂ = 0`. |
| 19 | 47,5–49,0 | "Sonuç eksi on yedi volt." | R₂ etiketi "V₂ = −17 V" (kırmızı). Multimetre R₁'de "5,00 V" göstermeye devam eder. |
| 20 | 49,0–49,6 | "Bu yanlış." | Band 2. satır (kırmızı) "Bu yanlış"; "V₂ = −17 V" etiketinin **üstü kırmızı tek çizgiyle çizilir** (K4; çarpı yok). |
| 21 | 49,6–≈56,6 | (ses yok) | **"Bilmen gerekenler" kartı** "Bu yanlış." biter bitmez, aynı ekranda yazı bandında (y %12–34) kalemle yazılmaya başlar (Ö1): band yazıları ve formül anında silinir, yerine başlık + iki madde (aşağıda). Yazılış ≈ 3 sn, ardından **en az 4 sn** okunur kalır. Kural etiketleri ve üstü çizili "V₂ = −17 V" yerinde kalır (yeni olay eklenmez; kartla aynı anda başka değişiklik yok). Devre yaşamaya devam eder (elektronlar sönük akar, kamera çok yavaş). Son kare en geç 60,0 sn. |

Önceki plandaki "Bir kural seç / Döngü kapanana kadar onunla git" band sahnesi, son cümle seslendirmeden çıktığı için kaldırıldı; aynı mesaj kartın 2. maddesindedir (Ö1).

**Ekrandaki bütün yazılar (denetim listesi, sırayla):** "Kirchhoff gerilim yasası" · "Kaynak geriliminin önüne" · "artı mı, eksi mi?" · "+12 V ?" · "−12 V ?" · "İkisi de olur" · "Tek denklemde tek kural" · "12 V" · "akım yönü" · "elektronlar" · "5,00 V" · "V₁ = 5 V" · "V₂ = ?" · "Birinci kural" · "Artıdan eksiye eksi, eksiden artıya artı" · `+12 V − 5 V − V₂ = 0` · "V₂ = 7 V" · "İkinci kural" · "Girdiğin uçtaki işareti yaz" · `−12 V + 5 V + V₂ = 0` · "Kurallar karışırsa" · "birinci kural" · "ikinci kural" · `+12 V + 5 V + V₂ = 0` · "V₂ = −17 V" · "Bu yanlış" · "Bilmen gerekenler" · kart maddeleri.

Gösterim notları (AGENT.md 2d): işaretler yalnızca formül ve değer içinde, kelime yerine değil; ":" ve "→" ekranda kullanılmaz (sahne planındaki "→" yalnızca yazılış sırasını gösterir, ekrana yazılmaz); her denklem tek satır; büyük harf V (doğru gerilim değerleri) baştan sona; "=" yalnızca eşitlik.

## (c) "Bilmen gerekenler" kartı ("Bu yanlış." biter bitmez; yazılış ≈ 3 sn + ≥ 4 sn okuma)

- İki işaret kuralı da doğrudur
- Bir denklemde tek kural kullan

(İki madde, 10 kelime. Tam liste açıklamada.)

## (d) Başlık, açıklama, ilk yorum (AGENT.md 9a; vidIQ bu çalışmada çağrılmadı, kredi 0)

Kelime kaynağı: `buyume/anahtar-kelimeler.md` ("kirchhoff yasaları / kirchhoff akım yasası" < 750/ay; "devre analizi 1" ~9.200/ay; "devre teorisi" ~8.200/ay) ve `buyume/shorts-ipuclari.md` ipucu 1, 4, 6 (başlıkta tam ad "Kirchhoff Gerilim Yasası", açıklamada "KVL", ilk cümlede "Devre analizi 1 / devre teorisi").

**Başlık (43 karakter):** Kirchhoff Gerilim Yasası: Artı mı, Eksi mi?

**Açıklama:**
```
Devre analizi 1 / devre teorisi dersinde Kirchhoff gerilim yasası (KVL): döngüde kaynağın önüne artı mı, eksi mi yazılır? İki işaret kuralı da doğru denklemi verir; ama aynı denklemde karıştırılırsa, yani kaynakta birinci, dirençlerde ikinci kural kullanılırsa, bu örnekte 7 V yerine −17 V bulunur.

Bilmen gerekenler:
• Kapalı döngüde gerilimlerin toplamı sıfırdır; döngü kapanmadan toplanan gerilimler sıfır olmak zorunda değildir.
• Birinci kural: artıdan eksiye geçerken eksi, eksiden artıya geçerken artı yazılır.
• İkinci kural: elemana girilen uçtaki işaret yazılır.
• İki kural birbirinin tam tersidir; ikisi de doğrudur, ama bir denklemde yalnızca biri kullanılır.

Önce bilmen gereken: Seri bağlı elemanlar aynı akımı taşır. Ohm yasasını eksi işaretsiz kullanmak için, direncin gerilimi akımın girdiği uç artı olacak şekilde işaretlenir.

Kaynak: B. Razavi, Basic Circuits, Ders 4 (yöntem; örnek özgündür).

#elektronik #kirchhoff #devreanalizi
```

**Etiketler:** kirchhoff gerilim yasası, kirchhoff yasaları, KVL, devre analizi 1, devre teorisi, elektrik devreleri

**İlk yorum (firstCommentText):** "9 V kaynağa seri iki direnç bağlı, birincisinin uçlarında 4 V var. İkinci direncin gerilimi kaç volt? Videodaki gibi kaynakta birinci, dirençlerde ikinci kuralı kullanan kaç bulur? Cevabını yaz."
Cevap (`dogrula.py`): doğrusu 5 V; videodaki karışımla −13 V.

**Kanal sahibinin kararı gereken nokta:** Ses kanal sahibinin ElevenLabs klon sesidir. AGENT.md bölüm 11-7'deki `isAiGeneratedContent: false` ayarı sessiz videolar için yazılmıştı; sentetik ses için YouTube'un "değiştirilmiş veya sentetik içerik" beyanının gerekip gerekmediğine yayın öncesinde kanal sahibi karar verir (ajan bu ayarı kendisi değiştirmez).

## (e) İkinci okuma (ajanın kendi kontrolü; son metin üzerinde)

1. **Sesli okunuş:** Metinde rakam, simge, parantez, kısaltma yok (otomatik kontrol). Harfle değişken adı okunmuyor. "Kirchhoff" seslendirmede yok. "eksi" hem işaret hem uç adı olarak geçiyor ("eksi on iki", "eksi ucundan"); her geçişte yanındaki sözcük anlamı belirliyor. Son metinde noktalı virgül yok.
2. **Tek anlamlı devre tarifi:** Sesle verilen bilgiler denklemi tek biçimde kurmaya yetiyor: kaynak 12 V; seri iki direnç; birincide 5 V; başlangıç kaynağın eksi ucu; sıra kaynak, birinci, ikinci; her dirence artı ucundan giriliyor. Buradan kaynağa eksi ucundan girildiği de çıkıyor; ikinci kuralın "girdiğin uç" ifadesi kaynakta "eksi", dirençlerde "artı" verir.
3. **Süre:** 113 kelime; ses ≈ 49,6–52,2 sn; kartla ≈ 56,6 sn (en kötü tahmin ≈ 59,2 sn). Kesin değer üretilmiş sesten ölçülür (bkz. üst).
4. **İlk 8 saniye:** Soru 0–3,6 sn; sözlü cevap "İkisi de olur" ≈ 3,6 sn; ekranda yeşil onaylar ≈ 4 sn.
5. **Mutlak ifade ve sıklık:** "her zaman", "asla", "çoğu öğrenci", "sık yapılan hata" yok. "İkisi de olur" seçilen kurala bağlı olarak doğru; "Bu yanlış" yalnızca bu örneğin sonucu için. Karıştırmanın her devrede yanlış sonuç vermediği `dogruluk.md` bölüm 6'da (K1). Açıklamada "bu örnekte" diye sınırlandı.
6. **Ses–ekran tutarlılığı:** Her ekran yazısı aynı anda söylenen cümlenin kısaltılmışı ya da onun değeridir. Sesin söylemediği yalnızca görsel kanıtlar var: multimetre ekranı (5,00 V, sesteki değerle aynı) ve "akım yönü / elektronlar" etiketleri (AGENT.md 2a-7 zorunluluğu).
7. **Sıkışık yer:** Sahne 4–6 (7,0–14,7 sn) altı sıralı olay içerir; ölçülen hızla sığıyor ama pay az. Aşama 2'de gerçek ses zamanlarıyla sığmazsa öneri: "akım yönü / elektronlar" etiketleri bu videoda gösterilmez (2a-7 istisnası, kanal sahibine sorulmalı) ya da sahne 1–3 sırasında gösterilir.
8. **Kural istisnaları:** 2a-2 ve 2a-3 istisnası için kanal sahibinin onayı bekleniyor (Ö4, bölüm b başı). AGENT.md 3 ve 6'daki "seslendirme yok" kuralının istisnası kanal sahibinin sesli test kararıdır (`konular.md` satır 20).
