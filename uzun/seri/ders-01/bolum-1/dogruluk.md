# Doğruluk kaydı — Devre Teorisi I · Ders 1 · Bölüm 1/3

Tarih: 17.11.2026. Aşama: metin (ses ve görüntü yok).

## 1. Kaynak (onaylı, `kaynaklar.md`)
B. Razavi, Basic Circuit Theory, **Ders 1** (videoId `U_4q0sfChOk`). Transkript kanal sahibinin özel Drive klasöründen (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`) okundu; depoya konmadı. Aşağıda yalnızca zaman damgası ve kısa özet var. Başka kaynak kullanılmadı.

## 2. İddia → dayanak

| # | Metindeki iddia | Dayanak |
|---|---|---|
| 1 | Devreler yüz yılı aşkın süredir var; her yıl yeni devreler tasarlanıyor, çünkü yeni uygulamalar daha yüksek performans istiyor | [2:13–2:52] |
| 2 | Yol haritası: büyüklükler → elemanlar (kaynaklar, direnç, kondansatör) → Kirchhoff → analiz yöntemleri → teoremler → RC, RL, RLC → işlemsel kuvvetlendirici (zaman kalırsa) | [7:00–10:27] |
| 3 | Kirchhoff yasaları fizikten tanıdık olabilir; bu bilgiyle her devre çözülebilir, karmaşıklaştıkça sistematik yöntem ve sezgi gerekir | [8:04–8:38], [8:48–9:02] |
| 4 | Teoremler devreye bakıp ne yapacağını öngörmeyi sağlar | [9:21–9:29] |
| 5 | İşlemsel kuvvetlendirici ilginç devreler kurmaya yarayan kullanışlı bir eleman | [10:18–10:27] |
| 6 | Ohm yasası: R direncinden i geçiyorsa uçlarda i × R gerilim | [10:43–10:59]; sayısal örnek hesap (2 kΩ × 3 mA = 6 V) |
| 7 | Yük q, birimi kulon (C) | [11:41–12:00] |
| 8 | Yükün ne olduğunu bilmiyoruz; elektron/proton gibi parçacıklara atfedilen özellik; elektron negatif, proton pozitif; bir model/soyutlama | [12:07–12:30] |
| 9 | Yük hareket edince akım oluşur | [12:47–13:14] |
| 10 | Telde oturup belli sürede geçen yükü saymak; ilk tanım yük/süre; pencere seçme sorunu; açılıp kapanan sistemde 1 s pencere anlamsız | [14:11–16:04] (Razavi'nin Wi-Fi örneği **kullanılmadı**; yerine varsayımsal "her saniyenin 2 ms'sinde çalışan devre") |
| 11 | Resmî tanım: çok küçük sürede geçen çok küçük yük, i = dq/dt; birim amper (A) | [16:04–16:54] |
| 12 | 1 A = 1 C/s; 2 µC/ms = 2 mA = 2 mC/s | tanımdan (#11) ve birim hesabı |
| 13 | Kesitten bir yönde geçen yük artı, ters yönde eksi sayılır; negatif akım = ters yön | akımın değeri ve yönü vardır [17:28–18:07]; işaretin yönü taşıması bu tanımdan. Ayrıntı Bölüm 2'de |
| 14 | Δq/Δt pencere ortalamasıdır; pencere küçüldükçe anlık değere yaklaşır | #11'in kendisi (tanım bir limittir); `dogrula.py` sayısal pencere tablosu |
| 15 | q(t) grafiğinde ortalama akım kirişin eğimi, anlık akım teğetin eğimi; tepe noktasında eğim sıfır | türevin geometrik anlamı (#11'den); `dogrula.py` merkezi fark kontrolü. Not: bu yorum transkriptte açıkça yok; matematiksel sonuçtur |
| 16 | q = a t² ise 0–t ortalaması anlık akımın yarısı | cebir: (a t²)/t = a t = (2 a t)/2; `dogrula.py` |
| 17 | Bölüm 2 ön tanıtımı: akımın yönü, açık devre, akımdan yük (q = ∫ i dt) | [17:12–23:31] |

## 3. Sayısal sonuçlar (`python3 dogrula.py`, kesirli tam aritmetik + bağımsız kontrol)
- Kanca: her ms'de 10 µC, 2 ms → 1 s pencerede 20 µC → 20 µA; çalışırken 10 mA; oran 500. Kaydırılmış 1 ms pencere (yarısı çalışma) → 5 µC → 5 mA.
- Örnek 1: 0–1 ms 5 µC → 5 mA; 1–4 ms 3 µC → 1 mA; 0–4 ms ortalama 8 µC / 4 ms = 2 mA (hiçbir an değil); 0–2 ms penceresi 6 µC / 2 ms = 3 mA; alan kontrolü 2 mA × 4 ms = 8 µC = 5 + 3. Bağımsız: 1 µs adımlı sayısal ayrık türev yalnızca {5, 1} verir.
- Örnek 2: q = 2t² mC → q(3) = 18 mC, 0–3 s ortalama 6 mA, i = 4t mA, i(3) = 12 mA; pencere 1 s → 14, 0,1 s → 12,2, 0,01 s → 12,02 mA (= 12 + 2Δt); q(4) = 32 mC. Bağımsız: merkezi fark.
- Örnek 3: q = 6t − t² mC → q(0, 1, 3, 4) = 0, 5, 9, 8 mC; en büyük q = 9 mC (t = 3 s, 0,01 s ızgarada tarama); i = 6 − 2t → i(1) = 4, i(3) = 0, i(4) = −2 mA; 0–4 s ortalama 2 mA. Bağımsız: merkezi fark.
- Yorum sorusu: q = 4t − t² → i = 4 − 2t = 0 → t = 2 s.

## 4. Özgünlük
Razavi Ders 1'in örnekleri (glikoz devresi, konferans makaleleri, Wi-Fi, 0–i1–0 darbe akımı ve yükü, anahtar–batarya–direnç sentezi, levhalar, v_out devreleri) bu bölümde kullanılmadı. Su borusu benzetmesi [13:14–13:54] kullanılmadı. Bütün örnekler (kanca devresi, basamaklı yük, q = 2t², q = 6t − t², yorum sorusu) bu çalışma için tasarlandı. Anlatım sırası Razavi'yi izler (kavram sırası), cümleler özgündür.

## 5. Ekrandaki yazılar (tam liste `metin.md` sahne planlarında)
Gösterim: küçük i, q; Δq, Δt; çarpma "×"; ondalık virgül; "·" yalnızca intro kartında UZUN.md 4a'nın verdiği kalıpta ("Devre Teorisi I · Ders 1 · Bölüm 1/3") — denetim notuna bakınız.
