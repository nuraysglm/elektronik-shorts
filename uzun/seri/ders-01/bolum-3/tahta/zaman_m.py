#!/usr/bin/env python3
"""Is emri M (21.11.2026): yayin.json zaman damgalarini F muzikli eski videodan intro'lu yeni videoya tasir.
  python3 zaman_m.py PARCA_KLASORU INTROLU.mp4.json ESKI_ZAMANLAMA_5.json
Eski video: birlesik + 3 sn (46,0 sn'den sonra); eski parca baslangiclari yayin.json 'zaman_damgasi_kaynagi'.
Yeni video: yeni parca sureleri (ffprobe) + intro kaymasi (46,0 sn'den sonra, INTROLU.json 'kayma').
Her baslik eski videoda oturdugu cumlenin (en yakin cumle basi) yeni zamanina tasinir; cumleye oturmuyorsa
ayni parca icindeki fark korunur. Eski -> yeni tablo yazdirilir; yayin.json yerinde guncellenir."""
import sys, json, re, subprocess, os
H = os.path.dirname(os.path.abspath(__file__)); D = sys.argv[1]; meta = json.load(open(sys.argv[2])); Z5OLD = sys.argv[3]
Y = os.path.join(H, '..', 'yayin.json'); y = json.load(open(Y)); cfg = json.load(open(os.path.join(H, 'parcalar.json')))
OLD = [0, 70.48, 185.28, 283.88, 389.44, 562.51, 802.71]; T0 = 46.0; OLDK = 3.0; NEWK = meta['kayma']
dur = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
NEW = [0]
for i in range(1, 7): NEW.append(NEW[-1] + dur(f'{D}/parca-{i}.mp4'))
sh = lambda u, ara: u + sum(s for a, s in ara if u >= a)
def starts(p, old):
    f = Z5OLD if (old and p == 5) else os.path.join(H, f'zamanlama-{p}.json')
    ara = [[46.0, 11.4]] if p == 1 else ([] if old else cfg[str(p)].get('ara', []))
    return [sh(s['start'], ara) for s in json.load(open(f))['cumleler']]
def conv(t):
    if t < T0: return t
    c = t - OLDK; p = max(i for i in range(7) if OLD[i] <= c + 1e-6) + 1; u = c - OLD[p - 1]
    so, sn = starts(p, True), starts(p, False)
    k = min(range(len(so)), key=lambda j: abs(so[j] - u))
    un = sn[k] + (u - so[k]) if abs(so[k] - u) <= 1.5 else u + (sn[k] - so[k] if so[k] <= u else 0)
    return NEW[p - 1] + un + NEWK
fmt = lambda t: f'{int(t // 60)}:{int(t % 60):02d}'
lines = y['aciklama'].split('\n')
for i, l in enumerate(lines):
    m = re.match(r'^(\d+):(\d\d) (.*)$', l)
    if m:
        t = int(m[1]) * 60 + int(m[2]); n = 0 if t == 0 else conv(t + 0.5)
        print(f'{fmt(t)} -> {fmt(n)} ({n:.2f})  {m[3]}'); lines[i] = f'{fmt(n)} {m[3]}'
y['aciklama'] = '\n'.join(lines)
y['zaman_damgasi_kaynagi'] = (f"parça süreleri (render, 21.11 iş emri M): {', '.join(f'p{i+1} {NEW[i+1]-NEW[i]:.2f}' for i in range(6))}, p7 {dur(f'{D}/parca-7.mp4'):.2f}; "
    f"başlangıçlar {[round(x, 2) for x in NEW]}; parça 1'de 46,0 sn'de 11,4 sn intro kartı + selam; onaylı Blender intro (6-S): 46,0 sn'den sonraki her şey +{NEWK:.1f} sn.")
json.dump(y, open(Y, 'w'), ensure_ascii=False, indent=2); open(Y, 'a').write('\n')
