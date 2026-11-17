// 008b — Ohm kanunu ve akım–gerilim (i–V) karakteristiği. Temel Devre Teorisi I, ders 3 (Razavi, Basic Circuits Lec 3), 2. video.
// Bölüm 2b/2g: tek fikir. Vurgulanan nokta (kanal sahibinin notu, 14.11.2026): omik direncin i–V grafiği düz çizgidir (eğim 1/R);
// ama gerilim sabitken R değiştirilirse i–R grafiği düz çizgi DEĞİLDİR, i = V/R hiperbolüdür. Her R ayrı bir i–V doğrusu;
// doğruların V = 6 V ile kesişimleri i–R hiperbolünün noktalarıdır.
// Devre: ayarlı güç kaynağı (ön kenar, + ucu +x) + ampermetre (sol kenar) + ayarlı direnç (sağ kenar); ortada iki grafikli panel
// (sol: i–V, sağ: i–R). Elektronlar yeşil (dış devrede − → +), geleneksel akım oku kırmızı (+ → −). Tüm sayılar hesaplanır, check() ile doğrulanır.

import { THREE, clamp, seg, easeInOut, easeOut, fade } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, fmt, check, penTimeline, narrationPen, penSec, wordsOf } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, resistor, projLabel, camRig } from '../../tools/lib/parcalar.js';
import { meter, psu } from '../../tools/lib/olcum.js';

const near = (a, b) => Math.abs(a - b) < 1e-9;
const VS = 6;                                   // sabit gerilim, V
check(near(VS / 1, 6) && near(VS / 2, 3) && near(VS / 3, 2), '6 V / 1, 2, 3 kΩ = 6, 3, 2 mA');
check(near(1 / 1, 1), 'eğim 1/R: 1 kΩ → 1 mA/V');

// ---------------------------------------------------------------- anlatım
const iR = `${rd('i')}–${bl('R')}`, iV = `${rd('i')}–${hl('V')}`;
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `${hl('Gerilim')} sabitken`, l2: `<b style="font-weight:900">${iR} grafiği düz çizgi mi?</b>`, s1: 7.0, s2: 7.0 },
  { id: 'r1', pre: 2.8, l1: `${rd('Akım')} ${bl('R')} ile ters orantılıdır`, l2: `${iR} grafiği hiperboldür`, s1: 6.0, s2: 5.6 },
  { id: 'v1', pre: 3.1, l1: `${bl('R')} sabitken ${iV} grafiği`, l2: `düz çizgidir, eğimi 1/${bl('R')}'dir`, s1: 5.8, s2: 5.6 },
  { id: 'v2', pre: 3.9, l1: `Her direncin kendi doğrusu vardır`, l2: `${bl('R')} büyüdükçe eğim azalır`, s1: 6.0, s2: 5.6 },
  { id: 'x1', pre: 4.3, l1: `Doğruların ${hl('V = 6 V')} çizgisiyle`, l2: `kesişimleri ${iR} hiperbolündedir`, s1: 6.0, s2: 5.6 },
];
const { Z, A, W: WR } = penTimeline(BEATS, { k: 1.0 });

// 'Bilmen gerekenler' kartı (bölüm 2f): x1'den sonra, aynı ekranda, satır satır kalemle yazılır
const KART = [
  { id: 'kh', html: `<span style="color:#7fe3ff">Bilmen gerekenler</span>`, y: 13.4, size: 4.6, weight: 900 },
  { id: 'k1', html: `• Omik dirençte ${iV} grafiği düz çizgidir`, y: 17.9 },
  { id: 'k2', html: `• Doğrunun eğimi 1/${bl('R')}'dir`, y: 21.5 },
  { id: 'k3', html: `• ${hl('Gerilim')} sabitken ${iR} grafiği hiperboldür`, y: 25.1 },
];
const KS = [Z.x1[1] - 1.7, Z.x1[1] - 0.4];   // devre yerinde hafifçe küçülür (kural 2a-16: karta yer), x1 okunurken
const KSC = 0.8;
{ let t = Z.x1[1] + 0.1; for (const k of KART) { k.t0 = t; k.t1 = t + penSec(k.html); t = k.t1 + 0.06; } }
const KEND = KART[KART.length - 1].t1;
const DUR = Math.ceil((KEND + Math.max(4.0, ...KART.map((k) => 1.2 + 0.35 * wordsOf({ l1: k.html }) - (KEND - k.t1)))) * 30) / 30;
for (const k of KART) check(DUR - k.t1 >= 1.2 + 0.35 * wordsOf({ l1: k.html }) - 1e-9, `kart ${k.id}: okuma süresi`);
check(DUR - KEND >= 4.0, 'kart en az 4 sn okunur kalır (2f-2)');
check(KS[0] >= WR.x1[1] + 1.0, 'küçülme x1 yazısı bittikten sonra');
check(DUR <= 60, `süre ≤ 60 sn (${DUR})`);
export const _T = { Z, A, W: WR, KART, DUR };

// ---------------------------------------------------------------- olaylar
const RS = [A.r1 + 0.2, A.r1 + 2.1];            // r1: V = 6 V sabit, R 3 → 1 kΩ (hiperbol izlenir)
check(RS[1] + 0.7 <= Z.r1[0] + 1e-9, 'r1: olaydan sonra yazı');
// i–V geçişleri: [t0, t1, R, Vbaş, Vson]; aralarda R, V uçta (0 veya 6 V) değişir
const P1 = [A.v1 + 0.2, A.v1 + 1.6, 1, 6, 0];   // 1 kΩ doğrusu (6 → 0 V)
const RA = [A.v2 + 0.1, A.v2 + 1.3];            // V = 0'da R 1 → 2 kΩ
const P2 = [A.v2 + 1.4, A.v2 + 2.9, 2, 0, 6];   // 2 kΩ doğrusu (0 → 6 V)
const RB = [Z.v2[0] + 0.0, Z.v2[0] + 0.0];      // (yer tutucu; 3 kΩ x1'in başında)
const RC = [A.x1 + 0.1, A.x1 + 1.3];            // V = 6 V'ta R 2 → 3 kΩ (akım 3 → 2 mA)
const P3 = [A.x1 + 1.4, A.x1 + 2.6, 3, 6, 0];   // 3 kΩ doğrusu (6 → 0 V)
const P3b = [A.x1 + 2.65, A.x1 + 3.35, 3, 0, 6];  // aynı doğru üzerinde geri 6 V'a
const VL = [A.x1 + 3.3, A.x1 + 3.75];            // V = 6 V dikey çizgisi
const FLY = [Z.x1[0] + 0.2, Z.x1[0] + 1.7];     // kesişim noktaları sağ grafiğe taşınır (aynı i)
const FULL = [FLY[1] + 0.1, FLY[1] + 1.0];      // hiperbol tüm R ekseninde
void RB;
check(P1[1] + 1.5 <= Z.v1[0] + 1e-9, 'v1: olaydan sonra ≥ 1,5 sn');
check(P2[1] + 1.0 <= Z.v2[0] + 1e-9, 'v2: olaydan sonra yazı');
check(P3b[1] <= Z.x1[0] + 1e-9 && VL[1] <= Z.x1[0], 'x1: doğrular ve dikey çizgi yazıdan önce');
check(FULL[1] <= KS[0], 'hiperbol karttan önce tamam');
const PASSES = [P1, P2, P3, P3b];

const Rof = (t) => {                              // kΩ
  if (t < A.v1) return 3 - 2 * easeInOut(seg(t, ...RS));
  if (t < A.x1) return 1 + easeInOut(seg(t, ...RA));
  return 2 + easeInOut(seg(t, ...RC));
};
const Vof = (t) => {                              // V
  for (let k = PASSES.length - 1; k >= 0; k--) { const p = PASSES[k]; if (t >= p[0]) return p[3] + (p[4] - p[3]) * easeInOut(seg(t, p[0], p[1])); }
  return VS;
};
const Iof = (t) => Vof(t) / Rof(t);               // mA
check(near(Rof(Z.r1[0]), 1) && near(Iof(Z.r1[0]), 6) && near(Vof(Z.r1[0]), 6), 'r1: 1 kΩ, 6 V, 6 mA');
check(near(Rof(0), 3) && near(Iof(0), 2), 'kanca: 3 kΩ, 2 mA');
check(near(Vof(Z.v1[0]), 0) && near(Iof(Z.v1[0]), 0), 'v1: 1 kΩ doğrusu 0 V\'a indi');
check(near(Rof(Z.v2[0]), 2) && near(Vof(Z.v2[0]), 6) && near(Iof(Z.v2[0]), 3), 'v2: 2 kΩ, 6 V, 3 mA');
check(near(Rof(Z.x1[0]), 3) && near(Vof(Z.x1[0]), 6) && near(Iof(Z.x1[0]), 2), 'x1: 3 kΩ, 6 V, 2 mA');
check(near(Iof(DUR - 0.1), 2), 'kart: 2 mA');

const VEL = (t) => 0.5 * Iof(t);
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += VEL(_t) * dt; _t += dt; }
  return _s + VEL(_t) * (t - _t);
};

export const meta = {
  title: 'Ohm kanunu ve i–V karakteristiği (Razavi ders 3)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 0.1, kind: 'hum', d: DUR - 0.5, gain: 0.09 },
    { t: RS[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: P1[1] - 0.05, kind: 'pop', gain: 0.11 },
    { t: RA[1] - 0.05, kind: 'click', gain: 0.11 },
    { t: P2[1] - 0.05, kind: 'pop', gain: 0.11 },
    { t: RC[1] - 0.05, kind: 'click', gain: 0.11 },
    { t: P3[1] - 0.05, kind: 'pop', gain: 0.11 },
    { t: VL[1], kind: 'thud', gain: 0.12 },
    { t: FLY[1] - 0.05, kind: 'pop', gain: 0.13 },
    { t: KS[1], kind: 'thud', gain: 0.1 },
  ],
};

// ---------------------------------------------------------------- grafik paneli (bölüm 2e)
// sol: i–V (V 0–8 V, i 0–8 mA), sağ: i–R (R 0–4 kΩ, i 0–8 mA). Gösterilen en büyük akım 6 mA → eksen içinde.
const GEO = { Wc: 1400, Hc: 710, top: 165, oy: 540, L: { ox: 120, right: 640, XMAX: 8, XST: 2 }, Rr: { ox: 830, right: 1350, XMAX: 4, XST: 1 }, YMAX: 8, YST: 2 };
const gx = (p, x) => p.ox + (x * (p.right - p.ox)) / p.XMAX;
const gy = (v) => GEO.oy - (v * (GEO.oy - GEO.top)) / GEO.YMAX;
check(near(gy(6), GEO.oy - 0.75 * (GEO.oy - GEO.top)) && 6 < GEO.YMAX, '6 mA eksenin %75\'inde');
check(near(gx(GEO.L, 6), GEO.L.ox + 0.75 * (GEO.L.right - GEO.L.ox)), '6 V, V ekseninin %75\'inde');
check(near(gx(GEO.Rr, 3), GEO.Rr.ox + 0.75 * (GEO.Rr.right - GEO.Rr.ox)), '3 kΩ, R ekseninin %75\'inde');
check(VS / 1.35 < 7.3 - 2.5 && near(VS / 0.75, 8), 'hiperbol R = 0,75 kΩ\'da eksen üstüne (8 mA) ulaşır');
const RED = '#ff5a4f', YEL = '#ffd23f', BLU = '#6fb2ff', INK = '#cfe3ea';
const LCOL = { 1: '#ff8a5c', 2: '#ff5a4f', 3: '#ff4f9a' };

function graphPanel() {
  const { Wc, Hc, top, oy, L, Rr } = GEO;
  const c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
  const k = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  let last = '';
  const axes = (p, xl, xcol, title) => {
    k.strokeStyle = 'rgba(120,190,210,0.12)'; k.lineWidth = 2;
    for (let s = p.XST; s <= p.XMAX; s += p.XST) { k.beginPath(); k.moveTo(gx(p, s), oy); k.lineTo(gx(p, s), top); k.stroke(); }
    for (let v = GEO.YST; v <= GEO.YMAX; v += GEO.YST) { k.beginPath(); k.moveTo(p.ox, gy(v)); k.lineTo(p.right, gy(v)); k.stroke(); }
    k.strokeStyle = INK; k.lineWidth = 5; k.beginPath(); k.moveTo(p.ox, top - 14); k.lineTo(p.ox, oy); k.lineTo(p.right + 16, oy); k.stroke();
    k.fillStyle = INK; k.font = '800 44px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'top';
    for (let s = 0; s <= p.XMAX; s += p.XST) k.fillText(String(s), gx(p, s), oy + 10);
    k.textAlign = 'right'; k.textBaseline = 'middle'; for (let v = 0; v <= GEO.YMAX; v += GEO.YST) k.fillText(String(v), p.ox - 14, gy(v));
    k.font = '800 46px "InterDisplay", sans-serif'; k.textAlign = 'left'; k.textBaseline = 'bottom'; k.fillStyle = RED; k.fillText('i (mA)', p.ox - 50, top - 24);
    k.fillStyle = xcol; k.textAlign = 'right'; k.textBaseline = 'top'; k.fillText(xl, p.right + 20, oy + 58);   // tik sayılarının altında, eğri ve etiketlerden ayrı
    k.fillStyle = '#7fe3ff'; k.font = '900 50px "InterDisplay", sans-serif'; k.textAlign = 'right'; k.textBaseline = 'bottom'; k.fillText(title, p.right + 20, top - 24);
  };
  const curve = (p, f, a, b, col, w = 9, dash = null) => {
    if (b <= a) return;
    k.save(); k.beginPath(); k.rect(p.ox, top - 6, p.right - p.ox + 8, oy - top + 6); k.clip();
    k.strokeStyle = col; k.lineWidth = w; k.lineJoin = 'round'; k.lineCap = 'round'; if (dash) k.setLineDash(dash); else { k.shadowColor = col; k.shadowBlur = 14; }
    k.beginPath(); for (let i = 0; i <= 120; i++) { const x = a + ((b - a) * i) / 120; const y = Math.min(f(x), GEO.YMAX + 0.3); i ? k.lineTo(gx(p, x), gy(y)) : k.moveTo(gx(p, x), gy(y)); }
    k.stroke(); k.restore();
  };
  const dot = (x, y, col = '#ffffff', r = 13, o = 1) => { k.globalAlpha = o; k.fillStyle = col; k.beginPath(); k.arc(x, y, r, 0, 7); k.fill(); k.globalAlpha = 1; };
  // st: {lines: [[R, Va, Vb]], hyp: [Ra, Rb], full: 0..1, chord: 0..1, vl: 0..1, fly: 0..1, pL: [V, i], pR: [R, i] | null, pRo, note: 0..1, rl: 0..1}
  const draw = (st) => {
    const key = JSON.stringify(st, (_, v) => (typeof v === 'number' ? Math.round(v * 1000) / 1000 : v)); if (key === last) return; last = key;
    k.clearRect(0, 0, Wc, Hc);
    k.fillStyle = 'rgba(14,20,24,0.92)'; k.strokeStyle = '#2b3d44'; k.lineWidth = 6;
    k.beginPath(); k.roundRect(6, 6, Wc - 12, Hc - 12, 28); k.fill(); k.stroke();
    k.strokeStyle = '#2b3d44'; k.lineWidth = 4; k.beginPath(); k.moveTo(735, 40); k.lineTo(735, Hc - 40); k.stroke();
    axes(L, 'V (V)', YEL, 'R sabit');
    axes(Rr, 'R (kΩ)', BLU, 'V = 6 V sabit');
    // sol: i–V doğruları (formülden: i = V/R), yalnızca izlenen aralık
    for (const [R, a, b] of st.lines) {
      curve(L, (v) => v / R, a, b, LCOL[R]);
      if (st.rl > 0 && b >= 5.9) { k.globalAlpha = st.rl; k.fillStyle = BLU; k.font = '800 40px "InterDisplay", sans-serif'; k.textAlign = 'left'; k.textBaseline = 'middle';
        k.fillText(`${R} kΩ`, gx(L, 6) + 22, gy(6 / R) - (R === 1 ? 0 : R === 2 ? 4 : -10)); k.globalAlpha = 1; }
    }
    // V = 6 V dikey kesik çizgi
    if (st.vl > 0) { k.save(); k.globalAlpha = st.vl; k.strokeStyle = YEL; k.lineWidth = 5; k.setLineDash([16, 12]);
      k.beginPath(); k.moveTo(gx(L, 6), oy); k.lineTo(gx(L, 6), gy(Math.max(0.01, 7.6 * st.vl))); k.stroke(); k.restore(); }
    // sağ: kıyas için kesik düz çizgi (1 kΩ, 6 mA)–(3 kΩ, 2 mA), sonra hiperbol i = 6/R
    if (st.chord > 0) { k.save(); k.globalAlpha = 0.75 * st.chord; k.strokeStyle = '#9aa6ad'; k.lineWidth = 4; k.setLineDash([14, 12]);
      k.beginPath(); k.moveTo(gx(Rr, 1), gy(6)); k.lineTo(gx(Rr, 3), gy(2)); k.stroke(); k.restore(); }
    if (st.full > 0) curve(Rr, (r) => VS / r, 4 - (4 - 0.7) * st.full, 4, RED, 6);
    curve(Rr, (r) => VS / r, st.hyp[0], st.hyp[1], RED);
    if (st.note > 0) { k.globalAlpha = st.note; k.fillStyle = INK; k.font = '700 44px "InterDisplay", sans-serif'; k.textAlign = 'left'; k.textBaseline = 'middle';
      k.fillText('doğrusal değil', gx(Rr, 1.35), gy(7.3)); k.globalAlpha = 1; }
    // kesişim noktaları: sol (6 V, i) → sağ (R, i); aynı yükseklik (aynı akım)
    if (st.vl > 0.99) for (const R of [1, 2, 3]) {
      const i = VS / R, x0 = gx(L, 6), x1 = gx(Rr, R), e = st.fly;
      dot(x0, gy(i), YEL, 12, 1);
      if (e > 0) { dot(x0 + (x1 - x0) * e, gy(i) - Math.sin(Math.PI * e) * 40, '#ffffff', 13, 1); }
    }
    dot(gx(L, st.pL[0]), gy(st.pL[1]));
    if (st.pR && st.pRo > 0) dot(gx(Rr, st.pR[0]), gy(st.pR[1]), '#ffffff', 13, st.pRo);
    tex.needsUpdate = true;
  };
  return { mat, draw };
}

// ---------------------------------------------------------------- yerleşim
const X = 1.1, ZH = 0.9, Y = 0.2;
const AMZ = -0.1, RL = 0.6, RZ = 0.0;
const GW = 2.4, GZ = -1.35, GYc = 0.9, GRX = -0.62;

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 8 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG); CG.userData.main = true;

  // bakır tel: güç kaynağı, ampermetre ve direnç aralıkları dışında kesintisiz
  const loop = roundedLoop([[-X, 0.5], [-X, ZH], [X, ZH], [X, -ZH], [-X, -ZH]]);   // başlangıç sol kenarda (aralıklar u = 0'ı kesmez)
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const gaps = [
    [Wc.uOf(-0.53, -ZH), Wc.uOf(0.53, -ZH)],
    [Wc.uOf(-X, AMZ - 0.2), Wc.uOf(-X, AMZ + 0.2)],
    [Wc.uOf(-RL / 2 - 0.02, ZH), Wc.uOf(RL / 2 + 0.02, ZH)],
  ].map(([a, b]) => [Math.min(a, b), Math.max(a, b)]).sort((p, q) => p[0] - q[0]);
  check(gaps.every(([a, b]) => b - a < 0.2), 'eleman aralıkları kısa (tel kesintisiz)');
  for (let i = 0; i < gaps.length; i++) {
    const a = gaps[i][1], b = i < gaps.length - 1 ? gaps[i + 1][0] : 1 + gaps[0][0];
    const pts = []; for (let j = 0; j <= 240; j++) pts.push(Wc.curve.getPointAt(((a + ((b - a) * j) / 240) % 1 + 1) % 1));
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 480, 0.03, 10), S.M.copper); mm.castShadow = true; CG.add(mm);
  }
  const inGap = (u) => gaps.some(([a, b]) => u > a + 0.004 && u < b - 0.004);

  const P = psu(S, { y: Y }); P.group.position.set(0, 0, -ZH); CG.add(P.group); P.group.userData.box = 'güç kaynağı';
  const AM = meter(S, 'A', RED, { w: 0.5, d: 0.36 }); AM.group.position.set(-X, 0, AMZ); CG.add(AM.group); AM.group.userData.box = 'ampermetre';
  const RX = resistor(S, { len: RL, radius: 0.14, bands: [0xe8231a, 0x111111, 0xe8231a, 0xd4af37], obstacles: 10 });
  const RG = new THREE.Group(); RG.position.set(0, 0, ZH); RG.rotation.y = Math.PI / 2; CG.add(RG);
  RX.group.position.set(0, Y, 0); RG.add(RX.group); RX.group.userData.box = 'direnç';
  const vaMat = new THREE.MeshPhysicalMaterial({ color: 0x6fb2ff, emissive: 0x2f6fff, emissiveIntensity: 0.6, roughness: 0.4 });
  const va = new THREE.Group();
  va.add(new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.62, 10), vaMat));
  const vh = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 14), vaMat); vh.position.y = 0.34; va.add(vh);
  va.rotation.set(-Math.PI / 2 + 0.75, 0, 0); va.position.set(0, Y + 0.12, 0); RG.add(va);

  const GP = graphPanel();
  const gm = new THREE.Mesh(new THREE.PlaneGeometry(GW, GW * GEO.Hc / GEO.Wc), GP.mat);
  gm.position.set(0, GYc, GZ); gm.rotation.x = GRX; CG.add(gm); gm.userData.box = 'grafik';

  // elektronlar
  const N = 48;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x1fcf5a, emissive: 0x14b84a, emissiveIntensity: 0.7, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.042, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const rr = S.rng(13);
  const PH = Array.from({ length: N }, () => [rr() * 6.28, rr() * 6.28, 5 + rr() * 4, 6 + rr() * 5]);

  // geleneksel akım oku (kırmızı, + → −): sağ kenarda −z yönünde
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, roughness: 0.35, transparent: true, opacity: 1 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.4, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.18, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.29; arrow.add(head);
  arrow.position.set(X - 0.3, 0.24, 0.05); arrow.rotation.y = -Math.PI / 2; CG.add(arrow); arrow.userData.box = 'akım oku';
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).z > 0.99, 'ok +z yönünde (sağ kenarda, + ucundan dirence)');

  const CD = 11.15, CE = 62, CX = 0.02, CT = -0.8;
  const ck = (t, a, dd) => [t, a, CD + dd, CE, CX, CT];
  const cam = camRig(S, [ck(0, 0.0, 0.1), ck(A.r1, 0.035, 0.0), ck(A.v1, -0.03, 0.05), ck(A.v2, 0.03, 0), ck(A.x1, -0.03, 0.05), ck(Z.x1[0], 0.02, 0), ck(DUR, 0.04, -0.05)]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 15.4, y2: 21.0 });

  return (t) => {
    cam(t);
    { const ks = 1 - (1 - KSC) * easeInOut(seg(t, ...KS)); CG.scale.setScalar(ks); CG.position.set(0, 0, ZH * (1 - ks)); }
    const r = Rof(t), v = Vof(t), i = Iof(t);
    // grafik durumu
    const lines = [];
    for (const p of PASSES) if (t >= p[0]) { const e = easeInOut(seg(t, p[0], p[1])); const vb = p[3] + (p[4] - p[3]) * e; lines.push([p[2], Math.min(p[3], vb), Math.max(p[3], vb)]); }
    const hypA = Math.min(3, r), hypB = 3;
    const atV = clamp((v - 5.95) / 0.05);       // sağ nokta yalnızca V = 6 V iken (i–R eğrisi 6 V içindir)
    GP.draw({ lines, hyp: [t < A.v1 ? hypA : 1, hypB], full: easeInOut(seg(t, ...FULL)), chord: fade(t, RS[1] + 0.2, A.v1 + 0.2, 0.4),
      vl: easeOut(seg(t, ...VL)), fly: easeInOut(seg(t, ...FLY)), pL: [v, i], pR: [r, i], pRo: atV * (t >= FLY[0] && t < FLY[1] ? 0 : 1),
      note: easeOut(seg(t, FULL[1], FULL[1] + 0.5)), rl: easeOut(seg(t, P1[1], P1[1] + 0.4)) });

    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = 0.03 * Math.sin(t * p[2] + p[0]) / Wc.L;
      const u = ((((k / N) + s / Wc.L + du) % 1) + 1) % 1;   // kaynak arka kenarda: elektronlar u artan yönde (− → +)
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z); if (bad) pv.set(0, -1, 0);
      pv.y += 0.012 * Math.sin(t * p[3] + p[1]);
      sv.setScalar(bad || inGap(u) ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    RX.body.emissiveIntensity = 0.06 + 0.03 * i + 0.03 * Math.sin(t * 9);
    vaMat.emissiveIntensity = 0.5 + 0.7 * (fade(t, RS[0], RS[1] + 0.5, 0.3) + fade(t, RA[0], RA[1] + 0.5, 0.3) + fade(t, RC[0], RC[1] + 0.5, 0.3));
    P.knob.rotation.y = -(v / 8) * 4.2;
    arrowMat.opacity = clamp(i / 1.5); arrow.visible = arrowMat.opacity > 0.02;

    AM.show.set(`${fmt(i, 2)} mA`);
    P.show.set(`${fmt(v, 2)} V`);

    yaz(t);
    for (const k of KART) S.text(k.id, k.html, { x: 47, y: k.y, size: k.size || 4.1, weight: k.weight || 700, align: 'left', maxWidth: 78, nowrap: true,
      opacity: t >= k.t0 ? easeOut(seg(t, k.t0 - 0.05, k.t0 + 0.2)) : 0, reveal: clamp((t - k.t0) / (k.t1 - k.t0)) });
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', `Ohm kanunu (${rd('i')} = ${hl('V')}/${bl('R')})`, { y: 24.7, size: 3.7, weight: 600, opacity: subO, nowrap: true });

    const on = (a, b) => fade(t, a, b, 0.3);
    label('lr', bl('R = ' + fmt(r, r % 1 < 1e-6 || r % 1 > 1 - 1e-6 ? 0 : 1) + ' kΩ'), 0, 0.3, ZH - 0.55, { opacity: on(0, KS[0]), size: 3.7 });
    label('le', gr('elektronlar'), -X + 0.42, 0.32, 0.42, { opacity: on(0.6, A.r1 + 2.0), size: 3.6 });
    label('la', rd('akım yönü'), X - 0.72, 0.3, -0.1, { opacity: on(1.0, A.r1 + 2.0), size: 3.6 });
    label('lp', hl('ayarlı güç kaynağı'), 0, 0.3, -ZH + 0.62, { opacity: on(A.v1, Z.v1[0]), size: 3.6 });
  };
}
