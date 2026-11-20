# Gercekci PCB intro - Blender Cycles sahnesi (is emri K, 20.11.2026). Sahne tamamen kodla kurulur.
# Kullanim: python3 sahne.py --doku DOKU --out KARELER [--kareler 0-179 | 0,60,130] [--gen 1920] [--spp 48]
# Birim: 1 = 1 mm (scale_length 0.001 -> alan derinligi fiziksel).
import sys, os, json, math, argparse, time
import bpy, bmesh
from mathutils import Vector

ap = argparse.ArgumentParser()
ap.add_argument("--doku", required=True); ap.add_argument("--out", required=True)
ap.add_argument("--kareler", default="0-179"); ap.add_argument("--gen", type=int, default=1920)
ap.add_argument("--spp", type=int, default=48); ap.add_argument("--esik", type=float, default=0.03)
A = ap.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:])
D = A.doku
L = json.load(open(os.path.join(D, "yerlesim.json")))
W, H = L["W"], L["H"]; ZB = 1.6   # kart ust yuzeyi

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.unit_settings.system = 'METRIC'; sc.unit_settings.scale_length = 0.001; sc.unit_settings.length_unit = 'MILLIMETERS'

# ---------------- yardimcilar ----------------
def mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial"); b = nt.nodes.new("ShaderNodeBsdfPrincipled")
    nt.links.new(b.outputs[0], out.inputs[0])
    return m, nt, b

def setp(b, **kw):
    names = {"base": "Base Color", "metal": "Metallic", "rough": "Roughness", "coat": "Coat Weight", "coatr": "Coat Roughness",
             "ior": "IOR", "trans": "Transmission Weight", "emc": "Emission Color", "ems": "Emission Strength", "spec": "Specular IOR Level",
             "aniso": "Anisotropic", "sss": "Subsurface Weight", "coattint": "Coat Tint"}
    for k, v in kw.items():
        inp = b.inputs[names[k]]
        if isinstance(v, (tuple, list)) and len(v) == 3:
            v = (*v, 1.0)
        inp.default_value = v

def simple(name, **kw):
    m, nt, b = mat(name); setp(b, **kw); return m

def noise_rough(m, base, amp, scale):
    nt = m.node_tree; b = [n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'][0]
    nz = nt.nodes.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = scale; nz.inputs["Detail"].default_value = 6
    mr = nt.nodes.new("ShaderNodeMapRange"); mr.inputs[3].default_value = base - amp; mr.inputs[4].default_value = base + amp
    nt.links.new(nz.outputs[0], mr.inputs[0]); nt.links.new(mr.outputs[0], b.inputs["Roughness"])
    return nz

def add_bump(m, scale, strength):
    nt = m.node_tree; b = [n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'][0]
    nz = nt.nodes.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = scale; nz.inputs["Detail"].default_value = 8
    bp = nt.nodes.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = strength; bp.inputs["Distance"].default_value = 0.02
    nt.links.new(nz.outputs[0], bp.inputs["Height"]); nt.links.new(bp.outputs[0], b.inputs["Normal"])

def cube(name, sx, sy, sz, loc, m, bevel=0.0, rotz=0.0, seg=2):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = name; o.scale = (sx, sy, sz); o.rotation_euler[2] = math.radians(rotz)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel > 0:
        md = o.modifiers.new("bv", "BEVEL"); md.width = bevel; md.segments = seg; md.limit_method = 'NONE'
    o.data.materials.append(m)
    for p in o.data.polygons: p.use_smooth = True
    return o

def img(path, cs='Non-Color'):
    im = bpy.data.images.load(path); im.colorspace_settings.name = cs; return im

# ---------------- malzemeler ----------------
TIN = simple("kalay", base=(0.68, 0.68, 0.66), metal=1.0, rough=0.32)
noise_rough(TIN, 0.32, 0.08, 180)
SOLDER = simple("lehim", base=(0.82, 0.82, 0.80), metal=1.0, rough=0.12)
noise_rough(SOLDER, 0.12, 0.06, 90)
EPOXY = simple("epoksi", base=(0.011, 0.011, 0.012), rough=0.62, spec=0.4)
add_bump(EPOXY, 900, 0.25); noise_rough(EPOXY, 0.6, 0.06, 60)
RES_BODY = simple("direnc", base=(0.015, 0.015, 0.016), rough=0.5)
add_bump(RES_BODY, 1500, 0.15)
CERAMIC = simple("seramik", base=(0.50, 0.40, 0.28), rough=0.5, sss=0.05)
add_bump(CERAMIC, 1500, 0.2)
ALU_BASE = simple("alu_white", base=(0.88, 0.88, 0.85), rough=0.6)
WHITE_PRINT = simple("kod", base=(0.78, 0.78, 0.74), rough=0.8)
BLACK_PRINT = simple("siyah_baski", base=(0.02, 0.02, 0.025), rough=0.5)
ALU = simple("aluminyum", base=(0.86, 0.87, 0.88), metal=1.0, rough=0.28, aniso=0.6)
NICKEL = simple("nikel", base=(0.72, 0.71, 0.68), metal=1.0, rough=0.32)
add_bump(NICKEL, 300, 0.1)
PLASTIC_BLK = simple("plastik", base=(0.03, 0.03, 0.03), rough=0.45)
FR4 = simple("fr4", base=(0.34, 0.36, 0.20), rough=0.7)
DESK = simple("masa", base=(0.035, 0.036, 0.04), rough=0.55)
add_bump(DESK, 40, 0.2); noise_rough(DESK, 0.55, 0.1, 8)

# LED: beyaz govde + saydam epoksi + yongadan isik
LED_EPOXY, nt_le, b_le = mat("led_epoksi")
setp(b_le, base=(1.0, 0.92, 0.9), rough=0.05, trans=1.0, ior=1.5)
LED_DIE, nt_ld, b_ld = mat("led_yonga")
setp(b_ld, base=(0.4, 0.05, 0.03), rough=0.3, emc=(1.0, 0.09, 0.03), ems=0.0)

# ---------------- kart ust yuzeyi (prosedurel lehim maskesi) ----------------
KART, nt, b = mat("kart")
N = nt.nodes; Lk = nt.links.new
tc = N.new("ShaderNodeTexCoord")
def teximg(path, interp='Linear'):
    t = N.new("ShaderNodeTexImage"); t.image = img(path); t.interpolation = interp; t.extension = 'EXTEND'
    Lk(tc.outputs["UV"], t.inputs[0]); s = N.new("ShaderNodeSeparateColor"); Lk(t.outputs[0], s.inputs[0]); return s
mk = teximg(os.path.join(D, "kart_maske.png"))      # R bakir, G acik altin, B serigrafi
dt = teximg(os.path.join(D, "kart_detay.png"))      # R delik, G yol (darbe), B yukseklik
art = N.new("ShaderNodeTexImage"); art.image = img(os.path.join(D, "varis.png")); art.extension = 'EXTEND'
Lk(tc.outputs["UV"], art.inputs[0])
CU, AU, SK = mk.outputs[0], mk.outputs[1], mk.outputs[2]
HO, TR, HG = dt.outputs[0], dt.outputs[1], dt.outputs[2]

def mth(op, a, bb=None, v1=None, v2=None, clamp=False):
    n = N.new("ShaderNodeMath"); n.operation = op; n.use_clamp = clamp
    if isinstance(a, (int, float)): n.inputs[0].default_value = a
    else: Lk(a, n.inputs[0])
    if bb is not None:
        if isinstance(bb, (int, float)): n.inputs[1].default_value = bb
        else: Lk(bb, n.inputs[1])
    return n.outputs[0]

def mix(fac, a, bcol):
    n = N.new("ShaderNodeMix"); n.data_type = 'RGBA'; n.blend_type = 'MIX'
    if isinstance(fac, (int, float)): n.inputs["Factor"].default_value = fac
    else: Lk(fac, n.inputs["Factor"])
    for i, c in ((6, a), (7, bcol)):
        if isinstance(c, tuple): n.inputs[i].default_value = (*c, 1.0)
        else: Lk(c, n.inputs[i])
    return n.outputs[2]

# ince doku: portakal kabugu + toz + cizik
tc_obj = tc.outputs["Object"]
nz_peel = N.new("ShaderNodeTexNoise"); nz_peel.inputs["Scale"].default_value = 1.6; nz_peel.inputs["Detail"].default_value = 4
Lk(tc_obj, nz_peel.inputs["Vector"])
nz_big = N.new("ShaderNodeTexNoise"); nz_big.inputs["Scale"].default_value = 0.05; nz_big.inputs["Detail"].default_value = 3
Lk(tc_obj, nz_big.inputs["Vector"])
vor = N.new("ShaderNodeTexVoronoi"); vor.inputs["Scale"].default_value = 0.9; Lk(tc_obj, vor.inputs["Vector"])
dust = mth('LESS_THAN', vor.outputs["Distance"], 0.035)        # toz zerreleri
nz_dvar = N.new("ShaderNodeTexNoise"); nz_dvar.inputs["Scale"].default_value = 0.08; Lk(tc_obj, nz_dvar.inputs["Vector"])
dust = mth('MULTIPLY', dust, mth('GREATER_THAN', nz_dvar.outputs[0], 0.55))
# cizikler: bir yonde gerilmis gurultu
mp = N.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (0.02, 3.0, 1.0); mp.inputs["Rotation"].default_value = (0, 0, 0.5)
Lk(tc_obj, mp.inputs["Vector"])
nz_s = N.new("ShaderNodeTexNoise"); nz_s.inputs["Scale"].default_value = 1.0; nz_s.inputs["Detail"].default_value = 2
Lk(mp.outputs[0], nz_s.inputs["Vector"])
scr = mth('MULTIPLY', mth('GREATER_THAN', nz_s.outputs[0], 0.71), mth('GREATER_THAN', nz_big.outputs[0], 0.5))

# renk
mask_dark = (0.005, 0.026, 0.011); mask_cu = (0.013, 0.058, 0.024)
col = mix(CU, mask_dark, mask_cu)
col = mix(mth('MULTIPLY', nz_big.outputs[0], 0.25), col, (0.009, 0.042, 0.018))
col = mix(mth('MULTIPLY', HO, 1.0), col, (0.004, 0.012, 0.006))
col = mix(SK, col, (0.80, 0.80, 0.75))
col = mix(AU, col, (0.95, 0.72, 0.36))
col = mix(mth('MULTIPLY', dust, 0.6), col, (0.35, 0.36, 0.33))
Lk(col, b.inputs["Base Color"])
Lk(AU, b.inputs["Metallic"])
# puruzluluk
r_mask = mth('ADD', 0.30, mth('MULTIPLY', nz_big.outputs[0], 0.15))
r = mix(SK, r_mask, (0.75, 0.75, 0.75)) if False else None
rough = mth('ADD', mth('MULTIPLY', r_mask, mth('SUBTRACT', 1.0, SK)), mth('MULTIPLY', SK, 0.78))
rough_au = mth('ADD', 0.16, mth('MULTIPLY', nz_peel.outputs[0], 0.12))
rough = mth('ADD', mth('MULTIPLY', rough, mth('SUBTRACT', 1.0, AU)), mth('MULTIPLY', rough_au, AU))
rough = mth('MAXIMUM', rough, mth('MULTIPLY', dust, 0.9))
Lk(rough, b.inputs["Roughness"])
# vernik katmani (lehim maskesinin parlakligi)
coat = mth('MULTIPLY', mth('SUBTRACT', 1.0, AU), mth('SUBTRACT', 1.0, mth('MULTIPLY', SK, 0.85)))
Lk(coat, b.inputs["Coat Weight"])
coat_r = mth('ADD', 0.05, mth('ADD', mth('MULTIPLY', nz_big.outputs[0], 0.08), mth('MULTIPLY', scr, 0.25)))
coat_r = mth('MAXIMUM', coat_r, mth('MULTIPLY', dust, 0.8))
Lk(coat_r, b.inputs["Coat Roughness"])
b.inputs["Coat Tint"].default_value = (0.42, 0.74, 0.50, 1.0)
b.inputs["Coat IOR"].default_value = 1.52
# yukseklik
hgt = mth('ADD', mth('MULTIPLY', HG, 0.035), mth('MULTIPLY', SK, 0.012))
hgt = mth('ADD', hgt, mth('MULTIPLY', nz_peel.outputs[0], 0.004))
hgt = mth('SUBTRACT', hgt, mth('MULTIPLY', HO, 0.03))
hgt = mth('SUBTRACT', hgt, mth('MULTIPLY', AU, 0.012))
hgt = mth('ADD', hgt, mth('MULTIPLY', dust, 0.006))
bp = N.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 1.0; bp.inputs["Distance"].default_value = 1.0
Lk(hgt, bp.inputs["Height"]); Lk(bp.outputs[0], b.inputs["Normal"])
cbp = N.new("ShaderNodeBump"); cbp.inputs["Strength"].default_value = 0.8; cbp.inputs["Distance"].default_value = 1.0
Lk(mth('ADD', mth('MULTIPLY', HG, 0.03), mth('MULTIPLY', nz_peel.outputs[0], 0.006)), cbp.inputs["Height"])
Lk(cbp.outputs[0], b.inputs["Coat Normal"])
# akim darbesi: e = yol * (bas + kuyruk + iz)
Tn = N.new("ShaderNodeValue"); Tn.name = "ZAMAN"; Tn.outputs[0].default_value = 0.0
GAIN = N.new("ShaderNodeValue"); GAIN.name = "DARBE"; GAIN.outputs[0].default_value = float(os.environ.get("DARBE", "5.0"))
a_t = mth('MULTIPLY', art.outputs[0], 8.0)
dtt = mth('SUBTRACT', Tn.outputs[0], a_t)
head = mth('EXPONENT', mth('MULTIPLY', mth('MULTIPLY', mth('DIVIDE', dtt, 0.045), mth('DIVIDE', dtt, 0.045)), -1.0))
tail = mth('MULTIPLY', mth('GREATER_THAN', dtt, 0.0), mth('EXPONENT', mth('DIVIDE', dtt, -0.28)))
glow = mth('ADD', mth('MULTIPLY', head, 1.0), mth('MULTIPLY', tail, 0.12))
glow = mth('ADD', glow, mth('MULTIPLY', mth('GREATER_THAN', dtt, 0.0), 0.015))
glow = mth('MULTIPLY', mth('MULTIPLY', glow, TR), mth('SUBTRACT', 1.0, AU))
Lk(mth('MULTIPLY', glow, GAIN.outputs[0]), b.inputs["Emission Strength"])
b.inputs["Emission Color"].default_value = (0.35, 1.0, 0.70, 1.0)

# ---------------- geometri ----------------
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, ZB))
top = bpy.context.active_object; top.name = "kart_ust"; top.scale = (W, H, 1)
bpy.ops.object.transform_apply(scale=True); top.data.materials.append(KART)
cube("kart_govde", W, H, ZB - 0.002, (0, 0, (ZB - 0.002) / 2), FR4)
bpy.ops.mesh.primitive_plane_add(size=1200, location=(0, 0, 0)); desk = bpy.context.active_object; desk.data.materials.append(DESK)

def place(o, x, y, a):
    o.rotation_euler[2] = math.radians(a) if not isinstance(a, str) else 0
    return o

def text(s, size, loc, rotz, m, body_font=None):
    cu = bpy.data.curves.new("t", "FONT"); cu.body = s; cu.size = size; cu.align_x = 'CENTER'; cu.align_y = 'CENTER'
    if body_font: cu.font = body_font
    o = bpy.data.objects.new("yazi", cu); bpy.context.collection.objects.link(o)
    o.location = loc; o.rotation_euler[2] = math.radians(rotz); o.data.materials.append(m)
    return o

import math as M
def rotp(x, y, a):
    c, s = M.cos(M.radians(a)), M.sin(M.radians(a)); return (x * c - y * s, x * s + y * c)

def fillet(x, y, a, length, width, h, m=SOLDER):
    # lehim dolgusu: pad uzerinde, uc kapaktan disari egimli kama
    bm = bmesh.new()
    v = [(0, -width / 2, 0), (length, -width / 2, 0), (0, -width / 2, h), (0, width / 2, 0), (length, width / 2, 0), (0, width / 2, h)]
    vs = [bm.verts.new(p) for p in v]
    for f in ((0, 1, 2), (3, 5, 4), (0, 3, 4, 1), (1, 4, 5, 2), (0, 2, 5, 3)):
        bm.faces.new([vs[i] for i in f])
    me = bpy.data.meshes.new("dolgu"); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new("dolgu", me); bpy.context.collection.objects.link(o)
    o.location = (x, y, ZB); o.rotation_euler[2] = M.radians(a); me.materials.append(m)
    md = o.modifiers.new("bv", "BEVEL"); md.width = min(h, length) * 0.35; md.segments = 3; md.limit_method = 'NONE'
    for p in me.polygons: p.use_smooth = True
    return o

def chip2(c, Lb, Wb, Hb, body_m, cap_len=0.3):
    x, y, a = c["x"], c["y"], c["a"]
    o = cube(c["ad"], Lb - 2 * cap_len + 0.02, Wb, Hb, (x, y, ZB + 0.02 + Hb / 2), body_m, bevel=0.04, rotz=a)
    for sgn in (-1, 1):
        dx, dy = rotp(sgn * (Lb / 2 - cap_len / 2), 0, a)
        cube("kapak", cap_len, Wb + 0.02, Hb + 0.02, (x + dx, y + dy, ZB + 0.02 + Hb / 2), TIN, bevel=0.05, rotz=a)
        fx, fy = rotp(sgn * (Lb / 2), 0, a)
        fillet(x + fx, y + fy, a if sgn > 0 else a + 180, 0.32, Wb * 0.9, Hb * 0.55)
    return o

def gullwing(x, y, a, leg_w, reach, zt, m=TIN):
    # profil: govdeden cikis -> asagi -> ayak
    prof = [(0.0, zt), (0.25, zt), (0.45, 0.08), (reach, 0.08), (reach, 0.0), (0.38, 0.0), (0.18, zt - 0.15), (0.0, zt - 0.15)]
    bm = bmesh.new()
    vl = [bm.verts.new((px, -leg_w / 2, pz)) for px, pz in prof]
    vr = [bm.verts.new((px, leg_w / 2, pz)) for px, pz in prof]
    n = len(prof)
    bm.faces.new(vl[::-1]); bm.faces.new(vr)
    for i in range(n):
        j = (i + 1) % n; bm.faces.new([vl[i], vl[j], vr[j], vr[i]])
    me = bpy.data.meshes.new("bacak"); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new("bacak", me); bpy.context.collection.objects.link(o)
    o.location = (x, y, ZB); o.rotation_euler[2] = M.radians(a); me.materials.append(m)
    md = o.modifiers.new("bv", "BEVEL"); md.width = 0.03; md.segments = 2; md.limit_method = 'ANGLE'
    return o

def marking_mat(name, path, base=(0.011, 0.011, 0.012), ink=(0.45, 0.45, 0.44), reveal=False):
    m, nt2, b2 = mat(name)
    N2 = nt2.nodes; L2 = nt2.links.new
    t = N2.new("ShaderNodeTexImage"); t.image = img(path); t.extension = 'CLIP'
    tc2 = N2.new("ShaderNodeTexCoord"); L2(tc2.outputs["UV"], t.inputs[0])
    fac = t.outputs[0]
    if reveal:
        sep = N2.new("ShaderNodeSeparateXYZ"); L2(tc2.outputs["UV"], sep.inputs[0])
        rv = N2.new("ShaderNodeValue"); rv.name = "ACILMA"; rv.outputs[0].default_value = 0.0
        # lazer cizgisi soldan saga: x < acilma
        lt = N2.new("ShaderNodeMath"); lt.operation = 'LESS_THAN'; L2(sep.outputs[0], lt.inputs[0]); L2(rv.outputs[0], lt.inputs[1])
        mm = N2.new("ShaderNodeMath"); mm.operation = 'MULTIPLY'; L2(t.outputs[0], mm.inputs[0]); L2(lt.outputs[0], mm.inputs[1])
        fac = mm.outputs[0]
        # lazerin parlak ucu
        d = N2.new("ShaderNodeMath"); d.operation = 'SUBTRACT'; L2(rv.outputs[0], d.inputs[0]); L2(sep.outputs[0], d.inputs[1])
        g = N2.new("ShaderNodeMath"); g.operation = 'LESS_THAN'; L2(d.outputs[0], g.inputs[0]); g.inputs[1].default_value = 0.02
        g2 = N2.new("ShaderNodeMath"); g2.operation = 'MULTIPLY'; L2(g.outputs[0], g2.inputs[0]); L2(lt.outputs[0], g2.inputs[1])
        g3 = N2.new("ShaderNodeMath"); g3.operation = 'MULTIPLY'; L2(g2.outputs[0], g3.inputs[0]); L2(t.outputs[0], g3.inputs[1])
        lz = N2.new("ShaderNodeValue"); lz.name = "LAZER"; lz.outputs[0].default_value = 0.0
        g4 = N2.new("ShaderNodeMath"); g4.operation = 'MULTIPLY'; L2(g3.outputs[0], g4.inputs[0]); L2(lz.outputs[0], g4.inputs[1])
        L2(g4.outputs[0], b2.inputs["Emission Strength"]); b2.inputs["Emission Color"].default_value = (1.0, 0.75, 0.45, 1.0)
    mx = N2.new("ShaderNodeMix"); mx.data_type = 'RGBA'; L2(fac, mx.inputs["Factor"])
    mx.inputs[6].default_value = (*base, 1); mx.inputs[7].default_value = (*ink, 1); L2(mx.outputs[2], b2.inputs["Base Color"])
    mr = N2.new("ShaderNodeMapRange"); L2(fac, mr.inputs[0]); mr.inputs[3].default_value = 0.55; mr.inputs[4].default_value = 0.85
    L2(mr.outputs[0], b2.inputs["Roughness"])
    nz = N2.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = 900; nz.inputs["Detail"].default_value = 6
    bpn = N2.new("ShaderNodeBump"); bpn.inputs["Strength"].default_value = 0.25; bpn.inputs["Distance"].default_value = 0.02
    L2(nz.outputs[0], bpn.inputs["Height"]); L2(bpn.outputs[0], b2.inputs["Normal"])
    b2.inputs["Specular IOR Level"].default_value = 0.4
    return m

def top_plane(name, w, h, loc, rotz, m):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = name; o.scale = (w, h, 1); o.rotation_euler[2] = M.radians(rotz)
    o.data.materials.append(m); return o

CHIP_MAT = marking_mat("cip_ust", os.path.join(D, "cip_yazi.png"), ink=(0.42, 0.42, 0.41), reveal=True)
font_code = None

for c in L["comps"]:
    t = c["tip"]; x, y, a = c["x"], c["y"], c["a"]
    if t == "r0603":
        chip2(c, 1.6, 0.8, 0.45, RES_BODY)
        text(c.get("kod", "103"), 0.42, (x, y, ZB + 0.02 + 0.452), a, WHITE_PRINT)
    elif t == "c0603":
        chip2(c, 1.6, 0.8, 0.8, CERAMIC)
    elif t == "led0805":
        cube("led_taban", 2.0, 1.25, 0.32, (x, y, ZB + 0.02 + 0.16), ALU_BASE, bevel=0.04, rotz=a)
        for sgn in (-1, 1):
            dx, dy = rotp(sgn * 0.85, 0, a)
            cube("led_uc", 0.3, 1.25, 0.34, (x + dx, y + dy, ZB + 0.02 + 0.17), TIN, bevel=0.04, rotz=a)
            fx, fy = rotp(sgn * 1.0, 0, a); fillet(x + fx, y + fy, a if sgn > 0 else a + 180, 0.3, 1.1, 0.22)
        cube("led_epoksi", 1.7, 1.2, 0.5, (x, y, ZB + 0.34 + 0.25), LED_EPOXY, bevel=0.18, rotz=a, seg=4)
        cube("led_yonga", 0.3, 0.3, 0.1, (x, y, ZB + 0.40), LED_DIE, rotz=a)
        cube("led_katot", 0.12, 1.0, 0.01, (x + rotp(-0.6, 0, a)[0], y + rotp(-0.6, 0, a)[1], ZB + 0.84 + 0.005), simple("yesil_isaret", base=(0.05, 0.25, 0.08), rough=0.4), rotz=a)
        LED_POS = (x, y, ZB + 0.6)
    elif t == "qfp":
        g = c["govde"]
        cube("U1", g, g, 1.4, (x, y, ZB + 0.1 + 0.7), EPOXY, bevel=0.18, seg=3)
        top_plane("U1_ust", g - 0.5, g - 0.5, (x, y, ZB + 0.1 + 1.4 + 0.002), 0, CHIP_MAT)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.35, depth=0.05, location=(x - g / 2 + 1.0, y + g / 2 - 1.0, ZB + 1.5 + 0.004))
        dimple = bpy.context.active_object; dimple.data.materials.append(simple("cukur", base=(0.012, 0.012, 0.014), rough=0.3))
        for side in range(4):
            aa = side * 90
            for k in range(c["n"]):
                u = (k - (c["n"] - 1) / 2) * c["aralik"]
                px, py = rotp(u, g / 2, aa)
                gullwing(x + px, y + py, aa + 90, 0.22, 1.15, 0.85)
                fx, fy = rotp(u, g / 2 + 1.15, aa)
                fillet(x + fx, y + fy, aa + 90, 0.28, 0.24, 0.12)
    elif t == "soic":
        n = c["n"]; rows = n // 2; Lb = rows * 1.27 + 0.4
        cube(c["ad"], 3.9, Lb, 1.45, (x, y, ZB + 0.1 + 0.725), EPOXY, bevel=0.15, rotz=a, seg=3)
        mm = marking_mat(c["ad"] + "_ust", os.path.join(D, ("u2" if c["ad"] == "U2" else "u3") + "_yazi.png"))
        top_plane(c["ad"] + "_ust", 3.0, min(Lb - 0.6, 6.0), (x, y, ZB + 0.1 + 1.45 + 0.002), a + 90, mm)
        for side in (-1, 1):
            for i in range(rows):
                yy = (i - (rows - 1) / 2) * 1.27
                px, py = rotp(side * 1.95, yy, a)
                gullwing(x + px, y + py, a + (0 if side > 0 else 180), 0.42, 1.25, 0.9)
                fx, fy = rotp(side * (1.95 + 1.25), yy, a)
                fillet(x + fx, y + fy, a + (0 if side > 0 else 180), 0.3, 0.44, 0.13)
    elif t == "elko":
        bm = cube("elko_taban", 6.6, 6.6, 1.0, (x, y, ZB + 0.5), PLASTIC_BLK, bevel=0.6, seg=1)
        bpy.ops.mesh.primitive_cylinder_add(radius=3.15, depth=5.4, vertices=96, location=(x, y, ZB + 1.0 + 2.7))
        can = bpy.context.active_object; can.data.materials.append(ALU)
        md = can.modifiers.new("bv", "BEVEL"); md.width = 0.35; md.segments = 4; md.limit_method = 'ANGLE'
        bpy.ops.object.shade_smooth()
        bpy.ops.mesh.primitive_cylinder_add(radius=2.6, depth=0.02, vertices=64, location=(x - 0.0, y, ZB + 6.4 + 0.012))
        mk_o = bpy.context.active_object
        # siyah yarim ay polarite isareti: yalnizca bir yarisi
        bm2 = bmesh.new(); bm2.from_mesh(mk_o.data)
        for v in [v for v in bm2.verts if v.co.y > -1.2]:
            pass
        bmesh.ops.delete(bm2, geom=[v for v in bm2.verts if v.co.y > -1.2], context='VERTS'); bm2.to_mesh(mk_o.data); bm2.free()
        mk_o.data.materials.append(BLACK_PRINT)
        text("47", 1.1, (x, y + 0.7, ZB + 6.4 + 0.02), 0, BLACK_PRINT)
        text("16V", 0.8, (x, y - 0.4, ZB + 6.4 + 0.02), 0, BLACK_PRINT)
        for sgn in (-1, 1):
            cube("elko_bacak", 1.8, 0.7, 0.12, (x + sgn * 2.9, y, ZB + 0.06), TIN, bevel=0.03, rotz=0)
    elif t == "xtal":
        cube("xtal_taban", 3.2, 2.5, 0.3, (x, y, ZB + 0.15), CERAMIC, bevel=0.05, rotz=a)
        cube("xtal_kapak", 2.9, 2.2, 0.5, (x, y, ZB + 0.3 + 0.25), NICKEL, bevel=0.12, rotz=a, seg=3)

# ---------------- isik ve dunya ----------------
world = bpy.data.worlds.new("dunya"); sc.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]; bg.inputs[0].default_value = (0.05, 0.055, 0.065, 1); bg.inputs[1].default_value = 0.10

def area(name, loc, target, size, sizey, energy, color=(1, 1, 1)):
    ld = bpy.data.lights.new(name, "AREA"); ld.shape = 'RECTANGLE'; ld.size = size; ld.size_y = sizey; ld.energy = energy; ld.color = color
    o = bpy.data.objects.new(name, ld); bpy.context.collection.objects.link(o); o.location = loc
    dvec = Vector(target) - Vector(loc); o.rotation_euler = dvec.to_track_quat('-Z', 'Y').to_euler()
    return o

area("anahtar", (-140, -110, 170), (0, 0, 0), 160, 160, 5.0e5, (1.0, 0.97, 0.92))
area("kenar", (30, 230, 70), (0, 0, 0), 320, 60, 2.0e5, (0.9, 0.95, 1.0))
area("dolgu", (160, -60, 90), (0, 0, 0), 120, 120, 1.0e5, (0.95, 0.97, 1.0))
lp = bpy.data.lights.new("led_isik", "POINT"); lp.energy = 0.0; lp.color = (1.0, 0.12, 0.05); lp.shadow_soft_size = 0.4
lpo = bpy.data.objects.new("led_isik", lp); bpy.context.collection.objects.link(lpo); lpo.location = (LED_POS[0], LED_POS[1], LED_POS[2] + 0.4)

# ---------------- kamera ----------------
cd = bpy.data.cameras.new("kamera"); cd.lens = 50; cd.sensor_width = 36; cd.clip_start = 1; cd.clip_end = 5000
cam = bpy.data.objects.new("kamera", cd); bpy.context.collection.objects.link(cam); sc.camera = cam
cd.dof.use_dof = True; cd.dof.aperture_blades = 7; cd.dof.aperture_rotation = 0.3
foc = bpy.data.objects.new("odak", None); bpy.context.collection.objects.link(foc); cd.dof.focus_object = foc
tgt = bpy.data.objects.new("hedef", None); bpy.context.collection.objects.link(tgt)
tc_ = cam.constraints.new("TRACK_TO"); tc_.target = tgt; tc_.track_axis = 'TRACK_NEGATIVE_Z'; tc_.up_axis = 'UP_Y'

def ss(t):  # smoothstep
    t = min(max(t, 0.0), 1.0); return t * t * (3 - 2 * t)
def lerp(a, b, t): return tuple(a[i] + (b[i] - a[i]) * t for i in range(len(a)))
def path(keys, t):
    # keys: [(zaman, deger)], parca parca smoothstep
    if t <= keys[0][0]: return keys[0][1]
    for (t0, v0), (t1, v1) in zip(keys, keys[1:]):
        if t <= t1: return lerp(v0, v1, ss((t - t0) / (t1 - t0)) if False else (t - t0) / (t1 - t0))
    return keys[-1][1]
def spline(keys, t):
    # Catmull-Rom (yumusak, durmadan) + uclarda yavaslama
    ts = [k[0] for k in keys]; vs = [k[1] for k in keys]
    t = min(max(t, ts[0]), ts[-1])
    i = max(0, min(len(ts) - 2, [j for j in range(len(ts) - 1) if ts[j] <= t][-1]))
    u = (t - ts[i]) / (ts[i + 1] - ts[i])
    p0 = vs[max(i - 1, 0)]; p1 = vs[i]; p2 = vs[i + 1]; p3 = vs[min(i + 2, len(vs) - 1)]
    out = []
    for d in range(len(p1)):
        a0, a1, a2, a3 = p0[d], p1[d], p2[d], p3[d]
        out.append(0.5 * ((2 * a1) + (-a0 + a2) * u + (2 * a0 - 5 * a1 + 4 * a2 - a3) * u * u + (-a0 + 3 * a1 - 3 * a2 + a3) * u ** 3))
    return tuple(out)

CAM = [(0.0, (-30.0, -36.0, 13.0)), (2.0, (-17.0, -33.0, 12.5)), (4.0, (-5.5, -29.0, 15.0)), (5.0, (0.0, -21.0, 19.5)), (6.0, (0.0, -14.5, 15.5))]
TGT = [(0.0, (-12.0, -6.0, 1.6)), (2.0, (-5.0, -2.5, 1.8)), (4.0, (-0.8, -0.8, 2.0)), (5.0, (0.0, -0.6, 1.9)), (6.0, (0.0, -0.4, 1.8))]
FOC = [(0.0, (-17.5, -13.0, 2.0)), (1.0, (-15.0, -10.0, 2.0)), (2.2, (-3.0, -4.0, 2.2)), (4.0, (0.0, -1.5, 3.0)), (6.0, (0.0, -0.5, 3.1))]
FST = [(0.0, (5.0,)), (2.0, (5.6,)), (3.6, (8.0,)), (4.4, (22.0,)), (6.0, (22.0,))]

# Is emri K2 (20.11.2026 14:25): kamera 3,0 sn'den itibaren cipe yaklasirken tepeye yukselir ve 5,0 sn'de cipe
#  TAM USTTEN (dik) bakar; 5,0 sn'den sonra kamera sabit (yalnizca isik degisir). Odak cip yuzeyinde.
CHIP_TOP = (0.0, 0.0, ZB + 0.1 + 1.4)          # cip ust yuzeyi (yazi duzlemi)
TOP_R = float(os.environ.get("TEPE_R", "36.0"))  # tepeden bakista cip yuzeyine uzaklik (mm)
K2_T0, K2_T1 = 3.0, 5.0
def smoother(u):
    u = min(max(u, 0.0), 1.0); return u * u * u * (u * (u * 6 - 15) + 10)
def k2_camera(t):
    c0 = Vector(spline(CAM, min(t, 6.0))); g0 = Vector(spline(TGT, min(t, 6.0))); f0 = Vector(spline(FOC, min(t, 6.0)))
    w = smoother((t - K2_T0) / (K2_T1 - K2_T0))
    if w <= 0: return c0, g0, f0
    top = Vector(CHIP_TOP)
    g = g0.lerp(top, w); f = f0.lerp(top, w)
    v = c0 - g0; r0 = v.length; el0 = math.asin(v.z / r0); az0 = math.atan2(v.y, v.x)
    r = r0 + (TOP_R - r0) * w; el = el0 + (math.radians(90.0) - el0) * w
    az = az0 + (math.radians(-90.0) - az0) * w
    off = Vector((math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el))) * r
    if w >= 1.0: off = Vector((0.0, 0.0, r))
    return g + off, g, f
STATIC_T = K2_T1                                 # bu andan sonra kamera ve sahne geometrisi sabit

def set_frame(f):
    t = f / 30.0
    cl, gl, fl = k2_camera(t)
    cam.location = cl; tgt.location = gl; foc.location = fl
    cd.dof.aperture_fstop = spline(FST, min(t, 6.0))[0] * float(os.environ.get("FOLCEK", "0.005"))
    KART.node_tree.nodes["ZAMAN"].outputs[0].default_value = t
    # sabit bolumde yollarda yavas "nefes" eden isik (anahtar kareler capraz gecisle birlesir)
    br = 1.0 + 0.9 * ss((t - 5.3) / 0.8) * (0.5 - 0.5 * math.cos(2 * math.pi * max(t - 5.3, 0) / 2.4)) if t > 5.3 else 1.0
    KART.node_tree.nodes["DARBE"].outputs[0].default_value = float(os.environ.get("DARBE", "5.0")) * br
    led = ss((t - 4.0) / 0.25)
    flick = 1.0
    LED_DIE.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 60.0 * led
    lp.energy = 3.0 * led
    rv = ss((t - 4.05) / 0.85) * 1.04 - 0.02
    CHIP_MAT.node_tree.nodes["ACILMA"].outputs[0].default_value = rv
    CHIP_MAT.node_tree.nodes["LAZER"].outputs[0].default_value = 6.0 if 4.05 < t < 4.92 else 0.0
    sc.frame_current = f

# ---------------- cikti ayarlari ----------------
r = sc.render; r.engine = 'CYCLES'; r.resolution_x = A.gen; r.resolution_y = A.gen * 9 // 16; r.resolution_percentage = 100
r.image_settings.file_format = 'PNG'; r.image_settings.color_depth = '8'
r.use_persistent_data = True; r.fps = 30
cy = sc.cycles; cy.device = 'CPU'; cy.samples = A.spp; cy.use_adaptive_sampling = True; cy.adaptive_threshold = A.esik
cy.use_denoising = True
try: cy.denoiser = 'OPENIMAGEDENOISE'
except Exception as e: print("denoiser", e)
try: cy.denoising_input_passes = 'RGB_ALBEDO_NORMAL'
except Exception: pass
cy.max_bounces = 5; cy.diffuse_bounces = 2; cy.glossy_bounces = 2; cy.transmission_bounces = 6; cy.transparent_max_bounces = 4
cy.caustics_reflective = False; cy.caustics_refractive = False; cy.blur_glossy = 1.0
cy.seed = 0; cy.use_animated_seed = True
sc.view_settings.view_transform = 'AgX'
for lk in ('AgX - Medium High Contrast', 'Medium High Contrast', 'AgX - Base Contrast'):
    try: sc.view_settings.look = lk; break
    except Exception: pass
sc.view_settings.exposure = 0.0

os.makedirs(A.out, exist_ok=True)
fr = []
for part in A.kareler.split(","):
    if "-" in part: a0, a1 = part.split("-"); fr += list(range(int(a0), int(a1) + 1))
    else: fr.append(int(part))
for f in fr:
    p = os.path.join(A.out, "k%04d.png" % f)
    if os.path.exists(p): continue
    t0 = time.time(); set_frame(f); sc.render.filepath = p
    bpy.ops.render.render(write_still=True)
    print("KARE", f, "%.1f sn" % (time.time() - t0), flush=True)
