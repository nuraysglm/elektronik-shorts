#!/usr/bin/env node
// Turev Short (dikey 1080x1920) sahnelerini; Ders 1 - Bolum 1 tahta/render.mjs uyarlamasi. Devre Teorisi I tahta parcalarini bassiz Chromium'da kare kare cizer (uzun/ornek-02/render.mjs uyarlamasi).
//   node render.mjs PARCA --out x.mp4 [--from a --to b] [--fps 30] [--ses parca.wav]   H.264 (+AAC)
//   node render.mjs PARCA --stills 1,5,9 --outdir DIR                                    PNG kareler
//   node render.mjs PARCA --meta                                                         yalnizca meta/rapor
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { spawn } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../..');
const argv = process.argv.slice(2), parca = argv[0];
const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png' };
const srv = http.createServer((req, res) => { const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const p = path.join(ROOT, u);
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ args: ['--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('SAYFA HATASI:', e.message)); page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('KONSOL:', m.text()); });
const rel = path.relative(ROOT, HERE).split(path.sep).join('/');
await page.goto(`http://127.0.0.1:${srv.address().port}/${rel}/tahta.html?id=${parca}`);
await page.waitForFunction('window.__ready === true || window.__err', null, { timeout: 60000 });
const err = await page.evaluate('window.__err'); if (err) { console.error(err); process.exit(1); }
const meta = await page.evaluate('window.__meta'); console.log(JSON.stringify(meta));
try {
  if (argv.includes('--meta')) { /* yalnizca meta */ }
  else if (argv.includes('--qc')) { const fs2 = fs; const r = await page.evaluate(() => ({ vurgular: window.__vurgular(), yazilar: window.__yazilar(), cizgiler: window.__cizgiler() })); fs2.writeFileSync(opt('qc'), JSON.stringify({ meta, ...r }, null, 1)); }
  else if (opt('stills')) {
    const dir = opt('outdir', '.'); fs.mkdirSync(dir, { recursive: true });
    for (const s of opt('stills').split(',')) { const t = +s; await page.evaluate(`window.__draw(${t})`);
      await page.screenshot({ path: path.join(dir, `p${parca}-${t.toFixed(2).padStart(7, '0')}.png`) }); }
  } else {
    const fps = +opt('fps', 30), from = +opt('from', 0), to = Math.min(+opt('to', meta.duration), meta.duration), out = opt('out'), ses = opt('ses');
    const n0 = Math.round(from * fps), n1 = Math.round(to * fps);
    const aIn = ses ? ['-ss', String(from), '-t', String(to - from), '-i', ses] : [];
    const aOut = ses ? ['-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-af', `apad=whole_dur=${(to - from).toFixed(3)}`, '-shortest'] : [];
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', ...aIn, '-vf', 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-r', String(fps), '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', ...aOut, '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = n0; i < n1; i++) { await page.evaluate(`window.__draw(${i / fps})`); const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
    console.log(`kare ${n1 - n0}, ${((Date.now() - t0) / 1000).toFixed(0)} sn -> ${out}`);
  }
} finally { await browser.close(); srv.close(); }
