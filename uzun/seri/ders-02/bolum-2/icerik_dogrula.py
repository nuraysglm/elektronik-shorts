# Ders 2 - Bölüm 2 içerik paketi: bütün sayıların doğrulaması (İçerik Ajanı, 21.11.2026)
from math import isclose
def ok(a, b, tol=1e-9, ad=""):
    assert isclose(a, b, rel_tol=tol, abs_tol=1e-12), f"{ad}: {a} != {b}"
    print(f"  TAMAM  {ad}: {a:.6g}")

print("Örnek 1 — akımla kontrol edilen gerilim kaynağı")
ix = 5 / 1000;                ok(ix, 0.005, ad="i_x = 5 V / 1 kΩ (A)")
vb = 360 * ix;                ok(vb, 1.8, ad="v_b = 360 Ω × 5 mA (V)")
iy = vb / 900;                ok(iy, 0.002, ad="i_y = 1,8 V / 900 Ω (A)")

print("Örnek 2 — gerilimle kontrol edilen, k = −4, kontrol gerilimi anahtarın uçlarında")
# anahtar açık
i_sol = 0.0
v_R = 3000 * i_sol;           ok(v_R, 0.0, ad="açık: direnç gerilimi 3 kΩ × 0")
vx = 3 - v_R;                 ok(vx, 3.0, ad="açık: v_x (V)")
vb = -4 * vx;                 ok(vb, -12.0, ad="açık: v_b = −4 × 3 (V)")
iy = vb / 2000;               ok(iy, -0.006, ad="açık: yük akımı −12 / 2 kΩ (A)")
# anahtar kapalı
i_sol = 3 / 3000;             ok(i_sol, 0.001, ad="kapalı: sol akım 3 V / 3 kΩ (A)")
vx = 0.0; vb = -4 * vx;       ok(vb, 0.0, ad="kapalı: v_b = −4 × 0 (V)")

print("Kuvvetlendirici fikri")
ok(50 * 0.020, 1.0, ad="20 mV × 50 = 1 V")

print("LM358 (SLOS068AB, 5.7)")
A_typ = 100 * 1000; A_min = 25 * 1000
ok(A_typ, 1e5, ad="100 V/mV = 100 000 V/V")
ok(10 / A_typ * 1000, 0.1, ad="10 V / 100 000 (mV)")
ok(10 / A_min * 1000, 0.4, ad="10 V / 25 000 (mV)")
ok(A_typ / A_min, 4.0, ad="tipik / en az kazanç oranı")
ok(A_typ * 1e-3, 100.0, ad="1 mV × 100 000 (V) — modelin söylediği")
ok(A_typ * 3e-3, 300.0, ad="paket içi: 3 mV tipik ofset × 100 000 (V)")
ok(0.003 / 0.0001, 30.0, ad="paket içi: 3 mV ofset / 0,1 mV = 30 kat")

print("INA180A2 mini tasarım (SBOS741H): V_S = 3,3 V, G = 50, 0 … 2 A")
VS, G, Imax = 3.3, 50, 2.0
# (a) 50 mΩ
vs_a = Imax * 0.05;           ok(vs_a, 0.1, ad="(a) şönt gerilimi 2 A × 0,05 Ω (V)")
vo_a = G * vs_a;              ok(vo_a, 5.0, ad="(a) model çıkışı 50 × 0,1 (V)")
v_sp = VS - 0.03;             ok(v_sp, 3.27, ad="(a) en kötü çıkış tavanı 3,3 − 0,03 (V)")
assert vo_a > VS
i_tak = v_sp / (G * 0.05);    ok(i_tak, 1.308, ad="(a) takılma akımı 3,27 / 2,5 (A)")
i_dog = (VS - 0.5) / (G * 0.05); ok(i_dog, 1.12, ad="(a) doğruluk sınırı 2,8 / 2,5 (A)")
# (b)
v_ust = VS - 0.5;             ok(v_ust, 2.8, ad="(b) doğruluk üst sınırı 3,3 − 0,5 (V)")
R_max = v_ust / (G * Imax);   ok(R_max, 0.028, ad="(b) R ≤ 2,8 / 100 (Ω)")
R = 0.025; assert R <= R_max
vo_b = G * R * Imax;          ok(vo_b, 2.5, ad="(b) 50 × 0,025 × 2 (V)")
assert 0.5 <= vo_b <= v_ust
egim = G * R;                 ok(egim, 1.25, ad="(b) V/A eğimi 50 × 0,025")
ok(1.0 / egim, 0.8, ad="(b) 1,0 V okuma → akım (A)")
ok(Imax * R, 0.05, ad="(b) şönt düşümü 2 A × 0,025 Ω (V)")
# paket içi
ok(0.5 / egim, 0.4, ad="(b) alt doğruluk sınırı 0,5 / 1,25 (A)")
ok(0.8 * 0.01, 0.008, ad="paket içi: ±%1 → 0,8 A'de ±8 mA")
ok(Imax**2 * R, 0.1, ad="paket içi: şönt gücü 2² × 0,025 (W)")
ok(0.1e-6 / 2.0, 5e-8, ad="paket içi: 0,1 µA / 2 A")
# kazanç hatası ile okuma aralığı (1,0 V)
lo, hi = 1.0 / (50.5 * R), 1.0 / (49.5 * R)
ok(lo, 0.79208, tol=1e-4, ad="paket içi: G = 50,5 → 0,792 A"); ok(hi, 0.80808, tol=1e-4, ad="paket içi: G = 49,5 → 0,808 A")

print("Yorum sorusu (zincir)")
ix = 4 / 1600;                ok(ix, 0.0025, ad="i_x = 4 V / 1,6 kΩ (A)")
v1 = 320 * ix;                ok(v1, 0.8, ad="v_1 = 320 Ω × 2,5 mA (V)")
vy = v1;                      ok(vy, 0.8, ad="v_y (2 kΩ doğrudan kaynağın uçlarında) (V)")
ok(vy / 2000, 0.0004, ad="çeldirici: 2 kΩ akımı (A) — cevabı etkilemez")
# (a) k = 4,5: gerilim sınırı tutar, akım sınırı (3 mA) tutmaz
k = 4.5; v2 = -k * vy;        ok(v2, -3.6, ad="(a) v_2 = −4,5 × 0,8 (V)")
assert -5 <= v2 <= 5
i_yuk = v2 / 1000;            ok(i_yuk, -0.0036, ad="(a) model yük akımı −3,6 / 1 kΩ (A)")
assert abs(i_yuk) > 0.003     # 3 mA sınırı aşıldı → model geçersiz
# (b) iki sınır
k_v = 5 / vy;                 ok(k_v, 6.25, ad="(b) gerilim sınırı: k ≤ 5 / 0,8")
k_i = 0.003 * 1000 / vy;      ok(k_i, 3.75, ad="(b) akım sınırı: k ≤ 3 V / 0,8 V")
k_max = min(k_v, k_i);        ok(k_max, 3.75, ad="(b) k en çok (önce akım sınırı)")
ok(-k_max * vy, -3.0, ad="(b) kontrol: k = 3,75 → −3 V, 3 mA")
# yanlış yollar
ok((VS - 0.02) / 2.5, 1.312, ad="paket içi: tipik takılma 3,28 / 2,5 (A)")
ok(320 * 2.5, 800, ad="yanlış: birim karışıklığı 320 × 2,5 = 800 'V'")
print("TÜM KONTROLLER GEÇTİ")
