"""Ders 3 - Bölüm 2 içerik paketi: sayısal doğrulama (İçerik Ajanı, kredi sprinti, 21.11.2026).
Her sayı icerik.md'deki adımlarla aynı sırada hesaplanır; assert'ler ara adımları da denetler.
Sabitler: bakır özdirenci 1,7241e-8 Ω·m ve sıcaklık katsayısı 0,00393 1/°C (20 °C; NBS Handbook 100,
1966, s. 2–3, IEC 60028 standart tavlanmış bakır); 1 oz bakır kalınlığı 34,8 µm (TI SBOA533A, bölüm 3.1)."""
import math

def yakin(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))

def r3(x):  # 3 anlamlı basamak
    return float(f"{x:.3g}")

RHO = 1.7241e-8      # Ω·m, 20 °C
ALFA = 0.00393       # 1/°C, 20 °C
T_1OZ = 34.8e-6      # m

print("== Örnek 1: Ohm yasası, aynı noktaya iki yoldan ==")
R = 2.2e3; I = 3e-3
V = R * I
print(f"  akım kaynağıyla: v = R × i = 2,2 kΩ × 3 mA = {V:g} V")
assert yakin(V, 6.6)
print(f"  gerilim kaynağıyla: i = v / R = 6,6 V / 2,2 kΩ = {6.6/2.2e3*1e3:g} mA")
assert yakin(6.6 / 2.2e3, 3e-3)

print("== Örnek 2: R = ρ × L / A, 0,5 mm çaplı 10 m bakır tel ==")
d = 0.5e-3; L = 10.0
r = d / 2
A = math.pi * r**2
print(f"  r = 0,25 mm = 0,25e-3 m; A = π × r² = π × (0,25e-3)² = {A:.4e} m² (= {A*1e6:.4f} mm²)")
assert round(A * 1e6, 4) == 0.1963
R0 = RHO * L / A
print(f"  R = 1,7241e-8 × 10 / {A:.4e} = {R0:.4f} Ω")
assert round(R0, 3) == 0.878
R_2L = RHO * 2 * L / A
R_2A = RHO * L / (2 * A)
R_2d = RHO * L / (math.pi * (d) ** 2)  # çap iki katı → yarıçap 0,5 mm
print(f"  L iki katı (20 m): {R_2L:.3f} Ω; A iki katı: {R_2A:.3f} Ω; çap iki katı (1 mm): {R_2d:.4f} Ω (= R/4)")
assert round(R_2L, 3) == 1.756 and round(R_2A, 3) == 0.439 and round(R_2d, 4) == 0.2195
assert yakin(R_2A, R0 / 2) and yakin(R_2d, R0 / 4)
# iki eşit paralel = R/2: kesit A + A, aynı L → R/2
assert yakin(RHO * L / (A + A), R0 / 2)
# birim kontrolü: mm² cinsinden ρ = 0,017241 Ω·mm²/m
assert yakin(0.017241 * L / (A * 1e6), R0, 1e-6)

print("== Örnek 3: 2 kΩ'luk direncin iki grafiği ==")
R = 2e3
for i_mA in (-2, 0, 1, 3):
    v = R * i_mA * 1e-3
    print(f"  i = {i_mA} mA → v = 2 kΩ × {i_mA} mA = {v:g} V")
tablo = {-2: -4.0, 0: 0.0, 1: 2.0, 3: 6.0}
for i_mA, beklenen in tablo.items():
    assert yakin(R * i_mA * 1e-3, beklenen)
egim_vi = (6.0 - 2.0) / ((3 - 1) * 1e-3)
print(f"  v–i eğimi (yatay i, düşey v): (6 − 2) V / (3 − 1) mA = {egim_vi:g} Ω = 2 V/mA")
assert yakin(egim_vi, 2000.0)
egim_iv = ((3 - 1) * 1e-3) / (6.0 - 2.0)
print(f"  i–v eğimi (yatay v, düşey i): (3 − 1) mA / (6 − 2) V = {egim_iv*1e3:g} mA/V = 1 / 2 kΩ = {egim_iv*1e3:g} mS")
assert yakin(egim_iv, 1 / 2000.0) and yakin(egim_iv * 1e3, 0.5)
print("  kaynaklar (aynı yatay i / düşey v eksenleri): 5 V gerilim kaynağı → v = 5 V yatay doğru; "
      "1,5 mA akım kaynağı → i = 1,5 mA dikey doğru; ikisi de (0, 0)'dan geçmez")

print("== En sık yapılan hata kartı: 'gerilim iki katı → direnç iki katı' ==")
for v in (2.0, 4.0):
    i = v / R
    print(f"  v = {v:g} V → i = {v:g} / 2 kΩ = {i*1e3:g} mA; v / i = {v/i:g} Ω")
    assert yakin(v / i, 2000.0)
assert yakin(4.0 / R, 2e-3)

print("== Uygulamada: kare sayma (TI SSZTAT5) ile tutarlılık ==")
R_kare = RHO / T_1OZ
print(f"  bir kare (1 oz): ρ / t = 1,7241e-8 / 34,8e-6 = {R_kare*1e3:.3f} mΩ; 10 kare = {10*R_kare*1e3:.2f} mΩ (TI: ~5 mΩ)")
assert round(R_kare * 1e3, 3) == 0.495 and abs(10 * R_kare - 5e-3) < 0.1e-3

print("== Uygulamada A: 2 A taşıyan 60 mm'lik iz, en çok 50 mV düşüm ==")
I = 2.0; Lz = 60e-3; dV = 50e-3
Rmax = dV / I
print(f"  R_en çok = 50 mV / 2 A = {Rmax*1e3:g} mΩ")
assert yakin(Rmax, 25e-3)
w_min = RHO * Lz / (T_1OZ * Rmax)
print(f"  w = ρ × L / (t × R) = 1,7241e-8 × 0,06 / (34,8e-6 × 0,025) = {w_min*1e3:.3f} mm → 1,2 mm")
assert round(w_min * 1e3, 2) == 1.19
def R_iz(w, T=20.0, t=T_1OZ):
    return RHO * (1 + ALFA * (T - 20.0)) * Lz / (w * t)
R12 = R_iz(1.2e-3)
print(f"  1,2 mm, 20 °C: R = 1,7241e-8 × 0,06 / (1,2e-3 × 34,8e-6) = {R12*1e3:.2f} mΩ → düşüm {R12*I*1e3:.1f} mV")
assert round(R12 * 1e3, 2) == 24.77 and round(R12 * I * 1e3, 1) == 49.5
k70 = 1 + ALFA * (70 - 20)
print(f"  70 °C çarpanı: 1 + 0,00393 × 50 = {k70:.4f}")
assert round(k70, 4) == 1.1965
R12_70 = R12 * k70
print(f"  1,2 mm, 70 °C: {R12*1e3:.2f} × {k70:.4f} = {R12_70*1e3:.2f} mΩ → {R12_70*I*1e3:.1f} mV (> 50 mV)")
assert round(R12_70 * 1e3, 2) == 29.64 and R12_70 * I > dV
R15 = R_iz(1.5e-3); R15_70 = R15 * k70
print(f"  1,5 mm: 20 °C {R15*1e3:.2f} mΩ ({R15*I*1e3:.1f} mV); 70 °C {R15_70*1e3:.2f} mΩ ({R15_70*I*1e3:.1f} mV ≤ 50)")
assert round(R15 * 1e3, 2) == 19.82 and round(R15_70 * 1e3, 2) == 23.71 and R15_70 * I <= dV
assert round(R15 * I * 1e3, 1) == 39.6 and round(R15_70 * I * 1e3, 1) == 47.4
# 70 °C'ta 50 mV için gereken en küçük genişlik
w70 = w_min * k70
print(f"  70 °C için en küçük genişlik: {w_min*1e3:.3f} × {k70:.4f} = {w70*1e3:.3f} mm")
assert round(w70 * 1e3, 2) == 1.42
# iki katmanda paralel (üst + alt, uçlarda vialarla): R/2
print(f"  1,2 mm iki katmanda paralel, 70 °C: {R12_70*1e3:.2f} / 2 = {R12_70/2*1e3:.2f} mΩ → {R12_70/2*I*1e3:.1f} mV")
assert round(R12_70 / 2 * 1e3, 2) == 14.82 and round(R12_70 / 2 * I * 1e3, 1) == 29.6
# kalınlık belirsizliği: TI ölçümünde iz neredeyse iki kat kalın (63,5 µm)
R12_kalin = R_iz(1.2e-3, t=63.5e-6)
print(f"  iz 63,5 µm çıkarsa (TI ölçümü): {R12_kalin*1e3:.2f} mΩ (hesabın {R12_kalin/R12*100:.0f} %'si)")
assert round(R12_kalin * 1e3, 2) == 13.58

print("== 5c pahalı hata: 0,25 mm'lik iz, 2 A, 60 mm ==")
R025 = R_iz(0.25e-3)
print(f"  R = 1,7241e-8 × 0,06 / (0,25e-3 × 34,8e-6) = {R025:.4f} Ω; düşüm {R025*2:.3f} V; yük 5 − {R025*2:.2f} = {5-R025*2:.2f} V")
assert round(R025, 3) == 0.119 and round(R025 * 2, 2) == 0.24 and round(5 - R025 * 2, 2) == 4.76

print("== 5b: ppm ve oranlar ==")
assert yakin(ALFA * 1e6, 3930) and yakin(ALFA * 100, 0.393) and yakin(3930 / 100, 39.3)
assert yakin(0.010 * 2, 0.020)  # WSL 10 mΩ × 2 A = 20 mV
print("  3930 ppm/K, %0,39 / °C, 3930 / 100 = 39,3 kat; WSL 10 mΩ × 2 A = 20 mV")

print("== Uygulamada B: CRCW0603 1 kΩ, ±%1, ±100 ppm/K; 20 → 85 °C ==")
dT = 85 - 20
dR_T = 100e-6 * dT
print(f"  sıcaklık değişimi: 100e-6 × {dT} = {dR_T:.4f} → %{dR_T*100:.2f}")
assert yakin(dR_T, 0.0065)
en_cok = 1000 * 1.01 * (1 + dR_T); en_az = 1000 * 0.99 * (1 - dR_T)
print(f"  en kötü: 1000 × 1,01 × 1,0065 = {en_cok:.2f} Ω; 1000 × 0,99 × 0,9935 = {en_az:.2f} Ω")
assert round(en_cok, 2) == 1016.56 and round(en_az, 2) == 983.57
# ±%5, ±200 ppm/K sınıfı
dR5 = 200e-6 * dT
print(f"  ±%5 sınıfı: 200e-6 × {dT} = %{dR5*100:.1f}; en kötü 1000 × 1,05 × {1+dR5:.3f} = {1000*1.05*(1+dR5):.2f} Ω")
assert yakin(dR5, 0.013) and abs(1000 * 1.05 * (1 + dR5) - 1063.65) < 1e-6  # ≈ 1063,7
# bakır ile karşılaştırma: 3930 ppm/K
print(f"  bakır: 0,00393 = {ALFA*1e6:.0f} ppm/K → aynı 65 °C'ta %{ALFA*dT*100:.1f}")
assert round(ALFA * dT * 100, 1) == 25.5

print("== Yorum sorusu: iki güç izi (boy, genişlik, iki yüz paralel, sıcaklık), iki grafik ==")
k = 1 + ALFA * (70 - 20)
tek_yuz = (45 / 60) * (1.2 / 0.8) * k
oran = tek_yuz / 2
print(f"  sıcaklık çarpanı {k:.4f}; tek yüz oranı 0,75 × 1,5 × {k:.4f} = {tek_yuz:.4f}; iki yüz: /2 = {oran:.4f}")
assert round(tek_yuz, 4) == 1.3461 and round(oran, 4) == 0.6730
R1 = R_iz(1.2e-3)
R2 = RHO * k * 0.045 / (0.8e-3 * T_1OZ) / 2
print(f"  R1 = {R1*1e3:.2f} mΩ; R2 = {R2*1e3:.2f} mΩ; R2/R1 = {R2/R1:.4f}; 1/oran = {R1/R2:.3f}")
assert round(R2 * 1e3, 2) == 16.67 and yakin(R2 / R1, oran) and round(R1 / R2, 3) == 1.486
assert round(tek_yuz * 2, 2) == 2.69        # tuzak: iki yüzü seri sanmak
assert round(0.75 * 1.5 / 2, 4) == 0.5625   # tuzak: sıcaklığı unutmak

print("TÜM KONTROLLER GEÇTİ")
