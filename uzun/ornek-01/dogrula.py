"""uzun/ornek-01 dogrulama: dugum gerilimleri sorusu (ozgun tasarim).
Birimler: volt, kiloohm, miliamper (V = kOhm x mA), guc miliwatt.
Devre: alt hat referans (0 V).
  Vs=10 V: alt hat -> dugum A (arti uc A'da)
  R1=1k: A - dugum 1 | R2=2k: dugum 1 - alt hat | R3=1k: dugum 1 - dugum 2
  R4=1k: dugum 2 - alt hat
  Is=4 mA: alt hattan dugum 3'e dogru; R5=3k: dugum 3 - dugum 2 (kaynakla seri)
"""
from fractions import Fraction as F

def gauss(A, b):
    n = len(A); M = [[F(x) for x in r] + [F(y)] for r, y in zip(A, b)]
    for c in range(n):
        p = next(r for r in range(c, n) if M[r][c] != 0); M[c], M[p] = M[p], M[c]
        M[c] = [x / M[c][c] for x in M[c]]
        for r in range(n):
            if r != c: M[r] = [x - M[r][c] * y for x, y in zip(M[r], M[c])]
    return [M[i][n] for i in range(n)]

Vs, R1, R2, R3, R4, Is = F(10), F(1), F(2), F(1), F(1), F(4)

def videodaki(R5=F(3)):
    # (V1-10)/R1 + V1/R2 + (V1-V2)/R3 = 0 ; (V2-V1)/R3 + V2/R4 = Is
    return gauss([[1/R1 + 1/R2 + 1/R3, -1/R3], [-1/R3, 1/R3 + 1/R4]], [Vs/R1, Is])

def tam_mna(R5=F(3)):
    # bilinmeyenler: VA, V1, V2, V3, Ivs (gerilim kaynagindan A'ya giren akim)
    A = [[1/R1, -1/R1, 0, 0, -1],                      # KCL A
         [-1/R1, 1/R1 + 1/R2 + 1/R3, -1/R3, 0, 0],     # KCL 1
         [0, -1/R3, 1/R3 + 1/R4 + 1/R5, -1/R5, 0],     # KCL 2
         [0, 0, -1/R5, 1/R5, 0],                       # KCL 3
         [1, 0, 0, 0, 0]]                              # VA = Vs
    return gauss(A, [0, 0, 0, Is, Vs])

V1, V2 = videodaki()
print("Yontem 1 (videodaki iki denklem): V1 =", V1, "V, V2 =", V2, "V")
print("  sadelesmis: 5*V1-2*V2 =", 5*V1 - 2*V2, " ; -V1+2*V2 =", -V1 + 2*V2)
VA, W1, W2, V3, Ivs = tam_mna()
print("Yontem 2 (tam MNA, 5 bilinmeyen): VA,V1,V2,V3,Ivs =", VA, W1, W2, V3, Ivs)
assert (V1, V2) == (W1, W2) == (6, 5)

i1 = (VA - V1)/R1; i2 = V1/R2; i3 = (V1 - V2)/R3; i4 = V2/R4
print("Kol akimlari (mA): R1 (A->1) =", i1, " R2 (1->alt) =", i2, " R3 (1->2) =", i3, " R4 (2->alt) =", i4, " R5 =", Is)
print("KCL dugum 1 (giren-cikan):", i1 - i2 - i3)
print("KCL dugum 2:", i3 + Is - i4)
print("KCL dugum A:", Ivs - i1)
print("KCL alt hat (referans):", i2 + i4 - Ivs - Is)
assert i1 - i2 - i3 == 0 and i3 + Is - i4 == 0 and i2 + i4 - Ivs - Is == 0
print("Akim kaynaginin uclarindaki gerilim V3 =", V3, "V ( = V2 + Is*R5 =", V2 + Is*3, ")")
Pk = Vs*Ivs + V3*Is
Pr = i1**2*R1 + i2**2*R2 + i3**2*R3 + i4**2*R4 + Is**2*3
print("Guc (mW): gerilim kaynagi =", Vs*Ivs, " akim kaynagi =", V3*Is, " toplam verilen =", Pk)
print("Guc (mW): R1..R5 =", i1**2*R1, i2**2*R2, i3**2*R3, i4**2*R4, Is**2*3, " toplam harcanan =", Pr)
assert Pk == Pr
print("R5 taramasi (tam MNA): ")
for r in (F(1,1000), F(1), F(3), F(300), F(10**6)):
    s = tam_mna(r); print("  R5 =", float(r), "k ->  V1 =", s[1], " V2 =", s[2], " V3 =", s[3])
    assert (s[1], s[2]) == (6, 5)
# bilinen yanlis: dugum 2 denklemine V2/R5 terimi eklemek
y = gauss([[1/R1 + 1/R2 + 1/R3, -1/R3], [-1/R3, 1/R3 + 1/R4 + F(1,3)]], [Vs/R1, Is])
print("YANLIS denklem (V2/3k eklenirse): V1 =", y[0], "=", float(y[0]), " V2 =", y[1], "=", float(y[1]))
print("TUM KONTROLLER GECTI")
