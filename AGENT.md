# Elektronik Shorts Ajanı: kurallar

Bu dosya ajanın kurallarıdır. Ajan her çalışmanın başında bu dosyayı baştan sona okur ve uygular.
Ajana yeni bir şey öğretmek için bu dosyayı düzenleyin; bir sonraki çalışmadan itibaren geçerli olur.

## 1. Kimlik ve hedef

- Kanal: **Öğr. Gör. Nuray SAĞLAM**, @NuraySaglamBedir. YouTube kanal kimliği: `UCAvE1cKeoIbIXCyIks-U81w`
- Her Short tek bir elektronik kavramını öğretir. Dil **Türkiye Türkçesi**; ondalık ayırıcı virgül (4,7 kΩ), birimler SI.
- **Görsel hedef:** Tracing Science kanalındaki gibi gerçekçi 3D. Stüdyo ışığı altında ahşap masa üzerinde gerçek görünümlü bileşenler (bakır bobin, mıknatıs, LED, direnç, kondansatör, baskılı devre, pil). Metal yansımaları, yumuşak gölgeler, kamera her an yavaşça hareket eder. Akım, kablolar boyunca akan kırmızı küreler olarak gösterilir.
- Kalite çıtası: `scenes/deneme-faraday.js` ve onun çıktısı `media/deneme-faraday/`. Her yeni Short en az bu kadar iyi olmalı.
- Başka kanalların görünüşü, logosu, karakterleri veya müziği kopyalanmaz.

## 2. Teknik hat (değiştirme)

| Adım | Araç |
|------|------|
| Sahne | three.js (WebGL), `tools/vendor/three` (r185, depoda; internetten indirme) |
| Ortak yapı taşları | `tools/lib/stage.js`: stüdyo, masa, malzemeler, `coil`, `wire`, `charges`, `magnet`, `led`, `pcb`, `orbit`, `text` |
| Kare kare çalıştırma | `tools/render.mjs`: başsız Chromium (Playwright), her kare PNG, ffmpeg ile 1080×1920 H.264 |
| Ses | `tools/audio.py`: müzik ve efektler numpy ile sentezlenir; efektler sahnenin `meta.cues` zamanlarına yerleşir |
| Seslendirme | Yerel, ücretsiz TTS (Piper, Türkçe ses). Kurulamazsa seslendirmesiz devam et ve panele not düş |

Ekran kartı yok; WebGL işlemcide çalışır. **Denemeler düşük çözünürlükte, son render bir kez:**
- Kare kontrolü: `node tools/render.mjs <sahne> --scale 0.4 --stills 1,4,8,... --out /tmp/k.png`, sonra görseli Read ile incele.
- Hareket kontrolü (gerekirse): `--preview` (540×960, 15 fps, sessiz).
- Son render: `node tools/render.mjs <sahne> --out media/<video-id>/<video-id>.mp4` (sesli).

Bir sahne dosyası şu şekli dışa aktarır:
```js
export const meta = { title, duration, fps: 30, music: { bpm, key, gain }, cues: [{ t, kind, gain }], voice?: 'wip/<id>/ses.wav' };
export function build(S) { /* nesneleri kur */ return (t) => { /* t anındaki durum */ }; }
```
Zaman deterministiktir: `Date`, `Math.random`, `requestAnimationFrame` kullanılmaz; rastgelelik için `S.rng(seed)`.

## 3. Ekran düzeni (9:16)

- Yazılar üstte, `y` %4–24 bandında; en fazla 2 satır, büyük ve kalın (`S.text`, boyut 6–10 vw). Vurgu renkleri: `hl` sarı, `rd` kırmızı, `gr` yeşil, `bl` mavi, `cu` bakır.
- Ana nesneler ekranın %25–75 yüksekliğinde. **Alt %20'ye önemli hiçbir şey konmaz** (YouTube başlık ve butonları). Sağ kenardan %12 içeride kal.
- Yazı hiçbir zaman ana nesnenin üstüne binmez; kare kontrolünde bunu özellikle ara.
- Formüller tek satır (`nowrap: true`), renkleri sahnedeki nesnelerle eşleşir.

## 4. Senaryo (25–40 sn)

1. **Kanca (0–3 sn):** Soru veya şaşırtıcı iddia. İlk karede görünür.
2. **Gösterim:** Nesne hareket eder, yükler akar; 3–4 kısa adım yazısı neyin olduğunu söyler.
3. **Kural:** Formül veya tek cümlelik ilke + gerçek değerlerle bir örnek.
4. **Kapanış (son 3 sn):** Tek cümlelik özet. Sondaki kare başa sarınca akıcı görünmeli (Shorts döngüde oynar).

## 5. Doğruluk (en önemli kural)

- Ekrandaki her sayı ve her davranış (akımın yönü, LED'in hangi yönde yandığı, gerilim değerleri) sahne kodunda fizik formülüyle hesaplanır.
- Sahne dosyasının başına `console.assert` ile bağımsız kontroller konur (bkz. deneme-faraday: durağanken akım 0, giriş ve çıkış zıt yönlü). Render sırasında konsola hata düşerse yayınlama.
- Akım gösterimi geleneksel akım yönüdür. "Elektron" denirse ayrı renk ve açık etiket kullanılır.
- Şüphe varsa konu `inceleme` olur, panele nedeni yazılır, sıradaki konuya geçilir.

## 6. Konular

`konular.md` sıralı listedir; durumu `bekliyor` olan ilk konu işlenir. Video kimliği: `NNN-kisa-ad` (ör. `001-ohm-yasasi`).

## 7. Dosyalar ve depolama

Çalışma bilgisayarı her çalışmadan sonra silinir; saklanacak her şey depoya gider.

| Yol | İçerik |
|-----|--------|
| `tools/` | Tekrar kullanılabilir görüntü ve ses kodu. Üç bölümde tekrar eden bir nesneyi buraya taşı. |
| `scenes/<video-id>.js` | Bitmiş bölümün sahne kodu |
| `wip/<video-id>/` | Yarım kalan iş: sahne kodu, notlar (`NOTLAR.md`: nerede kaldın, sırada ne var), ara video |
| `media/<video-id>/` | Bitmiş MP4 ve kapak görseli (`kapak.jpg`, kanca karesinden) |
| `konular.md`, `gunluk.md` | Konu durumu ve çalışma günlüğü |

- Ara dosyalar (PNG kareler, ham ses) yalnızca geçici klasörde kalır, depoya konmaz.
- **Push yalnızca `claude/<video-id>` dalına.** GitHub Action bu dalı otomatik olarak main'e birleştirir ve dalı siler.
- Push'tan sonra main'de dosyanın göründüğünü doğrula: `git fetch origin main && git cat-file -e origin/main:media/<id>/<id>.mp4`. 3 dakika içinde görünmezse yayınlama, panele "birleştirme bekliyor" yaz.
- Video adresi: `https://raw.githubusercontent.com/nuraysglm/elektronik-shorts/main/media/<id>/<id>.mp4`
- Depo herkese açıktır: içine şifre, belirteç veya kişisel bilgi konmaz.

## 8. Her çalışmanın akışı

1. Depoyu oku: bu dosya, `konular.md`, `gunluk.md`, `wip/` (yarım iş varsa önce onu bitir).
2. **Güvenlik:** Metricool `getBrandSettings` ile `youtubeData == "UCAvE1cKeoIbIXCyIks-U81w"` olan markayı bul (`blogId`). Yoksa dur. Bugün bu markada YouTube gönderisi zaten planlıysa dur.
3. Konuyu seç, `claude/<video-id>` dalını aç.
4. Senaryoyu ve sahne kodunu yaz (`wip/<id>/scene.js`). Kare kontrolü yap, düzelt (en fazla 3 tur).
5. Son render. `ffprobe` ile kontrol: 1080×1920, 30 fps, H.264 + AAC, 20–60 sn.
6. Sahneyi `scenes/`'e, videoyu `media/<id>/`'e taşı, `wip/<id>/`'i sil, commit + push. Main'de göründüğünü doğrula.
7. Metricool `createScheduledPost`: YouTube `short`, `privacy: public`, `madeForKids: false`, `category: EDUCATION`, başlık ≤ 60 karakter, açıklamada 2–3 cümle + `#elektronik #shorts` + 2–3 konu etiketi. Tarih: bugün 12:30 `Europe/Istanbul` (geçtiyse şu an + 20 dk). `isAiGeneratedContent: false` (kodla çizilmiş şematik animasyon).
8. `konular.md` ve `gunluk.md`'yi güncelle, panelin verisini yenile (bkz. 9), commit + push.
9. Son mesaj: konu, başlık, yayın saati, Metricool bağlantısı; sorun varsa ne olduğu.

**Zaman yetmezse:** İşi `wip/<id>/` altına kaydet (sahne + `NOTLAR.md`), push et, panele "yarım kaldı" yaz. Bir sonraki çalışma oradan devam eder.

## 9. Panel

Kullanıcı ajanı Claude'daki "Elektronik Shorts Ajanı" panelinden izler: `https://claude.ai/artifact/7zyMo4GPgxmwKbRWCZxTKt`
Panel verisi panelin kendi deposunda (artifact veritabanı) durur: `datasets/bolumler`, `datasets/konular`, `datasets/ayarlar`.
Her çalışmanın sonunda (durulsa bile):
1. `python3 panel/panel_veri.py` → `panel/bolumler.json`, `panel/konular.json`
2. Değişen her json için: Artifact publish (`url` = panel, `asset: true`, `file_path`) → yeni `/_blob/<id>`; `ArtifactData` `get` + `update` ile `datasets/<ad>` belgesinin `source.url`, `source.name`, `updated`, `edit` alanlarını güncelle; eski blobu sil.
3. Panelin sayfasına (`files/index.html`) dokunma.

## 10. Yapma listesi

- Kullanıcının bilgisayarını kullanma; her şey bu bulut çalışma ortamında olur.
- Higgsfield veya başka bir yapay zekâ görsel/video üretim aracı kullanma. Görüntü ve ses kodla üretilir.
- Telifli müzik, logo, karakter, başka kanalın görseli kullanma.
- Başka bir Metricool markasına veya ağına gönderi yapma; günde birden fazla gönderi planlama.
