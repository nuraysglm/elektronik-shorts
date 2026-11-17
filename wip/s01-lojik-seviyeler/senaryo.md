# S1 — Sayısal sinyal: 0 ve 1 birer gerilim aralığıdır (Sayısal Elektronik serisi, Ders 1)

**Vurgulanan yanlış/nokta:** "1 tam 3,3 V (5 V), 0 tam 0 V" sanılır; 1 ve 0 birer gerilim aralığıdır, aradaki gerilimler kabul edilemez.

**Gerekli bilgi listesi** (videoda geçtiği yer)
- [x] Lojik seviye: 1 = HIGH aralığı (CMOS örneği 2–3,3 V) — r1
- [x] 0 = LOW aralığı (0–0,8 V) — r2
- [x] Gürültü aralık içinde kalırsa bit değişmez — n1
- [x] 0,8–2 V kabul edilemez; devre 1 de 0 da okuyabilir — f1
- [x] Bilmen gerekenler kartı — kart

Süre: 59,6 sn (≤ 60). Ses: yalnızca efekt (knob tık, bit değişimi pop, kabul edilemez bölge thud). Müzik/seslendirme yok.

| Zaman | Animasyon (yazısız anlaşılır) | Doğrulama yazısı |
|---|---|---|
| 0–3,7 (kanca h1) | Ayarlı güç kaynağı 3,30 V → 2,50 V iner; CMOS kapı girişine giden tel; "okunan bit" göstergesi 1 kalır, yeşil LED yanık. Panelde v(t) izi ve ölçekte işaretçi aşağı kayar. Cevabın ilk görüntüsü 2,9 sn'de. | "Sayısal sinyalde 1 / tam olarak kaç volt?" + alt satır "Bu CMOS girişine 2,5 V verirsek ne okunur?" |
| 3,7–15,6 (r1) | HIGH bandı (2–3,3 V) parlar; gerilim 2,5 → 3,1 → 2,2 V gezer; gösterge hep 1. | "1 tek bir gerilim değildir / 2 V ile 3,3 V arasında bir aralıktır" |
| 15,6–25,9 (r2) | Gerilim 2,2 → 0,5 → 0,2 V; kabul edilemez bölgeden hızlı geçerken gösterge önceki biti korur, LOW'a girince 0, LED söner; LOW bandı parlar. | "0 da bir aralıktır / 0 V ile 0,8 V arası" |
| 25,9–35,7 (n1) | Gürültü eklenir (±0,25 V): LOW'da 0,15–0,65 V arası titrer, gösterge 0 sabit; HIGH'a (2,9 V ± 0,25) çıkar, gösterge 1 sabit. | "Gürültü aralığın içinde kalırsa / okunan bit değişmez" |
| 35,7–48,9 (f1) | Gürültü biter, gerilim 2,9 → 1,4 V; kabul edilemez bandı turuncu parlar; gösterge düzensiz aralıklarla 1 ile 0 arasında gidip gelir, LED de ona uyar (Floyd s. 21: 'either a HIGH or a LOW'). | "0,8 V ile 2 V arası kabul edilemez / Devre bunu 1 de 0 da okuyabilir" |
| 48,9–59,1 (kart) | Sahne yaşamaya devam eder (kamera yavaş, panel izi akar). | Bilmen gerekenler: • Örnekte 1, 2 V ile 3,3 V arasıdır • Örnekte 0, 0 V ile 0,8 V arasıdır • 0,8 V ile 2 V arası kabul edilemez |

Gerçek hayat bağlantısı (2a-4): PCB üzerinde DIP kılıflı CMOS kapı, çıkış LED'i, ayarlı güç kaynağı (kodla çizilmiş 3D modeller).
Akım yönü kuralı (2a-7): bu sahnede akım gösterilen bir devre yok (CMOS girişi sinyal hattı); elektron/akım oku kullanılmadı.

## Bağımsız denetim (7A, render öncesi) — seviye: üniversite
Zorunlu düzeltmeler uygulandı: (1) cihaz göstergesinde '?' yok; kabul edilemez bölgede gösterge 1/0 arasında düzensiz gider, geçişte önceki bit kalır; (2) kart: iki nokta ve '–' kaldırıldı, 'CMOS' genellemesi yerine 'Örnekte'; (3) '0,8 V ile 2 V arası'; (4) panelde 'zaman →' → 'zaman'; (5) alt satır 'Bu CMOS girişine …'. Öneriler: r1 'arasında bir aralıktır', panel başlığı 'giriş gerilimi' (v(t) kaldırıldı).
