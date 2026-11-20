// Türev Short d1b1-2: "Yük en büyükken akım ne olur?" (Ders 1 - Bölüm 1, parça 6 cümle 1, 4-10, 15-20, 22-24; uzun videoda Örnek 3)
// Uzun videodaki tahta (parca-6.js) dikey 1080x1920 düzende yeniden çizildi; grafik bütün Short boyunca kalır, üst bölge bir kez silinir.
import { K, B, R, G, L, S, E, Wt, text, row, line, dashed, frame, under, erase, oval, pulse, pad, axes, dot, curve } from './motor.js';
import { kart } from './ortak.js';
export function build(o) {
  // ---------------- A: soru ve yük (parça 6, cümle 1-10)
  let g = 'a';
  text('Yük en büyükken', L, 330, 76, K, 0, { g, kart: true });
  text('akım ne olur?', L, 430, 76, R, 0, { g, kart: true });
  text('Kesitten geçen net yük:', L, 530, 48, G, S('6.1') + 0.3, { g, dur: 1.1 });
  text('q(t) = (6t − t²) mC', L, 620, 66, B, Wt('6.1', 'kü'), { g, dur: 1.4 });
  text('t = 3 s anında: q = ?, i = ?', L, 712, 56, B, Wt('6.4', 'üç'), { g, dur: 1.6 });
  // grafik ekseni (soru üstüne düşünürken çizilir; cümle 5)
  const gg = 'gr';
  const ax = axes({ box: [200, 1000, 790, 1250], xr: [0, 4.4], yr: [0, 10], xt: [1, 2, 3, 4], yt: [9], xl: 't (s)', yl: 'q (mC)', t: S('6.5') - 0.3, g: gg, dt: 0.3, fs: 38, skip0x: true });
  const q = (t) => 6 * t - t * t;
  for (const [a, b] of [[0, 0], [1, 5], [3, 9], [4, 8]]) if (q(a) !== b) throw new Error('q kontrol ' + a);
  row(L, 800, 54, [{ s: '6 × 3 = 18', t: Wt('6.7', 'on'), dur: 0.7 }, { s: '   3² = 9', t: Wt('6.8', 'dokuz'), dur: 0.6 }], { g });
  text('q(3 s) = 18 − 9 = 9 mC', L, 885, 56, K, S('6.9') + 0.1, { g, dur: 1.3 });
  curve(q, 0, 4, ax, B, 5, S('6.10'), 1.0, { g: gg });
  dot([ax.X(3), ax.Y(9)], 9, K, S('6.10') + 1.1, { g: gg });
  text('En büyük: 9 mC', ax.X(3), ax.Y(9) - 40, 42, R, S('6.10') + 1.3, { g: gg, align: 'c', dur: 0.6 });
  erase(g, S('6.15') - 0.12);
  // ---------------- B: akım (cümle 15-24); grafik kalır
  g = 'b';
  row(L, 300, 60, [{ s: 'i = dq / dt', t: S('6.15'), dur: 0.8, color: B }, { s: '= (6 − 2t) mA', t: Wt('6.17', 'altı', 1), dur: 1.0, color: B }], { g });
  text('6t’nin türevi 6, t²’nin türevi 2t', L, 385, 48, G, S('6.16') + 0.1, { g, dur: 1.8 });
  const i0 = text('i(3 s) = 6 − 2 × 3 = 0 mA', L, 480, 56, B, Wt('6.18', 'iki'), { g, dur: 1.5 });
  oval(i0.box, R, Wt('6.18', 'sıfır'), 0.6, { g });
  const yz = text('Yük en büyükken akım sıfır', L, 590, 56, R, S('6.20'), { g, dur: 1.3 });
  frame(pad(yz.box, 8), R, E('6.20') - 0.2, 0.5, { g, lw: 3 });
  pulse([ax.X(3) - 22, ax.Y(9) - 22, ax.X(3) + 22, ax.Y(9) + 22], R, Wt('6.22', 'tepe'), E('6.22') + 0.3, { g });
  dashed([ax.X(2.2), ax.Y(9)], [ax.X(3.8), ax.Y(9)], R, 4, Wt('6.23', 'teğet'), 0.5, { g });
  text('Tepede teğet yatay: eğim = 0', L, 690, 52, R, Wt('6.23', 'eğim'), { g, dur: 1.1 });
  const hz = text('Akım = yükün değişme hızı', L, 785, 56, B, S('6.24') + 0.2, { g, dur: 1.2 });
  under(hz, B, E('6.24') - 1.1, 0.4, { g });
  erase(g, o.kartBas); erase(gg, o.kartBas);
  kart(o, 'k');
}
