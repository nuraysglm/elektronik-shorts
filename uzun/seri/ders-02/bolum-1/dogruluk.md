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
