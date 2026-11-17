// Uzun video ornek 02 — beyaz tahta sahnesi (2D canvas), 1920x1080. ornek-01 motorundan uyarlandi.
// Zaman deterministik: her sey draw(t) icinde t'den hesaplanir. Zamanlar zamanlama.json'dan gelir.
// Abone karti: profil fotografi ve kalin dar yazi tipi depoda DEGIL; render sirasinda /_ozel/ yolundan (scratchpad) yuklenir.
const K = '#1c1c1c', B = '#1a56c4', R = '#d1242a', BG = '#fbfaf6';
let ctx, W, H, items = [], Z, DUR = 0, FOTO = null;
const used = new Set();

// ---------------------------------------------------------------- zaman yardimcilari
const S = (i) => Z[i].start, E = (i) => Z[i].end;
const norm = (w) => w.toLocaleLowerCase('tr').replace(/[.,;:?]/g, '');
function Wt(i, word, nth = 0, exact = false) {
  const ws = Z[i].words.filter((w) => (exact ? norm(w.w) === norm(word) : norm(w.w).startsWith(norm(word))));
  if (!ws[nth]) throw new Error(`kelime yok: cumle ${i} '${word}' #${nth}`);
  return ws[nth].t0;
}

// ---------------------------------------------------------------- yazi (alt simge: _ sonraki karakter)
function groups(s) {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const sub = s[i] === '_'; const c = sub ? s[++i] : s[i]; used.add(c);
    if (out.length && out[out.length - 1].sub === sub) out[out.length - 1].c += c; else out.push({ c, sub });
  }
  return out;
}
const font = (size) => `${size}px PH`;
function mw(s, size) { let w = 0; for (const g of groups(s)) { ctx.font = font(g.sub ? size * 0.62 : size); w += ctx.measureText(g.c).width; } return w; }
function drawRich(s, x, y, size, color) {
  ctx.fillStyle = color; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  for (const g of groups(s)) { ctx.font = font(g.sub ? size * 0.62 : size); ctx.fillText(g.c, x, g.sub ? y + size * 0.2 : y); x += ctx.measureText(g.c).width; }
}

// ---------------------------------------------------------------- ogeler
function add(o) { o.t1 ??= Infinity; items.push(o); return o; }
function erase(g, t) { for (const it of items) if (it.g === g && it.t1 > t && it.t0 < t) it.t1 = t; }
function text(s, x, y, size, color, t0, o = {}) {
  const w = mw(s, size); const x0 = o.align === 'c' ? x - w / 2 : o.align === 'r' ? x - w : x;
  const it = add({ k: 'text', s, x: x0, y, size, color, w, t0, dur: o.dur ?? Math.min(2.5, Math.max(0.25, s.length * 0.035)), g: o.g, t1: o.t1 });
  it.box = [x0 - 6, y - size * 0.95, x0 + w + 6, y + size * 0.3];
  return it;
}
function path(segs, color, lw, t0, dur, o = {}) {
  const lens = segs.map((p) => { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; });
  return add({ k: 'path', segs, lens, total: lens.reduce((a, b) => a + b, 0), color, lw, t0, dur, g: o.g, t1: o.t1 });
}
function pulse(box, color, t0, t1, o = {}) { return add({ k: 'pulse', box, color, t0, t1, g: o.g, dur: 0 }); }
function ring(c, r, color, t0, t1, o = {}) { return add({ k: 'ring', c, r, color, t0, t1, g: o.g, dur: 0 }); }
function dot(c, r, color, t0, o = {}) { return add({ k: 'dot', c, r, color, t0, dur: 0.12, g: o.g, t1: o.t1 }); }
function arrow(x0, y0, x1, y1, color, t0, dur, o = {}) {
  const a = Math.atan2(y1 - y0, x1 - x0), h = o.head ?? 16, s = 0.5;
  return path([[[x0, y0], [x1, y1]], [[x1 - h * Math.cos(a - s), y1 - h * Math.sin(a - s)], [x1, y1], [x1 - h * Math.cos(a + s), y1 - h * Math.sin(a + s)]]], color, o.lw ?? 5, t0, dur, o);
}
function ellipsePts(cx, cy, rx, ry, n = 64) { const p = []; for (let i = 0; i <= n + 3; i++) { const a = -2.2 + (i / n) * 2 * Math.PI; const k = 1 + 0.03 * Math.sin(a * 2 + 1); p.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)]); } return p; }
function circlePts(cx, cy, r, n = 56, a0 = -Math.PI / 2) { const p = []; for (let i = 0; i <= n; i++) { const a = a0 + (i / n) * 2 * Math.PI; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }
function zig(p0, p1, zl, amp) { // p0'dan p1'e direnc: uclar duz, ortada zl uzunlugunda testere
  const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), ux = (p1[0] - p0[0]) / L, uy = (p1[1] - p0[1]) / L, nx = -uy, ny = ux;
  const a = (L - zl) / 2, pts = [p0, [p0[0] + ux * a, p0[1] + uy * a]], n = 6, st = zl / n;
  for (let i = 0; i < n; i++) { const d = a + st * (i + 0.25), d2 = a + st * (i + 0.75); pts.push([p0[0] + ux * d + nx * amp, p0[1] + uy * d + ny * amp], [p0[0] + ux * d2 - nx * amp, p0[1] + uy * d2 - ny * amp]); }
  pts.push([p0[0] + ux * (a + zl), p0[1] + uy * (a + zl)], p1); return pts;
}
// saat yonunde cevre oku: yay + uc
function meshArrow(cx, cy, r, color, t0, dur, o = {}) {
  const a0 = -Math.PI * 0.95, a1 = a0 + Math.PI * 1.62, n = 40, pts = [];
  for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  const [ex, ey] = pts[n], ta = a1 + Math.PI / 2, h = 15; // teget yon (saat yonu)
  const head = [[ex - h * Math.cos(ta - 0.5), ey - h * Math.sin(ta - 0.5)], [ex, ey], [ex - h * Math.cos(ta + 0.5), ey - h * Math.sin(ta + 0.5)]];
  return path([pts, head], color, o.lw ?? 5, t0, dur, o);
}
// denklem satiri: parcalar {s, t, dur}; konusulan parca vurgulanir
function eq(x, y, size, parts, o = {}) {
  const boxes = [], its = []; let cx = x;
  parts.forEach((p, i) => {
    const color = p.color ?? o.color ?? K;
    const it = text(p.s, cx, y, size, color, p.t, { dur: p.dur, g: o.g, t1: o.t1 });
    if (o.hl !== false && p.hl !== false) { const nt = parts[i + 1] ? parts[i + 1].t : p.t + it.dur + 0.5; pulse(it.box, color === R ? R : B, p.t, Math.max(nt, p.t + it.dur + 0.15), { g: o.g }).ref = it; }
    boxes.push(it.box); its.push(it); cx += it.w + size * 0.3;
  });
  return { boxes, its, x1: cx, box: [x - 8, Math.min(...boxes.map((b) => b[1])), cx - size * 0.3 + 8, Math.max(...boxes.map((b) => b[3]))] };
}
function frame(box, color, t0, dur, o = {}) { const [a, b, c, d] = box; return path([[[a, b], [c, b], [c, d], [a, d], [a, b]]], color, o.lw ?? 4, t0, dur, o); }
function check(x, y, t, g) { return path([[[x, y - 14], [x + 14, y + 2], [x + 46, y - 40]]], K, 6, t, 0.35, { g }); }

// ================================================================ UZUN (1920x1080)
function build() {
  // devre geometrisi (metin.md sahne plani: sol kaynak, R1, ortak R2, R3, sag kolda R4)
  const xL = 170, xM = 480, xR = 920, yT = 216, yB = 740, r = 46, ym = (yT + yB) / 2, zl = 130, amp = 16, lw = 4, fs = 38, yZ = 540; const zc = (yT + yZ) / 2; // zc: dikey direnc govdesinin ortasi; yZ: dikey direnclerin alt ucu
  const AUD = Z[Z.length - 1].end + 0.55; DUR = AUD + 4;
  const X0 = 980, ES = 44; // denklem sutunu
  const hb = (cx, cy, hor) => (hor ? [cx - zl / 2 - 12, cy - amp - 12, cx + zl / 2 + 12, cy + amp + 12] : [cx - amp - 12, cy - zl / 2 - 12, cx + amp + 12, cy + zl / 2 + 12]);
  const bx = { vs: [xL - r - 10, ym - r - 10, xL + r + 10, ym + r + 10], r1: hb((xL + xM) / 2 - 35, yT, 1), r3: hb((xM + xR) / 2 + 35, yT, 1), r2: hb(xM, (yT + yZ) / 2, 0), r4: hb(xR, (yT + yZ) / 2, 0) };
  const g = 'devre', P = (segs, color, t0, d) => path(segs, color, lw, t0, d, { g });
  // --- baslik (video boyunca kalir)
  const ttl = text('Çevre akımları yöntemi: çözümlü soru', 77, 88, 56, K, S(0) + 0.05, { dur: 2.0, g: 'baslik' });
  path([[[77, 106], [77 + ttl.w, 106]]], B, 4, S(0) + 2.1, 0.4, { g: 'baslik' });
  // --- sahne 1-3: kanca (cumle 0-4). R2 ilk karede son konumunda cizilir.
  P([zig([xM, yT], [xM, yZ], zl, amp)], K, S(0) + 0.15, 1.2);
  const ist = text('İstenen: iki çevre akımı', X0, 140, 42, K, S(1), { dur: 1.2, g: 'ist' });
  path([ellipsePts(xM, zc, 42, 150)], R, 5, S(2) + 0.2, 0.8, { g: 'kanca' });
  const lod = text('ortak direnç', xM + amp + 32, zc + 34, 32, R, Wt(2, 'ortak'), { g: 'devre', dur: 0.6 });
  const qm = text('?', 392, zc + 28, 84, R, Wt(3, 'ters'), { g: 'kanca', dur: 0.3 });
  pulse(bx.r2, R, S(0) + 1.4, S(5) + 0.2, { g: 'v1' });
  path([[[qm.x - 4, zc + 44], [qm.x + qm.w + 4, zc + 44]]], R, 4, Wt(4, 'kuralını'), 0.35, { g: 'kanca' });
  dot([xM, yT], 7, K, Wt(4, 'iki'), { g });
  P([[[xM, yT], [xM - 70, yT]], [[xM, yT], [xM + 70, yT]]], K, Wt(4, 'kontrol') - 0.3, 0.8);
  // --- sahne 4: devre (cumle 5-8)
  P([circlePts(xL, ym, r)], K, S(5) + 0.1, 0.9);
  const lvs = text('24 V', xL - r - 12, ym + 14, 40, K, Wt(5, 'yirmi'), { align: 'r', g, dur: 0.4 });
  P([[[xL - 10, ym - r * 0.45], [xL + 10, ym - r * 0.45]], [[xL, ym - r * 0.45 - 10], [xL, ym - r * 0.45 + 10]], [[xL - 10, ym + r * 0.45], [xL + 10, ym + r * 0.45]]], K, Wt(5, 'artı'), 0.4);
  P([[[xL, ym - r], [xL, yT]], [[xL, ym + r], [xL, yB]]], K, Wt(5, 'artı') + 0.2, 0.6);
  pulse(bx.vs, B, S(5) + 0.9, Wt(6, 'altı') + 0.1, { g: 'v2' });
  const tr1 = Wt(6, 'altı');
  P([zig([xL, yT], [xM - 70, yT], zl, amp)], K, tr1 - 0.3, 1.0);
  const l1 = text('R_1 = 6 kΩ', (xL + xM) / 2 - 35, 180, fs, K, tr1 + 0.3, { align: 'c', g, dur: 0.5 });
  const tr3 = Wt(6, 'iki');
  P([zig([xM + 70, yT], [xR, yT], zl, amp)], K, tr3 - 0.2, 1.0);
  const l3 = text('R_3 = 2 kΩ', (xM + xR) / 2 + 35, 180, fs, K, tr3 + 0.4, { align: 'c', g, dur: 0.5 });
  pulse(bx.r1, B, tr1, tr3, { g: 'v2' }); pulse(bx.r3, B, tr3, E(6) + 0.2, { g: 'v2' });
  const tr2 = Wt(7, 'üç');
  P([[[xM, yZ], [xM, yB]]], K, S(7) + 0.3, 0.6); dot([xM, yB], 7, K, S(7) + 0.9, { g });
  const l2 = text('R_2 = 3 kΩ', xM + amp + 32, zc - 8, fs, K, tr2, { g, dur: 0.5 });
  pulse(bx.r2, B, S(7), S(8) + 0.6, { g: 'v2' });
  const tr4 = Wt(8, 'dört');
  P([zig([xR, yT], [xR, yZ], zl, amp), [[xR, yZ], [xR, yB]]], K, S(8) + 0.4, 1.4);
  const l4 = text('R_4 = 4 kΩ', xR - amp - 16, zc - 8, fs, K, tr4, { align: 'r', g, dur: 0.5 });
  pulse(bx.r4, B, tr4 - 0.3, Wt(9, 'akımı'), { g: 'v2' });
  P([[[xL, yB], [xR, yB]]], K, E(8) - 0.75, 0.7);
  // --- sahne 5: cevre akimlari (cumle 9)
  const cL = [325, 620], cR = [700, 620], mr = 46;
  meshArrow(cL[0], cL[1], mr, B, Wt(9, 'akımı') - 0.2, 0.6, { g });
  const li1 = text('i_1', cL[0], cL[1] + 13, 40, B, Wt(9, 'i', 0, true), { align: 'c', g, dur: 0.3 });
  meshArrow(cR[0], cR[1], mr, B, Wt(9, 'sağ') , 0.6, { g });
  const li2 = text('i_2', cR[0], cR[1] + 13, 40, B, Wt(9, 'i', 1, true), { align: 'c', g, dur: 0.3 });
  const td = Wt(9, 'dönme'); ring(cL, mr + 8, B, Wt(9, 'i', 0, true) + 0.2, td + 0.05, { g: 'v3' });
  ring(cL, mr + 8, B, td, E(9) + 0.3, { g: 'v3' }); ring(cR, mr + 8, B, td, E(9) + 0.3, { g: 'v3' });
  erase('kanca', S(9) - 0.1);
  // --- sahne 6: sol cevre (cumle 10-13)
  ring(cL, mr + 8, B, S(10), E(13) + 0.3, { g: 'v4' });
  path([[[lvs.x, ym + 24], [lvs.x + lvs.w, ym + 24]]], B, 4, Wt(10, 'yirmi'), 0.4, { g: 'v4u' });
  pulse(bx.vs, B, Wt(10, 'kaynakta'), E(10) + 0.2, { g: 'v4' });
  const ts = S(11) + 0.3;
  arrow(xM - 22, 462, xM - 22, 534, B, ts, 0.4, { g: 'yan', lw: 5, head: 13 });
  text('i_1', xM - 34, 512, 36, B, ts + 0.3, { align: 'r', g: 'yan', dur: 0.3 });
  arrow(xM + 22, 534, xM + 22, 462, B, Wt(11, 'zıt'), 0.4, { g: 'yan', lw: 5, head: 13 });
  text('i_2', xM + 34, 512, 36, B, Wt(11, 'zıt') + 0.3, { g: 'yan', dur: 0.3 });
  pulse(bx.r2, B, S(11), E(11) + 0.3, { g: 'v4' });
  const e1 = eq(X0, 230, ES, [
    { s: '6 kΩ × i_1', t: S(12), dur: Wt(12, 'artı') - S(12) - 0.1 }, { s: '+', t: Wt(12, 'artı'), dur: 0.2, hl: false },
    { s: '3 kΩ × (i_1 − i_2)', t: Wt(12, 'üç'), dur: Wt(12, 'eşittir') - Wt(12, 'üç') - 0.1 }, { s: '= 24 V', t: Wt(12, 'eşittir'), dur: 0.7 }], { g: 'e1' });
  pulse(bx.r1, B, S(12), Wt(12, 'artı'), { g: 'v4' }); pulse(bx.r2, B, Wt(12, 'üç'), Wt(12, 'eşittir'), { g: 'v4' });
  const e1s = eq(X0, 312, ES, [{ s: '3i_1', t: Wt(13, 'üç', 1), dur: 0.7 }, { s: '− i_2', t: Wt(13, 'eksi'), dur: 0.6 }, { s: '= 8 mA', t: Wt(13, 'eşittir'), dur: 0.8 }], { g: 'e1s' });
  const f1 = [e1s.box[0] - 8, e1s.box[1] - 4, e1s.box[2] + 8, e1s.box[3] + 6];
  frame(f1, B, E(13) - 0.1, 0.45, { g: 'e1s' });
  text('(1. denklem)', f1[2] + 22, 312, 34, K, E(13) + 0.1, { g: 'e1s', dur: 0.4 });
  // --- sahne 7: sag cevre ve tuzak (cumle 14-21)
  ring(cR, mr + 8, B, S(14), E(21) + 0.3, { g: 'v5' });
  pulse(bx.r2, R, S(14), E(16) + 0.2, { g: 'v5' });
  const wt = eq(X0, 398, ES, [{ s: '3 kΩ × (i_1 − i_2)', t: Wt(15, 'aynen') - 0.2, dur: 1.2, color: R }], { g: 'yanlis' });
  const wb = wt.box;
  path([[[wb[0] + 4, wb[1] + 4], [wb[2] - 4, wb[3] - 2]], [[wb[2] - 4, wb[1] + 4], [wb[0] + 4, wb[3] - 2]]], R, 4, S(16) + 0.2, 0.5, { g: 'yanlis' });
  text('ters işaret', wb[2] + 26, 398, 40, R, S(16) + 0.6, { g: 'yanlis', dur: 0.5 });
  const RS = 36, tk = S(17), tk2 = Wt(17, 'ortak'), tk3 = Wt(17, 'komşu');
  text('Kural: kendi akımın yönünde dolaşırken', X0, 462, RS, K, tk, { g: 'kural', dur: tk2 - tk - 0.1 });
  text('ortak dirençte önce o çevrenin akımı yazılır,', X0, 506, RS, K, tk2, { g: 'kural', dur: tk3 - tk2 - 0.1 });
  text('komşu akım çıkarılır.', X0, 550, RS, K, tk3, { g: 'kural', dur: E(17) - tk3 });
  const kr4 = text('Kural, çevre akımlarının dönme yönü aynıysa geçerli.', X0, 594, RS, K, S(18), { g: 'kural', dur: E(18) - S(18) - 0.3 });
  path([[[X0, 606], [X0 + kr4.w, 606]]], R, 4, E(18) - 0.2, 0.5, { g: 'kural' });
  path([[[li2.x - 4, cR[1] + 22], [li2.x + li2.w + 4, cR[1] + 22]]], B, 4, S(19) + 0.1, 0.3, { g: 'v5u' });
  pulse(bx.r3, B, Wt(19, 'düşümlerin'), E(19) + 0.2, { g: 'v5' }); pulse(bx.r4, B, Wt(19, 'düşümlerin'), E(19) + 0.2, { g: 'v5' });
  const tA1 = Wt(20, 'artı', 0), tA2 = Wt(20, 'artı', 1), tEq = Wt(20, 'eşittir');
  const e2 = eq(X0, 668, ES, [
    { s: '3 kΩ × (i_2 − i_1)', t: S(20), dur: tA1 - S(20) - 0.1 }, { s: '+ 2 kΩ × i_2', t: tA1, dur: tA2 - tA1 - 0.1 },
    { s: '+ 4 kΩ × i_2', t: tA2, dur: tEq - tA2 - 0.1 }, { s: '= 0', t: tEq, dur: 0.4 }], { g: 'e2' });
  const pb = e2.its[0]; path([[[pb.x + mw('3 kΩ × ', ES) - 2, 682], [pb.x + pb.w + 2, 682]]], R, 4, S(20) + 1.2, 0.4, { g: 'e2' });
  pulse(bx.r2, B, S(20), tA1, { g: 'v5' }); pulse(bx.r3, B, tA1, tA2, { g: 'v5' }); pulse(bx.r4, B, tA2, tEq, { g: 'v5' });
  const e2s = eq(X0, 752, ES, [{ s: 'i_1', t: Wt(21, 'i', 0, true), dur: 0.4 }, { s: '= 3i_2', t: Wt(21, 'eşittir'), dur: 0.9 }], { g: 'e2s' });
  const f2 = [e2s.box[0] - 8, e2s.box[1] - 4, e2s.box[2] + 8, e2s.box[3] + 6];
  frame(f2, B, E(21) - 0.1, 0.45, { g: 'e2s' });
  text('(2. denklem)', f2[2] + 22, 752, 34, K, E(21) + 0.1, { g: 'e2s', dur: 0.4 });
  // --- sahne 8: cozum ve abone animasyonu (cumle 22-24)
  const t8 = S(22) - 0.12; for (const gg of ['yanlis', 'kural', 'e1', 'e2', 'v5u']) erase(gg, t8);
  const yk = Wt(22, 'sekiz', 0), y8 = Wt(22, 'sekiz', 1);
  const s1 = eq(X0, 398, ES, [{ s: '3 × 3i_2 − i_2 = 8 mA', t: S(22) + 0.2, dur: yk - S(22) - 0.2 }], { g: 'ara' });
  pulse(f1, B, S(22), S(22) + 1.4, { g: 'v6' }); pulse(f2, B, S(22), S(22) + 1.4, { g: 'v6' });
  eq(X0, 470, ES, [{ s: '8i_2 = 8 mA', t: yk, dur: Wt(22, 'miliamper', 0) - yk + 0.3 }], { g: 'ara' });
  const ti2 = Wt(22, 'i', 1, true), ti1 = Wt(22, 'i', 2, true);
  const r2t = text('i_2 = 1 mA', X0 + 10, 548, 50, B, ti2, { g: 'sonuc', dur: 0.9 });
  frame([r2t.box[0] - 6, r2t.box[1] - 4, r2t.box[2] + 6, r2t.box[3] + 6], R, ti1 - 0.3, 0.35, { g: 'sonuc' });
  const r1t = text('i_1 = 3 mA', X0 + 10, 618, 50, B, ti1, { g: 'sonuc', dur: 0.9 });
  frame([r1t.box[0] - 6, r1t.box[1] - 4, r1t.box[2] + 6, r1t.box[3] + 6], R, E(22) - 0.2, 0.35, { g: 'sonuc' });
  text('i_1 = 3 mA', cL[0], 712, 32, B, ti1 + 0.2, { align: 'c', g, dur: 0.6 });
  text('i_2 = 1 mA', cR[0], 712, 32, B, ti2 + 0.2, { align: 'c', g, dur: 0.6 });
  pulse(r2t.box, B, ti2 + 0.9, E(22) + 0.4, { g: 'v6' }); pulse(r1t.box, B, ti1 + 0.9, E(22) + 0.4, { g: 'v6' });
  // abone karti: "... i bir esittir uc miliamper." bitince girer (UZUN.md 3b)
  const TA = E(22) + 0.05; add({ k: 'abone', t0: TA, t1: TA + 6.0, dur: 6.0, g: 'abone' });
  const tw = S(23), twi1 = Wt(23, 'i', 0, true), twi2 = Wt(23, 'i', 1, true);
  const wl = eq(X0, 684, 40, [{ s: 'Ters işaretle çıkan:', t: tw, dur: twi1 - tw - 0.1, hl: false, color: R }, { s: 'i_1 = 2 mA,', t: twi1, dur: twi2 - twi1 - 0.1, color: R }, { s: 'i_2 = −2 mA', t: twi2, dur: 1.0, color: R }], { g: 'yanlisSonuc' });
  const tyl = Wt(24, 'yanlış'); pulse(wl.box, R, twi2 + 1.0, E(24) + 0.3, { g: 'v6' });
  path([[[wl.box[0] + 4, 671], [wl.box[2] - 4, 671]]], R, 4, tyl - 0.1, 0.45, { g: 'yanlisSonuc' });
  text('yanlış', wl.box[2] + 20, 684, 40, R, tyl, { g: 'yanlisSonuc', dur: 0.4 });
  // --- sahne 9: kontrol (cumle 25-28)
  const t9 = S(25) - 0.1; for (const gg of ['ara', 'yanlisSonuc', 'e1s', 'e2s', 'yan', 'v4u']) erase(gg, t9);
  arrow(xM - 22, 474, xM - 22, 540, B, S(25) + 0.3, 0.4, { g: 'k9', lw: 6, head: 14 });
  text('2 mA', xM - 34, 516, 34, B, S(25) + 0.6, { align: 'r', g: 'k9', dur: 0.4 });
  const tu = Wt(25, 'uçlarında');
  const v6 = text('6 V', xM - 30, zc + 12, 40, R, tu, { align: 'r', g: 'k9', dur: 0.4 });
  path([[[xM - 30, zc - 62], [xM - 14, zc - 62]], [[xM - 22, zc - 70], [xM - 22, zc - 54]], [[xM - 30, zc + 72], [xM - 14, zc + 72]]], R, 4, tu + 0.2, 0.4, { g: 'k9' });
  const KS = 42;
  const c1 = eq(X0, 230, KS, [{ s: 'Ortak direnç:', t: S(25) + 0.2, dur: 0.6, hl: false }, { s: '2 mA × 3 kΩ = 6 V', t: Wt(25, 'iki'), dur: 1.4 }], { g: 'k9' });
  pulse(bx.r2, B, S(25), E(25) + 0.2, { g: 'v7' });
  const t18 = Wt(26, 'on');
  text('3 mA × 6 kΩ = 18 V', (xL + xM) / 2 - 35, 268, 30, B, Wt(26, 'altı') - 0.2, { align: 'c', g: 'k9', dur: 0.8 });
  pulse(bx.r1, B, Wt(26, 'altı') - 0.2, E(26) + 0.2, { g: 'v7' });
  const c2 = eq(X0, 312, KS, [{ s: 'Sol yol:', t: S(26), dur: 0.5, hl: false }, { s: '24 V − 18 V = 6 V', t: Wt(26, 'yirmi'), dur: E(26) - Wt(26, 'yirmi') }], { g: 'k9' });
  check(c2.x1 + 4, 312, E(26), 'k9');
  text('1 mA × 2 kΩ = 2 V', (xM + xR) / 2 + 35, 268, 30, B, Wt(27, 'iki') - 0.1, { align: 'c', g: 'k9', dur: 0.7 });
  text('1 mA × 4 kΩ = 4 V', xR - amp - 16, zc + 88, 30, B, Wt(27, 'dört') - 0.1, { align: 'r', g: 'k9', dur: 0.7 });
  pulse(bx.r3, B, Wt(27, 'iki'), E(27) + 0.2, { g: 'v7' }); pulse(bx.r4, B, Wt(27, 'dört'), E(27) + 0.2, { g: 'v7' });
  const c3 = eq(X0, 398, KS, [{ s: 'Sağ yol:', t: S(27), dur: 0.5, hl: false }, { s: '2 V + 4 V = 6 V', t: Wt(27, 'iki'), dur: E(27) - Wt(27, 'iki') }], { g: 'k9' });
  check(c3.x1 + 4, 398, E(27), 'k9');
  path([ellipsePts(v6.x + v6.w / 2, zc, 44, 34)], R, 4, S(28), 0.4, { g: 'k9' });
  pulse(v6.box, R, S(28) + 0.3, AUD + 0.6, { g: 'v7' });
  // --- kart (4 sn, sessiz): alt bantta yazilir; devre ve sonuclar yerinde kalir
  const kb = text('Bilmen gerekenler', 100, 872, 48, K, AUD + 0.05, { g: 'kart', dur: 0.5 });
  path([[[100, 886], [100 + kb.w, 886]]], R, 5, AUD + 0.55, 2.4, { g: 'kart' });
  const md = ['Ortak dirençte kendi akımından komşu akım çıkarılır', 'Kural, çevre akımlarının dönme yönü aynıysa geçerli', 'Ters işaret düzgün ama yanlış sonuç verir'];
  md.forEach((s, i) => { const y = 932 + i * 50, t = AUD + 0.35 + i * 0.4; dot([118, y - 12], 7, B, t, { g: 'kart' }); text(s, 145, y, 40, K, t, { g: 'kart', dur: 0.55 }); });
  pulse([88, 828, 100 + kb.w + 14, 894], B, AUD + 0.6, DUR + 1, { g: 'kart' });
  return { TA };
}

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
export const ABONE = { klik1: 1.55, klik2: 3.05 }; // kart girisinden itibaren tik zamanlari (ses karisimi icin)
function drawAbone(u) { // u: kartin ekranda kaldigi sure icindeki saniye (0-6)
  const inn = ease(u / 0.5), out = ease((u - 5.45) / 0.5), off = (1 - inn) * (CH + 40) + out * (CH + 40);
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
  ctx.fillStyle = done ? '#6e737a' : '#ffffff'; ctx.font = (done ? '24px' : '34px') + ' DJC'; ctx.textAlign = 'center';
  ctx.fillText(done ? 'ABONE OLUNDU' : 'ABONE OL', (bx0 + 14 + wcx - wr) / 2 + 4, pcy + (done ? 10 : 12));
  ctx.restore();
  const ring_ = u >= c2 && u < c2 + 1.5, ang = ring_ ? 0.42 * Math.sin((u - c2) * 2 * Math.PI * 3.2) * (1 - (u - c2) / 1.5) : 0;
  drawBell(wcx, pcy + 3, 40, done ? '#111111' : '#8b9096', ang);
  if (ring_) { ctx.strokeStyle = '#111'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; const a = 0.6 + 0.4 * Math.sin((u - c2) * 18);
    for (const sg of [-1, 1]) for (const k of [0, 1]) { const rr_ = 26 + k * 9; ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(wcx, pcy - 4, rr_, sg < 0 ? Math.PI * 1.05 : -Math.PI * 0.32, sg < 0 ? Math.PI * 1.32 : -Math.PI * 0.05); ctx.stroke(); }
    ctx.globalAlpha = 1; }
  ctx.restore();
  // imlec: sag alttan girer -> ABONE OL -> zil -> cikar
  const pA = [1960, 1110], pB = [bx0 + bw * 0.36, pcy + 6], pC = [wcx + 2, pcy + 8], pD = [1990, 1000];
  let cp = null;
  if (u >= 0.55 && u < 1.45) { const k = ease((u - 0.55) / 0.9); cp = [pA[0] + (pB[0] - pA[0]) * k, pA[1] + (pB[1] - pA[1]) * k]; }
  else if (u >= 1.45 && u < 2.25) cp = pB;
  else if (u >= 2.25 && u < 2.95) { const k = ease((u - 2.25) / 0.7); cp = [pB[0] + (pC[0] - pB[0]) * k, pB[1] + (pC[1] - pB[1]) * k]; }
  else if (u >= 2.95 && u < 4.4) cp = pC;
  else if (u >= 4.4 && u < 5.2) { const k = ease((u - 4.4) / 0.8); cp = [pC[0] + (pD[0] - pC[0]) * k, pC[1] + (pD[1] - pC[1]) * k]; }
  if (cp) { const kk = (Math.abs(u - c1 - 0.05) < 0.08 || Math.abs(u - c2 - 0.05) < 0.08) ? 1.45 : 1.6; drawCursor(cp[0], cp[1] + off * 0, kk); }
}

// ---------------------------------------------------------------- cizim
function pointOnPath(it, p) {
  let d = p * it.total;
  for (let s = 0; s < it.segs.length; s++) {
    if (d <= it.lens[s] || s === it.segs.length - 1) { const pts = it.segs[s];
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (d <= l || i === pts.length - 1) { const f = l ? Math.min(1, d / l) : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; } d -= l; } }
    d -= it.lens[s];
  }
}
function drawPath(it, p) {
  ctx.strokeStyle = it.color; ctx.lineWidth = it.lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let d = p * it.total;
  for (let s = 0; s < it.segs.length && d > 0; s++) {
    const pts = it.segs[s]; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let rem = Math.min(d, it.lens[s]);
    for (let i = 1; i < pts.length && rem > 0; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); const f = l ? Math.min(1, rem / l) : 1; ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); rem -= l; }
    ctx.stroke(); d -= it.lens[s];
  }
}
function rr(x0, y0, x1, y1, r) { ctx.beginPath(); ctx.roundRect(x0, y0, x1 - x0, y1 - y0, r); }
export function draw(t) {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  let pen = null, penT = -1, ab = null;
  const act = items.filter((it) => t >= it.t0 && t < it.t1);
  for (const it of act) if (it.k === 'pulse') { // vurgular en altta
    const a = Math.min(1, (t - it.t0) / 0.15) * (0.13 + 0.07 * Math.sin((t - it.t0) * 2 * Math.PI * 1.1));
    const fp = it.ref && it.ref.dur > 0 ? Math.min(1, (t - it.ref.t0) / it.ref.dur) : 1;
    ctx.globalAlpha = a; ctx.fillStyle = it.color; rr(it.box[0], it.box[1], it.box[0] + Math.max(24, (it.box[2] - it.box[0]) * fp), it.box[3], 12); ctx.fill(); ctx.globalAlpha = 1;
  }
  for (const it of act) {
    const p = it.dur > 0 ? Math.min(1, (t - it.t0) / it.dur) : 1;
    if (it.k === 'path') { drawPath(it, p); if (p < 1 && it.t0 > penT) { pen = pointOnPath(it, p); penT = it.t0; } }
    else if (it.k === 'text') {
      const top = it.y - it.size * 1.05, hh = it.size * 1.5;
      ctx.save(); ctx.beginPath(); ctx.rect(it.x - 4, top, (it.w + 8) * p, hh); ctx.clip();
      drawRich(it.s, it.x, it.y, it.size, it.color); ctx.restore();
      if (p < 1 && it.dur > 0.05 && it.t0 > penT) { const ph = (t - it.t0) * 31; pen = [it.x + it.w * p, it.y - it.size * 0.3 + it.size * 0.28 * Math.sin(ph)]; penT = it.t0; }
    } else if (it.k === 'dot') { ctx.fillStyle = it.color; ctx.beginPath(); ctx.arc(it.c[0], it.c[1], it.r * Math.min(1, p * 1.0), 0, 7); ctx.fill(); }
    else if (it.k === 'ring') { const a = Math.min(1, (t - it.t0) / 0.15); ctx.globalAlpha = a * 0.9; ctx.strokeStyle = it.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(it.c[0], it.c[1], it.r + 4 * Math.sin((t - it.t0) * 2 * Math.PI * 1.1), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
    else if (it.k === 'abone') ab = t - it.t0;
  }
  if (pen) { // kalem ucu (ajanin kendi cizimi): yazi bitince kaybolur
    const [x, y] = pen; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.62);
    ctx.fillStyle = '#2b2b2b'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(7, -16); ctx.lineTo(-7, -16); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6d7480'; rr(-9, -92, 9, -16, 3); ctx.fill(); ctx.fillStyle = '#3f4650'; rr(-9, -100, 9, -88, 3); ctx.fill();
    ctx.restore();
  }
  if (ab !== null) drawAbone(ab); // kart en ustte
}
export function boxes(t) { // kalite kontrol: gorunen yazi kutulari (+ abone karti)
  const out = items.filter((it) => it.k === 'text' && t >= it.t0 && t < it.t1).map((it) => ({ s: it.s, b: it.box.map((v) => Math.round(v)), g: it.g }));
  if (items.some((it) => it.k === 'abone' && t >= it.t0 && t < it.t1)) out.push({ s: 'ABONE KARTI', b: [CX0 - 10, CY0 - 10, CX0 + CW + 10, CY0 + CH + 10].map(Math.round), g: 'abone' });
  return out;
}
export async function init(mode, canvas) {
  const ff = new FontFace('PH', 'url(/tools/vendor/fonts/PatrickHand-Regular.ttf)'); await ff.load(); document.fonts.add(ff);
  try { const f2 = new FontFace('DJC', 'url(/_ozel/DejaVuSansCondensed-Bold.ttf)'); await f2.load(); document.fonts.add(f2); } catch (e) { console.warn('DJC yok'); }
  try { FOTO = new Image(); FOTO.src = '/_ozel/profil-daire.png'; await FOTO.decode(); } catch (e) { FOTO = null; console.warn('foto yok'); }
  Z = (await (await fetch('/uzun/ornek-02/zamanlama.json')).json()).cumleler;
  [W, H] = [1920, 1080];
  canvas.width = W; canvas.height = H; ctx = canvas.getContext('2d');
  items = [];
  const extra = build();
  items.sort((a, b) => a.t0 - b.t0);
  return { W, H, duration: DUR, chars: [...used].join(''), foto: !!FOTO, ...extra, ABONE, n: items.length };
}
// kalite kontrol: t aninda hareket eden (cizilen ya da nabiz gibi atan) oge var mi
export function busy(t) { return items.some((it) => t >= it.t0 && t < it.t1 && (it.k === 'pulse' || it.k === 'ring' || it.k === 'abone' || (it.dur > 0 && t < it.t0 + it.dur))); }
