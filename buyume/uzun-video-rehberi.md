# Uzun video "paket" rehberi — ön sürüm (17.11.2026)

Büyüme Ajanı, BUYUME.md bölüm 3a görevi. Uzun videolar: haftada 1–2, 10–20 dk, whiteboard, kanal sahibinin klon sesi, final tipi çözümlü sorular (örnek: `uzun/ornek-01/`).

> **Önemli sınır:** Bu çalışmada vidIQ kredisi **0** idi (aylık 150 kredilik plan; 16–17.11'de Büyüme ve Shorts ajanları bitirdi; yenilenme **09.12.2026**). Bu yüzden `vidiq_outliers`, `vidiq_title_thumbnail_wins`, `vidiq_similar_thumbnails`, `vidiq_keyword_research` ve `vidiq_score_title` **çalıştırılamadı**; başlık puanları yok. Bu sürüm şu verilere dayanır: (1) kanalın kendi verisi (16.11 raporu, vidIQ + Metricool), (2) 16.11'de vidIQ ile toplanmış pazar ve Türkçe arama verisi, (3) herkese açık büyük örneklemli çalışmalar (aşağıda kaynaklar; çoğu araç satan şirketlerin yayını, gözleme dayalı — nedensellik kanıtı değil). vidIQ yenilenince başlık puanları ve kapak örnekleriyle güncellenecek.

## 0. Kanalın kendi verisinden çıkan temel gerçekler

| Veri | Değer | Ne anlama geliyor |
|---|---|---|
| Uzun video izlenme payı (17.10–15.11) | %96 (103.058 izlenme, 398.335 dk) | Büyüme motoru uzun ders videoları |
| Uzun videoda izlenme başına ortalama süre | ~3,9 dk (398.335 / 103.058) | İzleyicinin çoğu ilk 4 dk içinde ayrılıyor; değerli an ve abone çağrısı ilk 4 dk'ya sığmalı |
| En büyük trafik kaynağı (28 gün) | Oynatma listesi 32.139 + liste sayfası 8.846 (~%45) | Seri kapak tutarlılığı ve oynatma listesi düzeni çok önemli |
| 2. kaynak | YouTube araması 25.647 (~%28) | Başlık ve açıklamanın ilk satırı aranan ifadeyle başlamalı |
| Shorts akışından gelen | 2.111 (~%2) | Shorts → uzun video köprüsü şu an çok zayıf |
| Türkçe arama (16.11, vidIQ, aylık) | "doğru akım devre analizi" ~19.600 · "sayısal elektronik" ~15.400 · "devre analizi 1" ~9.200 · "çevre akımları yöntemi" ~8.900 · "devre teorisi" ~8.200 · "thevenin teoremi" ~4.600 | Başlık kelimeleri |

## 1. Kapak (thumbnail) — kodla üretilir

**Veri:**
- 507.478 uzun videoluk çalışma (Eden, Ağu 2026): kapak yazısında **4–6 kelime** öne çıkan videolarda %30,6, düşük performanslılarda %26,5 (ölçülen en büyük fark); 7+ kelime biraz daha kötü (%29,6 / %31,1); hiç yazı olmaması daha kötü (%13,4 / %16,8).
- Aynı çalışmada **yüz belirleyici değil** (%84,2 / %82,2); parlaklık, kontrast, doygunluk farkı ölçülmemiş. Yani kapakta kazandıran şey renk numarası değil, **net ve kısa bir vaat**.
- Kanal trafiğinin ~%45'i oynatma listesinden geliyor: izleyici bir sonraki videoyu listede kapağından tanır → **seri boyunca aynı şablon**.

**Kurallar (bütün şablonlar):** beyaz tahta zemini (videoyla aynı dil); yazı 4–6 kelime, kalın, telefonda okunur (kapak genişliğinin ≥ %8'i harf yüksekliği); ana kelime aranan ifade ("Düğüm Gerilimleri"); kırmızı yalnızca tek vurguda; devre çizimi gerçek sorunun sadeleştirilmiş hâli (yanlış devre çizilmez, AGENT.md 2c/2d); sağ alt köşe boş (YouTube süre etiketi oraya biner); YouTube logosu ve başka kanal görseli yok.

**Şablon A — "Soru tahtası" (önerim):** Solda 2 satır büyük yazı: "DÜĞÜM GERİLİMLERİ" / altta kırmızı şerit "ÇÖZÜMLÜ FİNAL SORUSU". Sağda %55 alanda devre (kalın siyah çizgi, düğümler mavi nokta), bir düğümün yanında mavi "V₁ = ?". Neden: yazı 4–5 kelime aralığında; devre + "?" izleyiciye çözülecek bir problem gösterir; whiteboard videoyla birebir uyumlu.

**Şablon B — "Hoca + tahta":** Solda kanal sahibinin kendi fotoğrafı (yalnızca o sağlarsa; omuz hizası, yuvarlak veya düz renk çerçeve içinde; fotoğraf herkese açık depoya konmaz), sağda devre ve 3–4 kelime ("Çevre Akımları: Final Sorusu"). Neden: yüz tek başına kazandırmıyor ama kanal sahibinin eski derslerinde tanınan yüz güven ve marka verir; maliyeti fotoğraf sağlamak.

**Şablon C — "Seri kartı":** Üstte ince renkli şerit ve küçük "DEVRE ANALİZİ 1 · SORU 3"; ortada 3–4 kelime konu; altta küçük devre. Her ünitenin kendi şerit rengi. Neden: oynatma listesinde art arda izlemeyi kolaylaştırır; en az tasarım emeği. Zayıf yanı: tek başına aramada daha az dikkat çeker.

Test önerisi: YouTube Studio "Test ve karşılaştır" (kapak A/B) ücretsiz; ilk 4 videoda A ile B (fotoğraf varsa) veya A ile C karşılaştırılır, kazanan kalıcı olur.

## 2. Başlık

**Kalıp:** `<Aranan konu adı>: <Somut vaat> | <Ders adı>` — ≤ 60 karakter ana kısım, ders adı sonda.
- Aranan ifade başta (arama ikinci büyük kaynak). "Devre Analizi 1" ve "devre teorisi" ders adları sonda (16.11 verisi).
- "Final tipi", "çözümlü", "soru" kelimeleri gerçek içeriği anlatır; clickbait değildir (videoda gerçekten final tipi soru çözülüyor). "En kolay", "%100 geçersin", "hocalar söylemiyor" gibi doğrulanamaz vaatler **yok** (AGENT.md 2d).

**5 örnek başlık** (vidIQ puanı alınamadı; 09.12 sonrası `vidiq_score_title` ile puanlanacak):
1. Düğüm Gerilimleri Yöntemi: Final Tipi Çözümlü Soru | Devre Analizi 1
2. Çevre Akımları Yöntemi: 3 Çözümlü Final Sorusu | Devre Analizi 1
3. Thevenin Teoremi: Bağımlı Kaynaklı Soru Çözümü | Devre Teorisi
4. Doğru Akım Devre Analizi: Finalden Önce 5 Çözümlü Soru
5. Akım Kaynağına Seri Direnç Düğüm Denklemine Girer mi? | Devre Analizi 1

Örnek 5 "bilinen yanlış" soru kalıbıdır (Shorts'larda en iyi izleme yüzdesini alan "… Nedir? … Olursa?" kalıbının uzun sürümü); örnek 1–4 arama kalıbıdır. Öneri: uzun videoda arama kalıbı (1–4), bu videodan kesilen Short'ta soru kalıbı (5).

## 3. Kanca (ilk 30 sn)

**Veri:** Kanalın uzun videolarında izlenme başına ~3,9 dk izleniyor; 15–60 dk'lık videolarda tipik izleyici videonun ~¼'ünü izliyor (21.755 videoluk AIR çalışması, Eki 2026). İlk 30 sn'de ayrılmayan izleyici çoğunlukla ilk soruyu sonuna kadar izler. Shorts'larımızda da en iyi izleme yüzdesi, cevabın en erken geldiği ve en kısa olan videoda (%32,7).

**Seslendirme kuralı önerisi (UZUN.md'ye işlenmek üzere):**
1. **0–5 sn:** Soru ve konu tek cümlede ("Final tipi bir düğüm gerilimleri sorusu çözüyoruz."). Ekranda devre çizilmeye **ilk karede** başlar; logo, selam, "bu videoda" girişi yok.
2. **5–15 sn:** Tuzak / bilinen yanlış tek cümlede ("Tuzak şu: akım kaynağına seri bağlı bir direnç."). Ekranda tuzak kırmızıyla işaretlenir.
3. **15–30 sn:** Vaat: videonun sonunda ne bilineceği, somut ("Sonunda iki düğüm gerilimini bulup sonucu güç dengesiyle kontrol edeceğiz."). Soru sayısı varsa söylenir ("üç soru, kolaydan zora").
4. İlk 30 sn'de abone çağrısı, kanal tanıtımı, ders listesi okuma **yok**.
5. Çok sorulu videoda her yeni soru da 1 cümlelik mini kancayla başlar (bölüm geçişi = yeni kanca).
`uzun/ornek-01/metin.md` bu yapıya zaten uyuyor (ilk paragraf).

## 4. Açıklama ve etiketler

**Yapı:**
1. **İlk 2 satır** (aramada ve "daha fazla"dan önce görünen kısım): aranan ifade + ne çözüldüğü. Örnek: "Devre Analizi 1 dersinde düğüm gerilimleri yöntemiyle final tipi bir soruyu adım adım çözüyoruz. Akım kaynağına seri bağlı direncin düğüm denklemine neden girmediğini görüyoruz."
2. **Bölümler (zaman damgaları):** çok adımlı çözümlerde faydalı; YouTube'un "önemli anlar" görünümü için **en az 3 bölüm, her biri ≥10 sn**, ilk bölüm 0:00. Örnek: 0:00 Soru ve tuzak · 0:40 Referans düğümü · 1:10 1. düğüm denklemi · 1:50 2. düğüm ve seri direnç · 2:30 Çözüm · 2:50 Kontrol. (AIR, Eki 2026: bölümler çok adımlı eğitim videolarında önerilir; Google AI Overview'daki YouTube atıflarının %50'si zaman damgalı.) 3 dakikadan kısa tek soruluk videoda bölüm konmayabilir.
3. **Bilmen gerekenler:** videonun sonundaki kartla aynı maddeler (AGENT.md 2f-3) + "Önce bilmen gereken: …".
4. **İlgili videolar:** ilgili Shorts'lar ve kanal sahibinin eski dersleri (bağlantı olarak; kaynak değildir, AGENT.md 2i-2).
5. **Oynatma listesi bağlantısı:** "Devre Analizi 1 — çözümlü sorular" listesi (trafiğin ~%45'i listelerden).
6. **Kaynak atfı:** onaylı kaynak (ör. "Kaynak: B. Razavi, Basic Circuits, Ders 5–6").
7. 3–4 hashtag (`#elektronik #devreanalizi #düğümgerilimleri`); hashtag trafiği ~0 olduğu için daha fazlası gereksiz.

**Etiketler:** 8–12 adet: konu adı (düğüm gerilimleri yöntemi, nodal analiz), ders adları (devre analizi 1, devre teorisi, doğru akım devre analizi), "soru çözümü", "final", ilgili yöntem (çevre akımları yöntemi). Etiketler aramada küçük etkilidir; zaman harcanmaz.

## 5. Abone olmaya teşvik

**Veri:** izlenme başına ~3,9 dk; izleyicinin çoğu ilk 4 dk'da ayrılır. Abone çağrısı izleyiciye değer verildikten **sonra** ama çoğu izleyici hâlâ izlerken gelmeli.

**Öneri (10–20 dk'lık video):**
1. **1. animasyon:** ilk sorunun cevabı bulunduğu an (değer verildi), **en geç ~3:30–4:00**. UZUN.md 3b'deki "~%25–30" varsayılanı 15–20 dk'lık videoda 4–6 dk'ya düşer; bu, ortalama izleme süresinin (~3,9 dk) arkasında kalır → **"ilk cevaptan hemen sonra, en geç 4. dk"** kuralı daha iyi.
2. **2. animasyon:** son sorudan önce (ör. "şimdi en zor soru"). Toplam en fazla 2; 10 dk'dan kısa videoda 1.
3. **Sözlü çağrı:** tek ve kısa, yalnızca 1. animasyonla birlikte ve **içeriğe bağlı**: "Bu tarz final sorularının devamı için abone olabilirsin." (Klon sesle tek cümle; seslendirme metnine yazılır.) Başta ve her bölümde tekrar yok.
4. **Bitiş ekranı (son 20 sn):** sonraki soru videosu + oynatma listesi + abone ögesi. "Bilmen gerekenler" kartı bitiş ekranından önce biter; bitiş ekranı alanı (orta-alt) boş kalır.
5. **Sabitlenmiş yorum:** videoyla çözülebilecek bir benzer soru + oynatma listesi bağlantısı ("Cevabını yaz; çözümü bir sonraki videoda").
6. Oynatma listesi: her uzun video "Devre Analizi 1 — çözümlü sorular" listesine eklenir; listede sıra ders sırası.

## 6. Uzun video ile Shorts bağı

**Veri:** Shorts akışından gelen izlenme yalnızca ~%2. 18.000 kanallık AIR çalışmasında (Mayıs 2026) eğitim kanallarında karma (uzun + Shorts) kanallar küçük boyutta +%37, orta boyutta +%12 daha çok aboneye sahip; en iyi Shorts payı yüklemelerin **%25–40'ı**, **%55'in üstünde** uzun video performansı düşüyor (gözleme dayalı). Bizim plan: haftada 5 Short + 1–2 uzun → Shorts payı ~%70–80.

**Öneri:**
1. Her uzun videodan 1 Short (UZUN.md 3a zaten öngörüyor) ve bu Short'un **"İlgili video"** bağlantısı o uzun video (YouTube Studio'da elle; Metricool kuramaz).
2. Konu bakımından bağlı Razavi Shorts'larının "ilgili video"su da yayınlanınca ilgili uzun video olur (ör. 008 bağımlı kaynak → bağımlı kaynaklı Thevenin sorusu).
3. Short açıklamasının ilk satırından sonra: "Tam çözüm: <uzun video adı>" (bağlantı metin olarak, tıklanmasa da adı aramaya yardım eder) ve sabit yorumda uzun video adı.
4. Uzun videonun sonunda konuyla ilgili Short'lar değil, **bir sonraki uzun video** önerilir (oturum süresi).
5. Shorts payı veride uzun videoyu destekleyen seviyeye yaklaşınca (ör. 2 uzun/hafta olunca) haftalık Short sayısı ayrıca değerlendirilir; şimdilik değişiklik önerilmiyor (karar 23.11 Shorts testinden sonra).

## Kaynaklar
- Kanal verisi: `buyume/rapor-2026-11-16.md` (vidIQ YouTube Studio analitiği 17.10–15.11, Metricool 28 gün).
- Eden, "What makes a good YouTube thumbnail? We analyzed 507,478 videos" (21.08.2026): https://eden.so/blog/what-makes-a-good-youtube-thumbnail/
- AIR Media-Tech, "Do YouTube Shorts help your long-form videos? Data from 18,000 channels" (28.05.2026): https://air.io/en/audience-growth/do-youtube-shorts-help-your-long-form-videos-grow-data-from-18000-channels
- AIR Media-Tech, "YouTube chapters as an SEO tool" (14.10.2026): https://air.io/en/youtube-hacks/youtube-chapters-as-an-seo-tool-when-they-help-when-they-hurt
- vidIQ blog, "YouTube Related Links" (08.09.2023; eski): https://vidiq.com/blog/post/youtube-related-links-connect-shorts-long-videos
