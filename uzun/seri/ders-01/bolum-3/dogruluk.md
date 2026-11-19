# Doğruluk — Ders 1 - Bölüm 3/3 (sürüm 1, 20.11.2026)

Onaylı kaynaklar: Razavi, Basic Circuit Theory, Ders 1 transkripti (kanal sahibinin özel Drive klasörü; depoya kopyalanmadı); Wikipedia "Voltage" (onaylı, konu 3); datasheet değerleri İçerik Ajanı'nın paketinden (`icerik.md` bölüm 5b, 11; denetçi doğruladı). Hesaplar: `dogrula.py` (TAMAM).

| Parça | İddia | Dayanak |
|---|---|---|
| 2 | Fizikteki potansiyel farkı = gerilim (farkı); birimi volt | [28:17–28:33] |
| 2 | v_ab: 1 C pozitif yükü b'den a'ya taşımak için gereken enerji; v_ab = v_a − v_b | [28:50–31:07]; [29:06] "v a minus v b" |
| 2 | Genel q: enerjiyi q'ya bölmek | [31:07–31:33] |
| 2 | 1 V = 1 J / 1 C | Wikipedia "Voltage" (volt = joule/coulomb) |
| 2 | 1,5 V pil: 1 C'yi − uçtan + uca taşımak 1,5 J | Tanımın uygulaması (v_+− = 1,5 V, q = 1 C) |
| 2 | 18 µJ / 4 µC = 4,5 V; 36 / 8 = 4,5 V; −18 / 4 = −4,5 V | `dogrula.py` (özgün örnek; icerik.md 7-1) |
| 3 | Tepe–vadi benzetmesi | Kendi benzetmemiz (Razavi'nin levha örneği kullanılmadı; fikir [33:00–33:23] "as if I'm lifting it" ile tutarlı); ekranda "yalnızca bir benzetme" |
| 3 | Gerilimin değeri ve işareti; + uç − uçtan v volt yüksek | [34:29–35:51] |
| 3 | v_ba = −v_ab; işaret ters → sayı eksi | v_ab = v_a − v_b tanımından; icerik.md bölüm 4 |
| 3 | Hesapta −2 V bulunması: sağ uç 2 V yüksek | İşaret kuralı (aynı) |
| 4 | Gerilim yalnızca iki nokta arasında anlamlıdır; "bu noktanın gerilimi" = başka bir noktaya göre | [35:51–36:52] |
| 4 | Toprak = devrede seçilmiş ortak referans ucu | icerik.md bölüm 4 (Razavi [41:31] "resistor from here to ground"); şebeke toprağıyla karıştırılmaz |
| 4 | 5 − 3,3 = 1,7 V; referans b'ye: v_a = 1,7 V, v_b = 0, fark yine 1,7 V | `dogrula.py` (icerik.md 7-2) |
| 5 | Kısa devre yalnızca v = 0'ı garanti eder; v = R × i, R = 0 ve i sonlu → 0 | [37:01–38:16] |
| 5 | Kısa devrenin akımını çevre belirler; açık devre i = 0, kısa devre v = 0 ikiliği | [38:16–38:47] |
| 5 | Seri 2 kΩ + 1 kΩ = 3 kΩ; 6 V / 3 kΩ = 2 mA | Ohm yasası [10:43–11:05]; seri toplam direnç seste "akıma toplam üç kiloohm gösterir" diye (KVL adı geçmez; denetçiye soruldu) |
| 5 | Tel: 1 kΩ'un gerilimi 0 → akımı 0 / 1 kΩ = 0; 6 V / 2 kΩ = 3 mA telden | `dogrula.py` (KVL kontrolü: 2 × 3 + 0 = 6); icerik.md bölüm 6 örneği |
| 5 | En sık yapılan hata: açık–kısa devreyi karıştırmak | Razavi ayrımı vurgular [38:16–38:47]; icerik.md 6 gerekçesi |
| 5 | İdeal gerilim kaynağı: uç gerilimi ne bağlanırsa bağlansın aynı | [42:46–43:19] |
| 5 | Akımı yük belirler: i = v / R | Ohm yasası; icerik.md 4 |
| 5 | İdeal kaynağı kısa devre etmek çelişki; 6/1, 6/0,1, 6/0,01 = 6, 60, 600 A | icerik.md "Kaynakta düzeltme" 2 ve 4. satır (Razavi bu derste söylemez); `dogrula.py` |
| 6 | 2N7002E: V_DSS = 60 V (savak–kaynak), V_GS = ±20 V (kapı–kaynak) | onsemi 2N7002E/D Rev. 8 (2023) s. 1; icerik.md 5b |
| 6 | 1N4007: V_F en çok 1,1 V (1 A, 25 °C), V_RRM = 1000 V | Vishay 88503 (2020) s. 1–2; icerik.md 5b |
| 6 | 24 V > 20 V: kapı bozulabilir | icerik.md 5c (pahalı hata 3; "bozabilirsin" olasılık diliyle) |
| 6 | TLV75533P: düşüm en çok 238 mV (DBV, 500 mA, −40…125 °C); önerilen V_IN ≤ 5,5 V; I_OUT 0…500 mA | TI SBVS320D (2024) 5.3, 5.5; icerik.md 5b |
| 6 | 3,3 + 0,238 = 3,538 V; 5 − 3,3 = 1,7 V | `dogrula.py` |
| 6 | 330/66/33 Ω → 10/50/100 mA | `dogrula.py` |
| 6 | Yük regülasyonu ≈ 0,060 V/A; 0,060 × 0,090 = 5,4 mV; tüm aralık ≈ 30 mV | TI 5.5 (tipik mi en çok mu görsel doğrulanamadı → seste ve ekranda "yaklaşık"); `dogrula.py` |
| 6 | R_en küçük = 3,3 / 0,5 = 6,6 Ω | `dogrula.py` |
| 6 | 3,3 Ω → 1 A > I_CL en çok 865 mA → çıkış 3,3 V'ta kalamaz | TI 5.5 (I_CL 560/720/865 mA, denetçi doğruladı); `dogrula.py` |
| 6 | Kısa devre akımı I_SC tipik 355 mA; ısınınca kapanır (165 °C), soğuyunca açılır | TI 5.5, 6.3.3–6.3.4 |
| 7 | Yorum sorusu: 3,3 V / 22 Ω = 150 mA ≤ 500 mA; gerilim 3,3 V | `dogrula.py` (cevap ilk yorum/sabit yorumda) |
| 7 | Ders 2 - Bölüm 1 ön tanıtımı: ideal tel, ideal anahtar, gerçek pil | `ders-02/bolum-1/icerik.md` bölüm 1 |

Telif: Razavi'nin örnekleri (iki levha; batarya + anahtar + R1, paralel R2) kullanılmadı. Datasheet tabloları kopyalanmadı; tahtada kendi tablomuz.
Paket ile transkript arasında çelişki yok.

## Denetim (bağımsız denetçi alt ajanı, 20.11.2026)
Kritik bulgu yok. **Önemli (10, hepsi uygulandı):** (1) P5'te 6 / 60 / 600 A seste adım adım ve "kaynağa bağlı direnç küçülür" görüntüsü (2d-6); (2) P6'da 30 mV'nin hesabı seste ve ekranda; (3) P4'te eski toprağın −3,3 V'u seste; (4) P6'da 6,6 Ω'luk sınırın bu kurulumda ısıl kapanmaya götüreceği (0,85 W ≈ 196 °C artış; yalnızca "kapanacak kadar ısıtır", sayı ekrana konmaz); (5) P6'da 355 mA ile 865 mA çelişkisi: "çıkış düşünce akımı daha da kısar" (TI 6.3.3); (6) "satırın adı o iki ucu söyler" mutlak ifadesi → "çoğu satırda; söylemiyorsa toprağa göre"; (7) "kontrol ucuna 24 V" → "kontrol ucuyla alt uç arasına"; ekranda "kaynak ucu (S)" (gerilim kaynağıyla karışmasın); (8) kopya riski: P4 açılışı yeniden yazıldı (12 V, "neye göre?"), P3 sayıları 7 V / −3 V, P5 soru-cevap yapısı değişti; (9) ekranda ":" kelime yerine kullanılan satırlar "önce sözlü ifade, sonra parantezde formül" yapıldı; (10) "v_a = v_a − v_toprak" → "v_a: a ile toprak arasındaki gerilim (v_toprak = 0 V)".
**Küçük (uygulananlar):** seri toplamın gerekçesi + "seri" terimi; hata kartında 2 mA'in hesabı ve birim; mV → V, mA → A dönüşümleri seste; 238 mV "en kötü durumda"; "bambaşka bir değer"; "akım ve ısınma sınırları içinde"; P3'te tekrar eden fikir kısaltıldı; "bağladığı iki nokta"; ekranda "veri sayfası"; "0,1 mA ile 500 mA arasında"; "Artı (+) uç"; "artı eksi yirmi" yerine "en çok yirmi volt yukarıda ya da aşağıda". **Uygulanmayan:** hata gerekçesi için ek literatür (onaylı kaynak değil; kanal sahibi metin onayında görür); 7 parça (Bölüm 2'de 8 parça onaylandı).
