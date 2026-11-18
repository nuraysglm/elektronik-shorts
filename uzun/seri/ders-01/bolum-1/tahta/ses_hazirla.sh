#!/bin/bash
# Ders 1 Bolum 1: parca seslerini hazirlar (UZUN.md 3: yalnizca kesme/sessizlik ve duzey normalizasyonu).
#  - parca 5: "... buyuk mu, kucuk mu?" sorusundan sonraki duraklamaya (32,82 sn) 1,5 sn sessizlik (metin.md)
#  - her parca: loudnorm iki gecisli, dogrusal kazanc; hedef -19,5 LUFS, tepe <= -1,5 dBTP
#  Kullanim: bash ses_hazirla.sh CIKTI_KLASORU   -> CIKTI/parca-N.wav (48 kHz mono) + CIKTI/parca-N.raw (16 kHz, zamanlama icin)
set -e; cd "$(dirname "$0")/../ses"; OUT="$1"; mkdir -p "$OUT"
EK5=32.82; SES5=1.5
for i in 1 2 3 4 5 6 7; do
  src=parca-$i.mp3; tmp="$OUT/_ham$i.wav"
  if [ $i = 5 ]; then
    ffmpeg -v error -y -i $src -filter_complex "[0:a]aresample=48000,asplit[a][b];[a]atrim=0:$EK5,asetpts=N/SR/TB[a1];[b]atrim=$EK5,asetpts=N/SR/TB[b1];anullsrc=r=48000:cl=mono,atrim=0:$SES5[s];[a1][s][b1]concat=n=3:v=0:a=1" -ac 1 -ar 48000 "$tmp"
  else ffmpeg -v error -y -i $src -ac 1 -ar 48000 "$tmp"; fi
  m=$(ffmpeg -hide_banner -nostats -i "$tmp" -af loudnorm=I=-19.5:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  g() { echo "$m" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
  ffmpeg -v error -y -i "$tmp" -af "loudnorm=I=-19.5:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -ac 1 -ar 48000 "$OUT/parca-$i.wav"
  ffmpeg -v error -y -i "$OUT/parca-$i.wav" -ac 1 -ar 16000 -f s16le "$OUT/parca-$i.raw"
  rm -f "$tmp"
  echo "parca $i: $(ffmpeg -hide_banner -nostats -i "$OUT/parca-$i.wav" -af ebur128=peak=true -f null - 2>&1 | grep -E '^\s+(I:|Peak:)' | tr -s ' ' | tr '\n' ' ')"
done
