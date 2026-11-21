// Türev Short'ların ortak sonu: "Dersin tamamı" kartı (UZUN.md 4, türev Short kuralı; 2-3 sn). Kalemsiz, anında görünür; hafif nabız + alt çizgi (durağan an olmasın).
import { K, B, R, G, L, text, pulse, under, pad, union } from './motor.js';
export function kart(o, g) {
  const t = o.kartBas + 0.05;
  const a = text('Dersin tamamı:', 540, 640, 60, G, t, { g, kart: true, align: 'c' });
  const b = text('Devre Teorisi I', 540, 760, 84, R, t, { g, kart: true, align: 'c' });
  const c = text('Ders 1, Bölüm 1', 540, 870, 72, K, t, { g, kart: true, align: 'c' });
  pulse(pad(union(a.box, b.box, c.box), 24), B, t + 0.3, Infinity, { g });
  under(c, B, t + 0.4, 0.9, { g });
}
// Sabit ders etiketi (kanal sahibi 21.11.2026 08:50): 0. saniyeden sona kadar üstte, küçük, koyu gri; yazılmaz/silinmez.
// Üst güvenli alanın içinde (AGENT.md 4: y >= %11 = 211 px); kutu y ~220-267, tahta içeriği y >= ~285'ten başlar.
export const ETIKET = { s: 'Devre Teorisi I · Ders 1, Bölüm 1', x: L, y: 256, size: 38, color: '#4a4f57' };
export function etiket() { return text(ETIKET.s, ETIKET.x, ETIKET.y, ETIKET.size, ETIKET.color, 0, { g: 'etiket', sabit: true }); }
