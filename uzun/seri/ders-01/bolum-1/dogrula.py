"""Ders 1 Bolum 1 dogrulama: butun sayisal sonuclar (kesirli tam aritmetik)
ve seslendirme metni kontrolleri (kelime sayisi, rakam/simge yok).
Birimler: uC / ms = mA ; mC / s = mA ; uC / s = uA."""
from fractions import Fraction as F
import re, pathlib

# --- Kanca (surum 2): 0-0,5 s saga 5 mC, 0,5-1 s sola 5 mC (duzgun)
qk = lambda t: 10 * t if t <= F(1, 2) else 5 - 10 * (t - F(1, 2))   # mC, t s (net, saga arti)
pencere = lambda a, b: (qk(b) - qk(a)) / (b - a)                     # mC/s = mA
print("Kanca: 0-1 s ->", pencere(F(0), F(1)), "mA; 0,1-0,3 s ->", pencere(F(1,10), F(3,10)),
      "mA; 0,4-0,6 s ->", pencere(F(4,10), F(6,10)), "mA")
assert pencere(F(0), F(1)) == 0 and pencere(F(1,10), F(3,10)) == 10 and pencere(F(4,10), F(6,10)) == 0
assert F(5) / F(1, 2) == 10                                           # 5 mC / 0,5 s = 10 mA
h = F(1, 1000); anl = {pencere(k*h, k*h + h) for k in range(1000)}
assert anl == {10, -10}                                               # akim hicbir an sifir degil

# --- Ornek 1
seg = [(F(0), F(1), F(5)), (F(1), F(4), F(3))]   # (bas ms, son ms, yuk uC)
akimlar = [q / (b - a) for a, b, q in seg]
ort = sum(q for *_, q in seg) / (seg[-1][1] - seg[0][0])
print("Ornek 1: aralik akimlari", akimlar, "mA; ortalama", ort, "mA")
assert akimlar == [5, 1] and ort == 2 and ort not in akimlar
assert ort * 4 == 8 == sum(i * (b - a) for i, (a, b, _) in zip(akimlar, seg))  # alan = yuk
# bagimsiz: 1 us adimli sayisal integral (yuk dogrusal artar)
qf = lambda t: 5 * t if t <= 1 else 5 + (t - 1)       # uC, t ms
N = 4000; h = F(4, N)
ort2 = (qf(F(4)) - qf(F(0))) / 4
anlik = [(qf(k * h + h) - qf(k * h)) / h for k in range(N)]
assert ort2 == 2 and set(anlik) == {5, 1}

# --- Ornek 2: q(t) = 2 t^2 mC, t s
q = lambda t: 2 * t * t
i_t = lambda t: 4 * t                                   # turev
ort3 = (q(F(3)) - q(F(0))) / 3
print("Ornek 2: q(3) =", q(F(3)), "mC; ortalama", ort3, "mA; i(3) =", i_t(3), "mA")
assert q(F(3)) == 18 and ort3 == 6 and i_t(3) == 12 == 2 * ort3
for dt, beklenen in [(F(1), F(14)), (F(1, 10), F(122, 10)), (F(1, 100), F(1202, 100))]:
    v = (q(3 + dt) - q(F(3))) / dt
    print("  pencere", float(dt), "s ->", float(v), "mA")
    assert v == beklenen == 12 + 2 * dt
assert q(F(4)) == 32
# bagimsiz: merkezi fark turev kontrolu
for t in [F(1), F(2), F(3)]:
    h = F(1, 10**6); assert (q(t + h) - q(t - h)) / (2 * h) == i_t(t)


# --- Ek sayilar (metin genisletmesi)
assert (qf(F(2)) - qf(F(0))) / 2 == 3                # ornek 1: 0-2 ms penceresi 3 mA
assert F(2) / 1 == 2                                  # 2 uC / 1 ms = 2 mA = 2 mC/s
assert 2 * i_t(3) == 24 and 2 * ort3 == 12              # Ohm: 2 kOhm x 12 mA = 24 V; ortalamayla 12 V
for a in [F(1), F(2), F(7, 3)]:                       # q = a t^2: ortalama = anlik / 2
    for t in [F(1), F(3), F(5)]:
        assert (a * t * t) / t == (2 * a * t) / 2
# Ornek 3: q = 6t - t^2 mC
q3 = lambda t: 6 * t - t * t; i3 = lambda t: 6 - 2 * t
assert [q3(F(x)) for x in (0, 1, 3, 4)] == [0, 5, 9, 8]
assert max(q3(F(k, 100)) for k in range(401)) == 9 == q3(F(3))
assert (i3(1), i3(3), i3(4)) == (4, 0, -2) and q3(F(4)) / 4 == 2
for t in [F(1), F(3), F(4)]:
    h = F(1, 10**6); assert (q3(t + h) - q3(t - h)) / (2 * h) == i3(t)
assert i3(0) == 6 == max(i3(F(k,100)) for k in range(401)) and q3(F(0)) == 0
assert F(6, 4) == F(3, 2) and i_t(F(3, 2)) == ort3            # ortalama deger t = 1,5 s'de
assert q3(F(5,2)) == q3(F(7,2)) == F(875,100) < 9
assert qf(F(1,2)) / F(1,2) == 5                         # ornek 1: 0-0,5 ms 2,5 uC -> 5 mA
# Yorum sorusu: q = 4t - t^2 -> i = 4 - 2t = 0 -> t = 2 s
assert 4 - 2 * 2 == 0
print("Ornek 3: q(3) = 9 mC (en buyuk), i(1)=4, i(3)=0, i(4)=-2 mA; 0-4 s ortalama 2 mA; yorum sorusu t = 2 s")

# --- Ornek 2 surum 3 (is emri 18.11): ekranda ve seste gosterilen her ara adim
assert 3**2 == 9 and 2 * 9 == 18                                    # q(3) = 2 x 3^2 = 2 x 9 = 18 mC
assert F(18) / 3 == 6 and 2 * 2 == 4 and 4 * 3 == 12 and F(12, 6) == 2 and F(0 + 12, 2) == 6
ara = [(F(4), 16, 32, 14, F(1), 14), (F(31,10), F(961,100), F(1922,100), F(122,100), F(1,10), F(122,10)),
       (F(301,100), F(90601,10000), F(181202,10000), F(1202,10000), F(1,100), F(1202,100))]
for son, kare, qson, dq, dt, akim in ara:
    assert son * son == kare and 2 * kare == qson == q(son) and qson - 18 == dq and dq / dt == akim
    assert son - 3 == dt
assert F(6, 4) == F(3, 2) and 4 * F(3, 2) == 6 and F(18, 3) == 6    # 4t = 6 -> t = 1,5 s; kesen 0-3 s egimi 6
assert 2 * 12 == 24 and 2 * 6 == 12 and F(12, 24) == F(1, 2)        # kOhm x mA = V
print("Ornek 2 ara adimlar: tamam")

# --- Seslendirme metni
md = pathlib.Path(__file__).with_name("metin.md").read_text()
parcalar = re.findall(r"## \[PARÇA (\d)\].*?```\n(.*?)```", md, re.S)
toplam = 0
for n, metin in parcalar:
    k = len(metin.split()); toplam += k
    kotu = re.findall(r"[0-9=+/()\[\]%·×Δµ<>*-]", metin)
    print(f"Parca {n}: {k} kelime, ~{k/2.35/60:.2f} dk, yasak karakter: {kotu}")
    assert not kotu, n
    assert not re.search(r"(^|[.!?]\s+)İ\b", metin)
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.35 / 60, 2), "dk; +4 sn kart +20 sn bitis ->",
      round((toplam / 2.35 + 24) / 60, 2), "dk")
assert 1800 <= toplam <= 2200 and 13 <= (toplam / 2.35 + 24) / 60 <= 17
print("TAMAM")
