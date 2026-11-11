// maske.js — YouTube arayüzü maskesi (AGENT.md bölüm 4): kontrol karelerinde yasak bölgeler yarı saydam kırmızı.
// Kullanım: node tools/render.mjs <sahne> --stills 1,5,9 --mask --scale 0.4 --out /tmp/m.png
/** mask(wrap) — üst %11, alt %32 ve sağ düğme sütununu (x %86–100) kırmızıyla örter. */
export function mask(wrap) {
  const box = (css) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;background:rgba(255,0,0,.33);z-index:9;pointer-events:none;' + css; wrap.appendChild(d); };
  box('left:0;top:0;width:100%;height:11%');
  box('left:0;top:68%;width:100%;height:32%');
  box('left:86%;top:11%;width:14%;height:57%');
  box('left:0;top:11%;width:6%;height:57%');
}
