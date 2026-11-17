#!/bin/bash
# 009: 4 sessiz parça (~15 sn), aynı anda 2 (makinede 2 çekirdek; parça kısa tutuldu: kesilirse yalnızca yarım parça kaybolur). Var olan parçayı atlar; biten parça commit + push edilir (yalnızca wip/009).
cd "$(dirname "$0")/../.."
S=wip/009-sesli-test/scene.js; D=wip/009-sesli-test
DUR=$(node -e "import('./$S').then(m=>console.log(m.meta.duration))" 2>/dev/null | tail -1)
B=(0 15 30 45 $DUR)
one() {
  i=$1; f=$D/parca-0$i.mp4; [ -f $f ] && return
  node tools/render.mjs $S --from ${B[$i]} --to ${B[$((i+1))]} --no-audio --out $f.tmp.mp4 > $D/.log$i 2>&1 && mv $f.tmp.mp4 $f || return
  ( flock 9
    echo "- parca-0$i: tamam ($(date -u +%H:%M) UTC)" >> $D/NOTLAR.md
    git add $f $D/NOTLAR.md && git commit -qm "009: render parçası 0$i" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01Bss84wwia4LuauS2GqxD5b" && \
    for k in 1 2 3 4; do git push -q origin HEAD:refs/heads/claude/009-sesli-test-video && break; sleep $((2**k)); done
  ) 9>$D/.render.lock
}
export -f one; export S D DUR; export B_STR="${B[*]}"
for i in 0 1 2 3; do echo $i; done | xargs -P 2 -I{} bash -c 'B=($B_STR); one {}'
echo BITTI > $D/.render_done
