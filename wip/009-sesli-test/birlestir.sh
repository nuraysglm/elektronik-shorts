#!/bin/bash
# 009: parçaları birleştir; seslendirme (ses.mp3, yalnızca düzey normalizasyonu: iki geçişli loudnorm, -16 LUFS, tepe -1,5 dBTP)
# + olay efektleri (meta.cues, tepe değeri seslendirmenin tepesinden en az 18 dB aşağıda) → media/009-sesli-test/009-sesli-test.mp4
set -e
cd "$(dirname "$0")/../.."
D=wip/009-sesli-test; O=media/009-sesli-test; T=$(mktemp -d); mkdir -p $O
for i in 0 1 2 3; do echo "file '$PWD/$D/parca-0$i.mp4'"; done > $T/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i $T/list.txt -c copy $T/sessiz.mp4
DUR=$(node -e "import('./$D/scene.js').then(m=>console.log(m.meta.duration))" 2>/dev/null | tail -1)
# 1) seslendirme: iki geçişli loudnorm (ölç, sonra doğrusal uygula)
J=$(ffmpeg -nostats -i $D/ses.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i $D/ses.mp3 -af "loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -ac 1 -ar 48000 $T/ses.wav
# 2) efektler
node -e "import('./$D/scene.js').then(m=>{const x=m.meta;require('fs').writeFileSync('$T/cues.json',JSON.stringify({duration:x.duration,offset:0,...x}))})" 2>/dev/null
python3 tools/audio.py $T/cues.json $T/fx.wav
ffmpeg -y -loglevel error -i $T/fx.wav -ac 1 -ar 48000 $T/fx48.wav
# 3) karışım (numpy): efekt tepesi = seslendirme tepesi - 18 dB
python3 - "$T" "$DUR" <<'PY'
import sys, wave, numpy as np
T, dur = sys.argv[1], float(sys.argv[2]); SR = 48000
def rd(p):
    with wave.open(p) as w: return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
v, fx = rd(T + '/ses.wav'), rd(T + '/fx48.wav')
n = int(round(dur * SR)); out = np.zeros(n)
out[:min(n, len(v))] += v[:n]
pv, pf = np.abs(v).max(), np.abs(fx).max()
k = (pv * 10 ** (-18 / 20)) / pf if pf > 0 else 0
out[:min(n, len(fx))] += k * fx[:n]
print('seslendirme tepe %.1f dBFS, efekt tepe %.1f dBFS (fark %.1f dB)' % (20*np.log10(pv), 20*np.log10(k*pf+1e-12), 20*np.log10(pv/(k*pf+1e-12))))
pk = np.abs(out).max(); print('karışım tepe %.1f dBFS' % (20*np.log10(pk)))
with wave.open(T + '/mix.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes())
PY
ffmpeg -y -loglevel error -i $T/sessiz.mp4 -i $T/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest -movflags +faststart $O/009-sesli-test.mp4
ffmpeg -y -loglevel error -ss 0.0 -i $O/009-sesli-test.mp4 -frames:v 1 -q:v 3 $O/kapak.jpg
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,channels,sample_rate -show_entries format=duration -of compact $O/009-sesli-test.mp4
ffmpeg -nostats -i $O/009-sesli-test.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
ffmpeg -nostats -i $O/009-sesli-test.mp4 -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume"
ffmpeg -nostats -i $O/009-sesli-test.mp4 -vf freezedetect=n=0.001:d=0.5 -map 0:v -f null - 2>&1 | grep -c freeze_start || true
rm -rf $T
