# NOTLAR — 002 (Direnç nedir?)
- Dal: claude/002-direnc-nedir. Senaryo yazıldı. tools/lib/anlatim.js + parcalar.js + README eklendi; stage.js zemini mat, player.html gradyanı kaldırıldı.
- Sıradaki: scene.js yaz → kare kontrolü → hareket kontrolü → parça parça render.
- 11:0x UTC: scene.js tamam (47,2 sn), kare kontrolü yapıldı (3 kontak sayfası). Parça render başladı: `wip/002-direnc-nedir/render_parts.sh` (parca-00: 0–16, 01: 16–32, 02: 32–47,2; sessiz, aynı anda). Varsa atlar; yeniden çalıştırınca eksikleri tamamlar.
- Sıradaki: parçalar → ffmpeg concat → tools/audio.py (meta.cues) + loudnorm → media/002-direnc-nedir/002-direnc-nedir.mp4 → kalite kontrolü → kapak → push → Metricool.
