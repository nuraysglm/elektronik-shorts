// Parca 6: Ornek 3 — q = (6t - t^2) mC; yuk en buyukken akim sifir (metin.md [PARCA 6]). Abone karti 0,25-6,25 sn (ayri katman).
// Is emri D (19.11.2026): yeni tahta duzeni
import { K, B, R, GR, G, L, S, E, Wt, text, row, path, line, dashed, frame, under, erase, oval, pulse, pad, axes, dot, curve, mark, kose, baslik } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  mark('abone', 0.25);
  const g = 'o3';
  baslik('Örnek 3', 175, S(0) + 0.05, { g, size: 56, dur: 0.5 });
  text('q(t) = (6t − t²) mC', L, 245, 52, K, Wt(1, 'kü'), { g, dur: 1.3 });
  text('0 ≤ t ≤ 4 s', 600, 245, 40, G, Wt(2, 'sıfır'), { g, dur: 0.6 });
  const qq = text('t = 3 s anında: q = ?, i = ?', L, 325, 48, B, Wt(4, 'üç'), { g, dur: 1.6 });
  oval(qq.box, R, S(5) + 0.1, 1.3, { g });
  row(L, 410, 44, [{ s: 'q(3 s) = 6 × 3 − 3²', t: S(7), dur: 0.9 }, { s: '= 18 − 9', t: S(8) + 0.2, dur: 0.6 }, { s: '= 9 mC', t: Wt(9, 'yük'), dur: 0.6 }], { g });
  text('En büyük', 820, 410, 40, R, S(10) + 0.2, { g, dur: 0.6 });
  text('q(2,5 s) = 6 × 2,5 − 2,5² = 15 − 6,25 = 8,75 mC', L, 490, 40, K, S(12) + 0.1, { g: 'chk', dur: 1.6 });
  text('q(3,5 s) = 6 × 3,5 − 3,5² = 21 − 12,25 = 8,75 mC', L, 550, 40, K, Wt(12, 'üç'), { g: 'chk', dur: 1.6 });
  text('İki yanda daha küçük, tepe 3 s', L, 610, 40, G, Wt(13, 'tepe') - 0.6, { g: 'chk', dur: 1.2 });
  erase('chk', S(21) - 0.1);
  const XR = 1000;
  row(XR, 175, 52, [{ s: 'i = dq / dt', t: S(16), dur: 0.8, color: B }, { s: '= (6 − 2t) mA', t: Wt(17, 'altı', 1), dur: 1.0, color: B }], { g });
  const i0 = text('i(3 s) = 6 − 6 = 0 mA', XR, 255, 52, B, Wt(18, 'altıdan'), { g, dur: 1.4 });
  oval(i0.box, R, S(20), 0.5, { g });
  // grafik
  const ax = axes({ box: [190, 520, 860, 770], xr: [0, 4.4], yr: [0, 10], xt: [0, 1, 2, 3, 4], yt: [2, 4, 6, 8, 10], xl: 't (s)', yl: 'q (mC)', t: S(21), g, dt: 0.3, fs: 32 });
  const q = (t) => 6 * t - t * t;
  for (const [a, b] of [[0, 0], [1, 5], [3, 9], [4, 8]]) if (q(a) !== b) throw new Error('q kontrol ' + a);
  curve(q, 0, 4, ax, B, 5, ax.end + 0.05, 1.0, { g });
  dot([ax.X(3), ax.Y(9)], 9, K, ax.end + 1.2, { g });
  const tan = (a, col, tt, w = 0.45, gg = g) => { const m = 6 - 2 * a, lo = Math.max(0, a - w), hi = Math.min(4.4, a + w); return line([ax.X(lo), ax.Y(q(a) + m * (lo - a))], [ax.X(hi), ax.Y(q(a) + m * (hi - a))], col, 4, tt, 0.4, { g: gg }); };
  const lo = 2.2, hi = 3.8;
  dashed([ax.X(lo), ax.Y(9)], [ax.X(hi), ax.Y(9)], R, 4, Wt(23, 'teğet'), 0.5, { g });
  text('eğim = 0', ax.X(3), ax.Y(9) - 22, 36, R, Wt(23, 'eğim'), { g, align: 'c', dur: 0.4 });
  tan(1, K, Wt(26, 'bir'));
  dot([ax.X(1), ax.Y(5)], 7, B, Wt(26, 'bir') + 0.5, { g });
  text('i(1 s) = 6 − 2 × 1', ax.X(1.25), ax.Y(3.3), 32, B, Wt(26, 'iki'), { g, dur: 0.8 });
  text('= 4 mA', ax.X(1.25), ax.Y(3.3) + 36, 32, B, Wt(26, 'dört'), { g, dur: 0.4 });
  tan(4, R, Wt(27, 'dört'), 0.4);
  dot([ax.X(4), ax.Y(8)], 7, R, Wt(27, 'dört') + 0.5, { g });
  text('i(4 s) = 6 − 2 × 4', 640, ax.Y(4.2), 32, R, Wt(27, 'iki'), { g, dur: 0.8 });
  text('= −2 mA', 640, ax.Y(4.2) + 36, 32, R, Wt(27, 'eksi'), { g, dur: 0.4 });
  text('Eksi işaret: yük ters yönde geçiyor', XR, 340, 44, R, S(30), { g, dur: 1.4 });
  tan(0, K, Wt(34, 'başlangıçta'), 0.45);
  text('i(0) = 6 − 2 × 0 = 6 mA', ax.X(0.2), ax.Y(8.4), 32, B, Wt(34, 'te') , { g, dur: 1.0 });
  text('q(0) = 0', ax.X(0.2), ax.Y(6.7), 32, K, S(35) + 0.2, { g, dur: 0.4 });
  text('Yük sıfırken akım en büyük,', XR, 430, 46, K, S(37), { g, dur: 1.2 });
  text('yük en büyükken akım sıfır', XR, 495, 46, K, Wt(37, 'yük', 1), { g, dur: 1.2 });
  text('q(4 s) = 6 × 4 − 4² = 24 − 16 = 8 mC', XR, 580, 46, K, S(39) + 0.2, { g, dur: 2.0 });
  text('8 mC / 4 s = 2 mA', XR, 648, 46, K, S(40), { g, dur: 1.1 });
  text('Ortalama, farklı değerleri tek sayıya sıkıştırır', XR, 712, 38, G, Wt(41, 'dört'), { g, dur: 1.8 });
  const tz = text('Yük en büyükken akım sıfır olabilir', XR, 785, 44, R, Wt(43, 'tuzak'), { g, dur: 1.5 });
  frame(pad(tz.box, 8), R, S(44), 0.5, { g, lw: 3 });
}
