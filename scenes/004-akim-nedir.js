// 004 — Akım nedir ve nasıl oluşur? (4'lü serinin 3. videosu)
// Animasyon anlatır, yazı kalemle yazılarak doğrular (AGENT.md 2a). Elektronlar yeşil, dış devrede − → +; geleneksel akım oku kırmızı, + → −.
// Kaynak: https://en.wikipedia.org/wiki/Electric_current (akım = birim zamanda bir kesitten geçen net yük, I = Q/t, 1 A = 1 C/s;
// alan yokken elektronların rastgele hareketi birbirini götürür, net akım yok; pil telde alan kurar, elektronlar + uca doğru sürüklenir;
// etki tel boyunca çok hızlı yayılır, elektronlar ise yavaş sürüklenir).
// Sahne geçişleri yerinde (kural 15): devre aynı yerde küçülerek kaybolur, aynı yerde cihazlar belirir, sonra devre geri gelir.

import { THREE, clamp, seg, easeInOut, easeOut, fade, lerp } from '../tools/lib/stage.js';
import { hl, rd, gr, check, penTimeline, narrationPen } from '../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, projLabel, camRig } from '../tools/lib/parcalar.js';
import { makeBulb, platform, makeSwitch, heater, kettle, phone } from '../tools/lib/devre.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: 'Anahtar kapanınca', l2: `<b style="font-weight:900">telde ne ${rd('akar')}?</b>`, s1: 6.6, s2: 7.0, extra: 1.6 },
  { id: 'r1', pre: 1.8, l1: `Telde serbest ${gr('elektronlar')} var`, l2: 'Rastgele hareket eder: net akış yok', s1: 5.4, s2: 4.8 },
  { id: 's1', pre: 2.8, l1: `Devre kapandı → ${gr('elektronlar')} akar`, s1: 4.9 },
  { id: 's2', pre: 4.8, l1: 'Hepsi neredeyse aynı anda', l2: 'harekete geçer: ampul hemen yanar', s1: 5.4, s2: 4.8 },
  { id: 'c1', pre: 3.0, l1: `${gr('Elektronlar')}: − → +`, l2: `${rd('Akım yönü')}: + → − (geleneksel kabul)`, s2: 4.4 },
  { id: 'b1', pre: 3.0, l1: `Pil yok → itme yok → ${rd('akım')} yok`, l2: `(itme: ${hl('gerilim')})`, s1: 4.8, s2: 4.8 },
  { id: 'q1', pre: 4.2, l1: `Her ${gr('elektron')} yük taşır`, l2: `${rd('Akım')}: kesitten 1 saniyede geçen yük`, s1: 5.6, s2: 4.4 },
  { id: 'g1', pre: 4.2, l1: `${rd('Akım')} geçince cihaz çalışır`, s1: 5.2 },
  { id: 'k1', chain: true, pre: 3.0, l1: `Pil, teldeki elektronları ${hl('iter')}`, s1: 5.0 },
  { id: 'k2', chain: true, pre: 1.0, l1: 'Devre kapalı olmalı' },
  { id: 'k3', chain: true, pre: 1.0, l1: `Yüklerin düzenli akışı: ${rd('akım')}`, s1: 5.0 },
  { id: 'f1', pre: 1.4, l1: `${rd('I')} = Q / t`, l2: `${rd('I')}: akım, Q: yük (C), t: süre (s)`, s1: 7.2, s2: 4.6 },
  { id: 'f2', pre: 0.2, l1: `Akımın birimi: amper (${rd('A')})`, l2: '1 A = 1 C/s', s1: 5.6, s2: 5.6, extra: 0.3 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A };

// ---------------------------------------------------------------- olaylar ve doğrulama
const SW1 = [A.s1 + 0.5, A.s1 + 1.0];                 // anahtar kapanır
const SW2 = [A.s2 + 0.3, A.s2 + 0.8];                 // anahtar açılır: akış durur, ampul söner
const SW3 = [A.s2 + 2.6, A.s2 + 3.1];                 // anahtar yeniden kapanır (vurgulu üç elektron aynı anda yola çıkar)
const BOUT = [A.b1 + 0.3, A.b1 + 1.0];                // pil küçülerek çıkar
const BIN = [A.q1 + 0.2, A.q1 + 0.9];                 // pil geri gelir
const GATE = [A.q1 + 1.6, A.q1 + 2.1];                // kesit halkası belirir
const COUT = [A.g1 + 0.2, A.g1 + 1.4], CIN = [A.k1 + 0.5, A.k1 + 1.5]; // devre yerinde kaybolur / geri gelir
const DEV = [A.g1 + 1.6, A.g1 + 2.0];                 // cihazlar sırayla (her biri +0,6 sn)
const DOUT = [A.k1, A.k1 + 0.9];                     // cihazlar yerinde kaybolur, ardından devre aynı yerde belirir
const swC = (t) => easeInOut(seg(t, ...SW1)) * (1 - easeInOut(seg(t, ...SW2))) + easeInOut(seg(t, ...SW3));
const batIn = (t) => 1 - easeInOut(seg(t, ...BOUT)) + easeInOut(seg(t, ...BIN));
// akış: yalnızca anahtar tam kapalı VE pil yerindeyken; kapanma anında yumuşak başlar
const closed = (t) => clamp((swC(t) - 0.92) / 0.08);
const flow = (t) => closed(t) * clamp((batIn(t) - 0.92) / 0.08);
check(flow(0) === 0 && flow(SW1[0]) === 0, 'anahtar açıkken akış yok');
const on1 = (x) => flow(x) > 0.999;
check(on1(Z.s1[0]) && flow(SW2[1] + 0.5) === 0 && on1(Z.s2[0]) && flow(Z.b1[0]) === 0 && on1(Z.q1[0]), 'etiket anlarında akış durumu');
check(SW1[1] + 1.5 <= Z.s1[0] && SW3[1] + 1.5 <= Z.s2[0] && BOUT[1] + 1.5 <= Z.b1[0], 'her olaydan sonra ≥ 1,5 sn bekleme');
check(GATE[1] + 2.0 <= Z.q1[0], 'kesit sayacı etiketten önce çalışır');
check(COUT[1] + 0.2 <= A.g1 + 1.6 && CIN[1] + 1.5 <= Z.k1[0], 'yerinde geçişler: devre kaybolur → cihazlar; cihazlar kaybolur → devre');

const V0 = 0.85;                                       // görsel sürüklenme hızı (birim/sn); gerçekte mm/s mertebesinde (gösterilmez)
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += V0 * flow(_t) * dt; _t += dt; }
  return _s + V0 * flow(_t) * (t - _t);
};
let _sG = null;                                       // kesit halkası belirdiği andaki yol (sayaç başlangıcı, kareden bağımsız)
const sGate = () => { if (_sG === null) { let x = 0; const dt = 1 / 120; for (let u = 0; u + dt <= GATE[1]; u += dt) x += V0 * flow(u) * dt; _sG = x; } return _sG; };

// ---------------------------------------------------------------- efektler
export const meta = {
  title: 'Akım nedir ve nasıl oluşur?',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: SW1[1] - 0.05, kind: 'click', gain: 0.18 },
    { t: SW1[1] + 0.1, kind: 'hum', d: SW2[0] - SW1[1], gain: 0.22 },
    { t: SW2[1] - 0.05, kind: 'click', gain: 0.16 },
    { t: SW3[1] - 0.05, kind: 'click', gain: 0.18 },
    { t: SW3[1] + 0.1, kind: 'hum', d: BOUT[0] - SW3[1], gain: 0.22 },
    { t: A.c1 + 2.8, kind: 'pop', gain: 0.18 },
    { t: BOUT[1] - 0.1, kind: 'thud', gain: 0.2 },
    { t: BIN[1] - 0.05, kind: 'thud', gain: 0.22 },
    { t: BIN[1] + 0.1, kind: 'hum', d: COUT[0] - BIN[1], gain: 0.22 },
    { t: GATE[1], kind: 'pop', gain: 0.16 },
    ...[0, 1, 2, 3].map((i) => ({ t: DEV[1] + i * 0.6, kind: 'thud', gain: 0.15 })),
    { t: CIN[1], kind: 'thud', gain: 0.2 },
    { t: CIN[1] + 0.1, kind: 'hum', d: DUR - CIN[1] - 0.4, gain: 0.2 },
    { t: A.k1 + 3.0, kind: 'pop', gain: 0.15 },
    { t: A.k3 + 1.0, kind: 'pop', gain: 0.15 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.8, ZH = 1.2, Y = 0.2;                    // devre dikdörtgeni (x sağ, z izleyiciye)
const SW_Z = -0.15, SW_GAP = 0.55;                    // anahtar sağ kenarda (+ uç ile ampul arası)
const GZ = 0.25;                                      // kesit halkası sol kenarda
const PLZ = [[-0.55, -1.0], [0.55, -1.0], [-0.55, 0.45], [0.55, 0.45]];
const HI = [3, 17, 31];                               // s2'de vurgulanan üç elektron (devrenin farklı yerlerinde)

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 11 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG);          // devre grubu: yerinde küçülüp büyür

  // ------------------------------------------------ devre: bakır tel (anahtar aralığı boş), pil, ampul, anahtar
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const uSwA = Wc.uOf(X, SW_Z + SW_GAP / 2 - 0.02), uSwB = Wc.uOf(X, SW_Z - SW_GAP / 2 + 0.02);
  { const pts = []; for (let i = 0; i <= 300; i++) pts.push(Wc.curve.getPointAt((uSwB + (((uSwA - uSwB + 1) % 1) * i) / 300) % 1));
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.03, 10), S.M.copper); m.castShadow = true; CG.add(m); }
  const bat = battery(S, { y: Y }); bat.group.position.set(0, 0, ZH); CG.add(bat.group);          // + ucu sağda (+x)
  const bulb = makeBulb(S, { scale: 1.25 }); bulb.group.position.set(0, 0, -ZH); CG.add(bulb.group);
  const swt = makeSwitch(S, { gap: SW_GAP, y: Y }); swt.group.position.set(X, 0, SW_Z); CG.add(swt.group);
  const ring = (r, col, pos, sy = 1) => { const mt = new THREE.MeshPhysicalMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, transparent: true, opacity: 0, depthWrite: false });
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.022, 10, 60), mt); m.rotation.x = Math.PI / 2; m.scale.set(1, sy, 1); m.position.copy(pos); CG.add(m); return mt; };
  const vMat = ring(0.62, 0xffd23f, new THREE.Vector3(0, 0.06, ZH), 0.55);
  const sMat = ring(0.42, 0xffffff, new THREE.Vector3(X, 0.06, SW_Z));

  // ------------------------------------------------ kesit halkası (sol kenar): içinden geçen elektron yanıp söner
  const gMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
  const gate = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.016, 12, 48), gMat); gate.position.set(-X, Y, GZ); CG.add(gate); // torus xy düzleminde: normali z (tel z boyunca)
  const gDisk = new THREE.Mesh(new THREE.CircleGeometry(0.13, 40), new THREE.MeshBasicMaterial({ color: 0xff5a4f, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
  gDisk.position.copy(gate.position); CG.add(gDisk);
  const uG = Wc.uOf(-X, GZ);

  // ------------------------------------------------ elektronlar (yeşil): rastgele titreşim + akışta eğrinin ters yönünde (− → +)
  const N = 46;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 1.1, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const r = S.rng(4);
  const PH = Array.from({ length: N }, () => [r() * 6.28, r() * 6.28, r() * 6.28, 5 + r() * 4, 6 + r() * 5, 7 + r() * 4]);

  // ------------------------------------------------ geleneksel akım oku (kırmızı, + → −): sol kenarda +z yönüne (− uca doğru)
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.6, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.55; arrow.add(head);
  arrow.position.set(-X + 0.38, 0.25, -0.35); arrow.rotation.y = -Math.PI / 2; CG.add(arrow);
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).z > 0.99, 'ok +z yönünde (sol kenarda + → −)');

  // ------------------------------------------------ gerçek hayat: aynı yerde dört cihaz (lamba, ısıtıcı, su ısıtıcısı, şarj olan telefon)
  const DG = new THREE.Group(); scene.add(DG);
  const plats = PLZ.map(([x, z]) => { const p = platform(S, x, z, { r: 0.46 }); DG.add(p); return p; });
  const lamp = makeBulb(S, { scale: 0.8 }), H = heater(S), KT = kettle(S), PHN = phone(S);
  const models = [lamp.group, H.group, KT.group, PHN.group];
  models.forEach((g) => DG.add(g));
  const MSC = [1, 0.95, 1.05, 0.95];
  const NAMES = ['lamba', 'elektrikli soba', 'su ısıtıcısı', 'telefon şarjı'];
  // her cihazın önünde kısa bir kablo, içinde akan elektronlar
  const cabMat = new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, roughness: 0.5, transparent: true, opacity: 0.85 });
  const dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.028, 12, 8), eMat, 4 * 6); DG.add(dots);
  const cables = PLZ.map(([x, z]) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.7, 8), cabMat); c.rotation.z = Math.PI / 2; c.position.set(x, 0.1, z + 0.4); DG.add(c); return c; });

  // ------------------------------------------------ kamera: yerinde, yavaş (kadraj sahneden sahneye taşınmaz)
  const cam = camRig(S, [
    [0, 0.0, 10.4, 62, 0, -0.42], [Z.h1[1], 0.05, 10.0, 62, 0, -0.4], [A.s1, -0.03, 9.6, 63, 0, -0.35], [A.s2, 0.04, 9.5, 62, 0, -0.35],
    [A.c1, -0.04, 9.3, 62, 0, -0.32], [A.b1, 0.03, 9.4, 63, 0, -0.32], [A.q1, -0.04, 9.2, 62, 0, -0.32], [A.g1, 0.03, 9.4, 62, 0, -0.32],
    [A.k1, -0.04, 9.6, 62, 0, -0.32], [A.f1, 0.04, 9.4, 63, 0, -0.32], [DUR, -0.04, 9.1, 63, 0, -0.3],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR);

  return (t) => {
    cam(t);
    const F = flow(t), glow = F;
    bulb.set(glow * (1 + 0.025 * Math.sin(t * 13)));
    swt.set(swC(t));

    // devre yerinde küçülüp kaybolur (g1) ve geri gelir (k1)
    const cS = Math.max(0.001, 1 - easeInOut(seg(t, ...COUT)) + easeInOut(seg(t, ...CIN)));
    CG.scale.setScalar(cS); CG.visible = cS > 0.004; CG.rotation.y = (1 - cS) * 0.6;

    // pil: küçülerek çıkar / geri gelir
    const bI = batIn(t); bat.group.visible = bI > 0.004; bat.group.scale.setScalar(Math.max(0.001, bI)); bat.group.position.y = (1 - bI) * 0.35;

    // vurgu halkaları
    vMat.opacity = 0.9 * fade(t, A.k1 + 0.1, Z.k1[1], 0.35);
    bat.glow.emissiveIntensity = 0.15 + 0.6 * fade(t, A.k1 + 0.1, Z.k1[1], 0.35);
    sMat.opacity = 0.8 * fade(t, A.k2 + 0.1, Z.k2[1], 0.35) + 0.8 * fade(t, SW2[0], SW3[1] + 0.4, 0.3);

    // elektronlar: titreşim her zaman (akışta azalır), akışta − → +
    const s = dist(t), jit = 1 - 0.55 * F;
    const big = 1 + 0.35 * fade(t, A.k3 + 0.1, Z.k3[1], 0.4);
    const hiOn = fade(t, SW2[1] + 0.3, Z.s2[1], 0.4);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = jit * (0.055 * Math.sin(t * p[3] + p[0]) + 0.03 * Math.sin(t * p[4] * 1.7 + p[1])) / Wc.L;
      const u = ((((k / N) - s / Wc.L + du) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z);
      if (bad) pv.set(0, -1, 0);
      pv.y += jit * 0.018 * Math.sin(t * p[5] + p[2]);
      const inBat = Math.abs(pv.x) < 0.47 && pv.z > ZH - 0.1;
      const inSw = Math.abs(pv.x - X) < 0.06 && Math.abs(pv.z - SW_Z) < SW_GAP / 2 - 0.02 && swC(t) < 0.9;
      const hs = HI.includes(k) ? 1 + 0.9 * hiOn : 1;
      sv.setScalar(inBat || inSw || bad ? 0.0001 : big * hs);
      m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    eMat.emissiveIntensity = 1.1 + 0.6 * hiOn * (0.5 + 0.5 * Math.sin(t * 6));

    // akım oku: c1'den itibaren, akım varken
    const aOp = easeOut(seg(t, A.c1 + 2.6, A.c1 + 3.1));
    arrowMat.opacity = aOp * (0.25 + 0.75 * F); arrow.visible = aOp > 0.01;
    arrowMat.emissiveIntensity = 0.6 + 1.0 * fade(t, A.k3 + 0.1, Z.k3[1], 0.4);

    // kesit halkası ve sayaç (q1)
    const gOn = easeOut(seg(t, ...GATE)) * (1 - easeInOut(seg(t, COUT[0] - 0.4, COUT[0])));
    gMat.opacity = 0.95 * gOn; gate.visible = gOn > 0.01;
    const xg = N * (s / Wc.L + uG) ;                     // geçen elektron sayısı = floor(xg) − başlangıç
    const fr = xg - Math.floor(xg), flash = F * Math.max(0, 1 - Math.min(fr, 1 - fr) * 6);
    gDisk.material.opacity = 0.45 * gOn * flash; gDisk.visible = gOn > 0.01;
    gMat.emissiveIntensity = 0.8 + 1.4 * flash;
    const n = t < GATE[1] ? 0 : Math.max(0, Math.floor(xg) - Math.floor(N * (sGate() / Wc.L + uG)));

    // gerçek hayat cihazları: aynı yerde sırayla belirir, sonra yerinde kaybolur
    let di = 0;
    models.forEach((g, i) => {
      const a = easeOut(seg(t, DEV[0] + i * 0.6, DEV[1] + i * 0.6)) * (1 - easeInOut(seg(t, ...DOUT)));
      plats[i].visible = a > 0.004; plats[i].scale.setScalar(Math.max(0.001, a));
      cables[i].visible = a > 0.004; cables[i].scale.set(1, Math.max(0.001, a), 1);
      const sc0 = Math.max(0.001, a * MSC[i]);
      g.visible = sc0 > 0.004; g.scale.setScalar(i === 0 ? sc0 * 0.8 : sc0);
      g.position.set(PLZ[i][0], 0.08 + (1 - a) * 0.3, PLZ[i][1]); g.rotation.y = 0.12 * Math.sin(t * 0.5 + i);
      for (let j = 0; j < 6; j++) {
        const x = PLZ[i][0] - 0.34 + ((j / 6 + t * 0.35) % 1) * 0.68;
        pv.set(x, 0.1, PLZ[i][1] + 0.4); sv.setScalar(a > 0.5 ? a : 0.0001); m4.compose(pv, qq, sv); dots.setMatrixAt(di++, m4);
      }
    });
    dots.instanceMatrix.needsUpdate = true;
    const devOn = easeOut(seg(t, DEV[1], DEV[1] + 2.0)) * (1 - easeInOut(seg(t, ...DOUT)));
    lamp.set(devOn * (0.85 + 0.03 * Math.sin(t * 11)));
    H.hot.emissiveIntensity = 1.6 * devOn;

    yaz(t);

    // kanca alt satırı ve seri etiketi
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', 'Pil, tel, ampul — anahtar açık', { y: 28, size: 4.4, weight: 600, opacity: subO, nowrap: true });
    S.text('tag', 'BÖLÜM 3', { x: 11, y: 11.6, size: 3.0, weight: 800, color: '#9fb4c8', opacity: subO, nowrap: true, maxWidth: 30 });

    // nesne etiketleri (devre tam boyuttayken)
    const onC = (a, b) => fade(t, a, b, 0.3) * (cS > 0.98 ? 1 : 0);
    label('lp', '+', X - 0.25, 0.42, ZH + 0.05, { opacity: onC(A.c1 + 1.0, A.b1), size: 5.4 });
    label('ln', '−', -X + 0.25, 0.42, ZH + 0.05, { opacity: onC(A.c1 + 1.0, A.b1), size: 5.4 });
    label('le', gr('elektronlar'), 0.05, 0.3, ZH - 0.45, { opacity: onC(A.c1 + 2.2, A.b1), size: 4.4 });
    label('la', rd('akım yönü'), -0.05, 0.3, -0.45, { opacity: onC(A.c1 + 2.8, A.b1), size: 4.4 });
    label('lsw', 'anahtar', X + 0.05, 0.42, SW_Z - 0.55, { opacity: onC(A.r1 + 0.2, A.s1 + 0.4), size: 4.2 });
    label('lk', `geçen ${gr('elektron')}: ${n}`, 0.05, 0.3, GZ + 0.05, { opacity: onC(GATE[1] + 0.2, COUT[0]), size: 4.6 });
    label('lks', rd('kesit'), -X - 0.05, 0.42, GZ - 0.32, { opacity: onC(GATE[1] + 0.2, COUT[0]), size: 4.2 });
    NAMES.forEach((nm, i) => {
      const o = easeOut(seg(t, DEV[1] + i * 0.6, DEV[1] + 0.4 + i * 0.6)) * (1 - easeInOut(seg(t, DOUT[0] - 0.3, DOUT[0])));
      label('d' + i, nm, PLZ[i][0], 0.0, PLZ[i][1] + 0.66, { opacity: o, size: 4.0 });
    });
  };
}
