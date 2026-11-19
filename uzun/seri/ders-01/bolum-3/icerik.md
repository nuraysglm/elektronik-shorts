# İçerik paketi — Devre Teorisi I: Ders 1 - Bölüm 3/3

Hazırlayan: İçerik Ajanı (ICERIK.md), 19.11.2026. Sürüm 2 (bağımsız denetimden sonra düzeltildi; bkz. `## Denetim`).
Doğrulama: `icerik_dogrula.py` (çalıştırıldı, "TÜM KONTROLLER GEÇTİ"; özet bölüm 7'de).
Durum: bu bölümün metni (`metin.md`) henüz yazılmadı; bu yüzden `inceleme.md` yok. Uzun Video Ajanı metni bu paketten yazar.

## 1. Künye

- **Ders / bölüm:** Ders 1 - Bölüm 3/3.
- **Konu:** Gerilim nedir? (birim pozitif yükü taşımak için gereken enerji), gerilimin değeri ve işareti, gerilim yalnızca iki nokta arasında anlamlıdır, kısa devre yalnızca v = 0'ı garanti eder, ideal gerilim kaynağı. **Uygulamada:** "datasheet'teki gerilimler ve gerçek bir gerilim kaynağı" (3,3 V regülatör).
- **Razavi transkripti:** Ders 1 [28:08–43:19] (kanal sahibinin özel Drive klasörü; depoya kopyalanmadı). Uygulamada kısmının Razavi'de karşılığı yoktur; dayanağı [34:29–36:52] (değer, işaret, iki nokta), [37:01–38:47] (kısa devre), [42:46–43:19] (ideal batarya) + üretici datasheet'leri (bölüm 11).
- **Tahmini süre:** 13–16 dk (metin ~1.900–2.200 kelime). Önerilen dağılım bölüm 10'da; "Uygulamada" **~3:30 (≤ ~550 kelime)**.

## 2. Öğrenme hedefleri

Bu bölümün sonunda öğrenci:
1. İki nokta arasındaki gerilimi "birim pozitif yükü b'den a'ya taşımak için gereken enerji" olarak tanımlayıp V = W / q ile hesaplayabilir (J / C = V).
2. Her gerilimi bir değer ve +/− işaretiyle yazar; işaretleri ters çevirince sayının eksi olduğunu (V_ba = −V_ab) gösterebilir; "bir noktanın gerilimi"nin her zaman bir referansa (toprak) göre olduğunu açıklar.
3. Kısa devrenin yalnızca gerilimin sıfır olduğunu garanti ettiğini, akımın çevreden belirlendiğini; açık devre (i = 0) ile kısa devre (v = 0) ikiliğini doğru kurar.
4. İdeal gerilim kaynağının uç gerilimini yükten bağımsız tuttuğunu, akımı ise yükün belirlediğini (i = V / R) hesaplar; bu modelin gerçek bir parçada ne zaman geçerli olmadığını (en büyük çıkış akımı, kısa devre) datasheet'ten okuyabilir.
5. Bir datasheet'teki gerilim değerinin hangi iki uç arasında ve hangi işaretle verildiğini (V_DS, V_GS, V_RRM, V_IN) okuyabilir.

## 3. Ön bilgi

- Bölüm 1: yük (C), akım i = dq/dt (A = C/s).
- Bölüm 2: referans oku; açık devre yalnızca i = 0'ı garanti eder; ideal anahtar (kapalıyken tel, açıkken açık devre).
- Ohm yasası v = R × i (Razavi [10:43–11:05]).
- Fizikten: iş = kuvvet × yol, enerji birimi joule (J); elektrik alanı sezgisel olarak. (Alan kavramı yalnızca Razavi'nin levha resmi için, hesap yok.)
- Ön ekler: m, µ, k.

## 4. Kavramlar

| Kavram | Doğru tanım (öğrenci diliyle) | Birim / işaret kuralı | Geçerlilik sınırı |
|---|---|---|---|
| Gerilim (gerilim farkı) V_ab | **Bir birim pozitif yükü (1 C) b noktasından a noktasına taşımak için harcamamız gereken enerji** [29:13–31:07]. Genel yük q için: V_ab = W / q [31:07–31:33]. Fizikteki "potansiyel farkı" ile aynı şey [28:17–28:25]. | Volt: 1 V = 1 J / 1 C. V_ab = V_a − V_b. | Tanımdaki "harcanan enerji" yükü yavaşça (hızlandırmadan) taşıyan dış etkinin işidir. Enerji eksi çıkarsa (yük "yokuş aşağı" gidiyorsa) V_ab eksidir. Devre teorisinde gerilimi hep bu tanımla değil, uçlara konan +/− işaretleriyle kullanırız. |
| Levha resmi (sezgi) | Pil iki iletken levhaya + ve − yük yükler, aralarında alan oluşur; pozitif yükü alana karşı alt levhadan üst levhaya taşımak iş ister; bu işin birim yük başına değeri levhalar arası gerilimdir [31:42–34:12]. | — | Yalnızca sezgi. Alan hesabı (E = V / d) bu derste yok. "Kaldırmak" benzetmesi yer çekimi benzetmesidir; birebir değildir. |
| Gerilimin değeri ve işareti | Akımın değeri ve yönü olduğu gibi gerilimin de **değeri ve işareti** vardır [34:29–35:51]. Elemanın uçlarına + ve − konur: "+ ucu − ucundan V volt yüksek". | İşaretler ters çizilirse aynı durumda sayı eksi olur: V_ba = −V_ab. | İşaretsiz yazılmış bir gerilim sayısı eksiktir (Bölüm 2'deki "oksuz akım" gibi). |
| Gerilim iki nokta arasında anlamlıdır | "Bu noktanın gerilimi 5 V" demek "bu noktadan **başka bir noktaya** göre 5 V" demektir [35:51–36:52]. Pratikte o başka nokta çoğu zaman **toprak** (devrenin ortak referans ucu, GND) olur. | V_A = V_A − V_toprak. Referans değişirse "noktanın gerilimi" değişir, iki nokta arasındaki fark değişmez. | "Toprak" burada devrenin seçilmiş referans düğümüdür; topraklama hattı/şebeke toprağı ile karıştırılmaz (ileride). |
| Kısa devre | İki nokta arasına direnci sıfır kabul edilen bir tel koymak. **Garanti ettiği tek şey: v = 0** [37:01–38:16]. Ohm yasasıyla: R = 0 ve akım sonlu ise v = R × i = 0 [37:44–38:08]. | v = 0. Akımı kısa devrenin kendisi değil, **çevresindeki devre** belirler [38:16–38:32]. | İdeal tel. Gerçek telin/izin çok küçük direnci vardır (milliohm düzeyi); büyük akımda uçlarında küçük bir gerilim görülür. |
| Açık–kısa devre ikiliği | Açık devre i = 0'ı, kısa devre v = 0'ı garanti eder [38:32–38:47]. Diğer büyüklüğü her ikisinde de çevre belirler. | — | — |
| İdeal gerilim kaynağı | Uçları arasındaki gerilimi, ona ne bağlanırsa bağlansın aynı (V_S) tutan eleman [42:46–43:19]. Akımı **kaynak değil yük** belirler: tek dirençte i = V_S / R. | Sembol: + ve − işaretli daire veya pil sembolü; gerilim + ucundan − ucuna. | **Model sınırı:** (1) İdeal kaynağı kısa devre etmek bir çelişkidir: kaynak "V_S" der, tel "0" der; i = V_S / R, R → 0 için sınırsız büyür. Gerçek kaynakta böyle olmaz. (2) Gerçek kaynak bu davranışı yalnızca belli bir akıma kadar gösterir (datasheet'te "en büyük çıkış akımı"). Gerçek pilde uç gerilimi akım arttıkça biraz düşer (iç direnç; ileride). |
| Datasheet gerilimleri | Datasheet'teki her gerilim **iki uç arasında** verilir ve alt simgeler bu iki ucu söyler: V_DS = savak (drain) ile kaynak (source) arası, V_GS = kapı (gate) ile kaynak arası; V_IN çoğunlukla GND'ye göre. Diyotta ileri yön (V_F) ile ters yön (V_RRM) ayrı satırlardır. | Değer işaretiyle okunur: "−0,3 V … 6,0 V" demek giriş GND'den 0,3 V'tan fazla aşağı inmemeli (aşılırsa parça bozulabilir). | Bunlar **mutlak en büyük değerler** (aşılmaması gereken sınır) ya da **önerilen çalışma koşulları**dır; ikisi farklıdır. |

## 5. Uygulamada: datasheet'teki gerilimler ve gerçek bir gerilim kaynağı (zorunlu; 3–4 dk)

### 5a. Ana fikir (tek cümle)
Bu bölümün üç fikri bir datasheet'te doğrudan karşımıza çıkar: **(1) her gerilim iki uç arasında ve işaretiyle verilir** (V_DS, V_GS, V_IN), **(2) ideal gerilim kaynağı modeli gerçek bir regülatörde çok iyi tutar ama yalnızca belli bir akıma kadar**, **(3) kısa devrede akımı çevre belirler**: gerçek bir regülatörde bu "çevre" regülatörün kendi akım sınırıdır.

### 5b. Datasheet karşılığı (gerçek parçalar; değerler sayfadan okundu)

| Parça | Gerilim değeri (iki uç ve işaret) | Bu bölümle bağı | Not |
|---|---|---|---|
| **TLV755P** (TLV75533P = 3,3 V sabit çıkış) düşük düşümlü (LDO) gerilim regülatörü — Texas Instruments, **SBVS320D**, Kasım 2017, rev. Eylül 2024 | **Mutlak en büyük:** V_IN −0,3 … 6,0 V; V_OUT −0,3 … (V_IN + 0,3 V) ya da 6,0 V'tan küçüğü (bölüm 5.1, s. 4). **Önerilen çalışma:** V_IN 1,45 … 5,5 V; **I_OUT 0 … 500 mA** (bölüm 5.3, s. 4). **Çıkış doğruluğu:** −%1 … +%1 (−40 … 85 °C, DBV/DRV kılıfı; bölüm 5.5, s. 5). **Yük regülasyonu:** 0,060 V/A (DBV kılıfı), 0,1 mA ≤ I_OUT ≤ 500 mA (bölüm 5.5). **Düşüm gerilimi** (V_IN − V_OUT en az), DBV kılıfı, 500 mA, 3,3 V çıkış: en çok 238 mV (−40 … 125 °C; −40 … 85 °C'de en çok 215 mV, tipik 150 mV; bölüm 5.5, s. 6). Bu pakette her değer **DBV (SOT-23-5) kılıfı** için. **Akım sınırı I_CL:** 560 / 720 / 865 mA (en az / tipik / en çok; denetçi doğruladı). **Kısa devre akımı I_SC:** 355 mA tipik, V_OUT = 0 V (bölüm 5.5; 6.3.3). 560 mA'den küçük olmasının nedeni: çıkış 0,4 × 3,3 = 1,32 V'un altına düşünce regülatör akım sınırını kendiliğinden azaltır (6.3.3; videoda yalnızca "çıkış çok düşünce akımı daha da azaltır"). **Isıl direnç** R_θJA (DBV): 231,1 °C/W (JEDEC kart) — yalnızca ajana bilgi. **Isıl kapanma:** 165 °C'de kapanır, 155 °C'de yeniden açılır (bölüm 5.5 ve 6.3.4, s. 13). | **İdeal gerilim kaynağına çok yakın:** 0,1 mA'den 500 mA'e kadar yük değişince çıkış yaklaşık (tipik olarak) 30 mV değişir (3,3 V'un ≈ %0,9'u). **Model sınırı:** 500 mA'in üstü önerilmez; akımın yanında **ısınma da ayrı bir sınırdır** (güç Ders 2'de); kısa devrede akımı regülatörün iç akım sınırı belirler (≈ 355 mA), sonra ısınıp kapanır ve açılıp kapanmayı tekrarlar (bölüm 6.3.3, s. 13: kısa devrede I_SC verir; sorun sürerse akım sınırı ile ısıl kapanma arasında gidip gelir). | Gerilimler GND ucuna göredir (tablo bunu ayrıca yazmıyor; pin adı GND). "Düşüm gerilimi" iki nokta arası gerilimin (IN − OUT) en güzel örneğidir. **Görsel doğrulama:** yük regülasyonu satırında 0,060 V/A'nın tipik mi en çok mu olduğu PDF metninden okunamadı; ekrana "tipik" ya da "en çok" yazmadan önce s. 5'teki tabloya bakılsın. Videoda "≈ 30 mV" denmesi bu belirsizlikten etkilenmez (yalnızca "yaklaşık" denir). |
| **2N7002E** küçük sinyal N-kanal MOSFET — onsemi, 2N7002E/D **Rev. 8**, Ekim 2023, s. 1 "Maximum Ratings" | **V_DSS = 60 V** (savak–kaynak), **V_GS = ±20 V** (kapı–kaynak), T_J = 25 °C. | **Alt simge iki ucu söyler.** "D" ve "S": gerilim savakla kaynak arasında. ± işareti: kapı kaynağa göre 20 V'tan fazla yukarı da, aşağı da çıkmamalı (aşılırsa kapı bozulabilir). | Bölüm 2 paketindeki aynı parça (süreklilik). Seste "elektronik bir anahtar"; "savak, kapı" terimleri seste kullanılmaz, ekranda uç adı küçük yazılabilir (bkz. bölüm 10). |
| **1N4007** doğrultucu diyot — Vishay, doc 88503, rev. 29-Apr-2020, s. 1–2 | **V_RRM = 1000 V** (tekrarlı tepe ters gerilim); V_DC = 1000 V (DC engelleme); **V_F en çok 1,1 V** (I_F = 1,0 A, T_A = 25 °C). | **İşaret önemlidir:** aynı iki uç arasında, bir yönde (ileri) en çok 1,1 V görülür, ters yönde 1000 V'a dayanır. Aynı iki nokta, ters işaret, bambaşka sınır. | Bölüm 2 paketindeki aynı parça. Diyot davranışı ileride; burada yalnızca "iki yön, iki ayrı satır". |

Okuma kuralı (öğrenciye verilecek iki soru, Bölüm 2'deki "üç soru"nun gerilim karşılığı): **(1) Bu gerilim hangi iki uç arasında? (2) Hangi işaretle (hangi uç daha yüksek)?** Ardından Bölüm 2'deki gibi: koşul ne (sıcaklık, akım)?

### 5c. Tasarımcı hangi değere ne zaman bakar, hangi hata pahalıya patlar
- **Besleme seçerken → çıkış gerilimi, doğruluk, en büyük çıkış akımı.** "3,3 V" yazan bir regülatör, ideal kaynak gibi davranacağını **yalnızca** önerilen akım aralığında söyler (TLV755P: 0 … 500 mA). Isınma da ayrıca sınırlar (Ders 2'den sonra hesaplanır).
- **Girişe bakarken → iki nokta arası gerilim.** Regülatör çalışsın diye V_IN − V_OUT en az düşüm gerilimi kadar olmalı: 3,3 V + 0,238 V = 3,538 V. USB'den 5 V uygun; boşalmakta olan bir lityum pilin 3,4 V'u 500 mA'de yetmez (hafif yükte düşüm çok daha küçüktür).
- **Pahalı hata 1 (ideal kaynak modelini sınırsız sanmak):** "Kaynak 3,3 V, ne bağlarsam bağlayayım 3,3 V verir" diye 3,3 Ω'luk bir yük (ör. küçük bir ısıtıcı direnç) bağlamak: gereken 3,3 V / 3,3 Ω = 1 A, regülatörün akım sınırının en büyük değerinin (865 mA) bile üstünde; regülatör akımı sınırlar, çıkış 3,3 V'ta kalamaz, devre yeniden başlar ya da regülatör ısınıp kapanır.
- **Pahalı hata 2 (işareti okumamak):** Girişin mutlak sınırı −0,3 V. Lityum pili ters takmak girişe yaklaşık −3,7 V uygular; bu, −0,3 V sınırının çok altında; bu yüzden tasarımcılar ters bağlanmaya karşı koruma ekler (ayrıntısı ileride).
- **Pahalı hata 3 (iki ucu karıştırmak):** 2N7002E'nin 60 V'u savak–kaynak arasındır; kapı–kaynak arası yalnızca ±20 V. "Parça 60 V'luk" diye kapıya 24 V uygulamak kapıyı bozar.
- Not: Bu üç madde "En sık yapılan hata" etiketi **almaz** (bölüm 6: videoda tek "En sık yapılan hata" var). "Tasarımda pahalıya patlayan hata" gibi düz bir ifadeyle anlatılabilir.

### 5d. Mini tasarım örneği (tam hesaplı; özgün)
**Görev:** USB'den gelen 5 V ile bir TLV75533P (3,3 V, DBV kılıfı) çalıştırıyoruz. Çıkışına sırayla farklı yükler bağlayacağız. Hangileri bağlanabilir, çıkış gerilimi ne olur, akım ne olur?

1. **Giriş uygun mu?** Gerekli en küçük giriş: 3,3 V + 0,238 V = 3,538 V. 5 V ≥ 3,538 V ve 5 V ≤ 5,5 V (önerilen en büyük) → uygun. Regülatörün giriş ile çıkış uçları arasındaki gerilim: V_IN − V_OUT = 5 − 3,3 = 1,7 V.
2. **Yükleri tek tek bağla** (ideal kaynak modeli: gerilim 3,3 V sabit, akımı yük belirler, i = V / R):
   - 330 Ω: i = 3,3 V / 330 Ω = 0,01 A = 10 mA.
   - 66 Ω: i = 3,3 V / 66 Ω = 0,05 A = 50 mA.
   - 33 Ω: i = 3,3 V / 33 Ω = 0,1 A = 100 mA.
   - Üçü de 500 mA'in altında → uygun. **Her durumda uç gerilimi 3,3 V; değişen yalnızca akım.** Bu, Razavi'nin "ideal batarya uç gerilimini korur" fikrinin [42:46–43:19] gerçek parçadaki karşılığıdır.
3. **Model ne kadar iyi?** Yük 10 mA'den 100 mA'e çıkınca çıkışın değişimi (tipik): ΔV = 0,060 V/A × (0,100 − 0,010) A = 0,060 × 0,090 = 0,0054 V = 5,4 mV. Tüm aralıkta (0,1 mA → 500 mA): 0,060 × 0,4999 ≈ 0,030 V = 30 mV; 30 mV / 3300 mV ≈ %0,9. İdeal kaynak modeli bu aralıkta çok iyi tutuyor.
4. **Akım açısından en küçük yük direnci:** R = 3,3 V / 0,5 A = 6,6 Ω. Bundan küçük bir direnç bağlanmaz. (Isınma ayrıca sınırlar: 5 V girişte büyük akımlarda regülatör ısınır; güç Ders 2'de. Bu yüzden örnekte en çok 100 mA kullanıldı.)
5. **Model nerede çöker? (3,3 Ω):** İdeal model i = 3,3 V / 3,3 Ω = 1 A der. Bu, akım sınırının en büyük değerinin (865 mA) bile üstünde → her TLV755P akımı sınırlar, çıkış 3,3 V'ta kalamaz. Kaynak artık "ideal gerilim kaynağı" değildir.
6. **Kısa devre (R = 0):** İdeal modelde i = 3,3 / R; R = 1 Ω'da 3,3 A, 0,1 Ω'da 33 A, 0,01 Ω'da 330 A … sınırsız büyür (çelişki). Gerçek TLV755P'de akımı **çevre**, yani regülatörün kendi akım sınırı belirler: V_OUT = 0 V iken tipik 355 mA (çıkış çok düşünce akımı daha da azaltır). Regülatör ısınır; DBV kılıfında ısıl kapanmaya (165 °C) girer, soğuyunca açılır, kısa devre sürdükçe bu tekrar eder. Kısa devre "v = 0"ı garanti etti, akımı ise devrenin geri kalanı belirledi: bu bölümün kuralı.

**Öğrencinin çıkaracağı kural:** "İdeal gerilim kaynağı uç gerilimini sabit tutar; akımı yük belirler. Gerçek bir kaynak bunu yalnızca datasheet'teki akım sınırına kadar yapar. Bir gerilim değerini okurken önce hangi iki uç arasında ve hangi işaretle olduğuna bak."

## 6. En sık yapılan hata ve Doğrusu (bölümde tek)

- **En sık yapılan hata:** Açık devre ile kısa devreyi karıştırmak: "kısa devrede akım sıfırdır" ya da tersi, "kısa devre edilen direnç akımı paylaşmaya devam eder". Yanlış sonuç: bir kaynağı kısa devre edince "akım geçmez, zararsız" sanmak; kısa devre edilmiş bir dirençten hâlâ akım geçtiğini sanmak.
- **Doğrusu:** Kısa devre yalnızca **v = 0**'ı garanti eder; içinden geçen akımı çevresindeki devre belirler (çevrede direnç küçükse çok büyük olabilir). Açık devre ise yalnızca **i = 0**'ı garanti eder. İkili: açık devre → akım sıfır; kısa devre → gerilim sıfır.
- **Gerekçe (gerçekten yaygın mı?):** Razavi bu ayrımı açıkça vurgular [38:16–38:47] ("that's the distinction between an open circuit and a short circuit"), Bölüm 2'de de açık devre için aynı uyarıyı yapmıştı [19:08–19:32]. Ders planı (plan.md, Bölüm 3) bu hatayı seçmiş. Denetçi notu: Razavi bir öğrenci hatası bildirmiyor, bir garantiyi vurguluyor; "kısa devre edilen eleman hâlâ akım taşır" yanılgısının fizik eğitimi literatüründe (kısa devre edilmiş ampul) bilindiği söylendi ama atıf bu çalışmada açılıp doğrulanmadı. Bu yüzden kart iki yönlü kuruldu (karıştırma hatası) ve 2 kΩ / 1 kΩ örneği tam bu yanılgıyı düzeltiyor. AGENT.md 2f-0 için yeterli sayıldı; kanal sahibi metin onayında görür.
- Önerilen örnek (özgün, Razavi'ninkinden farklı): 6 V'luk ideal kaynak, 2 kΩ ve 1 kΩ seri; 1 kΩ'un uçları bir telle kısa devre edilir → 1 kΩ'un gerilimi 0 V, 1 kΩ'dan akım geçmez (tel ona paralel ve gerilimi 0 olduğu için 1 kΩ'un akımı 0 / 1 kΩ = 0), **telin akımı** 6 V / 2 kΩ = 3 mA. **Dikkat:** bu örnek kısa devrenin akımını "çevre"den bulmayı gösterir ama seri devre + akımın kollar arasında paylaşılması KCL/KVL sezgisi ister (Ders 2–3). Uzun Video Ajanı seçerse yalnızca "tel varken 2 kΩ doğrudan 6 V'a bağlanmış olur" gerekçesiyle anlatsın; KCL/KVL adı geçmesin. Daha basit seçenek: 5d adım 6 (regülatörün kısa devresi).
- "Uygulamada" kısmındaki ideal kaynak sınırı ikinci bir "En sık yapılan hata" kartı **olmaz**.

## 7. Sayısal örnekler (özgün; hepsi `icerik_dogrula.py` ile doğrulandı)

1. **Enerji / yük = gerilim:** 4 µC'lik pozitif yükü b'den a'ya taşımak 18 µJ istiyor. V_ab = W / q = 18 µJ / 4 µC = 18 / 4 = 4,5 V (µ'lar sadeleşir: J / C = V). Bir birim yük (1 C) için aynı tanım: 4,5 J. Yükü iki katına çıkarsak (8 µC) enerji 36 µJ olur, gerilim yine 36 / 8 = 4,5 V: gerilim yükün miktarına değil, iki noktaya bağlıdır. İşaret: aynı yükü a'dan b'ye taşırken bu enerjiyi geri alırız → V_ba = −4,5 V. (Tutarlılık kontrolü, bağımsız değil: düzgün alan modeliyle W = q × E × d, E = V / d → aynı 18 µJ.)
2. **Noktanın gerilimi bir referansa göredir:** Toprağa göre V_A = 5 V, V_B = 3,3 V. V_AB = V_A − V_B = 5 − 3,3 = 1,7 V; V_BA = −1,7 V. Referansı B'ye taşırsak "A'nın gerilimi" 1,7 V, "B'nin gerilimi" 0 V olur; ama A ile B arasındaki gerilim yine 1,7 V. (Bu, mini tasarımdaki V_IN − V_OUT = 1,7 V ile aynı sayıdır; Uzun Video Ajanı bunu köprü olarak kullanabilir.)
3. **Mini tasarım (5d):** 10 mA / 50 mA / 100 mA; R_min = 6,6 Ω; ΔV = 5,4 mV (10 → 100 mA), ≈ 30 mV (tüm aralık, %0,9); 3,3 Ω → 1 A (> 865 mA); giriş en az 3,538 V; kısa devre: ideal 3,3 / 33 / 330 A, gerçek tipik 355 mA.

Ek (yalnızca paket içi bilgi, **ekrana konmaz**): regülatörde harcanan güç (V_IN − V_OUT) × i: 100 mA'de 1,7 × 0,1 = 0,17 W → DBV/JEDEC kartta sıcaklık artışı 0,17 × 231,1 ≈ 39 °C (uygun); 330 mA'de 0,561 W → ≈ 130 °C artış (T_J önerilen 125 °C'nin üstü: bu yüzden örnekte 10 Ω kullanılmadı); kısa devrede (5 − 0) × 0,355 ≈ 1,78 W → ısıl kapanma; %1 doğruluk bandı 3,267 … 3,333 V; 2N7002E 12 V sistemde pay 60 / 12 = 5 kat.

`icerik_dogrula.py` çıktısı: tüm assert'ler geçti (19.11.2026).

## 8. Yorum sorusu (cevabıyla)

*"3,3 V'luk bir regülatörün çıkışına 22 Ω'luk bir direnç bağlıyoruz. Direncin uçlarındaki gerilim ve içinden geçen akım ne olur? Regülatörün en büyük çıkış akımı 500 mA."*
Cevap: Regülatör 500 mA'e kadar ideal gerilim kaynağı gibi davrandığı için direncin gerilimi 3,3 V; akım i = 3,3 V / 22 Ω = 0,15 A = 150 mA (500 mA'in altında, uygun).

Zor ek (isteğe bağlı, sabitlenmiş yorumda cevaplanabilir): *"Peki çıkışı bir telle kısa devre etseydik?"* Cevap: Telin uçları arasındaki gerilim 0 V olur (kısa devrenin garantisi). Akımı tel değil regülatör belirler: tipik 355 mA. Regülatör ısınır, aşırı ısınınca kapanır, soğuyunca yeniden açılır. İdeal bir kaynak olsaydı akım sınırsız büyürdü; bu yüzden ideal modeli kısa devrede kullanamayız.

## 9. Kapsam dışı / sonraya bırakılan

- **Elektrik alanı hesabı** (E = V / d), potansiyel enerji, elektron-volt: anılmaz; levha resmi yalnızca sezgi.
- **Güç** (p = v × i) ve enerji: Ders 2. Kısa devrede regülatörün ısınmasının nedeni yalnızca "ısınır" diye söylenir.
- **Pilin iç direnci**, Thevenin modeli: yalnızca "gerçek pilin gerilimi çok akım çekince biraz düşer (ileride)".
- **KCL / KVL**: anılmaz (Ders 2–3). Paralel bağlı elemanların aynı gerilimi görmesi Razavi'deki gibi "hepsi aynı iki noktaya bağlı" diye anlatılır.
- **Regülatörün iç yapısı** (LDO, geri besleme, PMOS geçiş transistörü), geri katlamalı (foldback) akım sınırı, ısıl direnç: anılmaz; yalnızca "kendi akımını sınırlar ve aşırı ısınınca kapanır".
- **Diyot ve MOSFET'in nasıl çalıştığı**: ileride; yalnızca uç adları ve gerilim satırları.
- Ters bağlanma koruması devresi: yalnızca adı.
- Şebeke topraklaması / koruma toprağı: anılmaz (yalnızca "devredeki toprak = ortak referans ucu").

## 10. Uzun Video Ajanı'na notlar

- **Parça önerisi (6 parça, ~14–15 dk):** (1) kanca + intro kartı; (2) gerilim tanımı: birim pozitif yük, enerji, V = W / q, örnek 1 (≈ 2:30); (3) levha resmi (sezgi, kısa) + değer ve işaret, V_ba = −V_ab (≈ 2:30); (4) gerilim iki nokta arasında, toprak, örnek 2 (≈ 2:00); (5) kısa devre + açık–kısa devre ikiliği + "En sık yapılan hata" + ideal gerilim kaynağı (≈ 3:00); (6) **Uygulamada**: datasheet'teki gerilimler + mini tasarım (≈ 3:30); (7) "Bilmen gerekenler" kartı + yorum sorusu + kapanış (≈ 1:00). "Uygulamada" ideal kaynaktan hemen sonra gelsin, çünkü mini tasarım ideal kaynağı ve kısa devreyi birlikte kullanır.
- **"Uygulamada" akışı (~550 kelime):** (a) iki soru kuralı, 2N7002E (60 V savak–kaynak, ±20 V kapı–kaynak) ve 1N4007 (ileri en çok 1,1 V, ters 1000 V) **yalnızca ekrandaki tabloda**, seste tek cümle (~40 sn); (b) mini tasarım adım 1–4 (~90 sn); (c) adım 5–6: model çöker, kısa devrede akımı regülatör belirler (~50 sn); (d) pahalı hata 1 + köprü cümlesi (~30 sn). **Zorunlu kısaltma (denetim k8):** pahalı hata 2–3 videoya girmez (yalnızca açıklamaya); adım 3'te seste yalnızca 10 → 100 mA hesabı, "tüm aralıkta yaklaşık 30 milivolt" tek cümle; ısınma notları videoya girmez (yalnızca "büyük akımda regülatör ısınır; bunu güç konusunda hesaplayacağız").
- **Seslendirme:** "V_DS", "V_GS", "I_SC", "TLV75533P" seste harf harf okunmaz; seste "elektronik bir anahtarın iki ucu arasında", "üç virgül üç voltluk bir regülatör", "kısa devre akımı". "mV" seste "milivolt"; "Ω" seste "ohm"; "µC" "mikrokulon", "µJ" "mikrojul". "V_ab" seste "a ile b arasındaki gerilim" (harfli büyüklükleri okutmaktan kaçın; UZUN.md 2 "ve ile karışan yapılar" kuralı: "V a b" değil). "LDO" seste söylenmez; "regülatör" (ilk geçtiği yerde: "gerilimi sabit tutan bir entegre devre") yeter.
- **İfade dikkati:**
  - Tanımda "**pozitif** birim yük" ve "**b'den a'ya**" sırası korunsun (V_ab = V_a − V_b ile uyumlu). Sırayı ters söylemek işareti ters çevirir.
  - "Gerilim noktadadır" denmez; "iki nokta arasında" denir. "Toprağa göre" söylenmeden "bu noktanın gerilimi" denmesin; dendiyse hemen "toprağa göre" eklensin.
  - "İdeal kaynak sonsuz akım verir" denmesin; doğru ifade: "ideal modelde direnç küçüldükçe akım sınırsız büyür; bu, ideal modelin kısa devrede anlamını yitirdiğini gösterir."
  - "Regülatör ideal kaynaktır" denmesin; "önerilen akım aralığında ideal kaynağa çok yakın davranır".
  - Datasheet sınırları "en çok bu kadar", "aşılmaması gereken" diye anılır.
- **Ekran:** Datasheet tablosu kopyalanmaz (telif); kendi tablomuz: sütunlar "hangi iki uç arasında" | "değer ve işaret". Kaynak satırı küçük gri, her parça için: "TI TLV755P datasheet (SBVS320D, 2024)", "onsemi 2N7002E datasheet (2023)", "Vishay 1N4001–1N4007 datasheet (2020)". Mini tasarımda: soldan sağa 5 V kaynağı, regülatör, yük direnci; yükün uçlarında + / − ve "3,3 V" (mavi), akım oku ve değeri (mavi, i = 3,3 V / R adım adım). Kısa devre adımında tel kırmızı, "v = 0" yeşil, "akımı çevre belirler: ≈ 355 mA". Karışabilecek çizgiler farklı renk/etiketle (ICERIK 7a-4).
- **Sayılar:** her ara adım ekranda ve seste (UZUN.md 0, AGENT.md 2b-7): özellikle "0,060 × 0,090 = 0,0054 V = 5,4 mV" ve "3,3 + 0,238 = 3,538 V" adımları atlanmasın. Ekranda kelime yerine işaret yok (7a-5): "3,3 Ω → çöker" gibi yazılmaz; "3,3 Ω bağlanırsa çıkış 3,3 V'ta kalamaz (i = 3,3 / 3,3 = 1 A, akım sınırı en çok 865 mA)" yazılır.
- **"Bilmen gerekenler" kartı önerisi:** "Gerilim: iki nokta arasında, işaretiyle" · "Kısa devre: gerilim sıfır, akımı çevre belirler" · "İdeal gerilim kaynağı: gerilim sabit, akımı yük belirler" · "Gerçek kaynak: datasheet'teki akım sınırına kadar".
- **Telif notu:** Razavi'nin iki örneği (iki levha [31:42–34:05]; anahtar + batarya + R1, sonra paralel R2 ile v_out [39:06–43:19]) kullanılmaz. Levha resmi bir fizik klasiği olduğu için **kavram** olarak anlatılabilir ama Razavi'nin çizimi/adımları aynen alınmamalı (kendi çizimimiz: tek levha çifti yerine ör. "tepe ile vadi" benzetmesi ya da kendi levha düzenimiz). İdeal kaynak için Razavi'nin "anahtar kapanınca v_out = V_B" ve "paralel R2 eklenince değişmez" dizisi yerine **mini tasarımdaki yük değiştirme** (330 Ω, 66 Ω, 33 Ω) kullanılsın.
- `inceleme.md` yok (metin yazılmadı).

## 11. Kaynaklar

- B. Razavi, Basic Circuit Theory, Ders 1 (UCLA), YouTube `U_4q0sfChOk` [28:08–43:19]; transkript kanal sahibinin özel Drive klasörü (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`), 19.11.2026 okundu.
- Wikipedia, "Voltage" (onaylı kaynak, `kaynaklar.md` konu 3): tanım (birim yük başına iş), volt = J/C. https://en.wikipedia.org/wiki/Voltage
- Texas Instruments, *TLV755P 500mA, Low-IQ, Small-Size, Low-Dropout Regulator*, SBVS320D, Kasım 2017 – revize Eylül 2024; bölüm 5.1, 5.3 (s. 4), 5.5 (s. 5–6), 6.3.3–6.3.4 (s. 13). https://www.ti.com/lit/ds/symlink/tlv755p.pdf (19.11.2026 okundu).
- onsemi, *2N7002E Small Signal MOSFET, 60 V, 310 mA, Single, N-Channel, SOT-23*, 2N7002E/D Rev. 8, Ekim 2023, s. 1 "Maximum Ratings". https://www.onsemi.com/pdf/datasheet/2n7002e-d.pdf (19.11.2026 okundu).
- Vishay General Semiconductor, *1N4001 thru 1N4007 General Purpose Plastic Rectifier*, Document Number 88503, Revision 29-Apr-2020, s. 1–2. https://www.vishay.com/docs/88503/1n4001.pdf (19.11.2026 okundu).
- (Denendi, kullanılmadı:) Microchip MCP1700 datasheet DS20001826F — üretici sitesi otomatik erişime kapalı; değerleri alınmadı.

## Kaynakta düzeltme

Razavi transkriptinde [28:08–43:19] teknik bir hata bulunmadı. İki küçük hassaslık notu (hata değil, metinde doğru söylensin diye):
1. [30:01–30:15] "yükü itmek için yaptığımız iş" tanımı, yükün yavaşça (kinetik enerji kazandırmadan) taşındığı varsayımına dayanır; fizik kitaplarındaki "birim yük başına iş" tanımıyla (Wikipedia "Voltage") aynıdır. Videoda "harcamamız gereken enerji" demek yeterli.
2. [37:51–38:08] "R sıfır ve akım sonsuzdan küçükse v = 0": doğru. Bu yüzden **ideal gerilim kaynağını kısa devre etmek** modelde çelişkidir (Razavi bu derste söylemiyor; 5d adım 6 ve kavram tablosu bunu açıkça yazıyor).
Datasheet'ler arasında çelişki yok. Panelde ayrı kaynak onayı açılmadı.

## Denetim

Bağımsız denetçi (Agent; doktora düzeyi elektronik mühendisi rolü, paketi görmemiş), 19.11.2026. Üç datasheet'in üçünü de açtı, transkripti [28:08–43:19] ve atıf yapılan [10:43], [19:08–19:32] kısımlarını okudu, bütün sayıları Python ile ayrıca hesapladı.

- **Sayılar:** hepsi doğru (4,5 V / −4,5 V; 1,7 V; 6,6 Ω; 30 mV, %0,91; 3,538 V; 3,3 / 33 / 330 A; 150 mA). Düzeltmeden sonra eklenen sayılar `icerik_dogrula.py`'de.
- **Datasheet değerleri:** hepsi kaynakla örtüşüyor; I_CL sütun sırası (560 / 720 / 865 mA = en az / tipik / en çok) denetçi tarafından doğrulandı; TLV75533P (3,3 V) sürümünün DBV, DQN, DRV, DYD kılıflarında var olduğu doğrulandı. Yük regülasyonundaki 0,060 V/A'nın tipik mi en çok mu olduğu hâlâ görsel kontrol istiyor (pakette "yaklaşık / tipik" diye yazıldı).
- **Kritik 1 bulgu (düzeltildi):** 4,7 Ω örneği: 702 mA, akım sınırının tipik (720 mA) ve en çok (865 mA) değerinin altındaydı; "çıkış 3,3 V'ta kalamaz" her parça için doğru değildi → yük **3,3 Ω (1 A > 865 mA)** yapıldı (5c, 5d adım 5, 7, 10); script'e `> I_CL_MAX` kontrolü eklendi.
- **Önemli 6 bulgu (düzeltildi):** (Ö1) kılıf karışıklığı: her değer DBV kılıfı için; düşüm 238 mV = DBV, −40 … 125 °C (85 °C'de 215 mV); (Ö2) yük regülasyonu "en çok" yerine "yaklaşık / tipik"; (Ö3) I_SC (355 mA) ile I_CL (560 mA) farkının nedeni tek cümleyle eklendi; (Ö4) ısınma sınırı: 10 Ω (330 mA) yükü DBV'de T_J'yi ≈ 155 °C'ye çıkarıyordu → mini tasarım yükleri 330 / 66 / 33 Ω (en çok 100 mA, ≈ 39 °C artış) yapıldı, "ısınma ayrı bir sınırdır (Ders 2)" notu eklendi; (Ö5) yorum sorusundaki 2,2 Ω ek sorusu (geri katlama bölgesi + ısıl kapanma, öğrenciye fazla) kısa devre sorusuyla değiştirildi; (Ö6) "En sık yapılan hata" iki yönlü karıştırma hatası olarak kuruldu, gerekçenin sınırı dürüstçe yazıldı (literatür atfı doğrulanmadı).
- **Küçük bulgular (düzeltildi):** "çoğu zaman büyük akım" → "çevrede direnç küçükse çok büyük olabilir"; "inemez/çıkamaz" → "inmemeli/çıkmamalı (bozulabilir)"; alan kontrolü "tutarlılık kontrolü" diye adlandırıldı; "motor" çıkarıldı; lityum pil 3,4 V notu "500 mA'de" diye daraltıldı; I_CL sütun notu güncellendi; süre için kısaltmalar zorunlu yapıldı (bölüm 10).
- **Kontrol edildi, sorun yok:** transkript zaman damgaları; gerilim tanımı ve işaret kuralları; kısa devre / açık devre ikiliği; ideal kaynağın kısa devre çelişkisi; 2 kΩ / 1 kΩ örneği (önce 2 mA, sonra tel 3 mA, 1 kΩ 0); telif (datasheet tablosu ve Razavi örnekleri kullanılmamış).
