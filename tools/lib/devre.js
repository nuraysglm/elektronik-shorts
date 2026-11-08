// devre.js — ikinci kez gereken parçalar (AGENT.md bölüm 3: ikinci kullanımda tools/lib'e taşı).
import { THREE, RoundedBoxGeometry } from './stage.js';

/** Ampul: makeBulb(S, {scale}) → {group, set(parlaklık 0..1)}. Taban y=0, cam küre ~0,52·scale yükseklikte. */
export function makeBulb(S, { scale = 1 } = {}) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.12, 32), new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, roughness: 0.5 }));
  base.position.y = 0.06; base.castShadow = true; g.add(base);
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.2, 32), S.M.steel);
  screw.position.y = 0.22; g.add(screw);
  for (let k = 0; k < 4; k++) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.106, 0.012, 8, 32), S.M.steel); r.rotation.x = Math.PI / 2; r.position.y = 0.15 + k * 0.045; g.add(r); }
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xf2efe6, roughness: 0.05, transparent: true, opacity: 0.3, clearcoat: 1, emissive: 0xffb02e, emissiveIntensity: 0, depthWrite: false });
  const glass = new THREE.Mesh(new THREE.SphereGeometry(0.26, 40, 28), glassMat);
  glass.position.y = 0.52; glass.renderOrder = 3; g.add(glass);
  const filMat = new THREE.MeshPhysicalMaterial({ color: 0x553322, emissive: 0xffa53a, emissiveIntensity: 0, roughness: 0.4 });
  const pts = []; for (let i = 0; i <= 120; i++) { const a = i / 120 * Math.PI * 10; pts.push(new THREE.Vector3(-0.09 + 0.18 * i / 120, 0.55 + 0.018 * Math.sin(a), 0.018 * Math.cos(a))); }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, 0.006, 6), filMat));
  for (const s of [-1, 1]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 6), S.M.solder); leg.position.set(s * 0.09, 0.43, 0); g.add(leg); }
  const light = new THREE.PointLight(0xffb85c, 0, 4, 2); light.position.y = 0.55; g.add(light);
  g.scale.setScalar(scale);
  S.scene.add(g);
  return { group: g, set(on) { filMat.emissiveIntensity = 0.05 + 9 * on; glassMat.emissiveIntensity = 2.2 * on * on; glassMat.opacity = 0.3 + 0.5 * on; light.intensity = 9 * on * scale; } };
}

/** Mini model platformu (yuvarlak kaide): platform(S, x, z) → mesh (üst yüzey y=0,08). */
export function platform(S, x, z, { r = 0.42 } = {}) {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.04, 0.08, 48), new THREE.MeshPhysicalMaterial({ color: 0x3a3631, roughness: 0.6, clearcoat: 0.2 }));
  p.position.set(x, 0.04, z); p.receiveShadow = p.castShadow = true; S.scene.add(p); return p;
}

// ---- 002 (1. sürüm) sahnesinden, ikinci kullanımda (002 2. sürüm) taşındı
/** Bıçaklı anahtar (z ekseninde): makeSwitch(S, {gap, y}) → {group, set(c: 1 kapalı, 0 açık)}. Menteşe z=+gap/2. */
export function makeSwitch(S, { gap: SW_GAP = 0.55, y: Y = 0.2 } = {}) {
  // bıçaklı anahtar, z ekseninde: menteşe z=+GAP/2, kontak z=−GAP/2
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.05, SW_GAP + 0.26, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x1d2025, roughness: 0.45, clearcoat: 0.3 }));
  plate.position.y = 0.025; plate.receiveShadow = plate.castShadow = true; g.add(plate);
  for (const z of [SW_GAP / 2, -SW_GAP / 2]) { const post = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.2, 0.08, 2, 0.015), S.M.copper); post.position.set(0, 0.13, z); post.castShadow = true; g.add(post); }
  const pivot = new THREE.Group(); pivot.position.set(0, Y + 0.02, SW_GAP / 2); g.add(pivot);
  const blade = new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.04, SW_GAP + 0.04, 2, 0.012), S.M.gold);
  blade.position.z = -SW_GAP / 2; blade.castShadow = true; pivot.add(blade);
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16), new THREE.MeshPhysicalMaterial({ color: 0xb3261e, roughness: 0.4, clearcoat: 0.5 }));
  knob.position.set(0, 0.07, -SW_GAP - 0.01); pivot.add(knob);
  S.scene.add(g);
  return { group: g, set(c) { pivot.rotation.x = (1 - c) * 1.0; } };
}
/** Isıtıcı teli / elektrikli soba mini modeli: heater(S) → {group, hot (kızaran tel malzemesi)}. */
export function heater(S) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.08, 0.28, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: 0xe9e4da, roughness: 0.6 }));
  base.position.y = 0.04; base.castShadow = true; g.add(base);
  const hot = new THREE.MeshPhysicalMaterial({ color: 0x8a4a2a, metalness: 0.6, roughness: 0.4, emissive: 0xff5a1a, emissiveIntensity: 0 });
  const pts = []; for (let i = 0; i <= 600; i++) { const a = i / 600 * Math.PI * 2 * 16; pts.push(new THREE.Vector3(-0.26 + 0.52 * i / 600, 0.17 + 0.06 * Math.sin(a), 0.06 * Math.cos(a))); }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 1200, 0.011, 6), hot));
  for (const s of [-1, 1]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.14, 12), S.M.steel); post.position.set(s * 0.28, 0.12, 0); g.add(post); }
  S.scene.add(g);
  return { group: g, hot };
}
/** Ütü mini modeli: iron(S) → {group}. */
export function iron(S) {
  const g = new THREE.Group();
  const sh = new THREE.Shape(); sh.moveTo(-0.3, -0.16); sh.lineTo(0.12, -0.16); sh.quadraticCurveTo(0.34, -0.1, 0.36, 0); sh.quadraticCurveTo(0.34, 0.1, 0.12, 0.16); sh.lineTo(-0.3, 0.16); sh.lineTo(-0.3, -0.16);
  const plate = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.035, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 }), S.M.steel);
  plate.rotation.x = -Math.PI / 2; plate.position.y = 0.01; plate.castShadow = true; g.add(plate);
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }), new THREE.MeshPhysicalMaterial({ color: 0x2f6fbf, roughness: 0.3, clearcoat: 0.8 }));
  body.rotation.x = -Math.PI / 2; body.scale.set(0.92, 0.88, 1); body.position.y = 0.06; body.castShadow = true; g.add(body);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 12, 32, Math.PI), new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.4 }));
  handle.position.set(-0.02, 0.19, 0); g.add(handle);
  S.scene.add(g); return { group: g };
}
/** Su ısıtıcısı mini modeli: kettle(S) → {group}. */
export function kettle(S) {
  // su ısıtıcısı (içinde direnç teli olan cihaz): taban, gövde, kulp, ağız, kapak
  const g = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({ color: 0xeeeeea, roughness: 0.35, clearcoat: 0.6 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x1d2025, roughness: 0.4 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.05, 40), dark); base.position.y = 0.025; base.castShadow = true; g.add(base);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.36, 40), white); body.position.y = 0.23; body.castShadow = true; g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.04, 40), white); lid.position.y = 0.43; g.add(lid);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 10), dark); knob.position.y = 0.46; g.add(knob);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 12, 28, Math.PI), dark); handle.rotation.z = -Math.PI / 2; handle.position.set(-0.16, 0.24, 0); g.add(handle);
  const spout = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 16, 1, true), white); spout.rotation.z = -Math.PI / 2.6; spout.position.set(0.19, 0.36, 0); g.add(spout);
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff8a3a })); led.position.set(0.1, 0.1, 0.12); g.add(led);
  S.scene.add(g); return { group: g };
}
