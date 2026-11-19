// Parca 5: Ornek 2 — q = 2t^2 mC, akim her an degisiyor (metin.md [PARCA 5], surum 3: her sayinin hesabi adim adim;
// grafik renkleri: egri mavi, kesenler gri kesikli, teget kirmizi duz — is emri 18.11.2026)
// Is emri D (19.11.2026): yeni tahta duzeni (kesen etiketleri koyu yesil, cizgileri gri kesikli kalir)
import { K, B, R, GR, G, L, S, E, Wt, text, path, line, dashed, erase, oval, under, axes, dot, curve, arrow, zig, row, kose, baslik } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  const q = (t) => 2 * t * t, i = (t) => 4 * t;
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  if (!(q(3) === 18 && q(4) === 32 && near(q(3.1), 19.22) && near(q(3.01), 18.1202) && i(3) === 12 && i(1.5) === 6)) throw new Error('q kontrol');
  const H = 'hdr';
  baslik('Örnek 2', 175, S(0) + 0.05, { g: H, size: 56, dur: 0.5 });
  text('q(t) = 2t² mC', L, 250, 52, K, Wt(2, 'kü'), { g: H, dur: 1.0 });
  // ---------------- Tahta A: ortalama ve turev
  let g = 'a';
  text('t saniye cinsinden', 480, 250, 38, G, S(3) + 0.1, { g, dur: 0.8 });
  const iq = text('i(3 s) = ?', L, 330, 52, B, Wt(4, 'te'), { g, dur: 0.8 });
  row(L, 410, 46, [{ s: 'q(3 s) = 2 × 3²', t: S(7) + 0.1, dur: 1.0 }, { s: '= 2 × 9', t: Wt(8, 'dokuz'), dur: 0.6 }, { s: '= 18 mC', t: Wt(8, 'on'), dur: 0.6 }], { g });
  text('Ortalama = 18 mC / 3 s = 6 mA', L, 485, 46, K, S(10) + 0.3, { g, dur: 1.8 });
  oval(iq.box, R, S(12) + 0.4, E(12) + 1.4 - S(12) - 0.4, { g });
  const XR = 1000;
  row(XR, 180, 52, [{ s: 'i = dq / dt', t: S(14), dur: 0.9, color: B }, { s: '= 2 × 2t', t: S(15) + 0.2, dur: 0.7, color: B }, { s: '= 4t mA', t: S(16) + 0.3, dur: 0.6, color: B }], { g });
  const r12 = row(XR, 265, 52, [{ s: 'i(3 s) = 4 × 3', t: S(18) + 0.4, dur: 1.0, color: B }, { s: '= 12 mA', t: S(19) + 0.4, dur: 0.6, color: B }], { g });
  oval(r12.box, R, E(19) - 0.2, 0.5, { g });
  text('12 mA, ortalamanın 2 katı (12 / 6 = 2)', XR, 350, 42, R, S(20) + 0.2, { g, dur: 1.8 });
  text('mC / s = mA', XR, 415, 38, G, S(21) + 0.4, { g, dur: 0.7 });
  text('q = 2t² ise 0 ile t arası ortalama akım, i(t) değerinin yarısı', L, 600, 40, K, S(23) + 0.2, { g, dur: 2.4 });
  text('i = 4t: sıfırdan başlar, doğrusal artar', L, 670, 40, G, S(24) + 0.2, { g, dur: 1.6 });
  text('Ortalama = (0 + 12) / 2 = 6 mA', L, 745, 44, K, S(26), { g, dur: 1.6 });
  erase(g, S(27) - 0.1);
  // ---------------- Tahta B: pencere hesaplari
  g = 'b';
  text('q(3 s) = 18 mC', L, 330, 44, B, Wt(28, 'üç'), { g, dur: 0.8 });
  baslik('Her pencerede üç adım', 175, S(29), { g, x: XR, size: 50, dur: 1.0 });
  text('1. q(son)', XR, 240, 42, K, S(30) + 0.2, { g, dur: 0.5 });
  text('2. Δq = q(son) − q(3 s)', XR, 298, 42, K, S(31) + 0.2, { g, dur: 1.2 });
  text('3. Δq / Δt', XR, 356, 42, K, S(33) + 0.3, { g, dur: 0.6 });
  const X1 = 330, X2 = 1010, FS = 40;
  const blok = (y, hd, l1, l2, l3) => {
    text(hd[0], L, y, FS, B, hd[1], { g, dur: 0.6 });
    const r1 = row(X1, y, FS, l1, { g });
    const t2 = text(l2[0], X1, y + 55, FS, K, l2[1], { g, dur: l2[2] ?? 1.0 });
    const r3 = row(X2, y + 55, FS, l3, { g });
    return r3.its[r3.its.length - 1];
  };
  const s1 = blok(440, ['Δt = 1 s', S(34) + 0.2],
    [{ s: 'q(4 s) = 2 × 4²', t: S(35), dur: 0.9 }, { s: '= 2 × 16', t: Wt(35, 'on'), dur: 0.5 }, { s: '= 32 mC', t: Wt(35, 'otuz'), dur: 0.5 }],
    ['Δq = 32 − 18 = 14 mC', S(36), 1.2],
    [{ s: 'Δq / Δt = 14 mC / 1 s', t: S(37), dur: 1.0 }, { s: '= 14 mA', t: Wt(37, 'on'), dur: 0.5 }]);
  const s2 = blok(585, ['Δt = 0,1 s', S(38) + 0.3],
    [{ s: 'q(3,1 s) = 2 × 3,1²', t: S(39), dur: 1.0 }, { s: '= 2 × 9,61', t: S(40) + 0.4, dur: 0.7 }, { s: '= 19,22 mC', t: S(41) + 0.5, dur: 0.7 }],
    ['Δq = 19,22 − 18 = 1,22 mC', S(42), 1.4],
    [{ s: 'Δq / Δt = 1,22 mC / 0,1 s', t: S(43), dur: 1.2 }, { s: '= 12,2 mA', t: Wt(43, 'on'), dur: 0.6 }]);
  const s3 = blok(730, ['Δt = 0,01 s', S(44) + 0.3],
    [{ s: 'q(3,01 s) = 2 × 3,01²', t: S(45), dur: 1.0 }, { s: '= 2 × 9,0601', t: S(46) + 0.4, dur: 0.8 }, { s: '= 18,1202 mC', t: S(47) + 0.5, dur: 0.8 }],
    ['Δq = 18,1202 − 18 = 0,1202 mC', S(48), 1.6],
    [{ s: 'Δq / Δt = 0,1202 mC / 0,01 s', t: S(49), dur: 1.4 }, { s: '= 12,02 mA', t: Wt(49, 'on'), dur: 0.7 }]);
  under(s1, B, Wt(51, 'dört'), 0.3, { g });
  under(s2, B, Wt(51, 'sonra', 0) + 0.2, 0.3, { g });
  under(s3, B, Wt(51, 'sonra', 1) + 0.2, 0.3, { g });
  text('Δt küçüldükçe sonuç 12 mA değerine yaklaşır', XR, 412, 38, B, S(52), { g, dur: 1.8 });
  erase(g, S(54) - 0.1);
  // ---------------- Tahta C: grafik (egri mavi, kesen gri kesikli, teget kirmizi duz)
  g = 'c';
  const ax = axes({ box: [190, 360, 860, 770], xr: [0, 4.4], yr: [0, 35], xt: [0, 1, 2, 3, 4], yt: [10, 20, 30], xl: 't (s)', yl: 'q (mC)', t: S(54) + 0.05, g, dt: 0.3, fs: 32 });
  curve(q, 0, 4.1, ax, B, 5, ax.end + 0.05, 1.0, { g });
  dot([ax.X(3), ax.Y(18)], 9, K, ax.end + 1.2, { g });
  const lineT = (a, qa, m, t0, t1, col, tt, dur, gg, dash) => { const lo = Math.max(t0, a + (0 - qa) / m), hi = Math.min(t1, a + (35 - qa) / m); const p0 = [ax.X(lo), ax.Y(qa + m * (lo - a))], p1 = [ax.X(hi), ax.Y(qa + m * (hi - a))]; return dash ? dashed(p0, p1, col, 3, tt, dur, { g: gg }) : line(p0, p1, col, 4, tt, dur, { g: gg }); };
  const T = 'tab', TX = 1000;
  const sc = 'sec';
  lineT(3, 18, 14, 2.2, 4.3, GR, S(56), 0.6, sc, true);
  dot([ax.X(4), ax.Y(32)], 7, GR, S(56) + 0.7, { g: sc });
  text('Kesen, Δt = 1 s: eğim = 14 mC / 1 s = 14 mA', TX, 200, 36, G, S(56) + 0.9, { g: sc, dur: 1.6 });
  lineT(3, 18, 12.2, 2.2, 4.3, GR, S(57) + 0.2, 0.6, sc, true);
  text('Kesen, Δt = 0,1 s: eğim = 12,2 mA', TX, 265, 36, G, S(57) + 0.9, { g: sc, dur: 1.3 });
  lineT(3, 18, 12, 2.0, 4.4, R, Wt(57, 'teğet'), 0.6, sc, false);
  text('Teğet: eğim = i(3 s) = 4 × 3 = 12 mA', TX, 330, 36, R, S(58), { g: sc, dur: 1.6 });
  text('Anlık akım = grafiğin o andaki eğimi', TX, 430, 44, B, S(59) + 0.3, { g: T, dur: 1.6 });
  erase(T, S(60) - 0.1); erase(sc, S(60) - 0.1);
  // ikinci soru: hangi anda i = 6 mA?
  const ch = 'ch';
  text('Hangi anda i = 6 mA?', TX, 200, 46, K, S(61), { g, dur: 1.0 });
  text('i = 4t mA olduğuna göre: 4t = 6', TX, 270, 44, K, Wt(62, 'dört', 1), { g, dur: 1.4 });
  const t15 = text('t = 6 / 4 = 1,5 s', TX, 345, 50, B, S(63), { g, dur: 1.0 });
  text('Ortalama değer = akımın 1,5 s anındaki değeri', TX, 425, 38, K, S(64) + 0.2, { g, dur: 1.9 });
  oval(t15.box, R, Wt(65, 'bir'), 0.5, { g });
  lineT(0, 0, 6, 0, 3, GR, S(66) + 0.2, 0.6, ch, true);
  text('Kesen: eğim = 18 mC / 3 s = 6 mA', TX, 510, 36, G, S(66) + 0.9, { g: ch, dur: 1.3 });
  lineT(1.5, 4.5, 6, 0.45, 2.6, R, Wt(66, 'teğet'), 0.6, ch, false);
  dot([ax.X(1.5), ax.Y(4.5)], 8, R, Wt(66, 'bir'), { g: ch });
  text('Teğet: eğim = 4 × 1,5 = 6 mA', TX, 570, 36, R, Wt(66, 'saniyede'), { g: ch, dur: 1.2 });
  erase(g, S(67) - 0.1); erase(ch, S(67) - 0.1); erase(H, S(67) - 0.1);
  // ---------------- Tahta D: Ohm
  g = 'ohm';
  const yW = 300;
  line([L, yW], [280, yW], K, 5, S(67) + 0.05, 0.3, { g });
  path([zig([280, yW], [900, yW], 220, 24)], K, 5, Wt(67, 'kiloohmluk') - 0.2, 0.9, { g });
  line([900, yW], [1060, yW], K, 5, Wt(67, 'dirençten') + 0.3, 0.3, { g });
  arrow(150, yW, 250, yW, B, Wt(67, 'geçseydi'), 0.35, { g, lw: 6, head: 16 });
  text('i', 200, yW - 28, 46, B, Wt(67, 'geçseydi') + 0.4, { g, align: 'c', dur: 0.2 });
  text('2 kΩ', 590, yW + 78, 44, K, Wt(68, 'ohm'), { g, align: 'c', dur: 0.4 });
  text('+', 300, yW - 40, 48, K, Wt(68, 'uçlarındaki'), { g, align: 'c', dur: 0.15 });
  text('−', 880, yW - 40, 48, K, Wt(68, 'uçlarındaki') + 0.3, { g, align: 'c', dur: 0.15 });
  text('v', 590, yW - 44, 46, K, Wt(68, 'gerilim'), { g, align: 'c', dur: 0.2 });
  text('v = R × i', L, 480, 54, K, Wt(68, 'direnç'), { g, dur: 0.8 });
  const v24 = row(L, 570, 54, [{ s: 'v(3 s) = 2 kΩ × 12 mA', t: S(69) + 0.3, dur: 1.6, color: B }, { s: '= 24 V', t: S(72), dur: 0.6, color: B }], { g });
  text('2 × 12 = 24', 1150, 480, 42, K, S(70), { g, dur: 0.8 });
  text('kΩ × mA = V', 1150, 545, 42, G, S(71) + 0.2, { g, dur: 0.8 });
  oval(v24.box, B, E(72) - 0.1, 0.5, { g });
  text('Ortalama akımla: 2 kΩ × 6 mA = 12 V', L, 670, 50, R, S(73) + 0.1, { g, dur: 2.0 });
  text('12 V, 24 V değerinin yarısı (24 / 2 = 12)', L, 740, 44, K, S(74), { g, dur: 1.6 });
  text('Akımdaki hata gerilime aynen taşınır', L, 805, 44, K, S(75) + 0.2, { g, dur: 1.6 });
}
