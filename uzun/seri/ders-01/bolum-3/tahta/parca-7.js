// Ders 1 Bolum 3 - Parca 7: kapanis - Bilmen gerekenler, soru, sozlu rica, abone 2, siradaki ders, 20 sn bitis ekrani (metin.md [PARCA 7])
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, frame, zig, dot, erase, kose, baslik, under, mark } from './motor.js';
export function build({ dur }) {
  kose(0, { sabit: true });
  let g = 'kart';
  baslik('Bilmen gerekenler', 195, S(0) + 0.05, { g, size: 70, dur: 0.6, alt: S(0) + 0.7 });
  const md = (s, y, t, d) => text('- ' + s, L, y, 46, K, t, { g, dur: d });
  md('Gerilim iki nokta arasında, işaretiyle (v_a_b = W / q)', 310, Wt(1, 'gerilim'), 2.2);
  text('Bir noktanın gerilimi toprağa göredir', L + 40, 375, 38, G, S(2) + 0.05, { g, dur: 1.4 });
  md('Kısa devre yalnızca v = 0\'ı garanti eder', 460, Wt(3, 'kısa'), 1.8);
  text('Açık devre yalnızca i = 0\'ı; diğerini çevre belirler', L + 40, 525, 38, G, Wt(3, 'diğer'), { g, dur: 1.8 });
  md('İdeal gerilim kaynağı: gerilim sabit, akımı yük belirler', 610, S(4) + 0.05, 2.2);
  text('Gerçek kaynak: veri sayfasındaki sınırlar içinde', L + 40, 675, 38, G, S(5) + 0.1, { g, dur: 1.8 });
  mark('kart', [S(0), S(6) - 0.1]);
  erase(g, S(6) - 0.1);
  // soru
  g = 'soru';
  baslik('Sana bir soru', 195, S(6) + 0.05, { g, size: 60, dur: 0.7 });
  // sag: regulator kutusu + 22 Ω yuk
  frame([1050, 330, 1300, 470], K, Wt(7, 'regülatörün') - 0.3, 0.8, { g, lw: 4 });
  text('3,3 V', 1175, 390, 44, B, Wt(7, 'regülatörün') + 0.6, { g, dur: 0.4, align: 'c' });
  text('Regülatör', 1175, 445, 34, G, Wt(7, 'regülatörün') + 1.1, { g, dur: 0.5, align: 'c' });
  path([[[1300, 370], [1600, 370], [1600, 420]]], K, 5, Wt(7, 'çıkışına'), 0.5, { g });
  path([zig([1600, 420], [1600, 580], 120, 22)], K, 5, Wt(7, 'yirmi'), 0.5, { g });
  path([[[1600, 580], [1600, 640], [1175, 640], [1175, 470]]], K, 5, Wt(7, 'direnç'), 0.6, { g });
  text('22 Ω', 1650, 515, 44, K, Wt(7, 'ohmluk'), { g, dur: 0.4 });
  const sq = text('v = ?, i = ?', L, 340, 64, B, S(9) + 0.05, { g, dur: 0.9 });
  text('En büyük çıkış akımı 500 mA', L, 430, 42, G, S(8) + 0.05, { g, dur: 1.3 });
  text('Cevabını yorumlara yaz', L, 540, 56, K, S(10) + 0.05, { g, dur: 0.9 });
  under(sq, B, Wt(11, 'beğenip'), 0.8, { g });
  // abone karti 2: S(12) = 52,71 sn (birlestirmede bindirilir)
  erase(g, S(13) - 0.1);
  g = 'son';
  baslik('Sıradaki: Ders 2 - Bölüm 1/3', 195, S(13) + 0.05, { g, size: 66, dur: 0.9, alt: S(13) + 1.0 });
  text('- İdeal tel', L, 320, 54, B, Wt(13, 'teli') - 0.1, { g, dur: 0.5 });
  text('- İdeal anahtar', L, 410, 54, B, Wt(13, 'anahtarı') - 0.2, { g, dur: 0.6 });
  text('- Gerçek pil', L, 500, 54, B, Wt(13, 'gerçek'), { g, dur: 0.5 });
  const te = E(13) + 0.3; erase(g, te); erase('kose', te);
  // bitis ekrani alani (son ~20 sn): orta ve alt bos; sol ustte siradaki bolum + oynatma listesi
  mark('bitis', [te, dur]);
  const sb = text('Sıradaki: Ders 2 - Bölüm 1 — İdeal tel, anahtar ve gerçek pil', 80, 110, 50, K, te + 0.3, { g: 'bitis', dur: 2.4 });
  text('Oynatma listesi: Devre Teorisi I', 80, 180, 36, G, te + 2.9, { g: 'bitis', dur: 1.4 });
  path([[[84, 128], [sb.box[2] - 6, 128]]], K, 3, te + 4.6, 9.0, { g: 'bitis' });
}
