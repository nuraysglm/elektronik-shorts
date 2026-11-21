#!/bin/bash
# Ders 2 Bolum 1: parca seslerini hazirlar (UZUN.md 3: yalnizca kesme/sessizlik ve duzey normalizasyonu).
#  - Bolum 1 metninde sessizlik eklemesi yok (EK7 bos); PARCALAR ortam degiskeniyle parca listesi (parca 7 sonra)
#  - her parca + selam: loudnorm iki gecisli, dogrusal kazanc; hedef -19,5 LUFS, tepe <= -1,5 dBTP
#  Kullanim: bash ses_hazirla.sh CIKTI_KLASORU [EK7]  -> CIKTI/parca-N.wav (48 kHz mono) + CIKTI/parca-N.raw (16 kHz, zamanlama icin)
set -e; cd "$(dirname "$0")/../ses"; OUT="$1"; mkdir -p "$OUT"
EK7=${2:-}; SES7=1.5
for i in ${PARCALAR:-1 2 3 4 5 6 7} selam; do
  [ $i = selam ] && src=selam.mp3 && name=selam || { src=parca-$i.mp3; name=parca-$i; }
  tmp="$OUT/_ham$i.wav"
  if [ $i = 7 ] && [ -n "$EK7" ]; then
    ffmpeg -v error -y -i $src -filter_complex "[0:a]aresample=48000,asplit[a][b];[a]atrim=0:$EK7,asetpts=N/SR/TB[a1];[b]atrim=$EK7,asetpts=N/SR/TB[b1];anullsrc=r=48000:cl=mono,atrim=0:$SES7[s];[a1][s][b1]concat=n=3:v=0:a=1" -ac 1 -ar 48000 "$tmp"
  else ffmpeg -v error -y -i $src -ac 1 -ar 48000 "$tmp"; fi
  m=$(ffmpeg -hide_banner -nostats -i "$tmp" -af loudnorm=I=-19.5:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  g() { echo "$m" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
  ffmpeg -v error -y -i "$tmp" -af "loudnorm=I=-19.5:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -ac 1 -ar 48000 "$OUT/$name.wav"
  ffmpeg -v error -y -i "$OUT/$name.wav" -ac 1 -ar 16000 -f s16le "$OUT/$name.raw"
  rm -f "$tmp"
  echo "$name: $(ffmpeg -hide_banner -nostats -i "$OUT/$name.wav" -af ebur128=peak=true -f null - 2>&1 | grep -E '^\s+(I:|Peak:)' | tr -s ' ' | tr '\n' ' ')"
done
