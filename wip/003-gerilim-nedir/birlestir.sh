#!/bin/bash
# Parçaları birleştir, animasyon seslerini (meta.cues) ekle, loudnorm → media/003-gerilim-nedir/003-gerilim-nedir.mp4 + kapak.jpg
set -e
cd "$(dirname "$0")/../.."
D=wip/003-gerilim-nedir; O=media/003-gerilim-nedir; T=$(mktemp -d)
mkdir -p $O
for i in 0 1 2 3 4; do echo "file '$PWD/$D/parca-0$i.mp4'"; done > $T/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i $T/list.txt -c copy $T/sessiz.mp4
node -e "import('./$D/scene.js').then(m=>{const x=m.meta;require('fs').writeFileSync('$T/cues.json',JSON.stringify({duration:x.duration,offset:0,...x}))})"
python3 tools/audio.py $T/cues.json $T/ses.wav
ffmpeg -y -loglevel error -i $T/sessiz.mp4 -i $T/ses.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart $O/003-gerilim-nedir.mp4
ffmpeg -y -loglevel error -ss 0.0 -i $O/003-gerilim-nedir.mp4 -frames:v 1 -q:v 3 $O/kapak.jpg
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of compact $O/003-gerilim-nedir.mp4
ffmpeg -nostats -i $O/003-gerilim-nedir.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
ffmpeg -nostats -i $O/003-gerilim-nedir.mp4 -af highpass=f=4000,volumedetect -f null - 2>&1 | grep -E "max_volume"
ffmpeg -nostats -i $O/003-gerilim-nedir.mp4 -af volumedetect -f null - 2>&1 | grep -E "max_volume"
ffmpeg -nostats -i $O/003-gerilim-nedir.mp4 -vf freezedetect=n=0.001:d=0.5 -map 0:v -f null - 2>&1 | grep -c freeze_start || true
rm -rf $T
