"""Ders 1 Bolum 2 dogrulama (surum 3, 19.11.2026: Uygulamada parcasi + buton + kisaltmalar): butun sayisal sonuclar (kesirli tam aritmetik),
bagimsiz kontroller (sayisal integral, KVL/Ohm) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Bolum 1 olcumu: 2050 kelime -> 788 sn ses); +125 sn kart, abone, sessizlik, bitis (Bolum 1: 913 - 788).
Birimler: uC / ms = mA ; mA x ms = uC ; mA x s = mC ; V / kOhm = mA."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 2 (Uygulamada): datasheet degerleri + mini tasarim (icerik.md 5d)
assert F(30) / 1 == 30                                      # 1N4007: 30 A darbe / 1 A ortalama (ekrana oran konmaz)
assert 1 * 3600 == 3600 and F(1, 1000) * 3600 == F(36, 10)  # 1 mAh = 1 mA x 3600 s = 3,6 C
q_uyanik = 10 * 2;            assert q_uyanik == 20         # 10 mA x 2 ms = 20 uC
assert 5 * 998 == 4990;       q_uyku = F(4990, 1000)        # 5 uA x 998 ms = 4990 nC = 4,99 uC
assert q_uyku == F(499, 100)
q_top = q_uyanik + q_uyku;    assert q_top == F(2499, 100)  # 24,99 uC
i_ort = q_top / 1;            assert abs(i_ort - 25) < F(2, 100)   # ~25 uA (24,99 uC / 1 s)
assert 1000 - 2 == 998                                      # periyot 1 s = 1000 ms
assert F(25, 1000) == F(25, 1000) and F(225) / F(25, 1000) == 9000   # 225 mAh / 0,025 mA = 9000 h
assert F(9000, 24) == 375
assert F(225, 10) == F(225, 10) and F(225) / 10 == F(45, 2)          # tepe ile: 22,5 h
assert F(9000) / F(45, 2) == 400 and F(45, 2) < 24
# kesin deger ile (24,99 uA): 225 / 0,02499 = 9003,6 h -> "yaklasik" 375 gun
assert 9000 < F(225) / (q_top / 1000) < 9010
# bagimsiz: 1 s periyotta sayisal integral (orta nokta, 1 us adim), uA x ms = nC
def i_sensor(t_ms):                                          # uA
    return F(10000) if t_ms < 2 else F(5)
# --- Parca 3: referans yonu
assert F(3) / 1 == 3                       # 3 uC / 1 ms = 3 mA (ok saga)
assert -(F(3) / 1) == -3                   # ok sola: -3 mA
assert F(-4) / 1 == -4 and -F(-4) == 4     # elektronlar: saga -4 uC/ms -> ok saga -4 mA, ok sola +4 mA
# Bolum 1 ornek 3 ile tutarlilik: i = 6 - 2t, t = 4 s -> -2 mA
assert 6 - 2 * 4 == -2

# --- Parca 3: 9 V, 3 kOhm, anahtar (tek halka)
V, R = F(9), F(3)
i_kapali = V / R; assert i_kapali == 3                      # mA
i_acik = 0; v_R = R * i_acik; assert v_R == 0               # Ohm: 3 kOhm x 0 = 0 V
# KVL (bagimsiz kontrol): V = v_R + v_anahtar
v_anahtar = V - v_R; assert v_anahtar == 9
# kapali anahtarda: v_anahtar = 0, v_R = 9 = R x i
assert R * i_kapali == V

# --- Parca 4: sabit 4 mA, 3 s
assert 4 * 3 == 12                                          # mC
# --- Parca 5: rampa + sabit + ters
def i5(t):                                                  # mA, t ms
    if t < 2: return 3 * t
    if t < 5: return F(6)
    return F(-2)
assert i5(F(1)) == 3 and i5(F(2)) == 6 and i5(F(6)) == -2 and 3 * 2 == 6
ucgen = F(2 * 6, 2); assert 2 * 6 == 12 and ucgen == 6
integ = F(3 * 2**2, 2); assert 2**2 == 4 and 3 * 4 == 12 and integ == 6
dik2 = (5 - 2) * 6; assert dik2 == 18
dik3 = (8 - 5) * (-2); assert dik3 == -6
q5 = ucgen + dik2; q8 = q5 + dik3
assert q5 == 24 and q8 == 18 and 24 - 6 == 18
kucuk = F(1 * 3, 2); assert i5(F(1)) == 3 and kucuk == F(3, 2) and kucuk / 6 == F(1, 4)
# bagimsiz: orta nokta kuraliyla sayisal integral (1 us adim)
def sayisal(f, a, b, N):
    h = F(b - a, N); return sum(f(a + (k + F(1, 2)) * h) for k in range(N)) * h
assert sayisal(i5, 0, 2, 2000) == 6           # dogrusal: orta nokta kurali tam
assert sayisal(i5, 0, 8, 8000) == 18
assert sayisal(i5, 0, 5, 5000) == 24
assert sayisal(i5, 0, 1, 1000) == F(3, 2)
# genel: dogrusal rampada t/2 aninda yuk orani 1/4
for T in [F(1), F(2), F(7)]:
    assert (F(1, 2) * (T / 2) ** 2) / (F(1, 2) * T ** 2) == F(1, 4)

# --- Parca 6: devre kurma, 12 V; 6 kOhm ve 2 kOhm
Vb = F(12)
assert Vb / 6 == 2 and Vb / 2 == 6
def i6(t):                                                  # mA, t s; bataryadan cekilen
    if 1 <= t < 3: return Vb / 6                            # yalniz 1. anahtar kapali
    if 3 <= t < 4: return Vb / 2                            # yalniz 2. anahtar kapali
    return F(0)
assert [i6(F(x)) for x in (F(1,2), 2, F(7,2), 5)] == [0, 2, 6, 0]
# acik anahtar gerilimi: dirençten akim yok -> KVL: 12 - 0 = 12 V
assert Vb - 6 * 0 == 12 and Vb - 2 * 0 == 12
assert (3 - 1) * 2 == 4 and (4 - 3) * 6 == 6 and 4 + 6 == 10
assert sayisal(i6, 0, 5, 5000) == 10
assert F(12, 2) == 6 and F(12, 6) == 2          # R = v / i: 12 V / 2 mA = 6 kOhm; 12 V / 6 mA = 2 kOhm
# Parca 5 Bolum 1 baglantisi: int_0^3 4t dt = 4 x 9 / 2 = 18 mC
assert F(4 * 3**2, 2) == 18 == 2 * 9
assert sayisal(lambda t: 4 * t, 0, 3, 3000) == 18
# Parca 5 ortalama: 18 uC / 8 ms = 2,25 mA (hicbir aralikta sabit degil)
assert F(18, 8) == F(225, 100) and all(i5(F(k, 10)) != F(225, 100) or k < 20 for k in range(80))

assert 2 * (-2) == -4                                        # P5 negatif alan (-2 mA x 2 s)
# Parca 2 bagimsiz: sensor akiminin 1 s'deki sayisal integrali (nC) = 24 990 nC
assert sayisal(i_sensor, 0, 1000, 1000) == 24990
# Parca 6 artis: 6 mA / 2 ms = 3 mA/ms
assert F(6, 2) == 3
# Parca 4 buton + 10 kOhm cekme direnci, 3,3 V (icerik.md 7-3)
Vdd, Rp = F(33, 10), F(10)
assert Rp * 0 == 0 and Vdd - Rp * 0 == Vdd                  # buton acik: direnc 0 V, giris 3,3 V, buton uclari 3,3 V
assert Vdd / Rp == F(33, 100)                               # buton kapali: 0,33 mA, giris 0 V

# --- Yorum sorusu: 2 s x 5 mA + 1 s x (-3 mA) = 7 mC
assert 2 * 5 + 1 * (-3) == 7
print("Sayisal kontroller: tamam (P2: 24,99 uC -> ~25 uA, 9000 h = 375 gun, tepe ile 22,5 h = 400 kat; buton 0,33 mA; q(5 ms)=24 uC, q(8 ms)=18 uC, q(1 ms)=1,5 uC; devre 2 ve 6 mA, 10 mC; yorum sorusu 7 mC)")

# --- Seslendirme metni
md = pathlib.Path(__file__).with_name("metin.md").read_text()
parcalar = re.findall(r"## \[PARÇA (\d)\].*?```\n(.*?)```", md, re.S)
assert len(parcalar) == 8
toplam = 0
for n, metin in parcalar:
    k = len(metin.split()); toplam += k
    metin = re.sub(r"\[SELAM[^\n]*\]\n", "", metin)          # selam etiketi seslendirilmez
    kotu = re.findall(r"[0-9=+/()\[\]%·×Δµ<>*-]", metin)     # kesme isareti serbest (Ders Bir'in)
    print(f"Parca {n}: {k} kelime, ~{k/2.6/60:.2f} dk, yasak karakter: {kotu}")
    assert not kotu, n
    assert not re.search(r"(^|[.!?]\s+)İ\b", metin)
    # "de te" yalniz cumle basinda veya islem sozcugunden sonra (inceleme B5)
    for m in re.finditer(r"(\S+)\s+de te\b", metin):
        assert m.group(1).lower().strip(",") in ("eşittir", "bölü", "çarpı"), (n, m.group(0))
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.6 / 60, 2), "dk; +125 sn (Bolum 1 olcumu: kart, abone, sessizlik, bitis) ->",
      round((toplam / 2.6 + 125) / 60, 2), "dk")
assert 1800 <= toplam <= 2330 and 13 <= (toplam / 2.6 + 125) / 60 <= 17
print("TAMAM")
