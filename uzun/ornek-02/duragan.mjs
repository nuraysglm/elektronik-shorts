// Hicbir ogenin hareket etmedigi (tamamen duragan) araliklari listeler.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'); const mode = process.argv[2];
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png' };
const OZEL = process.env.OZEL || ''; // profil fotografi + yazi tipi: depo disinda (scratchpad)
const srv = http.createServer((req, res) => { const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const base = u.startsWith('/_ozel/') && OZEL ? OZEL : ROOT; const p = path.join(base, u.startsWith('/_ozel/') ? u.slice(7) : u); if (!fs.existsSync(p)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' }); const page = await b.newPage();
await page.goto(`http://127.0.0.1:${srv.address().port}/uzun/ornek-02/tahta.html?mode=${mode}`); await page.waitForFunction('window.__ready===true||window.__err');
const r = await page.evaluate(`(()=>{const D=window.__meta.duration,out=[];let s=null;for(let i=0;i<=D*30;i++){const t=i/30,b=window.__busy(t);if(!b&&s===null)s=t;if(b&&s!==null){if(t-s>=0.5)out.push([+s.toFixed(2),+(t-s).toFixed(2)]);s=null;}}if(s!==null&&D-s>=0.5)out.push([+s.toFixed(2),+(D-s).toFixed(2)]);return out;})()`);
console.log(mode, 'duragan araliklar [baslangic, sure]:', JSON.stringify(r)); await b.close(); srv.close();
