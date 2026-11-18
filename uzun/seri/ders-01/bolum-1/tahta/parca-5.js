// Parca 5: Ornek 2 — q = 2t^2 mC, akim her an degisiyor (metin.md [PARCA 5])
import { K, B, R, GR, S, E, Wt, text, path, line, dashed, frame, under, erase, oval, pulse, pad, axes, dot, curve, arrow, zig } from './motor.js';
export function build() {
  let g = 'o2';
  text('Örnek 2', 80, 68, 46, R, S(0) + 0.05, { g, dur: 0.5 });
  text('q(t) = 2t² mC', 80, 140, 54, K, Wt(2, 'kü'), { g, dur: 1.0 });
  text('t saniye cinsinden', 80, 205, 40, GR, S(4) + 0.1, { g, dur: 0.8 });
  const iq = text('i(3 s) = ?', 80, 280, 54, B, Wt(5, 'üçüncü'), { g, dur: 0.8 });
  const u = 'u2';
  text('q(3 s) = 2 × 9 = 18 mC', 80, 365, 48, K, S(7) + 0.1, { g: u, dur: 1.4 });
  text('18 mC / 3 s = 6 mA', 80, 435, 48, K, S(8), { g: u, dur: 1.2 });
  const circ = path([[[iq.box[0] - 30, (iq.box[1] + iq.box[3]) / 2], ...Array.from({ length: 70 }, (_, k) => { const a = Math.PI + k / 66 * 2 * Math.PI; return [(iq.box[0] + iq.box[2]) / 2 + ((iq.box[2] - iq.box[0]) / 2 + 30) * Math.cos(a), (iq.box[1] + iq.box[3]) / 2 + ((iq.box[3] - iq.box[1]) / 2 + 6) * Math.sin(a)]; })]], R, 4, Wt(9, 'tahmin'), E(9) + 1.4 - Wt(9, 'tahmin'), { g });
  circ.wrap = true;
  const XR = 1000;
  text('i = dq / dt = 4t mA', XR, 140, 54, B, S(12), { g, dur: 1.4 });
  const i12 = text('i(3 s) = 12 mA', XR, 228, 54, B, Wt(14, 'üç'), { g, dur: 1.0 });
  oval(i12.box, R, S(15), 0.5, { g });
  text('ortalamanın 2 katı', XR + 470, 228, 42, R, Wt(15, 'iki'), { g: u, dur: 0.8 });
  text('mC / s = mA', XR, 305, 40, GR, S(16) + 0.2, { g: u, dur: 0.7 });
  text('q = 2t² için 0 ile t arası ortalama, i(t) değerinin yarısı', XR, 370, 38, K, S(19) + 0.3, { g: u, dur: 2.2 });
  text('i sıfırdan düzgün artıyor', XR, 435, 38, GR, S(20) + 0.2, { g: u, dur: 1.0 });
  erase(u, S(22) - 0.1);
  // grafik
  const ax = axes({ box: [150, 480, 860, 758], xr: [0, 4.4], yr: [0, 35], xt: [0, 1, 2, 3, 4], yt: [10, 20, 30], xl: 't (s)', yl: 'q (mC)', t: S(22) + 0.05, g, dt: 0.3, fs: 32 });
  const q = (t) => 2 * t * t;
  if (q(3) !== 18 || q(4) !== 32) throw new Error('q kontrol');
  curve(q, 0, 4.1, ax, B, 5, ax.end + 0.05, 1.0, { g });
  dot([ax.X(3), ax.Y(18)], 9, K, ax.end + 1.2, { g });
  // dogru: (a, q(a)) ve egim m; t araliginda, eksen icinde kirpilir
  const lineT = (a, qa, m, t0, t1, col, tt, dur, gg, dash) => { const lo = Math.max(t0, a + (0 - qa) / m), hi = Math.min(t1, a + (35 - qa) / m); const p0 = [ax.X(lo), ax.Y(qa + m * (lo - a))], p1 = [ax.X(hi), ax.Y(qa + m * (hi - a))]; return dash ? dashed(p0, p1, col, 3, tt, dur, { g: gg }) : line(p0, p1, col, 4, tt, dur, { g: gg }); };
  // tablo
  const T = 'tab', TX = 1000, TX2 = 1260;
  text('Δt', TX, 480, 44, GR, S(25), { g: T, dur: 0.3 });
  text('Δq / Δt', TX2, 480, 44, GR, S(25) + 0.4, { g: T, dur: 0.6 });
  line([TX, 498], [TX2 + 300, 498], GR, 3, S(25) + 1.1, 0.3, { g: T });
  lineT(3, 18, 14, 2.2, 4.3, K, Wt(26, 'otuz'), 0.6, 'sec', true);
  dot([ax.X(4), ax.Y(32)], 7, K, Wt(26, 'otuz') + 0.7, { g: 'sec' });
  text('1 s', TX, 555, 44, K, Wt(27, 'on'), { g: T, dur: 0.3 });
  text('14 mA', TX2, 555, 44, K, Wt(27, 'on', 1), { g: T, dur: 0.5 });
  lineT(3, 18, 12.2, 2.2, 4.3, K, Wt(28, 'onda'), 0.6, 'sec', true);
  text('0,1 s', TX, 620, 44, K, S(29), { g: T, dur: 0.35 });
  text('12,2 mA', TX2, 620, 44, K, Wt(29, 'on'), { g: T, dur: 0.6 });
  text('0,01 s', TX, 685, 44, K, Wt(30, 'yüzde'), { g: T, dur: 0.4 });
  text('12,02 mA', TX2, 685, 44, K, Wt(30, 'on'), { g: T, dur: 0.6 });
  text('Δt küçüldükçe sonuç 12 mA değerine yaklaşır', TX, 760, 40, B, S(32), { g: T, dur: 1.8 });
  lineT(3, 18, 12, 2.0, 4.4, B, Wt(36, 'teğet'), 0.6, 'sec', false);
  text('teğetin eğimi = 12 mA', ax.X(0.25), ax.Y(28), 36, B, Wt(37, 'eğimidir') - 0.3, { g: 'sec', dur: 0.6 });
  // ikinci soru: hangi anda i = 6 mA?
  erase(T, S(38) - 0.1); erase('sec', S(38) - 0.1);
  text('i = 6 mA hangi anda?', TX, 555, 48, K, Wt(39, 'akım'), { g, dur: 1.0 });
  text('4t = 6', TX, 630, 48, K, Wt(40, 'dört'), { g, dur: 0.6 });
  const t15 = text('t = 1,5 s', TX, 705, 52, B, Wt(40, 'bir'), { g, dur: 0.7 });
  oval(t15.box, R, E(42) - 0.4, 0.5, { g });
  lineT(0, 0, 6, 0, 3, K, Wt(43, 'kirişe') - 0.3, 0.6, 'ch', true);
  lineT(1.5, 4.5, 6, 0.45, 2.6, B, Wt(43, 'teğet'), 0.6, 'ch', false);
  dot([ax.X(1.5), ax.Y(4.5)], 8, B, Wt(43, 'bir'), { g: 'ch' });
  text('eğim = 6 mA', ax.X(0.15), ax.Y(14), 34, B, Wt(43, 'saniyede'), { g: 'ch', dur: 0.6 });
  erase(g, S(44) - 0.1); erase('ch', S(44) - 0.1);
  // direnc
  g = 'ohm';
  const yW = 300;
  line([260, yW], [420, yW], K, 5, S(44) + 0.05, 0.3, { g });
  path([zig([420, yW], [1040, yW], 220, 24)], K, 5, Wt(44, 'kiloohmluk') - 0.2, 0.9, { g });
  line([1040, yW], [1200, yW], K, 5, Wt(44, 'dirençten') + 0.3, 0.3, { g });
  arrow(290, yW, 390, yW, B, Wt(44, 'geçseydi'), 0.35, { g, lw: 6, head: 16 });
  text('i', 340, yW - 28, 46, B, Wt(44, 'geçseydi') + 0.4, { g, align: 'c', dur: 0.2 });
  text('2 kΩ', 730, yW + 78, 44, K, Wt(45, 'ohm'), { g, align: 'c', dur: 0.4 });
  text('+', 440, yW - 40, 48, K, Wt(45, 'uçlarındaki'), { g, align: 'c', dur: 0.15 });
  text('−', 1020, yW - 40, 48, K, Wt(45, 'uçlarındaki') + 0.3, { g, align: 'c', dur: 0.15 });
  text('v', 730, yW - 44, 46, K, Wt(45, 'gerilim'), { g, align: 'c', dur: 0.2 });
  text('v = R × i', 260, 490, 54, K, Wt(45, 'direnç'), { g, dur: 0.8 });
  const v24 = text('v(3 s) = 2 kΩ × 12 mA = 24 V', 260, 580, 54, B, S(46) + 0.1, { g, dur: 2.0 });
  text('ortalama akımla: 2 kΩ × 6 mA = 12 V', 260, 670, 50, R, S(47) + 0.1, { g, dur: 2.0 });
  text('akımdaki hata gerilime aynen taşınır', 260, 765, 48, K, S(48) + 0.2, { g, dur: 1.6 });
  oval(v24.box, B, E(46) - 0.4, 0.5, { g });
}
