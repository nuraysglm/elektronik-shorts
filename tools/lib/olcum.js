// Ölçü aletleri ve ayarlı güç kaynağı (005 → 007 → 008b: ikinci kullanımda taşındı).
import { THREE, RoundedBoxGeometry } from './stage.js';
import { canvasTex } from './parcalar.js';

// lcd(w, h, renk) → {tex, set(metin, renk?)} — değişen sayı göstergesi dokusu (aynı metinde yeniden çizmez)
export function lcd(w, h, color) {
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

// meter(S, 'A' | 'V', renk, {w, d}) → {group, show} — masa üstü ölçü aleti (sarı kasa, LCD, sembol)
export function meter(S, letter, color, { w = 0.6, d = 0.42 } = {}) {
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

// psu(S, {y}) → {group, show, knob, glow} — ayarlı güç kaynağı (x ekseninde, + ucu +x, uç yüksekliği y), sarı V ekranı + düğme
export function psu(S, { y = 0.2 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.42, 0.5, 4, 0.04), new THREE.MeshPhysicalMaterial({ color: 0x2b2f36, roughness: 0.42, clearcoat: 0.4 }));
  body.position.y = 0.21; body.castShadow = body.receiveShadow = true; g.add(body);
  const show = lcd(512, 220, '#ffd23f');
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.215), new THREE.MeshBasicMaterial({ map: show.tex }));
  scr.rotation.x = -Math.PI / 2; scr.position.set(-0.12, 0.422, 0.02); g.add(scr);
  const knob = new THREE.Group();
  const kb = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.07, 32), new THREE.MeshPhysicalMaterial({ color: 0x15171a, roughness: 0.35, clearcoat: 0.6 })); kb.position.y = 0.035; knob.add(kb);
  const mark = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 0.07), new THREE.MeshBasicMaterial({ color: 0xffd23f })); mark.position.set(0, 0.075, -0.04); knob.add(mark);
  knob.position.set(0.3, 0.42, 0.02); g.add(knob);
  const glow = new THREE.MeshPhysicalMaterial({ color: 0xff5a4f, emissive: 0xff3b30, emissiveIntensity: 0.3, roughness: 0.4 });
  const tP = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 20), glow); tP.rotation.z = Math.PI / 2; tP.position.set(0.53, y, 0); g.add(tP);
  const tN = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 20), new THREE.MeshPhysicalMaterial({ color: 0x1b1d21, roughness: 0.4 })); tN.rotation.z = Math.PI / 2; tN.position.set(-0.53, y, 0); g.add(tN);
  const pm = (txt, col, x) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), new THREE.MeshBasicMaterial({ transparent: true,
    map: canvasTex(128, 128, (k) => { k.fillStyle = col; k.font = '900 120px "InterDisplay", sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillText(txt, 64, 70); }) }));
    m.rotation.x = -Math.PI / 2; m.position.set(x, 0.423, 0.17); g.add(m); };
  pm('+', '#ff5a4f', 0.42); pm('−', '#6fb2ff', -0.42);
  S.scene.add(g); return { group: g, show, knob, glow };
}
