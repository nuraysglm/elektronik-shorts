// kaynaklar.js — gerçek hayat gerilim kaynakları (003 1. sürüm → 2. sürüm, ikinci kullanımda taşındı).
import { THREE, RoundedBoxGeometry } from './stage.js';
import { canvasTex } from './parcalar.js';

/** textTex(yazı, {w,h,color,bg,size}) — tek satır yazı dokusu; topPlane(doku, w, h, y) — yere yatık yazı düzlemi. */
export const textTex = (txt, { w = 512, h = 200, color = '#ffffff', bg = null, size = 120 } = {}) => canvasTex(w, h, (c, W, H) => {
  if (bg) { c.fillStyle = bg; c.fillRect(0, 0, W, H); }
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${size}px "InterDisplay", sans-serif`; c.fillStyle = color; c.fillText(txt, W / 2, H / 2 + 6);
});
export const topPlane = (tex, w, h, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); m.rotation.x = -Math.PI / 2; m.position.y = y; return m; };

/** AA kalem pil (1,5 V), x ekseninde, + ucu +x, alt yüzey y=0 → {group}. */
export function aaCell(S, { len = 0.9, r = 0.15 } = {}) {
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

/** Telefon pili (3,7 V) → {group}. */
export function phoneCell(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.05, 0.4, 3, 0.015), new THREE.MeshPhysicalMaterial({ color: 0x9aa0a8, metalness: 0.7, roughness: 0.35 }));
  body.position.y = 0.025; body.castShadow = true; g.add(body);
  g.add(topPlane(textTex('3,7 V', { color: '#20242a', size: 130 }), 0.42, 0.16, 0.052));
  for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.06), S.M.gold); c.position.set(0.27, 0.056, -0.08 + k * 0.08); g.add(c); }
  S.scene.add(g); return { group: g };
}

/** Şarj adaptörü (5 V) → {group}. */
export function adapter(S) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.3, 0.34, 4, 0.05), S.M.plasticWhite);
  body.position.y = 0.15; body.castShadow = true; g.add(body);
  for (const s of [-1, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.18, 14), S.M.steel); p.rotation.x = Math.PI / 2; p.position.set(s * 0.08, 0.15, -0.26); g.add(p); }
  const usb = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.01), S.M.plasticBlack); usb.position.set(0, 0.15, 0.172); g.add(usb);
  g.add(topPlane(textTex('5 V', { color: '#20242a', size: 150 }), 0.26, 0.1, 0.302));
  S.scene.add(g); return { group: g };
}

/** Araba aküsü (12 V) → {group}. */
export function carBattery(S) {
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

