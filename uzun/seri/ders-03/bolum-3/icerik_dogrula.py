# İçerik paketi doğrulaması — Devre Teorisi I, Ders 3 - Bölüm 3/3
# Çalıştır: python3 icerik_dogrula.py   (yorum sorusunun çözümü depoda değil; Drive "Soru Bankası – Çözümler (2)")
import math
def yakin(a, b, tol=1e-9, ad=""):
    assert abs(a - b) <= tol * max(1.0, abs(b)), f"{ad}: {a} != {b}"
k, m, u = 1e3, 1e-3, 1e-6

print("Örnek 1 — test kaynağıyla eşdeğer direnç (kapalı modül)")
vx, ix = 3.0, 1.25*m
Req = vx/ix; yakin(Req, 2.4*k, ad="R_eş"); print(f"  R_eş = 3 V / 1,25 mA = {Req/k:.1f} kΩ")
v2 = Req*0.5*m; yakin(v2, 1.2, ad="v(0,5 mA)"); print(f"  Test akımı 0,5 mA: v = 2,4 kΩ × 0,5 mA = {v2:.1f} V; oran yine {v2/(0.5*m)/k:.1f} kΩ")
Rp = 4.8*k; yakin(Rp/2, Req, ad="paralel")       # iki eşit 4,8 kΩ, iki ucu ortak → R/2 (Bölüm 2)
ik = vx/Rp; yakin(ik, 0.625*m); yakin(2*ik, ix)
print(f"  İçeride iki eşit 4,8 kΩ paralel: 4,8 / 2 = 2,4 kΩ; her kol 3 V / 4,8 kΩ = {ik/m:.3f} mA; 2 × 0,625 = {2*ik/m:.2f} mA")

print("Örnek 1b — seri: D2B1 gerçek pili (1,5 V, R_iç 0,3 Ω) + 1,5 Ω yük")
Vb, Ri, Ry = 1.5, 0.3, 1.5
Rs = Ri+Ry; yakin(Rs, 1.8); ib = Vb/Rs; yakin(ib, 5/6)
vi, vy = Ri*ib, Ry*ib; yakin(vi, 0.25); yakin(vy, 1.25); yakin(vi+vy, Vb)
print(f"  R_eş = 0,3 + 1,5 = 1,8 Ω; i = 1,5 / 1,8 = {ib:.3f} A; v_iç = {vi:.2f} V, v_yük = {vy:.2f} V; toplam {vi+vy:.1f} V")
yakin(Vb/Ry, 1.0); yakin(Ri*1.0, 0.3)
print("  (D2B1 tahmini: i ≈ 1,5 / 1,5 = 1 A, kayıp ≈ 0,3 V)")

print("Örnek 2 / Hata kartı — art arda çizilmiş ama seri olmayan dirençler")
Ra, Rb, Rc, V = 2*k, 3*k, 3*k, 7.0
yanlis = Ra+Rb; yakin(yanlis, 5*k); i_yanlis = V/yanlis; yakin(i_yanlis, 1.4*m)
Rbc = Rb/2; yakin(Rbc, 1.5*k)                       # iki eşit direnç, iki ucu ortak → R/2 (Bölüm 2)
Req2 = Ra + Rbc; yakin(Req2, 3.5*k)
iA = V/Req2; yakin(iA, 2*m)
vA = Ra*iA; vmb = Rbc*iA; yakin(vA, 4.0); yakin(vmb, 3.0); yakin(vA+vmb, V)
iB = vmb/Rb; iC = vmb/Rc; yakin(iB, 1*m); yakin(iC, 1*m); yakin(iB+iC, iA)
print(f"  Yanlış: 2 + 3 = 5 kΩ, i = 7 V / 5 kΩ = 1,4 mA")
print(f"  Doğrusu: 3 kΩ ∥ 3 kΩ = 1,5 kΩ; R_eş = 2 + 1,5 = 3,5 kΩ; i = 7 / 3,5 = {iA/m:.0f} mA")
print(f"  v(2 kΩ) = 2 kΩ × 2 mA = {vA:.0f} V; v(m–b) = 1,5 kΩ × 2 mA = {vmb:.0f} V; 4 + 3 = 7 V")
print(f"  Her 3 kΩ: 3 V / 3 kΩ = {iB/m:.0f} mA  → 2 kΩ'un akımı (2 mA) ≠ 3 kΩ'unki (1 mA): seri değil")

print("Örnek 3 — aynı akım taşıyan ama paralel olan iki direnç")
R, Vp = 4.7*k, 4.7
yakin(Vp/R, 1*m); print("  4,7 V / 4,7 kΩ = 1 mA her birinde: akımlar eşit ama iki ucu ortak → paralel")

print("Örnek 4 — akkor lamba (TEMSİLÎ sayılar)")
noktalar = [(0.5, 50*m), (2.0, 100*m), (6.0, 200*m)]
Rs = [v/i for v, i in noktalar]
for (v, i), r in zip(noktalar, Rs): print(f"  v = {v} V, i = {i/m:.0f} mA → v/i = {r:.0f} Ω")
yakin(Rs[0], 10); yakin(Rs[1], 20); yakin(Rs[2], 30)
assert Rs[0] < Rs[1] < Rs[2]
# doğrusal olsaydı (10 Ω sabit): 6 V'ta 600 mA
yakin(6.0/10, 0.6); print("  Direnç 10 Ω'da kalsaydı 6 V'ta i = 6 / 10 = 0,6 A = 600 mA olurdu; ölçülen 200 mA")

print("Uygulamada 5d-A — yüksek gerilim hattında seri direnç zinciri (Vishay CRCW0603 e3: U_max 75 V)")
Vh, Umax, Rtop = 200.0, 75.0, 1.0e6
yakin(Vh/1.0, 200.0); assert Vh > Umax
N = math.ceil(Vh/Umax); assert N == 3; print(f"  200 V / 75 V = {Vh/Umax:.3f} → en az {N} direnç")
Rr = 330*k; Rz = N*Rr; yakin(Rz, 990*k)
iz = Vh/Rz; yakin(iz, 0.000202020202020202, tol=1e-9)
vr = Rr*iz; yakin(vr, 200/3)
print(f"  3 × 330 kΩ = 990 kΩ; i = 200 V / 990 kΩ = {iz/u:.1f} µA; her biri 330 kΩ × {iz/u:.1f} µA = {vr:.2f} V < 75 V")
# en kötü tolerans (±%1): biri +%1, öteki ikisi −%1
hi, lo = Rr*1.01, Rr*0.99
vwc = Vh*hi/(hi+2*lo); print(f"  En kötü (±%1): 200 × 333,3 / (333,3 + 2 × 326,7) = {vwc:.2f} V < 75 V")
yakin(vwc, 200*1.01/(1.01+1.98)); assert vwc < Umax
# tek direnç hatası
print("  Pahalı hata: tek 1 MΩ 0603 → uçlarında 200 V > 75 V")
# paket içi: güç (videoda yok)
p = vr*iz; print(f"  (Paket içi) her direncin gücü ≈ {vr:.2f} V × {iz/u:.1f} µA = {p*1e3:.1f} mW (< 100 mW)"); assert p < 0.10

print("Uygulamada 5d-B — multimetreyle karttaki direnci ölçmek (Fluke 87 V)")
R5 = R6 = 10*k
okunan = R5/2; yakin(okunan, 5*k); print(f"  10 kΩ ∥ 10 kΩ (iki ucu ortak) = 10 / 2 = {okunan/k:.0f} kΩ okunur")
# doğruluk: 60.00 kΩ aralığı, ±(%0,2 + 1 hane), çözünürlük 0,01 kΩ
okuma = 10.00; hata = 0.002*okuma + 1*0.01; yakin(hata, 0.03)
print(f"  (Paket içi) 10,00 kΩ okuması: ±(0,002 × 10,00 + 1 × 0,01) kΩ = ±{hata:.2f} kΩ = ±{hata*1000:.0f} Ω")
okuma2 = 5.000; hata2 = 0.002*okuma2 + 1*0.001; yakin(hata2, 0.011)
print(f"  (Paket içi) 5,000 kΩ okuması (6 kΩ aralığı): ±(0,002 × 5,000 + 0,001) = ±{hata2:.3f} kΩ = ±{hata2*1000:.0f} Ω")

print("TÜM KONTROLLER GEÇTİ")
