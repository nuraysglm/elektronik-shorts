// 006 — Elektrik yükü, akım ve gerilim (Temel Devre Teorisi I, ders 1). Ağırlık: elektrik yükü (proton, elektron, kulon).
// Animasyon anlatır, yazı kalemle yazılarak doğrular (AGENT.md 2a). Proton bakır (+), elektron yeşil (−), akım kırmızı, gerilim sarı.
// Dört görüntü aynı kadrajda kesmeyle değişir (kural 15): atom → balon ve yün kumaş → bakır tel içi (kulon, akım) → pil + ampul devresi (gerilim).
// Ekrandaki tüm sayılar kodda hesaplanır ve check() ile doğrulanır.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade, lerp } from '../../tools/lib/stage.js';
import { hl, rd, gr, cu, sup, fmt, check, penTimeline, narrationPen } from '../../tools/lib/anlatim.js';
import { roundedLoop, closedWire, battery, projLabel, camRig, canvasTex } from '../../tools/lib/parcalar.js';
import { makeBulb, platform } from '../../tools/lib/devre.js';

// ---------------------------------------------------------------- anlatım (pre: yazıdan önceki yazısız animasyon)
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `${gr('Elektrik yükü')} nedir?`, l2: 'Atomun içine bakalım', s1: 7.0, s2: 5.4, extra: 1.0 },
  { id: 'a1', pre: 2.6, l1: `${cu('Proton +')} · ${gr('Elektron −')}`, l2: 'Nötron yüksüz', s1: 6.4 },
  { id: 'a2', pre: 2.8, l1: `3 ${cu('+')} ve 3 ${gr('−')} → toplam 0`, s1: 6.4 },
  { id: 'b1', pre: 4.6, l1: 'Sürtünce elektron geçer', l2: `Balon ${gr('−')} · kumaş ${cu('+')}`, s1: 6.2 },
  { id: 'b2', pre: 3.2, l1: `Zıt ${gr('yükler')} birbirini çeker`, s1: 6.0 },
  { id: 'q1', pre: 3.8, l1: `1 kulon (C) ≈ 6,24 × 10${sup('18')} ${gr('elektron')}`, s1: 5.6 },
  { id: 'i1', pre: 4.0, l1: `Saniyede 1 C → ${rd('akım')} 1 A`, l2: `${rd('Akım')}: ${gr('yükün')} akışı`, s1: 6.2 },
  { id: 'v1', pre: 4.8, l1: `${hl('Gerilim')}: yüke verilen enerji`, l2: `${hl('9 V')}: her 1 C'ye 9 J`, s1: 6.0 },
  { id: 'f1', pre: 0.8, l1: `${rd('I')} = ${gr('Q')} ÷ t  ·  ${hl('V')} = W ÷ ${gr('Q')}`, l2: `${gr('Q')}: yük (C) · W: enerji (J)`, s1: 6.2, s2: 5.0 },
  { id: 'f2', pre: 0.2, l1: `${gr('6 C')}, 3 s → ${rd('I')} = 2 A`, l2: `${gr('2 C')}, 18 J → ${hl('V')} = 9 V`, s1: 6.2, s2: 5.4, extra: 0.3 },
];
const { Z, A, W: WR, DUR } = penTimeline(BEATS, { k: 1.0 });
export const _T = { Z, A };

// ---------------------------------------------------------------- sayılar (hepsi hesaptan)
const E = 1.602176634e-19;                       // elektronun yükünün büyüklüğü, C
const N1C = 1 / E;                               // 1 C'deki elektron sayısı ≈ 6,24 × 10^18
const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
check(near(N1C / 1e18, 6.2415, 1e-3), '1 C ≈ 6,24 × 10^18 elektron');
check(near(6 / 3, 2) && near(18 / 2, 9) && near(1 / 1, 1), 'f2: 6 C / 3 s = 2 A; 18 J / 2 C = 9 V; 1 C / 1 s = 1 A');
const NP = 3, NE = 3;                            // lityum atomu: 3 proton, 3 elektron (4 nötron)
check(NP - NE === 0, 'a2: (+3) + (−3) = 0');
const NB = 6;                                    // balona geçen elektron = kumaşta kalan + sayısı (yük korunur)

// ---------------------------------------------------------------- olay zamanları
const CUTB = A.b1 + 0.2, CUTW = A.q1 + 0.2, CUTC = A.v1 + 0.2;           // aynı kadrajda kesmeler
const P_GLOW = [A.a1 + 0.3, A.a1 + 1.1], E_GLOW = [A.a1 + 1.3, A.a1 + 2.1];
const CNT = [A.a2 + 0.3, A.a2 + 1.3];                                   // +3 / −3 etiketleri, sonra "toplam 0"
const RUB = [A.b1 + 0.6, A.b1 + 3.4];                                   // kumaş balona sürtülür
const HOP = Array.from({ length: NB }, (_, k) => RUB[0] + 0.25 + k * ((RUB[1] - RUB[0] - 0.6) / (NB - 1)));
const AWAY = [A.b1 + 3.5, A.b1 + 4.6];                                  // kumaş yerine (sola) çekilir
const PULL = [A.b2 + 0.3, A.b2 + 1.8];                                  // balon kumaşa doğru eğilir (çekim)
const COUNT = [A.q1 + 0.5, A.q1 + 3.4];                                 // sayaç: 0 → 6,24 × 10^18 elektron
const TIMER = [A.i1 + 0.4, A.i1 + 3.4];                                 // 3 s'de 3 C
const nAt = (t) => { const p = easeInOut(seg(t, ...COUNT)); return p <= 0 ? 0 : Math.pow(10, p * Math.log10(N1C)); };
const tAt = (t) => 3 * seg(t, ...TIMER);
check(near(nAt(Z.q1[0]), N1C, N1C * 1e-9) && near(nAt(Z.q1[0]) * E, 1, 1e-9), 'q1: sayaç 6,24 × 10^18 → Q = 1,00 C');
check(near(tAt(Z.i1[0]), 3) && near(tAt(Z.i1[0]) / 3, 1), 'i1: 3 C / 3 s = 1 A');
const ok = (a, b) => a <= b + 0.01;
check(ok(P_GLOW[1] + 1.5, Z.a1[0]) && ok(CNT[1] + 1.5, Z.a2[0]) && ok(HOP[NB - 1] + 1.5, Z.b1[0]) && ok(PULL[1] + 1.4, Z.b2[0]) && ok(COUNT[1] + 0.4, Z.q1[0]) && ok(TIMER[1] + 0.6, Z.i1[0]), 'olaydan sonra etiket');

// ---------------------------------------------------------------- efektler (olaylara bağlı, yumuşak)
export const meta = {
  title: 'Elektrik yükü, akım ve gerilim',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: P_GLOW[0] + 0.2, kind: 'pop', gain: 0.13 },
    { t: E_GLOW[0] + 0.2, kind: 'pop', gain: 0.13 },
    { t: CNT[1] + 0.1, kind: 'pop', gain: 0.13 },
    ...HOP.map((h) => ({ t: h + 0.35, kind: 'pop', gain: 0.09 })),
    { t: PULL[1] - 0.2, kind: 'thud', gain: 0.16 },
    { t: CUTW + 0.1, kind: 'hum', d: CUTC - CUTW - 0.3, gain: 0.12 },
    { t: COUNT[1], kind: 'pop', gain: 0.14 },
    { t: TIMER[1], kind: 'pop', gain: 0.14 },
    { t: CUTC + 0.1, kind: 'hum', d: DUR - CUTC - 0.4, gain: 0.17 },
    { t: A.f1 + 0.6, kind: 'thud', gain: 0.14 },
  ],
};

// ---------------------------------------------------------------- yardımcılar
function signTex(ch, color) {
  return canvasTex(128, 128, (g) => {
    g.fillStyle = color; g.font = '900 118px "InterDisplay", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,0.45)'; g.strokeText(ch, 64, 70); g.fillText(ch, 64, 70);
  });
}
// İki satırlı LCD panel dokusu: set(satır1, satır2) — satırda "^" sonrası üs olarak küçük yazılır ("6,24 × 10^18")
function lcd2(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  let last = null;
  const line = (txt, y, size, color) => {
    const [base, ex] = txt.split('^');
    for (let k = 0; k < 2; k++) { g.font = `900 ${size}px "InterDisplay", sans-serif`; const b0 = g.measureText(base).width; g.font = `900 ${size * 0.55}px "InterDisplay", sans-serif`; const e0 = ex ? g.measureText(ex).width + 4 : 0; if (b0 + e0 > w - 60) size *= (w - 60) / (b0 + e0); }
    g.font = `900 ${size}px "InterDisplay", sans-serif`; const bw = g.measureText(base).width;
    g.font = `900 ${size * 0.55}px "InterDisplay", sans-serif`; const ew = ex ? g.measureText(ex).width : 0;
    const x0 = (w - bw - ew) / 2;
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 14; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.font = `900 ${size}px "InterDisplay", sans-serif`; g.fillText(base, x0, y);
    if (ex) { g.font = `900 ${size * 0.55}px "InterDisplay", sans-serif`; g.fillText(ex, x0 + bw + 4, y - size * 0.32); }
    g.shadowBlur = 0;
  };
  return { tex, set(a, b) {
    const key = a + '|' + b; if (key === last) return; last = key;
    g.fillStyle = '#0b1410'; g.fillRect(0, 0, w, h); g.strokeStyle = '#2c3a33'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
    line(a, h * 0.32, h * 0.27, '#3fe07a'); line(b, h * 0.72, h * 0.27, '#ffffff');
    tex.needsUpdate = true;
  } };
}
const sci = (n) => {                              // 6,24 × 10^18 biçimi
  if (n < 1000) return String(Math.floor(n));
  const e = Math.floor(Math.log10(n)); return `${fmt(n / Math.pow(10, e), 2)} × 10^${e}`;
};

// ---------------------------------------------------------------- yerleşim
const CZ = 0.0, ELEV = 58;
const AY = 0.95;                                  // atom merkezi yüksekliği
const X = 0.8, ZH = 1.1, Y = 0.2;                 // devre dikdörtgeni
const TL = 2.6, TR = 0.3, TY = 0.55;              // tel kesiti (x ekseni boyunca)
const ANC = new THREE.Vector3(0.75, 0.08, 0.15), SL = 1.45, BR = 0.42; // balon ipi bağlantısı, ip boyu, balon yarıçapı

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 21 });
  const sc = S.lights.key.shadow.camera; sc.left = -6; sc.right = 6; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const plusT = signTex('+', '#ffffff'), minusT = signTex('−', '#08240f'), zeroT = signTex('0', '#1b1d21');
  const cuPlusT = signTex('+', '#ffb37a');
  const elMatBase = () => new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x2fd060, emissiveIntensity: 0.6, roughness: 0.25, clearcoat: 1 });

  // ================================================= ATOM (lityum: 3 proton, 4 nötron, 3 elektron)
  const AG = new THREE.Group(); AG.position.set(0, AY, 0); scene.add(AG);
  const pMat = new THREE.MeshPhysicalMaterial({ color: 0xe9703f, roughness: 0.3, clearcoat: 0.8, emissive: 0xff7a3a, emissiveIntensity: 0 });
  const nMat = new THREE.MeshPhysicalMaterial({ color: 0x9aa0a8, roughness: 0.35, clearcoat: 0.6 });
  const NR = 0.13, ND = 0.24;
  const NUC = [[0, 0, 0, 'n'], [ND, 0, 0, 'p'], [-ND, 0, 0, 'n'], [0, ND, 0, 'p'], [0, -ND, 0, 'n'], [0, 0, ND, 'p'], [0, 0, -ND, 'n']];
  check(NUC.filter((n) => n[3] === 'p').length === NP && NUC.filter((n) => n[3] === 'n').length === 4, 'lityum-7: 3 p, 4 n');
  check(ND >= 2 * NR - 0.03, 'nükleonlar iç içe geçmez (hafif temas)');
  const nucG = new THREE.Group(); AG.add(nucG);
  const nucSp = [];
  for (const [x, y, z, k] of NUC) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(NR, 28, 20), k === 'p' ? pMat : nMat); m.position.set(x, y, z); m.castShadow = true; nucG.add(m);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: k === 'p' ? plusT : zeroT, transparent: true, depthTest: false, opacity: 0 }));
    sp.scale.setScalar(NR * 1.4); sp.renderOrder = 5; nucG.add(sp); nucSp.push({ sp, c: new THREE.Vector3(x, y, z), k });
  }
  const ORB = [{ R: 0.66, rot: [0.4, 0.0, 0.2], w: 1.6, ph: 0.4 }, { R: 0.95, rot: [1.2, 0.5, 0.0], w: 1.25, ph: 2.3 }, { R: 1.2, rot: [-0.75, -0.9, 0.1], w: 1.0, ph: 4.1 }];
  check(ORB.length === NE, '3 elektron');
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
  const aeMat = elMatBase();
  const aEl = ORB.map((o) => {
    const g = new THREE.Group(); g.rotation.set(...o.rot); AG.add(g);
    g.add(new THREE.Mesh(new THREE.TorusGeometry(o.R, 0.006, 8, 140), ringMat));
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 16), aeMat); m.castShadow = true; g.add(m);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: minusT, transparent: true, depthTest: false, opacity: 0 })); sp.scale.setScalar(0.12); sp.renderOrder = 6; g.add(sp);
    return { g, m, sp, o };
  });
  const aLight = new THREE.PointLight(0xffffff, 10, 7, 2); aLight.position.set(0.8, AY + 1.6, 1.8); AG.add(aLight);
  const wpos = new THREE.Vector3(), camDir = new THREE.Vector3();

  // ================================================= BALON + YÜN KUMAŞ
  const BG = new THREE.Group(); scene.add(BG);
  BG.add(platform(S, -0.85, 0.15, { r: 0.42 }));
  BG.add(platform(S, ANC.x, ANC.z, { r: 0.22 }));
  const knot = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.06, 16), S.M.steel); knot.position.copy(ANC).setY(0.11); BG.add(knot);
  const balloon = new THREE.Group(); BG.add(balloon);
  const bMat = new THREE.MeshPhysicalMaterial({ color: 0xc8438a, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.3 });
  const bBody = new THREE.Mesh(new THREE.SphereGeometry(BR, 48, 36), bMat); bBody.scale.set(1, 1.18, 1); bBody.castShadow = true; balloon.add(bBody);
  const bTie = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 16), bMat); bTie.position.y = -BR * 1.18 - 0.03; bTie.rotation.x = Math.PI; balloon.add(bTie);
  const strMat = new THREE.MeshBasicMaterial({ color: 0xdedede });
  const string = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 6), strMat); BG.add(string);
  // kumaş: yumuşak, dalgalı yün parçası (dik tutulur, sürterken yukarı-aşağı)
  const cloth = new THREE.Group(); BG.add(cloth);
  const cGeo = new RoundedBoxGeometry(0.1, 0.7, 0.55, 4, 0.04); { const p = cGeo.attributes.position; for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + 0.018 * Math.sin(p.getY(i) * 22) * Math.cos(p.getZ(i) * 17)); cGeo.computeVertexNormals(); }
  const cMat = new THREE.MeshPhysicalMaterial({ color: 0xd8c7a4, roughness: 0.95, sheen: 1, sheenColor: new THREE.Color(0xfff1d6), sheenRoughness: 0.6 });
  const cBody = new THREE.Mesh(cGeo, cMat); cBody.castShadow = cBody.receiveShadow = true; cloth.add(cBody);
  // balondaki elektronlar (yeşil) ve kumaştaki + işaretleri: eşit sayıda (yük korunur)
  const hopMat = elMatBase();
  const bEl = Array.from({ length: NB }, (_, k) => {
    const a = (k - (NB - 1) / 2) * 0.32, b = ((k % 2) - 0.5) * 0.5;
    const local = new THREE.Vector3(-Math.cos(a) * Math.cos(b), Math.sin(a) * 1.18, Math.cos(a) * Math.sin(b)).multiplyScalar(BR + 0.035);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 18, 12), hopMat); m.visible = false; BG.add(m);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: minusT, transparent: true, depthTest: false })); sp.scale.setScalar(0.075); sp.renderOrder = 6; BG.add(sp); sp.visible = false;
    return { local, m, sp };
  });
  const cPlus = Array.from({ length: NB }, (_, k) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: cuPlusT, transparent: true, depthTest: false, opacity: 0 }));
    sp.scale.setScalar(0.12); sp.renderOrder = 6; sp.position.set(0.07, -0.25 + (k % 3) * 0.25, k < 3 ? -0.12 : 0.12); cloth.add(sp); return sp;
  });
  const pullMat = new THREE.MeshBasicMaterial({ color: 0xffe28a, transparent: true, opacity: 0, depthWrite: false });
  const pullLines = [-0.18, 0, 0.18].map((dy) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 6), pullMat); m.userData.dy = dy; BG.add(m); return m; });
  const balloonAt = (t) => {                                     // ipin eğim açısı: dinlenme 0,08; çekimle 0,42 rad (kumaşa doğru)
    const phi = 0.08 + 0.34 * easeInOut(seg(t, ...PULL)) + 0.025 * Math.sin(t * 1.3);
    return new THREE.Vector3(ANC.x - SL * Math.sin(phi), ANC.y + SL * Math.cos(phi), ANC.z);
  };
  const clothAt = (t, bc) => {                                   // sürterken balonun sol yüzüne değer; sonra sola, platforma çekilir
    const rub = seg(t, RUB[0] - 0.3, RUB[0]) * (1 - seg(t, ...AWAY));
    const contactX = bc.x - BR - 0.06, homeX = -0.85;
    const x = lerp(homeX, contactX, easeInOut(rub));
    const wig = (t > RUB[0] && t < RUB[1]) ? 0.16 * Math.sin((t - RUB[0]) * 2 * Math.PI * 1.25) : 0;
    return new THREE.Vector3(x, lerp(0.45, bc.y, easeInOut(rub)) + wig, ANC.z);
  };
  { const b0 = balloonAt(0); check(b0.x - BR > -0.85 + 0.05 + 0.1, 'balon kumaşla iç içe değil (dinlenme)');
    const b1 = balloonAt(99); check(b1.x - BR - (-0.85 + 0.05) > 0.05, 'çekimde de balon kumaşa değmez'); }

  // ================================================= BAKIR TEL İÇİ (iyonlar + serbest elektronlar, sayaç halkası, LCD)
  const WG = new THREE.Group(); WG.position.set(0, TY, 0.1); scene.add(WG);
  const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0xc8744a, metalness: 0.6, roughness: 0.25, transparent: true, opacity: 0.32, depthWrite: false, clearcoat: 1 });
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(TR, TR, TL, 48, 1, true), tubeMat); tube.rotation.z = Math.PI / 2; tube.renderOrder = 2; WG.add(tube);
  for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(TR, 0.014, 10, 48), S.M.copper); r.rotation.y = Math.PI / 2; r.position.x = s * TL / 2; WG.add(r); }
  const ionMat = new THREE.MeshPhysicalMaterial({ color: 0xa65a38, metalness: 1, roughness: 0.35 });
  const NIC = 9, ions = new THREE.InstancedMesh(new THREE.SphereGeometry(0.055, 16, 12), ionMat, NIC * 4);
  { const m4 = new THREE.Matrix4(); let k = 0; for (let c = 0; c < NIC; c++) for (const [y, z] of [[0.11, 0.11], [-0.11, 0.11], [0.11, -0.11], [-0.11, -0.11]]) { m4.makeTranslation(-TL / 2 + (TL / NIC) * (c + 0.5), y, z); ions.setMatrixAt(k++, m4); } }
  WG.add(ions);
  const LANES = [[0, 0], [0.2, 0], [-0.2, 0], [0, 0.2], [0, -0.2]];
  check(Math.hypot(0.2 - 0.11, 0.11) > 0.055 + 0.035 + 0.02, 'elektron şeritleri iyonlara değmez');
  const FE = 30, feMat = elMatBase(); feMat.emissiveIntensity = 0.9;
  const fe = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 16, 12), feMat, FE); WG.add(fe);
  const RF = S.rng(17);
  const FEP = Array.from({ length: FE }, (_, k) => ({ lane: k % 5, x0: (k / FE) * TL, p: [RF() * 6.28, RF() * 6.28, RF() * 6.28], w: [3 + RF() * 2, 3.5 + RF() * 2, 2.5 + RF() * 2] }));
  const gateMat = new THREE.MeshPhysicalMaterial({ color: 0x3fe07a, emissive: 0x3fe07a, emissiveIntensity: 1.0, transparent: true, opacity: 0.9 });
  const gate = new THREE.Mesh(new THREE.TorusGeometry(TR + 0.03, 0.02, 12, 60), gateMat); gate.rotation.y = Math.PI / 2; WG.add(gate);
  const panel = lcd2(640, 280);
  const pMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.66), new THREE.MeshBasicMaterial({ map: panel.tex }));
  pMesh.position.set(0, 0.62, -0.75); pMesh.rotation.x = -(ELEV - 10) * Math.PI / 180; WG.add(pMesh);
  const pFrame = new THREE.Mesh(new RoundedBoxGeometry(1.58, 0.74, 0.05, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x2b2f36, roughness: 0.45 }));
  pFrame.position.copy(pMesh.position); pFrame.rotation.copy(pMesh.rotation); pFrame.translateZ(-0.03); WG.add(pFrame);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 10), S.M.steel); stem.position.set(0, 0.05 - TY + 0.25, -0.75); WG.add(stem);
  const wArrMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.9, roughness: 0.35, transparent: true, opacity: 0 });
  const wArr = new THREE.Group();
  { const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 16), wArrMat); sh.rotation.z = Math.PI / 2; wArr.add(sh);
    const hd = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), wArrMat); hd.rotation.z = Math.PI / 2; hd.position.x = -0.55; wArr.add(hd); }
  wArr.position.set(0.7, 0, 0.55); WG.add(wArr);                           // akım oku −x yönünde (elektronlar +x yönünde)

  // ================================================= DEVRE: 9 V pil + ampul; elektronlar pilde enerji alır (sarı), ampulde bırakır
  const CG = new THREE.Group(); CG.position.z = -0.4; scene.add(CG);
  const loop = roundedLoop([[X, 0], [X, -ZH], [-X, -ZH], [-X, ZH], [X, ZH]]);
  const Wc = closedWire(S, loop, { y: Y }); scene.remove(Wc.mesh); CG.add(Wc.mesh);
  const bat = battery(S, { len: 0.9 }); scene.remove(bat.group); bat.group.position.set(0, 0, ZH); CG.add(bat.group);
  const bulb = makeBulb(S, { scale: 1.2 }); scene.remove(bulb.group); bulb.group.position.set(0, 0, -ZH); CG.add(bulb.group);
  const batLight = new THREE.PointLight(0xffd23f, 0, 2.4, 2); batLight.position.set(0, 0.8, ZH); CG.add(batLight);
  const N = 40;
  const ceMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.35, roughness: 0.25, clearcoat: 1 });
  const ce = new THREE.InstancedMesh(new THREE.SphereGeometry(0.048, 16, 12), ceMat, N);
  ce.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(N * 3), 3); CG.add(ce);
  const cLow = new THREE.Color(0x2fbf63), cHigh = new THREE.Color(0xfff07a), col = new THREE.Color();
  // enerji düzeyi (elektron dış devrede − → +): pilin içinde + → − giderken 0 → 1; ampulde 1 → 0
  const energy = (x, z) => {
    if (z > ZH - 0.05) { if (x > 0.45) return 0; if (x < -0.45) return 1; return (0.45 - x) / 0.9; }
    if (z < -ZH + 0.05) { if (x < -0.22) return 1; if (x > 0.22) return 0; return (0.22 - x) / 0.44; }
    return x < 0 ? 1 : 0;
  };
  check(energy(-X, 0) === 1 && energy(X, 0) === 0, 'enerji: pilden ampule giden yol yüksek, dönüş düşük');
  const RC = S.rng(5);
  const PH = Array.from({ length: N }, () => [RC() * 6.28, 5 + RC() * 4]);
  const cArrMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, roughness: 0.35, transparent: true, opacity: 0 });
  const cArr = new THREE.Group();
  { const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.8, 16), cArrMat); sh.rotation.z = Math.PI / 2; cArr.add(sh);
    const hd = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 20), cArrMat); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.5; cArr.add(hd); }
  cArr.position.set(X - 0.36, 0.25, 0.1); cArr.rotation.y = Math.PI / 2; CG.add(cArr);   // sağ kenar içinde −z yönüne: + ucundan (sağ) ampule (+ → −)
  check(new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).z < -0.99, 'akım oku sağ kenarda + uçtan uzaklaşır');
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();

  // ================================================= kamera: kadraj sabit, yerinde çok yavaş yaşar
  const cam = camRig(S, [
    [0, -0.08, 11.4, ELEV, 0, CZ, 0.6], [A.b1, 0.06, 11.2, ELEV, 0, CZ, 0.6], [A.q1, -0.05, 11.3, ELEV, 0, CZ, 0.6],
    [A.v1, 0.05, 11.2, ELEV, 0, CZ, 0.6], [A.f1, -0.05, 11.3, ELEV, 0, CZ, 0.6], [DUR, 0.06, 11.0, ELEV, 0, CZ, 0.6],
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 16, y2: 23 });
  let dS = 0, dT = 0;                                   // devre elektronlarının aldığı yol (sabit hız)
  return (t) => {
    cam(t);
    const sec = t < CUTB ? 0 : t < CUTW ? 1 : t < CUTC ? 2 : 3;
    AG.visible = sec === 0; BG.visible = sec === 1; WG.visible = sec === 2; CG.visible = sec === 3;
    S.camera.getWorldDirection(camDir).negate();

    // ---------------- atom
    if (sec === 0) {
      nucG.rotation.y = 0.35 * t; nucG.rotation.x = 0.15 * Math.sin(t * 0.4);
      AG.position.y = AY + 0.04 * Math.sin(t * 0.9);
      const pg = easeOut(seg(t, ...P_GLOW)), eg = easeOut(seg(t, ...E_GLOW));
      pMat.emissiveIntensity = 0.55 * pg * (1 + 0.15 * Math.sin(t * 4)); aeMat.emissiveIntensity = 0.6 + 0.7 * eg;
      const dLoc = camDir.clone().applyQuaternion(nucG.quaternion.clone().invert());
      for (const n of nucSp) {                       // işaretler küreyle birlikte döner, kameraya bakan yüzde
        n.sp.material.opacity = n.k === 'p' ? pg : easeOut(seg(t, E_GLOW[1], E_GLOW[1] + 0.5));
        n.sp.position.copy(n.c).addScaledVector(dLoc, NR + 0.01);
      }
      for (const e of aEl) {
        const a = e.o.w * t + e.o.ph; e.m.position.set(e.o.R * Math.cos(a), e.o.R * Math.sin(a), 0);
        e.sp.material.opacity = eg; e.sp.position.copy(e.m.position).add(camDir.clone().applyQuaternion(e.g.quaternion.clone().invert()).multiplyScalar(0.09));
      }
      label('ap', cu('proton'), 0.55, AY + 0.15, 0.55, { opacity: fade(t, P_GLOW[0] + 0.3, Z.a1[1], 0.35), size: 4.4 });
      label('ae', gr('elektron'), -1.05, AY + 1.25, 0, { opacity: fade(t, E_GLOW[0] + 0.3, Z.a1[1], 0.35), size: 4.4 });
      label('an', 'nötron', -0.6, AY - 0.55, 0.5, { opacity: fade(t, E_GLOW[1] + 0.3, Z.a1[1], 0.35), size: 4.0 });
      S.text('c1', `${cu('+3')} proton`, { x: 30, y: 30, size: 4.6, weight: 800, opacity: fade(t, CNT[0], Z.a2[1], 0.35), nowrap: true });
      S.text('c2', `${gr('−3')} elektron`, { x: 70, y: 30, size: 4.6, weight: 800, opacity: fade(t, CNT[0] + 0.4, Z.a2[1], 0.35), nowrap: true });
      S.text('c3', 'toplam yük: 0', { x: 50, y: 35.5, size: 4.8, weight: 800, opacity: fade(t, CNT[1], Z.a2[1], 0.35), nowrap: true });
    } else { for (const id of ['ap', 'ae', 'an', 'c1', 'c2', 'c3']) S.text(id, '', { opacity: 0 }); }

    // ---------------- balon ve kumaş
    if (sec === 1) {
      const bc = balloonAt(t); balloon.position.copy(bc); balloon.rotation.z = -(bc.x - ANC.x) / SL * 0.6;
      const top = new THREE.Vector3(bc.x, bc.y - BR * 1.18 - 0.07, bc.z), mid = top.clone().add(ANC).multiplyScalar(0.5);
      string.position.copy(mid); string.scale.y = top.distanceTo(ANC); string.lookAt(top); string.rotateX(Math.PI / 2);
      const cc = clothAt(t, bc); cloth.position.copy(cc); cloth.rotation.z = 0.04 * Math.sin(t * 1.7);
      bEl.forEach((e, k) => {
        const hop = seg(t, HOP[k], HOP[k] + 0.45);
        const dst = e.local.clone().applyEuler(balloon.rotation).add(bc);
        const src = cloth.position.clone().add(new THREE.Vector3(0.06, e.local.y * 0.6, e.local.z));
        const p = src.lerp(dst, easeInOut(hop)); p.y += Math.sin(hop * Math.PI) * 0.12;
        e.m.visible = t >= HOP[k]; e.m.position.copy(p);
        e.sp.visible = e.m.visible; e.sp.position.copy(p).addScaledVector(camDir, 0.055);
        cPlus[k].material.opacity = easeOut(seg(t, HOP[k] + 0.2, HOP[k] + 0.5));
      });
      pullMat.opacity = 0.55 * fade(t, PULL[0], Z.b2[1], 0.4) * (0.75 + 0.25 * Math.sin(t * 6));
      for (const m of pullLines) {
        const a = cloth.position.clone().add(new THREE.Vector3(0.07, m.userData.dy, 0)), b = bc.clone().add(new THREE.Vector3(-BR - 0.02, m.userData.dy * 1.2, 0));
        m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.y = Math.max(0.01, a.distanceTo(b) - 0.04); m.lookAt(b); m.rotateX(Math.PI / 2);
      }
      label('lb', 'balon', bc.x + 0.1, bc.y + BR * 1.18 + 0.2, bc.z, { opacity: fade(t, CUTB + 0.3, Z.b1[1], 0.3), size: 4.4 });
      label('lk', 'yün kumaş', cc.x - 0.05, cc.y + 0.55, cc.z, { opacity: fade(t, CUTB + 0.5, Z.b1[1], 0.3), size: 4.4 });
    } else { for (const id of ['lb', 'lk']) S.text(id, '', { opacity: 0 }); }

    // ---------------- tel içi: kulon sayacı ve akım
    if (sec === 2) {
      const drift = 0.45 * (t - CUTW);
      for (let k = 0; k < FE; k++) {
        const f = FEP[k], [ly, lz] = LANES[f.lane];
        const x = ((f.x0 + drift) % TL + TL) % TL - TL / 2;
        pv.set(x + 0.04 * Math.sin(t * f.w[0] + f.p[0]), ly + 0.022 * Math.sin(t * f.w[1] + f.p[1]), lz + 0.022 * Math.sin(t * f.w[2] + f.p[2]));
        const edge = clamp((TL / 2 - Math.abs(x)) / 0.12);
        sv.setScalar(Math.max(0.001, edge)); m4.compose(pv, qq, sv); fe.setMatrixAt(k, m4);
      }
      fe.instanceMatrix.needsUpdate = true;
      gateMat.emissiveIntensity = 0.8 + 0.5 * Math.sin(t * 9) * (t > COUNT[0] ? 1 : 0.3);
      if (t < A.i1) { const n = nAt(t); panel.set(`elektron: ${sci(n)}`, `Q = ${fmt(n * E, 2)} C`); }
      else { const tt = tAt(t); panel.set(`t = ${fmt(tt, 1)} s`, `Q = ${fmt(tt * 1, 1)} C`); }
      const ao = easeOut(seg(t, A.i1 + 0.2, A.i1 + 0.8)); wArrMat.opacity = ao; wArr.visible = ao > 0.01;
      label('we', gr('elektronlar'), -0.75, TY + 0.48, 0.1, { opacity: fade(t, CUTW + 0.4, Z.i1[1], 0.35), size: 4.2 });
      label('wa', rd('akım yönü'), 0.7, TY + 0.1, 0.95, { opacity: fade(t, A.i1 + 0.7, Z.i1[1], 0.35), size: 4.2 });
      label('wc', 'sayaç', 0.0, TY + 0.48, 0.1, { opacity: fade(t, CUTW + 0.6, Z.q1[1], 0.35), size: 4.0 });
    } else { for (const id of ['we', 'wa', 'wc']) S.text(id, '', { opacity: 0 }); }

    // ---------------- devre: pil enerji verir, ampul harcar
    if (sec === 3) {
      if (t < dT) { dS = 0; dT = 0; }
      const tc = t - CUTC; dS = 0.75 * Math.max(0, tc); dT = t;
      bulb.set(0.95 * easeOut(seg(tc, 0, 0.6)) * (1 + 0.025 * Math.sin(t * 13)));
      bat.glow && (bat.glow.emissiveIntensity = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(t * 3)));
      batLight.intensity = 2.5 + 1.0 * Math.sin(t * 3);
      for (let k = 0; k < N; k++) {
        const u = ((((k / N) - dS / Wc.L + 0.02 * Math.sin(t * PH[k][1] + PH[k][0]) / Wc.L) % 1) + 1) % 1;
        Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
        const hidden = Math.abs(pv.x) < 0.47 && pv.z > ZH - 0.2;
        const e = energy(pv.x, pv.z); col.copy(cLow).lerp(cHigh, e); ce.setColorAt(k, col);
        sv.setScalar(hidden ? 0.0001 : 0.85 + 0.35 * e); m4.compose(pv, qq, sv); ce.setMatrixAt(k, m4);
      }
      ce.instanceMatrix.needsUpdate = true; ce.instanceColor.needsUpdate = true;
      const ao = easeOut(seg(t, CUTC + 0.4, CUTC + 1.0)); cArrMat.opacity = ao; cArr.visible = ao > 0.01;
      label('ce1', hl('enerji alır'), -0.95, 0.55, ZH - 0.45, { opacity: fade(t, CUTC + 1.2, Z.f1[0], 0.35), size: 4.2 });
      label('ce2', 'enerji verir', 0.75, 0.75, -ZH - 0.4, { opacity: fade(t, CUTC + 2.4, Z.f1[0], 0.35), size: 4.2 });
      label('ce3', gr('elektronlar'), -X - 0.05, 0.4, -0.5, { opacity: fade(t, CUTC + 0.6, Z.v1[1], 0.35), size: 4.0 });
      label('ce4', rd('akım yönü'), X - 0.2, 0.45, -0.85, { opacity: fade(t, CUTC + 0.9, Z.v1[1], 0.35), size: 4.0 });
    } else { for (const id of ['ce1', 'ce2', 'ce3', 'ce4']) S.text(id, '', { opacity: 0 }); }

    yaz(t);
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', 'Proton, elektron, kulon', { y: 28.6, size: 4.4, weight: 600, opacity: subO, nowrap: true });
    S.text('tag', 'DERS 1', { x: 13, y: 12.4, size: 3.0, weight: 800, color: '#9fb4c8', opacity: subO, nowrap: true, maxWidth: 30 });
  };
}
