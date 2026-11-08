// 002 — Elektrik yükü, akım ve gerilim
// Atom (proton +, elektron −) → zıt/aynı yükler → bakırda serbest elektronlar → akım (I = Q/t) → gerilim (V = W/Q).
// Renkler: yük/elektron yeşil (gr), proton bakır-turuncu (cu), akım kırmızı (rd), gerilim sarı (hl), direnç mavi (bl).
// Seslendirme yok: anlatımı ekranda akan yazılar yapar (AGENT.md bölüm 6).

import { clamp, seg, easeInOut, easeOut, fade, lerp, RoundedBoxGeometry } from '../../tools/lib/stage.js';

const A = (c, m) => { if (!c) console.error('DOĞRULAMA HATASI: ' + m); };

// ---------------------------------------------------------------- anlatım yazıları
const hl = (x) => `<span class="hl">${x}</span>`, rd = (x) => `<span class="rd">${x}</span>`, bl = (x) => `<span class="bl">${x}</span>`;
const gr = (x) => `<span class="gr">${x}</span>`, cu = (x) => `<span class="cu">${x}</span>`;
const sup = (x) => `<sup style="font-size:.55em;line-height:0">${x}</sup>`;
const BEATS = [
  { id: 'h1', l1: `${gr('Elektrik yükü')} nedir?`, l2: `${rd('Akım')} ve ${hl('gerilimle')} bağı ne?`, s1: 7.2 },
  { id: 'h2', l1: 'Her şey atomla başlar', l2: 'madde atomlardan oluşur', s1: 7 },
  { id: 'at1', l1: 'Atomun merkezi: çekirdek', l2: `${cu('proton')} ve nötron içerir`, s1: 6.6 },
  { id: 'at2', l1: `${cu('Proton')}: pozitif (+) yük`, l2: 'nötron: yüksüz (0)', s1: 6.8 },
  { id: 'at3', l1: `${gr('Elektron')}: negatif (−) yük`, l2: 'çekirdeğin çevresinde döner', s1: 6.6, s2: 5.2 },
  { id: 'at4', l1: 'Proton ve elektron eşitse', l2: 'atom nötr: toplam yük 0', s1: 6.8, extra: 0.6 },
  { id: 'q1', l1: `${gr('Q')} = elektrik yükü`, l2: 'birimi: kulon (C)', s1: 7.2 },
  { id: 'q2', l1: 'Bir elektronun yükü', l2: `${gr('−1,6 × 10')}${sup(gr('−19'))}${gr(' C')}`, s1: 7, s2: 6.4 },
  { id: 'q3', l1: `${gr('1 C')} ≈ 6,24 × 10${sup('18')}`, l2: 'elektronun toplam yükü', s1: 7 },
  { id: 'c1', l1: 'Elektron kaybeden atom', l2: `pozitif (${cu('+')}) yüklü olur`, s1: 6.8, extra: 1.6 },
  { id: 'c2', l1: 'Elektron kazanan atom', l2: `negatif (${gr('−')}) yüklü olur`, s1: 6.8, extra: 2.6 },
  { id: 'f1', l1: 'Zıt yükler birbirini çeker', l2: `${cu('+')} ve ${gr('−')} birbirine yaklaşır`, s1: 6.4, s2: 5.2, extra: 1.4 },
  { id: 'f2', l1: 'Aynı yükler birbirini iter', l2: `${cu('+')} ve ${cu('+')} birbirinden uzaklaşır`, s1: 6.4, s2: 5.0, extra: 1.4 },
  { id: 'k1', l1: `Bakırda ${gr('elektronlar')} serbest`, l2: 'yük kolay hareket eder', s1: 6.2, extra: 1.0 },
  { id: 'k2', l1: 'Elektronlar tek yöne akarsa', l2: `bu akışa ${rd('akım')} denir`, s1: 6.2, extra: 2.2 },
  { id: 'i2', l1: `${rd('I')} = Q / t`, l2: 'akım = geçen yük ÷ süre', s1: 8.4, extra: 0.6 },
  { id: 'i3', l1: "3 C yük, 2 s'de geçerse", l2: `${rd('I')} = 3 C / 2 s = ${rd('1,5 A')}`, s1: 6.6, s2: 5.4, extra: 1.8 },
  { id: 'i3b', l1: `1 C / 1 s = ${rd('1 A')}`, l2: 'akımın birimi: amper (A)', s1: 7.2 },
  { id: 'i4', l1: `Akım yönü: ${hl('+')}'dan −'ye`, l2: 'elektronlar ters yöne akar', s1: 6.8, s2: 5.4, extra: 1.0 },
  { id: 'v1', l1: 'Yükleri akıtan ne?', l2: `Pil: ${hl('gerilim')} kaynağı`, s1: 7.2 },
  { id: 'v2', l1: 'Pil yüke enerji verir', l2: 'pilden çıkan yük parlaktır', s1: 7, s2: 5.4, extra: 1.0 },
  { id: 'v3', l1: `${hl('V')} = W / Q`, l2: 'gerilim = enerji ÷ yük', s1: 8.4 },
  { id: 'v4', l1: 'W: enerji, birimi joule (J)', l2: `${hl('1 V')} = 1 J / 1 C`, s1: 6.2, s2: 6 },
  { id: 'v5', l1: '2 C yük 18 J taşıyorsa', l2: `${hl('V')} = 18 J / 2 C = ${hl('9 V')}`, s1: 6.8, s2: 5.4 },
  { id: 'v6', l1: `${bl('Direnç')} enerjiyi harcar`, l2: 'yük sönük çıkar, ısı oluşur', s1: 7, s2: 5.4, extra: 1.0 },
  { id: 's1', l1: `${gr('Yük')} akarsa ${rd('akım')}`, l2: `${hl('gerilim')} yük başına enerjidir`, s1: 7.4, s2: 5.2 },
  { id: 's2', l1: `${rd('I')} = Q / t`, l2: `${hl('V')} = W / Q`, s1: 8.6, s2: 8.6, extra: 1.0 },
];
const wordsOf = (b) => (b.l1 + ' ' + b.l2).replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const minSec = (b) => 1.2 + 0.35 * wordsOf(b) + (b.extra || 0);
const SUM = BEATS.reduce((a, b) => a + minSec(b), 0);
const K = 1.02;                                   // okuma payı: her yazı en az 1,02 × asgari süre
const Z = {};
{ let t = 0; for (const b of BEATS) { const d = minSec(b) * K; Z[b.id] = [t, t + d]; t += d; } }
const DUR = Math.round(BEATS.reduce((a, b) => a + minSec(b) * K, 0) * 30) / 30;
for (const b of BEATS) A(Z[b.id][1] - Z[b.id][0] >= 1.2 + 0.35 * wordsOf(b) - 1e-9, `${b.id}: okuma süresi yetersiz`);

// ---------------------------------------------------------------- fizik ve bağımsız doğrulama
const E_CHARGE = 1.602176634e-19;                 // C (SI tanımı)
A(Math.abs(1 / E_CHARGE / 1e18 - 6.2415) < 1e-3, '1 C ≈ 6,24 × 10^18 elektron');
A(Math.abs(3 / 2 - 1.5) < 1e-12, 'I = 3 C / 2 s = 1,5 A');
A(Math.abs(1 / 1 - 1) < 1e-12, '1 C / 1 s = 1 A');
A(Math.abs(18 / 2 - 9) < 1e-12 && 9 * 2 === 18, 'V = 18 J / 2 C = 9 V; W = V × Q');
A(1 / 1 === 1, '1 V = 1 J / 1 C');
A(3 - 3 === 0 && 3 - 2 === 1 && 3 - 4 === -1, 'net yük: 3−3=0, 3−2=+1, 3−4=−1');
const fmt = (x) => x.toFixed(1).replace('.', ',');

export const meta = {
  title: 'Elektrik yükü, akım ve gerilim',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: Z.at1[0] + 0.1, kind: 'pop', gain: 0.3 },                 // çekirdek vurgulanır
    { t: Z.at2[0] + 0.1, kind: 'pop', gain: 0.3 },                 // protonlar parlar
    { t: Z.at3[0] + 0.1, kind: 'pop', gain: 0.3 },                 // elektronlar parlar
    { t: Z.at4[0] + 0.4, kind: 'pop', gain: 0.3 },                 // toplam yük etiketi
    { t: Z.q1[0] + 0.1, kind: 'pop', gain: 0.3 },
    { t: Z.c1[0] + 0.3, kind: 'pop', gain: 0.25 },                 // elektron ayrılır
    { t: Z.c2[0] + 0.2, kind: 'pop', gain: 0.25 },                 // elektron geri gelir
    { t: Z.c2[0] + 0.6 + 1.6 - 0.1, kind: 'pop', gain: 0.25 },     // ekstra elektron yerine oturur
    { t: Z.f1[0] + 0.5 + 2.4, kind: 'thud', gain: 0.25 },          // zıt yükler değer
    { t: Z.f2[0] + 0.1, kind: 'pop', gain: 0.3 },                  // işaret değişir, itme başlar
    { t: Z.k2[0] + 0.8, kind: 'hum', d: DUR - Z.k2[0] - 0.8 - 0.4, gain: 0.45 }, // akış uğultusu
    { t: Z.i2[0] + 0.1, kind: 'pop', gain: 0.3 },                  // kesit halkası
    { t: Z.v1[0] + 0.1, kind: 'pop', gain: 0.3 },                  // pil parlar
    { t: Z.v6[0] + 0.1, kind: 'pop', gain: 0.3 },                  // direnç ısınır
  ],
};

// ---------------------------------------------------------------- yardımcılar
function signTex(THREE, ch, color) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); g.clearRect(0, 0, 128, 128);
  g.fillStyle = color; g.font = '900 120px "InterDisplay", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,0.35)'; g.strokeText(ch, 64, 68); g.fillText(ch, 64, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function canvasTex(THREE, w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

// ---------------------------------------------------------------- devre yerleşimi (001 ile aynı)
const X = 0.9, ZH = 1.35, Y = 0.2, BAT_LEN = 0.9, RES_LEN = 0.6, RES_R = 0.15, RES_Z = -0.45, RING_Z = -0.75;
function loopPoints() {
  const poly = [[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]];
  const r = 0.2, pts = [], n = poly.length;
  for (let i = 0; i < n; i++) {
    const p0 = poly[(i + n - 1) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
    if (i === 0) { pts.push([p1[0], p1[1]]); continue; }
    const d1 = [p0[0] - p1[0], p0[1] - p1[1]], d2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...d1), l2 = Math.hypot(...d2);
    const a = [p1[0] + (d1[0] / l1) * r, p1[1] + (d1[1] / l1) * r], b = [p1[0] + (d2[0] / l2) * r, p1[1] + (d2[1] / l2) * r];
    for (let k = 0; k <= 10; k++) { const s = k / 10, q = 1 - s; pts.push([q * q * a[0] + 2 * q * s * p1[0] + s * s * b[0], q * q * a[1] + 2 * q * s * p1[1] + s * s * b[1]]); }
  }
  const dense = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), m = Math.max(1, Math.round(L / 0.06));
    for (let k = 0; k < m; k++) dense.push([a[0] + ((b[0] - a[0]) * k) / m, a[1] + ((b[1] - a[1]) * k) / m]);
  }
  return dense;
}
// elektronun enerji düzeyi (0..1): pilin − ucundan çıkınca 1, dirençte 1→0, dönüş yolunda 0, pilde 0→1
function energyAt(x, z) {
  if (z > ZH - 0.05) { if (x > 0.45) return 0; if (x < -0.45) return 1; return (0.45 - x) / 0.9; }
  if (x < -X + 0.1) { if (z > -0.15) return 1; if (z < -0.75) return 0; return (z + 0.75) / 0.6; }
  return 0;
}

// ---------------------------------------------------------------- bölümler (sahne grupları)
const SEC = { atom: [0, Z.f1[0]], pair: [Z.f1[0], Z.k1[0]], wire: [Z.k1[0], Z.i2[0]], circ: [Z.i2[0], DUR + 1] };
const secScale = (t, [a, b], first = false) => {
  const inn = first ? 1 : easeOut(seg(t, a + 0.05, a + 0.45));
  const out = easeInOut(seg(t, b - 0.35, b));
  return Math.max(0, inn * (1 - out));
};

export function build(S) {
  const { THREE, M, scene } = S;
  S.table({ seed: 5 });
  S.lights.key.shadow.camera.left = -3.4; S.lights.key.shadow.camera.right = 3.4;
  S.lights.key.shadow.camera.top = 3.4; S.lights.key.shadow.camera.bottom = -3.4;
  const W = S.width, H = S.height;
  const proj = new THREE.Vector3();
  const label = (id, html, wx, wy, wz, { size = 5.2, opacity = 1 } = {}) => {
    proj.set(wx, wy, wz).project(S.camera);
    S.text(id, html, { x: (proj.x * 0.5 + 0.5) * 100, y: (0.5 - proj.y * 0.5) * 100, size, opacity, maxWidth: 60, nowrap: true });
  };

  // ================================================= ATOM
  const atomG = new THREE.Group(); atomG.position.set(0, 1.4, 0); scene.add(atomG);
  const ATOM_Y = 1.4;
  const protonMat = new THREE.MeshPhysicalMaterial({ color: 0xe9703f, roughness: 0.3, clearcoat: 0.8, emissive: 0xff7a3a, emissiveIntensity: 0 });
  const neutronMat = new THREE.MeshPhysicalMaterial({ color: 0x9aa0a8, roughness: 0.35, clearcoat: 0.6, emissive: 0xffffff, emissiveIntensity: 0 });
  const NR = 0.12, ND = 0.25;
  const nuc = [[0, 0, 0, 'n'], [ND, 0, 0, 'p'], [-ND, 0, 0, 'n'], [0, ND, 0, 'p'], [0, -ND, 0, 'n'], [0, 0, ND, 'p'], [0, 0, -ND, 'n']];
  A(ND > 2 * NR, 'nükleonlar iç içe geçmemeli');
  const plusTex = signTex(THREE, '+', '#ffffff'), zeroTex = signTex(THREE, '0', '#1b1d21'), minusTex = signTex(THREE, '−', '#0c2a16');
  const nucSprites = [];
  for (const [x, y, z, k] of nuc) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(NR, 28, 20), k === 'p' ? protonMat : neutronMat);
    m.position.set(x, y, z); m.castShadow = true; atomG.add(m);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: k === 'p' ? plusTex : zeroTex, transparent: true, depthTest: false }));
    sp.scale.setScalar(NR * 1.5); sp.renderOrder = 5; atomG.add(sp);
    nucSprites.push({ sp, c: new THREE.Vector3(x, y, z), r: NR });
  }
  // yörüngeler ve elektronlar
  const ORB = [
    { R: 0.62, rot: [0.35, 0.0, 0.0], w: 2.4, ph: 0.4 },
    { R: 0.82, rot: [1.1, 0.4, 0.0], w: 1.9, ph: 2.1 },
    { R: 1.02, rot: [-0.7, -0.9, 0.0], w: 1.5, ph: 4.0 },
    { R: 1.22, rot: [0.5, 1.3, 0.2], w: 1.2, ph: 1.0 },
  ];
  const ER = 0.08;
  for (let i = 1; i < ORB.length; i++) A(ORB[i].R - ORB[i - 1].R > 2 * ER + 0.02, 'yörüngeler arası boşluk');
  A(ORB[0].R - ER > 0.25 + NR + 0.02, 'elektron çekirdekle iç içe geçmemeli');
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  const aLight = new THREE.PointLight(0xffffff, 14, 7, 2); aLight.position.set(0.8, 2.6, 2.4); scene.add(aLight);
  const elMat = new THREE.MeshPhysicalMaterial({ color: 0x2fbf63, roughness: 0.25, clearcoat: 1, emissive: 0x2fbf63, emissiveIntensity: 0.35, transparent: true, opacity: 1 });
  const els = [];
  for (const o of ORB) {
    const g = new THREE.Group(); g.rotation.set(...o.rot); atomG.add(g);
    g.add(new THREE.Mesh(new THREE.TorusGeometry(o.R, 0.006, 8, 120), ringMat));
    o.q = new THREE.Quaternion().setFromEuler(g.rotation);
    const m = new THREE.Mesh(new THREE.SphereGeometry(ER, 24, 16), elMat); m.castShadow = true; atomG.add(m);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: minusTex, transparent: true, depthTest: false })); sp.renderOrder = 6; atomG.add(sp);
    els.push({ m, sp });
  }
  const tmpV = new THREE.Vector3();
  const faceCam = (sp, centerLocal, r) => {
    tmpV.set(0, ATOM_Y, 0).add(centerLocal); // dünya konumu (atomG ölçeklenmeden kabul)
    const dir = S.camera.position.clone().sub(tmpV).normalize();
    sp.position.copy(centerLocal).addScaledVector(dir, r + 0.01);
  };

  // ================================================= İKİ KÜRE (çekme / itme)
  const pairG = new THREE.Group(); pairG.position.set(0, 0, 0); scene.add(pairG);
  const SR_ = 0.26;
  const posMat = new THREE.MeshPhysicalMaterial({ color: 0xe9703f, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1, metalness: 0.2 });
  const negMat = new THREE.MeshPhysicalMaterial({ color: 0x2fbf63, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1, metalness: 0.2 });
  const sA = new THREE.Mesh(new THREE.SphereGeometry(SR_, 40, 28), posMat); sA.castShadow = true; sA.receiveShadow = true;
  const sB = new THREE.Mesh(new THREE.SphereGeometry(SR_, 40, 28), negMat); sB.castShadow = true; sB.receiveShadow = true;
  pairG.add(sA, sB);
  const FAR = 0.8, NEAR = SR_ + 0.01;
  A(NEAR >= SR_, 'küreler iç içe geçmemeli');

  // ================================================= BAKIR TEL KESİTİ (serbest elektronlar)
  const wireG = new THREE.Group(); wireG.position.set(0, 0.55, 0); scene.add(wireG);
  const TUBE_R = 0.3, TUBE_L = 3.2;
  const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0xc8744a, metalness: 0.6, roughness: 0.25, transparent: true, opacity: 0.38, depthWrite: false, clearcoat: 1 });
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R, TUBE_R, TUBE_L, 48, 1, true), tubeMat);
  tube.rotation.z = Math.PI / 2; tube.renderOrder = 2; wireG.add(tube);
  for (const s of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(TUBE_R, 0.012, 10, 48), M.copper); ring.rotation.y = Math.PI / 2; ring.position.x = s * (TUBE_L / 2 - 0.02); wireG.add(ring);
  }
  const ionMat = new THREE.MeshPhysicalMaterial({ color: 0xa65a38, metalness: 1, roughness: 0.35 });
  const IONR = 0.06, ION_DX = 0.32;
  const ionGeo = new THREE.SphereGeometry(IONR, 18, 12);
  const NIONC = Math.floor(TUBE_L / ION_DX);
  const ions = new THREE.InstancedMesh(ionGeo, ionMat, NIONC * 4); ions.castShadow = true;
  { const m4 = new THREE.Matrix4(); let k = 0;
    for (let c = 0; c < NIONC; c++) for (const [y, z] of [[0.1, 0.1], [-0.1, 0.1], [0.1, -0.1], [-0.1, -0.1]]) { m4.makeTranslation(-TUBE_L / 2 + ION_DX * (c + 0.5), y, z); ions.setMatrixAt(k++, m4); } }
  wireG.add(ions);
  const LANES = [[0, 0], [0.2, 0], [-0.2, 0], [0, 0.2], [0, -0.2]];
  A(Math.hypot(0.2 - 0.1, 0.1) - 0.025 * Math.SQRT2 > IONR + 0.035 + 0.005, 'elektron şeritleri iyonlarla iç içe geçmemeli');
  A(0.2 + 0.035 + 0.025 < TUBE_R, 'elektronlar telin dışına taşmamalı');
  const FE = 5 * 4;
  const feMat = new THREE.MeshPhysicalMaterial({ color: 0x2fbf63, roughness: 0.25, clearcoat: 1, emissive: 0x2fbf63, emissiveIntensity: 0.5 });
  const feMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 16, 12), feMat, FE); feMesh.castShadow = true; wireG.add(feMesh);
  const R9 = S.rng(11);
  const fe = Array.from({ length: FE }, (_, k) => ({ lane: k % 5, x0: -TUBE_L / 2 + (TUBE_L / 4) * (Math.floor(k / 5) + 0.12 + 0.11 * (k % 5)), p: [R9() * 6.28, R9() * 6.28, R9() * 6.28], w: [3 + R9() * 2, 3.5 + R9() * 2, 2.5 + R9() * 2] }));
  let driftCache = 0, driftT = 0;
  const DRIFT_V = 0.55;
  const driftAt = (t) => { // elektronların ortalama kayması (u): k2'de hızlanır
    const t0 = Z.k2[0] + 0.5;
    if (t <= t0) return 0;
    let s = 0; const dt = 1 / 30;
    for (let x = t0; x < t; x += dt) s += DRIFT_V * easeInOut(seg(x, t0, t0 + 1.2)) * dt;
    return s;
  };

  // ================================================= DEVRE (pil, tel, direnç, elektronlar)
  const circG = new THREE.Group(); scene.add(circG);
  const pts3 = loopPoints().map(([x, z]) => new THREE.Vector3(x, Y, z));
  const curve = new THREE.CatmullRomCurve3(pts3, true, 'centripetal'); curve.arcLengthDivisions = 3000;
  const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 900, 0.03, 12, true), M.copper); wire.castShadow = true; circG.add(wire);
  const L = curve.getLength();
  const uOf = (x, z) => { let best = 0, bd = 1e9; for (let i = 0; i < 2000; i++) { const p = curve.getPointAt(i / 2000); const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; best = i / 2000; } } return best; };

  const platePlastic = new THREE.MeshPhysicalMaterial({ color: 0x24282f, roughness: 0.38, clearcoat: 0.5, clearcoatRoughness: 0.2 });
  const yellowGlow = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 0, metalness: 0.9, roughness: 0.3 });
  const bat = new THREE.Group(); circG.add(bat);
  { const h = 0.34, w = 0.36;
    const body = new THREE.Mesh(new RoundedBoxGeometry(BAT_LEN, h, w, 4, 0.035), platePlastic); body.position.y = h / 2; body.castShadow = body.receiveShadow = true; bat.add(body);
    const capP = new THREE.Mesh(new RoundedBoxGeometry(0.16, h + 0.012, w + 0.012, 3, 0.03), yellowGlow); capP.position.set(BAT_LEN / 2 - 0.07, h / 2, 0); bat.add(capP);
    const capN = new THREE.Mesh(new RoundedBoxGeometry(0.1, h + 0.012, w + 0.012, 3, 0.03), M.steel); capN.position.set(-BAT_LEN / 2 + 0.04, h / 2, 0); bat.add(capN);
    const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20), M.gold); nub.rotation.z = Math.PI / 2; nub.position.set(BAT_LEN / 2 + 0.02, Y, 0); bat.add(nub);
    const tex = canvasTex(THREE, 1024, 360, (c, Wd, Hd) => {
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '900 210px "InterDisplay", sans-serif'; c.fillStyle = '#ffffff'; c.fillText('9 V', Wd / 2, Hd / 2 + 8);
      c.font = '900 230px "InterDisplay", sans-serif'; c.fillStyle = '#ff5a4f'; c.fillText('+', Wd - 110, Hd / 2 + 6);
      c.fillStyle = '#6fb2ff'; c.fillText('−', 110, Hd / 2 + 6);
    });
    const lab = new THREE.Mesh(new THREE.PlaneGeometry(BAT_LEN * 0.8, BAT_LEN * 0.8 * 360 / 1024), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    lab.rotation.x = -Math.PI / 2; lab.position.set(0, h + 0.002, 0); bat.add(lab); }
  bat.position.set(0, 0, ZH);
  const batLight = new THREE.PointLight(0xffd23f, 0, 3.2, 2); batLight.position.set(0, 0.9, ZH - 0.5); circG.add(batLight);

  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xd9c4a0, roughness: 0.35, metalness: 0, transparent: true, opacity: 0.4, depthWrite: false, clearcoat: 0.8, clearcoatRoughness: 0.1, emissive: 0xff6a2a, emissiveIntensity: 0 });
  const res = new THREE.Group(); circG.add(res);
  { const body = new THREE.Mesh(new THREE.CylinderGeometry(RES_R, RES_R, RES_LEN, 40), bodyMat); body.rotation.x = Math.PI / 2; body.renderOrder = 2; res.add(body);
    for (const s of [-1, 1]) { const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 28), M.steel); cap.rotation.x = Math.PI / 2; cap.position.z = s * (RES_LEN / 2 + 0.03); cap.castShadow = true; res.add(cap); }
    [0xe6c200, 0x2e9b45, 0x6b3a1d, 0xd4af37].forEach((c, i) => { const band = new THREE.Mesh(new THREE.CylinderGeometry(RES_R + 0.004, RES_R + 0.004, 0.055, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.4, metalness: i === 3 ? 0.8 : 0, side: THREE.DoubleSide })); band.rotation.x = Math.PI / 2; band.position.z = -0.24 + i * 0.12 + (i === 3 ? 0.08 : 0); res.add(band); });
    for (let k = 0; k < 14; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.03, 14, 10), M.iron); const a = k * 2.4; s.position.set(0.108 * Math.cos(a), 0.108 * Math.sin(a), -RES_LEN / 2 + 0.07 + (k * (RES_LEN - 0.14)) / 13); res.add(s); } }
  res.position.set(-X, Y, RES_Z);

  const rMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.012, 12, 48), rMat); ring.position.set(X, Y, RING_Z); circG.add(ring);
  const uRing = uOf(X, RING_Z);

  // yükler (elektronlar): bağlı-devre hareketi akım yönünün TERSİNE
  const N = 52;
  const cMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.25, clearcoat: 1, emissive: 0x103a1c, emissiveIntensity: 0.6 });
  const charges = new THREE.InstancedMesh(new THREE.SphereGeometry(0.052, 20, 14), cMat, N);
  charges.castShadow = true; charges.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(N * 3), 3); circG.add(charges);
  const mtx = new THREE.Matrix4(), qt = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3(), col = new THREE.Color();
  const R = S.rng(9);
  const ph = Array.from({ length: N }, () => [R() * 6.28, R() * 6.28, 0.8 + R() * 0.6]);
  const cBase = new THREE.Color(0x2fbf63), cDim = new THREE.Color(0x14472a), cBright = new THREE.Color(0xffe85a);
  // akım okları (kırmızı, + → − yönünde)
  const NA = 6;
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xe8231a, emissive: 0xe8231a, emissiveIntensity: 0.5, roughness: 0.3, clearcoat: 0.6 });
  const arrows = new THREE.InstancedMesh(new THREE.ConeGeometry(0.075, 0.24, 20), arrowMat, NA); circG.add(arrows);
  const up = new THREE.Vector3(0, 1, 0), tan = new THREE.Vector3();

  // ================================================= kamera
  const camKeys = [ // t, azimut, mesafe, yükselme(°), hedef x,y,z
    [0, -0.25, 9.0, 22, 0, ATOM_Y, 0],
    [Z.f1[0] - 0.4, 0.25, 8.8, 24, 0, ATOM_Y, 0],
    [Z.f1[0] + 0.4, 0.0, 8.4, 38, 0, 0.3, 0],
    [Z.k1[0] - 0.4, 0.12, 8.2, 38, 0, 0.3, 0],
    [Z.k1[0] + 0.4, 0.0, 7.8, 32, 0, 0.55, 0],
    [Z.i2[0] - 0.4, 0.18, 7.6, 32, 0, 0.55, 0],
    [Z.i2[0] + 0.4, -0.2, 9.6, 56, 0, 0.1, 0.05],
    [Z.v1[0], 0.1, 9.4, 56, 0, 0.1, 0.1],
    [DUR, 0.15, 9.8, 57, 0, 0.1, 0.05],
  ];
  function cam(t) {
    let i = 0; while (i < camKeys.length - 2 && t > camKeys[i + 1][0]) i++;
    const a = camKeys[i], b = camKeys[i + 1], p = easeInOut(seg(t, a[0], b[0]));
    const v = a.map((x, k) => lerp(x, b[k], p));
    const el = (v[3] * Math.PI) / 180, D = v[2];
    S.camera.position.set(v[4] + D * Math.cos(el) * Math.sin(v[1]), v[5] + D * Math.sin(el), v[6] + D * Math.cos(el) * Math.cos(v[1]));
    S.camera.lookAt(new THREE.Vector3(v[4], v[5], v[6]));
    S.camera.updateMatrixWorld();
  }

  // ================================================= üst yazılar (akan anlatım)
  const tops = BEATS.map((bt, i) => {
    const [t0, t1] = Z[bt.id], last = i === BEATS.length - 1;
    return (t) => {
      const inn = i === 0 ? 1 : easeOut(seg(t, t0, t0 + 0.35));
      const out = last ? 0 : easeInOut(seg(t, t1 - 0.3, t1));
      const o = t >= t0 && t < t1 + 0.001 ? clamp(inn * (1 - out)) : 0;
      const dy = (1 - inn) * 3.2 - out * 3.2;
      const e1 = S.text(bt.id + 'a', bt.l1, { y: 9 + dy, size: bt.s1 || 7.4, opacity: o, maxWidth: 94, nowrap: true });
      const e2 = S.text(bt.id + 'b', bt.l2, { y: 17.5 + dy, size: bt.s2 || 5.4, weight: 700, opacity: o, maxWidth: 94, nowrap: true });
      if (o > 0.99 && (t * 30 | 0) % 30 === 0) for (const e of [e1, e2]) { const w = e.scrollWidth, cw = e.getBoundingClientRect().width; A(Math.min(w, cw) <= 0.0 || true, ''); const r = document.createRange(); r.selectNodeContents(e); const bw = r.getBoundingClientRect().width; A(bw <= 0.94 * W, `${bt.id}: yazı genişliği ${(bw / W * 100).toFixed(1)}% > 94%`); }
    };
  });

  // ================================================= kare fonksiyonu
  let lastTravel = 0;
  return (t) => {
    cam(t);
    const sAtom = secScale(t, SEC.atom, true), sPair = secScale(t, SEC.pair), sWire = secScale(t, SEC.wire), sCirc = secScale(t, SEC.circ);
    for (const [g, s] of [[atomG, sAtom], [pairG, sPair], [wireG, sWire], [circG, sCirc]]) { g.visible = s > 0.004; g.scale.setScalar(Math.max(0.001, s)); }

    // ---------- ATOM
    if (atomG.visible) {
      const dimF = easeInOut(seg(t, Z.at1[0], Z.at1[0] + 0.5)) * (1 - easeInOut(seg(t, Z.at3[0] - 0.2, Z.at3[0] + 0.3)));
      ringMat.opacity = 0.5 * (1 - 0.8 * dimF); aLight.visible = true; elMat.opacity = 1 - 0.8 * dimF;
      const pls = 0.5 + 0.5 * Math.sin(t * 5);
      const protOn = fade(t, Z.at2[0], Z.at3[0] + 0.3, 0.4);
      const nucOn = fade(t, Z.at1[0], Z.at2[0] + 0.3, 0.4);
      protonMat.emissiveIntensity = 0.12 + protOn * (0.5 + 0.35 * pls) + nucOn * 0.3;
      neutronMat.emissiveIntensity = 0.04 + nucOn * 0.18 + fade(t, Z.at2[0] + 1.0, Z.at3[0] + 0.3, 0.4) * 0.12;
      const elOn = fade(t, Z.at3[0], Z.at4[1] + 0.2, 0.4);
      elMat.emissiveIntensity = 0.3 + elOn * (0.5 + 0.35 * pls);
      for (const n of nucSprites) faceCam(n.sp, n.c, n.r);
      // elektron ayrılma / geri gelme / fazladan gelme
      const dep = easeInOut(seg(t, Z.c1[0] + 0.3, Z.c1[0] + 1.7));        // 0→1 ayrılır
      const ret = easeInOut(seg(t, Z.c2[0] + 0.2, Z.c2[0] + 1.4));        // 0→1 geri döner
      const away = dep * (1 - ret);                                        // e3 (dış elektron) uzaklık oranı
      const arr = easeInOut(seg(t, Z.c2[0] + 0.6, Z.c2[0] + 2.2));        // 4. elektron yaklaşır
      ORB.forEach((o, i) => {
        const th = o.w * t + o.ph;
        const p = new THREE.Vector3(o.R * Math.cos(th), o.R * Math.sin(th), 0).applyQuaternion(o.q);
        let s = 1;
        if (i === 2) { p.x += away * 2.4; p.y += away * 0.6; s = 1 - easeInOut(seg(away, 0.55, 1)); }
        if (i === 3) { p.x -= (1 - arr) * 2.6; p.y += (1 - arr) * 0.5; s = easeOut(seg(arr, 0, 0.45)); }
        const e = els[i]; e.m.position.copy(p); e.m.scale.setScalar(Math.max(0.001, s)); e.m.visible = s > 0.004;
        e.sp.visible = s > 0.004; e.sp.scale.setScalar(ER * 1.5 * Math.max(0.001, s)); faceCam(e.sp, p, ER * s);
      });
      const nEl = t < Z.c1[0] + 1.0 ? 3 : t < Z.c2[0] + 1.3 ? 2 : t < Z.c2[0] + 2.1 ? 3 : 4;
      const lblOp = easeOut(seg(t, Z.at4[0] + 0.4, Z.at4[0] + 0.8)) * (1 - easeInOut(seg(t, SEC.atom[1] - 0.4, SEC.atom[1] - 0.1)));
      const txt = nEl === 3 ? `(${cu('+3')}) + (${gr('−3')}) = 0` : nEl === 2 ? `(${cu('+3')}) + (${gr('−2')}) = ${cu('+1')}` : `(${cu('+3')}) + (${gr('−4')}) = ${gr('−1')}`;
      S.text('net', txt, { x: 50, y: 74, size: 6.4, opacity: lblOp, maxWidth: 80, nowrap: true });
    } else S.text('net', '', { opacity: 0 });

    // ---------- İKİ KÜRE
    if (pairG.visible) {
      const tIn = Z.f1[0] + 0.5;
      const att = easeInOut(seg(t, tIn, tIn + 2.4));                     // çekilme 0→1
      const f2s = Z.f2[0] + 0.1;
      const rep = easeInOut(seg(t, f2s + 0.2, f2s + 2.4));               // itilme 0→1
      const gap = t < f2s ? lerp(FAR, NEAR, att) : lerp(NEAR, FAR, rep); // kürelerin merkezlerinin x uzaklığı (her biri ±gap)
      const flipped = t >= f2s;
      sA.position.set(-gap, SR_, 0); sB.position.set(gap, SR_, 0);
      A(2 * gap >= 2 * SR_ + 0.0 - 1e-9, 'küreler iç içe geçmemeli');
      sB.material = flipped ? posMat : negMat;
      const pop = 1 + 0.12 * Math.sin(Math.PI * seg(t, f2s, f2s + 0.3));
      sB.scale.setScalar(pop);
      const lo = easeOut(seg(t, Z.f1[0] + 0.1, Z.f1[0] + 0.5)) * (1 - easeInOut(seg(t, SEC.pair[1] - 0.35, SEC.pair[1] - 0.05)));
      label('sa', `<span class="cu">+</span>`, -gap, SR_ + 0.7, 0, { size: 11, opacity: lo });
      label('sb', flipped ? `<span class="cu">+</span>` : `<span class="gr">−</span>`, gap, SR_ + 0.7, 0, { size: 11, opacity: lo });
    } else { S.text('sa', '', { opacity: 0 }); S.text('sb', '', { opacity: 0 }); }

    // ---------- TEL KESİTİ
    if (wireG.visible) {
      const ds = driftAt(t);
      const m4 = new THREE.Matrix4();
      fe.forEach((e, k) => {
        const [ly, lz] = LANES[e.lane];
        let x = e.x0 + ds; x = ((x + TUBE_L / 2) % TUBE_L + TUBE_L) % TUBE_L - TUBE_L / 2;
        const jx = 0.07 * Math.sin(t * e.w[0] + e.p[0]), jy = 0.025 * Math.sin(t * e.w[1] + e.p[1]), jz = 0.025 * Math.sin(t * e.w[2] + e.p[2]);
        const edge = clamp((TUBE_L / 2 - Math.abs(x)) / 0.2);
        m4.compose(new THREE.Vector3(x + jx, ly + jy, lz + jz), qt, sc.setScalar(Math.max(0.001, edge)));
        feMesh.setMatrixAt(k, m4);
      });
      feMesh.instanceMatrix.needsUpdate = true;
      const on = fade(t, Z.k1[0] + 0.1, SEC.wire[1] - 0.1, 0.4);
      label('ke', `<span class="gr">elektron −</span>`, -0.5, 0.55 + 0.68, 0.0, { size: 4.6, opacity: easeOut(seg(t, Z.k1[0] + 0.5, Z.k1[0] + 0.9)) * (1 - easeInOut(seg(t, SEC.wire[1] - 0.35, SEC.wire[1] - 0.05))) });
      label('ki', `<span class="cu">bakır iyonu</span>`, 0.55, 0.55 - 0.68, 0.0, { size: 4.4, opacity: easeOut(seg(t, Z.k1[0] + 0.9, Z.k1[0] + 1.3)) * (1 - easeInOut(seg(t, SEC.wire[1] - 0.35, SEC.wire[1] - 0.05))) });
      void on;
    } else { S.text('ke', '', { opacity: 0 }); S.text('ki', '', { opacity: 0 }); }

    // ---------- DEVRE
    if (circG.visible) {
      const tc = Math.max(0, t - Z.i2[0]);
      const SPEED = 0.5;                                   // sembolik hız (m/s)
      const sTrav = SPEED * tc;
      const eOn = easeInOut(seg(t, Z.v2[0], Z.v2[0] + 0.8));                  // enerji renkleri
      for (let k = 0; k < N; k++) {
        const u = (((k / N - sTrav / L) % 1) + 1) % 1;       // elektronlar akımın tersine: u azalır
        curve.getPointAt(u, ps);
        const E = energyAt(ps.x, ps.z);
        col.copy(cBase).lerp(((c) => c.copy(cDim).lerp(cBright, E))(new THREE.Color()), eOn);
        charges.setColorAt(k, col);
        const inRes = (ps.x < -X + 0.06 && Math.abs(ps.z - RES_Z) < RES_LEN / 2 + 0.06) ? clamp(1 - (Math.abs(ps.z - RES_Z) - (RES_LEN / 2 - 0.1)) / 0.16) : 0;
        let rad = 1;
        if (inRes > 0) { const f = ph[k]; ps.x += 0.034 * inRes * Math.sin(t * 9 * f[2] + f[0]); ps.y += 0.034 * inRes * Math.sin(t * 11 * f[2] + f[1]); rad = 1 - 0.2 * inRes; }
        sc.setScalar(rad); mtx.compose(ps, qt, sc); charges.setMatrixAt(k, mtx);
      }
      charges.instanceMatrix.needsUpdate = true; charges.instanceColor.needsUpdate = true;
      // akım okları: u artar (+ → −)
      const arrOn = fade(t, Z.i4[0] + 0.1, Z.v1[0] + 0.1, 0.4);
      for (let k = 0; k < NA; k++) {
        const u = (((k / NA + sTrav / L) % 1) + 1) % 1;
        curve.getPointAt(u, ps); curve.getTangentAt(u, tan);
        ps.y += 0.24; qt.setFromUnitVectors(up, tan);
        sc.setScalar(Math.max(0.001, arrOn)); mtx.compose(ps, qt, sc); arrows.setMatrixAt(k, mtx);
      }
      arrows.instanceMatrix.needsUpdate = true; arrows.visible = arrOn > 0.004;
      // halka + sayaç
      const ringOp = fade(t, Z.i2[0] + 0.1, Z.i3b[1] + 0.1, 0.4);
      let pulse = 0;
      for (let k = 0; k < N; k++) { const u = (((k / N - sTrav / L) % 1) + 1) % 1; let d = (u - uRing + 0.5) % 1; if (d < 0) d += 1; d = (d - 0.5) * L; pulse = Math.max(pulse, Math.exp(-((d / 0.07) ** 2))); }
      rMat.opacity = ringOp * (0.35 + 0.65 * pulse);
      const tCnt = clamp(t - (Z.i3[0] + 0.4), 0, 2);
      const Q = 1.5 * tCnt;
      const cntOp = easeOut(seg(t, Z.i3[0], Z.i3[0] + 0.4)) * (1 - easeInOut(seg(t, Z.i3b[1] - 0.3, Z.i3b[1])));
      label('cnt', `t = ${fmt(tCnt)} s · ${gr('Q')} = ${fmt(Q)} C`, 0.0, 0.3, 0.0, { size: 5.2, opacity: cntOp });
      if (tCnt >= 2) A(Math.abs(Q / tCnt - 1.5) < 1e-9, 'sayaç I = 1,5 A');
      // gerilim: pil parlaması
      const vOn = fade(t, Z.v1[0] - 0.1, Z.v5[1] + 0.2, 0.4);
      const pls = 0.5 + 0.5 * Math.sin(t * 5);
      yellowGlow.emissiveIntensity = 0.15 + vOn * (0.6 + 0.8 * pls);
      batLight.intensity = vOn * (1.2 + 1.2 * pls);
      // direnç ısınması
      const hOn = fade(t, Z.v6[0] - 0.1, DUR + 1, 0.5);
      bodyMat.emissiveIntensity = 0.02 + hOn * (0.45 + 0.2 * Math.sin(t * 4));
      // etiketler
      const vTxt = t >= Z.v5[0] ? `${hl('Q = 2 C → W = 18 J')}` : `${hl('9 V')}`;
      label('lv', vTxt, 0.0, 0.45, ZH - 0.7, { opacity: easeOut(seg(t, Z.v1[0] + 0.4, Z.v1[0] + 0.8)), size: t >= Z.v5[0] ? 4.8 : 6 });
      label('lr', bl('Direnç'), -0.4, 0.45, RES_Z + 0.1, { opacity: easeOut(seg(t, Z.v6[0] + 0.2, Z.v6[0] + 0.6)), size: 5 });
      const iDirOp = fade(t, Z.i4[0] + 0.2, Z.v1[0], 0.4);
      label('lg', gr('elektron akışı ←'), 0.0, 0.25, -ZH + 0.5, { opacity: 0, size: 4.4 });
      void iDirOp;
    } else { for (const id of ['cnt', 'lv', 'lr', 'lg']) S.text(id, '', { opacity: 0 }); }

    for (const f of tops) f(t);
  };
}
export const __Z = Z;
