# Elektronik Shorts Ajanı: çalışma talimatı

Bu dosya ajanın "beynidir". Ajan her çalışmada bu dosyayı baştan sona okur ve burada yazanı uygular.
Ajana yeni bir şey öğretmek için bu dosyayı düzenleyin. Bir sonraki çalışmadan itibaren geçerli olur.

## Kimlik

- Kanal: **Öğr. Gör. Nuray SAĞLAM**, @NuraySaglamBedir
- YouTube kanal kimliği: `UCAvE1cKeoIbIXCyIks-U81w`
- İçerik: elektronik derslerinden tek bir kavramı öğreten, kodla üretilmiş **animasyonlu** Shorts. Ekranda insan, gerçek görüntü veya yapay zekâ ile üretilmiş görsel yok.
- Dil: Türkiye Türkçesi. Ondalık ayırıcı virgül (4,7 kΩ). Birimler SI (V, mA, kΩ, µF).
- Ton: sakin, net, öğretmen. Abartı ve tıklama tuzağı yok.

## Yayın kuralları

- Her gün **1** Short.
- Yayın saati: **12:30, Europe/Istanbul**. Çalışma bu saatten sonra başlamışsa aynı gün, şu andan en az 20 dakika sonrası.
- Tam otomatik: Metricool'a `autoPublish: true`, `draft: false` ile gönderilir.
- Yalnızca kanal kimliği yukarıdakiyle **birebir eşleşen** Metricool markasına gönderilir. Eşleşen marka yoksa hiçbir şey yayınlanmaz.

## Depo düzeni (github.com/nuraysglm/elektronik-shorts)

| Yol | Ne |
|-----|----|
| `AJAN.md` | Bu talimat |
| `konular.md` | Sıralı konu listesi ve durumları |
| `gunluk.md` | Her çalışmanın kaydı |
| `motor/shortsmotor.py` | Animasyon motoru (numpy + matplotlib + ffmpeg) |
| `ornekler/kondansator_rc.py` | Tarz örneği: kalite çıtası bu videodur |
| `bolumler/NNN-konu.py` | Ajanın her bölüm için yazdığı animasyon kodu |
| `videolar` dalı | Son 14 günün mp4 dosyaları (Metricool buradan çeker) |

## Her çalışmada adımlar

### 1. Hazırlık
1. Depoyu oturuma ekle (`add_repo`: owner `nuraysglm`, repo `elektronik-shorts`, access `push`) ve klonla.
2. `AJAN.md`, `konular.md`, `gunluk.md`, `motor/shortsmotor.py` ve `ornekler/kondansator_rc.py` dosyalarını oku.
3. Paket kurma. Ağ kapalı olabilir; yalnızca kurulu olanları kullan: Python, numpy, matplotlib, PIL, ffmpeg.

### 2. Güvenlik kontrolleri (biri başarısızsa dur, yayınlama)
1. Metricool `getBrandSettings` → `networksData.youtubeData == "UCAvE1cKeoIbIXCyIks-U81w"` olan markayı bul. `blogId` = o markanın `id`'si. Yoksa: günlüğe "kanal Metricool'a bağlı değil" yaz ve dur.
2. Mükerrer kontrolü: `gunluk.md`'de bugünün tarihiyle `planlandı` satırı varsa dur. Metricool `getScheduledPosts` ile bugün bu markada YouTube gönderisi varsa dur.

### 3. Konu seçimi
- `konular.md`'de durumu `bekliyor` olan **ilk** satırı al. "Ana fikir" sütunu videonun öğreteceği tek şeydir; kapsamı genişletme.

### 4. Senaryo (25–40 saniye)
Şu iskeleti kullan, sürelerle oyna ama sırayı koru:
1. **Kanca (0–3 sn):** Konuyu soru veya şaşırtıcı bir iddiayla sor. Metin **ilk karede** görünür olsun (boş açılış yok).
2. **Gösterim (3–18 sn):** Devre, grafik veya mekanizma canlanır; 3–4 kısa altyazı adım adım anlatır.
3. **Kural / formül kartı (18–26 sn):** Formül + gerçek değerlerle tek bir örnek hesap.
4. **Özet ve kapanış (son 4 sn):** Tek cümlelik özet + "Kaydet • Takip et".

Görsel şablonları sırayla değiştir ki kanal tekrara düşmesin (son 3 bölümde kullanılanı günlükten kontrol et):
- **A. Devre + canlı grafik** (örnekteki gibi)
- **B. Adım adım hesap** (formül satır satır dolar)
- **C. Doğru mu, yanlış mı?** (yaygın bir yanılgı sorulur, 2 sn bekletilir, cevap açıklanır)
- **D. Karşılaştırma** (iki devre veya iki durum yan yana)
- **E. Gerçek hayat** (telefon şarjı, LED şerit, priz gibi bir örnek üzerinden)

### 5. Doğruluk (en önemli adım)
- Videoda görünen **her sayı** kod içinde değişkenden hesaplanır; elle sayı yazılmaz.
- Bölüm kodunun başına `assert` ile bağımsız bir kontrol koy: formülü ikinci bir yoldan hesapla veya bilinen bir ders kitabı değeriyle karşılaştır (ör. 1 − e⁻¹ ≈ 0,632).
- Fiziksel olarak tutarlı değerler seç (gerçek E12 direnç değerleri, gerçekçi akımlar, yaygın kondansatörler).
- Akım yönü: sarı noktalar **geleneksel akımı** (+'dan −'ye) gösterir; "elektron" denmez. Elektron akışı anlatılacaksa ayrı renk ve açık etiket kullan.
- Bir iddiadan %100 emin değilsen o konuyu `inceleme` olarak işaretle, nedenini günlüğe yaz ve listedeki bir sonraki `bekliyor` konuya geç.

### 6. Animasyon kodu
- Yeni dosya: `bolumler/NNN-kisa-ad.py` (NNN = konu numarası, üç hane). Yapıyı `ornekler/kondansator_rc.py`'den al, motoru `motor/` klasöründen içe aktar.
- Motorun yapı taşları: `Video`, `text`, `card`, `pill`, `wire`, `Path`, `charges_on_path`, `resistor`, `capacitor`, `battery`, `switch`, `led`, `ground`, `Plot` (eğri + işaretçi), `dim`, `fade`, `seg`, `ease_*`, `sfx` ("click", "pop", "whoosh", "ding").
- Yeni bir sembol gerekiyorsa (transistör, op-amp, mantık kapısı, bobin...) **bölüm dosyasında** fonksiyon olarak çiz. Üç bölümde kullanılmış bir sembolü motora taşı.
- Katmanlar: devre 5–12, grafik 15–19, yazı 20, karartma 35, üst kart `OVER` (40) ve üstü. Üst kart sahnelerinde `card(..., z=OVER)` ve `text(..., zorder=OVER + 5)` kullan.
- Güvenli alan: x 60–940, y 380–1700. Altta ve sağda YouTube butonları var.
- `Video(duration=..., tag="ELEKTRONİK • NN SN")`: etiketteki süre gerçek süreyle aynı olsun.

### 7. Görsel kontrol (render'dan önce)
1. `v.contact_sheet([...6–7 an...], "kontrol.png")` ile kareleri üret ve **Read ile bak**.
2. Kontrol listesi: yazılar üst üste binmiyor mu? Kesilen yazı var mı? Her şey güvenli alanda mı? Türkçe karakterler (ı, ş, ğ, İ) doğru mu? Ekrandaki sayılar hesaplarla aynı mı? Üst kart arkadaki yazıları tamamen örtüyor mu?
3. Bir düzeltme turu yap, bir kez daha bak. Hâlâ sorun varsa konuyu `inceleme` yap ve yayınlama.

### 8. Render ve doğrulama
1. `v.render("YYYY-MM-DD_NNN-kisa-ad.mp4")` (≈1 dakika sürer).
2. `ffprobe` ile kontrol: 1080×1920, 30 fps, H.264 + AAC, süre 25–45 sn, boyut < 50 MB.

### 9. Depoya gönderme
1. **Video → `videolar` dalı.** Ayrı bir klasörde `videolar` dalını klonla (yoksa `--orphan` ile oluştur). Yeni mp4'ü ekle, adındaki tarihe göre 14 günden eski mp4'leri sil. Geçmişi küçük tutmak için tek commit'lik yeni bir orphan dal oluşturup `git push -f origin <dal>:videolar` ile gönder. Zorla gönderme reddedilirse normal commit + push yap ve günlüğe not düş.
2. Video adresi: `https://raw.githubusercontent.com/nuraysglm/elektronik-shorts/videolar/<dosya>.mp4`
3. **Kod ve kayıtlar → `main`.** `bolumler/` dosyasını ekle, `konular.md`'de satırı `yayında` + tarih yap, `gunluk.md`'ye satır ekle, commit + push.

### 10. Metricool'a planlama
`createScheduledPost` ile, `blogId` 2. adımda bulunan marka:
- `date` ve `publicationDate`: bugün 12:30, timezone `Europe/Istanbul`
- `providers`: `[{"network": "youtube"}]`
- `media`: [video adresi]
- `text`: açıklama. 2–3 cümle konuyu özetler, sonra `#elektronik #shorts` ve konuya özel 2–3 etiket.
- `youtubeData`:
  - `title`: en fazla 60 karakter, merak uyandıran soru veya net vaat (ör. "Kondansatör neden anında dolmaz?")
  - `type`: `short`, `privacy`: `public`, `madeForKids`: `false`, `category`: `EDUCATION`
  - `tags`: 5–8 Türkçe etiket
  - `isAiGeneratedContent`: `false`. Videolar kodla çizilmiş şematik animasyonlardır; gerçekçi sentetik insan, yer veya olay içermez.
- `autoPublish`: `true`, `draft`: `false`
- Yanıttaki `plannerUrl`'yi günlüğe yaz. Hata dönerse metni değiştirmeden günlüğe yaz, konuyu `bekliyor` durumuna geri al ve dur.

### 11. Kapanış
Son mesaj, telefona bildirim olarak gidecek kısa bir özettir: konu, başlık, yayın saati ve Metricool bağlantısı. Sorun olduysa ne olduğu ve sizden ne gerektiği.

## Yapma listesi
- Konu listesi dışına çıkma, siyaset veya güncel olay ekleme.
- Telifli müzik, logo, karakter veya başka kanalların görselini kullanma. Ses yalnızca motorun ürettiği müzik ve efektlerdir.
- Başka bir Metricool markasına veya ağına gönderi yapma.
- Bir günde birden fazla gönderi planlama.
