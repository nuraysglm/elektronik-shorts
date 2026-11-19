// Ders 1 Bolum 2 - Parca 8: kapanis - Bilmen gerekenler, soru, sozlu rica, abone 2, siradaki bolum, 20 sn bitis ekrani (metin.md [PARCA 8])
import { K, B, R, G, GR, L, RX, S, E, Wt, text, path, line, dashed, erase, axes, kose, baslik, under, mark } from './motor.js';
export function build({ dur }) {
  kose(0, { sabit: true });
  let g = 'kart';
  baslik('Bilmen gerekenler', 195, S(0) + 0.05, { g, size: 70, dur: 0.9, alt: S(0) + 1.0 });
  const md = (s, y, t, d) => text('- ' + s, L, y, 46, K, t, { g, dur: d });
  md('Her akımın değeri ve yönü var (referans okuyla)', 310, S(1), 2.0);
  md('Açık devre yalnızca i = 0\'ı garanti eder', 390, S(2), 1.8);
  text('Uçlarındaki gerilimi çevresindeki devre belirler', L + 40, 450, 36, G, S(3), { g, dur: 1.6 });
  md('Yük, akım grafiğinin altındaki alandır', 530, Wt(5, 'geçen'), 1.6);
  text('Eksenin altındaki alan eksi sayılır', L + 40, 590, 36, G, Wt(5, 'eksenin'), { g, dur: 1.3 });
  text('Veri sayfasında:', L, 670, 40, G, S(6), { g, dur: 0.7 });
  text('- Pil ömrünü ortalama akım belirler', L + 40, 725, 38, G, Wt(6, 'pilin'), { g, dur: 1.3 });
  text('- Kısa zorlanmanın sınırını darbe akımı verir', L + 40, 785, 38, G, Wt(6, 'kısa'), { g, dur: 1.6 });
  mark('kart', [S(0), S(7) - 0.1]);
  erase(g, S(7) - 0.1);
  // soru
  g = 'soru';
  baslik('Sana bir soru', 195, S(7) + 0.05, { g, size: 60, dur: 0.7 });
  const ax = axes({ box: [1150, 320, 1700, 640], xr: [0, 3.5], yr: [-4, 6], xt: [0, 1, 2, 3], yt: [-3, 5], xl: 't (s)', yl: 'i (mA)', t: S(8), g, skip0x: true, fs: 30, dt: 0.3, xtdx: 16 });
  const P = (t, v) => [ax.X(t), ax.Y(v)];
  path([[P(0, 5), P(2, 5)]], B, 6, Wt(8, 'beş'), 0.5, { g });
  dashed(P(2, 5), P(2, -3), GR, 2, Wt(8, 'sonraki'), 0.25, { g, dash: 8, gap: 7 });
  path([[P(2, -3), P(3, -3)]], B, 6, Wt(8, 'eksi'), 0.4, { g });
  const sq = text('3 s\'de net q = ?', L, 340, 64, B, S(9), { g, dur: 0.9 });
  text('Ok yönünde', L, 420, 40, G, Wt(9, 'ok'), { g, dur: 0.5 });
  text('Cevabını yorumlara yaz', L, 520, 56, K, S(10), { g, dur: 0.9 });
  under(sq, B, Wt(11, 'beğenip'), 0.8, { g });
  // abone karti 2: S(12) = 46,97 sn (birlestirmede bindirilir)
  erase(g, S(13) - 0.1);
  g = 'son';
  baslik('Sıradaki: Bölüm 3/3', 195, S(13) + 0.05, { g, size: 66, dur: 0.9, alt: S(13) + 1.0 });
  text('- Gerilim', L, 320, 54, B, Wt(13, 'gerilimin'), { g, dur: 0.5 });
  text('- Kısa devre', L, 410, 54, B, Wt(13, 'kısa'), { g, dur: 0.6 });
  text('- İdeal kaynak', L, 500, 54, B, Wt(13, 'ideal'), { g, dur: 0.6 });
  const te = E(13) + 0.3; erase(g, te); erase('kose', te);
  // bitis ekrani alani (son ~20 sn): orta ve alt bos; sol ustte siradaki bolum + oynatma listesi
  mark('bitis', [te, dur]);
  const sb = text('Sıradaki: Bölüm 3 — Gerilim, kısa devre ve ideal kaynak', 80, 110, 50, K, te + 0.3, { g: 'bitis', dur: 2.4 });
  text('Oynatma listesi: Devre Teorisi I', 80, 180, 36, G, te + 2.9, { g: 'bitis', dur: 1.4 });
  path([[[84, 128], [sb.box[2] - 6, 128]]], K, 3, te + 4.6, 9.0, { g: 'bitis' });
}
