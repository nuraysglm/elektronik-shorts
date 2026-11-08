// parcalar.js — devre sahnelerinde tekrar eden yapı taşları (pil, direnç, kapalı tel, etiket, kamera).
// 001 ve eski 002 sahnelerindeki ortak kod buraya taşındı (AGENT.md bölüm 3). Bitmiş sahneler kendi kopyalarını kullanır.

import { THREE, RoundedBoxGeometry, seg, easeInOut, lerp } from './stage.js';

/** Canvas'a çizilen doku: canvasTex(w, h, (ctx, w, h) => {...}). Pil yazısı, işaret vb. */
export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

/** Köşeleri yuvarlatılmış kapalı çokgen → sık noktalar [[x,z],...]. poly[0] düz kenar ortası olmalı. */
export function roundedLoop(poly, { r = 0.2, step = 0.06 } = {}) {
  const pts = [], n = poly.length;
  for (let i = 0; i < n; i++) {
    const p0 = poly[(i + n - 1) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
    if (i === 0) { pts.push([p1[0], p1[1]]); continue; }
    const d1 = [p0[0] - p1[0], p0[1] - p1[1]], d2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...d1), l2 = Math.hypot(...d2);
    const a = [p1[0] + (d1[0] / l1) * r, p1[1] + (d1[1] / l1) * r];
    const b = [p1[0] + (d2[0] / l2) * r, p1[1] + (d2[1] / l2) * r];
    for (let k = 0; k <= 10; k++) {
      const s = k / 10, q = 1 - s;
      pts.push([q * q * a[0] + 2 * q * s * p1[0] + s * s * b[0], q * q * a[1] + 2 * q * s * p1[1] + s * s * b[1]]);
    }
  }
  const dense = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const m = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let k = 0; k < m; k++) dense.push([a[0] + ((b[0] - a[0]) * k) / m, a[1] + ((b[1] - a[1]) * k) / m]);
  }
  return dense;
}

/** Kapalı bakır tel döngüsü. Dönen: {curve, mesh, L, uOf(x,z)} — uOf: noktanın eğri üzerindeki konumu (0..1). */
export function closedWire(S, pts2d, { y = 0.2, radius = 0.03, material = S.M.copper } = {}) {
  const curve = new THREE.CatmullRomCurve3(pts2d.map(([x, z]) => new THREE.Vector3(x, y, z)), true, 'centripetal');
  curve.arcLengthDivisions = 3000;
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 900, radius, 12, true), material);
  mesh.castShadow = true; S.scene.add(mesh);
  const L = curve.getLength();
  const tmp = new THREE.Vector3();
  const uOf = (x, z) => { let best = 0, bd = 1e9; for (let i = 0; i < 2000; i++) { curve.getPointAt(i / 2000, tmp); const d = (tmp.x - x) ** 2 + (tmp.z - z) ** 2; if (d < bd) { bd = d; best = i / 2000; } } return best; };
  return { curve, mesh, L, uOf };
}

/** Değişken hızlı akışta alınan yol: ∫ speed(x) dx, 0..t (deterministik, 1/60 adım). */
export function travelled(speed, t, dt = 1 / 60) { let s = 0; for (let x = 0; x < t; x += dt) s += speed(x) * dt; return s; }

/**
 * Pil (x ekseninde, + ucu +x). battery(S, {len, text:'9 V', flip}) → {group, glow (sarı + ucu malzemesi)}.
 * Üstünde "9 V" ve +/− işaretleri. flip: + ucu −x tarafında.
 */
export function battery(S, { len = 0.9, h = 0.34, w = 0.36, y = 0.2, text = '9 V', flip = false } = {}) {
  const M = S.M;
  const g = new THREE.Group(), inner = new THREE.Group();
  if (flip) inner.rotation.y = Math.PI;
  g.add(inner);
  const plastic = new THREE.MeshPhysicalMaterial({ color: 0x24282f, roughness: 0.38, clearcoat: 0.5, clearcoatRoughness: 0.2 });
  const glow = new THREE.MeshPhysicalMaterial({ color: 0xffd23f, emissive: 0xffb800, emissiveIntensity: 0.15, metalness: 0.9, roughness: 0.3 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(len, h, w, 4, 0.035), plastic);
  body.position.y = h / 2; body.castShadow = body.receiveShadow = true; inner.add(body);
  const capP = new THREE.Mesh(new RoundedBoxGeometry(0.16, h + 0.012, w + 0.012, 3, 0.03), glow);
  capP.position.set(len / 2 - 0.07, h / 2, 0); inner.add(capP);
  const capN = new THREE.Mesh(new RoundedBoxGeometry(0.1, h + 0.012, w + 0.012, 3, 0.03), M.steel);
  capN.position.set(-len / 2 + 0.04, h / 2, 0); inner.add(capN);
  const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20), M.gold);
  nub.rotation.z = Math.PI / 2; nub.position.set(len / 2 + 0.02, y, 0); inner.add(nub);
  const tex = canvasTex(1024, 360, (c, W, H) => {
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '900 210px "InterDisplay", sans-serif'; c.fillStyle = '#ffffff'; c.fillText(text, W / 2, H / 2 + 8);
    c.font = '900 230px "InterDisplay", sans-serif';
    c.fillStyle = '#ff5a4f'; c.fillText('+', flip ? 110 : W - 110, H / 2 + 6);
    c.fillStyle = '#6fb2ff'; c.fillText('−', flip ? W - 110 : 110, H / 2 + 6);
  });
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(len * 0.8, len * 0.8 * 360 / 1024), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  lab.rotation.x = -Math.PI / 2; lab.position.set(0, h + 0.002, 0); g.add(lab);
  S.scene.add(g);
  return { group: g, glow };
}

/**
 * Renk kodlu, yarı saydam gövdeli direnç (z ekseninde). resistor(S, {bands:[renkler], obstacles}) → {group, body (malzeme)}.
 * obstacles: gövde içindeki engel küre sayısı (yükün yolunu daraltır).
 */
export function resistor(S, { len = 0.6, radius = 0.15, bands = [0xe6c200, 0x2e9b45, 0x6b3a1d, 0xd4af37], obstacles = 14, opacity = 0.4 } = {}) {
  const M = S.M, g = new THREE.Group();
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xd9c4a0, roughness: 0.35, transparent: true, opacity, depthWrite: false, clearcoat: 0.8, clearcoatRoughness: 0.1, emissive: 0x2f6fff, emissiveIntensity: 0 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 40), bodyMat);
  body.rotation.x = Math.PI / 2; body.renderOrder = 2; g.add(body);
  for (const s of [-1, 1]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.67, radius * 0.67, 0.06, 28), M.steel);
    cap.rotation.x = Math.PI / 2; cap.position.z = s * (len / 2 + 0.03); cap.castShadow = true; g.add(cap);
  }
  const bandMats = bands.map((c, i) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.4, metalness: i === bands.length - 1 ? 0.8 : 0, side: THREE.DoubleSide }));
  bandMats.forEach((m, i) => {
    const band = new THREE.Mesh(new THREE.CylinderGeometry(radius + 0.004, radius + 0.004, len * 0.09, 40, 1, true), m);
    band.rotation.x = Math.PI / 2; band.position.z = -len * 0.4 + i * len * 0.2 + (i === bands.length - 1 ? len * 0.13 : 0); g.add(band);
  });
  for (let k = 0; k < obstacles; k++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.2, 14, 10), M.iron);
    const ang = k * 2.4;
    s.position.set(radius * 0.72 * Math.cos(ang), radius * 0.72 * Math.sin(ang), -len / 2 + 0.07 + (k * (len - 0.14)) / Math.max(1, obstacles - 1));
    g.add(s);
  }
  S.scene.add(g);
  return { group: g, body: bodyMat, bands: bandMats };
}

/** 3B noktaya bağlı ekran etiketi (kamera hareketinde nesneyle gider). label(id, html, x, y, z, {size, opacity}). */
export function projLabel(S) {
  const p = new THREE.Vector3();
  return (id, html, wx, wy, wz, { size = 5.2, opacity = 1 } = {}) => {
    p.set(wx, wy, wz).project(S.camera);
    S.text(id, html, { x: (p.x * 0.5 + 0.5) * 100, y: (0.5 - p.y * 0.5) * 100, size, opacity, maxWidth: 40, nowrap: true });
  };
}

/**
 * Anahtar karelerle yumuşak kamera. keys: [[t, açı(rad), mesafe, yükselme(derece), hedefX, hedefZ, hedefY?], ...].
 * camRig(S, keys) → cam(t); her karede çağır.
 */
export function camRig(S, keys, { y = 0.1 } = {}) {
  const tgt = new THREE.Vector3();
  return (t) => {
    let i = 0; while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
    const a = keys[i], b = keys[i + 1], p = easeInOut(seg(t, a[0], b[0]));
    const v = a.map((x, k) => lerp(x, b[k] ?? x, p));
    const el = (v[3] * Math.PI) / 180, D = v[2], ty = v[6] ?? y;
    S.camera.position.set(v[4] + D * Math.cos(el) * Math.sin(v[1]), ty + D * Math.sin(el), v[5] + D * Math.cos(el) * Math.cos(v[1]));
    S.camera.lookAt(tgt.set(v[4], ty, v[5]));
    S.camera.updateMatrixWorld();
  };
}
