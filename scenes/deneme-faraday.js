// Deneme sahnesi: Mıknatıs bobine girince akım oluşur (Faraday yasası).
// Fizik: bobindeki akı Φ(y) mıknatısın konumuna bağlı; indüklenen gerilim ε = −N·dΦ/dt.
// Mıknatıs girerken ve çıkarken dΦ/dt zıt işaretlidir → akım yön değiştirir; dururken akım sıfırdır.
// Ters paralel iki LED: biri bir yönde, diğeri öbür yönde yanar.

import { clamp, seg, easeInOut, easeOut, fade, lerp } from '../tools/lib/stage.js';

const T_IN = [2.6, 4.6], T_OUT = [6.6, 8.6];
const Y_UP = 2.4, Y_IN = 0.9; // mıknatıs merkezinin yüksekliği: yukarıda / bobinin ortasında

export const meta = {
  title: 'Mıknatısı bobine sokarsan ne olur?',
  duration: 12,
  fps: 30,
  music: { bpm: 90, key: 'A', gain: 0.75 },
  cues: [
    { t: 0.15, kind: 'whoosh', gain: 0.6 },
    { t: T_IN[0], kind: 'swoosh', gain: 0.8 },
    { t: 3.5, kind: 'pop', gain: 0.7 },
    { t: T_IN[1], kind: 'thud', gain: 0.6 },
    { t: T_OUT[0], kind: 'swoosh', gain: 0.8 },
    { t: 7.5, kind: 'pop', gain: 0.7 },
    { t: 8.8, kind: 'ding', gain: 0.8 },
  ],
};

// mıknatısın y konumu (zamanın fonksiyonu)
function magnetY(t) {
  if (t < T_IN[0]) return Y_UP;
  if (t < T_IN[1]) return lerp(Y_UP, Y_IN, easeInOut(seg(t, ...T_IN)));
  if (t < T_OUT[0]) return Y_IN;
  return lerp(Y_IN, Y_UP, easeInOut(seg(t, ...T_OUT)));
}
// bobinin içinden geçen akı (eksen üzerindeki dipol yaklaşımı, normalize)
const flux = (y) => 1 / Math.pow(1 + Math.pow((y - Y_IN) / 0.75, 2), 1.5);
// indüklenen akım ∝ −dΦ/dt (sayısal türev)
const current = (t) => { const h = 1 / 240; return -(flux(magnetY(t + h)) - flux(magnetY(t - h))) / (2 * h); };
// akan yüklerin aldığı yol = akımın zaman integrali
function travelled(t) { let s = 0; const dt = 1 / 120; for (let x = 0; x < t; x += dt) s += current(x) * dt; return s; }

// Bağımsız kontrol: mıknatıs dururken akım 0, giriş ve çıkışta zıt işaretli
console.assert(Math.abs(current(5.5)) < 1e-9, 'durağanken akım sıfır olmalı');
console.assert(current(3.6) * current(7.6) < 0, 'giriş ve çıkış akımları zıt yönlü olmalı');

export function build(S) {
  const { THREE, M } = S;
  S.table({ seed: 11 });

  // dikey bobin
  const coil = S.coil({ turns: 11, radius: 0.42, length: 1.6, wire: 0.038, axis: 'y', center: [0, 0.95, 0] });
  // bobinin altında yalıtkan makara (beyaz plastik halkalar)
  for (const y of [0.1, 1.8]) {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.05, 48), M.plasticWhite);
    ring.position.y = y; ring.castShadow = ring.receiveShadow = true; S.scene.add(ring);
  }

  // baskılı devre ve iki ters paralel LED
  S.pcb({ size: [0.9, 0.06, 0.55], position: [1.15, 0.03, -0.35] });
  const red = S.led({ position: [0.98, 0.06, -0.3], color: 0xff2a1a });
  const green = S.led({ position: [1.32, 0.06, -0.3], color: 0x22ff66 });

  // bağlantı kabloları (bobinin uçlarından karta)
  const a = coil.start, b = coil.end;
  const leadA = S.wire([a, [a.x + 0.2, 0.07, a.z - 0.05], [0.75, 0.08, -0.3], [0.98, 0.1, -0.4]], { radius: 0.03 });
  const leadB = S.wire([b, [b.x + 0.25, b.y + 0.05, b.z - 0.05], [0.95, 1.3, -0.2], [1.3, 0.6, -0.35], [1.32, 0.1, -0.4]], { radius: 0.03 });

  // akan yükler (eşit hızla: her eğride yol/uzunluk)
  const qCoil = S.charges(coil.curve, { count: 64, radius: 0.07 });
  const qA = S.charges(leadA.curve, { count: 8, radius: 0.06 });
  const qB = S.charges(leadB.curve, { count: 14, radius: 0.06 });
  const L = { coil: coil.curve.getLength(), a: leadA.curve.getLength(), b: leadB.curve.getLength() };

  // mıknatıs
  const magnet = S.magnet({ length: 0.95, size: 0.3, position: [0, Y_UP, 0], axis: 'y' });

  const SPEED = 2.2; // görsel ölçek: 1 birim akım → saniyede ~2,2 birim yol

  return (t) => {
    // kamera: yavaş yörünge + hafif yaklaşma
    const ang = lerp(-0.42, 0.28, easeInOut(seg(t, 0, meta.duration)));
    const dist = lerp(7.4, 6.4, easeOut(seg(t, 0, 9)));
    S.orbit([0.45, 1.6, -0.05], ang, dist + 0.4, 1.0);

    magnet.position.y = magnetY(t);
    const i = current(t);
    const s = travelled(t) * SPEED;
    const qa = 0.35 + 0.65 * clamp(Math.abs(i) * 2.5);
    qCoil.update(s / L.coil, qa);
    qA.update(s / L.a, qa);
    qB.update(-s / L.b, qa);
    red.set(clamp(-i * 3));
    green.set(clamp(i * 3));

    // yazılar
    S.text('kanca', 'Mıknatısı bobine<br>sokarsan <span class="hl">ne olur?</span>', { y: 10, size: 7.2, opacity: fade(t, 0, 2.7, 0.3) });
    S.text('s1', 'Hareket ediyor →<br><span class="rd">akım var!</span>', { y: 10, size: 7.2, opacity: fade(t, 2.7, 4.8) });
    S.text('s2', 'Mıknatıs durdu →<br><span class="hl">akım yok</span>', { y: 10, size: 7.2, opacity: fade(t, 4.8, 6.7) });
    S.text('s3', 'Geri çekince akım<br><span class="gr">ters yönde!</span>', { y: 10, size: 7.2, opacity: fade(t, 6.7, 8.8) });
    const fp = fade(t, 8.8, 12.5);
    S.text('f1', 'ε = −N · <span class="hl">ΔΦ</span> / Δt', { y: 9.5, size: 9.6, maxWidth: 98, nowrap: true, opacity: fp, scale: lerp(0.9, 1, easeOut(seg(t, 8.8, 9.3))) });
    S.text('f2', 'Akımı mıknatıs değil,<br><span class="hl">hareket</span> üretir.', { y: 18, size: 6.2, weight: 700, opacity: fade(t, 9.4, 12.5) });
    S.text('etiket', '<span class="sm">Faraday yasası</span>', { y: 4, size: 5, opacity: fp });
  };
}
