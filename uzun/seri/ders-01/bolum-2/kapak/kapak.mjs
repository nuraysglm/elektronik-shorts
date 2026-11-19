#!/usr/bin/env node
// Kapak (1280x720 JPG). Fotograf depoda degil: OZEL klasorunden (/_ozel/profil-kucuk.jpg).
//   OZEL=/scratchpad/ozel node kapak.mjs CIKTI.jpg
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), OZEL = process.env.OZEL, out = process.argv[2];
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const srv = http.createServer((req, res) => { const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const oz = u.startsWith('/_ozel/'); const base = oz ? OZEL : ROOT; const p = path.join(base, oz ? u.slice(7) : u);
  if (!p.startsWith(base) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); } res.writeHead(200); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
await pg.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(ROOT, HERE)}/kapak.html`); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
await pg.screenshot({ path: out, type: 'jpeg', quality: 90 }); await b.close(); srv.close(); console.log('->', out);
