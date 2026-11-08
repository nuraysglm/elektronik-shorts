// devre.js — 002'de yazılıp 003'te ikinci kez gereken parçalar (AGENT.md bölüm 3: ikinci kullanımda tools/lib'e taşı).
import { THREE } from './stage.js';

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
