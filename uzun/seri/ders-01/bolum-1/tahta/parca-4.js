// Parca 4: Ornek 1 — basamakli akim ve ortalama (metin.md [PARCA 4])
import { K, B, R, GR, S, E, Wt, text, path, line, dashed, dashRect, frame, under, erase, oval, pulse, pad, axes, dot } from './motor.js';
export function build() {
  const g = 'o1';
  // soru
  text('Örnek 1', 80, 70, 48, R, S(0) + 0.05, { g, dur: 0.5 });
  text('0 ile 1 ms arası: 5 μC', 80, 150, 46, K, S(2), { g, dur: 1.1 });
  text('1 ile 4 ms arası: 3 μC', 80, 215, 46, K, S(3), { g, dur: 1.1 });
  text('her aralıkta yük düzgün akıyor', 80, 280, 42, GR, S(4) + 0.1, { g, dur: 1.2 });
  const aq = text('akım = ?', 80, 350, 54, B, Wt(5, 'akım'), { g, dur: 0.5 });
  // ilk refleks (eksik-hesaplar A: toplam yukun hesabi ekranda)
  const XR = 1100;
  text('5 μC + 3 μC = 8 μC', XR, 140, 44, K, S(6) + 0.3, { g, dur: 1.1 });
  text('8 μC / 4 ms = 2 mA', XR, 205, 48, K, S(7), { g, dur: 1.3 });
  const h2 = text('her an 2 mA mı?', 1530, 205, 42, R, Wt(9, 'herhangi'), { g, dur: 0.9 });
  text('5 μC / 1 ms = 5 mA', XR, 270, 46, B, S(11), { g, dur: 1.3 });
  text('μC / ms = mA', 1580, 270, 36, GR, Wt(12, 'mikrokulonu'), { g, dur: 0.7 });
  text('3 μC / 3 ms = 1 mA', XR, 335, 46, B, S(13), { g, dur: 1.3 });
  // grafik
  const ax = axes({ box: [150, 450, 900, 770], xr: [0, 4.4], yr: [0, 6], xt: [0, 1, 2, 3, 4], yt: [1, 2, 3, 4, 5], xl: 't (ms)', yl: 'i (mA)', t: S(14) + 0.05, g, skip0x: false, dt: 0.4, fs: 32 });
  const assertEq = (a, b) => { if (Math.abs(a - b) > 1e-6) throw new Error('grafik kontrol: ' + a + ' != ' + b); };
  assertEq((ax.Y(5) - ax.Y(0)) / (ax.Y(1) - ax.Y(0)), 5); assertEq((ax.X(4) - ax.X(0)) / (ax.X(1) - ax.X(0)), 4);
  line([ax.X(0), ax.Y(5)], [ax.X(1), ax.Y(5)], B, 6, Wt(17, 'beş'), 0.5, { g });
  dashed([ax.X(1), ax.Y(5)], [ax.X(1), ax.Y(1)], B, 2, Wt(17, 'beş') + 0.65, 0.3, { g, dash: 9, gap: 8 });
  line([ax.X(1), ax.Y(1)], [ax.X(4), ax.Y(1)], B, 6, Wt(18, 'bir', 1), 0.8, { g });
  // anlik degerler
  dot([ax.X(0.5), ax.Y(5)], 10, B, Wt(21, 'beş'), { g });
  text('5 mA', ax.X(0.5), ax.Y(5) - 34, 36, B, Wt(21, 'beş') + 0.2, { g, align: 'c', dur: 0.35 });
  dot([ax.X(3), ax.Y(1)], 10, B, Wt(23, 'bir'), { g });
  text('1 mA', ax.X(3), ax.Y(1) - 22, 36, B, Wt(23, 'bir') + 0.2, { g, align: 'c', dur: 0.35 });
  // pencere 0-0,5 ms (eksik-hesaplar A: 2,5 uC ve 6 uC'nin hesabi ekranda)
  const P = 'pw';
  dashRect([ax.X(0) + 4, ax.Y(5.3), ax.X(0.5), ax.Y(0) - 4], B, 3, Wt(25, 'pencere'), 0.5, { g: 'w1' });
  text('5 mA × 0,5 ms = 2,5 μC', XR, 410, 44, B, S(26), { g: P, dur: 1.2 });
  text('2,5 μC / 0,5 ms = 5 mA', XR, 470, 44, B, Wt(26, 'yarım'), { g: P, dur: 1.2 });
  erase('w1', S(28) - 0.1);
  // pencere 0-2 ms
  dashRect([ax.X(0) + 4, ax.Y(5.3), ax.X(2), ax.Y(0) - 4], R, 3, Wt(28, 'sıfır'), 0.6, { g: 'w2' });
  text('1 ile 2 ms: 1 mA × 1 ms = 1 μC', XR, 540, 42, K, Wt(29, 'sonraki'), { g: P, dur: 1.3 });
  text('5 μC + 1 μC = 6 μC', XR, 600, 42, K, Wt(29, 'toplam'), { g: P, dur: 1.0 });
  text('6 μC / 2 ms = 3 mA', XR, 660, 44, K, S(30), { g: P, dur: 1.1 });
  text('bu da hiçbir anın değeri değil', XR, 722, 40, R, S(31), { g: P, dur: 1.2 });
  erase('w2', S(33) - 0.1); erase(P, S(33) - 0.1);
  // ortalama cizgisi
  dashed([ax.X(0), ax.Y(2)], [ax.X(4.1), ax.Y(2)], R, 4, Wt(34, 'kesik'), 0.7, { g });
  text('ortalama 2 mA', ax.X(4.1) + 12, ax.Y(2) + 12, 36, R, Wt(34, 'çizelim'), { g, dur: 0.6 });
  text('2 mA × 4 ms = 8 μC', XR, 420, 46, K, Wt(38, 'toplam'), { g, dur: 1.2 });
  const tz = text('ortalama akım mı, anlık akım mı?', XR, 510, 44, R, Wt(40, 'tuzak'), { g, dur: 1.5 });
  frame(pad(tz.box, 8), R, Wt(41, 'ortalamayı'), 0.5, { g, lw: 3 });
  text('sabit aralığın içinde Δq / Δt anlık akımdır', XR, 600, 40, B, Wt(42, 'pencereyi'), { g, dur: 1.8 });
}
