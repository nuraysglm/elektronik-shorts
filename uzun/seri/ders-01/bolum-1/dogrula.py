"""Ders 1 Bolum 1 dogrulama: butun sayisal sonuclar (kesirli tam aritmetik)
ve seslendirme metni kontrolleri (kelime sayisi, rakam/simge yok).
Birimler: uC / ms = mA ; mC / s = mA ; uC / s = uA."""
from fractions import Fraction as F
import re, pathlib

# --- Kanca: her saniyenin 2 ms'sinde calisan devre, her ms'de 10 uC
dq_uC = 10 * 2                      # 1 s pencerede gecen yuk, uC
i_pencere_uA = F(dq_uC, 1)          # uC / 1 s = uA
i_gercek_mA = F(10, 1)              # 10 uC / 1 ms = 10 mA
oran = i_gercek_mA * 1000 / i_pencere_uA
print("Kanca: 1 s pencere ->", i_pencere_uA, "uA; calisirken", i_gercek_mA, "mA; oran", oran)
assert dq_uC == 20 and i_pencere_uA == 20 and oran == 500
# bagimsiz: SI birimlerinde
assert F(20, 10**6) / 1 == F(20, 10**6) and F(10, 10**6) / F(1, 1000) == F(10, 1000)

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
assert F(10, 2) == 5                                  # kayik 1 ms pencere: 5 uC / 1 ms = 5 mA
assert (qf(F(2)) - qf(F(0))) / 2 == 3                # ornek 1: 0-2 ms penceresi 3 mA
assert F(2) / 1 == 2                                  # 2 uC / 1 ms = 2 mA = 2 mC/s
assert 2 * 3 == 6                                     # Ohm: 2 kOhm x 3 mA = 6 V
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
# Yorum sorusu: q = 4t - t^2 -> i = 4 - 2t = 0 -> t = 2 s
assert 4 - 2 * 2 == 0
print("Ornek 3: q(3) = 9 mC (en buyuk), i(1)=4, i(3)=0, i(4)=-2 mA; 0-4 s ortalama 2 mA; yorum sorusu t = 2 s")

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
