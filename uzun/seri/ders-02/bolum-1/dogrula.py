"""Ders 2 Bolum 1 dogrulama (surum 1, 20.11.2026): butun sayisal sonuclar (kesirli tam aritmetik), bagimsiz kontroller
(KVL / Ohm ile tutarlilik, kesin cozumle karsilastirma) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Ders 1 olcumu); +125 sn kart, abone, sessizlik, bitis.
Birimler: V / kOhm = mA ; V / Ohm = A ; Ohm x mA = mV."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 1 / 4: kanca ve en sik yapilan hata
V = F(3, 2)
i150 = V / 150; assert i150 == F(1, 100)          # 0,01 A = 10 mA
i15 = V / F(3, 2); assert i15 == 1                # 1 A
assert i15 / i150 == 100                          # 100 kat
# bagimsiz: Ohm ters yonden (ideal kaynakta v = R x i = 1,5 V her iki yukte)
assert 150 * i150 == V and F(3, 2) * i15 == V

# --- Parca 3: ideal tel ve anahtar ornegi
assert 0 * F(2) == 0                              # 0 Ohm x 2 A = 0 V
Vs, R = F(9, 2), F(3, 2)                           # V, kOhm
i_kapali = Vs / R; assert i_kapali == 3            # 3 mA
v_R_acik = R * 0; assert v_R_acik == 0
v_anahtar_acik = Vs - v_R_acik; assert v_anahtar_acik == F(9, 2)   # KVL: 4,5 = 0 + 4,5
assert R * i_kapali + 0 == Vs                      # KVL kapali: v_R + v_anahtar = 4,5 V

# --- Parca 4 / 5: v-i grafigi
for i in (F(0), F(1, 2), F(1)):
    assert V == F(3, 2)                            # ideal: yatay dogru
Ri = F(3, 10)
v_gercek = lambda i: V - Ri * i
assert v_gercek(0) == F(3, 2)
assert Ri * F(1, 2) == F(15, 100) and v_gercek(F(1, 2)) == F(135, 100)   # 0,15 V; 1,35 V
assert Ri * 1 == F(3, 10) and v_gercek(1) == F(6, 5)                     # 0,3 V; 1,2 V
assert (v_gercek(0) - v_gercek(1)) / 1 == Ri                             # egim 0,3 V/A
assert 0 <= 1 <= F(11, 10) and F(6, 5) <= F(8, 5)                         # eksen 0..1,1 A, 0..1,6 V kapsar

# --- Parca 6: datasheet degerleri ve mini tasarim
ohm_per_m = F(162, 10) / F(3048, 10)
assert abs(ohm_per_m - F(531, 10000)) <= F(5, 100000)                    # ~0,0531 Ohm/m
R_tel = F(531, 10000) * F(2, 10); assert abs(R_tel - F(106, 10000)) <= F(5, 100000)   # ~0,0106 Ohm = 10,6 mOhm
assert F(3048, 10) == 1000 * F(3048, 10000)                              # 1000 ft = 304,8 m
R_tel_mOhm = F(106, 10)
# (a) 150 Ohm
i_a = V / 150 * 1000; assert i_a == 10                                   # mA
assert i_a <= 50 and V <= 12
d_pil = F(3, 10) * i_a; assert d_pil == 3                                # Ohm x mA = mV
d_buton = F(1, 10) * i_a; assert d_buton == 1
d_tel = R_tel_mOhm / 1000 * i_a; assert abs(d_tel - F(11, 100)) < F(1, 100)   # ~0,106 -> 0,11 mV
top = 3 + 1 + F(11, 100); assert abs(top - F(41, 10)) <= F(5, 100)        # ~4,1 mV
assert abs(F(41, 10) / 1500 * 100 - F(27, 100)) < F(1, 100)             # ~%0,27
assert V * 1000 == 1500
# bagimsiz: kesin seri cozum (Ders 3 konusu, ekrana konmaz)
R_top = 150 + F(3, 10) + F(1, 10) + F(106, 10000)
i_kesin = V / R_top; assert abs((V / 150 - i_kesin) / (V / 150) * 100 - F(27, 100)) < F(1, 100)
# (b) 1,5 Ohm
i_b = V / F(3, 2); assert i_b == 1
assert F(1000) / 50 == 20                                                # 1 A / 50 mA = 20
d_b = F(3, 10) * i_b; assert d_b == F(3, 10)
assert d_b / V == F(1, 5)                                                # %20
i_b_kesin = V / (F(3, 2) + F(3, 10)); assert i_b_kesin < 1                # akim 1 A'in altinda (0,833 A)
assert F(3, 10) * i_b_kesin < d_b                                        # gercek dusum tahminden kucuk ("en cok")
# 10 kat kurali
R_sinir = 10 * F(3, 10); assert R_sinir == 3
i_s = V / R_sinir; assert i_s == F(1, 2)
d_s = F(3, 10) * i_s; assert d_s == F(15, 100) and d_s / V == F(1, 10)  # %10
assert 150 >= R_sinir and F(3, 2) < R_sinir
# birim donusumleri (Parca 4, 6)
assert F(1000) / 10 == 100 and F(3048, 10000) * 1000 == F(3048, 10)     # 1 A = 1000 mA; 1000 x 0,3048 = 304,8 m
assert F(100, 1000) == F(1, 10) and F(20, 100) == F(2, 10)               # 100 mOhm = 0,1 Ohm; 20 cm = 0,20 m
assert abs(F(531, 10) * F(2, 10) - F(106, 10)) <= F(5, 100)               # 53,1 mOhm/m x 0,2 m ~ 10,6 mOhm
assert abs(F(41, 10) / 1500 - F(27, 10000)) < F(1, 10000)               # 0,0027
assert F(9, 2) - 0 == F(9, 2)                                            # v_anahtar = 4,5 - v_R
# --- Parca 7: yorum sorusu (cevap: 900 Ohm -> 10 mA, 20 mV, %0,22: yeter; 9 Ohm -> 1 A, 2 V, %22: yetmez; kural 20 Ohm)
Ri9 = F(2)
i900 = F(9) / 900; assert i900 == F(1, 100); assert Ri9 * i900 == F(2, 100)
i9 = F(9) / 9; assert i9 == 1; assert Ri9 * i9 == 2
assert abs(F(2, 100) / 9 * 100 - F(22, 100)) < F(1, 100) and abs(F(2) / 9 * 100 - 22) < 1
assert 10 * Ri9 == 20 and 900 >= 20 and 9 < 20
print("Sayisal kontroller: tamam (10 mA / 1 A, 100 kat; 3 mA, 4,5 V; 1,5 / 1,35 / 1,2 V; 0,0531 Ohm/m, 10,6 mOhm; 3 + 1 + 0,11 = 4,1 mV, %0,27; 20 kat, 0,3 V, %20; 3 Ohm, 0,15 V, %10; yorum: 20 mV / 2 V)")

# --- Seslendirme metni
md = pathlib.Path(__file__).with_name("metin.md").read_text()
parcalar = re.findall(r"## \[PARÇA (\d)\].*?```\n(.*?)```", md, re.S)
assert len(parcalar) == 7
toplam = 0
for n, metin in parcalar:
    metin = re.sub(r"\[SELAM[^\n]*\]\n", "", metin)          # selam etiketi seslendirilmez
    k = len(metin.split()); toplam += k
    kotu = re.findall(r"[0-9=+/()\[\]%·×Δµμ<>*_-]", metin)  # kesme isareti serbest
    print(f"Parca {n}: {k} kelime, ~{k/2.6/60:.2f} dk, yasak karakter: {kotu}")
    assert not kotu, n
    assert not re.search(r"(^|[.!?]\s+)İ\b", metin)
    assert not re.search(r"\b(AWG|AA|datasheet|PTS|E91|USB|ft|mA|mV|Ω|dokunmatik)\b", metin), n
    assert "her zaman" not in metin.lower(), n
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.6 / 60, 2), "dk; +125 sn ->", round((toplam / 2.6 + 125) / 60, 2), "dk")
assert 1800 <= toplam <= 2330 and 13 <= (toplam / 2.6 + 125) / 60 <= 17
print("TAMAM")
