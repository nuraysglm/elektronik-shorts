# -*- coding: utf-8 -*-
"""Devre Teorisi I, Ders 3 - Bölüm 1: içerik paketi sayısal doğrulaması.
İçerik Ajanı, 21.11.2026 (kredi sprinti). Çalıştır: python3 icerik_dogrula.py
Her sonuç assert ile kontrol edilir. Bağımlı kaynak devreleri ayrıca küçük bir
düğüm denklemi (KCL) çözücüsüyle bağımsız olarak sınanır (paket içi; videoda KCL yok).
"""
from math import isclose

def yaz(s):
    print(s)

def yakin(a, b, rel=1e-9, abs_=1e-12):
    return isclose(a, b, rel_tol=rel, abs_tol=abs_)

# ---------------------------------------------------------------
# Datasheet değerleri (kaynak: icerik.md 5b / 11)
# ---------------------------------------------------------------
# TI XTR111, SBOS375D (Ekim 2006, rev. Ekim 2024): I_OUT = 10 × V_VIN / R_SET (s. 5, s. 12 denklem 1)
XTR111_KAZANC = 10.0          # iç akım aynası kazancı
XTR111_IOUT_PERF_MAX = 25e-3  # A, belirtilen performans 0,1 … 25 mA (s. 5)
XTR111_IOUT_DERATED = 32e-3   # A, "derated" 0 … 32 mA (s. 5)
XTR111_ILIM_TIP, XTR111_ILIM_TOL = 41e-3, 9e-3   # A, akım sınırı 41 ± 9 mA (s. 5)
XTR111_VSP_MIN, XTR111_VSP_MAX = 8.0, 40.0        # V, önerilen besleme (s. 4)
XTR111_VIN_PAY = 2.3          # V, doğrusal giriş: 0 … 12 V ya da V_VSP − 2,3 V, hangisi küçükse (s. 19)
XTR111_UYUM_PAY = 2.0         # V, çıkış uyum aralığı üstte V_VSP − 2 V'a kadar (s. 1)
XTR111_SPAN_HATA_MAX = 0.1    # %, span hatası en çok (s. 5)
# TI XTR115/XTR116, SBOS124C (Ocak 2000, rev. Ocak 2026): I_O = 100 × I_IN (s. 1, s. 6, s. 11)
XTR115_KAZANC = 100.0
XTR115_RIN = 20e3             # Ω, tipik uygulama (s. 6 koşulları, s. 11 Şekil 8-1)
XTR115_VPLUS_MIN, XTR115_VPLUS_MAX = 7.5, 36.0    # V, önerilen (s. 5)
XTR115_IO_MIN, XTR115_IO_MAX = 0.25e-3, 25e-3     # A, doğrusal aralık (s. 6)
XTR115_SPAN_HATA_MAX_U = 0.2  # %, U sürümü en çok (s. 6)

# ---------------------------------------------------------------
# Küçük bağımsız sınama aracı: iki düğümlü devre (alt düğüm = 0 V)
# Üst düğümün gerilimi v; üst düğüme giren akımların toplamı = 0 (KCL).
# Her eleman, v'nin doğrusal fonksiyonu olarak "üst düğüme giren akım" verir: a + b*v.
# ---------------------------------------------------------------
def ust_dugum_cozu(elemanlar):
    a = sum(e[0] for e in elemanlar)
    b = sum(e[1] for e in elemanlar)
    if b == 0:
        return None            # çözüm yok (ya da sonsuz): çelişki
    return -a / b

# ---------------------------------------------------------------
# Örnek 1: akım kontrollü akım kaynağı (CCCS), k = 25, i0 = 0,2 mA, R = 1,2 kΩ
# ---------------------------------------------------------------
k1, i0, R1 = 25, 0.2e-3, 1.2e3
i1 = k1 * i0
assert yakin(i1, 5e-3)
v1 = R1 * i1                     # akım direnci + ucundan giriyor
assert yakin(v1, 6.0)
# k = −25: akım ok yönünün tersine 5 mA
i1n = -25 * i0
assert yakin(i1n, -5e-3)
v1n = R1 * i1n
assert yakin(v1n, -6.0)
# bağımsız sınama: üst düğüme bağımlı kaynak i1 itiyor, direnç v/R çekiyor
assert yakin(ust_dugum_cozu([(i1, 0), (0, -1 / R1)]), 6.0)
yaz(f"Örnek 1: i1 = 25 × 0,2 mA = {i1*1e3:.1f} mA; v = 1,2 kΩ × 5 mA = {v1:.1f} V; k = −25 ise {v1n:.1f} V")

# ---------------------------------------------------------------
# Örnek 2: VCCS + direnç = kuvvetlendirici. Kontrol gerilimi ayrı bir halkadan:
# bağımsız I_s = 0,1 mA, R_x = 1,5 kΩ → v_x; VCCS k = 8 mS; R_L = 2,5 kΩ
# ---------------------------------------------------------------
Is2, Rx2, k2, R2 = 0.1e-3, 1.5e3, 8e-3, 2.5e3
vx2 = Is2 * Rx2
assert yakin(vx2, 0.15)
i2 = k2 * vx2
assert yakin(i2, 1.2e-3)
vout = R2 * i2
assert yakin(vout, 3.0)
kazanc = k2 * R2
assert yakin(kazanc, 20.0)            # birimsiz: (A/V) × (V/A)
assert yakin(vout / vx2, kazanc)
vout_ters = -R2 * i2
assert yakin(vout_ters, -3.0)
assert yakin(vout_ters / vx2, -20.0)
for v_an in (-0.15, -0.05, 0.0, 0.1, 0.15):
    assert yakin(R2 * k2 * v_an, 20 * v_an)
assert yakin(20 * 0.15, 3.0) and yakin(20 * -0.15, -3.0)
yaz(f"Örnek 2: v_x = 0,1 mA × 1,5 kΩ = {vx2:.2f} V; i = 8 mS × 0,15 V = {i2*1e3:.1f} mA; v_out = 2,5 kΩ × 1,2 mA = {vout:.1f} V; kazanç 20; ok ters: {vout_ters:.1f} V (−20)")

# ---------------------------------------------------------------
# Örnek 3: kendi uçlarındaki gerilimi okuyan VCCS (i_b = k × v, ok + uçtan içeri)
# bir akım kaynağıyla sürülüyor; k = 1,5 mS → R_eş = 1/k
# ---------------------------------------------------------------
k3 = 1.5e-3
Req3 = 1 / k3
assert yakin(Req3, 666.6666666666666)
for Is, v_bek in ((0.6e-3, 0.4), (1.5e-3, 1.0), (3e-3, 2.0)):
    v = Is / k3
    assert yakin(v, v_bek)
    # bağımsız: üst düğüme I_s giriyor, VCCS k·v çekiyor
    assert yakin(ust_dugum_cozu([(Is, 0), (0, -k3)]), v_bek)
    assert yakin(v / Is, Req3)
yaz(f"Örnek 3: R_eş = 1 / 1,5 mS = {Req3:.1f} Ω; 0,6 / 1,5 / 3 mA → 0,4 / 1,0 / 2,0 V")

# ---------------------------------------------------------------
# Uygulamada 5d-A: XTR111, 0 … 4 V → 0 … 20 mA, alıcıda 200 Ω
# ---------------------------------------------------------------
VFS, IFS = 4.0, 20e-3
RSET = XTR111_KAZANC * VFS / IFS
assert yakin(RSET, 2000.0)
k_xtr111 = XTR111_KAZANC / RSET
assert yakin(k_xtr111, 5e-3)          # 5 mS = 5 mA/V
for v_an, i_bek in ((0.0, 0.0), (1.0, 5e-3), (2.0, 10e-3), (4.0, 20e-3)):
    assert yakin(k_xtr111 * v_an, i_bek)
assert IFS <= XTR111_IOUT_PERF_MAX
R_alici = 200.0
kaz_alici = k_xtr111 * R_alici
assert yakin(kaz_alici, 1.0)
assert yakin(R_alici * IFS, 4.0) and yakin(R_alici * 10e-3, 2.0)
# R_SET belirsizliği: 2 Ω / 2000 Ω = %0,1 (datasheet s. 19'daki 2,5 Ω / 2,5 kΩ ile aynı oran)
assert yakin(2.0 / RSET * 100, 0.1) and yakin(2.5 / 2500 * 100, 0.1)
# Besleme 24 V: çıkış uyum sınırı 24 − 2 = 22 V (bundan harici transistörün V_DS payı da düşülür)
VSP = 24.0
assert yakin(VSP - XTR111_UYUM_PAY, 22.0)
assert R_alici * IFS < VSP - XTR111_UYUM_PAY - 5.0   # harici transistörün V_DS'i için cömert 5 V ayırsak bile 4 V < 17 V
# Giriş 4 V < min(12, 24 − 2,3) = 12 V
assert VFS < min(12.0, VSP - XTR111_VIN_PAY)
# 500 Ω alıcı: kazanç 2,5, 4 V girişte 10 V
assert yakin(k_xtr111 * 500, 2.5) and yakin(500 * IFS, 10.0)
# Pahalı hata: R_SET = 1 kΩ ile 4 V → 40 mA isteği
I_istek = XTR111_KAZANC * VFS / 1000.0
assert yakin(I_istek, 40e-3)
assert I_istek > XTR111_IOUT_PERF_MAX and I_istek > XTR111_IOUT_DERATED
assert yakin(XTR111_ILIM_TIP - XTR111_ILIM_TOL, 32e-3) and yakin(XTR111_ILIM_TIP + XTR111_ILIM_TOL, 50e-3)
assert yakin(XTR111_IOUT_PERF_MAX * 1000.0 / XTR111_KAZANC, 2.5)
assert yakin(32e-3 * 1000.0 / XTR111_KAZANC, 3.2)   # kötü parçada akım sınırı 3,2 V girişte
yaz(f"5d-A XTR111: R_SET = 10 × 4 V / 20 mA = {RSET:.0f} Ω; k = 10 / 2000 Ω = {k_xtr111*1e3:.0f} mS; 200 Ω alıcı: kazanç {kaz_alici:.0f}; R_SET = 1 kΩ hatası: {I_istek*1e3:.0f} mA (25 mA'e 2,5 V'ta ulaşır; sınır 32…50 mA)")

# ---------------------------------------------------------------
# Uygulamada 5d-B: XTR115, I_O = 100 × I_IN, R_IN = 20 kΩ
# ---------------------------------------------------------------
for vin_x, iin_bek, io_bek in ((0.8, 40e-6, 4e-3), (4.0, 200e-6, 20e-3), (2.4, 120e-6, 12e-3)):
    iin = vin_x / XTR115_RIN
    assert yakin(iin, iin_bek)
    io = XTR115_KAZANC * iin
    assert yakin(io, io_bek)
    assert XTR115_IO_MIN <= io <= XTR115_IO_MAX
k_xtr115 = XTR115_KAZANC / XTR115_RIN
assert yakin(k_xtr115, 5e-3)
# alıcı 250 Ω: 4 mA → 1 V, 20 mA → 5 V
assert yakin(250 * 4e-3, 1.0) and yakin(250 * 20e-3, 5.0)
# Paket içi (KVL, Ders 3 - Bölüm 3'e köprü): 24 V döngü, XTR115'e en az 7,5 V kalmalı
R_dongu_max = (24.0 - XTR115_VPLUS_MIN) / 20e-3
assert yakin(R_dongu_max, 825.0)
assert yakin(24.0 - 250 * 20e-3, 19.0)
# Live zero: 0 mA geçerli aralıkta değil (4 … 20 mA) → kopuk kablo ayırt edilir
assert 0.0 < 4e-3
yaz(f"5d-B XTR115: 0,8 V / 20 kΩ = 40 µA → 4 mA; 4 V / 20 kΩ = 200 µA → 20 mA; k = 100 / 20 kΩ = {k_xtr115*1e3:.0f} mS; döngü direnci en çok {R_dongu_max:.0f} Ω (paket içi)")

# ---------------------------------------------------------------
# Paket içi (kavram, ters ok): VCCS kendi gerilimini okuyor, oku YUKARI, I_s = 4 mA yukarı
# I_s + k v = 0 → v = −I_s / k; "eksi direnç"; k → 0 çözüm yok
# ---------------------------------------------------------------
Is_q, k_q = 4e-3, 2.5e-3
v_q = ust_dugum_cozu([(Is_q, 0), (0, k_q)])
assert yakin(v_q, -1.6) and yakin(v_q / Is_q, -400.0)
assert ust_dugum_cozu([(Is_q, 0), (0, 0.0)]) is None
yaz(f"Ters ok (paket içi): v = −4 mA / 2,5 mS = {v_q:.1f} V; v/I_s = −400 Ω; k = 0: çözüm yok")

# ---------------------------------------------------------------
# Yorum sorusu: I_s = 0,5 mA → R_x = 2 kΩ (v_x); VCCS k = 6 mS; akımı R_L = 1,5 kΩ'dan
# geçiyor ama R_L'nin referans − ucundan giriyor. (1) v_out? (2) Kaynak uçlarında en çok
# 12 V oluşturabiliyor ve en çok 7 mA verebiliyorsa I_s en çok kaç olabilir?
# ---------------------------------------------------------------
Iq, Rxq, kq, RLq, VMAX = 0.5e-3, 2e3, 6e-3, 1.5e3, 12.0
vxq = Iq * Rxq
assert yakin(vxq, 1.0)
ibq = kq * vxq
assert yakin(ibq, 6e-3)
voutq = -RLq * ibq
assert yakin(voutq, -9.0)
assert yakin(voutq / vxq, -9.0)                    # kazanç −k R_L = −6 mS × 1,5 kΩ = −9
assert yakin(-kq * RLq, -9.0)
# bağımsız: VCCS ile R_L aynı iki düğüm arasında
# v_out: üst düğüm − alt düğüm (R_L referansı); VCCS akımını alt (−) düğüme itiyor → üst düğümden k v_x çekiyor
assert yakin(ust_dugum_cozu([(-ibq, 0), (0, -1 / RLq)]), -9.0)
# (2) Kaynağın uçlarındaki gerilim = R_L'nin gerilimi (aynı iki nokta): |v| ≤ 12 V
ib_max = VMAX / RLq
assert yakin(ib_max, 8e-3)
vx_max = ib_max / kq
assert yakin(vx_max, 4 / 3)
I_max = vx_max / Rxq
assert yakin(I_max, (2 / 3) * 1e-3)
assert yakin(I_max * kq * Rxq * RLq, 12.0)
# sık yanlışlar: işaret (+9 V); mS'i S sanmak (6 × 1 × 1500 = 9000 V); 12 V'u v_x'e uygulamak
assert yakin(RLq * ibq, 9.0)
assert yakin(12.0 / Rxq, 6e-3)        # 12 V / 2 kΩ = 6 mA (yanlış yol)
yaz(f"Yorum sorusu: v_x = 0,5 mA × 2 kΩ = {vxq:.0f} V; i = 6 mS × 1 V = {ibq*1e3:.0f} mA; v_out = −1,5 kΩ × 6 mA = {voutq:.0f} V; |v| ≤ 12 V → i ≤ 8 mA → v_x ≤ 1,333 V → gerilim sınırı I_s ≤ {I_max*1e3:.3f} mA")
IMAX = 7e-3
vx_max_i = IMAX / kq
assert yakin(vx_max_i, 7 / 6)
I_max_i = vx_max_i / Rxq
assert yakin(I_max_i, (7 / 12) * 1e-3)
I_cevap = min(I_max, I_max_i)
assert yakin(I_cevap, (7 / 12) * 1e-3) and I_max_i < I_max
assert abs(-RLq * kq * Rxq * I_cevap) <= VMAX and kq * Rxq * I_cevap <= IMAX + 1e-15
yaz(f"Yorum sorusu (2. sınır): 7 mA / 6 mS = {vx_max_i:.3f} V → {I_max_i*1e3:.3f} mA; CEVAP: I_s en çok = min(0,667; 0,583) = {I_cevap*1e3:.3f} mA")

# ---------------------------------------------------------------
# Eşdeğerlik (Razavi [3:17–4:13]): değeri 0 olan akım kaynağı = açık devre;
# 0 V'luk gerilim kaynağı = kısa devre. Örnek: 4 mA'lik kaynak + 0 A'lik kaynak → çelişki
# ---------------------------------------------------------------
assert ust_dugum_cozu([(4e-3, 0), (0.0, 0.0)]) is None
yaz("Eşdeğerlik: 0 A'lik akım kaynağı açık devredir (4 mA'lik kaynakla çelişki, çözüm yok)")

yaz("TÜM KONTROLLER GEÇTİ")
