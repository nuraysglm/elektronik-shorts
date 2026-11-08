// 002 — Direnç nedir? (4'lü serinin 1. videosu)
// Animasyon anlatır, yazı doğrular (AGENT.md 2a). Elektronlar yeşil, − → + akar; geleneksel akım oku kırmızı, + → −.
// Direnç mavi. Akım değeri gösterilmez (Ohm yasası 4. videoda); yalnızca direnç değerleri ve renk kodları.

import { THREE, clamp, seg, easeInOut, easeOut, fade, lerp, RoundedBoxGeometry } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, check, timeline, narration } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, resistor, projLabel, camRig, canvasTex } from '../../tools/lib/parcalar.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pre: 1.5, l1: 'Ampul neden karardı?', s1: 7 },
  { id: 'm1', pre: 3.2, l1: `Dar yol → az akış`, s1: 7 },
  { id: 'm2', pre: 0.6, l1: `Bu engel: ${bl('direnç')}`, s1: 7.2 },
  { id: 'c1', pre: 2.4, l1: `${gr('Elektronlar')}: − → +`, s1: 7 },
  { id: 'c2', pre: 1.3, l1: `${rd('Akım yönü')}: + → −`, s1: 7 },
  { id: 'r1', pre: 2.6, l1: `${bl('Direnç')} ↑ → ${rd('Akım')} ↓`, s1: 7.4, extra: 0.4 },
  { id: 'r2', pre: 2.6, l1: `${bl('Direnç')} ↓ → ${rd('Akım')} ↑`, s1: 7.4, extra: 0.4 },
  { id: 'g1', pre: 4.2, l1: `Her cihazın ${bl('direnci')} var`, s1: 6.8 },
  { id: 'g2', pre: 2.4, l1: `Isıtıcı teli = ${bl('direnç')}`, s1: 6.8 },
  { id: 'k1', pre: 0.4, l1: `${bl('Direnç')} (${bl('R')}): akıma engel`, l2: `birimi: ohm (${bl('Ω')})`, s1: 6.6, s2: 6, extra: 1.6 },
];
const { Z, A, DUR } = timeline(BEATS, { k: 1.03 });
export const _T = { Z, A };

// ---------------------------------------------------------------- devre değerleri ve doğrulama
const VB = 9, RB = 30;                               // pil 9 V; ampul filamanı ~30 Ω (gösterilmez)
const T_HOOK = 0.6;                                  // kancada direnç devreye oturur
const T_OPEN = A.m1 + 0.8;                           // kamera borulara dönerken anahtar açılır (ekran dışında)
const T_CLOSE = A.c1 + 0.9;                          // anahtar kapanır
const T_R1 = A.r1 + 0.5, T_R2 = A.r2 + 0.5, RAMP = 1.4;
// direnç: hiç yok (0) → 100 Ω → 300 Ω → 50 Ω
const Rt = (t) => {
  if (t < T_R1) return 100 * easeOut(seg(t, T_HOOK, T_HOOK + 0.5));
  if (t < T_R2) return lerp(100, 300, easeInOut(seg(t, T_R1, T_R1 + RAMP)));
  return lerp(300, 50, easeInOut(seg(t, T_R2, T_R2 + RAMP)));
};
const sw = (t) => (t < T_CLOSE ? 1 - easeInOut(seg(t, T_OPEN, T_OPEN + 0.5)) : easeInOut(seg(t, T_CLOSE, T_CLOSE + 0.45))); // 1 = kapalı
const closed = (t) => (t < T_OPEN + 0.25 || t >= T_CLOSE + 0.4 ? 1 : 0);
const It = (t) => closed(t) * VB / (RB + Rt(t));    // amper (görsel için)
// Doğrulama: akım dirençle ters yönde değişir (V sabit)
check(VB / (RB + 300) < VB / (RB + 100) && VB / (RB + 100) < VB / (RB + 50) && VB / (RB + 50) < VB / RB, 'R artınca I azalır');
// renk kodu: kahverengi(1) siyah(0) ×10 = 100 Ω; turuncu(3) siyah(0) ×10 = 300 Ω; yeşil(5) siyah(0) ×1 = 50 Ω
const COL = { siyah: 0x1a1a1a, kahve: 0x6b3a1d, turuncu: 0xe0701e, yesil: 0x2e9b45, altin: 0xd4af37 };
const DIGIT = { siyah: 0, kahve: 1, turuncu: 3, yesil: 5 }, MULT = { siyah: 1, kahve: 10 };
const CODES = { 100: ['kahve', 'siyah', 'kahve'], 300: ['turuncu', 'siyah', 'kahve'], 50: ['yesil', 'siyah', 'siyah'] };
for (const [v, c] of Object.entries(CODES)) check((DIGIT[c[0]] * 10 + DIGIT[c[1]]) * MULT[c[2]] === +v, `renk kodu ${v} Ω`);
// görsel: akış hızı ve ampul parlaklığı akımla artar (tekdüze)
const speedOf = (I) => 2.6 * Math.sqrt(I);           // m/s
const glowOf = (I) => clamp(Math.pow(I / 0.3, 0.6));
let _s = 0, _t = 0;                                   // yol: sırayla ilerleyen kareler için artımlı integral
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += speedOf(It(_t)) * dt; _t += dt; }
  return _s + speedOf(It(_t)) * (t - _t);
};

// ---------------------------------------------------------------- efektler
const humSeg = (a, b, R) => ({ t: a, kind: 'hum', d: b - a, gain: 0.25 + 0.4 * glowOf(VB / (RB + R)) });
export const meta = {
  title: 'Direnç nedir?',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    humSeg(0.05, T_HOOK + 0.3, 0),
    { t: T_HOOK + 0.35, kind: 'thud', gain: 0.25 },
    humSeg(T_HOOK + 0.3, T_OPEN + 0.2, 100),
    { t: Z.m2[0] - 0.4, kind: 'pop', gain: 0.25 },
    { t: T_CLOSE + 0.4, kind: 'click', gain: 0.22 },
    humSeg(T_CLOSE + 0.45, T_R1 + 0.7, 100),
    { t: Z.c2[0] - 1.1, kind: 'pop', gain: 0.25 },
    { t: T_R1 + 0.1, kind: 'pop', gain: 0.25 },
    humSeg(T_R1 + 0.7, T_R2 + 0.7, 300),
    { t: T_R2 + 0.1, kind: 'pop', gain: 0.25 },
    humSeg(T_R2 + 0.7, DUR - 0.3, 50),
    ...[0, 1, 2, 3].map((i) => ({ t: A.g1 + 0.9 + i * 0.7, kind: 'thud', gain: 0.18 })),
    { t: A.g2 + 2.0, kind: 'pop', gain: 0.25 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                   // devre dikdörtgeni (üstten bakış: x sağ, z izleyiciye)
const RES_Z = 0.1, RES_LEN = 0.7;                  // direnç: sol kenar
const SW_Z = -0.1, SW_GAP = 0.55;                       // anahtar: sağ kenar
const PX = 7.2;                                       // borular ve mini modeller: sağdaki ikinci alan

function makeBulb(S, { scale = 1 } = {}) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.12, 32), new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, roughness: 0.5 }));
  base.position.y = 0.06; base.castShadow = true; g.add(base);
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.2, 32), S.M.steel);
  screw.position.y = 0.22; g.add(screw);
  for (let k = 0; k < 4; k++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.106, 0.012, 8, 32), S.M.steel); r.rotation.x = Math.PI / 2; r.position.y = 0.15 + k * 0.045; g.add(r); }
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xf2efe6, roughness: 0.05, transparent: true, opacity: 0.3, clearcoat: 1, emissive: 0xffb02e, emissiveIntensity: 0, depthWrite: false });
  const glass = new THREE.Mesh(new THREE.SphereGeometry(0.26, 40, 28), glassMat);
  glass.position.y = 0.52; glass.renderOrder = 3; g.add(glass);
  const filMat = new THREE.MeshPhysicalMaterial({ color: 0x553322, emissive: 0xffa53a, emissiveIntensity: 0, roughness: 0.4 });
  const pts = []; for (let i = 0; i <= 120; i++) { const a = i / 120 * Math.PI * 10; pts.push(new THREE.Vector3(-0.09 + 0.18 * i / 120, 0.55 + 0.018 * Math.sin(a), 0.018 * Math.cos(a))); }
  const fil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, 0.006, 6), filMat); g.add(fil);
  for (const s of [-1, 1]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 6), S.M.solder); leg.position.set(s * 0.09, 0.43, 0); g.add(leg); }
  const light = new THREE.PointLight(0xffb85c, 0, 4, 2); light.position.y = 0.55; g.add(light);
  g.scale.setScalar(scale);
  S.scene.add(g);
  return { group: g, set(on) { filMat.emissiveIntensity = 0.05 + 9 * on; glassMat.emissiveIntensity = 2.2 * on * on; glassMat.opacity = 0.3 + 0.5 * on; light.intensity = 9 * on * scale; } };
}

function makeSwitch(S) {
  // bıçaklı anahtar, z ekseninde: menteşe z=+GAP/2, kontak z=−GAP/2
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.05, SW_GAP + 0.26, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x1d2025, roughness: 0.45, clearcoat: 0.3 }));
  plate.position.y = 0.025; plate.receiveShadow = plate.castShadow = true; g.add(plate);
  for (const z of [SW_GAP / 2, -SW_GAP / 2]) { const post = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.2, 0.08, 2, 0.015), S.M.copper); post.position.set(0, 0.13, z); post.castShadow = true; g.add(post); }
  const pivot = new THREE.Group(); pivot.position.set(0, Y + 0.02, SW_GAP / 2); g.add(pivot);
  const blade = new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.04, SW_GAP + 0.04, 2, 0.012), S.M.gold);
  blade.position.z = -SW_GAP / 2; blade.castShadow = true; pivot.add(blade);
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16), new THREE.MeshPhysicalMaterial({ color: 0xb3261e, roughness: 0.4, clearcoat: 0.5 }));
  knob.position.set(0, 0.07, -SW_GAP - 0.01); pivot.add(knob);
  S.scene.add(g);
  return { group: g, set(c) { pivot.rotation.x = (1 - c) * 1.0; } };
}

function pipes(S) {
  // aynı itmeyle: geniş boruda yoğun akış, dar boruda seyrek akış
  const g = new THREE.Group();
  const glass = (r) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, 2.2, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, roughness: 0.05, transparent: true, opacity: 0.22, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false, emissive: 0x2f6fff, emissiveIntensity: 0 }));
  const wide = glass(0.24), narrow = glass(0.075);
  for (const [m, x] of [[wide, -0.45], [narrow, 0.45]]) { m.rotation.x = Math.PI / 2; m.position.set(x, 0.32, 0); m.renderOrder = 2; g.add(m); }
  for (const x of [-0.45, 0.45]) for (const z of [-1.1, 1.1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(x < 0 ? 0.245 : 0.08, 0.018, 10, 40), S.M.steel); r.position.set(x, 0.32, z); g.add(r); }
  const mat = new THREE.MeshPhysicalMaterial({ color: 0x5fe08a, emissive: 0x5fe08a, emissiveIntensity: 0.9, roughness: 0.3, transparent: true });
  const R = S.rng(21);
  const mk = (n, rad, z) => { const pts = Array.from({ length: n }, () => { const a = R() * 6.283, rr = Math.sqrt(R()) * rad; return [R(), rr * Math.cos(a), rr * Math.sin(a)]; }); const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.04, 12, 8), mat, n); g.add(im); return { im, pts, z }; };
  const sets = [mk(70, 0.17, -0.45), mk(6, 0.02, 0.45)];
  const m4 = new THREE.Matrix4();
  g.position.set(PX, 0, 0);
  S.scene.add(g);
  return {
    group: g, narrow: narrow.material,
    update(t, op) {
      g.visible = op > 0.01; mat.opacity = op; for (const m of [wide, narrow]) m.material.opacity = 0.22 * op;
      for (const s of sets) {
        s.pts.forEach(([u, y, x], k) => { const z = 1.1 - 2.2 * ((u + t * 0.32) % 1); m4.makeTranslation(s.z + x, 0.32 + y, z); s.im.setMatrixAt(k, m4); });
        s.im.instanceMatrix.needsUpdate = true;
      }
    },
  };
}

function platform(S, x, z) {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.08, 48), new THREE.MeshPhysicalMaterial({ color: 0x3a3631, roughness: 0.6, clearcoat: 0.2 }));
  p.position.set(x, 0.04, z); p.receiveShadow = p.castShadow = true; S.scene.add(p); return p;
}

function heater(S) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.08, 0.28, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0xe9e4da, roughness: 0.6 }));
  base.position.y = 0.04; base.castShadow = true; g.add(base);
  const hot = new THREE.MeshPhysicalMaterial({ color: 0x8a4a2a, metalness: 0.6, roughness: 0.4, emissive: 0xff5a1a, emissiveIntensity: 0 });
  const pts = []; for (let i = 0; i <= 600; i++) { const a = i / 600 * Math.PI * 2 * 16; pts.push(new THREE.Vector3(-0.26 + 0.52 * i / 600, 0.17 + 0.06 * Math.sin(a), 0.06 * Math.cos(a))); }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 1200, 0.011, 6), hot));
  for (const s of [-1, 1]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.14, 12), S.M.steel); post.position.set(s * 0.28, 0.12, 0); g.add(post); }
  S.scene.add(g);
  return { group: g, hot };
}

function iron(S) {
  const g = new THREE.Group();
  const sh = new THREE.Shape(); sh.moveTo(-0.3, -0.16); sh.lineTo(0.12, -0.16); sh.quadraticCurveTo(0.34, -0.1, 0.36, 0); sh.quadraticCurveTo(0.34, 0.1, 0.12, 0.16); sh.lineTo(-0.3, 0.16); sh.lineTo(-0.3, -0.16);
  const plate = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.035, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 }), S.M.steel);
  plate.rotation.x = -Math.PI / 2; plate.position.y = 0.01; plate.castShadow = true; g.add(plate);
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }), new THREE.MeshPhysicalMaterial({ color: 0x2f6fbf, roughness: 0.3, clearcoat: 0.8 }));
  body.rotation.x = -Math.PI / 2; body.scale.set(0.92, 0.88, 1); body.position.y = 0.06; body.castShadow = true; g.add(body);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 32, Math.PI), new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.4 }));
  handle.position.set(-0.02, 0.19, 0); g.add(handle);
  S.scene.add(g); return { group: g };
}

function kettle(S) {
  // su ısıtıcısı (içinde direnç teli olan cihaz): taban, gövde, kulp, ağız, kapak
  const g = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.35, clearcoat: 0.6 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x1d2025, roughness: 0.4 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.05, 40), dark); base.position.y = 0.025; base.castShadow = true; g.add(base);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.36, 40), white); body.position.y = 0.23; body.castShadow = true; g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.04, 40), white); lid.position.y = 0.43; g.add(lid);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 10), dark); knob.position.y = 0.46; g.add(knob);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 12, 28, Math.PI), dark); handle.rotation.z = -Math.PI / 2; handle.position.set(-0.16, 0.24, 0); g.add(handle);
  const spout = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 16, 1, true), white); spout.rotation.z = -Math.PI / 2.6; spout.position.set(0.19, 0.36, 0); g.add(spout);
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff8a3a })); led.position.set(0.1, 0.1, 0.12); g.add(led);
  S.scene.add(g); return { group: g };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 40, seed: 5 });
  const sc = S.lights.key.shadow.camera; sc.left = -3.5; sc.right = 10; sc.top = 4; sc.bottom = -4; sc.updateProjectionMatrix();
  const label = projLabel(S);

  // ------------------------------------------------ devre: tel (anahtar boşluğu ayrı), pil, ampul, direnç, anahtar
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const W = closedWire(S, loop, { y: Y });
  W.mesh.visible = false; // telin anahtar boşluğu hariç parçaları ayrı çizilir
  const uSwA = W.uOf(X, SW_Z + SW_GAP / 2 - 0.02), uSwB = W.uOf(X, SW_Z - SW_GAP / 2 + 0.02);
  const part = (u0, u1) => { const pts = []; for (let i = 0; i <= 300; i++) { let u = u0 + (((u1 - u0 + 1) % 1) * i) / 300; pts.push(W.curve.getPointAt(u % 1)); } const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.03, 10), S.M.copper); m.castShadow = true; scene.add(m); };
  part(uSwB, uSwA); // anahtarın kontak ucundan dolanıp menteşe ucuna (anahtar bölgesi boş kalır)
  const bat = battery(S, { y: Y }); bat.group.position.set(0, 0, ZH);       // + ucu sağda: akım + → sağ kenar → üst → sol → alt
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH); bulb.group.children.forEach((c) => {});
  const swt = makeSwitch(S); swt.group.position.set(X, 0, SW_Z);
  const res = resistor(S, { len: RES_LEN, obstacles: 24 }); res.group.position.set(-X, Y, RES_Z);
  const obst = res.group.children.filter((c) => c.geometry && c.geometry.type === 'SphereGeometry');

  // ------------------------------------------------ elektronlar (yeşil): eğrinin ters yönünde (− → +)
  const N = 46;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 1.1, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 16, 12), eMat, N); el.castShadow = true; scene.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const R = S.rng(9), ph = Array.from({ length: N }, () => [R() * 6.28, R() * 6.28, 0.8 + R() * 0.6]);

  // ------------------------------------------------ geleneksel akım oku (kırmızı, + → −): alt kenarın önünde, sağa bakan
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.6, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.55; arrow.add(head);
  arrow.position.set(X - 0.38, 0.25, -0.5); arrow.rotation.y = Math.PI / 2; scene.add(arrow); // sağ kenar boyunca, −z yönüne (+ ucundan çıkıp yukarı)

  // ------------------------------------------------ ikinci alan: borular, platformlar, mini modeller
  const P = pipes(S);
  const PLZ = [[-0.5, -0.75], [0.5, -0.75], [-0.5, 0.65], [0.5, 0.65]];
  const plats = PLZ.map(([x, z]) => platform(S, PX + x, z));
  const H = heater(S), B2 = makeBulb(S, { scale: 0.85 }), IR = iron(S), PH = kettle(S);
  const models = [H.group, B2.group, IR.group, PH.group];
  const names = ['ısıtıcı teli', 'ampul', 'ütü', 'su ısıtıcısı'];

  // ------------------------------------------------ kamera: [t, açı, mesafe, yükselme, hedefX, hedefZ]
  const C0 = [0, 9.0, 62, 0, -0.32], C1 = [0, 8.8, 60, PX, -0.25];
  const cam = camRig(S, [
    [0, ...C0], [A.m1 + 0.2, ...C0], [A.m1 + 1.8, ...C1], [A.c1, ...C1], [A.c1 + 1.3, ...C0],
    [A.r2, -0.06, 8.9, 62, -0.03, -0.32], [A.g1 + 0.1, 0.04, 9.0, 62, 0, -0.32], [A.g1 + 1.6, ...C1],
    [A.g2 + 0.3, ...C1], [A.g2 + 2.0, ...C0], [DUR, 0.05, 9.2, 62, 0, -0.32],
  ]);
  const yaz = narration(S, BEATS, Z);

  // ısıtıcı devreye uçar (g2)
  const T_FLY = A.g2 + 0.4, T_LAND = A.g2 + 2.0;
  const homeH = new THREE.Vector3(PX + PLZ[0][0], 0.08, PLZ[0][1]);

  return (t) => {
    cam(t);
    const I = It(t), glow = glowOf(I), r = Rt(t);
    bulb.set(glow);
    swt.set(sw(t));

    // direnç: kancada büyüyerek oturur, sonra değer değişir
    const rin = easeOut(seg(t, T_HOOK, T_HOOK + 0.5));
    res.group.visible = rin > 0.004; res.group.scale.setScalar(Math.max(0.001, rin)); res.group.position.y = Y + (1 - rin) * 0.3;
    const rv = t < T_R1 + RAMP / 2 ? 100 : t < T_R2 + RAMP / 2 ? 300 : 50;
    CODES[rv].forEach((c, i) => res.bands[i].color.setHex(COL[c]));
    const nOb = Math.round(clamp(r / 300) * 24);
    obst.forEach((o, i) => { o.visible = i < Math.max(nOb, 3); });
    const flash = fade(t, A.m2 - 0.1, Z.m2[1], 0.3) * 0 + fade(t, T_LAND - 0.2, T_LAND + 1.4, 0.3) + 0.6 * fade(t, T_R1, T_R1 + RAMP + 0.6, 0.3) + 0.6 * fade(t, T_R2, T_R2 + RAMP + 0.6, 0.3);
    res.body.emissiveIntensity = 0.08 + 0.7 * clamp(flash);

    // elektronlar: − → + (eğri parametresinin tersi)
    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const u = ((((k / N) - s / W.L) % 1) + 1) % 1;
      W.curve.getPointAt(u, pv);
      const inRes = rin > 0.5 && pv.x < -X + 0.06 && Math.abs(pv.z - RES_Z) < RES_LEN / 2;
      if (inRes) { const f = ph[k], w = 0.02 + 0.03 * clamp(r / 300); pv.x += w * Math.sin(t * 9 * f[2] + f[0]); pv.y += w * Math.sin(t * 11 * f[2] + f[1]); }
      const inSw = Math.abs(pv.x - X) < 0.05 && Math.abs(pv.z - SW_Z) < SW_GAP / 2 - 0.04;
      sv.setScalar(inSw ? 0.0001 : inRes ? 0.8 : 1);
      if (inSw) pv.y += 0.0;
      m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;

    // akım oku: c2'den itibaren
    const aOp = easeOut(seg(t, A.c2 + 0.1, A.c2 + 0.6));
    arrowMat.opacity = aOp; arrow.visible = aOp > 0.01;
    arrow.position.z = 0.35 - 0.12 * ((t * 0.6) % 1) * 0;

    // borular (m1–m2) ve dar borunun mavi vurgusu
    const pOp = fade(t, A.m1 + 0.6, A.c1 + 1.0, 0.5);
    P.update(t, pOp);
    P.narrow.emissiveIntensity = 1.4 * fade(t, A.m2 + 0.05, A.c1 + 0.8, 0.3);

    // platformlar ve mini modeller (g1): sırayla belirir
    models.forEach((g, i) => {
      const a = easeOut(seg(t, A.g1 + 0.6 + i * 0.7, A.g1 + 1.1 + i * 0.7));
      const out = i === 0 ? 0 : easeInOut(seg(t, Z.g2[1] + 0.2, Z.g2[1] + 0.8));
      const sc0 = Math.max(0.001, a * (1 - out));
      plats[i].visible = a > 0.004 && out < 0.999; plats[i].scale.setScalar(Math.max(0.001, a * (1 - out)));
      if (i === 0) return;
      g.visible = sc0 > 0.004; g.scale.setScalar(sc0 * (i === 1 ? 0.85 : 1));
      g.position.set(PX + PLZ[i][0], 0.08 + (1 - a) * 0.3, PLZ[i][1]);
    });
    B2.set(0.8);
    // ısıtıcı: platformda belirir, g2'de devredeki dirence uçar ve içinde kaybolur
    {
      const a = easeOut(seg(t, A.g1 + 0.6, A.g1 + 1.1));
      const f = easeInOut(seg(t, T_FLY, T_LAND));
      const dst = new THREE.Vector3(-X, Y - 0.15, RES_Z);
      const p = homeH.clone().lerp(dst, f); p.y += Math.sin(f * Math.PI) * 1.2;
      H.group.position.copy(p); H.group.rotation.y = f * Math.PI / 2;
      const scl = a * lerp(1, 0.5, f) * (1 - easeOut(seg(t, T_LAND - 0.25, T_LAND)));
      H.group.visible = scl > 0.004; H.group.scale.setScalar(Math.max(0.001, scl));
      H.hot.emissiveIntensity = 1.6 * a;
    }

    yaz(t);

    // nesne etiketleri
    const rl = easeOut(seg(t, Z.m2[1], Z.m2[1] + 0.4)) * (t < A.g1 + 0.3 ? 1 : 0) + easeOut(seg(t, T_LAND + 0.2, T_LAND + 0.6));
    label('lr', bl(`R = ${rv} Ω`), -X + 0.62, 0.3, RES_Z, { opacity: clamp(rl) * (t > A.c1 + 1.2 ? 1 : 0), size: 5.4 });
    label('lv', hl('9 V'), 0, 0.5, ZH + 0.55, { opacity: 0, size: 5 });
    label('le', gr('elektronlar'), -0.1, 0.3, ZH - 0.45, { opacity: fade(t, Z.c1[0], A.r1 + 0.6, 0.3), size: 4.6 });
    label('la', rd('akım yönü'), 0.0, 0.3, -0.75, { opacity: fade(t, Z.c2[0], A.r1 + 0.6, 0.3), size: 4.6 });
    const po = fade(t, A.m1 + 1.8, A.c1 + 0.6, 0.4);
    label('pw', 'geniş', PX - 1.0, 0.3, 0, { opacity: po, size: 4.4 });
    label('pn', 'dar', PX + 0.85, 0.3, 0, { opacity: po, size: 4.4 });
    names.forEach((n, i) => {
      const o = easeOut(seg(t, A.g1 + 1.1 + i * 0.7, A.g1 + 1.5 + i * 0.7)) * (1 - easeOut(seg(t, i === 0 ? T_FLY : Z.g2[1], (i === 0 ? T_FLY : Z.g2[1]) + 0.3)));
      label('n' + i, n, PX + PLZ[i][0], 0.0, PLZ[i][1] + 0.58, { opacity: o, size: 4.0 });
    });
  };
}
