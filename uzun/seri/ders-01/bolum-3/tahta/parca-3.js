// Ders 1 Bolum 3 - Parca 3: tepe ve vadi benzetmesi, gerilimin degeri ve isareti (metin.md [PARCA 3])
// Razavi'nin levha ornegi yerine kendi tepe-vadi benzetmemiz.
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, dot, fx, erase, pulse, pad, kose, baslik, under, kutu, zig } from './motor.js';
const hillY = (x) => 490 - 160 * Math.sin(Math.PI * (x - 1075) / 350);
function direnc(x0, x1, y, t, g, sol, sag, ust, ustRenk) {
  path([zig([x0, y], [x1, y], 220, 22)], K, 5, t, 0.8, { g });
  text(sol, x0 - 40, y + 14, 50, K, t + 0.95, { g, dur: 0.2 });
  text(sag, x1 + 14, y + 14, 50, K, t + 1.3, { g, dur: 0.2 });
  return text(ust, (x0 + x1) / 2, y - 48, 50, ustRenk, t + 1.65, { g, align: 'c', dur: 0.4 });
}
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: tepe ve vadi (cumle 0-6)
  let g = 'a';
  baslik('Tepe ve vadi', 200, S(0) + 0.05, { g, dur: 0.7, alt: S(0) + 0.85 });
  text('- Yükseklik farkı gibi', L, 310, 48, K, S(1) + 0.1, { g, dur: 0.9 });
  const pts = []; for (let x = 1000; x <= 1800; x += 10) pts.push([x, hillY(x)]);
  path([pts], K, 5, S(2), 1.6, { g });
  text('+', 1236, 300, 54, K, Wt(2, 'artı'), { g, dur: 0.15 });
  text('Artı uç', 1290, 292, 38, G, Wt(2, 'artı') + 0.35, { g, dur: 0.5 });
  text('−', 1588, 712, 54, K, Wt(2, 'eksi'), { g, dur: 0.15 });
  text('Eksi uç', 1630, 712, 38, G, Wt(2, 'eksi') + 0.35, { g, dur: 0.5 });
  // pozitif yuk: vadiden tepeye (cumle 3), tepeden vadiye (cumle 4); kalem sirasina girmez (fon hareketi)
  const t3 = S(3), t3e = E(3), t4 = S(4), t4e = E(4);
  fx((c, u, t) => {
    let x;
    if (t < t3e) x = 1600 - 350 * Math.min(1, Math.max(0, (t - t3) / (t3e - t3)));
    else if (t < t4) x = 1250;
    else x = 1250 + 350 * Math.min(1, (t - t4) / (t4e - t4));
    const y = hillY(x) - 26;
    c.fillStyle = B; c.beginPath(); c.arc(x, y, 19, 0, 7); c.fill();
    c.strokeStyle = '#ffffff'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 10, y); c.lineTo(x + 10, y); c.moveTo(x, y - 10); c.lineTo(x, y + 10); c.stroke();
  }, t3, Infinity, { g });
  text('Vadiden tepeye: enerji harcanır', 1000, 800, 38, R, Wt(3, 'enerji'), { g, dur: 1.2 });
  text('- 1 C başına enerji = gerilim', L, 390, 48, K, S(5), { g, dur: 1.2 });
  text('Tepeden vadiye: enerji geri alınır', L, 800, 38, G, Wt(4, 'enerjiyi') - 0.3, { g, dur: 1.2 });
  text('Yalnızca bir benzetme', L, 480, 42, G, S(6) + 0.1, { g, dur: 0.8 });
  erase(g, S(7) - 0.1);
  // ---------------- B: deger ve isaret (cumle 7-16)
  g = 'bl';
  baslik('Değer ve işaret', 200, S(7) + 0.05, { g: 'b0', dur: 0.7, alt: S(7) + 0.85 });
  text('- Akım: değer ve yön', L, 310, 48, K, Wt(7, 'akımın'), { g, dur: 0.8 });
  text('- Gerilim: değer ve işaret', L, 390, 48, K, S(8) + 0.1, { g, dur: 0.9 });
  const gb = 'br';
  const v7 = direnc(1050, 1500, 330, S(9) + 0.1, gb, '+', '−', '7 V', B);
  text('Artı (+) uç, eksi (−) uçtan 7 V yüksek', L, 480, 42, K, S(11), { g, dur: 1.6 });
  pulse(pad(v7.box, 4), B, Wt(11, 'yedi'), E(11) + 0.2, { g: gb });
  direnc(1050, 1500, 540, S(14), gb, '−', '+', '−7 V', R);
  line([1600, 300], [1600, 560], G, 3, S(15) + 0.4, 0.4, { g: gb });
  text('Aynı durum', 1620, 445, 36, G, S(15) + 0.9, { g: gb, dur: 0.5 });
  kutu('v_b_a = −v_a_b', L, 600, 56, B, S(16) + 0.1, { g, dur: 0.8 });
  erase(g, S(17) - 0.1);
  // ---------------- C: tersinden okuma (cumle 17-21)
  g = 'cl';
  const v3 = direnc(1050, 1500, 740, S(18) + 0.1, gb, '+', '−', '−3 V', R);
  text('Sol +, sağ −; hesap: v = −3 V', L, 310, 48, B, Wt(18, 'eksi'), { g, dur: 1.2 });
  text('- Eksi işaret yanlış değildir', L, 400, 48, K, S(19) + 0.1, { g, dur: 1.0 });
  pulse(pad(v3.box, 4), R, S(20), E(20) + 0.2, { g: gb });
  text('Sağ uç, sol uçtan 3 V yüksek', L, 490, 44, G, Wt(20, 'sağ'), { g, dur: 1.1 });
  text('- Sonuç işaretiyle birlikte doğru', L, 580, 48, K, Wt(21, 'sonuç'), { g, dur: 1.2 });
  erase(g, S(22) - 0.1); erase(gb, S(22) - 0.1); erase('b0', S(22) - 0.1);
  // ---------------- D: ornege donus (cumle 22-27)
  g = 'd';
  baslik('Örneğimize dönelim', 200, S(22) + 0.05, { g, dur: 0.7 });
  line([1300, 330], [1300, 640], K, 5, S(23), 0.5, { g });
  dot([1300, 330], 10, K, S(23) + 0.6, { g });
  text('a', 1330, 340, 50, K, S(23) + 0.8, { g, dur: 0.2 });
  dot([1300, 640], 10, K, S(23) + 1.1, { g });
  text('b', 1330, 650, 50, K, S(23) + 1.3, { g, dur: 0.2 });
  text('4,5 V', 1160, 500, 50, B, Wt(23, 'dört'), { g, dur: 0.5, align: 'r' });
  text('+', 1240, 400, 54, R, Wt(24, 'artıyı'), { g, dur: 0.15 });
  text('−', 1240, 600, 54, R, Wt(24, 'eksiyi'), { g, dur: 0.15 });
  text('a, b\'den 4,5 V yüksek (v_a_b = 4,5 V)', L, 310, 46, B, S(25) + 0.1, { g, dur: 1.6 });
  text('- İşaretler şemada çizili olmalı', L, 400, 48, K, S(26), { g, dur: 1.1 });
  kutu('İşaretsiz gerilim eksik bilgidir', L, 520, 50, B, S(27) + 0.1, { g, dur: 1.2 });
}
