#!/bin/bash
# Is emri E (19.11.2026): Ders 1 Bolum 1'e seri muzigi (Pawn - The Grey Room / Golden Palms, YouTube Ses Kitapligi).
#  Goruntu ve konusma degismez; yalnizca:
#   - acilis kesiti (8 sn) intro karti basinda (32,96 sn) girer; selam cumlesi (33,26 sn) baslayinca
#     konusmanin ~14 dB altina iner (tam duzey ~-18 LUFS, alt duzey ~-30 LUFS), kesit sonunda biter.
#   - kapanis kesiti (10 sn, kendisi azalan) bitis ekraninin son 10 sn'sinde kisik (~-24 LUFS).
#   - son 2 sn ekran (ve muzik) siyaha/sessize kararir.
#   - toplam ses alimiter ile tepe <= -1,5 dBTP (AAC sonrasi olculur).
#  Muzik dosyalari depoya girmez (Drive'dan scratchpad'e indirilir).
#  Kullanim: bash muzik_ekle.sh GIRIS.mp4 acilis.mp3 kapanis.mp3 CIKTI.mp4
set -e; IN="$1"; AC="$2"; KP="$3"; OUT="$4"
T0=32.96; SELAM=33.26; FULL=-7.3; DUCK=-19.3; KDB=-7.6
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
K0=$(python3 -c "print($DUR-10)"); F0=$(python3 -c "print($DUR-2)")
D1=$(python3 -c "print(round($T0*1000))"); D2=$(python3 -c "print(round($K0*1000))")
R=$(python3 -c "print(round($SELAM-$T0,3))")
# acilis: 0..R tam duzey, R..R+0,25 duzeye iner, son 0,3 sn yumusak bitis
VOL="volume='if(lt(t,$R),$(python3 -c "print(10**($FULL/20))"),if(lt(t,$R+0.25),$(python3 -c "print(10**($FULL/20))")+($(python3 -c "print(10**($DUCK/20)-10**($FULL/20))"))*(t-$R)/0.25,$(python3 -c "print(10**($DUCK/20))")))':eval=frame"
ffmpeg -v error -y -i "$IN" -i "$AC" -i "$KP" -filter_complex "\
[0:v]fade=t=out:st=$F0:d=2,format=yuv420p[v];\
[1:a]aformat=sample_rates=48000:channel_layouts=mono,$VOL,afade=t=out:st=7.7:d=0.34,adelay=$D1:all=1[m1];\
[2:a]aformat=sample_rates=48000:channel_layouts=mono,volume=${KDB}dB,adelay=$D2:all=1[m2];\
[0:a][m1][m2]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.78:level=disabled:attack=3:release=50,afade=t=out:st=$F0:d=2[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset veryfast -crf 23 -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
 -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT"
ffprobe -v error -show_entries format=duration,size -of compact "$OUT"
ffmpeg -hide_banner -i "$OUT" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I|Peak):"
