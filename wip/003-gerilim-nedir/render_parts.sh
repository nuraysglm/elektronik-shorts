#!/bin/bash
# 4 sessiz parça aynı anda (0–11, 11–22, 22–33, 33–son). Var olan parçayı atlar.
cd "$(dirname "$0")/../.."
S=wip/003-gerilim-nedir/scene.js; D=wip/003-gerilim-nedir
DUR=$(node -e "import('./$S').then(m=>console.log(m.meta.duration))")
B=(0 11 22 33 $DUR)
for i in 0 1 2 3; do f=$D/parca-0$i.mp4; [ -f $f ] && continue
  node tools/render.mjs $S --from ${B[$i]} --to ${B[$((i+1))]} --no-audio --out $f > /tmp/claude-0/log$i 2>&1 & done
wait
