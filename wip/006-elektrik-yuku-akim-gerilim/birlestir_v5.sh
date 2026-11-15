#!/bin/bash
# v5: v4'ün 0–64,5 sn'si (değişmedi) + parca-03a (64,5–77) + parca-03b (77–son); animasyon sesleri; loudnorm.
set -e
cd "$(dirname "$0")/../.."
D=wip/006-elektrik-yuku-akim-gerilim; O=media/006-elektrik-yuku-akim-gerilim; V4=$O/eski/006-elektrik-yuku-akim-gerilim-v4.mp4; T=$(mktemp -d)
ffmpeg -y -loglevel error -i $V4 -i $D/parca-03a.mp4 -i $D/parca-03b.mp4 -filter_complex \
 "[0:v]trim=0:64.5,setpts=PTS-STARTPTS,fps=30[a];[1:v]setpts=PTS-STARTPTS,fps=30[b];[2:v]setpts=PTS-STARTPTS,fps=30[c];[a][b][c]concat=n=3:v=1:a=0,format=yuv420p[v]" \
 -map "[v]" -c:v libx264 -preset medium -crf 17 -r 30 $T/sessiz.mp4
node -e "import('./$D/scene.js').then(m=>{const x=m.meta;require('fs').writeFileSync('$T/cues.json',JSON.stringify({duration:x.duration,offset:0,...x}))})"
python3.13 tools/audio.py $T/cues.json $T/ses.wav
ffmpeg -y -loglevel error -i $T/sessiz.mp4 -i $T/ses.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-2.2:LRA=11,volume=2.3dB -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart $O/006-elektrik-yuku-akim-gerilim.mp4
ffmpeg -y -loglevel error -ss 0.0 -i $O/006-elektrik-yuku-akim-gerilim.mp4 -frames:v 1 -q:v 3 $O/kapak.jpg
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of compact $O/006-elektrik-yuku-akim-gerilim.mp4
ffmpeg -nostats -i $O/006-elektrik-yuku-akim-gerilim.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
ffmpeg -nostats -i $O/006-elektrik-yuku-akim-gerilim.mp4 -af highpass=f=4000,volumedetect -f null - 2>&1 | grep -E "max_volume"
ffmpeg -nostats -i $O/006-elektrik-yuku-akim-gerilim.mp4 -af volumedetect -f null - 2>&1 | grep -E "max_volume"
ffmpeg -nostats -i $O/006-elektrik-yuku-akim-gerilim.mp4 -vf freezedetect=n=0.001:d=0.5 -map 0:v -f null - 2>&1 | grep -c freeze_start || true
rm -rf $T
