// S1 — Sayısal sinyal "0 ve 1" değil, iki gerilim ARALIĞIDIR. Sayısal Elektronik serisi, Ders 1 (Analog ve Sayısal Kavramlar).
// Kaynak: Floyd, Digital Fundamentals 11e, Bölüm 1–2 (PDF s. 20–21: pozitif lojik, lojik seviyeler, CMOS örneği 2–3,3 V / 0–0,8 V,
// 0,8–2 V kabul edilemez; s. 18: gürültü sayısal veriyi analog kadar etkilemez).
// Sahne: ayarlı güç kaynağı (sol, + ucu +x) → sinyal teli → PCB üzerindeki CMOS kapı girişi; çıkışta yeşil LED ve "okunan bit"
// göstergesi. Arkada eğik panel: solda gerilim ölçeği (LOW / kabul edilemez / HIGH bantları), sağda giriş gerilimi v(t) izi.
// Akım taşıyan bir devre gösterilmez (CMOS girişi pratikte akım çekmez); bu yüzden elektron/akım oku yok.

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade } from '../../tools/lib/stage.js';
import { hl, gr, fmt, check, penTimeline, narrationPen, penSec, wordsOf } from '../../tools/lib/anlatim.js';
import { projLabel, camRig, canvasTex } from '../../tools/lib/parcalar.js';
import { lcd, psu } from '../../tools/lib/olcum.js';

const C1 = '#5fe08a', C0 = '#7fd8ff', CX = '#ffb347';       // 1 (HIGH) yeşil, 0 (LOW) camgöbeği, kabul edilemez turuncu
const b1 = (x) => `<span style="color:${C1}">${x}</span>`;
const b0 = (x) => `<span style="color:${C0}">${x}</span>`;
const bx = (x) => `<span style="color:${CX}">${x}</span>`;
const VIL = 0.8, VIH = 2.0, VMAX = 3.3;                     // Floyd s. 21, CMOS örneği
const bitOf = (v) => (v >= VIH ? '1' : v <= VIL ? '0' : '?');
// gösterge: kabul edilemez bölgede f1 sırasında düzensiz 1/0 (Floyd s. 21: 'can appear as either a HIGH or a LOW'); kısa geçişlerde önceki bit kalır
const wob = (t) => Math.sin(2 * Math.PI * 0.9 * t + 0.4) + 0.8 * Math.sin(2 * Math.PI * 1.7 * t + 2.1) + 0.5 * Math.sin(2 * Math.PI * 3.1 * t);
check(bitOf(2.5) === '1' && bitOf(0.5) === '0' && bitOf(1.4) === '?', 'Floyd örneği: 2,5 V → 1, 0,5 V → 0, 0,8–2 V arası kabul edilemez');

// ---------------------------------------------------------------- anlatım
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `Sayısal sinyalde ${b1('1')}`, l2: `<b style="font-weight:900">tam olarak kaç volt?</b>`, s1: 6.6, s2: 6.6 },
  { id: 'r1', pre: 2.7, l1: `${b1('1')} tek bir gerilim değildir`, l2: `${hl('2 V')} ile ${hl('3,3 V')} arasında bir aralıktır`, s1: 6.0, s2: 5.6 },
  { id: 'r2', pre: 2.9, l1: `${b0('0')} da bir aralıktır`, l2: `${hl('0 V')} ile ${hl('0,8 V')} arası`, s1: 6.0, s2: 5.6 },
  { id: 'n1', pre: 3.6, l1: `Gürültü aralığın içinde kalırsa`, l2: `okunan bit değişmez`, s1: 6.0, s2: 5.6 },
  { id: 'f1', pre: 2.7, l1: `${hl('0,8 V')} ile ${hl('2 V')} arası ${bx('kabul edilemez')}`, l2: `Devre bunu ${b1('1')} de ${b0('0')} da okuyabilir`, s1: 5.8, s2: 5.4 },
];
const { Z, A, W: WR } = penTimeline(BEATS, { k: 1.0 });

const KART = [
  { id: 'kh', html: `<span style="color:#7fe3ff">Bilmen gerekenler</span>`, y: 12.6, size: 4.6, weight: 900 },
  { id: 'k1', html: `• Örnekte ${b1('1')}, ${hl('2 V')} ile ${hl('3,3 V')} arasıdır`, y: 16.7 },
  { id: 'k2', html: `• Örnekte ${b0('0')}, ${hl('0 V')} ile ${hl('0,8 V')} arasıdır`, y: 20.2 },
  { id: 'k3', html: `• ${hl('0,8 V')} ile ${hl('2 V')} arası ${bx('kabul edilemez')}`, y: 23.7 },
];
{ let t = Z.f1[1] + 0.1; for (const k of KART) { k.t0 = t; k.t1 = t + penSec(k.html); t = k.t1 + 0.06; } }
const KEND = KART[KART.length - 1].t1;
const DUR = Math.ceil((KEND + Math.max(4.0, ...KART.map((k) => 1.2 + 0.35 * wordsOf({ l1: k.html }) - (KEND - k.t1)))) * 30) / 30;
for (const k of KART) check(DUR - k.t1 >= 1.2 + 0.35 * wordsOf({ l1: k.html }) - 1e-9, `kart ${k.id}: okuma süresi`);
check(DUR - KEND >= 4.0, 'kart en az 4 sn okunur kalır (2f-2)');
check(DUR <= 60, `süre ≤ 60 sn (${DUR})`);
export const _T = { Z, A, W: WR, KART, DUR };

// ---------------------------------------------------------------- giriş gerilimi v(t)
// anahtar kareler [t, V]; aralarda easeInOut. Gürültü yalnızca n1'de (genlik nA).
const K = [
  [0, 3.3], [1.3, 3.3], [2.9, 2.5],                                   // kanca: 3,3 V → 2,5 V, bit yine 1 (cevabın ilk görüntüsü < 8 sn)
  [A.r1 + 0.15, 2.5], [A.r1 + 0.9, 3.1], [A.r1 + 1.6, 2.2],            // r1: HIGH bandı içinde gezer
  [A.r2 + 0.1, 2.2], [A.r2 + 1.4, 0.5], [A.r2 + 2.4, 0.2],            // r2: LOW bandına iner
  [A.n1 + 0.1, 0.2], [A.n1 + 0.6, 0.4], [A.n1 + 2.2, 0.4], [A.n1 + 2.9, 2.9],   // n1: gürültülü LOW → gürültülü HIGH
  [A.f1 + 0.1, 2.9], [A.f1 + 1.6, 1.4],                               // f1: kabul edilemez bölgeye
];
const NOISE = [A.n1 + 0.2, Z.n1[1] - 0.3], NA = 0.25;
const nA = (t) => NA * fade(t, NOISE[0], NOISE[1], 0.5);
const nz = (t) => 0.55 * Math.sin(2 * Math.PI * 7.3 * t + 1) + 0.3 * Math.sin(2 * Math.PI * 13.1 * t + 2) + 0.15 * Math.sin(2 * Math.PI * 23.7 * t);
const Vbase = (t) => {
  if (t <= K[0][0]) return K[0][1];
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) return K[i - 1][1] + (K[i][1] - K[i - 1][1]) * easeInOut(seg(t, K[i - 1][0], K[i][0]));
  return K[K.length - 1][1];
};
const Vof = (t) => Vbase(t) + nA(t) * nz(t);
for (let i = 1; i < K.length; i++) check(K[i][0] > K[i - 1][0], `anahtar kare sırası ${i}`);
check(K[1][0] > 0 && K[2][0] < 8, 'cevabın ilk görüntüsü (2,5 V → 1) 8. saniyeden önce');
check(K[5][0] + 1.0 <= Z.r1[0], 'r1: olaydan sonra yazı');
check(K[8][0] + 0.3 <= Z.r2[0], 'r2: olaydan sonra yazı');
check(K[14][0] + 1.0 <= Z.f1[0], 'f1: olaydan sonra yazı');
// gürültü sırasında bit değişmez: her 1/240 sn'de bant kontrolü
{ let ok = true, mn = 9, mx = -9; for (let t = NOISE[0]; t <= K[11][0]; t += 1 / 240) { const v = Vof(t); mn = Math.min(mn, v); mx = Math.max(mx, v); if (bitOf(v) !== '0') ok = false; }
  check(ok && mn >= 0 && mx <= VIL, `gürültülü LOW 0–0,8 V içinde (${fmt(mn, 2)}–${fmt(mx, 2)} V)`); }
{ let ok = true, mx = -9, mn = 9; for (let t = K[12][0]; t <= A.f1 + 0.1; t += 1 / 240) { const v = Vof(t); mn = Math.min(mn, v); mx = Math.max(mx, v); if (bitOf(v) !== '1') ok = false; }
  check(ok && mx <= VMAX && mn >= VIH, `gürültülü HIGH 2–3,3 V içinde (${fmt(mn, 2)}–${fmt(mx, 2)} V)`); }
{ let mx = 0; for (let t = 0; t < 60; t += 0.01) mx = Math.max(mx, Math.abs(nz(t))); check(mx <= 1.0, 'gürültü şekli |nz| ≤ 1'); }
check(bitOf(Vof(Z.f1[0])) === '?' && Math.abs(Vof(Z.f1[0]) - 1.4) < 1e-9, 'f1: 1,4 V kabul edilemez');
check(bitOf(Vof(Z.r1[0])) === '1' && bitOf(Vof(Z.r2[0])) === '0', 'r1 = 1, r2 = 0');
for (let t = 0; t < DUR; t += 0.01) { const v = Vof(t); if (v < 0 || v > VMAX + 1e-9) { check(false, `V eksen dışı t=${t}`); break; } }

{ let n = 0, p = null; for (let t = A.f1 + 1.0; t < Z.f1[1]; t += 1 / 30) { const q = wob(t) > 0.2; if (p !== null && q !== p) n++; p = q; } check(n >= 4, `f1: gösterge 1 ile 0 arasında düzensiz gidip gelir (${n} değişim)`); }
const BANDS = [[A.r1 + 0.0, Z.r1[1]], [A.r2 + 1.3, Z.r2[1]], [A.f1 + 1.0, Z.f1[1]]];   // HIGH, LOW, kabul edilemez vurgusu

export const meta = {
  title: 'Sayısal sinyal: iki gerilim aralığı (Floyd Bölüm 1)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 1.35, kind: 'click', gain: 0.1 },
    { t: A.r1 + 0.25, kind: 'click', gain: 0.09 },
    { t: A.r2 + 0.15, kind: 'click', gain: 0.09 },
    { t: A.r2 + 1.3, kind: 'pop', gain: 0.11 },                       // bit 1 → ? → 0
    { t: A.n1 + 2.7, kind: 'pop', gain: 0.11 },                       // gürültülü LOW → HIGH
    { t: A.f1 + 0.15, kind: 'click', gain: 0.09 },
    { t: A.f1 + 1.0, kind: 'thud', gain: 0.11 },                      // kabul edilemez bölge
    { t: KART[0].t0, kind: 'thud', gain: 0.09 },
  ],
};

// ---------------------------------------------------------------- panel (gerilim ölçeği + v(t) izi), bölüm 2e
const GEO = { Wc: 1400, Hc: 830, top: 110, oy: 760, bx0: 210, bx1: 300, nx: 330, tx0: 610, tx1: 1350, WIN: 5, YMAX: 3.5 };
const gy = (v) => GEO.oy - (v * (GEO.oy - GEO.top)) / GEO.YMAX;
check(gy(VMAX) > GEO.top && gy(0) === GEO.oy, '3,3 V eksen içinde (eksen 0–3,5 V)');
const INK = '#cfe3ea', YEL = '#ffd23f';
function panel() {
  const { Wc, Hc, top, oy, bx0, bx1, nx, tx0, tx1, WIN } = GEO;
  const c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
  const k = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const draw = (t, g) => {       // g: [HIGH, LOW, X] vurgu 0..1
    k.clearRect(0, 0, Wc, Hc);
    k.fillStyle = 'rgba(8,14,16,0.78)'; k.beginPath(); k.roundRect(8, 8, Wc - 16, Hc - 16, 28); k.fill();
    k.strokeStyle = 'rgba(120,190,210,0.25)'; k.lineWidth = 3; k.stroke();
    const band = (v0, v1, col, a, x0, x1) => { k.fillStyle = rgba(col, a); k.fillRect(x0, gy(v1), x1 - x0, gy(v0) - gy(v1)); };
    // bantlar: ölçek çubuğunda dolu, iz alanında soluk
    const aH = 0.35 + 0.5 * g[0], aL = 0.35 + 0.5 * g[1], aX = 0.22 + 0.5 * g[2];
    band(VIH, VMAX, C1, aH, bx0, bx1); band(0, VIL, C0, aL, bx0, bx1); band(VIL, VIH, CX, aX, bx0, bx1);
    band(VIH, VMAX, C1, 0.08 + 0.12 * g[0], tx0, tx1); band(0, VIL, C0, 0.08 + 0.12 * g[1], tx0, tx1); band(VIL, VIH, CX, 0.05 + 0.12 * g[2], tx0, tx1);
    // kabul edilemez bölgede çapraz tarama
    k.save(); k.beginPath(); k.rect(bx0, gy(VIH), bx1 - bx0, gy(VIL) - gy(VIH)); k.clip();
    k.strokeStyle = rgba(CX, 0.5 + 0.4 * g[2]); k.lineWidth = 4;
    for (let x = bx0 - 300; x < bx1 + 300; x += 26) { k.beginPath(); k.moveTo(x, gy(VIL)); k.lineTo(x + 200, gy(VIH)); k.stroke(); }
    k.restore();
    // sınır çizgileri (kesikli) ve değerler
    k.setLineDash([14, 12]); k.lineWidth = 3;
    for (const v of [VIL, VIH, VMAX]) { k.strokeStyle = 'rgba(207,227,234,0.45)'; k.beginPath(); k.moveTo(bx1, gy(v)); k.lineTo(tx1, gy(v)); k.stroke(); }
    k.setLineDash([]);
    k.strokeStyle = INK; k.lineWidth = 5; k.beginPath(); k.moveTo(bx0, top - 20); k.lineTo(bx0, oy); k.lineTo(tx1 + 10, oy); k.stroke();
    k.fillStyle = INK; k.font = '800 44px "InterDisplay", sans-serif'; k.textAlign = 'right'; k.textBaseline = 'middle';
    for (const [v, s] of [[0, '0'], [VIL, '0,8'], [VIH, '2'], [VMAX, '3,3']]) k.fillText(s, bx0 - 16, gy(v));
    k.fillStyle = YEL; k.textAlign = 'left'; k.textBaseline = 'bottom'; k.font = '800 46px "InterDisplay", sans-serif'; k.fillText('V', bx0 - 60, top - 30);
    // bant adları (iz alanının solunda, izle çakışmaz)
    k.textBaseline = 'middle'; k.textAlign = 'left'; k.font = '900 46px "InterDisplay", sans-serif';
    k.fillStyle = C1; k.fillText('HIGH (1)', nx, (gy(VIH) + gy(VMAX)) / 2);
    k.fillStyle = C0; k.fillText('LOW (0)', nx, (gy(0) + gy(VIL)) / 2);
    k.fillStyle = CX; k.font = '900 38px "InterDisplay", sans-serif'; k.fillText('kabul', nx, (gy(VIL) + gy(VIH)) / 2 - 22); k.fillText('edilemez', nx, (gy(VIL) + gy(VIH)) / 2 + 22);
    k.fillStyle = YEL; k.font = '900 46px "InterDisplay", sans-serif'; k.textAlign = 'right'; k.textBaseline = 'bottom'; k.fillText('giriş gerilimi', tx1, top - 30);
    k.fillStyle = INK; k.font = '700 38px "InterDisplay", sans-serif'; k.textBaseline = 'top'; k.fillText('zaman', tx1, oy + 12);
    // v(t) izi: son WIN saniye; sağ uç = şimdi
    k.save(); k.beginPath(); k.rect(tx0, top - 10, tx1 - tx0 + 4, oy - top + 12); k.clip();
    k.strokeStyle = YEL; k.lineWidth = 7; k.lineJoin = 'round'; k.shadowColor = YEL; k.shadowBlur = 12; k.beginPath();
    const N = 600;
    for (let i = 0; i <= N; i++) { const tau = WIN * (1 - i / N); const x = tx0 + ((tx1 - tx0) * i) / N; const y = gy(Vof(Math.max(0, t - tau))); i ? k.lineTo(x, y) : k.moveTo(x, y); }
    k.stroke(); k.restore();
    const v = Vof(t);
    k.fillStyle = '#ffffff'; k.beginPath(); k.arc(tx1, gy(v), 13, 0, 7); k.fill();
    // ölçek çubuğunda işaretçi
    k.fillStyle = '#ffffff'; k.beginPath(); k.moveTo(bx1 + 4, gy(v)); k.lineTo(bx1 + 30, gy(v) - 16); k.lineTo(bx1 + 30, gy(v) + 16); k.closePath(); k.fill();
    tex.needsUpdate = true;
  };
  return { mat, draw };
}

// ---------------------------------------------------------------- yerleşim
const PX = -0.85, PZ = 0.15, BX = 0.58, BZ = 0.15, Y = 0.2;
const GW = 2.2, GZ = -1.35, GYc = 1.02, GRX = -0.35;

function tube(S, pts, parent, r = 0.03) {
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), 240, r, 10), S.M.copper);
  m.castShadow = true; parent.add(m); return m;
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 11 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG); CG.userData.main = true;

  const P = psu(S, { y: Y }); P.group.position.set(PX, 0, PZ); CG.add(P.group); P.group.userData.box = 'güç kaynağı';

  // PCB + CMOS kapı (DIP-14) + çıkış LED'i + "okunan bit" göstergesi
  const board = S.pcb({ size: [1.3, 0.06, 0.95], position: [0, 0.03, 0] }); scene.remove(board);
  const BG = new THREE.Group(); BG.position.set(BX, 0, BZ); CG.add(BG); BG.add(board);
  const chipTex = canvasTex(512, 256, (k) => { k.fillStyle = '#16181b'; k.fillRect(0, 0, 512, 256); k.fillStyle = '#c9ced4'; k.font = '800 92px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText('CMOS', 256, 132);
    k.fillStyle = '#3a3e44'; k.beginPath(); k.arc(40, 128, 22, 0, 7); k.fill(); });
  const chipMat = [0, 0, new THREE.MeshPhysicalMaterial({ map: chipTex, roughness: 0.5, clearcoat: 0.3 }), 0, 0, 0].map((m) => m || new THREE.MeshPhysicalMaterial({ color: 0x16181b, roughness: 0.5 }));
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.1, 0.28), chipMat); chip.position.set(-0.18, 0.11, 0.05); chip.castShadow = true; BG.add(chip); chip.userData.box = 'kapı';
  const pinM = S.M.solder;
  for (let i = 0; i < 7; i++) for (const s of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.08, 0.05), pinM); p.position.set(-0.18 - 0.24 + i * 0.08, 0.08, 0.05 + s * 0.16); BG.add(p); }
  const led = S.led({ color: 0x2bff6a }); scene.remove(led.group); led.group.position.set(0.42, 0.06, 0.25); led.group.scale.setScalar(0.8); BG.add(led.group); led.group.userData.box = 'LED';
  const bitShow = lcd(256, 256, C1);
  const dispG = new THREE.Group(); BG.add(dispG); dispG.position.set(0.4, 0.06, -0.2);
  const db = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.2, 0.3, 3, 0.03), new THREE.MeshPhysicalMaterial({ color: 0x2b2f36, roughness: 0.42 })); db.position.y = 0.1; db.castShadow = true; dispG.add(db);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), new THREE.MeshBasicMaterial({ map: bitShow.tex })); scr.rotation.x = -Math.PI / 2; scr.position.y = 0.202; dispG.add(scr);
  dispG.userData.box = 'bit göstergesi';
  // iz çizgileri (bakır pad'ler): kapı çıkışından LED'e ve göstergeye
  const padM = new THREE.MeshPhysicalMaterial({ color: 0xc98a4b, metalness: 0.9, roughness: 0.35 });
  for (const [x0, z0, x1, z1] of [[0.06, -0.11, 0.24, -0.11], [0.06, 0.21, 0.42, 0.21], [0.42, 0.21, 0.42, 0.16]]) {
    const L = Math.hypot(x1 - x0, z1 - z0); const tr = new THREE.Mesh(new THREE.BoxGeometry(Math.max(L, 0.02), 0.006, 0.025), padM);
    tr.position.set((x0 + x1) / 2, 0.063, (z0 + z1) / 2); tr.rotation.y = -Math.atan2(z1 - z0, x1 - x0); BG.add(tr); }

  // teller (kesintisiz): + ucu → kapı girişi (pin 1), − ucu → PCB toprak pad'i
  const inX = BX - 0.18 - 0.24, inZ = BZ + 0.05 - 0.16;
  tube(S, [[PX + 0.57, Y, PZ], [PX + 0.85, Y + 0.05, PZ - 0.02], [inX - 0.35, 0.16, inZ - 0.02], [inX - 0.05, 0.1, inZ], [inX, 0.085, inZ]], CG);
  const gX = BX - 0.5, gZ = BZ + 0.38;
  const gp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 20), padM); gp.position.set(gX, 0.065, gZ); CG.add(gp);
  tube(S, [[PX - 0.57, Y, PZ], [PX - 0.66, Y - 0.04, PZ + 0.12], [PX - 0.5, 0.1, PZ + 0.36], [PX + 0.6, 0.08, gZ + 0.05], [gX - 0.1, 0.07, gZ], [gX, 0.07, gZ]], CG, 0.026);

  const GP = panel();
  const gm = new THREE.Mesh(new THREE.PlaneGeometry(GW, GW * GEO.Hc / GEO.Wc), GP.mat);
  gm.position.set(0, GYc, GZ); gm.rotation.x = GRX; CG.add(gm); gm.userData.box = 'panel';

  const CD = 10.2, CE = 60, CXc = 0.12, CT = -1.0;
  const ck = (t, a, dd) => [t, a, CD + dd, CE, CXc, CT];
  const cam = camRig(S, [ck(0, 0.0, 0.03), ck(A.r1, 0.035, 0.0), ck(A.r2, -0.03, 0.05), ck(A.n1, 0.03, 0), ck(A.f1, -0.03, 0.05), ck(Z.f1[1], 0.02, 0.03), ck(DUR, 0.04, 0.05)]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 15.4, y2: 21.0 });

  return (t) => {
    cam(t);
    const v = Vof(t); let b = bitOf(v);
    if (b === '?') b = t >= A.f1 ? (wob(t) > 0.2 ? '1' : '0') : (t < A.r2 + 0.5 ? '1' : '0');
    const g = BANDS.map(([a, e]) => fade(t, a, e, 0.5) * (0.75 + 0.25 * Math.sin(t * 3.1)));
    GP.draw(t, g);
    P.show.set(`${fmt(v, 2)} V`);
    P.knob.rotation.y = -(Vbase(t) / VMAX) * 4.2;
    bitShow.set(b, b === '1' ? C1 : C0);
    led.set(b === '1' ? 0.85 + 0.05 * Math.sin(t * 7) : 0);
    P.glow.emissiveIntensity = 0.3 + 0.1 * Math.sin(t * 2.3);

    yaz(t);
    for (const k of KART) S.text(k.id, k.html, { x: 47, y: k.y, size: k.size || 4.1, weight: k.weight || 700, align: 'left', maxWidth: 78, nowrap: true,
      opacity: t >= k.t0 ? easeOut(seg(t, k.t0 - 0.05, k.t0 + 0.2)) : 0, reveal: clamp((t - k.t0) / (k.t1 - k.t0)) });
    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', `Bu CMOS girişine ${hl('2,5 V')} verirsek ne okunur?`, { y: 24.2, size: 3.3, weight: 600, opacity: subO, nowrap: true });

    const on = (a, e) => fade(t, a, e, 0.3);
    label('lg', 'kapı girişi', BX - 0.45, 0.38, BZ - 0.3, { opacity: on(0.3, A.r2), size: 3.5 });
    label('lb', 'okunan bit', BX + 0.3, 0.6, BZ - 0.34, { opacity: on(0.3, A.n1), size: 3.5 });
    label('lp', hl('ayarlı güç kaynağı'), PX + 0.3, 0.98, PZ - 0.12, { opacity: on(0.3, A.r2), size: 3.5 });
  };
}
