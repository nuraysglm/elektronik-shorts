// Ders 1 Bolum 3 - Parca 4: gerilim iki nokta arasinda, toprak ve referans (metin.md [PARCA 4])
import { K, B, R, G, GR, L, RX, S, E, Wt, text, row, path, line, dashed, dot, arrow, erase, pulse, pad, kose, baslik, under, kutu } from './motor.js';
// toprak sembolu: (x, y) noktasindan asagi kisa tel + uc yatay cizgi
function toprak(x, y, t, g, s = 1) {
  line([x, y], [x, y + 30 * s], K, 5, t, 0.2, { g });
  line([x - 40 * s, y + 30 * s], [x + 40 * s, y + 30 * s], K, 5, t + 0.35, 0.2, { g });
  line([x - 26 * s, y + 46 * s], [x + 26 * s, y + 46 * s], K, 5, t + 0.7, 0.15, { g });
  line([x - 12 * s, y + 62 * s], [x + 12 * s, y + 62 * s], K, 5, t + 1.0, 0.1, { g });
}
export function build() {
  kose(0, { sabit: true });
  // ---------------- A + B: iki nokta, toprak (cumle 0-11)
  let g = 'a';
  baslik('Gerilim iki nokta arasında', 200, S(0) + 0.05, { g, dur: 1.0, alt: S(0) + 1.15 });
  row(L, 310, 46, [{ s: '- "Şu noktada 12 V var": neye göre', t: S(1) + 0.2, dur: 1.6 }, { s: '?', t: Wt(1, 'neye'), dur: 0.15, color: R }], { g });
  text('12 V: o nokta ile başka bir nokta arasındaki fark', L, 385, 38, G, S(2) + 0.1, { g, dur: 1.8 });
  text('- Referans söylenmezse sayı eksik', L, 470, 46, K, S(3) + 0.1, { g, dur: 1.2 });
  toprak(1300, 270, Wt(4, 'toprağıdır') - 0.4, g);
  text('Toprak: ortak referans ucu', 1000, 430, 42, G, S(5) + 0.1, { g, dur: 1.0 });
  text('v_a: a ile toprak arasındaki gerilim', L, 570, 44, B, S(7) + 0.1, { g, dur: 1.4 });
  text('(v_t_o_p_r_a_k = 0 V)', L, 630, 38, G, Wt(7, 'toprak'), { g, dur: 0.8 });
  text('Bütün noktalar aynı uca göre: farkı çıkararak bul', L, 730, 38, G, S(10) + 0.3, { g, dur: 1.8 });
  erase(g, S(12) - 0.1);
  // ---------------- C: ornek, iki cetvel (cumle 12-27)
  g = 'c';
  baslik('Örnek', 200, S(12) + 0.05, { g, dur: 0.5 });
  const Y = (v) => 760 - v * 92, X1 = 1100, X2 = 1520;
  // is emri M (kanal sahibi 20.11): noktalari baglayan duz siyah cizgi yok (tel/kisa devre sanilir);
  // kesikli gri gerilim ekseni + her seviyede kisa yatay centik; eksende toprak sembolu yok, "0 V (toprak)" yazisi
  const cent = (x, v, t) => line([x - 16, Y(v)], [x + 16, Y(v)], GR, 4, t, 0.1, { g });
  text('Gerilim (V)', X1, Y(5.4) - 18, 32, G, S(12) + 0.65, { g, dur: 0.45, align: 'c' });
  dashed([X1, Y(0)], [X1, Y(5.4)], GR, 4, S(13), 0.5, { g });
  cent(X1, 0, S(13) + 0.6);
  text('0 V (toprak)', X1 + 30, Y(0) + 12, 36, G, S(13) + 0.75, { g, dur: 0.5 });
  cent(X1, 5, Wt(13, 'a') - 0.12);
  dot([X1, Y(5)], 10, B, Wt(13, 'a'), { g });
  text('a: 5 V', X1 + 30, Y(5) + 12, 40, B, Wt(13, 'a') + 0.2, { g, dur: 0.4 });
  cent(X1, 3.3, Wt(13, 'be') - 0.12);
  dot([X1, Y(3.3)], 10, B, Wt(13, 'be'), { g });
  text('b: 3,3 V', X1 + 30, Y(3.3) + 12, 40, B, Wt(13, 'be') + 0.2, { g, dur: 0.5 });
  text('v_a_b = v_a − v_b', L, 310, 52, B, S(14) + 0.1, { g, dur: 0.9 });
  const r15 = text('= 5 V − 3,3 V = 1,7 V', L, 395, 52, B, S(15), { g, dur: 1.2 });
  arrow(X1 - 35, Y(3.3) - 6, X1 - 35, Y(5) + 6, B, E(15) - 0.3, 0.35, { g, head: 14, lw: 4 });
  const a17 = text('1,7 V', X1 - 55, (Y(5) + Y(3.3)) / 2 + 14, 40, B, E(15) + 0.15, { g, dur: 0.35, align: 'r' });
  text('v_b_a = −1,7 V', L, 480, 52, R, Wt(16, 'eksi'), { g, dur: 0.8 });
  // ikinci cetvel: toprak b'de
  text('Gerilim (V)', X2, Y(5.4) - 18, 32, G, S(17) + 0.1, { g, dur: 0.45, align: 'c' });
  dashed([X2, Y(0)], [X2, Y(5.4)], GR, 4, S(17) + 0.65, 0.5, { g });
  cent(X2, 3.3, S(18) + 0.1);
  text('b: 0 V (toprak)', X2 + 30, Y(3.3) + 12, 40, B, S(18) + 0.3, { g, dur: 0.7 });
  dot([X2, Y(3.3)], 10, B, S(19) + 0.6, { g });
  cent(X2, 5, S(20) - 0.15);
  dot([X2, Y(5)], 10, B, S(20), { g });
  text('a: 5 − 3,3 = 1,7 V', X2 + 30, Y(5) + 12, 36, B, S(20) + 0.2, { g, dur: 1.0 });
  cent(X2, 0, S(21) - 0.15);
  dot([X2, Y(0)], 10, G, S(21), { g });
  text('Eski toprak:', X2 + 30, Y(0) - 40, 34, G, S(21) + 0.2, { g, dur: 0.5 });
  text('0 − 3,3 = −3,3 V', X2 + 30, Y(0) + 12, 34, G, Wt(21, 'sıfır'), { g, dur: 0.9 });
  text('Yeni referansla: v_b = 0 V, v_a = 1,7 V', L, 570, 42, K, S(22), { g, dur: 1.6 });
  text('v_a_b = 1,7 V − 0 V = 1,7 V', L, 650, 48, B, S(24), { g, dur: 1.2 });
  kutu('İki nokta arasındaki gerilim referansa bağlı değil', L, 750, 38, B, S(25) + 0.1, { g, dur: 1.8 });
  pulse(pad(a17.box, 4), B, S(26), E(27) + 0.3, { g });
  text('Regülatörde yeniden', 1300, 205, 40, G, Wt(26, 'aklında'), { g, dur: 0.8 });
}
