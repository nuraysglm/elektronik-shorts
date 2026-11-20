// Kanal intro'su — baskılı devre kartı (UZUN.md 4a-I, iş emri I, 20.11.2026). 6 sn, 1920×1080, 30 fps, sessiz.
// Yukarıdan bakılan koyu yeşil lehim maskeli kart; bakır yollar ve pad'ler sırayla ışıldar, ortadaki çipe akar;
// çipin üstünde serigrafi "Devre Teorisi I" + "Öğr. Gör. Nuray SAĞLAM"; son 1 sn kamera yaklaşır, beyaza geçiş.
// Deterministik: Math.random / Date yok. Bütün tasarım özgün (parça etiketleri R1, C3, U1 …).
import * as THREE from '../../tools/vendor/three/three.module.min.js';
import { RoomEnvironment } from '../../tools/vendor/three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from '../../tools/vendor/three/addons/geometries/RoundedBoxGeometry.js';

const DUR = 6, TW = 2560, TH = 1440, BW = 20, BH = 11.25;            // doku pikseli ve kart birimi
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ease = (p) => { p = clamp(p); return p * p * (3 - 2 * p); };
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const U = (px, py) => [(px / TW - 0.5) * BW, (py / TH - 0.5) * BH];   // doku -> dünya (x, z)

// ---------------------------------------------------------------- yolların üretimi
const CH = { x: TW / 2, y: TH / 2, w: 620, h: 620 };            // ortadaki çip (doku pikseli)
let traces = [], pads = [], parts = [];
function route(R) {
  const pins = []; const n = 14, step = CH.w / (n + 1);
  for (let i = 1; i <= n; i++) {
    pins.push({ x: CH.x - CH.w / 2 + i * step, y: CH.y - CH.h / 2, d: [0, -1] });
    pins.push({ x: CH.x - CH.w / 2 + i * step, y: CH.y + CH.h / 2, d: [0, 1] });
    pins.push({ x: CH.x - CH.w / 2, y: CH.y - CH.h / 2 + i * step, d: [-1, 0] });
    pins.push({ x: CH.x + CH.w / 2, y: CH.y - CH.h / 2 + i * step, d: [1, 0] });
  }
  for (const p of pins) {
    // pinden dışarı: düz çık, 45° kır, kenara doğru düz git (yollar çakışmasın diye sıra ile kaydır)
    const pts = [[p.x, p.y]]; const out = 50 + R() * 40; let x = p.x + p.d[0] * out, y = p.y + p.d[1] * out; pts.push([x, y]);
    const side = p.d[0] === 0 ? (p.x < CH.x ? -1 : 1) : (p.y < CH.y ? -1 : 1);
    const k = p.d[0] === 0 ? Math.abs(p.x - CH.x) : Math.abs(p.y - CH.y);
    const diag = 40 + k * 0.9 * (0.6 + R() * 0.25);
    if (p.d[0] === 0) { x += side * diag; y += p.d[1] * diag; } else { y += side * diag; x += p.d[0] * diag; }
    pts.push([x, y]);
    const L = 250 + R() * 700; x += p.d[0] * L; y += p.d[1] * L; pts.push([x, y]);
    if (R() < 0.55) { const L2 = 80 + R() * 160; x += p.d[0] * L2 + (p.d[0] === 0 ? side * L2 : 0); y += p.d[1] * L2 + (p.d[1] === 0 ? side * L2 : 0); pts.push([x, y]); }
    const L3 = 150 + R() * 500; x += p.d[0] * L3; y += p.d[1] * L3; pts.push([x, y]);
    const ok = pts.every(([a, b]) => a > 40 && a < TW - 40 && b > 40 && b < TH - 40);
    if (!ok) { // kenarda kes
      const q = pts.map(([a, b]) => [clamp(a, 60, TW - 60), clamp(b, 60, TH - 60)]); pts.length = 0; pts.push(...q); }
    // yol kenardan çipe doğru ışıldar: diziyi ters çevir
    pts.reverse();
    let len = 0; const cum = [0]; for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(len); }
    // sıra: uzaklığa ve açıya bağlı "şehir haritası" dalgası; müzik vuruşlarına yakın (≈0,5 sn) kümeler
    const ang = Math.atan2(pts[0][1] - CH.y, pts[0][0] - CH.x);
    const t0 = 0.25 + ((ang + Math.PI) / (2 * Math.PI)) * 1.6 + R() * 0.35;
    traces.push({ pts, cum, len, t0, w: 7 + Math.round(R() * 2) * 3 });
    pads.push({ x: pts[0][0], y: pts[0][1], t: t0 });
  }
  // ayrıca rastgele kısa yollar ve via'lar (doku için, ışıldamaz ya da geç ışıldar)
  for (let i = 0; i < 90; i++) {
    let x = 80 + R() * (TW - 160), y = 80 + R() * (TH - 160);
    if (Math.abs(x - CH.x) < CH.w / 2 + 220 && Math.abs(y - CH.y) < CH.h / 2 + 220) continue;
    const pts = [[x, y]]; const d = R() < 0.5 ? [1, 0] : [0, 1]; const L = 80 + R() * 260; x += d[0] * L; y += d[1] * L; pts.push([x, y]);
    x += 60 * (R() < 0.5 ? -1 : 1); y += 60; pts.push([x, y]);
    let len = 0; const cum = [0]; for (let j = 1; j < pts.length; j++) { len += Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]); cum.push(len); }
    traces.push({ pts, cum, len, t0: 1.2 + R() * 2.2, w: 5, kisa: true });
  }
}
// ---------------------------------------------------------------- dokular
function baseTexture(R) {
  const c = document.createElement('canvas'); c.width = TW; c.height = TH; const k = c.getContext('2d');
  const g = k.createRadialGradient(TW / 2, TH / 2, 100, TW / 2, TH / 2, TW * 0.7); g.addColorStop(0, '#0b3520'); g.addColorStop(1, '#04140b');
  k.fillStyle = g; k.fillRect(0, 0, TW, TH);
  for (let i = 0; i < 9000; i++) { k.fillStyle = `rgba(255,255,255,${0.012 + R() * 0.02})`; k.fillRect(R() * TW, R() * TH, 2, 2); }   // maske dokusu
  // bakır dolgu ızgarası (toprak düzlemi) soluk
  k.strokeStyle = 'rgba(80,160,100,0.05)'; k.lineWidth = 2; for (let x = 0; x < TW; x += 36) { k.beginPath(); k.moveTo(x, 0); k.lineTo(x + TH, TH); k.stroke(); }
  // yollar: maske altındaki bakır (açık yeşil)
  k.lineCap = 'round'; k.lineJoin = 'round';
  for (const tr of traces) { k.strokeStyle = '#17572f'; k.lineWidth = tr.w; k.beginPath(); tr.pts.forEach(([x, y], i) => (i ? k.lineTo(x, y) : k.moveTo(x, y))); k.stroke(); }
  // pad'ler (ENIG altın) ve via'lar
  for (const p of pads) { k.fillStyle = '#c9a24a'; k.beginPath(); k.arc(p.x, p.y, 14, 0, 7); k.fill(); k.fillStyle = '#0a1f12'; k.beginPath(); k.arc(p.x, p.y, 5, 0, 7); k.fill(); }
  for (const tr of traces) if (tr.kisa) { const [x, y] = tr.pts[tr.pts.length - 1]; k.fillStyle = '#b8954a'; k.beginPath(); k.arc(x, y, 10, 0, 7); k.fill(); k.fillStyle = '#0a1f12'; k.beginPath(); k.arc(x, y, 4, 0, 7); k.fill(); }
  // çip altı pinleri (altın)
  k.fillStyle = '#d6b25a'; const n = 14, step = CH.w / (n + 1);
  for (let i = 1; i <= n; i++) { const a = CH.x - CH.w / 2 + i * step, b = CH.y - CH.h / 2 + i * step;
    k.fillRect(a - 7, CH.y - CH.h / 2 - 60, 14, 60); k.fillRect(a - 7, CH.y + CH.h / 2, 14, 60); k.fillRect(CH.x - CH.w / 2 - 60, b - 7, 60, 14); k.fillRect(CH.x + CH.w / 2, b - 7, 60, 14); }
  // serigrafi: parça etiketleri + kart adı (özgün)
  k.fillStyle = 'rgba(240,240,230,0.85)'; k.font = '600 30px InterSB';
  for (const p of parts) k.fillText(p.lab, p.px - 24, p.py - p.ph / 2 - 14);
  k.strokeStyle = 'rgba(240,240,230,0.8)'; k.lineWidth = 3; k.strokeRect(CH.x - CH.w / 2 - 80, CH.y - CH.h / 2 - 80, CH.w + 160, CH.h + 160);
  k.fillText('U1', CH.x - CH.w / 2 - 78, CH.y - CH.h / 2 - 96);
  k.font = '600 26px InterSB'; k.fillText('DT-1  REV A', 90, TH - 70);
  // köşe montaj delikleri
  for (const [x, y] of [[70, 70], [TW - 70, 70], [70, TH - 70], [TW - 70, TH - 70]]) { k.fillStyle = '#c9a24a'; k.beginPath(); k.arc(x, y, 34, 0, 7); k.fill(); k.fillStyle = '#050c08'; k.beginPath(); k.arc(x, y, 20, 0, 7); k.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
let emC, emK, emT;
function drawEmissive(t) {
  const k = emK; k.globalCompositeOperation = 'source-over'; k.fillStyle = '#000'; k.fillRect(0, 0, TW, TH); k.lineCap = 'round'; k.lineJoin = 'round';
  k.globalCompositeOperation = 'lighter';
  for (const tr of traces) {
    const p = seg(t, tr.t0, tr.t0 + (tr.kisa ? 0.5 : 0.85)); if (p <= 0) continue;
    const L = tr.len * ease(p);
    // kalıcı ışık (yanmış yol) + ilerleyen parlak uç
    const pathTo = (Lmax) => { k.beginPath(); k.moveTo(...tr.pts[0]); for (let i = 1; i < tr.pts.length; i++) { if (tr.cum[i] <= Lmax) k.lineTo(...tr.pts[i]); else { const f = (Lmax - tr.cum[i - 1]) / (tr.cum[i] - tr.cum[i - 1]); k.lineTo(tr.pts[i - 1][0] + f * (tr.pts[i][0] - tr.pts[i - 1][0]), tr.pts[i - 1][1] + f * (tr.pts[i][1] - tr.pts[i - 1][1])); break; } } };
    const after = seg(t, tr.t0 + 0.85, tr.t0 + 1.6); const beat = 0.12 * Math.max(0, Math.cos((t % 0.5) / 0.5 * Math.PI)) ;
    const glow = (tr.kisa ? 0.3 : 0.9) * (1 - 0.6 * after) + beat;
    pathTo(L); k.strokeStyle = `rgba(255,170,70,${glow * 0.22})`; k.lineWidth = tr.w * 4; k.stroke();
    k.strokeStyle = `rgba(255,215,140,${glow})`; k.lineWidth = tr.w; k.stroke();
    if (p < 1) { // uç
      let hx, hy; { let i = 1; while (i < tr.pts.length - 1 && tr.cum[i] < L) i++; const f = clamp((L - tr.cum[i - 1]) / Math.max(1, tr.cum[i] - tr.cum[i - 1])); hx = tr.pts[i - 1][0] + f * (tr.pts[i][0] - tr.pts[i - 1][0]); hy = tr.pts[i - 1][1] + f * (tr.pts[i][1] - tr.pts[i - 1][1]); }
      const g = k.createRadialGradient(hx, hy, 0, hx, hy, 46); g.addColorStop(0, 'rgba(255,255,230,0.95)'); g.addColorStop(1, 'rgba(255,200,100,0)'); k.fillStyle = g; k.fillRect(hx - 46, hy - 46, 92, 92);
    }
  }
  for (const pd of pads) { const a = seg(t, pd.t, pd.t + 0.2); if (a > 0) { k.fillStyle = `rgba(255,220,150,${0.7 * a})`; k.beginPath(); k.arc(pd.x, pd.y, 15, 0, 7); k.fill(); } }
  // çip pinleri yollar ulaştıkça ışıldar
  const pinA = seg(t, 1.6, 3.0); if (pinA > 0) { k.fillStyle = `rgba(255,220,140,${0.6 * pinA})`; const n = 14, step = CH.w / (n + 1);
    for (let i = 1; i <= n; i++) { const a = CH.x - CH.w / 2 + i * step, b = CH.y - CH.h / 2 + i * step;
      k.fillRect(a - 7, CH.y - CH.h / 2 - 60, 14, 60); k.fillRect(a - 7, CH.y + CH.h / 2, 14, 60); k.fillRect(CH.x - CH.w / 2 - 60, b - 7, 60, 14); k.fillRect(CH.x + CH.w / 2, b - 7, 60, 14); } }
  emT.needsUpdate = true;
}
// çipin üst yüzü: serigrafi yazısı soldan sağa "lazerle" yazılır
let chC, chK, chT;
function drawChip(t) {
  const k = chK, W = chC.width, H = chC.height; k.globalCompositeOperation = 'source-over';
  const g = k.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#202326'); g.addColorStop(1, '#141618'); k.fillStyle = g; k.fillRect(0, 0, W, H);
  k.fillStyle = 'rgba(255,255,255,0.05)'; k.beginPath(); k.arc(70, 70, 26, 0, 7); k.fill();                 // pin-1 çukuru
  const p1 = seg(t, 3.15, 4.15), p2 = seg(t, 4.0, 4.7);
  const write = (txt, font, y, p, col) => { k.font = font; k.textAlign = 'center'; k.textBaseline = 'middle'; const w = k.measureText(txt).width; const x0 = W / 2 - w / 2;
    k.save(); k.beginPath(); k.rect(x0 - 10, y - 90, (w + 20) * p, 180); k.clip(); k.fillStyle = col; k.fillText(txt, W / 2, y); k.restore();
    if (p > 0 && p < 1) { const hx = x0 - 10 + (w + 20) * p; const gg = k.createRadialGradient(hx, y, 0, hx, y, 60); gg.addColorStop(0, 'rgba(255,255,255,0.95)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); k.fillStyle = gg; k.fillRect(hx - 60, y - 60, 120, 120); } };
  write('Devre Teorisi I', '900 124px IDB', H * 0.45, p1, '#f4f4ee');
  write('Öğr. Gör. Nuray SAĞLAM', '600 62px InterSB', H * 0.64, p2, '#dcdcd2');
  chT.needsUpdate = true;
}
// ---------------------------------------------------------------- sahne
let renderer, scene, camera, flash;
export async function init(canvas) {
  for (const [n, u] of [['IDB', '../../tools/vendor/fonts/InterDisplay-Black.otf'], ['InterSB', '../../tools/vendor/fonts/Inter-SemiBold.otf']]) { const f = new FontFace(n, `url(${u})`); await f.load(); document.fonts.add(f); }
  const R = rng(20261120);
  // SMD parçalar (çipten uzak, yolların arasında)
  const lab = { R: 1, C: 1, U: 2, Y: 1, D: 1 };
  for (let i = 0; i < 160; i++) { const px = 140 + R() * (TW - 280), py = 140 + R() * (TH - 280);
    if (Math.abs(px - CH.x) < CH.w / 2 + 260 && Math.abs(py - CH.y) < CH.h / 2 + 200) continue;
    if (parts.some((q) => Math.hypot(q.px - px, q.py - py) < 200)) continue;
    const r = R(); const tip = r < 0.45 ? 'R' : r < 0.8 ? 'C' : r < 0.9 ? 'D' : r < 0.96 ? 'U' : 'Y';
    const [pw, ph] = tip === 'U' ? [190, 140] : tip === 'Y' ? [150, 60] : [70, 36];
    parts.push({ tip, px, py, pw, ph, rot: R() < 0.5 ? 0 : Math.PI / 2, lab: tip + lab[tip]++ });
  }
  route(R);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true }); renderer.setSize(1920, 1080, false); renderer.setPixelRatio(1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95; renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene = new THREE.Scene(); scene.background = new THREE.Color(0x030806);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.3).texture;
  camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 100);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25)); const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(-4, 10, 3); scene.add(dl);
  emC = document.createElement('canvas'); emC.width = TW; emC.height = TH; emK = emC.getContext('2d'); emT = new THREE.CanvasTexture(emC); emT.colorSpace = THREE.SRGBColorSpace;
  const board = new THREE.Mesh(new RoundedBoxGeometry(BW, 0.16, BH, 4, 0.05), [0, 0, new THREE.MeshPhysicalMaterial({ map: baseTexture(R), emissiveMap: emT, emissive: 0xffffff, emissiveIntensity: 1.3, roughness: 0.5, metalness: 0.05, clearcoat: 0.3, clearcoatRoughness: 0.4, envMapIntensity: 0.3 }), 0, 0, 0].map((m) => m || new THREE.MeshStandardMaterial({ color: 0x0b2a18, roughness: 0.6 })));
  board.position.y = -0.08; scene.add(board);
  // parçalar
  const blk = new THREE.MeshPhysicalMaterial({ color: 0x17191c, roughness: 0.45, clearcoat: 0.3 }), tan = new THREE.MeshPhysicalMaterial({ color: 0x9b7a4e, roughness: 0.5 }),
    tin = new THREE.MeshPhysicalMaterial({ color: 0xd7dbe0, metalness: 1, roughness: 0.2 }), xt = new THREE.MeshPhysicalMaterial({ color: 0x8d939a, metalness: 1, roughness: 0.35 });
  for (const p of parts) { const [x, z] = U(p.px, p.py); const w = p.pw / TW * BW, d = p.ph / TH * BH; const g = new THREE.Group(); g.position.set(x, 0, z);
    const h = p.tip === 'U' ? 0.12 : p.tip === 'Y' ? 0.1 : 0.06;
    g.add(new THREE.Mesh(new RoundedBoxGeometry(w * (p.tip === 'R' || p.tip === 'C' ? 0.7 : 1), h, d, 2, 0.01), p.tip === 'C' ? tan : p.tip === 'Y' ? xt : blk));
    if (p.tip === 'R' || p.tip === 'C' || p.tip === 'D') for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.BoxGeometry(w * 0.16, h * 1.02, d * 1.02), tin); e.position.x = s * w * 0.42; g.add(e); }
    if (p.tip === 'U') for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.BoxGeometry(w * 0.06, 0.03, d * 0.28), tin); e.position.set(-w * 0.36 + i * w * 0.24, -h / 2 + 0.015, s * d * 0.62); g.add(e); }
    g.position.y = h / 2; scene.add(g); }
  // ana çip U1
  chC = document.createElement('canvas'); chC.width = 1024; chC.height = 1024; chK = chC.getContext('2d'); chT = new THREE.CanvasTexture(chC); chT.colorSpace = THREE.SRGBColorSpace; chT.anisotropy = 8;
  const cw = CH.w / TW * BW, cd = CH.h / TH * BH; const side = new THREE.MeshPhysicalMaterial({ color: 0x18191b, roughness: 0.5 });
  const chip = new THREE.Mesh(new RoundedBoxGeometry(cw, 0.22, cd, 3, 0.03), [side, side, new THREE.MeshPhysicalMaterial({ map: chT, roughness: 0.85, envMapIntensity: 0.25, emissiveMap: chT, emissive: 0xffffff, emissiveIntensity: 0.25 }), side, side, side]);
  chip.position.y = 0.11; scene.add(chip);
  flash = document.createElement('div'); flash.style.cssText = 'position:fixed;inset:0;background:#fbfaf6;opacity:0;pointer-events:none'; document.body.appendChild(flash);
  console.assert(traces.length > 100, 'yol sayısı');
  return { duration: DUR, traces: traces.length, parts: parts.length };
}
export function draw(t) {
  drawEmissive(t); drawChip(t);
  // kamera: 0–5 sn yavaş süzülme (eğik üstten), 5–6 sn çipe hafif yaklaşma
  const a = ease(seg(t, 0, 5)), z = ease(seg(t, 5, 6));
  const h = 14.0 - 1.6 * a - 4.2 * z, back = 3.0 - 0.8 * a - 1.2 * z;
  camera.position.set(-0.5 + 0.5 * a, h, back); camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  flash.style.opacity = String(ease(seg(t, 5.55, 5.95)));   // beyaz tahtaya hızlı geçiş
}
