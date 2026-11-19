// Parca 2: yuk, ilk tanim, pencere sorunu, i = dq/dt (metin.md [PARCA 2])
// Is emri D (19.11.2026): yeni tahta duzeni (sol ust kirmizi baslik parca 1'den surer, kirmizi basliklar, '- ' maddeler, koyu yesil etiketler)
import { K, B, R, GR, G, L, RX, S, E, Wt, text, row, path, line, dashed, dashRect, arrow, frame, under, erase, oval, pulse, pad, axes, fx, mw, kose, baslik } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: yuk (cumle 0-7)
  let g = 'a';
  const y1 = row(L, 200, 64, [{ s: 'Yük:', t: S(0) + 0.05, dur: 0.5, color: R }, { s: 'q', t: Wt(1, 'kü'), dur: 0.25, color: B }], { g });
  text('- Birimi kulon (C)', L, 290, 48, K, Wt(1, 'birimi'), { g, dur: 0.9 });
  text('- Sayılan, toplanıp çıkarılan bir miktar', L, 370, 46, K, Wt(2, 'sayabildiğimiz'), { g, dur: 1.8 });
  text('- Elektron eksi işaretli', L, 450, 46, K, Wt(3, 'elektronun'), { g, dur: 0.9 });
  text('- Proton artı işaretli', L, 530, 46, K, Wt(3, 'protonunki'), { g, dur: 0.9 });
  const dg = text('Yükün doğası fizik konusudur', L, 630, 44, G, Wt(4, 'doğası'), { g, dur: 1.2 });
  const q1 = text('Nereden nereye, ne hızla?', RX, 290, 60, B, Wt(5, 'nereden'), { g, dur: 1.4 });
  under(q1, R, E(5) - 0.2, 0.4, { g });
  const q2 = text('Akım', RX, 450, 72, B, Wt(6, 'akım'), { g, dur: 0.4 });
  text('nasıl ölçülür?', RX + q2.w + 24, 450, 56, K, Wt(7, 'akımı'), { g, dur: 0.8 });
  erase(g, S(8) - 0.12);
  // ---------------- B: kesit ve sayac (cumle 8-16)
  g = 'b';
  const tb = S(8);
  frame([L, 150, L + 210, 300], K, tb, 0.45, { g, lw: 5 });
  text('Devre', L + 105, 238, 46, K, tb + 0.55, { g, align: 'c', dur: 0.35 });
  path([[[L + 210, 210], [1720, 210], [1720, 400], [L + 105, 400], [L + 105, 300]]], K, 5, tb + 0.95, 0.9, { g });
  const tk = Wt(8, 'kesit');
  dashed([900, 150], [900, 275], K, 4, tk, 0.35, { g, dash: 12, gap: 9 });
  text('Kesit', 900, 132, 36, K, tk + 0.4, { g, align: 'c', dur: 0.3 });
  const ts = S(9) + 0.2;
  frame([960, 235, 1440, 376], K, ts, 0.45, { g, lw: 3 });
  text('Sayaç', 980, 272, 36, K, ts + 0.55, { g, dur: 0.3 });
  text('Sağa geçen yük: artı', 1000, 314, 32, K, Wt(10, 'sağa'), { g, dur: 0.8 });
  text('Sola geçen yük: eksi', 1000, 356, 32, K, Wt(10, 'sola'), { g, dur: 0.8 });
  // yuk tasiyicilari yalnizca telin icinde (ust kol): once saga, sonra sola
  const tp0 = Wt(10, 'sağa'), tp1 = Wt(10, 'sola'), tp2 = E(11) + 0.3;
  fx((c, u, t) => { const dir = t < tp1 ? 1 : -1, base = t < tp1 ? (t - tp0) : (t - tp1);
    c.fillStyle = B; for (let k = 0; k < 9; k++) { let x = 420 + ((k * 150 + dir * base * 120) % 1260 + 1260) % 1260; c.beginPath(); c.arc(x, 210, 7, 0, 7); c.fill(); } }, tp0, tp2, { g });
  text('- Δt: bekleme süresi', L, 490, 46, K, Wt(12, 'delta'), { g, dur: 0.8 });
  text('- Δq: sayacın gösterdiği net yük', L, 560, 46, K, Wt(12, 'delta', 1), { g, dur: 1.3 });
  const f1 = row(L, 670, 64, [{ s: 'Akım = Δq / Δt', t: Wt(13, 'akım'), dur: 1.6 }, { s: '?', t: E(13) - 0.1, dur: 0.2, color: R }], { g });
  pulse(pad(f1.box, 4), B, S(14), E(15) + 0.2, { g });
  const dq = text('Δt nasıl seçilir?', RX, 670, 56, R, S(16), { g, dur: 0.9 });
  under(dq, R, E(16) - 0.1, 0.35, { g });
  erase(g, S(17) - 0.12);
  // ---------------- C: pencere sorunu (cumle 17-36)
  g = 'c';
  const ax = axes({ box: [1080, 345, 1760, 778], xr: [0, 1.15], yr: [-15, 15], xt: [0, 0.5, 1], yt: [-10, 10], xl: 't (s)', yl: 'i (mA)', t: S(22), g, skip0x: true, xtdx: 30, dt: 0.4 });
  const X0 = L, X1 = 560;
  text('Aralık', X0, 200, 44, G, S(17) + 0.05, { g, dur: 0.4 });
  text('Geçen yük', X1, 200, 44, G, S(17) + 0.6, { g, dur: 0.5 });
  line([X0, 220], [X1 + 260, 220], G, 3, S(17) + 1.2, 0.3, { g });
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
  text('Akım hiçbir anda sıfır değil', X0, 700, 44, R, S(26), { g, dur: 0.9 });
  // pencereler: her biri ayri, bir oncekinin yerine
  const win = (a, b, lab, col, t0, gg) => { dashRect([ax.X(a), ax.Y(13.5), ax.X(b), ax.Y(-13.5)], col, 3, t0, 0.6, { g: gg }); return text(lab, (ax.X(a) + ax.X(b)) / 2, ax.Y(13.5) - 18, 36, col, t0 + 0.7, { g: gg, align: 'c', dur: 0.4 }); };
  win(0, 1, 'Ortalama 0', R, Wt(30, 'pencere'), 'w1');
  erase('w1', Wt(32, 'ilk') - 0.1);
  win(0.1, 0.3, '10 mA', B, Wt(32, 'yerleştirirsek'), 'w2');
  erase('w2', Wt(33, 'kaydırıp') - 0.1);
  win(0.4, 0.6, '0', R, Wt(33, 'ortaya'), 'w3');
  text('Yön değişimi ani kabul edildi', X0, 790, 36, G, Wt(34, 'ani'), { g, dur: 1.0 });
  erase('c', S(35) - 0.12); erase('w3', S(35) - 0.12);
  // ---------------- C2: ozet (cumle 35-36)
  g = 'c2';
  const gp = text('Geniş pencere iki davranışı tek sayıya karıştırır', L, 330, 60, R, Wt(35, 'geniş'), { g, dur: 2.2 });
  const it = text('İyi bir tanım tek bir anı anlatır', L, 470, 64, B, S(36) + 0.1, { g, dur: 1.6 });
  under(it, B, E(36) - 0.1, 0.4, { g });
  erase(g, S(37) - 0.12);
  // ---------------- D: i = dq/dt (cumle 37-47)
  g = 'd';
  baslik('Pencereyi sınırsız küçült', 200,  Wt(37, 'pencereyi'), { g, dur: 1.1 });
  text('- dt: sıfıra yaklaşan kısacık süre', L, 290, 46, K, S(38) + 0.1, { g, dur: 1.4 });
  text('- dq: bu sürede geçen çok küçük yük', L, 360, 46, K, S(39) + 0.1, { g, dur: 1.5 });
  text('Akım, yükün kesitten geçme hızıdır', L, 460, 54, K, Wt(40, 'akım'), { g, dur: 1.6 });
  const ff = text('i = dq / dt', 1150, 420, 120, B, Wt(41, 'i', 0, true), { g, dur: 1.4 });
  frame(pad(ff.box, 14), R, E(41) + 0.1, 0.6, { g, lw: 4 });
  text('- Birimi amper (A)', L, 570, 46, K, S(42), { g, dur: 0.7 });
  text('- 1 A = 1 C / s', L, 640, 46, K, Wt(43, 'saniyede'), { g, dur: 0.8 });
  const u2 = text('2 μC / 1 ms = 2 mA', RX, 570, 46, K, Wt(44, 'milisaniyede'), { g, dur: 1.2 });
  text('= 2 mC / s', u2.box[2] + 8, 570, 46, K, S(45) + 0.2, { g, dur: 0.6 });
  text('i(t): zamanın fonksiyonu', RX, 640, 46, B, Wt(46, 'zamanın'), { g, dur: 1.1 });
}
