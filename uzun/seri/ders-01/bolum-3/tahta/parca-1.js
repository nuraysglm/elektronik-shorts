// Ders 1 Bolum 3 - Parca 1: kanca + intro karti (selam sesiyle) + Bolum 2'den kopru (metin.md [PARCA 1])
// Kanca ve intro kartinda kose basligi bilerek yok (ilk karede dogrudan cizim, UZUN.md 4a); intro araligi 46,0 sn'de 11,4 sn (parcalar.json).
import { K, B, R, G, L, RX, S, E, Wt, text, row, line, path, dot, arrow, zig, erase, mark, pulse, pad, kose, baslik, strike, under } from './motor.js';
export const INTRO = 46.0, ARA = 11.4;
export function build() {
  let g = 'kanca';
  // sag sutun: direnc (1 kΩ) + iki ucundan teller + uclari birlestiren kirmizi tel (kisa devre)
  const y0 = 400, xa = 1080, xb = 1640;
  line([xa, y0], [1240, y0], K, 5, 0.04, 0.3, { g });
  path([zig([1240, y0], [1480, y0], 200, 26)], K, 5, 0.4, 0.6, { g });
  line([1480, y0], [xb, y0], K, 5, 1.1, 0.3, { g });
  text('1 kΩ', 1360, y0 - 50, 46, K, 1.5, { g, align: 'c', dur: 0.4 });
  dot([xa, y0], 9, K, 2.0, { g }); dot([xb, y0], 9, K, 2.2, { g });
  path([[[xa, y0], [xa, 560], [xb, 560], [xb, y0]]], R, 6, 2.45, 0.9, { g });
  const iq = text('i = ?', 1360, 620, 52, B, 3.45, { g, align: 'c', dur: 0.4 });
  baslik('Kısa devre', 200, 4.0, { g, dur: 0.7 });
  const q0 = text('Telden i = 0 ?', L, 330, 60, R, Wt(1, 'kısa'), { g, dur: 0.7 });
  strike(q0, R, Wt(2, 'tam') - 0.4, 0.35, { g });
  const i3 = text('Telden i = 3 mA', L, 430, 60, B, Wt(2, 'tam'), { g, dur: 0.7 });
  arrow(1300, 560, 1420, 560, B, Wt(2, 'miliamper'), 0.35, { g, lw: 5 });
  strike(iq, B, Wt(2, 'miliamper') + 0.5, 0.3, { g });
  text('3 mA', 1460, 620, 52, B, Wt(2, 'miliamper') + 0.9, { g, dur: 0.4 });
  const i0 = text('Dirençten i = 0', L, 520, 60, B, Wt(2, 'direncin'), { g, dur: 0.7 });
  pulse(pad(i0.box, 4), B, Wt(2, 'geçmiyor'), E(3) + 0.3, { g });
  text('Kısa devrede sıfır olan gerilimdir (v = 0)', L, 640, 50, K, S(3) + 0.05, { g, dur: 1.6 });
  text('Açık ve kısa devreyi karıştırmak: en sık yapılan hata', L, 730, 44, R, Wt(4, 'karıştırmak'), { g, dur: 2.0 });
  erase(g, S(5) - 0.1);
  // vaat: bu bolumde
  g = 'vaat';
  baslik('Bu bölümde', 200, S(5), { g, dur: 0.7, alt: S(5) + 0.8 });
  const m = (s, y, t, d) => text('- ' + s, L, y, 50, K, t, { g, dur: d });
  m('Gerilim enerjiden', 300, Wt(5, 'gerilimi'), 0.9);
  m('Gerilimin işareti', 380, Wt(5, 'işaretiyle'), 0.9);
  m('Bir noktanın gerilimi neye göre?', 460, Wt(6, 'noktanın'), 1.4);
  m('Kısa devre ve ideal gerilim kaynağı', 540, S(7) + 0.05, 1.6);
  m('Veri sayfasında gerçek kaynak', 620, Wt(8, 'veri'), 1.3);
  erase(g, INTRO);
  // intro karti + selam (11,4 sn)
  const ti = INTRO + 0.1;
  const c1 = text('Devre Teorisi I: Ders 1 - Bölüm 3/3', 960, 460, 84, K, ti, { g: 'intro', align: 'c', dur: 2.6 });
  path([[[c1.box[0] + 10, 492], [c1.box[2] - 10, 492]]], R, 5, ti + 2.75, 0.4, { g: 'intro' });
  text('Gerilim, kısa devre ve ideal kaynak', 960, 590, 58, B, ti + 3.4, { g: 'intro', align: 'c', dur: 2.4 });
  erase('intro', INTRO + ARA); mark('intro', [INTRO, ARA]);
  // Bolum 2'den
  g = 'b2';
  kose(S(9) + 0.05, { g: 'kose', dur: 1.0 });
  baslik('Bölüm 2\'den', 200, Wt(9, 'akımın'), { g, dur: 0.6 });
  text('- Akımın değeri ve yönü (referans oku)', L, 310, 50, K, Wt(9, 'değeri'), { g, dur: 1.4 });
  row(L, 400, 50, [{ s: '- Açık devre:', t: Wt(9, 'açık'), dur: 0.6 }, { s: 'i = 0', t: Wt(9, 'sıfır'), dur: 0.4, color: B }], { g });
  const sm = text('Şimdi: gerilim', RX, 400, 56, G, Wt(10, 'ikinci'), { g, dur: 0.8 });
  under(sm, G, Wt(10, 'gerilim'), 0.4, { g });
}
