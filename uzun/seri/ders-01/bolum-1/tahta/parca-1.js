// Parca 1: kanca + intro karti (selam sesiyle) + giris (metin.md [PARCA 1])
// Is emri D (19.11.2026): yeni tahta duzeni (sol ust kirmizi baslik, kirmizi basliklar, '- ' maddeler, iki sutun, koyu yesil etiketler);
// intro karti artik sessiz degil: 32,96 sn'ye 8,4 sn aralik (0,3 sn bosluk + selam 7,71 sn + 0,4 sn), selam kartla birlikte.
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, dashed, arrow, frame, under, erase, oval, mark, pulse, pad, kose, baslik } from './motor.js';
export const INTRO = 32.96, ARA = 8.4;
export function build() {
  const g = 'kanca';
  kose(0.04, { g, dur: 0.7 });
  // --- devre kutusu + kapali tel halkasi + kesit (sol sutun)
  const bx = [L, 300, L + 240, 450];
  frame(bx, K, 0.8, 0.5, { g, lw: 5 });
  text('Devre', L + 120, 388, 46, K, 1.35, { g, align: 'c', dur: 0.3 });
  path([[[L + 120, 300], [L + 120, 210], [1100, 210], [1100, 560], [L + 120, 560], [L + 120, 450]]], K, 5, 1.7, 1.1, { g });
  dashed([670, 160], [670, 262], K, 4, 2.85, 0.3, { g, dash: 12, gap: 9 });
  const iq = text('i = ?', 710, 150, 52, B, 3.2, { g, dur: 0.45 });
  // --- "gecen yuku gecen sureye bolmek"
  const f1 = text('Akım = geçen yük / süre', L, 700, 52, K, Wt(1, 'geçen'), { g, dur: 1.5 });
  text('?', f1.box[2] + 12, 700, 52, R, Wt(1, 'bölmek'), { g, dur: 0.2 });
  // --- "sifir diyebilir mi": zit yonlu iki ok + kirmizi soru
  arrow(700, 182, 800, 182, B, Wt(2, 'akım'), 0.35, { g, lw: 5, head: 14 });
  arrow(640, 238, 540, 238, B, Wt(2, 'durmadan'), 0.35, { g, lw: 5, head: 14 });
  const oq = text('Ortalama = 0 ?', 1260, 330, 56, R, Wt(2, 'sıfır'), { g, dur: 0.8 });
  oval(oq.box, R, Wt(3, 'hesap'), 0.6, { g });
  pulse(pad(f1.box, 4), B, Wt(3, 'hesap') + 0.7, E(4) + 0.3, { g });
  // --- vaat (sag sutun)
  under(iq, B, Wt(6, 'sonunda'), 0.35, { g });
  const v1 = text('- Ortalama akım', 1260, 470, 50, K, Wt(7, 'ortalama'), { g, dur: 0.6 });
  text('- Anlık akım', 1260, 545, 50, B, Wt(7, 'anlık'), { g, dur: 0.5 });
  text('Yük en büyükken akım sıfır?', 1260, 650, 48, R, Wt(8, 'yük'), { g, dur: 1.3 });
  // --- intro karti + selam (8,4 sn)
  const ti = INTRO + 0.1; erase(g, INTRO);
  const c1 = text('Devre Teorisi I: Ders 1 - Bölüm 1/3', 960, 460, 84, K, ti, { g: 'intro', align: 'c', dur: 2.4 });
  path([[[c1.box[0] + 10, 492], [c1.box[2] - 10, 492]]], R, 5, ti + 2.55, 0.4, { g: 'intro' });
  text('Akım nedir? Ortalama akım ile anlık akım', 960, 590, 58, B, ti + 3.2, { g: 'intro', align: 'c', dur: 2.2 });
  erase('intro', INTRO + ARA); mark('intro', [INTRO, ARA]);
  // --- giris: temel buyuklukler
  const g2 = 'g';
  kose(S(9) + 0.05, { g: g2, dur: 0.9 });
  baslik('Temel büyüklükler', 210, Wt(9, 'büyüklükleri'), { g: g2, size: 62, dur: 1.0, alt: Wt(9, 'tanımlayarak') });
  text('- Yük', L, 340, 72, B, Wt(11, 'yük'), { g: g2, dur: 0.4 });
  text('- Akım', L, 440, 72, B, Wt(11, 'akım'), { g: g2, dur: 0.45 });
  text('Gerilim: bu dersin üçüncü bölümünde', RX, 340, 46, G, Wt(12, 'gerilimi'), { g: g2, dur: 1.2 });
}
