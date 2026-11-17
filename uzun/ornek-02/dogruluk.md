# Doğruluk kaydı — uzun/ornek-02 (çevre akımları yöntemi, final tipi soru)

Tarih: 17.11.2026. Aşama 1 (yalnızca metin). Görüntü ve ses üretilmedi.

## 1. Okunan kaynak (onaylı, `kaynaklar.md`)

- B. Razavi, Basic Circuits, **Ders 8** (videoId `cY_mTp_o5XM`; konular.md konu 13 "Çevre analizi, doğrusallık ve süperpozisyon"). Transkripti kanal sahibi YouTube'dan elle verdi (17.11.2026; vidIQ kredisi 0 olduğu için araçla alınamadı). Transkript telif nedeniyle bu depoya konmadı; aşağıda yalnızca zaman damgası ve tek cümlelik kısa alıntı var.

Başka kaynak kullanılmadı. Kaynak yalnızca yöntem ve kavram için kullanıldı.

## 2. Özgünlük

Soru, devre ve sayılar bu çalışma için tasarlandı. Razavi Ders 8'deki örnekler: [12:56–19:55] iki çevreli devre — iki gerilim kaynağı (vx solda, vy sağda) ve üç direnç (r1, ortak r2, r3), sembolik çözüm; [25:23–37:56] üç çevreli, akım kaynaklı devre (süper çevre), sembolik. Bu sorudaki yapı (tek gerilim kaynağı, dört direnç, sağ çevrede kaynak yok, sayısal çözüm) bunlardan hiçbirinin kopyası veya sayıları değiştirilmiş uyarlaması değildir. Not: ilk taslakta Razavi'nin [12:56] örneğiyle aynı yapıda bir devre (sol kaynak, üç direnç, sağ kaynak) tasarlanmıştı; "sayıları değiştirerek uyarlama" sayılacağı için sağ kaynak kaldırılıp sağ kola ayrı bir direnç konarak yapı değiştirildi.

## 3. Soru

Alt hat kesintisiz tel. Gerilim kaynağı 24 V (sol kol, artı uç üstte). R₁ = 6 kΩ (üst tel, sol köşe – M), R₂ = 3 kΩ (M – alt hat; ortak direnç), R₃ = 2 kΩ (üst tel, M – sağ köşe), R₄ = 4 kΩ (sağ kol, sağ köşe – alt hat). Çevre akımları i₁ (sol), i₂ (sağ), ikisi de saat yönünde. İstenen i₁, i₂.

Birimler: V, kΩ, mA (1 V = 1 kΩ × 1 mA). Denklemi kΩ'a bölmek sonucu mA yapar (V / kΩ = mA); her iki sadeleştirmede birim boyutu kontrol edildi.

Çevre denklemleri (saat yönünde dolaşım; kazanılan gerilim = düşümlerin toplamı):
- Sol çevre: 6 kΩ × i₁ + 3 kΩ × (i₁ − i₂) = 24 V; 3 kΩ'a bölünce 3i₁ − i₂ = 8 mA.
- Sağ çevre: 3 kΩ × (i₂ − i₁) + 2 kΩ × i₂ + 4 kΩ × i₂ = 0; 3 kΩ'a bölünce −i₁ + 3i₂ = 0, yani i₁ = 3i₂.
- Yerine koyma: 9i₂ − i₂ = 8i₂ = 8 mA; i₂ = 1 mA; i₁ = 3 mA.

## 4. Hesap çıktısı (`python3 dogrula.py`, kesirli tam aritmetik)

```
Yontem 1 (cevre denklemleri): i1 = 3 mA, i2 = 1 mA
  sol / 3k: 3*i1 - i2 = 8 mA (beklenen 8 )
  sag / 3k: -i1 + 3*i2 = 0 mA (beklenen 0) -> i1 = 3*i2: True
  yerine koyma: 8*i2 = 8 mA
Yontem 2 (tam MNA): VA, VM, VB = 24 6 4 V ; Ia = 3 mA
Kol akimlari (mA): R1 (A->M) = 3  R2 (M->alt) = 2  R3 (M->B) = 1  R4 (B->alt) = 1
KCL M (giren - cikan): 0  KCL B: 0  KCL alt hat: 0
KVL sol cevre: 0  sag cevre: 0  dis halka: 0
Ortak direnc: akim 2 mA asagi, gerilim 6 V
Soldan: 24 - 18 = 6 V ; Sagdan: 2 + 4 = 6 V
Guc (mW): kaynak verir 72 ; direncler 54 12 2 4 toplam 72
Ikisi de saat yonu tersi: j1 = -3  j2 = -1
Karisik yonler: k1 = 3  k2 = -1  (ortak direncte k1 + k2 = 2 )
Karisik yonde 'kendi - komsu' yazilirsa: 3 1 -> dogru (k1, k2) = (Fraction(3, 1), Fraction(-1, 1)) : False
YANLIS (sag cevrede i1 - i2 kopyalanirsa): i1 = 2  i2 = -2
  yanlis sonucla KVL sag cevre: 24 (sifir degil -> yanlis)
TUM KONTROLLER GECTI
```

Yapılan kontroller: (1) videodaki iki çevre denkleminin çözümü ve iki sadeleştirmenin değerleri; (2) bağımsız yöntem: düğüm gerilimleriyle tam sistem (VA, VM, VB ve kaynak akımı) — kol akımları çevre akımlarıyla aynı (R₁'de i₁, R₂'de i₁ − i₂, R₃ ve R₄'te i₂), VM = 6 V; (3) M, sağ köşe ve alt hatta KCL = 0; (4) sol, sağ ve dış halkada KVL = 0; (5) güç dengesi: kaynağın verdiği 72 mW = dirençlerin harcadığı 54 + 12 + 2 + 4 = 72 mW; (6) yön seçimi: iki akım da saat yönünün tersinde seçilince sonuçlar yalnızca işaret değiştirir (kural aynı); biri saat yönünde, öbürü tersinde seçilince ortak dirençte akımlar toplanır ve "kendi eksi komşu" kuralı yanlış sonuç verir (kuralın koşulu gerekli); (7) bilinen yanlış: sağ çevrede i₁ − i₂ kopyalanırsa i₁ = 2 mA, i₂ = −2 mA çıkar; bu değerler sağ çevrenin KVL'sini sağlamaz.

## 5. İddialar ve dayanakları

| # | Metindeki iddia | Dayanak (Ders 8) |
|---|---|---|
| 1 | Çevre (mesh) en küçük halkadır; bu devrede iki çevre var | [5:49–6:38] "a mesh is a loop that does not contain any other loops within it"; [7:02–7:24] büyük dış halka çevre sayılmaz |
| 2 | Her çevreye bir akım atanır (i₁, i₂) | [7:43–8:48] "identify all of the meshes and assign a current to each" |
| 3 | Yön seçimi serbest; burada ikisi de saat yönünde | [8:57–9:03] "you can pick the direction clockwise or counterclockwise it doesn't matter" |
| 4 | Ortak dirençte iki çevre akımı zıt yönde geçer (ikisi de saat yönündeyken) | [9:27–9:44] matematiksel olarak dirençten iki akım geçtiği kabul edilir; [16:34–16:51] Razavi'nin örneğinde (iki akım da saat yönünde, [14:28–14:43]) ortak dirençte i1 yukarıdan aşağı, i2 aşağıdan yukarı |
| 5 | Ortak dirençteki gerilim iki akımın farkıyla yazılır; artı uç, önce yazılan akımın girdiği uçtur | Lemma [4:31–5:26] "the total voltage ... will be i1 minus i2 times r"; [16:59–18:06] "this voltage drop is equal to i1 minus i2 times r2" |
| 6 | Her çevrede KVL yazılır; kazanılan gerilim düşümlerin toplamına eşittir | [11:50–12:16] "write a kvl around every mesh"; [18:37–19:01] gerilimin yükseldiği yerde artı, düştüğü yerde eksi işaretle toplam sıfır. "Kazanılan = düşümler toplamı" biçimi bu KVL'nin terimleri karşı tarafa geçirilmiş hâlidir. |
| 7 | Sol çevre denklemi ve 3i₁ − i₂ = 8 mA | Hesap (bölüm 3–4) |
| 8 | **Kural:** ortak dirençte önce o çevrenin kendi akımı yazılır, komşu akım çıkarılır; iki akım aynı yönde dönüyorsa geçerli | **Çıkarım:** 5'teki lemma, dolaşım yönü o çevrenin akım yönüyle aynı alındığında (kendi akımı girdiği uçtan, yani artı uçtan girilir) düşüm (kendi − komşu) × R olur. Razavi aynı terimi sağ çevrede [19:08–19:24] "+(i1 − i2) r2" (gerilim yükseldiği için artı) diye yazar; bu, sağ çevrenin dolaşım yönünde (i2 − i1) r2 düşümüne eşittir. Bu cümle Razavi'de kural olarak geçmez. Koşulun gerekliliği sayısal olarak gösterildi (bölüm 4, kontrol 6). |
| 9 | "Birinci denklemdeki farkı aynen kopyalamak akla gelir"; "Tuzak, ortadaki ortak dirençte" | Sıklık iddiası değildir ("sık yapılan", "birçok öğrenci" kullanılmadı; örnek 01 denetim bulgusu Ö7). Tuzak olarak seçilmesinin dayanağı: Razavi'nin işaret uyarısı [5:19–5:26] "it's important that you really get the hang of this with all the signs" ve ortak direnç için [16:18–16:27] "r2 requires special attention". |
| 10 | Sağ çevrede kaynak yok; düşümlerin toplamı sıfır | KVL [11:50–12:16]; sağ çevrede yalnızca R₂, R₃, R₄ var |
| 11 | Sağ çevre denklemi ve i₁ = 3i₂ | Hesap |
| 12 | i₂ = 1 mA, i₁ = 3 mA | Hesap; bağımsız düğüm yöntemiyle aynı (bölüm 4) |
| 13 | "Farkı ters yazsaydık i₁ = 2 mA, i₂ = −2 mA çıkardı. Sayılar düzgün ama yanlış." | Hesap (YANLIS satırı; KVL sağlanmıyor) |
| 14 | Kontrol: ortak dirençten 2 mA iner, uçlarında 6 V; soldan 24 V − 18 V = 6 V; sağdan 2 V + 4 V = 6 V | Hesap (kol akımları, VM = 6 V). Akımlar bulununca diğer büyüklüklerin bulunması: [19:47–19:55] "once we have those we can find anything else we want" |
| 15 | Ekranda küçük harf i₁, i₂ | Ders 8 gösterimi (i1, i2) [8:30–8:48]; AGENT.md 2d-1 (gösterim Razavi'ye uyar) |

Videoda kullanılmayan ama dersle tutarlı not: çevre yönteminde referans düğüm gerekmez ([12:31–12:39]); kontrol adımındaki "alt hatta göre 6 V" yalnızca kontrol içindir ve seslendirmede "uçlarında altı volt" diye söylenir.

## 6. Gösterim kontrolü (AGENT.md 2d)

- Çarpma işareti yalnızca "×" ("3i₁" gibi katsayı yazımı dışında); "·" kullanılmadı. Her denklem ayrı satırda; "Ters işaretle çıkan: i₁ = 2 mA, i₂ = −2 mA" satırında iki eşitlik virgülle ayrılır. Oklar eşittir yerine kullanılmadı.
- Birimler: V, kΩ, mA; denklemlerde birimler yazılı. Sadeleşmiş denklemlerin sağ tarafı mA (V / kΩ).
- Ekran yazılarında kısaltma yok ("gerilim kaynağı", "ortak direnç", "çevre akımı" tam yazılır). Kart maddelerinde ":" yalnızca "Sonuç:" etiketinde.
- Seslendirme metninde rakam ve simge yok (otomatik kontrol: rakam, =, +, /, parantez, tire bulunmadı).

## 7. Kendi ikinci okumam (bağımsız denetim değildir)

- Sesli okunuş: "i bir", "i iki" küçük harf; "çarpı," + "farkı" ile çarpma kapsamı sesle tek anlamlı; "i iki de bir" ("ikide bir") dizilişinden kaçınıldı; dört direnç değeri farklı olduğundan "iki kiloohm" gibi bir değer tek bir direnci gösterir.
- Devre tarifi sesle tek anlamlı: kaynağın kolu ve artı ucu, üst teldeki iki direncin sırası, ortak direncin bağlandığı nokta ("iki direncin arasından alt hatta"), sağ kolun iki ucu ("üst telden alt hatta").
- Birim boyutu: her açık denklemde kΩ × mA = V; bölme sonrası mA.
- Mutlak ifade yok: kural koşuluyla söylenir ("iki akım aynı yönde dönüyorsa geçerlidir"); "her zaman", "asla", "sık" yok.
- Tek kaynak ideal gerilim kaynağıdır; kontrolde kaynağın uç gerilimi 24 V olarak kullanıldı (ideal kaynak varsayımı; soru tanımı).

Açık kalan noktalar: (a) bağımsız denetçi henüz bakmadı; (b) yapay sesin "i bir", "kiloohm" sözcüklerini nasıl okuduğu ancak ses üretilince görülür; (c) süreler örnek 01'in ölçülen hızından tahmindir; (d) iddia 8 (kural cümlesi) Razavi'de açık cümle olarak geçmez, lemmadan çıkarımdır; (e) vaat cümlesi tahminen 12–16 sn'de, rehberdeki 15–30 sn aralığının biraz önünde.
