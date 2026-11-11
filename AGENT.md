# Elektronik Shorts Ajanı: kurallar

Bu dosya ajanın kurallarıdır. Ajan her çalışmanın başında bu dosyayı baştan sona okur ve eksiksiz uygular.

> **ÖNCE HIZLI STOK KONTROLÜ (kredi tasarrufu — kanal sahibinin kararı).** Dosyanın geri kalanını okumadan önce yalnızca şunu yap:
> 0. **Başka bir çalışma sürüyor mu?** `git fetch origin` yap; `git log origin/main --since='40 minutes ago' --format=%s` ve `git ls-remote --heads origin 'claude/*'` çıktısında `wip/` ilerlemesi (ör. "render parçası", "senaryo", "ara kayıt") varsa başka bir çalışma o videoyu üretiyor demektir. Aynı işe dokunma: panelde `bolumler`'e `sonuc: "atlandı"`, not "önceki çalışma sürüyor" yaz ve dur.
> 1. `konular.md`'de durumu `yeniden düzenle` veya `yarım kaldı` olan satır, ya da `wip/` altında yarım iş var mı bak. Varsa bu kutuyu atla ve dosyanın tamamını oku.
> 2. Yoksa Metricool `getBrandSettings` ile `youtubeData == "UCAvE1cKeoIbIXCyIks-U81w"` markasını bul, `getScheduledPosts` (`timezone: Europe/London`, bugünden 14 gün sonrasına) ile bu kanalın yayın bekleyen, taslak olmayan YouTube gönderilerini say.
> 3. **2 veya fazlaysa:** yayın saati geçmiş `planlandı` kayıtlarını `yayında`/`yayınlandı` yap (bölüm 9), panelde `bolumler`'e tek satırlık `sonuc: "stok dolu"` kaydı yaz, `konular.md`/`gunluk.md` değiştiyse commit + push et ve **dur**. Uzun açıklama yazma; son mesaj tek satır: "Stok dolu (2 video), yeni video üretilmedi."
> 4. 0 veya 1 ise dosyanın tamamını oku ve bölüm 11'deki akışa geç.
Kuralları kanal sahibi (kullanıcı) belirler; genel müdür (Claude) bu dosyaya işler. Ajan bu kuralların dışına çıkmaz.

## 1. Kimlik ve hedef

- Kanal: **Öğr. Gör. Nuray SAĞLAM**, @NuraySaglamBedir. YouTube kanal kimliği: `UCAvE1cKeoIbIXCyIks-U81w`
- Her Short, konu listesindeki **bir** konuyu, izleyicinin videodan anlayabileceği şekilde anlatır. Dil **Türkiye Türkçesi**; ondalık ayırıcı virgül (4,7 kΩ), birimler SI.
- **Görsel hedef:** Temiz, minimalist, yüksek kaliteli 3D eğitim animasyonu (Tracing Science seviyesi). Koyu, mat, nötr bir zemin üzerinde gerçek görünümlü bileşenler (bakır tel, pil, direnç, anahtar, ampul, LED, kondansatör). Metal yansımaları, yumuşak gölgeler, ışık efektleri (parlayan ampul, ışıklı yükler) koyu zeminde öne çıkar. Kamera yavaş ve akıcı hareket eder.
- **Animasyon anlatır, yazı doğrular** (bölüm 2a). Video, sesi kapalı ve yazıları okumadan izlense bile konuyu animasyonla öğretmelidir.
- Başka kanalların görünüşü, logosu, karakterleri veya müziği kopyalanmaz.

## 2. Kullanıcının ilk denemede bulduğu hatalar (asla tekrarlama)

Genel müdürün yaptığı ilk deneme videosu (`scenes/deneme-faraday.js`) kanal sahibi tarafından **reddedildi**. O dosya yalnızca kod yapısına örnektir; görsel ve anlatım kalitesi için örnek DEĞİLDİR. Reddedilme sebepleri, her videoda kontrol edilecek kurallardır:

1. **Çok kısaydı.** Video konuyu anlatmaya yetecek uzunlukta olmalı. Süreyi konu belirler: 15 saniye de olabilir, 90 saniye ya da daha uzun da. Süreyi doldurmak için tekrar ve boş sahne eklenmez; konuyu kısaltmak için gerekli bilgi de atlanmaz.
2. **Konu ve çözümler doğru olmalı.** Tanımlar, formüller, sayılar ve gösterilen davranışlar hatasız olmalı.
3. **Görsel bozukluk olmamalı.** Titreme, nesnelerin iç içe geçmesi, kesilen yazı veya nesne, yanlış yerde duran parça, ani zıplama, okunmayan yazı olmamalı.
4. **Rahatsız edici tiz sesler ve yüksek sesler olmamalı.** Keskin "bip", "ding", çınlama, cızırtı, ani yüksek efekt kullanılmaz. Efektler yumuşak ve düşük seviyede, müzik konuşmanın altında kalır.
5. **Kurgu doğru olmalı.** Sahneler mantıklı sırayla ilerler; her yazı ekrandaki görüntüyle aynı anda aynı şeyi anlatır. Bir kavram gösterilmeden ondan bahsedilmez.
6. **Yazıların boyutu, rengi ve konumu doğru olmalı.** Telefonda rahat okunur, nesnelerin üstüne binmez, bir anda ekranda en fazla 2 satır.
7. **Konu anlaşılır anlatılmalı.** Konuyu hiç bilmeyen bir lise öğrencisi videoyu izleyince anlamalı.
8. **Türkçe seslendirme yeterince doğal değildi.** Kanal sahibinin kararı: videolarda **insan sesi / seslendirme kullanılmaz.** Anlatımı ekranda akan yazılar yapar (bölüm 6).

9. **Yazılar çok yukarıdaydı;** telefonun üstteki sabit ikonlarının (geri, arama, menü) altına denk geldi. Üst %10'a hiçbir şey konmaz (bölüm 4).
9a. **Yazılar YouTube arayüzüyle çakıştı ve taştı (Gerilim, 09.11.2026):** alttaki etiketler kanal adı/başlık alanına düştü, uzun üst yazı ekran kenarından taştı. Bölüm 4'teki güvenli alan ve otomatik kontrol zorunlu.
10. **Üst kısım okunsun diye karartılmıştı ama bu devrenin görünürlüğünü azalttı.** Karartma katmanı/gradyan kullanılmaz. Zemin rengi ve yazı stili, devre ve yazılar karartmasız da net görünecek şekilde seçilir (bölüm 4).
11. **İzleyicinin odağı animasyondan çok yazılara kayıyordu;** bu öğreticiliği düşürdü. Anlatılanlar yazıyla değil animasyonla anlatılır (bölüm 2a).
12. **Devre elemanlarının gerçek hayatta neyi temsil ettiği anlaşılmıyordu.** Her videoda kavramın gerçek hayattaki karşılıkları kodla çizilmiş 3D mini modellerle gösterilir (bölüm 2a).
13. **Video çok uzundu, çok fazla bilgi vardı.** Her video tek kavram, az bilgi; hedef süre 30–60 sn. Bir konu fazla bilgi içeriyorsa kanal sahibine panelden bölmeyi öner (bölüm 13).

## 2a. Görsel öğretim kuralları (kanal sahibinin kararı — her videoda zorunlu)

1. **Animasyon anlatıcıdır.** Her fikir önce animasyonla gösterilir: değişen bir şey (gerilim, direnç) ve onun sonucu (akımın hızı/yoğunluğu, ampulün parlaklığı) aynı anda, gözle görülür biçimde. Örnek: gerilim artar → yükler hızlanır, ampul parlaklaşır; gerilim azalır → yükler yavaşlar, ampul söner gibi olur. Direnç artar → yol daralır/akış seyrekleşir, ampul kararır; direnç azalır → akış yoğunlaşır, ampul parlar.
2. **Yazı yalnızca doğrulama içindir.** Animasyon bir şeyi gösterdikten **sonra**, 1–4 kelimelik kısa etiket olarak gelir (ör. "Gerilim ↑ → Akım ↑"). Yazı animasyonla aynı anda değil, ardından gelir. Uzun cümle yok. Bir anda en fazla 1 satır etiket + gerekirse nesne üstü değer etiketleri (9 V, 450 Ω).
3. **Yasa ve formül en sonda.** Kural/yasa (ör. Ohm yasası, V = I × R) videonun sonunda, animasyon her şeyi gösterdikten sonra yazıyla verilir.
4. **Gerçek hayat bağlantısı her videoda.** Kavramın gerçek hayattaki karşılıkları **kodla çizilmiş 3D mini modeller** olarak ekrana gelir (fotoğraf, telifli görsel, yapay zekâ görseli yok). Örnekler: gerilim kaynağı → AA pil, 9 V pil, telefon bataryası, araba aküsü, PSU (bilgisayar güç kaynağı), priz adaptörü; direnç → ısıtıcı teli, ampul, ütü, telefon şarj eden bir cihaz ("akım çeken her cihazın bir direnç eşdeğeri vardır"); akım → kablodan akan yükler, açılan bir lamba. Mini modeller sahnede küçük kartlar/platformlar üzerinde sırayla belirir ve sonra devredeki sembolle eşleşir (ör. bir pil modeli devredeki pile dönüşür).
5. **Metafor kullanılabilir** (ör. direnç = dar boru / kalabalık koridor, gerilim = su basıncı / tepeden aşağı itme). Metafor animasyonla gösterilir ve hemen ardından gerçek devreyle eşleştirilir.
6. **Örnek animasyondaki öğeler (kanal sahibinin referansı):**
   - Pil, bakır teller, anahtar ve ampulden oluşan basit devre; koyu arka plan, ışık efektleri öne çıkar.
   - Tellerin içinde küçük, ışıklı parçacıklar pürüzsüz ve sürekli bir döngüde akar.
   - **Anahtar mekanizması:** anahtar fiziksel olarak kapanır; kapanınca parçacıklar akmaya başlar.
   - **Geri bildirim:** devre tamamlanınca ampul karanlıktan sıcak sarı ışığa geçer; parlaklık akımla orantılıdır.
   - **Potansiyel farkı:** gerilim gösterilirken tel içinde renk geçişi kullanılır (pilin + ucundan − ucuna doğru yüksek potansiyelden düşük potansiyele, ör. sarıdan koyu turuncuya).
7. **Akım yönü (kanal sahibinin kararı):** Parçacıklar **elektron** olarak gösterilir ve gerçek elektron yönünde (pilin − ucundan + ucuna) akar. Ayrıca + → − yönünde ayrı renkte bir **geleneksel akım oku** gösterilir. İkisi ilk göründüğünde kısa etiketle ayrılır ("elektronlar", "akım yönü"). Bu kural "akımı küreler + → − akar" yazan eski kuralların yerine geçer.
8. **Yazı animasyonu — kalemle yazılıyor gibi (kanal sahibinin kararı).** Ekran yazıları bir anda belirmez; harf harf, kalemle yazılıyormuş gibi soldan sağa çizilerek gelir (her harf kısa bir çizgi/iz animasyonuyla). Hız: kelime başına yaklaşık 0,25–0,35 sn. Yazı tamamlandıktan sonra okuma süresi (bölüm 6) başlar. Bu efekti `tools/lib/anlatim.js`'e ortak fonksiyon olarak ekle ve tüm videolarda kullan.
9. **Tempo — acele yok (kanal sahibinin kararı).** Videolar hızlı ilerliyordu, geçişler anlamayı zorlaştırıyordu:
   - Sahne **içindeki** animasyonlar (direnç eklenmesi, ampulün kararması, yazının yazılması) yavaş ve yumuşak (ease-in-out, en az 1,2 sn); kamera hareketleri yavaş. Sahneden sahneye geçiş ise hızlıdır (kural 15).
   - Her önemli animasyon olayından (ör. direnç eklendi, ampul karardı) sonra izleyicinin sonucu görmesi için en az 1,5 sn bekle.
   - Bir anda tek değişiklik; iki olay üst üste binmez.
   - Süre konuya göre 45–90 sn. **90 saniye kesin üst sınırdır (kanal sahibinin emri, 09.11.2026):** 90,0 sn'yi aşan video kalite kontrolünden geçemez; senaryo aşamasında süreyi hesapla, gerekirse bir sahneyi sadeleştir veya konuyu iki videoya bölmeyi panelden kanal sahibine sor.
10. **Açıklayıcı yazı ne zaman uzun olabilir:** Animasyonun gösterdiği sebep-sonuç zincirini (ör. toplam direnç artar → akım azalır → ampul gerilimi azalır → ampul kararır) sahnenin sonunda adım adım, kalemle yazılarak ve her adım ayrı satırda gösterebilirsin. Her adım ilgili görsel vurguyla (ok, parlama) eşleşir. Bu bölüm dışında yazılar kısa etiket olarak kalır.
11. **Kaynak:** Her konuya başlamadan önce `kaynaklar.md`'ye bak. Kanal sahibi bir konu için kaynak bağlantısı verdiyse (orada veya konular.md'de), senaryodan önce o kaynağı oku (WebFetch) ve senaryoyu onunla tutarlı yaz; okunan kaynağı `dogruluk.md`'ye yaz. Kaynağa erişilemiyorsa panelde not düş ve kanal sahibine bildir (ağ izni gerekebilir: `en.wikipedia.org`).
12. **Analoji fizik açısından doğru olmalı.** Bir benzetme (boru, su, koridor) yanlış bir fiziksel izlenim bırakmamalı; benzetmenin sınırı varsa animasyonu doğru davranışa göre kur (ör. seri devrede akım her yerde aynıdır).
13. **Durağan an yok (kanal sahibinin emri).** Videoda her şey animasyonlu olmalı; hiçbir kare donuk görünmemeli. Bekleme ve okuma anlarında da sahne yaşar: elektronlar akmaya devam eder, kamera yavaşça kayar/döner (dolly, orbit), ampul hafifçe titreşir, sıvı akar, ışık ve gölge kıpırdar. Yazı yazılırken arkadaki animasyon durmaz. Sahne geçişleri kural 15'e göre hemen olur. Kalite kontrolünde (bölüm 7 B) ardışık iki kare arasında hareket olmayan 0,5 sn'den uzun bir aralık varsa hata say ve düzelt (ör. `ffmpeg -vf freezedetect=n=0.001:d=0.5`).
14. **Analoji ilhamı:** Kanal sahibi bir kaynak verdiyse benzetmeler için de o kaynaktan ilham al (ör. Wikipedia "Resistor" sayfasındaki hidrolik benzetme ve direnç yapısı görselleri); kaynaktaki görselleri kopyalama, fikri kodla çizilmiş 3D animasyona çevir.
15. **Sahne geçişi: aynı ekranda, hemen (kanal sahibinin emri, 08–09.11.2026).** Bir görüntüden diğerine (ör. devre → analoji → günlük hayat örnekleri) geçiş aynı ekranda, aynı kadrajda ve **hemen** olur: eski görüntü kaybolur, yenisi aynı yerde belirir; toplam geçiş en fazla 0,3 sn (doğrudan kesme veya çok kısa çapraz solma). Yasak olanlar: ekranı/kamerayı sağa-sola veya yukarı-aşağı kaydırmak, yeni sahnenin yandan/alttan kayarak gelmesi (Direnç 2. sürümündeki hata), eski görüntünün **uzaklaşarak/küçülerek yok olması**, yeni görüntünün **yakınlaşarak/büyüyerek gelmesi** (Akım videosundaki hata), kamera uçuşu, dönüşerek geçiş. Kamera yalnızca sahne içinde, yerinde çok yavaş yaşar (kural 13); kadraj sahneden sahneye taşınmaz. Kalite kontrolünde her sahne geçişinin ±0,5 sn çevresinden kare alıp kayma, uzaklaşma/yakınlaşma olmadığını ve geçişin ≤ 0,3 sn sürdüğünü kontrol et. Not: hemen geçiş "durağan an" sayılmaz; yeni sahne açılır açılmaz kendi animasyonu başlar.
16. **Anlatımın bütünlüğü (kanal sahibinin emri, 08.11.2026).** Birbiriyle ilişkili bilgi yazıları mümkün olduğunca aynı ekranda birlikte kalır: yeni satır öncekinin altına eklenir, önceki satırlar kaybolmaz; bir düşünce (ör. sebep-sonuç zinciri, bir kuralın parçaları) bitene kadar yazılar ekranda birikir, sonra birlikte yerinde silinir. Yazılar animasyonun önüne geçmez: ana nesnenin üstüne binmez, onu kapatmaz; yer gerekiyorsa nesne yerinde hafifçe küçülür veya yazı bandı (y %12–26) en fazla y %34'e kadar genişler (bölüm 4 güvenli alan). Bir yazı gösterilip hemen silinip ilgili yazı başka bir anda tekrar gelmez; akışı bölen ara sahne/ara yazı yoktur.

## 2b. Seviye ve içerik (kanal sahibinin emri, 11.11.2026 — her videoda zorunlu)

Kanal sahibi "Elektrik yükü, akım ve gerilim" videosunu "aşırı basit, 10 yaşında çocuğa anlatır gibi" bulup geri çevirdi. **İzleyici üniversite öğrencisidir** (Temel Elektronik / Devre Teorisi I dersi; mühendislik birinci sınıf). Kurallar:
1. **Seviye:** Ortaokul düzeyi benzetmeler (balon-yün, "atomda proton ve elektron var") ve "ampul parlar/söner" üzerine kurulu anlatım yok. Devre şeması dili kullanılır: düğüm, kol, referans yönü, işaret (+/−), ideal kaynak, i(t) ve v(t) grafikleri, birimler. Formüller doğru biçimde (i = dq/dt, q = ∫i dt, V = IR …) ve gerçek sayılarla. 3D animasyon hâlâ ana anlatıcıdır; ama öğrettiği şey ders düzeyindedir (ör. i(t) grafiğinin altındaki alanın yük olarak dolması, referans yönü ters çevrilince işaretin değişmesi).
2. **Her videonun omurgası "bilinen bir yanlış" veya "az bilinen önemli nokta":** Senaryo, öğrencilerin sık yaptığı bir hatayı veya gözden kaçırdığı kritik bir noktayı merkeze alır. Kanca bu yanlışı soru olarak sorar (ör. "Açık devrede gerilim sıfır mı?"), animasyon doğrusunu gösterir. Her videoda 1, en fazla 2 böyle nokta; `senaryo.md`'nin başına "Vurgulanan yanlış/nokta: …" yaz.
3. **Kaynak zorunlu, uydurma yok:** Ana kaynak Prof. Behzad Razavi'nin "Basic Circuits" ders serisidir (`kaynaklar.md`'deki tablo: ders N = konu N+5). Senaryodan önce ilgili dersin transkriptini vidIQ `vidiq_video_transcript` ile al; vurgulanacak noktayı bu dersin içinden seç; `dogruluk.md`'ye her iddianın dayandığı transkript zaman damgasını yaz (ör. "[18:29] açık devre yalnızca I=0'ı garanti eder"). Transkriptte olmayan bir iddia kullanılacaksa Wikipedia veya Razavi'nin kitaplarıyla doğrula ve kaynağını yaz; doğrulanamayan bilgi videoya girmez. Transkript alınamazsa panele yaz ve o konuyu üretme (`inceleme`).
4. **Telif:** Razavi'nin anlatımından fikir ve kavram alınır; slaytları, çizimleri, uzun alıntıları kopyalanmaz. Açıklamanın sonuna kısa atıf eklenir: "Kaynak: B. Razavi, Basic Circuits, Ders N".
5. **Bağımsız denetim (bölüm 7 A) seviyeyi de denetler:** denetçiye "bu video üniversite birinci sınıf devre teorisi öğrencisine yeni ve önemli bir şey öğretiyor mu, yoksa lise/ortaokul düzeyinde mi?" sorusunu da sor; "lise/ortaokul" cevabı → senaryoyu yeniden yaz.
6. Konu 2–5 (4'lü temel seri) kanal sahibinin isteğiyle daha temel düzeyde yapılmıştı; bundan sonraki bütün videolar bu bölüme uyar.

## 3. Teknik hat (değiştirme)

| Adım | Araç |
|------|------|
| Sahne | three.js (WebGL), `tools/vendor/three` (r185, depoda; internetten indirme) |
| Ortak yapı taşları | `tools/lib/stage.js`: stüdyo, masa, malzemeler, `coil`, `wire`, `charges`, `magnet`, `led`, `pcb`, `orbit`, `text` |
| Kare kare çalıştırma | `tools/render.mjs`: başsız Chromium (Playwright), her kare PNG, ffmpeg ile 1080×1920 H.264 |
| Müzik ve efekt | `tools/audio.py`: numpy ile sentez; efektler sahnenin `meta.cues` zamanlarına yerleşir |
| Seslendirme | **Yok.** Kanal sahibinin kararı; Piper ve başka TTS kullanılmaz (bkz. 6) |

Ekran kartı yok; WebGL işlemcide çalışır. **Denemeler düşük çözünürlükte, son render bir kez:**
- Kare kontrolü: `node tools/render.mjs <sahne> --scale 0.4 --stills 1,4,8,... --out /tmp/k.png`, sonra görseli Read ile incele. Görsellere bakmak pahalıdır: bir kontak sayfasında 6–8 an, render öncesi en fazla 2 sayfa.
- Hareket kontrolü: `--preview` (540×960, 15 fps, sessiz) ile render alıp 1 saniye aralıklı kareleri kontrol et.
- Son render: `node tools/render.mjs <sahne> --out media/<video-id>/<video-id>.mp4` (sesli).
- **Performans:** `transmission` malzemesi kullanma; kare süresini 3 katına çıkarır. Tam çözünürlükte kare başına ~1,5–3 sn beklenir.
- **Render beklerken kredi harcama (kanal sahibinin kararı):** Render'ı arka planda başlat, sonra render bitene kadar dönmeyen **tek bir** bekleme komutu çalıştır (ör. `until [ -f <çıktı> ]; do sleep 30; done`, zaman aşımı en fazla 10 dk). Ara ara "bitti mi" diye kontrol etme, ilerleme çıktısını tekrar tekrar okuma, beklerken mesaj yazma. 10 dakikayı aşan render'ı zaten parçalara bölüyorsun (bölüm 3a); her parça için bir bekleme komutu yeterli.

Sahne dosyası şu şekli dışa aktarır:
```js
export const meta = { title, duration, fps: 30, music: { off: true }, cues: [{ t, kind, gain }] };
export function build(S) { /* nesneleri kur */ return (t) => { /* t anındaki durum */ }; }
```
Zaman deterministiktir: `Date`, `Math.random`, `requestAnimationFrame` kullanılmaz; rastgelelik için `S.rng(seed)`.
**Ortak parçalar (kredi tasarrufu — kanal sahibinin kararı):** Her videoda sahneyi sıfırdan yazma.
- Yeni sahneye başlamadan önce `tools/lib/` altındaki hazır parçaları oku ve kullan; yalnızca konuya özgü kısmı (hikâye, hesap, yeni bir bileşen) yaz.
- Tekrar eden her şey `tools/lib/`'dedir veya oraya taşınır: pil, direnç (renk kodlu), tel ve devre yolu kurma, akan yük küreleri, LED/ampul, kondansatör, bobin, etiket, **akan ekran yazısı (anlatım) yöneticisi**, okuma süresi hesabı ve `console.assert` kontrolü, kamera hareketleri, efekt zamanlaması.
- **Bu çalışmada** (stok kontrolü 0 veya 1 çıktıysa): 001 ve 002 sahnelerinde ortak olan parçaları `tools/lib/` altında modüllere taşı (ör. `tools/lib/parcalar.js`, `tools/lib/anlatim.js`), her fonksiyonun üstüne bir satır kullanım notu yaz. 001 ve 002'nin sahne dosyalarını değiştirme (bitmiş videolar). Taşıma bitince bu maddeyi kendin `tools/lib/README.md`'ye "nerede ne var" listesi olarak yaz.
- Yeni bir yapı taşı gerekirse sahne dosyasında yaz; ikinci kez gerekirse `tools/lib/`'e taşı.

## 3a. Zaman bütçesi ve parça parça render (zorunlu)

Bir çalışma yaklaşık 30–40 dakikada kesilebilir. Uzun bir video tek çalışmaya sığmaz; iş birden çok çalışmaya yayılır ve **hiçbir iş kaybolmaz**:

1. **Ara kayıt:** Çalışma başladıktan sonra en geç her 20 dakikada bir: `wip/<id>/`'deki her şeyi commit edip `claude/<id>` dalına push et, `NOTLAR.md`'ye "nerede kaldım, sıradaki adım" yaz, panelde `bolumler`'e (aynı çalışmanın belgesini güncelleyerek) `sonuc: "yarım kaldı"` ve kısa not yaz.
2. **Parça parça render:** Son render'ı tek seferde alma. Sahneyi 15–20 saniyelik parçalara böl:
   `node tools/render.mjs <sahne> --from <bas> --to <bit> --no-audio --out wip/<id>/parca-NN.mp4`
   Her parça bitince hemen commit + push et ve `NOTLAR.md`'de işaretle (`parca-03: tamam`). Parçalar küçük, sessiz MP4'lerdir; depoya konabilir.
3. **Devam:** Her çalışmanın başında `wip/` ve `NOTLAR.md`'yi oku; yarım işi kaldığı yerden sürdür (yeni konuya geçme).
4. **Birleştirme:** Tüm parçalar hazır olunca ffmpeg concat ile birleştir, animasyon seslerini (`tools/audio.py`) ekle, `loudnorm` uygula → `media/<id>/<id>.mp4`. Sonra kalite kontrolü (bölüm 7) ve yayın.
5. Parçalar ve kalite kontrolü bitip video yayınlanınca `wip/<id>/parca-*.mp4` dosyalarını sil (kontrol belgeleri kalır).
6. Kesilmeden önce yetişemezsen bile son ara kayıt zaten yapılmış olmalı; kanal sahibi panelde işin nerede olduğunu görür.

## 4. Ekran düzeni (9:16) — GÜVENLİ ALAN (kanal sahibinin emri, 09.11.2026)

Kanal sahibi yayındaki Gerilim videosunda iki hata buldu: (1) alttaki yazılar ("pompa", "düşük/yüksek basınç", "şarj adaptörü", "araba aküsü") YouTube'un kanal adı, video başlığı ve "Buy Super Thanks" alanıyla çakıştı; (2) üstteki uzun yazı ("Uçlar arasında potansiyel farkı var") ekrana sığmadı, kenardan taştı. Bundan sonra şu ölçüler zorunludur (yüzdeler 1080×1920 kareye göre):

**Güvenli alan (her yazı ve her etiket bunun içinde kalır):**
- **Üst:** y %0–11 boş (telefon ve YouTube üst ikonları).
- **Alt:** y %68–100 boş: **hiçbir yazı, etiket veya sayı alt %32'ye girmez** (YouTube kanal adı, başlık, açıklama, Super Thanks, alt menü). Ana nesneler en fazla y %72'ye kadar inebilir; alttaki %28 yalnızca zemin ve önemsiz süs.
- **Sağ:** x %86–100'e yazı ve etiket girmez (beğen/yorum/kaydet/paylaş düğmeleri, y %50'nin altında). Ana nesneler de y %50'nin altında x %86'yı geçmez.
- **Sol:** x %0–6 boş.
- Böylece yazı alanı: x %6–86 (genişlik %80), y %11–68. Ana sahne (devre, boru, örnek nesneler) y %20–68 arasına sığacak şekilde ölçeklenir; gerekirse sahne küçültülür veya etiketler nesnenin yanına/üstüne (alta değil) konur.

**Üst yazılar:**
- Bant: y %12–26. En fazla 2 satır (kanca başlığı en fazla 3 satır).
- **Hiçbir satır yazı alanını (genişlik %80 = 864 px) aşmaz.** `tools/lib/anlatim.js` (ve diğer yazı yardımcıları) yazıyı yazmadan önce genişliğini ölçer; sığmıyorsa önce kelime sınırından 2 satıra böler, yine sığmıyorsa punto küçülür. Punto: ana yazı en fazla 6,5 vw, en az 4,5 vw; açıklama satırı 4–5 vw; etiket en az 3,5 vw. Yazı hiçbir zaman ekran kenarında kesilmez.
- Yazıları kısa tut (ana satır ≤ 24 karakter hedef); uzun cümle yerine iki kısa satır.

**Etiketler (nesne üzerindeki yazılar):** Nesnenin üstüne veya yanına konur, altına değil; alt %32'ye ve sağ %14'e düşüyorsa başka tarafa alınır. Kamera hareketinde titremez.

**Otomatik kontrol (bölüm 7 B'ye eklenir, her videoda zorunlu):** Render betiği her 0,5 sn'de bir karede `#overlay` içindeki tüm görünür yazı öğelerinin `getBoundingClientRect()` kutularını ve 3D etiketlerin ekran izdüşümünü ölçüp `wip/<id>/guvenli_alan.json`'a yazar. Tek bir kutu güvenli alanın dışına taşarsa veya bir satır 864 px'i aşarsa video kalite kontrolünden **geçemez**; düzelt ve yeniden render et. Ayrıca kanca, her sahnenin ortası ve son kare için `tools/lib`'e eklenecek bir "YouTube arayüzü maskesi" (alt %32 ve sağ düğme sütunu yarı saydam kırmızı) üst üste konmuş kontrol kareleri üret ve gözle bak.

**Diğer:**
- Vurgu renkleri: `hl` sarı, `rd` kırmızı, `gr` yeşil, `bl` mavi, `cu` bakır. Aynı kavram her yerde aynı renkte (gerilim hep sarı, akım hep kırmızı, direnç hep mavi).
- **Zemin:** Koyu, mat, nötr zemin; karartma katmanı veya gradyan yok. Yazılar kendi kontur/gölgeleriyle okunur.
- Yazı hiçbir zaman ana nesnenin üstüne binmez.
- Formüller tek satır (`nowrap: true`) ve yine 864 px'i aşmaz (aşarsa punto küçülür).

## 4a. Referans stil (kanal sahibinin örnek gösterdiği sayfalar: Hardwired, Mr. Integral, 3DIoT Education)

Bu sayfaların **tarzından** öğren; logolarını, karakterlerini, başlıklarını, görsellerini kopyalama. Ortak özellikler ve bizim uygulamamız:
1. **Merak uyandıran soru kancası.** Başlık kısa bir soru veya bilmece: "Neden direnç?", "Yarısı mı, çeyreği mi?", "Hangisi yanlış?", "Büyük kondansatör, yine dalgalanma?". İlk 1–2 saniyede ekranda, 2–3 satır, çok kalın (InterDisplay Black), **tek anahtar kelime vurgu renginde** (sarı/pembe/camgöbeği). Bu kanca yazısı kural 2a'daki "önce animasyon" kuralının istisnasıdır: soruyu sorar, cevabı animasyon verir.
2. **Bilmecenin alt satırı.** Görselin altında küçük, ince bir satır problemi somutlaştırır: "Teli iki kat uzat", "On iki tane 1 Ω direnç, ama sonuç 0,833 Ω". Somut sayılar ve sınav sorusu havası kullan.
3. **Zemin:** Çok koyu (siyah / koyu yeşil-siyah / koyu lacivert) mat zemin; çok silik ızgara çizgileri veya silik PCB izleri olabilir (opaklık ≤ %8, dikkat dağıtmaz). Gradyan karartma yine yok.
4. **İki görsel dil, birlikte:** (a) Gerçekçi 3D parçalar: renk bantlı direnç, TO-92 transistör, PCB üzerinde çip ve yanan LED, multimetre; (b) ince neon çizgili şema: camgöbeği/sarı devre çizgileri, değer etiketleri (12 V, 1 kΩ, 50 Hz), osiloskop eğrisi (eksen değerleriyle), ölçü aleti ekranında sayı. 3D sahneden şemaya (ve geri) hareketli dönüşüm güçlü bir geçiştir.
5. **Ölçüm ve sayı:** Mümkünse multimetre/osiloskop ekranında gerçek değer göster; değer animasyonla değişir (ör. direnç artınca ampermetre 0,50 A → 0,25 A).
6. **Seri etiketi:** 4'lü seride ve derslerde üst köşede küçük "BÖLÜM 2" / "DERS 1" etiketi; küçük kategori etiketi ("ELEKTRONİK") kullanılabilir. Üst %10'a girmez.
7. **İlk kare kapak gibi çalışır:** Profil ızgarasında video bu kareyle görünür; ilk kare soru başlığı + net bir ana nesne (3D parça veya şema) içermeli, boş/karanlık olmamalı.

## 5. Senaryo ve kurgu

1. **Senaryoyu önce yaz:** `wip/<id>/senaryo.md`. Her sahne için: süre, ekranda ne görünüyor, ekrandaki yazı (anlatım), efekt.
2. Yapı: **Kanca** (0–3 sn, ilk karede görünür bir soru veya şaşırtıcı görüntü) → **Gerçek hayat** (mini modeller) → **Animasyonla gösterim** (değiştir → sonucu göster → kısa etiket) → **Kural/yasa** (en sonda yazıyla) → **Kapanış** (döngüye uygun son kare). Hedef 30–60 sn.
3. Her yeni kavram önce görselle tanıtılır, sonra adı söylenir. Bir sahnede tek fikir.
4. Seslendirme yok ve anlatıyı yazı değil animasyon taşır: senaryoda her sahne için önce "animasyon ne gösteriyor" (değişen şey ve sonucu), sonra "doğrulama etiketi" yazılır. Yazılar kapatılsa da konu animasyondan anlaşılmalı.
5. Konunun "gerekli bilgi" listesini senaryonun başına yaz ve videoda her maddenin geçtiğini işaretle.

## 6. Ses ve ekran yazıları (anlatım)

**Ses:** Kanal sahibinin kararı: **yalnızca animasyon sesleri.** Seslendirme (insan sesi, TTS) ve arka plan müziği yok.
- Efektler ekrandaki olaylara bağlıdır (anahtar kapanır → yumuşak tık, yük akmaya başlar → hafif uğultu, değer değişir → yumuşak pop, nesne yerine oturur → alçak "thud"). Olay yoksa ses yok; boş yerlere efekt serpiştirme.
- Efektlerde 4 kHz üstü keskin tonlar yok (ding, bip, sparkle, zap, tick kullanma; gerekiyorsa alçak geçiren filtreyle yumuşat). Ani yüksek ses yok. Son ses: -16 LUFS civarı, tepe -1,5 dBTP altında (render aracı `loudnorm` uygular; sessiz anların yükseltilmemesine dikkat et).
- Sahne `meta`: `music: { off: true }`, `voice` alanı yok.

**Ekran yazıları — yalnızca doğrulama (bölüm 2a).** Anlatıyı animasyon yapar; yazı, animasyonun gösterdiğini doğrulayan kısa etikettir:
- Her etiket, ilgili animasyon olayı gösterildikten **sonra** belirir: 1–4 kelime, bir anda tek etiket. Önceki satır yukarı kayarak/solarak yer açar; yeni satır aşağıdan akarak gelir (yumuşak geçiş, 0,3–0,4 sn).
- **Okuma süresi:** Her yazı ekranda en az `1,2 sn + 0,35 sn × kelime sayısı` kalır. Senaryonun süresini yazıların okunma süresi belirler; acele ettirme.
- Bir anda ekranda en fazla 2 satır anlatım yazısı + gerekirse 1 formül satırı.
- Yazı, animasyonun gösterdiği olaydan hemen **sonra** gelir; izleyicinin gözü önce animasyonda olmalı.
- Anahtar kelimeler renkli: gerilim sarı (`hl`), akım kırmızı (`rd`), direnç mavi (`bl`). Sayılar ve birimler her zaman yazıyla da verilir (9 V, 450 Ω, 20 mA).
- Yazılar bölüm 4'teki boyut, konum ve güvenli alan kurallarına uyar.

## 7. Kalite kontrolü (yayından önce zorunlu)

Bir madde geçmezse düzelt ve kontrolü tekrarla. 3 turda geçmezse yayınlama; panelde kanal sahibine onay isteği aç (bölüm 13).

**A. İçerik doğruluğu ve eksiksizlik**
- Senaryodaki her iddia, tanım, formül ve sayı için `wip/<id>/dogruluk.md`'ye bir satır yaz: iddia → neden doğru (formül/hesap) → ✔.
- Ekrandaki her sayı sahne kodunda hesaplanır ve `console.assert` ile bağımsız olarak doğrulanır.
- "Gerekli bilgi" listesindeki her madde videoda var mı? Eksik varsa video eksiktir.
- Ayrı bir alt ajana (Agent aracı) **yalnızca metin** ver: senaryo, ekran yazılarının sıralı listesi ve `dogruluk.md`. Görsel, kare veya video verme. Konunun doğru ve eksiksiz anlatılıp anlatılmadığını bağımsız değerlendirsin; bulduklarını düzelt. Bu denetim senaryo aşamasında, render'dan **önce** yapılır; sonradan içerik değişmediyse tekrarlanmaz.

**A2. Görsel öğretim (bölüm 2a)**
- Yazılar kapalıyken (yalnızca sahne) kareler incelendiğinde konu anlaşılıyor mu? Her değişkenin değişimi ve sonucu animasyonda görünüyor mu?
- Gerçek hayat mini modelleri var mı? Yasa/formül en sonda mı? Hiçbir etiket ilgili animasyondan önce gelmiyor mu?
- Akım yönü kuralı (elektronlar − → +, ayrı renkte geleneksel akım oku) doğru mu?

**B. Görüntü**
- Son render'dan şu kareleri çıkar ve kontak sayfaları halinde (sayfa başına 8 kare, düşük çözünürlük: kare genişliği ~270 px) Read ile incele:
  - **her ekran yazısının ilk göründüğü an + 0,5 sn** (yazı zamanlarını sahne kodundan al): yazı boyutu, konumu, nesnelerle çakışma, kesilme;
  - **her yazı geçişinin ortası**: iki yazı üst üste biniyor mu;
  - **her 3 saniyede bir** genel kare: görsel bozukluk, titreme, yanlış yerde nesne.
  Aynı yazının gösterildiği kareleri tekrar etme. Bölüm 2 ve 4'teki her kuralı bu karelerde kontrol et; şüpheli bir yer varsa yalnızca o aralıktan sık kare çıkar.
- Render sırasında tarayıcı konsoluna hata düşmüş olmamalı.
- Üst %10 boş mu, karartma/gradyan yok mu, devre net görünüyor mu?
- **Güvenli alan (bölüm 4):** `guvenli_alan.json`'da taşma yok mu? Alt %32'de ve sağ düğme sütununda yazı/etiket yok mu? Hiçbir üst yazı satırı ekran kenarında kesilmiyor mu? YouTube arayüzü maskeli kontrol karelerine bakıldı mı?

**C. Ses**
- `ffmpeg -af ebur128` ile ölç: entegre ses yaklaşık -16 LUFS, tepe -1,5 dBTP altında.
- `astats` ile ani tepe ara; 4 kHz üstü bant enerjisini kontrol et (`highpass=f=4000,volumedetect`); keskin tepe varsa efekti düzelt.
- Videoda seslendirme veya müzik yok; yalnızca olaylara bağlı efektler var mı?
- Her ekran yazısı okuma süresi kuralına uyuyor mu (karelerden zamanla kontrol et)?

**D. Teknik**
- `ffprobe`: 1080×1920, 30 fps, H.264 + AAC, süre senaryodakiyle aynı.

Kontrollerin sonucunu `wip/<id>/kalite.md`'ye yaz; panelde de özetle.

## 8. Konular

- Konuları **kanal sahibi** verir; `konular.md` onun listesidir. Ajan listeye konu eklemez, çıkarmaz, sırasını değiştirmez.
- Durumu `bekliyor` olan **ilk** konu işlenir. `bekliyor` konu yoksa hiçbir şey üretme; panele "konu listesi bitti" yaz, kanal sahibine "Yeni konu listesi bekleniyor" diye kısa bildirim gönder ve dur.
- Durumu `yarım kaldı` olan bir konu varsa önce onu `wip/`'teki notlardan devam ettirerek bitir.
- Durumu `yeniden düzenle` olan bir konu varsa **her şeyden önce** onu ele al: mevcut sahneyi (`scenes/` veya `wip/`) ve kontrol belgelerini temel alarak kanal sahibinin yeni kurallarına göre düzenle, yeniden render et, kalite kontrolünden geçir. Metricool'da o konunun taslak gönderisi varsa (`konular.md` Notu'nda uuid yazar) yeni gönderi açma; `updateScheduledPost` ile o gönderinin videosunu yeni dosyayla değiştir, `draft: false`, `autoPublish: true` yap ve bölüm 9'daki sıradaki boş 16:00'a planla. Video kimliği: `NNN-kisa-ad` (ör. `001-akim-gerilim-direnc`).
- Konunun başlığında birden fazla soru varsa (ör. "Nedir ve aralarında nasıl bir ilişki vardır?") hepsi videoda cevaplanır.

## 9. Yayın takvimi ve stok kuralı

Kanal sahibinin kararı:
- **Haftada 5 video (kanal sahibinin kararı, 11.11.2026): Pazartesi, Salı, Çarşamba, Perşembe ve Pazar, saat 16:00'da (Europe/London; Türkiye 19:00).** Cuma ve Cumartesi yayın yok (kanal verisinde en zayıf günler).
- Ajan **günde iki kez** çalışır: **08:00** ve **12:00** (Londra).
- **Stok kuralı:** Planlanmış ve henüz yayınlanmamış YouTube Short sayısı
  - **2 veya daha fazla** ise: yeni video üretme. Yalnızca kayıtları güncelle (bkz. aşağı) ve dur.
  - **1 veya 0** ise: **bir** yeni video üret ve planla (stok 2'ye doğru tamamlanır; bir çalışmada en fazla bir video).
- Yarım kalmış bir video varsa (`wip/` ve `NOTLAR.md`), yeni konuya geçmeden önce onu bitir; o da stok için üretilen video sayılır.

**Stoku sayma (her çalışmanın başında):** Metricool `getScheduledPosts` ile (marka: bölüm 11'deki `blogId`, `timezone: Europe/London`, bugünden 14 gün sonrasına kadar) YouTube gönderilerini al. `draft: true` olanları ve başka ağların gönderilerini sayma; yalnızca bu kanalın yayın bekleyen YouTube Short'larını say.

**Planlama saati:** Bugünden başlayarak yayın günlerinden (Pzt, Sal, Çar, Per, Paz) 16:00'da (Europe/London) bu kanalın YouTube gönderisi olmayan **ilk gün**. Cuma ve Cumartesiye asla planlama. Bugünün 16:00'ı geçtiyse ya da 30 dakikadan az kaldıysa bir sonraki günden başla. Aynı güne iki video planlama.

**Metricool `createScheduledPost`:** `draft: false`, `autoPublish: true`, `publicationDate: {dateTime: "<YYYY-MM-DD>T16:00:00", timezone: "Europe/London"}`. YouTube ayarları bölüm 11'deki gibi.

**Kayıtları güncelleme (her çalışmada):** Daha önce `planlandı` olarak kaydedilmiş ve yayın saati geçmiş videoları Metricool'da kontrol et; yayınlandıysa `konular.md` ve paneldeki `konular` belgesini `yayında`, `bolumler` belgesini `yayınlandı` yap.

**Planlanmış bir gönderinin tarihini asla değiştirme, yeniden oluşturma veya "hemen yayınla" yapma;** tek istisna kanal sahibinin açık emri veya bölüm 11'deki `yeniden düzenle` akışıdır. Bir gönderinin yayın saati beklenenden farklı görünürse değiştirme; panelde not düş.

### 9a. Erişim (daha çok kişiye ulaşma — kanal sahibinin emri, 09.11.2026)

1. **İlk 1–3 saniye:** Video soru başlığıyla ve ilk karede hareketle açılır (bölüm 4a); sessiz/boş açılış yok, giriş uzatılmaz.
2. **Başlık ve açıklamada aranan Türkçe kelimeler:** Başlığı yazmadan önce vidIQ bağlantısıyla (`vidiq_keyword_research`, gerekirse `vidiq_youtube_search`) konunun Türkçe arama kelimelerine bak (ör. "direnç nedir", "ohm kanunu", "akım nedir"). En çok aranan doğal ifadeyi başlığın başına koy (≤ 60 karakter, merak uyandıran soru biçimi korunur), açıklamanın ilk cümlesinde de geçir. Hashtag: `#elektronik` + 2–3 konu etiketi (`#shorts` isteğe bağlı). Bakılan kelimeleri ve hacimlerini `wip/<id>/erisim.md`'ye yaz. vidIQ çalışmazsa bunu not et ve konunun doğal Türkçe adını kullan; yayını bekletme.
3. **İlk yorumda soru:** Metricool gönderisinde `firstCommentText` alanına videonun konusuyla ilgili, izleyicinin cevap yazabileceği kısa bir soru koy (ör. "9 V pil ve 30 Ω ampul: devreden kaç amper akar? Cevabını yaz 👇"). Soru videoda öğretilenle çözülebilir olmalı; cevabı `dogruluk.md`'de doğrula. Metricool YouTube için ilk yorumu reddederse yorumsuz planla ve panele not düş.
4. **İlgili video önerisi:** YouTube Studio'daki "ilgili video" bağlantısını Metricool kuramaz; kanal sahibi elle ekler. Her planlamada `yayin.json`'a `"ilgili_video": "<önceki seri videosunun YouTube adresi>"` yaz ve panelin `bolumler` kaydının notuna "Studio'da ilgili video olarak şunu ekleyin: <adres>" yaz (serideki bir önceki video; serinin ilk videosuysa konu listesinde bir önceki yayındaki video).

Kalite kontrolünden (bölüm 7) geçmeyen video **asla** planlanmaz; kanal sahibi panelde onay verirse planlanır (bölüm 13).

## 10. Dosyalar ve depolama

Çalışma bilgisayarı her çalışmadan sonra silinir; saklanacak her şey depoya gider.

| Yol | İçerik |
|-----|--------|
| `tools/` | Tekrar kullanılabilir görüntü ve ses kodu |
| `scenes/<video-id>.js` | Bitmiş bölümün sahne kodu |
| `wip/<video-id>/` | Yarım iş ve kontrol belgeleri: `senaryo.md`, `dogruluk.md`, `kalite.md`, `NOTLAR.md` (nerede kaldın), `scene.js`, `ses.wav` |
| `media/<video-id>/` | **Kalıcı arşiv.** Bitmiş MP4, kapak (`kapak.jpg`, kanca karesinden) ve `yayin.json` (aşağıda) |
| `konular.md`, `gunluk.md` | Konu durumu ve çalışma günlüğü |

- Ara dosyalar (PNG kareler, ham ses parçaları) yalnızca geçici klasörde kalır, depoya konmaz.
- **`media/` kalıcı arşivdir (kanal sahibinin kararı, 08.11.2026):** videolar ileride Instagram'da da paylaşılacak. `media/` altındaki hiçbir MP4, kapak veya `yayin.json` silinmez, üzerine yazılmaz. Bir video yeniden yapılırsa eski sürüm `media/<video-id>/eski/<video-id>-v<N>.mp4` olarak taşınır, yeni sürüm aynı adla konur.
- **`yayin.json`:** Her video planlandığında `media/<video-id>/yayin.json` yazılır ve yayından sonra güncellenir: `{"konu_no", "baslik", "aciklama", "etiketler", "hashtagler", "sure_sn", "youtube_tarih", "youtube_url", "metricool_uuid", "instagram": {"durum": "bekliyor", "aciklama": null}}`. `aciklama` Metricool'a gönderilen metnin aynısıdır. Instagram paylaşımı kanal sahibinin ayrı emriyle başlar; o zamana kadar `instagram.durum` "bekliyor" kalır.
- **Push yalnızca `claude/<video-id>` dalına.** GitHub Action bu dalı otomatik olarak main'e birleştirir ve dalı siler. Uzun işlerde ara ara push et (çalışma yarıda kesilirse iş kaybolmasın).
- Main'de dosyanın göründüğünü doğrula: `git fetch origin main && git cat-file -e origin/main:media/<id>/<id>.mp4`. 3 dakika içinde görünmezse panele "birleştirme bekliyor" yaz.
- Video adresi: `https://raw.githubusercontent.com/nuraysglm/elektronik-shorts/main/media/<id>/<id>.mp4`
- Depo herkese açıktır: içine şifre, belirteç veya kişisel bilgi konmaz.

## 11. Her çalışmanın akışı

1. Depoyu oku: bu dosya, `konular.md`, `gunluk.md`, `wip/` (yarım iş varsa önce onu bitir).
2. **Güvenlik:** Metricool `getBrandSettings` ile `youtubeData == "UCAvE1cKeoIbIXCyIks-U81w"` olan markayı bul (`blogId`). Yoksa dur.
2a. **Stok:** Bölüm 9'a göre planlanmış video sayısını say ve eski kayıtları güncelle. Stok 2 veya fazlaysa panelde `bolumler`'e `sonuc: "stok dolu"` kısa kaydını yaz ve dur.
3. Konuyu seç, `claude/<video-id>` dalını aç.
4. Senaryo → sahne kodu (ekran yazıları dahil) → kare kontrolü → hareket kontrolü → son render.
5. Kalite kontrolü (bölüm 7). Geçmezse düzelt.
6. Sahneyi `scenes/`'e, videoyu ve kapağı `media/<id>/`'e koy; kontrol belgelerini `wip/<id>/`'de bırak; commit + push; main'de göründüğünü doğrula.
7. Yayın takvimi (bölüm 9): sıradaki boş 16:00'a (Europe/London) planla — YouTube `short`, `privacy: public`, `madeForKids: false`, `category: EDUCATION`, başlık ≤ 60 karakter, açıklamada 2–3 cümle + `#elektronik #shorts` + 2–3 konu etiketi, `isAiGeneratedContent: false`.
8. `konular.md` (`planlandı` + yayın tarihi) ve `gunluk.md`'yi (`planlandı` + yayın saati + Metricool bağlantısı) güncelle, paneli yenile (bölüm 12), commit + push.
9. Son mesaj: konu, süre, video adresi, kalite kontrol özeti, yayın saati ve Metricool bağlantısı; sorun varsa ne olduğu.

**Zaman yetmezse:** İşi `wip/<id>/` altına kaydet (`NOTLAR.md`'de nerede kaldığını yaz), push et, panele "yarım kaldı" yaz. Bir sonraki çalışma oradan devam eder.

## 12. Panel

Kanal sahibi ajanı tek bir sayfadan izler ve kararlarını orada verir: **"Elektronik Shorts Ajanı" paneli** `https://claude.ai/artifact/X7gzN2huBZ6m2y2uWBCbLx`
**Eski panel adresleri (7zyMo4GPgxmwKbRWCZxTKt ve XcFZcCiLBAeFenLf2JvPib) kullanılmaz.** Görev talimatında eski adres yazıyorsa bu dosyadaki adres geçerlidir.

Panelin verisi kendi veritabanındadır; ajan `ArtifactData` ile (`url` = panel) doğrudan belge yazar. Dosya yüklemez, sayfayı yeniden yayınlamaz.

| Koleksiyon / belge | İçerik |
|---|---|
| `bolumler/<YYYY-MM-DD>-<NNN>-<HHmm>` | Her çalışmanın kaydı: `tarih` (YYYY-MM-DD), `zaman` (UTC ISO), `no`, `konu`, `sonuc` (`planlandı`, `yayınlandı`, `stok dolu`, `onay bekliyor`, `yarım kaldı`, `inceleme`, `durdu`, `hata`), `not` (kısa sebep/özet). Yayınlandıysa ayrıca `baslik`, `yayin` ("YYYY-MM-DD HH:MM (TR)"), `sure` ("45 sn"), `kalite` (tek cümle), `video` (raw GitHub adresi), `metricool` (plannerUrl), `youtube` (biliniyorsa). |
| `konular/<NNN>` | `no`, `konu`, `ana_fikir`, `durum`, `tarih`. `konular.md` ile aynı tutulur. |
| `ayarlar/genel` | `satirlar: [{ayar, deger}]`. Çalışma saati değişmişse güncelle. |
| `onaylar/<id>` | Onay istekleri (bölüm 13). |

**Her çalışmanın sonunda — durduğunda, hata aldığında veya hiçbir video üretmediğinde de —** `gunluk.md`'ye satır ekle, commit edip `claude/` dalına push et, sonra panelde `bolumler`'e o çalışmanın belgesini ve değişen `konular` belgelerini tek bir `ArtifactData` `batch` ile yaz. Kanal sahibi her çalışmayı panelde görmelidir.

## 13. Onay istekleri (kanal sahibinin kararı gereken durumlar)

Kanal sahibi kararlarını panelin en üstündeki **"Kararınızı bekleyenler"** bölümünde verir (panel: `https://claude.ai/artifact/X7gzN2huBZ6m2y2uWBCbLx`).
Bu yalnızca **iş kararları** içindir; sistemin araç izinleri buradan verilemez.

**Ne zaman onay istenir:**
- Kalite kontrolü (bölüm 7) 3 turda geçmedi: "Yayınlansın mı?" diye sor, videoyu ve kalite raporunu bağla.
- İçeriğin doğruluğundan veya konunun nasıl yorumlanacağından emin değilsin.
- Konu listesindeki bir konu belirsiz ya da birden fazla videoya bölünmesi gerekiyor gibi görünüyor.
- Kurallarda cevabı olmayan, kanal sahibinin karar vermesi gereken herhangi bir durum.

**Nasıl:**
1. `ArtifactData` `set`, `url` = panel, `collection` = `onaylar`, `doc_id` = `<video-id>-<YYYYMMDDHHmm>`, veri:
   `{ "baslik": "<kısa soru>", "aciklama": "<durum, seçeneklerin sonuçları, senin önerin>", "konu_no": <no>, "video": "<https video adresi, varsa>", "baglanti": "<https ayrıntı adresi, ör. kalite.md'nin GitHub adresi>", "secenekler": [{"deger": "onayla", "etiket": "Yayınla"}, {"deger": "reddet", "etiket": "Yayınlama"}], "durum": "bekliyor", "olusturma": "<UTC ISO>" }`
   `secenekler` duruma göre değişebilir (ör. `{"deger": "bol", "etiket": "İki videoya böl"}`); ilk seçenek önerdiğin olsun.
2. Kararı bekle: kısa aralıklarla (yaklaşık dakikada bir) `ArtifactData` `get` ile belgeyi tekrar oku, en fazla 15 dakika. `durum` `onaylandı`/`reddedildi` olunca `karar`, `not` alanlarına göre devam et ve kararı `gunluk.md` Not sütununa yaz.
3. 15 dakikada karar gelmezse: işi `wip/<id>/`'e kaydet (`NOTLAR.md`'ye onay belgesinin kimliğini yaz), push et, günlüğe `onay bekliyor` satırı ekle, paneli güncelle ve dur. Son mesajın telefona bildirim olarak gider: "Panelde kararınızı bekleyen bir istek var."
4. Her çalışmanın başında `onaylar` koleksiyonunu oku: kararı verilmiş ama uygulanmamış istek varsa önce onu uygula.

**Asla:** Kanal sahibinin yerine karar verme; süre dolunca varsayılan seçeneği uygulama. Kalite kontrolünden geçmemiş bir video yalnızca kanal sahibi panelde "Yayınla" derse yayınlanır.

## 14. Yapma listesi

- Kullanıcının bilgisayarını kullanma; her şey bu bulut çalışma ortamında olur.
- Higgsfield veya başka bir yapay zekâ görsel/video üretim aracı kullanma. Görüntü ve ses kodla üretilir.
- Telifli müzik, logo, karakter, başka kanalın görseli kullanma.
- Başka bir Metricool markasına veya ağına gönderi yapma; kalite kontrolünden geçmemiş videoyu yayınlama.
