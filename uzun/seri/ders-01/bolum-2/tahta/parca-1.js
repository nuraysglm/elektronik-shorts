// Ders 1 Bolum 2 - Parca 1: kanca + intro karti (selam sesiyle) + Bolum 1'den kopru (metin.md [PARCA 1])
// Kanca ve intro kartinda kose basligi bilerek yok (ilk karede dogrudan cizim, UZUN.md 4a); intro araligi 37,5 sn'de 11,4 sn (parcalar.json).
import { K, B, R, G, L, RX, S, E, Wt, text, row, line, path, dot, erase, mark, pulse, pad, kose, baslik, strike, under } from './motor.js';
export const INTRO = 37.5, ARA = 11.4;
export function build() {
  let g = 'kanca';
  // acik anahtar sembolu (sag sutun): iki baglanti noktasi, kalkik kol
  line([1000, 430], [1200, 430], K, 5, 0.04, 0.35, { g });
  dot([1200, 430], 9, K, 0.45, { g });
  line([1200, 430], [1440, 330], K, 5, 0.65, 0.35, { g });
  dot([1480, 430], 9, K, 1.05, { g });
  line([1480, 430], [1720, 430], K, 5, 1.25, 0.35, { g });
  text('v = ?', 1340, 520, 64, B, 1.7, { g, align: 'c', dur: 0.5 });
  baslik('Açık anahtar', 200, 2.3, { g, dur: 0.8 });
  const v0 = text('v = 0 V ?', L, 330, 64, R, S(1) + 0.1, { g, dur: 0.7 });
  text('i = 0', L, 430, 64, B, Wt(2, 'akım'), { g, dur: 0.5 });
  strike(v0, R, Wt(3, 'dokuz') - 0.5, 0.35, { g });
  const v9 = text('v = 9 V', v0.box[2] + 50, 330, 64, B, Wt(3, 'dokuz'), { g, dur: 0.6 });
  pulse(pad(v9.box, 4), B, Wt(3, 'volt') + 0.2, E(4) + 0.3, { g });
  text('Akım sıfır, gerilim sıfır değil', L, 560, 52, K, S(4) + 0.1, { g, dur: 1.4 });
  text('İkisini karıştırmak: en sık yapılan hata', L, 650, 46, R, Wt(5, 'en'), { g, dur: 1.8 });
  erase(g, S(6) - 0.1);
  // vaat: bu bolumde
  g = 'vaat';
  baslik('Bu bölümde', 200, S(6), { g, dur: 0.7, alt: S(6) + 0.8 });
  const m = (s, y, t, d) => text('- ' + s, L, y, 50, K, t, { g, dur: d });
  m('Açık anahtarın gerilimi', 300, Wt(6, 'açık'), 1.1);
  m('Akımın yönü ve akım grafiğinden yük', 380, Wt(7, 'akımı'), 1.6);
  m('İstenen akımı veren devre', 460, Wt(8, 'istenen'), 1.2);
  m('Veri sayfasında sürekli ve darbe akımı', 540, Wt(9, 'veri'), 1.7);
  m('Pil ömrü ortalama akımdan', 620, Wt(9, 'pilin'), 1.2);
  erase(g, INTRO);
  // intro karti + selam (11,4 sn)
  const ti = INTRO + 0.1;
  const c1 = text('Devre Teorisi I: Ders 1 - Bölüm 2/3', 960, 460, 84, K, ti, { g: 'intro', align: 'c', dur: 2.6 });
  path([[[c1.box[0] + 10, 492], [c1.box[2] - 10, 492]]], R, 5, ti + 2.75, 0.4, { g: 'intro' });
  text('Akımın yönü, açık devre ve akım grafiğinden yük', 960, 590, 58, B, ti + 3.4, { g: 'intro', align: 'c', dur: 2.6 });
  erase('intro', INTRO + ARA); mark('intro', [INTRO, ARA]);
  // Bolum 1'den
  g = 'b1';
  kose(S(10) + 0.05, { g: 'kose', dur: 1.0 });
  baslik('Bölüm 1\'den', 200, Wt(10, 'akımı'), { g, dur: 0.6 });
  row(L, 310, 56, [{ s: '- Akım', t: Wt(10, 'yükün'), dur: 0.4 }, { s: 'i = dq / dt', t: Wt(10, 'geçme'), dur: 0.8, color: B }], { g });
  row(L, 410, 56, [{ s: '- Ortalama akım', t: Wt(11, 'ortalama'), dur: 0.7 }, { s: 'Δq / Δt', t: Wt(11, 'anlık'), dur: 0.5, color: B }], { g });
  const sm = text('Şimdi: tasarımda karşılığı', RX, 410, 50, G, Wt(11, 'tasarımda'), { g, dur: 1.0 });
  under(sm, G, Wt(11, 'bakalım'), 0.4, { g });
}
