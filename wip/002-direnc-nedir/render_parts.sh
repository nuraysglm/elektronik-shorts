#!/bin/bash
# 3 sessiz parça aynı anda (0–16, 16–32, 32–son). Var olan parçayı atlar.
cd "$(dirname "$0")/../.."
S=wip/002-direnc-nedir/scene.js; D=wip/002-direnc-nedir
DUR=$(node -e "import('./$S').then(m=>console.log(m.meta.duration))")
B=(0 16 32 $DUR)
for i in 0 1 2; do f=$D/parca-0$i.mp4; [ -f $f ] && continue
  node tools/render.mjs $S --from ${B[$i]} --to ${B[$((i+1))]} --no-audio --out $f > $D/.log$i 2>&1 & done
wait
