// Ders 1 Bolum 2 - Parca 2: Uygulamada: datasheet'teki akimlar + mini tasarim (pil omru) + abone cagrisi 1 (metin.md [PARCA 2])
// Tablo ajanin kendi cizimidir (datasheet tablosu kopyalanmaz). Degerler icerik.md 5b; 2N7002E tp = 10 us: dolayli dogrulandi (NOTLAR.md).
import { K, B, R, G, L, RX, S, E, Wt, text, row, path, line, arrow, frame, erase, oval, pulse, pad, kose, baslik, under, subBox, kutu } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: iki satir (cumle 0-3)
  baslik('Uygulamada: datasheet\'teki akımlar', 200, S(0) + 0.05, { g: 'a0', dur: 1.3, alt: S(0) + 1.45 });
  let g = 'a1';
  row(L, 310, 48, [{ s: '-', t: Wt(2, 'birincisi') }, { s: 'Sürekli akım:', t: Wt(2, 'sürekli'), dur: 0.6, color: B }, { s: 'uzun süre dayanılan', t: Wt(2, 'uzun'), dur: 0.9 }], { g });
  row(L, 390, 48, [{ s: '-', t: Wt(3, 'ikincisi') }, { s: 'Darbe akımı:', t: Wt(3, 'darbe'), dur: 0.6, color: B }, { s: 'yalnızca çok kısa süre', t: Wt(3, 'yalnızca'), dur: 1.0 }], { g });
  text('Bir elemanın veri sayfasında akım için iki satır', L, 500, 42, G, Wt(1, 'iki', 0, true), { g, dur: 1.6 });
  erase(g, S(4) - 0.1);
  // ---------------- B: tablo (cumle 4-14)
  g = 't';
  const C1 = L, C2 = 520, C3 = 1280;
  text('Parça', C1, 300, 44, G, S(4) + 0.05, { g, dur: 0.35 });
  text('Sürekli', C2, 300, 44, G, S(4) + 0.5, { g, dur: 0.4 });
  text('Kısa darbe', C3, 300, 44, G, S(4) + 1.0, { g, dur: 0.5 });
  line([C1, 322], [1800, 322], G, 3, S(4) + 1.6, 0.4, { g });
  text('1N4007 diyot', C1, 390, 42, K, Wt(4, 'diyota') - 0.1, { g, dur: 0.6 });
  const r1 = text('I_F_(_A_V_) = 1 A', C2, 390, 42, B, Wt(5, 'ortalama'), { g, dur: 0.7 });
  const r1s = text('Ortalama, T_A = 75 °C, 9,5 mm bacak', C2, 432, 30, G, S(6), { g, dur: 1.2 });
  pulse(subBox(r1s, 'Ortalama, ', 'T_A = 75 °C'), B, Wt(6, 'yetmiş'), E(6) + 0.2, { g });
  pulse(subBox(r1, 'I_F', '_(_A_V_)'), B, Wt(7, 'ortalama'), E(7) + 0.3, { g });
  text('I_F_S_M = 30 A', C3, 390, 42, B, Wt(8, 'ani'), { g, dur: 0.6 });
  text('Tek darbe, 8,3 ms', C3, 432, 30, G, Wt(8, 'sekiz'), { g, dur: 0.6 });
  text('2N7002E anahtar', C1, 540, 42, K, Wt(10, 'elektronik'), { g, dur: 0.6 });
  const r2 = text('I_D = 260 mA (25 °C)', C2, 540, 42, B, Wt(10, 'anahtarda'), { g, dur: 0.8 });
  const r2b = text('190 mA (85 °C)', C2, 592, 40, B, Wt(10, 'anahtarda') + 0.9, { g, dur: 0.6 });
  text('FR4 kart, 1 inç² bakır', C2, 632, 30, G, Wt(10, 'anahtarda') + 1.6, { g, dur: 0.8 });
  text('I_D_M = 1,2 A', C3, 540, 42, B, Wt(10, 'bir', 1), { g, dur: 0.5 });
  text('t_p = 10 μs', C3, 592, 34, G, Wt(10, 'ledde') - 0.2, { g, dur: 0.4 });
  text('TLHR540x LED', C1, 700, 42, K, Wt(10, 'ledde') + 0.2, { g, dur: 0.6 });
  text('I_F = 30 mA (≤ 65 °C)', C2, 700, 42, B, Wt(10, 'ledde') + 0.9, { g, dur: 0.8 });
  text('I_F_S_M = 1 A', C3, 700, 42, B, Wt(10, 'ledde') + 1.8, { g, dur: 0.5 });
  text('t_p ≤ 10 μs', C3, 742, 34, G, Wt(10, 'ledde') + 2.4, { g, dur: 0.4 });
  text('Sürekli (DC), ortalama değil', C2, 482, 30, G, Wt(11, 'ortalama'), { g, dur: 0.9 });
  const sn = text('Sınır, çalışma noktası değil', C3, 200, 40, R, Wt(12, 'sınırlardır'), { g, dur: 0.9 });
  under(sn, R, Wt(12, 'çalışma') + 0.6, 0.3, { g });
  text('Kaynak: Vishay 1N4001–1N4007 (2020), onsemi 2N7002E (2023), Vishay TLHR540x (2024) datasheet\'leri', C1, 800, 26, G, S(13) + 0.1, { g, dur: 2.4 });
  pulse(pad(r2.box, 2), B, Wt(14, 'yirmi'), Wt(14, 'seksen') - 0.1, { g });
  pulse(pad(r2b.box, 2), R, Wt(14, 'seksen'), E(14) + 0.3, { g });
  erase(g, S(15) - 0.1);
  // ---------------- C: uc soru (cumle 15-19)
  g = 'c';
  baslik('Üç soru', 310, S(15) + 0.1, { g, x: RX, size: 56, dur: 0.5, alt: Wt(15, 'üç') });
  text('1. Sürekli mi, darbe mi?', RX, 410, 48, K, S(16), { g, dur: 1.0 });
  text('2. Hangi süre için?', RX, 490, 48, K, S(17), { g, dur: 0.8 });
  text('3. Hangi sıcaklıkta, nasıl monte edilmiş?', RX, 570, 48, K, S(18), { g, dur: 1.5 });
  text('Satırı okurken kendine sor', L, 410, 46, G, Wt(15, 'satırını'), { g, dur: 1.0 });
  const ko = text('Koşulu okunmayan değer', L, 570, 50, R, S(19), { g, dur: 1.0 });
  text('okunmamış sayılır', L, 640, 50, R, Wt(19, 'okumamışsın'), { g, dur: 0.8 });
  erase(g, S(20) - 0.1); erase('a0', S(20) - 0.1);
  // ---------------- D: mini tasarim (cumle 20-28)
  g = 'd0';
  baslik('Mini tasarım: sensör ve düğme pil', 200, S(20) + 0.05, { g, dur: 1.2, alt: S(20) + 1.3 });
  g = 'd1';
  text('- Her 1 s\'de bir uyanır', L, 300, 44, K, Wt(21, 'her'), { g, dur: 0.9 });
  text('- Uyanık: 2 ms boyunca 10 mA', L, 370, 44, K, Wt(21, 'iki'), { g, dur: 1.2 });
  // akim grafigi (olcekli degil): 0-2 ms ve 1000-1002 ms darbeler, arada 5 uA taban
  g = 'gr';
  const ox = 1080, oy = 620;
  const ta = Wt(21, 'çekiyor') + 0.1;
  arrow(ox - 10, oy, 1800, oy, K, ta, 0.4, { g, lw: 4, head: 14 });
  arrow(ox, oy + 10, ox, 300, K, ta + 0.5, 0.4, { g, lw: 4, head: 14 });
  text('t (ms)', 1700, oy + 50, 34, K, ta + 1.0, { g, dur: 0.3 });
  text('i', ox - 30, 320, 36, K, ta + 1.4, { g, dur: 0.15 });
  text('- Uyku: 998 ms boyunca 5 μA', L, 440, 44, K, S(22), { g: 'd1', dur: 1.2 });
  const tp = Wt(22, 'beş') + 0.2;
  path([[[ox, 608], [ox, 380], [1140, 380], [1140, 608], [1600, 608], [1600, 380], [1660, 380], [1660, 608], [1760, 608]]], B, 5, tp, 1.2, { g });
  text('10 mA', 1160, 410, 34, B, tp + 1.3, { g, dur: 0.3 });
  text('5 μA', 1350, 592, 30, B, tp + 1.7, { g, dur: 0.25 });
  for (const [v, x] of [['0', ox + 8], ['2', 1140], ['1000', 1600], ['1002', 1664]]) text(v, x, oy + 40, 28, K, tp + 2.1, { g, dur: 0.15, align: 'c' });
  text('- Pil: CR2032, 225 mAh', L, 510, 44, K, S(23) + 0.2, { g: 'd1', dur: 1.0 });
  text('Kaynak: Panasonic CR2032 datasheet (2026)', L, 556, 28, G, Wt(23, 'miliamper'), { g: 'd1', dur: 1.0 });
  text('Ölçekli değil', 1380, 330, 34, G, Wt(23, 'saat') + 0.3, { g, dur: 0.5 });
  const my = text('- Miliamper saat (mAh) bir yük birimidir', L, 640, 44, K, S(24), { g: 'd1', dur: 1.4 });
  text('1 saat = 3600 s', L, 710, 44, K, S(25), { g: 'd1', dur: 0.7 });
  text('1 mAh = 1 mA × 3600 s = 3600 mC = 3,6 C', L, 785, 44, B, Wt(26, 'bir'), { g: 'd1', dur: 2.2 });
  text('mA × s = mC', 560, 710, 36, G, Wt(26, 'çünkü'), { g: 'd1', dur: 0.6 });
  pulse(pad(my.box, 2), B, S(28), E(28) + 0.3, { g: 'd1' });
  erase('d1', S(29) - 0.1);
  // ---------------- E: bir saniyedeki yuk (cumle 29-39)
  g = 'e';
  text('Bir saniyede çekilen yük?', L, 300, 44, R, S(29), { g, dur: 1.0 });
  text('Sabit akımda: q = i × Δt', RX + 80, 730, 42, B, S(30) + 0.1, { g, dur: 1.0 });
  const e = (s, y, c, t, d, z = 42) => text(s, L, y, z, c, t, { g, dur: d });
  e('Uyanıkken q = 10 mA × 2 ms = 20 μC', 370, B, Wt(31, 'uyanıkken'), 1.8);
  e('mA × ms = μC', 420, G, Wt(32, 'miliamperi'), 0.6, 32);
  e('Uykuda q = 5 μA × 998 ms', 480, B, S(33), 1.3);
  e('5 × 998 = 4990', 540, B, S(34), 0.8);
  e('μA × ms = nC', 590, G, S(35) + 0.2, 0.6, 32);
  e('q = 4990 nC = 4,99 μC', 650, B, S(36), 1.1);
  e('1000 nC = 1 μC', 700, G, S(37) + 0.2, 0.6, 32);
  e('Toplam q = 20 + 4,99 = 24,99 μC', 760, B, S(38) + 0.1, 1.6);
  erase('d0', S(39) - 0.1);
  const av = text('Ortalama i = 24,99 μC / 1 s ≈ 25 μA', RX, 200, 46, B, S(39), { g: 'e2', dur: 1.8 });
  oval(av.box, R, E(39) - 0.4, 0.6, { g: 'e2' });
  erase(g, S(40) - 0.1); erase('gr', S(40) - 0.1); erase('e2', S(40) - 0.1);
  // ---------------- F: pil omru (cumle 40-46)
  g = 'f';
  baslik('Pilin ömrü', 200, S(40), { g: 'f0', dur: 0.6 });
  const f = (s, y, c, t, d, z = 42) => text(s, RX, y, z, c, t, { g, dur: d });
  f('Ömür = kapasite / ortalama akım', 300, K, Wt(40, 'kapasite') - 0.3, 1.4);
  f('25 μA = 0,025 mA', 370, B, S(41), 0.9);
  f('mAh / mA = saat', 430, G, S(42) + 0.2, 0.7, 34);
  f('225 / 0,025 = 225 × 40 = 9000 saat', 500, B, S(43), 1.9);
  const om = text('9000 / 24 = 375 gün ≈ 1 yıl', RX, 580, 46, B, S(45), { g: 'om', dur: 1.4 });
  oval(om.box, B, E(45) - 0.3, 0.6, { g: 'f' });
  f('Gerçek ömür daha kısa olabilir: pay bırak', 660, G, S(46) + 0.2, 1.5, 34);
  text('Pil, ortalama akımla hesaplanır', L, 300, 44, G, Wt(40, 'ortalama'), { g, dur: 1.2 });
  erase(g, S(47) - 0.1);
  // ---------------- G: pahaliya patlayan hata (cumle 47-52)
  g = 'h';
  text('Ortalamayla, doğru:', RX, 500, 40, G, S(47) + 0.05, { g, dur: 0.8 });
  text('Tepe değerle hesap yanlış', L, 300, 48, K, Wt(47, 'tepe'), { g, dur: 1.1 });
  text('225 mAh / 10 mA = 22,5 saat', L, 380, 48, R, S(48), { g, dur: 1.4 });
  text('Bir günden kısa', L + 640, 380, 36, G, S(49), { g, dur: 0.6 });
  text('9000 / 22,5 = 400', L, 460, 48, K, S(50), { g, dur: 1.0 });
  const k4 = text('- Yaklaşık 400 kat kısa', L, 540, 48, R, Wt(51, 'yaklaşık'), { g, dur: 1.0 });
  under(k4, R, E(51) - 0.2, 0.35, { g });
  const b1 = text('Pil ömrünü ortalama akım belirler', L + 20, 650, 46, B, Wt(52, 'pilin'), { g, dur: 1.4 });
  const b2 = text('Kısa tepeyi darbe satırı sınırlar', L + 20, 720, 46, B, Wt(52, 'kısa'), { g, dur: 1.4 });
  frame([L, b1.box[1] - 14, Math.max(b1.box[2], b2.box[2]) + 20, b2.box[3] + 14], B, Wt(52, 'darbe'), 0.9, { g, lw: 3 });
  // abone karti 1 (birlestirmede bindirilir: 211,62 sn); kalem kutunun altini yavasca cizer
  path([[[L + 10, b2.box[3] + 24], [Math.max(b1.box[2], b2.box[2]) + 10, b2.box[3] + 24]]], B, 3, S(53) + 0.1, 2.4, { g });
}
