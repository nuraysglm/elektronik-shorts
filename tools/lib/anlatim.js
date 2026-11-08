// anlatim.js — akan ekran yazısı (anlatım) yöneticisi, okuma süresi hesabı ve doğrulama.
// 001 ve eski 002 sahnelerindeki ortak kod buraya taşındı (AGENT.md bölüm 3, 6).

import { clamp, seg, easeOut, easeInOut } from './stage.js';

/** Renkli vurgu: gerilim hl (sarı), akım rd (kırmızı), direnç bl (mavi), yük gr (yeşil), proton cu (bakır). */
export const hl = (x) => `<span class="hl">${x}</span>`;
export const rd = (x) => `<span class="rd">${x}</span>`;
export const bl = (x) => `<span class="bl">${x}</span>`;
export const gr = (x) => `<span class="gr">${x}</span>`;
export const cu = (x) => `<span class="cu">${x}</span>`;
/** Üs yazısı (10^-19 gibi): `10${sup('−19')}`. */
export const sup = (x) => `<sup style="font-size:.55em;line-height:0">${x}</sup>`;
/** Sayı biçimi: Türkçe ondalık virgül. fmt(1.5) → "1,5" */
export const fmt = (x, d = 1) => x.toFixed(d).replace('.', ',');

/** Doğrulama: koşul yanlışsa konsola hata düşer (render aracı konsol hatalarını gösterir). */
export const check = (c, m) => { if (!c) console.error('DOĞRULAMA HATASI: ' + m); };

/** Bir yazının kelime sayısı (HTML etiketleri ve tek başına semboller sayılmaz). */
export const wordsOf = (b) => ((b.l1 || '') + ' ' + (b.l2 || '')).replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
/** Asgari okuma süresi: 1,2 sn + 0,35 sn × kelime (+ b.extra: animasyonun yazıdan önce göstermesi gereken süre). */
export const minSec = (b) => 1.2 + 0.35 * wordsOf(b) + (b.extra || 0);

/**
 * Zaman çizelgesi. BEATS = [{id, l1, l2?, extra?, pre?}], sırayla.
 * b.pre: yazıdan ÖNCE yazısız animasyon süresi (bölüm 2a: önce animasyon, sonra etiket).
 * Dönen: { Z: {id: [yazıBaşı, yazıSonu]}, A: {id: animasyonBaşı}, DUR }. k: okuma payı çarpanı.
 */
export function timeline(BEATS, { k = 1.02, tail = 0 } = {}) {
  const Z = {}, A = {};
  let t = 0;
  for (const b of BEATS) {
    A[b.id] = t;
    t += b.pre || 0;
    const d = minSec(b) * k;
    Z[b.id] = [t, t + d];
    t += d;
    check(d >= 1.2 + 0.35 * wordsOf(b) - 1e-9, `${b.id}: okuma süresi yetersiz`);
  }
  const DUR = Math.round((t + tail) * 30) / 30;
  return { Z, A, DUR };
}

/**
 * Üst yazı yöneticisi: önceki yazı yukarı kayarak solar (0,3 sn), yenisi aşağıdan akarak gelir (0,35 sn).
 * Yazılar üst %10'un altında, y1/y2 (%) bandında. Kullanım: const yaz = narration(S, BEATS, Z); her karede yaz(t).
 * b.s1/b.s2: satır boyutu (vw). Son yazı ekranda kalır.
 */
export function narration(S, BEATS, Z, { y1 = 14, y2 = 21, s1 = 6.6, s2 = 5.2, gap = 0 } = {}) {
  const fns = BEATS.map((bt, i) => {
    const [t0, t1] = Z[bt.id], last = i === BEATS.length - 1;
    return (t) => {
      const inn = easeOut(seg(t, t0, t0 + 0.35));
      const out = last ? 0 : easeInOut(seg(t, t1 - 0.3 - gap, t1 - gap));
      const o = t >= t0 && t < t1 + 0.001 ? clamp(inn * (1 - out)) : 0;
      const dy = (1 - inn) * 2.6 - out * 2.6;
      S.text(bt.id + 'a', bt.l1, { y: y1 + dy, size: bt.s1 || s1, opacity: o, maxWidth: 88, nowrap: true });
      if (bt.l2) S.text(bt.id + 'b', bt.l2, { y: y2 + dy, size: bt.s2 || s2, weight: 700, opacity: o, maxWidth: 88, nowrap: true });
    };
  });
  return (t) => { for (const f of fns) f(t); };
}
