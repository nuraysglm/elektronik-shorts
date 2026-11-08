# 002 — Direnç nedir? (2. sürüm, kanal sahibinin iş emri 08.11.2026)

Seslendirme ve müzik yok. Anlatıyı animasyon taşır; yazı kısa doğrulama etiketidir ve **kalemle yazılıyormuş gibi** soldan sağa çizilerek gelir (kelime başına ~0,3 sn), okuma süresi yazı bitince başlar. Her şey sürekli hareketli (elektronlar/su akar, kamera yavaşça kayar). Geçişler ≥ 1,2 sn, kamera uçuşu.
Renkler: direnç mavi (bl), akım/akım oku kırmızı (rd), gerilim sarı (hl), elektronlar yeşil (gr).
Kaynak: https://en.wikipedia.org/wiki/Resistor (bu çalışmada ağ izni olmadığı için açılamadı; bkz. dogruluk.md).

Devre değerleri: pil 9 V; ampul (sıcak filaman) 30 Ω; eklenen direnç 60 Ω; bakır bağlantı teli (toplam ~1 m, 0,5 mm²) ≈ 0,03 Ω.
Akım değerleri ekranda gösterilmez (Ohm yasası serinin son videosu); yalnızca direnç değerleri ve pil gerilimi.

## Gerekli bilgi (videoda geçtiği yer)
- [x] Direnç akıma karşı koyan engeldir → sahne 1 (devre) + sahne 2 (dar boru) + son
- [x] Ampulün de bir direnci vardır; seri eklenen direnç ona eklenir, toplam direnç artar → sahne 1 zinciri
- [x] Toplam direnç artınca devreden geçen akım azalır; akım devrenin her yerinde aynı ölçüde azalır (elektronlar her yerde yavaşlar) → sahne 1
- [x] Pil gerilimi aynı kalır, ampule düşen gerilim azalır → ampul kararır → sahne 1 zinciri
- [x] Elektronlar − → + akar; geleneksel akım yönü + → − → sahne 1
- [x] Analoji: boruda daralma = direnç; daralma eklenince borunun tamamında akış azalır (daralmanın içinde su yerel olarak hızlı akar) → sahne 2
- [x] Her elektrik cihazının bir direnci (eşdeğer direnci) vardır: ampul, elektrikli soba, ütü, su ısıtıcısı, şarj olan telefon → sahne 3
- [x] Bakır telin de çok küçük bir direnci vardır; toplam dirence katkısı ihmal edilecek kadar küçüktür → sahne 4
- [x] Seri bağlı dirençler toplanır; sembol R, birim ohm (Ω) → son (yazıyla, en sonda)

## Sahneler (pre = yazıdan önceki yazısız animasyon)
| # | Animasyon (ne gösteriyor) | Doğrulama yazısı (ardından, kalemle) | Efekt |
|---|---------------------------|--------------------------------------|-------|
| 0 Kanca | İlk kare: pil + kapalı anahtar + parlak ampul, elektronlar akıyor. Soru ilk karede hazır. ~2,6 sn'de 60 Ω direnç devreye iner → elektronlar **her yerde** yavaşlar, ampul kararır | (ilk karede) "Direnç ekleyince / ampul neden **kararır**?" + alt satır "9 V pil + ampul + 60 Ω" (istisna: kanca kalemle değil, ilk karede hazır) | thud (direnç oturur), uğultu akıma göre azalır |
| 1a | Anahtar açılır → akış durur, ampul söner; anahtar fiziksel olarak kapanır → teldeki **tüm** elektronlar aynı anda harekete geçer (pilden yeni elektron çıkmaz), dış devrede − ucundan + ucuna doğru | "Elektronlar: − → +" | yumuşak tık, uğultu |
| 1b | Kırmızı geleneksel akım oku + → − yönünde belirir | "Akım yönü: + → − (tersi)" | pop |
| 1c zincir | Ampulün içi mavi parlar, yanında "≈ 30 Ω" | "Ampulün de direnci var" | pop |
| 1d | Direnç ve ampul birlikte mavi parlar; "30 Ω + 60 Ω" etiketleri | "Toplam direnç artar" | — |
| 1e | Akım oku incelir/solar; elektronlar boyunca bir yavaşlama dalgası tüm devreyi dolaşır | "Akım her yerde azalır" | uğultu alçalır |
| 1f | Pil iki ucu arasında sarı vurgu, "9 V" sabit | "Pil hâlâ 9 V" | — |
| 1f2 | 9 V iki parçaya ayrılır: direncin üstünde "6 V", ampulün üstünde "3 V" (sarı etiketler) | "Ampule daha az gerilim" | — |
| 1g | Ampul kısık yanar (hafif titreşir) | "Bu yüzden ampul kararır" | — |
| 2a analoji | Kamera yandaki kapalı su borusuna uçar: pompa suyu döndürür, borudaki çark hızla döner | — (önce yalnız animasyon) | hafif akış sesi |
| 2b | Borunun bir noktası daralır → borunun **tamamında** su yavaşlar, çark yavaşlar; daralmanın içinde su yerel olarak hızlı geçer | "Daralma = direnç" | thud (daralma) |
| 2c | Geniş kısımdaki debi göstergesinin ibresi düşer (saniyede geçen su) | "Saniyede geçen su azalır" | pop |
| 2d | Etiketler: pompa = pil, çark = ampul | "Pompa = pil, çark = ampul" | — |
| 2e | Su parçacıkları kırmızımsı parlar | "Su akışı = akım" | — |
| 3 cihazın direnci | Kamera mini model alanına uçar; platformlarda sırayla: ampul, elektrikli soba, ütü, su ısıtıcısı, şarj olan telefon. Her birinin üstünde mavi "R" halkası parlar (eşdeğer direnç) | "Her cihaz akıma direnç gösterir" | thud × 5 (yumuşak) |
| 4a bakır tel | Kamera devreye döner; bakır tel boyunca parlama gezer, "tel ≈ 0,03 Ω" | "Bakır telin de direnci var" | pop |
| 4b | Yanda üç sütun yükselir: ampul 30 Ω, direnç 60 Ω, tel 0,03 Ω (neredeyse görünmez; büyüteç halkası) | "Çok küçük, ihmal edilir" | — |
| 5 kural | Devre akmaya devam eder | "Direnç (R): akıma engel" / "birimi: ohm (Ω)" | — |
| 5b | Tek yol üzerindeki üç direnç sırayla mavi parlar | "Arka arkaya (seri) dirençler toplanır" / formül: R_toplam = 30 Ω + 60 Ω + 0,03 Ω ≈ 90 Ω | — |
| Kapanış | Devre aktığı haliyle (kanca karesine benzer, döngüye uygun) | | |
