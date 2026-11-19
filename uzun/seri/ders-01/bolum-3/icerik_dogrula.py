# -*- coding: utf-8 -*-
"""Devre Teorisi I, Ders 1 - Bölüm 3: içerik paketi sayısal doğrulaması.
İçerik Ajanı, 19.11.2026. Çalıştır: python3 icerik_dogrula.py
Her sonuç assert ile kontrol edilir; mümkün olan yerde bağımsız yöntemle de sınanır.
"""
from math import isclose

def yaz(s):
    print(s)

# ---------------------------------------------------------------
# Datasheet değerleri (kaynak: icerik.md bölüm 5b / 11)
# ---------------------------------------------------------------
# TI TLV755P, SBVS320D (Kasım 2017, rev. Eylül 2024)
VOUT_NOM = 3.3      # V, TLV75533P sabit çıkış
IOUT_MAX = 0.500    # A, önerilen çalışma koşulları, IOUT 0 ... 500 mA
VIN_MAX_ABS = 6.0   # V, mutlak en büyük (IN)
VIN_MIN_ABS = -0.3  # V, mutlak en küçük (IN)
VIN_MAX_ROC = 5.5   # V, önerilen en büyük giriş
VDO_MAX_85 = 0.238  # V, 500 mA, 3.3 V <= VOUT < 5 V, DBV kılıfı, -40...125 °C (85 °C'de 0,215 V)
LOADREG_DBV = 0.060 # V/A, 0,1 mA <= IOUT <= 500 mA, DBV kılıfı (sütun etiketi metinden okunamadı)
ACC = 0.01          # %1 çıkış doğruluğu, -40...85 °C, DBV/DRV
I_SC = 0.355        # A, VOUT = 0 V (kısa devre akımı)
I_CL_MIN = 0.560    # A, akım sınırı en küçük

# onsemi 2N7002E Rev. 8 (Ekim 2023)
VDSS = 60.0; VGS_ABS = 20.0
# Vishay 1N4007 (doc 88503, 29-Apr-2020)
VRRM = 1000.0; VF_MAX = 1.1   # VF: IF = 1,0 A'de en çok

# ---------------------------------------------------------------
# Örnek 1: enerji / yük = gerilim
# ---------------------------------------------------------------
W = 18e-6   # J, b'den a'ya taşımak için harcanan enerji
q = 4e-6    # C
V_ab = W / q
assert isclose(V_ab, 4.5)
yaz(f"Örnek 1: V_ab = W / q = 18 µJ / 4 µC = {V_ab} V")
# birim pozitif yükle aynı: 1 C için enerji 4,5 J
assert isclose(V_ab * 1.0, 4.5)
# işaret: a'dan b'ye taşırken enerji geri alınır, V_ba = -V_ab
V_ba = -W / q
assert isclose(V_ba, -4.5)
yaz(f"         V_ba = -V_ab = {V_ba} V")
# yükü iki katına çıkar: enerji iki katı, gerilim aynı
assert isclose((2 * W) / (2 * q), V_ab)
yaz("         8 µC için 36 µJ gerekir, gerilim yine 4,5 V")

# Tutarlılık kontrolü (bağımsız değil): düzgün alan, levhalar arası d, E = V/d, F = qE, W = F d
d = 1e-3  # 1 mm (varsayım, yalnızca kontrol)
E = V_ab / d
W_alan = q * E * d
assert isclose(W_alan, W)

# ---------------------------------------------------------------
# Örnek 2: düğüm gerilimleri ve referans (toprak)
# ---------------------------------------------------------------
V_A, V_B = 5.0, 3.3   # topraga göre
V_AB = V_A - V_B
assert isclose(V_AB, 1.7)
yaz(f"Örnek 2: V_A = 5 V, V_B = 3,3 V (toprağa göre) -> V_AB = 5 - 3,3 = {V_AB:.1f} V, V_BA = {-V_AB:.1f} V")
# referansı B'ye taşı: A'nın 'gerilimi' 1,7 V olur, B'ninki 0 V; fark değişmez
assert isclose((V_A - V_B) - (V_B - V_B), 1.7)

# ---------------------------------------------------------------
# Örnek 3 / Mini tasarım: TLV75533P çıkışına yük bağlama
# ---------------------------------------------------------------
yaz("Mini tasarım: 3,3 V regülatör, farklı yükler")
yukler = {"330 Ω": 330.0, "66 Ω": 66.0, "33 Ω": 33.0, "3,3 Ω": 3.3}
akimlar = {}
for ad, R in yukler.items():
    i = VOUT_NOM / R
    akimlar[ad] = i
    durum = "uygun (<= 500 mA)" if i <= IOUT_MAX else "UYGUN DEĞİL (> 500 mA)"
    yaz(f"  R = {ad}: i = 3,3 V / {ad} = {i*1e3:.2f} mA -> {durum}")
assert isclose(akimlar["330 Ω"], 10e-3)
assert isclose(akimlar["66 Ω"], 50e-3)
assert isclose(akimlar["33 Ω"], 0.100)
I_CL_MAX = 0.865
assert isclose(akimlar["3,3 Ω"], 1.0) and akimlar["3,3 Ω"] > I_CL_MAX
yaz(f"  3,3 Ω: {akimlar['3,3 Ω']*1e3:.0f} mA > akım sınırı en büyük {I_CL_MAX*1e3:.0f} mA -> her parçada çıkış 3,3 V'ta kalamaz")
# Isınma (yalnızca ajana bilgi): P = (VIN - VOUT) × i, ΔT = P × RθJA (DBV, JEDEC 231,1 °C/W)
RTH = 231.1
for i, beklenen in [(0.100, 39.3), (0.330, 129.7)]:
    P = (5.0 - VOUT_NOM) * i
    dT = P * RTH
    yaz(f"  (bilgi) {i*1e3:.0f} mA: P = 1,7 × {i} = {P:.3f} W, ΔT ≈ {dT:.0f} °C")
    assert abs(dT - beklenen) < 0.5
R_min = VOUT_NOM / IOUT_MAX
assert isclose(R_min, 6.6)
yaz(f"  En küçük yük direnci: R = 3,3 V / 0,5 A = {R_min} Ω")

# Yük regülasyonu: 0,1 mA'den 500 mA'e çıkış değişimi
dI = IOUT_MAX - 0.1e-3
dV = LOADREG_DBV * dI
assert isclose(dV, 0.060 * 0.4999)
yaz(f"  Yük regülasyonu: ΔV = 0,060 V/A × 0,4999 A = {dV*1e3:.1f} mV (≈ 30 mV)")
yaz(f"  Oran: {dV*1e3:.1f} mV / 3300 mV = %{dV/VOUT_NOM*100:.2f} (≈ %0,9)")
assert dV / VOUT_NOM < 0.01
# 330 Ω'dan 33 Ω'a geçiş (10 mA -> 100 mA)
dV2 = LOADREG_DBV * (0.100 - 0.010)
assert isclose(dV2, 0.0054)
yaz(f"  10 mA'den 100 mA'e: ΔV = 0,060 × 0,090 = {dV2*1e3:.1f} mV")
# doğruluk bandı
yaz(f"  %1 doğruluk: 3,3 × 0,01 = {VOUT_NOM*ACC*1e3:.0f} mV -> çıkış 3,267 ... 3,333 V")
assert isclose(VOUT_NOM * (1 - ACC), 3.267) and isclose(VOUT_NOM * (1 + ACC), 3.333)

# Giriş gerilimi koşulu (iki nokta arasında gerilim: IN - OUT)
VIN_MIN_GEREK = VOUT_NOM + VDO_MAX_85
assert isclose(VIN_MIN_GEREK, 3.538)
yaz(f"  Giriş en az: 3,3 V + 0,238 V = {VIN_MIN_GEREK:.3f} V")
assert 5.0 >= VIN_MIN_GEREK and 5.0 <= VIN_MAX_ROC
yaz("  USB 5 V: 3,538 <= 5 <= 5,5 -> uygun; IN - OUT = 5 - 3,3 = 1,7 V")
assert not (3.4 >= VIN_MIN_GEREK)
yaz("  Pil 3,4 V'a düşerse: 3,4 < 3,538 -> regülasyon kaybolur")

# Kısa devre: ideal kaynak modeli çöker
yaz("Kısa devre: ideal 3,3 V kaynak + R -> 0 için i = 3,3 / R büyür, sınır yok (model çöker)")
for R in [1.0, 0.1, 0.01]:
    yaz(f"  ideal: R = {R} Ω -> i = {VOUT_NOM/R:.0f} A")
assert isclose(VOUT_NOM / 0.01, 330.0)
yaz(f"  gerçek TLV755P: VOUT = 0 V iken I_SC = {I_SC*1e3:.0f} mA (tipik); sonra ısıl kapanma 165 °C")
# kısa devrede regülatörde harcanan güç (yalnızca ajana bilgi)
P_sc = (5.0 - 0.0) * I_SC
assert isclose(P_sc, 1.775)
yaz(f"  (bilgi) kısa devrede regülatör gücü: (5 - 0) V × 0,355 A = {P_sc:.3f} W")

# ---------------------------------------------------------------
# Örnek 4: datasheet gerilimleri iki nokta arasıdır; işaret önemlidir
# ---------------------------------------------------------------
# 12 V'luk bir sistemde 2N7002E: V_DS en çok 12 V, 60 V sınırın altında, pay 60/12 = 5 kat
assert isclose(VDSS / 12.0, 5.0)
yaz(f"2N7002E: 12 V sistemde V_DS en çok 12 V < 60 V (pay 60 / 12 = {VDSS/12:.0f} kat)")
# kapı 3,3 V ile sürülür: |V_GS| = 3,3 < 20
assert 3.3 < VGS_ABS
# 1N4007: ters yönde 1000 V, ileri yönde iletimde en çok 1,1 V (1 A'de)
yaz(f"1N4007: ters yönde en çok {VRRM:.0f} V dayanır; ileri yönde 1 A'de uçlarında en çok {VF_MAX} V")
assert VRRM / VF_MAX > 900
# TLV755P girişi -0,3 V: pil ters takılırsa V_IN = -3,7 V (Li-ion) -> sınırın altında
V_ters = -3.7
assert V_ters < VIN_MIN_ABS
yaz(f"TLV755P: pil ters takılırsa V_IN = {V_ters} V < -0,3 V -> mutlak sınır aşılır")

# ---------------------------------------------------------------
# Yorum sorusu
# ---------------------------------------------------------------
# TLV75533P çıkışına 22 Ω, sonra 2,2 Ω
i22 = VOUT_NOM / 22.0
assert isclose(i22, 0.150)
yaz(f"Yorum sorusu a) 22 Ω: i = 3,3 / 22 = {i22*1e3:.0f} mA <= 500 mA, çıkış 3,3 V")
# Zor ek: kısa devre -> v = 0, akım tipik 355 mA (regülatör belirler)
yaz(f"Yorum sorusu ek) kısa devre: v = 0 V, akım tipik {I_SC*1e3:.0f} mA")
P22 = (5.0 - VOUT_NOM) * i22
assert P22 * RTH < 125 - 25   # 22 Ω'da ısınma sorun değil (25 °C ortamda)
yaz(f"   (bilgi) 22 Ω: P = 1,7 × 0,15 = {P22:.3f} W, ΔT ≈ {P22*RTH:.0f} °C")

# Bölüm 6 örneği: 6 V, 2 kΩ ve 1 kΩ seri; 1 kΩ kısa devre
i_once = 6.0 / (2e3 + 1e3)
assert isclose(i_once, 2e-3)
i_tel = 6.0 / 2e3
assert isclose(i_tel, 3e-3)
yaz(f"Bölüm 6: önce i = 6 / 3 kΩ = {i_once*1e3:.0f} mA; kısa devreden sonra tel {i_tel*1e3:.0f} mA, 1 kΩ: 0 V / 1 kΩ = 0 mA")

yaz("\nTÜM KONTROLLER GEÇTİ")
