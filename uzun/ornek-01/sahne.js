// Uzun video ornek 01 — beyaz tahta sahnesi (2D canvas). Iki yerlesim: 'uzun' (1920x1080) ve 'shorts' (1080x1920).
// Zaman deterministik: her sey draw(t) icinde t'den hesaplanir. Zamanlar zamanlama.json'dan gelir.
const K = '#1c1c1c', B = '#1a56c4', R = '#d1242a', G = '#a9a9a9', BG = '#fbfaf6';
let ctx, W, H, items = [], Z, OFF = 0, DUR = 0;
const used = new Set();

// ---------------------------------------------------------------- zaman yardimcilari
const S = (i) => Z[i].start - OFF, E = (i) => Z[i].end - OFF;
const norm = (w) => w.toLocaleLowerCase('tr').replace(/[.,;:?]/g, '');
function Wt(i, word, nth = 0, exact = false) {
  const ws = Z[i].words.filter((w) => (exact ? norm(w.w) === norm(word) : norm(w.w).startsWith(norm(word))));
  if (!ws[nth]) throw new Error(`kelime yok: cumle ${i} '${word}' #${nth}`);
  return ws[nth].t0 - OFF;
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
function eraseAll(t, keep = []) { for (const it of items) if (!keep.includes(it.g) && it.t1 > t && it.t0 < t) it.t1 = t; }
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
function frac(num, den, x, y, size, color, t0, dur, o = {}) {
  const wn = mw(num, size), wd = mw(den, size), w = Math.max(wn, wd) + size * 0.3;
  const it = add({ k: 'frac', num, den, x, y, size, color, w, wn, wd, t0, dur, g: o.g, t1: o.t1 });
  it.box = [x - 6, y - size * 1.2, x + w + 6, y + size * 1.25];
  return it;
}
function pulse(box, color, t0, t1, o = {}) { return add({ k: 'pulse', box, color, t0, t1, g: o.g, dur: 0 }); }
function ring(c, r, color, t0, t1, o = {}) { return add({ k: 'ring', c, r, color, t0, t1, g: o.g, dur: 0 }); }
function dot(c, r, color, t0, o = {}) { return add({ k: 'dot', c, r, color, t0, dur: 0.12, g: o.g, t1: o.t1 }); }
function arrow(x0, y0, x1, y1, color, t0, dur, o = {}) {
  const a = Math.atan2(y1 - y0, x1 - x0), h = o.head ?? 16, s = 0.5;
  return path([[[x0, y0], [x1, y1]], [[x1 - h * Math.cos(a - s), y1 - h * Math.sin(a - s)], [x1, y1], [x1 - h * Math.cos(a + s), y1 - h * Math.sin(a + s)]]], color, o.lw ?? 5, t0, dur, o);
}
function circlePts(cx, cy, r, n = 56, a0 = -Math.PI / 2) { const p = []; for (let i = 0; i <= n; i++) { const a = a0 + (i / n) * 2 * Math.PI; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }
function ellipsePts(cx, cy, rx, ry, n = 64) { const p = []; for (let i = 0; i <= n + 3; i++) { const a = -2.2 + (i / n) * 2 * Math.PI; const k = 1 + 0.03 * Math.sin(a * 2 + 1); p.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)]); } return p; }
function zig(p0, p1, zl, amp) { // p0'dan p1'e direnc: uclar duz, ortada zl uzunlugunda testere
  const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), ux = (p1[0] - p0[0]) / L, uy = (p1[1] - p0[1]) / L, nx = -uy, ny = ux;
  const a = (L - zl) / 2, pts = [p0, [p0[0] + ux * a, p0[1] + uy * a]], n = 6, st = zl / n;
  for (let i = 0; i < n; i++) { const d = a + st * (i + 0.25), d2 = a + st * (i + 0.75); pts.push([p0[0] + ux * d + nx * amp, p0[1] + uy * d + ny * amp], [p0[0] + ux * d2 - nx * amp, p0[1] + uy * d2 - ny * amp]); }
  pts.push([p0[0] + ux * (a + zl), p0[1] + uy * (a + zl)], p1); return pts;
}
// denklem satiri: parcalar {s} veya {n,d}; her parcanin kendi zamani; konusulan parca vurgulanir
function eq(x, y, size, parts, o = {}) {
  const boxes = []; let cx = x;
  parts.forEach((p, i) => {
    const color = p.color ?? o.color ?? K; let it;
    if (p.n !== undefined) it = frac(p.n, p.d, cx, y, size, color, p.t, p.dur ?? 1.2, o);
    else it = text(p.s, cx, y + size * 0.33, size, color, p.t, { dur: p.dur, g: o.g, t1: o.t1 });
    if (o.hl !== false && p.hl !== false) { const nt = parts[i + 1] ? parts[i + 1].t : p.t + (it.dur) + 0.5; pulse(it.box, color === R ? R : B, p.t, Math.max(nt, p.t + it.dur + 0.15), { g: o.g }).ref = it; }
    boxes.push(it.box); cx += it.w + size * 0.26;
  });
  return { boxes, x1: cx, box: [x - 8, Math.min(...boxes.map((b) => b[1])), cx - size * 0.26 + 8, Math.max(...boxes.map((b) => b[3]))] };
}
function frame(box, color, t0, dur, o = {}) { const [a, b, c, d] = box; return path([[[a, b], [c, b], [c, d], [a, d], [a, b]]], color, o.lw ?? 4, t0, dur, o); }

// ---------------------------------------------------------------- devre
// L: geometri; T: her eleman icin {t, d}; C: renkler (sol kisim soluk cizilebilir)
function devre(L, T, C = {}) {
  const { xA, x1, x2, x3, yT, yB, r, fs, zl, amp, lw } = L, ym = (yT + yB) / 2, g = 'devre';
  const cl = C.left ?? K, cr = K, P = (segs, color, tt) => path(segs, color, lw, tt.t, tt.d, { g });
  const lab = (s, x, y, color, tt, al) => text(s, x, y, fs, color, tt.t + tt.d * 0.6, { align: al, g, dur: 0.45 });
  // gerilim kaynagi
  P([circlePts(xA, ym, r)], cl, T.vs);
  P([[[xA - 11, ym - r * 0.45], [xA + 11, ym - r * 0.45]], [[xA, ym - r * 0.45 - 11], [xA, ym - r * 0.45 + 11]], [[xA - 11, ym + r * 0.45], [xA + 11, ym + r * 0.45]]], cl, { t: T.vs.t + T.vs.d, d: 0.35 });
  const lvs = lab('10 V', xA + r + 14, ym + fs * 0.33, cl, T.vs, 'l');
  P([[[xA, ym + r], [xA, yB], [x1, yB]]], cl, T.vsBot);
  P([[[xA, ym - r], [xA, yT]]], cl, T.aLead);
  dot([xA, yT], 7, cl, T.aLead.t + T.aLead.d, { g });
  // R1
  P([zig([xA, yT], [x1, yT], zl, amp)], cl, T.r1);
  dot([x1, yT], 7, K, T.r1.t + T.r1.d, { g });
  const l1 = lab('R_1 = 1 kΩ', (xA + x1) / 2, yT + amp + fs * 1.05, cl, T.r1, 'c');
  // R2
  P([zig([x1, yT], [x1, yB], zl, amp)], cl, T.r2);
  dot([x1, yB], 7, cl, T.r2.t + T.r2.d, { g });
  const l2 = lab('R_2 = 2 kΩ', x1 + amp + 14, ym - fs * 0.45, cl, T.r2, 'l');
  // R3
  P([zig([x1, yT], [x2, yT], zl, amp)], cr, T.r3);
  dot([x2, yT], 7, K, T.r3.t + T.r3.d, { g });
  const l3 = lab('R_3 = 1 kΩ', (x1 + x2) / 2, yT + amp + fs * 1.05, cr, T.r3, 'c');
  // R4 ve alt hat
  P([zig([x2, yT], [x2, yB], zl, amp), [[x2, yB], [x1, yB]]], cr, T.r4);
  dot([x2, yB], 7, K, T.r4.t + T.r4.d * 0.7, { g });
  const l4 = lab('R_4 = 1 kΩ', x2 + amp + 14, ym - fs * 0.45, cr, T.r4, 'l');
  // akim kaynagi kolu
  P([[[x2, yB], [x3, yB], [x3, ym + r]]], cr, T.railB);
  P([circlePts(x3, ym, r, 56, Math.PI / 2), [[x3, ym - r], [x3, yT]]], cr, T.is);
  arrow(x3, ym + r * 0.55, x3, ym - r * 0.55, cr, T.is.t + T.is.d, 0.35, { g, lw, head: 15 });
  dot([x3, yT], 7, K, T.is.t + T.is.d, { g });
  const lis = lab('4 mA', x3 + r + 14, ym + fs * 0.1, cr, T.is, 'l');
  let lid = null; if (L.ideal) lid = text('ideal akım kaynağı', x3 + r + 14, ym + fs * 1.08, fs * 0.9, cr, T.is.t + T.is.d * 0.6 + 0.4, { g, dur: 0.6 });
  const z5 = zig([x3, yT], [x2, yT], zl, amp);
  P([z5], cr, T.r5);
  const l5 = lab('R_5 = 3 kΩ', (x2 + x3) / 2, yT + amp + fs * 1.05, cr, T.r5, 'c');
  const hb = (cx, cy, hor) => (hor ? [cx - zl / 2 - 12, cy - amp - 12, cx + zl / 2 + 12, cy + amp + 12] : [cx - amp - 12, cy - zl / 2 - 12, cx + amp + 12, cy + zl / 2 + 12]);
  return { ym, z5, box: { vs: [xA - r - 10, ym - r - 10, xA + r + 10, ym + r + 10], is: [x3 - r - 10, ym - r - 10, x3 + r + 10, ym + r + 10],
    r1: hb((xA + x1) / 2, yT, 1), r3: hb((x1 + x2) / 2, yT, 1), r5: hb((x2 + x3) / 2, yT, 1), r2: hb(x1, ym, 0), r4: hb(x2, ym, 0),
    l1: l1.box, l2: l2.box, l3: l3.box, l4: l4.box, l5: l5.box, lvs: lvs.box, lis: lis.box, lid: lid && lid.box } };
}
function toprak(L, t0, color, g) {
  const xg = (L.x1 + L.x2) / 2, y = L.yB;
  path([[[xg, y], [xg, y + 20]], [[xg - 24, y + 20], [xg + 24, y + 20]], [[xg - 15, y + 30], [xg + 15, y + 30]], [[xg - 6, y + 40], [xg + 6, y + 40]]], color, L.lw, t0, 0.5, { g });
  return xg;
}

// ================================================================ UZUN (1920x1080)
function buildUzun() {
  const L = { xA: 150, x1: 470, x2: 790, x3: 1110, yT: 250, yB: 570, r: 50, fs: 40, zl: 120, amp: 16, lw: 4, ideal: true };
  const { xA, x1, x2, x3, yT, yB } = L, ym = (yT + yB) / 2, NL = yT - 44; // NL: dugum etiketlerinin taban cizgisi
  const AUD = Z[Z.length - 1].end + 0.32; DUR = AUD + 4;
  // --- baslik (video boyunca kalir)
  const ttl = text('Düğüm gerilimleri yöntemi: final tipi soru', 100, 100, 58, K, S(0) + 0.1, { dur: 2.2, g: 'baslik' });
  path([[[100, 118], [100 + ttl.w, 118]]], B, 4, S(0) + 2.3, 0.4, { g: 'baslik' });
  // --- sahne 1: kanca (cumle 0-3)
  text('İstenen: 1. ve 2. düğümün gerilimi', 100, 215, 48, K, S(1) + 0.2, { dur: 2.0, g: 'kanca' });
  { const cx = 700, cy = 760, r = 62, yt = 540, xr = 1220, t = S(2);
    path([circlePts(cx, cy, r, 56, Math.PI / 2), [[cx, cy - r], [cx, yt]]], K, 5, t, 0.7, { g: 'kanca' });
    arrow(cx, cy + 34, cx, cy - 34, K, t + 0.7, 0.3, { g: 'kanca', lw: 5, head: 18 });
    path([[[cx, cy + r], [cx, cy + r + 70]]], K, 5, t + 0.6, 0.2, { g: 'kanca' });
    const tr = Wt(2, 'seri');
    path([zig([cx, yt], [xr, yt], 200, 24)], K, 5, tr, 0.8, { g: 'kanca' });
    dot([xr, yt], 9, K, tr + 0.8, { g: 'kanca' });
    text('akım kaynağı', cx + r + 24, cy + 14, 44, K, t + 0.8, { g: 'kanca', dur: 0.5 });
    const te = E(2) - 0.5;
    path([ellipsePts((cx + xr) / 2, yt, 190, 78)], R, 6, te, 0.7, { g: 'kanca' });
    text('?', xr + 40, yt + 36, 120, R, te + 0.6, { g: 'kanca', dur: 0.3 });
    text('akım kaynağına seri bağlı direnç', (cx + xr) / 2, yt - 110, 46, R, te + 0.9, { g: 'kanca', dur: 1.0, align: 'c' });
    pulse([(cx + xr) / 2 - 130, yt - 44, (cx + xr) / 2 + 130, yt + 44], R, S(3), E(3) + 0.5, { g: 'kanca' });
  }
  const tB = S(4) - 0.12; eraseAll(tB, ['baslik']);
  // --- sahne 2: devre cizilir (cumle 4-10)
  text('İstenen:', 1360, 300, 48, K, tB, { g: 'not0', dur: 0.01 }); text('1. ve 2. düğümün gerilimi', 1360, 360, 48, K, tB, { g: 'not0', dur: 0.01 });
  const T = {
    vs: { t: S(4), d: 1.0 }, vsBot: { t: Wt(4, 'eksi'), d: 1.0 }, aLead: { t: S(5), d: 0.4 },
    r1: { t: S(5) + 0.4, d: 1.5 }, r2: { t: S(6) + 0.3, d: 1.4 }, r3: { t: S(7) + 0.6, d: 1.3 }, r4: { t: S(8) + 0.3, d: 1.5 },
    railB: { t: S(9), d: 1.2 }, is: { t: Wt(9, 'dört'), d: 1.0 }, r5: { t: Wt(9, 'seri'), d: 1.2 },
  };
  const D = devre(L, T), bx = D.box;
  pulse(bx.vs, B, S(4) + 1.2, E(4) + 0.2, { g: 'v2' }); pulse(bx.r1, B, T.r1.t + 1.5, E(5) + 0.2, { g: 'v2' });
  pulse(bx.r2, B, T.r2.t + 1.4, E(6) + 0.2, { g: 'v2' }); pulse(bx.r3, B, T.r3.t + 1.3, E(7) + 0.3, { g: 'v2' });
  pulse(bx.r4, B, T.r4.t + 1.5, E(8) + 0.2, { g: 'v2' }); pulse(bx.is, B, T.is.t + 1.0, T.r5.t, { g: 'v2' });
  pulse(bx.r5, B, T.r5.t + 1.2, E(9) + 0.2, { g: 'v2' });
  // cumle 10: akim yonu (kaynak oku mavi ile uzerinden gecilir)
  arrow(x3, ym + L.r * 0.55, x3, ym - L.r * 0.55, B, Wt(10, 'alt'), 0.5, { g: 'devre', lw: 6, head: 17 });
  pulse(bx.is, B, S(10), E(10) + 0.3, { g: 'v2' });
  // --- sahne 3: referans ve dugum adlari (cumle 11-15)
  path([[[xA, yB], [x3, yB]]], B, 6, S(11), 1.0, { g: 'ref' });
  const xg = toprak(L, S(11) + 1.0, B, 'devre');
  const lref = text('referans düğümü (0 V)', xg + 42, yB + 52, 38, B, Wt(11, 'orası') - 0.2, { g: 'devre', dur: 0.9 });
  erase('ref', E(15) + 0.3);
  const lv1 = text('V_1', x1, NL, 44, B, Wt(12, 'V', 0, true) - 0.1, { align: 'c', g: 'nl1', dur: 0.4 });
  ring([x1, yT], 20, B, S(12), Wt(12, 'ikincisine'), { g: 'v3' });
  const lv2 = text('V_2', x2, NL, 44, B, Wt(12, 'V', 1, true) - 0.1, { align: 'c', g: 'nl2', dur: 0.4 });
  ring([x2, yT], 20, B, Wt(12, 'ikincisine'), E(12) + 0.3, { g: 'v3' });
  erase('not0', E(12) - 0.35); text('İstenen: V_1 ve V_2', 1360, 330, 50, K, E(12) - 0.3, { g: 'not1', dur: 0.9 });
  const nt = (s, i, t, d) => { const it = text(s, 100, 770 + i * 78, 48, K, t, { g: 'not3', dur: d }); pulse(it.box, B, t, t + d + 0.6, { g: 'not3' }).ref = it; return it; };
  nt('Referans düğümü: alt hat (0 V)', 0, S(11) + 0.2, 1.8); nt('Bilinmeyen düğüm gerilimleri: V_1 ve V_2', 1, S(12) + 0.3, 2.6);
  nt('Gerilim kaynağının artı ucu: 10 V', 2, S(13) + 0.2, 1.8); nt('3. düğümün gerilimi en sonda bulunur', 3, Wt(15, 'gerilimini') - 0.3, 1.6);
  text('10 V', xA, NL, 44, K, Wt(13, 'on') - 0.2, { align: 'c', g: 'devre', dur: 0.4 });
  pulse(bx.vs, B, S(13), E(13) + 0.3, { g: 'v3' }); ring([xA, yT], 20, B, Wt(13, 'artı'), E(13) + 0.3, { g: 'v3' });
  ring([x3, yT], 20, B, Wt(14, 'arasındaki'), E(15) + 0.3, { g: 'v3' });
  pulse(bx.is, B, S(14), Wt(14, 'üç'), { g: 'v3' }); pulse(bx.r5, B, Wt(14, 'üç'), Wt(14, 'arasındaki'), { g: 'v3' });
  const l3d = text('3. düğüm', x3, NL, 40, B, Wt(14, 'nokta') - 0.2, { align: 'c', g: 'devre', dur: 0.6 });
  erase('not3', S(16) - 0.1);
  // --- sahne 4: 1. dugum denklemi (cumle 16-22)
  const ao = (x, y, dx, dy, t, g) => arrow(x, y, x + dx, y + dy, B, t, 0.35, { g, lw: 5, head: 14 });
  ao(x1 - 18, yT - 20, -68, 0, S(16) + 0.9, 'ok1'); ao(x1 - 26, yT + 22, 0, 58, S(16) + 1.4, 'ok1'); ao(x1 + 18, yT - 20, 68, 0, S(16) + 1.9, 'ok1');
  ring([x1, yT], 22, B, S(16), E(17) + 0.3, { g: 'v4' });
  pulse(bx.is, B, Wt(17, 'akım'), E(17) + 0.3, { g: 'v4' });
  pulse(bx.r1, B, S(18), E(18) + 0.3, { g: 'v4' }); pulse(bx.r2, B, S(19), E(19) + 0.3, { g: 'v4' }); pulse(bx.r3, B, S(20), E(20) + 0.3, { g: 'v4' });
  const ES = 52;
  eq(100, 770, ES, [
    { n: '(V_1 − 10 V)', d: '1 kΩ', t: Wt(18, 'V', 0, true), dur: E(18) - Wt(18, 'V', 0, true) },
    { s: '+', t: S(19), dur: 0.3, hl: false }, { n: 'V_1', d: '2 kΩ', t: Wt(19, 'V', 0, true), dur: E(19) - Wt(19, 'V', 0, true) },
    { s: '+', t: S(20), dur: 0.3, hl: false }, { n: '(V_1 − V_2)', d: '1 kΩ', t: Wt(20, 'V', 0, true), dur: E(20) - Wt(20, 'V', 0, true) },
    { s: '= 0', t: E(20), dur: 0.3, hl: false }], { g: 'e4' });
  const l2e = eq(100, 905, ES, [{ s: '2(V_1 − 10 V) + V_1 + 2(V_1 − V_2) = 0', t: S(21) + 0.2, dur: 2.0 }], { g: 'e4' });
  pulse(l2e.box, B, S(21) + 2.3, S(22), { g: 'e4' });
  const e1 = eq(100, 1000, ES, [{ s: '5V_1', t: S(22), dur: 0.9 }, { s: '− 2V_2', t: Wt(22, 'eksi'), dur: 1.2 }, { s: '= 20 V', t: Wt(22, 'eşittir'), dur: 0.9 }], { g: 'e4' });
  const f1 = [e1.box[0] - 10, e1.box[1] - 2, e1.box[2] + 10, e1.box[3] + 4];
  frame(f1, B, E(22), 0.45, { g: 'e4' });
  text('(1. denklem)', f1[2] + 24, 1000 + ES * 0.33, 40, K, E(22) + 0.1, { g: 'e4', dur: 0.4 });
  // --- sahne 5: SHORTS bolumu (cumle 23-41)
  const t5 = S(23) - 0.12; erase('e4', t5); erase('ok1', t5); erase('not1', t5);
  { const e = eq(100, 745, ES, [{ s: '5V_1 − 2V_2 = 20 V', t: t5, dur: 0.01, hl: false }], { g: 'e1k' });
    frame([e.box[0] - 10, e.box[1] - 2, e.box[2] + 10, e.box[3] + 4], B, t5, 0.01, { g: 'e1k' });
    text('(1. denklem)', e.box[2] + 34, 745 + ES * 0.33, 40, K, t5, { g: 'e1k', dur: 0.01 }); }
  const QX = 1345;
  text('Akım kaynağına seri bağlı', QX, 210, 46, K, S(23), { g: 'soru', dur: 1.2 });
  text('direnç düğüm denklemine', QX, 264, 46, K, Wt(23, 'direnç'), { g: 'soru', dur: 1.1 });
  text('girer mi?', QX, 318, 46, K, Wt(23, 'girer'), { g: 'soru', dur: 0.5 });
  text('Girmez', QX + 190, 322, 62, R, S(24), { g: 'soru', dur: 0.4 });
  pulse(bx.r5, R, S(23), S(26), { g: 'v5' });
  path([ellipsePts((x2 + x3) / 2, yT + 22, 118, 68)], R, 5, S(25), 0.7, { g: 'tuzak' });
  ring([x2, yT], 24, B, S(26), E(26) + 0.3, { g: 'v5' });
  path([circlePts(x2, yT, 30)], B, 4, S(26) + 0.2, 0.5, { g: 'n2c' });
  ao(x2 - 34, yT - 20, -60, 0, Wt(27, 'bir', 0, true), 'ok2'); ao(x2 - 26, yT + 36, 0, 50, Wt(27, 'iki'), 'ok2');
  pulse(bx.r3, B, S(27), Wt(28, 'öbürü'), { g: 'v5' }); pulse(bx.r4, B, S(27), S(28), { g: 'v5' });
  pulse(lv1.box, B, Wt(28, 'gerilimi'), Wt(28, 'öbürü'), { g: 'v5' });
  pulse(bx.r4, B, Wt(28, 'öbürü'), E(28) + 0.3, { g: 'v5' }); pulse(lref.box, B, Wt(28, 'referansa'), E(28) + 0.3, { g: 'v5' });
  pulse(bx.is, B, S(29), E(29) + 0.3, { g: 'v5' }); pulse(bx.lid, B, Wt(29, 'ideal'), E(29) + 0.3, { g: 'v5' });
  pulse(bx.r5, R, S(30), S(32), { g: 'v5' });
  const wx = 1080, wy = 760, tw = S(31) + 0.5;
  const wf = frac('V_2', '3 kΩ', wx, wy, 64, R, tw, 1.0, { g: 'yanlis' });
  path([[[wf.box[0] - 26, wf.box[1] + 2], [wf.box[2] + 26, wf.box[3] - 2]], [[wf.box[2] + 26, wf.box[1] + 2], [wf.box[0] - 26, wf.box[3] - 2]]], R, 4, S(32), 0.5, { g: 'yanlis' });
  text('yanlış terim', wf.box[2] + 60, wy + 18, 50, R, S(32) + 0.5, { g: 'yanlis', dur: 0.6 });
  pulse(bx.is, B, Wt(32, 'çünkü'), E(32) + 0.3, { g: 'v5' });
  // seri kol: tek akim (cumle 33-34)
  const t33 = S(33); erase('tuzak', t33 - 0.05);
  path([[[x3, ym - L.r], [x3, yT]], D.z5], B, 6, t33, 1.5, { g: 'kol' });
  path([[[x2 + 62, yT - 15], [x2 + 36, yT], [x2 + 62, yT + 15]]], B, 6, t33 + 1.5, 0.3, { g: 'kol' });
  const l4m = text('4 mA', (x2 + x3) / 2, NL - 4, 42, B, Wt(33, 'her') - 0.2, { align: 'c', g: 'kol', dur: 0.4 });
  pulse(l4m.box, B, S(34), E(34) + 0.3, { g: 'v5' }); ring([x2, yT], 24, B, S(34), E(34) + 0.3, { g: 'v5' });
  // dogru denklem (cumle 35-38)
  pulse(bx.r3, B, S(35), Wt(35, 'bu'), { g: 'v5' }); pulse(bx.r4, B, S(35), Wt(35, 'bu'), { g: 'v5' }); pulse(l4m.box, B, Wt(35, 'bu'), E(35) + 0.3, { g: 'v5' });
  pulse(bx.r3, B, S(36), E(36) + 0.2, { g: 'v5' }); pulse(bx.r4, B, S(37), E(37) + 0.2, { g: 'v5' }); pulse(bx.is, B, S(38), E(38) + 0.4, { g: 'v5' });
  const e2 = eq(100, 890, ES, [
    { n: '(V_2 − V_1)', d: '1 kΩ', t: S(36), dur: E(36) - S(36) }, { s: '+', t: S(37), dur: 0.3, hl: false },
    { n: 'V_2', d: '1 kΩ', t: Wt(37, 'V', 0, true), dur: E(37) - Wt(37, 'V', 0, true) }, { s: '= 4 mA', t: S(38), dur: 1.0 }], { g: 'e2' });
  const s39 = text('Seri direnç akım kaynağının uçlarındaki gerilimi değiştirir.', 100, 1000, 42, K, S(39), { g: 'ifade', dur: E(39) - S(39) - 0.2 });
  pulse(bx.is, B, S(39), E(39) + 0.3, { g: 'v5' }); pulse(bx.r5, B, S(39), E(39) + 0.3, { g: 'v5' });
  const s40 = text('Düğüm gerilimlerini değiştirmez.', 100, 1052, 42, K, S(40), { g: 'ifade', dur: E(40) - S(40) });
  pulse(lv1.box, B, S(40), E(40) + 0.3, { g: 'v5' }); pulse(lv2.box, B, S(40), E(40) + 0.3, { g: 'v5' });
  const s41 = text('Akım kaynağına paralel direnç denkleme girer.', 1090, 905, 42, R, S(41), { g: 'ifade', dur: E(41) - S(41) - 0.3 });
  path([[[1090, 918], [1090 + s41.w, 918]]], R, 4, E(41) - 0.3, 0.5, { g: 'ifade' });
  // --- sahne 6: cozum (cumle 42-47)
  const t6 = S(42) - 0.12; for (const g of ['soru', 'yanlis', 'ifade', 'kol', 'ok2', 'n2c', 'e1k']) erase(g, t6);
  // iki denklem alt alta (1. denklem aninda yerine yazilir)
  const c1 = 1090, c2 = 1215, c3 = 1375, ry1 = 745, ry2 = 815, ry3 = 905, bs = ES * 0.33;
  const tr = (s, x, y, t, d, o = {}) => text(s, x, y + bs, ES, o.color ?? K, t, { g: 'top', dur: d, align: o.align });
  tr('5V_1', c1 + 90, ry1, t6, 0.01, { align: 'r' }); const m1 = tr('− 2V_2', c2, ry1, t6, 0.01); tr('= 20 V', c3, ry1, t6, 0.01);
  text('(1. denklem)', c3 + 170, ry1 + bs, 40, K, t6, { g: 'top', dur: 0.01 });
  pulse(e2.box, B, S(42), E(42) + 0.2, { g: 'v6' });
  const a2 = tr('−V_1', c1 + 90, ry2, S(43), 0.9, { align: 'r' }); const m2 = tr('+ 2V_2', c2, ry2, Wt(43, 'artı'), 1.2); const b2 = tr('= 4 V', c3, ry2, Wt(43, 'eşittir'), 0.8);
  pulse(a2.box, B, S(43), Wt(43, 'artı'), { g: 'v6' }); pulse(m2.box, B, Wt(43, 'artı'), Wt(43, 'eşittir'), { g: 'v6' }); pulse(b2.box, B, Wt(43, 'eşittir'), E(43) + 0.3, { g: 'v6' });
  text('(2. denklem)', c3 + 170, ry2 + bs, 40, K, E(43), { g: 'top', dur: 0.4 });
  path([[[c1 - 40, ry2 + 42], [c3 + 150, ry2 + 42]]], K, 4, S(44), 0.6, { g: 'top' });
  text('+', c1 - 70, ry2 + bs, ES, K, S(44) + 0.3, { g: 'top', dur: 0.2 });
  const tg = Wt(44, 'V', 0, true);
  for (const m of [m1, m2]) { path([[[m.box[0] + 4, m.box[3] - 16], [m.box[2] - 4, m.box[1] + 16]]], R, 5, tg + 0.2, 0.5, { g: 'top' }); pulse(m.box, R, tg, E(44) + 0.2, { g: 'v6' }); }
  const r3a = tr('4V_1', c1 + 90, ry3, S(45), 0.9, { align: 'r' }); const r3b = tr('= 24 V', c3, ry3, Wt(45, 'eşittir'), 1.0);
  pulse(r3a.box, B, S(45), Wt(45, 'eşittir'), { g: 'v6' }); pulse(r3b.box, B, Wt(45, 'eşittir'), E(45) + 0.2, { g: 'v6' });
  const rv1 = text('V_1 = 6 V', 1215, 995 + bs, 56, R, Wt(46, 'altı') - 0.5, { g: 'top', dur: 0.8 });
  frame([rv1.box[0] - 8, rv1.box[1] - 4, rv1.box[2] + 8, rv1.box[3] + 6], R, E(46) - 0.1, 0.4, { g: 'top' });
  erase('nl1', Wt(46, 'altı')); const n1v = text('V_1 = 6 V', x1, NL, 42, B, Wt(46, 'altı'), { align: 'c', g: 'devre', dur: 0.5 });
  const s2 = text('2V_2 = 4 V + 6 V = 10 V', 100, 995 + bs, ES, K, S(47), { g: 'top', dur: 1.3 });
  pulse(s2.box, B, S(47), Wt(47, 'beş'), { g: 'v6' });
  const rv2 = text('V_2 = 5 V', 100 + s2.w + 70, 995 + bs, 56, R, Wt(47, 'beş') - 0.4, { g: 'top', dur: 0.8 });
  frame([rv2.box[0] - 8, rv2.box[1] - 4, rv2.box[2] + 8, rv2.box[3] + 6], R, E(47), 0.4, { g: 'top' });
  erase('nl2', Wt(47, 'beş')); const n2v = text('V_2 = 5 V', x2, NL, 42, B, Wt(47, 'beş'), { align: 'c', g: 'devre', dur: 0.5 });
  // --- sahne 7: kontrol (cumle 48-56)
  const t7 = S(48) - 0.1; erase('top', t7); erase('e2', t7);
  text('Kontrol', 100, 745, 52, K, S(48), { g: 'k7', dur: 0.6 });
  path([[[100, 760], [232, 760]]], B, 4, S(48) + 0.6, 0.3, { g: 'k7' });
  const ia = (xc, t, dir, s) => { arrow(xc - 55 * dir, yT - 36, xc + 55 * dir, yT - 36, B, t, 0.5, { g: 'k7', lw: 5 }); const l = text(s, xc, yT - 52, 38, B, t + 0.4, { align: 'c', g: 'k7', dur: 0.4 }); return l; };
  const va = (x, t, s) => { arrow(x - 30, ym + 5, x - 30, ym + 95, B, t, 0.5, { g: 'k7', lw: 5 }); return text(s, x - 46, ym + 62, 38, B, t + 0.4, { align: 'r', g: 'k7', dur: 0.4 }); };
  const i1 = ia((xA + x1) / 2, Wt(49, 'dört') - 0.3, 1, '4 mA'); pulse(bx.vs, B, S(49), Wt(49, 'dört'), { g: 'v7' }); pulse(bx.r1, B, Wt(49, 'dört'), E(49) + 0.2, { g: 'v7' });
  const i2 = va(x1, S(50) + 0.2, '3 mA'); pulse(bx.r2, B, S(50), E(50) + 0.2, { g: 'v7' });
  const i3 = ia((x1 + x2) / 2, S(51) + 0.4, 1, '1 mA'); pulse(bx.r3, B, S(51), E(51) + 0.2, { g: 'v7' });
  const i5 = ia((x2 + x3) / 2, Wt(52, 'dört') - 0.3, -1, '4 mA'); pulse(bx.is, B, S(52), Wt(52, 'dört'), { g: 'v7' }); pulse(bx.r5, B, Wt(52, 'dört'), E(52) + 0.2, { g: 'v7' });
  const i4 = va(x2, Wt(53, 'ikinci') - 0.2, '5 mA'); pulse(bx.r4, B, S(53), E(53) + 0.2, { g: 'v7' }); ring([x2, yT], 24, B, S(53), Wt(53, 'ikinci'), { g: 'v7' });
  const k1 = eq(100, 835, 48, [{ s: '2. düğümün gerilimi:', t: S(54) - 0.9, dur: 0.8, hl: false }, { s: '5 mA × 1 kΩ = 5 V', t: S(54), dur: 1.0 }], { g: 'k7' });
  path([[[k1.x1 + 14, 835], [k1.x1 + 30, 852], [k1.x1 + 64, 808]]], K, 6, Wt(54, 'tutuyor'), 0.4, { g: 'k7' });
  pulse(n2v.box, B, Wt(54, 'tutuyor'), E(54) + 0.3, { g: 'v7' });
  const k2 = eq(100, 925, 48, [{ s: 'R_5 direncinin uçlarındaki gerilim:', t: S(55), dur: 1.4, hl: false }, { s: '4 mA × 3 kΩ', t: Wt(55, 'dört'), dur: 1.6 }, { s: '= 12 V', t: Wt(55, 'on'), dur: 0.8 }], { g: 'k7' });
  pulse(bx.r5, B, S(55), E(55) + 0.3, { g: 'v7' });
  const k3 = eq(100, 1015, 48, [{ s: '3. düğümün gerilimi:', t: S(56), dur: 1.0, hl: false }, { s: '5 V + 12 V =', t: Wt(56, 'üst'), dur: 0.8 }, { s: '17 V', t: Wt(56, 'on'), dur: 0.6, color: R }], { g: 'k7' });
  const b17 = k3.boxes[2]; path([[[b17[0] + 4, b17[3] + 2], [b17[2] - 4, b17[3] + 2]]], R, 5, E(56) - 0.2, 0.4, { g: 'k7' });
  ring([x3, yT], 22, B, S(56), E(56) + 0.4, { g: 'v7' }); pulse(l3d.box, B, S(56), E(56) + 0.4, { g: 'v7' });
  // --- kart (4 sn, sessiz): devre kalir, denklem alani temizlenir
  const tk = AUD; erase('k7', tk);
  const kb = text('Bilmen gerekenler', 100, 750, 60, K, tk + 0.05, { g: 'kart', dur: 0.5 });
  path([[[100, 768], [100 + kb.w, 768]]], R, 5, tk + 0.55, 2.6, { g: 'kart' });
  const md = ['Akım kaynağına seri direnç düğüm denklemine girmez', 'Akım kaynağına paralel direnç denkleme girer', 'Sonuç: V_1 = 6 V, V_2 = 5 V'];
  md.forEach((s, i) => { const y = 850 + i * 78, t = tk + 0.35 + i * 0.4; dot([118, y - 16], 8, B, t, { g: 'kart' }); text(s, 150, y, 50, K, t, { g: 'kart', dur: 0.55 }); });
  pulse([90, 690, 100 + kb.w + 14, 778], B, tk + 0.6, DUR + 1, { g: 'kart' });
}

// ================================================================ SHORTS (1080x1920)
function buildShorts() {
  const CUT0 = Z[23].start - 0.27, CUT1 = Z[41].end + 0.22; OFF = CUT0; const AUD = CUT1 - CUT0; DUR = AUD + 4;
  const L = { xA: 105, x1: 330, x2: 560, x3: 790, yT: 700, yB: 1000, r: 44, fs: 37, zl: 100, amp: 14, lw: 4, ideal: false };
  const { xA, x1, x2, x3, yT, yB } = L, ym = (yT + yB) / 2, NL = yT - 40;
  // devre ilk 1,4 sn'de hizla cizilir; sol kisim (gerilim kaynagi, R1, R2) soluk
  const q = (i) => ({ t: -1, d: 0.3 }); // devre ilk karede hazir (kapak karesi)
  const T = { vs: q(0), vsBot: q(1), aLead: q(1), r1: q(2), r2: q(3), r3: q(4), r4: q(5), railB: q(6), is: q(7), r5: q(8) };
  const D = devre(L, T, { left: G }), bx = D.box;
  const xg = toprak(L, -1, K, 'devre');
  const lref = text('referans düğümü (0 V)', xg + 36, yB + 52, 37, K, -1, { g: 'devre', dur: 0.4 });
  const lv1 = text('V_1', x1, NL, 44, B, -1, { align: 'c', g: 'devre', dur: 0.3 });
  const lv2 = text('V_2', x2, NL, 44, B, -1, { align: 'c', g: 'devre', dur: 0.3 });
  text('10 V', xA, NL, 38, G, -1, { align: 'c', g: 'devre', dur: 0.3 });
  const X0 = 70, QS = 64;
  text('Akım kaynağına seri bağlı', X0, 300, QS, K, 0.04, { g: 'ust', dur: 1.3 });
  text('direnç düğüm denklemine', X0, 378, QS, K, Wt(23, 'direnç'), { g: 'ust', dur: 1.1 });
  text('girer mi?', X0, 456, QS, K, Wt(23, 'girer'), { g: 'ust', dur: 0.5 });
  text('Girmez', X0 + 300, 462, 86, R, S(24), { g: 'ust', dur: 0.4 });
  pulse(bx.r5, R, S(23), S(26), { g: 'v' });
  path([ellipsePts((x2 + x3) / 2, yT + 20, 104, 62)], R, 5, S(25), 0.7, { g: 'tuzak' });
  ring([x2, yT], 24, B, S(26), E(26) + 0.3, { g: 'v' });
  path([circlePts(x2, yT, 28)], B, 4, S(26) + 0.2, 0.5, { g: 'n2c' });
  const ao = (x, y, dx, dy, t, g) => arrow(x, y, x + dx, y + dy, B, t, 0.35, { g, lw: 5, head: 13 });
  ao(x2 - 32, yT - 18, -34, 0, Wt(27, 'bir', 0, true), 'ok2'); ao(x2 - 24, yT + 34, 0, 44, Wt(27, 'iki'), 'ok2');
  pulse(bx.r3, B, S(27), Wt(28, 'öbürü'), { g: 'v' }); pulse(bx.r4, B, S(27), S(28), { g: 'v' });
  pulse(lv1.box, B, Wt(28, 'gerilimi'), Wt(28, 'öbürü'), { g: 'v' });
  pulse(bx.r4, B, Wt(28, 'öbürü'), E(28) + 0.3, { g: 'v' }); pulse(lref.box, B, Wt(28, 'referansa'), E(28) + 0.3, { g: 'v' });
  pulse(bx.is, B, S(29), E(29) + 0.3, { g: 'v' });
  const lid = text('ideal akım kaynağı: 4 mA', X0, 1150, 46, B, Wt(29, 'dört') , { g: 'altn', dur: 1.2 });
  pulse(bx.r5, R, S(30), S(32), { g: 'v' });
  const tw = S(31) + 0.5, wy = 1205;
  erase('altn', tw - 0.1);
  const wf = frac('V_2', '3 kΩ', X0 + 30, wy, 64, R, tw, 1.0, { g: 'yanlis' });
  path([[[wf.box[0] - 26, wf.box[1] + 2], [wf.box[2] + 26, wf.box[3] - 2]], [[wf.box[2] + 26, wf.box[1] + 2], [wf.box[0] - 26, wf.box[3] - 2]]], R, 4, S(32), 0.5, { g: 'yanlis' });
  text('yanlış terim', wf.box[2] + 62, wy + 20, 60, R, S(32) + 0.5, { g: 'yanlis', dur: 0.6 });
  pulse(bx.is, B, Wt(32, 'çünkü'), E(32) + 0.3, { g: 'v' });
  const t33 = S(33); erase('tuzak', t33 - 0.05);
  path([[[x3, ym - L.r], [x3, yT]], D.z5], B, 6, t33, 1.5, { g: 'kol' });
  path([[[x2 + 58, yT - 14], [x2 + 34, yT], [x2 + 58, yT + 14]]], B, 6, t33 + 1.5, 0.3, { g: 'kol' });
  const l4m = text('4 mA', (x2 + x3) / 2, NL - 2, 40, B, Wt(33, 'her') - 0.2, { align: 'c', g: 'kol', dur: 0.4 });
  pulse(l4m.box, B, S(34), E(34) + 0.3, { g: 'v' }); ring([x2, yT], 24, B, S(34), E(34) + 0.3, { g: 'v' });
  // dogru denklem
  const t35 = S(35) - 0.1; erase('yanlis', t35);
  pulse(bx.r3, B, S(35), Wt(35, 'bu'), { g: 'v' }); pulse(bx.r4, B, S(35), Wt(35, 'bu'), { g: 'v' }); pulse(l4m.box, B, Wt(35, 'bu'), E(35) + 0.3, { g: 'v' });
  pulse(bx.r3, B, S(36), E(36) + 0.2, { g: 'v' }); pulse(bx.r4, B, S(37), E(37) + 0.2, { g: 'v' }); pulse(bx.is, B, S(38), E(38) + 0.4, { g: 'v' });
  eq(X0, 1190, 60, [
    { n: '(V_2 − V_1)', d: '1 kΩ', t: S(36), dur: E(36) - S(36) }, { s: '+', t: S(37), dur: 0.3, hl: false },
    { n: 'V_2', d: '1 kΩ', t: Wt(37, 'V', 0, true), dur: E(37) - Wt(37, 'V', 0, true) }, { s: '= 4 mA', t: S(38), dur: 1.0 }], { g: 'e2' });
  // sonuc ifadeleri ust bantta (soru aninda silinir)
  const t39 = S(39) - 0.1; erase('ust', t39);
  const FS = 54, tm = Wt(39, 'uçlarındaki');
  text('Seri direnç, akım kaynağının', X0, 268, FS, K, S(39), { g: 'ust2', dur: tm - S(39) - 0.1 });
  text('uçlarındaki gerilimi değiştirir.', X0, 330, FS, K, tm, { g: 'ust2', dur: E(39) - tm });
  pulse(bx.is, B, S(39), E(39) + 0.3, { g: 'v' }); pulse(bx.r5, B, S(39), E(39) + 0.3, { g: 'v' });
  text('Düğüm gerilimlerini değiştirmez.', X0, 392, FS, K, S(40), { g: 'ust2', dur: E(40) - S(40) });
  pulse(lv1.box, B, S(40), E(40) + 0.3, { g: 'v' }); pulse(lv2.box, B, S(40), E(40) + 0.3, { g: 'v' });
  const td = Wt(41, 'denkleme');
  const p1 = text('Akım kaynağına paralel direnç', X0, 470, FS, R, S(41), { g: 'ust2', dur: td - S(41) - 0.1 });
  const p2 = text('denkleme girer.', X0, 532, FS, R, td, { g: 'ust2', dur: E(41) - td });
  path([[[X0, 546], [X0 + p2.w, 546]]], R, 4, E(41) - 0.1, 0.3, { g: 'ust2' });
  // kart: her sey silinir
  const tk = AUD; eraseAll(tk);
  const kb = text('Bilmen gerekenler', X0, 420, 84, K, tk + 0.05, { g: 'kart', dur: 0.5 });
  path([[[X0, 444], [X0 + kb.w, 444]]], R, 6, tk + 0.55, 2.8, { g: 'kart' });
  const md = [['Akım kaynağına seri direnç', 'düğüm denklemine girmez'], ['Akım kaynağına paralel direnç', 'denkleme girer']];
  md.forEach((ls, i) => { const y = 600 + i * 230, t = tk + 0.35 + i * 0.45; dot([X0 + 14, y - 20], 10, B, t, { g: 'kart' });
    ls.forEach((s, j) => text(s, X0 + 50, y + j * 76, 58, K, t + j * 0.25, { g: 'kart', dur: 0.45 })); });
  pulse([X0 - 12, 340, X0 + kb.w + 14, 456], B, tk + 0.6, DUR + 1, { g: 'kart' });
  return { CUT0, CUT1 };
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
  let pen = null, penT = -1;
  const act = items.filter((it) => t >= it.t0 && t < it.t1);
  for (const it of act) if (it.k === 'pulse') { // vurgular en altta
    const a = Math.min(1, (t - it.t0) / 0.15) * (0.13 + 0.07 * Math.sin((t - it.t0) * 2 * Math.PI * 1.1));
    const fp = it.ref && it.ref.dur > 0 ? Math.min(1, (t - it.ref.t0) / it.ref.dur) : 1; // vurgu, yazilan kisim kadar genisler
    ctx.globalAlpha = a; ctx.fillStyle = it.color; rr(it.box[0], it.box[1], it.box[0] + Math.max(24, (it.box[2] - it.box[0]) * fp), it.box[3], 12); ctx.fill(); ctx.globalAlpha = 1;
  }
  for (const it of act) {
    const p = it.dur > 0 ? Math.min(1, (t - it.t0) / it.dur) : 1;
    if (it.k === 'path') { drawPath(it, p); if (p < 1 && it.t0 > penT) { pen = pointOnPath(it, p); penT = it.t0; } }
    else if (it.k === 'text' || it.k === 'frac') {
      const top = it.k === 'frac' ? it.y - it.size * 1.3 : it.y - it.size * 1.05, hh = it.k === 'frac' ? it.size * 2.7 : it.size * 1.5;
      ctx.save(); ctx.beginPath(); ctx.rect(it.x - 4, top, (it.w + 8) * p, hh); ctx.clip();
      if (it.k === 'text') drawRich(it.s, it.x, it.y, it.size, it.color);
      else { drawRich(it.num, it.x + (it.w - it.wn) / 2, it.y - it.size * 0.3, it.size, it.color); drawRich(it.den, it.x + (it.w - it.wd) / 2, it.y + it.size * 0.98, it.size, it.color);
        ctx.strokeStyle = it.color; ctx.lineWidth = Math.max(3, it.size * 0.07); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(it.x, it.y); ctx.lineTo(it.x + it.w, it.y); ctx.stroke(); }
      ctx.restore();
      if (p < 1 && it.dur > 0.05 && it.t0 > penT) { const ph = (t - it.t0) * 31; const yy = it.k === 'frac' ? it.y + it.size * 0.9 * Math.sin(ph * 0.5) : it.y - it.size * 0.3 + it.size * 0.28 * Math.sin(ph); pen = [it.x + it.w * p, yy]; penT = it.t0; }
    } else if (it.k === 'dot') { ctx.fillStyle = it.color; ctx.beginPath(); ctx.arc(it.c[0], it.c[1], it.r * Math.min(1, p * 1.0), 0, 7); ctx.fill(); }
    else if (it.k === 'ring') { const a = Math.min(1, (t - it.t0) / 0.15); ctx.globalAlpha = a * 0.9; ctx.strokeStyle = it.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(it.c[0], it.c[1], it.r + 4 * Math.sin((t - it.t0) * 2 * Math.PI * 1.1), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
  }
  if (pen) { // kalem ucu (ajanin kendi cizimi): yazi bitince kaybolur
    const [x, y] = pen, k = W > H ? 1 : 1; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.62); ctx.scale(k, k);
    ctx.fillStyle = '#2b2b2b'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(7, -16); ctx.lineTo(-7, -16); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6d7480'; rr(-9, -92, 9, -16, 3); ctx.fill(); ctx.fillStyle = '#3f4650'; rr(-9, -100, 9, -88, 3); ctx.fill();
    ctx.restore();
  }
}
export function boxes(t) { // kalite kontrol: gorunen yazi kutulari
  return items.filter((it) => (it.k === 'text' || it.k === 'frac') && t >= it.t0 && t < it.t1).map((it) => ({ s: it.k === 'text' ? it.s : it.num + '/' + it.den, b: it.box.map((v) => Math.round(v)), g: it.g }));
}
export async function init(mode, canvas) {
  const ff = new FontFace('PH', 'url(/tools/vendor/fonts/PatrickHand-Regular.ttf)'); await ff.load(); document.fonts.add(ff);
  Z = (await (await fetch('/uzun/ornek-01/zamanlama.json')).json()).cumleler;
  [W, H] = mode === 'shorts' ? [1080, 1920] : [1920, 1080];
  canvas.width = W; canvas.height = H; ctx = canvas.getContext('2d');
  items = []; let extra = {};
  if (mode === 'shorts') extra = buildShorts(); else buildUzun();
  items.sort((a, b) => a.t0 - b.t0);
  return { W, H, duration: DUR, chars: [...used].join(''), ...extra, n: items.length };
}
// kalite kontrol: t aninda hareket eden (cizilen ya da nabiz gibi atan) oge var mi
export function busy(t) { return items.some((it) => t >= it.t0 && t < it.t1 && (it.k === 'pulse' || it.k === 'ring' || (it.dur > 0 && t < it.t0 + it.dur))); }
