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

## Sahnede yazılıp henüz taşınmayanlar (ikinci kullanımda buraya taşı)
- `wip/002-direnc-nedir/scene.js`: `makeBulb` (ampul, parlaklık 0..1), `makeSwitch` (bıçaklı anahtar), `pipes` (geniş/dar boru metaforu), `platform`, mini modeller `heater`, `iron`, `phone`
