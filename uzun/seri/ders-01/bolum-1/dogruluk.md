# Doğruluk kaydı — Devre Teorisi I · Ders 1 · Bölüm 1/3

Tarih: 17.11.2026. Aşama: metin sürüm 2 (bağımsız denetim sonrası). Ses ve görüntü yok.

## 1. Kaynak (onaylı, `kaynaklar.md`)
B. Razavi, Basic Circuit Theory, **Ders 1** (videoId `U_4q0sfChOk`). Transkript kanal sahibinin özel Drive klasöründen (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`) okundu; depoya konmadı. Aşağıda yalnızca zaman damgası ve kısa özet var. Başka kaynak kullanılmadı.

## 2. İddia → dayanak

| # | Metindeki iddia | Dayanak |
|---|---|---|
| 1 | (Sürüm 2'de motivasyon kısmı çıkarıldı — Razavi'nin iki soru düzenine çok yakındı.) İşe büyüklükleri doğru tanımlayarak başlanır | büyüklükler → elemanlar sırası [7:00–7:47], "nice definition" [11:34] |
| 2 | Seri haritası (yalnızca konu listesi; Razavi'nin gerekçe cümleleri sürüm 2'de çıkarıldı): gerilim, kaynaklar, direnç, kondansatör, Kirchhoff, analiz yöntemleri, teoremler, RC, RL, RLC, işlemsel kuvvetlendirici (fırsat olursa) | [7:00–10:27] |
| 3 | Her ders üç bölüm, ~15 dk | kanal sahibinin kararı (UZUN.md 0) |
| 6 | Ohm yasası: gerilim = direnç × akım; zamanla değişen akımda o andaki akımla uygulanır (2 kΩ × 12 mA = 24 V; ortalamayla 12 V) | [10:43–10:59]; Razavi aynı derste Ohm yasasını anahtar kapandığı andaki akıma uygular [27:00–27:25]; hesap `dogrula.py` |
| 7 | Yük q, birimi kulon (C) | [11:41–12:00] |
| 8 | Yükün ne olduğu konusunda kesin cevap yok; elektron negatif, proton pozitif; bir model (cümleler sürüm 2'de yeniden kuruldu) | [12:07–12:30] |
| 9 | Yük hareket edince akım oluşur | [12:47–13:14] |
| 10 | Kesitte belli sürede geçen yükü saymak; ilk tanım yük/süre; pencere seçme sorunu | [14:11–16:04]. Sürüm 1'deki "her saniyenin 2 ms'sinde çalışan devre" Razavi'nin Wi-Fi örneğinin [15:31–15:56] yapısal uyarlaması olduğu için (denetim KRİTİK) **çıkarıldı**; yerine özgün "yön değiştiren yük" örneği: 0–0,5 s sağa 5 mC, 0,5–1 s sola 5 mC → 1 s pencerede ortalama 0, akım ±10 mA |
| 11 | Resmî tanım: çok küçük sürede geçen çok küçük yük, i = dq/dt; birim amper (A) | [16:04–16:54] |
| 12 | 1 A = 1 C/s; 2 µC/ms = 2 mA = 2 mC/s | tanımdan (#11) ve birim hesabı |
| 13 | Kesitten bir yönde geçen yük artı, ters yönde eksi sayılır; negatif akım = ters yön | akımın değeri ve yönü vardır [17:28–18:07]; işaretin yönü taşıması bu tanımdan. Ayrıntı Bölüm 2'de |
| 14 | Δq/Δt pencere ortalamasıdır; pencere küçüldükçe anlık değere yaklaşır | #11'in kendisi (tanım bir limittir); `dogrula.py` sayısal pencere tablosu |
| 15 | q(t) grafiğinde ortalama akım kirişin eğimi, anlık akım teğetin eğimi; tepe noktasında eğim sıfır | türevin geometrik anlamı (#11'den); `dogrula.py` merkezi fark kontrolü. Not: bu yorum transkriptte açıkça yok; matematiksel sonuçtur |
| 16 | q = a t² ise 0–t ortalaması anlık akımın yarısı | cebir: (a t²)/t = a t = (2 a t)/2; `dogrula.py` |
| 16b | Örnek 2'de akım t = 1,5 s'de ortalamaya (6 mA) eşit; 0–3 s kirişine paralel teğet orada | 4t = 6; ortalama değer teoremi (türevin geometrik anlamı); `dogrula.py` |
| 16c | Örnek 3'te akım t = 0'da en büyük (6 mA), o an q = 0; q(2,5) = q(3,5) = 8,75 mC < 9 | `dogrula.py` |
| 17 | Bölüm 2 ön tanıtımı: akımın yönü, açık devre, akımdan yük (q = ∫ i dt) | [17:12–23:31] |

## 3. Sayısal sonuçlar (`python3 dogrula.py`, kesirli tam aritmetik + bağımsız kontrol)
- Kanca (sürüm 2): 0–1 s pencere 0 mA; 0,1–0,3 s pencere 10 mA; 0,4–0,6 s pencere 0 mA; 5 mC / 0,5 s = 10 mA; 1 ms'lik bütün pencerelerde yalnızca +10 ve −10 mA.
- Örnek 1: 0–1 ms 5 µC → 5 mA; 1–4 ms 3 µC → 1 mA; 0–4 ms ortalama 8 µC / 4 ms = 2 mA (hiçbir an değil); 0–2 ms penceresi 6 µC / 2 ms = 3 mA; alan kontrolü 2 mA × 4 ms = 8 µC = 5 + 3. Bağımsız: 1 µs adımlı sayısal ayrık türev yalnızca {5, 1} verir.
- Örnek 2: q = 2t² mC → q(3) = 18 mC, 0–3 s ortalama 6 mA, i = 4t mA, i(3) = 12 mA; pencere 1 s → 14, 0,1 s → 12,2, 0,01 s → 12,02 mA (= 12 + 2Δt); q(4) = 32 mC. Bağımsız: merkezi fark.
- Örnek 3: q = 6t − t² mC → q(0, 1, 3, 4) = 0, 5, 9, 8 mC; en büyük q = 9 mC (t = 3 s, 0,01 s ızgarada tarama); i = 6 − 2t → i(1) = 4, i(3) = 0, i(4) = −2 mA; 0–4 s ortalama 2 mA. Bağımsız: merkezi fark.
- Yorum sorusu: q = 4t − t² → i = 4 − 2t = 0 → t = 2 s.

## 4. Özgünlük
Razavi Ders 1'in örnekleri (Wi-Fi açılıp kapanma, glikoz devresi, konferans makaleleri, Wi-Fi, 0–i1–0 darbe akımı ve yükü, anahtar–batarya–direnç sentezi, levhalar, v_out devreleri) bu bölümde kullanılmadı. Su borusu benzetmesi [13:14–13:54] kullanılmadı. Bütün örnekler (kanca devresi, basamaklı yük, q = 2t², q = 6t − t², yorum sorusu) bu çalışma için tasarlandı. Anlatım sırası Razavi'yi izler (kavram sırası), cümleler özgündür.

## 5. Ekrandaki yazılar (tam liste `metin.md` sahne planlarında)
Gösterim: küçük i, q; Δq, Δt; çarpma "×"; ondalık virgül; "·" yalnızca intro kartında UZUN.md 4a'nın verdiği kalıpta ("Devre Teorisi I · Ders 1 · Bölüm 1/3") — denetim notuna bakınız.

## 6. Bağımsız denetim (17.11.2026)
Denetim 1 (alt ajan): sayılar doğru. KRİTİK: kanca Wi-Fi örneğinin uyarlaması; yol haritası ve yük tanımı cümleleri çeviri gibi; "bir de te … yüke de de kü" okunuşu. ÖNEMLİ: "gerçek akım" ifadesi, "beş yüzde biri" okunuşu, gruplama ("iki çarpı te kare", "altı eksi iki çarpı te"), Ohm "o andaki akım" dayanağı, kart 4 madde, "·" kullanımı, eksik görseller (pencereler, i ekseni, boşta tel, yorum sorusu ekranda yok), "q = ?  i = ?" ayırıcı. Hepsi sürüm 2'de düzeltildi: kanca yeniden tasarlandı, motivasyon çıkarıldı, yol haritası konu listesine indi, yük tanımı yeniden kuruldu, okunuşlar "iki te kare / altı te eksi te kare / altıdan iki te çıkar" oldu, "de te / de kü" yalnızca cümle başında, Ohm örneği bölüm konusuna bağlandı (24 V) ve dayanağı eklendi, kart 3 madde, ekranda "·" yok, sahne planı tamamlandı. Süre kaybı özgün eklerle (t = 1,5 s, t = 0'da en büyük akım, tepe kontrolü, 0–0,5 ms penceresi) kapatıldı.
