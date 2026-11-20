#!/usr/bin/env python3
"""Is emri N: yayin.json zaman damgalarini yeni birlesik videoya tasir (iş emri F'li eski videodan -> intro'lu yeni video).
  python3 zaman_n.py PARCA_KLASORU INTROLU.mp4.json   (yayin.json yerinde guncellenir; eski -> yeni tablo yazdirilir)
Eski: F videosu = birlesik + 3 sn (37,5 sn'den sonra), eski parca baslangiclari yayin.json 'zaman_damgasi_kaynagi'.
Yeni: birlesik (yeni parca sureleri ffprobe, parcalar.json 'ara') + 9,3 sn intro kaymasi (37,5 sn'den sonra).
Her baslik yeni zamanlamadaki en yakin cumle basina oturtulur (eski deger saniyeye yuvarlanmisti)."""
import sys, json, re, subprocess, os
H = os.path.dirname(os.path.abspath(__file__)); D = sys.argv[1]; meta = json.load(open(sys.argv[2]))
Y = os.path.join(H, '..', 'yayin.json'); y = json.load(open(Y)); cfg = json.load(open(os.path.join(H, 'parcalar.json')))
OLD = [0, 60.56, 277.36, 389.56, 521.76, 661.08, 795.84, 935.62]; T0 = 37.5; OLDK = 3.0; NEWK = meta['kayma']
dur = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
NEW = [0]
for i in range(1, 8): NEW.append(NEW[-1] + dur(f'{D}/parca-{i}.mp4'))
def sh(p, u):  # ham parca zamani -> ara'li parca zamani
    return u + sum(s for a, s in cfg[str(p)].get('ara', []) if u >= a)
def starts(p):
    z = json.load(open(os.path.join(H, f'zamanlama-{p}.json')))['cumleler']; return [sh(p, s['start']) for s in z]
def old_ara(p, u):  # eski videoda ara yalnizca parca 1 (37,5 / 11,4)
    return 11.4 if (p == 1 and u >= 37.5 + 11.4) else 0
def conv(t):
    if t < T0: return t
    c = t - OLDK; p = max(i for i in range(8) if OLD[i] <= c + 1e-6) + 1; u = c - OLD[p - 1]
    # ham zaman -> yeni ara'li zaman
    raw = u - old_ara(p, u); un = sh(p, raw) if p != 1 else u
    cand = [s for s in starts(p) if un - 0.3 <= s <= un + 1.2]
    if cand: un = min(cand, key=lambda s: abs(s - (un + 0.4)))
    return NEW[p - 1] + un + NEWK
fmt = lambda t: f'{int(t // 60)}:{int(t % 60):02d}'
ac = y['aciklama']; lines = ac.split('\n'); tab = []
for i, l in enumerate(lines):
    m = re.match(r'^(\d+):(\d\d) (.*)$', l)
    if m:
        t = int(m[1]) * 60 + int(m[2]); n = 0 if t == 0 else conv(t + 0.5); lines[i] = f'{fmt(n)} {m[3]}'; tab.append((l, lines[i], round(n, 2)))
y['aciklama'] = '\n'.join(lines)
ab1 = NEW[1] + cfg['2']['abone'] + sum(s for a, s in cfg['2'].get('ara', []) if a <= cfg['2']['abone']) + NEWK
ab2 = NEW[7] + cfg['8']['abone'] + NEWK
ES = meta['sure'] - 20
bolum1 = [n for o, l, n in tab if "Bölüm 1'den" in l][0]
y['studio_hatirlatma'] = [
    "Oynatma listesi 'Devre Teorisi I — Türkçe Ders Serisi'ne ekle, sıra 2 (Ders 1 Bölüm 2).",
    f"Bitiş ekranı (son 20 sn, {fmt(ES)}–{fmt(meta['sure'])} arası; orta ve alt boş): sonraki bölüm (yayınlanınca) + oynatma listesi + abone.",
    f"Bilgi kartı: {fmt(bolum1)} 'Bölüm 1'den' anına Ders 1 - Bölüm 1/3 videosu.",
    "Bölüm 1 videosunun bitiş ekranına bu videoyu 'sonraki bölüm' olarak ekle."]
y['abone_kartlari'] = [fmt(ab1) + f',{int(ab1 * 10) % 10}', fmt(ab2) + f',{int(ab2 * 10) % 10}']
y['zaman_damgasi_kaynagi'] = (f"iş emri N (20.11.2026): yeni parça başlangıçları {[round(x, 2) for x in NEW]}; parça 2'de 158,45 sn'de +0,85 sn, parça 6'da 73,03 sn'de +1,0 sn sessizlik; "
    f"onaylı Blender intro 37,5 sn'de (9,2 sn + 0,1 sn tahta): 37,5 sn'den sonraki her şey birleşik + {NEWK:.1f} sn; zamanlama-N.json cümle başları")
json.dump(y, open(Y, 'w'), ensure_ascii=False, indent=1); open(Y, 'a').write('\n')
for o, l, n in tab: print(f'{o:55s} -> {l}  ({n})')
print('abone', ab1, ab2, 'bitis ekrani', ES, 'sure', meta['sure'])
