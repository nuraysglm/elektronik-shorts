#!/usr/bin/env node
// Abone kartini saydam 6 sn'lik katman olarak render eder (ProRes 4444, alfa).
//   OZEL=/scratchpad/ozel node abone.mjs --out abone.mov      (OZEL: profil-daire.png + kalin.ttf; depoya girmez)
//   OZEL=... node abone.mjs --stills 0.3,1.6,3.1,5 --outdir DIR
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), OZEL = process.env.OZEL;
if (!OZEL || !fs.existsSync(path.join(OZEL, 'profil-daire.png'))) { console.error('OZEL/profil-daire.png yok'); process.exit(2); }
const argv = process.argv.slice(2), opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.ttf': 'font/ttf', '.png': 'image/png' };
const srv = http.createServer((req, res) => { const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const oz = u.startsWith('/_ozel/'); const base = oz ? OZEL : ROOT; const p = path.join(base, oz ? u.slice(7) : u);
  if (!p.startsWith(base) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(ROOT, HERE)}/abone.html`); await page.waitForFunction('window.__ready===true||window.__err');
const err = await page.evaluate('window.__err'); if (err) { console.error(err); process.exit(1); }
try {
  if (opt('stills')) { const dir = opt('outdir', '.'); fs.mkdirSync(dir, { recursive: true });
    for (const s of opt('stills').split(',')) { await page.evaluate(`window.__draw(${+s})`); await page.screenshot({ path: path.join(dir, `abone-${s}.png`), omitBackground: true }); } }
  else { const out = opt('out'); const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-', '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < 180; i++) { await page.evaluate(`window.__draw(${i / 30})`); const buf = await page.screenshot({ type: 'png', omitBackground: true }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log('->', out); }
} finally { await b.close(); srv.close(); }
