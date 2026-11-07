# Elektronik Shorts Ajanı: kurallar

Bu dosya ajanın kurallarıdır. Ajan her çalışmanın başında bu dosyayı baştan sona okur ve eksiksiz uygular.
Kuralları kanal sahibi (kullanıcı) belirler; genel müdür (Claude) bu dosyaya işler. Ajan bu kuralların dışına çıkmaz.

## 1. Kimlik ve hedef

- Kanal: **Öğr. Gör. Nuray SAĞLAM**, @NuraySaglamBedir. YouTube kanal kimliği: `UCAvE1cKeoIbIXCyIks-U81w`
- Her Short, konu listesindeki **bir** konuyu, izleyicinin videodan anlayabileceği şekilde anlatır. Dil **Türkiye Türkçesi**; ondalık ayırıcı virgül (4,7 kΩ), birimler SI.
- **Görsel hedef:** Tracing Science kanalındaki gibi gerçekçi 3D. Stüdyo ışığı altında ahşap masa üzerinde gerçek görünümlü bileşenler (bakır tel, pil, direnç, LED, ampul, multimetre, baskılı devre). Metal yansımaları, yumuşak gölgeler, kamera yavaş ve akıcı hareket eder. Akım, kablolar boyunca akan küreler olarak gösterilebilir.
- Başka kanalların görünüşü, logosu, karakterleri veya müziği kopyalanmaz.

## 2. Kullanıcının ilk denemede bulduğu hatalar (asla tekrarlama)

Genel müdürün yaptığı ilk deneme videosu (`scenes/deneme-faraday.js`) kanal sahibi tarafından **reddedildi**. O dosya yalnızca kod yapısına örnektir; görsel ve anlatım kalitesi için örnek DEĞİLDİR. Reddedilme sebepleri, her videoda kontrol edilecek kurallardır:

1. **Çok kısaydı.** Video konuyu anlatmaya yetecek uzunlukta olmalı. Süreyi konu belirler: 15 saniye de olabilir, 90 saniye ya da daha uzun da. Süreyi doldurmak için tekrar ve boş sahne eklenmez; konuyu kısaltmak için gerekli bilgi de atlanmaz.
2. **Konu ve çözümler doğru olmalı.** Tanımlar, formüller, sayılar ve gösterilen davranışlar hatasız olmalı.
3. **Görsel bozukluk olmamalı.** Titreme, nesnelerin iç içe geçmesi, kesilen yazı veya nesne, yanlış yerde duran parça, ani zıplama, okunmayan yazı olmamalı.
4. **Rahatsız edici tiz sesler ve yüksek sesler olmamalı.** Keskin "bip", "ding", çınlama, cızırtı, ani yüksek efekt kullanılmaz. Efektler yumuşak ve düşük seviyede, müzik konuşmanın altında kalır.
5. **Kurgu doğru olmalı.** Sahneler mantıklı sırayla ilerler; her yazı ve seslendirme, ekrandaki görüntüyle aynı anda aynı şeyi anlatır. Bir kavram gösterilmeden ondan bahsedilmez.
6. **Yazıların boyutu, rengi ve konumu doğru olmalı.** Telefonda rahat okunur, nesnelerin üstüne binmez, bir anda ekranda en fazla 2 satır.
7. **Konu anlaşılır anlatılmalı.** Konuyu hiç bilmeyen bir lise öğrencisi videoyu izleyince anlamalı.

## 3. Teknik hat (değiştirme)

| Adım | Araç |
|------|------|
| Sahne | three.js (WebGL), `tools/vendor/three` (r185, depoda; internetten indirme) |
| Ortak yapı taşları | `tools/lib/stage.js`: stüdyo, masa, malzemeler, `coil`, `wire`, `charges`, `magnet`, `led`, `pcb`, `orbit`, `text` |
| Kare kare çalıştırma | `tools/render.mjs`: başsız Chromium (Playwright), her kare PNG, ffmpeg ile 1080×1920 H.264 |
| Müzik ve efekt | `tools/audio.py`: numpy ile sentez; efektler sahnenin `meta.cues` zamanlarına yerleşir |
| Seslendirme | Yerel, ücretsiz TTS: **Piper**, Türkçe ses `tr_TR-dfki-medium` (bkz. 6) |

Ekran kartı yok; WebGL işlemcide çalışır. **Denemeler düşük çözünürlükte, son render bir kez:**
- Kare kontrolü: `node tools/render.mjs <sahne> --scale 0.4 --stills 1,4,8,... --out /tmp/k.png`, sonra görseli Read ile incele.
- Hareket kontrolü: `--preview` (540×960, 15 fps, sessiz) ile render alıp 1 saniye aralıklı kareleri kontrol et.
- Son render: `node tools/render.mjs <sahne> --out media/<video-id>/<video-id>.mp4` (sesli).
- **Performans:** `transmission` malzemesi kullanma; kare süresini 3 katına çıkarır. Tam çözünürlükte kare başına ~1,5–3 sn beklenir; render'ı arka planda çalıştır ve ilerlemesini izle.

Sahne dosyası şu şekli dışa aktarır:
```js
export const meta = { title, duration, fps: 30, music: { bpm, key, gain }, cues: [{ t, kind, gain }], voice: 'wip/<id>/ses.wav', voice_at: 0 };
export function build(S) { /* nesneleri kur */ return (t) => { /* t anındaki durum */ }; }
```
Zaman deterministiktir: `Date`, `Math.random`, `requestAnimationFrame` kullanılmaz; rastgelelik için `S.rng(seed)`.
Bir yapı taşı eksikse (pil, direnç, ampul, multimetre, ok, su borusu benzetmesi...) önce sahne dosyasında yaz; iki videoda tekrar ederse `tools/lib/stage.js`'e taşı.

## 4. Ekran düzeni (9:16)

- Yazılar üstte, `y` %4–24 bandında; en fazla 2 satır, kalın; ana başlık 6–8 vw, açıklama 5–6 vw, etiket en az 4 vw. Vurgu renkleri: `hl` sarı, `rd` kırmızı, `gr` yeşil, `bl` mavi, `cu` bakır. Aynı kavram her yerde aynı renkte (ör. gerilim hep sarı, akım hep kırmızı, direnç hep mavi).
- Ana nesneler ekranın %25–75 yüksekliğinde. **Alt %20'ye önemli hiçbir şey konmaz** (YouTube başlık ve butonları). Sağ kenardan %12 içeride kal.
- Yazı hiçbir zaman ana nesnenin üstüne binmez.
- Formüller tek satır (`nowrap: true`).
- Nesnelerin üzerindeki etiketler (ör. "R = 100 Ω") nesneye yakın, okunur ve kamera hareketinde titremez.

## 5. Senaryo ve kurgu

1. **Senaryoyu önce yaz:** `wip/<id>/senaryo.md`. Her sahne için: süre, ekranda ne görünüyor, ekrandaki yazı, seslendirme metni, efekt.
2. Yapı: **Kanca** (0–3 sn, ilk karede görünür soru/iddia) → **Kavramlar** (her biri tek tek, görselle) → **İlişki/kural** (formül + gerçek değerlerle örnek) → **Özet** (tek cümle).
3. Her yeni kavram önce görselle tanıtılır, sonra adı söylenir. Bir sahnede tek fikir.
4. Seslendirme varsa yazılar seslendirmenin kısa özetidir, aynısı değildir. Seslendirme ile görüntü senkron olmalı.
5. Konunun "gerekli bilgi" listesini senaryonun başına yaz ve videoda her maddenin geçtiğini işaretle.

## 6. Ses

- Açıklama gerekiyorsa **Türkçe seslendirme** kullan. Metin sade, doğal, öğretmen tonunda; cümleler kısa.
- Piper kurulumu: `pip install piper-tts`, ses modeli `tr_TR-dfki-medium` (Hugging Face `rhasspy/piper-voices`). **Çalışmanın en başında** (senaryodan önce) modeli indirip kısa bir deneme cümlesi seslendir; olmazsa vakit kaybetmeden dur. İndirme reddedilirse hata mesajındaki ve yönlendirmelerdeki tam adresleri (`curl -sIL` ile) kanal sahibine bildir. Komut kullanımını `python3 -m piper --help` ile kontrol et. Ses dosyasını `wip/<id>/ses.wav` olarak kaydet, sahnede `meta.voice` ile bağla.
- Piper kurulamazsa (ağ izni yoksa): seslendirmesiz devam etme. İşi `wip/`'e kaydet, panele "seslendirme kurulamadı: <hata>" yaz ve dur. Kullanıcıya hangi adreslerin ağ izin listesine eklenmesi gerektiğini bildir (pypi.org, files.pythonhosted.org, huggingface.co ve indirme sırasında yönlendirilen adresler).
- **Ses kuralları:** Efektlerde 4 kHz üstü keskin tonlar yok (ding, bip, sparkle, zap, tick kullanma; gerekiyorsa alçak geçiren filtreyle yumuşat). Efekt seviyesi konuşmanın en az 10 dB altında. Müzik konuşma varken konuşmanın altında kalır. Son ses: -16 LUFS, tepe -1,5 dBTP (render aracı `loudnorm` uygular).

## 7. Kalite kontrolü (yayından önce zorunlu)

Bir madde geçmezse düzelt ve kontrolü tekrarla. 3 turda geçmezse yayınlama, panele nedenini yaz.

**A. İçerik doğruluğu ve eksiksizlik**
- Senaryodaki her iddia, tanım, formül ve sayı için `wip/<id>/dogruluk.md`'ye bir satır yaz: iddia → neden doğru (formül/hesap) → ✔.
- Ekrandaki her sayı sahne kodunda hesaplanır ve `console.assert` ile bağımsız olarak doğrulanır.
- "Gerekli bilgi" listesindeki her madde videoda var mı? Eksik varsa video eksiktir.
- Mümkünse ayrı bir alt ajana (Agent aracı) yalnızca senaryoyu, seslendirme metnini ve kareleri ver; konunun doğru ve eksiksiz anlatılıp anlatılmadığını bağımsız değerlendirsin. Bulduklarını düzelt.

**B. Görüntü**
- Son render'dan her 1–2 saniyede bir kare çıkar (ffmpeg `fps=1`, karelerden kontak sayfaları) ve hepsini Read ile incele. Bölüm 2 ve 4'teki her kuralı kare kare kontrol et.
- Render sırasında tarayıcı konsoluna hata düşmüş olmamalı.

**C. Ses**
- `ffmpeg -af ebur128` ile ölç: entegre ses yaklaşık -16 LUFS, tepe -1,5 dBTP altında.
- `astats` ile ani tepe ara; 4 kHz üstü bant enerjisini kontrol et (`highpass=f=4000,volumedetect`); keskin tepe varsa efekti düzelt.
- Seslendirme anlaşılır mı, kesik veya üst üste binen cümle var mı?

**D. Teknik**
- `ffprobe`: 1080×1920, 30 fps, H.264 + AAC, süre senaryodakiyle aynı.

Kontrollerin sonucunu `wip/<id>/kalite.md`'ye yaz; panelde de özetle.

## 8. Konular

- Konuları **kanal sahibi** verir; `konular.md` onun listesidir. Ajan listeye konu eklemez, çıkarmaz, sırasını değiştirmez.
- Durumu `bekliyor` olan **ilk** konu işlenir. `bekliyor` konu yoksa hiçbir şey üretme; panele "konu listesi bitti" yaz, kanal sahibine "Yeni konu listesi bekleniyor" diye kısa bildirim gönder ve dur.
- Durumu `yarım kaldı` olan bir konu varsa önce onu `wip/`'teki notlardan devam ettirerek bitir. Video kimliği: `NNN-kisa-ad` (ör. `001-akim-gerilim-direnc`).
- Konunun başlığında birden fazla soru varsa (ör. "Nedir ve aralarında nasıl bir ilişki vardır?") hepsi videoda cevaplanır.

## 9. Yayın modu

- **Şu an: hemen yayın.** Video kalite kontrolünden (bölüm 7) geçtiği anda YouTube'da yayınlanır. Kanal sahibi videoyu yayından sonra YouTube'da kontrol eder.
- Metricool `createScheduledPost`: `draft: false`, `autoPublish: true`, tarih = şu an + 10 dakika (`Europe/Istanbul`; Metricool videoyu kopyalamak için bu süreye ihtiyaç duyar). Gece veya sabah olması fark etmez; beklenmez.
- Kalite kontrolünden geçmeyen video **asla** yayınlanmaz; düzeltilir ya da `inceleme` olarak işaretlenir.

## 10. Dosyalar ve depolama

Çalışma bilgisayarı her çalışmadan sonra silinir; saklanacak her şey depoya gider.

| Yol | İçerik |
|-----|--------|
| `tools/` | Tekrar kullanılabilir görüntü ve ses kodu |
| `scenes/<video-id>.js` | Bitmiş bölümün sahne kodu |
| `wip/<video-id>/` | Yarım iş ve kontrol belgeleri: `senaryo.md`, `dogruluk.md`, `kalite.md`, `NOTLAR.md` (nerede kaldın), `scene.js`, `ses.wav` |
| `media/<video-id>/` | Bitmiş MP4 ve kapak (`kapak.jpg`, kanca karesinden) |
| `konular.md`, `gunluk.md` | Konu durumu ve çalışma günlüğü |

- Ara dosyalar (PNG kareler, ham ses parçaları) yalnızca geçici klasörde kalır, depoya konmaz.
- **Push yalnızca `claude/<video-id>` dalına.** GitHub Action bu dalı otomatik olarak main'e birleştirir ve dalı siler. Uzun işlerde ara ara push et (çalışma yarıda kesilirse iş kaybolmasın).
- Main'de dosyanın göründüğünü doğrula: `git fetch origin main && git cat-file -e origin/main:media/<id>/<id>.mp4`. 3 dakika içinde görünmezse panele "birleştirme bekliyor" yaz.
- Video adresi: `https://raw.githubusercontent.com/nuraysglm/elektronik-shorts/main/media/<id>/<id>.mp4`
- Depo herkese açıktır: içine şifre, belirteç veya kişisel bilgi konmaz.

## 11. Her çalışmanın akışı

1. Depoyu oku: bu dosya, `konular.md`, `gunluk.md`, `wip/` (yarım iş varsa önce onu bitir).
2. **Güvenlik:** Metricool `getBrandSettings` ile `youtubeData == "UCAvE1cKeoIbIXCyIks-U81w"` olan markayı bul (`blogId`). Yoksa dur.
3. Konuyu seç, `claude/<video-id>` dalını aç.
4. Senaryo → seslendirme → sahne kodu → kare kontrolü → hareket kontrolü → son render.
5. Kalite kontrolü (bölüm 7). Geçmezse düzelt.
6. Sahneyi `scenes/`'e, videoyu ve kapağı `media/<id>/`'e koy; kontrol belgelerini `wip/<id>/`'de bırak; commit + push; main'de göründüğünü doğrula.
7. Yayın modu (bölüm 9): Metricool ile hemen yayınla (şu an + 10 dk) — YouTube `short`, `privacy: public`, `madeForKids: false`, `category: EDUCATION`, başlık ≤ 60 karakter, açıklamada 2–3 cümle + `#elektronik #shorts` + 2–3 konu etiketi, `isAiGeneratedContent: false`.
8. `konular.md` (`yayında` + tarih) ve `gunluk.md`'yi (`planlandı` + yayın saati + Metricool bağlantısı) güncelle, paneli yenile (bölüm 12), commit + push.
9. Son mesaj: konu, süre, video adresi, kalite kontrol özeti, yayın saati ve Metricool bağlantısı; sorun varsa ne olduğu.

**Zaman yetmezse:** İşi `wip/<id>/` altına kaydet (`NOTLAR.md`'de nerede kaldığını yaz), push et, panele "yarım kaldı" yaz. Bir sonraki çalışma oradan devam eder.

## 12. Panel

Kullanıcı ajanı Claude'daki "Elektronik Shorts Ajanı" panelinden izler: `https://claude.ai/artifact/7zyMo4GPgxmwKbRWCZxTKt`
Panel verisi panelin kendi veritabanında durur: `datasets/bolumler`, `datasets/konular`, `datasets/ayarlar`.
Her çalışmanın sonunda **— durduğunda, hata aldığında veya hiçbir video üretmediğinde de —** önce `gunluk.md`'ye o çalışmanın satırını ekle (sonuç: `durdu`/`hata`, Not sütununda sebep), commit edip `claude/` dalına push et, sonra paneli güncelle. Kanal sahibi panelde her çalışmayı görmelidir.
1. `python3 panel/panel_veri.py` → `panel/bolumler.json`, `panel/konular.json`
2. Değişen her json için: Artifact publish (`url` = panel, `asset: true`, `file_path`) → yeni `/_blob/<id>`; `ArtifactData` `get` + `update` ile `datasets/<ad>` belgesinin `source.url`, `source.name`, `updated`, `edit` alanlarını güncelle. Eski blobu silme (izin isteği çıkarır; eski dosyalar zararsızdır).
3. Panelin sayfasına (`files/index.html`) dokunma.

`gunluk.md` sonuç değerleri: `planlandı`, `onay bekliyor`, `inceleme`, `yarım kaldı`, `hata`, `durdu`.

## 13. Yapma listesi

- Kullanıcının bilgisayarını kullanma; her şey bu bulut çalışma ortamında olur.
- Higgsfield veya başka bir yapay zekâ görsel/video üretim aracı kullanma. Görüntü ve ses kodla üretilir.
- Telifli müzik, logo, karakter, başka kanalın görseli kullanma.
- Başka bir Metricool markasına veya ağına gönderi yapma; kalite kontrolünden geçmemiş videoyu yayınlama.
