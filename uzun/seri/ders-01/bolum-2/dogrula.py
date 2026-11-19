"""Ders 1 Bolum 2 dogrulama: butun sayisal sonuclar (kesirli tam aritmetik),
bagimsiz kontroller (sayisal integral, KVL/Ohm) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Bolum 1 olcumu: 2050 kelime -> 788 sn ses); +125 sn kart, abone, sessizlik, bitis (Bolum 1: 913 - 788).
Birimler: uC / ms = mA ; mA x ms = uC ; mA x s = mC ; V / kOhm = mA."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 2: referans yonu
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
# Parca 3 pil: acik uclar, i = 0, 9 V; Parca 4 Bolum 1 baglantisi: int_0^3 4t dt = 4 x 9 / 2 = 18 mC
assert F(4 * 3**2, 2) == 18 == 2 * 9
assert sayisal(lambda t: 4 * t, 0, 3, 3000) == 18
# Parca 5 ortalama: 18 uC / 8 ms = 2,25 mA (hicbir aralikta sabit degil)
assert F(18, 8) == F(225, 100) and all(i5(F(k, 10)) != F(225, 100) or k < 20 for k in range(80))

assert 2 * (-2) == -4 and F(4, 2) == 2 and F(12, 2) == 6       # P4 negatif alan; P6 alternatif cozum
# Parca 5 q(t) grafigi: 2-5 ms egimi 18 uC / 3 ms = 6 mA; q = 1,5 t^2 (0-2 ms)
assert F(18, 3) == 6 and F(3, 2) * 2**2 == 6 and sayisal(i5, 0, 2, 4) == F(3,2)*4

# --- Yorum sorusu: 2 s x 5 mA + 1 s x (-3 mA) = 7 mC
assert 2 * 5 + 1 * (-3) == 7
print("Sayisal kontroller: tamam (q(5 ms)=24 uC, q(8 ms)=18 uC, q(1 ms)=1,5 uC; devre 2 ve 6 mA, 10 mC; yorum sorusu 7 mC)")

# --- Seslendirme metni
md = pathlib.Path(__file__).with_name("metin.md").read_text()
parcalar = re.findall(r"## \[PARÇA (\d)\].*?```\n(.*?)```", md, re.S)
assert len(parcalar) == 7
toplam = 0
for n, metin in parcalar:
    k = len(metin.split()); toplam += k
    kotu = re.findall(r"[0-9=+/()\[\]%·×Δµ<>*'’-]", metin)
    print(f"Parca {n}: {k} kelime, ~{k/2.6/60:.2f} dk, yasak karakter: {kotu}")
    assert not kotu, n
    assert not re.search(r"(^|[.!?]\s+)İ\b", metin)
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.6 / 60, 2), "dk; +125 sn (Bolum 1 olcumu: kart, abone, sessizlik, bitis) ->",
      round((toplam / 2.6 + 125) / 60, 2), "dk")
assert 1800 <= toplam <= 2200 and 13 <= (toplam / 2.6 + 125) / 60 <= 17
print("TAMAM")
