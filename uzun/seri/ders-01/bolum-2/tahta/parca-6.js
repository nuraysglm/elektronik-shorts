// Ders 1 Bolum 2 - Parca 6: ornek - rampa, sabit ve ters yonlu akim; alanlarla net yuk; ortalama; zamanin yarisi (metin.md [PARCA 6])
import { K, B, R, G, GR, L, RX, S, E, Wt, text, path, line, dashed, arrow, dot, erase, axes, kose, baslik, under, oval, shade, kutu } from './motor.js';
const ia = (t) => (t <= 2 ? 3 * t : t <= 5 ? 6 : t <= 8 ? -2 : 0);
export function build() {
  kose(0, { sabit: true });
  console.assert(ia(1) === 3 && ia(2) === 6 && ia(6) === -2, 'i(t) kontrol');
  baslik('Örnek', 200, S(0) + 0.1, { g: 'b0', dur: 0.4 });
  // kucuk tel + referans oku (grafigin ustunde)
  let g = 'gr';
  line([1300, 255], [1620, 255], K, 5, S(4), 0.35, { g });
  arrow(1410, 225, 1510, 225, B, S(4) + 0.45, 0.3, { g, lw: 5, head: 14 });
  text('i', 1525, 235, 38, B, Wt(4, 'ok'), { g, dur: 0.12 });
  const ax = axes({ box: [1080, 340, 1760, 740], xr: [0, 8.6], yr: [-3, 7], xt: [0, 1, 2, 3, 4, 5, 6, 7, 8], yt: [-2, 2, 4, 6], xl: 't (ms)', yl: 'i (mA)', t: 0.5, g, skip0x: true, fs: 30, dt: 0.3, xtdx: 18 });
  console.assert(Math.abs(ax.Y(6) - (740 - 9 / 10 * 400)) < 0.01, 'Y(6)');
  const P = (t, v) => [ax.X(t), ax.Y(v)];
  path([[P(0, 0), P(2, 6)]], B, 6, Math.max(ax.end + 0.1, Wt(1, 'doğrusal')), 0.5, { g });
  path([[P(2, 6), P(5, 6)]], B, 6, Wt(2, 'altı'), 0.5, { g });
  dashed(P(5, 6), P(5, -2), GR, 2, Wt(3, 'yön'), 0.3, { g, dash: 9, gap: 8 });
  path([[P(5, -2), P(8, -2)]], B, 6, Wt(3, 'eksi'), 0.5, { g });
  // soru
  g = 'q';
  text('- 0–2 ms: 0\'dan 6 mA\'e doğrusal', L, 300, 44, B, Wt(1, 'akım'), { g, dur: 1.4 });
  text('- 2–5 ms: 6 mA', L, 370, 44, B, S(2), { g, dur: 0.7 });
  text('- 5–8 ms: −2 mA', L, 440, 44, B, S(3), { g, dur: 0.7 });
  text('0–8 ms net q = ?', L, 540, 56, B, Wt(4, 'net'), { g, dur: 0.9 });
  erase(g, S(5));
  // parcalar
  g = 'p';
  const e = (s, y, c, t, d) => text(s, L, y, 38, c, t, { g, dur: d });
  shade([P(0, 0), P(2, 6), P(2, 0)], B, S(6), 0.8, { g: 'gr' });
  text('1', ax.X(1.45), ax.Y(1.5) + 12, 40, K, S(6) + 0.2, { g: 'gr', align: 'c', dur: 0.12 });
  e('1. Üçgen: (2 ms × 6 mA) / 2 = 12 / 2 = 6 μC', 300, K, Wt(8, 'taban'), 2.0);
  shade([P(2, 0), P(2, 6), P(5, 6), P(5, 0)], B, S(11), 0.8, { g: 'gr' });
  text('2', ax.X(3.5), ax.Y(3) + 12, 40, K, S(11) + 0.2, { g: 'gr', align: 'c', dur: 0.12 });
  e('2. Dikdörtgen: (5 − 2) ms × 6 mA = 3 × 6 = 18 μC', 370, K, S(12), 2.2);
  shade([P(5, 0), P(5, -2), P(8, -2), P(8, 0)], R, S(15), 0.8, { g: 'gr' });
  text('3', ax.X(6.75), ax.Y(-2) + 44, 40, R, S(15) + 0.2, { g: 'gr', align: 'c', dur: 0.12 });
  e('3. Dikdörtgen: (8 − 5) ms × (−2 mA) = 3 × (−2) = −6 μC', 440, R, S(16), 2.4);
  text('Yük okun tersine', L, 500, 34, G, S(19), { g, dur: 0.7 });
  e('q(5 ms) = 6 + 18 = 24 μC', 580, B, S(21), 1.2);
  const q8 = text('q(8 ms) = 24 − 6 = 18 μC', L, 660, 46, B, S(22), { g, dur: 1.2 });
  oval(q8.box, R, E(22) - 0.55, 0.6, { g }); // is emri N: cember tamamlanir, sonuc >= 1,0 sn gorunur (parcalar.json ara 1,0 sn)
  erase(g, S(23) - 0.1);
  // ortalama
  g = 'o';
  text('Ortalama = 18 μC / 8 ms = 2,25 mA', L, 300, 44, K, S(24), { g, dur: 1.6 });
  dashed(P(0, 2.25), P(8, 2.25), GR, 3, Wt(24, 'iki'), 0.6, { g, dash: 12, gap: 9 });
  text('Ortalama', ax.X(6.5), ax.Y(2.25) - 14, 32, G, Wt(24, 'yirmi'), { g, align: 'c', dur: 0.4 });
  text('Akım hiçbir aralıkta 2,25 mA\'de kalmıyor', L, 370, 38, G, S(25) + 0.3, { g, dur: 1.5 });
  text('Pil ömrü de ortalamayla', L, 430, 38, G, S(27), { g, dur: 1.0 });
  // zamanin yarisi
  g = 'z';
  path([[P(0, 0), P(1, 3), P(1, 0)]], '#0d3a8a', 4, S(29) + 0.2, 0.6, { g });
  shade([P(0, 0), P(1, 3), P(1, 0)], '#0d3a8a', S(29) + 0.9, 0.5, { g, alpha: 0.35 });
  dot(P(1, 3), 8, R, Wt(29, 'ortasında'), { g });
  text('3 mA', 1092, 430, 32, R, Wt(29, 'ortasında') + 0.3, { g, dur: 0.3 });
  const z = (s, y, c, t, d) => text(s, L, y, 38, c, t, { g, dur: d });
  z('Artış hızı = 6 mA / 2 ms = 3 mA / ms', 500, K, S(31), 1.6);
  z('i(1 ms) = 3 mA / ms × 1 ms = 3 mA', 565, K, S(32), 1.5);
  z('q(1 ms) = (1 ms × 3 mA) / 2 = 1,5 μC', 630, K, S(33), 1.6);
  const db = text('1,5 / 6 = 0,25 = dörtte bir', L, 695, 38, K, S(36), { g, dur: 1.2 });
  under(db, R, Wt(37, 'dörtte'), 0.35, { g });
  kutu('Zamanın yarısında yükün dörtte biri', L, 785, 42, B, S(41), { g, dur: 1.4 });
}
