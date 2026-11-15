# 006 (5. sürüm) — kalite kontrolü (bölüm 7)

**Sonuç: GEÇTİ (1. turda).** Süre 89,3 sn (≤ 90). v4 → `media/…/eski/006-elektrik-yuku-akim-gerilim-v4.mp4`.
Kanal sahibinin 4. iş emri (14.11.2026): yalnızca son sahne + "Bilmen gerekenler" kartı (bölüm 2f). 0–64,5 sn v4 ile birebir aynı (v4 MP4'ünden kesildi; sahne kodu o aralıkta değişmedi); 64,5–89,3 yeniden render.

## İş emri
1. **Ayrı satır denklemler:** f2'de "i = dq/dt" (1. satır) ve "q = ∫₀ᵗ i dt" (2. satır, belirli integral: alt sınır 0, üst sınır t). '·' ayırıcı yok. Integral sınırları HTML ile çizildi (InterDisplay'de ₀ᵗ glifi yok); kırpılma düzeltildi, tam çözünürlükte kontrol edildi.
2. **İmleç:** `tools/lib/stage.js` kalem ucu artık r ≥ 0,97'de `display:none` (yazı bitmeden tamamen kaybolur). Her satırın bitişinden 0,07–0,1 sn sonraki karelerde biten satırda imleç yok; son karede imleç yok. v4'ün 0–64,5 sn'sindeki 12 satır bitiş karesi de kontrol edildi: kalıntı yok. (Yeni satır yazılmaya başlarken kalem ucu satır başında görünür; bu yazma animasyonudur.)
3. **"Bilmen gerekenler" kartı** (76,6–89,3 sn): başlık + 4 madde (son madde 2 satır), satır satır kalemle yazılır, birikir, son karede kalır. Tamamlandıktan sonra 4,0 sn okunur; her satır kendi okuma süresini (1,2 + 0,35 × kelime) karşılar (kodda check). Arkada elektronlar akar, kamera yaşar.
   - Kart için devre yerinde %80'e küçülür (pil kenarı sabit, 1,3 sn, f2 okunurken; kural 2a-16). Bu yüzden 75,5–89,3 sn'de "dengeli doluluk" ölçümü eşiğin altında (ANA ≈ x %15–79, y %36–80; 28 örnek). Diğer bütün sahnelerde doluluk v4'teki gibi. Kart 6 satır olduğu için bant y %12–34'ü kullanıyor; devre küçülmeden yazı tele binerdi.
4. f1 ("Açık devre → yalnızca i = 0 / Kısa devre → yalnızca V = 0") kaldırıldı, içeriği kartın son maddesine taşındı; "gerilim: 1 V = 1 J/C" satırı kaldırıldı (v1'de V_ab = 9 J ÷ 1 C = 9 V zaten var). Süre ≤ 90 sn için gerekliydi.

## A. İçerik
- Bağımsız metin denetimi (alt ajan, yalnızca metin, her yazı tek tek): **zorunlu düzeltme yok**; seviye "üniversite 1. sınıf için yeni: i = dq/dt / q = ∫ i dt tanımı, V_ab gösterimi, açık/kısa devre ayrımı".
  - Koşullu 2 madde koddan doğrulandı: i(t) basamak (anında 0 → 3 mA ve 3 → 0; alan tam dikdörtgen, 27 mC); voltmetre "+" ucu anahtarın arka ucunda (direnç üzerinden pilin + ucuna bağlı, i = 0 → +9 V).
  - Uygulanmayan öneriler (kanal sahibinin önerdiği yazımla çelişiyor ya da kartı 4 maddenin üstüne çıkarıyor): q = ∫₀ᵗ i(τ) dτ; kısa devre satırına ayrı madde; "Açık devre: i = 0 (V her değeri alabilir)"; "ok yönü keyfi, ters ise i < 0" satırı; c1'de "+" yerine "ve" (c1 v4'ten değişmeden kullanıldı). Kanal sahibi isterse sonraki sürümde.
- Kart maddeleri Razavi Ders 1 transkriptiyle doğrulandı (dogruluk.md). Render konsolunda DOĞRULAMA HATASI yok.

## B. Görüntü
- Kontak sayfaları (son MP4): 64,3 / 64,6 (birleşim) / 69,0 / 69,4 (kesme) / 71,5 / 73,5 / 75,0 / 76,8 / 76,95 / 78 / 80 / 82 / 84 / 85,6 / 87 / 89,2 sn + 8 satır bitiş karesi + tam çözünürlükte integral kırpıntıları. Birleşimde sıçrama yok, kesme aynı kadraj, taşma/titreme yok, tel kesintisiz.
- Güvenli alan (64–89,3 sn, `guvenli_alan_v5.json`): yazı ihlali **0**, yazı–nesne/yazı–yazı kesişimi **0**. YouTube maskeli kareler (0,2 / 72,5 / 82 / 89,2): yazılar alt %32 ve sağ sütun dışında.
- freezedetect: 0 donma.

## C. Ses
- Entegre −16,6 LUFS, tepe −2,1 dB; 4 kHz üstü max −30,5 dB. Seslendirme/müzik yok; efektler v4 ile aynı (meta.cues).

## D. Teknik
- 1080×1920, 30 fps, H.264 + AAC, 89,3 sn.
