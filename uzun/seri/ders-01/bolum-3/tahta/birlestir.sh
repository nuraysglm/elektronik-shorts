#!/bin/bash
# Ders 1 Bolum 3: 7 parcayi birlestirir (Bolum 1 birlestir.sh / is emri C duzeni).
#  - Abone karti (saydam ProRes katman, 4,5 sn) SOZLU CAGRI CUMLESININ BASINDA girer (UZUN.md 4b):
#      1) parca 2, 109,51 sn: "Bu serinin devamı için kanala abone olabilirsin." (109,51-112,19)
#      2) parca 7, 52,71 sn: "Kanala abone olursan ikinci dersi kaçırmazsın." (52,71-55,31)
#  - Abone sesleri (abone_ses.py) kartla ayni anda, konusmanin ~12 dB altinda.
#  - Ses: tepe sinirlama + iki gecisli loudnorm (dogrusal) -> -16 LUFS, tepe <= -1,5 dBTP (UZUN.md 3).
#  Kullanim: bash birlestir.sh PARCA_KLASORU ABONE.mov ABONE.wav CIKTI.mp4
set -e; D="$1"; AB="$2"; SFX="$3"; OUT="$4"; TMP=$(mktemp -d)
A2=109.51; A8=52.71; SFXDB=-7.3; N=7
dur(){ ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$1"; }
AF=""; for i in $(seq 1 $N); do v=$(dur "$D/parca-$i.mp4"); AF="$AF[$((i-1)):a]apad,atrim=duration=$v,asetpts=PTS-STARTPTS[s$i];"; done
T2=$(dur "$D/parca-1.mp4")
T8=$(python3 -c "print(sum(float(x) for x in '''$(for i in 1 2 3 4 5 6; do dur "$D/parca-$i.mp4"; done)'''.split()))")
E1=$(python3 -c "print(round(($T2+$A2)*1000))"); E2=$(python3 -c "print(round(($T8+$A8)*1000))")
echo "abone 1: $E1 ms, abone 2: $E2 ms"
ffmpeg -v error -y $(for i in $(seq 1 $N); do echo -i "$D/parca-$i.mp4"; done) -i "$AB" -i "$AB" -filter_complex "$AF\
[7:v]setpts=PTS-STARTPTS+$A2/TB[a1];[8:v]setpts=PTS-STARTPTS+$A8/TB[a2];\
[1:v][a1]overlay=eof_action=pass:format=auto[v2];[6:v][a2]overlay=eof_action=pass:format=auto[v7];\
[0:v][s1][v2][s2][2:v][s3][3:v][s4][4:v][s5][5:v][s6][v7][s7]concat=n=7:v=1:a=1[v][a0];[v]format=yuv420p[vo];\
[a0]alimiter=limit=0.5:level=disabled:attack=5:release=60[a]" \
 -map "[vo]" -map "[a]" -c:v libx264 -preset veryfast -crf 23 -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a pcm_s16le -ar 48000 "$TMP/ham.mkv"
M=$(ffmpeg -hide_banner -i "$TMP/ham.mkv" -vn -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$M" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
LN="loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true"
ffmpeg -v error -y -i "$TMP/ham.mkv" -i "$SFX" -i "$SFX" -filter_complex \
"[0:a]$LN,aresample=48000[sp];[1:a]volume=${SFXDB}dB,adelay=$E1:all=1[e1];[2:a]volume=${SFXDB}dB,adelay=$E2:all=1[e2];\
[sp][e1][e2]amix=inputs=3:normalize=0:duration=first[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT"
rm -rf "$TMP"
ffprobe -v error -show_entries format=duration,size -of compact "$OUT"
ffmpeg -hide_banner -i "$OUT" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I|Peak):"
