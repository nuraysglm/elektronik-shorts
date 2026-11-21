// Türev Short ortak öğeleri — v3 standardı (kanal sahibi 21.11.2026 08:50 ve 13:14; UZUN.md "ONAYLANDI ve STANDART").
//  1) Üstte sabit iki satırlık yönlendirme etiketi (0. saniyeden sona; yazılmaz/silinmez).
//  2) Sonda ~3,5 sn "Beğen – Paylaş – Abone ol" animasyonu (eski "Dersin tamamı" kartının yerine).
// Simgeler kodla çizilmiş genel simgelerdir (YouTube logosu / düğme görseli kopyalanmaz); abone düğmesi 4b kartının stiliyle uyumlu.
import { K, B, R, G, L, W, text, mw, son, mark, SAFE } from './motor.js';

// ---------------------------------------------------------------- 1) yönlendirme etiketi
// Üst güvenli alanın içinde (AGENT.md 4: y >= 211 px). Kutular y ~214–302; tahta içeriği y >= ~318'den başlar (sahnelerde remapY).
export const ETIKET = [
  { s: 'Dersin tamamı için:', y: 247, size: 34 },
  { s: 'Devre Teorisi I oynatma listesi · Ders 1 - Bölüm 1', y: 291, size: 36 },
];
const EC = '#4a4f57';
export function etiket() {
  return ETIKET.map((e) => { let z = e.size; while (mw(e.s, z) > SAFE.x1 - L - 8 && z > 30) z -= 1; // satır yazı alanını aşmaz
    return text(e.s, L, e.y, z, EC, 0, { g: 'etiket', sabit: true }); });
}

// ---------------------------------------------------------------- 2) Beğen – Paylaş – Abone ol
// Zamanlar animasyon başından (u = 0: konuşma bittikten 0,5 sn sonra) itibaren; ses karışımı (son_ses.py) aynı tabloyu kullanır.
export const SON = { sure: 3.5, bulanik: 0.3, alt: 0.4, b1: 0.4, b1tik: 0.78, b2: 1.0, b2whoosh: 1.12, b3: 1.6, b3tik: 2.08, zil: 2.12 };
const CX = 520; // güvenli alan ortası (x 65–929) ile ekran ortası arası
const PW = 500, PH = 128, Y1 = 590, Y2 = 790, Y3 = 990, BW = 520, BH = 124;
const BLUE = B, GRY = '#5b616a';
const easeOutBack = (u) => { u = Math.max(0, Math.min(1, u)); const c = 1.9; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
const clamp = (u) => Math.max(0, Math.min(1, u));
const sm = (u) => { u = clamp(u); return u * u * (3 - 2 * u); };

function pill(ctx, cx, cy, w, h) {
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6;
  const gr = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#eceef0');
  ctx.fillStyle = gr; ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.lineWidth = 2; ctx.strokeStyle = '#c9cdd2'; ctx.stroke(); ctx.restore();
}
// genel başparmak simgesi (eldiven/kart çizimi): s ≈ simge yüksekliği
function thumb(ctx, x, y, s, fill, line) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 100, s / 100); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.roundRect(-50, -8, 22, 56, 5); // bilek bandı
  ctx.moveTo(-20, -6); ctx.lineTo(-20, 46); ctx.lineTo(30, 46);
  ctx.quadraticCurveTo(44, 46, 46, 34); ctx.lineTo(52, 4); ctx.quadraticCurveTo(54, -10, 40, -10);
  ctx.lineTo(10, -10); ctx.lineTo(14, -32); ctx.quadraticCurveTo(16, -50, 2, -50); ctx.quadraticCurveTo(-4, -50, -6, -42);
  ctx.lineTo(-20, -6); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  ctx.lineWidth = 7; ctx.strokeStyle = line; ctx.stroke(); ctx.restore();
}
// genel paylaş simgesi: sağa kıvrılan ok
function share(ctx, x, y, s, color) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 100, s / 100); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.fillStyle = color; ctx.beginPath();
  ctx.moveTo(8, -46); ctx.lineTo(54, -4); ctx.lineTo(8, 38); ctx.lineTo(8, 14);
  ctx.bezierCurveTo(-22, 12, -40, 22, -52, 44); ctx.bezierCurveTo(-50, 6, -28, -20, 8, -24); ctx.closePath(); ctx.fill(); ctx.restore();
}
function bellPath(ctx, cx, cy, s) {
  ctx.beginPath(); ctx.moveTo(cx - 0.42 * s, cy + 0.28 * s); ctx.quadraticCurveTo(cx - 0.30 * s, cy + 0.14 * s, cx - 0.30 * s, cy - 0.08 * s);
  ctx.bezierCurveTo(cx - 0.30 * s, cy - 0.40 * s, cx - 0.14 * s, cy - 0.50 * s, cx, cy - 0.50 * s);
  ctx.bezierCurveTo(cx + 0.14 * s, cy - 0.50 * s, cx + 0.30 * s, cy - 0.40 * s, cx + 0.30 * s, cy - 0.08 * s);
  ctx.quadraticCurveTo(cx + 0.30 * s, cy + 0.14 * s, cx + 0.42 * s, cy + 0.28 * s); ctx.closePath();
}
function bell(ctx, cx, cy, s, color, ang) {
  ctx.save(); ctx.translate(cx, cy - 0.5 * s); ctx.rotate(ang); ctx.translate(-cx, -(cy - 0.5 * s));
  ctx.fillStyle = color; bellPath(ctx, cx, cy, s); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy + 0.38 * s, 0.11 * s, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(cx, cy - 0.55 * s, 0.07 * s, 0, 7); ctx.fill(); ctx.restore();
}
function hand(ctx, s, x, y, size, color) { ctx.font = `${size}px PH`; ctx.fillStyle = color; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillText(s, x, y); }
function pop(ctx, u0, u, cx, cy, fn) { // giriş: ölçek 0,55 -> 1 (hafif taşma), saydamlık 0 -> 1 (0,28 sn)
  if (u < u0) return; const p = (u - u0) / 0.28, k = 0.55 + 0.45 * easeOutBack(p);
  ctx.save(); ctx.globalAlpha = sm(p * 1.6); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy); fn(); ctx.restore();
}
function burst(ctx, cx, cy, u, color) { // tıklama halkası
  if (u < 0 || u > 0.4) return; const p = u / 0.4; ctx.save(); ctx.globalAlpha = 0.55 * (1 - p); ctx.strokeStyle = color; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(cx, cy, 40 + 40 * p, 0, 7); ctx.stroke(); ctx.restore();
}

function anim(ctx, u) {
  const T = SON;
  // (alt satır) Dersin tamamı kanalda: Devre Teorisi I
  if (u >= T.alt) { ctx.save(); ctx.globalAlpha = sm((u - T.alt) / 0.3);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = 'rgba(255,255,255,0.9)'; ctx.shadowBlur = 14;
    ctx.font = '52px PH'; ctx.fillStyle = '#1c1c1c'; ctx.fillText('Dersin tamamı kanalda:', CX, 1170);
    ctx.font = '66px PH'; ctx.fillStyle = R; ctx.fillText('Devre Teorisi I', CX, 1256); ctx.restore(); }
  // (1) Beğen
  pop(ctx, T.b1, u, CX, Y1, () => {
    pill(ctx, CX, Y1, PW, PH);
    const done = u >= T.b1tik, press = u >= T.b1tik - 0.06 && u < T.b1tik + 0.08 ? 0.86 : 1, ix = CX - PW / 2 + 92;
    ctx.save(); ctx.translate(ix, Y1); ctx.scale(press, press); ctx.translate(-ix, -Y1);
    thumb(ctx, ix, Y1 + 2, 86, done ? BLUE : null, done ? BLUE : GRY); ctx.restore();
    burst(ctx, ix, Y1, u - T.b1tik, BLUE);
    hand(ctx, 'Beğen', ix + 78, Y1 + 24, 70, '#1c1c1c');
  });
  // (2) Paylaş
  pop(ctx, T.b2, u, CX, Y2, () => {
    pill(ctx, CX, Y2, PW, PH);
    const ix = CX - PW / 2 + 92, p = sm((u - T.b2whoosh) / 0.3), dx = -26 + 26 * p;
    if (u >= T.b2whoosh && u < T.b2whoosh + 0.45) { ctx.save(); ctx.globalAlpha = 0.5 * (1 - (u - T.b2whoosh) / 0.45); ctx.strokeStyle = BLUE; ctx.lineWidth = 4; ctx.lineCap = 'round';
      for (const [oy, l] of [[-16, 34], [0, 46], [16, 34]]) { ctx.beginPath(); ctx.moveTo(ix - 52 + dx - l, Y2 + oy); ctx.lineTo(ix - 52 + dx, Y2 + oy); ctx.stroke(); } ctx.restore(); }
    share(ctx, ix + dx * 0.6, Y2, 80, u >= T.b2whoosh ? BLUE : GRY);
    hand(ctx, 'Paylaş', ix + 78, Y2 + 24, 70, '#1c1c1c');
  });
  // (3) ABONE OL -> ABONE OLUNDU + zil
  pop(ctx, T.b3, u, CX, Y3, () => {
    const done = u >= T.b3tik + 0.06, press = u >= T.b3tik - 0.05 && u < T.b3tik + 0.1 ? 0.94 : 1;
    const x0 = CX - BW / 2, y0 = Y3 - BH / 2, wr = BH / 2 - 9, wcx = x0 + BW - 9 - wr;
    ctx.save(); ctx.translate(CX, Y3); ctx.scale(press, press); ctx.translate(-CX, -Y3);
    ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6;
    ctx.fillStyle = done ? '#cfd2d6' : '#e3191e'; ctx.beginPath(); ctx.roundRect(x0, y0, BW, BH, BH / 2); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(wcx, Y3, wr, 0, 7); ctx.fill();
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = done ? '#3f444b' : '#ffffff'; ctx.font = (done ? '40px' : '50px') + ' IS';
    ctx.fillText(done ? 'ABONE OLUNDU' : 'ABONE OL', (x0 + 22 + wcx - wr) / 2, Y3 + (done ? 14 : 18));
    ctx.restore();
    const r0 = T.zil, ring = u >= r0 && u < r0 + 0.95, ang = ring ? 0.42 * Math.sin((u - r0) * 2 * Math.PI * 3.2) * (1 - (u - r0) / 0.95) : 0;
    bell(ctx, wcx, Y3 + 4, 50, done ? '#111111' : '#8b9096', ang);
    if (ring) { ctx.save(); ctx.strokeStyle = '#111'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.globalAlpha = 0.6 + 0.4 * Math.sin((u - r0) * 18);
      for (const sg of [-1, 1]) for (const k of [0, 1]) { const rr = 32 + k * 11; ctx.beginPath(); ctx.arc(wcx, Y3 - 4, rr, sg < 0 ? Math.PI * 1.05 : -Math.PI * 0.32, sg < 0 ? Math.PI * 1.32 : -Math.PI * 0.05); ctx.stroke(); }
      ctx.restore(); }
    burst(ctx, CX - 40, Y3, u - T.b3tik, '#e3191e');
  });
}
// QC için kutular (yazı + simge kutuları); güvenli alan ve etiketle çakışma qc.py'de denetlenir
function kutular() {
  const b = (s, z, x, y) => [x, y - z * 0.95, x + mw(s, z), y + z * 0.3].map(Math.round);
  const ix = CX - PW / 2 + 92, c = (s, z, y) => { const w = mw(s, z); return [CX - w / 2, y - z * 0.95, CX + w / 2, y + z * 0.3].map(Math.round); };
  return [
    { s: 'kart Beğen', b: [CX - PW / 2, Y1 - PH / 2, CX + PW / 2, Y1 + PH / 2] }, { s: 'Beğen', b: b('Beğen', 70, ix + 78, Y1 + 24) },
    { s: 'kart Paylaş', b: [CX - PW / 2, Y2 - PH / 2, CX + PW / 2, Y2 + PH / 2] }, { s: 'Paylaş', b: b('Paylaş', 70, ix + 78, Y2 + 24) },
    { s: 'ABONE OL düğmesi', b: [CX - BW / 2, Y3 - BH / 2, CX + BW / 2, Y3 + BH / 2] },
    { s: 'Dersin tamamı kanalda:', b: c('Dersin tamamı kanalda:', 52, 1170) }, { s: 'Devre Teorisi I', b: c('Devre Teorisi I', 66, 1256) },
  ];
}
export function sonAnim(o) { son(o.kartBas, anim); mark('son', { t0: o.kartBas, sure: SON.sure, zaman: SON, kutular: kutular() }); }
