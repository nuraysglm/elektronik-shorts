#!/bin/bash
# Is emri F (19.11.2026 22:35): seri muzigi duzeltmesi (Pawn - The Grey Room / Golden Palms).
#  Girdi: muziksiz birlesik video (birlestir.sh ciktisi, konusma -16 LUFS).
#  1) Acilis: intro kartinin basinda (T0) 3 sn eklenir: goruntude kartin ilk 3 sn'si 2 kat yavas yazilir
#     (kalem durmaz, duragan an yok), seste 3 sn bosluk -> muzik bu 3 sn tek basina ~-18 LUFS calar;
#     selam (T0+3+SOFS) baslayinca muzik konusmanin ~8 dB altina (~-24 LUFS) iner, 8 sn kesitin sonunda biter.
#     T0'dan sonraki her sey +3 sn kayar (yayin.json zaman damgalari +3 sn).
#  2) Kapanis: bitis ekraninin basindan (son 20 sn) itibaren muzik bitis ekraninin tamami boyunca ~-20 LUFS:
#     acilis kesiti (8 sn) -> kapanis kesiti (10 sn, kendisi azalir) -> acilis kesitinin basi 0,5 sn capraz
#     gecisle eklenir (bitis ekraninda sessiz an olmaz); son 2 sn goruntu siyaha, muzik birlikte susar.
#  Muzik dosyalari depoya girmez (Drive'dan scratchpad'e).
#  Kullanim: bash muzik_f.sh GIRIS.mp4 acilis.mp3 kapanis.mp3 CIKTI.mp4 T0 SOFS [BITIS_SN=20]
set -e; IN="$1"; AC="$2"; KP="$3"; OUT="$4"; T0="$5"; SOFS="$6"; ES_LEN="${7:-20}"
EK=3; FULL=-7.3; DUCK=-13.3; EAC=-9.3; EKP=-3.6
p(){ python3 -c "print($1)"; }
DUR0=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
DUR=$(p "$DUR0+$EK"); ES=$(p "$DUR-$ES_LEN"); F0=$(p "$DUR-2")
R=$(p "round($EK+$SOFS,3)")
G(){ p "10**($1/20)"; }
VOL="volume='if(lt(t,$R),$(G $FULL),if(lt(t,$R+0.3),$(G $FULL)+($(G $DUCK)-$(G $FULL))*(t-$R)/0.3,$(G $DUCK)))':eval=frame"
D1=$(p "round($T0*1000)"); E1=$(p "round($ES*1000)"); E2=$(p "round(($ES+7.8)*1000)"); E3=$(p "round(($ES+17.3)*1000)")
T3=$(p "$T0+$EK")
ffmpeg -v error -y -i "$IN" -i "$AC" -i "$KP" -i "$AC" -i "$AC" -filter_complex "\
[0:v]split=3[va][vb][vc];[va]trim=0:$T0,setpts=PTS-STARTPTS[v1];\
[vb]trim=$T0:$T3,setpts=2*(PTS-STARTPTS)[v2];[vc]trim=$T3,setpts=PTS-STARTPTS[v3];\
[v1][v2][v3]concat=n=3:v=1:a=0,fps=30,fade=t=out:st=$F0:d=2,format=yuv420p[v];\
[0:a]asplit=2[aa][ab];[aa]atrim=0:$T0,asetpts=PTS-STARTPTS[a1];[ab]atrim=$T0,asetpts=PTS-STARTPTS,adelay=$((EK*1000)):all=1[a2];\
[a1][a2]concat=n=2:v=0:a=1[sp];\
[1:a]aformat=sample_rates=48000:channel_layouts=mono,$VOL,afade=t=out:st=7.7:d=0.34,adelay=$D1:all=1[m1];\
[3:a]aformat=sample_rates=48000:channel_layouts=mono,volume=${EAC}dB,afade=t=in:d=0.3,afade=t=out:st=7.5:d=0.5,adelay=$E1:all=1[m2];\
[2:a]aformat=sample_rates=48000:channel_layouts=mono,volume=${EKP}dB,afade=t=in:d=0.4,adelay=$E2:all=1[m3];\
[4:a]aformat=sample_rates=48000:channel_layouts=mono,volume=${EAC}dB,afade=t=in:d=0.5,adelay=$E3:all=1[m4];\
[sp][m1][m2][m3][m4]amix=inputs=5:normalize=0:duration=first,alimiter=limit=0.78:level=disabled:attack=3:release=50,afade=t=out:st=$F0:d=2[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset veryfast -crf 23 -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
 -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT"
ffprobe -v error -show_entries format=duration,size -of compact "$OUT"
ffmpeg -hide_banner -i "$OUT" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I|Peak):"
echo "T0=$T0 selam=$(p "$T0+$R") bitis_ekrani=$ES sure=$DUR"
