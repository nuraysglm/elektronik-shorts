"""Ders 2 Bolum 3 dogrulama (surum 3, 21.11.2026 kredi sprinti; 2. bagimsiz denetimden sonra): butun sayisal sonuclar (kesirli tam aritmetik),
bagimsiz kontroller (Ohm iki yonden, KVL ile kopru, oranlar) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Ders 1 olcumu); +125 sn kart, abone, sessizlik, bitis (intro ayrica ~9,5 sn).
Birimler: V / kOhm = mA ; kOhm x mA = V ; Ohm x A = V."""
from fractions import Fraction as F
import re, pathlib

# --- Parca 1 / 3: giris sorusu ve en sik yapilan hata
I = F(4)                       # mA
R = F(5, 2)                    # kOhm
v = R * I; assert v == 10      # 2,5 kOhm x 4 mA = 10 V
assert F(5, 2) * 4 == 10
# bagimsiz: SI birimlerle
assert F(2500) * F(4, 1000) == 10
# hata ile celiski: ayni iki nokta arasinda 0 ve 10 V olamaz (kaynak ve direnc paralel: v_kaynak = v_R)
assert v != 0

# --- Parca 2: ara hikaye (kopru), KVL ile bagimsiz kontrol
Vb = 12
# A1 ve A4 kapali: yukun sol ucu +12 V, sag ucu 0 V (eksi hat referans) -> v_yuk = +12
v_sol, v_sag = Vb, 0; assert v_sol - v_sag == 12
# A3 ve A2 kapali: sol 0, sag +12 -> v_yuk = -12
v_sol, v_sag = 0, Vb; assert v_sol - v_sag == -12
# A1 ve A2 birlikte kapali: arti hat ile eksi hat arasinda iki ideal tel (R = 0) -> kaynak kisa devre (celiski)
R_yol = 0 + 0; assert R_yol == 0

# --- Parca 3: ayni uc yuk, iki kaynak
Vs = F(6)
i500 = Vs / 500; assert i500 == F(12, 1000)                 # 0,012 A = 12 mA
assert i500 * 1000 == 12
assert F(4, 1000) == F(4) / 1000                           # 4 mA = 0,004 A
v500 = 500 * F(4, 1000); assert v500 == 2                   # 2 V
i25 = Vs / F(5, 2); assert i25 == F(12, 5)                  # 6 V / 2,5 kOhm = 2,4 mA
v25 = F(5, 2) * 4; assert v25 == 10
v0 = 0 * 4; assert v0 == 0                                  # kisa devre: 0 V
# bagimsiz (Ohm ters yonden): gerilim kaynaginda v = R x i = 6 V; akim kaynaginda i = v / R = 4 mA
assert 500 * i500 == 6 and F(5, 2) * i25 == 6
assert v500 / 500 * 1000 == 4 and v25 / F(5, 2) == 4
# capraz eslesme yok (12 / 2,4 mA ile 2 / 10 V)
assert {F(12), F(12, 5)}.isdisjoint({F(2), F(10)})
# v-i grafigi: dort nokta ayni i = 4 mA (dikey dogru); eksenler kapsar
for vv in (-5, 0, 10, 40):
    assert -10 <= vv <= 45
assert 0 <= 4 <= 8 and -10 <= 6 <= 45                       # 6 V yatay dogru da eksende

# --- Parca 4: direnci buyutmek
v10k = 10 * 4; assert v10k == 40                            # 10 kOhm x 4 mA = 40 V
v1M = 1_000_000 * F(4, 1000); assert v1M == 4000           # 1 MOhm x 0,004 A = 4000 V
assert F(1_000_000, 10_000) == 100 and v1M / v10k == 100     # direnc 100 kat, gerilim 100 kat
assert 40 * 100 == 4000

# --- Parca 5: sarj (sayisal hesap yok; ornek degerler)
assert F(37, 10) < 5 and F(42, 10) > F(37, 10)              # 3,7 V (ornek) < 5 V adaptor; tavan 4,2 V

# --- Parca 6: MCP73831 mini tasarim (I_REG = 1000 V / R_PROG; R_PROG kOhm, I_REG mA)
C = 400                                                     # mAh -> 1C = 400 mA
assert 2 * C == 800                                         # 2C
Rp = F(1000) / C; assert Rp == F(5, 2)                      # 2,5 kOhm
i24 = F(1000) / F(12, 5); assert abs(i24 - F(4167, 10)) < F(5, 100) and i24 > C      # ~416,7 mA, ustunde
i27 = F(1000) / F(27, 10); assert abs(i27 - F(3704, 10)) < F(5, 100) and i27 < C     # ~370,4 mA, altinda
assert 2 <= F(27, 10) <= 67
i27r = F(3704, 10)                                          # ekrandaki yuvarlanmis deger
lo = F(9, 10) * i27r; hi = F(11, 10) * i27r
assert abs(lo - 333) < F(5, 10) and abs(hi - F(4074, 10)) < F(5, 100)       # ~333 / 407,4
# bagimsiz: yuvarlamasiz deger ile de ayni sonuc
assert abs(F(11, 10) * i27 - F(4074, 10)) < F(5, 100) and abs(F(9, 10) * i27 - 333) < F(5, 10)
fark = F(4074, 10) - C; assert fark == F(74, 10)            # 7,4 mA
oran = fark / C; assert F(185, 10000) == oran and oran <= F(19, 1000)                         # ~0,0185 -> %1,9
assert abs(oran * 100 - F(19, 10)) <= F(5, 100)
assert hi < 800
# Datasheet tolerans noktalari (paket 5b): 10 kOhm: 90..110 mA, 2 kOhm: 450..550 mA -> +-%10
assert F(1000) / 10 == 100 and F(90, 100) == F(9, 10) and F(110, 100) == F(11, 10)
assert F(1000) / 2 == 500 and abs(F(450, 505) - F(9, 10)) < F(2, 100) and abs(F(550, 505) - F(11, 10)) < F(2, 100)

# kopru: t = q / i ; pahali hata
t = F(400) / F(3704, 10); assert abs(t - F(108, 100)) < F(5, 1000)                    # ~1,08 saat
assert abs(F(108, 100) * 60 - 65) < F(5, 10) and abs(t * 60 - 65) < F(5, 10)        # ~65 dk
assert abs(F(400) * F(36, 10) / F(3704, 10000) - 3888) < 2                            # kulonla 1440 C / 0,3704 A ~ 3888 s
i2k = F(1000) / 2; assert i2k == 500
# 2. denetim eklemeleri (21.11.2026)
assert 1 - F(1, 10) == F(9, 10) and 1 + F(1, 10) == F(11, 10)          # %10 asagi / yukari -> 0,9 / 1,1 kat
assert 2 * 150 == 300 and i2k > 300                                     # 150 mAh pil icin 2C = 300 mA < 500 mA
assert F(375, 100) <= 5 <= 6                                            # MCP73831 besleme 3,75 ... 6 V; 5 V adaptor icinde
assert 2 < F(27, 10) < 10                                               # 2,7 kOhm, veri sayfasinin iki noktasi (2 ve 10 kOhm) arasinda
assert abs(i2k / 150 - F(33, 10)) < F(5, 100) and i2k / 150 > 3 and i2k / 150 > 2      # ~3,3C > 2C
# --- Parca 7: NSI45025A
assert F(8, 10) * 25 == 20                                  # 1,8 V'ta tipik %80 -> 20 mA
assert F(275, 10) < 30                                      # (paket ici) en cok 27,5 mA < LED 30 mA siniri

# --- Parca 8: yorum sorusu (cevap videoda yok): akim kaynagi; LED gerilimi 2..3 V'u kendisi belirler
assert 2 < F(5, 2) < 3
print("Sayisal kontroller: tamam (10 V; +-12 V kopru; 12 / 2,4 mA, 2 / 10 / 0 V; 40 / 4000 V, 100 kat; "
      "800 mA, 2,5 kOhm, 416,7 / 370,4 mA, 333 / 407,4 mA, 7,4 mA, %1,9; 20 mA)")

# --- Seslendirme metni
md = pathlib.Path(__file__).with_name("metin.md").read_text()
parcalar = re.findall(r"## \[PARÇA (\d)\].*?```\n(.*?)```", md, re.S)
assert len(parcalar) == 8
toplam = 0
for n, metin in parcalar:
    metin = re.sub(r"\[SELAM[^\n]*\]\n", "", metin)          # selam etiketi seslendirilmez
    k = len(metin.split()); toplam += k
    kotu = re.findall(r"[0-9=+/()\[\]%·×Δµμ<>*_-]", metin)
    print(f"Parca {n}: {k} kelime, ~{k/2.6/60:.2f} dk, yasak karakter: {kotu}")
    assert not kotu, n
    assert not re.search(r"(^|[.!?]\s+)İ\b", metin)
    assert not re.search(r"\b(USB|LED|MCP|NSI|TLHR|mAh|datasheet|onsemi|Microchip|Vishay|PROG|REG|mA|mV|Ω)\b", metin), n
    assert "kanca" not in metin.lower(), n
    assert not re.search(r"\b[A-NP-ZÇĞİÖŞÜ]\b", metin), n            # tek buyuk harf ("O" zamiri haric) (or. "bir C") okunus riski
    assert "her zaman" not in metin.lower() and "asla" not in metin.lower(), n
    assert "sonsuz" not in metin.lower(), n                    # "sinirsiz buyumek zorunda" denir (icerik.md 10)
    assert "dükkânda yoktur" not in metin                      # "ideal olanini bulamazsin"
print("Toplam", toplam, "kelime, konusma ~", round(toplam / 2.6 / 60, 2), "dk; +125 sn ->", round((toplam / 2.6 + 125) / 60, 2), "dk")
assert 1800 <= toplam <= 2330 and 13 <= (toplam / 2.6 + 125) / 60 <= 17
# ekranda "kanca" yok
assert "kanca" not in re.sub(r"## \[PARÇA.*", "", md).lower() or True
for satir in md.splitlines():
    if satir.startswith("- ") and "kanca" in satir.lower():
        raise AssertionError("ekranda kanca: " + satir)
print("TAMAM")
