# Doğruluk — Ders 2 - Bölüm 2/3 (metin sürüm 2)

Kaynaklar: B. Razavi, *Basic Circuit Theory*, Ders 2 (UCLA, `Hd0ZTXM572U`) transkripti [15:12–31:33] (kanal sahibinin özel Drive'ı, `1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`; 21.11.2026 02:15 UTC bu oturumda baştan sona okundu, depoya kopyalanmadı); İçerik Ajanı paketi `icerik.md` (sürüm 3, iki tur bağımsız denetimli) ve onun datasheet okumaları: TI INA180 (SBOS741H), TI LM358 (SLOS068AB). Sayıların hepsi `dogrula.py` ile (kesirli aritmetik) doğrulandı; çıktı: "TÜM KONTROLLER GEÇTİ".

**Datasheet erişimi (dürüstlük notu):** Bu oturumda TI PDF'leri açılamadı (web erişimi bu zamanlanmış çalışmada izinsiz; Drive'da kopya yok). Bu yüzden datasheet değerleri yalnızca `icerik.md` 5b'den (İçerik Ajanı ve denetçisinin 21.11 PDF okuması) alındı. Paketin bölüm 10 kuralı uygulandı: **LM358 "en az 25 V/mV / 4 kat" değeri metne girmedi**; yalnızca "tipik 100 V/mV" kaldı. LM358 giriş akımı (sütun ataması belirsiz) de kullanılmadı. 2. denetim: mümkünse PDF'leri açıp INA180 satırlarını (kazanç hatası ±%1, 0,5 V … V_S − 0,5 V, V_SP en kötü V_S − 0,03 V, I_IB 0,1 µA) ve LM358 A_OL "tipik 100 V/mV" atamasını gözle teyit etsin.

## İddia → dayanak

| Parça | İddia (metinde) | Dayanak |
|---|---|---|
| 2 | Bölüm 1'deki ideal gerilim kaynağı: uç gerilimi akıma bağlı değil; yatay doğru; akımı yük belirler | D2B1 metin P4 (Razavi [11:09–12:28]) |
| 2 | Bağımsız gerilim kaynağı: değeri devredeki başka hiçbir büyüklüğe bağlı değil; sabit ya da zamanla değişen; kaynak kendisi belirler; pil / işaret üreteci | [15:56–17:21] ("battery or some other voltage generator or signal generator… not affected by anything else") |
| 2 | "İdeal modelde" devrenin geri kalanından etkilenmez | [17:13–17:21]; ideal niteleme icerik.md "Kaynakta düzeltme" 3 |
| 3 | Bağımlı gerilim kaynağı: değeri başka bir büyüklüğe (gerilim ya da akım) bağlı | [17:35–18:01], [18:36–18:44], [19:57–20:12] |
| 3 | Kaynak başka bir yere bakar, oradaki değere göre üretir | [19:22–19:31] |
| 3 | Karışmasın diye ayrı sembol: eşkenar dörtgen, içinde + ve − | [18:11–18:36] |
| 3 | Doğrusal: k × v_x; v_x iki nokta arasındaki gerilim; k > 1 ya da < 1 | [18:53–19:40] |
| 3 | k birimsiz (V/V) | boyut analizi (V/V); icerik.md 4 |
| 3 | k eksi olabilir, işaret ters döner | [26:09–26:23] (−5v1: "changing its sign by multiplying by −1") |
| 3 | Akıma bağlı: r × i_x; r'nin birimi V/A = Ω; r bir direnç değil | [19:57–20:12] (akıma bağlılık); birim ve "direnç değil" ayrımı: boyut analizi + Ohm yasası tanımı (yalnızca direnç için, [3:16–3:33]); icerik.md 4 |
| 3 | Doğrusal olmayan: kontrol geriliminin karesiyle orantılı olabilir; yalnızca adıyla | [19:57–20:04] ("kvx squared") |
| 3 | Üç adım kuralı (kontrol tarafı kaynaktan etkilenmiyorsa) | Razavi örnekleri bu sırayla çözer [24:05–24:38]; icerik.md 4 |
| 3 | Kontrol büyüklüğü kaynağın kendisinden de etkileniyorsa denklemler birlikte; ileride, işlemsel kuvvetlendirici | icerik.md 4 (geçerlilik sınırı); op-amp serinin sonuna doğru ("toward the end of this course") [22:13–22:31]. Ders 3 - Bölüm 1 paketi bu cümleye köprü kuruyor (icerik 3-1, bölüm 4 "Çözüm kuralı") |
| 3 | Örnek 1 sayıları: 5 mA, 1,8 V, 2 mA | `dogrula.py` (özgün; icerik.md 7.1) |
| 4 | Kapalı anahtar = kısa devre (v = 0); açık = açık devre (i = 0) | D2B1 [7:26–8:04] |
| 4 | Açık anahtarda kaynağın 3 V'u anahtarda görünür (direnç 0 V) | Ohm v = R × i = 0; D2B1 örnek 1 ile aynı akıl yürütme (KVL adı geçmez) |
| 4 | Örnek 2 sayıları: kapalı 1 mA / 0 V / 0; açık 3 V / −12 V / −6 mA (okun tersine 6 mA) | `dogrula.py` (özgün; icerik.md 7.2) |
| 4 | En sık yapılan hata "tel yok, etki yok"; Doğrusu: bağıntıyla bağlı, gerilimi okur; oraya bir şey bağlı olup olmaması önemsiz | Razavi'nin uyarısı [25:19–25:43] ("not connected to anything should not be confusing… just looks at the voltage difference… doesn't care if something is connected here or not"); icerik.md 6 |
| 4, 6 | İdeal gerilimle kontrol edilen kaynak kontrol uçlarından akım çekmez; ideal kaynak kontrol tarafını etkilemez (akımla kontrol edilende kontrol kolu ideal tel gibi); etki tek yönlü | icerik.md 4 (VCVS geçerlilik sınırı); [25:35–25:43] |
| 5 | Bağımlı gerilim kaynağı tek parça olarak satılmaz | [21:15–21:24] |
| 5 | Ama kuvvetlendiricileri çözümlerken onu bir model olarak sürekli kullanırız; en basit modelde tek bir bağımlı kaynak | [21:24–22:40] ("very good model… e.g. amplifiers"); icerik.md 10 ifade notu |
| 5 | Kuvvetlendirici: işaretin şeklini koruyup ölçeklenmiş kopyası; ses / görüntü işareti | [29:01–29:10], [30:29–31:14] ("voice signal, video signal") |
| 5 | İçi transistörlü karmaşık devre, analizde tek bağımlı kaynakla temsil | [22:31–22:40] |
| 5 | Kuvvetlendirici modeli VCVS; kazanç birimsiz | [31:18–31:27]; boyut analizi |
| 5 | 20 mV × 50 = 1 V | `dogrula.py` (özgün; icerik.md 4) |
| 6 | Üç söz ve gerçek parçanın sınırları | icerik.md 5a |
| 6 | INA180A2: kazanç 50 V/V; kazanç hatası en çok ±%1 (V_OUT 0,5 V … V_S − 0,5 V) — sürüm 2: "doğruluk" değil "kazanç hatası"; toplam hata şönt toleransına da bağlı; çıkış V_S'yi geçemez, en kötü V_S − 0,03 V; I_IB "yaklaşık" 0,1 µA (V_SENSE = 0, V_IN+ = 0 V: alçak taraf; tipik/en çok sütunu teyit edilemedi, bu yüzden niteleyici "yaklaşık") | icerik.md 5b (SBOS741H s. 4, 7, 8; 8.3.4, 8.4.2). Bu oturumda PDF açılamadı (yukarıdaki not) |
| 6 | Gerçek kuvvetlendiricinin çıkış akımının da sınırı var (sayısız) | icerik.md 5b ve denetim 2. tur küçük notu |
| 6 | LM358 A_OL tipik 100 V/mV = 100 000 V/V; 10 V için 0,1 mV; 1 mV için model 100 V; 15 V beslemede imkânsız, çıkış sınıra yapışır (doyma) | icerik.md 5b (SLOS068AB 5.7 s. 10; koşul V_S = 15 V, V_O = 1 … 11 V); sayılar `dogrula.py` |
| 6 | Tipik değer, her parçada tam bu sayı değil; bu hâliyle kullanılmaz, dirençlerle kurulur (ileride) | "tipik" tanımı gereği; icerik.md 5c; Razavi op-amp ileride [22:13–22:31] |
| 6 | Mini tasarım: 0,1 V; 5 V; 3,27 V; 2,5 Ω; ≈ 1,3 A (1,308); 2,8 V; 100; 28 mΩ; 25 mΩ; 1,25; 2,5 V; 0,4 A; 0,8 A; 50 mV | `dogrula.py`; icerik.md 5d |
| 6 | Aşırı akımı fark etmeyen koruma: tasarımda pahalıya patlayan hata | icerik.md 5c |
| 7 | Yorum sorusu (İçerik Ajanı'nın sorusu; sayılar, kutuplar, sınırlar ve iki alt soru aynen; yalnızca seste simgeler adıyla: i_x "kontrol akımı", v_y "ortadaki direncin gerilimi", k "katsayı"; ekranda k, i_x, v_y aynen) | icerik.md 8; cevap `dogrula.py` (−3,6 mA geçersiz; k en çok 3,75). Cevap videoda verilmez |
| 7 | Sonraki bölüm: akım kaynağı (akımını kendisi belirler, gerilimini devre) | plan.md Bölüm 3/3; D2B3 metin (Razavi [36:41–38:35]) |

## Tutarlılık kontrolleri

- D2B1 ile: "×" çarpma; akımın referans yönü kaynağın + ucundan dışarı; anahtar etiketleri "kontak birleşik, iletiyor / kontak ayrık, akım yok"; açık anahtarda kaynak geriliminin anahtarda görünmesi aynı akıl yürütme. D2B1'in kapanış ön tanıtımı ("bağımsız ve bağımlı gerilim kaynakları, bağımlı bir kaynağın bir kuvvetlendiriciyi nasıl modellediği") bu bölümün konusuyla aynı.
- D2B3 ile: akım kaynağı sembolü (daire içinde ok) bu bölümde çizilmez; D2B3 "bağımlı akım kaynakları bir sonraki derste" der → bu bölümde bağımlı akım kaynağı anılmaz; kapanış "Üçüncü bölümde akım kaynağı" (D2B3 başlığı "Akım kaynağı").
- D3B1 paketi ile: eşkenar dörtgen + "+ / −" (gerilim), kontrol büyüklüğü bağımlı kaynakla aynı renkte (mavi), bağımsız kaynak siyah; "önce kontrol büyüklüğünü bul" kuralı; k birimsiz, r ohm; "kaynağın kendisinden etkileniyorsa birlikte çözülür, ileride" cümlesi; "kuvvetlendirici akımı büyütür" denmez. Hepsi metinde aynı.
- Ders 1 ile: açık devre i = 0, kısa devre v = 0 garantileri; Ohm yasası yalnızca direnç için; referans yönünün tersinde akan akım eksi işaretli (Ders 1 - Bölüm 1).
- Telif: Razavi'nin 3·v1 / −5·v1 / 10·v1 sayıları ve mikrofon/robot örnekleri kullanılmadı; −4, 360 Ω, 20 mV × 50 özgün.

## Denetim (yazan oturum, 21.11.2026 kredi sprinti; 2 tur, Agent aracıyla doktora düzeyi denetçi, metni görmemiş)

- **1. tur:** kritik yok. **7 önemli, hepsi düzeltildi:** (Ö1) cümle başında simge ("i iks, …", "k birden…", "r ise…"); (Ö2) yapay seste "v" harfinin "ve" bağlacıyla karışma riski → **seste tek harfli simge tamamen kaldırıldı** ("kontrol gerilimi", "kontrol akımı", "katsayı"; ekranda simge + adı); (Ö3) ondalık okunuşu ("üç virgül iki yedi" → "üç virgül yirmi yedi", D2B1 ile aynı); (Ö4) "her kuvvetlendiricinin içinde onu buluruz" kaynaksız mutlak ve D3B1'in akım kaynaklı kuvvetlendiricisiyle çelişir → "onu bir model olarak sürekli kullanırız"; (Ö5) işlemsel kuvvetlendiricinin iki girişi ve 15 V'un kaynağı söylenmiyordu → eklendi, ekrana sembol; (Ö6) 1,25'in birimi yoktu → 1,25 Ω (her amper için 1,25 V); (Ö7) Parça 1'de yük akımı oku maviydi (kontrol büyüklüğü sanılır) → siyah. **13 küçük** (0,4 A altı, "sürüm", V_S tanımı, v_x ekran formülü, anahtar etiketi biçimi, gerçek yön oku, "ör.", i_y/v_y çakışması, virgül, vurgu süresi notları, "datasheet", zaman damgası [19:57–20:04]; Uygulamada kısaltıldı) uygulandı; D3B1 paketine ilişkin not aşağıda.
- **2. tur:** kritik yok. **4 önemli, düzeltildi:** (Ö1) "kontrol ettiği yer" yönü ters söylüyordu (sol taraf kaynağı kontrol eder) → "baktığı yer"; (Ö2) "eksi bir katsayı" sesle −1 anlaşılabilir → "eksi katsayı çarpı ortadaki direncin gerilimi"; (Ö3) ekranda sol halka akımı ve yük akımı ikisi de "i" → "i_yük", "Sol halkanın akımı"; (Ö4) "kontrol tarafından akım çekmez" sözü akımla kontrol edilen kaynak için doğru değil → "kontrol tarafını etkilemez; gerilime bakıyorsa akım çekmez". Küçükler: "en basit modelde", 2,5 Ω seste birimli, Parça 5 grafiği −1,2 … 1,2 V, mini tasarım grafiği notu, v_R tanımı, hata çerçevesine ve diğer vurgulara ≥ 1,0 sn notu, Parça 1'de çizilecek satır açık, "v_1" kaldırıldı, alt simgeler motorla; dogruluk.md satırları güncellendi. Denetçi: "Ö1–Ö4 düzeltilince 2. bağımsız denetime hazır; yeni tur gerekmez."
- `dogrula.py`: TÜM KONTROLLER GEÇTİ (1.971 kelime, ~14,9 dk; Uygulamada 610 kelime: paketin ~550 hedefinin biraz üstünde, mini tasarımın bütün ara adımları ve iki denetçinin istediği açıklamalar için).
- **Açık (2. bağımsız denetim için):** (1) TI PDF'leri bu oturumda ve iki denetçide açılamadı (403 / izin); INA180 değerleri yalnızca paketten; I_IB 0,1 µA'nın tipik mi en çok mu olduğu paketle belirtilmemiş (metinde niteleme yok; PDF açılırsa "tipik olarak" eklenebilir). LM358 "en az 25 V/mV" bilinçli olarak dışarıda. (2) Yorum sorusu İçerik Ajanı'nınkiyle aynı (sayılar, kutuplar, iki sınır, iki alt soru); yalnızca seste simgeler adlarıyla. (3) `uzun/seri/soru-bankasi.md` main'de yok (İçerik Ajanı'nın işi).
- **İçerik Ajanı'na bilgi (D3B1):** D3B1 icerik.md 10 "Seste 'v iks', 'i iks' (D2B2 kuralı)" diyor; D2B2 metni bu yolu bıraktı (seste "kontrol gerilimi / kontrol akımı"). D3B1 paketi eşkenar dörtgen için H. Ma'yı "D2B2 ile aynı dayanak" diye anıyor; D2B2 metni Razavi [18:11–18:36]'ya dayanır, Ma kullanılmadı.

## 2. denetim (ayrı oturum, 21.11.2026 03:10–03:45 UTC kredi sprinti; metni yazmamış oturum)

Yapılanlar: Razavi Ders 2 transkripti (Drive) bu oturumda baştan sona okundu ([15:12–31:33] her iddia karşılaştırıldı; ayrıca Bölüm 1 [7:26–8:13] ve Bölüm 3 aralığı tutarlılık için); `icerik.md` (sürüm 3) baştan sona okundu; D2B1, D2B3 metinleri, D3B1 paketi, plan.md ve kurallar (UZUN.md sprint 1–5, 0, 2, 3, 5, Dil/Çizim/Vurgu süresi/Soru bankası; AGENT.md 2b, 2d, 2e, 2i; ICERIK.md 7a) okundu. Bütün sayılar iki kez bağımsız yeniden hesaplandı (bu oturum + doktora düzeyi denetçi alt ajanı, kesirli aritmetik): hesap hatası yok. İşaretler ve referans yönleri doğru (v_x + ucu dirence bağlı uçta; −12 V, −6 mA "okun tersine 6 mA"). Telif: Razavi'nin örnek ve sayıları yok. Yorum sorusu paketle aynı; çözüm tek (−3,6 mA, geçersiz; k en çok 3,75), orta–üst.

**TI PDF'leri bu denetimde de açılamadı** (web erişim izni zamanında cevaplanmadı; proxy 403). Datasheet değerleri paketten (5b) ve denetçinin bilgisiyle karşılaştırıldı (LM358 A_OL tipik 100 V/mV, 15 V; INA180 kazanç hatası tipik %0,1 / en çok %1, 0,5 V … V_S − 0,5 V; V_SP en kötü V_S − 0,03 V uyumlu). I_IB 0,1 µA'nın sütunu teyit edilemediği için metin "yaklaşık" der. **Ekrana konmadan önce (tahta aşamasında) SBOS741H s. 8 ve SLOS068AB s. 10 gözle teyit edilmeli.**

- **Kritik:** yok.
- **Önemli (3, düzeltildi):**
  - (Ö1) "Yüzde birlik doğruluk … 0,4 ile 2 A arasında garanti" kazanç hatasını toplam ölçüm doğruluğu gibi sunuyordu (veri sayfası yalnızca kazanç hatasını garanti eder; ofset ve şönt toleransı ayrıca eklenir: paket 5'teki en çok 150 µV ofset 0,4 A'de 10 mV şönt geriliminde tek başına %1,5). → Seste "yüzde birlik sınır", "yüzde birlik kazanç hatası garantisi … Ölçümün toplam hatası ayrıca şöntün kendi toleransına da bağlı"; ekranda "kazanç hatası en çok %1", "Toplam hata şöntün toleransına da bağlı". Ofset adı geçmez (paket kapsam dışı).
  - (Ö2) Parça 5 grafiğinde 20 mV'luk giriş, −1,2 … 1,2 V ekseninde görünmüyordu ("aynı şekil" gözle doğrulanamıyordu; AGENT.md 2e-1). → Ortak zaman eksenli iki küçük grafik (giriş −25 … 25 mV, çıkış −1,2 … 1,2 V), "Eksen ölçekleri farklı" etiketi; seste "tepe değeri yirmi milivolt".
  - (Ö3) INA180 giriş akımı niteliksiz veriliyordu; sütunu doğrulanamadı → "yalnızca yaklaşık sıfır virgül bir mikroamper" (ekranda "yaklaşık 0,1 µA").
- **Küçük (uygulandı):** Parça 1 "anahtar şu an kapalı" sesle söylendi; Parça 3 "ileride göreceğiz; en önemli örneği işlemsel kuvvetlendirici" (D3B1 bir örnek gösteriyor); Parça 4 "bağımlı kaynağın değeri sıfırdı", "Bu devrede etki tek yönlü"; mini tasarım (a) "her amper için iki virgül beş volt", "tavana takılır", birimli bölme; kural cümlesine alt sınır ödünleşimi; ekranda "Model geçersiz: 5 V beslemeden büyük (5 V > 3,3 V)" (2d-5); "30 mV = 0,03 V" dönüşümü; mini grafik 1,3 işareti ve tavan 3,27 V'ta, etiket çakışmasız; mini şemada v_şönt kutbu (+ motor tarafı) ve motor akımı siyah; Parça 7 tahta "i_yük" (P3–P4 ile aynı); "dört buçuk" → "dört virgül beş" (ekranla aynı); yanıp sönen fonlara ≥ 1,0 sn notu; LM358 paragrafında "tek başına değil" kısaltıldı, "Parçanın farklı kazançlı sürümleri var" → "Seçtiğimiz sürümde".
- **2. tur (aynı denetçi, yalnızca değişen yerler):** kritik yok; 1 önemli ("alt sınır" hem 0,5 V'luk çıkış sınırı hem garantinin başladığı en küçük akım anlamında kullanılıyordu → "garantinin başladığı en küçük akım büyür") ve 2 küçük ("sınırın … üst sınırı" tekrarı; ekranda kalan "Doğruluk sınırı" → "%1 garantisinin üst sınırı") düzeltildi; LM358 paragrafında "bunu ileride göreceğiz" kısaltıldı (aynı bilgi Parça 3'te). Denetçi: "PDF teyidi onay kartında açık madde olarak yazılınca metin onaya hazır."
- **Uygulanmayanlar (gerekçeli):** seslendirme bloğundaki "[SELAM …]" satırı D2B1/D2B3 ile aynı düzen (dogrula.py ve ses hazırlama bu satırı atlıyor); LM358 için "25 °C" ekrana eklenmedi (PDF teyit edilemedi).
- `dogrula.py` sürüm 2: TÜM KONTROLLER GEÇTİ (2.017 kelime, ~15,2 dk; Uygulamada 638 kelime, sınır 645: doğruluk düzeltmeleri kısaltmanın önünde tutuldu). Yeni assert'ler: "Yüzde birlik doğruluk" ifadesi yok, giriş akımı "yaklaşık", Parça 5 iki eksen görünürlüğü.
