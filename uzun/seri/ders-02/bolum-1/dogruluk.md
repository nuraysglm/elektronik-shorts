# Doğruluk — Ders 2 - Bölüm 1/3 (sürüm 1, 20.11.2026)

Onaylı kaynaklar: Razavi, Basic Circuit Theory, Ders 2 transkripti (kanal sahibinin özel Drive klasörü; depoya kopyalanmadı); datasheet değerleri ve 10 kat kuralı İçerik Ajanı'nın paketinden (`icerik.md` bölüm 5b, 5c, 11; paket denetçisi değerleri sayfalardan doğruladı). Hesaplar: `dogrula.py` (TAMAM).

| Parça | İddia | Dayanak |
|---|---|---|
| 1, 4 | 1,5 V / 150 Ω = 0,01 A = 10 mA; 1,5 V / 1,5 Ω = 1 A; 100 kat | `dogrula.py` (özgün; icerik.md 6, 5d) |
| 1, 4 | En sık yapılan hata: pili sabit akım kaynağı sanmak | icerik.md 6 (McDermott & Shaffer 1992, AJP 60(11) 994–1003); Razavi [10:36–12:03] |
| 1 | Bir amperde gerçek pilin gerilimi düşer | Razavi [12:28–12:45]; E91 iç direnci (icerik.md 5b) |
| 2 | Akım = dq/dt, A; gerilim iki nokta arasında, 1 C pozitif yükü taşıma enerjisi, V | Razavi [2:14–3:07] |
| 2 | Ohm yasası v = R × i, yalnızca direnç için | Razavi [3:07–3:33] |
| 2 | Açık devre i = 0, kısa devre v = 0 garantisi | Razavi [7:26–7:48]; Ders 1 [18:25–19:32], [37:01–38:47] |
| 2 | Bugün tel, anahtar, gerilim kaynağı | Razavi [1:35] (akım kaynağı Bölüm 3'te) |
| 3 | İdeal tel R = 0, C = 0, L = 0; bir model, çoğu zaman iyi yaklaşıklık | Razavi [4:04–4:39] |
| 3 | R = 0, i sonlu → v = 0; telin her iki noktası arası 0; ideal tel = kısa devre | Razavi [4:47–5:45] |
| 3 | 0 Ω × 2 A = 0 V | `dogrula.py` |
| 3 | Açık anahtar = açık devre (i = 0); kapalı = kısa devre (R = 0, v = 0) | Razavi [6:24–7:48] |
| 3 | Açık anahtarın gerilimini / kapalı anahtarın akımını çevre belirler | Razavi [7:55–8:13] |
| 3 | "Açık anahtar" = kontak ayrık, akım yok (günlük dildeki "ışığı açmak" ile ters) | icerik.md 10 "İfade dikkati" (dil notu; Razavi "open = off" [6:24–6:32]) |
| 3 | 4,5 V + 1,5 kΩ + anahtar: kapalı 4,5 V / 1,5 kΩ = 3 mA; açık i = 0, v_R = 0, anahtarda 4,5 V | `dogrula.py` (KVL kontrolü); icerik.md 7-1 (özgün) |
| 3 | Eşdeğerlikler (açık devre = i = 0 = açık anahtar; kısa devre = ideal tel = kapalı anahtar = v = 0) | Razavi [8:13–8:45] |
| 4 | Daire + ve − genel sembol (sabit ya da değişen); pil sembolü yalnızca sabit gerilim "bu derste ve çoğu kitapta"; işaret yazılır | Razavi [9:00–10:04]; icerik.md "Kaynakta düzeltme" 3 (alışkanlık, standart değil) |
| 4 | İdeal gerilim kaynağı: uç gerilimi içinden geçen akıma bağlı olmayan iki uçlu eleman; sabit ya da değişen | Razavi [11:09–12:19] (12:10–12:19 alıntılanmadı; Kaynakta düzeltme 4) |
| 4 | v–i grafiğinde yatay doğru (i: + uçtan dışarı) | Tanımın grafiği; icerik.md 4 (Razavi'nin i–R hiperbolü kullanılmadı) |
| 4 | Çalışma noktasını yük seçer; i = v / R | Razavi [11:55–12:03]; Ohm yasası |
| 5 | Gerçek pilde direnç küçüldükçe uç gerilimi düşer; belli akım aralığında ideale yakın | Razavi [12:28–12:54], [14:48–15:12] |
| 5 | İç direnç modeli (ideal kaynak + seri küçük direnç); ayrı bir direnç parçası yok | icerik.md 4 "Gerçek pil" ve 10 "İfade dikkati" |
| 5 | Taze AA alkalin: 150–300 mΩ | Energizer E91 datasheet E91NA0323 s. 1 (icerik.md 5b) |
| 5 | v = 1,5 − 0,3 × i: 1,5 / 1,35 / 1,2 V; eğim 0,3 V/A | `dogrula.py`; icerik.md 7-2 |
| 5 | Tam çözüm Ders 3 (seri dirençler) | icerik.md 9 |
| 6 | 22 AWG Alpha Wire 3071: 16,2 Ω / 1000 ft (20 °C); 1000 ft = 304,8 m; ≈ 0,0531 Ω/m; 20 cm ≈ 10,6 mΩ | Alpha Wire 3071 spec (2013) s. 1 (icerik.md 5b); `dogrula.py` |
| 6 | PTS645: kontak direnci en çok 100 mΩ; kontak değeri 50 mA, 12 V DC | C&K PTS645 (2022) s. B–143 (icerik.md 5b). Yalıtım direnci (10¹¹ Ω, üssü gözle doğrulanmadı) **videoya konmadı** |
| 6 | (a) 150 Ω: 10 mA; 3 mV + 1 mV + 0,11 mV ≈ 4,1 mV; %0,27 | `dogrula.py` (kesin seri çözümle de %0,27); icerik.md 5d |
| 6 | (b) 1,5 Ω: 1 A; 20 kat; ≈ 0,3 V (en çok, ideal akımla tahmin); %20; akım 1 A'in altında | `dogrula.py` (kesin 0,833 A, ekrana konmaz); icerik.md 5d |
| 6 | 10 kat kuralı: R_yük ≥ 10 × R_iç; 3 Ω; 0,5 A; 0,15 V; ≈ %10 | Hayes & Horowitz, AoE Student Manual (1989) Bölüm 1 (icerik.md 5b, 5c; kanal sahibinin Drive'ı) |
| 6 | Butonla 1 A'lik motor: sınırın 20 katı, kontaklar zarar görebilir; elektronik anahtar ileride | icerik.md 5c (olasılık diliyle) |
| 7 | Yorum sorusu: 9 V / 30 kΩ = 0,3 mA; 9 / 300 = 30 mA; 9 / 3 = 3 A; ideal model en çok 3 Ω'da yanılır | `dogrula.py`; icerik.md 8 |
| 7 | Bölüm 2: bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli | Razavi [15:23–31:27]; ../plan.md |

## Notlar
- Paket ile transkript çelişkisi yok. Paketteki 5c'nin 1 m / 5 A tel örneği, 2 A tel hesabı ve yalıtım direnci (0,12 nA) videoya girmedi (icerik.md 10 kısaltma önerisi).
- Seste "fit" yalnızca "bin fit, yani üç yüz dört virgül sekiz metre" olarak bir kez geçer.

## Denetim
(bağımsız denetimden sonra doldurulur)
