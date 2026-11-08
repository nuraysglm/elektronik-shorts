# Konu listesi

Konuları kanal sahibi verir. Ajan durumu `bekliyor` olan **ilk** satırı işler; listeye konu eklemez, çıkarmaz, sırasını değiştirmez.

Durumlar: `bekliyor` · `yeniden düzenle` (kanal sahibi değişiklik istedi; öncelikli) · `yarım kaldı` · `onay bekliyor` (kanal sahibinin kararını bekliyor) · `planlandı` (yayın sırasında) · `yayında` · `inceleme` (ajan emin olamadı) · `atla`

| # | Konu | Ana fikir (videonun öğrettiği) | Durum | Tarih |
|---|------|--------------------------------|-------|-------|
| 1 | Akım, gerilim, direnç nedir ve bunlar arasında nasıl bir ilişki vardır? (eski tarz) | Yayınlandı 08.11.2026 09:00 (youtube.com/shorts/g6MwWOEdDZU). Kanal sahibinin kararı: 4'lü seri (2–5) yayınlanana kadar kalır, sonra kanal sahibi YouTube Studio'dan kaldırır. Ajan bu satıra dokunmaz. | yayında | 2026-11-08 |
| 2 | Direnç nedir? | KANAL SAHİBİNİN İŞ EMRİ (yeniden düzenle, 08.11.2026). Mevcut video beğenildi; aşağıdaki yapıya göre yeniden yapılandır. ÖNCE KAYNAK: https://en.wikipedia.org/wiki/Resistor sayfasını oku (WebFetch); senaryo ve dogruluk.md bu kaynakla tutarlı olsun, okunan kaynağı dogruluk.md'ye yaz. SAHNE 1 (devre): pil + anahtar + ampul; ampul parlak yanar. Seri bir direnç eklenir, ampul kararır. Sahnenin SONUNDA kalemle yazılıyormuş gibi adım adım yazılı açıklama: ampulün de bir direnci var; eklenen direnç ampulün direncine eklenir → toplam direnç artar → akıma engel artar → devreden geçen akım azalır → (pil gerilimi aynı kalır) ampul üzerine düşen gerilim azalır → ampul kararır. Akım devrenin her yerinde aynı ölçüde azalır; elektronlar her yerde yavaşlar (yalnızca direncin içinde değil). SAHNE 2 (analoji): geniş bir boru bir noktada daralıyor. Daralan nokta direncin artışını temsil eder; daralma eklenince borudan saniyede geçen toplam akış azalır (geniş kısımlarda da akış yavaşlar). Fizik uyarısı: daralan kısmın içinde sıvı yerel olarak daha hızlı akar; bunu yanlış göstermemek için akışın 'yalnızca daralan noktada yavaşladığını' gösterme, borunun tamamındaki akışın azaldığını göster. SAHNE 3 (iç direnç): her elektrik elemanının bir iç direnci olduğunu gösteren günlük hayat örnekleri (ampul, ısıtıcı, ütü, su ısıtıcısı, şarj olan telefon vb.) mini modellerle. SAHNE 4 (bakır tel): bakır telin de çok küçük bir direnci vardır; örnek devrenin toplam direncine (tel + ampul + direnç) katkısını göster; tel direncinin diğerlerine göre çok küçük olduğunu animasyonla anlat. ANALOJİ İLHAMI: Sahne 2'deki benzetme için Wikipedia Resistor sayfasındaki hidrolik benzetmeden (dar boru / saçla tıkanmış boru) ilham al; kendi 3D animasyonunla çiz. HAREKET: videoda her şey animasyonlu olacak, durağan kare olmayacak (bölüm 2a kural 13): yazı yazılırken de elektronlar/sıvı akmaya, kamera yavaşça kaymaya devam eder. TEMPO: önceki versiyondan belirgin şekilde yavaş; geçişler daha uzun ve yumuşak (bölüm 2a kural 8–9). Metricool taslak uuid: 8827377021850894760 (yeniden yapılınca bu taslağı yeni videoyla güncelle ve sıradaki boş 16:00'a planla). | yeniden düzenle | |
| 3 | Gerilim nedir? | Gerilimi yükleri iten etki/potansiyel farkı olarak animasyonla göster (tel içinde renk geçişi). Gerilim artınca/azalınca yüklerin ve ampulün tepkisi; direnç önceki videodan bilindiği için devrede yer alabilir. Gerçek hayat: AA ve 9 V pil, telefon bataryası, araba aküsü, PSU, priz adaptörü. 4'lü serinin 2. videosu. | planlandı | 2026-11-10 16:00 (Londra) |
| 4 | Akım nedir ve nasıl oluşur? | Anahtar kapanınca devrenin tamamlanması ve elektronların akmaya başlaması; akımın yük akışı olduğu, birimi amper. Elektronlar − → + akar, geleneksel akım oku + → −. Gerçek hayat: lamba yanması, kablodan akan yükler. 4'lü serinin 3. videosu. | bekliyor |  |
| 5 | Akım, gerilim ve direnç arasındaki ilişki (Ohm yasası) | Tek devrede gerilimi değiştir → akım ve ampul tepkisi; direnci değiştir → akım ve ampul tepkisi; hepsi animasyonla. En sonda yazıyla: bu ilişki Ohm yasasıdır, V = I × R, gerçek değerli bir örnekle. 4'lü serinin 4. videosu. | bekliyor |  |
| 6 | Elektrik yükü, akım ve gerilim | Temel Devre Teorisi I, ders 1. Yeni kurallarla (bölüm 2a) baştan yapılacak; 4'lü seriyi tekrar etme, elektrik yüküne (proton, elektron, kulon) ağırlık ver. Eski tarz deneme: media/eski-002-elektrik-yuku-akim-gerilim (kullanılmaz; Metricool'da taslak, uuid 670534653296070172 — bu video bitince o taslağı yeni videoyla güncelle ve planla). | bekliyor |  |
| 7 | Gerilim kaynağı ve akım kaynağı | Temel Devre Teorisi I, ders 2: başlıktaki konular | bekliyor |  |
| 8 | Bağımlı kaynaklar, Ohm yasası ve akım-gerilim (I–V) karakteristikleri | Temel Devre Teorisi I, ders 3: başlıktaki konular | bekliyor |  |
| 9 | Kirchhoff yasaları (gerilim ve akım yasaları) | Temel Devre Teorisi I, ders 4: başlıktaki konular | bekliyor |  |
| 10 | Kirchhoff yasaları üzerine ek konular ve düğüm analizi | Temel Devre Teorisi I, ders 5: başlıktaki konular | bekliyor |  |
| 11 | Düğüm analizi ve süper düğümler | Temel Devre Teorisi I, ders 6: başlıktaki konular | bekliyor |  |
| 12 | Süper düğüm örnekleri | Temel Devre Teorisi I, ders 7: başlıktaki konular | bekliyor |  |
| 13 | Çevre analizi, doğrusallık ve süperpozisyon | Temel Devre Teorisi I, ders 8: başlıktaki konular | bekliyor |  |
| 14 | Süperpozisyon örnekleri | Temel Devre Teorisi I, ders 9: başlıktaki konular | bekliyor |  |
| 15 | Thévenin teoremi | Temel Devre Teorisi I, ders 10: başlıktaki konular | bekliyor |  |
| 16 | Norton teoremi | Temel Devre Teorisi I, ders 11: başlıktaki konular | bekliyor |  |
| 17 | Kaynak dönüşümü, güç ve enerji | Temel Devre Teorisi I, ders 12: başlıktaki konular | bekliyor |  |
| 18 | Kondansatörler ve özellikleri | Temel Devre Teorisi I, ders 13: başlıktaki konular | bekliyor |  |
| 19 | Kondansatörlerde enerji, seri ve paralel kondansatör bağlantıları | Temel Devre Teorisi I, ders 14: başlıktaki konular | bekliyor |  |
| 20 | RC devrelerine giriş | Temel Devre Teorisi I, ders 15: başlıktaki konular | bekliyor |  |
| 21 | RC devre örnekleri | Temel Devre Teorisi I, ders 16: başlıktaki konular | bekliyor |  |
| 22 | Ek RC devre örnekleri | Temel Devre Teorisi I, ders 17: başlıktaki konular | bekliyor |  |
| 23 | Kaynaksız ve kaynakla sürülen devreler, … ile örnekleme | Başlığın sonu eksik. Ajan bu konuya gelince panelde kanal sahibine tam başlığı sorar (bölüm 13) | bekliyor |  |
| 24 | Birinci dereceden sistemler için kısa çözüm yöntemi | Temel Devre Teorisi I, ders 19: başlıktaki konular | bekliyor |  |
| 25 | Kaynakla sürülen RC devre örnekleri | Temel Devre Teorisi I, ders 20: başlıktaki konular | bekliyor |  |
| 26 | Başlangıç koşulları olan, kaynakla sürülen devreler | Temel Devre Teorisi I, ders 21: başlıktaki konular | bekliyor |  |
| 27 | İlave RC devre örnekleri | Temel Devre Teorisi I, ders 22: başlıktaki konular | bekliyor |  |
| 28 | RC devre örneği ve bobinlere giriş | Temel Devre Teorisi I, ders 23: başlıktaki konular | bekliyor |  |
| 29 | Bobinli devreler | Temel Devre Teorisi I, ders 24: başlıktaki konular | bekliyor |  |
| 30 | RL devreleri | Temel Devre Teorisi I, ders 25: başlıktaki konular | bekliyor |  |
| 31 | Kaynaksız ve kaynakla sürülen RL devreleri | Temel Devre Teorisi I, ders 26: başlıktaki konular | bekliyor |  |
| 32 | RLC devrelerine giriş | Temel Devre Teorisi I, ders 27: başlıktaki konular | bekliyor |  |
| 33 | Basit LC devresi ve ikinci dereceden diferansiyel denklemler | Temel Devre Teorisi I, ders 28: başlıktaki konular | bekliyor |  |
| 34 | İdeal ve kayıplı LC rezonans devreleri | Temel Devre Teorisi I, ders 29: başlıktaki konular | bekliyor |  |
| 35 | Aşırı sönümlü, kritik sönümlü ve az sönümlü devreler | Temel Devre Teorisi I, ders 30: başlıktaki konular | bekliyor |  |
| 36 | Kaynakla sürülen paralel RLC devresi (1. bölüm) | Temel Devre Teorisi I, ders 31: başlıktaki konular | bekliyor |  |
| 37 | Kaynakla sürülen paralel RLC devresi (2. bölüm) | Temel Devre Teorisi I, ders 32: başlıktaki konular | bekliyor |  |
| 38 | Seri RLC devresi | Temel Devre Teorisi I, ders 33: başlıktaki konular | bekliyor |  |
| 39 | Kaynaksız ve kaynakla sürülen RLC devreleri | Temel Devre Teorisi I, ders 34: başlıktaki konular | bekliyor |  |
| 40 | Seri RLC devresinin basamak yanıtı | Temel Devre Teorisi I, ders 35: başlıktaki konular | bekliyor |  |
| 41 | Dürtü ve çift dürtü, seri RLC devresinin dürtü yanıtı | Temel Devre Teorisi I, ders 36: başlıktaki konular | bekliyor |  |
| 42 | Dürtü girişli diferansiyel denklemler ve ek RLC devre örnekleri | Temel Devre Teorisi I, ders 37: başlıktaki konular | bekliyor |  |
| 43 | İşlemsel yükselteçlere (op-amp) giriş | Temel Devre Teorisi I, ders 38: başlıktaki konular | bekliyor |  |
| 44 | Evirmez ve eviren yükselteçler | Temel Devre Teorisi I, ders 39: başlıktaki konular | bekliyor |  |
| 45 | Toplayıcı devre ve kaskat bağlı işlemsel yükselteç katları | Temel Devre Teorisi I, ders 40: başlıktaki konular | bekliyor |  |
