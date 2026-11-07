// 001 — Akım, gerilim, direnç nedir ve aralarındaki ilişki (Ohm yasası)
// Tek devre: pil → bakır tel → direnç → pil. Akım kırmızı küreler, gerilim sarı, direnç mavi.
// Zamanlar seslendirmeden gelir (zaman.js, tools/sesle.py çıktısı).

import { clamp, seg, easeInOut, easeOut, fade, lerp, RoundedBoxGeometry } from '../tools/lib/stage.js';
import { Z, DUR } from './001-akim-gerilim-direnc-zaman.js';

// ---------------------------------------------------------------- fizik ve bağımsız doğrulama
const V0 = 9, R0 = 450;               // pil 9 V, direnç 450 Ω (sarı-yeşil-kahverengi: 4,5,×10)
const I_A = V0 / R0;                  // 0,02 A
console.assert(Math.abs(I_A - 0.02) < 1e-12, '9 V / 450 Ω = 0,02 A');
console.assert(Math.abs(I_A * 1000 - 20) < 1e-9, '0,02 A = 20 mA');
console.assert(Math.abs((2 * V0) / R0 - 0.04) < 1e-12, '18 V / 450 Ω = 40 mA');
console.assert(Math.abs(V0 / (2 * R0) - 0.01) < 1e-12, '9 V / 900 Ω = 10 mA');
console.assert((4 * 10 + 5) * 10 === R0, 'renk kodu: sarı(4) yeşil(5) kahverengi(×10) = 450 Ω');
console.assert(Math.abs(I_A * R0 - V0) < 1e-12, 'V = I × R');

export const meta = {
  title: 'Akım, gerilim, direnç nedir? (Ohm yasası)',
  duration: DUR,
  fps: 30,
  music: { bpm: 84, key: 'A', gain: 0.5 },
  voice: 'wip/001-akim-gerilim-direnc/ses.wav',
  voice_at: 0,
  cues: [
    { t: 0.1, kind: 'hum', gain: 0.35 },
    { t: Z.a4[0] + 0.1, kind: 'pop', gain: 0.3 },
    { t: Z.g3[0] + 2.2, kind: 'pop', gain: 0.3 },
    { t: Z.d3[0] + 2.2, kind: 'pop', gain: 0.3 },
    { t: Z.o5[0] + 1.5 + 0.55, kind: 'thud', gain: 0.25 },
    { t: Z.o6[0] + 2.4 + 0.55, kind: 'thud', gain: 0.25 },
  ],
};

// ---------------------------------------------------------------- akım zamanı (mA) ve görsel hız
const T_B2_IN = Z.o5[0] + 1.5, T_B2_OUT = Z.o6[0] + 0.7;      // 2. pil takılı: [T_B2_IN, T_B2_OUT]
const T_R2_IN = Z.o6[0] + 2.4;                                 // 2. direnç takılı: sonrası
const DROP = 0.9;
const b2 = (t) => easeOut(seg(t, T_B2_IN, T_B2_IN + DROP)) * (1 - easeInOut(seg(t, T_B2_OUT, T_B2_OUT + 0.5)));
const r2 = (t) => easeOut(seg(t, T_R2_IN, T_R2_IN + DROP));
// gerilim ve direnç (anlık, yumuşak geçişli) → Ohm yasasından akım
const Vt = (t) => V0 * (1 + b2(t));
const Rt = (t) => R0 * (1 + r2(t));
const It = (t) => Vt(t) / Rt(t);                              // amper
const mA = (t) => It(t) * 1000;
// görsel hız (m/s): 20 mA → 0,7 m/s (doğrusal)
const SPEED_PER_A = 0.7 / 0.02;
const flowSpeed = (t) => It(t) * SPEED_PER_A;
function travelled(t) { let s = 0; const dt = 1 / 60; for (let x = 0; x < t; x += dt) s += flowSpeed(x) * dt; return s; }

// ---------------------------------------------------------------- yerleşim
const X = 0.9, ZH = 1.35, Y = 0.2;                 // devre dikdörtgeni
const BAT_LEN = 0.9;                              // pil uzunluğu (x ekseninde)
const RES_LEN = 0.6, RES_R = 0.15, RES1_Z = -0.45, RES2_Z = 0.45;
const RING_Z = -0.75;                               // akım kesiti halkası: sağ kenar (x = X)

function loopPoints() {
  // saat yönünde: (X,0) → (X,-ZH) → (-X,-ZH) → (-X,ZH) → (X,ZH) → (X,0); köşeler yuvarlak
  const poly = [[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]];
  const r = 0.2, pts = [];
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const p0 = poly[(i + n - 1) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
    const isCorner = i > 0; // poly[0] yan kenarın ortası, düz
    if (!isCorner) { pts.push([p1[0], p1[1]]); continue; }
    const d1 = [p0[0] - p1[0], p0[1] - p1[1]], d2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...d1), l2 = Math.hypot(...d2);
    const a = [p1[0] + (d1[0] / l1) * r, p1[1] + (d1[1] / l1) * r];
    const b = [p1[0] + (d2[0] / l2) * r, p1[1] + (d2[1] / l2) * r];
    for (let k = 0; k <= 10; k++) { // ikinci derece Bezier ile yuvarlak köşe
      const s = k / 10, q = 1 - s;
      pts.push([q * q * a[0] + 2 * q * s * p1[0] + s * s * b[0], q * q * a[1] + 2 * q * s * p1[1] + s * s * b[1]]);
    }
  }
  // düz kenarları sıklaştır
  const dense = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const m = Math.max(1, Math.round(L / 0.06));
    for (let k = 0; k < m; k++) dense.push([a[0] + ((b[0] - a[0]) * k) / m, a[1] + ((b[1] - a[1]) * k) / m]);
  }
  return dense;
}

function canvasTex(THREE, w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

export function build(S) {
  const { THREE, M, scene } = S;
  S.table({ seed: 5 });
  S.lights.key.shadow.camera.left = -3.2; S.lights.key.shadow.camera.right = 3.2;
  S.lights.key.shadow.camera.top = 3.2; S.lights.key.shadow.camera.bottom = -3.2;

  // ------------------------------------------------ bakır tel (kapalı döngü)
  const pts3 = loopPoints().map(([x, z]) => new THREE.Vector3(x, Y, z));
  const curve = new THREE.CatmullRomCurve3(pts3, true, 'centripetal');
  curve.arcLengthDivisions = 3000;
  const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 900, 0.03, 12, true), M.copper);
  wire.castShadow = true; scene.add(wire);
  const L = curve.getLength();
  // bir noktanın eğri üzerindeki konumu (0..1): en yakın örnek
  const uOf = (x, z) => { let best = 0, bd = 1e9; for (let i = 0; i < 2000; i++) { const p = curve.getPointAt(i / 2000); const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; best = i / 2000; } } return best; };

  // ------------------------------------------------ pil
  const platePlastic = new THREE.MeshPhysicalMaterial({ color: 0x24282f, roughness: 0.38, clearcoat: 0.5, clearcoatRoughness: 0.2 });
  const yellowGlow = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 0, metalness: 0.9, roughness: 0.3 });
  function makeBattery(name, flip) {
    const g = new THREE.Group();          // dış grup: konum; yazı hep okunur durur
    const inner = new THREE.Group();      // iç grup: + ucu flip'e göre yön değiştirir
    if (flip) inner.rotation.y = Math.PI;
    g.add(inner);
    const h = 0.34, w = 0.36;
    const body = new THREE.Mesh(new RoundedBoxGeometry(BAT_LEN, h, w, 4, 0.035), platePlastic);
    body.position.y = h / 2; body.castShadow = body.receiveShadow = true; inner.add(body);
    const capP = new THREE.Mesh(new RoundedBoxGeometry(0.16, h + 0.012, w + 0.012, 3, 0.03), yellowGlow);
    capP.position.set(BAT_LEN / 2 - 0.07, h / 2, 0); inner.add(capP);
    const capN = new THREE.Mesh(new RoundedBoxGeometry(0.1, h + 0.012, w + 0.012, 3, 0.03), M.steel);
    capN.position.set(-BAT_LEN / 2 + 0.04, h / 2, 0); inner.add(capN);
    const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20), M.gold);
    nub.rotation.z = Math.PI / 2; nub.position.set(BAT_LEN / 2 + 0.02, Y, 0); inner.add(nub);
    const tex = canvasTex(THREE, 1024, 360, (c, W, H) => {
      c.clearRect(0, 0, W, H);
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '900 210px "InterDisplay", sans-serif';
      c.fillStyle = '#ffffff'; c.fillText('9 V', W / 2, H / 2 + 8);
      c.font = '900 230px "InterDisplay", sans-serif';
      c.fillStyle = '#ff5a4f'; c.fillText('+', flip ? 110 : W - 110, H / 2 + 6);
      c.fillStyle = '#6fb2ff'; c.fillText('−', flip ? W - 110 : 110, H / 2 + 6);
    });
    const lab = new THREE.Mesh(new THREE.PlaneGeometry(BAT_LEN * 0.8, BAT_LEN * 0.8 * 360 / 1024), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    lab.rotation.x = -Math.PI / 2; lab.position.set(0.0, h + 0.002, 0); g.add(lab);
    g.name = name;
    scene.add(g);
    return g;
  }
  const bat1 = makeBattery('p1', false);
  bat1.position.set(0, 0, ZH);                                      // alt kenar: + ucu sağda (akım yönü +x)
  const bat2 = makeBattery('p2', true);
  bat2.position.set(0, 0, -ZH);                                     // üst kenar: + ucu solda (akım yönü −x, seri)
  const bat1Light = new THREE.PointLight(0xffd23f, 0, 3.2, 2); bat1Light.position.set(0, 0.9, ZH - 0.5); scene.add(bat1Light);

  // ------------------------------------------------ direnç (kesitli: içi görünür)
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xd9c4a0, roughness: 0.35, metalness: 0, transparent: true, opacity: 0.4, depthWrite: false, clearcoat: 0.8, clearcoatRoughness: 0.1, emissive: 0x2f6fff, emissiveIntensity: 0 });
  const bandCols = [0xe6c200, 0x2e9b45, 0x6b3a1d, 0xd4af37]; // sarı, yeşil, kahverengi, altın
  function makeResistor() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(RES_R, RES_R, RES_LEN, 40), bodyMat);
    body.rotation.x = Math.PI / 2; body.renderOrder = 2; g.add(body);
    for (const s of [-1, 1]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 28), M.steel);
      cap.rotation.x = Math.PI / 2; cap.position.z = s * (RES_LEN / 2 + 0.03); cap.castShadow = true; g.add(cap);
    }
    bandCols.forEach((c, i) => {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(RES_R + 0.004, RES_R + 0.004, 0.055, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.4, metalness: i === 3 ? 0.8 : 0, side: THREE.DoubleSide }));
      band.rotation.x = Math.PI / 2; band.position.z = -0.24 + i * 0.12 + (i === 3 ? 0.08 : 0); g.add(band);
    });
    // engeller: gümüş küreler (iç duvara yakın, yükün yolunu daraltır)
    const rr = M.iron;
    for (let k = 0; k < 14; k++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.03, 14, 10), rr);
      const ang = k * 2.4;
      s.position.set(0.108 * Math.cos(ang), 0.108 * Math.sin(ang), -RES_LEN / 2 + 0.07 + (k * (RES_LEN - 0.14)) / 13);
      g.add(s);
    }
    scene.add(g);
    return g;
  }
  const res1 = makeResistor(); res1.position.set(-X, Y, RES1_Z);
  const res2 = makeResistor(); res2.position.set(-X, Y, RES2_Z);

  // ------------------------------------------------ akım kesiti halkası
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.012, 12, 48), ringMat);
  ring.position.set(X, Y, RING_Z); scene.add(ring);
  const uRing = uOf(X, RING_Z);

  // ------------------------------------------------ yükler (kırmızı küreler)
  const N = 52;
  const cMat = new THREE.MeshPhysicalMaterial({ color: 0xe8231a, emissive: 0xe8231a, emissiveIntensity: 0.5, roughness: 0.25, clearcoat: 1 });
  const charges = new THREE.InstancedMesh(new THREE.SphereGeometry(0.052, 20, 14), cMat, N);
  charges.castShadow = true; scene.add(charges);
  const mtx = new THREE.Matrix4(), qt = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
  const R = S.rng(9);
  const ph = Array.from({ length: N }, () => [R() * 6.28, R() * 6.28, 0.8 + R() * 0.6]);

  // ------------------------------------------------ etiket (3B → ekran)
  const proj = new THREE.Vector3();
  const label = (id, html, wx, wy, wz, { size = 5.2, opacity = 1 } = {}) => {
    proj.set(wx, wy, wz).project(S.camera);
    S.text(id, html, { x: (proj.x * 0.5 + 0.5) * 100, y: (0.5 - proj.y * 0.5) * 100, size, opacity, maxWidth: 40, nowrap: true });
  };

  // ------------------------------------------------ kamera
  const camKeys = [ // t, açı, mesafe, yükselme (derece), hedef x, z
    [0, -0.2, 9.6, 56, 0, 0.05],
    [Z.a1[0], -0.1, 9.4, 56, 0, 0.05],
    [Z.g1[0], 0.1, 9.3, 56, 0, 0.1],
    [Z.d1[0], 0.22, 9.2, 55, -0.05, -0.05],
    [Z.o1[0], 0.05, 9.6, 56, 0, 0.05],
    [Z.o6[0], -0.12, 9.6, 56, 0, 0.05],
    [DUR, 0.15, 9.8, 57, 0, 0.05],
  ];
  function cam(t) {
    let i = 0; while (i < camKeys.length - 2 && t > camKeys[i + 1][0]) i++;
    const a = camKeys[i], b = camKeys[i + 1], p = easeInOut(seg(t, a[0], b[0]));
    const v = a.map((x, k) => lerp(x, b[k], p));
    const el = (v[3] * Math.PI) / 180, D = v[2];
    S.camera.position.set(v[4] + D * Math.cos(el) * Math.sin(v[1]), 0.1 + D * Math.sin(el), v[5] + D * Math.cos(el) * Math.cos(v[1]));
    S.camera.lookAt(new THREE.Vector3(v[4], 0.1, v[5]));
    S.camera.updateMatrixWorld();
  }

  // ------------------------------------------------ üst yazılar
  const top = (id, t0, t1, l1, l2, { s1 = 7.4, s2 = 5.4, d = 0.2 } = {}) => (t) => {
    const o = fade(t, t0, t1, d);
    S.text(id + 'a', l1, { y: 9, size: s1, opacity: o, maxWidth: 94, nowrap: true });
    S.text(id + 'b', l2 || '', { y: 17.5, size: s2, weight: 700, opacity: l2 ? o : 0, maxWidth: 94, nowrap: true });
  };
  const hl = (s) => `<span class="hl">${s}</span>`, rd = (s) => `<span class="rd">${s}</span>`, bl = (s) => `<span class="bl">${s}</span>`;
  const topDefs = [
    top('h', 0, Z.a1[0], `${rd('Akım')}, ${hl('gerilim')},`, `${bl('direnç')} nedir? Aralarında ne ilişki var?`, { s1: 8.4, s2: 4.6 }),
    top('a1', Z.a1[0], Z.a2[0], rd('Akım'), 'kapalı devrede dolaşan yükler', { s1: 9 }),
    top('a2', Z.a2[0], Z.a3[0], 'Saniyede geçen yük', `çoksa ${rd('akım büyüktür')}`),
    top('a3', Z.a3[0], Z.a4[0], `${rd('I')} = Q / t`, '1 kulon ÷ 1 saniye = 1 amper', { s1: 9, s2: 4.6 }),
    top('a4', Z.a4[0], Z.g1[0], `${rd('I')} = akım`, 'birimi: amper (A)'),
    top('g1', Z.g1[0], Z.g2[0], hl('Gerilim'), 'yükleri iten etki', { s1: 9 }),
    top('g2', Z.g2[0], Z.g3[0], `Büyük ${hl('gerilim')}`, 'daha güçlü itme'),
    top('g3', Z.g3[0], Z.d1[0], `${hl('V')} = gerilim`, 'birimi: volt (V)'),
    top('d1', Z.d1[0], Z.d2[0], bl('Direnç'), 'yükün yolundaki engel', { s1: 9 }),
    top('d2', Z.d2[0], Z.d3[0], 'Yükler engellere çarpar', `ve ${bl('zorlanır')}`, { s1: 6.6 }),
    top('d3', Z.d3[0], Z.o1[0], `${bl('R')} = direnç`, 'birimi: ohm (Ω)'),
    top('o1', Z.o1[0], Z.o2[0], `${hl('Ohm')} yasası`, 'üçü arasındaki ilişki', { s1: 8.4 }),
    top('o2', Z.o2[0], Z.o3[0], `${hl('V')} = ${rd('I')} × ${bl('R')}`, 'gerilim = akım × direnç', { s1: 10, s2: 5 }),
    top('o3', Z.o3[0], Z.o4[0], `${rd('I')} = ${hl('V')} / ${bl('R')}`, 'akım = gerilim ÷ direnç', { s1: 10, s2: 5 }),
    top('o4', Z.o4[0], T_B2_IN + 0.2, `${rd('I')} = ${hl('9 V')} / ${bl('450 Ω')}`, `= 0,02 A = ${rd('20 mA')}`, { s1: 8, s2: 6.2 }),
    top('o5', T_B2_IN + 0.2, T_B2_OUT + 0.25, `${rd('I')} = ${hl('18 V')} / ${bl('450 Ω')}`, `= 0,04 A = ${rd('40 mA')} (2 kat)`, { s1: 8, s2: 6.2 }),
    top('o6a', T_B2_OUT + 0.25, T_R2_IN + 0.2, `${rd('I')} = ${hl('9 V')} / ${bl('450 Ω')}`, `= 0,02 A = ${rd('20 mA')}`, { s1: 8, s2: 6.2 }),
    top('o6', T_R2_IN + 0.2, Z.o7[0], `${rd('I')} = ${hl('9 V')} / ${bl('900 Ω')}`, `= 0,01 A = ${rd('10 mA')} (yarısı)`, { s1: 8, s2: 6.2 }),
    top('o7', Z.o7[0], Z.s1[0], `${hl('V')} artarsa ${rd('I')} artar`, `${bl('R')} artarsa ${rd('I')} azalır`, { s1: 7, s2: 7 }),
    top('s1', Z.s1[0], Z.s2[0], `${hl('Gerilim')} iter,`, `${bl('direnç')} engeller, ${rd('akım')} akar`, { s1: 8, s2: 5.4 }),
    top('s2', Z.s2[0], DUR + 1, `${hl('V')} = ${rd('I')} × ${bl('R')}`, 'Ohm yasası', { s1: 10.5, s2: 5.4 }),
  ];

  // bir yazı, bir sonrakinin başladığı ana kadar kalır (boş ekran kalmaz)
  const tops = topDefs;
  // ------------------------------------------------ kare fonksiyonu
  return (t) => {
    cam(t);
    const s = travelled(t);
    const lastIn = (id) => t >= Z[id][0];

    // pil 2 ve direnç 2 (takılma animasyonu)
    const p2 = b2(t), q2 = r2(t);
    bat2.visible = p2 > 0.004; bat2.position.y = (1 - p2) * 0.25; bat2.scale.setScalar(Math.max(0.001, p2)); // yerinde büyüyerek takılır, küçülerek çıkar (yazı bandına girmez)
    res2.visible = q2 > 0.004; res2.position.y = Y + (1 - q2) * 0.25; res2.scale.setScalar(Math.max(0.001, q2));

    // yükler
    const tt = t;
    const reg = (p, zc, a) => (a > 0.004 && p.x < -X + 0.06 && Math.abs(p.z - zc) < RES_LEN / 2 + 0.06) ? a * clamp(1 - (Math.abs(p.z - zc) - (RES_LEN / 2 - 0.1)) / 0.16) : 0;
    let pulse = 0;
    for (let k = 0; k < N; k++) {
      const u = (((k / N + s / L) % 1) + 1) % 1;
      curve.getPointAt(u, ps);
      const w = Math.max(reg(ps, RES1_Z, 1), reg(ps, RES2_Z, q2));
      let rad = 1;
      if (w > 0) {
        const f = ph[k];
        ps.x += 0.034 * w * Math.sin(tt * 9 * f[2] + f[0]);
        ps.y += 0.034 * w * Math.sin(tt * 11 * f[2] + f[1]);
        rad = 1 - 0.2 * w;
      }
      sc.setScalar(rad);
      mtx.compose(ps, qt, sc);
      charges.setMatrixAt(k, mtx);
      let d = (u - uRing + 0.5) % 1; if (d < 0) d += 1; d = (d - 0.5) * L;
      pulse = Math.max(pulse, Math.exp(-((d / 0.07) ** 2)));
    }
    charges.instanceMatrix.needsUpdate = true;

    // halka: akımı anlatırken görünür
    const ringOp = fade(t, Z.a2[0] - 0.1, Z.a4[1] + 0.2, 0.4);
    ringMat.opacity = ringOp * (0.35 + 0.65 * pulse);

    // vurgular
    const gerilimOn = fade(t, Z.g1[0] - 0.1, Z.g3[1] + 0.2, 0.4);
    const pls = 0.5 + 0.5 * Math.sin(t * 5);
    yellowGlow.emissiveIntensity = 0.15 + gerilimOn * (0.6 + 0.8 * pls);
    bat1Light.intensity = gerilimOn * (1.2 + 1.2 * pls);
    const dOn = fade(t, Z.d1[0] - 0.1, Z.d3[1] + 0.2, 0.4);
    bodyMat.emissiveIntensity = 0.08 + dOn * (0.55 + 0.25 * Math.sin(t * 4)) + 0.4 * clamp((mA(t) - 20) / 40) * 0;

    // üst yazılar
    for (const f of tops) f(t);

    // nesne etiketleri
    const vShow = t >= Z.g3[0] + 2.0;
    const rShow = t >= Z.d3[0] + 2.0;
    const iShow = t >= Z.a4[0];
    const ohm = t >= Z.o1[0];
    // etiketler yalnızca gerçek devre değerlerini gösterir (geçişte ara değer yok): pil/direnç yerine oturunca değişir
    const v = V0 * (b2(t) > 0.5 ? 2 : 1), r = R0 * (r2(t) > 0.5 ? 2 : 1);
    const num = (x) => (Math.round(x) + '');
    label('lv', `<span class="hl">${ohm ? 'V = ' + num(v) + ' V' : 'V = ' + num(v) + ' V'}</span>`, 0.0, 0.45, ZH - 0.6, { opacity: vShow ? easeOut(seg(t, Z.g3[0] + 2.0, Z.g3[0] + 2.4)) : 0, size: 5.4 });
    label('lr', `<span class="bl">R = ${num(r)} Ω</span>`, -0.3, 0.45, lerp(RES1_Z + 0.12, (RES1_Z + RES2_Z) / 2, q2), { opacity: rShow ? easeOut(seg(t, Z.d3[0] + 2.0, Z.d3[0] + 2.4)) : 0, size: 5.4 });
    const iTxt = ohm ? `I = ${num((v / r) * 1000)} mA` : 'I';
    console.assert([10, 20, 40].includes(Math.round((v / r) * 1000)), 'etiket akımı 10/20/40 mA olmalı');
    label('li', `<span class="rd">${iTxt}</span>`, X - 0.5, 0.5, RING_Z + 0.2, { opacity: iShow ? easeOut(seg(t, Z.a4[0], Z.a4[0] + 0.4)) : 0, size: ohm ? 5.4 : 6.4 });
  };
}
