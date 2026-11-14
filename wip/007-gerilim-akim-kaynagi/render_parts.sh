#!/bin/bash
# 007: 4 sessiz parça, aynı anda en fazla 4. Var olan parçayı atlar; biten parça hemen commit + push edilir.
cd "$(dirname "$0")/../.."
S=wip/007-gerilim-akim-kaynagi/scene.js; D=wip/007-gerilim-akim-kaynagi
DUR=$(node -e "import('./$S').then(m=>console.log(m.meta.duration))")
B=(0 21 42 63 $DUR)
one() {
  i=$1; f=$D/parca-0$i.mp4; [ -f $f ] && return
  node tools/render.mjs $S --from ${B[$i]} --to ${B[$((i+1))]} --no-audio --out $f.tmp.mp4 > $D/.log$i 2>&1 && mv $f.tmp.mp4 $f || return
  ( flock 9
    echo "- parca-0$i: tamam ($(date -u +%H:%M) UTC)" >> $D/NOTLAR.md
    git add $f $D/NOTLAR.md && git commit -qm "007 v2: render parçası 0$i" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01Bss84yg24LWuFPgtkSst89" && \
    for k in 1 2 3 4; do git push -q origin claude/007-gerilim-akim-kaynagi && break; sleep $((2**k)); done
  ) 9>/tmp/render007.lock
}
export -f one; export S D DUR; export B_STR="${B[*]}"
for i in 0 1 2 3; do echo $i; done | xargs -P 4 -I{} bash -c 'B=($B_STR); one {}'
echo BITTI > $D/.render_done
