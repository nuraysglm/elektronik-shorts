// Türev Short d1b1-1: "Akım hiç durmadan akarken ortalama sıfır çıkabilir mi?" (Ders 1 - Bölüm 1, parça 1 cümle 0-2, 4 + parça 2 cümle 17-23, 25-27, 29)
// Uzun videodaki tahta (parca-1.js, parca-2.js C) dikey 1080x1920 düzende yeniden çizildi; yatay kareden kırpma yok.
import { K, B, R, G, L, S, E, Wt, text, row, path, line, dashed, dashRect, arrow, frame, under, erase, oval, pulse, pad, axes } from './motor.js';
import { kart } from './ortak.js';
export function build(o) {
  // ---------------- A: soru (0-15 sn)
  let g = 'a';
  text('Akım akarken', L, 330, 76, K, 0, { g, kart: true });
  text('ortalama sıfır olur mu?', L, 430, 76, R, 0, { g, kart: true });
  const t0 = S('1.0');
  frame([L, 560, 365, 740], K, t0, 0.45, { g, lw: 5, vurgu: false });
  text('Devre', 240, 668, 52, K, t0 + 0.5, { g, align: 'c', dur: 0.35 });
  path([[[365, 620], [900, 620], [900, 900], [240, 900], [240, 740]]], K, 5, t0 + 0.9, 0.9, { g });
  dashed([640, 560], [640, 690], K, 4, t0 + 1.85, 0.3, { g, dash: 12, gap: 9 });
  text('Kesit', 640, 540, 40, K, Wt('1.1', 'ilk'), { g, align: 'c', dur: 0.3 });
  text('i = ?', 640, 800, 62, B, Wt('1.1', 'ilk') + 0.4, { g, align: 'c', dur: 0.4 });
  row(L, 1030, 58, [{ s: 'Akım = geçen yük / süre', t: Wt('1.1', 'geçen'), dur: 1.6 }, { s: '?', t: E('1.1') - 0.1, dur: 0.2, color: R }], { g });
  arrow(680, 595, 830, 595, B, Wt('1.2', 'durmadan'), 0.35, { g, head: 14 });
  arrow(600, 655, 450, 655, B, Wt('1.2', 'durmadan') + 0.5, 0.35, { g, head: 14 });
  const z = text('Ortalama = 0 ?', L, 1150, 74, R, Wt('1.2', 'sıfır'), { g, dur: 0.8 });
  under(z, R, S('1.4'), 0.35, { g });
  erase(g, S('2.17') - 0.12);
  // ---------------- B: 1 saniyelik pencere (parça 2, cümle 17-29)
  g = 'b';
  text('Örnek: 1 saniyelik pencere', L, 290, 62, R, S('2.17'), { g, dur: 1.0 });
  text('Aralık', L, 385, 46, G, S('2.17') + 1.15, { g, dur: 0.4 });
  text('Geçen yük', 590, 385, 46, G, S('2.17') + 1.65, { g, dur: 0.5 });
  line([L, 405], [900, 405], G, 3, S('2.18'), 0.3, { g });
  text('0 ile 0,5 s arası', L, 465, 50, K, Wt('2.18', 'sağa'), { g, dur: 0.8 });
  text('+5 mC (sağa)', 590, 465, 50, K, Wt('2.18', 'beş'), { g, dur: 0.6 });
  text('0,5 ile 1 s arası', L, 545, 50, K, Wt('2.19', 'sola'), { g, dur: 0.8 });
  text('−5 mC (sola)', 590, 545, 50, K, Wt('2.19', 'beş'), { g, dur: 0.6 });
  text('Pencere: Δt = 1 s', L, 630, 46, G, S('2.20') + 0.1, { g, dur: 0.8 });
  text('Δq = 5 mC − 5 mC = 0', L, 715, 56, K, Wt('2.20', 'sayaç'), { g, dur: 1.5 });
  const dz = text('Δq / Δt = 0', L, 810, 66, R, S('2.21'), { g, dur: 0.9 });
  // akım grafiği
  const ax = axes({ box: [210, 930, 790, 1215], xr: [0, 1.15], yr: [-15, 15], xt: [0, 0.5, 1], yt: [-10, 10], xl: 't (s)', yl: 'i (mA)', t: S('2.22'), g, skip0x: true, xtdx: 30, dt: 0.4, fs: 38 });
  const ta = Wt('2.25', 'artı'), te = Wt('2.25', 'eksi');
  path([[[ax.X(0), ax.Y(10)], [ax.X(0.5), ax.Y(10)]]], B, 6, ta, 0.6, { g });
  dashed([ax.X(0.5), ax.Y(10)], [ax.X(0.5), ax.Y(-10)], B, 2, ta + 0.75, 0.3, { g, dash: 9, gap: 8 });
  path([[[ax.X(0.5), ax.Y(-10)], [ax.X(1), ax.Y(-10)]]], B, 6, te, 0.6, { g });
  text('Akım hiçbir anda sıfır değil', L, 1290, 48, B, S('2.26'), { g, dur: 1.0 });
  dashRect([ax.X(0), ax.Y(13.5), ax.X(1), ax.Y(-13.5)], R, 3, Wt('2.27', 'pencereyi'), 0.6, { g });
  text('Pencere 1 s', ax.X(0.5), ax.Y(13.5) - 16, 40, R, Wt('2.27', 'pencereyi') + 0.7, { g, align: 'c', dur: 0.4 });
  oval(dz.box, R, Wt('2.29', 'ortalama'), 0.6, { g });
  erase(g, o.kartBas);
  kart(o, 'k');
}
