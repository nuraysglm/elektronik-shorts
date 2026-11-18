#!/bin/bash
# Ders 1 Bolum 1: 7 parcayi birlestirir; abone karti (saydam ProRes katman) parca 3 (0,15 sn) ve 6 (0,25 sn) ustune bindirilir.
#  Kullanim: bash birlestir.sh PARCA_KLASORU ABONE.mov CIKTI.mp4   (PARCA_KLASORU/parca-N.mp4)
set -e; D="$1"; AB="$2"; OUT="$3"
# a/v kaymasi olmasin: her parcanin sesi o parcanin goruntu suresine kirpilir/doldurulur
AF=""; for i in 1 2 3 4 5 6 7; do v=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$D/parca-$i.mp4"); AF="$AF[$((i-1)):a]apad,atrim=duration=$v,asetpts=PTS-STARTPTS[s$i];"; done
ffmpeg -v error -y $(for i in 1 2 3 4 5 6 7; do echo -i "$D/parca-$i.mp4"; done) -i "$AB" -i "$AB" -filter_complex "$AF\
[7:v]setpts=PTS-STARTPTS+0.15/TB[a1];[8:v]setpts=PTS-STARTPTS+0.25/TB[a2];\
[2:v][a1]overlay=eof_action=pass:format=auto[v3];[5:v][a2]overlay=eof_action=pass:format=auto[v6];\
[0:v][s1][1:v][s2][v3][s3][3:v][s4][4:v][s5][v6][s6][6:v][s7]concat=n=7:v=1:a=1[v][a];[v]format=yuv420p[vo]" \
 -map "[vo]" -map "[a]" -c:v libx264 -preset veryfast -crf 23 -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT"
ffprobe -v error -show_entries format=duration,size -of compact "$OUT"
