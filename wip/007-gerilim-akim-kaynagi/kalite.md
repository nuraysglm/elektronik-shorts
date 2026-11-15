# 007 v3 — kalite kontrolü (15.11.2026) — GEÇTİ (1. tur)

**A. İçerik:** dogruluk.md v3 eklemeleri (grafik kontrol noktaları, kart maddeleri, Razavi zaman damgaları) ✔. check(): i(3/1/0,25 kΩ) = 2/6/24 mA konumları, 24 mA eksen içinde, süre ≤ 90 ✔. Bağımsız metin denetimi (render öncesi): seviye "üniversite"; 4 zorunlu düzeltme uygulandı (c2 '2 mA dayatılır: V = i·R → ∞'; '→ yüke bağlı' yerine ': yüke bağlı'; 'CC' yerine 'Sabit akımla şarj'; açık devre grafiğinde '(2 mA dayatılırsa)' ve 'R → ∞'). Kart doğru, 4 madde videoda açıklanıyor.
**2e grafik:** i ekseni 0–30 mA (ampermetre 2 → 3 → 6 → 24 mA ile nokta aynı konumda, eksen sınırına yapışma yok); V(R) 0–8 V, açık devrede nokta doğru üzerinde köşede + 'eksen dışı' oku ve voltmetreyle aynı değer; '↑ ∞' eğrinin dik ucunun yanında, eksen etiketleri ayrı; 'i ∝ 1/R — doğrusal değil' notu ✔.
**A2:** animasyon önce, etiket sonra; elektronlar − → +, kırmızı akım oku + → − ✔.
**B. Görüntü:** 16 kare (2 kontak sayfası) + grafik yakın plan kareleri incelendi: kesilen yazı, çakışma, imleç kalıntısı yok; tel kesintisiz. render.mjs --safe: güvenli alan 0 ihlal (699 kutu), yazı–nesne kesişimi 0; doluluk yalnızca kart sırasında (76,5–81 sn; devre yazıya yer açmak için %80'e küçülür, kural 2a-16 — 006 v5 ile aynı). freezedetect: 0 donuk aralık. Konsol hatası yok.
**C. Ses:** −16,4 LUFS, tepe −2,0 dBFS; 4 kHz üstü max_volume: -18.5 dB; yalnızca olay efektleri, seslendirme/müzik yok ✔.
**D. Teknik:** 1080×1920, 30 fps, H.264 + AAC, 89,6 sn (≤ 90) ✔.
