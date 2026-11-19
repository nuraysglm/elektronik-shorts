// Ders 1 Bolum 2 - Parca 4: acik devre, en sik yapilan hata, buton ornegi (metin.md [PARCA 4])
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, arrow, frame, erase, dot, kose, baslik, under, strike, zig, pad, pulse, kutu } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  let g = 'a';
  baslik('2. Açık devre', 200, S(0) + 0.1, { g, dur: 0.7 });
  // devre: x 200..800, y 300..700; batarya sol kolda, direnc ust kolda, anahtar sag kolda (420-560)
  const tc = Wt(2, 'dokuz');
  path([[[200, 480], [200, 300], [380, 300]]], K, 5, tc, 0.5, { g });
  line([160, 480], [240, 480], K, 5, tc + 0.6, 0.15, { g });
  line([180, 510], [220, 510], K, 8, tc + 0.85, 0.12, { g });
  text('+', 142, 470, 40, K, tc + 1.05, { g, dur: 0.12 });
  text('−', 142, 548, 40, K, tc + 1.25, { g, dur: 0.12 });
  text('9 V', 245, 510, 44, K, tc + 1.45, { g, dur: 0.3 });
  const rz = zig([380, 300], [620, 300], 200, 20);
  path([rz], K, 5, Wt(2, 'direnç') - 0.3, 0.6, { g });
  text('3 kΩ', 500, 262, 42, K, Wt(2, 'direnç') + 0.4, { g, align: 'c', dur: 0.35 });
  path([[[620, 300], [800, 300], [800, 420]]], K, 5, Wt(2, 'anahtar') - 0.2, 0.4, { g });
  dot([800, 420], 8, K, Wt(2, 'anahtar') + 0.3, { g });
  line([800, 420], [800, 560], K, 5, S(3) + 0.1, 0.3, { g: 'kapali' });
  dot([800, 560], 8, K, S(3) + 0.5, { g });
  path([[[800, 560], [800, 700], [200, 700], [200, 510]]], K, 5, S(3) + 0.75, 0.7, { g });
  text('Kapalı anahtar tel gibidir', 405, 640, 32, G, S(4) + 0.2, { g: 'kapali', dur: 1.0 });
  arrow(660, 268, 760, 268, B, Wt(5, 'direncin'), 0.35, { g, lw: 5, head: 14 });
  text('i', 772, 276, 40, B, Wt(5, 'uçlarına'), { g, dur: 0.15 });
  text('i = 9 V / 3 kΩ = 3 mA', RX, 300, 48, B, S(7), { g, dur: 1.3 });
  text('V / kΩ = mA', RX, 360, 36, G, S(8) + 0.1, { g, dur: 0.6 });
  // anahtar acilir
  erase('kapali', S(9) + 0.3);
  line([800, 560], [880, 445], K, 5, S(9) + 0.45, 0.35, { g });
  text('i = 0', 830, 276, 40, B, S(10) + 0.3, { g, dur: 0.4 });
  kutu('Açık devrede i = 0', RX, 440, 46, B, Wt(13, 'halkada'), { g, dur: 0.8 });
  // en sik yapilan hata
  frame([RX - 20, 495, 1840, 625], R, S(15), 0.8, { g, lw: 4 });
  text('En sık yapılan hata', RX, 545, 44, R, Wt(15, 'en'), { g, dur: 0.8 });
  text('i = 0 olduğuna göre v = 0 V', RX, 605, 44, R, S(16), { g, dur: 1.2 });
  const z0 = text('0 V ?', 680, 500, 46, R, Wt(16, 'sıfır', 1), { g, dur: 0.4 });
  // dogrusu
  text('Doğrusu', RX, 680, 44, G, S(17) + 0.05, { g, dur: 0.5 });
  text('Direncin gerilimi = 3 kΩ × 0 mA = 0 V', RX, 740, 42, K, Wt(19, 'direncin'), { g, dur: 1.8 });
  text('- Direncin iki ucu aynı gerilimde', RX, 800, 42, K, S(20), { g, dur: 1.4 });
  path([[[800, 560], [800, 700], [200, 700], [200, 512]]], B, 10, S(21) + 0.3, 1.5, { g, });
  path([[[800, 420], [800, 300], [620, 300]], rz.slice().reverse(), [[380, 300], [200, 300], [200, 480]]], B, 10, S(22) + 0.2, 2.2, { g });
  text('+', 822, 420, 40, K, Wt(22, 'artı'), { g, dur: 0.12 });
  text('−', 822, 600, 40, K, Wt(22, 'artı') + 0.3, { g, dur: 0.12 });
  strike(z0, R, S(23), 0.3, { g });
  const v9 = text('9 V', 690, 575, 52, B, Wt(23, 'dokuz'), { g, dur: 0.35 });
  pulse(pad(v9.box, 4), B, Wt(23, 'dokuz') + 0.5, E(23) + 0.3, { g });
  erase(g, S(24) - 0.1);
  // ---------------- B: buton (24-33)
  g = 'b';
  baslik('Uygulamada: buton', 200, S(24) + 0.05, { g, dur: 0.8 });
  const X = 1300;
  text('3,3 V', X, 300, 40, K, Wt(25, 'mikrodenetleyicinin'), { g, align: 'c', dur: 0.4 });
  line([X, 318], [X, 360], K, 5, Wt(25, 'mikrodenetleyicinin') + 0.5, 0.15, { g });
  path([zig([X, 360], [X, 520], 130, 18)], K, 5, Wt(25, 'on'), 0.6, { g });
  text('10 kΩ', X + 40, 450, 40, K, Wt(25, 'kiloohmluk'), { g, dur: 0.35 });
  line([X, 520], [X, 560], K, 5, Wt(25, 'direnç'), 0.15, { g });
  dot([X, 560], 9, K, Wt(25, 'direnç') + 0.2, { g });
  arrow(X, 560, 1480, 560, K, Wt(25, 'üzerinden'), 0.35, { g, lw: 5, head: 14 });
  text('Giriş', 1380, 545, 32, K, Wt(25, 'üzerinden') + 0.4, { g, align: 'c', dur: 0.3 });
  frame([1480, 505, 1800, 615], K, Wt(25, 'üç'), 0.5, { g, lw: 4 });
  text('Mikrodenetleyici', 1640, 572, 32, G, Wt(25, 'üç') + 0.6, { g, align: 'c', dur: 0.6 });
  line([X, 560], [X, 620], K, 5, S(26), 0.15, { g });
  dot([X, 620], 8, K, S(26) + 0.2, { g });
  line([X, 700], [1360, 630], K, 5, S(26) + 0.4, 0.3, { g: 'acik' });
  dot([X, 700], 8, K, S(26) + 0.8, { g });
  line([X, 700], [X, 740], K, 5, Wt(26, 'toprak'), 0.15, { g });
  line([X - 30, 740], [X + 30, 740], K, 5, Wt(26, 'toprak') + 0.2, 0.12, { g });
  line([X - 19, 756], [X + 19, 756], K, 5, Wt(26, 'toprak') + 0.4, 0.1, { g });
  line([X - 8, 772], [X + 8, 772], K, 5, Wt(26, 'toprak') + 0.55, 0.08, { g });
  text('Buton', 1380, 680, 32, G, Wt(26, 'arasında'), { g, dur: 0.4 });
  arrow(X - 50, 400, X - 50, 480, B, S(27) - 0.2, 0.3, { g, lw: 5, head: 14 });
  text('i', X - 88, 452, 40, B, S(27) + 0.15, { g, dur: 0.12 });
  let g2 = 'b1';
  text('- Giriş neredeyse hiç akım çekmez', L, 300, 42, K, Wt(27, 'girişin'), { g: g2, dur: 1.4 });
  text('Buton açıkken i = 0', L, 370, 42, K, S(28), { g: g2, dur: 0.9 });
  text('Direncin gerilimi = 10 kΩ × 0 = 0 V', L, 440, 42, K, S(29), { g: g2, dur: 1.6 });
  text('Giriş = 3,3 V', L, 510, 42, B, S(30), { g: g2, dur: 0.6 });
  text('Butonun uçları arasında 3,3 V', L, 580, 42, B, Wt(30, 'butonun'), { g: g2, dur: 1.2 });
  erase(g2, S(31) - 0.1); erase('acik', S(31) + 0.2);
  line([X, 620], [X, 700], K, 5, S(31) + 0.35, 0.3, { g });
  g2 = 'b2';
  text('Buton kapalıyken i = 3,3 V / 10 kΩ = 0,33 mA', L, 300, 42, K, Wt(31, 'akım'), { g: g2, dur: 2.0 });
  text('- Kapalı buton tel gibidir', L, 370, 42, K, S(32), { g: g2, dur: 1.0 });
  text('Giriş = 0 V', L, 440, 42, B, S(33), { g: g2, dur: 0.6 });
  // C: ozet
  kutu('Açık devre yalnızca i = 0\'ı garanti eder', L, 580, 44, B, Wt(34, 'yalnızca'), { g: g2, dur: 1.6 });
  const gb = text('- Gerilim, bağlı elemanlardan çıkar', L, 770, 44, B, S(36), { g: g2, dur: 1.4 });
  under(gb, B, E(36) - 0.3, 0.4, { g: g2 });
  text('Gerilim hakkında tek başına bir şey söylemez', L, 680, 36, G, S(35), { g: g2, dur: 1.6 });
}
