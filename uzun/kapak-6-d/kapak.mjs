#!/usr/bin/env node
// html/*.html -> çıktı klasörüne 1280x720 JPG + 320x180 / 168x94 küçük test PNG'leri.  node kapak.mjs CIKTI_KLASORU
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../..'), out = process.argv[2];
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); } res.writeHead(200); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch(); fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(path.join(HERE, 'html')).filter((f) => f.endsWith('.html'))) {
  const ad = f.replace('.html', ''); const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await pg.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(ROOT, HERE)}/html/${f}`); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(200);
  await pg.screenshot({ path: path.join(out, ad + '.jpg'), type: 'jpeg', quality: 90 }); await pg.close();
  for (const [w, h] of [[320, 180], [168, 94]]) { const q = await b.newPage({ viewport: { width: w, height: h } });
    await q.setContent(`<body style="margin:0"><img src="data:image/jpeg;base64,${fs.readFileSync(path.join(out, ad + '.jpg')).toString('base64')}" style="width:${w}px;height:${h}px">`);
    await q.screenshot({ path: path.join(out, `${ad}-${w}.png`) }); await q.close(); }
  console.log('->', ad);
}
await b.close(); srv.close();
