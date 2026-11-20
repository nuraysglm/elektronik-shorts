#!/bin/bash
# Ders 1 - Bolum 1'in intro eklenmis surumu (is emri K, UZUN.md 6-S): kanca -> intro (6 sn) -> selam + konu.
#  Girdi: asil video (is emri F muzikli surum; DOKUNULMAZ), sessiz intro, seri muzigi acilis kesiti, selam.mp3.
#  Asil videoda (F): T0=32,96 sn'de intro karti; T0..T0+6 kartin ilk 3 sn'si 2 kat yavas (muzik tek basina 3 sn),
#   selam T0+3,308 sn'de; T0'dan sonraki her sey girdinin +3 sn kaymis hali.
#  Burada: 1) 0..T0 kanca aynen (muzik yok); 2) T0..T0+6 intro, acilis kesiti tam duzeyde (-7,3 dB ~ -18 LUFS);
#   3) intro karti normal hizda (yavaslatma geri alinir), selam kartla 0,308 sn sonra, muzik selamda konusmanin ~8 dB
#   altina (-13,3 dB) iner ve 8 sn'lik kesitin sonunda biter; 4) gerisi asil videodan aynen (kapanis muzigi dahil).
#  Kart bolgesindeki konusma (asil videoda muzikle karisik) selam.mp3'ten yeniden kurulur: kazanc ve kayma asil videonun
#   muziksiz selam kuyrugundan olculdu (korelasyon 0,974; +4,43 dB; +0,008 sn).
#  Toplam sure asil videodan 3 sn uzun -> T0'dan sonraki zaman damgalari asil yayin.json'a gore +3 sn.
#  Kullanim: bash bolum1_introlu.sh ASIL.mp4 INTRO_SESSIZ.mp4 acilis.mp3 selam.mp3 CIKTI.mp4
set -e; IN="$1"; INTRO="$2"; AC="$3"; SEL="$4"; OUT="$5"; TMP=$(mktemp -d)
T0=32.96; ID=6; SOFS=0.308; SGAIN=4.43; CUT=8.2; FULL=-7.3; DUCK=-13.3
p(){ python3 -c "print($1)"; }
G(){ p "10**($1/20)"; }
R=$(p "$ID+$SOFS")
VOL="volume='if(lt(t,$R),$(G $FULL),if(lt(t,$R+0.3),$(G $FULL)+($(G $DUCK)-$(G $FULL))*(t-$R)/0.3,$(G $DUCK)))':eval=frame"
T6=$(p "$T0+6"); A3=$(p "$T0+3+$CUT"); D1=$(p "round($T0*1000)"); SD=$(p "round($SOFS*1000)")
ffmpeg -v error -y -i "$IN" -i "$INTRO" -i "$AC" -i "$SEL" -filter_complex "\
[0:v]split=3[va][vb][vc];[va]trim=0:$T0,setpts=PTS-STARTPTS[v1];[vb]trim=$T0:$T6,setpts=(PTS-STARTPTS)/2,fps=30[v2];\
[vc]trim=$T6,setpts=PTS-STARTPTS[v3];[1:v]trim=0:$ID,setpts=PTS-STARTPTS,fps=30,format=yuv420p[vi];\
[v1][vi][v2][v3]concat=n=4:v=1:a=0,fps=30,format=yuv420p[v];\
[0:a]asplit=2[aa][ab];[aa]atrim=0:$T0,asetpts=PTS-STARTPTS[a1];[ab]atrim=$A3,asetpts=PTS-STARTPTS[a3];\
anullsrc=r=48000:cl=mono,atrim=0:$ID[a2];\
[3:a]aformat=sample_rates=48000:channel_layouts=mono,volume=${SGAIN}dB,adelay=$SD:all=1,apad,atrim=0:$CUT[ak];\
[a1][a2][ak][a3]concat=n=4:v=0:a=1[sp];\
[2:a]aformat=sample_rates=48000:channel_layouts=mono,$VOL,afade=t=out:st=7.7:d=0.34,adelay=$D1:all=1[m];\
[sp][m]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.78:level=disabled:attack=3:release=50[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset veryfast -crf 23 -r 30 -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
 -c:a pcm_s16le -ar 48000 "$TMP/ham.mkv"
# toplam duzey: dogrusal kazancla -16 LUFS (karisim degismez)
I=$(ffmpeg -hide_banner -i "$TMP/ham.mkv" -vn -af ebur128 -f null - 2>&1 | grep -E "^ +I:" | tail -1 | awk '{print $2}')
GN=$(p "round(-16.0-($I),2)"); echo "olculen $I LUFS -> kazanc $GN dB"
ffmpeg -v error -y -i "$TMP/ham.mkv" -map 0:v -map 0:a -c:v copy -af "volume=${GN}dB" -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT"
rm -rf "$TMP"
ffprobe -v error -show_entries format=duration,size -of compact "$OUT"
ffmpeg -hide_banner -i "$OUT" -vn -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I|Peak):"
echo "kanca 0-$T0 | intro $T0-$T6 | selam $(p "$T6+$SOFS") | sonrasi asil+3 sn"
