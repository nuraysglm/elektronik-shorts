#!/bin/bash
# kisa otomatik QC ozeti: bash qc.sh PARCA
cd "$(dirname "$0")"; timeout 900 node kontrol.mjs $1 2>&1 | python3 -c "
import json,sys;t=sys.stdin.read();i=t.find('{')
if i<0: print(t); sys.exit()
d=json.loads(t[i:]);print('parca',d['parca'],'sure',d['sure'],'kalem',d['kalem_cakisma'],'gecikme>1.5:',[(x['s'],x['lag']) for x in d['gecikme'] if x['lag']>1.5])
for k in ['tasma','cakisma','cizgi','duragan']:print(k,d[k])
print(t[:i].strip()[:2000])"
