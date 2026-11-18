// Devre Teorisi I — whiteboard motoru (uzun/ornek-02/sahne.js'den uyarlandi), 1920x1080.
// Zaman deterministik: her sey draw(t) icinde t'den hesaplanir; cumle/kelime zamanlari zamanlama-N.json'dan.
// TEK KALEM KURALI (UZUN.md 4): kalemle cizilen/yazilan ogeler (text, path, dot) build() sonrasi siralanir;
// bir oge bitmeden digeri baslamaz (en az GAP sn ara), kalem bir sonraki ogenin basina <=0,3 sn'lik gorunur
// bir hareketle gider. Istenen zamandan kayma (gecikme) kontrol.mjs'de raporlanir.
// Abone karti bu motorda CIZILMEZ: ayri saydam katman olarak (abone.html) render edilip birlestirmede bindirilir
// (profil fotografi depoya girmez).
export const K = '#1c1c1c', B = '#1a56c4', R = '#d1242a', GR = '#8a8f96', BG = '#fbfaf6';
export const W = 1920, H = 1080, ALT = 821; // alt %24 bant (y > 821) yalnizca abone/kapanis kartlari
let ctx, items = [], Z, DUR = 0, seq = [], erases = [], marks = {};
const used = new Set();
const GAP = 0.12, FADE = 0.2;

// ---------------------------------------------------------------- zaman
export const S = (i) => Z[i].start, E = (i) => Z[i].end;
const norm = (w) => w.toLocaleLowerCase('tr').replace(/[.,;:?!]/g, '');
export function Wt(i, word, nth = 0, exact = false) {
  const ws = Z[i].words.filter((w) => (exact ? norm(w.w) === norm(word) : norm(w.w).startsWith(norm(word))));
  if (!ws[nth]) throw new Error(`kelime yok: cumle ${i} '${word}' #${nth}`);
  return ws[nth].t0;
}
export const WtE = (i, word, nth = 0, exact = false) => { const ws = Z[i].words.filter((w) => (exact ? norm(w.w) === norm(word) : norm(w.w).startsWith(norm(word)))); if (!ws[nth]) throw new Error(`kelime yok: cumle ${i} '${word}' #${nth}`); return ws[nth].t1; };
export const N = () => Z.length;
export const mark = (k, v) => { marks[k] = v; };

// ---------------------------------------------------------------- yazi: '_' sonraki karakter alt simge; 'Δ' elle cizilir (yazi tipinde yok)
function groups(s) {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const sub = s[i] === '_'; const c = sub ? s[++i] : s[i];
    if (c === 'Δ') { out.push({ c, sub, tri: true }); continue; }
    used.add(c);
    const last = out[out.length - 1];
    if (last && !last.tri && last.sub === sub) last.c += c; else out.push({ c, sub });
  }
  return out;
}
const font = (size) => `${size}px PH`;
export function mw(s, size) { let w = 0; for (const g of groups(s)) { const z = g.sub ? size * 0.62 : size; if (g.tri) { w += z * 0.58; continue; } ctx.font = font(z); w += ctx.measureText(g.c).width; } return w; }
function drawRich(s, x, y, size, color) {
  ctx.fillStyle = color; ctx.strokeStyle = color; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  for (const g of groups(s)) {
    const z = g.sub ? size * 0.62 : size, yy = g.sub ? y + size * 0.2 : y;
    if (g.tri) { const w = z * 0.58; ctx.lineWidth = Math.max(2, z * 0.065); ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.06, yy - z * 0.02); ctx.lineTo(x + w * 0.47, yy - z * 0.62); ctx.lineTo(x + w * 0.9, yy - z * 0.02); ctx.closePath(); ctx.stroke(); x += w; continue; }
    ctx.font = font(z); ctx.fillText(g.c, x, yy); x += ctx.measureText(g.c).width;
  }
}

// ---------------------------------------------------------------- ogeler
export function add(o) { o.t1 ??= Infinity; o.req = o.t0; items.push(o); return o; }
export function erase(g, t) { erases.push([g, t]); }
export function text(s, x, y, size, color, t0, o = {}) {
  const w = mw(s, size); const x0 = o.align === 'c' ? x - w / 2 : o.align === 'r' ? x - w : x;
  const it = add({ k: 'text', s, x: x0, y, size, color, w, t0, dur: o.dur ?? Math.min(2.4, Math.max(0.3, s.length * 0.045)), g: o.g, pen: true, kart: o.kart });
  it.box = [x0 - 6, y - size * 0.95, x0 + w + 6, y + size * 0.3];
  return it;
}
export function path(segs, color, lw, t0, dur, o = {}) {
  const lens = segs.map((p) => { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; });
  return add({ k: 'path', segs, lens, total: lens.reduce((a, b) => a + b, 0), color, lw, t0, dur, g: o.g, pen: true });
}
export const line = (p0, p1, color, lw, t0, dur, o = {}) => path([[p0, p1]], color, lw, t0, dur, o);
export function dashed(p0, p1, color, lw, t0, dur, o = {}) {
  const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), d = o.dash ?? 16, gp = o.gap ?? 11, segs = [];
  for (let s = 0; s < L; s += d + gp) { const a = s / L, b = Math.min(1, (s + d) / L); segs.push([[p0[0] + (p1[0] - p0[0]) * a, p0[1] + (p1[1] - p0[1]) * a], [p0[0] + (p1[0] - p0[0]) * b, p0[1] + (p1[1] - p0[1]) * b]]); }
  return path(segs, color, lw, t0, dur, o);
}
export function dashRect(box, color, lw, t0, dur, o = {}) {
  const [a, b, c, d] = box, segs = [];
  for (const [p0, p1] of [[[a, b], [c, b]], [[c, b], [c, d]], [[c, d], [a, d]], [[a, d], [a, b]]]) { const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), dd = 16, gp = 11; for (let s = 0; s < L; s += dd + gp) { const u = s / L, v = Math.min(1, (s + dd) / L); segs.push([[p0[0] + (p1[0] - p0[0]) * u, p0[1] + (p1[1] - p0[1]) * u], [p0[0] + (p1[0] - p0[0]) * v, p0[1] + (p1[1] - p0[1]) * v]]); } }
  return path(segs, color, lw, t0, dur, o);
}
export function fx(fn, t0, t1, o = {}) { return add({ k: 'fx', fn, t0, t1, g: o.g, dur: 0 }); }
export function pulse(box, color, t0, t1, o = {}) { return add({ k: 'pulse', box, color, t0, t1, g: o.g, dur: 0 }); }
export function dot(c, r, color, t0, o = {}) { return add({ k: 'dot', c, r, color, t0, dur: 0.15, g: o.g, pen: true }); }
export function arrow(x0, y0, x1, y1, color, t0, dur, o = {}) {
  const a = Math.atan2(y1 - y0, x1 - x0), h = o.head ?? 16, s = 0.5;
  return path([[[x0, y0], [x1, y1]], [[x1 - h * Math.cos(a - s), y1 - h * Math.sin(a - s)], [x1, y1], [x1 - h * Math.cos(a + s), y1 - h * Math.sin(a + s)]]], color, o.lw ?? 5, t0, dur, o);
}
export function ellipsePts(cx, cy, rx, ry, n = 64) { const p = []; for (let i = 0; i <= n + 3; i++) { const a = -2.2 + (i / n) * 2 * Math.PI; const k = 1 + 0.03 * Math.sin(a * 2 + 1); p.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a)]); } return p; }
export const oval = (box, color, t0, dur, o = {}) => { const it = path([ellipsePts((box[0] + box[2]) / 2, (box[1] + box[3]) / 2, (box[2] - box[0]) / 2 + Math.min((box[2] - box[0]) * 0.075, 26) + 20, (box[3] - box[1]) / 2 * 1.2 + 8)], color, o.lw ?? 4, t0, dur, o); it.wrap = true; return it; };
export const under = (it, color, t0, dur, o = {}) => path([[[it.box[0] + 4, it.box[3] + 2], [it.box[2] - 4, it.box[3] + 2]]], color, o.lw ?? 4, t0, dur ?? 0.35, o);
export function zig(p0, p1, zl, amp) {
  const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), ux = (p1[0] - p0[0]) / L, uy = (p1[1] - p0[1]) / L, nx = -uy, ny = ux;
  const a = (L - zl) / 2, pts = [p0, [p0[0] + ux * a, p0[1] + uy * a]], n = 6, st = zl / n;
  for (let i = 0; i < n; i++) { const d = a + st * (i + 0.25), d2 = a + st * (i + 0.75); pts.push([p0[0] + ux * d + nx * amp, p0[1] + uy * d + ny * amp], [p0[0] + ux * d2 - nx * amp, p0[1] + uy * d2 - ny * amp]); }
  pts.push([p0[0] + ux * (a + zl), p0[1] + uy * (a + zl)], p1); return pts;
}
export function frame(box, color, t0, dur, o = {}) { const [a, b, c, d] = box; return path([[[a, b], [c, b], [c, d], [a, d], [a, b]]], color, o.lw ?? 4, t0, dur, o); }
export const pad = (b, p = 10) => [b[0] - p, b[1] - p, b[2] + p, b[3] + p];
export const union = (...bs) => [Math.min(...bs.map((b) => b[0])), Math.min(...bs.map((b) => b[1])), Math.max(...bs.map((b) => b[2])), Math.max(...bs.map((b) => b[3]))];
// satir: art arda parcalar {s, t, dur, color}
export function row(x, y, size, parts, o = {}) {
  const its = []; let cx = x;
  for (const p of parts) { const it = text(p.s, cx, y, size, p.color ?? o.color ?? K, p.t, { dur: p.dur, g: o.g }); its.push(it); cx += it.w + size * 0.3; }
  return { its, box: union(...its.map((i) => i.box)), x1: cx };
}
// grafik ekseni: kutu [x0,y0,x1,y1] piksel; deger araligi; isaretler; etiketler
export function axes(o) {
  const [px0, py0, px1, py1] = o.box, X = (v) => px0 + (v - o.xr[0]) / (o.xr[1] - o.xr[0]) * (px1 - px0), Y = (v) => py1 - (v - o.yr[0]) / (o.yr[1] - o.yr[0]) * (py1 - py0);
  const yz = Y(Math.max(o.yr[0], Math.min(o.yr[1], 0))), xz = X(Math.max(o.xr[0], Math.min(o.xr[1], 0)));
  const g = o.g, lw = 4, fs = o.fs ?? 34; let t = o.t;
  const dt = o.dt ?? 0.55;
  arrow(px0 - 10, yz, px1 + 30, yz, K, t, dt, { g, lw, head: 14 }); t += dt + GAP;
  arrow(xz, py1 + 10, xz, py0 - 30, K, t, dt, { g, lw, head: 14 }); t += dt + GAP;
  const xl = text(o.xl, px1 + 40, yz + 10, fs + 2, K, t, { g, dur: 0.5 }); t += 0.5 + GAP;
  const yl = text(o.yl, xz, py0 - 46, fs + 2, K, t, { g, dur: 0.5, align: 'c' }); t += 0.5 + GAP;
  const fmt = (v) => String(v).replace('.', ',').replace('-', '−');
  for (const v of o.xt) { if (v === 0 && o.skip0x) continue; line([X(v), yz - 8], [X(v), yz + 8], K, 3, t, 0.08, { g }); t += 0.08 + GAP; text(fmt(v), X(v) + (o.xtdx ?? 0), yz + 40, fs, K, t, { g, dur: 0.18, align: 'c' }); t += 0.18 + GAP; }
  for (const v of o.yt) { if (v === 0) continue; line([xz - 8, Y(v)], [xz + 8, Y(v)], K, 3, t, 0.08, { g }); t += 0.08 + GAP; text(fmt(v), xz - 16, Y(v) + 10, fs, K, t, { g, dur: 0.18, align: 'r' }); t += 0.18 + GAP; }
  return { X, Y, end: t, xl, yl, yz, xz };
}
export function curve(f, a, b, ax, color, lw, t0, dur, o = {}) { const pts = []; const n = o.n ?? 80; for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n; pts.push([ax.X(v), ax.Y(f(v))]); } return path([pts], color, lw, t0, dur, o); }

// ---------------------------------------------------------------- siralama (tek kalem)
function sequence() {
  for (const it of items) it.req = it.t0;
  seq = items.filter((it) => it.pen).sort((a, b) => a.t0 - b.t0);
  let cur = -1;
  for (const it of seq) {
    if (it.t0 < cur + GAP) it.t0 = cur + GAP;
    cur = it.t0 + it.dur;
  }
  for (const [g, t] of erases) for (const it of items) if (it.g === g && it.t1 > t) {
    if (it.req < t && it.t0 >= t - FADE) throw new Error(`silme oncesi yetismedi: ${it.k} '${it.s ?? ''}' grup ${g} ${it.t0.toFixed(2)} >= ${t.toFixed(2)}`);
    if (it.t0 < t) it.t1 = t;
  }
  // nabizlar: bagli oldugu oge kaydiysa onunla birlikte kayar
  for (const it of items) if (it.k === 'pulse' && it.ref) { const d = it.ref.t0 - it.ref.req; it.t0 += d; if (it.t1 < it.ref.t0 + it.ref.dur + 0.2) it.t1 = it.ref.t0 + it.ref.dur + 0.4; }
}
const endPt = (it) => it.k === 'path' ? it.segs[it.segs.length - 1][it.segs[it.segs.length - 1].length - 1] : it.k === 'text' ? [it.x + it.w, it.y - it.size * 0.3] : it.c;
const startPt = (it) => it.k === 'path' ? it.segs[0][0] : it.k === 'text' ? [it.x, it.y - it.size * 0.3] : it.c;

// ---------------------------------------------------------------- cizim
function pointOnPath(it, p) {
  let d = p * it.total;
  for (let s = 0; s < it.segs.length; s++) {
    if (d <= it.lens[s] || s === it.segs.length - 1) { const pts = it.segs[s];
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (d <= l || i === pts.length - 1) { const f = l ? Math.min(1, d / l) : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; } d -= l; } }
    d -= it.lens[s];
  }
  return endPt(it);
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
const ease = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
const alive = (it, t) => t >= it.t0 && t < it.t1;
const alpha = (it, t) => (it.t1 === Infinity ? 1 : Math.max(0, Math.min(1, (it.t1 - t) / FADE)));
// kalem konumu: cizilen ogenin ucu; aradaysa onceki ogenin sonunda bekler, sonrakine <=0,3 sn'de gider
function penAt(t) {
  let lo = 0, hi = seq.length - 1, k = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (seq[m].t0 <= t) { k = m; lo = m + 1; } else hi = m - 1; }
  const cur = k >= 0 ? seq[k] : null, nxt = seq[k + 1];
  if (cur && t < cur.t0 + cur.dur) { const p = cur.dur > 0 ? (t - cur.t0) / cur.dur : 1;
    if (cur.k === 'path') return pointOnPath(cur, p);
    if (cur.k === 'text') return [cur.x + cur.w * p, cur.y - cur.size * 0.3 + cur.size * 0.28 * Math.sin((t - cur.t0) * 31)];
    return cur.c; }
  if (!nxt) return cur && t < cur.t0 + cur.dur + 0.25 ? endPt(cur) : null;
  const a = cur ? endPt(cur) : startPt(nxt), b = startPt(nxt), ce = cur ? cur.t0 + cur.dur : -1e9, gap = nxt.t0 - ce, tr = Math.min(0.3, gap);
  if (t >= nxt.t0 - tr) { const u = ease((t - (nxt.t0 - tr)) / tr); return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; }
  if (gap <= 1.2 || t < ce + 0.25) return cur ? a : null;
  return null;
}
export function busyAt(t) { // kalem hareket ediyor ya da oge cizilip nabiz atiyor mu
  if (items.some((it) => alive(it, t) && (it.k === 'pulse' || it.k === 'fx' || (it.dur > 0 && t < it.t0 + it.dur) || (it.t1 !== Infinity && t > it.t1 - FADE)))) return true;
  const p0 = penAt(t), p1 = penAt(t + 1 / 30); return !!(p0 && p1 && Math.hypot(p0[0] - p1[0], p0[1] - p1[1]) > 0.5);
}
export function draw(t) {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
  const act = items.filter((it) => alive(it, t));
  let anyPulse = false;
  for (const it of act) if (it.k === 'pulse') { anyPulse = true;
    const a = Math.min(1, (t - it.t0) / 0.15) * (0.12 + 0.07 * Math.sin((t - it.t0) * 2 * Math.PI * 1.1)) * alpha(it, t);
    ctx.globalAlpha = a; ctx.fillStyle = it.color; rr(it.box[0], it.box[1], it.box[2], it.box[3], 12); ctx.fill(); ctx.globalAlpha = 1; }
  // durağan an kalmasin: kalem durur ve nabiz yoksa en son yazilan gorunur yazi hafifce vurgulanir
  const pen = penAt(t);
  if (!anyPulse && !busyAt(t)) {
    const last = act.filter((it) => it.k === 'text' && t >= it.t0 + it.dur && !it.kart).sort((a, b) => b.t0 - a.t0)[0];
    if (last) { const u = t - (last.t0 + last.dur); ctx.globalAlpha = Math.min(1, u / 0.4) * (0.08 + 0.05 * Math.sin(u * 2 * Math.PI * 0.9)); ctx.fillStyle = last.color === R ? R : B; rr(...last.box, 12); ctx.fill(); ctx.globalAlpha = 1; }
  }
  for (const it of act) {
    const p = it.dur > 0 ? Math.min(1, (t - it.t0) / it.dur) : 1; ctx.globalAlpha = alpha(it, t);
    if (it.k === 'path') drawPath(it, p);
    else if (it.k === 'text') { const top = it.y - it.size * 1.05, hh = it.size * 1.5; ctx.save(); ctx.beginPath(); ctx.rect(it.x - 4, top, (it.w + 8) * p, hh); ctx.clip(); drawRich(it.s, it.x, it.y, it.size, it.color); ctx.restore(); }
    else if (it.k === 'fx') { ctx.save(); it.fn(ctx, t - it.t0, t); ctx.restore(); }
    else if (it.k === 'dot') { ctx.fillStyle = it.color; ctx.beginPath(); ctx.arc(it.c[0], it.c[1], it.r * p, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
  }
  if (pen) { const [x, y] = pen; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.62);
    ctx.fillStyle = '#2b2b2b'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(7, -16); ctx.lineTo(-7, -16); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#6d7480'; rr(-9, -92, 9, -16, 3); ctx.fill(); ctx.fillStyle = '#3f4650'; rr(-9, -100, 9, -88, 3); ctx.fill(); ctx.restore(); }
}
export function boxes(t) { return items.filter((it) => it.k === 'text' && alive(it, t)).map((it) => ({ s: it.s, b: it.box.map((v) => Math.round(v)), g: it.g, kart: !!it.kart })); }
export function report() {
  const lag = seq.map((it) => ({ s: it.s ?? it.k, g: it.g, req: +it.req.toFixed(2), t0: +it.t0.toFixed(2), lag: +(it.t0 - it.req).toFixed(2) })).filter((x) => x.lag > 0.6);
  let ov = 0; for (let i = 1; i < seq.length; i++) if (seq[i].t0 < seq[i - 1].t0 + seq[i - 1].dur - 1e-6) ov++;
  return { gecikme: lag, kalem_cakisma: ov, sonOge: seq.length ? +(seq[seq.length - 1].t0 + seq[seq.length - 1].dur).toFixed(2) : 0 };
}
export const shapes = () => items.filter((it) => it.k === 'path' && it.pen).map((it) => ({ g: it.g, t0: it.t0, t1: it.t1, bb: union(...it.segs.map((s) => [Math.min(...s.map((p) => p[0])), Math.min(...s.map((p) => p[1])), Math.max(...s.map((p) => p[0])), Math.max(...s.map((p) => p[1]))])) }));

// zamanlamaya sessizlik eklemeleri (intro karti vb.): ara = [[an, sure], ...] (ham ses zamaninda)
function shift(t, ara) { let d = 0; for (const [a, s] of ara) if (t >= a) d += s; return t + d; }
export async function init(canvas, parca, build) {
  const ff = new FontFace('PH', 'url(/tools/vendor/fonts/PatrickHand-Regular.ttf)'); await ff.load(); document.fonts.add(ff);
  const cfg = (await (await fetch('parcalar.json')).json())[parca];
  const zj = await (await fetch(`zamanlama-${parca}.json`)).json();
  const ara = cfg.ara ?? [];
  Z = zj.cumleler.map((s) => ({ ...s, start: shift(s.start, ara), end: shift(s.end, ara), words: s.words.map((w) => ({ ...w, t0: shift(w.t0, ara), t1: shift(w.t1, ara) })) }));
  const SES = shift(zj.ses_suresi, ara); DUR = +(SES + (cfg.kuyruk ?? 0.6)).toFixed(3);
  canvas.width = W; canvas.height = H; ctx = canvas.getContext('2d');
  items = []; erases = []; marks = {};
  build({ ses: SES, dur: DUR, ara });
  sequence();
  return { W, H, duration: DUR, ses: SES, chars: [...used].join(''), n: items.length, marks, ...report() };
}
export function pathsAt(t) { // QC: gorunen cizgilerin ornek noktalari
  return items.filter((it) => it.k === 'path' && !it.wrap && alive(it, t)).map((it) => { const pts = [];
    for (const s of it.segs) for (let i = 1; i < s.length; i++) { const l = Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]), n = Math.max(1, Math.ceil(l / 6)); for (let k = 0; k <= n; k++) pts.push([s[i - 1][0] + (s[i][0] - s[i - 1][0]) * k / n, s[i - 1][1] + (s[i][1] - s[i - 1][1]) * k / n]); }
    return { g: it.g, pts }; });
}
