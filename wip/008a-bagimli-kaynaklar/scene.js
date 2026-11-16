// 008a — Bağımlı kaynaklar. Temel Devre Teorisi I, ders 3 (Razavi, Basic Circuits Lec 3, [4:10–11:46]).
// Bölüm 2b/2g: tek fikir. Vurgulanan nokta: bağımlı akım kaynağının değeri sabit değildir, başka bir yerdeki
// gerilimi izler (i₁ = k·v_in); k'nın birimi A/V = 1/Ω'dur [7:08–7:41]. R₁'den geçince v_out = k·R₁·v_in;
// k·R₁ > 1 ise devre yükselteçtir [10:25–11:29].
// Devre: arkada giriş gerilimi modülü (v_in, düğmeli); çıkış döngüsü: bağımlı akım kaynağı (eşkenar dörtgen, arka kenar,
// ok +x), R₁ = 1 kΩ (sağ kenar), ampermetre (sol kenar); voltmetre R₁'in uçlarında; döngü içinde v_in(t) ve v_out(t) grafiği.
// Elektronlar yeşil (dış devrede gerçek yönde), referans akım oku kırmızı. Sahne geçişleri aynı kadrajda, kesme (kural 15).

import { THREE, RoundedBoxGeometry, clamp, seg, easeInOut, easeOut, fade } from '../../tools/lib/stage.js';
import { hl, rd, bl, gr, fmt, check, penTimeline, narrationPen, penSec, wordsOf } from '../../tools/lib/anlatim.js';
import { canvasTex, roundedLoop, closedWire, resistor, projLabel, camRig } from '../../tools/lib/parcalar.js';

// ---------------------------------------------------------------- değerler
const K = 10;      // mA/V  (= 0,01 A/V = 1/(100 Ω))
const R1 = 1;      // kΩ
const near = (a, b) => Math.abs(a - b) < 1e-9;
check(near(K * R1, 10), 'k·R₁ = 10 mA/V × 1 kΩ = 10 (birimsiz)');
check(near(K * 0.1, 1) && near(K * 0.2, 2) && near(K * 0.15, 1.5), 'i₁ = k·v_in: 0,1 V → 1 mA, 0,2 V → 2 mA, 0,15 V → 1,5 mA');
check(near(1 / (K / 1000), 100), 'k = 10 mA/V = 1/(100 Ω)');
check(near(K * 0.2 * R1, 2) && near(K * 0.15 * R1, 1.5), 'v_out = k·R₁·v_in: 0,2 V → 2 V; 0,15 V → 1,5 V');

const sb = (x) => `<sub style="font-size:.62em;line-height:0">${x}</sub>`;
const VIN = `${hl('v' + sb('in'))}`, VOUT = `${hl('v' + sb('out'))}`, I1 = `${rd('i' + sb('1'))}`, RR1 = `${bl('R' + sb('1'))}`;

// ---------------------------------------------------------------- anlatım
const BEATS = [
  { id: 'h1', pen: false, pre: 0, l1: `Bu ${rd('akım kaynağı')}`, l2: `<b style="font-weight:900">neye ${hl('bağlı')}?</b>`, s1: 7.4, s2: 7.4 },
  { id: 'a1', pre: 2.6, l1: `${rd('Akım')}, girişteki ${hl('gerilimi')} izler`, l2: `(${I1} = k·${VIN}, k = 10 mA/V)`, s1: 6.0, s2: 5.6 },
  { id: 'a3', pre: 3.2, l1: `${RR1} üzerinde çıkış ${hl('gerilimi')} oluşur`, l2: `(${VOUT} = k·${RR1}·${VIN})`, s1: 5.6, s2: 5.8 },
  { id: 'a4', pre: 0.6, l1: `k·${RR1} = 10 olduğu için`, l2: `çıkış, girişin 10 katıdır`, s1: 6.0, s2: 5.6 },
  { id: 'g1', pre: 2.4, l1: `Transistörler bağımlı kaynakla modellenir`, l2: `mikrofondan sonraki yükselteç böyle çalışır`, s1: 5.0, s2: 4.9 },
];
const { Z, A, W: WR } = penTimeline(BEATS, { k: 1.0 });

// 'Bilmen gerekenler' kartı (bölüm 2f): aynı ekranda, satır satır kalemle; son karede kalır
const KART = [
  { id: 'kh', html: `<span style="color:#7fe3ff">Bilmen gerekenler</span>`, y: 13.4, size: 4.6, weight: 900 },
  { id: 'k1', html: `• Bağımlı kaynak bir akımı veya gerilimi izler`, y: 17.9 },
  { id: 'k2', html: `• ${I1} = k·${VIN} ise k'nın birimi A/V = 1/Ω`, y: 21.5 },
  { id: 'k3', html: `• ${VOUT} = k·${RR1}·${VIN}; k·${RR1} > 1 ise devre yükseltir`, y: 25.1 },
];
const CUTG = A.g1 + 0.1, CUTK = Z.g1[1] + 0.05;   // gerçek hayat aralığı; kartta devreye dönülür
const KS = [CUTK, CUTK];                           // kart: devre baştan küçük (kesme ile aynı kadraj)
const KSC = 0.8;
{ let t = CUTK + 0.25; for (const k of KART) { k.t0 = t; k.t1 = t + penSec(k.html); t = k.t1 + 0.06; } }
const KEND = KART[KART.length - 1].t1;
const DUR = Math.ceil((KEND + Math.max(4.0, ...KART.map((k) => 1.2 + 0.35 * wordsOf({ l1: k.html }) - (KEND - k.t1)))) * 30) / 30;
for (const k of KART) check(DUR - k.t1 >= 1.2 + 0.35 * wordsOf({ l1: k.html }) - 1e-9, `kart ${k.id}: okuma süresi`);
check(DUR - KEND >= 4.0, 'kart en az 4 sn okunur kalır (2f-2)');
check(DUR <= 60, `süre ≤ 60 sn (${DUR})`);
export const _T = { Z, A, W: WR, KART, DUR };

// ---------------------------------------------------------------- olaylar
const E1 = [A.a1 + 0.3, A.a1 + 1.6];     // v_in 0,10 → 0,20 V (akım 1 → 2 mA)  — 2g: cevabın ilk görüntüsü ≤ 8 sn
const E3 = [A.a3 + 0.2, A.a3 + 1.6];     // giriş sinüse geçer: 0,15 V tepe, 0,5 Hz (mikrofon sinyali)
const FQ = 0.5, AMP = 0.15;
check(E1[0] <= 8, `2g-2: cevabın ilk görüntüsü ${E1[0].toFixed(1)} sn ≤ 8 sn`);
check(E1[1] + 1.0 <= Z.a1[0] + 1e-9 && E3[1] + 1.5 <= Z.a3[0] + 1e-9, 'olaydan sonra bekleme, sonra yazı');
check(Z.g1[0] - CUTG >= 2.2, 'gerçek hayat: modeller yazıdan önce');

const vin = (t) => {   // V
  if (t < E3[0]) return 0.1 + 0.1 * easeInOut(seg(t, ...E1));
  const e = easeInOut(seg(t, ...E3));
  return (1 - e) * 0.2 + e * AMP * Math.sin(2 * Math.PI * FQ * (t - E3[0]));
};
const I = (t) => K * vin(t);          // mA
const VO = (t) => I(t) * R1;          // V
check(near(vin(0), 0.1) && near(I(0), 1) && near(VO(0), 1), 'başlangıç: 0,10 V → 1 mA → 1 V');
check(near(vin(Z.a1[0]), 0.2) && near(I(Z.a1[0]), 2) && near(VO(Z.a1[0]), 2), 'a1: 0,20 V → 2 mA → 2 V');
{ const tp = E3[0] + 1 / (4 * FQ) + 2 / FQ; check(tp > E3[1] && near(vin(tp), AMP) && near(VO(tp), 1.5), 'sinüs tepesi: 0,15 V → 1,5 mA → 1,5 V'); }
for (let t = 0; t < DUR; t += 0.05) check(Math.abs(VO(t)) <= 2 + 1e-9, 'v_out ekseni kapsar (|v| ≤ 2 V < 2,5 V)');

// görsel akış hızı ∝ akım (işaretli: negatif akımda elektronlar ters yöne)
const VEL = (t) => 0.3 * I(t);
let _s = 0, _t = 0;
const dist = (t) => {
  if (t < _t) { _s = 0; _t = 0; }
  const dt = 1 / 120; while (_t + dt <= t) { _s += VEL(_t) * dt; _t += dt; }
  return _s + VEL(_t) * (t - _t);
};

// ---------------------------------------------------------------- efektler
export const meta = {
  title: 'Bağımlı kaynaklar (Razavi ders 3)',
  duration: DUR,
  fps: 30,
  music: { off: true },
  cues: [
    { t: 0.1, kind: 'hum', d: CUTG - 0.3, gain: 0.1 },
    { t: E1[1] - 0.05, kind: 'pop', gain: 0.12 },
    { t: E3[0] + 0.05, kind: 'thud', gain: 0.11 },
    { t: CUTG + 0.4, kind: 'thud', gain: 0.11 },
    { t: CUTG + 1.0, kind: 'thud', gain: 0.11 },
    { t: CUTK + 0.05, kind: 'hum', d: DUR - CUTK - 0.3, gain: 0.1 },
  ],
};

// ---------------------------------------------------------------- yerleşim
const X = 1.0, ZH = 1.1, Y = 0.2;
const RL = 0.6, RZ = 0.0;          // R₁ sağ kenarda
const AMZ = 0.0;                   // ampermetre sol kenarda
const INZ = -ZH - 0.78;            // giriş modülü döngünün arkasında
const GW = 1.0, GX = -0.25, GZ = 0.5;
const VMX = 0.18, VMZ = -0.2;

function lcd(w, h, color) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  let last = null;
  return { tex, set(txt, col = color) {
    const key = txt + col; if (key === last) return; last = key;
    g.fillStyle = '#0b1410'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#2c3a33'; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `900 ${Math.round(h * 0.56)}px "InterDisplay", sans-serif`;
    g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 18; g.fillText(txt, w / 2, h / 2 + 6); g.shadowBlur = 0;
    tex.needsUpdate = true;
  } };
}

function meter(S, letter, color, { w = 0.6, d = 0.42 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, 0.22, d, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0xd8a326, roughness: 0.45, clearcoat: 0.3 }));
  body.position.y = 0.11; body.castShadow = true; g.add(body);
  const face = new THREE.Mesh(new RoundedBoxGeometry(w - 0.06, 0.02, d - 0.06, 2, 0.008), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.5 })); face.position.y = 0.225; g.add(face);
  const show = lcd(560, 220, color);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.68, w * 0.68 * 220 / 560), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(w * 0.1, 0.237, 0); g.add(scr);
  const vt = canvasTex(128, 128, (k) => { k.strokeStyle = '#fff'; k.lineWidth = 10; k.beginPath(); k.arc(64, 64, 52, 0, 7); k.stroke(); k.fillStyle = '#fff'; k.font = '900 72px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(letter, 64, 68); });
  const sym = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial({ map: vt, transparent: true })); sym.rotation.x = -Math.PI / 2; sym.position.set(-w * 0.37, 0.237, 0); g.add(sym);
  S.scene.add(g); return { group: g, show };
}

// bağımlı akım kaynağı: eşkenar dörtgen içinde ok (+x), yanında "k·v_in"
function depSource(S) {
  const g = new THREE.Group();
  const shell = new THREE.MeshPhysicalMaterial({ color: 0x2a2e36, roughness: 0.38, clearcoat: 0.6, emissive: 0xff2a1a, emissiveIntensity: 0 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.3, 0.42, 4, 0.05), shell);
  body.position.y = 0.15; body.castShadow = body.receiveShadow = true; g.add(body);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 20), S.M.copper);
    post.rotation.z = Math.PI / 2; post.position.set(s * 0.46, Y, 0); post.castShadow = true; g.add(post);
  }
  const tex = canvasTex(1024, 500, (c) => {
    const cx = 300, cy = 250, r = 190;
    c.strokeStyle = '#ff5a4f'; c.lineWidth = 22; c.shadowColor = c.strokeStyle; c.shadowBlur = 20; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(cx - r, cy); c.lineTo(cx, cy - r * 0.92); c.lineTo(cx + r, cy); c.lineTo(cx, cy + r * 0.92); c.closePath(); c.stroke();
    c.beginPath(); c.moveTo(cx - r - 110, cy); c.lineTo(cx - r, cy); c.moveTo(cx + r, cy); c.lineTo(cx + r + 110, cy); c.stroke();
    c.fillStyle = c.strokeStyle;
    c.beginPath(); c.moveTo(cx - 100, cy); c.lineTo(cx + 50, cy); c.stroke();
    c.beginPath(); c.moveTo(cx + 108, cy); c.lineTo(cx + 38, cy - 52); c.lineTo(cx + 38, cy + 52); c.closePath(); c.fill();
    c.shadowBlur = 0; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = '#ffffff'; c.font = '900 120px "InterDisplay", sans-serif'; c.fillText('k·v', 760, cy + 4);
    c.font = '900 66px "InterDisplay", sans-serif'; c.fillText('in', 890, cy + 52);
  });
  const top = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.39), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  top.rotation.x = -Math.PI / 2; top.position.y = 0.302; g.add(top);
  S.scene.add(g); return { group: g, shell };
}

// giriş gerilimi modülü: düğme + v_in ekranı
function inputModule(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.24, 0.5, 4, 0.05), new THREE.MeshPhysicalMaterial({ color: 0x30343c, roughness: 0.4, clearcoat: 0.5 }));
  body.position.y = 0.12; body.castShadow = body.receiveShadow = true; g.add(body);
  const show = lcd(620, 220, '#ffd23f');
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.66 * 220 / 620), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(0.12, 0.245, 0); g.add(scr);
  const knob = new THREE.Group();
  const kb = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.1, 32), new THREE.MeshPhysicalMaterial({ color: 0x15161a, roughness: 0.35, clearcoat: 0.8 }));
  kb.position.y = 0.05; knob.add(kb);
  const mark = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.012, 0.09), new THREE.MeshBasicMaterial({ color: 0xffd23f })); mark.position.set(0, 0.106, -0.05); knob.add(mark);
  knob.position.set(-0.42, 0.24, 0); g.add(knob);
  for (const [s, col] of [[1, 0xe8231a], [-1, 0x202226]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1, 18), new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.4 }));
    post.position.set(0.5 + 0.0 * s, 0.29, s * 0.12); g.add(post);
  }
  S.scene.add(g); return { group: g, show, knob };
}

// zaman grafiği: v_in(t) ince açık sarı, v_out(t) kalın turuncu-sarı; eksen −2,5…2,5 V, son 6 sn
const GEO = { Wc: 1024, Hc: 590, ox: 130, oy0: 330, top: 120, bot: 540, right: 1024 - 60, VMAX: 2.5, TW: 6 };
const gpy = (v) => GEO.oy0 - (v / GEO.VMAX) * (GEO.oy0 - GEO.top);
check(near(gpy(0), GEO.oy0) && near(gpy(2.5), GEO.top) && near(gpy(-2.5), GEO.oy0 + (GEO.oy0 - GEO.top)), 'grafik ekseni simetrik −2,5…2,5 V');
check(GEO.oy0 + (GEO.oy0 - GEO.top) <= GEO.bot + 1e-9, 'alt sınır çizim alanında');
check(near(gpy(1.5) - gpy(0), -0.6 * (GEO.oy0 - GEO.top)) && near(gpy(0.15) - gpy(0), -0.06 * (GEO.oy0 - GEO.top)), 'grafik: 1,5 V %60, 0,15 V %6 (10 kat)');
function graphPanel(S) {
  const { Wc, Hc, ox, oy0, top, right, TW } = GEO;
  const c = document.createElement('canvas'); c.width = Wc; c.height = Hc;
  const k = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(GW, GW * Hc / Wc), mat);
  let last = -1;
  const draw = (t, showAmp) => {
    const key = Math.round(t * 30) + (showAmp ? 0.5 : 0); if (key === last) return; last = key;
    k.clearRect(0, 0, Wc, Hc);
    k.fillStyle = 'rgba(14,20,24,0.92)'; k.strokeStyle = '#2b3d44'; k.lineWidth = 6;
    k.beginPath(); k.roundRect(6, 6, Wc - 12, Hc - 12, 26); k.fill(); k.stroke();
    k.strokeStyle = 'rgba(120,190,210,0.12)'; k.lineWidth = 2;
    for (const v of [-2, -1, 1, 2]) { k.beginPath(); k.moveTo(ox, gpy(v)); k.lineTo(right, gpy(v)); k.stroke(); }
    k.strokeStyle = '#cfe3ea'; k.lineWidth = 5;
    k.beginPath(); k.moveTo(ox, top - 10); k.lineTo(ox, gpy(-2.5) + 6); k.stroke();
    k.beginPath(); k.moveTo(ox, oy0); k.lineTo(right + 14, oy0); k.stroke();
    k.fillStyle = '#cfe3ea'; k.font = '800 36px "InterDisplay", sans-serif'; k.textAlign = 'right'; k.textBaseline = 'middle';
    for (const v of [-2, -1, 0, 1, 2]) k.fillText(String(v).replace('-', '−'), ox - 14, gpy(v));
    k.textAlign = 'left'; k.textBaseline = 'bottom'; k.font = '800 40px "InterDisplay", sans-serif'; k.fillStyle = '#ffd23f';
    k.fillText('v (V)', ox - 40, top - 22);
    k.textAlign = 'right'; k.textBaseline = 'top'; k.fillStyle = '#cfe3ea'; k.fillText('t (s)', right + 8, oy0 + 10);
    // gösterge (sağ üst, çizim alanının üstünde)
    k.textBaseline = 'middle'; k.font = '800 44px "InterDisplay", sans-serif';
    k.fillStyle = '#ffe9a3'; k.fillText('— giriş', right - 230, 52);
    k.fillStyle = '#ffab1f'; k.fillText('— çıkış', right, 52);
    // izler: son TW saniye (formülden)
    const t0 = Math.max(0, t - TW);
    const px = (tt) => ox + ((tt - (t - TW)) / TW) * (right - ox);
    const trace = (f, col, lw) => {
      k.strokeStyle = col; k.lineWidth = lw; k.lineJoin = 'round'; k.shadowColor = col; k.shadowBlur = 12; k.beginPath();
      const n = 180; for (let i = 0; i <= n; i++) { const tt = t0 + ((t - t0) * i) / n; const x = px(tt), y = gpy(f(tt)); i ? k.lineTo(x, y) : k.moveTo(x, y); }
      k.stroke(); k.shadowBlur = 0;
      k.fillStyle = col; k.beginPath(); k.arc(px(t), gpy(f(t)), lw + 3, 0, 7); k.fill();
    };
    trace(vin, '#ffe9a3', 5);
    trace(VO, '#ffab1f', 9);
    if (showAmp > 0) {   // a4: tepe değerleri (formülden)
      k.globalAlpha = showAmp; k.font = '800 48px "InterDisplay", sans-serif'; k.textAlign = 'left'; k.textBaseline = 'middle';
      k.fillStyle = '#ffab1f'; k.fillText(`tepe ${fmt(AMP * K * R1, 1)} V`, ox + 20, gpy(2.15));
      k.fillStyle = '#ffe9a3'; k.fillText(`tepe ${fmt(AMP, 2)} V`, ox + 20, gpy(-2.1));
      k.globalAlpha = 1;
    }
    tex.needsUpdate = true;
  };
  return { mesh: m, mat, draw };
}

// mini modeller: mikrofon ve TO-92 transistör
function microphone(S) {
  const g = new THREE.Group();
  const metal = new THREE.MeshPhysicalMaterial({ color: 0x9aa0a8, metalness: 0.9, roughness: 0.3 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x1a1b1f, roughness: 0.5, clearcoat: 0.4 });
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.05, 40), dark); stand.position.y = 0.025; g.add(stand);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 16), metal); rod.position.y = 0.3; g.add(rod);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 28), dark); body.position.set(0, 0.62, 0.06); body.rotation.x = 0.35; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 24), new THREE.MeshPhysicalMaterial({ color: 0xb8bec6, metalness: 0.85, roughness: 0.45, wireframe: false }));
  head.position.set(0, 0.86, -0.02); g.add(head);
  const grill = new THREE.Mesh(new THREE.SphereGeometry(0.153, 20, 14), new THREE.MeshBasicMaterial({ color: 0x3a3d44, wireframe: true, transparent: true, opacity: 0.55 }));
  grill.position.copy(head.position); g.add(grill);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  S.scene.add(g); return { group: g };
}
function transistor(S) {
  const g = new THREE.Group();
  const black = new THREE.MeshPhysicalMaterial({ color: 0x141416, roughness: 0.45, clearcoat: 0.5 });
  const half = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.42, 40, 1, false, 0, Math.PI), black); half.position.y = 0.62; half.rotation.y = Math.PI / 2; g.add(half);
  const flat = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.42, 0.01), black); flat.position.set(0, 0.62, 0); g.add(flat);
  const tx = canvasTex(256, 256, (c) => { c.fillStyle = '#d8d8d8'; c.font = '800 54px "InterDisplay", sans-serif'; c.textAlign = 'center'; c.fillText('BC', 128, 110); c.fillText('547', 128, 175); });
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); lab.position.set(0, 0.62, 0.012); g.add(lab);
  const leg = new THREE.MeshPhysicalMaterial({ color: 0xc9ccd1, metalness: 0.9, roughness: 0.25 });
  for (const x of [-0.12, 0, 0.12]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.42, 0.015), leg); l.position.set(x, 0.2, -0.05); g.add(l); }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  S.scene.add(g); return { group: g };
}

export function build(S) {
  const { scene } = S;
  S.table({ size: 44, seed: 8 });
  const sc = S.lights.key.shadow.camera; sc.left = -10; sc.right = 10; sc.top = 6; sc.bottom = -6; sc.updateProjectionMatrix();
  const label = projLabel(S);
  const CG = new THREE.Group(); scene.add(CG); CG.userData.main = true;

  // ------------------------------------------------ çıkış döngüsü: bakır tel (kaynak, ampermetre, R₁ aralıkları boş)
  const loop = roundedLoop([[0, ZH], [-X, ZH], [-X, -ZH], [X, -ZH], [X, ZH]]);   // ön kenarın ortasından başlar (aralıklar u = 0'ı sarmaz)
  const Wc = closedWire(S, loop, { y: Y }); Wc.mesh.visible = false;
  const gaps = [
    [Wc.uOf(-0.46, -ZH), Wc.uOf(0.46, -ZH)],
    [Wc.uOf(-X, AMZ - 0.2), Wc.uOf(-X, AMZ + 0.2)],
    [Wc.uOf(X, RZ - RL / 2 - 0.02), Wc.uOf(X, RZ + RL / 2 + 0.02)],
  ].map(([a, b]) => [Math.min(a, b), Math.max(a, b)]).sort((p, q) => p[0] - q[0]);
  check(gaps.every(([a, b]) => b - a < 0.2), 'eleman aralıkları kısa (tel kesintisiz)');
  for (let i = 0; i < gaps.length; i++) {
    const a = gaps[i][1], b = i < gaps.length - 1 ? gaps[i + 1][0] : 1 + gaps[0][0];
    const pts = []; for (let j = 0; j <= 240; j++) pts.push(Wc.curve.getPointAt(((a + ((b - a) * j) / 240) % 1 + 1) % 1));
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 480, 0.03, 10), S.M.copper); mm.castShadow = true; CG.add(mm);
  }
  const inGap = (u) => gaps.some(([a, b]) => u > a + 0.004 && u < b - 0.004);
  // döngü yönü: loop [0,−ZH] → [X,−ZH] → sağ kenar +z → ön kenar −x → sol kenar −z. Kaynağın oku +x: akım u artan yönde.
  const p0 = Wc.curve.getPointAt(Wc.uOf(0.2, -ZH)), p1 = Wc.curve.getPointAt(Wc.uOf(0.3, -ZH));
  check(p1.x > p0.x, 'u artan yön = kaynak oku (+x) = referans akım yönü');

  const DS = depSource(S); DS.group.position.set(0, 0, -ZH); CG.add(DS.group); DS.group.userData.box = 'bağımlı kaynak';
  const AM = meter(S, 'A', '#ff5a4f', { w: 0.5, d: 0.36 }); AM.group.position.set(-X, 0, AMZ); CG.add(AM.group); AM.group.userData.box = 'ampermetre';
  const RX = resistor(S, { len: RL, radius: 0.14, bands: [0x7a4a1a, 0x111111, 0xe8231a, 0xd4af37], obstacles: 10 });   // kahverengi-siyah-kırmızı: 1 kΩ
  RX.group.position.set(X, Y, RZ); CG.add(RX.group); RX.group.userData.box = 'direnç';

  // voltmetre R₁'in uçlarında (+ ucu akımın girdiği arka uç)
  const VM = meter(S, 'V', '#ffab1f'); VM.group.position.set(VMX, 0, VMZ); CG.add(VM.group); VM.group.userData.box = 'voltmetre';
  const leadMat = (col) => new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.5 });
  const mkLead = (from, to, mat) => {
    const mid = from.clone().lerp(to, 0.5); mid.y += 0.22;
    const mm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(from, mid, to), 40, 0.014, 8), mat); CG.add(mm); mm.userData.box = 'voltmetre kablosu'; return mm;
  };
  mkLead(new THREE.Vector3(VMX + 0.22, 0.2, VMZ - 0.1), new THREE.Vector3(X - 0.02, Y + 0.05, RZ - RL / 2 - 0.06), leadMat(0xe8231a));
  mkLead(new THREE.Vector3(VMX + 0.22, 0.2, VMZ + 0.1), new THREE.Vector3(X - 0.02, Y + 0.05, RZ + RL / 2 + 0.06), leadMat(0x202226));

  const GP = graphPanel(S);
  GP.mesh.position.set(GX, 0.42, GZ); GP.mesh.rotation.x = -0.8; CG.add(GP.mesh); GP.mesh.userData.box = 'grafik';

  // giriş modülü + kontrol bağı (ışıklı kesikli çizgi; tel değildir)
  const IN = inputModule(S); IN.group.position.set(-0.15, 0, INZ); CG.add(IN.group); IN.group.userData.box = 'giriş';
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.9 });
  const dots = [];
  { const a = new THREE.Vector3(0.5, 0.3, INZ + 0.22), b = new THREE.Vector3(0.18, 0.33, -ZH - 0.2);
    for (let i = 0; i < 7; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), dotMat); d.position.lerpVectors(a, b, i / 6); CG.add(d); dots.push(d); } }

  // elektronlar
  const N = 40;
  const eMat = new THREE.MeshPhysicalMaterial({ color: 0x1fcf5a, emissive: 0x14b84a, emissiveIntensity: 0.7, roughness: 0.25, clearcoat: 1 });
  const el = new THREE.InstancedMesh(new THREE.SphereGeometry(0.042, 16, 12), eMat, N); el.castShadow = true; el.renderOrder = 2; CG.add(el);
  const m4 = new THREE.Matrix4(), qq = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const rr = S.rng(13);
  const PH = Array.from({ length: N }, () => [rr() * 6.28, rr() * 6.28, 5 + rr() * 4, 6 + rr() * 5]);

  // referans akım oku (kırmızı): arka kenarın sağında +x yönünde (kaynak oku yönünde; R₁'e arka uçtan girer)
  const arrowMat = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.8, roughness: 0.35, transparent: true, opacity: 0 });
  const arrow = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.4, 16), arrowMat); shaft.rotation.z = Math.PI / 2; arrow.add(shaft);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.18, 20), arrowMat); head.rotation.z = -Math.PI / 2; head.position.x = 0.29; arrow.add(head);
  arrow.position.set(X - 0.3, 0.24, -ZH + 0.16); arrow.rotation.y = 0; arrow.scale.setScalar(0.75); CG.add(arrow); arrow.userData.box = 'akım oku';
  // ok +x yönünde: arka kenarda kaynak oku yönü (u artan = referans yön)

  // ------------------------------------------------ gerçek hayat (aynı kadrajda): mikrofon + transistör
  const LS = 1.35; const LG = new THREE.Group(); scene.add(LG); LG.visible = false; LG.userData.main = true; LG.scale.setScalar(LS);
  const lw = (x, y, z) => [x * LS, y * LS, z * LS];
  { const pb = new THREE.Mesh(new RoundedBoxGeometry(1.9, 0.08, 2.4, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0x3a3631, roughness: 0.6, clearcoat: 0.2 })); pb.position.set(0, 0.02, -0.3); pb.receiveShadow = pb.castShadow = true; LG.add(pb); }
  const mic = microphone(S); mic.group.position.set(-0.45, 0.06, 0.1); mic.group.scale.setScalar(1.3); LG.add(mic.group); mic.group.userData.box = 'mikrofon';
  const tr = transistor(S); tr.group.position.set(0.5, 0.06, -0.2); tr.group.scale.setScalar(1.4); LG.add(tr.group); tr.group.userData.box = 'transistör';
  const models = [mic.group, tr.group], MSC = [1.3, 1.4];
  const GM = [CUTG + 0.3, CUTG + 0.9];

  const CD = 10.3, CE = 63, CX = 0, CT = -0.66;
  const ck = (t, a, dd, de) => [t, a, CD + dd, CE + de, CX, CT];
  const cam = camRig(S, [
    ck(0, 0.0, 0.1, 0), ck(A.a1, 0.04, 0.05, 0), ck(A.a3, 0.03, 0.05, 0),
    ck(A.a4, -0.03, 0, 0), ck(A.g1, 0.03, 0.05, 0), ck(CUTK, -0.03, 0, 0), ck(DUR, 0.03, -0.05, 0),
  ]);
  const yaz = narrationPen(S, BEATS, Z, WR, { y1: 15.5, y2: 22 });

  return (t) => {
    cam(t);
    const life = t >= CUTG && t < CUTK;
    CG.visible = !life; LG.visible = life;
    { const ks = t >= KS[0] ? KSC : 1; CG.scale.setScalar(ks); CG.position.set(0, 0, 0.9 * (1 - ks)); }
    const v = vin(t), i = I(t), vo = VO(t);
    GP.draw(t, fade(t, A.a4 + 0.1, CUTG, 0.4));

    const s = dist(t);
    for (let k = 0; k < N; k++) {
      const p = PH[k];
      const du = 0.03 * Math.sin(t * p[2] + p[0]) / Wc.L;
      // elektronlar referans yönünün (u artan) tersine: akım pozitifken u azalır
      const u = ((((k / N) - s / Wc.L + du) % 1) + 1) % 1;
      Wc.curve.getPointAt(Math.min(u, 1 - 1e-6), pv);
      const bad = !Number.isFinite(pv.x + pv.y + pv.z); if (bad) pv.set(0, -1, 0);
      pv.y += 0.012 * Math.sin(t * p[3] + p[1]);
      const hide = bad || inGap(u);
      sv.setScalar(hide ? 0.0001 : 1); m4.compose(pv, qq, sv); el.setMatrixAt(k, m4);
    }
    el.instanceMatrix.needsUpdate = true;
    RX.body.emissiveIntensity = 0.1 + 0.06 * Math.abs(i) + 0.03 * Math.sin(t * 9);
    DS.shell.emissiveIntensity = 0.08 * fade(t, E1[0], E1[1] + 0.8, 0.3) * (0.7 + 0.3 * Math.sin(t * 6));
    arrowMat.opacity = easeOut(seg(t, 0.3, 0.8)); arrow.visible = !life;
    IN.knob.rotation.y = -v * 9;
    dots.forEach((d, j) => { d.material.opacity = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * 5 - j * 0.9)); });

    const fA = (x) => `${x < -0.004 ? '−' : ''}${fmt(Math.abs(x), 2)}`;
    AM.show.set(`${fA(i)} mA`);
    VM.show.set(`${fA(vo)} V`);
    IN.show.set(`${v < -0.0004 ? '−' : ''}${fmt(Math.abs(v), 3)} V`);

    models.forEach((g, k) => { const o = easeOut(seg(t, GM[k], GM[k] + 0.5)); g.visible = life && o > 0.01; g.scale.setScalar(Math.max(0.001, o) * MSC[k]); g.rotation.y = 0.25 * Math.sin(t * 0.6 + k); });

    yaz(t);
    for (const k of KART) S.text(k.id, k.html, { x: 47, y: k.y, size: k.size || 3.9, weight: k.weight || 700, align: 'left', maxWidth: 78, nowrap: true,
      opacity: t >= k.t0 ? easeOut(seg(t, k.t0 - 0.05, k.t0 + 0.2)) : 0, reveal: clamp((t - k.t0) / (k.t1 - k.t0)) });

    const subO = 1 - easeInOut(seg(t, Z.h1[1] - 0.4, Z.h1[1]));
    S.text('sub', `Bağımlı kaynak (k = 10 mA/V)`, { y: 26.3, size: 4.4, weight: 600, opacity: subO, nowrap: true });

    const onC = (a, b) => (life ? 0 : fade(t, a, b, 0.3));
    label('lds', rd('bağımlı<br>akım kaynağı'), -0.98, 0.3, -ZH - 0.02, { opacity: onC(0, CUTG), size: 3.5 });
    label('lin', hl('giriş<br>v' + sb('in')), -1.02, 0.3, INZ + 0.05, { opacity: onC(0, CUTG), size: 3.6 });
    label('lr', bl('R' + sb('1') + ' = 1 kΩ'), 0.25, 0.3, -0.6, { opacity: onC(0, CUTG), size: 3.5 });
    label('le', gr('elektronlar'), -X + 0.45, 0.32, -0.6, { opacity: onC(0.6, Z.a1[1]), size: 3.4 });
    label('la', rd('akım yönü'), X - 0.12, 0.3, -ZH - 0.34, { opacity: onC(1.0, Z.a1[1]), size: 3.4 });
    label('lvo', hl('çıkış<br>v' + sb('out')), VMX - 0.55, 0.3, VMZ + 0.02, { opacity: onC(A.a3, CUTG), size: 3.4 });
    const lo = (k, d = 0.4) => (life ? easeOut(seg(t, GM[k] + d, GM[k] + d + 0.4)) : 0);
    label('lm1', 'mikrofon', ...lw(-0.45, 0.1, -1.15), { opacity: lo(0), size: 3.6 });
    label('lm2', 'transistör', ...lw(0.5, 0.1, -1.45), { opacity: lo(1), size: 3.6 });
  };
}
