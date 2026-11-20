# S2 — Taban ve basamak ağırlığı: virgülün sağı (Aşama 1: metin, sürüm 2; kanal sahibinin onayını bekliyor)

Sayısal Elektronik, Ders 2 — Sayı Sistemleri. Yayın günü: **Salı 24.11.2026 16:00 (Londra)**.
Kaynak: Mano & Ciletti, Digital Design 4e, Bölüm 1.2 (PDF s. 16–17). Örnekler özgündür.

**Sürüm notu:** Sürüm 1 ("ikilikte 10 = 2") bağımsız denetimde **lise düzeyi** bulundu (2b-5: TYT taban aritmetiği). Sürüm 2 aynı konuyu (taban ve basamak ağırlığı) ders düzeyine taşır: virgülün sağındaki ağırlıklar tabanın eksi kuvvetleridir (Mano s. 16–17). S3'ün konusu (0,1₁₀'un ikilikte sonsuz basamak çıkması) bu videoya girmez.

**Vurgulanan yanlış/nokta:** En sık yapılan hata: (0,1)₂'yi onda bir sanmak. Doğrusu: (0,1)₂ = 1 × 2⁻¹ = 0,5; virgülün sağındaki ilk ağırlık 1 bölü tabandır.

**Gerekli bilgi:** (1) virgülün solunda ağırlıklar taban⁰, taban¹ …; (2) sağında taban⁻¹, taban⁻² …; (3) sağa doğru her ağırlık bir öncekinin taban kadar küçüğüdür; (4) onluğa çevirme: her rakam × ağırlığı, sonra topla.

## (a) Seslendirme metni

```
İkilik tabanda sıfır virgül bir kaç eder? En sık yapılan hata, onda bir demek. Doğrusu yarım, yani sıfır virgül beş.

Sebep basamak ağırlığı. Virgülün solunda ağırlıklar sağdan sola bir ve iki. Virgülün sağında ise tabanın eksi kuvvetleri var. İlk basamağın ağırlığı bir bölü iki, sıfır virgül beş. İkincisi bir bölü iki çarpı iki, yani bir bölü dört, sıfır virgül yirmi beş.

Sağa gittikçe her ağırlık, bir öncekinin taban kadar küçüğü olur. Onluk tabanda ilk ağırlık bir bölü on, sekizlik tabanda bir bölü sekiz, sıfır virgül yüz yirmi beş.

Şimdi ikilik tabanda bir sıfır virgül bir bir. Bir çarpı iki, iki. Sıfır çarpı bir, sıfır. Bir çarpı sıfır virgül beş, sıfır virgül beş. Bir çarpı sıfır virgül yirmi beş, sıfır virgül yirmi beş. Hepsini toplayınca iki virgül yetmiş beş eder.
```

**Kelime sayısı:** 129. **Süre tahmini:** 009'daki ölçülen hızla (hece başına ≈ 0,189 sn; ≈ 265 hece) ≈ 50 sn + kart (yazılış ≈ 2,5 sn + 4 sn okuma) ≈ **56,5 sn** (≤ 60,0). Kesin değer üretilen sesten ölçülür.

TTS notları: rakam/simge yok; "r" harfi yok ("taban"). "bir sıfır virgül bir bir" rakamların okunuşudur; ekranda aynı anda (10,11)₂ yazılır. Ondalıklar Türkçe okunuşla ("sıfır virgül yirmi beş").

## (b) Sahne planı ve ekran yazıları (sesle eşzamanlı, 2a-S)

Görsel: koyu mat zemin, silik PCB izleri (≤ %8). Ana nesne: kodla çizilmiş **3D basamak rafı**: virgülün iki yanında metal yuvalar; her yuvada rakam tamburu ve altında **ağırlık bloğu** (blok hacmi ağırlıkla orantılı: 2, 1, ½, ¼). Virgülün sağına doğru bloklar yerinde, gözle görülür biçimde ikiye bölünerek küçülür (taban kadar küçülme). Taban sarı (`hl`), ağırlıklar mavi (`bl`), hata kırmızı, doğru yeşil.

| # | ~Zaman | Ses | Ekranda (animasyon, yazı) |
|---|---|---|---|
| 1 | 0–2,6 | "İkilik tabanda sıfır virgül bir kaç eder?" | İlk kare: raf "0,1", taban göstergesi sarı "₂" parlıyor. Kanca: "(0,1)₂ kaç eder?" |
| 2 | 2,6–6,5 | "En sık yapılan hata, … sıfır virgül beş." | Kırmızı başlık "En sık yapılan hata", alt satır "(0,1)₂ = 0,1"; ardından yeşil başlık "Doğrusu", alt satır "(0,1)₂ = 0,5". |
| 3 | 6,5–12 | "Sebep basamak ağırlığı. … bir ve iki." | Solda iki blok belirir: "2⁰ = 1", "2¹ = 2". |
| 4 | 12–22 | "Virgülün sağında … sıfır virgül yirmi beş." | "1" bloğu yerinde ikiye bölünür, yarısı virgülün sağına oturur: "2⁻¹ = 1 ÷ 2 = 0,5"; o da bölünür: "2⁻² = 1 ÷ (2 × 2) = 1 ÷ 4 = 0,25". Her satır ayrı; bölünme ≥ 1,2 sn. |
| 5 | 22–33 | "Sağa gittikçe … yüz yirmi beş." | Satır: "Sağa doğru her ağırlık taban kadar küçülür". Taban göstergesi "₁₀"a döner, blok onda birine bölünür: "10⁻¹ = 1 ÷ 10 = 0,1"; sonra "₈": "8⁻¹ = 1 ÷ 8 = 0,125". |
| 6 | 33–50 | "Şimdi ikilik tabanda … iki virgül yetmiş beş eder." | Raf "(10,11)₂" gösterir; rakamı 1 olan bloklar parlar, 0 olan söner. Satırlar sırayla birikir: "1 × 2 = 2" · "0 × 1 = 0" · "1 × 0,5 = 0,5" · "1 × 0,25 = 0,25", sonra "2 + 0 + 0,5 + 0,25 = 2,75" ve "(10,11)₂ = (2,75)₁₀". Parlayan bloklar tek yığında birleşir. |
| 7 | 50–56,5 | (ses yok) | "Bilmen gerekenler" kartı; sahne yaşamaya devam eder. |

(Tablodaki " · " yalnızca bu belgede satırları ayırır; ekranda her denklem ayrı satırdır.)

**Ekrandaki bütün yazılar:** "(0,1)₂ kaç eder?" · "En sık yapılan hata" · "(0,1)₂ = 0,1" · "Doğrusu" · "(0,1)₂ = 0,5" · "2⁰ = 1" · "2¹ = 2" · "2⁻¹ = 1 ÷ 2 = 0,5" · "2⁻² = 1 ÷ (2 × 2) = 1 ÷ 4 = 0,25" · "Sağa doğru her ağırlık taban kadar küçülür" · "10⁻¹ = 1 ÷ 10 = 0,1" · "8⁻¹ = 1 ÷ 8 = 0,125" · "1 × 2 = 2" · "0 × 1 = 0" · "1 × 0,5 = 0,5" · "1 × 0,25 = 0,25" · "2 + 0 + 0,5 + 0,25 = 2,75" · "(10,11)₂ = (2,75)₁₀" · kart. Çarpma tek işaret "×", bölme "÷"; ondalık virgül. "(0,1)₂ = 0,1" kırmızı hata kartında, üstü çizilerek gösterilir.

## (c) "Bilmen gerekenler" kartı

- Virgülün sağında ağırlıklar taban⁻¹, taban⁻²
- İkilikte 0,1 yarım eder
- Her rakamı ağırlığıyla çarp, sonra topla

## (d) Başlık, açıklama, ilk yorum

vidIQ kredisi 0 (09.12.2026'ya kadar); konunun doğal adı kullanıldı.

**Başlık:** Sayı Sistemleri: İkilikte 0,1 Kaç Eder? (39 karakter)

**Açıklama:**
```
Sayı sistemleri ve basamak ağırlığı: ikilik tabanda 0,1 neden onda bir değil de 0,5 eder? Virgülün sağındaki ağırlıklar tabanın eksi kuvvetleridir: 2⁻¹ = 0,5, 2⁻² = 0,25. Örnek: (10,11)₂ = 2 + 0 + 0,5 + 0,25 = 2,75.

Bilmen gerekenler:
• Virgülün solunda ağırlıklar taban⁰, taban¹, taban²…; sağında taban⁻¹, taban⁻²…
• Sağa doğru her ağırlık bir öncekinin taban kadar küçüğüdür.
• (0,1)₂ = 0,5; (0,1)₈ = 0,125; yalnızca onluk tabanda 0,1 onda birdir.
• Onluğa çevirmek için her rakam kendi ağırlığıyla çarpılır, sonuçlar toplanır.

Önce bilmen gereken: Basamak değeri ve üs: taban⁰ = 1, taban⁻¹ = 1 ÷ taban.

Kaynak: M. Mano & M. Ciletti, Digital Design, Bölüm 1.2.

#elektronik #sayısalelektronik #sayısistemleri
```

**Etiketler:** sayı sistemleri, ikilik sistem, ikilik kesirli sayılar, sayısal elektronik, lojik devreler, binary

**İlk yorum:** "İkilik tabanda (0,11)₂ onluk tabanda kaç eder? Cevabını yaz 👇" — cevap 0,5 + 0,25 = 0,75 (`dogrula.py`).

**İlgili video (Studio'da elle):** S1 Short (19.11.2026); kanal sahibinin Ders 2 videosu bIOWChqPS1E.
