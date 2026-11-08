// 002 — Direnç nedir? (2. sürüm, kanal sahibinin iş emri 08.11.2026)
// Animasyon anlatır, yazı kalemle yazılarak doğrular (AGENT.md 2a). Elektronlar yeşil, dış devrede − → +; geleneksel akım oku kırmızı, + → −.
// Direnç mavi, gerilim sarı. Akım değerleri gösterilmez (Ohm yasası serinin son videosu).

import { THREE, clamp, seg, easeInOut, easeOut, fade, lerp, RoundedBoxGeometry } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, fmt, check, penTimeline, narrationPen } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, resistor, projLabel, camRig, canvasTex } from '../../tools/lib/parcalar.js';
import { makeBulb, platform, makeSwitch, heater, iron, kettle } from '../../tools/lib/devre.js';

const sub = (x) => `<sub style="font-size:.55em;line-height:0">${x}</sub>`;

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: 'Direnç ekleyince', l2: `<b style="font-weight:900">ampul neden ${hl('kararır')}?</b>`, s1: 7.6, s2: 7.6, extra: 2.6 },
  { id: 'c1', pre: 4.4, l1: `${gr('Elektronlar')}: − → +`, l2: `${rd('Akım yönü')}: + → − (tersi)`, s2: 5.6 },
  { id: 'k1', chain: true, pre: 1.3, l1: `Ampulün de ${bl('direnci')} var` },
  { id: 'k2', chain: true, pre: 1.2, l1: `Toplam ${bl('direnç')} artar` },
  { id: 'k3', chain: true, pre: 3.4, l1: `${rd('Akım')} her yerde azalır` },
  { id: 'k4', chain: true, pre: 1.0, l1: `Pil hâlâ ${hl('9 V')}` },
  { id: 'k5', chain: true, pre: 1.3, l1: `Ampule daha az ${hl('gerilim')}` },
  { id: 'k6', chain: true, pre: 0.9, l1: 'Bu yüzden ampul kararır' },
  { id: 'p1', pre: 5.4, l1: `Daralma = ${bl('direnç')}`, l2: 'Saniyede geçen su azalır', s2: 5.6 },
  { id: 'p3', pre: 0.9, l1: 'Pompa = pil, çark = ampul', l2: `Su akışı = ${rd('akım')}`, s1: 6.2, s2: 5.8 },
  { id: 'g1', pre: 5.0, l1: `Her cihaz akıma ${bl('direnç')} gösterir`, s1: 5.9 },
  { id: 'w1', pre: 3.4, l1: `Bakır telin de ${bl('direnci')} var` },
  { id: 'w2', pre: 4.0, l1: 'Çok küçük, ihmal edilir' },
  { id: 'f1', pre: 1.7, l1: `${bl('Direnç')} (${bl('R')}): akıma engel`, l2: `birimi: ohm (${bl('Ω')})`, s2: 5.6 },
  { id: 'f2', pre: 2.4, l1: `Seri ${bl('dirençler')} toplanır`, l2: `${bl('R')}${sub('toplam')} = 30 Ω + 60 Ω + 0,03 Ω ≈ 90 Ω`, s2: 4.5, extra: 0.8 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });

// ---------------------------------------------------------------- devre değerleri ve doğrulama
const VB = 9, RL = 30, RR = 60;                       // pil 9 V; ampul (sıcak filaman) ≈ 30 Ω; eklenen direnç 60 Ω
const RHO = 1.68e-8, LW = 1, AW = 0.5e-6;             // bakır tel: 1 m, 0,5 mm²
const RW = RHO * LW / AW;                             // ≈ 0,0336 Ω
const RT = RL + RR + RW;
check(Math.abs(RW - 0.0336) < 1e-4 && fmt(RW, 2) === '0,03', 'tel direnci ≈ 0,03 Ω');
check(Math.abs(RT - 90.03) < 0.01 && Math.round(RT) === 90, 'toplam ≈ 90 Ω');
const I0 = VB / (RL + RW), I1 = VB / RT;
check(I1 < I0, 'toplam direnç artınca akım azalır');
check(Math.round(I1 * RR) === 6 && Math.round(I1 * RL) === 3 && Math.abs(I1 * (RR + RL + RW) - VB) < 1e-9, '9 V paylaşımı: 6 V + 3 V');
check(Math.abs((I1 * I1 * RL) / (I0 * I0 * RL) - 1 / 9) < 0.002, 'ampul gücü ~1/9');
check(RW / RT < 0.001, 'tel payı < %0,1');

const T_D1 = 2.0;                                     // kancada direnç devreye iner
const T_OPEN = A.c1 + 0.5, T_CLOSE = A.c1 + 2.0;      // anahtar açılır / kapanır
const T_UP = A.k3 + 0.2, T_DN = A.k3 + 1.9;           // zincirde tekrar: direnç kalkar, yeniden iner
const slot = (t) => {
  if (t < T_UP) return easeOut(seg(t, T_D1, T_D1 + 0.5));
  if (t < T_DN) return 1 - easeInOut(seg(t, T_UP, T_UP + 0.6));
  return easeOut(seg(t, T_DN, T_DN + 0.5));
};
const sw = (t) => (t < T_CLOSE ? 1 - easeInOut(seg(t, T_OPEN, T_OPEN + 0.5)) : easeInOut(seg(t, T_CLOSE, T_CLOSE + 0.45)));
const closed = (t) => (sw(t) > 0.97 ? 1 : 0);
const It = (t) => closed(t) * VB / (RL + RW + RR * slot(t));
const speedOf = (I) => 0.3 + 3.6 * I;                 // görsel akış hızı (m/s), akımla artar
const glowOf = (I) => clamp(Math.pow(I / I0, 0.8));
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += speedOf(It(_t)) * dt; _t += dt; }
  return _s + speedOf(It(_t)) * (t - _t);
};

// boru benzetmesi: daralma (pinch 0..1) → debi Q = 1/(1 + 2·pinch); daralmada yerel hız = Q / (yarıçap oranı)²
const T_PINCH = A.p1 + 2.4;
const pinch = (t) => easeInOut(seg(t, T_PINCH, T_PINCH + 1.3));
const Qt = (t) => 1 / (1 + 2 * pinch(t));
check(Math.abs(Qt(1e9) - 1 / 3) < 1e-9, 'daralma ile debi 1/3');

// ---------------------------------------------------------------- efektler
const humAt = (I) => 0.2 + 0.4 * glowOf(I);
export const meta = {
  title: 'Direnç nedir?',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 0.05, kind: 'hum', d: T_D1 + 0.3, gain: humAt(I0) },
    { t: T_D1 + 0.4, kind: 'thud', gain: 0.25 },
    { t: T_D1 + 0.35, kind: 'hum', d: T_OPEN - T_D1, gain: humAt(I1) },
    { t: T_CLOSE + 0.4, kind: 'click', gain: 0.22 },
    { t: T_CLOSE + 0.45, kind: 'hum', d: T_UP - T_CLOSE, gain: humAt(I1) },
    { t: A.c1 + 3.3, kind: 'pop', gain: 0.2 },
    { t: A.k1 + 0.2, kind: 'pop', gain: 0.18 },
    { t: T_UP + 0.1, kind: 'hum', d: T_DN - T_UP, gain: humAt(I0) },
    { t: T_DN + 0.4, kind: 'thud', gain: 0.25 },
    { t: T_DN + 0.4, kind: 'hum', d: A.p1 + 1.2 - T_DN, gain: humAt(I1) },
    { t: T_PINCH + 0.6, kind: 'thud', gain: 0.22 },
    { t: T_PINCH + 1.4, kind: 'pop', gain: 0.18 },
    ...[0, 1, 2, 3, 4].map((i) => ({ t: A.g1 + 2.1 + i * 0.45, kind: 'thud', gain: 0.15 })),
    { t: A.w1 + 1.8, kind: 'pop', gain: 0.18 },
    { t: A.w1 + 0.6, kind: 'hum', d: DUR - A.w1 - 0.9, gain: humAt(I1) },
    ...[0, 1, 2].map((i) => ({ t: A.w2 + 1.6 + i * 0.4, kind: 'pop', gain: 0.14 })),
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                    // devre (x sağ, z izleyiciye)
const RES_Z = 0.1, RES_LEN = 0.7, SW_Z = -0.1, SW_GAP = 0.55;
const PX = 7.2, PM = -7.2;                            // boru alanı (sağ), mini model alanı (sol)
const BZ = -5.0;                                      // sütun grafiği (devrenin arkası)

function pipeLoop(S) {
  // kapalı boru: pompa (ön), çark (arka), daralma (sol kenar), debi göstergesi (sağ kenar, geniş kısım)
  const g = new THREE.Group(); g.position.set(PX, 0, 0); S.scene.add(g);
  const XP = 0.85, ZP = 1.2, YP = 0.26, RP = 0.13;
  const curve = new THREE.CatmullRomCurve3(roundedLoop([[XP, 0], [XP, -ZP], [-XP, -ZP], [-XP, ZP], [XP, ZP]], { r: 0.3 }).map(([x, z]) => new THREE.Vector3(x, YP, z)), true, 'centripetal');
  curve.arcLengthDivisions = 3000;
  const L = curve.getLength();
  const TS = 700, RS = 28;
  const geo = new THREE.TubeGeometry(curve, TS, RP, RS, true);
  const base = geo.attributes.position.array.slice();
  const centers = Array.from({ length: TS + 1 }, (_, i) => curve.getPointAt((i / TS) % 1));
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, roughness: 0.06, transparent: true, opacity: 0.2, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false, emissive: 0x2f6fff, emissiveIntensity: 0 });
  const tube = new THREE.Mesh(geo, glassMat); tube.renderOrder = 2; g.add(tube);
  // daralma merkezi: sol kenar ortası
  let uc = 0, bd = 1e9; const tmp = new THREE.Vector3();
  for (let i = 0; i < 3000; i++) { curve.getPointAt(i / 3000, tmp); const d = (tmp.x + XP) ** 2 + tmp.z ** 2; if (d < bd) { bd = d; uc = i / 3000; } }
  const wU = 0.32 / L;
  const du = (u) => { let d = Math.abs(u - uc); return Math.min(d, 1 - d); };
  const rf = (u, p) => 1 - 0.62 * p * Math.exp(-((du(u) / wU) ** 2));
  let lastP = -1;
  const shape = (p) => {
    if (Math.abs(p - lastP) < 1e-4) return; lastP = p;
    const a = geo.attributes.position.array;
    for (let i = 0; i <= TS; i++) {
      const f = rf(i / TS, p), c = centers[i];
      for (let j = 0; j <= RS; j++) { const k = (i * (RS + 1) + j) * 3; a[k] = c.x + (base[k] - c.x) * f; a[k + 1] = c.y + (base[k + 1] - c.y) * f; a[k + 2] = c.z + (base[k + 2] - c.z) * f; }
    }
    geo.attributes.position.needsUpdate = true; geo.computeVertexNormals();
  };
  // su parçacıkları
  const NP = 130, R = S.rng(31);
  const wMat = new THREE.MeshPhysicalMaterial({ color: 0x7cc8ff, emissive: 0x3f9bff, emissiveIntensity: 0.8, roughness: 0.25, clearcoat: 1 });
  const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.03, 10, 8), wMat, NP); g.add(im);
  const P = Array.from({ length: NP }, (_, k) => ({ s: (k / NP) * L + R() * 0.03, r: Math.sqrt(R()) * 0.75 * RP, a: R() * 6.283 }));
  const frame = new THREE.Vector3(), nrm = new THREE.Vector3(), bin = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), pv = new THREE.Vector3();
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
  let tt = 0;
  const step = (t) => { // ds/dt = v0·Q / rf² (daralmada yerel olarak hızlı)
    if (t < tt) { tt = 0; P.forEach((p, k) => { p.s = (k / NP) * L; }); }
    const dt = 1 / 120;
    while (tt + dt <= t) { const v0 = 1.1 * Qt(tt), pp = pinch(tt); for (const p of P) { const u = (p.s / L) % 1, f = rf(u, pp); p.s += (v0 / (f * f)) * dt; } tt += dt; }
  };
  // pompa (ön kenar ortası): gövde + dönen pervane
  const pump = new THREE.Group(); pump.position.set(0, 0, ZP); g.add(pump);
  const housing = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.42, 0.42, 3, 0.05), new THREE.MeshPhysicalMaterial({ color: 0x2c5f8a, roughness: 0.35, clearcoat: 0.6 }));
  housing.position.y = 0.21; housing.castShadow = true; pump.add(housing);
  const rotor = new THREE.Group(); rotor.position.y = 0.44; pump.add(rotor);
  for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.03, 0.06, 2, 0.01), S.M.steel); b.rotation.y = (k * Math.PI) / 4; rotor.add(b); }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 20), S.M.gold); hub.position.y = 0.44; pump.add(hub);
  // çark (arka kenar ortası): eksen z, alt yarısı boruda
  const wheel = new THREE.Group(); wheel.position.set(0, YP + 0.05, -ZP); g.add(wheel);
  const wMatW = new THREE.MeshPhysicalMaterial({ color: 0xffb02e, emissive: 0xff9a1f, emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.35 });
  for (let k = 0; k < 8; k++) { const b = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.2, 0.12, 2, 0.008), wMatW); const a = (k * Math.PI) / 4; b.position.set(0.11 * Math.sin(a), 0.11 * Math.cos(a), 0); b.rotation.z = -a; wheel.add(b); }
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.36, 12), S.M.steel); axle.rotation.x = Math.PI / 2; wheel.add(axle);
  const box = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.32, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, roughness: 0.06, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
  box.rotation.x = Math.PI / 2; box.position.set(0, YP + 0.05, -ZP); box.renderOrder = 2; g.add(box);
  // debi göstergesi (sağ kenar, geniş kısım): kadran + ibre
  const gauge = new THREE.Group(); gauge.position.set(XP - 0.45, 0, 0.1); g.add(gauge);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12), S.M.steel); post.position.y = 0.15; gauge.add(post);
  const dialTex = canvasTex(256, 256, (c, w, h) => {
    c.fillStyle = '#e9e6de'; c.beginPath(); c.arc(128, 128, 124, 0, 6.283); c.fill();
    c.strokeStyle = '#2b2e33'; c.lineWidth = 6;
    for (let k = 0; k <= 6; k++) { const a = Math.PI * (0.85 + 1.3 * k / 6); c.beginPath(); c.moveTo(128 + 86 * Math.cos(a), 128 + 86 * Math.sin(a)); c.lineTo(128 + 110 * Math.cos(a), 128 + 110 * Math.sin(a)); c.stroke(); }
  });
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 40), [new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, roughness: 0.4 }), new THREE.MeshBasicMaterial({ map: dialTex }), new THREE.MeshPhysicalMaterial({ color: 0x2b2e33 })]);
  dial.position.y = 0.33; dial.rotation.x = 0.5; gauge.add(dial);
  const needlePivot = new THREE.Group(); needlePivot.position.set(0, 0.33, 0); needlePivot.rotation.x = 0.5; gauge.add(needlePivot);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.15), new THREE.MeshBasicMaterial({ color: 0xd8342c })); needle.position.set(0, 0.03, -0.075); const nh = new THREE.Group(); nh.add(needle); needlePivot.add(nh);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.012, 8, 48), new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0, transparent: true, opacity: 0 }));
  ring.rotation.x = -Math.PI / 2 + 0.5; ring.position.y = 0.335; gauge.add(ring);
  let ang = 0, angT = 0;
  return {
    group: g, glassMat, wMat, ring, uc, XP, ZP, YP, curve,
    update(t) {
      const p = pinch(t); shape(p); step(t);
      for (let k = 0; k < NP; k++) {
        const pt = P[k], u = (pt.s / L) % 1, f = rf(u, p);
        curve.getPointAt(u, frame); curve.getTangentAt(u, nrm); bin.crossVectors(nrm, up).normalize();
        pv.copy(frame).addScaledVector(up, pt.r * f * Math.sin(pt.a)).addScaledVector(bin, pt.r * f * Math.cos(pt.a));
        m4.compose(pv, q, one); im.setMatrixAt(k, m4);
      }
      im.instanceMatrix.needsUpdate = true;
      // çark ve pompa açısı: debiyle orantılı (artımlı integral)
      if (t < angT) { ang = 0; angT = 0; }
      while (angT + 1 / 120 <= t) { ang += 5.0 * Qt(angT) / 120; angT += 1 / 120; }
      wheel.rotation.z = -ang; rotor.rotation.y = ang * 1.3;
      nh.rotation.y = 0; needlePivot.rotation.set(0.5, 0, 0); needlePivot.rotateY(1.1 - 2.2 * (Qt(t) - 0.2) / 0.8);
    },
  };
}

function phone(S) {
  // şarj olan telefon + kablo + adaptör
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.035, 0.56, 4, 0.03), new THREE.MeshPhysicalMaterial({ color: 0x1b1d22, roughness: 0.3, clearcoat: 0.8 }));
  body.position.y = 0.02; body.castShadow = true; g.add(body);
  const tex = canvasTex(256, 480, (c, w, h) => {
    c.fillStyle = '#0d1a2a'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#7cf0a0'; c.lineWidth = 12; c.strokeRect(78, 150, 100, 190); c.fillStyle = '#7cf0a0'; c.fillRect(108, 128, 40, 22); c.fillRect(94, 250, 68, 76);
    c.beginPath(); c.moveTo(136, 168); c.lineTo(108, 236); c.lineTo(132, 236); c.lineTo(120, 290); c.lineTo(152, 214); c.lineTo(128, 214); c.closePath(); c.fill();
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.5), new THREE.MeshBasicMaterial({ map: tex })); scr.rotation.x = -Math.PI / 2; scr.position.y = 0.04; g.add(scr);
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.02, 0.28), new THREE.Vector3(0.05, 0.02, 0.4), new THREE.Vector3(0.22, 0.02, 0.36), new THREE.Vector3(0.3, 0.05, 0.18)]), 40, 0.01, 6), new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.5 }));
  g.add(cable);
  const plug = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.14, 0.14, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.45 })); plug.position.set(0.3, 0.07, 0.12); plug.castShadow = true; g.add(plug);
  S.scene.add(g); return { group: g };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 5 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);

  // ------------------------------------------------ devre
  const copperW = S.M.copper.clone(); copperW.emissive = new THREE.Color(0xff8a3a); copperW.emissiveIntensity = 0;
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const uSwA = Wc.uOf(X, SW_Z + SW_GAP / 2 - 0.02), uSwB = Wc.uOf(X, SW_Z - SW_GAP / 2 + 0.02);
  { const pts = []; for (let i = 0; i <= 300; i++) pts.push(Wc.curve.getPointAt((uSwB + (((uSwA - uSwB + 1) % 1) * i) / 300) % 1)); const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.03, 10), copperW); m.castShadow = true; scene.add(m); }
  const bat = battery(S, { y: Y }); bat.group.position.set(0, 0, ZH);
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH);
  const swt = makeSwitch(S, { gap: SW_GAP, y: Y }); swt.group.position.set(X, 0, SW_Z);
  const res = resistor(S, { len: RES_LEN, obstacles: 18, bands: [0x2f6fbf, 0x1a1a1a, 0x1a1a1a, 0xd4af37] }); res.group.position.set(-X, Y, RES_Z);
  // renk kodu 60 Ω: mavi(6) siyah(0) ×1 (siyah) → 60 Ω
  check((6 * 10 + 0) * 1 === RR, 'renk kodu 60 Ω');
  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x4f8cff, emissive: 0x3f7bff, emissiveIntensity: 1.4, transparent: true, opacity: 0, depthWrite: false });
  const bRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 10, 60), ringMat); bRing.rotation.x = Math.PI / 2; bRing.position.set(0, 0.06, -ZH); scene.add(bRing);
  const vMat = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 1.2, transparent: true, opacity: 0, depthWrite: false });
  const vRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.022, 10, 60), vMat); vRing.rotation.x = Math.PI / 2; vRing.scale.set(1, 0.55, 1); vRing.position.set(0, 0.06, ZH); scene.add(vRing);

  // elektronlar (yeşil): eğrinin ters yönünde (dış devrede − → +)
  const N = 46;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 1.1, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 16, 12), eMat, N); el.castShadow = true; scene.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const Rn = S.rng(9), ph = Array.from({ length: N }, () => [Rn() * 6.28, Rn() * 6.28, 0.8 + Rn() * 0.6]);

  // geleneksel akım oku (kırmızı, + → −)
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.6, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.55; arrow.add(head);
  arrow.position.set(X - 0.38, 0.25, -0.5); arrow.rotation.y = Math.PI / 2; scene.add(arrow);

  // tel parıltısı (w1): tel boyunca gezen ışık
  const spark = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd8a0, transparent: true, opacity: 0 })); scene.add(spark);

  // ------------------------------------------------ boru benzetmesi
  const PL = pipeLoop(S);

  // ------------------------------------------------ mini modeller (cihazların direnci)
  const PLZ = [[-0.55, -0.85], [0.55, -0.85], [-0.55, 0.3], [0.55, 0.3], [0, 1.35]];
  const plats = PLZ.map(([x, z]) => platform(S, PM + x, z));
  const B2 = makeBulb(S, { scale: 0.8 }), H = heater(S), IR = iron(S), KT = kettle(S), PHN = phone(S);
  const models = [B2.group, H.group, IR.group, KT.group, PHN.group];
  const names = ['ampul', 'elektrikli soba', 'ütü', 'su ısıtıcısı', 'şarj olan telefon'];
  const rMat = PLZ.map(() => new THREE.MeshPhysicalMaterial({ color: 0x4f8cff, emissive: 0x3f7bff, emissiveIntensity: 1.3, transparent: true, opacity: 0, depthWrite: false }));
  PLZ.forEach(([x, z], i) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.022, 10, 60), rMat[i]); r.rotation.x = Math.PI / 2; r.position.set(PM + x, 0.09, z); scene.add(r); });

  // ------------------------------------------------ sütun grafiği (w2): ampul 30 Ω, direnç 60 Ω, tel 0,03 Ω
  const KB = 0.032;                                   // m / Ω
  const barMat = new THREE.MeshPhysicalMaterial({ color: 0x4f8cff, emissive: 0x2f6fff, emissiveIntensity: 0.5, roughness: 0.3, clearcoat: 0.6 });
  const VALS = [RL, RR, RW], BX = [-0.75, 0, 0.75];
  const bars = VALS.map((v, i) => { const b = new THREE.Mesh(i === 2 ? new THREE.BoxGeometry(0.42, 1, 0.06) : new RoundedBoxGeometry(0.42, 1, 0.42, 3, 0.03), barMat); b.position.set(BX[i], 0, BZ); b.castShadow = true; scene.add(b); return b; });
  check(Math.abs(RR * KB / (RL * KB) - 2) < 1e-9, 'sütun oranı 60/30');
  const lens = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 10, 60), new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.8, transparent: true, opacity: 0 }));
  lens.rotation.x = -0.35; lens.position.set(BX[2], 0.3, BZ + 0.1); scene.add(lens);

  // ------------------------------------------------ kamera: [t, açı, mesafe, yükselme°, hedefX, hedefZ, hedefY]
  const C0 = [0, 9.6, 62, 0, -0.32, 0.1], CP = [0, 9.2, 60, PX, -0.2, 0.1], CM = [0, 9.4, 60, PM, 0.15, 0.1], CB = [0, 7.8, 48, 0, BZ + 0.3, 0.75];
  const cam = camRig(S, [
    [0, 0.0, 11.4, 62, 0, -0.5, 0.1], [Z.h1[1] - 0.6, 0.03, 11.2, 62, 0, -0.48, 0.1], [A.c1 + 1.6, 0.05, 9.6, 62, 0, -0.32, 0.1], [A.k1, -0.05, 9.4, 63, 0, -0.32, 0.1], [A.k4, 0.05, 9.5, 62, 0, -0.32, 0.1],
    [A.p1 + 0.3, ...C0], [A.p1 + 2.0, ...CP], [A.p3 + 2.0, 0.06, 9.2, 60, PX, -0.2, 0.1], [A.g1 + 0.3, -0.04, 9.2, 60, PX, -0.2, 0.1],
    [A.g1 + 2.0, ...CM], [A.w1 + 0.1, 0.06, 9.4, 60, PM, 0.15, 0.1], [A.w1 + 1.8, ...C0], [A.w2 + 0.2, 0.04, 9.6, 62, 0, -0.32, 0.1],
    [A.w2 + 1.6, ...CB], [A.f1 + 0.2, 0.05, 7.8, 48, 0, BZ + 0.3, 0.75], [A.f1 + 1.6, ...C0], [DUR, 0.06, 9.8, 62, 0, -0.32, 0.1],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR);

  return (t) => {
    cam(t);
    const I = It(t), glow = glowOf(I), sl = slot(t);
    bulb.set(glow * (1 + 0.025 * Math.sin(t * 13)));
    swt.set(sw(t));

    // direnç: yukarıdan iner / kalkar
    res.group.visible = sl > 0.004; res.group.position.y = Y + (1 - sl) * 0.9; res.group.scale.setScalar(Math.max(0.001, 0.5 + 0.5 * sl));
    const flash = fade(t, A.k2 + 0.1, Z.k2[1], 0.3) + fade(t, A.f2 + 0.9, A.f2 + 1.7, 0.25);
    res.body.emissiveIntensity = 0.08 + 0.75 * clamp(flash);
    ringMat.opacity = clamp(fade(t, A.k1 + 0.1, Z.k2[1], 0.35) + fade(t, A.f2 + 0.2, A.f2 + 1.0, 0.25));
    vMat.opacity = 0.9 * fade(t, A.k4 + 0.1, Z.k4[1], 0.35);
    bat.glow.emissiveIntensity = 0.15 + 0.6 * fade(t, A.k4 + 0.1, Z.k4[1], 0.35);
    copperW.emissiveIntensity = 0.35 * fade(t, A.w1 + 1.8, Z.w1[1], 0.4) + 0.35 * fade(t, A.f2 + 1.6, A.f2 + 2.4, 0.25);

    // elektronlar: hepsi birlikte hareket eder (dış devrede − → +)
    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const u = ((((k / N) - s / Wc.L) % 1) + 1) % 1;
      Wc.curve.getPointAt(u, pv);
      const inRes = sl > 0.5 && pv.x < -X + 0.06 && Math.abs(pv.z - RES_Z) < RES_LEN / 2;
      if (inRes) { const f = ph[k], w = 0.035; pv.x += w * Math.sin(t * 9 * f[2] + f[0]); pv.y += w * Math.sin(t * 11 * f[2] + f[1]); }
      const inSw = Math.abs(pv.x - X) < 0.05 && Math.abs(pv.z - SW_Z) < SW_GAP / 2 - 0.04;
      sv.setScalar(inSw ? 0.0001 : inRes ? 0.8 : 1);
      m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;

    // akım oku: c2'den itibaren, kalınlığı akımla
    const aOp = easeOut(seg(t, A.c1 + 3.2, A.c1 + 3.7));
    arrowMat.opacity = aOp * (0.35 + 0.65 * glow); arrow.visible = aOp > 0.01;
    arrow.scale.set(1, 0.6 + 0.6 * Math.sqrt(I / I0), 0.6 + 0.6 * Math.sqrt(I / I0));

    // tel boyunca gezen ışık (w1)
    const sp = seg(t, A.w1 + 1.8, A.w1 + 3.2);
    spark.material.opacity = sp > 0 && sp < 1 ? Math.sin(sp * Math.PI) : 0;
    Wc.curve.getPointAt((uSwB + sp * 0.999) % 1, spark.position); spark.position.y += 0.02;

    // boru
    PL.update(t);
    PL.glassMat.emissiveIntensity = 0.0;
    PL.ring.material.opacity = fade(t, T_PINCH + 1.3, Z.p1[1], 0.3); PL.ring.material.emissiveIntensity = 0.9;
    PL.wMat.emissive.setHex(0x3f9bff).lerp(new THREE.Color(0xff3b30), 0.75 * fade(t, Z.p3[0] + 1.2, Z.p3[1], 0.35));

    // mini modeller: sırayla belirir, sonra mavi R halkası
    models.forEach((g, i) => {
      const a = easeOut(seg(t, A.g1 + 2.0 + i * 0.45, A.g1 + 2.5 + i * 0.45));
      plats[i].visible = a > 0.004; plats[i].scale.setScalar(Math.max(0.001, a));
      g.visible = a > 0.004; g.scale.setScalar(Math.max(0.001, a) * (i === 0 ? 0.8 : 1));
      g.position.set(PM + PLZ[i][0], 0.08 + (1 - a) * 0.3, PLZ[i][1]); g.rotation.y = i === 4 ? 0.4 : 0.15 * Math.sin(t * 0.4 + i);
      rMat[i].opacity = easeOut(seg(t, A.g1 + 4.3 + i * 0.1, A.g1 + 4.7 + i * 0.1)) * (0.75 + 0.25 * Math.sin(t * 3 + i));
    });
    B2.set(0.8 + 0.03 * Math.sin(t * 11)); H.hot.emissiveIntensity = 1.4 + 0.2 * Math.sin(t * 2.3);

    // sütunlar (w2)
    bars.forEach((b, i) => {
      const a = easeInOut(seg(t, A.w2 + 1.6 + i * 0.4, A.w2 + 2.2 + i * 0.4));
      const h = Math.max(0.004, VALS[i] * KB * a) * (1 - easeInOut(seg(t, A.f1 + 1.0, A.f1 + 1.6)));
      b.visible = a > 0.002 && h > 0.0005; b.scale.set(1, h, 1); b.position.y = h / 2;
    });
    lens.material.opacity = fade(t, A.w2 + 2.9, A.f1 + 0.8, 0.3) * (0.8 + 0.2 * Math.sin(t * 4));

    yaz(t);

    // kanca alt satırı (bilmece)
    S.text('sub', `9 V pil + ampul + ${bl('60 Ω')}`, { y: 28, size: 4.4, weight: 600, opacity: 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1])), nowrap: true });

    // nesne etiketleri
    const onC = (a, b) => fade(t, a, b, 0.3);
    label('lr', bl('60 Ω'), -X + 0.5, 0.3, RES_Z, { opacity: sl * onC(T_D1 + 0.4, A.p1 + 0.6), size: 4.8 });
    label('lb', bl('≈ 30 Ω'), 0.72, 0.6, -ZH, { opacity: onC(A.k1 + 0.3, A.p1 + 0.6), size: 4.8 });
    label('le', gr('elektronlar'), -0.1, 0.3, ZH - 0.45, { opacity: onC(A.c1 + 2.8, A.k1 + 0.2), size: 4.4 });
    label('la', rd('akım yönü'), 0.0, 0.3, -0.62, { opacity: onC(A.c1 + 3.4, A.k1 + 0.2), size: 4.4 });
    label('lv', hl('9 V'), 0.0, 0.3, ZH - 0.5, { opacity: onC(A.k4 + 0.2, A.p1 + 0.6), size: 5 });
    label('v6', hl('6 V'), -X + 0.5, 0.3, RES_Z + 0.4, { opacity: onC(A.k5 + 0.2, A.p1 + 0.6), size: 4.6 });
    label('v3', hl('3 V'), -0.72, 0.6, -ZH, { opacity: onC(A.k5 + 0.6, A.p1 + 0.6), size: 4.6 });
    label('lw', `tel ≈ ${bl('0,03 Ω')}`, 0.0, 0.3, 0.42, { opacity: onC(A.w1 + 2.4, A.w2 + 1.0), size: 4.6 });
    const pOn = onC(A.p1 + 2.2, A.g1 + 0.6);
    label('pd', 'daralma', PX - PL.XP + 0.62, 0.3, 0, { opacity: onC(T_PINCH + 1.0, A.g1 + 0.6), size: 4.2 });
    label('pq', 'debi', PX + PL.XP - 0.45, 0.75, -0.25, { opacity: onC(T_PINCH + 1.3, A.g1 + 0.6), size: 4.0 });
    label('pp', 'pompa', PX, 0.3, PL.ZP + 0.55, { opacity: pOn * onC(A.p3 + 0.1, A.g1 + 0.6), size: 4.2 });
    label('pc', 'çark', PX + 0.55, 0.45, -PL.ZP, { opacity: pOn * onC(A.p3 + 0.5, A.g1 + 0.6), size: 4.2 });
    names.forEach((n, i) => label('n' + i, n, PM + PLZ[i][0], 0.0, PLZ[i][1] + 0.55, { opacity: easeOut(seg(t, A.g1 + 2.5 + i * 0.45, A.g1 + 2.9 + i * 0.45)) * (1 - easeOut(seg(t, A.w1 + 0.2, A.w1 + 0.6))), size: 3.9 }));
    const bOn = (i) => easeOut(seg(t, A.w2 + 2.1 + i * 0.4, A.w2 + 2.5 + i * 0.4)) * (1 - easeOut(seg(t, A.f1 + 0.3, A.f1 + 0.8)));
    [`ampul<br>≈ ${bl('30 Ω')}`, `direnç<br>${bl('60 Ω')}`, `tel<br>≈ ${bl('0,03 Ω')}`].forEach((n, i) => label('b' + i, n, BX[i], 0.0, BZ + 0.75, { opacity: bOn(i), size: 4.0 }));
    label('ls', 'seri: tek yol, arka arkaya', 0, 0.3, 0.2, { opacity: onC(A.f2 + 0.3, Z.f2[0] + 2.0), size: 4.2 });
  };
}
