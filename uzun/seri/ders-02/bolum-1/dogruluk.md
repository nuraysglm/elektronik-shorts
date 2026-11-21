# Doğruluk — Ders 2 - Bölüm 1/3 (sürüm 1, 20.11.2026)

Onaylı kaynaklar: Razavi, Basic Circuit Theory, Ders 2 transkripti (kanal sahibinin özel Drive klasörü; depoya kopyalanmadı); datasheet değerleri ve 10 kat kuralı İçerik Ajanı'nın paketinden (`icerik.md` bölüm 5b, 5c, 11; paket denetçisi değerleri sayfalardan doğruladı). Hesaplar: `dogrula.py` (TAMAM).

| Parça | İddia | Dayanak |
|---|---|---|
| 1, 4 | 1,5 V / 150 Ω = 0,01 A = 10 mA; 1,5 V / 1,5 Ω = 1 A; 100 kat | `dogrula.py` (özgün; icerik.md 6, 5d) |
| 1, 4 | En sık yapılan hata: pili sabit akım kaynağı sanmak | Derslerde bilinen klasik yanlış (icerik.md 6; fizik eğitimi literatüründe McDermott & Shaffer 1992 — kaynaklar.md onaylı listesinde değil, yalnızca gerekçe notu, videoda anılmaz); Razavi tanımı bu ayrım üzerine kurar [10:36–12:03] |
| 1 | (İdeal pil kabulüyle 10 mA / 1 A); bir amper civarında gerçek pilin gerilimi belirgin biçimde düşer | Razavi [12:28–12:45]; E91 iç direnci (icerik.md 5b) |
| 2 | Akım = dq/dt, A; gerilim iki nokta arasında, 1 C pozitif yükü taşıma enerjisi, V | Razavi [2:14–3:07] |
| 2 | Ohm yasası v = R × i, yalnızca direnç için | Razavi [3:07–3:33] |
| 2 | Açık devre i = 0, kısa devre v = 0 garantisi | Razavi [7:26–7:48]; Ders 1 [18:25–19:32], [37:01–38:47] |
| 2 | Bugün tel, anahtar, gerilim kaynağı | Razavi [1:35] (akım kaynağı Bölüm 3'te) |
| 3 | İdeal tel R = 0, C = 0, L = 0; bir model, çoğu zaman iyi yaklaşıklık | Razavi [4:04–4:39] |
| 3 | R = 0, i sonlu → v = 0; telin her iki noktası arası 0; ideal tel = kısa devre | Razavi [4:47–5:45] |
| 3 | Kısa devre hesabı Ders 1 - Bölüm 3'e atıfla (tekrar edilmedi) | Ders 1 - Bölüm 3 Parça 5 |
| 3 | Açık anahtar = açık devre (i = 0); kapalı = kısa devre (R = 0, v = 0) | Razavi [6:24–7:48] |
| 3 | Açık anahtarın gerilimini / kapalı anahtarın akımını çevre belirler | Razavi [7:55–8:13] |
| 3 | "Açık anahtar" = kontak ayrık, akım yok (günlük dildeki "ışığı açmak" ile ters) | icerik.md 10 "İfade dikkati" (dil notu; Razavi "open = off" [6:24–6:32]) |
| 3 | 4,5 V + 1,5 kΩ + anahtar: kapalı 4,5 V / 1,5 kΩ = 3 mA; açık i = 0, v_R = 0, anahtarda 4,5 V | `dogrula.py` (KVL kontrolü); icerik.md 7-1 (özgün) |
| 3 | Eşdeğerlikler (açık devre = i = 0 = açık anahtar; kısa devre = ideal tel = kapalı anahtar = v = 0) | Razavi [8:13–8:45] |
| 4 | Daire + ve − genel sembol (sabit ya da değişen); pil sembolü "bu derste" yalnızca sabit gerilim; işaret yazılır | Razavi [9:00–10:04]; icerik.md "Kaynakta düzeltme" 3 (alışkanlık, standart değil) |
| 4 | İdeal gerilim kaynağı: uç gerilimi içinden geçen akıma bağlı olmayan iki uçlu eleman; sabit ya da değişen | Razavi [11:09–12:19] (12:10–12:19 alıntılanmadı; Kaynakta düzeltme 4) |
| 4 | v–i grafiğinde yatay doğru (i: + uçtan dışarı) | Tanımın grafiği. Not (denetçi): Razavi bunu **Ders 3**'te kendi örneği olarak gösterir [28:19–30:32] (gerilim kaynağının eğimi sıfır v–i karakteristiği); paketteki "Razavi'de yok" ifadesi düzeltildi. Kendi eksen, sayı ve gerçek pil doğrusuyla özgün çizim; **Ders 3 planına not: bu grafik Ders 2 - Bölüm 1'de anlatıldı, tekrar etme.** Razavi Ders 2'deki i–R hiperbolü kullanılmadı |
| 4 | Çalışma noktasını yük seçer; i = v / R | Razavi [11:55–12:03]; Ohm yasası |
| 5 | Gerçek pilde direnç küçüldükçe uç gerilimi düşer; belli akım aralığında ideale yakın | Razavi [12:28–12:54], [14:48–15:12] |
| 5 | İç direnç modeli (ideal kaynak + seri küçük direnç); ayrı bir direnç parçası yok | icerik.md 4 "Gerçek pil" ve 10 "İfade dikkati" |
| 5 | Taze AA alkalin (tek ürün: E91): 150–300 mΩ; modeldeki 1,5 V = anma gerilimi | Energizer E91 datasheet E91NA0323 s. 1 (icerik.md 5b) |
| 5 | v = 1,5 − 0,3 × i: 1,5 / 1,35 / 1,2 V; eğim 0,3 V/A | `dogrula.py`; icerik.md 7-2 |
| 5 | Tam çözüm Ders 3 (seri dirençler) | icerik.md 9 |
| 6 | 22 AWG Alpha Wire 3071: 16,2 Ω / 1000 ft (20 °C); 1 ft = 0,3048 m, 1000 × 0,3048 = 304,8 m; ≈ 53,1 mΩ/m; 20 cm = 0,20 m, ≈ 10,6 mΩ | Alpha Wire 3071 spec (2013) s. 1 (icerik.md 5b); `dogrula.py` |
| 6 | PTS645 (6 mm basmalı "tact" buton): kontak direnci en çok 100 mΩ; kontak değeri 50 mA, 12 V DC | C&K PTS645 (2022) s. B–143 (icerik.md 5b). Yalıtım direnci (10¹¹ Ω, üssü gözle doğrulanmadı) **videoya konmadı** |
| 6 | (a) 150 Ω: 10 mA; 3 mV + 1 mV + 0,11 mV ≈ 4,1 mV; %0,27 | `dogrula.py` (kesin seri çözümle de %0,27); icerik.md 5d |
| 6 | (b) 1,5 Ω: 1 A; 20 kat; ≈ 0,3 V (en çok, ideal akımla tahmin); %20; akım 1 A'in altında | `dogrula.py` (kesin 0,833 A, ekrana konmaz); icerik.md 5d |
| 6 | 10 kat kuralı: R_yük ≥ 10 × R_iç; 3 Ω; 0,5 A; 0,15 V; ≈ %10 | Hayes & Horowitz, AoE Student Manual (1989) Bölüm 1 (icerik.md 5b, 5c; kanal sahibinin Drive'ı) |
| 6 | Butonla 1 A'lik motor: sınırın 20 katı, kontaklar zarar görebilir; elektronik anahtar ileride | icerik.md 5c (olasılık diliyle) |
| 7 | Yorum sorusu (özgün; paketteki 30 kΩ / 300 Ω / 3 Ω sorusu Razavi'nin 1 kΩ / 100 Ω / 1 Ω dizisine benzediği için değiştirildi): 9 V pil, R_iç = 2 Ω (varsayım), 900 Ω: 10 mA, 2 Ω × 10 mA = 20 mV (%0,22, yeter); 9 Ω: 1 A, 2 V (%22, yetmez; kural 20 Ω) | `dogrula.py` |
| 7 | Bölüm 2: bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli | Razavi [15:23–31:27]; ../plan.md |

## Notlar
- Paket ile transkript çelişkisi yok. Paketteki 5c'nin 1 m / 5 A tel örneği, 2 A tel hesabı ve yalıtım direnci (0,12 nA) videoya girmedi (icerik.md 10 kısaltma önerisi).
- Seste "fit" yalnızca "bin fit, yani üç yüz dört virgül sekiz metre" olarak bir kez geçer.

## Denetim
Bağımsız denetçi (Agent aracıyla başlatılan alt ajan, metni ilk kez gören elektronik mühendisi + Türkçe editör rolü), 20.11.2026. Razavi Ders 2 transkriptini Drive'dan okudu (kaydetmedi), zaman damgalarının hepsini doğru buldu, `dogrula.py`'yi çalıştırdı ve sayıları elle yeniden hesapladı.
- **Kritik (1, düzeltildi):** Kancada gerçek pil için "tam bir amper" (gerçekte 0,83–0,91 A; Parça 6 ile çelişki) → "Pili ideal kabul edersek … bir amper"; "bir amperde düşmeye başlıyor" → "bir amper civarında belirgin biçimde düşüyor".
- **Önemli (10, hepsi düzeltildi):** (2) 1000 ft = 304,8 m hesabı eklendi (ses + ekran); (3) birim dönüşümleri eklendi: 1 A = 1000 mA (100 kat, 20 kat), 20 cm = 0,20 m, 100 mΩ = 0,1 Ω, 4,1 / 1500 = 0,0027 = %0,27, v_anahtar = 4,5 − 0 = 4,5 V; (4) Razavi'ye yakın cümleler kendi yapımızla yeniden kuruldu (P3 model cümlesi, P3 "anahtar söylemez", P4 "pilin üstünde 1,5 V yazması", P5 ilk paragraf) ve yorum sorusu özgün bir iç direnç sorusuyla değiştirildi; (5) v–i yatay doğrusunun Razavi Ders 3'te olduğu not edildi; (6) Ders 1 - Bölüm 3 tekrarı kısaltıldı (P3 kısa devre hesabı atıfla, P4 "tek bir direnç bağlıysa" cümlesi silindi, kart maddesi "İdeal kaynak: akım ve gerilim grafiği yatay doğru"); (7) "dokunmatik buton" → "basmalı buton"; (8) "çoğu kitapta" çıkarıldı; (9) ekranda kelime yerine "=" ve ":" kullanılan satırlar tam cümle yapıldı; (10) okunuş: tel direnci miliohmla ("elli üç virgül bir miliohm"), yorum sorusu "önce … sonra …"; (11) tanım dil bilgisi düzeltildi ("gerilimi içinden geçen akıma bağlı olmayan").
- **Küçük (uygulandı):** kanca kısaltıldı (~41 sn); doğallık düzeltmeleri ("Bu konudaki en sık yapılan hata da bu", "Büyüklükleri hatırladık", "elemanlarda", "ikinci dersin ilk bölümünde"); P6 "Doğrusu" → "Bunun yerine"; ekranda "datasheet" → "Veri sayfası"; "alkalin, üreticinin veri sayfası", "anma gerilimi"; P6 "tel, kapalı anahtar ve pil"; kartın 4. satırı açıklamaya taşındı; "v–i grafiği" ekranda "akım ve gerilim grafiği"; "i = v_R / R"; grafik etiketi çakışması (150 Ω etiketi noktanın sağ üstüne); hata kartında yanlış sonuç sayıyla ("1,5 Ω'da da 10 mA"); "Akla ilk gelen cevap evet olabilir".
- **2. tur (değişen kısımlar):** kritik yok; 1 önemli (Parça 6 "sıfır virgül sıfır sıfır yirmi yedi" okunuşu → "çarpı yüz, yüzde sıfır virgül yirmi yedi") ve küçükler (tel hesabına ohm → miliohm adımı ve "metre", P5 ilk ve son cümleler, P4 virgül ve "en açık biçimde", P3 uzun cümle ikiye bölündü, kanca ve Parça 6 kısaltıldı) uygulandı.
- **Açık kalan (genel müdüre not):** bitiş ekranındaki "—" UZUN.md 4a kalıbına göre korundu (4-3 ile görünür çelişki); 7 parça (UZUN.md 0 "4–6"), Ders 1'deki bütün bölümler gibi.

## Parça 7 sürüm 2 (21.11.2026, kredi sprinti) — yeni yorum sorusu
Neden: soru bankası kuralı (UZUN.md "Soru bankası", ICERIK.md 3/8: orta–üst zorluk). Onaylı soru (9 V, 2 Ω; 900 Ω / 9 Ω) Parça 6'daki 150 Ω / 1,5 Ω hesabının tekrarı (kolay–orta). İçerik Ajanı'nın önerisi (`inceleme.md`, soru bankası "D2B1-yeni") aynen alındı; sesteki açıklık düzeltmeleri (zorluk değişmez): "buton sınırının içinde kalsın" → "akım butonun elli miliamperlik sınırını geçmesin"; "Pilin iç direnci" → "Taze pilin iç direnci" (Parça 5–6 ile aynı); "Kapalı anahtarın sıfır volt modeli" → "Kapalı anahtarın uçlarında sıfır volt kabul etmek". Parça 1–6, selam, "Bilmen gerekenler" kartı, abone çağrısı ve ön tanıtım aynı.

| Parça | İddia / sayı | Kaynak / kontrol |
|---|---|---|
| 7 | Pil iç direnci en çok 0,3 Ω; buton kontak direnci en çok 0,1 Ω (100 mΩ), en çok 50 mA | Parça 5–6 ile aynı değerler (icerik.md bölüm 5; yeni veri sayfası iddiası yok) |
| 7 | Şart 1: 1,5 V / R ≤ 50 mA → R ≥ 30 Ω | `dogrula.py` |
| 7 | Şart 2: (0,3 + 0,1) Ω × 1,5 V / R ≤ %1 × 1,5 V = 15 mV → i ≤ 37,5 mA → R ≥ 40 Ω (belirleyici) | `dogrula.py` |
| 7 | Tuzak: kontağı unutmak → 0,3 Ω × i ≤ 15 mV → R ≥ 30 Ω (buton şartıyla aynı sayı) | `dogrula.py` |
| 7 | (b) 0,1 Ω × 37,5 mA = 3,75 mV (1,5 V'un %0,25'i). Buton için v = 0 alınsaydı: kayıpta yalnız pil → R ≥ 100 × 0,3 = 30 Ω; 30 Ω'da gerçek kayıp (0,3 + 0,1) Ω × 50 mA = 20 mV = %1,33 > %1 → şart 2 bozulur (tek cevap) | `dogrula.py` (kesin seri çözüm, yalnızca denetim: en küçük R_yük 39,6 Ω, orada 37,5 mA; R_yük = 40 Ω'da 37,13 mA / 3,71 mV) |

- Cevap videoda söylenmez ve ekrana yazılmaz (Soru Çözümü videosu; çözüm Drive "Soru Bankası – Çözümler").
- Yalnızca bu bölümde anlatılanlarla çözülür: Parça 5 "kaybolan gerilim yaklaşık iç direnç çarpı akım", Parça 6 parçaların kayıplarını toplama ve buton sınırı, Parça 3 kapalı anahtar = uçlarında sıfır volt.
- Süre: parça 1–6'nın gerçek ses süresi 739,5 sn / 1.789 kelime = 2,42 kelime/sn (2,6 değil). Parça 7 yeni hâliyle 236 kelime ≈ 98 sn (+20 sn bitiş ekranı). Bölüm toplamı gerçek hızla ≈ 739,5 + 98 + 125 sn ≈ 16,0 dk (dogrula.py'nin 2,6 kelime/sn tahmini 14,9 dk); 13–17 dk aralığında.

### Denetim (yazan oturumun kendi bağımsız denetimi)
- **1. tur** (Agent: doktora düzeyi EE + Türkçe editör; sayıları Python ile yeniden hesapladı, dogrula.py TAMAM): kritik yok; sayı/hesap hatası yok; cevap tek (40 Ω, kayıp şartı; 3,75 mV, %0,25); yalnızca Parça 1–6 ile çözülür. **2 önemli (düzeltildi):** (Ö1) krokide butonun gerilimi için + / − işaretleri, "v_buton" etiketi ve referans okunun yönü yoktu (Gösterim kuralı; Parça 3'teki v_anahtar gibi) → eklendi, (b) satırı "v_buton" ile bağlandı; (Ö2) abone kartı 2 soru tahtasının üstüne girerken yazıların y ≤ %76'da kalacağı yazılmamıştı → not + (b) satırı iki satıra bölündü. **5 küçük (uygulandı):** başlık süresi ~1:05 → ~1:25; "butonun sınırı" → "elli miliamperlik sınırı"; ekranda "toplam"; "taze" (ses + ekran); "sıfır volt modeli" → "uçlarında sıfır volt kabul etmek" / ekranda "Kapalı anahtar modeli (v = 0)". Zorluk: orta–üstün alt sınırında, eski sorudan belirgin biçimde güçlü.
- **2. tur** (Agent: metni ilk kez gören ayrı doktora düzeyi denetçi; sayıları yeniden hesapladı): kritik yok. **1 önemli (düzeltildi):** (b)'deki "sıfır volt kabul etmek yeterli mi?" sorusunun ölçütü yoktu: buton gerilimi tek başına küçük (%0,25) ama %1 bütçenin dörtte biri; v = 0 alan öğrenci 30 Ω bulur ve o direnç şart 2'yi bozar (%1,33) → "yeter" ve "yetmez" ikisi savunulabilirdi (tek cevap kuralı). Soru "v = 0 alsaydık R_yük kaç Ω çıkardı, o direnç iki şartı da sağlar mıydı?" biçimine çevrildi (tek cevap: 30 Ω, sağlamaz). **Küçük (uygulandı):** "pil ve buton için en kötü değerleri al" (0,15 Ω alan 25 Ω bulurdu); kroki yerleşimi (pil sol kol, kutu uçlarında + / −, buton üst kol, R_yük sağ kol, ok kutunun + ucundan butona); sol sütun satırları bölündü, "Tel ideal…" en üstte; kesin çözüm değerlerinin eşlemesi düzeltildi (39,6 Ω'da 37,5 mA; 40 Ω'da 37,13 mA / 3,71 mV); bölüm süresi gerçek hızla ≈ 16,0 dk.
- **İçerik Ajanı'na not:** inceleme.md ve soru-bankasi.md "D2B1-yeni" satırındaki (b) cevabı ("sıfır volt modeli yeterli") artık geçerli değil; yeni (b): 3,75 mV; v = 0 ile 30 Ω, şart 2 bozulur (20 mV, %1,33). Drive çözümü buna göre güncellenmeli. (Bu dosyalar İçerik Ajanı'nın; değiştirilmedi.)
- **3. tur** (Agent: ayrı, metni ilk kez gören denetçi): kritik yok, hesap hatası yok. **1 önemli (düzeltildi):** "o direnç iki şartı da sağlar mıydı?" v = 0 varsayımının içinde okunursa 30 Ω'da kayıp 0,3 × 50 = 15 mV = tam %1 → "evet, sınırda sağlar" da savunulabilirdi → soru ikiye bölündü: "…birinci sorunun cevabı kaç ohm çıkardı? Butonun gerçek kontak direnciyle bu direnç iki şartı da sağlar mı?" (tek cevap: hayır, 20 mV = %1,33). **Küçük (uygulandı):** uzun cümle bölündü ("Bir de şunu düşün:"); ekranda "v_buton = 0" ve "Gerçek butonla (0,1 Ω)"; kroki "R_iç" kutunun içinde seri direnç (Parça 5 gibi). Not (Soru Çözümü için): kesin çözümle 3,71 mV yazan da doğru (beklenen 3,75 mV).
- **4. tur** (Agent: ayrı, metni ilk kez gören denetçi; son kontrol): **kritik yok, önemli yok**; bütün alt soruların tek cevabı doğrulandı (40 Ω / kayıp şartı; 3,75 mV; v_buton = 0 → 30 Ω; gerçek kontakla 20 mV = %1,33, sağlamaz; kesin çözümle de bozulur: 49,3 mA, 19,7 mV). Küçükler uygulandı: ekranda "Bir de düşün:" ayrımı (seste ayrı soru), "direnciyle bu direnç" tekrarı giderildi, krokide pil kutusuna mavi "v". Soru Çözümü notu: kesin çözümle 39,6 Ω / 3,71 mV bulan da doğru sayılır (beklenen 40 Ω / 3,75 mV); eşitlikler (40 Ω'da tam %1, 30 Ω'da tam 50 mA) "geçmesin" gereği kabul edilir.

### 2. denetim (21.11.2026 14:15Z, ayrı hat oturumu; metni yazmamış oturum)
Sıfırdan: Parça 7 sesi ve sahne planı Parça 1–6, icerik.md, inceleme.md ve Ders 1 tanımlarına karşı okundu; bütün sayılar yeniden hesaplandı (Python): şart 1 → 30 Ω; şart 2 → (0,3 + 0,1) Ω × 1,5 V / R ≤ 15 mV → R ≥ 40 Ω (belirleyici); 0,1 Ω × 37,5 mA = 3,75 mV; v_buton = 0 → 30 Ω; gerçek kontakla 30 Ω'da 0,4 Ω × 50 mA = 20 mV = %1,33 > %1 → sağlamaz (kesin seri çözüm: 49,3 mA, 19,7 mV, yine bozulur). `dogrula.py` TAMAM. Oturumun kendi okuması + Agent aracıyla ayrı denetçi (doktora düzeyi EE + Türkçe editör), 2 tur.
- **Kritik:** yok. Hesap hatası yok.
- **Önemli (2, düzeltildi):** (Ö1) Toparlamada "akımı/gerilimi çevre belirler": devre teorisi Türkçesinde "çevre" = mesh (çevre akımları yöntemi); öğrenci karıştırabilir ve Parça 3'teki "bağlı olduğu devre belirler" ile tutarsız → "bağlı oldukları devre / bağlı olduğu devre". (Ö2) Son alt soruda "bu yük direnci" dinleyici tarafından (b)'deki 40 Ω'a bağlanabilirdi (40 Ω'da gerçek kayıp tam %1 → "sağlar" ikinci cevap olurdu) → "sıfır volt kabulüyle bulduğun bu direnç"; ekranda "v_buton = 0 ile bulduğun direnç".
- **Önemli (render'da ölçülecek):** (Ö3) soru tahtasında sol sütun 11–12 satır + abone kartı 2 → y ≤ %76 riski: "Tel ideal…" notu sağ sütuna, krokinin altına taşındı; sahne planına ölçüm notu eklendi.
- **Küçük (uygulandı):** uzun şart cümlesi ikiye bölündü ("Birincisi: … İkincisi: …"); "akımı ideal modelle, yani iç direnç ve kontak direnci yokmuş gibi tahmin et" (cevap değişmez); ekranda "(a)/(b)" → "1. soru / 2. soru" (Parça 6'daki (a)/(b) yük durumlarıyla karışmasın); "Şart 1: Akım en çok 50 mA (i ≤ 50 mA, buton sınırı)" (kelime yerine işaret yok); ses "İdeal tel ve ideal kapalı anahtar", kart "- İdeal tel ve kapalı anahtar: gerilim sıfır"; vurgu süresi notu (mavi alt çizgi → silme ≥ 1,0 sn); başlık süresi ~1:45.
- **Uygulanmadı (gerekçeli):** abone ricası "Bu ders işine yaradıysa … ikinci bölümü kaçırmazsın" UZUN.md 4a zorunlu kalıbı.
- **2. tur:** kritik/önemli yok, gerileme yok; tek cevap kuralı bütün alt sorularda geçerli.
- Süre: Parça 7 255 kelime ≈ 105 sn (2,42 kelime/sn); bölüm ≈ 16,1 dk (13–17 dk aralığında).
- **İçerik Ajanı'na not (dosyaları değiştirilmedi):** soru-bankasi.md "D2B1-yeni" satırı ve Drive çözümü: (b)'nin son kısmı artık "v_buton = 0 ile 30 Ω; gerçek kontakla 20 mV = %1,33, sağlamaz".
