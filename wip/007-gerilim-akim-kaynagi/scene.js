// 007 — Gerilim kaynağı ve akım kaynağı. Temel Devre Teorisi I, ders 2 (Razavi, Basic Circuits Lec 2).
// Bölüm 2b: üniversite 1. sınıf düzeyi. Vurgulanan nokta: ideal akım kaynağı açık bırakılamaz (R → ∞ ⇒ V = i·R → ∞);
// ikilisi: ideal gerilim kaynağında R → 0 ⇒ i = V/R → ∞. Gerilim kaynağı V'yi, akım kaynağı i'yi yükten bağımsız sabit tutar.
// Devre: ideal kaynak (ön kenar, + ucu / ok yönü +x) + bıçaklı anahtar ve ampermetre (sol kenar) + ayarlı direnç (sağ kenar);
// voltmetre kaynağın uçlarında; arkada canlı I(R) / V(R) grafiği. Elektronlar yeşil (dış devrede − → +), geleneksel akım oku kırmızı (+ → −).
// Sahne geçişleri aynı kadrajda, kesme ile (kural 15). Ekrandaki tüm sayılar hesaplanır ve check() ile doğrulanır.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade, lerp } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, fmt, check, penTimeline, narrationPen } from '../../tools/lib/anlatim.js';
import { canvasTex, roundedLoop, closedWire, resistor, projLabel, camRig } from '../../tools/lib/parcalar.js';
import { makeSwitch, platform, phone } from '../../tools/lib/devre.js';
import { aaCell, carBattery } from '../../tools/lib/kaynaklar.js';

// ---------------------------------------------------------------- değerler
const VS = 6;                 // ideal gerilim kaynağı, V
const IS = 2;                 // ideal akım kaynağı, mA
const near = (a, b) => Math.abs(a - b) < 1e-9;
check(near(VS / 3, 2) && near(VS / 2, 3) && near(VS / 1, 6) && near(VS / 0.25, 24), 'gerilim kaynağı: 6 V / 3, 2, 1, 0,25 kΩ = 2, 3, 6, 24 mA');
check(near(IS * 1, 2) && near(IS * 2, 4) && near(IS * 3, 6), 'akım kaynağı: 2 mA × 1, 2, 3 kΩ = 2, 4, 6 V');

// ---------------------------------------------------------------- anlatım
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `${rd('Akım kaynağını')}`, l2: `<b style="font-weight:900">${hl('açık')} bırakırsan?</b>`, s1: 7.4, s2: 7.4, extra: 1.2 },
  { id: 'v1', pre: 6.7, l1: `Gerilim kaynağı: ${hl('V sabit')}`, l2: `${rd('i')} = ${hl('V')}/${bl('R')} → yüke bağlı`, s1: 6.0, s2: 5.4 },
  { id: 'v2', pre: 3.9, l1: `İdealde ${bl('R → 0')}: ${rd('i → ∞')}`, l2: 'gerçek pilde V düşer', s1: 6.2, s2: 5.2 },
  { id: 'c1', pre: 7.7, l1: `Akım kaynağı: ${rd('i sabit')}`, l2: `${hl('V')} = ${rd('i')}·${bl('R')} → yüke bağlı`, s1: 6.0, s2: 5.4 },
  { id: 'c2', pre: 5.0, l1: `Anahtar açık: ${bl('R → ∞')}`, l2: `${hl('V')} = ${rd('i')}·${bl('R')} → ${hl('∞')} (tanımsız)`, s1: 6.0, s2: 5.8 },
  { id: 'c3', pre: 0.5, l1: `${rd('Akım kaynağı')} asla`, l2: 'açık bırakılmaz', s1: 6.4, s2: 6.0 },
  { id: 'g1', pre: 4.15, l1: `Pil, akü ≈ ${hl('gerilim kaynağı')}`, l2: `Şarj, CC evresi ≈ ${rd('akım kaynağı')}`, s1: 5.6, s2: 5.4 },
  { id: 'f1', pre: 1.3, l1: `Gerilim kaynağı → ${hl('V sabit')}`, l2: `Akım kaynağı → ${rd('i sabit')}`, s1: 5.6, s2: 5.6 },
  { id: 'f2', pre: 0.3, l1: `${hl('V')} kaynağı + ${bl('R → 0')}: ${rd('i → ∞')}`, l2: `${rd('i')} kaynağı + açık: ${hl('V → ∞')}`, s1: 5.4, s2: 5.4, extra: 0.4 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A };
check(DUR <= 90, `süre ≤ 90 sn (${DUR})`);

// ---------------------------------------------------------------- olaylar
const RV1 = [A.v1 + 0.4, A.v1 + 2.0];       // 3 → 2 kΩ
const RV2 = [A.v1 + 3.55, A.v1 + 5.15];       // 2 → 1 kΩ
const RV3 = [A.v2 + 0.3, A.v2 + 2.4];       // 1 → 0,25 kΩ
const CUTC = A.c1;                          // kesme: gerilim kaynağı → akım kaynağı (aynı kadraj)
const RC1 = [A.c1 + 1.5, A.c1 + 3.1];       // 1 → 2 kΩ
const RC2 = [A.c1 + 4.65, A.c1 + 6.25];       // 2 → 3 kΩ
const SWO = [A.c2 + 0.3, A.c2 + 1.5];       // anahtar açılır (kontak SWO[0]'da kopar)
const VUP = [A.c2 + 1.3, A.c2 + 3.4];       // voltmetre büyür → ∞
const CUTG = A.g1 + 0.1, CUTF = A.f1 + 0.1; // gerçek hayat aralığı
const GM = [0, 1, 2].map((i) => CUTG + 0.3 + i * 0.85);
check(RV2[1] + 1.5 <= Z.v1[0] && RV3[1] + 1.5 <= Z.v2[0] && RC2[1] + 1.4 <= Z.c1[0] && VUP[1] + 1.5 <= Z.c2[0], 'her olaydan sonra ≥ 1,5 sn bekleme');
check(RV2[0] - RV1[1] >= 1.5 && RC2[0] - RC1[1] >= 1.5 && RC1[0] - CUTC >= 1.4, 'adımlar arası ≥ 1,5 sn');
check(GM[2] + 0.5 + 1.5 <= Z.g1[0] + 1e-9, 'gerçek hayat: son model belirdikten sonra etiket');

const isI = (t) => t >= CUTC;               // kaynak türü: akım kaynağı (c1'den sonra; gerçek hayattan sonra da)
const R = (t) => {                          // kΩ
  if (!isI(t)) return 3 - easeInOut(seg(t, ...RV1)) - easeInOut(seg(t, ...RV2)) - 0.75 * easeInOut(seg(t, ...RV3));
  if (t >= CUTF) return 3;
  return 1 + easeInOut(seg(t, ...RC1)) + easeInOut(seg(t, ...RC2));
};
const open = (t) => t >= SWO[0] && t < CUTF;           // ideal anahtar açık (yalnızca c2–g1 arası)
const swAng = (t) => (t >= CUTF ? 1 : 1 - easeInOut(seg(t, ...SWO)));
const I = (t) => (isI(t) ? (open(t) ? 0 : IS) : VS / R(t));            // mA
const vInf = (t) => easeInOut(seg(t, ...VUP));                          // 0..1: V → ∞ animasyonu
const V = (t) => (!isI(t) ? VS : open(t) ? IS * 3 + (1e4 - 6) * Math.pow(vInf(t), 3) : IS * R(t)); // V
check(near(R(Z.v1[0]), 1) && near(I(Z.v1[0]), 6) && V(Z.v1[0]) === 6, 'v1: R = 1 kΩ, i = 6 mA, V = 6 V');
check(near(R(Z.v2[0]), 0.25) && near(I(Z.v2[0]), 24), 'v2: R = 0,25 kΩ, i = 24 mA');
check(near(R(Z.c1[0]), 3) && I(Z.c1[0]) === 2 && near(V(Z.c1[0]), 6), 'c1: R = 3 kΩ, i = 2 mA, V = 6 V');
check(I(Z.c2[0]) === 0 && V(Z.c2[0]) > 9000, 'c2: açık → i = 0, V → ∞');
check(near(R(Z.f1[0]), 3) && I(Z.f1[0]) === 2 && !open(Z.f1[0]), 'f1: devre kapalı, 2 mA');

// görsel akış hızı ∝ akım (24 mA'de sınırlı)
const VEL = (t) => 0.32 * Math.min(I(t), 10) * (swAng(t) > 0.999 ? 1 : 0);
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += VEL(_t) * dt; _t += dt; }
  return _s + VEL(_t) * (t - _t);
};

// ---------------------------------------------------------------- efektler
export const meta = {
  title: 'Gerilim kaynağı ve akım kaynağı (Razavi ders 2)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 0.1, kind: 'hum', d: CUTC - 0.3, gain: 0.11 },
    { t: RV1[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: RV2[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: RV3[1] - 0.05, kind: 'pop', gain: 0.13 },
    { t: CUTC + 0.05, kind: 'thud', gain: 0.13 },
    { t: CUTC + 0.2, kind: 'hum', d: SWO[0] - CUTC - 0.3, gain: 0.11 },
    { t: RC1[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: RC2[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: SWO[0] + 0.02, kind: 'click', gain: 0.14 },
    { t: VUP[1], kind: 'thud', gain: 0.15 },
    ...GM.map((t) => ({ t: t + 0.35, kind: 'thud', gain: 0.11 })),
    { t: CUTF + 0.1, kind: 'hum', d: DUR - CUTF - 0.4, gain: 0.11 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.85, ZH = 0.95, Y = 0.2;
const SWG = 0.5, SWZ = 0.38;                // anahtar sol kenarda (ön yarı)
const AMZ = -0.42;                          // ampermetre sol kenarda (arka yarı)
const RL = 0.6, RZ = 0.0;                   // ayarlı direnç sağ kenarda
const CZ = -0.05;
const GW = 1.4;                             // grafik paneli genişliği

function lcd(w, h, color) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  let last = null;
  return { tex, set(txt, col = color) {
    const key = txt + col; if (key === last) return; last = key;
    g.fillStyle = '#0b1410'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#2c3a33'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `900 ${Math.round(h * 0.56)}px "InterDisplay", sans-serif`;
    g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 18; g.fillText(txt, w / 2, h / 2 + 6); g.shadowBlur = 0;
    tex.needsUpdate = true;
  } };
}

// ölçü aleti (V veya A): {group, show}
function meter(S, letter, color, { w = 0.6, d = 0.42 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, 0.22, d, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0xd8a326, roughness: 0.45, clearcoat: 0.3 }));
  body.position.y = 0.11; body.castShadow = true; g.add(body);
  const face = new THREE.Mesh(new RoundedBoxGeometry(w - 0.06, 0.02, d - 0.06, 2, 0.008), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.5 })); face.position.y = 0.225; g.add(face);
  const show = lcd(560, 220, color);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.68, w * 0.68 * 220 / 560), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(w * 0.1, 0.237, 0); g.add(scr);
  const vt = canvasTex(128, 128, (k) => { k.strokeStyle = '#fff'; k.lineWidth = 10; k.beginPath(); k.arc(64, 64, 52, 0, 7); k.stroke(); k.fillStyle = '#fff'; k.font = '900 72px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(letter, 64, 68); });
  const sym = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial({ map: vt, transparent: true })); sym.rotation.x = -Math.PI / 2; sym.position.set(-w * 0.37, 0.237, 0); g.add(sym);
  S.scene.add(g); return { group: g, show };
}

// ideal kaynak modülü (x ekseninde, + ucu / ok yönü +x): kind 'V' → daire içinde + −; 'I' → daire içinde ok
function source(S, kind, value) {
  const g = new THREE.Group();
  const shell = new THREE.MeshPhysicalMaterial({ color: 0x2a2e36, roughness: 0.38, clearcoat: 0.6, emissive: 0xff2a1a, emissiveIntensity: 0 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.3, 0.42, 4, 0.05), shell);
  body.position.y = 0.15; body.castShadow = body.receiveShadow = true; g.add(body);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 20), S.M.copper);
    post.rotation.z = Math.PI / 2; post.position.set(s * 0.46, Y, 0); post.castShadow = true; g.add(post);
  }
  const tex = canvasTex(1024, 500, (c, Wt, Ht) => {
    const cx = 330, cy = 250, r = 170;
    c.strokeStyle = kind === 'V' ? '#ffd23f' : '#ff5a4f'; c.lineWidth = 22; c.shadowColor = c.strokeStyle; c.shadowBlur = 20;
    c.beginPath(); c.arc(cx, cy, r, 0, 7); c.stroke();
    c.beginPath(); c.moveTo(cx - r - 120, cy); c.lineTo(cx - r, cy); c.moveTo(cx + r, cy); c.lineTo(cx + r + 120, cy); c.stroke();
    c.fillStyle = c.strokeStyle; c.font = '900 150px "InterDisplay", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    if (kind === 'V') { c.fillText('+', cx + 80, cy + 6); c.fillText('−', cx - 80, cy + 2); }
    else { c.beginPath(); c.moveTo(cx - 105, cy); c.lineTo(cx + 60, cy); c.stroke(); c.beginPath(); c.moveTo(cx + 115, cy); c.lineTo(cx + 45, cy - 55); c.lineTo(cx + 45, cy + 55); c.closePath(); c.fill(); }
    c.shadowBlur = 0; c.fillStyle = '#ffffff'; c.font = '900 170px "InterDisplay", sans-serif'; c.fillText(value, 800, cy + 8);
  });
  const top = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.39), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  top.rotation.x = -Math.PI / 2; top.position.y = 0.302; g.add(top);
  S.scene.add(g); return { group: g, shell };
}

// canlı grafik: mode 'V' → I(R) = 6/R hiperbolü; mode 'I' → V(R) = 2R doğrusu (+ açık devrede ∞)
function graphPanel(S) {
  const Wc = 1024, Hc = 590;
  const c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
  const k = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(GW, GW * Hc / Wc), mat);
  const ox = 130, oy = 470, RMAX = 4, YMAX = 8, sx = (Wc - 210) / RMAX, sy = 330 / YMAX;
  const px = (r) => ox + r * sx, py = (v) => oy - v * sy;
  let last = '';
  const draw = (mode, r, r0, inf) => {
    const key = `${mode}|${r.toFixed(3)}|${inf.toFixed(3)}`; if (key === last) return; last = key;
    k.clearRect(0, 0, Wc, Hc);
    k.fillStyle = 'rgba(14,20,24,0.92)'; k.strokeStyle = '#2b3d44'; k.lineWidth = 6;
    k.beginPath(); k.roundRect(6, 6, Wc - 12, Hc - 12, 26); k.fill(); k.stroke();
    k.strokeStyle = 'rgba(120,190,210,0.10)'; k.lineWidth = 2;
    for (let s = 1; s <= RMAX; s++) { k.beginPath(); k.moveTo(px(s), oy); k.lineTo(px(s), py(YMAX)); k.stroke(); }
    for (let v = 2; v <= YMAX; v += 2) { k.beginPath(); k.moveTo(ox, py(v)); k.lineTo(px(RMAX), py(v)); k.stroke(); }
    k.strokeStyle = '#cfe3ea'; k.lineWidth = 5; k.beginPath(); k.moveTo(ox, py(YMAX + 0.4)); k.lineTo(ox, oy); k.lineTo(px(RMAX + 0.15), oy); k.stroke();
    k.fillStyle = '#cfe3ea'; k.font = '800 38px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'top';
    for (let s = 0; s <= RMAX; s++) k.fillText(String(s), px(s), oy + 12);
    k.textAlign = 'right'; k.textBaseline = 'middle'; for (let v = 0; v <= YMAX; v += 2) k.fillText(String(v), ox - 16, py(v));
    k.font = '800 44px "InterDisplay", sans-serif'; k.textAlign = 'left';
    const col = mode === 'V' ? '#ff5a4f' : '#ffd23f';
    k.fillStyle = col; k.fillText(mode === 'V' ? 'i (mA)' : 'V (V)', ox + 14, py(YMAX + 0.1));
    k.fillStyle = '#6fb2ff'; k.textAlign = 'right'; k.fillText('R (kΩ)', px(RMAX + 0.15), oy - 34);
    const f = mode === 'V' ? (x) => VS / x : (x) => IS * x;
    // çizilen iz: r0'dan r'ye
    const a = Math.min(r, r0), b = Math.max(r, r0);
    k.save(); k.beginPath(); k.rect(ox, py(YMAX + 0.3), px(RMAX + 0.1) - ox, oy - py(YMAX + 0.3)); k.clip();
    k.strokeStyle = col; k.lineWidth = 9; k.lineJoin = 'round'; k.shadowColor = col; k.shadowBlur = 16; k.beginPath();
    for (let i = 0; i <= 120; i++) { const x = a + ((b - a) * i) / 120; const yy = py(Math.min(f(x), YMAX + 1)); i ? k.lineTo(px(x), yy) : k.moveTo(px(x), yy); }
    if (mode === 'I' && inf > 0) { const e = 3 + 1.2 * inf; k.lineTo(px(e), py(Math.min(IS * 3 + 6 * inf * 1.6, YMAX + 1))); }
    k.stroke(); k.shadowBlur = 0; k.restore();
    // nokta
    let dx = px(r), dy = py(Math.min(f(r), YMAX + 0.2));
    if (mode === 'I' && inf > 0) { dx = px(Math.min(3 + 1.2 * inf, RMAX + 0.05)); dy = py(Math.min(IS * 3 + 6 * inf * 1.6, YMAX + 0.2)); }
    k.fillStyle = '#ffffff'; k.beginPath(); k.arc(dx, dy, 12, 0, 7); k.fill();
    // ∞ işareti (taşma)
    const over = mode === 'V' ? clamp((f(r) - YMAX) / 4) : inf;
    if (over > 0) {
      k.globalAlpha = over; k.fillStyle = col; k.font = '900 64px "InterDisplay", sans-serif'; k.textAlign = 'left'; k.textBaseline = 'middle';
      k.fillText('→ ∞', mode === 'V' ? px(0.75) : px(2.0), py(YMAX - 0.9)); k.globalAlpha = 1;
    }
    tex.needsUpdate = true;
  };
  return { mesh: m, mat, draw };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 7 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG);

  // ------------------------------------------------ bakır tel: kaynak, anahtar, ampermetre ve direnç aralıkları boş
  const loop = roundedLoop([[0, -ZH], [-X, -ZH], [-X, ZH], [X, ZH], [X, -ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const gaps = [
    [Wc.uOf(-0.46, ZH), Wc.uOf(0.46, ZH)],
    [Wc.uOf(-X, SWZ - SWG / 2 + 0.02), Wc.uOf(-X, SWZ + SWG / 2 - 0.02)],
    [Wc.uOf(-X, AMZ - 0.2), Wc.uOf(-X, AMZ + 0.2)],
    [Wc.uOf(X, RZ - RL / 2 - 0.02), Wc.uOf(X, RZ + RL / 2 + 0.02)],
  ].map(([a, b]) => [Math.min(a, b), Math.max(a, b)]).sort((p, q) => p[0] - q[0]);
  check(gaps.every(([a, b]) => b - a < 0.2), 'eleman aralıkları kısa (tel kesintisiz)');
  for (let i = 0; i < gaps.length; i++) {
    const a = gaps[i][1], b = i < gaps.length - 1 ? gaps[i + 1][0] : 1 + gaps[0][0];
    const pts = []; for (let j = 0; j <= 240; j++) pts.push(Wc.curve.getPointAt(((a + ((b - a) * j) / 240) % 1 + 1) % 1));
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 480, 0.03, 10), S.M.copper); mm.castShadow = true; CG.add(mm);
  }
  const inGap = (u) => gaps.some(([a, b]) => u > a + 0.004 && u < b - 0.004);
  const swGap = [Wc.uOf(-X, SWZ - SWG / 2 + 0.02), Wc.uOf(-X, SWZ + SWG / 2 - 0.02)].sort((p, q) => p - q);

  const SV = source(S, 'V', '6 V'); SV.group.position.set(0, 0, ZH); CG.add(SV.group);
  const SI = source(S, 'I', '2 mA'); SI.group.position.set(0, 0, ZH); CG.add(SI.group);
  const SW = makeSwitch(S, { gap: SWG, y: Y }); SW.group.position.set(-X, 0, SWZ); CG.add(SW.group);
  const AM = meter(S, 'A', '#ff5a4f', { w: 0.5, d: 0.36 }); AM.group.position.set(-X, 0, AMZ); CG.add(AM.group);
  const RX = resistor(S, { len: RL, radius: 0.14, bands: [0xe8231a, 0x111111, 0xe8231a, 0xd4af37], obstacles: 10 });
  RX.group.position.set(X, Y, RZ); CG.add(RX.group);
  // ayarlı direnç oku (çapraz, mavi)
  const vaMat = new THREE.MeshPhysicalMaterial({ color: 0x6fb2ff, emissive: 0x2f6fff, emissiveIntensity: 0.6, roughness: 0.4 });
  const va = new THREE.Group();
  const vs = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.62, 10), vaMat); va.add(vs);
  const vh = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 14), vaMat); vh.position.y = 0.34; va.add(vh);
  CG.add(va);
  va.rotation.set(-Math.PI / 2 + 0.75, 0, 0); va.position.set(X, Y + 0.12, RZ);

  // voltmetre kaynağın uçlarında
  const VM = meter(S, 'V', '#ffd23f'); VM.group.position.set(0, 0, 0.3); CG.add(VM.group);
  const leadMat = (col) => new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.5 });
  const mkLead = (from, to, mat) => {
    const mid = from.clone().lerp(to, 0.5); mid.y += 0.25;
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(from, mid, to), 40, 0.014, 8), mat); CG.add(mm); return mm;
  };
  mkLead(new THREE.Vector3(0.22, 0.2, 0.4), new THREE.Vector3(0.46, Y + 0.05, ZH - 0.02), leadMat(0xe8231a));
  mkLead(new THREE.Vector3(-0.22, 0.2, 0.4), new THREE.Vector3(-0.46, Y + 0.05, ZH - 0.02), leadMat(0x202226));

  const GP = graphPanel(S);
  GP.mesh.position.set(0, 0.5, -ZH - 0.32); GP.mesh.rotation.x = -0.8; CG.add(GP.mesh);

  // elektronlar
  const N = 44;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x1fcf5a, emissive: 0x14b84a, emissiveIntensity: 0.7, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.042, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const rr = S.rng(11);
  const PH = Array.from({ length: N }, () => [rr() * 6.28, rr() * 6.28, 5 + rr() * 4, 6 + rr() * 5]);

  // geleneksel akım oku (kırmızı, + → −): sağ kenarda −z yönünde
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.4, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.18, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.29; arrow.add(head);
  arrow.position.set(X - 0.3, 0.24, 0.6); arrow.rotation.y = Math.PI / 2; CG.add(arrow);
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).z < -0.99, 'ok −z yönünde (sağ kenarda + → −)');

  // ------------------------------------------------ gerçek hayat (aynı kadrajda): AA pil, araba aküsü, şarj olan telefon
  const LG = new THREE.Group(); scene.add(LG); LG.visible = false; LG.scale.setScalar(1.05);
  const PX = [-0.8, 0, 0.8];
  const lw = (x, y, z) => [x * 1.05, y * 1.05, z * 1.05];   // LG yerelinden dünyaya
  const models = [];
  PX.forEach((x, i) => { const p = platform(S, x, 0.15, { r: 0.42 }); LG.add(p); });
  const aa = aaCell(S); aa.group.position.set(PX[0], 0.06, 0.15); aa.group.rotation.y = 0.35; LG.add(aa.group); models.push(aa.group);
  const cb = carBattery(S); cb.group.position.set(PX[1], 0.06, 0.15); cb.group.scale.setScalar(0.95); LG.add(cb.group); models.push(cb.group);
  const ph = phone(S); ph.group.position.set(PX[2], 0.06, 0.15); ph.group.scale.setScalar(0.85); ph.group.rotation.y = -0.3; LG.add(ph.group); models.push(ph.group);

  const cam = camRig(S, [
    [0, 0.0, 10.6, 58, 0, CZ], [A.v1, 0.05, 10.5, 58, 0, CZ], [A.v2, -0.04, 10.4, 59, 0, CZ], [A.c1, 0.04, 10.5, 58, 0, CZ],
    [A.c2, -0.05, 10.4, 58, 0, CZ], [A.g1, 0.04, 10.5, 59, 0, CZ], [A.f1, -0.04, 10.4, 58, 0, CZ], [DUR, 0.05, 10.3, 59, 0, CZ],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 16, y2: 22.5 });

  return (t) => {
    cam(t);
    const life = t >= CUTG && t < CUTF;
    CG.visible = !life; LG.visible = life;
    const ik = isI(t);
    SV.group.visible = !ik; SI.group.visible = ik;
    SW.set(swAng(t));
    const r = R(t), i = I(t), v = V(t), inf = ik && open(t) ? vInf(t) : 0;
    GP.draw(ik ? 'I' : 'V', r, ik ? 1 : 3, inf);
    GP.mat.opacity = 1;

    // elektronlar: akım varken − → + akar; açık anahtarda durur, yerinde titrer
    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = 0.03 * Math.sin(t * p[2] + p[0]) / Wc.L;
      const u = ((((k / N) - s / Wc.L + du) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z); if (bad) pv.set(0, -1, 0);
      pv.y += 0.012 * Math.sin(t * p[3] + p[1]);
      const hide = bad || (inGap(u) && !(u > swGap[0] && u < swGap[1] && swAng(t) > 0.999)) || (u > swGap[0] && u < swGap[1] && swAng(t) < 0.999);
      sv.setScalar(hide ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    RX.body.emissiveIntensity = i > 0 ? 0.12 + 0.05 * r + 0.04 * Math.sin(t * 9) : 0.02;
    vaMat.emissiveIntensity = 0.5 + 0.6 * (fade(t, RV1[0], RV2[1] + 0.6, 0.3) + fade(t, RV3[0], RV3[1] + 0.6, 0.3) + fade(t, RC1[0], RC2[1] + 0.6, 0.3));
    SI.shell.emissiveIntensity = inf > 0 ? 0.6 * inf * (0.75 + 0.25 * Math.sin(t * 7)) : 0;
    SV.shell.emissiveIntensity = 0;

    const aOp = i > 0 ? 1 - easeOut(seg(t, SWO[0], SWO[0] + 0.3)) * (open(t) ? 1 : 0) : 0;
    arrowMat.opacity = clamp(aOp) * easeOut(seg(t, 0.3, 0.8)); arrow.visible = arrowMat.opacity > 0.01;

    // ölçü aletleri
    AM.show.set(`${fmt(i, i >= 10 ? 1 : 2)} mA`);
    VM.show.set(inf >= 0.98 ? '∞ V' : v >= 100 ? `${Math.round(v)} V` : `${fmt(v, 2)} V`, inf > 0 ? '#ff6b3f' : '#ffd23f');

    // gerçek hayat modelleri sırayla
    models.forEach((g, k) => { const o = easeOut(seg(t, GM[k], GM[k] + 0.5)); g.visible = life && o > 0.01; g.scale.setScalar(Math.max(0.001, o) * (k === 1 ? 0.95 : k === 2 ? 0.85 : 1)); g.position.y = 0.06 + (1 - o) * 0.25; });

    yaz(t);

    // kanca alt satırı
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', 'İdeal kaynak: ne sabit kalır?', { y: 27.3, size: 4.4, weight: 600, opacity: subO, nowrap: true });

    // nesne etiketleri
    const onC = (a, b) => (life ? 0 : fade(t, a, b, 0.3));
    label('lsv', hl('ideal gerilim kaynağı'), 0, 0.72, ZH + 0.05, { opacity: onC(0, CUTC), size: 3.7 });
    label('lsi', rd('ideal akım kaynağı'), 0, 0.72, ZH + 0.05, { opacity: onC(CUTC, DUR + 1), size: 3.7 });
    label('lr', `${bl('R = ' + fmt(r, r < 1 ? 2 : 1).replace(',0', '') + ' kΩ')}`, X - 0.05, 0.62, RZ - 0.05, { opacity: onC(0, CUTG) + onC(CUTF, DUR + 1), size: 3.9 });
    label('le', gr('elektronlar'), -0.25, 0.32, -ZH + 0.18, { opacity: onC(0.6, A.v1 + 1.5), size: 3.6 });
    label('la', rd('akım yönü'), X - 0.5, 0.42, 0.62, { opacity: onC(1.0, A.v1 + 1.5), size: 3.6 });
    label('lsw', 'anahtar', -X + 0.05, 0.6, SWZ + 0.05, { opacity: onC(A.c1 + 0.3, Z.c1[0]) + onC(A.c2, A.c2 + 1.8), size: 3.6 });
    label('lop', bl('açık devre'), -X + 0.1, 0.62, SWZ, { opacity: onC(SWO[1], CUTG), size: 3.8 });
    label('lm1', hl('≈ gerilim kaynağı'), ...lw(lerp(PX[0], PX[1], 0.5), 0.95, 0.15), { opacity: life ? easeOut(seg(t, GM[1] + 0.5, GM[1] + 0.9)) : 0, size: 3.8 });
    label('lm2', rd('≈ akım kaynağı'), ...lw(PX[2] - 0.15, 0.95, 0.15), { opacity: life ? easeOut(seg(t, GM[2] + 0.5, GM[2] + 0.9)) : 0, size: 3.8 });
    label('lpn', 'AA pil', ...lw(PX[0], 0.55, -0.35), { opacity: life ? easeOut(seg(t, GM[0] + 0.3, GM[0] + 0.7)) : 0, size: 3.4 });
    label('lpk', 'akü', ...lw(PX[1], 0.62, -0.35), { opacity: life ? easeOut(seg(t, GM[1] + 0.3, GM[1] + 0.7)) : 0, size: 3.4 });
    label('lpt', 'şarj', ...lw(PX[2], 0.55, -0.35), { opacity: life ? easeOut(seg(t, GM[2] + 0.3, GM[2] + 0.7)) : 0, size: 3.4 });
  };
}
