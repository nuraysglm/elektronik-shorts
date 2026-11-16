# 008a — Bağımlı kaynaklar (Temel Devre Teorisi I, ders 3 — 1. video)

**Vurgulanan yanlış/nokta:** Bağımlı akım kaynağının değeri sabit değildir: girişteki gerilimi izler (i₁ = k·v_in) ve k'nın birimi A/V (1/Ω)'dur. Bu kaynak R₁'den geçince v_out = k·R₁·v_in olur; k·R₁ = 10 olduğundan çıkış girişin 10 katıdır → yükselteç.

Kaynak: B. Razavi, Basic Circuits, Ders 3 (YouTube LUfU9LgClsA) transkripti; zaman damgaları dogruluk.md'de.
Bölme (bölüm 2g-1, konular.md notu 15.11): Ders 3 → 8a bağımlı kaynaklar (bu video), 8b Ohm yasası ve I–V karakteristikleri.
Seviye: üniversite 1. sınıf: bağımlı kaynak sembolü (eşkenar dörtgen), kontrol değişkeni, k'nın boyutu, v_in(t) ve v_out(t) grafiği.
Süre: 59,3 sn (≤ 60). Seslendirme/müzik yok; yalnızca olay efektleri (pop: giriş adımı, thud: sinüse geçiş / modeller, hum: akım).
Değerler: k = 10 mA/V, R₁ = 1 kΩ, k·R₁ = 10; v_in: 0,10 V → 0,20 V (DC), sonra 0,15 V tepe, 0,5 Hz sinüs.

## Gerekli bilgi (videoda geçtiği yer)
- [x] Bağımlı akım kaynağı sembolü eşkenar dörtgen, değeri başka bir yerdeki büyüklüğe bağlı (h1, a1: v_in 0,10 → 0,20 V, ampermetre 1,00 → 2,00 mA)
- [x] i₁ = k·v_in; k = 10 mA/V; k'nın birimi A/V = 1/Ω (a1 yazısı, kanca alt satırı, 'k = 10 mA/V' etiketi, kart)
- [x] v_out = R₁·i₁ = k·R₁·v_in (a3: voltmetre ve grafik)
- [x] k·R₁ = 10 > 1 → yükselteç: tepe 0,15 V → 1,5 V (a4, grafikte tepe değerleri)
- [x] Akımın işareti: sinüsün negatif yarısında ampermetre eksi, elektronlar ters yöne (referans ok sabit)
- [x] Gerçek hayat: transistör (bağımlı kaynakla modellenir), mikrofon yükselteci (g1)
- [x] 'Bilmen gerekenler' kartı (3 madde)

## Sahneler (zamanlar sahne kodundan)
| # | Yazı (sn) | Animasyon (yazısız anlaşılmalı) | Etiket (sonra) | Efekt |
|---|---|---|---|---|
| h1 | 0–2,95 | Arkada giriş modülü (v_in = 0,100 V, düğme), ışıklı kesikli kontrol bağı eşkenar dörtgen kaynağa; çıkış döngüsü: kaynak, ampermetre 1,00 mA, R₁ = 1 kΩ, voltmetre 1,00 V; grafik v_in ve v_out izleri; elektronlar akar | Bu akım kaynağı / neye bağlı? (alt satır: Bağımlı kaynak (k = 10 mA/V)) | hum |
| a1 | 5,55–14,19 | 3,25–4,55 sn: düğme döner, v_in 0,100 → 0,200 V; ampermetre 1,00 → 2,00 mA, voltmetre 2,00 V; elektronlar hızlanır; grafikte iki iz birlikte basamak yapar; 'k = 10 mA/V' etiketi | Akım, girişteki gerilimi izler / (i₁ = k·v_in, k = 10 mA/V) | pop |
| a3 | 17,39–26,65 | 14,4–15,8 sn: giriş sinüse geçer (0,15 V tepe, mikrofon sinyali gibi); ampermetre ±1,5 mA (eksi yarıda elektronlar ters yöne), voltmetre ±1,5 V; grafikte ince giriş izi, kalın çıkış izi | R₁ üzerinde çıkış gerilimi oluşur / (v_out = k·R₁·v_in) | thud |
| a4 | 27,25–34,65 | Grafikte tepe değerleri belirir: çıkış 1,5 V, giriş 0,15 V | k·R₁ = 10 olduğu için / çıkış, girişin 10 katıdır | — |
| g1 | 37,05–43,83 | Kesme (aynı kadraj): kaide üzerinde mikrofon, BC547 (TO-92) transistör sırayla | Transistörler bağımlı kaynakla modellenir / mikrofondan sonraki yükselteç böyle çalışır | thud ×2 |
| kart | 44,1–59,3 | Kesme: devre %80 ölçekte, sinüs sürer; kart satır satır kalemle | Bilmen gerekenler: • Bağımlı kaynak bir akımı veya gerilimi izler • i₁ = k·v_in ise k'nın birimi A/V = 1/Ω • v_out = k·R₁·v_in; k·R₁ > 1 ise devre yükseltir | hum |
