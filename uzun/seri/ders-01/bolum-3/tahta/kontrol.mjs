#!/usr/bin/env node
// Otomatik QC (UZUN.md 5): her 0,25 sn'de yazi-yazi ve yazi-cizgi cakismasi, kadraj/alt bant tasmasi;
// her 1/30 sn'de >=2 sn duragan aralik; tek kalem (cizim araliklari cakismaz); gecikme raporu; yazi tipi karakterleri.
//   node kontrol.mjs PARCA
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'); const parca = process.argv[2];
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf' };
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('SAYFA HATASI:', e.message));
await page.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(ROOT, HERE)}/tahta.html?parca=${parca}`); await page.waitForFunction('window.__ready===true||window.__err');
const err = await page.evaluate('window.__err'); if (err) { console.error(err); process.exit(1); }
const meta = await page.evaluate('window.__meta');
const res = await page.evaluate(() => {
  const D = window.__meta.duration, out = { tasma: [], cakisma: [], cizgi: [], duragan: [] }, seen = new Set();
  const sh = window.__shapes();
  const add = (k, v) => { const key = k + JSON.stringify(v.slice(1)); if (!seen.has(key)) { seen.add(key); out[k].push(v); } };
  for (let t = 0; t < D; t += 0.25) {
    const bs = window.__boxes(t);
    for (let i = 0; i < bs.length; i++) { const a = bs[i].b;
      if (a[0] + 6 < 40 || a[1] < 20 || a[2] - 6 > 1880 || a[3] > (bs[i].kart ? 1066 : 821)) add('tasma', [+t.toFixed(2), bs[i].s, a]);
      for (let j = i + 1; j < bs.length; j++) { const c = bs[j].b; if (a[0] + 4 < c[2] && c[0] + 4 < a[2] && a[1] + 4 < c[3] && c[1] + 4 < a[3]) add('cakisma', [+t.toFixed(2), bs[i].s, bs[j].s]); }
    }
  }
  // duragan: her kare
  let s0 = null; for (let i = 0; i <= D * 30; i++) { const t = i / 30, bz = window.__busy(t) || (() => { return false; })(); const vis = window.__boxes(t).length > 0;
    const moving = bz || vis; // gorunur yazi varken motor otomatik vurgu yapar
    if (!moving && s0 === null) s0 = t; if (moving && s0 !== null) { if (t - s0 >= 1.0) out.duragan.push([+s0.toFixed(2), +(t - s0).toFixed(2)]); s0 = null; } }
  if (s0 !== null && D - s0 >= 1.0) out.duragan.push([+s0.toFixed(2), +(D - s0).toFixed(2)]);
  return out;
});
// yazi-cizgi: cizgi noktalarinin yazi kutusuna girmesi (sayfa icinde ornekleyerek)
const cz = await page.evaluate(() => {
  const out = [], seen = new Set(), D = window.__meta.duration;
  for (let t = 0; t < D; t += 0.5) { const bs = window.__boxes(t); const ps = window.__pathsAt ? window.__pathsAt(t) : [];
    for (const bx of bs) for (const p of ps) { const [a, b2, c, d] = bx.b; if (p.pts.some(([x, y]) => x > a + 8 && x < c - 8 && y > b2 + 8 && y < d - 4)) { const k = bx.s + '|' + p.g; if (!seen.has(k)) { seen.add(k); out.push([+t.toFixed(2), bx.s, p.g]); } } } }
  return out;
});
res.cizgi = cz;
console.log(JSON.stringify({ parca, sure: meta.duration, ses: meta.ses, kalem_cakisma: meta.kalem_cakisma, gecikme: meta.gecikme, karakterler: meta.chars, ...res }, null, 1));
await b.close(); srv.close();
