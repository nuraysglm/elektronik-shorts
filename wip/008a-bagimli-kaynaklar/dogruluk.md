# 008a — doğruluk (bölüm 7 A, 2b-3, 2d)
Kaynak: Razavi, Basic Circuits Lec 3 (LUfU9LgClsA) transkripti (vidIQ, 16.11.2026).

| İddia | Dayanak | Hesap / kontrol | |
|---|---|---|---|
| Bağımlı akım kaynağı eşkenar dörtgenle gösterilir, değeri başka yerdeki parametreye bağlıdır | [4:57] "current source again denoted by a diamond… has a value that depends on some other parameters somewhere else" | — | ✔ |
| Akım, başka bir yerdeki gerilime bağlı olabilir: i₁ = k·v₀ | [6:17–7:08] "this current is also a multiple of a voltage… i1 is equal to k times v0" | — | ✔ |
| k'nın birimi A/V = 1/Ω (birimsiz değil) | [7:08–7:41] "k cannot be unitless… k has a unit of one over resistance" | 10 mA/V = 0,01 A/V = 1/(100 Ω) (check) | ✔ |
| Giriş gerilimi kontrollü kaynak + R₁: v_out = R₁·k·v_in | [8:47–10:25] "v out is equal to r1 times the current which is k times v in" | 0,2 V → 2 mA → 2 V; 0,15 V → 1,5 mA → 1,5 V (check) | ✔ |
| k·R₁ birimsizdir; > 1 ise devre yükseltir | [10:42–11:29] "k r1 doesn't have a unit… if i can make k r1 greater than 1 then this circuit amplifies" | 10 mA/V × 1 kΩ = 10 (check) | ✔ |
| Mikrofonun ardından bu ilkeyle çalışan bir yükselteç gelir | [11:14] "this microphone in fact is immediately followed by an amplifier that works based on this principle" | — | ✔ |
| Bağımlı kaynaklar transistör gibi aygıtları modellemede kullanılır | [6:01] "dependent current sources are useful in modeling certain devices such as transistors"; [7:41] "models of some advanced devices such as transistors" | — | ✔ |
| Sinüsün eksi yarısında akım negatiftir (referans yönün tersine); elektronlar ters akar | [2:17–2:50] (Ders 3 özeti) akım pozitif veya negatif olabilir; Ders 1 referans yönü | i₁ = k·v_in < 0 ⇒ ampermetre eksi | ✔ |
| Voltmetrenin + ucu akımın R₁'e girdiği uçta; v_out = +R₁·i₁ | [10:09] "current is flowing from the positive side to the negative side" | sahnede ok ve + ucu aynı uç (check) | ✔ |
| Renk bantları kahverengi-siyah-kırmızı = 10 × 10² Ω = 1 kΩ | IEC 60062 renk kodu | 1, 0, ×100 | ✔ |
| BC547 TO-92 kılıflı NPN transistör | üretici veri sayfası (genel bilgi) | — | ✔ |

İlk yorum sorusu: "k = 20 mA/V olan bağımlı akım kaynağı 500 Ω'luk dirençten geçiyor. Giriş 0,1 V ise çıkış kaç volt?" Cevap: i = 20 mA/V × 0,1 V = 2 mA; v_out = 2 mA × 0,5 kΩ = 1 V (kazanç k·R = 10). ✔
