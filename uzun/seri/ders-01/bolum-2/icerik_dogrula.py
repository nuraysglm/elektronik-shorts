# -*- coding: utf-8 -*-
"""Devre Teorisi I, Ders 1 - Bölüm 2: içerik paketi sayısal doğrulaması.
İçerik Ajanı, 19.11.2026. Çalıştır: python3 icerik_dogrula.py
Her sonuç assert ile kontrol edilir; ayrıca bağımsız yöntemle (sayısal integral) sınanır.
"""
from math import isclose

def yaz(s):
    print(s)

# ---------------------------------------------------------------
# A. Uygulamada: datasheet değerleri (yalnızca oranlar ve karşılaştırmalar)
# ---------------------------------------------------------------
# 1N4007 (Vishay, doc 88503, rev 29-Apr-2020, s.1)
IF_AV = 1.0      # A, ortalama doğrultulmuş ileri akım (0,375" bacak, TA = 75 °C)
IFSM = 30.0      # A, 8,3 ms tek yarım sinüs, tekrarsız
oran_diyot = IFSM / IF_AV
assert isclose(oran_diyot, 30.0)
yaz(f"1N4007: IFSM / IF(AV) = {IFSM} A / {IF_AV} A = {oran_diyot:.0f}")

# 2N7002E (onsemi, 2N7002E/D Rev. 8, Ekim 2023, s.1)
ID_25 = 0.260    # A, sürekli, kararlı durum, TA = 25 °C (FR4, 1 in² bakır)
ID_85 = 0.190    # A, sürekli, TA = 85 °C
IDM = 1.2        # A, darbeli, tp = 10 µs
oran_mos = IDM / ID_25
assert isclose(oran_mos, 1.2 / 0.26)
yaz(f"2N7002E: IDM / ID = {IDM} A / {ID_25} A = {oran_mos:.2f} (yaklaşık 4,6)")
yaz(f"2N7002E: 85 °C'de sürekli akım {ID_85*1e3:.0f} mA, 25 °C'ye göre %{(1-ID_85/ID_25)*100:.0f} daha az")
assert round((1 - ID_85 / ID_25) * 100) == 27

# TLHR540x (Vishay, doc 83012, Rev. 2.7, 25-Jan-2024, s.2)
IF_LED = 0.030   # A, DC, Tamb <= 65 °C
IFSM_LED = 1.0   # A, tp <= 10 µs
oran_led = IFSM_LED / IF_LED
yaz(f"TLHR540x: IFSM / IF = {IFSM_LED} A / {IF_LED} A = {oran_led:.1f} (yaklaşık 33)")
assert isclose(oran_led, 1 / 0.03)

# ---------------------------------------------------------------
# B. Sayısal örnek 1: mAh bir yük birimidir
# ---------------------------------------------------------------
# 1 mAh = 1 mA × 1 h = 1e-3 A × 3600 s = 3,6 C
mAh_C = 1e-3 * 3600
assert isclose(mAh_C, 3.6)
Kap_mAh = 225.0                       # Panasonic CR2032 nominal kapasite
Kap_C = Kap_mAh * mAh_C               # 225 × 3,6 = 810 C
assert isclose(Kap_C, 810.0)
yaz(f"1 mAh = 1 mA × 3600 s = {mAh_C} C;  225 mAh = 225 × 3,6 = {Kap_C:.0f} C")

# ---------------------------------------------------------------
# C. Mini tasarım (sayısal örnek 2): CR2032 ile sensör düğümü
# ---------------------------------------------------------------
T = 1.0          # s, periyot
t_on = 2e-3      # s, aktif süre
I_on = 10e-3     # A, aktif akım
I_uyku = 5e-6    # A, uyku akımı (varsayım: tasarım hedefi)
t_off = T - t_on # 0,998 s

q_on = I_on * t_on              # 10 mA × 2 ms = 20 µC
q_off = I_uyku * t_off          # 5 µA × 0,998 s = 4,99 µC
q_T = q_on + q_off              # 24,99 µC
I_ort = q_T / T                 # 24,99 µA
assert isclose(q_on, 20e-6)
assert isclose(q_off, 4.99e-6)
assert isclose(q_T, 24.99e-6)
assert isclose(I_ort, 24.99e-6)
yaz(f"q_aktif = 10 mA × 2 ms = {q_on*1e6:.2f} µC")
yaz(f"q_uyku  = 5 µA × 998 ms = {q_off*1e6:.2f} µC")
yaz(f"q(1 s)  = {q_on*1e6:.2f} + {q_off*1e6:.2f} = {q_T*1e6:.2f} µC  ->  ortalama akım = {I_ort*1e6:.2f} µA (yaklaşık 25 µA)")

# Bağımsız kontrol: akım dalga biçimini sayısal olarak integralle
N = 1_000_000
dt = T / N
q_say = 0.0
for k in range(N):
    t = (k + 0.5) * dt
    q_say += (I_on if t < t_on else I_uyku) * dt
assert isclose(q_say, q_T, rel_tol=1e-6)
yaz(f"  sayısal integral: {q_say*1e6:.4f} µC (aynı)")

# Ömür (yuvarlanmış 25 µA ile sesli anlatım; tam değerle de)
I_ort_yuv = 25e-6
omur_h = (Kap_mAh * 1e-3) / I_ort_yuv          # 0,225 Ah / 25e-6 A = 9000 h
omur_gun = omur_h / 24                          # 375 gün
assert isclose(omur_h, 9000.0)
assert isclose(omur_gun, 375.0)
omur_tam_h = (Kap_mAh * 1e-3) / I_ort
yaz(f"ömür = 225 mAh / 25 µA = 225 mAh / 0,025 mA = {omur_h:.0f} saat = {omur_h:.0f} / 24 = {omur_gun:.0f} gün (yaklaşık 1 yıl)")
yaz(f"  (tam değerle 24,99 µA: {omur_tam_h:.0f} saat = {omur_tam_h/24:.1f} gün)")
# Coulomb ile aynı sonuç
omur_s = Kap_C / I_ort_yuv                      # 810 C / 25e-6 A
assert isclose(omur_s / 3600, 9000.0)
yaz(f"  kulonla: 810 C / 25 µA = {omur_s:.3g} s = {omur_s/3600:.0f} saat (aynı)")

# Yanlış hesap: tepe akımla ömür
omur_yanlis_h = (Kap_mAh * 1e-3) / I_on        # 225 mAh / 10 mA = 22,5 h
assert isclose(omur_yanlis_h, 22.5)
yaz(f"YANLIŞ (tepe akımla): 225 mAh / 10 mA = {omur_yanlis_h} saat (bir günden az); doğru sonucun {omur_h/omur_yanlis_h:.0f}'de biri")
assert isclose(omur_h / omur_yanlis_h, 400.0)

# Uyku akımının payı
pay_uyku = q_off / q_T
yaz(f"uyku akımının ortalamadaki payı: {q_off*1e6:.2f} / {q_T*1e6:.2f} = %{pay_uyku*100:.0f}")
assert round(pay_uyku * 100) == 20
# Uyku akımı 5 µA yerine 50 µA olsaydı
q_off50 = 50e-6 * t_off
I_ort50 = (q_on + q_off50) / T
omur50_gun = (Kap_mAh * 1e-3) / I_ort50 / 24
yaz(f"uyku 50 µA olsaydı: ortalama = 20 + {q_off50*1e6:.1f} = {I_ort50*1e6:.1f} µA, ömür ≈ {omur50_gun:.0f} gün")
assert isclose(I_ort50, 69.9e-6)
assert round(omur50_gun) == 134

# Kontroller: ortalama < 0,2 mA (Panasonic 'continuous drain'), tepe anında gerilim düşümü
assert I_ort < 0.2e-3
R_ic = 10.0                                     # Ω, Energizer el kitabı: yeni 2032 için ~10 Ω
dV = I_on * R_ic                                # 10 mA × 10 Ω = 0,1 V
assert isclose(dV, 0.1)
yaz(f"tepe anında iç direnç düşümü: 10 mA × 10 Ω = {dV:.1f} V -> 3,0 V pil yaklaşık 2,9 V'a iner (yeni pil)")

# ---------------------------------------------------------------
# D. Sayısal örnek 3: buton + çekme (pull-up) direnci — açık devre uygulaması
# ---------------------------------------------------------------
Vcc = 3.3
R_pu = 10e3
# buton açık: ideal giriş, akım 0 -> direnç gerilimi 0 -> giriş = Vcc
i_acik = 0.0
v_R_acik = R_pu * i_acik
v_giris_acik = Vcc - v_R_acik
assert v_giris_acik == Vcc
# buton kapalı: giriş toprağa bağlı
i_kapali = Vcc / R_pu                           # 3,3 V / 10 kΩ = 0,33 mA
assert isclose(i_kapali, 0.33e-3)
yaz(f"buton açık: i = 0, direnç gerilimi = 10 kΩ × 0 = 0 V, giriş = {v_giris_acik} V; butonun uçları arasında {v_giris_acik} V")
yaz(f"buton kapalı: i = 3,3 V / 10 kΩ = {i_kapali*1e3:.2f} mA, giriş = 0 V")
# gerçek giriş sızıntısı 1 µA olsaydı (örnek değer) düşüm
v_sizinti = R_pu * 1e-6
yaz(f"  (giriş 1 µA sızdırsaydı: 10 kΩ × 1 µA = {v_sizinti*1e3:.0f} mV düşüm, giriş {Vcc-v_sizinti:.2f} V)")
assert isclose(v_sizinti, 0.01)

# Asıl yorum sorusu (metin.md parça 7): 5 mA 2 s, sonra -3 mA 1 s -> net yük
q_soru = 5e-3 * 2 + (-3e-3) * 1                 # 10 mC - 3 mC = 7 mC
assert isclose(q_soru, 7e-3)
yaz(f"yorum sorusu: 5 mA × 2 s + (−3 mA) × 1 s = 10 − 3 = {q_soru*1e3:.0f} mC")

# Denetçi örneği (yalnızca Uzun Video Ajanı'na bilgi): %50 doluluk, 360 mA darbe
from math import sqrt
i_ort_pwm = 0.5 * 0.360; i_rms_pwm = sqrt(0.5) * 0.360
assert isclose(i_ort_pwm, 0.180) and i_ort_pwm < ID_85 < i_rms_pwm
yaz(f"PWM örneği: ortalama {i_ort_pwm*1e3:.0f} mA < 190 mA ama etkin değer {i_rms_pwm*1e3:.0f} mA > 190 mA")

# Alternatif yorum sorusu: LED her 1 s'de 4 ms, 20 mA
q_led = 20e-3 * 4e-3                            # 80 µC
i_led = q_led / 1.0                             # 80 µA
omur_led_h = 0.225 / i_led                      # 2812,5 h
assert isclose(q_led, 80e-6) and isclose(omur_led_h, 2812.5)
assert round(omur_led_h / 24) == 117
assert 20e-3 < IF_LED
yaz(f"alternatif soru: 20 mA × 4 ms = {q_led*1e6:.0f} µC -> {i_led*1e6:.0f} µA; 225 mAh / 0,08 mA = {omur_led_h} h = {omur_led_h/24:.1f} gün")

# 5 µA × 998 ms = 4990 nC
assert isclose(5e-6 * 0.998 / 1e-9, 4990)

print("\nTÜM KONTROLLER GEÇTİ")
