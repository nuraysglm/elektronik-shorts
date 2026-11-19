// Parca 3: abone cagrisi (kart ayri katman, 0,15-6,15 sn), seri haritasi (metin.md [PARCA 3])
// Is emri D (19.11.2026): yeni tahta duzeni
import { K, B, R, GR, G, L, RX, S, E, Wt, text, path, line, frame, under, erase, oval, pulse, pad, mark, kose, baslik } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  let g = 'a';
  mark('abone', 0.15);
  const f = text('i = dq / dt', L, 330, 110, B, 0.1, { g, dur: 1.3 });
  text('Ortalama değil', L, 450, 56, R, Wt(2, 'ortalama'), { g, dur: 0.8 });
  const it = text('i(t): her an ayrı bir değer', RX, 330, 60, B, Wt(3, 'her'), { g, dur: 1.6 });
  under(it, B, Wt(3, 'zamana'), 0.5, { g });
  text('Zamana bağlı bir büyüklük', RX, 450, 52, K, Wt(3, 'büyüklük') - 0.2, { g, dur: 1.0 });
  erase(g, S(4) - 0.12);
  // ---------------- seri haritasi
  g = 'm';
  baslik('Devre Teorisi I: yol haritası', 168, Wt(4, 'seride'), { g, size: 54, dur: 1.2, alt: Wt(4, 'kısaca') });
  const BW = 390, BH = 150;
  const step = (n, x, y, l1, l2, t0, col = K) => {
    frame([x, y, x + BW, y + BH], col, t0, 0.35, { g, lw: 3 });
    text(n + '.', x + 22, y + 62, 44, col, t0 + 0.4, { g, dur: 0.15 });
    text(l1, x + 62, y + 62, 34, K, t0 + 0.6, { g, dur: 0.7 });
    text(l2, x + 62, y + 112, 34, K, t0 + 1.4, { g, dur: 0.6 });
    return [x, y, x + BW, y + BH];
  };
  const r1 = 300, r2 = 560, xs = [L, 540, 960, 1380];
  const b1 = step(1, xs[0], r1, 'Yük, akım', 'gerilim', Wt(5, 'yük'), B);
  text('Buradayız', xs[0] + BW / 2, r1 - 18, 36, B, Wt(5, 'gerilimi') + 0.2, { g, align: 'c', dur: 0.5 });
  pulse(pad(b1, 6), B, Wt(5, 'gerilimi') + 0.8, E(9) + 0.3, { g });
  line([xs[0] + BW, r1 + 75], [xs[1], r1 + 75], K, 3, Wt(6, 'kaynakları') - 0.25, 0.15, { g });
  step(2, xs[1], r1, 'Kaynaklar, direnç', 'kondansatör', Wt(6, 'kaynakları'));
  line([xs[1] + BW, r1 + 75], [xs[2], r1 + 75], K, 3, Wt(7, 'kirşof') - 0.25, 0.15, { g });
  step(3, xs[2], r1, 'Kirchhoff', 'yasaları', Wt(7, 'kirşof'));
  line([xs[2] + BW, r1 + 75], [xs[3], r1 + 75], K, 3, Wt(7, 'analiz') - 0.25, 0.15, { g });
  step(4, xs[3], r1, 'Analiz yöntemleri', 've teoremler', Wt(7, 'analiz'));
  path([[[xs[3] + BW / 2, r1 + BH], [xs[3] + BW / 2, 505], [xs[0] + BW / 2, 505], [xs[0] + BW / 2, r2]]], K, 3, S(8) + 0.1, 0.7, { g });
  step(5, xs[0], r2, 'Direnç–kondansatör ve', 'direnç–bobin devreleri', Wt(8, 'direnç') + 0.5);
  line([xs[0] + BW, r2 + 75], [xs[1], r2 + 75], K, 3, Wt(8, 'üçünün') - 0.25, 0.15, { g });
  step(6, xs[1], r2, 'Direnç, bobin ve', 'kondansatörlü devreler', Wt(8, 'üçünün'));
  line([xs[1] + BW, r2 + 75], [xs[2], r2 + 75], K, 3, Wt(9, 'işlemsel') - 0.25, 0.15, { g });
  step(7, xs[2], r2, 'İşlemsel', 'kuvvetlendirici', Wt(9, 'işlemsel'));
  text('Her ders üç bölüm, her bölüm yaklaşık 15 dakika', L, 790, 44, G, Wt(10, 'dersi'), { g, dur: 1.8 });
  const fi = text('i = dq / dt', xs[3] + BW / 2, 660, 70, B, Wt(11, 'bugünkü'), { g, align: 'c', dur: 0.9 });
  oval(fi.box, B, E(11) - 0.2, 0.5, { g });
}
