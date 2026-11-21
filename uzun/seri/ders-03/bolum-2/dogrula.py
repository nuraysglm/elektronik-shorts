"""Ders 3 Bolum 2 dogrulama (surum 1, 21.11.2026 kredi sprinti): butun sayisal sonuclar (kesirli tam aritmetik
ve ekranda gosterilen yuvarlama zinciri), bagimsiz kontroller (SI ile ikinci hesap, oranlar, iki eksen duzeni,
kaynak dogrulari) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Ders 1 olcumu; D2B2, D2B3, D3B1 ile ayni); +125 sn kart, abone, sessizlik, bitis (intro ayrica ~9,5 sn)."""
from fractions import Fraction as F
import math, re, pathlib

m = F(1, 1000); k_ = 1000
def yuv(x, n):                       # ekrandaki yuvarlama (n ondalik)
    return round(float(x), n)

# --- Parca 1 / Parca 5: en sik yapilan hata (2 kOhm; 2 V -> 1 mA; 4 V -> 2 mA; oran 2 kOhm)
R = 2 * k_
assert F(2) / R == 1 * m
assert F(4) / R == 2 * m and F(4) / (2 * m) == R          # dogrusu
assert F(4) / (1 * m) == 4 * k_                            # yanlis sonuc "4 kOhm" (akimi 1 mA sanmak)

# --- Parca 2: ornek 1, iki yonde Ohm yasasi
R1 = F(22, 10) * k_
v1 = R1 * 3 * m; assert v1 == F(66, 10)                    # 2,2 kOhm x 3 mA = 6,6 V
assert F(22, 10) * 3 == F(66, 10)
i1 = F(66, 10) / R1; assert i1 == 3 * m                    # 6,6 V / 2,2 kOhm = 3 mA
assert F(66, 10) / F(22, 10) == 3
assert 1 == F(1) / F(1)                                    # 1 Ohm = 1 V / 1 A (tanim)

# --- Parca 3: bakir ozdirenci ve birim donusumu (NBS HB 100 / IEC: 1,7241e-8 Ohm m, 20 C; alfa 0,00393)
rho_SI = F(17241, 10**12)                                  # 1,7241 x 10^-8 Ohm m
mm2 = F(1, 10**6)                                          # 1 mm^2 = 1e-6 m^2
assert 1 / mm2 == 10**6                                    # 1 Ohm m = 1 Ohm m^2/m = 10^6 Ohm mm^2/m
rho_mm = rho_SI / mm2; assert rho_mm == F(17241, 10**6)    # 0,017241 Ohm mm^2/m
alfa = F(393, 100000); assert alfa * 1000 == F(393, 100)   # binde 3,93
assert round(float(alfa * 1000)) == 4                      # "yaklasik binde dort"

# ornek 2: d = 0,5 mm, L = 10 m
r = F(5, 10) / 2; assert r == F(25, 100)
assert r**2 == F(625, 10000)                               # 0,25^2 = 0,0625
A = math.pi * float(r**2); assert yuv(A, 4) == 0.1963
Rt = float(rho_mm) * 10 / A; assert yuv(Rt, 3) == 0.878
assert float(rho_mm) * 10 == 0.17241
assert yuv(0.17241 / 0.1963, 3) == 0.878                   # ekrandaki yuvarlanmis alanla da ayni
# SI ile ikinci hesap
A_SI = math.pi * (0.25e-3) ** 2; assert abs(float(rho_SI) * 10 / A_SI - Rt) < 1e-12
assert yuv(2 * 0.878, 3) == 1.756 and yuv(2 * Rt, 3) == 1.756          # boy iki kati (2. denetimde metinden cikarildi; paket icinde dogru)
A2 = math.pi * 0.5 ** 2; assert yuv(A2, 4) == 0.7854 and float(F(5, 10)**2) == 0.25
assert yuv(A2 / A, 6) == 4.0 and yuv(0.7854 / 0.1963, 1) == 4.0        # alan dort kati
assert yuv(float(rho_mm) * 10 / A2, 4) == 0.2195 and yuv(0.878 / 4, 4) == 0.2195   # cap iki kati: R/4

# --- Parca 4: kesit iki kati = iki esit tel paralel = R/2
assert yuv(float(rho_mm) * 10 / (2 * A), 3) == 0.439 and yuv(0.878 / 2, 3) == 0.439
# iki esit paralel direncin genel formulle kontrolu (paket ici; metinde formul yok)
Rp = 1 / (1 / F(878, 1000) + 1 / F(878, 1000)); assert Rp == F(439, 1000)

# --- Parca 5: 2 kOhm direncin iki grafigi
noktalar = [(-2 * m, None), (0, None), (1 * m, None), (3 * m, None)]
v = {i: R * i for i, _ in noktalar}
assert v[-2 * m] == -4 and v[0] == 0 and v[1 * m] == 2 and v[3 * m] == 6
egim1 = (v[3 * m] - v[1 * m]) / (3 * m - 1 * m); assert egim1 == R           # 4 V / 2 mA = 2 kOhm
assert (6 - 2) == 4 and (3 - 1) == 2 and F(4, 2) == 2
assert F(1, 2) == F(5, 10)                                 # 1 / 2 = 0,5; 1 / kOhm = mS
egim2 = (3 * m - 1 * m) / (v[3 * m] - v[1 * m]); assert egim2 == F(5, 10) * m  # 2 mA / 4 V = 0,5 mS
assert egim2 == F(1, R)
# eksen araliklari noktalari kapsar, sinira yapismaz (2e-1): i -3..4 mA, v -5..7 V
for i_, vv in v.items():
    assert -3 * m < i_ < 4 * m and -5 < vv < 7
assert -5 < 4 < 7 and -3 < 2 < 4                                               # hata karti noktasi (2 mA; 4 V)
# dogru, butun noktalardan gecer
assert all(vv == egim1 * i_ for i_, vv in v.items())

# --- Parca 6: kaynaklarin karakteristigi (ayri cerceve; i: + uctan disari)
Vs, Is = 5, F(15, 10) * m
for i_ in (-1 * m, 0, 3 * m):
    assert Vs == 5                                          # yatay dogru: her akimda 5 V
for vv in (0, 3, 6):
    assert Is == F(15, 10) * m                              # dikey dogru: her gerilimde 1,5 mA
assert not (Vs == 0) and not (Is == 0)                      # orijinden gecmez (deger sifir degil)
# kaynak cercevesi ekseni: i -2..4 mA, v -1..7 V; butun noktalar sinirin ICINDE (2e-1; 1. tur denetim O1)
for i_ in (-1 * m, 0, Is, 3 * m):
    assert -2 * m < i_ < 4 * m
for vv in (0, 3, Vs, 6):
    assert -1 < vv < 7
# sifir degerli kaynaklar orijinden gecer (D3B1 esdegerlikleri): v = 0 dogrusu ve i = 0 dogrusu (0,0)'i icerir

# --- Parca 7: Uygulamada, 2 A'lik 60 mm iz, 1 ons bakir (t = 34,8 um), en cok 50 mV
t_mm = F(348, 10000)                                        # 0,0348 mm
assert F(348, 10) / 1000 == t_mm                            # 34,8 um = 0,0348 mm
Rhedef = F(50, 1000) / 2; assert Rhedef == F(25, 1000)      # 25 mOhm
A1 = 1 * t_mm; assert A1 == F(348, 10000)                   # 1 mm x 0,0348 mm
rpm = rho_mm / A1; assert yuv(rpm, 4) == 0.4954            # 0,017241 / 0,0348 = 0,4954 Ohm/m
R1mm = 0.4954 * 0.06; assert yuv(R1mm * 1000, 2) == 29.72  # ekran zinciri: 29,72 mOhm
R1mm_tam = rho_mm * F(6, 100) / A1; assert abs(float(R1mm_tam) * 1000 - 29.726) < 0.001  # tam deger 29,726
w = 29.72 / 25; assert yuv(w, 2) == 1.19
assert yuv(float(R1mm_tam) * 1000 / 25, 3) == 1.189         # paketle ayni (1,189 mm)
R12 = 29.72 / 1.2; assert yuv(R12, 2) == 24.77
assert yuv(float(R1mm_tam) * 1000 / 1.2, 2) == 24.77       # paket 24,77 mOhm
assert yuv(24.77 * 2, 1) == 49.5 and 49.5 <= 50
# SI ile ikinci hesap (paket 5d-A formulu)
R12_SI = float(rho_SI) * 0.06 / (1.2e-3 * 34.8e-6); assert yuv(R12_SI * 1000, 2) == 24.77
# sicaklik
carpan = 1 + alfa * (70 - 20); assert carpan == F(11965, 10000)
assert alfa * 50 == F(1965, 10000)
R12_70 = 24.77 * 1.1965; assert yuv(R12_70, 2) == 29.64
assert yuv(29.64 * 2, 1) == 59.3 and 59.3 > 50
w70 = 1.19 * 1.1965; assert yuv(w70, 2) == 1.42 and 1.42 < 1.5
assert yuv(float(R1mm_tam) * 1000 / 25 * 1.1965, 2) == 1.42
R15_70 = 29.64 * 1.2 / 1.5; assert yuv(R15_70, 2) == 23.71   # ters orantiyla 1,2 mm -> 1,5 mm (70 C)
assert yuv(29.72 / 1.5 * 1.1965, 2) in (23.70, 23.71)        # 20 C yolundan ayni (yuvarlama)
assert yuv(23.71 * 2, 1) == 47.4 and 47.4 <= 50
assert yuv(float(R1mm_tam) * 1000 / 1.5 * float(carpan) * 2, 1) == 47.4   # tam degerle de 47,4 mV
# iki yuz paralel (1,2 mm, 70 C)
assert yuv(29.64 / 2, 2) == 14.82 and yuv(14.82 * 2, 1) == 29.6 and 29.6 <= 50
# CRCW0603 e3: +-%1, en cok 100 ppm/K
assert 1000 * F(1, 100) == 10 and 1000 * F(99, 100) == 990 and 1000 * F(101, 100) == 1010
assert F(100, 10**6) == F(1, 10000) and F(100, 10**6) * 1000 == F(1, 10)   # milyonda 100 = 0,0001 = binde 0,1
assert alfa * 1000 / (F(100, 10**6) * 1000) > 39           # bakir 3,93 / 0,1 = 39,3 kat (metinde sayi yok)

# --- Parca 8: yorum sorusu (icerik.md 8 ile ayni; cevap seste verilmez)
oran_tek = F(45, 60) * F(12, 8) * carpan; assert yuv(oran_tek, 4) == 1.3461
oran = oran_tek / 2; assert yuv(oran, 4) == 0.6730
assert yuv(1 / oran, 3) == 1.486
assert yuv(oran_tek * 2, 2) == 2.69                         # tuzak: iki yuzu seri sanmak
assert yuv(F(45, 60) * F(12, 8) / 2, 4) == 0.5625           # tuzak: sicakligi unutmak

# --- Metin kontrolleri
p = pathlib.Path(__file__).with_name("metin.md")
t = p.read_text(encoding="utf-8")
bloklar = re.findall(r"## \[PARÇA (\d)\][^\n]*\n\n```\n(.*?)```", t, re.S)
assert [b[0] for b in bloklar] == [str(i) for i in range(1, 9)], [b[0] for b in bloklar]
toplam = 0; kelime = {}
for no, b in bloklar:
    ses = "\n".join(l for l in b.splitlines() if not l.startswith("[SELAM"))
    assert not re.search(r"[0-9=+×/()%·→Ωµρ_…–°]", ses), (no, re.findall(r".{15}[0-9=+×/()%·→Ωµρ_…–°].{5}", ses))
    assert "kanca" not in ses.lower(), no
    for yasak in ("her zaman", "hiçbir öğrenci", "datasheet", "Vishay", "Texas", "NBS", "IEC", "CRCW", "WSL",
                  " ve iki ", "v iks", "i iks", "ppm", " oz", "ro harf", "Kirchhoff", "süperpozisyon",
                  "Thevenin", "Norton", "koridor", "kara kutu", "mho"):
        assert yasak not in ses, (no, yasak)
    n = len(ses.split()); toplam += n; kelime[no] = n
    print(f"Parça {no}: {n} kelime, ~{n/2.6/60:.1f} dk")
assert "kanca" not in re.sub(r"\[PARÇA[^\]]*\]", "", t).lower().replace("\"kanca\" kelimesi", ""), "ekran/sahne planinda kanca"
sure = toplam / 2.6 + 125 + 9.5
print(f"Toplam seslendirme: {toplam} kelime; tahmini süre ~{sure/60:.1f} dk")
assert 1800 <= toplam <= 2200, toplam
assert 13 * 60 <= sure <= 17 * 60, sure
assert kelime["7"] <= 600, kelime["7"]          # Uygulamada (paket hedefi ~480; her ara adim seste de soylendigi icin pay; D3B1 siniri 645)
# abone cagrisi 1 en gec ~4. dk
p2 = [b for no, b in bloklar if no == "2"][0]
once = kelime["1"] + len(p2.split("Bu serinin devamını")[0].split())
abone_sn = once / 2.6 + 9.5 + 15
print(f"Abone çağrısı 1: ~{abone_sn/60:.1f}. dk")
assert abone_sn <= 4.1 * 60, abone_sn
# tutarlilik: iki akim kurali seste acik (D2B1/D2B3 kaynak: + uctan disari; direnc: + uctan giren)
p5 = [b for no, b in bloklar if no == "5"][0]; p6 = [b for no, b in bloklar if no == "6"][0]
assert "artı ucundan giren" in p5 and "artı ucundan dışarı çıkan" in p6 and "artı uçtan içeri" in p6
# eksen duzeni her iki grafikte acikca soylenir
assert "Yatay eksende akım, dikey eksende gerilim" in p5 and "gerilimi yatay eksene, akımı dikey eksene" in p5
# "dirençte" sinirlamasi (icerik.md Kaynakta duzeltme 1)
assert "bir dirençte akım, yüksek gerilimli uçtan alçak gerilimli uca akar" in p2 and "yalnızca direnç için" in p2
# "ikisinin de egimi sifir" denmez (icerik.md Kaynakta duzeltme 5)
assert "eğimi sıfır" not in t
# tek "en sık yapılan hata" (Parca 1'de anilir, Parca 5'te verilir)
assert sum(b.count("en sık yapılan hata") + b.count("En sık yapılan hata") for _, b in bloklar) == 2
# yorum sorusu paketteki soruyla ayni (yalniz "gerilim–akım" -> "gerilim ve akım")
p8 = [b for no, b in bloklar if no == "8"][0]
for parca in ("altmış milimetre uzunluğunda, bir virgül iki milimetre genişliğinde", "kırk beş milimetre uzunluğunda, sıfır virgül sekiz milimetre genişliğinde",
              "yetmiş derecede", "binde üç virgül doksan üç", "kaç katıdır"):
    assert parca in p8, parca
print("TÜM KONTROLLER GEÇTİ")

# --- 2. bagimsiz denetim (21.11.2026) ek kontrolleri ---
# Sure: D1B2'nin gercek videosu 2194 kelime -> 1023,8 sn (kart, abone, bitis dahil) => ~2,143 kelime/sn toplam oran.
oran_d1b2 = 2194 / 1023.806
sure2 = toplam / oran_d1b2 + 9.5
print(f"2. denetim sure tahmini (D1B2 gercek orani, intro dahil): ~{sure2/60:.2f} dk")
# Sinir 13-17 dk; tahmin ~17,0 dk (belirsizlik +-0,5): gercek ses olculur, 17 dk asilirsa kanal sahibine sorulur (onay kartinda yazildi).
assert sure2 / 60 <= 17.1, sure2
# 1 m^2 = 10^6 mm^2 -> 1 Ohm m = 10^6 Ohm mm^2/m
assert abs(1.7241e-8 * 1e6 - 0.017241) < 1e-12
# P7: (rho/A) x L
assert yuv(yuv(0.017241 / 0.0348, 4) * 0.06 * 1000, 2) == 29.72
# Yorum sorusu (birlesme noktalari ihmal): 0,673 ve 1,486
k = (45 / 60) * (1.2 / 0.8) * (1 + 0.00393 * 50) / 2
assert yuv(k, 3) == 0.673 and yuv(1 / k, 3) == 1.486
print("2. DENETIM EK KONTROLLERI GECTI")
