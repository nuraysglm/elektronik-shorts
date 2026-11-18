// Parca 2: yuk, ilk tanim, pencere sorunu, i = dq/dt (metin.md [PARCA 2])
import { K, B, R, GR, S, E, Wt, text, row, path, line, dashed, dashRect, arrow, frame, under, erase, oval, pulse, pad, axes, fx, mw } from './motor.js';
export function build() {
  // ---------------- A: yuk (cumle 0-7)
  let g = 'a';
  const y1 = row(120, 150, 64, [{ s: 'yük:', t: S(0) + 0.05, dur: 0.5 }, { s: 'q', t: Wt(1, 'kü'), dur: 0.25, color: B }], { g });
  text('birim: kulon (C)', 120, 235, 48, K, Wt(1, 'birimi'), { g, dur: 0.9 });
  text('sayılan, toplanıp çıkarılan bir miktar', 120, 335, 46, K, Wt(2, 'sayabildiğimiz'), { g, dur: 1.8 });
  text('elektron: eksi işaretli', 160, 420, 44, K, Wt(3, 'elektronun'), { g, dur: 0.9 });
  text('proton: artı işaretli', 160, 485, 44, K, Wt(3, 'protonunki'), { g, dur: 0.9 });
  const dg = text('yükün doğası: fizik konusu', 120, 590, 44, GR, Wt(4, 'doğası'), { g, dur: 1.2 });
  const q1 = text('nereden nereye, ne hızla?', 1060, 250, 60, B, Wt(5, 'nereden'), { g, dur: 1.4 });
  under(q1, R, E(5) - 0.2, 0.4, { g });
  const q2 = text('akım', 1060, 400, 72, B, Wt(6, 'akım'), { g, dur: 0.4 });
  text('nasıl ölçülür?', 1060 + q2.w + 24, 400, 56, K, Wt(7, 'akımı'), { g, dur: 0.8 });
  erase(g, S(8) - 0.12);
  // ---------------- B: kesit ve sayac (cumle 8-16)
  g = 'b';
  const tb = S(8);
  frame([90, 110, 300, 260], K, tb, 0.45, { g, lw: 5 });
  text('devre', 195, 198, 46, K, tb + 0.55, { g, align: 'c', dur: 0.35 });
  path([[[300, 170], [1720, 170], [1720, 360], [195, 360], [195, 260]]], K, 5, tb + 0.95, 0.9, { g });
  const tk = Wt(8, 'kesit');
  dashed([900, 105], [900, 240], K, 4, tk, 0.35, { g, dash: 12, gap: 9 });
  text('kesit', 900, 92, 36, K, tk + 0.4, { g, align: 'c', dur: 0.3 });
  const ts = S(9) + 0.2;
  frame([960, 195, 1440, 336], K, ts, 0.45, { g, lw: 3 });
  text('sayaç', 980, 232, 36, K, ts + 0.55, { g, dur: 0.3 });
  text('sağa geçen yük: artı', 1000, 274, 32, K, Wt(10, 'sağa'), { g, dur: 0.8 });
  text('sola geçen yük: eksi', 1000, 316, 32, K, Wt(10, 'sola'), { g, dur: 0.8 });
  // yuk tasiyicilari yalnizca telin icinde (ust kol): once saga, sonra sola
  const tp0 = Wt(10, 'sağa'), tp1 = Wt(10, 'sola'), tp2 = E(11) + 0.3;
  fx((c, u, t) => { const dir = t < tp1 ? 1 : -1, base = t < tp1 ? (t - tp0) : (t - tp1);
    c.fillStyle = B; for (let k = 0; k < 9; k++) { let x = 420 + ((k * 150 + dir * base * 120) % 1260 + 1260) % 1260; c.beginPath(); c.arc(x, 170, 7, 0, 7); c.fill(); } }, tp0, tp2, { g });
  text('Δt: bekleme süresi', 120, 440, 46, K, Wt(12, 'delta'), { g, dur: 0.8 });
  text('Δq: sayacın gösterdiği net yük', 120, 510, 46, K, Wt(12, 'delta', 1), { g, dur: 1.3 });
  const f1 = row(120, 620, 64, [{ s: 'akım = Δq / Δt', t: Wt(13, 'akım'), dur: 1.6 }, { s: '?', t: E(13) - 0.1, dur: 0.2, color: R }], { g });
  pulse(pad(f1.box, 4), B, S(14), E(15) + 0.2, { g });
  const dq = text('Δt nasıl seçilir?', 900, 620, 56, R, S(16), { g, dur: 0.9 });
  under(dq, R, E(16) - 0.1, 0.35, { g });
  erase(g, S(17) - 0.12);
  // ---------------- C: pencere sorunu (cumle 17-36)
  g = 'c';
  const ax = axes({ box: [1080, 345, 1760, 778], xr: [0, 1.15], yr: [-15, 15], xt: [0, 0.5, 1], yt: [-10, 10], xl: 't (s)', yl: 'i (mA)', t: S(22), g, skip0x: true, xtdx: 30, dt: 0.4 });
  const X0 = 120, X1 = 560;
  text('aralık', X0, 200, 44, GR, S(17) + 0.05, { g, dur: 0.4 });
  text('geçen yük', X1, 200, 44, GR, S(17) + 0.6, { g, dur: 0.5 });
  line([X0, 220], [X1 + 260, 220], GR, 3, S(17) + 1.2, 0.3, { g });
  text('0 ile 0,5 s arası', X0, 280, 44, K, Wt(18, 'sağa'), { g, dur: 0.8 });
  text('+5 mC', X1, 280, 44, K, Wt(18, 'beş'), { g, dur: 0.4 });
  text('0,5 ile 1 s arası', X0, 350, 44, K, Wt(19, 'sola'), { g, dur: 0.8 });
  text('−5 mC', X1, 350, 44, K, Wt(19, 'beş'), { g, dur: 0.4 });
  text('Δq = 5 mC − 5 mC = 0', X0, 450, 50, K, Wt(20, 'sayaç'), { g, dur: 1.5 });
  const z0 = text('Δq / Δt = 0', X0, 530, 54, R, S(21), { g, dur: 0.9 });
  // akim grafigi: +10 mA sonra -10 mA (cumle 24-25)
  const ta = Wt(25, 'artı'), te = Wt(25, 'eksi');
  path([[[ax.X(0), ax.Y(10)], [ax.X(0.5), ax.Y(10)]]], B, 6, ta, 0.6, { g });
  dashed([ax.X(0.5), ax.Y(10)], [ax.X(0.5), ax.Y(-10)], B, 2, ta + 0.75, 0.3, { g, dash: 9, gap: 8 });
  path([[[ax.X(0.5), ax.Y(-10)], [ax.X(1), ax.Y(-10)]]], B, 6, te, 0.6, { g });
  text('5 mC / 0,5 s = 10 mA', X0, 620, 50, B, Wt(24, 'saniyede', 1), { g, dur: 1.3 });
  text('hiçbir anda sıfır değil', X0, 700, 44, R, S(26), { g, dur: 0.9 });
  // pencereler: her biri ayri, bir oncekinin yerine
  const win = (a, b, lab, col, t0, gg) => { dashRect([ax.X(a), ax.Y(13.5), ax.X(b), ax.Y(-13.5)], col, 3, t0, 0.6, { g: gg }); return text(lab, (ax.X(a) + ax.X(b)) / 2, ax.Y(13.5) - 18, 36, col, t0 + 0.7, { g: gg, align: 'c', dur: 0.4 }); };
  win(0, 1, 'ortalama 0', R, Wt(30, 'pencere'), 'w1');
  erase('w1', Wt(32, 'ilk') - 0.1);
  win(0.1, 0.3, '10 mA', B, Wt(32, 'yerleştirirsek'), 'w2');
  erase('w2', Wt(33, 'kaydırıp') - 0.1);
  win(0.4, 0.6, '0', R, Wt(33, 'ortaya'), 'w3');
  text('yön değişimi ani kabul edildi', X0, 790, 36, GR, Wt(34, 'ani'), { g, dur: 1.0 });
  erase('c', S(35) - 0.12); erase('w3', S(35) - 0.12);
  // ---------------- C2: ozet (cumle 35-36)
  g = 'c2';
  const gp = text('geniş pencere iki davranışı tek sayıya karıştırır', 960, 360, 56, R, Wt(35, 'geniş'), { g, align: 'c', dur: 2.2 });
  const it = text('iyi bir tanım tek bir anı anlatır', 960, 500, 60, B, S(36) + 0.1, { g, align: 'c', dur: 1.6 });
  under(it, B, E(36) - 0.1, 0.4, { g });
  erase(g, S(37) - 0.12);
  // ---------------- D: i = dq/dt (cumle 37-47)
  g = 'd';
  text('pencereyi sınırsız küçült', 300, 130, 50, K, Wt(37, 'pencereyi'), { g, dur: 1.1 });
  text('dt: sıfıra yaklaşan kısacık süre', 300, 210, 46, K, S(38) + 0.1, { g, dur: 1.4 });
  text('dq: bu sürede geçen çok küçük yük', 300, 280, 46, K, S(39) + 0.1, { g, dur: 1.5 });
  text('akım, yükün kesitten geçme hızıdır', 960, 362, 54, K, Wt(40, 'akım'), { g, align: 'c', dur: 1.6 });
  const ff = text('i = dq / dt', 960, 520, 120, B, Wt(41, 'i', 0, true), { g, align: 'c', dur: 1.4 });
  frame(pad(ff.box, 14), R, E(41) + 0.1, 0.6, { g, lw: 4 });
  text('birim: amper (A)', 300, 650, 46, K, S(42), { g, dur: 0.7 });
  text('1 A = 1 C / s', 300, 720, 46, K, Wt(43, 'saniyede'), { g, dur: 0.8 });
  const u2 = text('2 μC / 1 ms = 2 mA', 1000, 650, 46, K, Wt(44, 'milisaniyede'), { g, dur: 1.2 });
  text('= 2 mC / s', u2.box[2] + 8, 650, 46, K, S(45) + 0.2, { g, dur: 0.6 });
  text('i(t): zamanın fonksiyonu', 1000, 720, 46, B, Wt(46, 'zamanın'), { g, dur: 1.1 });
}
