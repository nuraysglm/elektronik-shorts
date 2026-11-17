#!/usr/bin/env node
// Beyaz tahta sahnesini (tahta.html + sahne.js) bassiz Chromium'da kare kare cizer.
//   node uzun/ornek-01/render.mjs uzun --out x.mp4 [--from a --to b] [--fps 30]      sessiz H.264
//   node uzun/ornek-01/render.mjs shorts --stills 1,5,9 --outdir /tmp/k [--mask]     PNG kareler (+ kutular json)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { spawn } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const argv = process.argv.slice(2), mode = argv[0];
const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf' };
const srv = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const [W, H] = mode === 'shorts' ? [1080, 1920] : [1920, 1080];
const browser = await chromium.launch({ executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('SAYFA HATASI:', e.message));
await page.goto(`http://127.0.0.1:${srv.address().port}/uzun/ornek-01/tahta.html?mode=${mode}`);
await page.waitForFunction('window.__ready === true || window.__err', null, { timeout: 60000 });
const err = await page.evaluate('window.__err'); if (err) { console.error(err); process.exit(1); }
const meta = await page.evaluate('window.__meta'); console.log(JSON.stringify(meta));
try {
  if (opt('stills')) {
    const dir = opt('outdir', '.'); fs.mkdirSync(dir, { recursive: true }); const all = {};
    for (const s of opt('stills').split(',')) { const t = +s; await page.evaluate(`window.__draw(${t})`);
      if (argv.includes('--mask')) await page.evaluate(`(()=>{const c=document.getElementById('c').getContext('2d');c.fillStyle='rgba(255,0,0,0.18)';c.fillRect(0,${H}*0.68,${W},${H}*0.32);c.fillRect(${W}*0.86,${H}*0.5,${W}*0.14,${H}*0.18);c.fillRect(0,0,${W},${H}*0.11);c.fillRect(0,0,${W}*0.06,${H});})()`);
      all[s] = await page.evaluate(`window.__boxes(${t})`);
      await page.screenshot({ path: path.join(dir, `${mode}-${t.toFixed(2).padStart(6, '0')}.png`) }); }
    fs.writeFileSync(path.join(dir, `${mode}-kutular.json`), JSON.stringify(all));
  } else {
    const fps = +opt('fps', 30), from = +opt('from', 0), to = Math.min(+opt('to', meta.duration), meta.duration), out = opt('out');
    const n0 = Math.round(from * fps), n1 = Math.round(to * fps);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-vf', 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = n0; i < n1; i++) { await page.evaluate(`window.__draw(${i / fps})`); const buf = await page.screenshot({ type: 'jpeg', quality: 96 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
    console.log(`kare ${n1 - n0}, ${((Date.now() - t0) / 1000).toFixed(0)} sn -> ${out}`);
  }
} finally { await browser.close(); srv.close(); }
