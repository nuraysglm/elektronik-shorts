// 006 (2. sürüm) — Elektrik yükü, akım ve gerilim. Temel Devre Teorisi I, ders 1 (Razavi, Basic Circuits Lec 1).
// Bölüm 2b: üniversite 1. sınıf düzeyi. Vurgulanan nokta: açık devre yalnızca i = 0'ı, kısa devre yalnızca V = 0'ı garanti eder;
// ayrıca yük = i(t) eğrisinin altındaki alan (q = ∫ i dt), i = dq/dt; gerilim iki nokta arasında, işaretli, birim yük başına enerji.
// Devre: 9 V ideal pil (ön kenar, + ucu +x) + bıçaklı anahtar (sol kenar) + 3 kΩ direnç (sağ kenar). Arkada canlı i(t) grafiği.
// Elektronlar yeşil, dış devrede − → +; geleneksel akım oku kırmızı, + → −. Ekrandaki tüm sayılar hesaplanır ve check() ile doğrulanır.
// Sahne geçişleri aynı kadrajda, kesme ile (kural 15): devre → gerçek hayat (duvar anahtarı) → devre.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade, lerp } from '../tools/lib/stage.js';
import { hl, rd, gr, fmt, check, penTimeline, narrationPen } from '../tools/lib/anlatim.js';
import { canvasTex, roundedLoop, closedWire, battery, resistor, projLabel, camRig } from '../tools/lib/parcalar.js';
import { makeBulb, makeSwitch, platform } from '../tools/lib/devre.js';

// ---------------------------------------------------------------- değerler
const VB = 9, RK = 3;                       // V, kΩ
const IMA = VB / RK;                        // mA
check(Math.abs(IMA - 3) < 1e-12, 'Ohm: 9 V ÷ 3 kΩ = 3 mA');

// ---------------------------------------------------------------- anlatım
const mkBeats = (c2pre, dq = 0) => [
  { id: 'h1', pen: false, pre: 0, l1: 'Açık devrede', l2: `<b style="font-weight:900">${hl('gerilim')} sıfır mı?</b>`, s1: 7.4, s2: 7.4, extra: 1.0 },
  { id: 'c1', pre: 3.7, l1: `Akımın ${rd('değeri')} + ${rd('yönü')}`, l2: `9 V ÷ 3 kΩ = ${rd('3 mA')}`, s1: 6.0, s2: 5.4 },
  { id: 'c2', pre: c2pre, l1: `${gr('Yük')} = ${rd('i(t)')} altındaki alan`, l2: `${rd('3 mA')} × ${dq} s = ${gr(dq * 3 + ' mC')}`, s1: 5.8, s2: 5.4 },
  { id: 'v1', pre: 4.5, l1: `${hl('Gerilim')}: iki nokta arası`, l2: `${hl('V<sub>ab</sub>')} = 9 J ÷ 1 C = ${hl('9 V')}`, s1: 5.8, s2: 5.4 },
  { id: 'o1', pre: 3.6, l1: `Açık devre: ${rd('i = 0')}`, l2: `ama anahtar uçlarında ${hl('9 V')}!`, s1: 6.2, s2: 5.6 },
  { id: 'o2', pre: 3.4, l1: 'Kapalı anahtar = kısa devre', l2: `anahtarda ${hl('V = 0')}, ama ${rd('i = 3 mA')}`, s1: 5.8, s2: 5.6 },
  { id: 'g1', pre: 2.8, l1: 'Lamba söndürülünce:', l2: `${rd('i = 0')}, anahtarda ${hl('≈ 230 V')} (AC)`, s1: 5.6, s2: 5.4 },
  { id: 'f1', pre: 1.4, l1: `Açık devre → yalnızca ${rd('i = 0')}`, l2: `Kısa devre → yalnızca ${hl('V = 0')}`, s1: 5.4, s2: 5.4 },
  { id: 'f2', pre: 0.3, l1: `${rd('i')} = d${gr('q')}/dt  ·  ${gr('q')} = ∫ ${rd('i')} dt`, l2: `gerilim: ${hl('1 V')} = 1 J/C`, s1: 5.8, s2: 5.0, extra: 0.3 },
];
// 1. geçiş: anahtarın açılma anını bul (c1 yazısı bittikten sonra, kapalı kalma süresi tam saniye)
const P0 = penTimeline(mkBeats(0), { k: 1.0 });
const G0 = P0.A.c1 + 0.2;                   // grafik saati başlangıcı (g = t − G0)
const TC = G0 + 2;                          // kontak kapanır (g = 2 s)
const DQ = Math.ceil(P0.Z.c1[1] + 0.2 - TC); // kapalı kalma süresi, s
const TO = TC + DQ;                         // kontak açılır
const BEATS = mkBeats(TO - P0.Z.c1[1] + 1.2 + 1.5, DQ);
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A, TC, TO, DQ };
const Q_MC = IMA * DQ;                      // mC
const GX = 2 + DQ + 2;                     // grafik ekseni 0..GX s
check(DQ >= 4 && DQ <= 10 && Math.abs(Q_MC - 3 * DQ) < 1e-12, `q = 3 mA × ${DQ} s = ${Q_MC} mC`);
check(Math.abs(Z.c1[1] - P0.Z.c1[1]) < 1e-9 && TO > Z.c1[1], 'c1 yazısı anahtar açılmadan biter');
check(TO + 1.2 + 1.5 <= Z.c2[0] + 1e-9, 'c2: anahtar açıldıktan ≥ 1,5 sn sonra etiket');
check(G0 + GX <= Z.c2[1], 'grafik ekseni c2 bitmeden tamamlanır');

// ---------------------------------------------------------------- olaylar
const SWC1 = [TC - 1.2, TC];                 // anahtar kapanır (kontak TC'de)
const SWO1 = [TO, TO + 1.2];                 // anahtar açılır (kontak TO'da kopar)
const QM = [A.v1 + 0.4, A.v1 + 3.6];         // +1 C test yükü b → a taşınır
const VM = [A.o1 + 0.3, A.o1 + 1.3];         // voltmetre yerinde belirir, uçlar anahtara değer
const VMR = [A.o1 + 1.4, A.o1 + 2.1];        // voltmetre 0 → 9 V
const SWC2 = [A.o2 + 0.4, A.o2 + 1.6];       // anahtar yeniden kapanır
const CUT1 = A.g1 + 0.2, CUT2 = A.f1 + 0.2;  // gerçek hayat aralığı
check(QM[1] + 0.8 <= Z.v1[0], 'v1: taşıma bitince etiket');
check(VMR[1] + 1.5 <= Z.o1[0] && SWC2[1] + 1.5 <= Z.o2[0], 'o1/o2: olaydan ≥ 1,5 sn sonra etiket');
check(DUR <= 90, `süre ≤ 90 sn (${DUR})`);

const closed = (t) => (t >= TC && t < TO) || t >= SWC2[1];          // kontak durumu (ideal anahtar)
const swAng = (t) => easeInOut(seg(t, ...SWC1)) - easeInOut(seg(t, ...SWO1)) + easeInOut(seg(t, ...SWC2)); // 1 kapalı
const iOf = (t) => (closed(t) ? IMA : 0);                            // mA
const vSw = (t) => (closed(t) ? 0 : VB);                             // anahtar uçları arası gerilim (arka uç +)
check(iOf(TC + 0.1) === 3 && vSw(TC + 0.1) === 0 && iOf(TO + 0.1) === 0 && vSw(TO + 0.1) === 9, 'ideal anahtar: kapalı → V=0, i=3 mA; açık → i=0, V=9 V');
check(iOf(Z.o1[0]) === 0 && vSw(Z.o1[0]) === 9 && iOf(Z.o2[0]) === 3 && vSw(Z.o2[0]) === 0, 'o1/o2 değerleri');
const qOfG = (g) => IMA * (clamp(g, 2, 2 + DQ) - 2);                 // mC, grafik saatinde (alan)
check(Math.abs(qOfG(GX) - IMA * DQ) < 1e-12, 'alan = 3 mA × 8 s');

// görsel akış hızı ∝ akım
const V0 = 0.9 / IMA;
let _s = 0, _t = 0;
const flowSpeed = (t) => V0 * IMA * clamp(swAng(t) > 0.999 && closed(t) ? 1 : 0);
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += flowSpeed(_t) * dt; _t += dt; }
  return _s + flowSpeed(_t) * (t - _t);
};

// ---------------------------------------------------------------- efektler
export const meta = {
  title: 'Elektrik yükü, akım ve gerilim (Razavi ders 1)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: TC - 0.05, kind: 'click', gain: 0.16 },
    { t: TC + 0.1, kind: 'hum', d: TO - TC - 0.2, gain: 0.14 },
    { t: TO + 0.05, kind: 'click', gain: 0.14 },
    { t: QM[1] - 0.05, kind: 'pop', gain: 0.13 },
    { t: VM[1] - 0.05, kind: 'thud', gain: 0.15 },
    { t: VMR[1], kind: 'pop', gain: 0.13 },
    { t: SWC2[1] - 0.05, kind: 'click', gain: 0.15 },
    { t: SWC2[1] + 0.1, kind: 'hum', d: CUT1 - SWC2[1] - 0.3, gain: 0.13 },
    { t: CUT1 + 0.6, kind: 'thud', gain: 0.13 },
    { t: CUT2 + 0.1, kind: 'hum', d: DUR - CUT2 - 0.4, gain: 0.12 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.85, ZH = 0.95, Y = 0.2;
const SWG = 0.55, SWZ = 0.05;               // anahtar sol kenarda
const RL = 0.6, RZ = 0.0;                   // direnç sağ kenarda
const CZ = -0.05;
const GW = 1.4, GH = 1.15;                  // grafik paneli boyutu

// LCD dokusu (005'ten): lcd(w,h,renk) → {tex, set(yazı)}
function lcd(w, h, color) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  let last = null;
  return { tex, set(txt) {
    if (txt === last) return; last = txt;
    g.fillStyle = '#0b1410'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#2c3a33'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `900 ${Math.round(h * 0.6)}px "InterDisplay", sans-serif`;
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 18; g.fillText(txt, w / 2, h / 2 + 6); g.shadowBlur = 0;
    tex.needsUpdate = true;
  } };
}

// i(t) grafik paneli: canlı çizilir, eğri altı alan (yük) yeşil dolar
function graphPanel(S) {
  const Wc = 1024, Hc = 590;
  const c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
  const k = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 1, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(GW, GW * Hc / Wc), mat);
  const ox = 120, oy = 480, sx = (Wc - 190) / GX, sy = 300 / 4;   // 0..GX s, 0..4 mA
  const px = (g) => ox + g * sx, py = (i) => oy - i * sy;
  let last = -1;
  const draw = (g) => {
    const gq = Math.round(clamp(g, 0, GX) * 60) / 60; if (gq === last) return; last = gq;
    k.clearRect(0, 0, Wc, Hc);
    k.fillStyle = 'rgba(14,20,24,0.92)'; k.strokeStyle = '#2b3d44'; k.lineWidth = 6;
    k.beginPath(); k.roundRect(6, 6, Wc - 12, Hc - 12, 26); k.fill(); k.stroke();
    k.strokeStyle = 'rgba(120,190,210,0.10)'; k.lineWidth = 2;
    for (let s = 2; s <= GX; s += 2) { k.beginPath(); k.moveTo(px(s), oy); k.lineTo(px(s), py(4)); k.stroke(); }
    for (let i = 1; i <= 4; i++) { k.beginPath(); k.moveTo(ox, py(i)); k.lineTo(px(GX), py(i)); k.stroke(); }
    k.strokeStyle = '#cfe3ea'; k.lineWidth = 5; k.beginPath(); k.moveTo(ox, py(4.3)); k.lineTo(ox, oy); k.lineTo(px(GX + 0.3), oy); k.stroke();
    k.fillStyle = '#cfe3ea'; k.font = '800 40px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'top';
    for (let s = 0; s <= GX; s += 2) k.fillText(String(s), px(s), oy + 12);
    k.textAlign = 'right'; k.textBaseline = 'middle'; k.fillText('3', ox - 16, py(3)); k.fillText('0', ox - 16, oy);
    k.textAlign = 'left'; k.font = '800 44px "InterDisplay", sans-serif';
    k.fillStyle = '#ff6b5f'; k.fillText('i (mA)', ox + 14, py(4.2));
    k.fillStyle = '#cfe3ea'; k.textAlign = 'right'; k.fillText('t (s)', px(GX + 0.3), oy - 34);
    // alan (yük)
    const a0 = 2, a1 = clamp(gq, 2, 2 + DQ);
    if (a1 > a0) { k.fillStyle = 'rgba(63,224,122,0.42)'; k.fillRect(px(a0), py(IMA), px(a1) - px(a0), oy - py(IMA)); }
    // eğri
    if (gq > 0) {
      k.strokeStyle = '#ff5a4f'; k.lineWidth = 9; k.lineJoin = 'round'; k.shadowColor = '#ff3b30'; k.shadowBlur = 16; k.beginPath(); k.moveTo(px(0), oy);
      const e = Math.min(gq, 2); k.lineTo(px(e), oy);
      if (gq >= 2) { k.lineTo(px(2), py(IMA)); k.lineTo(px(Math.min(gq, 2 + DQ)), py(IMA)); }
      if (gq >= 2 + DQ) { k.lineTo(px(2 + DQ), oy); k.lineTo(px(gq), oy); }
      k.stroke(); k.shadowBlur = 0;
      const iy = gq >= 2 && gq < 2 + DQ ? IMA : 0;
      k.fillStyle = '#ffffff'; k.beginPath(); k.arc(px(gq), py(iy), 11, 0, 7); k.fill();
    }
    // yük sayacı
    k.textAlign = 'right'; k.textBaseline = 'top'; k.font = '900 54px "InterDisplay", sans-serif'; k.fillStyle = '#3fe07a';
    k.fillText(`q = ${Math.round(qOfG(gq))} mC`, Wc - 40, 30);
    tex.needsUpdate = true;
  };
  draw(0);
  return { mesh: m, mat, draw };
}

// Voltmetre: {group, show, leads}
function voltmeter(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.22, 0.42, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0xd8a326, roughness: 0.45, clearcoat: 0.3 }));
  body.position.y = 0.11; body.castShadow = true; g.add(body);
  const face = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.02, 0.36, 2, 0.008), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.5 })); face.position.y = 0.225; g.add(face);
  const show = lcd(512, 220, '#ffd23f');
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.18), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(0.04, 0.237, 0); g.add(scr);
  const vt = canvasTex(128, 128, (k) => { k.strokeStyle = '#fff'; k.lineWidth = 10; k.beginPath(); k.arc(64, 64, 52, 0, 7); k.stroke(); k.fillStyle = '#fff'; k.font = '900 72px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText('V', 64, 68); });
  const sym = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial({ map: vt, transparent: true })); sym.rotation.x = -Math.PI / 2; sym.position.set(-0.23, 0.237, 0); g.add(sym);
  S.scene.add(g); return { group: g, show };
}

// Duvar lamba anahtarı + tavan lambası (gerçek hayat mini modeli)
function wallSwitch(S) {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.62, 0.1, 4, 0.05), new THREE.MeshPhysicalMaterial({ color: 0xeceae4, roughness: 0.35, clearcoat: 0.4 }));
  plate.position.set(0, 0.4, 0); plate.castShadow = true; g.add(plate);
  const rocker = new THREE.Mesh(new RoundedBoxGeometry(0.26, 0.36, 0.08, 3, 0.03), new THREE.MeshPhysicalMaterial({ color: 0xf7f6f2, roughness: 0.3, clearcoat: 0.6 }));
  rocker.position.set(0, 0.4, 0.07); rocker.rotation.x = 0.16; g.add(rocker);
  for (const s of [-1, 1]) { const term = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16), S.M.copper); term.position.set(s * 0.2, 0.76, 0); g.add(term); }
  S.scene.add(g); return { group: g };
}

const Wc_u = (w, x, z) => w.uOf(x, z);

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 7 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG);

  // ------------------------------------------------ bakır tel: anahtar ve direnç aralıkları boş
  // döngü başlangıcı arka kenarın ortasında: hiçbir eleman aralığı u = 0'ı kesmez, tel her yerde çizilir (2c-1)
  const loop = roundedLoop([[0, -ZH], [-X, -ZH], [-X, ZH], [X, ZH], [X, -ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const gaps = [
    [Wc.uOf(-X, SWZ - SWG / 2 + 0.02), Wc.uOf(-X, SWZ + SWG / 2 - 0.02)],
    [Wc.uOf(X, RZ - RL / 2 - 0.02), Wc.uOf(X, RZ + RL / 2 + 0.02)],
  ].map(([a, b]) => [Math.min(a, b), Math.max(a, b)]).sort((p, q) => p[0] - q[0]);
  check(gaps.every(([a, b]) => b - a < 0.2), 'eleman aralıkları kısa (tel kesintisiz)');
  const segs = [[gaps[0][1], gaps[1][0]], [gaps[1][1], 1 + gaps[0][0]]];
  for (const [a, b] of segs) {
    const pts = []; for (let i = 0; i <= 300; i++) pts.push(Wc.curve.getPointAt(((a + ((b - a) * i) / 300) % 1 + 1) % 1));
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.03, 10), S.M.copper); m.castShadow = true; CG.add(m);
  }
  const B = battery(S, { len: 0.9, h: 0.3, w: 0.34, y: Y, text: '9 V' }); B.group.position.set(0, 0, ZH); CG.add(B.group);
  const SW = makeSwitch(S, { gap: SWG, y: Y }); SW.group.position.set(-X, 0, SWZ); CG.add(SW.group);
  const RX = resistor(S, { len: RL, radius: 0.14, bands: [0xff7a00, 0x111111, 0xe8231a, 0xd4af37], obstacles: 10 });
  RX.group.position.set(X, Y, RZ); CG.add(RX.group);   // turuncu-siyah-kırmızı = 30 × 100 = 3 kΩ
  check(30 * 100 === 3000, 'renk kodu: turuncu(3) siyah(0) kırmızı(×100) = 3 kΩ');

  // grafik paneli: arka kenarın üstünde, kameraya dönük
  const GP = graphPanel(S);
  GP.mesh.position.set(0, 0.5, -ZH - 0.32); GP.mesh.rotation.x = -0.8; CG.add(GP.mesh);

  // elektronlar
  const N = 44;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x1fcf5a, emissive: 0x14b84a, emissiveIntensity: 0.7, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.042, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const r = S.rng(11);
  const PH = Array.from({ length: N }, () => [r() * 6.28, r() * 6.28, 5 + r() * 4, 6 + r() * 5]);

  // geleneksel akım oku (kırmızı, + → −): sağ kenarda −z yönünde (pilin + ucundan arkaya)
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.55, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.18, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.36; arrow.add(head);
  arrow.position.set(X - 0.3, 0.24, 0.62); arrow.rotation.y = Math.PI / 2; CG.add(arrow);
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).z < -0.99, 'ok −z yönünde (sağ kenarda + → −)');

  // +1 C test yükü (v1): pilin − ucundan (b) + ucuna (a) yay üzerinde
  const tq = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 16), new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 1.3, roughness: 0.3 }));
  tq.visible = false; CG.add(tq);
  const pa = new THREE.Vector3(0.52, Y + 0.1, ZH), pb = new THREE.Vector3(-0.52, Y + 0.1, ZH);
  const qPos = (p, out) => out.lerpVectors(pb, pa, p).setY(Y + 0.1 + 0.55 * Math.sin(Math.PI * p));

  // voltmetre + uçlar (o1'den itibaren)
  const VMt = voltmeter(S); VMt.group.position.set(-0.12, 0, 0.12); CG.add(VMt.group);
  const leadMat = (c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.5, transparent: true, opacity: 0 });
  const mkLead = (from, to, mat) => {
    const mid = from.clone().lerp(to, 0.5); mid.y += 0.25;
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(from, mid, to), 40, 0.014, 8), mat); CG.add(m); return m;
  };
  const lmR = leadMat(0xe8231a), lmK = leadMat(0x202226);
  const back = new THREE.Vector3(-X, 0.25, SWZ - SWG / 2), front = new THREE.Vector3(-X, 0.25, SWZ + SWG / 2);
  mkLead(new THREE.Vector3(-0.3, 0.2, 0.0), back, lmR); mkLead(new THREE.Vector3(-0.3, 0.2, 0.24), front, lmK);

  // ------------------------------------------------ gerçek hayat: duvar anahtarı + lamba (aynı kadrajda)
  const LG = new THREE.Group(); scene.add(LG); LG.visible = false; LG.scale.setScalar(1.3);
  // priz (230 V AC kaynak, ön kenar) → açık bıçaklı anahtar (sol kenar) → lamba (sağ kenar); tel kesintisiz, açık devre = açık anahtar (2c-2)
  const LX = 0.75, LZ = 0.45, LY = 0.2, LSG = 0.4;
  LG.add(platform(S, 0, 0, { r: 0.9 }));
  const LL = new THREE.Group(); LL.position.y = 0.08; LG.add(LL);
  const lloop = roundedLoop([[0, -LZ], [-LX, -LZ], [-LX, LZ], [LX, LZ], [LX, -LZ]], { r: 0.16 });
  const Lw = closedWire(S, lloop, { y: LY }); Lw.mesh.visible = false;
  const lgaps = [[Wc_u(Lw, -LX, -LSG / 2 + 0.02), Wc_u(Lw, -LX, LSG / 2 - 0.02)], [Wc_u(Lw, -0.2, LZ), Wc_u(Lw, 0.2, LZ)], [Wc_u(Lw, LX, 0.15), Wc_u(Lw, LX, -0.15)]]
    .map(([p, q]) => [Math.min(p, q), Math.max(p, q)]).sort((p, q) => p[0] - q[0]);
  check(lgaps.every(([p, q]) => q - p < 0.2), 'gerçek hayat: aralıklar kısa');
  for (let i = 0; i < 3; i++) {
    const a0 = lgaps[i][1], b0 = i < 2 ? lgaps[i + 1][0] : 1 + lgaps[0][0];
    const pts = []; for (let k = 0; k <= 200; k++) pts.push(Lw.curve.getPointAt(((a0 + ((b0 - a0) * k) / 200) % 1 + 1) % 1));
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.028, 10), S.M.copper); m.castShadow = true; LL.add(m);
  }
  const LSW = makeSwitch(S, { gap: LSG, y: LY }); LSW.group.position.set(-LX, 0, 0); LSW.set(0); LL.add(LSW.group);
  const outlet = new THREE.Group(); outlet.position.set(0, 0, LZ); LL.add(outlet);
  const ob = new THREE.Mesh(new RoundedBoxGeometry(0.44, 0.36, 0.2, 4, 0.05), new THREE.MeshPhysicalMaterial({ color: 0xeceae4, roughness: 0.35, clearcoat: 0.4 }));
  ob.position.y = 0.18; ob.castShadow = true; outlet.add(ob);
  const of = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 32), new THREE.MeshPhysicalMaterial({ color: 0xd9d6ce, roughness: 0.4 }));
  of.rotation.x = Math.PI / 2; of.position.set(0, 0.19, 0.105); outlet.add(of);
  for (const sx of [-0.045, 0.045]) { const h = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 12), new THREE.MeshBasicMaterial({ color: 0x15171a })); h.rotation.x = Math.PI / 2; h.position.set(sx, 0.19, 0.112); outlet.add(h); }
  const LB = makeBulb(S, { scale: 0.9 }); LB.group.position.set(LX, 0, 0); LB.group.rotation.y = Math.PI / 2; LL.add(LB.group);
  const arc = new THREE.Mesh(new THREE.TorusGeometry(LSG / 2, 0.018, 8, 40, Math.PI), new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0 }));
  arc.rotation.y = Math.PI / 2; arc.position.set(-LX, LY + 0.1, 0); LL.add(arc);
  const WS = { group: LSW.group };
  const lw = (x, y, z) => [x * 1.3, (y + 0.08) * 1.3, z * 1.3];   // LG yerelinden dünyaya

  // ------------------------------------------------ kamera: yerinde, çok yavaş
  const cam = camRig(S, [
    [0, 0.0, 10.6, 58, 0, CZ], [A.c1, 0.05, 10.5, 58, 0, CZ], [A.c2, -0.04, 10.4, 59, 0, CZ], [A.v1, 0.04, 10.5, 58, 0, CZ],
    [A.o1, -0.05, 10.4, 58, 0, CZ], [A.o2, 0.04, 10.5, 59, 0, CZ], [A.g1, -0.04, 10.4, 58, 0, CZ], [A.f1, 0.05, 10.5, 58, 0, CZ],
    [DUR, -0.04, 10.3, 59, 0, CZ],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 15, y2: 21.5 });

  return (t) => {
    cam(t);
    const life = t >= CUT1 && t < CUT2;
    CG.visible = !life; LG.visible = life;
    SW.set(swAng(t));
    GP.draw(t - G0);
    GP.mat.opacity = easeOut(seg(t, A.c1, A.c1 + 0.3)); GP.mesh.visible = GP.mat.opacity > 0.01;
    const on = closed(t);

    // elektronlar: açıkken yerinde titrer, kapalıyken − → + akar
    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = 0.03 * Math.sin(t * p[2] + p[0]) / Wc.L;
      const u = ((((k / N) - s / Wc.L + du) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z); if (bad) pv.set(0, -1, 0);
      pv.y += 0.012 * Math.sin(t * p[3] + p[1]);
      const inBat = Math.abs(pv.x) < 0.47 && pv.z > ZH - 0.2;
      const inSw = Math.abs(pv.x + X) < 0.05 && Math.abs(pv.z - SWZ) < SWG / 2 - 0.02 && !(on && swAng(t) > 0.999);
      sv.setScalar(inBat || inSw || bad ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    RX.body.emissiveIntensity = on ? 0.25 + 0.05 * Math.sin(t * 9) : 0.02;

    // akım oku: akım varken
    const aOp = on ? easeOut(seg(t, (t < TO ? TC : SWC2[1]) + 0.3, (t < TO ? TC : SWC2[1]) + 0.8)) * (1 - easeOut(seg(t, TO, TO + 0.3)) * (t < TO + 0.3 && t >= TO ? 1 : 0)) : 0;
    arrowMat.opacity = aOp; arrow.visible = aOp > 0.01;

    // test yükü
    const qp = easeInOut(seg(t, ...QM));
    tq.visible = t >= QM[0] - 0.2 && t < Z.v1[1]; qPos(qp, tq.position); tq.scale.setScalar(easeOut(seg(t, QM[0] - 0.2, QM[0] + 0.2)) * (1 + 0.06 * Math.sin(t * 8)));
    B.glow.emissiveIntensity = 0.15 + 0.6 * fade(t, QM[0], Z.v1[1], 0.4);

    // voltmetre
    const vmO = easeOut(seg(t, ...VM));
    VMt.group.visible = vmO > 0.01; VMt.group.scale.setScalar(Math.max(0.001, vmO)); lmR.opacity = lmK.opacity = vmO;
    const vr = on ? 0 : VB * easeOut(seg(t, ...VMR));
    VMt.show.set(`${fmt(t < VMR[0] ? 0 : vr, 2)} V`);

    // gerçek hayat
    LB.set(0);
    arc.material.opacity = life ? 0.85 * easeOut(seg(t, CUT1 + 0.6, CUT1 + 1.2)) * (0.8 + 0.2 * Math.sin(t * 6)) : 0;

    yaz(t);

    // kanca alt satırı
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', 'Anahtar açık: akım yok. Ya gerilim?', { y: 26.3, size: 4.2, weight: 600, opacity: subO, nowrap: true });

    // nesne etiketleri
    const onC = (a, b) => (life ? 0 : fade(t, a, b, 0.3));
    label('lsw', 'anahtar', -X - 0.05, 0.62, SWZ - 0.05, { opacity: onC(0, Z.h1[1]), size: 3.8 });
    label('lr', '3 kΩ', X + 0.0, 0.55, RZ, { opacity: onC(0, Z.c2[1]) + onC(A.f1, DUR + 1), size: 4.0 });
    label('le', gr('elektronlar'), -0.25, 0.32, -ZH + 0.18, { opacity: onC(TC + 0.6, Z.c1[1]), size: 3.8 });
    label('la', rd('akım yönü'), X - 0.45, 0.4, 0.62, { opacity: onC(TC + 1.0, Z.c1[1]), size: 3.8 });
    label('lqa', hl('a (+)'), 0.55, 0.62, ZH, { opacity: onC(A.v1, Z.v1[1]), size: 4.0 });
    label('lqb', hl('b (−)'), -0.55, 0.62, ZH, { opacity: onC(A.v1, Z.v1[1]), size: 4.0 });
    label('lq', `+1 C`, tq.position.x, tq.position.y + 0.32, tq.position.z, { opacity: tq.visible ? onC(QM[0], Z.v1[1]) * (1 - seg(qp, 0.7, 0.85)) : 0, size: 3.6 });
    label('lw', `W = ${hl(fmt(9 * qp, 1) + ' J')}`, 0.0, 1.3, ZH - 0.45, { opacity: onC(QM[0] + 0.2, Z.v1[1]), size: 4.2 });
    label('lp', hl('+'), -X - 0.18, 0.4, SWZ - SWG / 2, { opacity: onC(VMR[0], SWC2[0]), size: 4.6 });
    label('ln', hl('−'), -X - 0.18, 0.4, SWZ + SWG / 2, { opacity: onC(VMR[0], SWC2[0]), size: 4.6 });
    label('li0', rd('i = 0'), X - 0.45, 0.45, RZ + 0.35, { opacity: onC(VM[0], SWC2[0]), size: 4.0 });
    label('li3', rd('i = 3 mA'), X - 0.4, 0.45, -0.55, { opacity: onC(SWC2[1] + 0.3, CUT1), size: 4.0 });
    label('l230', hl('≈ 230 V (AC)'), ...lw(-LX + 0.08, 0.78, -0.45), { opacity: life ? easeOut(seg(t, CUT1 + 1.0, CUT1 + 1.4)) : 0, size: 4.2 });
    label('lsa', 'anahtar açık', ...lw(-LX + 0.42, 0.3, 0.02), { opacity: life ? easeOut(seg(t, CUT1 + 0.2, CUT1 + 0.6)) : 0, size: 3.6 });
    label('loff', 'lamba sönük', ...lw(LX - 0.3, 1.0, -0.15), { opacity: life ? easeOut(seg(t, CUT1 + 0.4, CUT1 + 0.8)) : 0, size: 3.8 });
    label('lpr', 'priz (230 V AC)', ...lw(0, 0.62, LZ), { opacity: life ? easeOut(seg(t, CUT1 + 0.3, CUT1 + 0.7)) : 0, size: 3.6 });
    label('lli0', rd('i = 0'), ...lw(0, 0.4, -LZ), { opacity: life ? easeOut(seg(t, CUT1 + 0.6, CUT1 + 1.0)) : 0, size: 3.8 });
  };
}
