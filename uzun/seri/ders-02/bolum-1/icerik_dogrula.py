# -*- coding: utf-8 -*-
"""Devre Teorisi I, Ders 2 - Bölüm 1: içerik paketi sayısal doğrulaması.
İçerik Ajanı, 19.11.2026. Çalıştır: python3 icerik_dogrula.py
Her sonuç assert ile kontrol edilir; mümkün olan yerde bağımsız yöntemle de sınanır.
"""
from math import isclose

def yaz(s):
    print(s)

# ---------------------------------------------------------------
# Datasheet değerleri (kaynak: icerik.md bölüm 5b / 11)
# ---------------------------------------------------------------
# Energizer E91 (AA alkalin), Form No. E91NA0323, s. 1
V_PIL = 1.5                      # V, anma (nominal) gerilim
R_IC_MIN, R_IC_MAX = 0.150, 0.300  # Ω, "Nominal IR 150-300 mΩ (fresh)"
# Alpha Wire 3071, 22 AWG (7/30) TC, Customer Specification (©2013)
R_TEL_1000FT = 16.2              # Ω / 1000 ft, 20 °C, nominal
FT = 0.3048                      # m
# C&K (Littelfuse) PTS645, "14 Nov 22", s. B-143
I_BUTON_MAX = 0.050              # A, kontak değeri 50 mA @ 12 V DC
V_BUTON_MAX = 12.0               # V DC
R_KONTAK_MAX = 0.100             # Ω, başlangıçta en çok
R_YALITIM_MIN = 1e11             # Ω, en az (PDF metninde "1011" -> 10^11; görsel doğrulama gerekli)

# ---------------------------------------------------------------
# 1) Tel: metre başına direnç ve 20 cm'lik telin direnci
# ---------------------------------------------------------------
r_m = R_TEL_1000FT / (1000 * FT)          # Ω/m
assert isclose(1000 * FT, 304.8)
assert isclose(r_m, 0.053150, rel_tol=1e-4)
R_20cm = r_m * 0.20
assert isclose(R_20cm, 0.010630, rel_tol=1e-3)
yaz(f"Tel: 16,2 Ω / 304,8 m = {r_m:.4f} Ω/m; 20 cm: {r_m:.4f} × 0,20 = {R_20cm*1000:.2f} mΩ")
# 10 mA'de ve 2 A'de tel uçlarındaki gerilim (v = R × i)
v_10mA = R_20cm * 0.010
v_2A = R_20cm * 2.0
assert isclose(v_10mA, 0.0001063, rel_tol=1e-2)   # ≈ 0,11 mV
assert isclose(v_2A, 0.02126, rel_tol=1e-2)       # ≈ 21 mV
yaz(f"  10 mA: {R_20cm*1000:.2f} mΩ × 10 mA = {v_10mA*1000:.3f} mV;  2 A: {v_2A*1000:.1f} mV")
# bağımsız: mΩ × mA = µV
assert isclose(10.63 * 10, 106.3) and isclose(10.63 * 2000 / 1000, 21.26)

# ---------------------------------------------------------------
# 2) Buton (PTS645): kapalıyken ve açıkken
# ---------------------------------------------------------------
v_kapali = R_KONTAK_MAX * I_BUTON_MAX
assert isclose(v_kapali, 0.005)                   # 5 mV, en kötü durum
i_sizinti = V_BUTON_MAX / R_YALITIM_MIN
assert isclose(i_sizinti, 1.2e-10)                # 0,12 nA
yaz(f"Buton kapalı: 0,1 Ω × 50 mA = {v_kapali*1000:.0f} mV; açık: 12 V / 1e11 Ω = {i_sizinti*1e9:.2f} nA")
# 1 A'lik motoru butonla doğrudan anahtarlamak: kaç kat fazla?
kat = 1.0 / I_BUTON_MAX
assert isclose(kat, 20.0)

# ---------------------------------------------------------------
# 3) Pil (E91): iç dirençteki gerilim düşümü (v = R × i)
# ---------------------------------------------------------------
for i_yuk, beklenen_min, beklenen_max in [(0.010, 0.0015, 0.003), (1.0, 0.15, 0.30)]:
    d_min, d_max = R_IC_MIN * i_yuk, R_IC_MAX * i_yuk
    assert isclose(d_min, beklenen_min) and isclose(d_max, beklenen_max)
    yaz(f"Pil {i_yuk*1000:.0f} mA: düşüm {d_min*1000:.1f} ... {d_max*1000:.1f} mV "
        f"(1,5 V'un %{d_min/V_PIL*100:.1f} ... %{d_max/V_PIL*100:.1f}'i)")
assert isclose(0.003 / 1.5 * 100, 0.2)
assert isclose(0.30 / 1.5 * 100, 20.0)

# ---------------------------------------------------------------
# 4) Mini tasarım: tek E91 pil + PTS645 buton + 20 cm tel + yük
# ---------------------------------------------------------------
# (a) 150 Ω'luk yük
R_a = 150.0
i_a = V_PIL / R_a                      # ideal model
assert isclose(i_a, 0.010)
assert i_a <= I_BUTON_MAX              # buton için uygun
dusum_pil_a = R_IC_MAX * i_a           # 3 mV
dusum_buton_a = R_KONTAK_MAX * i_a     # 1 mV
dusum_tel_a = R_20cm * i_a             # ≈ 0,11 mV
assert isclose(dusum_pil_a, 0.003) and isclose(dusum_buton_a, 0.001)
toplam_a = dusum_pil_a + dusum_buton_a + dusum_tel_a
assert toplam_a < 0.0042 and toplam_a > 0.0041
yaz(f"Mini (a) 150 Ω: i = 1,5/150 = {i_a*1000:.0f} mA; pil {dusum_pil_a*1000:.0f} mV, "
    f"buton {dusum_buton_a*1000:.0f} mV, tel {dusum_tel_a*1000:.2f} mV; toplam ≈ {toplam_a*1000:.1f} mV "
    f"= %{toplam_a/V_PIL*100:.2f}")
# Kesin hesap (seri dirençler; Ders 3'te) ideal modelle karşılaştırma
i_a_kesin = V_PIL / (R_a + R_IC_MAX + R_KONTAK_MAX + R_20cm)
hata_a = (i_a - i_a_kesin) / i_a_kesin * 100
assert hata_a < 0.3
yaz(f"  (kesin, yalnızca paket içi) i = {i_a_kesin*1000:.3f} mA, ideal model hatası %{hata_a:.2f}")

# (b) 1,5 Ω'luk yük (ör. küçük motor ya da ısıtıcı)
R_b = 1.5
i_b = V_PIL / R_b
assert isclose(i_b, 1.0)
assert i_b > I_BUTON_MAX and isclose(i_b / I_BUTON_MAX, 20.0)
dusum_pil_b = R_IC_MAX * i_b
assert isclose(dusum_pil_b, 0.30)
assert isclose(dusum_pil_b / V_PIL * 100, 20.0)
yaz(f"Mini (b) 1,5 Ω: ideal i = 1,5/1,5 = {i_b:.1f} A (> 50 mA buton sınırı, 20 kat); "
    f"pil düşümü 0,3 × 1 = {dusum_pil_b:.2f} V = %20")
i_b_kesin = V_PIL / (R_b + R_IC_MAX)   # yalnızca pil iç direnci (buton zaten uygun değil)
assert isclose(i_b_kesin, 1.5 / 1.8)
yaz(f"  (kesin, yalnızca paket içi) i = 1,5/1,8 = {i_b_kesin:.3f} A, uç gerilimi {i_b_kesin*R_b:.2f} V")
assert isclose(i_b_kesin * R_b, 1.25)

# (c) 10 kat kuralı: yük direnci iç direncin en az 10 katı
R_min_10kat = 10 * R_IC_MAX
assert isclose(R_min_10kat, 3.0)
hata_10kat = R_IC_MAX / (R_min_10kat + R_IC_MAX) * 100   # uç geriliminin anma değerden sapması
assert 9.0 < hata_10kat < 9.2
yaz(f"10 kat kuralı: R_yük ≥ 10 × 0,3 = {R_min_10kat:.0f} Ω; bu sınırda sapma %{hata_10kat:.1f} (≈ %10'dan az)")

# ---------------------------------------------------------------
# 5) Sayısal örnek: ideal kaynağın v–i doğrusu ve gerçek pilin doğrusu
# ---------------------------------------------------------------
# Gerçek pil modeli (yalnızca grafik için): v = 1,5 − 0,3 × i
for i, v_bek in [(0.0, 1.5), (0.5, 1.35), (1.0, 1.2)]:
    v = V_PIL - R_IC_MAX * i
    assert isclose(v, v_bek)
yaz("v–i: ideal v = 1,5 V her akımda; gerçek (0,3 Ω): 0 A → 1,5 V, 0,5 A → 1,35 V, 1 A → 1,2 V")

# ---------------------------------------------------------------
# 6) Sayısal örnek: ideal tel ve anahtarın eşdeğerlikleri (özgün devre)
# ---------------------------------------------------------------
# 4,5 V ideal kaynak, 1,5 kΩ direnç, anahtar seri
V_S, R = 4.5, 1500.0
i_kapali = V_S / R
assert isclose(i_kapali, 0.003)               # 3 mA
v_anahtar_kapali = 0.0                        # kapalı anahtar = tel
v_R_kapali = R * i_kapali
assert isclose(v_R_kapali, 4.5)
i_acik = 0.0
v_R_acik = R * i_acik
assert v_R_acik == 0.0
v_anahtar_acik = V_S - v_R_acik               # Ders 1 B2'deki açık devre gerilimi
assert isclose(v_anahtar_acik, 4.5)
yaz("Anahtar örneği: kapalı → i = 4,5 V / 1,5 kΩ = 3 mA, anahtar 0 V; açık → i = 0, direnç 0 V, anahtar 4,5 V")

# Yorum sorusu: 9 V ideal kaynak + 3 Ω / 300 Ω / 30 kΩ: gerilim hep 9 V, akım değişir
for r, i_bek in [(30e3, 0.3e-3), (300.0, 0.03), (3.0, 3.0)]:
    assert isclose(9.0 / r, i_bek)
yaz("Yorum sorusu: 9/30 kΩ = 0,3 mA; 9/300 Ω = 30 mA; 9/3 Ω = 3 A (gerilim hep 9 V)")

# Ek kontroller: 1 m / 5 A tel (yalnızca gidiş), yük / iç direnç oranı
assert isclose(r_m * 1.0 * 5.0, 0.26575, rel_tol=1e-3)   # ≈ 0,27 V
assert isclose(150 / R_IC_MAX, 500.0)
assert isclose(3 + 1 + 0.1063, 4.1063)
# Denetim sonrası ek kontroller
assert isclose(round(toplam_a / V_PIL * 100, 2), 0.27)          # mini (a) %0,27
d_b_kesin = R_IC_MAX * i_b_kesin
assert isclose(d_b_kesin, 0.25) and isclose(d_b_kesin / V_PIL * 100, 16.0 + 2/3)  # %16,7
i_3ohm = V_PIL / 3.0
assert isclose(i_3ohm, 0.5) and isclose(R_IC_MAX * i_3ohm, 0.15)
assert isclose(R_IC_MAX * i_3ohm / V_PIL * 100, 10.0)          # "yaklaşık %10" (ideal akımla tahmin)
assert isclose((V_PIL - R_IC_MAX * 1.0) - (V_PIL - R_IC_MAX * 0.0), -0.3)  # eğim: 1 A başına 0,3 V
# yorum sorusu: düşüm en büyük 3 Ω'da
dusumler = {r: R_IC_MAX * 9.0 / r for r in (30e3, 300.0, 3.0)}
assert max(dusumler, key=dusumler.get) == 3.0
print("TÜM KONTROLLER GEÇTİ")
