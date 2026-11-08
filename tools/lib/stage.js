// stage.js — Elektronik Shorts için ortak 3D sahne kütüphanesi (three.js r185).
//
// Her sahne dosyası (scenes/*.js veya wip/<id>/scene.js) şu şekli dışa aktarır:
//   export const meta = { title, duration, fps?, cues: [{t, kind, gain?}], music?: {...} }
//   export function build(S) { ...nesneleri kur...; return (t) => { ...t saniyesindeki durumu ayarla... } }
// S = createStage(...) ile gelen yardımcılar. Zaman deterministiktir: Date, Math.random,
// requestAnimationFrame KULLANMA. Rastgelelik için S.rng(seed) kullan.

import * as THREE from '../vendor/three/three.module.min.js';
import { RoomEnvironment } from '../vendor/three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from '../vendor/three/addons/geometries/RoundedBoxGeometry.js';

export { THREE, RoundedBoxGeometry };

// ------------------------------------------------------------------ yardımcı matematik
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const seg = (t, a, b) => (b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a)));
export const easeOut = (p) => 1 - Math.pow(1 - clamp(p), 3);
export const easeInOut = (p) => { p = clamp(p); return p * p * (3 - 2 * p); };
export const lerp = (a, b, p) => a + (b - a) * p;
/** t_in'de belirip t_out'ta kaybolan opaklık. */
export const fade = (t, tin, tout, d = 0.35) => easeOut(seg(t, tin, tin + d)) * (1 - easeOut(seg(t, tout - d, tout)));

export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ------------------------------------------------------------------ malzemeler
export function materials() {
  const M = THREE;
  return {
    copper: new M.MeshPhysicalMaterial({ color: 0xc8744a, metalness: 1, roughness: 0.28, clearcoat: 0.4, clearcoatRoughness: 0.25 }),
    copperDark: new M.MeshPhysicalMaterial({ color: 0x9a5434, metalness: 1, roughness: 0.38 }),
    steel: new M.MeshPhysicalMaterial({ color: 0xc9ccd1, metalness: 1, roughness: 0.22 }),
    iron: new M.MeshPhysicalMaterial({ color: 0x6f747b, metalness: 0.9, roughness: 0.55 }),
    gold: new M.MeshPhysicalMaterial({ color: 0xe0b45a, metalness: 1, roughness: 0.25 }),
    solder: new M.MeshPhysicalMaterial({ color: 0xd9dde2, metalness: 1, roughness: 0.18 }),
    magnetN: new M.MeshPhysicalMaterial({ color: 0xc8302c, metalness: 0.2, roughness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
    magnetS: new M.MeshPhysicalMaterial({ color: 0x2c5fc8, metalness: 0.2, roughness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
    pcb: new M.MeshPhysicalMaterial({ color: 0x1f6b3a, metalness: 0.1, roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.3 }),
    plasticBlack: new M.MeshPhysicalMaterial({ color: 0x1b1d21, metalness: 0, roughness: 0.4, clearcoat: 0.3 }),
    plasticWhite: new M.MeshPhysicalMaterial({ color: 0xeeeeea, metalness: 0, roughness: 0.45 }),
    insulationRed: new M.MeshPhysicalMaterial({ color: 0xb3261e, metalness: 0, roughness: 0.5, clearcoat: 0.2 }),
    insulationBlack: new M.MeshPhysicalMaterial({ color: 0x202226, metalness: 0, roughness: 0.5, clearcoat: 0.2 }),
    // cam: transmission KULLANMA (işlemcide kare süresini 3 katına çıkarır); saydamlık + parlak kaplama yeterli
    glass: new M.MeshPhysicalMaterial({ color: 0xdfe8ee, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.28, clearcoat: 1, clearcoatRoughness: 0.02 }),
  };
}

/** Akım/yük küresi: kendinden parlak. */
export function chargeMaterial(color = 0xe8231a, intensity = 0.55) {
  return new THREE.MeshPhysicalMaterial({ color, emissive: color, emissiveIntensity: intensity, metalness: 0, roughness: 0.25, clearcoat: 1 });
}

// ------------------------------------------------------------------ prosedürel dokular
function woodTexture(seed = 7, size = 1024) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const r = rng(seed);
  const img = g.createImageData(size, size);
  const phase = Array.from({ length: 6 }, () => r() * Math.PI * 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      const plank = Math.floor(v * 6);
      const pv = v * 6 - plank;
      const warp = 0.02 * Math.sin(u * 7 + phase[(plank % 5) + 1]) + 0.01 * Math.sin(u * 23 + phase[0]);
      const ring = Math.sin((pv + warp) * 14 + plank * 1.7 + 3 * Math.sin(u * 2.2 + phase[plank % 6]));
      const fine = Math.sin((pv + warp * 3) * 70 + u * 4 + phase[3]) * 0.5;
      const seam = pv < 0.012 || pv > 0.988 ? -0.35 : 0;
      const k = 0.5 + 0.22 * ring + 0.07 * fine + seam + (plank % 2 ? 0.05 : -0.04);
      const i = (y * size + x) * 4;
      img.data[i] = 88 + 80 * k;
      img.data[i + 1] = 52 + 48 * k;
      img.data[i + 2] = 28 + 24 * k;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/** Mat yüzey için çok hafif, düşük kontrastlı gürültü dokusu (renk çarpanı ~0,9–1,0). */
function matteTexture(seed = 7, size = 512) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d'); const r = rng(seed);
  const img = g.createImageData(size, size);
  for (let i = 0; i < size * size; i++) { const k = 232 + r() * 23; img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = k; img.data[i * 4 + 3] = 255; }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(6, 6);
  return tex;
}

// ------------------------------------------------------------------ sahne
/**
 * createStage({canvas, overlay, width, height})
 * Dönen S nesnesi: THREE, scene, camera, renderer, M (malzemeler), table(), coil(), wire(),
 * charges(), magnet(), text(), render().
 */
export function createStage({ canvas, overlay, width, height, background = 0x15171c, antialias = true }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(32, width / height, 0.05, 100);

  // Stüdyo ışıkları: anahtar (gölgeli), dolgu, arka kenar ışığı
  const key = new THREE.DirectionalLight(0xfff1e0, 2.6);
  key.position.set(3.5, 6, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
  key.shadow.radius = 4;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.6);
  fill.position.set(-4, 3, 2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.4);
  rim.position.set(-2, 4, -5);
  scene.add(rim);

  const M = materials();

  const S = {
    THREE, scene, camera, renderer, M, lights: { key, fill, rim }, rng, width, height,

    /**
     * Masa yüzeyi. Varsayılan: mat koyu gri-kahve, hafif doku (AGENT.md bölüm 4; karartma/gradyan yok).
     * wood: true → eski ahşap doku. color: mat yüzey rengi.
     */
    table({ size = 14, y = 0, seed = 7, wood = false, color = 0x2a2724 } = {}) {
      const mat = wood
        ? new THREE.MeshPhysicalMaterial({ map: (() => { const t = woodTexture(seed); t.repeat.set(1.4, 1.4); return t; })(), roughness: 0.55, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.4 })
        : new THREE.MeshPhysicalMaterial({ color, map: matteTexture(seed), roughness: 0.85, metalness: 0 });
      const top = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
      top.rotation.x = -Math.PI / 2;
      top.position.y = y;
      top.receiveShadow = true;
      scene.add(top);
      scene.fog = new THREE.Fog(background, size * 0.45, size * 0.85);
      return top;
    },

    /** Eksen boyunca sarmal bobin. Dönüş: {mesh, curve} — curve yük animasyonu içindir. */
    coil({ turns = 12, radius = 0.45, length = 1.6, wire = 0.045, axis = 'x', center = [0, 0.6, 0], material = M.copper, segmentsPerTurn = 48 } = {}) {
      const pts = [];
      const n = turns * segmentsPerTurn;
      for (let i = 0; i <= n; i++) {
        const a = (i / segmentsPerTurn) * Math.PI * 2;
        const s = -length / 2 + (length * i) / n;
        const p = axis === 'x' ? new THREE.Vector3(s, radius * Math.sin(a), radius * Math.cos(a))
          : axis === 'y' ? new THREE.Vector3(radius * Math.cos(a), s, radius * Math.sin(a))
          : new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), s);
        pts.push(p.add(new THREE.Vector3(...center)));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, n * 2, wire, 12, false), material);
      mesh.castShadow = mesh.receiveShadow = true;
      scene.add(mesh);
      return { mesh, curve, start: pts[0].clone(), end: pts[pts.length - 1].clone() };
    },

    /** Noktalardan geçen yumuşak kablo (yalıtımlı ya da çıplak). */
    wire(points, { radius = 0.03, material = M.copper, tension = 0.5 } = {}) {
      const curve = new THREE.CatmullRomCurve3(points.map((p) => (p.isVector3 ? p : new THREE.Vector3(...p))), false, 'catmullrom', tension);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(64, points.length * 24), radius, 10, false), material);
      mesh.castShadow = true;
      scene.add(mesh);
      return { mesh, curve };
    },

    /**
     * Bir eğri boyunca eşit aralıklı, akan yük küreleri.
     * Dönen nesnede update(offset, opacity) — offset: eğri uzunluğu cinsinden kayma (0..1 döngüsel).
     */
    charges(curve, { count = 40, radius = 0.05, color = 0xe8231a, intensity = 0.55 } = {}) {
      const mat = chargeMaterial(color, intensity);
      mat.transparent = true;
      const mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(radius, 20, 14), mat, count);
      mesh.castShadow = true;
      scene.add(mesh);
      const m = new THREE.Matrix4();
      const update = (offset = 0, opacity = 1) => {
        mat.opacity = opacity;
        mesh.visible = opacity > 0.01;
        for (let k = 0; k < count; k++) {
          let u = (k / count + offset) % 1;
          if (u < 0) u += 1;
          m.makeTranslation(curve.getPointAt(u));
          mesh.setMatrixAt(k, m);
        }
        mesh.instanceMatrix.needsUpdate = true;
      };
      update(0, 1);
      return { mesh, update, material: mat };
    },

    /** Kırmızı (N) / mavi (S) çubuk mıknatıs; harfler kabartma etiket. */
    magnet({ length = 1.4, size = 0.32, position = [0, 0.6, 0], axis = 'x' } = {}) {
      const g = new THREE.Group();
      const half = new RoundedBoxGeometry(length / 2, size, size, 4, 0.03);
      const n = new THREE.Mesh(half, M.magnetN);
      const s = new THREE.Mesh(half, M.magnetS);
      n.position.x = length / 4; s.position.x = -length / 4;
      n.castShadow = s.castShadow = true;
      g.add(n, s);
      const label = (txt, x) => {
        const c = document.createElement('canvas'); c.width = 256; c.height = 256;
        const k = c.getContext('2d');
        k.fillStyle = 'rgba(255,255,255,0.92)';
        k.font = '900 190px "InterDisplay", sans-serif';
        k.textAlign = 'center'; k.textBaseline = 'middle';
        k.fillText(txt, 128, 140);
        const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
        const p = new THREE.Mesh(new THREE.PlaneGeometry(size * 0.75, size * 0.75), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
        p.position.set(x, 0, size / 2 + 0.002);
        g.add(p);
      };
      label('N', length / 4); label('S', -length / 4);
      if (axis === 'y') g.rotation.z = Math.PI / 2;
      g.position.set(...position);
      scene.add(g);
      return g;
    },

    /** 5 mm LED: plastik gövde, iki bacak. on 0..1 parlama. */
    led({ position = [0, 0, 0], color = 0xff2a2a } = {}) {
      const g = new THREE.Group();
      const domeMat = new THREE.MeshPhysicalMaterial({ color, emissive: color, emissiveIntensity: 0, roughness: 0.12, metalness: 0, transparent: true, opacity: 0.88, clearcoat: 1, clearcoatRoughness: 0.05 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.2, 32), domeMat);
      body.position.y = 0.32;
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
      dome.position.y = 0.42;
      const rimMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.03, 32), domeMat);
      rimMesh.position.y = 0.22;
      const legA = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.24, 8), M.solder);
      const legB = legA.clone();
      legA.position.set(-0.05, 0.1, 0); legB.position.set(0.05, 0.1, 0);
      const light = new THREE.PointLight(color, 0, 2.5, 2);
      light.position.y = 0.45;
      for (const o of [body, dome, rimMesh, legA, legB]) { o.castShadow = true; g.add(o); }
      g.add(light);
      g.position.set(...position);
      scene.add(g);
      return {
        group: g,
        set(on) { domeMat.emissiveIntensity = 3.5 * on; light.intensity = 3 * on; },
      };
    },

    /** İnce baskılı devre kartı. */
    pcb({ size = [1.6, 0.06, 1.0], position = [0, 0.03, 0] } = {}) {
      const m = new THREE.Mesh(new RoundedBoxGeometry(...size, 3, 0.02), M.pcb);
      m.position.set(...position);
      m.castShadow = m.receiveShadow = true;
      scene.add(m);
      return m;
    },

    /** Kamerayı yerleştir: pozisyon ve bakış noktası. */
    look(pos, target) {
      camera.position.set(...pos);
      camera.lookAt(new THREE.Vector3(...target));
    },

    /** Bir hedef etrafında yörünge: açı (radyan), yarıçap, yükseklik. */
    orbit(target, angle, radius, height) {
      camera.position.set(target[0] + radius * Math.sin(angle), target[1] + height, target[2] + radius * Math.cos(angle));
      camera.lookAt(new THREE.Vector3(...target));
    },

    /** HTML yazı katmanı (Türkçe karakterler için). id ile tekrar çağrılır. */
    text(id, html, { x = 50, y = 12, size = 6.2, color = '#ffffff', weight = 900, opacity = 1, align = 'center', maxWidth = 92, scale = 1, font = 'InterDisplay', nowrap = false } = {}) {
      let el = overlay.querySelector(`[data-id="${id}"]`);
      if (!el) {
        el = document.createElement('div');
        el.dataset.id = id;
        el.className = 'ovl';
        overlay.appendChild(el);
      }
      if (el.dataset.html !== html) { el.innerHTML = html; el.dataset.html = html; }
      el.style.cssText = `left:${x}%;top:${y}%;font-size:${size}vw;color:${color};font-weight:${weight};` +
        `opacity:${opacity};width:${maxWidth}%;white-space:${nowrap ? 'nowrap' : 'normal'};text-align:${align};font-family:"${font}",sans-serif;` +
        `transform:translate(-50%,-50%) scale(${scale});display:${opacity > 0.003 ? 'block' : 'none'}`;
      return el;
    },

    render() { renderer.render(scene, camera); },
  };
  return S;
}
