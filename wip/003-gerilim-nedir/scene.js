// 003 — Gerilim nedir? (4'lü serinin 2. videosu)
// Animasyon anlatır, yazı doğrular (AGENT.md 2a). Elektronlar yeşil, − → + akar; geleneksel akım oku kırmızı, + → −.
// Gerilim sarı. Telde potansiyel renk geçişi: + ucu (yüksek) sarı → − ucu (düşük) koyu turuncu; düşüş ampulde olur.
// Akım değeri gösterilmez (Ohm yasası 4. videoda); yalnızca gerilim değerleri.

import { THREE, clamp, seg, easeInOut, easeOut, fade, lerp, RoundedBoxGeometry } from '../../tools/lib/stage.js';
import { hl, rd, gr, cu, check, timeline, narration } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, projLabel, camRig, canvasTex } from '../../tools/lib/parcalar.js';
import { makeBulb, platform } from '../../tools/lib/devre.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pre: 1.8, l1: 'Ampul neden parladı?', s1: 7 },
  { id: 'c1', pre: 0.8, l1: `${gr('Elektronlar')}: − → +`, s1: 7 },
  { id: 'c2', pre: 1.0, l1: `${rd('Akım yönü')}: + → − (kabul)`, s1: 6.8 },
  { id: 'p1', pre: 2.2, l1: `+ ${hl('yüksek')}, − ${cu('düşük')} potansiyel`, s1: 6.4 },
  { id: 'p2', pre: 0.5, l1: `Bu fark: ${hl('gerilim')}`, s1: 7.2 },
  { id: 'p3', pre: 1.2, l1: `${hl('Gerilim')}, yükleri iter`, s1: 7 },
  { id: 'g1', pre: 4.0, l1: `Her kaynağın ${hl('gerilimi')} var`, s1: 6.6 },
  { id: 'v1', pre: 3.4, l1: `${hl('Gerilim')} ↓ → ${rd('Akım')} ↓`, s1: 7.4, extra: 0.3 },
  { id: 'v2', pre: 1.8, l1: `${hl('Gerilim')} ↑ → ${rd('Akım')} ↑`, s1: 7.4, extra: 0.3 },
  { id: 'k1', pre: 0.5, l1: `${hl('Gerilim')}: potansiyel farkı`, l2: `birimi: volt (${hl('V')})`, s1: 6.4, s2: 6, extra: 1.6 },
];
const { Z, A, DUR } = timeline(BEATS, { k: 1.03 });
export const _T = { Z, A };

// ---------------------------------------------------------------- devre değerleri ve doğrulama
const RB = 30;                                        // ampul filamanı ~30 Ω (gösterilmez, aynı ampul)
const V_AA = 1.5, V_9 = 9;
// pillerin devredeki yerleşimi (0 = yok, 1 = yerinde)
const H_OUT = [0.7, 1.0], H_IN = [1.1, 1.5];          // kanca: AA çıkar, 9 V girer
const V1_OUT = [A.v1 + 0.1, A.v1 + 0.5];              // v1: 9 V çıkar
const FLY = [A.v1 + 0.4, A.v1 + 2.2];                 // AA platformdan devreye uçar
const V2_OUT = [A.v2 + 0.1, A.v2 + 0.4], V2_IN = [A.v2 + 0.5, A.v2 + 0.9];
const sAA = (t) => (t < A.v1 ? 1 - easeInOut(seg(t, ...H_OUT)) : t < A.v2 ? (t >= FLY[1] ? 1 : 0) : 1 - easeInOut(seg(t, ...V2_OUT)));
const s9 = (t) => (t < A.v1 ? easeOut(seg(t, ...H_IN)) * (1 - easeInOut(seg(t, ...V1_OUT))) : easeOut(seg(t, ...V2_IN)));
// gerilim: yalnızca yerine oturmuş pil iter; oturma anında 0,3 sn'lik yumuşak geçiş
const KEYS = [[0, V_AA], [H_OUT[0], V_AA], [H_OUT[0] + 0.25, 0], [H_IN[1] - 0.1, 0], [H_IN[1] + 0.3, V_9],
  [V1_OUT[0], V_9], [V1_OUT[0] + 0.25, 0], [FLY[1], 0], [FLY[1] + 0.3, V_AA],
  [V2_OUT[0], V_AA], [V2_OUT[0] + 0.2, 0], [V2_IN[1] - 0.1, 0], [V2_IN[1] + 0.3, V_9], [DUR + 1, V_9]];
const Vt = (t) => { let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++; const [a, va] = KEYS[i], [b, vb] = KEYS[i + 1]; return lerp(va, vb, easeInOut(seg(t, a, b))); };
const It = (t) => Vt(t) / RB;                         // amper (görsel için)
// Doğrulama: aynı ampulde gerilim artınca akım artar
check(V_AA / RB < V_9 / RB, 'V artınca I artar');
check(Math.abs(Vt(0) - 1.5) < 1e-9 && Math.abs(Vt(Z.c1[0]) - 9) < 1e-9, 'kanca: 1,5 V → 9 V');
check(Math.abs(Vt(Z.v1[0]) - 1.5) < 1e-9 && Math.abs(Vt(Z.v2[0]) - 9) < 1e-9, 'v1 etiketi 1,5 V, v2 etiketi 9 V iken');
check(Vt(A.v1 + 1.0) === 0, 'pil yokken gerilim 0');
// gerçek hayat kaynaklarının anma gerilimleri
const SRC = [['AA pil', '1,5 V', 1.5], ['telefon pili', '3,7 V', 3.7], ['şarj adaptörü', '5 V', 5], ['araba aküsü', '12 V', 12]];
for (const [, s, v] of SRC) check(s === `${String(v).replace('.', ',')} V`, `etiket ${s}`);
// görsel: akış hızı ve ampul parlaklığı akımla artar (tekdüze)
const speedOf = (I) => 2.6 * Math.sqrt(I);            // m/s
const glowOf = (I) => clamp(Math.pow(I / 0.3, 0.9));
let _s = 0, _t = 0;                                    // sırayla ilerleyen kareler için artımlı integral
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += speedOf(It(_t)) * dt; _t += dt; }
  return _s + speedOf(It(_t)) * (t - _t);
};

// ---------------------------------------------------------------- efektler
const humSeg = (a, b, V) => ({ t: a, kind: 'hum', d: b - a, gain: 0.2 + 0.4 * glowOf(V / RB) });
export const meta = {
  title: 'Gerilim nedir?',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    humSeg(0.05, H_OUT[0] + 0.2, V_AA),
    { t: H_IN[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(H_IN[1] + 0.1, V1_OUT[0] + 0.2, V_9),
    { t: A.c2 + 0.15, kind: 'pop', gain: 0.22 },
    { t: A.p1 + 0.2, kind: 'pop', gain: 0.22 },
    ...[0, 1, 2, 3].map((i) => ({ t: A.g1 + 1.0 + i * 0.7, kind: 'thud', gain: 0.18 })),
    { t: FLY[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(FLY[1] + 0.1, V2_OUT[0] + 0.15, V_AA),
    { t: V2_IN[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(V2_IN[1] + 0.1, DUR - 0.3, V_9),
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                    // devre dikdörtgeni (x sağ, z izleyiciye)
const PX = 7.2;                                       // mini modeller: sağdaki ikinci alan
const PLZ = [[-0.6, -0.75], [0.6, -0.75], [-0.6, 0.65], [0.6, 0.65]];
const YEL = new THREE.Color(0xffd23f), ORG = new THREE.Color(0x8a2a00), MID = new THREE.Color(0x6e4a2e);

const textTex = (txt, { w = 512, h = 200, color = '#ffffff', bg = null, size = 120 } = {}) => canvasTex(w, h, (c, W, H) => {
  if (bg) { c.fillStyle = bg; c.fillRect(0, 0, W, H); }
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${size}px "InterDisplay", sans-serif`; c.fillStyle = color; c.fillText(txt, W / 2, H / 2 + 6);
});
const topPlane = (tex, w, h, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); m.rotation.x = -Math.PI / 2; m.position.y = y; return m; };

function aaCell(S, { len = 0.9, r = 0.15 } = {}) {
  // AA kalem pil, x ekseninde, + ucu (çıkıntı) +x; alt yüzey y=0
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 40), new THREE.MeshPhysicalMaterial({ color: 0x23262c, roughness: 0.35, clearcoat: 0.6 }));
  body.rotation.z = Math.PI / 2; body.position.y = r; body.castShadow = true; g.add(body);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.003, r + 0.003, len * 0.28, 40), new THREE.MeshPhysicalMaterial({ color: 0xc8744a, metalness: 0.8, roughness: 0.3 }));
  band.rotation.z = Math.PI / 2; band.position.set(len * 0.36, r, 0); g.add(band);
  const nub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.35, r * 0.35, 0.05, 20), S.M.steel); nub.rotation.z = Math.PI / 2; nub.position.set(len / 2 + 0.025, r, 0); g.add(nub);
  const neg = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.9, r * 0.9, 0.012, 32), S.M.steel); neg.rotation.z = Math.PI / 2; neg.position.set(-len / 2 - 0.006, r, 0); g.add(neg);
  const lab = topPlane(canvasTex(1024, 300, (c, W, H) => {
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '900 190px "InterDisplay", sans-serif';
    c.fillStyle = '#ffffff'; c.fillText('1,5 V', W / 2 - 60, H / 2 + 6);
    c.fillStyle = '#ff5a4f'; c.fillText('+', W - 80, H / 2 + 6); c.fillStyle = '#6fb2ff'; c.fillText('−', 80, H / 2 + 6);
  }), len * 0.85, len * 0.85 * 300 / 1024, 2 * r + 0.004);
  g.add(lab);
  S.scene.add(g); return { group: g };
}

function phoneCell(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.05, 0.4, 3, 0.015), new THREE.MeshPhysicalMaterial({ color: 0x9aa0a8, metalness: 0.7, roughness: 0.35 }));
  body.position.y = 0.025; body.castShadow = true; g.add(body);
  g.add(topPlane(textTex('3,7 V', { color: '#20242a', size: 130 }), 0.42, 0.16, 0.052));
  for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.06), S.M.gold); c.position.set(0.27, 0.056, -0.08 + k * 0.08); g.add(c); }
  S.scene.add(g); return { group: g };
}

function adapter(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.3, 0.34, 4, 0.05), S.M.plasticWhite);
  body.position.y = 0.15; body.castShadow = true; g.add(body);
  for (const s of [-1, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.18, 14), S.M.steel); p.rotation.x = Math.PI / 2; p.position.set(s * 0.08, 0.15, -0.26); g.add(p); }
  const usb = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.01), S.M.plasticBlack); usb.position.set(0, 0.15, 0.172); g.add(usb);
  g.add(topPlane(textTex('5 V', { color: '#20242a', size: 150 }), 0.26, 0.1, 0.302));
  S.scene.add(g); return { group: g };
}

function carBattery(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.6, 0.34, 0.36, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, roughness: 0.5, clearcoat: 0.2 }));
  body.position.y = 0.17; body.castShadow = true; g.add(body);
  const lid = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.04, 0.38, 3, 0.015), new THREE.MeshPhysicalMaterial({ color: 0x3a3e46, roughness: 0.45 }));
  lid.position.y = 0.35; g.add(lid);
  for (const [x, col] of [[0.2, 0xd23a2e], [-0.2, 0x1b1d21]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.07, 20), S.M.steel); post.position.set(x, 0.4, -0.08); g.add(post);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 20), new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.4 })); cap.position.set(x, 0.385, -0.08); g.add(cap);
  }
  g.add(topPlane(textTex('12 V', { size: 140 }), 0.3, 0.12, 0.372).translateY(-0.08));
  S.scene.add(g); return { group: g };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 40, seed: 7 });
  const sc = S.lights.key.shadow.camera; sc.left = -3.5; sc.right = 10; sc.top = 4; sc.bottom = -4; sc.updateProjectionMatrix();
  const label = projLabel(S);

  // ------------------------------------------------ devre: kapalı bakır tel, pil (AA / 9 V), ampul
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const W = closedWire(S, loop, { y: Y });
  const bat = battery(S, { y: Y }); bat.group.position.set(0, 0, ZH);       // + ucu sağda (+x)
  const aa = aaCell(S); aa.group.position.set(0, 0.05, ZH);
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH);

  // ------------------------------------------------ potansiyel renk katmanı (+ → ampul: sarı, ampulde düşüş, ampul → −: koyu turuncu)
  const TS = 900, RS = 12;
  const potGeo = new THREE.TubeGeometry(W.curve, TS, 0.04, RS, true);
  const nV = potGeo.attributes.position.count, cols = new Float32Array(nV * 3);
  potGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const potMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
  const pot = new THREE.Mesh(potGeo, potMat); pot.renderOrder = 1; scene.add(pot);
  const uP = W.uOf(0.45, ZH), uN = W.uOf(-0.45, ZH), uB1 = W.uOf(0.22, -ZH), uB2 = W.uOf(-0.22, -ZH);
  const fw = (u) => (((u - uP) % 1) + 1) % 1;          // + ucundan geleneksel akım yönünde uzaklık
  const dB1 = fw(uB1), dB2 = fw(uB2), dN = fw(uN);
  check(dB1 < dB2 && dB2 < dN, 'yol sırası: + → ampul → −');
  const phi = (u) => { const d = fw(u); if (d <= dB1) return 1 - 0.04 * d / dB1; if (d <= dB2) return lerp(0.96, 0.04, easeInOut((d - dB1) / (dB2 - dB1))); if (d <= dN) return 0.04 * (1 - (d - dB2) / (dN - dB2)); return (d - dN) / (1 - dN); };
  const PHI = new Float32Array(TS + 1); for (let j = 0; j <= TS; j++) PHI[j] = phi(j / TS);
  const tmpC = new THREE.Color();
  let lastK = -1;
  const paint = (k) => {
    if (Math.abs(k - lastK) < 0.004) return; lastK = k;
    for (let i = 0; i < nV; i++) { const j = Math.floor(i / (RS + 1)); tmpC.copy(MID).lerp(PHI[j] > 0.5 ? YEL : ORG, Math.abs(PHI[j] - 0.5) * 2 * k); cols.set([tmpC.r, tmpC.g, tmpC.b], i * 3); }
    potGeo.attributes.color.needsUpdate = true;
  };

  // ------------------------------------------------ elektronlar (yeşil): eğrinin ters yönünde (− → +)
  const N = 46;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 1.1, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; scene.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();

  // ------------------------------------------------ geleneksel akım oku (kırmızı, + → −): sağ kenar boyunca −z yönüne
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.6, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.55; arrow.add(head);
  arrow.position.set(X - 0.38, 0.25, 0.1); arrow.rotation.y = Math.PI / 2; scene.add(arrow);

  // ------------------------------------------------ ikinci alan: platformlar ve gerçek hayat kaynakları
  const plats = PLZ.map(([x, z]) => platform(S, PX + x, z, { r: 0.46 }));
  const mAA = aaCell(S), mPh = phoneCell(S), mAd = adapter(S), mCar = carBattery(S);
  const models = [mAA.group, mPh.group, mAd.group, mCar.group];
  const MSC = [0.62, 0.95, 1.0, 0.95];

  // ------------------------------------------------ kamera: [t, açı, mesafe, yükselme, hedefX, hedefZ]
  const C0 = [0, 9.6, 62, 0, -0.32], C1 = [0, 8.8, 60, PX, -0.2];
  const cam = camRig(S, [
    [0, ...C0], [A.g1 + 0.1, 0.04, 9.6, 62, 0, -0.32], [A.g1 + 1.4, ...C1], [A.v1 + 0.3, ...C1], [FLY[1] - 0.2, ...C0],
    [A.v2, -0.04, 9.5, 62, 0, -0.32], [A.k1, 0.02, 9.4, 62, 0, -0.32], [DUR, 0.05, 9.0, 63, 0, -0.3],
  ]);
  const yaz = narration(S, BEATS, Z);

  const homeAA = new THREE.Vector3(PX + PLZ[0][0], 0.08, PLZ[0][1]), dstAA = new THREE.Vector3(0, 0.05, ZH), pAA = new THREE.Vector3();

  return (t) => {
    cam(t);
    const V = Vt(t), I = V / RB, glow = glowOf(I);
    bulb.set(glow);

    // devredeki piller: büyüyerek/küçülerek yer değiştirir
    const a9 = s9(t);
    bat.group.visible = a9 > 0.004; bat.group.scale.setScalar(Math.max(0.001, a9)); bat.group.position.y = (1 - a9) * 0.35;
    const aIn = sAA(t);
    if (t < A.v1 || t >= A.v2) {
      aa.group.visible = aIn > 0.004; aa.group.scale.setScalar(Math.max(0.001, aIn)); aa.group.position.set(0, 0.05 + (1 - aIn) * 0.35, ZH);
    } else {
      // v1: AA platformdan havalanıp devreye uçar
      const f = easeInOut(seg(t, ...FLY));
      pAA.copy(homeAA).lerp(dstAA, f); pAA.y += Math.sin(f * Math.PI) * 1.4;
      aa.group.position.copy(pAA); aa.group.scale.setScalar(lerp(MSC[0], 1, f)); aa.group.visible = t >= FLY[0];
    }

    // potansiyel renk katmanı: p1'den itibaren; renk farkı gerilimle orantılı
    const potOn = easeOut(seg(t, A.p1 + 0.1, A.p1 + 1.0));
    potMat.opacity = 0.9 * potOn; pot.visible = potOn > 0.01;
    const emph = fade(t, A.p2, Z.p2[1], 0.4);
    paint(clamp(V / V_9) * (0.85 + 0.15 * emph));

    // elektronlar: − → + (eğri parametresinin tersi); p3'te biraz büyür (itilen yükler)
    const s = dist(t), big = 1 + 0.35 * fade(t, A.p3, Z.p3[1], 0.4);
    for (let k = 0; k < N; k++) {
      const u = ((((k / N) - s / W.L) % 1) + 1) % 1;
      W.curve.getPointAt(u, pv);
      const inBat = Math.abs(pv.x) < 0.47 && pv.z > ZH - 0.1;
      sv.setScalar(inBat ? 0.0001 : big);
      m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;

    // akım oku: c2'den itibaren
    const aOp = easeOut(seg(t, A.c2 + 0.1, A.c2 + 0.6));
    arrowMat.opacity = aOp; arrow.visible = aOp > 0.01;

    // platformlar ve mini modeller (g1): sırayla belirir; v1'de AA uçar, diğerleri kaybolur
    models.forEach((g, i) => {
      const a = easeOut(seg(t, A.g1 + 0.8 + i * 0.7, A.g1 + 1.3 + i * 0.7));
      const out = easeInOut(seg(t, A.v1 + 2.4, A.v1 + 3.0));
      plats[i].visible = a > 0.004 && out < 0.999; plats[i].scale.setScalar(Math.max(0.001, a * (1 - out)));
      if (i === 0 && t >= A.v1) return;
      const sc0 = Math.max(0.001, a * (1 - out) * MSC[i]);
      g.visible = sc0 > 0.004; g.scale.setScalar(sc0);
      g.position.set(PX + PLZ[i][0], 0.08 + (1 - a) * 0.3, PLZ[i][1]);
    });

    yaz(t);

    // nesne etiketleri
    const pl = fade(t, A.p1 + 0.6, A.g1 + 0.4, 0.3);
    label('py', hl('yüksek'), X - 0.42, 0.3, -0.8, { opacity: pl, size: 4.6 });
    label('pd', cu('düşük'), -X + 0.42, 0.3, -0.35, { opacity: pl, size: 4.6 });
    label('le', gr('elektronlar'), -0.1, 0.3, ZH - 0.45, { opacity: fade(t, Z.c1[0], A.p1 + 0.4, 0.3), size: 4.6 });
    label('la', rd('akım yönü'), -0.2, 0.3, -0.45, { opacity: fade(t, Z.c2[0], A.p1 + 0.4, 0.3), size: 4.6 });
    SRC.forEach(([n, v], i) => {
      const o = easeOut(seg(t, A.g1 + 1.3 + i * 0.7, A.g1 + 1.7 + i * 0.7)) * (1 - easeOut(seg(t, A.v1 + 0.2, A.v1 + 0.5)));
      label('n' + i, n, PX + PLZ[i][0], 0.0, PLZ[i][1] + 0.62, { opacity: o, size: 4.0 });
      label('v' + i, hl(v), PX + PLZ[i][0], 0.75, PLZ[i][1] - 0.1, { opacity: o, size: 4.8 });
    });
  };
}
