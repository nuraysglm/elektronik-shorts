// Ders 1 Bolum 3 - Parca 5: kisa devre, acik/kisa devre tablosu, dersin girisindeki devre + en sik yapilan hata, ideal gerilim kaynagi ve siniri (metin.md [PARCA 5])
// Devre ajanin kendi kurgusudur (Razavi'nin R1/R2 dizisi kullanilmadi). Sayilar dogrula.py ile ayni: 6 V / 3 kΩ = 2 mA; 6 V / 2 kΩ = 3 mA; 6/1 = 6 A, 6/0,1 = 60 A, 6/0,01 = 600 A.
import { K, B, R, G, L, RX, S, E, Wt, text, row, path, line, arrow, frame, erase, dot, kose, baslik, under, pulse, pad, zig, ellipsePts, kutu, strike } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: kisa devre tanimi (cumle 0-10) + tablo (11-13)
  let g = 'a';
  baslik('Kısa devre', 200, S(0) + 0.05, { g, dur: 0.6 });
  // sag sutun: iki nokta, aralarinda kirmizi kalin tel
  text('a', 1100, 300, 50, K, S(1), { g, align: 'c', dur: 0.2 });
  dot([1100, 340], 10, K, S(1) + 0.3, { g });
  text('b', 1600, 300, 50, K, S(1) + 0.6, { g, align: 'c', dur: 0.2 });
  dot([1600, 340], 10, K, S(1) + 0.9, { g });
  line([1100, 340], [1600, 340], R, 8, Wt(1, 'telle'), 0.8, { g });
  text('Direnç = 0', 1350, 410, 44, G, Wt(1, 'bağlamak'), { g, align: 'c', dur: 0.6 });
  const kv = text('- Kısa devre: v = 0', L, 310, 54, K, S(2) + 0.2, { g, dur: 1.0 });
  pulse(pad(kv.box, 4), B, Wt(2, 'sıfırdır'), E(2) + 0.6, { g });
  row(L, 400, 52, [{ s: 'v = R × i', t: S(4), dur: 0.7 }, { s: '= 0 × i', t: S(5), dur: 0.5 }, { s: '= 0', t: Wt(6, 'yine'), dur: 0.3 }], { g, color: B });
  text('i sonlu olduğu sürece', L, 460, 38, G, S(6) + 0.2, { g, dur: 0.9 });
  text('Örnek: 0 Ω × 10 mA = 0 V', L, 545, 46, B, Wt(7, 'telden'), { g, dur: 1.4 });
  const ab = text('- Akımı çevre belirler', L, 635, 50, K, S(10) + 0.3, { g, dur: 0.9 });
  under(ab, B, Wt(10, 'karar'), 0.4, { g });
  // tablo: acik devre | kisa devre (sag alt)
  const C1 = 1000, C2 = 1420;
  text('Açık devre', C1, 530, 44, G, S(11) + 0.1, { g, dur: 0.5 });
  text('Kısa devre', C2, 530, 44, G, S(11) + 0.7, { g, dur: 0.5 });
  line([C1, 550], [1800, 550], G, 3, S(11) + 1.3, 0.3, { g });
  line([1390, 490], [1390, 720], G, 3, S(11) + 1.7, 0.2, { g });
  text('i = 0', C1, 615, 46, B, Wt(12, 'akımın'), { g, dur: 0.3 });
  text('v: çevre belirler', C1, 690, 40, K, Wt(12, 'gerilimi'), { g, dur: 0.8 });
  text('v = 0', C2, 615, 46, B, Wt(13, 'gerilimin'), { g, dur: 0.3 });
  text('i: çevre belirler', C2, 690, 40, K, Wt(13, 'akımı'), { g, dur: 0.8 });
  erase(g, S(14) - 0.1);

  // ---------------- B: dersin girisindeki devre (14-31; is emri M: ekranda/seste 'kanca' yok)
  g = 'b';
  baslik('Dersin girişindeki devre', 200, S(14) + 0.05, { g, dur: 0.7 });
  const g2 = 'dv';
  // halka: sol kolda kaynak, ust kolda 2 kΩ, sag kolda 1 kΩ, alt kol tel
  let t = S(14) + 0.9;
  path([ellipsePts(220, 490, 58, 58)], K, 5, t, 0.5, { g: g2 }); t += 0.62;
  text('+', 220, 478, 36, K, t, { g: g2, align: 'c', dur: 0.15 }); t += 0.27;
  text('−', 220, 528, 36, K, t, { g: g2, align: 'c', dur: 0.15 }); t += 0.27;
  text('6 V', 298, 505, 46, K, Wt(15, 'altı') + 0.1 > t ? Wt(15, 'altı') + 0.1 : t, { g: g2, dur: 0.4 });
  t = Wt(15, 'iki') - 0.1;
  path([[[220, 432], [220, 300], [300, 300]]], K, 5, t, 0.4, { g: g2 });
  path([zig([300, 300], [560, 300], 150, 20)], K, 5, t + 0.52, 0.5, { g: g2 });
  text('2 kΩ', 430, 262, 42, K, t + 1.15, { g: g2, align: 'c', dur: 0.35 });
  t = Wt(15, 'bir') - 0.1;
  path([[[560, 300], [640, 300]]], K, 5, t, 0.15, { g: g2 });
  path([zig([640, 300], [640, 680], 150, 20)], K, 5, t + 0.27, 0.55, { g: g2 });
  text('1 kΩ', 610, 500, 42, K, t + 0.95, { g: g2, align: 'r', dur: 0.35 });
  path([[[640, 680], [220, 680], [220, 548]]], K, 5, Wt(15, 'halka') - 0.2, 0.5, { g: g2 });
  arrow(520, 680, 360, 680, B, Wt(16, 'aynı'), 0.4, { g: g2, lw: 6 });
  text('i', 440, 735, 44, B, Wt(16, 'akım'), { g: g2, align: 'c', dur: 0.15 });
  // sag sutun hesaplar
  let g3 = 'r1';
  text('Seri: 2 kΩ + 1 kΩ = 3 kΩ', RX, 300, 46, K, Wt(16, 'toplam'), { g: g3, dur: 1.2 });
  text('Ayrıntısı ileride', RX, 355, 34, G, S(17) + 0.1, { g: g3, dur: 0.6 });
  const i2 = text('Tel yokken: i = 6 V / 3 kΩ = 2 mA', RX, 430, 46, B, S(18) + 0.1, { g: g3, dur: 1.6 });
  // kisa devre teli (1 kΩ'a paralel)
  t = Wt(19, 'telle') - 0.3;
  dot([640, 360], 10, K, t, { g: g2 });
  path([[[640, 360], [740, 360], [740, 620], [640, 620]]], R, 7, t + 0.27, 0.7, { g: g2 });
  dot([640, 620], 10, K, t + 1.09, { g: g2 });
  // en sik yapilan hata (kirmizi cerceve)
  text('En sık yapılan hata', RX + 20, 530, 46, R, S(20), { g: g3, dur: 0.8 });
  text('Telden akım geçmez,', RX + 20, 595, 40, K, Wt(21, 'telden'), { g: g3, dur: 0.8 });
  text('akım yine iki dirençten geçer', RX + 20, 650, 40, K, Wt(21, 'akımın'), { g: g3, dur: 1.1 });
  const yl = text('i = 6 V / (2 kΩ + 1 kΩ) = 2 mA', RX + 20, 715, 42, R, S(22) + 0.1, { g: g3, dur: 1.3 });
  frame([RX - 5, 480, 1800, 745], R, E(22) - 0.9, 0.6, { g: g3, lw: 4 });
  strike(yl, R, S(23) - 0.55, 0.25, { g: g3 });
  erase(g3, S(23) - 0.1);
  // dogrusu
  g3 = 'r2';
  text('Doğrusu', RX, 300, 54, G, S(23) + 0.05, { g: g3, dur: 0.5 });
  text('1 kΩ\'un gerilimi = 0 V', RX, 380, 44, K, Wt(24, 'gerilimi'), { g: g3, dur: 1.0 });
  text('1 kΩ\'un akımı = 0 V / 1 kΩ = 0 mA', RX, 450, 44, K, Wt(25, 'akımı'), { g: g3, dur: 1.5 });
  text('i = 0', 610, 560, 40, B, Wt(25, 'sıfır', 1), { g: g2, align: 'r', dur: 0.3 });
  const i3 = text('i = 6 V / 2 kΩ = 3 mA', RX, 540, 50, B, S(28) + 0.05, { g: g3, dur: 1.2 });
  pulse(pad(i3.box, 4), B, E(28), E(28) + 1.4, { g: g3 });
  arrow(785, 410, 785, 570, B, S(29), 0.4, { g: g2, lw: 6 });
  text('3 mA', 815, 505, 42, B, S(29) + 0.55, { g: g2, dur: 0.35 });
  const tg = text('- 3 mA telden geçer', RX, 620, 46, K, Wt(29, 'telin'), { g: g3, dur: 0.8 });
  under(tg, B, E(29) + 0.1, 0.4, { g: g3 });
  text('1 kΩ devrede yokmuş gibi', RX, 690, 38, G, S(30) + 0.3, { g: g3, dur: 1.0 });
  kutu('Kısa devrede sıfır olan gerilimdir', RX, 780, 46, R, S(31), { g: g3, dur: 1.3 });
  erase(g, S(32) - 0.1); erase(g2, S(32) - 0.1); erase(g3, S(32) - 0.1);

  // ---------------- C: ideal gerilim kaynagi (32-46)
  g = 'c';
  baslik('İdeal gerilim kaynağı', 200, S(32) + 0.05, { g, dur: 0.9 });
  t = S(33);
  path([ellipsePts(1150, 470, 58, 58)], K, 5, t, 0.5, { g }); t += 0.62;
  text('+', 1150, 458, 36, K, t, { g, align: 'c', dur: 0.15 }); t += 0.27;
  text('−', 1150, 508, 36, K, t, { g, align: 'c', dur: 0.15 }); t += 0.27;
  text('6 V', 1070, 485, 46, K, t, { g, align: 'r', dur: 0.4 }); t += 0.52;
  path([[[1150, 412], [1150, 320], [1550, 320]]], K, 5, t, 0.5, { g }); t += 0.62;
  path([zig([1550, 320], [1550, 640], 150, 22)], K, 5, t, 0.6, { g }); t += 0.72;
  path([[[1550, 640], [1150, 640], [1150, 528]]], K, 5, t, 0.5, { g });
  const tl = Math.max(t + 0.62, Wt(34, 'yük') - 0.6);
  arrow(1270, 320, 1420, 320, B, tl, 0.35, { g, lw: 6 });
  text('i', 1345, 292, 42, B, tl + 0.45, { g, align: 'c', dur: 0.15 });
  text('- Uç gerilimi sabit', L, 310, 50, K, Wt(33, 'aynı'), { g, dur: 0.8 });
  text('- Akımı yük belirler', L, 390, 50, K, Wt(34, 'bağlanan'), { g, dur: 0.9 });
  text('i = v / R', L + 40, 465, 52, B, Wt(35, 'kaynak'), { g, dur: 0.7 });
  const rl1 = text('R', 1505, 495, 46, K, Wt(35, 'direnç'), { g: 'rl0', align: 'r', dur: 0.15 });
  text('Kaynak 6 V der, tel 0 V der (çelişki)', L, 545, 42, R, S(38), { g, dur: 1.6 });
  erase('rl0', S(41) - 0.05);
  text('1 Ω', 1505, 495, 46, K, S(41), { g: 'rl1', align: 'r', dur: 0.3 });
  text('R = 1 Ω iken i = 6 V / 1 Ω = 6 A', L, 615, 42, B, S(41) + 0.45, { g, dur: 1.5 });
  erase('rl1', S(42) - 0.05);
  text('0,1 Ω', 1505, 495, 46, K, S(42), { g: 'rl2', align: 'r', dur: 0.35 });
  text('R = 0,1 Ω iken i = 6 V / 0,1 Ω = 60 A', L, 680, 42, B, S(42) + 0.5, { g, dur: 1.7 });
  erase('rl2', S(43) - 0.05);
  text('0,01 Ω', 1505, 495, 46, K, S(43), { g: 'rl3', align: 'r', dur: 0.4 });
  const a6 = text('R = 0,01 Ω iken i = 6 V / 0,01 Ω = 600 A', L, 745, 42, B, S(43) + 0.5, { g, dur: 1.8 });
  pulse(pad(a6.box, 4), R, S(44), E(44) + 0.3, { g });
  // direncin yerine kirmizi tel (kisa devre)
  dot([1550, 380], 10, K, Wt(44, 'sıfıra'), { g });
  path([[[1550, 380], [1700, 380], [1700, 580], [1550, 580]]], R, 7, Wt(44, 'sıfıra') + 0.27, 0.6, { g });
  dot([1550, 580], 10, K, Wt(44, 'sıfıra') + 1.0, { g });
  text('i sınırsız büyür', 1350, 720, 44, R, Wt(44, 'sınırsız'), { g, align: 'c', dur: 0.8 });
  text('İdeal model kısa devrede anlamını yitirir', L, 805, 38, G, S(45) + 0.1, { g, dur: 1.6 });
  text('Sonraki: gerçek kaynak', RX, 805, 40, G, S(46) + 0.3, { g, dur: 0.9 });
}
