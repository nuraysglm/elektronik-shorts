// "Abone ol + zil" karti (UZUN.md 4b) — uzun/ornek-02/sahne.js'deki cizimin aynisi; SAYDAM katman olarak 6 sn render edilir,
// birlestirmede parca 3 (0,15 sn) ve parca 6 (0,25 sn) uzerine bindirilir (parcalar.json "abone").
// Profil fotografi ve kalin yazi tipi depoda DEGIL: /_ozel/ yolundan (OZEL ortam degiskeni, scratchpad) yuklenir.
let ctx, FOTO = null;
// ---------------------------------------------------------------- abone ol + zil (UZUN.md 3b) — ajanin kendi cizimi
const CW = 840, CH = 176, CX0 = (1920 - CW) / 2, CY0 = 1080 - CH - 26;
const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
function bellPath(cx, cy, s) {
  ctx.beginPath();
  ctx.moveTo(cx - 0.42 * s, cy + 0.28 * s);
  ctx.quadraticCurveTo(cx - 0.30 * s, cy + 0.14 * s, cx - 0.30 * s, cy - 0.08 * s);
  ctx.bezierCurveTo(cx - 0.30 * s, cy - 0.40 * s, cx - 0.14 * s, cy - 0.50 * s, cx, cy - 0.50 * s);
  ctx.bezierCurveTo(cx + 0.14 * s, cy - 0.50 * s, cx + 0.30 * s, cy - 0.40 * s, cx + 0.30 * s, cy - 0.08 * s);
  ctx.quadraticCurveTo(cx + 0.30 * s, cy + 0.14 * s, cx + 0.42 * s, cy + 0.28 * s);
  ctx.closePath();
}
function drawBell(cx, cy, s, color, ang) {
  ctx.save(); ctx.translate(cx, cy - 0.5 * s); ctx.rotate(ang); ctx.translate(-cx, -(cy - 0.5 * s));
  ctx.fillStyle = color; bellPath(cx, cy, s); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy + 0.38 * s, 0.11 * s, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy - 0.55 * s, 0.07 * s, 0, 7); ctx.fill();
  ctx.restore();
}
function drawCursor(x, y, k) {
  const p = [[0, 0], [0, 27], [7, 21], [12, 32], [17, 30], [12, 19], [21, 19]];
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); p.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); ctx.closePath();
  ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 1.8; ctx.strokeStyle = '#111'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
// Sesle eszamanli (kanal sahibi 19.11.2026): kart cagri cumlesinin basinda girer, iki tik ve zil cumle (~2,5 sn) bitmeden tamamlanir.
export const ABONE = { klik1: 1.0, klik2: 1.9, zil: 1.0, sure: 4.5 }; // kart girisinden itibaren tik zamanlari (ses karisimi icin)
function drawAbone(u) { // u: kartin ekranda kaldigi sure icindeki saniye (0-4,5)
  const inn = ease(u / 0.4), out = ease((u - 3.9) / 0.5), off = (1 - inn) * (CH + 40) + out * (CH + 40);
  const x0 = CX0, y0 = CY0 + off;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6;
  const gr = ctx.createLinearGradient(0, y0, 0, y0 + CH); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#eceef0');
  ctx.fillStyle = gr; ctx.beginPath(); ctx.roundRect(x0, y0, CW, CH, CH / 2); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.lineWidth = 2; ctx.strokeStyle = '#c9cdd2'; ctx.stroke();
  // fotograf
  const pr = 62, pcx = x0 + 24 + pr, pcy = y0 + CH / 2;
  ctx.save(); ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, 7); ctx.clip();
  if (FOTO) ctx.drawImage(FOTO, pcx - pr, pcy - pr, pr * 2, pr * 2); else { ctx.fillStyle = '#9aa'; ctx.fill(); }
  ctx.restore(); ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, 7); ctx.stroke();
  // ad
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  const bw = 296, bh = 80, bx0 = x0 + CW - 26 - bw, by0 = pcy - bh / 2;
  const tx = pcx + pr + 20, avail = bx0 - 18 - tx; // ad ve unvan dugmeye degmez
  const fit = (s, sz) => { ctx.font = sz + 'px DJC'; const w = ctx.measureText(s).width; return w > avail ? Math.floor(sz * avail / w) : sz; };
  const n1 = 'ÖĞR. GÖR. NURAY SAĞLAM', n2 = 'ELEKTRİK-ELEKTRONİK MÜHENDİSLİĞİ', z1 = fit(n1, 27), z2 = fit(n2, 14);
  ctx.fillStyle = '#1e1f22'; ctx.font = z1 + 'px DJC'; ctx.fillText(n1, tx, pcy - 1);
  ctx.fillStyle = '#6b7078'; ctx.font = z2 + 'px DJC'; ctx.fillText(n2, tx + 1, pcy + 24);
  // dugme
  const c1 = ABONE.klik1, c2 = ABONE.klik2, done = u >= c1 + 0.12;
  const press = (u >= c1 && u < c1 + 0.14) ? 0.94 : 1;
  ctx.save(); ctx.translate(bx0 + bw / 2, pcy); ctx.scale(press, press); ctx.translate(-(bx0 + bw / 2), -pcy);
  ctx.fillStyle = done ? '#cfd2d6' : '#e3191e'; ctx.beginPath(); ctx.roundRect(bx0, by0, bw, bh, bh / 2); ctx.fill();
  const wr = bh / 2 - 7, wcx = bx0 + bw - 7 - wr;
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(wcx, pcy, wr, 0, 7); ctx.fill();
  ctx.fillStyle = done ? '#6e737a' : '#ffffff'; ctx.font = (done ? '21px' : '31px') + ' DJC'; ctx.textAlign = 'center';
  ctx.fillText(done ? 'ABONE OLUNDU' : 'ABONE OL', (bx0 + 14 + wcx - wr) / 2 + 4, pcy + (done ? 10 : 12));
  ctx.restore();
  const ring_ = u >= c2 && u < c2 + ABONE.zil, ang = ring_ ? 0.42 * Math.sin((u - c2) * 2 * Math.PI * 3.2) * (1 - (u - c2) / ABONE.zil) : 0;
  drawBell(wcx, pcy + 3, 40, done ? '#111111' : '#8b9096', ang);
  if (ring_) { ctx.strokeStyle = '#111'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; const a = 0.6 + 0.4 * Math.sin((u - c2) * 18);
    for (const sg of [-1, 1]) for (const k of [0, 1]) { const rr_ = 26 + k * 9; ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(wcx, pcy - 4, rr_, sg < 0 ? Math.PI * 1.05 : -Math.PI * 0.32, sg < 0 ? Math.PI * 1.32 : -Math.PI * 0.05); ctx.stroke(); }
    ctx.globalAlpha = 1; }
  ctx.restore();
  // imlec: sag alttan girer -> ABONE OL -> zil -> cikar
  const pA = [1960, 1110], pB = [bx0 + bw * 0.36, pcy + 6], pC = [wcx + 2, pcy + 8], pD = [1990, 1000];
  let cp = null;
  if (u >= 0.35 && u < 0.95) { const k = ease((u - 0.35) / 0.6); cp = [pA[0] + (pB[0] - pA[0]) * k, pA[1] + (pB[1] - pA[1]) * k]; }
  else if (u >= 0.95 && u < 1.35) cp = pB;
  else if (u >= 1.35 && u < 1.8) { const k = ease((u - 1.35) / 0.45); cp = [pB[0] + (pC[0] - pB[0]) * k, pB[1] + (pC[1] - pB[1]) * k]; }
  else if (u >= 1.8 && u < 3.0) cp = pC;
  else if (u >= 3.0 && u < 3.6) { const k = ease((u - 3.0) / 0.6); cp = [pC[0] + (pD[0] - pC[0]) * k, pC[1] + (pD[1] - pC[1]) * k]; }
  if (cp) { const kk = (Math.abs(u - c1 - 0.05) < 0.08 || Math.abs(u - c2 - 0.05) < 0.08) ? 1.45 : 1.6; drawCursor(cp[0], cp[1] + off * 0, kk); }
}

export function draw(t) { ctx.clearRect(0, 0, 1920, 1080); drawAbone(t); }
export async function init(canvas) {
  canvas.width = 1920; canvas.height = 1080; ctx = canvas.getContext('2d');
  const f2 = new FontFace('DJC', 'url(/_ozel/kalin.ttf)'); await f2.load(); document.fonts.add(f2);
  FOTO = new Image(); FOTO.src = '/_ozel/profil-daire.png'; await FOTO.decode();
  return { duration: ABONE.sure, ABONE };
}
