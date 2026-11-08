// 003 — Gerilim nedir? (2. sürüm, kanal sahibinin iş emri 08.11.2026; 4'lü serinin 2. videosu)
// Animasyon anlatır, yazı kalemle yazılarak doğrular (AGENT.md 2a). Elektronlar yeşil, dış devrede − → +; geleneksel akım oku kırmızı, + → −.
// Gerilim sarı. Telde potansiyel renk geçişi: + ucu (yüksek) sarı → − ucu (düşük) koyu turuncu; düşüş ampulde olur.
// Hidrolik benzetme: pompa = pil, basınç farkı = gerilim, su akışı = akım. Akım değeri gösterilmez (Ohm yasası 4. videoda).

import { THREE, clamp, seg, easeInOut, easeOut, fade, lerp } from '../../tools/lib/stage.js';
import { hl, rd, gr, cu, check, penTimeline, narrationPen } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, projLabel, camRig } from '../../tools/lib/parcalar.js';
import { makeBulb, platform } from '../../tools/lib/devre.js';
import { aaCell, phoneCell, adapter, carBattery } from '../../tools/lib/kaynaklar.js';
import { pipeLoop } from '../../tools/lib/boru.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: 'Aynı ampul,', l2: `<b style="font-weight:900">neden daha ${hl('parlak')}?</b>`, s1: 7.6, s2: 7.6, extra: 2.8 },
  { id: 'c1', pre: 3.6, l1: `${gr('Elektronlar')}: − → +`, l2: `${rd('Akım yönü')}: + → − (kabul)`, s2: 5.6 },
  { id: 'p1', pre: 2.4, l1: `+ ${hl('yüksek')}, − ${cu('düşük')} potansiyel`, s1: 6.2 },
  { id: 'p2', pre: 0.9, l1: `Bu fark: ${hl('gerilim')}` },
  { id: 'a1', pre: 5.2, l1: 'Pompa suyu iter', l2: `Pompa = pil, su akışı = ${rd('akım')}`, s2: 5.4 },
  { id: 'a2', pre: 3.4, l1: 'Basınç farkı ↑ → akış ↑', l2: `Basınç farkı = ${hl('gerilim')}`, s1: 6.2, s2: 5.6 },
  { id: 'g1', pre: 5.4, l1: `Her kaynağın bir ${hl('gerilimi')} var`, s1: 6.0 },
  { id: 'v1', pre: 3.6, l1: `${hl('Gerilim')} ↓ → ${rd('Akım')} ↓` },
  { id: 'v2', pre: 2.2, l1: `${hl('Gerilim')} ↑ → ${rd('Akım')} ↑` },
  { id: 'k1', chain: true, pre: 1.4, l1: `Pilin uçları arasında ${hl('fark')} var` },
  { id: 'k2', chain: true, pre: 1.2, l1: 'Bu fark yükleri iter' },
  { id: 'k3', chain: true, pre: 1.2, l1: `${hl('Fark')} büyürse itme artar` },
  { id: 'k4', chain: true, pre: 1.2, l1: `${rd('Akım')} artar, ampul parlar` },
  { id: 'f1', pre: 1.6, l1: `${hl('Gerilim')}: potansiyel farkı`, l2: `birimi: volt (${hl('V')})`, s1: 6.2, s2: 5.6, extra: 1.2 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A };

// ---------------------------------------------------------------- devre değerleri ve doğrulama
const RB = 30;                                        // ampul filamanı ~30 Ω (gösterilmez, aynı ampul)
const V_AA = 1.5, V_9 = 9;
// kanca: AA çıkar, 9 V girer
const H_OUT = [1.6, 1.95], H_IN = [2.0, 2.45];
const V1_OUT = [A.v1 + 0.2, A.v1 + 0.6];              // v1: 9 V çıkar
const FLY = [A.v1 + 0.6, A.v1 + 2.6];                 // AA platformdan devreye uçar
const V2_OUT = [A.v2 + 0.2, A.v2 + 0.5], V2_IN = [A.v2 + 0.6, A.v2 + 1.0];
const sAA = (t) => (t < A.v1 ? 1 - easeInOut(seg(t, ...H_OUT)) : t < A.v2 ? (t >= FLY[1] ? 1 : 0) : 1 - easeInOut(seg(t, ...V2_OUT)));
const s9 = (t) => (t < A.v1 ? easeOut(seg(t, ...H_IN)) * (1 - easeInOut(seg(t, ...V1_OUT))) : easeOut(seg(t, ...V2_IN)));
// gerilim: yalnızca yerine oturmuş pil iter; oturma anında yumuşak geçiş
const KEYS = [[0, V_AA], [H_OUT[0], V_AA], [H_OUT[0] + 0.25, 0], [H_IN[1] - 0.1, 0], [H_IN[1] + 0.35, V_9],
  [V1_OUT[0], V_9], [V1_OUT[0] + 0.3, 0], [FLY[1], 0], [FLY[1] + 0.35, V_AA],
  [V2_OUT[0], V_AA], [V2_OUT[0] + 0.25, 0], [V2_IN[1] - 0.1, 0], [V2_IN[1] + 0.35, V_9], [DUR + 1, V_9]];
const Vt = (t) => { let i = 0; while (i < KEYS.length - 2 && t > KEYS[i + 1][0]) i++; const [a, va] = KEYS[i], [b, vb] = KEYS[i + 1]; return lerp(va, vb, easeInOut(seg(t, a, b))); };
const It = (t) => Vt(t) / RB;
check(V_AA / RB < V_9 / RB, 'V artınca I artar (aynı ampul)');
check(Math.abs(Vt(0.5) - 1.5) < 1e-9 && Math.abs(Vt(Z.h1[1]) - 9) < 1e-9, 'kanca: 1,5 V → 9 V');
check(Math.abs(Vt(Z.v1[0]) - 1.5) < 1e-9 && Math.abs(Vt(Z.v2[0]) - 9) < 1e-9, 'v1 etiketi 1,5 V, v2 etiketi 9 V iken');
check(Vt(A.v1 + 1.2) === 0, 'pil yokken gerilim 0');
check(H_IN[1] + 0.35 < Z.h1[1] - 1.5, 'kancada parlama yazı bitmeden görünür');
const SRC = [['AA pil', '1,5 V', 1.5], ['telefon pili', '3,7 V', 3.7], ['şarj adaptörü', '5 V', 5], ['araba aküsü', '12 V', 12]];
for (const [, s, v] of SRC) check(s === `${String(v).replace('.', ',')} V`, `etiket ${s}`);
const speedOf = (I) => 2.6 * Math.sqrt(I);            // görsel akış hızı (m/s), akımla artar
const glowOf = (I) => clamp(Math.pow(I / 0.3, 0.9));
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += speedOf(It(_t)) * dt; _t += dt; }
  return _s + speedOf(It(_t)) * (t - _t);
};

// hidrolik benzetme: pompa gücü (basınç farkı) → debi. Kapalı boru aynı; debi basınç farkıyla orantılı.
const T_P1 = A.a1 + 2.6, T_P2 = A.a2 + 0.9;           // pompa çalışır (0 → 0,45), güçlenir (0,45 → 1)
const pump = (t) => 0.45 * easeInOut(seg(t, T_P1, T_P1 + 1.4)) + 0.55 * easeInOut(seg(t, T_P2, T_P2 + 1.4));
check(pump(0) === 0 && Math.abs(pump(1e9) - 1) < 1e-9, 'pompa 0 → 1');
check(Z.a2[0] > T_P2 + 1.4 + 1.0, 'a2 etiketi pompa güçlendikten sonra');

// ---------------------------------------------------------------- efektler
const humSeg = (a, b, V) => ({ t: a, kind: 'hum', d: Math.max(0.3, b - a), gain: 0.2 + 0.4 * glowOf(V / RB) });
export const meta = {
  title: 'Gerilim nedir? (2. sürüm)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    humSeg(0.05, H_OUT[0] + 0.2, V_AA),
    { t: H_IN[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(H_IN[1] + 0.1, V1_OUT[0] + 0.2, V_9),
    { t: A.c1 + 3.4, kind: 'pop', gain: 0.2 },
    { t: A.p1 + 0.3, kind: 'pop', gain: 0.2 },
    { t: T_P1 + 0.2, kind: 'hum', d: 1.6, gain: 0.18 },
    { t: T_P2 + 0.2, kind: 'pop', gain: 0.18 },
    ...[0, 1, 2, 3].map((i) => ({ t: A.g1 + 2.2 + i * 0.7, kind: 'thud', gain: 0.16 })),
    { t: FLY[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(FLY[1] + 0.1, V2_OUT[0] + 0.15, V_AA),
    { t: V2_IN[1] - 0.05, kind: 'thud', gain: 0.25 },
    humSeg(V2_IN[1] + 0.1, DUR - 0.3, V_9),
    { t: A.k1 + 0.3, kind: 'pop', gain: 0.16 },
    { t: A.k4 + 0.3, kind: 'pop', gain: 0.16 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                    // devre dikdörtgeni (x sağ, z izleyiciye)
const PX = 7.2, PB = -7.2;                            // kaynaklar (sağ), boru benzetmesi (sol)
const PLZ = [[-0.55, -0.9], [0.55, -0.9], [-0.55, 0.8], [0.55, 0.8]];
const YEL = new THREE.Color(0xffd23f), ORG = new THREE.Color(0x8a2a00), MID = new THREE.Color(0x6e4a2e);

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 7 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 5; sc.bottom = -5; sc.updateProjectionMatrix();
  const label = projLabel(S);

  // ------------------------------------------------ devre: kapalı bakır tel, pil (AA / 9 V), ampul
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const W = closedWire(S, loop, { y: Y });
  const bat = battery(S, { y: Y }); bat.group.position.set(0, 0, ZH);       // + ucu sağda (+x)
  const aa = aaCell(S); aa.group.position.set(0, 0.05, ZH);
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH);
  const vMat = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 1.2, transparent: true, opacity: 0, depthWrite: false });
  const vRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.022, 10, 60), vMat); vRing.rotation.x = Math.PI / 2; vRing.scale.set(1, 0.55, 1); vRing.position.set(0, 0.06, ZH); scene.add(vRing);
  const bMat = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 1.2, transparent: true, opacity: 0, depthWrite: false });
  const bRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.022, 10, 60), bMat); bRing.rotation.x = Math.PI / 2; bRing.position.set(0, 0.06, -ZH); scene.add(bRing);

  // ------------------------------------------------ potansiyel renk katmanı (+ → ampul: sarı, ampulde düşüş, ampul → −: koyu turuncu)
  const TS = 900, RS = 12;
  const potGeo = new THREE.TubeGeometry(W.curve, TS, 0.04, RS, true);
  const nV = potGeo.attributes.position.count, cols = new Float32Array(nV * 3);
  potGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const potMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
  const pot = new THREE.Mesh(potGeo, potMat); pot.renderOrder = 1; scene.add(pot);
  const uP = W.uOf(0.45, ZH), uN = W.uOf(-0.45, ZH), uB1 = W.uOf(0.22, -ZH), uB2 = W.uOf(-0.22, -ZH);
  const fw = (u) => (((u - uP) % 1) + 1) % 1;
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

  // ------------------------------------------------ boru benzetmesi (sol alan)
  const PL = pipeLoop(S, { PX: PB, Qt: pump, v: 1.3 });

  // ------------------------------------------------ gerçek hayat kaynakları (sağ alan)
  const plats = PLZ.map(([x, z]) => platform(S, PX + x, z, { r: 0.46 }));
  const mAA = aaCell(S), mPh = phoneCell(S), mAd = adapter(S), mCar = carBattery(S);
  const models = [mAA.group, mPh.group, mAd.group, mCar.group];
  const MSC = [0.62, 0.95, 1.0, 0.95];

  // ------------------------------------------------ kamera: [t, açı, mesafe, yükselme°, hedefX, hedefZ]
  const C0 = [0, 9.6, 62, 0, -0.32], CP = [0, 9.2, 60, PB, -0.2], CS = [0, 8.8, 60, PX, -0.2];
  const cam = camRig(S, [
    [0, 0.0, 10.8, 62, 0, -0.45], [Z.h1[1] - 0.4, 0.04, 10.4, 62, 0, -0.42], [A.c1 + 2.0, 0.05, 9.6, 62, 0, -0.32], [A.p1, -0.04, 9.4, 63, 0, -0.32],
    [A.a1 + 0.2, ...C0], [A.a1 + 2.2, ...CP], [A.a2, 0.05, 9.0, 60, PB, -0.2], [A.g1 + 0.3, -0.05, 9.1, 60, PB, -0.2],
    [A.g1 + 2.1, ...CS], [A.v1 + 0.3, 0.05, 8.7, 60, PX, -0.2], [FLY[1] - 0.2, ...C0],
    [A.v2, -0.04, 9.5, 62, 0, -0.32], [A.k1, 0.03, 9.4, 62, 0, -0.32], [A.f1, -0.04, 9.3, 63, 0, -0.32], [DUR, 0.05, 9.0, 63, 0, -0.3],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR);

  const homeAA = new THREE.Vector3(PX + PLZ[0][0], 0.08, PLZ[0][1]), dstAA = new THREE.Vector3(0, 0.05, ZH), pAA = new THREE.Vector3();

  return (t) => {
    cam(t);
    const V = Vt(t), I = V / RB, glow = glowOf(I);
    bulb.set(glow * (1 + 0.025 * Math.sin(t * 13)));

    // devredeki piller: büyüyerek/küçülerek yer değiştirir
    const a9 = s9(t);
    bat.group.visible = a9 > 0.004; bat.group.scale.setScalar(Math.max(0.001, a9)); bat.group.position.y = (1 - a9) * 0.35;
    const aIn = sAA(t);
    if (t < A.v1 || t >= A.v2) {
      aa.group.visible = aIn > 0.004; aa.group.scale.setScalar(Math.max(0.001, aIn)); aa.group.position.set(0, 0.05 + (1 - aIn) * 0.35, ZH);
    } else {
      const f = easeInOut(seg(t, ...FLY));
      pAA.copy(homeAA).lerp(dstAA, f); pAA.y += Math.sin(f * Math.PI) * 1.4;
      aa.group.position.copy(pAA); aa.group.scale.setScalar(lerp(MSC[0], 1, f)); aa.group.visible = t >= FLY[0];
    }

    // potansiyel renk katmanı: p1'den itibaren; renk farkı gerilimle orantılı; p2 ve k3'te vurgu
    const potOn = easeOut(seg(t, A.p1 + 0.2, A.p1 + 1.4));
    potMat.opacity = 0.9 * potOn; pot.visible = potOn > 0.01;
    const emph = fade(t, A.p2, Z.p2[1], 0.4) + fade(t, A.k3 + 0.1, Z.k3[1], 0.4);
    paint(clamp(V / V_9) * (0.82 + 0.18 * clamp(emph)));
    vMat.opacity = 0.9 * fade(t, A.k1 + 0.1, Z.k1[1], 0.35);
    bat.glow.emissiveIntensity = 0.15 + 0.6 * fade(t, A.k1 + 0.1, Z.k1[1], 0.35);
    bMat.opacity = 0.9 * fade(t, A.k4 + 0.1, Z.k4[1], 0.35);

    // elektronlar: − → +; k2'de büyür (itilen yükler)
    const s = dist(t), big = 1 + 0.35 * fade(t, A.k2 + 0.1, Z.k2[1], 0.4);
    for (let k = 0; k < N; k++) {
      const u = ((((k / N) - s / W.L) % 1) + 1) % 1;
      W.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z);
      if (bad) pv.set(0, -1, 0);
      const inBat = Math.abs(pv.x) < 0.47 && pv.z > ZH - 0.1;
      sv.setScalar(inBat || bad ? 0.0001 : big);
      m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;

    // akım oku: c1'den itibaren, kalınlığı akımla
    const aOp = easeOut(seg(t, A.c1 + 3.2, A.c1 + 3.7));
    arrowMat.opacity = aOp * (0.35 + 0.65 * glow); arrow.visible = aOp > 0.01;
    arrow.scale.set(1, 0.6 + 0.6 * Math.sqrt(I / 0.3), 0.6 + 0.6 * Math.sqrt(I / 0.3));

    // boru: pompa gücüyle akış
    PL.update(t);
    PL.wMat.emissive.setHex(0x3f9bff).lerp(new THREE.Color(0xff3b30), 0.75 * fade(t, W_a1(), Z.a1[1], 0.35));
    PL.ring.material.opacity = fade(t, T_P2 + 1.4, Z.a2[1], 0.3); PL.ring.material.emissiveIntensity = 0.9;

    // gerçek hayat kaynakları: sırayla belirir; v1'de AA uçar, diğerleri kaybolur
    models.forEach((g, i) => {
      const a = easeOut(seg(t, A.g1 + 2.0 + i * 0.7, A.g1 + 2.5 + i * 0.7));
      const out = easeInOut(seg(t, A.v1 + 2.8, A.v1 + 3.4));
      plats[i].visible = a > 0.004 && out < 0.999; plats[i].scale.setScalar(Math.max(0.001, a * (1 - out)));
      if (i === 0 && t >= A.v1) { g.visible = false; return; }
      const sc0 = Math.max(0.001, a * (1 - out) * MSC[i]);
      g.visible = sc0 > 0.004; g.scale.setScalar(sc0);
      g.position.set(PX + PLZ[i][0], 0.08 + (1 - a) * 0.3, PLZ[i][1]); g.rotation.y = 0.12 * Math.sin(t * 0.5 + i);
    });

    yaz(t);

    // kanca alt satırı ve seri etiketi
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', `${hl('1,5 V')} pil yerine ${hl('9 V')} pil`, { y: 28, size: 4.4, weight: 600, opacity: subO, nowrap: true });
    S.text('tag', 'BÖLÜM 2', { x: 15, y: 11.6, size: 3.0, weight: 800, color: '#9fb4c8', opacity: subO, nowrap: true, maxWidth: 30 });

    // nesne etiketleri
    const onC = (a, b) => fade(t, a, b, 0.3);
    label('pv', hl(V > 5 ? '9 V' : '1,5 V'), 0.0, 0.32, ZH - 0.5, { opacity: onC(0.0, A.c1 + 1.0) + onC(FLY[1] + 0.3, A.v2 + 0.1) + onC(V2_IN[1] + 0.3, A.k1), size: 5 });
    const pl = onC(A.p1 + 0.8, A.a1 + 0.4);
    label('py', hl('yüksek'), X - 0.42, 0.3, -0.8, { opacity: pl, size: 4.6 });
    label('pd', cu('düşük'), -X + 0.42, 0.3, -0.35, { opacity: pl, size: 4.6 });
    label('le', gr('elektronlar'), -0.1, 0.3, ZH - 0.45, { opacity: onC(A.c1 + 2.8, A.p1 + 0.2), size: 4.4 });
    label('la', rd('akım yönü'), -0.2, 0.3, -0.45, { opacity: onC(A.c1 + 3.4, A.p1 + 0.2), size: 4.4 });
    const pOn = onC(A.a1 + 2.4, A.g1 + 0.6);
    label('pp', 'pompa', PB, 0.3, PL.ZP + 0.55, { opacity: pOn, size: 4.4 });
    label('pc', 'çark', PB + 0.55, 0.45, -PL.ZP, { opacity: pOn * onC(A.a1 + 3.2, A.g1 + 0.6), size: 4.2 });
    label('pq', 'akış', PB + PL.XP - 0.45, 0.75, -0.25, { opacity: onC(T_P2 + 1.2, A.g1 + 0.6), size: 4.0 });
    SRC.forEach(([n, v], i) => {
      const o = easeOut(seg(t, A.g1 + 2.5 + i * 0.7, A.g1 + 2.9 + i * 0.7)) * (1 - easeOut(seg(t, A.v1 + 0.2, A.v1 + 0.5)));
      label('n' + i, n, PX + PLZ[i][0], 0.0, PLZ[i][1] + 0.62, { opacity: o, size: 4.0 });
      label('v' + i, hl(v), PX + PLZ[i][0], 0.75, PLZ[i][1] - 0.1, { opacity: o, size: 4.8 });
    });
  };
}
const W_a1 = () => Z.a1[0] + 1.6;                     // "su akışı = akım" yazılırken su parçacıkları kırmızıya döner
