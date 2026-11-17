"""wip/009-sesli-test dogrulama: KVL isaret kurallari (ozgun ornek).
Devre: tek dongu. Vs = 12 V kaynak; ona seri R1 ve R2.
Dolasma: kaynagin eksi ucundan basla -> kaynak (eksiden artiya) -> R1 -> R2 -> baslangic.
R1 ve R2'ye arti ucundan girilir (isaretler: arti ucu kaynagin arti ucu tarafinda).
Bilinen: V1 = 5 V (R1, arti ucu giris ucu). Bilinmeyen: V2 (R2, arti ucu giris ucu).
Kural 1 (Razavi Ders 4 [21:39], [23:43]): artidan eksiye gecilirse -, eksiden artiya gecilirse +.
Kural 2 (Razavi Ders 4 [24:53]-[25:27], [26:17]): elemana girilen uctaki isaret yazilir.
"""
from fractions import Fraction as F
from itertools import product

Vs, V1 = F(12), F(5)
# her eleman: (ad, deger veya None, giris ucunun isareti)
ELEMANLAR = [("kaynak", Vs, "-"), ("R1", V1, "+"), ("R2", None, "+")]

def katsayi(giris, kural):
    # giris ucu '+' ise artidan eksiye gecilir; '-' ise eksiden artiya
    if kural == 1:
        return F(-1) if giris == "+" else F(1)
    return F(1) if giris == "+" else F(-1)

def coz(kurallar):
    """kurallar: her eleman icin 1 veya 2. Toplam = 0 denkleminden V2 cozulur."""
    sabit, kV2 = F(0), F(0)
    for (ad, deger, giris), k in zip(ELEMANLAR, kurallar):
        c = katsayi(giris, k)
        if deger is None: kV2 += c
        else: sabit += c * deger
    return -sabit / kV2, (sabit, kV2)

v_k1, d1 = coz((1, 1, 1)); v_k2, d2 = coz((2, 2, 2)); v_kar, d3 = coz((1, 2, 2))
print("Kural 1: +12 - 5 - V2 = 0  -> V2 =", v_k1, "V   (sabit, V2 katsayisi) =", d1)
print("Kural 2: -12 + 5 + V2 = 0  -> V2 =", v_k2, "V   (sabit, V2 katsayisi) =", d2)
print("Karisik (kaynak kural 1, direncler kural 2): +12 + 5 + V2 = 0 -> V2 =", v_kar, "V")
assert v_k1 == v_k2 == 7 and v_kar == -17
assert d2 == (-d1[0], -d1[1]), "kural 2 denklemi kural 1'in (-1) kati olmali"
print("Kural 2 denklemi = (-1) x kural 1 denklemi: dogru")

print("Butun 8 kural atamasi (kaynak, R1, R2):")
for k in product((1, 2), repeat=3):
    v, _ = coz(k)
    tutarli = len(set(k)) == 1
    print("  ", k, "-> V2 =", v, "V", "(tutarli)" if tutarli else "(karisik)")
    assert (v == 7) == tutarli, "bu ornekte yalnizca tutarli atamalar dogru sonucu verir"

# Fiziksel kontrol: akim ve direncler secilip KVL ve Ohm yasasi ile ayni sonuc.
# R degerleri videoda yok; yalnizca tutarlilik icin (I = 1 mA -> R1 = 5 kOhm, R2 = 7 kOhm).
for I in (F(1), F(2), F(1, 2)):           # mA
    R1 = V1 / I; R2 = (Vs - V1) / I        # kOhm
    assert Vs == I * R1 + I * R2           # Razavi Ders 4 [30:08]-[30:50] (kaynak = seri gerilimler toplami)
    assert I * R2 == 7
print("Fiziksel kontrol (I = 1; 2; 0,5 mA icin R1, R2 secildi): Vs = I*R1 + I*R2, V2 = 7 V")

# Kart/aciklama: dongu kapanmadan toplam sifir degil (Razavi [19:35]-[19:50])
yarim = katsayi("-", 1) * Vs + katsayi("+", 1) * V1   # R2'ye gelmeden
print("Dongu kapanmadan (kaynak + R1, kural 1) toplam =", yarim, "V (sifir degil)")
assert yarim != 0

# Ilk yorum sorusu: 9 V kaynak, R1'de 4 V
Vs2, V12 = F(9), F(4)
dogru = Vs2 - V12; karisik = -(Vs2 + V12)
print("Ilk yorum sorusu: dogru V2 =", dogru, "V; karisik kuralla V2 =", karisik, "V")
assert (dogru, karisik) == (5, -13)
print("TUM KONTROLLER GECTI")
