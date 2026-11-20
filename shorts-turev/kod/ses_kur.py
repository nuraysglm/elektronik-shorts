#!/usr/bin/env python3
"""Türev Short sesi + zamanlama: kurgu.json'daki cümle aralıklarını Ders 1 - Bölüm 1 parça seslerinden keser,
araya sessizlik koyar, iki geçişli doğrusal loudnorm (-15 LUFS, tepe <= -1,5 dBTP) uygular.
Kullanım: python3 ses_kur.py ID CIKTI_KLASORU  -> CIKTI/ses-ID.wav, zamanlama-ID.json (bu klasöre)"""
import json, subprocess, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
B1 = os.path.join(HERE, '../../uzun/seri/ders-01/bolum-1')
sid, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
K = json.load(open(os.path.join(HERE, 'kurgu.json'))); cfg = K[sid]; OF = K['uzun_ofset']
PRE, POST = 0.12, 0.18
t_out = cfg['bas']; parts = []; cum = []; uzun = []
for n, (p, a, b) in enumerate(cfg['parcalar']):
    Z = json.load(open(f'{B1}/tahta/zamanlama-{p}.json'))['cumleler']
    s0 = max(Z[a]['start'] - PRE, (Z[a - 1]['end'] + 0.04) if a > 0 else 0)
    s1 = min(Z[b]['end'] + POST, (Z[b + 1]['start'] - 0.04) if b + 1 < len(Z) else Z[b]['end'] + POST)
    if n: t_out += cfg['ara']
    sh = t_out - s0
    for i in range(a, b + 1):
        c = Z[i]; cum.append({'ref': f'{p}.{i}', 'text': c['text'], 'start': round(c['start'] + sh, 3), 'end': round(c['end'] + sh, 3),
                              'words': [{'w': w['w'], 't0': round(w['t0'] + sh, 3), 't1': round(w['t1'] + sh, 3)} for w in c['words']]})
    parts.append((p, s0, s1, t_out)); uzun.append({'parca': p, 'cumle': [a, b], 'short': [round(t_out, 2), round(t_out + s1 - s0, 2)], 'uzun_video': [round(OF[str(p)] + s0, 2), round(OF[str(p)] + s1, 2)]})
    t_out += s1 - s0
ses = round(t_out + 0.05, 3)
# ffmpeg: her kesit -> adelay ile yerine; amix yerine concat (sessizlik dahil)
inp, fl, lab = [], [], []
prev = 0.0
for k, (p, s0, s1, o) in enumerate(parts):
    inp += ['-i', f'{B1}/ses/parca-{p}.mp3']
    gap = o - prev
    fl.append(f'anullsrc=r=48000:cl=mono,atrim=0:{gap:.4f}[z{k}]')
    fl.append(f'[{k}:a]aresample=48000,pan=mono|c0=c0,atrim={s0:.4f}:{s1:.4f},asetpts=N/SR/TB,afade=t=in:d=0.02,afade=t=out:st={s1 - s0 - 0.03:.4f}:d=0.03[s{k}]')
    lab += [f'[z{k}]', f'[s{k}]']; prev = o + (s1 - s0)
fl.append(''.join(lab) + f'concat=n={len(lab)}:v=0:a=1[c]')
raw = f'{out}/_ham-{sid}.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *inp, '-filter_complex', ';'.join(fl), '-map', '[c]', '-ac', '1', '-ar', '48000', raw], check=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', raw, '-af', 'loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}') + 1])
af = f"loudnorm=I=-15:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample=48000"
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', af, '-ac', '1', '-ar', '48000', f'{out}/ses-{sid}.wav'], check=True); os.remove(raw)
json.dump({'id': sid, 'ses_suresi': ses, 'kuyruk': round(cfg['bekle'] + cfg['kart'], 3), 'kart': cfg['kart'], 'kesitler': uzun, 'cumleler': cum},
          open(os.path.join(HERE, f'zamanlama-{sid}.json'), 'w'), ensure_ascii=False, indent=1)
print(sid, 'ses', ses, 'toplam', round(ses + cfg['bekle'] + cfg['kart'], 2), json.dumps(uzun))
