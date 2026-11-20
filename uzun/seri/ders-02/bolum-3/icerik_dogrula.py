"""Ders 2 - Bölüm 3 içerik paketi: sayısal doğrulama (İçerik Ajanı, 20.11.2026).
Her sayı icerik.md'deki adımlarla aynı sırada hesaplanır; assert'ler ara adımları da denetler."""
import math

def yakin(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))

print("== Örnek 1: aynı üç yük, iki ideal kaynak (ikilik tablosu) ==")
I = 4e-3; V = 6.0
yukler = {"kısa devre (0 Ω)": 0.0, "500 Ω": 500.0, "2,5 kΩ": 2500.0}
v = {k: R * I for k, R in yukler.items()}
for k, val in v.items():
    print(f"  akım kaynağı 4 mA, {k}: v = R × i = {yukler[k]:g} Ω × 4 mA = {val:g} V")
assert v["kısa devre (0 Ω)"] == 0.0
assert yakin(v["500 Ω"], 2.0) and yakin(v["2,5 kΩ"], 10.0)
print("  gerilim kaynağı 6 V: 500 Ω → i = 6 / 500 =", V/500*1e3, "mA; 2,5 kΩ → 6 / 2500 =", V/2500*1e3, "mA; 0 Ω → çelişki")
assert yakin(V/500, 12e-3) and yakin(V/2500, 2.4e-3)

print("== Örnek 2: açık bırakılmaya yaklaşmak: R büyüdükçe v ==")
tablo = [(10e3, 40.0), (1e6, 4000.0), (1e9, 4e6)]
for R, beklenen in tablo:
    val = R * I
    print(f"  R = {R:g} Ω → v = {R:g} × 0,004 = {val:g} V")
    assert yakin(val, beklenen)
print("  (isteğe bağlı) gerilim kaynağı + akım kaynağı: pil ≈ 3,7 V (gerilimi pil), entegre 370,4 mA (akımı entegre)")

print("== Örnek 3: v–i grafiği (yatay eksen i, düşey eksen v) ==")
# ideal akım kaynağı: i = 4 mA her v için → dikey doğru; ideal gerilim kaynağı 1,5 V → yatay doğru (D2B1)
for vv in (-5.0, 0.0, 10.0, 40.0):
    assert yakin(I, 4e-3)  # i, v'den bağımsız
print("  i = 4 mA, v = −5 / 0 / 10 / 40 V için aynı → dikey doğru")

print("== Uygulamada A: MCP73831 R_PROG seçimi (I_REG[mA] = 1000 V / R_PROG[kΩ]) ==")
C_mAh = 400.0          # pil kapasitesi (örnek pil, tasarım verisi)
hedef = C_mAh * 1.0    # 1C → 400 mA (Microchip DS20001984F s. 17: tercih 1C, mutlak en çok 2C)
R_ideal = 1000.0 / hedef
print(f"  R_PROG = 1000 / {hedef:g} = {R_ideal:g} kΩ (standart değer değil)")
assert yakin(R_ideal, 2.5)
for R in (2.4, 2.7):
    print(f"  E24 {R} kΩ → I_REG = 1000 / {R} = {1000/R:.1f} mA")
I_24 = 1000/2.4; I_27 = 1000/2.7
assert round(I_24, 1) == 416.7 and round(I_27, 1) == 370.4
assert I_24 > hedef and I_27 < hedef
assert 2.0 <= 2.7 <= 67.0  # izinli R_PROG aralığı
# ±%10 tolerans (datasheet R_PROG = 10 kΩ'da 90/100/110 mA; aynı oran 2,7 kΩ'a yaklaşık olarak uygulanır)
alt, ust = 0.9 * I_27, 1.1 * I_27
print(f"  ±%10 ile: {alt:.1f} … {ust:.1f} mA; 2C sınırı {2*C_mAh:g} mA")
assert round(alt, 1) == 333.3 and round(ust, 1) == 407.4 and ust < 2 * C_mAh
print(f"  2C = 2 × 400 = {2*C_mAh:g} mA; aşım (407,4 − 400) / 400 = {(ust-hedef)/hedef:.4f} ≈ %{(ust/hedef-1)*100:.1f}")
assert 2 * C_mAh == 800.0
# direnç toleransı da eklenirse (en kötü: R küçük, entegre +%10)
for tol in (0.01, 0.05):
    print(f"  direnç ±%{tol*100:g}: 1000 / ({2.7*(1-tol):.4f}) × 1,1 = {1000/(2.7*(1-tol))*1.1:.1f} mA")
assert round(1000/(2.7*0.99)*1.1, 1) == 411.5 and round(1000/(2.7*0.95)*1.1, 1) == 428.8
# 67 kΩ ucunda datasheet aralığı formüle göre daha geniş
print(f"  67 kΩ: formül 1000/67 = {1000/67:.2f} mA; datasheet 12,5 … 16,5 mA → {(12.5/(1000/67)-1)*100:.0f} % / +{(16.5/(1000/67)-1)*100:.1f} %")
# 150 mAh pile 2 kΩ: 500/150
print(f"  pahalı hata: 2 kΩ → 1000 / 2 = 500 mA; 500 / 150 = {500/150:.2f}C")
assert round(500/150, 1) == 3.3
assert round((ust/hedef - 1) * 100, 1) == 1.9
# sabit akım aşamasının süresi için kaba alt sınır: t = q / i
t_h = C_mAh / I_27
print(f"  t = q / i = 400 mAh / 370,4 mA = {t_h:.2f} saat = {t_h*60:.0f} dk (alt sınır; sabit gerilim aşaması eklenir)")
assert round(t_h, 2) == 1.08 and round(t_h * 60) == 65
q_C = C_mAh * 3.6
print(f"  400 mAh = 400 × 3,6 C = {q_C:g} C; 1440 C / 0,3704 A = {q_C/(1000/2.7/1000):.0f} s")
assert q_C == 1440.0 and round(q_C / (I_27/1000)) == 3888
# bitiş akımı (%7,5 seçeneği) ve ön şarj (%10)
print(f"  bitiş akımı %7,5: 0,075 × 370,4 = {0.075*I_27:.1f} mA; ön şarj %10: {0.1*I_27:.1f} mA")
assert round(0.075 * I_27, 1) == 27.8 and round(0.1 * I_27, 1) == 37.0

print("== Uygulamada B: NSI45025A + TLHR5400 LED dizisi, 12 V ==")
Vin = 12.0; Voh = 1.8; VAKmax = 45.0
VF_typ, VF_max = 2.0, 3.0    # TLHR540x, I_F = 20 mA (datasheet koşulu)
Ireg_min, Ireg_typ, Ireg_max = 22.5, 25.0, 27.5  # mA, V_AK = 7,5 V
for n in range(1, 6):
    vak_kotu = Vin - n * VF_max
    vak_tip = Vin - n * VF_typ
    etiket = 'uygun (yeterli bakırla)' if vak_kotu >= 6 else ('sınırda (akım belirsiz)' if vak_kotu >= Voh else 'YETMEZ')
    print(f"  n = {n}: V_AK = 12 − {n} × 3 = {vak_kotu:g} V (en kötü), 12 − {n} × 2 = {vak_tip:g} V (tipik) → {etiket}")
n_max = math.floor((Vin - Voh) / VF_max)
print(f"  n_en çok = (12 − 1,8) / 3 = {(Vin-Voh)/VF_max:.2f} → {n_max}")
assert n_max == 3 and yakin((Vin - Voh) / VF_max, 3.4)
assert Vin - 3 * VF_max == 3.0 and Vin - 3 * VF_typ == 6.0
assert Vin - 4 * VF_max == 0.0 and Vin - 4 * VF_typ == 4.0
assert Ireg_max < 30.0  # LED sürekli sınırı 30 mA (T_amb ≤ 65 °C)
print(f"  LED akımı en çok {Ireg_max} mA < 30 mA sınırı; pay {30-Ireg_max:g} mA")
print(f"  pay 30 − 27,5 = {30-Ireg_max:g} mA")
# Üst sınır: sürekli çalışmada ısınma (P_D / I), 45 V yalnızca kısa süreli mutlak sınır
for alan, PD in (("100 mm², 1 oz", 0.208), ("300 mm², 1 oz", 0.347), ("500 mm², 1 oz", 0.436), ("500 mm², 2 oz", 0.463)):
    print(f"  (paket içi) {alan}: V_AK,en çok ≈ {PD*1e3:g} mW / 25 mA = {PD/0.025:.1f} V")
print(f"  (paket içi) en çok akımla: 208 / 27,5 = {208/27.5:.1f} V")
assert round(208/27.5, 1) == 7.6
assert round(0.208/0.025, 1) == 8.3 and round(0.347/0.025, 1) == 13.9 and round(0.436/0.025, 1) == 17.4 and round(0.463/0.025, 1) == 18.5
assert 45 * 0.025 == 1.125
# %80 noktası: 0,8 × 25 = 20 mA
assert yakin(0.8 * 25, 20.0)
# Direnç ile karşılaştırma (paket içi; KVL sezgisel): 3 LED tipik 6 V
R = (Vin - 3 * VF_typ) / 0.025
print(f"  (paket içi) dirençle: R = (12 − 6) / 0,025 = {R:g} Ω; 13,5 V'ta i = (13,5 − 6) / 240 = {(13.5-6)/R*1e3:.2f} mA")
assert yakin(R, 240.0) and yakin((13.5 - 6) / R, 0.03125) and (13.5 - 6) / R > 0.030
print(f"  (paket içi) CCR ile 13,5 V'ta V_AK = 13,5 − 6 = 7,5 V; P ≈ 7,5 × 25 mA = {7.5*25:g} mW < 208 mW")
assert yakin(7.5 * 0.025, 0.1875) and 0.1875 < 0.208
# Kısa devre olan LED dizisi: regülatöre 12 V kalır
print(f"  (paket içi) LED'ler kısa devre: P ≈ 12 × 25 mA = {12*25:g} mW > 208 mW")
assert yakin(12 * 0.025, 0.3)
# Paket içi bilgi (güç ileride; ekrana konmaz): CCR'de ısınan güç P = V_AK × I
for n, vak in ((1, 10.0), (2, 8.0), (3, 6.0)):
    P = vak * 0.025
    print(f"  (paket içi) n = {n}: P ≈ {vak:g} V × 25 mA = {P*1e3:g} mW (100 mm² pedde sınır 208 mW, 300 mm²'de 347 mW)")
assert yakin(10*0.025, 0.25) and 0.25 > 0.208 and yakin(8*0.025, 0.2) and 0.2 < 0.208 and 0.2 < 0.347

print("== Hata kartı: 4 mA, 2,5 kΩ ==")
print("  yanlış: v_kaynak = 0 → direnç 2,5 kΩ × 4 mA = 10 V ile çelişir; doğru: 10 V")
assert yakin(2500 * 4e-3, 10.0)

print("== Yorum sorusu: 2,5 V gerilim kaynağı + LED, V_F 2 … 3 V ==")
print("  V_F tipik 2 V, en çok 3 V (aynı 20 mA'de) → aynı gerilimde LED'ler çok farklı akım çeker; sayı verilmez (üstel i–v ileride)")

print("TÜM KONTROLLER GEÇTİ")
