#!/usr/bin/env node
// Vurgu suresi kurali (UZUN.md 4 / 5 zorunlu kontrol (a), kanal sahibi 20.11.2026):
// her isaretleme (oval/cember, alt cizgi, cerceve/kutu, ustunu cizme) TAMAMEN bittikten sonra
// isaretlenen yazi ve isaret en az 1,0 sn tam gorunur kalmali; ancak sonra o tahta silinir.
// Motor kaynagina dokunmaz: motor.js sunulurken add() icine cagri yigini kaydi eklenir (yalnizca bellekte),
// boylece hangi ogenin hangi yardimciyla (oval/under/frame/kutu/strike) cizildigi anlasilir.
//   node vurgu_tara.mjs TAHTA_KLASORU PARCA [PARCA...]   -> JSON (her vurgu: bitis, silme, aralik, ihlal)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..');
const DIR = path.resolve(process.argv[2]), PARCALAR = process.argv.slice(3), MIN = 1.0;
const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png' };
const rel = path.relative(ROOT, DIR).split(path.sep).join('/');
const PAGE = `<!doctype html><meta charset="utf-8"><canvas id="c"></canvas><script type="module">
import * as M from './motor.js'; const parca = new URLSearchParams(location.search).get('parca');
try { const { build } = await import('./parca-' + parca + '.js'); window.__meta = await M.init(document.getElementById('c'), parca, build); window.__dump = M.__dump; window.__ready = true; }
catch (e) { window.__err = String(e && e.stack || e); }</script>`;
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname); const p = path.join(ROOT, u);
  if (u === `/${rel}/__tara.html`) { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end(PAGE); }
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  if (p === path.join(DIR, 'motor.js')) {
    let src = fs.readFileSync(p, 'utf8');
    src = src.replace('export function add(o) {', 'export function add(o) { o.__st = new Error().stack;');
    src += `\nexport const __dump = () => { const ers = erases; return items.map((it) => ({ k: it.k, s: it.s, g: it.g, t0: it.t0, dur: it.dur, t1: it.t1, req: it.req, color: it.color,
  box: it.box, bb: it.k === 'path' ? union(...it.segs.map((s) => [Math.min(...s.map((q) => q[0])), Math.min(...s.map((q) => q[1])), Math.max(...s.map((q) => q[0])), Math.max(...s.map((q) => q[1]))])) : null,
  st: (it.__st || '').split('\\n').slice(2, 6).map((l) => (l.match(/at (\\S+) /) || [])[1]).filter(Boolean) })); };\n`;
    res.writeHead(200, { 'Content-Type': 'text/javascript' }); return res.end(src);
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ args: ['--disable-gpu'] });
const out = [];
for (const parca of PARCALAR) {
  const page = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(`http://127.0.0.1:${srv.address().port}/${rel}/__tara.html?parca=${parca}`);
  await page.waitForFunction('window.__ready===true||window.__err', null, { timeout: 60000 });
  const err = await page.evaluate('window.__err'); if (err) { console.error(parca, err); process.exit(1); }
  const meta = await page.evaluate('window.__meta'); const its = await page.evaluate('window.__dump()');
  const D = meta.duration;
  const KIND = ['oval', 'under', 'frame', 'strike', 'kutu'];
  for (const it of its) {
    if (it.k !== 'path') continue;
    const kind = it.st.find((f) => KIND.includes(f)); if (!kind) continue;
    const tur = it.st.includes('baslik') ? 'baslik_alt_cizgi' : it.st.includes('kutu') ? 'kutu' : kind;
    const bitis = it.t0 + it.dur;
    // isaretlenen yazi(lar): isaretin kutusuyla kesisen, bitis aninda gorunur yazilar
    const bb = it.bb, hedef = its.filter((x) => x.k === 'text' && x.box && x.t0 <= bitis && x.t1 > it.t0 &&
      x.box[0] < bb[2] + 30 && bb[0] - 30 < x.box[2] && x.box[1] < bb[3] + 30 && bb[1] - 30 < x.box[3]);
    const sil = Math.min(it.t1 === null || it.t1 === Infinity ? D : it.t1, ...hedef.map((x) => (x.t1 === null || x.t1 === Infinity ? D : x.t1)));
    // silmede soluklasma (FADE 0,2 sn) silme aninda baslar: "tam gorunur" sure = sil - bitis
    const aralik = +(sil - bitis).toFixed(3);
    out.push({ parca: +parca, tur, g: it.g, renk: it.color, t0: +it.t0.toFixed(3), bitis: +bitis.toFixed(3), silme: +sil.toFixed(3), aralik,
      parca_sonu: sil >= D - 1e-6, hedef: hedef.map((x) => x.s).slice(0, 2), ihlal: aralik < MIN });
  }
  await page.close();
}
console.log(JSON.stringify(out, null, 1));
await b.close(); srv.close();
