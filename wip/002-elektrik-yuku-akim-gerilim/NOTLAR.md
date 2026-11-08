# NOTLAR — 002 (Elektrik yükü, akım ve gerilim)
- Sahne: wip/002-elektrik-yuku-akim-gerilim/scene.js (süre 125,93 sn). Kare kontrolü yapıldı, iyi.
- Parça parça render: `render_parts.sh <ilk> <son>` (16 sn'lik parçalar parca-00..07.mp4, sessiz). Var olan parçayı atlar. 4 işlem aynı anda (~3,5 sn/kare); `zincir.sh k` parca-0k bitince parca-0(k+4)'ü başlatır.
- Sıradaki: tüm parçalar bitince ffmpeg concat → tools/audio.py ile ses (meta.cues → cues.json) + loudnorm → media/002-.../002-....mp4; kalite kontrolü (kalite.md), kapak, push, Metricool.
- parca-00..03: tamam (08:43). parca-04..07 render ediliyor.
