#!/bin/bash
# Gercekci PCB intro (is emri K2, 20.11.2026): Cycles kareleri -> 1920x1080 30 fps, 9,5 sn (285 kare).
#  0-149 (0-5,0 sn): her kare ayri render (kamera hareketli; 5,0 sn'de cipe tam ustten bakar).
#  150-284 (5,0-9,5 sn): kamera SABIT -> yalnizca isik degisen anahtar kareler (her 9 karede bir, 150,159,...,285) render edilir,
#   aradaki kareler komsu iki anahtar karenin dogrusal capraz gecisi (yollardaki yavas isik "nefesi").
#  Son islem: 1080p lanczos + hafif keskinlestirme, isik tasmasi, cok hafif renk sapmasi, vinyet, ince gren;
#   8,5-9,2 sn beyaz tahta rengine (#F7F7F3) gecis; 9,2-9,5 sn tahta zemini.
#  Cikti: SESSIZ (birlestirme icin) ve MUZIKLI (onay icin; birlestir.py --intro ile uretilir).
#  Kullanim: bash intro_video.sh KARELER ANAHTAR SESSIZ.mp4
set -e; K="$1"; KEY="$2"; OUT="$3"; TMP=$(mktemp -d)
python3 - "$K" "$KEY" "$TMP" <<'EOF'
import sys, os, shutil, numpy as np
from PIL import Image
K, KEY, T = sys.argv[1:4]
for f in range(150):
    os.symlink(os.path.abspath(f"{K}/k{f:04d}.png"), f"{T}/k{f:04d}.png")
ld = lambda f: np.asarray(Image.open(f"{KEY}/k{f:04d}.png").convert("RGB"), dtype=np.float32)
cache = {}
for f in range(150, 285):
    a = 150 + 9 * ((f - 150) // 9); b = a + 9; w = (f - a) / 9.0
    for k in (a, b):
        if k not in cache: cache[k] = ld(k)
    x = cache[a] * (1 - w) + cache[b] * w
    Image.fromarray(np.clip(x + 0.5, 0, 255).astype(np.uint8)).convert("RGBA").save(f"{T}/k{f:04d}.png")
EOF
ffmpeg -v error -y -framerate 30 -start_number 0 -i "$TMP/k%04d.png" -f lavfi -i "color=c=0xF7F7F3:s=1920x1080:r=30:d=0.3" -filter_complex "\
[0:v]scale=1920:1080:flags=lanczos,unsharp=5:5:0.45:5:5:0,format=gbrp,split=2[b][g];\
[g]scale=480:270,gblur=sigma=10,scale=1920:1080[gl];[b][gl]blend=all_mode=screen:all_opacity=0.16[bl];\
[bl]rgbashift=rh=1:bh=-1:edge=smear,vignette=angle=PI/5.2,noise=alls=2:allf=t,format=yuv420p,trim=end_frame=276,\
fade=t=out:st=8.5:d=0.7:color=0xF7F7F3[v0];[1:v]format=yuv420p[w];[v0][w]concat=n=2:v=1:a=0,trim=end_frame=285,setpts=PTS-STARTPTS[v]" \
 -map "[v]" -r 30 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart "$OUT"
rm -rf "$TMP"
ffprobe -v error -count_frames -show_entries format=duration:stream=width,height,r_frame_rate,nb_read_frames -of compact "$OUT"
