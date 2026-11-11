// 005 — Akım, gerilim ve direnç arasındaki ilişki (Ohm yasası). 4'lü serinin 4. videosu.
// Animasyon anlatır, yazı kalemle yazılarak doğrular (AGENT.md 2a). Elektronlar yeşil, dış devrede − → +; geleneksel akım oku kırmızı, + → −.
// Devre: ayarlı güç kaynağı (V) + ampul (30 Ω, sabit kabul) + ampermetre (I) + sol kenarda eklenip çıkarılan 30 Ω direnç.
// I = V / R_toplam her karede hesaplanır; ekrandaki tüm sayılar bu hesaptan gelir ve check() ile doğrulanır.
// Sahne geçişleri aynı kadrajda, kesme ile (kural 15): devre → gerçek hayat (aynı yerde) → devre.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade, lerp } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, fmt, check, penTimeline, narrationPen } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, resistor, projLabel, camRig } from '../../tools/lib/parcalar.js';
import { makeBulb, platform } from '../../tools/lib/devre.js';
import { aaCell, carBattery } from '../../tools/lib/kaynaklar.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `${hl('Gerilim')} 2 katına çıkarsa`, l2: `<b style="font-weight:900">${rd('akım')} ne olur?</b>`, s1: 6.6, s2: 7.0, extra: 1.6 },
  { id: 'm1', pre: 1.2, l1: `Ampermetre ${rd('akımı')} ölçer`, s1: 6.2 },
  { id: 'v1', pre: 3.9, l1: `${hl('Gerilim')} 2 katı → ${rd('akım')} 2 katı`, l2: `${bl('Direnç')} aynı · ampul parlar`, s1: 5.8, s2: 5.2 },
  { id: 'v2', pre: 3.7, l1: `${hl('Gerilim')} yarıya → ${rd('akım')} yarıya`, s1: 6.0 },
  { id: 'r1', pre: 5.8, l1: `${bl('Direnç')} 2 katı → ${rd('akım')} yarıya`, l2: `${hl('Gerilim')} aynı · ampul kararır`, s1: 5.8, s2: 5.2 },
  { id: 'r2', pre: 3.7, l1: `${bl('Direnç')} azalır → ${rd('akım')} artar`, s1: 6.0 },
  { id: 'g1', pre: 4.3, l1: 'Aynı ampul, farklı kaynak', l2: `${hl('Gerilim')} büyük → ${rd('akım')} büyük`, s1: 6.0, s2: 5.2 },
  { id: 'f1', pre: 1.8, l1: `Ohm yasası: ${hl('V')} = ${rd('I')} × ${bl('R')}`, l2: `${hl('V')}: gerilim · ${rd('I')}: akım · ${bl('R')}: direnç`, s1: 6.4, s2: 4.6 },
  { id: 'f2', pre: 0.2, l1: `yani ${rd('I')} = ${hl('V')} ÷ ${bl('R')}`, l2: `${hl('9 V')} ÷ ${bl('30 Ω')} = ${rd('0,30 A')}`, s1: 6.6, s2: 5.8, extra: 0.4 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A };

// ---------------------------------------------------------------- olaylar: gerilim V(t), toplam direnç R(t), akım I = V / R
const R_B = 30, R_X = 30;                               // ampul (sabit kabul) ve eklenen direnç, Ω
const VUP1 = [A.v1 + 0.5, A.v1 + 2.1];                  // 4,5 → 9 V
const VDN = [A.v2 + 0.4, A.v2 + 2.0];                   // 9 → 4,5 V
const VUP2 = [A.r1 + 0.3, A.r1 + 1.7];                  // 4,5 → 9 V (direnç sahnesi 9 V'ta)
const RIN = [A.r1 + 2.6, A.r1 + 4.2];                   // 30 Ω direnç devreye girer
const ROUT = [A.r2 + 0.4, A.r2 + 2.0];                  // direnç çıkar
const CUT1 = A.g1 + 0.3, CUT2 = A.f1 + 0.2;             // aynı kadrajda kesme: devre → gerçek hayat → devre
const GB = [0, 1, 2].map((i) => A.g1 + 0.7 + i * 0.7);  // gerçek hayat ampulleri sırayla yanar
const V = (t) => 4.5 + 4.5 * (easeInOut(seg(t, ...VUP1)) - easeInOut(seg(t, ...VDN)) + easeInOut(seg(t, ...VUP2)));
const rx = (t) => easeInOut(seg(t, ...RIN)) - easeInOut(seg(t, ...ROUT));     // direncin devredeki payı 0..1
const R = (t) => R_B + R_X * (rx(t) > 0.5 ? 1 : 0);    // direnç ya devrede ya değil (yerine oturduğu anda)
const Rs = (t) => R_B + R_X * clamp((rx(t) - 0.35) / 0.3); // akış için yumuşak geçiş (yerine otururken)
const I = (t) => V(t) / Rs(t);
const near = (a, b) => Math.abs(a - b) < 1e-9;
check(near(I(0), 0.15) && near(I(Z.m1[0]), 0.15), 'başlangıç: 4,5 V / 30 Ω = 0,15 A');
check(near(V(Z.v1[0]), 9) && near(I(Z.v1[0]), 0.30), 'v1: 9 V / 30 Ω = 0,30 A (2 katı)');
check(near(V(Z.v2[0]), 4.5) && near(I(Z.v2[0]), 0.15), 'v2: 4,5 V → 0,15 A');
check(near(V(Z.r1[0]), 9) && R(Z.r1[0]) === 60 && near(I(Z.r1[0]), 0.15), 'r1: 9 V / 60 Ω = 0,15 A (yarıya)');
check(R(Z.r2[0]) === 30 && near(I(Z.r2[0]), 0.30), 'r2: 9 V / 30 Ω = 0,30 A');
check(near(V(Z.f2[0]), 9) && R(Z.f2[0]) === 30 && near(9 / 30, 0.3) && near(0.3 * 30, 9), 'f2: I = 9 / 30 = 0,30 A; V = I × R');
check(VUP1[1] + 1.5 <= Z.v1[0] && VDN[1] + 1.5 <= Z.v2[0] && RIN[1] + 1.5 <= Z.r1[0] && ROUT[1] + 1.5 <= Z.r2[0], 'her olaydan sonra ≥ 1,5 sn bekleme');
check(GB[2] + 0.6 + 1.5 <= Z.g1[0] + 0.01, 'gerçek hayat: son ampul yandıktan sonra etiket');
const LIFE = [[1.5, 'AA pil'], [9, '9 V pil'], [12, 'araba aküsü']].map(([v, n]) => ({ v, n, i: v / R_B }));
check(near(LIFE[0].i, 0.05) && near(LIFE[1].i, 0.3) && near(LIFE[2].i, 0.4), 'gerçek hayat: 1,5/30 = 0,05; 9/30 = 0,30; 12/30 = 0,40 A');

const V0 = 0.85 / 0.30;                                 // görsel sürüklenme hızı ∝ akım (0,30 A → 0,85 birim/sn)
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += V0 * I(_t) * dt; _t += dt; }
  return _s + V0 * I(_t) * (t - _t);
};
const glowOf = (i) => Math.min(1.25, Math.pow(i / 0.30, 1.3));   // ampul parlaklığı (güç I²R ile artar; görsel ölçek)

// ---------------------------------------------------------------- efektler (olaylara bağlı, yumuşak)
export const meta = {
  title: 'Akım, gerilim ve direnç arasındaki ilişki (Ohm yasası)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 0.1, kind: 'hum', d: CUT1 - 0.2, gain: 0.18 },
    { t: A.m1 + 0.5, kind: 'pop', gain: 0.14 },
    { t: VUP1[1], kind: 'pop', gain: 0.16 },
    { t: VDN[1], kind: 'pop', gain: 0.14 },
    { t: VUP2[1], kind: 'pop', gain: 0.14 },
    { t: RIN[1] - 0.1, kind: 'thud', gain: 0.2 },
    { t: ROUT[1] - 0.1, kind: 'thud', gain: 0.18 },
    ...GB.map((g) => ({ t: g, kind: 'pop', gain: 0.13 })),
    { t: CUT2 + 0.1, kind: 'hum', d: DUR - CUT2 - 0.4, gain: 0.18 },
    { t: A.f1 + 1.0, kind: 'thud', gain: 0.15 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                    // devre dikdörtgeni (x sağ, z izleyiciye)
const MZ = -0.15;                                     // ampermetre sağ kenarda
const RZ = 0.35, RL = 0.6;                            // eklenen direnç sol kenarda
const LX = [-0.8, 0, 0.8];
const CZ = -0.05;                                       // kamera hedefi: devre ekranın y %32–66 bandında                            // gerçek hayat platformları

// LCD gösterge dokusu: lcd(w,h,renk) → {tex, set(yazı)}; yazı değişince yeniden çizilir
function lcd(w, h, color) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  let last = null;
  return { tex, set(txt) {
    if (txt === last) return; last = txt;
    g.fillStyle = '#0b1410'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#2c3a33'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `900 ${Math.round(h * 0.62)}px "InterDisplay", sans-serif`;
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 18; g.fillText(txt, w / 2, h / 2 + 6); g.shadowBlur = 0;
    tex.needsUpdate = true;
  } };
}

// Ayarlı güç kaynağı (x ekseninde, + ucu +x): {group, show, knob, glow}
function psu(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.42, 0.5, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0x2b2f36, roughness: 0.42, clearcoat: 0.4 }));
  body.position.y = 0.21; body.castShadow = body.receiveShadow = true; g.add(body);
  const show = lcd(512, 220, '#ffd23f');
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.215), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(-0.12, 0.422, 0.02); g.add(scr);
  const knob = new THREE.Group();
  const kb = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.07, 32), new THREE.MeshPhysicalMaterial({ color: 0x15171a, roughness: 0.35, clearcoat: 0.6 })); kb.position.y = 0.035; knob.add(kb);
  const mark = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 0.07), new THREE.MeshBasicMaterial({ color: 0xffd23f })); mark.position.set(0, 0.075, -0.04); knob.add(mark);
  knob.position.set(0.3, 0.42, 0.02); g.add(knob);
  const glow = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.3, roughness: 0.4 });
  const tP = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 20), glow); tP.rotation.z = Math.PI / 2; tP.position.set(0.53, Y, 0); g.add(tP);
  const tN = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 20), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.4 })); tN.rotation.z = Math.PI / 2; tN.position.set(-0.53, Y, 0); g.add(tN);
  const sign = lcd(256, 128, '#ffffff'); // + / − işaretleri kasada
  const pm = (txt, col, x) => { const c = document.createElement('canvas'); c.width = 128; c.height = 128; const k = c.getContext('2d'); k.fillStyle = col; k.font = '900 120px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(txt, 64, 70);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.423, 0.17); g.add(m); };
  pm('+', '#ff5a4f', 0.42); pm('−', '#6fb2ff', -0.42); void sign;
  S.scene.add(g); return { group: g, show, knob, glow };
}

// Ampermetre (tel z ekseninde içinden geçer): {group, show}
function ammeter(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.3, 0.56, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0xd8a326, roughness: 0.45, clearcoat: 0.3 }));
  body.position.y = 0.15; body.castShadow = true; g.add(body);
  const face = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.02, 0.5, 2, 0.008), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.5 })); face.position.y = 0.305; g.add(face);
  const show = lcd(512, 220, '#ff5a4f');
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.19), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(0, 0.318, -0.08); g.add(scr);
  const c = document.createElement('canvas'); c.width = 128; c.height = 128; const k = c.getContext('2d');
  k.strokeStyle = '#ffffff'; k.lineWidth = 10; k.beginPath(); k.arc(64, 64, 52, 0, 7); k.stroke(); k.fillStyle = '#fff'; k.font = '900 72px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText('A', 64, 68);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
  const sym = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); sym.rotation.x = -Math.PI / 2; sym.position.set(0, 0.318, 0.15); g.add(sym);
  S.scene.add(g); return { group: g, show };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 13 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG);          // devre grubu (kesmeyle gizlenir/gösterilir)

  // ------------------------------------------------ devre: bakır tel (sol kenarda direnç aralığı boş + köprü teli)
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const uA = Wc.uOf(-X, RZ - RL / 2 - 0.03), uB = Wc.uOf(-X, RZ + RL / 2 + 0.03);
  const lo = Math.min(uA, uB), hi = Math.max(uA, uB);
  { const pts = []; for (let i = 0; i <= 400; i++) pts.push(Wc.curve.getPointAt((hi + ((1 - hi + lo) * i) / 400) % 1));
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 800, 0.03, 10), S.M.copper); m.castShadow = true; CG.add(m); }
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, RL + 0.08, 10), S.M.copper); bridge.rotation.x = Math.PI / 2; bridge.position.set(-X, Y, RZ); CG.add(bridge);
  const P = psu(S); P.group.position.set(0, 0, ZH); CG.add(P.group);
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH); CG.add(bulb.group);
  const AM = ammeter(S); AM.group.position.set(X, 0, MZ); CG.add(AM.group);
  const RX = resistor(S, { len: RL, radius: 0.15, bands: [0xff7a00, 0x111111, 0x111111, 0xd4af37], obstacles: 12 });
  RX.group.position.set(-X, Y, RZ); CG.add(RX.group);
  const ring = (r, col, pos, sy = 1) => { const mt = new THREE.MeshPhysicalMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, transparent: true, opacity: 0, depthWrite: false });
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.022, 10, 60), mt); m.rotation.x = Math.PI / 2; m.scale.set(1, sy, 1); m.position.copy(pos); CG.add(m); return mt; };
  const mRing = ring(0.42, 0xff5a4f, new THREE.Vector3(X, 0.04, MZ), 1.35);
  const vRing = ring(0.68, 0xffd23f, new THREE.Vector3(0, 0.04, ZH), 0.6);
  const rRing = ring(0.45, 0x6fb2ff, new THREE.Vector3(-X, 0.04, RZ), 1.3);

  // ------------------------------------------------ elektronlar (yeşil): eğrinin ters yönünde (− → +), hız ∝ akım
  const N = 46;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 1.1, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const r = S.rng(5);
  const PH = Array.from({ length: N }, () => [r() * 6.28, r() * 6.28, 5 + r() * 4, 6 + r() * 5]);

  // ------------------------------------------------ geleneksel akım oku (kırmızı, + → −): sol kenar içinde, +z yönüne
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.6, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.8, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.5; arrow.add(head);
  arrow.position.set(-X + 0.36, 0.25, -0.55); arrow.rotation.y = -Math.PI / 2; CG.add(arrow);
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).z > 0.99, 'ok +z yönünde (sol kenarda + → −)');

  // ------------------------------------------------ gerçek hayat: aynı yerde üç kaynak, her birine aynı ampul bağlı
  const LG = new THREE.Group(); scene.add(LG); LG.visible = false;
  const SRC = [];
  const lifeBulbs = LIFE.map((L, i) => {
    LG.add(platform(S, LX[i], 0.0, { r: 0.38 }));
    const src = i === 0 ? aaCell(S, { len: 0.62, r: 0.11 }) : i === 1 ? battery(S, { len: 0.62, h: 0.24, w: 0.26, y: 0.12 }) : carBattery(S);
    src.group.position.set(LX[i], 0.08, 0.16); src.group.scale.setScalar(i === 2 ? 0.72 : 0.85); LG.add(src.group); SRC.push(src.group);
    const b = makeBulb(S, { scale: 0.62 }); b.group.position.set(LX[i], 0.08, -0.22); LG.add(b.group);
    for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.34, 8), S.M.copper); w.rotation.x = Math.PI / 2; w.position.set(LX[i] + s * 0.1, 0.12, -0.04); LG.add(w); }
    return b;
  });

  // ------------------------------------------------ kamera: yerinde, çok yavaş (kadraj sahneden sahneye taşınmaz)
  const cam = camRig(S, [
    [0, 0.0, 12.2, 62, 0, CZ], [A.m1, 0.06, 12.0, 62, 0, CZ], [A.v1, -0.05, 11.8, 63, 0, CZ], [A.v2, 0.05, 11.9, 62, 0, CZ],
    [A.r1, -0.06, 11.8, 62, 0, CZ], [A.r2, 0.05, 11.9, 63, 0, CZ], [A.g1, -0.05, 11.7, 62, 0, CZ], [A.f1, 0.06, 11.9, 62, 0, CZ],
    [DUR, -0.05, 11.6, 63, 0, CZ],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 16, y2: 23 });

  return (t) => {
    cam(t);
    const life = t >= CUT1 && t < CUT2;
    CG.visible = !life; LG.visible = life;
    const i = I(t), v = V(t), x = rx(t);
    bulb.set(glowOf(i) * (1 + 0.02 * Math.sin(t * 13)));
    P.show.set(`${fmt(Math.round(v * 10) / 10)} V`);
    AM.show.set(`${fmt(Math.round(i * 100) / 100, 2)} A`);
    P.knob.rotation.y = -(v - 4.5) / 4.5 * 2.2;
    P.glow.emissiveIntensity = 0.3 + 0.9 * (v - 4.5) / 4.5;

    // direnç: yerinde büyüyerek oturur (sahne içi animasyon), köprü teli aynı anda incelir ve kaybolur
    const xs = easeOut(clamp(x * 1.1));
    RX.group.visible = x > 0.004; RX.group.scale.setScalar(Math.max(0.001, xs)); RX.group.position.y = Y + (1 - xs) * 0.35;
    bridge.visible = x < 0.996; bridge.scale.set(Math.max(0.001, 1 - x), 1, Math.max(0.001, 1 - x));
    RX.body.emissiveIntensity = 0.5 * fade(t, RIN[1], Z.r1[1], 0.4);

    // vurgu halkaları
    mRing.opacity = 0.85 * fade(t, A.m1 + 0.2, Z.m1[1], 0.35);
    vRing.opacity = 0.85 * (fade(t, VUP1[0], VUP1[1] + 1.2, 0.35) + fade(t, VDN[0], VDN[1] + 1.2, 0.35));
    rRing.opacity = 0.85 * (fade(t, RIN[0], RIN[1] + 1.2, 0.35) + fade(t, ROUT[0], ROUT[1] + 1.2, 0.35));

    // elektronlar: hafif titreşim + akış (− → +); güç kaynağı ve ampermetre kasasının içinde gizli
    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = 0.025 * Math.sin(t * p[2] + p[0]) / Wc.L;
      const u = ((((k / N) - s / Wc.L + du) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z); if (bad) pv.set(0, -1, 0);
      pv.y += 0.012 * Math.sin(t * p[3] + p[1]);
      const hidden = (Math.abs(pv.x) < 0.56 && pv.z > ZH - 0.2) || (Math.abs(pv.x - X) < 0.29 && Math.abs(pv.z - MZ) < 0.29);
      sv.setScalar(hidden || bad ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;

    // akım oku: m1'den itibaren; parlaklık akımla
    const aOp = easeOut(seg(t, A.m1 + 1.6, A.m1 + 2.1));
    arrowMat.opacity = aOp; arrow.visible = aOp > 0.01; arrowMat.emissiveIntensity = 0.3 + 1.2 * i / 0.3;

    // gerçek hayat ampulleri sırayla yanar (I = V / 30 Ω)
    SRC.forEach((g, k) => { g.rotation.y = 0.18 * Math.sin(t * 0.7 + k * 2); });
    lifeBulbs.forEach((b, k) => b.set(glowOf(LIFE[k].i) * easeOut(seg(t, GB[k], GB[k] + 0.6)) * (1 + 0.02 * Math.sin(t * 11 + k))));

    yaz(t);

    // kanca alt satırı ve seri etiketi
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', 'Güç kaynağı, ampul, ampermetre', { y: 27.6, size: 4.4, weight: 600, opacity: subO, nowrap: true });
    S.text('tag', 'BÖLÜM 4', { x: 14, y: 12.4, size: 3.0, weight: 800, color: '#9fb4c8', opacity: subO, nowrap: true, maxWidth: 30 });

    // g1 dipnotu: idealleştirme (bağımsız denetim)
    S.text('ideal', '(ampulün direnci sabit kabul edildi)', { y: 28.4, size: 3.6, weight: 600, color: '#c9d3dc', opacity: life ? easeOut(seg(t, Z.g1[0], Z.g1[0] + 0.4)) : 0, nowrap: true });

    // nesne etiketleri (yalnızca devre görünürken)
    const onC = (a, b) => (life ? 0 : fade(t, a, b, 0.3));
    label('lam', 'ampermetre', X - 0.72, 0.42, MZ - 0.05, { opacity: onC(A.m1 + 0.4, A.v1), size: 4.0 });
    label('le', gr('elektronlar'), 0.0, 0.3, 0.5, { opacity: onC(A.m1 + 1.2, A.v1 + 0.5), size: 4.2 });
    label('la', rd('akım yönü'), -0.05, 0.3, -0.55, { opacity: onC(A.m1 + 2.0, A.v1 + 0.5), size: 4.2 });
    label('lb', bl(`${R_B} Ω`), 0.62, 0.62, -ZH, { opacity: onC(A.r1 + 1.9, CUT1) + onC(CUT2, DUR + 1), size: 4.6 });
    label('lr', bl(`${R_X} Ω`), -X, 0.45, RZ - 0.55, { opacity: onC(RIN[1] + 0.2, ROUT[0]), size: 4.6 });
    label('lt', `toplam: ${bl(`${R(t)} Ω`)}`, 0.15, 0.3, 0.45, { opacity: onC(RIN[1] + 0.6, Z.r1[1]) + onC(ROUT[1] + 0.3, Z.r2[1]), size: 4.4 });
    LIFE.forEach((L, k) => {
      const o = life ? easeOut(seg(t, GB[k] + 0.4, GB[k] + 0.8)) : 0;
      label('g' + k, rd(`${fmt(L.i, 2)} A`), LX[k], 0.95, -0.22, { opacity: o, size: 4.4 });
    });
  };
}
