#!/bin/bash
# Gercekci PCB intro: Cycles kareleri -> 1920x1080 30 fps video (is emri K, 20.11.2026).
#  Kareler 1280x720 (k0000..k0177) render edilir; burada lanczos ile 1080p'ye buyutulur + hafif keskinlestirme,
#  lens kusurlari (cok hafif renk sapmasi, vinyet, isik tasmasi), ince film grenli doku.
#  5,50-5,90 sn beyaz tahta rengine (#F7F7F3) hizli gecis; 5,90-6,00 sn tahta zemini.
#  Cikti: SESSIZ (birlestirme icin) ve MUZIKLI (onay icin; seri muziginin acilis kesiti tek basina, ~-18 LUFS).
#  Kullanim: bash intro_video.sh KARE_KLASORU acilis.mp3 SESSIZ.mp4 MUZIKLI.mp4
set -e; K="$1"; AC="$2"; OUT="$3"; OUTM="$4"
ffmpeg -v error -y -framerate 30 -start_number 0 -i "$K/k%04d.png" -f lavfi -i "color=c=0xF7F7F3:s=1920x1080:r=30:d=0.0667" -filter_complex "\
[0:v]scale=1920:1080:flags=lanczos,unsharp=5:5:0.45:5:5:0,format=gbrp,split=2[b][g];\
[g]scale=480:270,gblur=sigma=10,scale=1920:1080[gl];[b][gl]blend=all_mode=screen:all_opacity=0.16[bl];\
[bl]rgbashift=rh=1:bh=-1:edge=smear,vignette=angle=PI/5.2,noise=alls=2:allf=t,format=yuv420p,\
fade=t=out:st=5.5:d=0.4:color=0xF7F7F3[v0];[1:v]format=yuv420p[w];[v0][w]concat=n=2:v=1:a=0,trim=duration=6,setpts=PTS-STARTPTS[v]" \
 -map "[v]" -r 30 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart "$OUT"
ffmpeg -v error -y -i "$OUT" -i "$AC" -filter_complex "[1:a]aformat=sample_rates=48000:channel_layouts=mono,volume=-7.3dB,afade=t=out:st=5.55:d=0.45,atrim=0:6[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -ar 48000 -shortest -movflags +faststart "$OUTM"
ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate -of compact "$OUTM"
ffmpeg -hide_banner -i "$OUTM" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I|Peak):"
