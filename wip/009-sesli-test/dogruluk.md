# Doğruluk kaydı — 009 sesli test (Kirchhoff gerilim yasasında işaret)

Tarih: 17.11.2026. Aşama 1 (metin ve sahne planı), denetim sonrası 2. sürüm. Bağımsız denetim: kritik bulgu yok; Ö1–Ö4, K1, K4, K5 uygulandı. Ses kanal sahibince son metinle üretildi (metin değişmez); görüntü ve yayın yok.

## 1. Kaynak (onaylı, `kaynaklar.md`)

- B. Razavi, Basic Circuits, **Ders 4** (videoId `UOQxyJGCo3U`). Transkript kanal sahibinin verdiği onaylı dosyadan okundu (genel müdür iletti; depoya kopyalanmadı). vidIQ çağrılmadı (kredi 0).
- Başka kaynak kullanılmadı.

## 2. Özgünlük (AGENT.md 2i-4)

Ders 4'teki gerilim yasası örnekleri: [18:41–19:28] ve [22:43–23:43] işaretleri rastgele konmuş genel döngüler (sembolik); [28:24–30:50] tek kaynak ve iki seri direnç, eşdeğer direnç için sembolik KVL (vx = ix·r1 + ix·r2); [34:46–39:13] iki pil ve bir direnç, akım bulma; [39:36–41:48] bağımlı gerilim kaynağı; [42:04–47:28] çok kaynaklı devrede KCL ve KVL. Hepsi sembolik çözülür.
Bu videodaki örnek (12 V kaynak, birinci dirençte ölçülmüş 5 V, ikinci direncin bilinmeyen gerilimi; iki kuralın ve karışık kullanımın sayısal karşılaştırması) bunların kopyası veya sayıları değiştirilmiş uyarlaması değildir. Yapı olarak [28:24]'teki "kaynak ve iki seri direnç" düzenine benzer (tek döngünün en yalın hâli); ancak soru (bilinen gerilimden bilinmeyen gerilimi bulmak), sayılar ve anlatılan nokta (kuralların karıştırılması) farklıdır. (Ses son metinle üretildiği için örnek artık değişmez.)

## 3. Hesap çıktısı (`python3 dogrula.py`, kesirli tam aritmetik)

```
Kural 1: +12 - 5 - V2 = 0  -> V2 = 7 V   (sabit, V2 katsayisi) = (Fraction(7, 1), Fraction(-1, 1))
Kural 2: -12 + 5 + V2 = 0  -> V2 = 7 V   (sabit, V2 katsayisi) = (Fraction(-7, 1), Fraction(1, 1))
Karisik (kaynak kural 1, direncler kural 2): +12 + 5 + V2 = 0 -> V2 = -17 V
Kural 2 denklemi = (-1) x kural 1 denklemi: dogru
Butun 8 kural atamasi (kaynak, R1, R2):
   (1, 1, 1) -> V2 = 7 V (tutarli)
   (1, 1, 2) -> V2 = -7 V (karisik)
   (1, 2, 1) -> V2 = 17 V (karisik)
   (1, 2, 2) -> V2 = -17 V (karisik)
   (2, 1, 1) -> V2 = -17 V (karisik)
   (2, 1, 2) -> V2 = 17 V (karisik)
   (2, 2, 1) -> V2 = -7 V (karisik)
   (2, 2, 2) -> V2 = 7 V (tutarli)
Fiziksel kontrol (I = 1; 2; 0,5 mA icin R1, R2 secildi): Vs = I*R1 + I*R2, V2 = 7 V
Dongu kapanmadan (kaynak + R1, kural 1) toplam = 7 V (sifir degil)
Ilk yorum sorusu: dogru V2 = 5 V; karisik kuralla V2 = -13 V
K1 ornegi: tutarli = 12 V; R1 ve X ters kuralla = 12 V (tesadufen ayni)
TUM KONTROLLER GECTI
```

Yapılan kontroller: (1) iki kuralla ayrı ayrı çözüm, ikisi de 7 V; (2) ikinci kuralın denklemi birincinin −1 katı; (3) üç eleman için sekiz kural ataması: yalnızca iki tutarlı atama doğru sonucu (7 V) veriyor, altı karışık atamanın hepsi yanlış (±7 V, ±17 V); videodaki karışım (kaynakta birinci, dirençlerde ikinci) −17 V; (4) bağımsız fiziksel kontrol: herhangi bir akım için R₁ = 5 V / I, R₂ = 7 V / I seçildiğinde kaynak gerilimi seri gerilimlerin toplamına eşit; (5) döngü kapanmadan toplanan gerilimler (kaynak ve R₁) sıfır değil (7 V); (6) ilk yorum sorusunun cevabı; (7) K1: videoda olmayan bir döngüde ters çevrilen terimlerin toplamı sıfırsa karışık kuralın tesadüfen doğru sonuç verdiği örnek (12 V = 12 V).

## 4. İddialar ve dayanakları

Alıntılar transkriptten, en fazla tek cümle.

| # | Metindeki iddia (ses / ekran / kart / açıklama) | Dayanak |
|---|---|---|
| 1 | Kapalı döngüde gerilimlerin toplamı sıfırdır ("eşittir sıfır"; açıklama maddesi 1) | Ders 4 [17:55–18:18], [19:05–19:28] ("around a loop the sum of the voltages has to be zero") |
| 2 | Döngü kapanmadan toplanan gerilimler sıfır olmak zorunda değildir (yalnızca açıklama maddesi 1; son seslendirmede bu cümle yok) | Ders 4 [19:28–19:50] ("if you stop somewhere in the middle the result is not correct"); hesap: kontrol 5 |
| 3 | İşaret için iki yaklaşım vardır ve aynı sonucu verir ("İkisi de olur"; kart maddesi 1) | Ders 4 [20:44–21:39] ("two different approaches of course with the same result") |
| 4 | Birinci kural: artıdan eksiye geçilirse eksi, eksiden artıya geçilirse artı | Ders 4 [21:39–21:55], [23:43–23:58] ("anytime we go from high potential to low potential that voltage will receive a negative sign") |
| 5 | İkinci kural: elemana girilen uçtaki işaret yazılır | Ders 4 [24:53–25:27] (karşılaşılan işaret eksi ise gerilim eksi, tersi de geçerli), [26:17–26:41] ("i am going this way and i see a positive sign"), [27:20–27:44]. "Girilen uç" ifadesi Razavi'nin "yolda gördüğün işaret" anlatımının Türkçe karşılığıdır: elemana girerken ilk karşılaşılan uç. |
| 6 | İki kural birbirinin tam tersidir; biri seçilir ve onunla devam edilir ("Yeter ki tek denklemde tek kural kullan"; kart maddesi 2) | Ders 4 [25:54–26:09] ("you pick one and you stay with it for the rest of your life") |
| 7 | İkinci kuralın denklemi birincinin −1 katıdır (açıklama maddesi 4: "birbirinin tam tersidir") | Ders 4 [27:44–28:00] ("it's just multiplied by minus one"); hesap: kontrol 2 |
| 8 | "Kaynağa seri iki direnç" — tek döngü, aynı akım | Ders 4 [4:02–4:19] (seri: tek ortak düğüm, aynı akım) |
| 9 | Aynı denklemde kurallar karıştırılırsa bu örnekte sonuç yanlış (−17 V) çıkar ("Şimdi karıştıralım… Bu yanlış."; açıklama: "kaynakta birinci, dirençlerde ikinci kural kullanılırsa") | **Çıkarım + hesap:** Razavi karıştırmanın sonucunu açık cümleyle söylemez; 6. satırdaki uyarıdan çıkar. Hesap: kontrol 3 (videodaki karışım −17 V; bütün karışık atamalar bu örnekte yanlış). Mutlak iddia yapılmadı: ses ve açıklama "bu örnekte" sonucunu söyler. |
| 10 | +12 V − 5 V − V₂ = 0, V₂ = 7 V; −12 V + 5 V + V₂ = 0, V₂ = 7 V; +12 V + 5 V + V₂ = 0, V₂ = −17 V | Hesap: bölüm 3 |
| 11 | Multimetre R₁ üzerinde 5,00 V gösterir (kırmızı uç "+" ucunda; video boyunca R₁'de kalır) | Verilen değer (V₁ = 5 V); hesap: kontrol 4 |
| 12 | Dirençlerin "+" ucu akımın girdiği uçtur; akım oku kaynağın artı ucundan R₁'e, R₂'ye ve eksi uca doğru (sahne planı; açıklamadaki "Önce bilmen gereken") | Ders 4 [36:41–37:23] ("the current enters the higher side"); Devredeki işaretler bu kurala uygun konuldu (kaynak dışarıya artı ucundan akım verir). |
| 13 | Açıklama: "Seri bağlı elemanlar aynı akımı taşır" | Ders 4 [4:02–4:19] |
| 13a | Açıklama: "Ohm yasasını eksi işaretsiz kullanmak için, direncin gerilimi akımın girdiği uç artı olacak şekilde işaretlenir" | Ders 4 [36:49–37:23]: Ohm yasası için direnç, akım yüksek potansiyelden düşüğe akacak biçimde çizilmişti; bu yüzden akımın girdiği uç artı işaretlenir ("the current enters the higher side"). "Eksi işaretsiz" ifadesi bu işaretlemeyle V = I·R'nin olduğu gibi yazılabilmesinin Türkçe özetidir (denetçi K5). |
| 14 | Elektronlar akımın tersi yönünde (kaynağın eksi ucundan çıkıp devreyi dolaşarak artı uca) | Kanal kuralı AGENT.md 2a-7 (önceki videolarda Razavi Ders 1'e göre doğrulanmış gösterim); bu çalışmada Ders 1 yeniden okunmadı. Seste ve yazıda iddia olarak geçmez. |
| 15 | İlk yorum sorusu (Ö3): 9 V kaynak, birinci dirençte 4 V; "Videodaki gibi kaynakta birinci, dirençlerde ikinci kuralı kullanan kaç bulur?" → doğrusu 5 V, bu karışımla −13 V | Hesap: kontrol 6 (karışık = −(9 + 4) V) |

Seste sıklık iddiası yok ("sık yapılan hata", "birçok öğrenci" gibi ifadeler kullanılmadı). Razavi'nin "this rule can be a little confusing" [20:44–20:52] sözü videoda sıklık iddiası olarak kullanılmadı; yalnızca nokta seçiminin gerekçesidir.

## 5. Gösterim kontrolü (AGENT.md 2d)

- Her denklem tek satırda; çarpma işareti gerekmedi ("·" ve "×" yok). Oklar kullanılmadı.
- Birim: V; sayılar tam olduğu için ondalık yalnızca multimetre ekranında (5,00 V, 7,00 V, virgülle).
- Ekran yazılarında ":" ve işaretler kelime yerine kullanılmadı ("Kurallar karışırsa", "Artıdan eksiye geçersen eksi" tam Türkçe).
- Büyük harf V baştan sona (doğru gerilim). V₁ ve V₂ yalnızca ekranda; seste karşılıkları "birincisinin uçlarındaki beş volt" ve "bilinmeyen gerilim".
- Seslendirme metninde rakam, "=", "+", "/", "-", parantez yok (otomatik kontrol).
- Dirençlerde renk bandı yok (değer verilmediği için bant–etiket çelişkisi oluşamaz).

## 6. Doğrulanamayan / açık kalan

- Karıştırmanın yanlış sonuç verdiği genel bir cümle olarak Razavi'de yok (satır 9: çıkarım + hesap).
- **Kuralları karıştırmak her devrede yanlış sonuç vermez; ters çevrilen terimlerin toplamı sıfırsa tesadüfen doğru çıkabilir. Metin bu yüzden yalnızca 'bu örnekte' iddiasında bulunur.** (Denetçi K1. Bu örnekte karışık kuralla ters çevrilen terimler +12 V ve +5 V gibi sıfırdan farklı bir toplam verdiği için bütün karışık atamalar yanlış çıkar; bkz. bölüm 3.)
- Süreler kelime ve hece sayısından tahmindir (113 kelime; ses ≈ 49,6–52,2 sn, kartla ≈ 56,6 sn); üretilmiş ses bu ajana ulaşmadı, ölçülmedi.
- Ses üretildi ama bu ajan dinlemedi/ölçmedi; "on iki", "on yedi", "eksi ucundan" okunuşu ve kesin süre Aşama 2'de kontrol edilir.
- Bağımsız denetim genel müdür tarafından yaptırıldı (kritik bulgu yok); bulguların uygulanışı `metin.md`'de. 2a-2 / 2a-3 istisnası için kanal sahibinin onayı bekleniyor (Ö4).
