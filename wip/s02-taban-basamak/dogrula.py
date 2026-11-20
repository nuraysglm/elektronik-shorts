"""S2 dogrulama (surum 2): taban ve basamak agirligi, virgulun sagindaki agirliklar.
Mano 4e s. 16-17 (11010.11 = 26.75 ornegiyle ayni yontem; sayilar ozgun)."""
from fractions import Fraction as F

def deger(tam, kesir, r):
    for d in tam + kesir: assert 0 <= d <= r - 1
    n = len(tam)
    v = sum(F(d) * F(r) ** (n - 1 - i) for i, d in enumerate(tam))
    v += sum(F(d) * F(r) ** -(i + 1) for i, d in enumerate(kesir))
    return v

# agirliklar
assert F(2)**0 == 1 and F(2)**1 == 2
assert F(2)**-1 == F(1, 2) == F(5, 10)            # 1 / 2 = 0,5
assert F(2)**-2 == F(1, 2*2) == F(1, 4) == F(25, 100)  # 1 / (2 x 2) = 0,25
assert F(8)**-1 == F(1, 8) == F(125, 1000)        # 1 / 8 = 0,125
assert F(10)**-1 == F(1, 10)

# kanca: (0,1)_2 = 0,5 ; hatali okuma 0,1
assert deger([0], [1], 2) == F(1, 2) != F(1, 10)
# onluk 0,1 = 1/10
assert deger([0], [1], 10) == F(1, 10)
# sekizlik 0,1 = 0,125
assert deger([0], [1], 8) == F(1, 8)

# ana ornek (10,11)_2 = 1x2 + 0x1 + 1x0,5 + 1x0,25 = 2 + 0 + 0,5 + 0,25 = 2,75
terimler = [1*F(2), 0*F(1), 1*F(1, 2), 1*F(1, 4)]
assert terimler == [2, 0, F(1, 2), F(1, 4)]
assert sum(terimler) == F(275, 100) == deger([1, 0], [1, 1], 2)

# virgulden saga her agirlik bir oncekinin 1/taban kati
for r in (2, 8, 10):
    for k in range(0, 4):
        assert F(r) ** -(k + 1) == F(r) ** -k / r

# ilk yorum: (0,11)_2 = 0,5 + 0,25 = 0,75
assert deger([0], [1, 1], 2) == F(1, 2) + F(1, 4) == F(75, 100)
print("TAMAM: (0,1)_2 = 0,5 ; (0,1)_8 = 0,125 ; (10,11)_2 = 2,75 ; ilk yorum (0,11)_2 = 0,75")
