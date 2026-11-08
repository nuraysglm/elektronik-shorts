#!/bin/bash
# kullanım: render_parts.sh <ilk> <son>  (parça no; her parça 16 sn)
cd /home/user/elektronik-shorts
for i in $(seq $1 $2); do
  n=$(printf %02d $i); a=$((i*16)); b=$((a+16))
  [ -f wip/002-elektrik-yuku-akim-gerilim/parca-$n.mp4 ] && continue
  node tools/render.mjs wip/002-elektrik-yuku-akim-gerilim/scene.js --from $a --to $(awk -v b=$b -v d=124.83333333333333 'BEGIN{print (b>d)?d:b}') --no-audio --out wip/002-elektrik-yuku-akim-gerilim/parca-$n.mp4 > /tmp/claude-0/s/p$n.log 2>&1
done
