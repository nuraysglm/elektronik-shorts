// Ders 1 Bolum 2 - Parca 3: akimin degeri ve yonu, referans oku, elektronlar (metin.md [PARCA 3])
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, dashed, arrow, frame, erase, fx, kose, baslik, under, kutu } from './motor.js';
// kapali yol: iki "Devre" kutusu, ustte kalin tel (y = wy), altta donus teli; tasiyicilar yalnizca ust telin icinde
function devre(g, t, wy = 340) {
  frame([1000, wy - 40, 1140, wy + 40], K, t, 0.4, { g, lw: 4 });
  text('Devre', 1070, wy + 12, 34, K, t + 0.5, { g, align: 'c', dur: 0.3 });
  frame([1660, wy - 40, 1800, wy + 40], K, t + 0.95, 0.4, { g, lw: 4 });
  text('Devre', 1730, wy + 12, 34, K, t + 1.45, { g, align: 'c', dur: 0.3 });
  line([1140, wy], [1660, wy], K, 7, t + 1.9, 0.5, { g });
  path([[[1070, wy + 40], [1070, wy + 120], [1730, wy + 120], [1730, wy + 40]]], K, 4, t + 2.5, 0.7, { g });
  dashed([1400, wy - 55], [1400, wy + 45], K, 3, t + 3.3, 0.3, { g, dash: 10, gap: 8 });
  return t + 3.7;
}
function tasiyici(g, isaret, t0, t1, wy = 340) {
  fx((c, u) => { c.font = '30px PH'; c.textAlign = 'center';
    for (let k = 0; k < 6; k++) { const x = 1160 + ((k * 85 + u * 70) % 480); c.fillStyle = isaret === '+' ? B : R; c.beginPath(); c.arc(x, wy, 9, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillText(isaret, x, wy + 8); } }, t0, t1, { g });
}
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: deger ve yon (0-18)
  let g = 'a';
  baslik('1. Değer ve yön', 200, S(0) + 0.1, { g, dur: 0.8, alt: Wt(2, 'yönü') });
  text('Her akımın bir değeri, bir de yönü var', L, 300, 44, K, S(2), { g, dur: 1.5 });
  const t1 = devre(g, S(1));
  tasiyici(g, '+', t1, S(19) - 0.1);
  text('Artı yük varsayalım', RX, 530, 36, G, Wt(2, 'yönü') + 0.3, { g, dur: 0.8 });
  arrow(1250, 292, 1360, 292, B, Wt(3, 'okla'), 0.4, { g, lw: 5 });
  text('i', 1372, 302, 40, B, Wt(3, 'gösteriyoruz'), { g, dur: 0.15 });
  text('Referans yönü', 1180, 425, 32, G, Wt(4, 'referans'), { g, dur: 0.6 });
  text('Oku biz seçeriz', L, 370, 44, G, S(5) + 0.2, { g, dur: 0.8 });
  text('- Okun yönünde geçen artı yük artı sayılır', L, 440, 42, K, Wt(6, 'okun'), { g, dur: 1.8 });
  text('- Okun tersine geçen artı yük eksi sayılır', L, 510, 42, K, S(7), { g, dur: 1.8 });
  text('Her 1 ms\'de 3 μC sağa', L, 600, 44, K, Wt(9, 'her'), { g, dur: 1.0 });
  text('i = 3 μC / 1 ms = 3 mA', L, 670, 48, B, S(10), { g, dur: 1.3 });
  // iki kucuk tel kopyasi
  line([1000, 650], [1300, 650], K, 5, S(11), 0.3, { g });
  arrow(1100, 620, 1200, 620, B, S(11) + 0.4, 0.3, { g, lw: 5 });
  text('i = 3 mA', 1340, 665, 44, B, Wt(11, 'artı'), { g, dur: 0.6 });
  line([1000, 770], [1300, 770], K, 5, S(12), 0.3, { g });
  arrow(1200, 740, 1100, 740, B, S(12) + 0.4, 0.3, { g, lw: 5 });
  text('i = −3 mA', 1340, 785, 44, R, Wt(12, 'eksi'), { g, dur: 0.6 });
  line([1600, 650], [1600, 770], G, 3, S(15), 0.3, { g });
  text('Aynı durum', 1620, 722, 36, G, S(15) + 0.4, { g, dur: 0.6 });
  text('Eksi işaret: yük okun tersine gidiyor', L, 760, 40, G, Wt(17, 'yük'), { g, dur: 1.4 });
  erase(g, S(19));
  // ---------------- B: elektronlar (19-32)
  g = 'b';
  baslik('Elektronlar', 200, S(19) + 0.2, { g, dur: 0.6 });
  const t2 = devre(g, Wt(20, 'elektronlardır'));
  tasiyici(g, '−', t2, S(28));
  text('Elektronun yükü eksi', L, 300, 42, G, Wt(20, 'yükü'), { g, dur: 0.8 });
  text('Her 1 ms\'de sağa −4 μC', L, 370, 44, K, Wt(21, 'her'), { g, dur: 1.0 });
  arrow(1250, 292, 1360, 292, B, S(22), 0.4, { g, lw: 5 });
  text('Ok sağa: i = −4 μC / 1 ms = −4 mA', L, 440, 44, R, S(23), { g, dur: 1.6 });
  arrow(1360, 400, 1250, 400, B, S(24), 0.4, { g, lw: 5 });
  text('Ok sola: i = 4 mA', L, 510, 44, B, Wt(24, 'artı'), { g, dur: 0.8 });
  text('Akım sola, 4 mA', 1420, 412, 34, B, S(25) + 0.5, { g, dur: 0.6 });
  text('- Akımın yönü, artı yükün yönüdür', L, 600, 44, K, S(26), { g, dur: 1.5 });
  const tr = text('- Elektronların hareketine terstir', L, 670, 44, R, S(27), { g, dur: 1.4 });
  under(tr, R, E(27) - 0.1, 0.35, { g });
  text('Bölüm 1: i(4 s) = 6 − 2 × 4 = −2 mA', RX, 600, 40, G, Wt(29, 'dördüncü'), { g, dur: 1.6 });
  text('Yük ters yönde', RX, 660, 40, G, S(30) + 0.3, { g, dur: 0.6 });
  kutu('Her akımın yanına ok', RX, 760, 50, B, S(31) + 0.1, { g, dur: 1.0 });
}
