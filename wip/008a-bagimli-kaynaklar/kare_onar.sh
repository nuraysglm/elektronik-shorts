#!/bin/bash
# 008a: gölge haritası hatası olan 3 tek kareyi (n = 958, 1215, 1585) önceki kareyle değiştirir; birlestir.sh'den önce parçaları birleştirilmiş sessiz videoda çalışır.
set -e
cd "$(dirname "$0")/../.."
D=wip/008a-bagimli-kaynaklar; T=$(mktemp -d)
for i in 0 1 2 3; do echo "file '$PWD/$D/parca-0$i.mp4'"; done > $T/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i $T/list.txt -c copy $T/sessiz.mp4
F=""; for n in 958 1215 1585; do ffmpeg -y -loglevel error -i $T/sessiz.mp4 -vf "select=eq(n\,$((n-1)))" -frames:v 1 $T/k$n.png; done
ffmpeg -y -loglevel error -i $T/sessiz.mp4 -i $T/k958.png -i $T/k1215.png -i $T/k1585.png -filter_complex "[0][1]overlay=enable='eq(n,958)'[a];[a][2]overlay=enable='eq(n,1215)'[b];[b][3]overlay=enable='eq(n,1585)',format=yuv420p" -c:v libx264 -preset medium -crf 18 -r 30 $D/onarilmis.mp4
rm -rf $T
