// boru.js — hidrolik benzetme: pompalı kapalı boru (002 2. sürüm → 003 2. sürüm, ikinci kullanımda taşındı).
import { THREE, RoundedBoxGeometry } from './stage.js';
import { roundedLoop, canvasTex } from './parcalar.js';

/**
 * pipeLoop(S, {PX, Qt(t), pinch(t), v}) → {group, glassMat, wMat, ring, XP, ZP, YP, curve, update(t)}.
 * Kapalı cam boru (x = PX merkezli): pompa ön kenarda, çark arkada, daralma sol kenarda, debi göstergesi sağda.
 * Qt(t): debi 0..1 (pompa/çark hızı ve parçacık akışı bununla orantılı); pinch(t): daralma 0..1; v: tam debide akış hızı.
 * Parçacık yolu ve açılar artımlı integralle hesaplanır (kareler sırayla istenmeli; geri gidilirse sıfırlanır).
 */
export function pipeLoop(S, { PX = 0, Qt = () => 1, pinch = () => 0, v = 1.1 } = {}) {
  // kapalı boru: pompa (ön), çark (arka), daralma (sol kenar), debi göstergesi (sağ kenar, geniş kısım)
  const g = new THREE.Group(); g.position.set(PX, 0, 0); S.scene.add(g);
  const XP = 0.85, ZP = 1.2, YP = 0.26, RP = 0.13;
  const curve = new THREE.CatmullRomCurve3(roundedLoop([[XP, 0], [XP, -ZP], [-XP, -ZP], [-XP, ZP], [XP, ZP]], { r: 0.3 }).map(([x, z]) => new THREE.Vector3(x, YP, z)), true, 'centripetal');
  curve.arcLengthDivisions = 3000;
  const L = curve.getLength();
  const TS = 700, RS = 28;
  const geo = new THREE.TubeGeometry(curve, TS, RP, RS, true);
  const base = geo.attributes.position.array.slice();
  const centers = Array.from({ length: TS + 1 }, (_, i) => curve.getPointAt((i / TS) % 1));
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, roughness: 0.06, transparent: true, opacity: 0.2, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false, emissive: 0x2f6fff, emissiveIntensity: 0 });
  const tube = new THREE.Mesh(geo, glassMat); tube.renderOrder = 2; g.add(tube);
  // daralma merkezi: sol kenar ortası
  let uc = 0, bd = 1e9; const tmp = new THREE.Vector3();
  for (let i = 0; i < 3000; i++) { curve.getPointAt(i / 3000, tmp); const d = (tmp.x + XP) ** 2 + tmp.z ** 2; if (d < bd) { bd = d; uc = i / 3000; } }
  const wU = 0.32 / L;
  const du = (u) => { let d = Math.abs(u - uc); return Math.min(d, 1 - d); };
  const rf = (u, p) => 1 - 0.62 * p * Math.exp(-((du(u) / wU) ** 2));
  let lastP = -1;
  const shape = (p) => {
    if (Math.abs(p - lastP) < 1e-4) return; lastP = p;
    const a = geo.attributes.position.array;
    for (let i = 0; i <= TS; i++) {
      const f = rf(i / TS, p), c = centers[i];
      for (let j = 0; j <= RS; j++) { const k = (i * (RS + 1) + j) * 3; a[k] = c.x + (base[k] - c.x) * f; a[k + 1] = c.y + (base[k + 1] - c.y) * f; a[k + 2] = c.z + (base[k + 2] - c.z) * f; }
    }
    geo.attributes.position.needsUpdate = true; geo.computeVertexNormals();
  };
  // su parçacıkları
  const NP = 130, R = S.rng(31);
  const wMat = new THREE.MeshPhysicalMaterial({ color: 0x7cc8ff, emissive: 0x3f9bff, emissiveIntensity: 0.8, roughness: 0.25, clearcoat: 1 });
  const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.03, 10, 8), wMat, NP); g.add(im);
  const P = Array.from({ length: NP }, (_, k) => ({ s: (k / NP) * L + R() * 0.03, r: Math.sqrt(R()) * 0.75 * RP, a: R() * 6.283 }));
  const frame = new THREE.Vector3(), nrm = new THREE.Vector3(), bin = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), pv = new THREE.Vector3();
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
  let tt = 0;
  const step = (t) => { // ds/dt = v0·Q / rf² (daralmada yerel olarak hızlı)
    if (t < tt) { tt = 0; P.forEach((p, k) => { p.s = (k / NP) * L; }); }
    const dt = 1 / 120;
    while (tt + dt <= t) { const v0 = v * Qt(tt), pp = pinch(tt); for (const p of P) { const u = (p.s / L) % 1, f = rf(u, pp); p.s += (v0 / (f * f)) * dt; } tt += dt; }
  };
  // pompa (ön kenar ortası): gövde + dönen pervane
  const pump = new THREE.Group(); pump.position.set(0, 0, ZP); g.add(pump);
  const housing = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.42, 0.42, 3, 0.05), new THREE.MeshPhysicalMaterial({ color: 0x2c5f8a, roughness: 0.35, clearcoat: 0.6 }));
  housing.position.y = 0.21; housing.castShadow = true; pump.add(housing);
  const rotor = new THREE.Group(); rotor.position.y = 0.44; pump.add(rotor);
  for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.03, 0.06, 2, 0.01), S.M.steel); b.rotation.y = (k * Math.PI) / 4; rotor.add(b); }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 20), S.M.gold); hub.position.y = 0.44; pump.add(hub);
  // çark (arka kenar ortası): eksen z, alt yarısı boruda
  const wheel = new THREE.Group(); wheel.position.set(0, YP + 0.05, -ZP); g.add(wheel);
  const wMatW = new THREE.MeshPhysicalMaterial({ color: 0xffb02e, emissive: 0xff9a1f, emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.35 });
  for (let k = 0; k < 8; k++) { const b = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.2, 0.12, 2, 0.008), wMatW); const a = (k * Math.PI) / 4; b.position.set(0.11 * Math.sin(a), 0.11 * Math.cos(a), 0); b.rotation.z = -a; wheel.add(b); }
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.36, 12), S.M.steel); axle.rotation.x = Math.PI / 2; wheel.add(axle);
  const box = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.32, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, roughness: 0.06, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
  box.rotation.x = Math.PI / 2; box.position.set(0, YP + 0.05, -ZP); box.renderOrder = 2; g.add(box);
  // debi göstergesi (sağ kenar, geniş kısım): kadran + ibre
  const gauge = new THREE.Group(); gauge.position.set(XP - 0.45, 0, 0.1); g.add(gauge);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12), S.M.steel); post.position.y = 0.15; gauge.add(post);
  const dialTex = canvasTex(256, 256, (c, w, h) => {
    c.fillStyle = '#e9e6de'; c.beginPath(); c.arc(128, 128, 124, 0, 6.283); c.fill();
    c.strokeStyle = '#2b2e33'; c.lineWidth = 6;
    for (let k = 0; k <= 6; k++) { const a = Math.PI * (0.85 + 1.3 * k / 6); c.beginPath(); c.moveTo(128 + 86 * Math.cos(a), 128 + 86 * Math.sin(a)); c.lineTo(128 + 110 * Math.cos(a), 128 + 110 * Math.sin(a)); c.stroke(); }
  });
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 40), [new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, roughness: 0.4 }), new THREE.MeshBasicMaterial({ map: dialTex }), new THREE.MeshPhysicalMaterial({ color: 0x2b2e33 })]);
  dial.position.y = 0.33; dial.rotation.x = 0.5; gauge.add(dial);
  const needlePivot = new THREE.Group(); needlePivot.position.set(0, 0.33, 0); needlePivot.rotation.x = 0.5; gauge.add(needlePivot);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.15), new THREE.MeshBasicMaterial({ color: 0xd8342c })); needle.position.set(0, 0.03, -0.075); const nh = new THREE.Group(); nh.add(needle); needlePivot.add(nh);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.012, 8, 48), new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0, transparent: true, opacity: 0 }));
  ring.rotation.x = -Math.PI / 2 + 0.5; ring.position.y = 0.335; gauge.add(ring);
  let ang = 0, angT = 0;
  return {
    group: g, glassMat, wMat, ring, uc, XP, ZP, YP, curve,
    update(t) {
      const p = pinch(t); shape(p); step(t);
      for (let k = 0; k < NP; k++) {
        const pt = P[k], u = (pt.s / L) % 1, f = rf(u, p);
        curve.getPointAt(u, frame); curve.getTangentAt(u, nrm); bin.crossVectors(nrm, up).normalize();
        pv.copy(frame).addScaledVector(up, pt.r * f * Math.sin(pt.a)).addScaledVector(bin, pt.r * f * Math.cos(pt.a));
        m4.compose(pv, q, one); im.setMatrixAt(k, m4);
      }
      im.instanceMatrix.needsUpdate = true;
      // çark ve pompa açısı: debiyle orantılı (artımlı integral)
      if (t < angT) { ang = 0; angT = 0; }
      while (angT + 1 / 120 <= t) { ang += 5.0 * Qt(angT) / 120; angT += 1 / 120; }
      wheel.rotation.z = -ang; rotor.rotation.y = ang * 1.3;
      nh.rotation.y = 0; needlePivot.rotation.set(0.5, 0, 0); needlePivot.rotateY(1.1 - 2.2 * Qt(t));
    },
  };
}

