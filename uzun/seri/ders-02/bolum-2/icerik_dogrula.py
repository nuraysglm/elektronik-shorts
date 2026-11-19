"""Ders 2 - Bölüm 2 içerik paketi: sayısal doğrulama (İçerik Ajanı, 19.11.2026)."""
import math
def yakin(a, b, tol=1e-9): return math.isclose(a, b, rel_tol=tol, abs_tol=1e-12)
print("Örnek 1: akım kontrollü gerilim kaynağı (CCVS)")
Vs, R1 = 3.0, 600.0
ix = Vs / R1; assert yakin(ix, 5e-3); print(f"  ix = 3 / 600 = {ix*1e3:.1f} mA")
rm = 400.0                       # ohm (V/A)
vb = rm * ix; assert yakin(vb, 2.0); print(f"  vb = 400 x 5 mA = {vb:.1f} V")
RL = 1000.0
iy = vb / RL; assert yakin(iy, 2e-3); print(f"  iy = 2 / 1000 = {iy*1e3:.1f} mA")
# kontrol tarafı: ideal CCVS kontrol kolunda gerilim düşümü yok, ix değişmez
print("Örnek 2: kontrol gerilimi açık anahtarın uçlarından, negatif katsayılı VCVS")
V1, R2 = 1.5, 3000.0
# açık anahtar: i = 0, direnç uçlarında 0 V, kaynağın 1,5 V'u anahtar uçlarında
i_ac = 0.0; vR = R2 * i_ac; vx_ac = V1 - vR
assert vR == 0 and yakin(vx_ac, 1.5)
k = -4.0; Ry = 2000.0
vb_ac = k * vx_ac; iy_ac = vb_ac / Ry
assert yakin(vb_ac, -6.0) and yakin(iy_ac, -3e-3)
print(f"  açık: i = 0, vR = 3000 x 0 = 0 V, vx = 1,5 V; vb = -4 x 1,5 = {vb_ac:.1f} V; i = -6 / 2000 = {iy_ac*1e3:.1f} mA")
# kapalı anahtar: vx = 0 (kısa devre), kontrol kolunda 1,5 / 3000 = 0,5 mA
vx_kp = 0.0; i_kp = V1 / R2; vb_kp = k * vx_kp
assert yakin(i_kp, 0.5e-3) and vb_kp == 0
print(f"  kapalı: vx = 0, kontrol kolu akımı = 1,5 / 3000 = {i_kp*1e3:.1f} mA; vb = -4 x 0 = 0 V, yük akımı 0")
# yanlış sonuç (hata kartı): vx = 0 sanmak -> vb = 0
print("Uygulama 1: LM358 açık çevrim kazancı (VCVS modeli, A = vçıkış / vfark)")
A_typ, A_min = 100e3, 25e3        # 100 V/mV, 25 V/mV
for A in (A_typ, A_min):
    vd = 10.0 / A; print(f"  vçıkış = 10 V için vfark = 10 / {A:.0f} = {vd*1e3:.1f} mV")
assert yakin(10/A_typ, 0.1e-3) and yakin(10/A_min, 0.4e-3)
v_model = A_typ * 1e-3; assert yakin(v_model, 100.0)
print(f"  vfark = 1 mV ise model: 100000 x 1 mV = {v_model:.0f} V (15 V beslemede imkânsız: doyma)")
assert A_typ / A_min == 4
print("Uygulama 2 / mini tasarım: INA180A2, G = 50, VS = 3,3 V, Imax = 2 A")
G, VS, Imax = 50.0, 3.3, 2.0
VSP_max = VS - 0.03; assert yakin(VSP_max, 3.27)
# yanlış seçim
Rw = 0.050
vs_w = Imax * Rw; vo_w = G * vs_w
assert yakin(vs_w, 0.1) and yakin(vo_w, 5.0)
I_doy = VSP_max / (G * Rw); assert yakin(I_doy, 1.308)
I_dogru = (VS-0.5)/(G*Rw); assert yakin(I_dogru, 1.12)
print(f"  50 mOhm: garanti aralığı 2,8 / 2,5 = {I_dogru:.2f} A'de biter")
print(f"  50 mOhm: vşönt = 2 x 0,05 = {vs_w:.2f} V, model vçıkış = 50 x 0,1 = {vo_w:.1f} V > {VSP_max:.2f} V; doyma akımı = 3,27 / (50 x 0,05) = {I_doy:.3f} A")
# doğru seçim: kazanç hatası garantisi 0,5 V ... VS-0,5 V aralığında
V_ust = VS - 0.5; assert yakin(V_ust, 2.8)
Rmax_doyma = VSP_max / (G * Imax); assert yakin(Rmax_doyma, 0.0327)
Rmax_hassas = V_ust / (G * Imax); assert yakin(Rmax_hassas, 0.028)
R = 0.025
vo_max = G * Imax * R; assert yakin(vo_max, 2.5) and vo_max <= V_ust
duy = G * R; assert yakin(duy, 1.25)
I_oku = 1.0 / duy; assert yakin(I_oku, 0.8)
dusum = Imax * R; assert yakin(dusum, 0.05)
I_alt = 0.5 / duy; assert yakin(I_alt, 0.4)
print(f"  Rmax (doyma) = 3,27 / (50 x 2) = {Rmax_doyma*1e3:.1f} mOhm; Rmax (garanti aralığı) = 2,8 / (50 x 2) = {Rmax_hassas*1e3:.0f} mOhm; seçim 25 mOhm")
print(f"  vçıkış(2 A) = 50 x 2 x 0,025 = {vo_max:.1f} V; duyarlılık = 50 x 0,025 = {duy:.2f} V/A; 1,0 V okuma -> 1,0 / 1,25 = {I_oku:.1f} A")
print(f"  şönt düşümü (2 A) = 2 x 0,025 = {dusum*1e3:.0f} mV; 0,5 V alt sınırı = 0,5 / 1,25 = {I_alt:.1f} A")
# kazanç hatası ±%1
hata = 0.01 * 0.8; assert yakin(hata, 0.008); print(f"  ±%1 kazanç hatası 0,8 A okumada ±{hata*1e3:.0f} mA")
# kontrol girişi akımı (INA180 IB tipik 0,1 µA, VIN+ = 0 V) — 2 A yanında oran
oran = 0.1e-6 / Imax; assert yakin(oran, 5e-8); print(f"  0,1 µA / 2 A = {oran:.0e}")
# eşdeğer: yük akımından çıkışa bakınca CCVS, rm = R x G
rm_es = R * G; assert yakin(rm_es, 1.25); print(f"  Bütün devre bir CCVS gibi: rm = 0,025 x 50 = {rm_es:.2f} Ohm")
print("Yorum sorusu: VCVS k = 20, yük 2 kOhm, yük akımı 1,5 mA; besleme 5 V")
vq = 1.5e-3 * 2000; vxq = vq / 20
assert yakin(vq, 3.0) and yakin(vxq, 0.15)
vq2 = 20 * 0.3; assert yakin(vq2, 6.0) and vq2 > 5.0
print(f"  v = 1,5 mA x 2000 = {vq:.1f} V; vx = 3 / 20 = {vxq:.2f} V; vx = 0,3 V ise model 20 x 0,3 = 6 V > 5 V: model geçersiz")
print("TÜM KONTROLLER GEÇTİ")
