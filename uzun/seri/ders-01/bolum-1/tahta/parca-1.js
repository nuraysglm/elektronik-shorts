// Parca 1: kanca + intro karti + giris (metin.md [PARCA 1])
import { K, B, R, GR, S, E, Wt, text, path, line, dashed, arrow, frame, under, erase, oval, mark, pulse, pad } from './motor.js';
export function build({ ses }) {
  const g = 'kanca';
  // --- ilk kare: devre kutusu + kapali tel halkasi + kesit
  const bx = [200, 330, 440, 480];
  frame(bx, K, 0.04, 0.7, { g, lw: 5 });
  text('devre', 320, 418, 48, K, 0.8, { g, align: 'c', dur: 0.4 });
  path([[[320, 330], [320, 230], [1180, 230], [1180, 580], [320, 580], [320, 480]]], K, 5, 1.3, 1.5, { g });
  dashed([750, 180], [750, 282], K, 4, 2.9, 0.35, { g, dash: 12, gap: 9 });
  const iq = text('i = ?', 790, 150, 52, B, 3.4, { g, dur: 0.5 });
  // --- "gecen yuku gecen sureye bolmek"
  const t1 = Wt(1, 'geçen');
  const f1 = text('akım = geçen yük / süre', 200, 700, 52, K, t1, { g, dur: 1.5 });
  text('?', f1.box[2] + 12, 700, 52, R, Wt(1, 'bölmek'), { g, dur: 0.2 });
  // --- "sifir diyebilir mi": zit yonlu iki ok + kirmizi soru
  arrow(780, 202, 880, 202, B, Wt(2, 'akım'), 0.35, { g, lw: 5, head: 14 });
  arrow(720, 258, 620, 258, B, Wt(2, 'durmadan'), 0.35, { g, lw: 5, head: 14 });
  const oq = text('ortalama = 0 ?', 1290, 380, 56, R, Wt(2, 'sıfır'), { g, dur: 0.8 });
  oval(oq.box, R, Wt(3, 'hesap'), 0.6, { g });
  pulse(pad(f1.box, 4), B, Wt(3, 'hesap') + 0.7, E(4) + 0.3, { g });
  // --- vaat
  under(iq, B, Wt(6, 'sonunda'), 0.35, { g });
  const v1 = text('ortalama akım', 1290, 520, 44, K, Wt(7, 'ortalama'), { g, dur: 0.6 });
  const v2 = text('anlık akım', 1290, 590, 44, B, Wt(7, 'anlık'), { g, dur: 0.5 });
  line([v1.box[0] - 30, 498], [v1.box[0] - 30, 612], K, 3, E(7) - 0.4, 0.3, { g });
  text('yük en büyükken akım sıfır?', 1290, 700, 44, R, Wt(8, 'yük'), { g, dur: 1.3 });
  // --- intro karti (4 sn, sessiz)
  const ti = 32.96 + 0.1; erase(g, 32.96);
  const c1 = text('Devre Teorisi I: Ders 1 - Bölüm 1/3', 960, 460, 84, K, ti, { g: 'intro', align: 'c', dur: 1.6 });
  path([[[c1.box[0] + 10, 492], [c1.box[2] - 10, 492]]], R, 5, ti + 1.75, 0.35, { g: 'intro' });
  text('Akım nedir? Ortalama akım ile anlık akım', 960, 590, 58, B, ti + 2.2, { g: 'intro', align: 'c', dur: 1.25 });
  erase('intro', 32.96 + 4.0); mark('intro', [32.96, 4.0]);
  // --- giris: buyuklukler
  const h = text('temel büyüklükler', 960, 300, 64, K, Wt(9, 'büyüklükleri'), { g: 'g', align: 'c', dur: 1.0 });
  under(h, K, Wt(9, 'tanımlayarak'), 0.4, { g: 'g' });
  const ty = text('Devre Teorisi I', 960, 140, 44, GR, S(9) + 0.1, { g: 'g', align: 'c', dur: 0.7 });
  const y1 = text('yük', 640, 480, 88, B, Wt(11, 'yük'), { g: 'g', align: 'c', dur: 0.4 });
  const a1 = text('akım', 1020, 480, 88, B, Wt(11, 'akım'), { g: 'g', align: 'c', dur: 0.45 });
  text('gerilim üçüncü bölümde', 1340, 478, 46, GR, Wt(12, 'gerilimi'), { g: 'g', dur: 0.8 });
}
