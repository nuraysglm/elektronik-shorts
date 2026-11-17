# Devre Teorisi I · Ders 1 — bölüm planı

Kaynak: B. Razavi, Basic Circuit Theory, Ders 1 (UCLA), videoId `U_4q0sfChOk`. Transkript kanal sahibinin özel Drive klasöründe (`1-smnUzmnSn-evJiD7ypgqm93scvD-e80`); depoya kopyalanmadı. Zaman damgaları transkriptten. Dersin konuşma kısmı ~1:27–43:19.

Razavi'nin örnekleri (yalnızca konu tespiti için not; **hiçbiri kullanılmaz**): glikoz ölçen baskılı devre ve konferans makaleleri [3:09–6:41], Wi-Fi'nin 1 ms açılıp kapanması [15:39], 0–i1–0 darbe akımının yükü [21:35–23:31], anahtar + batarya + direnç ile darbe akımı kurma sorusu [23:39–27:43], iki iletken levha arasında yük taşıma [31:42–34:05], anahtar + batarya + R1 (ve paralel R2) ile v_out [39:06–43:19].

## Bölüm 1/3 — "Akım nedir? Ortalama akım ile anlık akım" [1:27–17:01]
Konular: neden devre teorisi (yeni uygulamalar yeni devre ister) [2:05–2:52]; serinin yol haritası [7:00–10:27]; ön bilgi Ohm yasası [10:35–11:05]; yük: birim kulon, bir model/soyutlama [11:41–12:39]; akım: hareket eden yük [12:47–13:14]; ilk tanım (pencerede geçen yük / süre) ve pencere seçme sorunu [14:11–16:04]; resmî tanım i = dq/dt, birim amper [16:13–16:54].
- Vurgulanan nokta: **Δq/Δt yalnızca seçilen penceredeki ortalamayı verir; akım anlık bir büyüklüktür (i = dq/dt).** Pencere yanlış seçilirse sonuç gerçek akımdan yüzlerce kat farklı çıkabilir.
- Az bilinen nokta: "yük nedir?" sorusunun cevabı bir modeldir [12:07–12:30].
- Özgün örnekler: (1) 1 ms'de 5 µC, sonraki 3 ms'de 3 µC → ortalama 2 mA, gerçek akım 5 mA ve 1 mA; (2) q(t) = 2t² mC → t = 3 s'de i = 12 mA, 0–3 s ortalaması 6 mA; daralan pencere 14 → 12,2 → 12,02 mA. Ayrıca kancadaki varsayımsal devre: her saniyede 2 ms çalışan, çalışırken 10 mA akıtan devre → 1 s pencere 20 µA (500 kat küçük).

## Bölüm 2/3 — "Akımın yönü, açık devre ve yükü akımdan bulmak" [17:01–27:52]
Konular: her akımın değeri ve yönü var; referans oku [17:12–18:07]; açık devre yalnızca i = 0'ı garanti eder, uçlarındaki gerilim hakkında bir şey söylemez [18:25–19:32]; q = ∫ i dt (0'dan t1'e) [19:48–21:02]; yük = akım grafiğinin altındaki alan [23:08–23:31]; istenen akım dalga biçimini veren basit devre kurmak (anahtar, kaynak, direnç) [23:39–27:43].
- Vurgulanan yanlış: **"Açık devrede gerilim de sıfırdır."** Doğrusu: açık devre yalnızca akımın sıfır olduğunu garanti eder.
- Özgün örnek fikirleri: rampa ve basamaklı akım grafiğinden yük (alan) hesabı; referans oku ters çizilince işaretin değişmesi (−3 mA); kendi dalga biçimimiz için (iki seviyeli, Razavi'ninkinden farklı) devre kurma.

## Bölüm 3/3 — "Gerilim nedir? Kısa devre ve ideal kaynak" [28:00–43:19]
Konular: gerilim farkı tanımı — birim pozitif yükü b'den a'ya taşımak için gereken enerji [28:33–31:33]; levhalar arasında alan ve iş [31:42–34:05]; gerilimin değeri ve işareti (+/−) [34:29–35:51]; gerilim yalnızca iki nokta arasında anlamlıdır [35:51–36:52]; kısa devre yalnızca v = 0'ı garanti eder, akım çevreden belirlenir [37:01–38:47]; ideal kaynak uçlarındaki gerilimi bağlanan yükten bağımsız tutar [39:06–43:19].
- Vurgulanan yanlış: **"Kısa devrede akım sıfırdır" / açık–kısa devre ikiliğini karıştırmak.** Az bilinen nokta: "bir noktanın gerilimi" her zaman bir referansa göredir.
- Özgün örnek fikirleri: enerji/yük ile gerilim (ör. 6 µJ / 2 µC); işaret ters çevrilince −v; ideal kaynağa farklı yükler bağlanınca uç geriliminin değişmemesi, akımın değişmesi (Razavi'nin R1/R2 devresinden farklı yapı ve sayılarla).

Her bölüm 13–17 dk, 5–6 parça; yayın: Bölüm 1 28.11.2026, Bölüm 2 05.12.2026, Bölüm 3 12.12.2026 (Cumartesi 11:00 TR, onaya bağlı).
