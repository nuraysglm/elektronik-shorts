// Ders 1 Bolum 2 - Parca 5: akimdan yuke, integral ve alan; sabit akim; Bolum 1 sinamasi; isaret (metin.md [PARCA 5])
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, arrow, frame, erase, axes, curve, kose, baslik, under, pulse, pad, shade, kutu } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  let g = 'a';
  baslik('3. Akımdan yük', 200, S(0) + 0.1, { g, dur: 0.7 });
  text('Bölüm 1\'de yükten akıma: i = dq / dt', L, 300, 40, G, S(1) + 0.2, { g, dur: 1.6 });
  text('Şimdi akımdan yüke', L, 370, 46, B, S(2), { g, dur: 0.8 });
  // genel akim egrisi (sag sutun)
  const f = (v) => 3.2 + 2.2 * Math.sin(v * 0.62 + 0.4) + 0.12 * v;
  const ax = axes({ box: [1080, 300, 1760, 740], xr: [0, 10], yr: [0, 7], xt: [], yt: [], xl: 't', yl: 'i', t: S(3), g, dt: 0.4 });
  curve(f, 0, 9.5, ax, B, 5, ax.end + 0.1, 1.2, { g });
  // ince serit
  const strip = (a, w, t0, gg, col = B) => path([[[ax.X(a), ax.Y(0)], [ax.X(a), ax.Y(f(a))], [ax.X(a + w), ax.Y(f(a))], [ax.X(a + w), ax.Y(0)]]], col, 3, t0, 0.5, { g: gg });
  strip(4.4, 0.35, Wt(8, 'ince'), g, R);
  text('i', ax.X(4.4) - 30, ax.Y(f(4.4) / 2) + 10, 38, R, S(9), { g, dur: 0.12 });
  text('dt', ax.X(4.57), ax.Y(0) + 42, 34, R, S(11), { g, align: 'c', dur: 0.25 });
  text('dq = i × dt', L, 460, 56, B, S(7) + 0.2, { g, dur: 1.0 });
  for (const [k, a] of [[0, 0.6], [1, 1.8], [2, 3.0], [3, 5.6], [4, 6.8]]) strip(a, 0.35, Wt(12, 'bütün') + k * 0.6, g);
  text('t_1', ax.X(8), ax.Y(0) + 42, 34, K, Wt(12, 'te'), { g, align: 'c', dur: 0.2 });
  line([ax.X(8), ax.Y(0) - 8], [ax.X(8), ax.Y(0) + 8], K, 3, Wt(12, 'te') + 0.3, 0.1, { g });
  const q = text('q = ∫_0^t`1 i dt', L, 600, 84, B, S(14), { g, dur: 1.4 });
  frame(pad(q.box, 12), R, E(14) - 0.4, 0.6, { g, lw: 3 });
  // alan
  const pts = [[ax.X(0), ax.Y(0)]]; for (let i = 0; i <= 60; i++) { const v = 8 * i / 60; pts.push([ax.X(v), ax.Y(f(v))]); } pts.push([ax.X(8), ax.Y(0)]);
  shade(pts, B, Wt(16, 'altında'), 1.6, { g });
  const ya = text('- Yük = alan', L, 710, 52, K, Wt(16, 'alandır'), { g, dur: 0.6 });
  pulse(pad(ya.box, 4), B, E(16), E(16) + 2.5, { g });
  text('Pilin mAh\'i de bir alan (akım × süre)', L, 790, 38, G, Wt(17, 'pil'), { g, dur: 1.5 });
  erase(g, S(19) - 0.1);
  // ---------------- B: sabit akim (19-26)
  g = 'b';
  baslik('Sabit akım', 200, S(19) + 0.05, { g, dur: 0.6 });
  const g2 = 'gr';
  const bx = axes({ box: [1100, 300, 1700, 700], xr: [0, 3.6], yr: [0, 5], xt: [0, 1, 2, 3], yt: [2, 4], xl: 't (s)', yl: 'i (mA)', t: S(20), g: g2, skip0x: true, dt: 0.35 });
  console.assert(Math.abs(bx.Y(4) - (700 - 4 / 5 * 400)) < 0.01, 'Y(4)');
  const lt = Math.max(bx.end + 0.1, S(21));
  path([[[bx.X(0), bx.Y(4)], [bx.X(3), bx.Y(4)], [bx.X(3), bx.Y(0)]]], B, 6, lt, 0.7, { g: g2 });
  text('4 mA', L, 300, 46, B, Wt(22, 'dört'), { g, dur: 0.4 });
  text('3 s', L + 200, 300, 46, B, Wt(22, 'üç'), { g, dur: 0.3 });
  shade([[bx.X(0), bx.Y(0)], [bx.X(0), bx.Y(4)], [bx.X(3), bx.Y(4)], [bx.X(3), bx.Y(0)]], B, S(23), 1.2, { g: g2 });
  text('Alan = yükseklik × genişlik', L, 380, 46, K, S(23), { g, dur: 1.3 });
  text('q = 4 mA × 3 s = 12 mC', L, 470, 56, B, S(24), { g, dur: 1.3 });
  text('mA × s = mC', L, 545, 40, G, S(25) + 0.1, { g, dur: 0.6 });
  erase(g, S(27) - 0.1);
  // ---------------- C: Bolum 1 sinamasi (27-33)
  g = 'c';
  baslik('Bölüm 1 ile sınama', 200, S(27) + 0.05, { g, dur: 0.8 });
  text('Bölüm 1: q = 2t² mC, i = 4t mA', L, 300, 44, G, Wt(28, 'orada'), { g, dur: 1.4 });
  text('∫ 4t dt = 4t² / 2 = 2t²', L, 390, 52, B, S(30), { g, dur: 1.4 });
  text('∫_0^3 4t dt = 2 × 3² − 2 × 0² = 18 − 0 = 18 mC', L, 480, 44, B, S(31), { g, dur: 2.2 });
  text('Bölüm 1\'deki 18 mC ile aynı', L, 560, 40, G, S(32) + 0.1, { g, dur: 1.0 });
  const tv = text('- Türev ve integral birbirinin tersi', L, 650, 48, K, S(33), { g, dur: 1.3 });
  under(tv, B, E(33) - 0.1, 0.4, { g });
  erase(g2, S(34) - 0.1);
  // ---------------- D: isaret (34-39): sag sutunda kroki
  g = 'd';
  baslik('İşaret', 200, S(34) + 0.05, { g, x: RX + 100, dur: 0.4 });
  const dx = axes({ box: [1100, 300, 1700, 560], xr: [0, 3], yr: [-3, 2], xt: [], yt: [], xl: 't', yl: 'i', t: S(34), g, dt: 0.35 });
  path([[[dx.X(0), dx.Y(0)], [dx.X(0), dx.Y(-2)], [dx.X(2), dx.Y(-2)], [dx.X(2), dx.Y(0)]]], R, 5, Wt(35, 'altına'), 0.6, { g });
  shade([[dx.X(0), dx.Y(0)], [dx.X(0), dx.Y(-2)], [dx.X(2), dx.Y(-2)], [dx.X(2), dx.Y(0)]], R, S(36), 1.0, { g });
  text('−', (dx.X(0) + dx.X(2)) / 2, dx.Y(-1) + 18, 64, R, S(36) + 0.2, { g, align: 'c', dur: 0.15 });
  text('Eksen altındaki alan eksi sayılır', RX + 100, 650, 40, G, S(36) + 0.5, { g, dur: 1.2 });
  text('Yük okun tersine geçiyor', RX + 100, 710, 40, G, S(37), { g, dur: 1.0 });
  text('(−2 mA) × 2 s = −4 mC', RX + 100, 790, 48, R, Wt(38, 'iki', 1), { g, dur: 1.2 });
  kutu('mA × ms = μC', L, 770, 52, B, Wt(40, 'miliamperi'), { g, dur: 0.8 });
}
