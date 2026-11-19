"""Ders 1 Bolum 3 dogrulama (surum 1, 20.11.2026): butun sayisal sonuclar (kesirli tam aritmetik), bagimsiz kontroller
(Ohm/KVL ile tutarlilik, sinir kontrolleri) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Bolum 1-2 olcumu); +125 sn kart, abone, sessizlik, bitis.
Birimler: uJ / uC = V ; V / kOhm = mA ; V / Ohm = A ; V/A x A = V."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 2: v_ab = W / q
W, q = F(18), F(4)                       # uJ, uC
v_ab = W / q; assert v_ab == F(9, 2)      # 4,5 V
assert F(36) / 8 == v_ab and 2 * W == 36 and 2 * q == 8      # yuk iki kat, enerji iki kat, gerilim ayni
v_ba = (-W) / q; assert v_ba == -F(9, 2) and v_ba == -v_ab   # a'dan b'ye: -18 uJ -> -4,5 V
# bagimsiz (tutarlilik): duzgun alan modeli W = q x E x d, E = v / d -> W = q x v
for d in (F(1), F(3, 1000)):
    E_ = v_ab / d; assert q * E_ * d == W
# --- Parca 3: isaret
assert 0 - F(33, 10) == -F(33, 10)   # eski toprak -3,3 V
assert -F(7) == -7 and -F(-3) == 3          # isaretler ters: -7 V; hesapta -3 V -> sag uc 3 V yuksek
assert F(238, 1000) == F(238) / 1000 and F(90, 1000) == F(9, 100)   # mV -> V, mA -> A donusumleri
assert (5 - F(33, 10)) * F(1, 2) * F(2311, 10) > 165         # 500 mA, 5 V giriste ~196 C artis: isil kapanma (ekrana konmaz)
# --- Parca 4: toprak ve referans
va, vb = F(5), F(33, 10)
assert va - vb == F(17, 10) and vb - va == -F(17, 10)
va2, vb2 = va - vb, vb - vb               # referans b'ye
assert vb2 == 0 and va2 == F(17, 10) and va2 - vb2 == va - vb
assert va - 0 == va                       # v_a = v_a - v_toprak
# --- Parca 5: kisa devre ve 2k/1k ornegi
assert 0 * F(7) == 0                      # R = 0, i sonlu -> v = 0
V, R1, R2 = F(6), F(2), F(1)              # V, kOhm
assert R1 + R2 == 3
i_once = V / (R1 + R2); assert i_once == 2        # tel yokken 2 mA (hatanin sonucu)
v_R2 = 0; i_R2 = F(v_R2) / R2; assert i_R2 == 0   # tel: 1 kOhm'un gerilimi 0, akimi 0
i_sonra = V / R1; assert i_sonra == 3              # 2 kOhm 6 V'u tek basina gorur: 3 mA (telden gecer)
# bagimsiz (KVL): 6 = v_2k + v_tel = 2 x 3 + 0
assert R1 * i_sonra + 0 == V
# ideal kaynagin kisa devresi: i = 6 / R sinirsiz buyur
assert [V / r for r in (F(1), F(1, 10), F(1, 100))] == [6, 60, 600]   # A (Ohm)
# --- Parca 6: datasheet + mini tasarim (icerik.md 5b, 5d)
Vout, drop, Vin, Vin_max = F(33, 10), F(238, 1000), F(5), F(55, 10)
assert Vout + drop == F(3538, 1000) and Vin >= Vout + drop and Vin <= Vin_max
assert Vin - Vout == F(17, 10) == va - vb          # 1,7 V kopru
loads = {330: F(10), 66: F(50), 33: F(100)}         # Ohm -> mA
for R, i_mA in loads.items():
    assert Vout / R == i_mA / 1000                  # i = 3,3 V / R
    assert i_mA <= 500
assert F(33, 10) / 330 == F(1, 100) and F(33, 10) / 66 == F(5, 100) and F(33, 10) / 33 == F(1, 10)
reg = F(60, 1000)                                    # V/A, yaklasik (tipik)
dI = F(100 - 10, 1000); assert dI == F(9, 100)
dV = reg * dI; assert dV == F(54, 10000)             # 0,0054 V = 5,4 mV
assert abs(reg * (F(500, 1000) - F(1, 10000)) - F(30, 1000)) < F(1, 1000)   # ~30 mV tum aralik
assert abs(F(30) / 3300 * 100 - F(91, 100)) < F(1, 100)                     # ~%0,9 (ekrana konmaz)
Rmin = Vout / F(1, 2); assert Rmin == F(66, 10)                              # 6,6 Ohm
assert Vout / F(33, 10) == 1 and 1000 > 865                                  # 3,3 Ohm: 1 A > I_CL en cok
assert 355 < 560                                                              # I_SC tipik < I_CL en az (geri katlama)
# datasheet sinirlari: 2N7002E V_GS +-20 V; 24 V > 20 V
assert 24 > 20 and 60 / 12 == 5
# --- Parca 7: yorum sorusu
assert Vout / 22 == F(15, 100) and F(15, 100) * 1000 <= 500                  # 150 mA <= 500 mA
print("Sayisal kontroller: tamam (4,5 V / -4,5 V; 1,7 V; 2 mA -> 3 mA, 1 kOhm 0; 6/60/600 A; 3,538 V; 10/50/100 mA; 5,4 mV; 6,6 Ohm; 1 A > 865 mA; 150 mA)")

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
    assert not re.search(r"\b(USB|LDO|datasheet|TLV|2N|1N)\b", metin), n
    assert not re.search(r"\bb'", metin), n                   # nokta adi seste "be"
    assert "her zaman" not in metin.lower(), n
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.6 / 60, 2), "dk; +125 sn ->", round((toplam / 2.6 + 125) / 60, 2), "dk")
assert 1800 <= toplam <= 2330 and 13 <= (toplam / 2.6 + 125) / 60 <= 17
print("TAMAM")
