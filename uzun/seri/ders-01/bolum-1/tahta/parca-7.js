// Parca 7: kapanis — Bilmen gerekenler, soru, sozlu rica, sonraki bolum, 20 sn bitis ekrani alani (metin.md [PARCA 7])
import { K, B, R, GR, S, E, Wt, text, path, line, frame, under, erase, oval, pulse, pad, mark, dot } from './motor.js';
export function build({ ses, dur }) {
  let g = 'kart';
  const h = text('Bilmen gerekenler', 960, 200, 76, K, S(0) + 0.05, { g, align: 'c', dur: 1.0 });
  path([[[h.box[0] + 10, 232], [h.box[2] - 10, 232]]], R, 5, S(0) + 1.15, 0.4, { g });
  const md = (s, y, t, d) => { dot([300, y - 16], 9, B, t, { g }); return text(s, 330, y, 52, K, t + 0.2, { g, dur: d }); };
  md('Akım, yükün geçiş hızıdır (i = dq / dt)', 330, Wt(1, 'akım'), 2.0);
  md('Yük bölü süre yalnızca ortalamadır (Δq / Δt)', 420, Wt(2, 'delta'), 2.2);
  text('basamaklı akımda ortalama hiçbir anın değeri değildi', 330, 600, 38, GR, Wt(5, 'basamaklı'), { g, dur: 1.8 });
  text('artan akımda anlık değer ortalamanın 2 katıydı', 330, 655, 38, GR, Wt(6, 'sürekli'), { g, dur: 1.8 });
  md('Yük en büyükken akım sıfır olabilir', 510, Wt(7, 'yük'), 1.6);
  text('gerilim de anlık akımla bulunur (v = R × i)', 330, 710, 38, GR, Wt(8, 'gerilimi'), { g, dur: 1.6 });
  mark('kart', [S(0), S(9) - 0.1]);
  erase(g, S(9) - 0.1);
  g = 'soru';
  text('Sana bir soru', 960, 220, 56, R, S(9) + 0.05, { g, align: 'c', dur: 0.7 });
  text('q(t) = (4t − t²) mC', 960, 340, 70, K, Wt(10, 'dört'), { g, align: 'c', dur: 1.3 });
  const sq = text('akım hangi anda sıfır olur?', 960, 450, 60, B, Wt(10, 'akım'), { g, align: 'c', dur: 1.3 });
  text('ipucu: tepe noktası', 960, 540, 46, GR, S(11) + 0.1, { g, align: 'c', dur: 0.8 });
  text('cevabını yorumlara yaz', 960, 630, 52, R, S(12), { g, align: 'c', dur: 0.9 });
  under(sq, B, Wt(13, 'beğenip'), 0.6, { g });
  erase(g, S(15) - 0.1);
  g = 'son';
  const sr = text('Sıradaki: Bölüm 2/3', 960, 320, 72, K, S(15) + 0.05, { g, align: 'c', dur: 1.0 });
  under(sr, R, S(15) + 1.2, 0.4, { g });
  text('akımın yönü', 960, 440, 52, B, Wt(15, 'yönünü'), { g, align: 'c', dur: 0.6 });
  text('açık devre', 960, 520, 52, B, Wt(15, 'açık'), { g, align: 'c', dur: 0.6 });
  text('akım grafiğinden geçen yük', 960, 600, 52, B, Wt(15, 'grafiğinden'), { g, align: 'c', dur: 1.2 });
  const te = E(15) + 0.3; erase(g, te);
  // bitis ekrani alani (son ~20 sn): orta ve alt bos; sol ustte yavasca yazilan seri adi
  mark('bitis', [te, dur]);
  text('Devre Teorisi I', 80, 90, 46, GR, te + 0.3, { g: 'bitis', dur: 3.0 });
}
