"""uzun/ornek-02 dogrulama: cevre akimlari sorusu (ozgun tasarim).
Birimler: volt, kiloohm, miliamper (V = kOhm x mA), guc miliwatt.
Devre: alt hat kesintisiz tel.
  Va = 24 V : sol kol, arti uc ustte (alt hat -> A)
  R1 = 6k   : ust tel, A - M (orta dugum)
  R2 = 3k   : orta kol, M - alt hat (ortak direnc)
  R3 = 2k   : ust tel, M - B
  R4 = 4k   : sag kol, B - alt hat
Cevre akimlari i1 (sol), i2 (sag), ikisi de saat yonunde.
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

Va, R1, R2, R3, R4 = F(24), F(6), F(3), F(2), F(4)

# --- Yontem 1: videodaki iki cevre denklemi (kazanc = dusumler toplami)
# sol:  R1*i1 + R2*(i1 - i2) = Va
# sag:  R2*(i2 - i1) + R3*i2 + R4*i2 = 0
i1, i2 = gauss([[R1 + R2, -R2], [-R2, R2 + R3 + R4]], [Va, 0])
print("Yontem 1 (cevre denklemleri): i1 =", i1, "mA, i2 =", i2, "mA")
# sadelesmis bicimler (3 kOhm'a bolunmus; kOhm x mA / kOhm = mA)
print("  sol / 3k: 3*i1 - i2 =", 3*i1 - i2, "mA (beklenen", Va / 3, ")")
print("  sag / 3k: -i1 + 3*i2 =", -i1 + 3*i2, "mA (beklenen 0) -> i1 = 3*i2:", i1 == 3*i2)
print("  yerine koyma: 8*i2 =", 8*i2, "mA")
assert (i1, i2) == (3, 1) and 3*i1 - i2 == Va / 3 == 8 and -i1 + 3*i2 == 0 and 8*i2 == 8

# --- Yontem 2 (bagimsiz): tam dugum sistemi (MNA), 4 bilinmeyen
# VA, VM, VB, Ia (Va kaynagindan A'ya giren akim)
A = [[1/R1, -1/R1, 0, -1],                      # KCL A
     [-1/R1, 1/R1 + 1/R2 + 1/R3, -1/R3, 0],     # KCL M
     [0, -1/R3, 1/R3 + 1/R4, 0],                # KCL B
     [1, 0, 0, 0]]                              # VA = Va
VA, VM, VB, Ia = gauss(A, [0, 0, 0, Va])
print("Yontem 2 (tam MNA): VA, VM, VB =", VA, VM, VB, "V ; Ia =", Ia, "mA")
iR1 = (VA - VM) / R1; iR2 = VM / R2; iR3 = (VM - VB) / R3; iR4 = VB / R4
print("Kol akimlari (mA): R1 (A->M) =", iR1, " R2 (M->alt) =", iR2, " R3 (M->B) =", iR3, " R4 (B->alt) =", iR4)
assert iR1 == i1 == Ia and iR3 == iR4 == i2 and iR2 == i1 - i2 and VM == 6 and VB == 4

# --- KCL ve KVL kontrolleri
print("KCL M (giren - cikan):", iR1 - iR2 - iR3, " KCL B:", iR3 - iR4, " KCL alt hat:", iR2 + iR4 - Ia)
assert iR1 - iR2 - iR3 == 0 and iR3 - iR4 == 0 and iR2 + iR4 - Ia == 0
kvl_sol = Va - R1*i1 - R2*(i1 - i2)
kvl_sag = -R2*(i2 - i1) - R3*i2 - R4*i2
kvl_dis = Va - R1*i1 - R3*i2 - R4*i2
print("KVL sol cevre:", kvl_sol, " sag cevre:", kvl_sag, " dis halka:", kvl_dis)
assert kvl_sol == kvl_sag == kvl_dis == 0

# --- Kontrol cumleleri (videodaki)
print("Ortak direnc: akim", i1 - i2, "mA asagi, gerilim", (i1 - i2)*R2, "V")
print("Soldan:", Va, "-", i1*R1, "=", Va - i1*R1, "V ; Sagdan:", i2*R3, "+", i2*R4, "=", i2*R3 + i2*R4, "V")
assert (i1 - i2)*R2 == Va - i1*R1 == i2*R3 + i2*R4 == 6 and i1*R1 == 18 and i2*R3 == 2 and i2*R4 == 4

# --- Guc dengesi
P_Va = Va * i1
P_R = [i1**2*R1, (i1 - i2)**2*R2, i2**2*R3, i2**2*R4]
print("Guc (mW): kaynak verir", P_Va, "; direncler", *P_R, "toplam", sum(P_R))
assert P_Va == sum(P_R) == 72

# --- Yon secimi kontrolu (kuralin kosulu)
# ikisi de saat yonunun tersi: j = -i beklenir; kural ayni (kendi - komsu)
j1, j2 = gauss([[R1 + R2, -R2], [-R2, R2 + R3 + R4]], [-Va, 0])
print("Ikisi de saat yonu tersi: j1 =", j1, " j2 =", j2)
assert (j1, j2) == (-i1, -i2)
# karisik: sol saat yonunde (k1), sag saat yonu tersi (k2): ortak direncte akimlar ayni yonde -> toplanir
# sol: R1*k1 + R2*(k1 + k2) = Va ; sag (saat tersi dolasim): R2*(k2 + k1) + (R3 + R4)*k2 = 0
k1, k2 = gauss([[R1 + R2, R2], [R2, R2 + R3 + R4]], [Va, 0])
print("Karisik yonler: k1 =", k1, " k2 =", k2, " (ortak direncte k1 + k2 =", k1 + k2, ")")
assert k1 == i1 and k2 == -i2 and k1 + k2 == i1 - i2
# karisik yonde 'kendi - komsu' kurali uygulanirsa sonuc degisir (kosulun gerekli oldugunu gosterir)
mk1, mk2 = gauss([[R1 + R2, -R2], [R2, -(R2 + R3 + R4)]], [Va, 0])  # sag denklemde R2*(k2 - k1) yazilmis hali
print("Karisik yonde 'kendi - komsu' yazilirsa:", mk1, mk2, "-> dogru (k1, k2) =", (k1, k2), ":", (mk1, mk2) == (k1, k2))
assert (mk1, mk2) != (k1, k2)

# --- Bilinen yanlis: sag cevrede birinci denklemdeki farki (i1 - i2) aynen kopyalamak
# sag (yanlis): R2*(i1 - i2) + R3*i2 + R4*i2 = 0
w1, w2 = gauss([[R1 + R2, -R2], [R2, R3 + R4 - R2]], [Va, 0])
print("YANLIS (sag cevrede i1 - i2 kopyalanirsa): i1 =", w1, " i2 =", w2)
assert (w1, w2) == (2, -2)
print("  yanlis sonucla KVL sag cevre:", -R2*(w2 - w1) - R3*w2 - R4*w2, "(sifir degil -> yanlis)")
assert -R2*(w2 - w1) - R3*w2 - R4*w2 != 0
print("TUM KONTROLLER GECTI")
