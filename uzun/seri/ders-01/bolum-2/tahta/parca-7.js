// Ders 1 Bolum 2 - Parca 7: istenen akimi veren devre (iki kol, iki anahtar), alanla toplam yuk (metin.md [PARCA 7])
// Parca 7'nin sesinde 29,77 sn'de 1,5 sn sessizlik var (ses_hazirla.sh); kalem bu sirada uc maddenin etrafini yavasca cizer.
import { K, B, R, G, GR, L, RX, S, E, Wt, text, path, line, dashed, arrow, dot, erase, axes, kose, baslik, oval, shade, zig, union } from './motor.js';
const ist = (t) => (t < 1 ? 0 : t < 3 ? 2 : t < 4 ? 6 : 0);
export function build() {
  kose(0, { sabit: true });
  console.assert(ist(0.5) === 0 && ist(2) === 2 && ist(3.5) === 6 && ist(4.5) === 0, 'istenen akim');
  baslik('İstenen akımı veren devre', 200, S(0) + 0.1, { g: 'b0', dur: 1.0 });
  // istenen grafik (sag ust)
  let g = 'gr';
  const ax = axes({ box: [1120, 290, 1700, 440], xr: [0, 5.5], yr: [0, 7], xt: [0, 1, 2, 3, 4, 5], yt: [2, 4, 6], xl: 't (s)', yl: 'i (mA)', t: S(1), g, skip0x: true, fs: 30, dt: 0.3 });
  const P = (t, v) => [ax.X(t), ax.Y(v)];
  path([[P(0, 0), P(1, 0)]], B, 6, Wt(4, 'sıfır'), 0.3, { g });
  dashed(P(1, 0), P(1, 2), GR, 2, Wt(5, 'bir') + 0.1, 0.15, { g, dash: 7, gap: 6 });
  path([[P(1, 2), P(3, 2)]], B, 6, Wt(5, 'iki'), 0.4, { g });
  dashed(P(3, 2), P(3, 6), GR, 2, Wt(6, 'üç') + 0.2, 0.2, { g, dash: 7, gap: 6 });
  path([[P(3, 6), P(4, 6)]], B, 6, Wt(6, 'altı'), 0.3, { g });
  dashed(P(4, 6), P(4, 0), GR, 2, Wt(7, 'dört'), 0.25, { g, dash: 7, gap: 6 });
  path([[P(4, 0), P(5.3, 0)]], B, 6, Wt(7, 'sıfır'), 0.3, { g });
  text('Bataryadan çekilecek', RX, 520, 36, G, S(8), { g: 'gr2', dur: 0.8 });
  // eldekiler
  g = 'el';
  const m1 = text('- 12 V batarya', L, 300, 48, K, Wt(9, 'on'), { g, dur: 0.7 });
  text('- 2 direnç', L, 380, 48, K, Wt(9, 'direnç'), { g, dur: 0.5 });
  const m3 = text('- 2 anahtar', L, 460, 48, K, Wt(9, 'anahtar'), { g, dur: 0.5 });
  oval(union(m1.box, m3.box), R, Wt(10, 'nasıl'), 3.4, { g });
  erase(g, S(11)); erase('gr2', S(11));
  // devre: batarya x 200 (y 320..680), ust tel y 320, alt tel y 680, kollar x 520 ve 820
  g = 'dv';
  const t0 = S(12);
  path([[[200, 480], [200, 320], [820, 320]]], K, 5, t0, 0.6, { g });
  line([160, 480], [240, 480], K, 5, t0 + 0.7, 0.15, { g });
  line([180, 510], [220, 510], K, 8, t0 + 0.95, 0.12, { g });
  path([[[200, 510], [200, 680], [820, 680]]], K, 5, t0 + 1.15, 0.6, { g });
  text('+', 142, 470, 40, K, t0 + 1.85, { g, dur: 0.12 });
  text('12 V', 232, 545, 40, K, t0 + 2.05, { g, dur: 0.35 });
  const kol = (x, t, ad, r, gs) => {
    dot([x, 320], 8, K, t, { g }); line([x, 320], [x, 370], K, 5, t + 0.2, 0.15, { g }); dot([x, 370], 7, K, t + 0.4, { g });
    line([x, 470], [x + 55, 385], K, 5, t + 0.55, 0.3, { g: gs });
    dot([x, 470], 7, K, t + 0.95, { g }); line([x, 470], [x, 500], K, 5, t + 1.1, 0.1, { g });
    path([zig([x, 500], [x, 630], 110, 18)], K, 5, t + 1.3, 0.5, { g }); line([x, 630], [x, 680], K, 5, t + 1.9, 0.12, { g }); dot([x, 680], 8, K, t + 2.1, { g });
    text(ad, x - 180, 430, 32, K, t + 2.3, { g, dur: 0.5 }); text(r, x + 30, 575, 38, K, t + 2.9, { g, dur: 0.35 });
  };
  kol(520, S(13), '1. anahtar', '6 kΩ', 'a1');
  kol(820, S(14), '2. anahtar', '2 kΩ', 'a2');
  arrow(260, 290, 360, 290, B, S(15), 0.35, { g, lw: 5, head: 14 });
  text('i', 372, 298, 40, B, S(15) + 0.45, { g, dur: 0.12 });
  text('Hiçbir an ikisi birden kapalı değil', L, 790, 34, G, S(15) + 0.7, { g: 'nt', dur: 1.2 });
  // direnc degerleri
  g = 'r';
  const rr = (s, y, c, t, d, z = 40) => text(s, 1180, y, z, c, t, { g, dur: d });
  rr('R = v / i', 540, K, S(18), 0.6);
  rr('R = 12 V / 2 mA = 6 kΩ', 600, B, S(19), 1.2);
  rr('R = 12 V / 6 mA = 2 kΩ', 660, B, S(20), 1.2);
  rr('V / mA = kΩ', 720, G, S(21), 0.6, 34);
  erase(g, S(22) - 0.1); erase('nt', S(22) - 0.1);
  text('1. anahtar: 1 s\'de kapanır, 3 s\'de açılır', L, 745, 30, G, S(22) + 0.1, { g: 'z', dur: 1.3 });
  text('2. anahtar: 3 s\'de kapanır, 4 s\'de açılır', L, 795, 30, G, S(22) + 1.5, { g: 'z', dur: 1.3 });
  // adim adim
  g = 's';
  const sx = (s, y, c, t, d) => text(s, 1180, y, 38, c, t, { g, dur: d });
  sx('1 s\'ye kadar: i = 0', 540, K, S(25), 0.8);
  erase('a1', S(26) + 0.3);
  line([520, 370], [520, 470], K, 5, S(26) + 0.45, 0.25, { g: 'k1' });
  sx('1 ile 3 s arası: i = 12 V / 6 kΩ = 2 mA', 600, B, S(28), 1.7);
  text('2. kol açık, i = 0', 870, 650, 30, G, S(29), { g: 'k2n', dur: 0.8 });
  erase('k1', S(31) + 0.3); erase('k2n', S(31) + 0.3); erase('a2', S(31) + 0.9);
  line([520, 470], [575, 385], K, 5, S(31) + 0.45, 0.3, { g: 'a1b' });
  line([820, 370], [820, 470], K, 5, Wt(31, 'ikinci') + 0.2, 0.25, { g: 'k2' });
  sx('3 ile 4 s arası: i = 12 V / 2 kΩ = 6 mA', 660, B, S(33), 1.7);
  erase('k2', S(34) + 0.3);
  line([820, 470], [875, 385], K, 5, S(34) + 0.45, 0.3, { g: 'a2b' });
  sx('4 s\'den sonra: i = 0', 720, K, S(35), 0.8);
  text('12 V', 565, 462, 30, B, Wt(36, 'on'), { g: 'v12', dur: 0.3 });
  text('12 V', 865, 462, 30, B, Wt(36, 'volt'), { g: 'v12', dur: 0.3 });
  text('Açık devre örneğindeki gibi', 1180, 790, 34, G, S(37), { g, dur: 1.0 });
  erase(g, S(38) - 0.1);
  // toplam yuk
  g = 'q';
  shade([P(1, 0), P(1, 2), P(3, 2), P(3, 0)], B, Wt(39, 'ilk'), 0.8, { g: 'gr' });
  shade([P(3, 0), P(3, 6), P(4, 6), P(4, 0)], B, Wt(41, 'ikinci'), 0.6, { g: 'gr' });
  const qq = (s, y, c, t, d, z = 38) => text(s, 1180, y, z, c, t, { g, dur: d });
  qq('q = (3 − 1) s × 2 mA = 2 × 2 = 4 mC', 560, K, S(39) + 0.4, 1.8);
  qq('q = (4 − 3) s × 6 mA = 1 × 6 = 6 mC', 630, K, S(41) + 0.3, 1.8);
  const tq = text('Toplam yük = 4 + 6 = 10 mC', 1180, 720, 46, B, S(43), { g, dur: 1.3 });
  oval(tq.box, R, E(43) - 0.1, 0.6, { g });
}
