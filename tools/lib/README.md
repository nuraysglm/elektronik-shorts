# tools/lib — nerede ne var

Yeni sahneye başlamadan önce bu listeyi oku; yalnızca konuya özgü kısmı sahne dosyasında yaz. Bir parça ikinci kez gerekirse buraya taşı.
Bitmiş sahneler (`scenes/001-…`, `scenes/eski-002-…`) kendi kopyalarını kullanır, değiştirilmez.

## stage.js — sahne ve temel yardımcılar
- `createStage(...)` → `S`: `scene`, `camera`, `renderer`, `M` (malzemeler), `lights`, `rng`, `text()`, `render()` (player.html çağırır)
- `S.table({wood, color, size})` — mat koyu zemin (varsayılan); `wood: true` eski ahşap doku
- `S.coil`, `S.wire`, `S.charges`, `S.magnet`, `S.led`, `S.pcb`, `S.look`, `S.orbit`, `S.text`
- Matematik: `clamp`, `seg`, `easeOut`, `easeInOut`, `lerp`, `fade`, `rng`; `THREE`, `RoundedBoxGeometry`

## anlatim.js — ekran yazıları (anlatım)
- `hl/rd/bl/gr/cu` renkli vurgu (gerilim sarı, akım kırmızı, direnç mavi, yük/elektron yeşil, proton bakır), `sup`, `fmt` (ondalık virgül)
- `check(koşul, mesaj)` — doğrulama; yanlışsa konsola hata
- `wordsOf`, `minSec` — okuma süresi (1,2 sn + 0,35 sn × kelime)
- `timeline(BEATS, {k})` → `{Z, A, DUR}`: `pre` = yazıdan önce yazısız animasyon süresi; `Z[id]` yazı aralığı, `A[id]` animasyon başı
- `narration(S, BEATS, Z, {y1, y2})` → `yaz(t)`: üst bant (%14 / %21) akan yazı; önceki yukarı solar, yeni aşağıdan gelir

## parcalar.js — devre yapı taşları
- `canvasTex(w, h, draw)` — canvas dokusu
- `roundedLoop(poly, {r})` — yuvarlak köşeli kapalı yol; `closedWire(S, pts, {y})` → `{curve, mesh, L, uOf}`
- `travelled(speed, t)` — değişken hızlı akışta alınan yol
- `battery(S, {text, flip})` → `{group, glow}` — 9 V pil, + ucu +x
- `resistor(S, {len, bands, obstacles})` → `{group, body, bands}` — renk kodlu, yarı saydam, içi engelli direnç (z ekseni)
- `projLabel(S)` → `label(id, html, x, y, z, {size, opacity})` — 3B noktaya bağlı etiket
- `camRig(S, keys)` → `cam(t)` — anahtar karelerle yumuşak kamera `[t, açı, mesafe, yükselme°, hedefX, hedefZ]`

## devre.js — ikinci kullanımda taşınanlar (002 → 003)
- `makeBulb(S, {scale})` → `{group, set(parlaklık 0..1)}` — ampul
- `platform(S, x, z, {r})` — mini model kaidesi
- `makeSwitch(S, {gap, y})` → `{group, set(1 kapalı / 0 açık)}` — bıçaklı anahtar (z ekseninde)
- `heater(S)` → `{group, hot}`, `iron(S)`, `kettle(S)` — ısıtıcı teli/soba, ütü, su ısıtıcısı mini modelleri

## Sahnede yazılıp henüz taşınmayanlar (ikinci kullanımda buraya taşı)
- `wip/002-direnc-nedir/scene.js` (2. sürüm): `phone` (şarj olan telefon)
- `wip/003-gerilim-nedir/scene.js` (2. sürüm): potansiyel renk katmanı (telde sarı → koyu turuncu, `paint(k)`)

## Kalemle yazı (2a kural 8–10) — anlatim.js + stage.js
- `S.text(id, html, {reveal})` — `reveal` 0..1: soldan sağa yumuşak kenarlı açılma + kalem ucu parıltısı
- `penSec(html)` — yazma süresi (0,3 sn/kelime); `penTimeline(BEATS)` → `{Z, A, W, DUR}` (yazma + okuma süresi)
- `narrationPen(S, BEATS, Z, W)` — kalemli üst yazı; `chain: true` adımlar alt satırda yazılır, öncekiler yukarı kayar (en fazla 2 satır)

## kaynaklar.js — gerçek hayat gerilim kaynakları (003 → 003 2. sürüm)
- `aaCell(S)` AA pil 1,5 V, `phoneCell(S)` telefon pili 3,7 V, `adapter(S)` şarj adaptörü 5 V, `carBattery(S)` araba aküsü 12 V → `{group}`
- `textTex`, `topPlane` — yazı dokusu ve yere yatık yazı düzlemi

## boru.js — hidrolik benzetme (002 2. sürüm → 003 2. sürüm)
- `pipeLoop(S, {PX, Qt(t), pinch(t), v})` → `{group, wMat, ring, XP, ZP, update(t)}` — pompalı kapalı cam boru, çark, daralma, akış göstergesi
