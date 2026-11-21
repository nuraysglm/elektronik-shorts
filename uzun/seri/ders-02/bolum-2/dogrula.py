"""Ders 2 Bolum 2 dogrulama (surum 1, 21.11.2026 kredi sprinti): butun sayisal sonuclar (kesirli tam aritmetik),
bagimsiz kontroller (Ohm iki yonden, SI birimleriyle ikinci hesap, sinir kontrolleri) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Ders 1 olcumu); +125 sn kart, abone, sessizlik, bitis (intro ayrica ~9,5 sn)."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 3, ornek 1: akimla kontrol edilen gerilim kaynagi
i_x = F(5) / 1000; assert i_x == F(5, 1000)           # 5 V / 1000 Ohm = 0,005 A
assert i_x * 1000 == 5                                 # 5 mA
v_b = 360 * i_x; assert v_b == F(18, 10)               # 360 Ohm x 0,005 A = 1,8 V
assert 360 * 5 == 1800                                 # bagimsiz: Ohm x mA = mV
i_y = v_b / 900; assert i_y == F(2, 1000)              # 1,8 / 900 = 0,002 A = 2 mA
assert 900 * i_y == v_b                                # Ohm ters yonden
# esdeger katsayi kontrolu: i_y = (360/900) x i_x
assert i_y == F(360, 900) * i_x

# --- Parca 4, ornek 2: anahtarli, negatif katsayili VCVS
Vs, R1, k, RL = F(3), F(3000), F(-4), F(2000)
# kapali: v_x = 0
vx_k = 0; i_sol_k = Vs / R1; assert i_sol_k == F(1, 1000)   # 1 mA
vb_k = k * vx_k; assert vb_k == 0; assert vb_k / RL == 0
# acik: i = 0 -> v_R = 0 -> v_x = 3 V (KVL ile bagimsiz kontrol: Vs = v_R + v_x)
i_sol_a = 0; vR = R1 * i_sol_a; assert vR == 0
vx_a = Vs - vR; assert vx_a == 3 and vR + vx_a == Vs
vb_a = k * vx_a; assert vb_a == -12
iL = vb_a / RL; assert iL == F(-6, 1000)                # -0,006 A = -6 mA
assert abs(iL) * 1000 == 6
assert -12 / F(2) == -6                                 # V / kOhm = mA

# --- Parca 5: kuvvetlendirici
A = 50; vin = F(20, 1000)
assert A * vin == 1 and A * 20 == 1000                 # 1000 mV = 1 V
assert A * 1 == 50                                     # 1 V giris -> model 50 V

# --- Parca 6: veri sayfasi sayilari
VS = F(33, 10)
assert VS - F(3, 100) == F(327, 100)                    # 3,27 V (V_SP en kotu)
AOL = 100 * 1000; assert AOL == 100_000                 # 100 V/mV = 100 000 V/V
assert F(10) / AOL == F(1, 10000)                       # 10 V / 1e5 = 0,0001 V = 0,1 mV
assert F(1, 10000) * 1000 == F(1, 10)
assert AOL * F(1, 1000) == 100                          # 1 mV x 1e5 = 100 V
assert 100 > 15
# mini tasarim (a) 50 mOhm
Rs = F(5, 100); imax = 2
vs = imax * Rs; assert vs == F(1, 10)
assert A * vs == 5 and 5 > VS
assert A * Rs == F(5, 2)                                # 2,5 Ohm
i_tak = F(327, 100) / F(5, 2); assert abs(i_tak - F(1308, 1000)) < F(1, 10000)
assert round(float(i_tak), 1) == 1.3
# (b) dogru secim
ust = VS - F(1, 2); assert ust == F(28, 10)             # 2,8 V
assert A * imax == 100
Rmax = ust / 100; assert Rmax == F(28, 1000)           # 0,028 Ohm = 28 mOhm
Rsec = F(25, 1000); assert Rsec <= Rmax
assert A * Rsec == F(125, 100)                          # 1,25 Ohm (1,25 V/A)
assert A * Rsec * imax == F(5, 2) and F(5, 2) <= ust    # 2,5 V <= 2,8 V
i_alt = F(1, 2) / F(125, 100); assert i_alt == F(4, 10) # 0,4 A
assert F(1) / F(125, 100) == F(8, 10)                   # 1 V -> 0,8 A
# 0,4 A ve 2 A arasinda cikis 0,5 ... 2,5 V: garanti araliginda
for i in (F(4, 10), 1, 2):
    vo = A * Rsec * i; assert F(1, 2) <= vo <= ust

# --- Parca 7: yorum sorusu (icerik.md 8 ile ayni; cevap seste verilmez)
ix = F(4) / 1600; assert ix == F(25, 10000)             # 2,5 mA
vy = 320 * ix; assert vy == F(8, 10)                    # 0,8 V
k_a = F(9, 2); v2 = -k_a * vy; assert v2 == F(-36, 10)  # -3,6 V
assert abs(v2) <= 5
iL2 = v2 / 1000; assert iL2 == F(-36, 10000)            # -3,6 mA
assert abs(iL2) > F(3, 1000)                            # akim siniri asildi -> gecersiz
k_v = F(5) / vy; k_i = F(3) / vy                        # 6,25 ve 3,75
assert k_v == F(625, 100) and k_i == F(375, 100) and min(k_v, k_i) == F(375, 100)
assert -F(375, 100) * vy == -3 and (-3) / F(1000) == F(-3, 1000)

# --- Metin kontrolleri
p = pathlib.Path(__file__).with_name("metin.md")
t = p.read_text(encoding="utf-8")
bloklar = re.findall(r"## \[PARÇA (\d)\][^\n]*\n\n```\n(.*?)```", t, re.S)
assert [b[0] for b in bloklar] == [str(i) for i in range(1, 8)], [b[0] for b in bloklar]
toplam = 0
for no, b in bloklar:
    ses = "\n".join(l for l in b.splitlines() if not l.startswith("[SELAM"))
    assert not re.search(r"[0-9=+×/()%·→Ωµ_]", ses), (no, re.findall(r".{15}[0-9=+×/()%·→Ωµ_].{5}", ses))
    assert "kanca" not in ses.lower(), no
    for yasak in ("her zaman", "hiçbir öğrenci", "VCVS", "CCVS", "INA", "LM358", "datasheet", " ve iki "):
        assert yasak not in ses, (no, yasak)
    n = len(ses.split()); toplam += n
    print(f"Parça {no}: {n} kelime, ~{n/2.6/60:.1f} dk")
assert "kanca" not in re.sub(r"\[PARÇA[^\]]*\]", "", t).lower().replace("kanca\" yok", "").replace("\"kanca\" kelimesi", ""), "ekran/sahne planinda kanca"
sure = toplam / 2.6 + 125 + 9.5
print(f"Toplam seslendirme: {toplam} kelime; tahmini süre ~{sure/60:.1f} dk")
assert 1800 <= toplam <= 2200, toplam
assert 13 * 60 <= sure <= 17 * 60, sure
# Uygulamada <= 610 kelime (paket ~550; mini tasarimin butun ara adimlari icin asim, dogruluk.md)
u = [b for no, b in bloklar if no == "6"][0]
assert len(u.split()) <= 610, len(u.split())
print("TÜM KONTROLLER GEÇTİ")
