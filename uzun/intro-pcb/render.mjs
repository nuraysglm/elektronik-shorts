#!/usr/bin/env node
// Kanal intro'sunu kare kare cizer (UZUN.md 4a-I). Sessiz H.264; muzik birlestirmede eklenir.
//   node render.mjs --out intro.mp4         |  node render.mjs --stills 0.5,2,3.5,4.6,5.4 --outdir DIR
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../..');
const argv = process.argv.slice(2), opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.ttf': 'font/ttf', '.otf': 'font/otf' };
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ args: ['--disable-gpu'] }); const page = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('SAYFA HATASI:', e.message));
await page.goto(`http://127.0.0.1:${srv.address().port}/uzun/intro-pcb/intro.html`); await page.waitForFunction('window.__ready===true||window.__err', null, { timeout: 60000 });
const err = await page.evaluate('window.__err'); if (err) { console.error(err); process.exit(1); }
const meta = await page.evaluate('window.__meta'); console.log(JSON.stringify(meta));
try {
  if (opt('stills')) { const dir = opt('outdir', '.'); fs.mkdirSync(dir, { recursive: true });
    for (const s of opt('stills').split(',')) { await page.evaluate(`window.__draw(${+s})`); await page.screenshot({ path: path.join(dir, `intro-${s}.png`) }); } }
  else { const out = opt('out'), N = Math.round(30 * meta.duration);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-', '-vf', 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-r', '30', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-an', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < N; i++) { await page.evaluate(`window.__draw(${i / 30})`); const buf = await page.screenshot({ type: 'png' }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log('kare', N, '->', out); }
} finally { await b.close(); srv.close(); }
