# Doğruluk — 002 Direnç nedir? (2. sürüm)

## Kaynak
- https://en.wikipedia.org/wiki/Resistor — **bu çalışmada açılamadı** (en.wikipedia.org ağ izin listesinde değil, `getaddrinfo ENOTFOUND`). Panelde not düşüldü, kanal sahibine bildirildi. Senaryo, sayfanın bilinen içeriğiyle (genel tanım, hidrolik benzetme, seri bağlama) tutarlı yazıldı; sayfa açıldığında yeniden karşılaştırılmalı:
  - Direnç, elektrik direncini devre elemanı olarak uygulayan iki uçlu pasif elemandır; birimi ohm (Ω).
  - Hidrolik benzetme: telden akan akım borudan akan suya, gerilim düşümü suyu iten basınç farkına benzer; direnç, dar bir boru ya da saçla tıkanmış bir boru gibidir (aynı basınçla daha az akış).
  - Seri bağlı dirençlerin toplam direnci tek tek değerlerin toplamıdır.

## İddialar
| İddia | Neden doğru | |
|---|---|---|
| Direnç akıma karşı koyan engeldir | R = V / I: aynı gerilimde R büyüdükçe I küçülür | ✔ |
| Ampulün (filamanın) direnci var: 30 Ω | Küçük 9 V ampul, sıcak filaman ~30 Ω (9 V'ta 0,3 A, 2,7 W) — gerçekçi mertebe | ✔ |
| Seri eklenen direnç ampulün direncine eklenir | Seri: R_T = R_ampul + R_direnç + R_tel = 30 + 60 + 0,034 = 90,03 Ω | ✔ |
| Toplam direnç artınca akım azalır | I = 9/30 = 0,30 A → 9/90,03 ≈ 0,10 A (gösterilmez, yalnızca yön) | ✔ |
| Akım devrenin her yerinde aynıdır, her yerde aynı ölçüde azalır | Seri devrede tek yol; yük korunumu (Kirchhoff akım yasası) → animasyonda tüm elektronlar aynı hızla yavaşlar | ✔ |
| Pil gerilimi aynı kalır, ampule düşen gerilim azalır | İdeal pil 9 V; V_ampul = I·R_ampul = 9 V → 0,10 × 30 ≈ 3 V | ✔ |
| Ampul kararır | P_ampul = I²R: 2,7 W → 0,30 W (1/9) | ✔ |
| Elektronlar − → +, geleneksel akım + → − | Elektron yükü negatif; geleneksel akım pozitif yük yönünde tanımlı | ✔ |
| Boruda daralma eklenince borunun tamamında akış (debi) azalır | Aynı pompa basıncında toplam hidrolik direnç artar → debi Q azalır; kapalı döngüde Q her kesitte aynıdır (süreklilik) | ✔ |
| Daralmanın içinde su yerel olarak daha hızlı akar | v = Q / A: A küçükse v büyük (animasyonda daralma içinde hız = Q/A, geniş kısımlarda yavaş) | ✔ |
| Çark yavaşlar ↔ ampul kararır; pompa ↔ pil | Benzetme eşlemesi: basınç farkı ↔ gerilim, debi ↔ akım, daralma ↔ direnç, çark (enerji alan yük) ↔ ampul | ✔ |
| Ampul, ısıtıcı, ütü, su ısıtıcısı, şarj olan telefonun bir iç direnci (direnç eşdeğeri) vardır | Akım çeken her yükün R = V/I eşdeğeri vardır; ısıtıcılar direnç teliyle çalışır | ✔ |
| Bakır telin direnci ≈ 0,03 Ω | R = ρL/A = 1,68·10⁻⁸ Ω·m × 1 m / 0,5·10⁻⁶ m² = 0,0336 Ω | ✔ |
| Tel direnci diğerlerine göre çok küçük | 0,034 / 90,03 ≈ %0,04 | ✔ |
| Sembol R, birim ohm (Ω) | SI türetilmiş birim, Ω = V/A | ✔ |
| Pilin 9 V'u paylaşılır: direnç 6 V, ampul 3 V | V_R = 0,1 × 60 = 6 V, V_ampul = 0,1 × 30 = 3 V, toplam 9 V (Kirchhoff gerilim yasası; tel payı ≈ 0,003 V) | ✔ |
| Basitleştirme: filaman direnci sabit (≈ 30 Ω) kabul edildi | Gerçekte kısık yanan filaman soğur, direnci biraz düşer; ekranda "≈ 30 Ω" | ✔ |

## Bağımsız metin denetimi (alt ajan, render öncesi) — uygulanan düzeltmeler
1. Anahtar kapanınca teldeki tüm elektronlar aynı anda harekete geçer (pilden yeni elektron çıkmaz) — animasyon buna göre.
2. Formül: önce "Direnç (R) / ohm (Ω)", sonra "R_toplam = 30 Ω + 60 Ω + 0,03 Ω ≈ 90 Ω" (birimli, R_toplam).
3. Gerilim paylaşımı: "Pil hâlâ 9 V" → "Ampule daha az gerilim" (6 V + 3 V etiketleri).
4. Benzetme: "Saniyede geçen su azalır"; debi göstergesi geniş kısımda; daralmadaki yerel hızlanma göze batmadan.
5. "Su akışı = akım" eşlemesi eklendi.
6. "Arka arkaya (seri)" ile seri kavramı açıklandı.
7. "İç direnç" yerine "cihazın direnci" (pilin iç direnciyle karışmasın); yazı "Her cihaz akıma direnç gösterir"; ısıtıcı → elektrikli soba.
8. "Çok küçük, ihmal edilir".
9. "Akım yönü: + → − (tersi)".
10. Kanca istisnası yazıldı (ilk karede hazır), alt satır kısaltıldı.
11. "≈ 30 Ω" ve basitleştirme notu. 13. Tel her yerde "≈ 0,03 Ω".
- Uygulanmayan: Ω'un baştan açıklanması (14) — kural 2a-3 gereği birim en sonda; kaynak karşılaştırması (12) — ağ izni gerekiyor, kanal sahibine bildirildi.
