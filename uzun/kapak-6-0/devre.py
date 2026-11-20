#!/usr/bin/env python3
"""Fotoğrafsız kapak (UZUN.md 6-0): kodla devre şeması (SVG) + büyük yazı -> kapak HTML.
Kullanım: python3 devre.py  -> uzun/kapak-6-0/html/<ad>.html (render: kapak.mjs)"""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
S = []  # svg parçaları
N = {'R':0,'i':0}
def nx(k):
    N[k]+=1; return f'{k}{N[k]}'
def ln(x1,y1,x2,y2): S.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"/>')
def dot(x,y): S.append(f'<circle cx="{x}" cy="{y}" r="5" class="d"/>')
def txt(x,y,t,cls='l'): S.append(f'<text x="{x}" y="{y}" class="{cls}">{t}</text>')
def res(x1,y1,x2,y2,lab=None):
    """Direnç (zikzak), (x1,y1)->(x2,y2) yatay veya dikey; gövde 60 px ortada."""
    import math
    L = math.hypot(x2-x1, y2-y1); ux,uy=(x2-x1)/L,(y2-y1)/L; px,py=-uy,ux
    a=(L-60)/2; pts=[(x1,y1),(x1+ux*a,y1+uy*a)]
    for k in range(6):
        s=a+10*(k+0.5); sg = 12 if k%2==0 else -12
        pts.append((x1+ux*s+px*sg, y1+uy*s+py*sg))
    pts += [(x1+ux*(a+60),y1+uy*(a+60)),(x2,y2)]
    S.append('<polyline points="'+' '.join(f'{p:.1f},{q:.1f}' for p,q in pts)+'"/>')
    if lab:
        mx,my=(x1+x2)/2,(y1+y2)/2
        if abs(ux)>0.5: txt(mx-14,my-24,lab)
        else: txt(mx+22,my+8,lab)
def bat(x,y1,y2,lab=None):
    """Dikey batarya: üst uç y1 (+), alt uç y2."""
    m=(y1+y2)/2; ln(x,y1,x,m-8); ln(x,m+8,x,y2)
    S.append(f'<line x1="{x-22}" y1="{m-8}" x2="{x+22}" y2="{m-8}"/><line x1="{x-11}" y1="{m+8}" x2="{x+11}" y2="{m+8}" class="k"/>')
    txt(x-34,m-14,'+','s')
    if lab: txt(x+28,m+6,lab)
def isrc(x,y1,y2,lab=None):
    m=(y1+y2)/2; ln(x,y1,x,m-24); ln(x,m+24,x,y2)
    S.append(f'<circle cx="{x}" cy="{m}" r="24"/><line x1="{x}" y1="{m+13}" x2="{x}" y2="{m-11}"/><polyline points="{x-7},{m-3} {x},{m-13} {x+7},{m-3}"/>')
    if lab: txt(x+32,m+6,lab)
def sw(x1,y,x2,lab=None):
    """Yatay açık anahtar."""
    m=(x1+x2)/2; ln(x1,y,m-22,y); ln(m+22,y,x2,y)
    S.append(f'<circle cx="{m-22}" cy="{y}" r="4" class="o"/><circle cx="{m+22}" cy="{y}" r="4" class="o"/><line x1="{m-19}" y1="{y-2}" x2="{m+20}" y2="{y-24}"/>')
    if lab: txt(m-10,y+30,lab)
def cap(x,y1,y2,lab=None):
    m=(y1+y2)/2; ln(x,y1,x,m-6); ln(x,m+6,x,y2)
    S.append(f'<line x1="{x-18}" y1="{m-6}" x2="{x+18}" y2="{m-6}"/><line x1="{x-18}" y1="{m+6}" x2="{x+18}" y2="{m+6}"/>')
    if lab: txt(x+26,m+6,lab)
def arr(x,y,d,lab=None):
    """Akım oku (mavi) x,y merkez, d: r/l/u/d."""
    v={'r':(1,0),'l':(-1,0),'u':(0,-1),'d':(0,1)}[d]; px,py=-v[1],v[0]
    tx,ty=x+v[0]*9,y+v[1]*9
    S.append(f'<polygon class="a" points="{tx},{ty} {x-v[0]*7+px*7},{y-v[1]*7+py*7} {x-v[0]*7-px*7},{y-v[1]*7-py*7}"/>')
    if lab: txt(x-10+ (0 if d in 'ud' else 0), y-16 if d in 'rl' else y+5, lab, 'a')

def ladder(x0,y0,n,dx,h):
    """Direnç merdiveni: üst hat seri R, basamaklar 2R toprağa."""
    bat(x0,y0,y0+h,'12 V'); ln(x0,y0+h,x0+n*dx,y0+h)
    for k in range(n):
        xa,xb=x0+k*dx,x0+(k+1)*dx
        res(xa,y0,xb,y0,nx('R')); dot(xb,y0) if k<n-1 else None
        res(xb,y0,xb,y0+h,nx('R')); 
        if k<n-1: dot(xb,y0+h)
        arr(xa+dx*0.2,y0,'r',nx('i')) if k%2==0 else None
def bridge(cx,cy,w,h,src='bat'):
    """Wheatstone köprüsü: sol düğüm, sağ düğüm, üst/alt orta düğümler, ortada direnç."""
    L,R,T,B=(cx-w,cy),(cx+w,cy),(cx,cy-h),(cx,cy+h)
    res(*L,*T,nx('R')); res(*T,*R,nx('R')); res(*L,*B,nx('R')); res(*B,*R,nx('R')); res(*T,*B,nx('R'))
    for p in (L,R,T,B): dot(*p)
    xs=cx-w-110; yb=cy+h+70; ln(L[0],cy,xs,cy)
    bat(xs,cy,yb,'9 V') if src=='bat' else isrc(xs,cy,yb,'2 mA')
    ln(xs,yb,R[0]+80,yb); ln(R[0]+80,yb,R[0]+80,cy); ln(R[0],cy,R[0]+80,cy)
    arr(cx-w-55,cy,'r',nx('i'))
def mesh(x0,y0,cols,dx,h,parts):
    """İki satırlı ağ: üst hat ve alt hat, dikey kollarda parçalar."""
    xs=[x0+k*dx for k in range(cols+1)]
    for k in range(cols):
        res(xs[k],y0,xs[k+1],y0,nx('R')) if k%2==0 else ln(xs[k],y0,xs[k+1],y0)
        ln(xs[k],y0+h,xs[k+1],y0+h)
    for k,x in enumerate(xs):
        p=parts[k]
        if p=='bat': bat(x,y0,y0+h,'5 V')
        elif p=='i': isrc(x,y0,y0+h,'1 mA')
        elif p=='c': cap(x,y0,y0+h,'C')
        elif p=='r': res(x,y0,x,y0+h,nx('R'))
        if 0<k<cols: dot(x,y0); dot(x,y0+h)
    arr(xs[1]+dx*0.5,y0+h,'l',nx('i'))

def svg():
    N['R']=N['i']=0; o='<svg class="devre" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">'+''.join(S)+'</svg>'; S.clear(); return o

def grid(x0,y0,cols,rows,dx,dy,ozel={}):
    """Direnç ızgarası: her kenarda direnç; ozel[(yon,i,j)] = 'bat'/'i'/'c'/'tel'/'yok'.
    Yatay kenar ('h',i,j): (x0+i*dx, y0+j*dy) -> sağa dx; dikey kenar ('v',i,j): aşağı dy."""
    E={}
    for j in range(rows+1):
        for i in range(cols): E[('h',i,j)]=ozel.get(('h',i,j),'r')
    for j in range(rows):
        for i in range(cols+1): E[('v',i,j)]=ozel.get(('v',i,j),'r')
    for (d,i,j),t in E.items():
        x,y=x0+i*dx,y0+j*dy
        if t=='yok': continue
        if d=='h':
            if t=='r': res(x,y,x+dx,y,nx('R'))
            else: ln(x,y,x+dx,y)
        else:
            if t=='r': res(x,y,x,y+dy,nx('R'))
            elif t=='bat': bat(x,y,y+dy,'9 V' if j==0 else '5 V')
            elif t=='i': isrc(x,y,y+dy,'2 mA')
            elif t=='c': cap(x,y,y+dy,'C'+str(i+1))
            else: ln(x,y,x,y+dy)
    for j in range(rows+1):
        for i in range(cols+1):
            deg=sum(1 for k in [('h',i-1,j),('h',i,j),('v',i,j-1),('v',i,j)] if E.get(k,'yok')!='yok')
            if deg>=3: dot(x0+i*dx,y0+j*dy)
    for (i,j,d) in ozel.get('oklar',[]):
        arr(x0+i*dx+(dx*0.2 if d in 'rl' else 0), y0+j*dy+(dy*0.2 if d in 'ud' else 0), d, nx('i'))

def anahtarli():
    """9 V batarya, 3 kΩ direnç ve açık anahtar tek halka (Bölüm 2'nin kancası), sağda."""
    X0,X1,Y0,Y1=700,1110,470,650
    bat(X0,Y0,Y1,'9 V'); ln(X0,Y0,800,Y0); res(800,Y0,1000,Y0,'3 kΩ'); ln(1000,Y0,X1,Y0)
    ln(X1,Y0,X1,Y1); ln(X0,Y1,850,Y1); sw(850,Y1,970,None); ln(970,Y1,X1,Y1)
    txt(870,Y1-46,'v = ?','a')

DEVRELER = {
 'merdiven': lambda: grid(110,165,5,2,212,215,{('v',0,0):'bat',('v',0,1):'tel',('v',5,1):'c','oklar':[(0,0,'r'),(2,0,'r'),(1,1,'d')]}),
 'kopru': lambda: (grid(110,165,2,2,215,215,{('v',0,0):'bat',('v',0,1):'tel'}), bridge(950,385,170,175,'i')),
 'ag': lambda: grid(110,165,5,2,212,215,{('v',0,0):'bat',('v',0,1):'tel',('v',3,0):'i',('v',2,1):'c',('v',5,0):'c','oklar':[(0,0,'r'),(4,2,'l')]}),
 'anahtar': lambda: (grid(110,165,2,2,215,215,{('v',0,0):'bat',('v',0,1):'tel'}), anahtarli()),
}
KAPAKLAR = [
 # ad, devre, satır1, satır2 (vurgu ** ile), şerit
 ('1-1-a','merdiven','Akım akıyor ama','ortalaması <em>sıfır?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 1/3'),
 ('1-1-b','kopru','Yük en büyük,','akım <em>sıfır?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 1/3'),
 ('1-1-c','ag','Yük bölü süre','<em>akım değil mi?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 1/3'),
 ('1-2-a','anahtar','Akım sıfır…','gerilim neden <em>9 V?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
 ('1-2-b','merdiven','Zamanın yarısı,','yükün <em>dörtte biri?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
 ('1-2-c','kopru','Pil 1 gün mü,','<em>1 yıl mı?</em>','DEVRE TEORİSİ I: DERS 1 - BÖLÜM 2/3'),
]
CSS = open(os.path.join(HERE,'kapak.css')).read()
os.makedirs(os.path.join(HERE,'html'),exist_ok=True)
for ad,dv,s1,s2,serit in KAPAKLAR:
    DEVRELER[dv](); g=svg()
    h=f'<!doctype html><meta charset="utf-8"><style>{CSS}</style><body><div class="k">{g}<div class="sis"></div><div class="yazi"><div class="s1">{s1}</div><div class="s2">{s2}</div></div><div class="serit">{serit}</div></div>'
    open(os.path.join(HERE,'html',ad+'.html'),'w').write(h)
print('tamam', len(KAPAKLAR))
