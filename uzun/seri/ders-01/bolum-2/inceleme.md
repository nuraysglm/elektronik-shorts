# İnceleme — Ders 1 - Bölüm 2 metni (sürüm 2) ↔ içerik paketi

İçerik Ajanı, 19.11.2026. Karşılaştırılan: `metin.md` (sürüm 2, 1.953 kelime, ~14,6 dk) ve `icerik.md`. Metni İçerik Ajanı değiştirmez; uygulama Uzun Video Ajanı'nındır (ICERIK.md 5, UZUN.md 2).

Genel değerlendirme: Teori doğru ve eksiksiz; Razavi [17:01–27:52] konularının hepsi var (değer ve yön, açık devre, q = ∫ i dt, alan, devre kurma). `dogrula.py` geçiyor; metindeki sayıları tek tek yeniden hesapladım (3 mA, −4 mA, 9 V, 12 mC, 18 mC, −4 mC, 6/18/−6/18 µC, 2,25 mA, 1,5 µC = dörtte bir, 6 mA eğim, 6 kΩ / 2 kΩ, 10 mC, yorum sorusu 7 mC): hepsi doğru. Eksik olan, kanal sahibinin istediği **uygulama bağlantısı**.

## A. Eklenmesi gereken (önemli)

1. **"Uygulamada: datasheet'teki akımlar" parçası yok.** Kanal sahibinin kararı (19.11.2026). Yeri: Parça 1'deki intro kartı ve "Birinci bölümde…" geçişinden hemen sonra **yeni Parça 2** (mevcut 2–7 → 3–8). Süre: 17 dk sınırı için en çok **~540 kelime (~3:30)** ve D'deki üç kısaltmanın üçü de (denetimle hesaplandı). İçerik `icerik.md` bölüm 5: iki satır fikri (sürekli/ortalama ↔ darbe/tepe), 1N4007 + 2N7002E + TLHR540x LED değerleri koşullarıyla, "üç soru" okuma kuralı, CR2032 mini tasarımı (≈ 25 µA ortalama → ≈ 375 gün; tepeyle yanlış hesap 22,5 saat), iki pahalı hata. Önerilen akış ve seslendirme notları `icerik.md` bölüm 10'da.
2. **Kanca vaadi güncellenmeli (Parça 1, 3. paragraf):** "Bu bölümün sonunda…" listesine bir madde: "Bir datasheet'te sürekli akımı ve darbe akımını ayırt edeceksin; bir pilin ömrünü ortalama akımdan hesaplayacaksın." Ekrandaki madde listesine de "• datasheet'te sürekli ve darbe akımı".
3. **Birim kolaylığının sırası (Parça 4 son paragrafı):** "Miliamperi milisaniyeyle çarparsan doğrudan mikrokulon bulursun" bilgisi şu an Parça 4'te ilk kez veriliyor; "Uygulamada" parçası mini tasarımda bu birimi (10 mA × 2 ms = 20 µC) **daha önce** kullanacak. Ya "Uygulamada"da ilk kullanımda kısaca açıklanmalı ve Parça 4'te "daha önce gördüğümüz gibi" denmeli, ya da Parça 4'teki cümle kaldırılıp yalnızca hatırlatma yapılmalı. Ayrıca "mAh bir yük birimidir (1 mAh = 3,6 C)" bilgisi ve "pil = toplam yük = alan" köprüsü, Parça 4'teki "yük = alan" sonucuna bir cümleyle bağlanmalı ("Hatırla: pilin miliamper saati de tam bu alandı.").
4. **Açık devrenin uygulamadaki yeri (Parça 3, son paragraf; ~20 sn):** "Kopuk bağlantı" örneği yerinde ama bir tasarım örneği de eklenebilir: mikrodenetleyici girişinde buton + 10 kΩ çekme direnci (3,3 V). Buton açıkken direnç akımı sıfır, direncin gerilimi 0 V, giriş 3,3 V, butonun uçları arasında 3,3 V; buton kapalıyken 3,3 V / 10 kΩ = 0,33 mA, giriş 0 V (`icerik.md` 7-3, `icerik_dogrula.py`). Bu, 9 V'luk açık anahtar örneğinin her elektronik kartta karşılaşılan hâlidir. Süre sıkışırsa isteğe bağlı.

## B. Yanlış/eksik ifade (önemli)

5. **Parça 4, 2. paragraf: "Bu kısa süreye de te adını verelim."** Seste "de" bağlacı olarak duyulur ("bu kısa süreye de, te adını verelim" → süreye "te" denmiş gibi). Metnin kendi kuralı (başlık notu: "de te" yalnızca eşittir/bölü sonrasında veya cümle başında) burada ihlal ediliyor; hemen arkasından gelen "akım çarpı de te" ile birlikte öğrenci t ile dt'yi karıştırabilir. Öneri: "Kısacık bir zaman aralığı düşün. De te, işte bu çok kısa zaman aralığının adı." (cümle başında "De te"). **Aynı paragrafta ikinci risk:** "Yüksekliği i. Genişliği, de te." → seste "genişliği de, te" gibi duyulur; öneri: "Genişliği ise de te dediğimiz o kısa süre." "Akım çarpı de te" kullanımları (4 yer) daha az riskli ama başlıktaki kurala aykırı: ya kural gevşetilsin ya her kullanıma uygulansın (bağımsız denetim Ö5).
6. **"Isınma" ifadesi yok — iyi; eklenirken dikkat:** "Uygulamada" parçası yazılırken "ısınmayı ortalama akım belirler" denmemeli (genel olarak yanlış; değişken akımda ısınma etkin değerle ilgilidir — ileride). Doğru ifade: "Sürekli akım değeri çoğunlukla ısınmayla sınırlıdır ve sıcaklıkla düşer."

## C. Küçük

7. **Parça 3, "Bir voltmetreyle ölçsen dokuz volt okursun":** doğru (ideal voltmetre). İsterseniz yarım cümle: "Voltmetrenin iç direnci çok büyük olduğu için devreden neredeyse hiç akım çekmez." Kanal sahibinin "uygulama" vurgusuna uyar; zorunlu değil.
8. **Parça 5, ortalama 2,25 mA paragrafı:** "Bu yine yalnızca bir ortalama" cümlesinin arkasına "Pil ömrü hesabında işimize yarayan tam da bu ortalamaydı" gibi tek bir köprü cümlesi, "Uygulamada" parçasıyla bağı kurar.
9. **"Bilmen gerekenler" kartı (Parça 7):** Kart 3 maddede kalsın (2f-2). Açıklamadaki tam listeye 4. madde önerisi: "• Datasheet'te sürekli akım ile darbe akımı ayrı; koşulu oku."
10. **Kapanış "Toparlayalım" paragrafı:** "Uygulamada" için tek cümle: "Datasheet'te de bu iki büyüklükle karşılaştık: pilin ömrünü ortalama akım, kısa zorlanmayı darbe akımı belirler."

## D. Çıkarılabilecekler (süre için; karar Uzun Video Ajanı / kanal sahibi)

"Uygulamada" eklenince toplam ~18 dk olur (13–17 dk sınırı). Öneriler (toplam ~190 kelime ≈ 73 sn; kelime sayıları metinden):
- Parça 5: "Bunu integralle de kontrol edelim" paragrafı (68 kelime). Üçgen alanı zaten doğru; integral kontrolü Parça 4'te Bölüm 1 örneğiyle yapılmış.
- Parça 5: son paragraf (q(t) grafiği, eğim = akım; ~30 sn). Bölüm 1'de eğim fikri işlendi. (76 kelime)
- Parça 6: "tek bir doğru cevabı yok" alternatif çözümü (46 kelime).
- Bunlar çıkarılırsa ekrandaki ilgili satırlar da çıkarılmalı ve `dogrula.py` güncellenmeli.

## E. Doğru olan, değiştirilmemesi gerekenler

- "En sık yapılan hata" seçimi (açık devrede gerilim sıfır sanılması) doğru ve kaynaklı [19:08–19:32]. Bölümde tek kalmalı; "Uygulamada"daki tepe/ortalama karışıklığı ikinci bir kart olmamalı.
- Referans yönü, elektron yönü, işaret kuralı, eksen altı alanın eksi sayılması: doğru ve sade.
- "Zamanın yarısında yükün dörtte biri" az bilinen noktası doğru (`dogrula.py`).
- Parça 6'da bataryadan çekilen akımın KCL'ye girmeden açık devre ilkesiyle açıklanması doğru tercih.

## F. Kanal sahibine bilgi (telif, UZUN.md 0a)

Bağımsız denetçinin notu: Parça 6 (istenen akımı veren devre), Razavi'nin sınıf sorusunun [23:46–27:43] genişletilmiş hâlidir (o: tek darbe, tek anahtar; bizde iki basamak, iki kol, farklı sayılar). Aynısı değil ama fikir aynı; konu Razavi'nin bölüm planında zaten var. Metin onayında kanal sahibinin bilmesi yeterli; istenirse soru tipi değiştirilebilir (ör. verilen devreden akım grafiğini çizmek).

Denetim: bu inceleme `icerik.md` ile birlikte bağımsız denetimden geçti (19.11.2026; bkz. `icerik.md` `## Denetim`).
