// Kanal intro animasyonu (UZUN.md 4a-I, is emri G, 19.11.2026): 6 sn, 1920x1080, sessiz.
// Koyu yesil tebeşir tahtası; 12 elektrik-elektronik çizimi/formülü kenarlardan büyük ve bulanık gelir,
// dönerek merkeze doğru küçülüp yerleşir (0-3,5 sn); "Devre Teorisi I" + "Öğr. Gör. Nuray SAĞLAM" tebeşirle
// yazılır (3,5-5 sn); tebeşir tozlu silinmeyle beyaz tahtaya geçiş (5-6 sn). Bütün çizimler özgün, kodla.
export const W = 1920, H = 1080, DUR = 6.0;
const BG = '#2E4A3A', WB = '#fbfaf6', CH = 'rgba(244,243,234,0.93)', YE = 'rgba(243,228,150,0.93)', BL = 'rgba(170,205,240,0.93)';
let rs = 12345; const rnd = () => ((rs = (rs * 1103515245 + 12345) % 2147483648) / 2147483648);
const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const cl = (x) => Math.min(1, Math.max(0, x));
let ctx, back, items = [], titleC, subC, dust = [];

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
// tebeşir dokusu: çizilen şeklin üzerinden rastgele küçük noktalar silinir
function grain(c, n = 0.22) { const g = c.getContext('2d'); g.save(); g.globalCompositeOperation = 'destination-out';
  const k = Math.round(c.width * c.height * n / 9); for (let i = 0; i < k; i++) { g.fillStyle = `rgba(0,0,0,${0.25 + rnd() * 0.6})`; g.fillRect(rnd() * c.width, rnd() * c.height, 1 + rnd() * 2, 1 + rnd() * 1.5); }
  g.restore(); }
// hafif titrek el çizgisi (iki kez, küçük kaymayla)
function line(g, pts, col, w = 5) { for (let pass = 0; pass < 2; pass++) { g.strokeStyle = col; g.lineWidth = w - pass * 1.5; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
  pts.forEach(([x, y], i) => { const jx = (rnd() - 0.5) * 1.6, jy = (rnd() - 0.5) * 1.6; i ? g.lineTo(x + jx, y + jy) : g.moveTo(x + jx, y + jy); }); g.stroke(); } }
function zig(x0, y, x1, n = 6, a = 16) { const p = [[x0, y]]; const d = (x1 - x0) / (n * 2); for (let i = 0; i < n * 2; i++) p.push([x0 + d * (i + 1) - d / 2, y + (i % 2 ? a : -a)]); p.push([x1, y]); return p; }
function zigV(x, y0, y1, n = 5, a = 14) { return zig(y0, x, y1, n, a).map(([u, v]) => [v, u]); }
function text(g, s, x, y, size, col, align = 'center') { g.font = `${size}px PatrickHand`; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); }
function circle(g, x, y, r, col, w = 5) { const p = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; p.push([x + r * Math.cos(a), y + r * Math.sin(a)]); } line(g, p, col, w); }

const DRAW = {
  direnc(g) { // iki dirençli ağ ve bağlantı noktaları
    line(g, [[20, 60], [60, 60]], CH); line(g, zig(60, 60, 170), CH); line(g, [[170, 60], [230, 60], [230, 90]], CH);
    line(g, zigV(230, 90, 190), CH); line(g, [[230, 190], [230, 220], [20, 220]], CH); line(g, [[230, 60], [290, 60]], CH);
    line(g, zigV(290, 60, 160, 4), YE); line(g, [[290, 160], [290, 220], [230, 220]], CH);
    [[20, 60], [20, 220]].forEach(([x, y]) => circle(g, x, y, 7, CH, 4)); text(g, 'R', 115, 22, 38, CH); return [310, 240]; },
  pil(g) { line(g, [[20, 100], [90, 100]], CH); line(g, [[90, 50], [90, 150]], CH, 6); line(g, [[120, 75], [120, 125]], CH, 9); line(g, [[120, 100], [200, 100]], CH);
    text(g, '+', 90, 25, 40, YE); text(g, '9 V', 105, 182, 40, CH); return [220, 210]; },
  anahtar(g) { line(g, [[10, 110], [80, 110]], CH); circle(g, 86, 110, 6, CH, 4); line(g, [[90, 106], [175, 55]], CH); circle(g, 185, 110, 6, CH, 4); line(g, [[191, 110], [260, 110]], CH);
    text(g, 'S', 135, 150, 38, CH); return [270, 175]; },
  kond(g) { line(g, [[10, 90], [100, 90]], CH); line(g, [[100, 40], [100, 140]], BL, 6); line(g, [[125, 40], [125, 140]], BL, 6); line(g, [[125, 90], [215, 90]], CH);
    text(g, 'C', 112, 170, 38, CH); return [225, 195]; },
  bobin(g) { const p = [[10, 100], [50, 100]]; for (let k = 0; k < 4; k++) for (let i = 0; i <= 16; i++) { const a = Math.PI - i / 16 * Math.PI; p.push([70 + k * 40 + 20 * Math.cos(a), 100 - 26 * Math.sin(a)]); }
    p.push([210, 100], [250, 100]); line(g, p, CH); text(g, 'L', 130, 150, 38, CH); return [260, 175]; },
  opamp(g) { line(g, [[70, 20], [70, 200], [230, 110], [70, 20]], CH); line(g, [[10, 65], [70, 65]], CH); line(g, [[10, 155], [70, 155]], CH); line(g, [[230, 110], [290, 110]], CH);
    text(g, '−', 92, 65, 44, YE); text(g, '+', 92, 155, 44, YE); return [300, 220]; },
  ohm(g) { text(g, 'V = i × R', 150, 50, 72, CH); return [300, 100]; },
  akim(g) { text(g, 'i = dq/dt', 150, 50, 72, BL); return [300, 100]; },
  kcl(g) { text(g, 'Σi = 0', 120, 50, 72, YE); return [240, 100]; },
  guc(g) { text(g, 'P = v × i', 150, 50, 72, CH); return [300, 100]; },
  grafik(g) { line(g, [[30, 180], [270, 180]], CH, 4); line(g, [[30, 180], [30, 20]], CH, 4); line(g, [[30, 150], [90, 150], [90, 70], [180, 70], [180, 120], [255, 120]], BL);
    text(g, 'i', 14, 30, 36, CH); text(g, 't', 265, 205, 36, CH); return [290, 225]; },
  sinus(g) { const p = []; for (let i = 0; i <= 80; i++) p.push([20 + i * 3.3, 90 - 55 * Math.sin(i / 80 * Math.PI * 4)]); line(g, [[20, 90], [290, 90]], CH, 3); line(g, p, YE); text(g, 'v(t)', 40, 165, 36, CH, 'left'); return [300, 185]; },
  thevenin(g) { circle(g, 50, 120, 32, CH); text(g, '+', 50, 104, 30, CH); text(g, '−', 50, 136, 30, CH); line(g, [[50, 88], [50, 40], [80, 40]], CH); line(g, zig(80, 40, 180, 5), CH);
    line(g, [[180, 40], [250, 40]], CH); circle(g, 256, 40, 6, CH, 4); line(g, [[50, 152], [50, 200], [250, 200]], CH); circle(g, 256, 200, 6, CH, 4);
    text(g, 'Thévenin', 150, 240, 34, YE); return [280, 265]; },
};
// hedef konumlar (merkez çevresinde halka; orta bant başlığa ayrılır), dönme ve gecikme
const PLAN = [
  ['direnc', 560, 330, -24, 0.00], ['pil', 1360, 320, 22, 0.10], ['ohm', 960, 255, 18, 0.20], ['grafik', 1620, 380, -20, 0.30],
  ['anahtar', 390, 520, 27, 0.40], ['kond', 1560, 600, -26, 0.45], ['akim', 760, 860, 20, 0.55], ['kcl', 1180, 860, -17, 0.60],
  ['bobin', 540, 760, 25, 0.70], ['opamp', 1380, 790, -22, 0.80], ['sinus', 300, 300, 19, 0.90], ['thevenin', 1680, 820, -28, 0.95],
];

export async function init(cv) {
  const f = new FontFace('PatrickHand', 'url(/tools/vendor/fonts/PatrickHand-Regular.ttf)'); await f.load(); document.fonts.add(f);
  cv.width = W; cv.height = H; ctx = cv.getContext('2d');
  // arka plan: tahta rengi + silinmiş izler + toz lekeleri + soluk sabit tebeşir yazıları
  back = canvas(W, H); const b = back.getContext('2d'); b.fillStyle = BG; b.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const x = rnd() * W, y = rnd() * H, r = 120 + rnd() * 320; const gr = b.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(230,235,225,${0.035 + rnd() * 0.04})`); gr.addColorStop(1, 'rgba(230,235,225,0)'); b.fillStyle = gr; b.fillRect(x - r, y - r, 2 * r, 2 * r); }
  for (let i = 0; i < 14; i++) { b.save(); b.translate(rnd() * W, rnd() * H); b.rotate((rnd() - 0.5) * 0.25); b.fillStyle = 'rgba(235,238,228,0.05)'; b.fillRect(-260, -30, 520 + rnd() * 300, 60 + rnd() * 40); b.restore(); }
  const faint = ['Σv = 0', 'v = L di/dt', 'i = C dv/dt', 'R = ρ L / A', 'q = ∫ i dt', 'P = i² × R', 'V = I × R', 'Req = R1 + R2', 'τ = R × C', 'Σi = 0', 'v = V × sin(ωt)', 'G = 1 / R', 'W = P × t', 'i(t)', 'KVL', 'KCL'];
  b.save(); b.globalAlpha = 0.1; for (let i = 0; i < 60; i++) { const s = faint[i % faint.length]; b.save(); b.translate(60 + rnd() * (W - 200), 40 + rnd() * (H - 80)); b.rotate((rnd() - 0.5) * 0.3); text(b, s, 0, 0, 34 + rnd() * 28, '#f4f3ea', 'left'); b.restore(); } b.restore();
  for (let i = 0; i < 9000; i++) { b.fillStyle = `rgba(240,240,230,${rnd() * 0.06})`; b.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2, 1); }
  // ögeler
  for (const [k, x, y, rot, d] of PLAN) { const c = canvas(340, 280); const g = c.getContext('2d'); const [w, h] = DRAW[k](g); grain(c, 0.2);
    const dx = x - W / 2, dy = y - H / 2, L = Math.hypot(dx, dy) || 1;
    items.push({ c, w, h, x, y, rot: rot * Math.PI / 180, d, sx: x + dx / L * 1150, sy: y + dy / L * 800, fin: (rnd() - 0.5) * 0.08 }); }
  // başlık ve alt başlık (ayrı katman: soldan sağa yazılarak açılır)
  titleC = canvas(1100, 220); { const g = titleC.getContext('2d'); text(g, 'Devre Teorisi I', 550, 110, 170, CH); grain(titleC, 0.12); }
  subC = canvas(900, 110); { const g = subC.getContext('2d'); text(g, 'Öğr. Gör. Nuray SAĞLAM', 450, 55, 70, YE); grain(subC, 0.12); }
  for (let i = 0; i < 260; i++) dust.push({ y: rnd() * H, o: rnd() * 140, r: 1 + rnd() * 3.5, a: 0.3 + rnd() * 0.5, v: 40 + rnd() * 160 });
  return { duration: DUR, fps: 30, ogeler: items.length };
}

const EX0 = 5.0, EX1 = 5.8; // silinme süpürmesi
function edgeX(t, y) { const q = cl((t - EX0) / (EX1 - EX0)), p = 0.5 - 0.5 * Math.cos(Math.PI * q); return -260 + p * (W + 520) + 60 * Math.sin(y / 70) + 30 * Math.sin(y / 23 + 1.3); }

export function draw(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1; ctx.drawImage(back, 0, 0);
  // ögeler: 0-3,5 sn arası kenardan büyük/bulanık/dönük gelip yerleşir; sonra çok yavaş "nefes"
  for (const it of items) { const p = ease((t - it.d) / 2.4); const sc = 2.3 - 1.3 * p + (t > 3.4 ? -0.015 * (t - 3.4) : 0);
    const x = it.sx + (it.x - it.sx) * p, y = it.sy + (it.y - it.sy) * p, r = it.rot * (1 - p) + it.fin; const bl = 10 * (1 - p);
    let a = cl((t - it.d) / 0.35); if (t > 3.4) a *= 1 - 0.45 * cl((t - 3.4) / 0.4);
    if (a <= 0) continue; ctx.save(); ctx.globalAlpha = a; ctx.filter = bl > 0.3 ? `blur(${bl.toFixed(1)}px)` : 'none'; ctx.translate(x, y); ctx.rotate(r); ctx.scale(sc, sc);
    ctx.drawImage(it.c, -it.w / 2, -it.h / 2); ctx.restore(); }
  ctx.filter = 'none';
  // başlığın arkasına koyu yeşil yumuşak fon (okunurluk)
  const bk = cl((t - 3.3) / 0.4); if (bk > 0) { const gr = ctx.createRadialGradient(960, 560, 0, 960, 560, 720); gr.addColorStop(0, `rgba(36,60,47,${0.9 * bk})`); gr.addColorStop(0.55, `rgba(36,60,47,${0.75 * bk})`); gr.addColorStop(1, 'rgba(36,60,47,0)');
    ctx.save(); ctx.scale(1, 0.45); ctx.fillStyle = gr; ctx.fillRect(0, 560 / 0.45 - 900, W, 1800); ctx.restore(); }
  // "Devre Teorisi I" 3,5-4,55 sn; "Öğr. Gör. Nuray SAĞLAM" 4,5-5,0 sn (soldan sağa tebeşirle yazılır)
  reveal(titleC, 960, 505, (t - 3.5) / 1.05); reveal(subC, 960, 640, (t - 4.5) / 0.5);
  // 5-6 sn: tebeşir tozlu silinme -> beyaz tahta
  if (t >= EX0) { ctx.save(); ctx.fillStyle = WB; ctx.beginPath(); ctx.moveTo(-10, -10);
    for (let y = -10; y <= H + 10; y += 12) ctx.lineTo(edgeX(t, y), y); ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (t < EX1 + 0.15) for (const d of dust) { const ex = edgeX(t, d.y); ctx.fillStyle = `rgba(250,250,244,${d.a * (1 - cl((t - EX1) / 0.15))})`; ctx.beginPath(); ctx.arc(ex + d.o * 0.6 + (t - EX0) * d.v * 0.3, d.y + Math.sin(d.o + t * 9) * 6, d.r, 0, Math.PI * 2); ctx.fill(); } }
}
function reveal(c, cx, cy, p) { p = cl(p); if (p <= 0) return; const x0 = cx - c.width / 2, y0 = cy - c.height / 2, w = c.width * p;
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, c.height); ctx.clip(); ctx.drawImage(c, x0, y0); ctx.restore();
  if (p < 1) { ctx.save(); ctx.fillStyle = 'rgba(250,250,240,0.9)'; ctx.fillRect(x0 + w - 4, cy - 26, 14, 30); ctx.restore(); } } // tebeşir ucu
