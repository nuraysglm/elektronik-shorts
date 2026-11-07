#!/usr/bin/env node
// render.mjs — three.js sahnesini başsız Chromium'da kare kare çalıştırır, PNG kaydeder,
// ffmpeg ile 1080x1920 H.264 MP4 yapar, numpy ile üretilen sesi ekler.
//
// Kullanım (depo kökünden):
//   node tools/render.mjs <sahne.js> --out media/<id>/<id>.mp4            # son render (1080x1920, 30 fps)
//   node tools/render.mjs <sahne.js> --preview --out /tmp/onizleme.mp4   # deneme: 540x960, 15 fps, sessiz
//   node tools/render.mjs <sahne.js> --stills 1,4,8 --out /tmp/k.png     # seçili anlar tek görselde
// Seçenekler: --scale 0.5  --fps 30  --from 0 --to 10  --no-audio  --keep-frames
//
// Ekran kartı yok: WebGL işlemcide (SwiftShader) çalışır. Denemeleri --preview ile yap,
// son render'ı bir kez al.

import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- argümanlar
const argv = process.argv.slice(2);
const scenePath = argv[0] && !argv[0].startsWith('--') ? argv[0] : null;
const opt = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : def; };
const flag = (name) => argv.includes('--' + name);
if (!scenePath) { console.error('sahne dosyası gerekli'); process.exit(2); }
const preview = flag('preview');
const scale = +opt('scale', preview ? 0.5 : 1);
const W = Math.round(1080 * scale / 2) * 2, H = Math.round(1920 * scale / 2) * 2;
const out = path.resolve(opt('out', 'cikti.mp4'));
const stills = opt('stills', null);

// ---------------------------------------------------------------- Playwright bul
async function loadPlaywright() {
  const tries = ['playwright', '/opt/node22/lib/node_modules/playwright/index.mjs', '/opt/node-tools/node_modules/playwright/index.mjs', '/opt/npm-tools/node_modules/playwright/index.mjs', path.join(ROOT, 'node_modules/playwright/index.mjs')];
  for (const t of tries) { try { return await import(t); } catch {} }
  throw new Error('Playwright bulunamadı. `npm i playwright` veya sistemdeki kurulumu kullan.');
}
function chromePath() {
  for (const p of ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']) if (fs.existsSync(p)) return p;
  return undefined; // Playwright'ın kendi Chromium'u
}

// ---------------------------------------------------------------- statik sunucu
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.otf': 'font/otf', '.ttf': 'font/ttf', '.png': 'image/png', '.jpg': 'image/jpeg', '.wav': 'audio/wav' };
function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
      fs.createReadStream(p).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

// numpy kurulu Python'u bul (sistemde birden çok python3 olabilir)
const PY = process.env.PYTHON || ['python3', 'python3.13', 'python3.12', 'python3.11']
  .find((p) => spawnSync(p, ['-c', 'import numpy'], { stdio: 'ignore' }).status === 0) || 'python3';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: ['ignore', 'inherit', 'inherit'] });
  if (r.status !== 0) throw new Error(`${cmd} başarısız (${r.status})`);
}

// ---------------------------------------------------------------- ana akış
const { chromium } = await loadPlaywright();
const srv = await serve();
const port = srv.address().port;
const browser = await chromium.launch({
  executablePath: chromePath(),
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-gpu-sandbox'],
});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('SAYFA HATASI:', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('konsol:', m.text()); });
const rel = path.relative(ROOT, path.resolve(scenePath)).split(path.sep).join('/');
await page.goto(`http://127.0.0.1:${port}/tools/player.html?scene=${encodeURIComponent(rel)}&w=${W}&h=${H}`);
await page.waitForFunction('window.__ready === true', null, { timeout: 120000 });
const meta = await page.evaluate('window.__meta');
const fps = +opt('fps', preview ? 15 : (meta.fps || 30));
const t0 = +opt('from', 0), t1 = +opt('to', meta.duration);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kareler-'));
const cdp = await page.context().newCDPSession(page);
// Hızlı PNG yakalama (page.screenshot'tan ~10 kat hızlı)
const shot = async (file) => {
  const r = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true, clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
};

try {
  if (stills) {
    const times = stills.split(',').map(Number);
    const files = [];
    for (const [i, t] of times.entries()) { await page.evaluate((x) => window.__render(x), t); const f = path.join(tmp, `s${i}.png`); await shot(f); files.push(f); }
    const inputs = files.flatMap((f) => ['-i', f]);
    const filt = files.length > 1 ? `${files.map((_, i) => `[${i}]`).join('')}hstack=${files.length},scale='min(2400,iw)':-1` : `scale='min(1200,iw)':-1`;
    run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filt, out]);
    console.log('kareler:', out);
  } else {
    const n = Math.round((t1 - t0) * fps);
    const started = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate((x) => window.__render(x), t0 + i / fps);
      await shot(path.join(tmp, `${String(i).padStart(5, '0')}.png`));
      if (i % Math.max(1, Math.round(fps * 2)) === 0) {
        const el = (Date.now() - started) / 1000;
        process.stdout.write(`\r${i}/${n} kare · ${(el / Math.max(i, 1)).toFixed(2)} sn/kare · kalan ~${Math.round(el / Math.max(i, 1) * (n - i))} sn   `);
      }
    }
    console.log(`\n${n} kare ${(Date.now() - started) / 1000} sn`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const silent = path.join(tmp, 'video.mp4');
    run('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(tmp, '%05d.png'),
      '-vf', 'scale=1080:1920:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', preview ? 'veryfast' : 'medium',
      '-crf', preview ? '24' : '18', '-r', String(fps), silent]);
    if (flag('no-audio') || preview) {
      fs.copyFileSync(silent, out);
    } else {
      // ses adımı başarısız olursa saatlerce süren render kaybolmasın: sessiz videoyu önce sakla
      fs.copyFileSync(silent, out.replace(/\.mp4$/, '') + '.sessiz.mp4');
      const cues = path.join(tmp, 'cues.json');
      fs.writeFileSync(cues, JSON.stringify({ duration: t1 - t0, offset: t0, ...meta }));
      const wav = path.join(tmp, 'ses.wav');
      run(PY, [path.join(ROOT, 'tools/audio.py'), cues, wav]);
      run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
        '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', out]);
    }
    console.log('video:', out);
  }
} finally {
  await browser.close();
  srv.close();
  if (!flag('keep-frames')) fs.rmSync(tmp, { recursive: true, force: true });
  else console.log('kareler klasörü:', tmp);
}
