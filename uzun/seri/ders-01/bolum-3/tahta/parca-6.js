// Ders 1 Bolum 3 - Parca 6: Uygulamada: veri sayfasindaki gerilimler + gercek bir gerilim kaynagi (3,3 V regulator) (metin.md [PARCA 6])
// Tablo ajanin kendi cizimidir (datasheet tablosu kopyalanmaz). Degerler icerik.md bolum 5 / dogruluk.md.
import { K, B, R, G, L, RX, S, E, Wt, text, path, line, arrow, dot, zig, frame, erase, pulse, pad, kose, baslik, under, kutu } from './motor.js';
export function build() {
  kose(0, { sabit: true });
  // ---------------- A: gerilim satirlari tablosu (cumle 0-8)
  const t0 = baslik('Uygulamada: veri sayfasındaki gerilimler', 200, S(0) + 0.05, { g: 'a0', dur: 1.3, alt: S(0) + 1.45 });
  text('(datasheet)', t0.box[2] + 20, 200, 32, G, S(0) + 1.95, { g: 'a0', dur: 0.5 });
  let g = 't';
  const C1 = L, C2 = 500, C3 = 1330;
  text('Parça', C1, 305, 40, G, S(1) + 0.05, { g, dur: 0.3 });
  text('Hangi iki uç arasında', C2, 305, 40, G, Wt(1, 'iki'), { g, dur: 0.8 });
  text('Değer ve işaret', C3, 305, 40, G, Wt(1, 'verilir'), { g, dur: 0.6 });
  line([C1, 325], [1800, 325], G, 3, E(1) + 0.05, 0.4, { g });
  text('Adı söylemiyorsa: toprağa göre', 1250, 250, 30, G, Wt(2, 'söylemiyorsa'), { g, dur: 1.0 });
  text('2N7002E anahtar', C1, 390, 38, K, S(3) + 0.1, { g, dur: 0.6 });
  text('Savak (D) ile kaynak ucu (S)', C2, 390, 36, K, S(4), { g, dur: 1.0 });
  text('Akımın geçtiği uçlar', C2, 428, 28, G, Wt(4, 'geçtiği'), { g, dur: 0.6 });
  const v1 = text('V_D_S_S = 60 V', C3, 390, 40, B, Wt(4, 'altmış'), { g, dur: 0.6 });
  text('2N7002E anahtar', C1, 490, 38, K, S(5), { g, dur: 0.6 });
  text('Kapı (G) ile kaynak ucu (S)', C2, 490, 36, K, Wt(5, 'kontrol') + 0.2, { g, dur: 1.0 });
  text('Kontrol ucu', C2, 528, 28, G, Wt(5, 'alt'), { g, dur: 0.4 });
  const v2 = text('V_G_S = ±20 V', C3, 490, 40, B, Wt(5, 'yirmi'), { g, dur: 0.6 });
  pulse(pad(v2.box, 2), R, Wt(6, 'yirmi'), E(6) + 0.3, { g });
  text('Kapı ile S arasına 24 V uygulanırsa kapı bozulabilir (24 V > 20 V)', C1, 745, 34, R, Wt(6, 'yirmi') + 0.3, { g, dur: 2.2 });
  text('1N4007 diyot', C1, 590, 38, K, S(7), { g, dur: 0.5 });
  text('İleri yön', C2, 590, 36, K, Wt(7, 'ileri'), { g, dur: 0.4 });
  const v3 = text('V_F en çok 1,1 V', C3, 590, 40, B, Wt(7, 'bir'), { g, dur: 0.6 });
  text('1 A, 25 °C', C3, 628, 28, G, Wt(7, 'düşer'), { g, dur: 0.4 });
  text('1N4007 diyot', C1, 680, 38, K, Wt(7, 'ters') - 0.6, { g, dur: 0.5 });
  text('Ters yön', C2, 680, 36, K, Wt(7, 'ters') + 0.1, { g, dur: 0.4 });
  const v4 = text('V_R_R_M = 1000 V', C3, 680, 40, B, Wt(7, 'bin'), { g, dur: 0.6 });
  pulse(pad(v3.box, 2), B, S(8), E(8) + 0.3, { g });
  pulse(pad(v4.box, 2), B, S(8) + 0.4, E(8) + 0.3, { g });
  text('Kaynak: onsemi 2N7002E (2023), Vishay 1N4001–1N4007 (2020) datasheet\'leri', C1, 805, 24, G, Wt(8, 'ters') , { g, dur: 1.8 });
  void v1;
  erase(g, S(9) - 0.1);
  // ---------------- B: iki soru (cumle 9-12)
  g = 'b';
  text('Bir gerilim satırını okurken', L, 410, 44, G, S(9) + 0.05, { g, dur: 1.1 });
  baslik('İki soru', 310, Wt(9, 'iki'), { g, x: RX, size: 56, dur: 0.5, alt: Wt(9, 'sor') });
  text('1. Hangi iki uç arasında?', RX, 410, 46, K, S(10), { g, dur: 1.0 });
  text('2. Hangi işaretle (hangi uç yüksek)?', RX, 490, 46, K, S(11), { g, dur: 1.4 });
  text('Ve koşul: hangi sıcaklıkta, hangi akımda?', RX, 580, 40, G, Wt(12, 'koşula'), { g, dur: 1.6 });
  erase(g, S(13) - 0.1); erase('a0', S(13) - 0.1);
  // ---------------- C: mini tasarim devresi (cumle 13-22)
  baslik('Mini tasarım: 3,3 V regülatör', 200, S(13) + 0.05, { g: 'c0', dur: 1.1, alt: S(13) + 1.2 });
  g = 'dv';
  const tc = Wt(13, 'regülatör') - 0.2;
  // regulator kutusu
  frame([1250, 290, 1500, 400], K, tc, 0.7, { g });
  text('Regülatör', 1375, 350, 36, K, tc + 0.8, { g, dur: 0.5, align: 'c' });
  text('TLV75533P', 1375, 385, 24, G, tc + 1.4, { g, dur: 0.4, align: 'c' });
  // 5 V kaynak (daire) + teller
  const tk = S(15) + 1.4;
  path([[[1040 + 45, 425], ...Array.from({ length: 41 }, (_, i) => [1040 + 45 * Math.cos(i / 40 * 2 * Math.PI), 425 + 45 * Math.sin(i / 40 * 2 * Math.PI)])]], K, 4, tk, 0.5, { g });
  text('+', 1040, 412, 34, R, tk + 0.6, { g, dur: 0.15, align: 'c' });
  text('−', 1040, 458, 34, R, tk + 0.8, { g, dur: 0.15, align: 'c' });
  text('5 V', 1100, 470, 34, B, tk + 1.0, { g, dur: 0.3 });
  path([[[1040, 380], [1040, 330], [1250, 330]]], K, 4, tk + 1.4, 0.4, { g });
  path([[[1040, 470], [1040, 520], [1700, 520]]], K, 4, tk + 1.9, 0.6, { g });
  path([[[1375, 400], [1375, 520]]], K, 4, tk + 2.6, 0.2, { g });
  dot([1375, 520], 7, K, tk + 2.85, { g });
  // cikis ve yuk
  const ty = E(16) + 0.1;
  path([[[1500, 330], [1700, 330], [1700, 365]]], K, 4, ty, 0.3, { g });
  path([zig([1700, 365], [1700, 485], 90, 16)], K, 4, ty + 0.4, 0.4, { g });
  path([[[1700, 485], [1700, 520]]], K, 4, ty + 0.9, 0.12, { g });
  dot([1700, 520], 7, K, ty + 1.2, { g });
  const rl = text('R', 1735, 440, 38, K, ty + 1.4, { g, dur: 0.15 });
  text('+', 1665, 390, 32, R, ty + 1.6, { g, dur: 0.15, align: 'c' });
  text('−', 1665, 480, 32, R, ty + 1.8, { g, dur: 0.15, align: 'c' });
  text('3,3 V', 1560, 445, 34, B, ty + 2.0, { g: 'vl', dur: 0.3 });
  arrow(1560, 310, 1650, 310, B, ty + 2.4, 0.3, { g, lw: 4, head: 12 });
  text('i', 1600, 295, 32, B, ty + 2.75, { g, dur: 0.1, align: 'c' });
  text('Kaynak: TI TLV755P datasheet (SBVS320D, 2024)', RX, 585, 26, G, Wt(14, 'çıkışındaki') + 1.75, { g, dur: 1.2 });
  // sol sutun
  g = 'c1';
  text('- Çıkış gerilimini sabit tutan entegre devre', L, 300, 40, K, Wt(14, 'çıkışındaki'), { g, dur: 1.6 });
  text('- Giriş: 5 V (telefon şarj cihazı)', L, 370, 40, K, S(15) + 0.05, { g, dur: 1.2 });
  text('Giriş yeterli mi?', L, 440, 42, R, S(16), { g, dur: 0.6 });
  text('Giriş ≥ çıkış + 238 mV (en kötü durum)', L, 505, 38, K, Wt(17, 'iki'), { g, dur: 1.4 });
  text('238 mV = 0,238 V', L, 560, 34, G, S(18) + 0.1, { g, dur: 0.7 });
  text('En az giriş = 3,3 V + 0,238 V = 3,538 V', L, 625, 38, B, S(19), { g, dur: 1.8 });
  text('5 V ≥ 3,538 V ve 5 V ≤ 5,5 V', L, 695, 38, B, S(20), { g, dur: 1.4 });
  const d17 = text('v_g_i_r_i_ş − v_ç_ı_k_ı_ş = 5 − 3,3 = 1,7 V', L, 775, 40, B, S(21), { g, dur: 1.8 });
  pulse(pad(d17.box, 2), B, E(21) - 0.6, E(22) + 0.3, { g });
  text('Toprak örneğindeki sayı', RX, 700, 34, G, S(22), { g: 'c2', dur: 0.8 });
  erase('c1', S(23) - 0.1); erase('c2', S(23) - 0.1);
  // ---------------- D: uc yuk (cumle 23-28)
  g = 'd';
  text('R', L, 300, 40, G, S(23) + 0.05, { g, dur: 0.15 });
  text('i = 3,3 V / R', 330, 300, 40, G, S(23) + 0.4, { g, dur: 0.6 });
  line([L, 320], [900, 320], G, 3, S(23) + 1.2, 0.3, { g });
  text('330 Ω', L, 380, 40, K, S(24), { g, dur: 0.4 });
  text('3,3 / 330 = 0,01 A = 10 mA', 330, 380, 40, B, Wt(24, 'akım'), { g, dur: 1.4 });
  text('66 Ω', L, 450, 40, K, S(25), { g, dur: 0.3 });
  text('3,3 / 66 = 0,05 A = 50 mA', 330, 450, 40, B, Wt(25, 'üç'), { g, dur: 1.4 });
  text('33 Ω', L, 520, 40, K, S(26), { g, dur: 0.3 });
  text('3,3 / 33 = 0,1 A = 100 mA', 330, 520, 40, B, Wt(26, 'üç'), { g, dur: 1.4 });
  pulse(pad(rl.box, 4), B, S(24), E(26), { g });
  kutu('Gerilim hep 3,3 V, değişen akım', L + 10, 625, 42, B, S(27) + 0.1, { g, dur: 1.4 });
  text('İdeal gerilim kaynağı böyle davranır', L, 720, 38, G, S(28), { g, dur: 1.3 });
  erase(g, S(29) - 0.1);
  // ---------------- E: model ne kadar iyi (cumle 29-38)
  g = 'e';
  text('Model ne kadar iyi?', L, 300, 42, R, S(29), { g, dur: 0.6 });
  text('- Çıkış değişimi ≈ 60 mV / A = 0,060 V/A', L, 365, 38, K, Wt(30, 'akımın'), { g, dur: 1.6 });
  text('Δi = 100 mA − 10 mA = 90 mA', L, 430, 38, B, S(31), { g, dur: 1.3 });
  text('90 mA = 0,090 A', L, 485, 34, G, S(32) + 0.1, { g, dur: 0.7 });
  const dv = text('Δv ≈ 0,060 V/A × 0,090 A = 0,0054 V = 5,4 mV', L, 550, 38, B, S(33), { g, dur: 2.2 });
  pulse(pad(dv.box, 2), B, Wt(33, 'beş'), E(33) + 0.3, { g });
  text('Tüm aralıkta: Δv ≈ 0,060 V/A × 0,5 A ≈ 0,030 V = 30 mV', L, 615, 34, B, Wt(34, 'altmış'), { g, dur: 2.2 });
  text('Önerilen aralık: 0,1 mA ile 500 mA', L, 665, 32, G, S(35), { g, dur: 1.0 });
  text('En küçük R = 3,3 V / 0,5 A = 6,6 Ω', L, 735, 38, B, Wt(36, 'en'), { g, dur: 1.6 });
  text('500 mA\'de bu kurulumda regülatör aşırı ısınır', RX, 660, 34, R, S(37), { g, dur: 1.6 });
  text('Isınma: güç konusunda (örnekte en çok 100 mA)', RX, 720, 32, G, S(38), { g, dur: 1.6 });
  erase(g, S(39) - 0.1);
  // ---------------- F: 3,3 ohm (cumle 39-43)
  g = 'f';
  text('3,3 Ω bağlanırsa?', L, 300, 42, R, S(39), { g, dur: 0.7 });
  text('İdeal model: i = 3,3 V / 3,3 Ω = 1 A', L, 370, 38, B, S(40), { g, dur: 1.6 });
  text('Akım sınırı en çok 865 mA (I_C_L)', L, 440, 38, K, S(41), { g, dur: 1.4 });
  text('1 A > 865 mA', L, 505, 38, R, Wt(41, 'sekiz'), { g, dur: 0.7 });
  text('- Çıkış 3,3 V\'ta kalamaz', L, 575, 38, K, Wt(42, 'çıkış'), { g, dur: 1.0 });
  text('Artık ideal kaynak değil', L, 640, 34, G, S(43), { g, dur: 0.9 });
  erase(g, S(44) - 0.1);
  // ---------------- G: kisa devre (cumle 44-51)
  g = 'h';
  text('Çıkış kısa devre', L, 300, 42, R, S(44), { g, dur: 0.7 });
  path([[[1700, 345], [1800, 345], [1800, 500], [1700, 500]]], R, 6, Wt(44, 'telle'), 0.6, { g });
  erase('vl', Wt(44, 'telle') - 0.05);
  text('0 V', 1580, 445, 34, B, Wt(44, 'telle') + 0.75, { g, dur: 0.3 });
  text('v = 0', 1820, 435, 32, G, S(45), { g, dur: 0.3 });
  text('- Tel: v = 0 (kısa devrenin garantisi)', L, 370, 38, K, S(45) + 0.3, { g, dur: 1.4 });
  text('Akımı çevre belirler: regülatörün akım sınırı', L, 435, 34, G, S(46), { g, dur: 1.6 });
  const is = text('i ≈ 355 mA (tipik, I_S_C)', L, 505, 40, B, Wt(48, 'üç'), { g, dur: 1.0 });
  text('Çıkış düşünce sınır kısılır: 865 mA\'den 355 mA\'e', L, 565, 32, G, Wt(48, 'kısar') + 0.2, { g, dur: 1.6 });
  under(is, B, E(48) - 0.2, 0.4, { g });
  text('- Isınınca kapanır, soğuyunca açılır', L, 630, 38, K, S(49), { g, dur: 1.4 });
  text('3,3 V yazıyor diye her yükte 3,3 V vermez', L, 700, 36, R, Wt(50, 'üç'), { g, dur: 1.6 });
  kutu('Gerçek kaynak: akım ve ısınma sınırları içinde ideal', L + 10, 775, 40, B, S(51), { g, dur: 2.0 });
}
