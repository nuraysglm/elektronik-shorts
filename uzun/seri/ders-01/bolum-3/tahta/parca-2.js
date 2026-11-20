// Ders 1 Bolum 3 - Parca 2: gerilimin tanimi (W / q), ornek 18 µJ / 4 µC + abone cagrisi 1 (metin.md [PARCA 2])
// Abone karti 1 cumle 30'un basinda (109,51 sn) birlestirmede bindirilir; butun yazilar y <= 821.
import { K, B, R, G, L, RX, S, E, Wt, text, row, path, line, arrow, dashed, dot, frame, erase, pulse, pad, kose, baslik, under, kutu } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: tanim (cumle 0-8)
  let g = 'a';
  baslik('Gerilim', 200, S(0) + 0.05, { g, dur: 0.6, alt: S(0) + 0.7 });
  text('- Fizikte: potansiyel farkı', L, 300, 48, K, Wt(0, 'potansiyel'), { g, dur: 1.0 });
  text('- Birimi volt (V)', L, 375, 48, K, S(2), { g, dur: 0.7 });
  // sag sutun: devre kutusu + a, b noktalari
  frame([1180, 230, 1720, 640], G, S(4) + 0.05, 1.0, { g, lw: 4 });
  text('Devre', 1200, 280, 40, G, S(4) + 1.2, { g, dur: 0.4 });
  dot([1450, 330], 11, K, Wt(5, 'birine'), { g }); text('a', 1480, 345, 52, K, Wt(5, 'a', 0, true) + 0.1, { g, dur: 0.25 });
  dot([1450, 560], 11, K, Wt(5, 'diğerine') + 0.2, { g }); text('b', 1480, 575, 52, K, Wt(5, 'be') + 0.1, { g, dur: 0.25 });
  text('v_a_b: 1 C pozitif yükü b\'den a\'ya', L, 470, 46, B, Wt(6, 'kulonluk'), { g, dur: 1.6 });
  text('taşımak için gereken enerji', L, 530, 46, B, Wt(6, 'taşımak'), { g, dur: 1.2 });
  frame([L - 14, 425, 860, 552], B, Wt(6, 'enerji') + 0.1, 0.8, { g, lw: 3 });
  text('+', 1365, 548, 50, B, Wt(6, 'be', 1) - 0.2, { g, dur: 0.2 });
  dashed([1420, 535], [1420, 360], B, 4, Wt(6, 'noktasına') - 0.3, 0.6, { g });
  arrow(1420, 380, 1420, 352, B, Wt(6, 'taşımak') - 0.1, 0.2, { g, lw: 4, head: 14 });
  text('Sıra: b\'den a\'ya', L, 640, 46, G, Wt(7, 'sıraya'), { g, dur: 0.9 });
  text('Gerilimin işaretini belirler', L, 710, 40, G, S(8) + 0.05, { g, dur: 1.2 });
  erase(g, S(9) - 0.1);
  // ---------------- B: formul (cumle 9-14)
  g = 'b';
  baslik('Enerji bölü yük', 200, S(9) + 0.05, { g, dur: 0.8 });
  text('- Herhangi bir pozitif yük olabilir', L, 300, 46, K, S(10) + 0.1, { g, dur: 1.4 });
  const f = text('v_a_b = W / q', L, 420, 80, B, Wt(11, 'enerji'), { g, dur: 0.9 });
  frame(pad(f.box, 16), R, E(11) + 0.05, 0.6, { g, lw: 4 });
  text('W: enerji (J), q: yük (C)', L, 530, 42, G, S(12) + 0.05, { g, dur: 1.4 });
  text('1 V = 1 J / 1 C', L, 620, 56, K, S(13) + 0.05, { g, dur: 1.0 });
  // pil sembolu (sag sutun)
  const px = 1300, py = 470;
  line([px, 300], [px, py - 40], K, 5, Wt(14, 'pilin'), 0.3, { g });
  line([px - 70, py - 40], [px + 70, py - 40], K, 6, Wt(14, 'pilin') + 0.4, 0.25, { g });
  line([px - 35, py], [px + 35, py], K, 10, Wt(14, 'üstünde'), 0.2, { g });
  line([px, py], [px, 640], K, 5, Wt(14, 'üstünde') + 0.3, 0.3, { g });
  text('+', px + 90, py - 50, 48, R, Wt(14, 'bir', 0, true), { g, dur: 0.2 });
  text('−', px + 90, py + 25, 48, R, Wt(14, 'bir', 0, true) + 0.35, { g, dur: 0.2 });
  text('1,5 V', px + 150, py - 5, 56, B, Wt(14, 'buçuk'), { g, dur: 0.5 });
  text('1 C\'yi − uçtan + uca taşımak: 1,5 J', 1000, 740, 42, G, Wt(14, 'eksi'), { g, dur: 1.6 });
  erase(g, S(15) - 0.1);
  // ---------------- C: ornek (cumle 15-29)
  g = 'c';
  baslik('Örnek', 200, S(15) + 0.05, { g, dur: 0.4 });
  // sag: kroki a ustte, b altta, yukun yolu
  dot([1500, 300], 11, K, S(16) + 0.05, { g }); text('a', 1530, 315, 52, K, S(16) + 0.3, { g, dur: 0.2 });
  dot([1500, 560], 11, K, S(16) + 0.6, { g }); text('b', 1530, 575, 52, K, S(16) + 0.85, { g, dur: 0.2 });
  arrow(1460, 540, 1460, 330, B, Wt(16, 'be') - 0.2, 0.5, { g, lw: 5 });
  const r1 = row(L, 300, 50, [{ s: 'q = 4 μC,', t: Wt(16, 'dört'), dur: 0.6, color: B }, { s: 'W = 18 μJ', t: Wt(16, 'on'), dur: 0.6, color: B }], { g });
  text('v_a_b = W / q', L, 385, 50, B, S(17) + 0.1, { g, dur: 0.7 });
  text('= 18 μJ / 4 μC', L + 120, 455, 50, B, S(18) + 0.05, { g, dur: 0.9 });
  const a1 = text('= 18 / 4 = 4,5 V', L + 120, 525, 50, B, Wt(19, 'kalan'), { g, dur: 0.9 });
  pulse(pad(a1.box, 4), B, Wt(19, 'beş'), E(19) + 0.4, { g });
  text('μ\'lar sadeleşir: J / C = V', 1000, 680, 40, G, Wt(19, 'mikrolar'), { g, dur: 1.0 });
  // iki kat (sag ust bolum yerine sol alt)
  row(L, 620, 46, [{ s: 'q = 8 μC,', t: Wt(20, 'sekiz'), dur: 0.6, color: B }, { s: 'W = 36 μJ', t: Wt(21, 'otuz'), dur: 0.6, color: B }], { g });
  const a2 = text('v_a_b = 36 μJ / 8 μC = 36 / 8 = 4,5 V', L, 690, 46, B, S(22) + 0.05, { g, dur: 1.6 });
  pulse(pad(a2.box, 4), B, Wt(23, 'gerilim'), E(23) + 0.2, { g });
  const yb = text('- Gerilim yüke değil, iki noktaya bağlı', L, 770, 44, K, S(24) + 0.1, { g, dur: 1.6 });
  under(yb, B, Wt(24, 'noktanın'), 0.5, { g });
  erase(g, S(25) - 0.1);
  // ---------------- D: ters yon (cumle 25-29)
  g = 'd';
  baslik('Ters yönde', 200, S(25) + 0.05, { g, dur: 0.6 });
  dot([1500, 300], 11, K, S(25) + 0.8, { g }); text('a', 1530, 315, 52, K, S(25) + 1.05, { g, dur: 0.2 });
  dot([1500, 560], 11, K, S(25) + 1.35, { g }); text('b', 1530, 575, 52, K, S(25) + 1.6, { g, dur: 0.2 });
  arrow(1460, 330, 1460, 540, R, Wt(25, 'götürürsek') - 0.2, 0.5, { g, lw: 5 });
  text('a\'dan b\'ye: q = 4 μC', L, 310, 50, K, Wt(25, 'a\'dan'), { g, dur: 0.9 });
  text('- Enerjiyi harcamayız, geri alırız', L, 395, 46, K, S(26) + 0.05, { g, dur: 1.3 });
  text('W = −18 μJ', L, 480, 52, R, S(27) + 0.1, { g, dur: 0.6 });
  text('v_b_a = W / q = −18 μJ / 4 μC', L, 565, 52, R, S(28) + 0.05, { g, dur: 1.2 });
  const a3 = text('= −18 / 4 = −4,5 V', L + 120, 640, 52, R, Wt(28, 'eksi', 1) - 0.1, { g, dur: 0.8 });
  pulse(pad(a3.box, 4), R, S(29), E(29) + 0.3, { g });
  text('v_b_a = −4,5 V', 1000, 720, 52, R, Wt(29, 'eksi') - 0.2, { g, dur: 0.6 });
  under(a3, R, S(30) + 0.2, 1.4, { g, lw: 3 });
}
