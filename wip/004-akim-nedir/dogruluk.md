# 004 — Doğruluk kontrolü

**Okunan kaynak:** https://en.wikipedia.org/wiki/Electric_current (WebFetch, 09.11.2026 08:10 UTC). Kullanılan bilgiler:
- "Electric current is a flow of charged particles, such as electrons or ions"; akım bir yüzeyden geçen net yük akış hızıdır; sabit akımda I = Q/t.
- Amper SI temel birimi; 1 A = 1 C/s. Ampermetreyle ölçülür.
- Geleneksel akım pozitif yüklerin hareket yönündedir; metal tellerde yük taşıyıcılar elektronlardır ve geleneksel akıma ters yönde hareket eder.
- Metalde elektronlar ısıl olarak rastgele hareket eder; alan yokken bu hareket birbirini götürür, net akım olmaz.
- Tel bir DC kaynağa (pil) bağlanınca iletkende elektrik alanı oluşur; serbest elektronları + uca doğru iter.
- Sürüklenme hızı çok küçüktür (0,5 mm² bakır, 5 A: mm/s mertebesinde); değişimi taşıyan elektromanyetik dalga ışık hızının önemli bir kesridir → etki neredeyse anında görülür.

| İddia (ekran) | Neden doğru | ✔ |
|---|---|---|
| Telde serbest elektronlar var | Metallerde iletim elektronları serbesttir (kaynak: metal tellerde yük taşıyıcılar elektronlar) | ✔ |
| Rastgele hareket eder: net akış yok | Alan yokken ısıl rastgele hareket birbirini götürür, net akım sıfır (kaynak). Animasyonda her elektron yerinde rastgele kıpırdar (sinüs toplamı, ortalaması sıfır) | ✔ |
| Devre kapandı → elektronlar akar | Kapalı devrede pilin alanı tel boyunca kurulur; elektronlar sürüklenir. `flow(t)` yalnızca anahtar kapalı ve pil yerindeyken 1 (`check`) | ✔ |
| Hepsi neredeyse aynı anda harekete geçer: ampul hemen yanar | Alan tel boyunca neredeyse ışık hızında kurulur; elektronlar her yerde aynı anda sürüklenmeye başlar (kaynak: sinyal hızı vs. sürüklenme hızı). Animasyonda tek `s(t)` tüm elektronlara uygulanır | ✔ |
| Elektronlar: − → + | Dış devrede elektronlar pilin − ucundan + ucuna gider (kaynak) | ✔ |
| Akım yönü: + → − (geleneksel kabul) | Geleneksel akım pozitif yük hareketi yönünde tanımlıdır (kaynak); ok sol kenarda +z'ye (− uca doğru) bakar (`check`) | ✔ |
| Pil yok → itme yok → akım yok (itme: gerilim) | Kaynak yoksa telde alan yok → net sürüklenme yok; `flow(Z.b1) === 0` (`check`) | ✔ |
| Her elektron yük taşır / Akım: kesitten 1 saniyede geçen yük | Elektronun yükü −e = −1,602×10⁻¹⁹ C; I = Q/t: birim zamanda kesitten geçen net yük (kaynak). Sayaç halkadan geçen elektron sayısını tam sayıyla verir: floor(N·(s/L + u_g)) − başlangıç | ✔ |
| Akım geçince cihaz çalışır (lamba, elektrikli soba, su ısıtıcısı, telefon şarjı) | Bu cihazlar içlerinden akım geçince ışık/ısı üretir veya pili doldurur (genel bilgi) | ✔ |
| Pil, teldeki elektronları iter | Pil telde elektrik alanı kurar; alan serbest elektronları + uca doğru iter (kaynak) | ✔ |
| Devre kapalı olmalı | Sürekli akım için kapalı yol gerekir; anahtar açılınca `flow = 0` | ✔ |
| Yüklerin düzenli akışı: akım | Akım = yüklü parçacıkların net akışı (kaynak) | ✔ |
| I = Q / t; I: akım, Q: yük (C), t: süre (s) | Kaynaktaki sabit akım tanımı; Q coulomb, t saniye | ✔ |
| Akımın birimi: amper (A), 1 A = 1 C/s | SI temel birimi; 1 coulomb/saniye (kaynak) | ✔ |

Görsel sürüklenme hızı (0,85 birim/sn) gösterim içindir; gerçekte mm/s mertebesindedir — ekranda sayı olarak verilmez, yanlış izlenim yaratacak hız iddiası yok.

**Bağımsız metin denetimi (alt ajan, yalnızca metin):** fizik hatası yok; 11 öneri uygulandı (titreşir → rastgele hareket eder; 'neredeyse aynı anda'; 'kesitten 1 saniyede'; elektron–yük bağı eklendi; 'geleneksel kabul'; itme = gerilim; 'teldeki elektronlar'; I tanımı f1'e; 'Yüklerin düzenli akışı'; 'Akımın birimi'; ısıtıcı → elektrikli soba).
