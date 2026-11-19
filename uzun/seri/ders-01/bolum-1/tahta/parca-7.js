// Parca 7: kapanis — Bilmen gerekenler, soru, sozlu rica, sonraki bolum, 20 sn bitis ekrani alani (metin.md [PARCA 7])
// Is emri D (19.11.2026): yeni tahta duzeni; bitis ekraninda kose basligi silinir, sol ustte yalnizca "Sıradaki" + oynatma listesi.
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, frame, under, erase, oval, pulse, pad, mark, dot, kose, baslik } from './motor.js';
export function build({ ses, dur }) {
  kose(0, { sabit: true });
  let g = 'kart';
  baslik('Bilmen gerekenler', 195, S(0) + 0.05, { g, size: 70, dur: 1.0, alt: S(0) + 1.15 });
  const md = (s, y, t, d) => text('- ' + s, L, y, 50, K, t, { g, dur: d });
  md('Akım, yükün geçiş hızıdır (i = dq / dt)', 310, Wt(1, 'akım'), 2.0);
  md('Yük bölü süre yalnızca ortalamadır (Δq / Δt)', 395, Wt(2, 'delta'), 2.2);
  text('Basamaklı akımda ortalama hiçbir anın değeri değildi', L + 40, 580, 40, G, Wt(5, 'basamaklı'), { g, dur: 1.8 });
  text('Artan akımda anlık değer ortalamanın 2 katıydı', L + 40, 645, 40, G, Wt(6, 'sürekli'), { g, dur: 1.8 });
  md('Yük en büyükken akım sıfır olabilir', 480, Wt(7, 'yük'), 1.6);
  text('Gerilim de anlık akımla bulunur (v = R × i)', L + 40, 710, 40, G, Wt(8, 'gerilimi'), { g, dur: 1.6 });
  mark('kart', [S(0), S(9) - 0.1]);
  erase(g, S(9) - 0.1);
  g = 'soru';
  baslik('Sana bir soru', 195, S(9) + 0.05, { g, size: 60, dur: 0.7 });
  text('q(t) = (4t − t²) mC', L, 330, 70, K, Wt(10, 'dört'), { g, dur: 1.3 });
  const sq = text('Akım hangi anda sıfır olur?', L, 450, 60, B, Wt(10, 'akım'), { g, dur: 1.3 });
  text('İpucu: tepe noktası', RX + 100, 330, 50, G, S(11) + 0.1, { g, dur: 0.8 });
  text('Cevabını yorumlara yaz', RX + 100, 450, 56, R, S(12), { g, dur: 0.9 });
  under(sq, B, Wt(13, 'beğenip'), 0.6, { g });
  erase(g, S(15) - 0.1);
  g = 'son';
  baslik('Sıradaki: Bölüm 2/3', 195, S(15) + 0.05, { g, size: 66, dur: 1.0, alt: S(15) + 1.2 });
  text('- Akımın yönü', L, 320, 54, B, Wt(15, 'yönünü'), { g, dur: 0.6 });
  text('- Açık devre', L, 410, 54, B, Wt(15, 'açık'), { g, dur: 0.6 });
  text('- Akım grafiğinden geçen yük', L, 500, 54, B, Wt(15, 'grafiğinden'), { g, dur: 1.2 });
  const te = E(15) + 0.3; erase(g, te); erase('kose', te);
  // bitis ekrani alani (son ~20 sn, UZUN.md 4a, is emri B): orta ve alt bos; sol ustte siradaki bolum + oynatma listesi
  mark('bitis', [te, dur]);
  text('Sıradaki: Bölüm 2 — Akımın yönü, açık devre ve akım grafiğinden geçen yük', 80, 110, 50, K, te + 0.3, { g: 'bitis', dur: 2.6 });
  text('Oynatma listesi: Devre Teorisi I', 80, 180, 36, G, te + 3.1, { g: 'bitis', dur: 1.4 });
}
