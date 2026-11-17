// Otomatik yazi kutusu kontrolu: her 0,25 sn'de gorunen yazilarin kutulari cakisiyor mu, kadraj/guvenli alan disina tasiyor mu.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'); const mode = process.argv[2];
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf' };
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (!fs.existsSync(p)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' }); const page = await b.newPage();
await page.goto(`http://127.0.0.1:${srv.address().port}/uzun/ornek-01/tahta.html?mode=${mode}`); await page.waitForFunction('window.__ready===true||window.__err');
const meta = await page.evaluate('window.__meta'); const [W, H] = [meta.W, meta.H];
const lim = mode === 'shorts' ? [65, 211, 929, 1306] : [40, 30, W - 40, H - 14];
const seen = new Set(); let n = 0;
for (let t = 0; t < meta.duration; t += 0.25) { const bs = await page.evaluate(`window.__boxes(${t})`);
  for (let i = 0; i < bs.length; i++) { const a = bs[i].b;
    // kutu +-6 px dolgu icerir; sinir kontrolu dolgusuz yapilir
    if (a[0] + 6 < lim[0] || a[1] < lim[1] || a[2] - 6 > lim[2] || a[3] > lim[3]) { const k = 'TASMA ' + bs[i].s + ' ' + a; if (!seen.has(k)) { seen.add(k); console.log(t.toFixed(2), k); } }
    if (mode === 'shorts' && a[2] - a[0] - 12 > 864) console.log(t, 'GENIS', bs[i].s);
    for (let j = i + 1; j < bs.length; j++) { const c = bs[j].b; if (a[0] < c[2] && c[0] < a[2] && a[1] + 4 < c[3] && c[1] + 4 < a[3]) { const k = 'CAKISMA "' + bs[i].s + '" x "' + bs[j].s + '"'; if (!seen.has(k)) { seen.add(k); console.log(t.toFixed(2), k, a, c); } } } }
  n++; }
console.log(mode, 'kontrol edilen an:', n, 'bulgu:', seen.size, 'karakterler:', meta.chars);
await b.close(); srv.close();
