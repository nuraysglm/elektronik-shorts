// 009 sesli test — Kirchhoff gerilim yasasında işaret (Razavi, Basic Circuits, Ders 4). İlk seslendirmeli Short.
// Vurgulanan nokta: iki işaret kuralı (1: artıdan eksiye geçince eksi, eksiden artıya geçince artı; 2: girilen uçtaki işaret)
// birbirinin tam tersidir, ikisi de doğru denklemi verir; aynı denklemde karıştırılırsa bu örnekte 7 V yerine −17 V çıkar.
// Ses: wip/009-sesli-test/ses.mp3 (kanal sahibinin klon sesi, 52,77 sn). Zamanlar zamanlama.json'dan (zamanla.py) alındı.
// AGENT.md 2a-S: denklemler sesle eşzamanlı yazılır. 2a-7 istisnası (yalnızca bu video, kanal sahibi onayı): akım oku ve
// "akım yönü / elektronlar" etiketleri gösterilmez; elektronlar sönük akmaya devam eder (durağan an yok).
// Devre (üstten bakış, ekranda saat yönü = dolaşma yönü): sol kolda 12 V akü (+ üstte), üst kolda R₁ (+ solda),
// sağ kolda R₂ (+ üstte). Dolaşma akünün eksi ucundan başlar: akü (eksiden artıya), R₁, R₂, alt tel, başlangıç.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade, lerp } from '../../tools/lib/stage.js';
import { hl, rd, gr, fmt, check, penSec } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, resistor, projLabel, canvasTex } from '../../tools/lib/parcalar.js';
import { meter } from '../../tools/lib/olcum.js';

// ---------------------------------------------------------------- sayılar (dogrula.py ile aynı)
const VS = 12, V1 = 5;
const k1 = VS - V1;                 // kural 1: +12 − 5 − V₂ = 0
const k2 = -(-VS + V1);             // kural 2: −12 + 5 + V₂ = 0
const kar = -(VS + V1);             // karışık: +12 + 5 + V₂ = 0
check(k1 === 7 && k2 === 7 && kar === -17, 'V₂: kural 1 = 7, kural 2 = 7, karışık = −17');

// ---------------------------------------------------------------- ses zamanları (zamanlama.json, cümle başı/sonu ve iç duraklamalar)
const C = [
  [0.05, 3.01], [3.41, 4.18], [4.39, 6.87], [7.30, 10.00], [10.24, 12.18], [12.50, 14.05], [14.41, 16.15], [16.44, 20.27],
  [20.56, 22.38], [22.88, 28.22], [28.56, 33.09], [33.52, 34.44], [34.93, 37.60], [37.92, 40.96], [41.20, 41.89],
  [42.32, 43.26], [43.53, 46.29], [46.65, 49.67], [50.02, 51.42], [51.81, 52.52],
];
const SES = 52.77;                                  // ses dosyasının süresi
// kart: "Bu yanlış." biter bitmez (C[19][1]); başlık hemen, maddeler kalemle 0,25 sn/kelime; en az 4 sn okunur
const KART = [
  { id: 'kh', html: `<span style="color:#7fe3ff">Bilmen gerekenler</span>`, y: 14.4, size: 5.4, weight: 900, pen: false },
  { id: 'k1', html: `• İki işaret kuralı da doğrudur`, y: 19.6 },
  { id: 'k2', html: `• Bir denklemde ${hl('tek kural')} kullan`, y: 24.2 },
];
const K0 = C[19][1] + 0.03;
{ let t = K0 + 0.15; for (const k of KART) { if (k.pen === false) { k.t0 = K0; k.t1 = K0 + 0.2; continue; } k.t0 = t; k.t1 = t + 0.25 * 5; t = k.t1 + 0.05; } }
const KEND = Math.max(...KART.map((k) => k.t1));
const DUR = Math.ceil((KEND + 4.0) * 30) / 30;
check(DUR - KEND >= 4.0 - 1e-9, 'kart en az 4 sn okunur');
check(DUR <= 60, `süre ≤ 60 sn (${DUR})`);
check(DUR >= SES + 1, 'ses videodan önce biter');

// band yazıları: [id, html, başlangıç, bitiş, y, boyut, kalem?]
const SW = (t) => t;                                 // anlık geçiş (≤ 0,3 sn)
const BAND = [
  ['h0', 'Kirchhoff gerilim yasası', 0, C[1][0], 13.2, 4.0, false, 700],
  ['h1', 'Kaynak geriliminin önüne', 0, C[1][0], 17.6, 6.4, false, 900],
  ['h2', hl('artı mı, eksi mi?'), 0, C[1][0], 22.8, 6.8, false, 900],
  ['a1', 'İkisi de olur', C[1][0], C[9][0], 15.0, 6.6, true, 900],
  ['a2', 'Tek denklemde tek kural', C[2][0], C[9][0], 20.6, 5.4, true, 800],
  ['b1', 'Birinci kural', C[9][0], C[12][0], 14.4, 6.0, true, 900],
  ['b2', 'Artıdan eksiye eksi, eksiden artıya artı', 23.86, C[12][0], 19.1, 4.7, true, 700],
  ['c1', 'İkinci kural', C[12][0], C[15][0], 14.4, 6.0, true, 900],
  ['c2', 'Girdiğin uçtaki işareti yaz', 35.84, C[15][0], 19.1, 4.9, true, 700],
  ['d1', rd('Kurallar karışırsa'), C[15][0], K0, 14.4, 6.0, true, 900],
  ['d2', rd('Bu yanlış'), C[19][0], K0, 19.1, 5.4, true, 900],
];
// denklemler: terimler ve sesle eşzamanlı başlangıçları (iç duraklamalara göre)
const V2s = hl('V₂');
const EQ = [
  { id: 'f1', t0: C[10][0], t1: C[12][0], terms: [['+12 V', 28.56], ['− 5 V', 29.69], [`− ${V2s}`, 30.70], ['= 0', 32.28]] },
  { id: 'f2', t0: C[13][0], t1: C[15][0], terms: [['−12 V', 37.92], ['+ 5 V', 39.04], [`+ ${V2s}`, 40.05], ['= 0', 40.96]] },
  { id: 'f3', t0: C[17][0], t1: K0, terms: [['+12 V', 46.65], ['+ 5 V', 47.78], [`+ ${V2s}`, 48.76], ['= 0', 49.67]] },
];
check(EQ.every((e) => e.terms.every(([, t], i, a) => i === 0 || t > a[i - 1][1])), 'terimler sırayla');

// dolaşma: [t0, t1, u0, u1] parçaları (u: döngü konumu; aşağıda build'de hesaplanır)
export const _T = { C, KART, DUR };

export const meta = {
  title: 'Kirchhoff gerilim yasası: artı mı, eksi mi? (Razavi ders 4, sesli test)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 11.45, kind: 'click', gain: 0.25 },
    { t: 33.55, kind: 'pop', gain: 0.25 },
    { t: 41.25, kind: 'pop', gain: 0.25 },
    { t: 50.05, kind: 'thud', gain: 0.3 },
    { t: K0, kind: 'thud', gain: 0.2 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 0.97, ZH = 1.55, Y = 0.2;
const AZ0 = 0.55, AZ1 = -0.35;          // akü: − ucu +z (ekranda altta), + ucu −z (üstte)
const R1X = 0.05, R2Z = 0.15, RL = 0.6;
const MX = 0.05, MZ = -0.72;             // multimetre

const YEL = '#ffd23f';
const checkSvg = `<svg viewBox="0 0 24 24" style="width:.9em;height:.9em;vertical-align:-0.12em;margin-left:.2em"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="#5fe08a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function signPlane(S, txt, size = 0.17) {
  const mat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff,
    map: canvasTex(128, 128, (k) => { k.fillStyle = YEL; k.font = '900 124px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(txt, 64, 70); }) });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat); m.rotation.x = -Math.PI / 2; m.renderOrder = 3; return m;
}

function aku(S) {
  // 12 V akü: z ekseninde, + ucu −z, − ucu +z; uçlar tel yüksekliğinde (Y)
  const g = new THREE.Group(), len = AZ0 - AZ1 - 0.12;
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.36, len, 4, 0.03), new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, roughness: 0.5, clearcoat: 0.25 }));
  body.position.y = 0.18; body.castShadow = body.receiveShadow = true; g.add(body);
  const lid = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.05, len + 0.02, 3, 0.015), new THREE.MeshPhysicalMaterial({ color: 0x3a3e46, roughness: 0.45 }));
  lid.position.y = 0.37; g.add(lid);
  const glow = new THREE.MeshPhysicalMaterial({ color: 0xd23a2e, emissive: 0xff3b30, emissiveIntensity: 0.15, roughness: 0.4 });
  const tP = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20), glow); tP.rotation.x = Math.PI / 2; tP.position.set(0, Y, -len / 2 - 0.04); g.add(tP);
  const tN = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20), S.M.steel); tN.rotation.x = Math.PI / 2; tN.position.set(0, Y, len / 2 + 0.04); g.add(tN);
  const sP = signPlane(S, '+', 0.2); sP.position.set(0, 0.401, -len / 2 + 0.12); g.add(sP);
  const sN = signPlane(S, '−', 0.2); sN.position.set(0, 0.401, len / 2 - 0.12); g.add(sN);
  g.position.set(-X, 0, (AZ0 + AZ1) / 2); S.scene.add(g);
  return { group: g, glow, sP, sN };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 9 });
  const sc = S.lights.key.shadow.camera; sc.left = -6; sc.right = 6; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG); CG.userData.main = true;

  // döngü: başlangıç sol kolda akünün eksi ucunun altında; u artan yön = dolaşma yönü (yukarı, sağa, aşağı, sola)
  const loop = roundedLoop([[-X, 0.95], [-X, -ZH], [X, -ZH], [X, ZH], [-X, ZH]], { r: 0.22 });
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const u = (x, z) => Wc.uOf(x, z);
  const uA0 = u(-X, AZ0), uA1 = u(-X, AZ1);
  const uR1a = u(R1X - RL / 2 - 0.03, -ZH), uR1b = u(R1X + RL / 2 + 0.03, -ZH);
  const uR2a = u(X, R2Z - RL / 2 - 0.03), uR2b = u(X, R2Z + RL / 2 + 0.03);
  check(uA0 < uA1 && uA1 < uR1a && uR1a < uR1b && uR1b < uR2a && uR2a < uR2b, 'dolaşma sırası: akü, R₁, R₂');
  const gaps = [[uA0 + 0.004, uA1 - 0.004], [uR1a + 0.004, uR1b - 0.004], [uR2a + 0.004, uR2b - 0.004]];
  for (let i = 0; i < gaps.length; i++) {
    const a = gaps[i][1], b = i < gaps.length - 1 ? gaps[i + 1][0] : 1 + gaps[0][0];
    const pts = []; for (let j = 0; j <= 240; j++) pts.push(Wc.curve.getPointAt(((a + ((b - a) * j) / 240) % 1 + 1) % 1));
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 480, 0.03, 10), S.M.copper); mm.castShadow = true; CG.add(mm);
  }
  const inGap = (uu) => gaps.some(([a, b]) => uu > a && uu < b);

  // elemanlar
  const A = aku(S); CG.add(A.group); A.group.userData.box = 'akü';
  const mkR = () => { const r = resistor(S, { len: RL, radius: 0.14, bands: [], obstacles: 0, opacity: 0.85 }); r.body.color.set(0x6f9fd8); return r; };
  const R1 = mkR(); R1.group.rotation.y = Math.PI / 2; R1.group.position.set(R1X, Y, -ZH); CG.add(R1.group); R1.group.userData.box = 'R1';
  const R2 = mkR(); R2.group.position.set(X, Y, R2Z); CG.add(R2.group); R2.group.userData.box = 'R2';
  // işaretler (sarı): R₁ + solda, − sağda (döngünün içinde); R₂ + üstte, − altta (döngünün içinde)
  const s1P = signPlane(S, '+'); s1P.position.set(R1X - 0.27, 0.205, -ZH + 0.2); CG.add(s1P);
  const s1N = signPlane(S, '−'); s1N.position.set(R1X + 0.27, 0.205, -ZH + 0.2); CG.add(s1N);
  const s2P = signPlane(S, '+'); s2P.position.set(X - 0.21, 0.205, R2Z - 0.25); CG.add(s2P);
  const s2N = signPlane(S, '−'); s2N.position.set(X - 0.21, 0.205, R2Z + 0.25); CG.add(s2N);

  // multimetre ve uç kabloları (kırmızı uç R₁'in + ucuna)
  const MM = meter(S, 'V', YEL, { w: 0.62, d: 0.42 }); MM.group.position.set(MX, 0, MZ); CG.add(MM.group); MM.group.userData.box = 'multimetre';
  const cable = (col, from, via, to) => {
    const curve = new THREE.CatmullRomCurve3([from, ...via, to].map((p) => new THREE.Vector3(...p)));
    const geo = new THREE.TubeGeometry(curve, 160, 0.014, 8);
    const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.45 })); m.castShadow = true; CG.add(m);
    return { m, geo, n: geo.index.count };
  };
  const cR = cable(0xd8352a, [MX - 0.18, 0.24, MZ - 0.2], [[-0.25, 0.3, -1.05]], [R1X - RL / 2 - 0.02, Y + 0.02, -ZH + 0.02]);
  const cB = cable(0x4a4e57, [MX + 0.05, 0.24, MZ - 0.2], [[0.33, 0.3, -1.05]], [R1X + RL / 2 + 0.02, Y + 0.02, -ZH + 0.02]);
  const CONN = [10.3, 11.45];

  // dolaşma işaretçisi ve yön izi
  const mkMat = (c, o = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, depthWrite: false });
  const mk = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 12, 40), mkMat(0xfff2b0)); ring.rotation.x = -Math.PI / 2; mk.add(ring);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 12), mkMat(0xffffff)); mk.add(core);
  mk.renderOrder = 4; CG.add(mk);
  const trailCurve = new THREE.CatmullRomCurve3(Array.from({ length: 400 }, (_, i) => { const p = Wc.curve.getPointAt(((uA0 + i / 399) % 1)); p.y += 0.06; return p; }));
  const trailGeo = new THREE.TubeGeometry(trailCurve, 800, 0.012, 6); const trailN = trailGeo.index.count;
  const trailMat = mkMat(0xfff6d0, 0.0); const trail = new THREE.Mesh(trailGeo, trailMat); CG.add(trail);
  const trailFrac = (uu) => clamp((uu - uA0) / 1);

  // dolaşma takvimi: [t0, t1, ua, ub] (doğrusal); duraklamalarda teller arasında geçiş
  const U0 = uA0, U1 = uA0 + 1;
  const pass = (ts) => [[ts[0], ts[1], U0, uA1], [ts[1], ts[2], uA1, uR1a], [ts[2], ts[3], uR1a, uR1b], [ts[3], ts[4], uR1b, uR2a], [ts[4], ts[5], uR2a, uR2b], [ts[5], ts[6], uR2b, U1]];
  const P1 = pass([28.56, 29.43, 29.69, 30.45, 30.70, 32.04, 32.40]);
  const P2 = pass([37.92, 38.77, 39.04, 39.80, 40.05, 40.96, 41.15]);
  const P3 = pass([46.65, 47.52, 47.78, 48.54, 48.76, 49.67, 49.95]);
  const TR = pass([16.44, 17.08, 17.68, 18.49, 18.70, 20.27, 20.30]).slice(0, 5);   // yön izi (yalnızca yolu gösterir)
  const along = (P, t) => { for (let i = P.length - 1; i >= 0; i--) { const [a, b, ua, ub] = P[i]; if (t >= a) return lerp(ua, ub, easeInOut(seg(t, a, b))); } return null; };

  // elektronlar (sönük, gerçek yönde: dolaşmanın tersine)
  const N = 40;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x1fcf5a, emissive: 0x14b84a, emissiveIntensity: 0.5, roughness: 0.3, transparent: true, opacity: 0.75 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.03, 12, 10), eMat, N); CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3(), mp = new THREE.Vector3();

  const CD = 10.5, CE = 66, CX = 0.0, CT = -0.2;
  // kamera: yerinde sürekli, çok yavaş yaşar (durağan an yok, 2a-13); anahtar karelerde durmasın diye düzgün sinüs + doğrusal kayma
  const tgt = new THREE.Vector3(CX, 0.1, CT);
  const cam = (t) => {
    const a = -0.03 + 0.06 * (t / DUR) + 0.018 * Math.sin(t * 0.42), D = CD + 0.08 * Math.sin(t * 0.31 + 1), el = ((CE + 0.6 * Math.sin(t * 0.23)) * Math.PI) / 180;
    S.camera.position.set(CX + D * Math.cos(el) * Math.sin(a), 0.1 + D * Math.sin(el), CT + D * Math.cos(el) * Math.cos(a));
    S.camera.lookAt(tgt); S.camera.updateMatrixWorld();
  };

  // denklem: her terim kendi zamanında soldan sağa açılır (kalem izi gibi)
  const eqHtml = (e, t) => e.terms.map(([s, t0]) => { const p = clamp((t - t0) / 0.45) * 112 - 6;
    return `<span style="display:inline-block;-webkit-mask-image:linear-gradient(90deg,#000 ${p}%,transparent ${p + 6}%);mask-image:linear-gradient(90deg,#000 ${p}%,transparent ${p + 6}%)">${s}</span>`; }).join(' ');
  const strike = (html, p) => `<span style="background:linear-gradient(#ff5a4f,#ff5a4f) left 56%/${(p * 100).toFixed(1)}% .14em no-repeat">${html}</span>`;

  return (t) => {
    cam(t);
    // ---- band
    for (const [id, html, a, b, y, size, pen, w] of BAND) {
      const o = t >= a && t < b ? (a === 0 ? 1 : easeOut(seg(t, a, a + 0.15))) * (1 - easeOut(seg(t, b - 0.15, b))) : 0;
      const rv = pen ? clamp((t - a - 0.05) / penSec(html)) : null;
      S.text(id, html, { x: 46, y, size, weight: w, opacity: o, maxWidth: 88, nowrap: true, minSize: 4.5, ...(pen ? { reveal: rv } : {}) });
    }
    for (const e of EQ) {
      const o = t >= e.t0 && t < e.t1 ? easeOut(seg(t, e.t0, e.t0 + 0.1)) * (1 - easeOut(seg(t, e.t1 - 0.15, e.t1))) : 0;
      S.text(e.id, eqHtml(e, t), { x: 46, y: 23.2, size: 6.3, weight: 900, opacity: o, maxWidth: 88, nowrap: true });
    }
    for (const k of KART) S.text(k.id, k.html, { x: 47, y: k.y, size: k.size || 4.6, weight: k.weight || 700, align: 'left', maxWidth: 78, nowrap: true,
      opacity: t >= k.t0 ? easeOut(seg(t, k.t0 - 0.02, k.t0 + 0.15)) : 0, ...(k.pen === false ? {} : { reveal: clamp((t - k.t0) / (k.t1 - k.t0)) }) });

    // ---- nesne etiketleri (döngünün içinde)
    const chipO = fade(t, -1, 7.3, 0.3);
    const ok = t >= 3.45 ? checkSvg : '';
    label('cp', `<span style="color:${YEL}">+12 V</span>${ok || ' ?'}`, -0.4, 0.3, -0.12, { size: 4.6, opacity: chipO });
    label('cn', `<span style="color:${YEL}">−12 V</span>${ok || ' ?'}`, -0.4, 0.3, 0.34, { size: 4.6, opacity: chipO });
    const pen = (a, d) => clamp((t - a) / d);
    label('l12', hl('12 V'), -0.5, 0.3, 0.1, { size: 4.6, opacity: t >= 7.35 ? 1 : 0 });
    // V₁
    label('lv1', `${hl('V₁')} = 5 V`, MX, 0.3, MZ + 0.56, { size: 4.2, opacity: t >= 11.7 ? 1 : 0 });
    // V₂: ? → 7 V (kural 1) → ? → 7 V (kural 2) → ? → −17 V (karışık, üstü çizilir)
    let v2 = `${hl('V₂')} = ?`;
    if ((t >= 33.55 && t < 35.4) || (t >= 41.25 && t < 42.9)) v2 = `${hl('V₂')} = ${gr('7 V')}`;
    if (t >= 50.05) v2 = strike(`${hl('V₂')} = ${rd('−17 V')}`, easeInOut(seg(t, 52.12, 52.5)));
    const v2pulse = 1 + 0.12 * (Math.exp(-((t - 33.7) ** 2) / 0.05) + Math.exp(-((t - 41.4) ** 2) / 0.05) + Math.exp(-((t - 50.2) ** 2) / 0.05));
    label('lv2', v2, X - 0.64, 0.3, R2Z, { size: 4.4 * v2pulse, opacity: t >= 12.6 ? 1 : 0 });
    // kural etiketleri (karışık)
    label('ta', `<span style="color:#cfe3ea">birinci kural</span>`, -0.45, 0.3, 0.78, { size: 3.6, opacity: t >= 43.6 && t < K0 ? 1 : 0 });
    label('t1', `<span style="color:#cfe3ea">ikinci kural</span>`, -0.68, 0.3, -1.0, { size: 3.4, opacity: t >= 45.0 && t < K0 ? 1 : 0 });
    label('t2', `<span style="color:#cfe3ea">ikinci kural</span>`, 0.4, 0.3, 0.78, { size: 3.6, opacity: t >= 45.6 && t < K0 ? 1 : 0 });
    // etiketler kalemle: projLabel reveal desteklemediği için kısa görünme (opaklık) — aşağıda yazılış maskesi
    for (const [id, a] of [['l12', 7.35], ['lv1', 11.7], ['lv2', 12.6], ['ta', 43.6], ['t1', 45.0], ['t2', 45.6]]) {
      const e = document.querySelector(`#overlay [data-id="${id}"] > span`); if (!e) continue;
      const p = pen(a, 0.5) * 112 - 6; const m = p >= 105 ? 'none' : `linear-gradient(90deg,#000 ${p}%,transparent ${p + 6}%)`;
      e.style.webkitMaskImage = m; e.style.maskImage = m;
    }

    // ---- elemanların parlaması
    const glowR = 0.5 * fade(t, 8.1, 9.3, 0.5);
    R1.body.emissiveIntensity = glowR; R2.body.emissiveIntensity = glowR;
    const pulse = (m, ts) => { let s = 0; for (const a of ts) s += Math.exp(-((t - a - 0.3) ** 2) / 0.06); m.scale.setScalar(1 + 0.6 * clamp(s)); };
    pulse(s1P, [20.6, 39.04]); pulse(s2P, [21.5, 40.05]); pulse(A.sN, [37.92]);
    pulse(s1N, []); pulse(s2N, []); pulse(A.sP, []);

    // ---- multimetre
    const pc = easeInOut(seg(t, ...CONN));
    for (const c of [cR, cB]) { c.geo.setDrawRange(0, Math.floor(pc * c.n / 6) * 6); c.m.visible = pc > 0.01; }
    MM.show.set(t >= CONN[1] ? `${fmt(V1, 2)} V` : `${fmt(0, 2)} V`);

    // ---- işaretçi ve yön izi
    let uu = null;
    for (const P of [P3, P2, P1]) { if (t >= P[0][0]) { uu = along(P, t); break; } }
    if (uu === null && t >= 14.41) uu = U0;
    const mkO = t < 14.41 ? 0 : easeOut(seg(t, 14.45, 14.9)) * (1 - easeOut(seg(t, K0, K0 + 0.3)));
    mk.visible = mkO > 0.01;
    if (mk.visible) {
      Wc.curve.getPointAt(((uu % 1) + 1) % 1, mp); mk.position.set(mp.x, mp.y + 0.05, mp.z);
      const breathe = 1 + 0.12 * Math.sin(t * 5);
      mk.scale.setScalar(breathe); ring.material.opacity = 0.95 * mkO; core.material.opacity = mkO;
    }
    const tr = along(TR, t);
    trailGeo.setDrawRange(0, tr === null ? 0 : Math.floor(trailFrac(tr) * trailN / 6) * 6);
    trailMat.opacity = 0.55 * fade(t, 16.4, 22.8, 0.4);

    // ---- elektronlar
    const s = 0.11 * t;
    for (let k = 0; k < N; k++) {
      const uk = ((((k / N) - s / Wc.L) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(uk, 1 - 1e-6), pv);
      sv.setScalar(inGap(uk) ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    A.glow.emissiveIntensity = 0.15 + 0.1 * Math.sin(t * 2.2);
  };
}
