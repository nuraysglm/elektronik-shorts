"""Ders 3 Bolum 1 dogrulama (surum 1, 21.11.2026 kredi sprinti): butun sayisal sonuclar (kesirli tam aritmetik),
bagimsiz kontroller (SI birimleriyle ikinci hesap, dugum/akim esitligi, ters yon, sinirlar) ve seslendirme metni kontrolleri.
Hiz: 2,6 kelime/sn (Ders 1 olcumu; D2B2, D2B3 ile ayni); +125 sn kart, abone, sessizlik, bitis (intro ayrica ~9,5 sn)."""
from fractions import Fraction as F
import re, pathlib

m = F(1, 1000); u = F(1, 10**6); k_ = 1000          # mili, mikro, kilo

# --- Parca 1 / Parca 4 hata: 2,5 kOhm x 1,2 mA
assert F(25, 10) * k_ * F(12, 10) * m == 3          # +3 V (yanlis isaretle)
assert F(25, 10) * F(12, 10) == 3                   # kOhm x mA = V

# --- Parca 2: esdegerlikler (sayisal degil) -- 0 A akim kaynagi: i = 0; 0 V kaynak: v = 0

# --- Parca 3, ornek 1: akimla kontrol edilen akim kaynagi
ix = F(2, 10) * m; k1 = 25
i1 = k1 * ix; assert i1 == 5 * m                   # 25 x 0,2 mA = 5 mA
assert 25 * F(2, 10) == 5
R1 = F(12, 10) * k_
v1 = R1 * i1; assert v1 == 6                       # 1,2 kOhm x 5 mA = 6 V
assert F(12, 10) * 5 == 6
assert v1 / R1 == i1                               # Ohm ters yonden
i1n = -25 * ix; assert i1n == -5 * m and R1 * i1n == -6   # k = -25: -5 mA, -6 V
# siemens: 8 mS x 1 V = 8 mA
assert 8 * m * 1 == 8 * m
# birim tablosu (boyut analizi, sembolik): V/V, V/A=Ohm, A/A, A/V=S -- metinde dort satir

# --- Parca 4, ornek 2: VCCS kuvvetlendirici (iki ayri halka)
Is2 = F(1, 10) * m; Rx = F(15, 10) * k_; g = 8 * m; RL = F(25, 10) * k_
vx = Rx * Is2; assert vx == F(15, 100)             # 1,5 kOhm x 0,1 mA = 0,15 V
assert F(15, 10) * F(1, 10) == F(15, 100)
i2 = g * vx; assert i2 == F(12, 10) * m            # 8 mS x 0,15 V = 1,2 mA
assert 8 * F(15, 100) == F(12, 10)
vout = RL * i2; assert vout == 3                   # 2,5 kOhm x 1,2 mA = 3 V
assert F(25, 10) * F(12, 10) == 3
A = vout / vx; assert A == 20                      # 3 / 0,15 = 20
assert g * RL == 20 and 8 * F(25, 10) == 20        # k x R_L = 20 (birimsiz)
# salinim: +-0,1 mA -> +-0,15 V -> +-3 V
for s in (-1, 1):
    assert Rx * (s * Is2) == s * F(15, 100) and A * s * F(15, 100) == 3 * s
# (grafik denetim tur 2 sonrasi kaldirildi; salinim yalniz sozle: cikis her an 20 x v_x)

# ters ok (en sik yapilan hata): akim R_L'ye - ucundan girer
vout_t = -RL * i2; assert vout_t == -3
assert vout_t / vx == -20
# Parca 1 sorusu Parca 4'teki ters oklu devrenin yuku: ayni 2,5 kOhm ve 1,2 mA
assert RL == F(25, 10) * k_ and i2 == F(12, 10) * m

# --- Parca 5, ornek 3: kendi gerilimini okuyan VCCS, akim kaynagiyla suruluyor
g3 = F(15, 10) * m
for Is, v_bek in ((F(6, 10) * m, F(4, 10)), (F(15, 10) * m, 1), (3 * m, 2)):
    v = Is / g3; assert v == v_bek, (Is, v)       # v = I_s / k
    assert g3 * v == Is                            # akim esitligi (tek dugum: gidecek baska yol yok)
    assert v / Is == F(2000, 3)                    # 666,67 Ohm
assert F(6, 10) / F(15, 10) == F(4, 10) and F(15, 10) / F(15, 10) == 1 and 3 / F(15, 10) == 2
Req = 1 / g3; assert Req == F(2000, 3) and round(float(Req), 1) == 666.7
assert g3 == F(15, 10000)                          # 1,5 mS = 0,0015 S
# ters ok: v / I_s = -1/k (yalnizca soz; sayi metinde yok)
assert -(F(6, 10) * m) / g3 / (F(6, 10) * m) == -Req
# grafik ekseni: i 0 ... 3,5 mA, v 0 ... 2,5 V; en buyuk nokta (3; 2) sinira yapismaz
assert 3 < F(35, 10) and 2 < F(25, 10)

# --- Parca 6: XTR111 (VCCS), XTR115 (CCCS) -- veri sayfasi degerleri icerik.md 5b
VSP = 24; Vin_max_dogrusal = min(12, VSP - F(23, 10)); assert Vin_max_dogrusal == 12 and 4 <= 12
Rset = 10 * 4 / (20 * m); assert Rset == 2000      # 10 x 4 / 0,02 = 2000 Ohm
assert F(40) / F(2, 100) == 2000
kx = 10 / Rset; assert kx == F(5, 1000)            # 5 mS
for vin, iexp in ((1, 5), (2, 10), (4, 20)):
    assert kx * vin == iexp * m and 10 * vin / Rset == iexp * m   # iki yoldan
assert F(1, 10) <= 20 <= 25                         # tam basarim 0,1 ... 25 mA
Rp = 200
assert Rp * 20 * m == 4 and Rp * 10 * m == 2       # 4 V, 2 V
assert kx * Rp == 1                                # kazanc 1
assert VSP - 2 == 22 and 4 < 22                    # gerilim payi
# pahali hata: R_SET = 1 kOhm
i_hata = 10 * 4 / F(1000); assert i_hata == 40 * m  # 40 mA
v25 = 25 * m * 1000 / 10; assert v25 == F(25, 10)  # 2,5 V
assert i_hata > 25 * m
assert F(25, 1000) * 1000 == 25 and F(25) / 10 == F(25, 10)   # ters formul: 25 V / 10 = 2,5 V
# akim siniri 41 +- 9 mA (paket 5c; sayi metinde yok): en kotu 32 mA -> 32 mA x 1 kOhm / 10 = 3,2 V < 4 V
assert 41 - 9 == 32 and 32 * m * 1000 / 10 == F(32, 10) and F(32, 10) < 4
# Parca 5 ara adim: V / mA = kOhm; 0,4/0,6 = 1/1,5 = 2/3 = 0,6667 kOhm
assert F(4, 10) / F(6, 10) == 1 / F(15, 10) == F(2, 3) and round(float(F(2, 3)), 4) == 0.6667
# hassas direnc (paket 5c; metinde sayisiz): 2 / 2000 = %0,1
assert F(2, 2000) == F(1, 1000)
# XTR115
RIN = F(20 * k_)
for vin, iin, io in ((F(8, 10), 40, 4), (4, 200, 20)):
    assert F(vin) / RIN == iin * u and 100 * iin * u == io * m
assert F(25, 100) <= 4 and 20 <= 25                # dogrusal cikis 0,25 ... 25 mA
assert F(100) / RIN == F(5, 1000)                  # disaridan 5 mS (paket ici; metinde yok)

# --- Parca 7: yorum sorusu (icerik.md 8 ile ayni; cevap seste verilmez)
Is7 = F(1, 2) * m; Rx7 = 2 * k_; g7 = 6 * m; RL7 = F(15, 10) * k_
vx7 = Rx7 * Is7; assert vx7 == 1
i7 = g7 * vx7; assert i7 == 6 * m
vo7 = -RL7 * i7; assert vo7 == -9                  # (1) -9 V
assert abs(vo7) <= 12 and i7 <= 7 * m              # 0,5 mA'de gecerli
Is_v = 12 / RL7 / g7 / Rx7; Is_i = 7 * m / g7 / Rx7  # gerilim siniri, akim siniri
assert Is_v == F(2, 3) * m and Is_i == F(7, 12) * m
assert min(Is_v, Is_i) == Is_i and round(float(Is_i * 1000), 3) == 0.583
assert RL7 * g7 * Rx7 * Is_i == F(105, 10)         # o akimda |v| = 10,5 V < 12 V

# --- Metin kontrolleri
p = pathlib.Path(__file__).with_name("metin.md")
t = p.read_text(encoding="utf-8")
bloklar = re.findall(r"## \[PARÇA (\d)\][^\n]*\n\n```\n(.*?)```", t, re.S)
assert [b[0] for b in bloklar] == [str(i) for i in range(1, 8)], [b[0] for b in bloklar]
toplam = 0; kelime = {}
for no, b in bloklar:
    ses = "\n".join(l for l in b.splitlines() if not l.startswith("[SELAM"))
    assert not re.search(r"[0-9=+×/()%·→Ωµ_…]", ses), (no, re.findall(r".{15}[0-9=+×/()%·→Ωµ_…].{5}", ses))
    assert "kanca" not in ses.lower(), no
    for yasak in ("her zaman", "hiçbir öğrenci", "VCVS", "CCVS", "VCCS", "CCCS", "XTR", "Texas", "datasheet",
                  " ve iki ", "v iks", "i iks", "geri besleme", "süperpozisyon", "mho", "ka çarpı", " ka "):
        assert yasak not in ses, (no, yasak)
    n = len(ses.split()); toplam += n; kelime[no] = n
    print(f"Parça {no}: {n} kelime, ~{n/2.6/60:.1f} dk")
assert "kanca" not in re.sub(r"\[PARÇA[^\]]*\]", "", t).lower().replace("kanca\" kelimesi", "").replace("\"kanca\" yok", "").replace("\"kanca\" sözcüğü", ""), "ekran/sahne planinda kanca"
sure = toplam / 2.6 + 125 + 9.5
print(f"Toplam seslendirme: {toplam} kelime; tahmini süre ~{sure/60:.1f} dk")
assert 1800 <= toplam <= 2200, toplam
assert 13 * 60 <= sure <= 17 * 60, sure
assert kelime["6"] <= 645, kelime["6"]                # Uygulamada (paket ~550; D2B2 ile ayni ust sinir)
# abone cagrisi 1 en gec ~4. dk: Parca 1-2 + Parca 3'te abone cumlesine kadar
p3 = [b for no, b in bloklar if no == "3"][0]
once = sum(kelime[x] for x in ("1", "2")) + len(p3.split("Bu serinin devamı")[0].split())
abone_sn = once / 2.6 + 9.5 + 15                      # intro + giris arasi kisa sessizlikler
print(f"Abone çağrısı 1: ~{abone_sn/60:.1f}. dk")
assert abone_sn <= 4.1 * 60, abone_sn
# tutarlilik: Parca 5'te akimin referans yonu acikca soylenir (D2B3 farki)
p5 = [b for no, b in bloklar if no == "5"][0]
assert "artı uçtan dışarı çıkan" in p5 and "artı uçtan içeri giren" in p5
# tek "en sık yapılan hata" (Parca 1'de anilir, Parca 4'te verilir)
assert sum(b.count("en sık yapılan hata") + b.count("En sık yapılan hata") for _, b in bloklar) == 2
print("TÜM KONTROLLER GEÇTİ")
