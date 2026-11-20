# Devre Teorisi I · Ders 2 — bölüm planı

Kaynak: B. Razavi, Basic Circuit Theory, Ders 2 (UCLA), videoId `Hd0ZTXM572U`. Transkript kanal sahibinin özel Drive klasöründe (`1pvyKsiX_NC_VrmIYrwVhBGWZ9Ol1Fqhd`); depoya kopyalanmadı. Zaman damgaları transkriptten. Dersin konuşma kısmı ~1:26–50:53. Bölümleme İçerik Ajanı'nın önerisiyle (`bolum-1/icerik.md` bölüm 1) aynıdır.

Razavi'nin örnekleri (yalnızca konu tespiti için not; **hiçbiri kullanılmaz**): pil + ayarlı direnç, i1'in R1'e göre hiperbolü [12:54–15:12]; 3·v1 ve −5·v1 bağımlı kaynaklı iki devre [22:56–27:53]; mikrofon sinyalini 10 kat büyüten bağımlı kaynak [28:16–31:27]; robot kol benzetmesi [20:37–21:08]; elektrikli otomobilde DC → AC evirici, dört anahtar [31:59–36:19]; akım kaynağı + direnç, v1–R1 doğrusu [40:38–42:10]; 2 V kaynak + 3 A akım kaynağı [42:24–44:38]; pil şarjı: gerilim kaynağıyla değil akım kaynağıyla [44:59–48:32]; açık bırakılan akım kaynağı [49:15–50:44].

## Bölüm 1/3 — "İdeal tel, anahtar ve gerçek pil" [1:26–15:12]
Konular: Ders 1 tekrarı [2:06–3:41]; ideal tel R = 0, C = 0, L = 0 ve v = R × i = 0 [3:47–5:45]; ideal anahtar: açık = açık devre (i = 0), kapalı = kısa devre (v = 0), diğer büyüklüğü çevre belirler [5:52–8:13]; eşdeğerlikler [8:13–8:45]; gerilim kaynağı sembolleri (daire, pil) [8:52–10:04]; ideal gerilim kaynağı tanımı: uç gerilimi içinden geçen akıma bağlı değil [10:13–12:28]; gerçek pil ideal değildir [12:28–12:54], [14:48–15:12].
- En sık yapılan hata: **"Pil her zaman aynı akımı verir"** (pili akım kaynağı sanmak). Doğrusu: gerilimi sabit tutar, akımı yük belirler (icerik.md 6; McDermott & Shaffer 1992).
- Az bilinen nokta: "açık anahtar" iletmeyen anahtardır (günlük dildeki "ışığı açmak" ile ters).
- Özgün örnekler: 4,5 V + 1,5 kΩ + anahtar (kapalı 3 mA / açık 4,5 V anahtarda); ideal ve gerçek kaynağın v–i grafiği (1,5 V yatay doğru; v = 1,5 − 0,3 × i: 1,5 / 1,35 / 1,2 V); Uygulamada: 22 AWG tel, 6 mm buton, AA alkalin pil ile 150 Ω ve 1,5 Ω yük.

## Bölüm 2/3 — "Bağımsız ve bağımlı kaynaklar, kuvvetlendirici modeli" [15:12–31:33]
Konular: bağımsız gerilim kaynağı [15:23–17:21]; bağımlı gerilim kaynağı, eşkenar dörtgen sembolü [17:28–18:53]; doğrusal bağımlılık k × v_x, akıma bağlı olabilir [18:53–20:30]; neden çalışıyoruz: kuvvetlendirici ve op-amp modeli [21:08–22:47]; örnekler: bağımlı kaynağın çıkışını dirençten akım olarak bulmak, eğim [22:47–27:53]; kuvvetlendirici = ölçeklenmiş kopya [28:16–31:27].
- Vurgulanacak nokta: bağımlı kaynağın kontrol ettiği iki ucun "bağlı olmaması" sorun değildir (yalnızca o gerilimi "okur") [25:19–25:43]; olası hata adayı İçerik Ajanı paketinde seçilecek.
- Özgün örnek fikirleri: Razavi'nin 3·v1 / −5·v1 / 10·v1 sayıları kullanılmaz; kendi kat sayılarımız ve kendi giriş sinyalimiz.

## Bölüm 3/3 — "Akım kaynağı" [31:35–50:53]
Konular: (Uygulama hikâyesi) DC → AC evirici, anahtar kombinasyonları [31:59–36:19]; akım kaynağı tanımı: akımı uçlarındaki gerilime bağlı değil, sembol [36:31–38:59]; neden çalışıyoruz: transistör modeli [38:59–40:22]; akım kaynağı + direnç: v = R × i [40:38–42:10]; gerilim kaynağı + akım kaynağı: gerilimi biri, akımı diğeri belirler [42:24–44:38]; şarj: neden akım kaynağı [44:59–48:32]; akım kaynağı açık bırakılmaz [49:15–50:44].
- Vurgulanacak hata adayı: "Akım kaynağının uçlarındaki gerilim sıfırdır / akım kaynağı açık bırakılabilir".
- Özgün örnek fikirleri: Razavi'nin 2 V / 3 A sayıları ve evirici şekli kullanılmaz.

Her bölüm 13–17 dk, 7 parça. Yayın: `durum.json` `takvim` (Ders 1'den sonraki slotlar; Bölüm 1/3 için ilk aday 14.12.2026 haftası, şarta bağlı).
