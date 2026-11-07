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
5. **Kurgu doğru olmalı.** Sahneler mantıklı sırayla ilerler; her yazı ekrandaki görüntüyle aynı anda aynı şeyi anlatır. Bir kavram gösterilmeden ondan bahsedilmez.
6. **Yazıların boyutu, rengi ve konumu doğru olmalı.** Telefonda rahat okunur, nesnelerin üstüne binmez, bir anda ekranda en fazla 2 satır.
7. **Konu anlaşılır anlatılmalı.** Konuyu hiç bilmeyen bir lise öğrencisi videoyu izleyince anlamalı.
8. **Türkçe seslendirme yeterince doğal değildi.** Kanal sahibinin kararı: videolarda **insan sesi / seslendirme kullanılmaz.** Anlatımı ekranda akan yazılar yapar (bölüm 6).

## 3. Teknik hat (değiştirme)

| Adım | Araç |
|------|------|
| Sahne | three.js (WebGL), `tools/vendor/three` (r185, depoda; internetten indirme) |
| Ortak yapı taşları | `tools/lib/stage.js`: stüdyo, masa, malzemeler, `coil`, `wire`, `charges`, `magnet`, `led`, `pcb`, `orbit`, `text` |
| Kare kare çalıştırma | `tools/render.mjs`: başsız Chromium (Playwright), her kare PNG, ffmpeg ile 1080×1920 H.264 |
| Müzik ve efekt | `tools/audio.py`: numpy ile sentez; efektler sahnenin `meta.cues` zamanlarına yerleşir |
| Seslendirme | **Yok.** Kanal sahibinin kararı; Piper ve başka TTS kullanılmaz (bkz. 6) |

Ekran kartı yok; WebGL işlemcide çalışır. **Denemeler düşük çözünürlükte, son render bir kez:**
- Kare kontrolü: `node tools/render.mjs <sahne> --scale 0.4 --stills 1,4,8,... --out /tmp/k.png`, sonra görseli Read ile incele.
- Hareket kontrolü: `--preview` (540×960, 15 fps, sessiz) ile render alıp 1 saniye aralıklı kareleri kontrol et.
- Son render: `node tools/render.mjs <sahne> --out media/<video-id>/<video-id>.mp4` (sesli).
- **Performans:** `transmission` malzemesi kullanma; kare süresini 3 katına çıkarır. Tam çözünürlükte kare başına ~1,5–3 sn beklenir; render'ı arka planda çalıştır ve ilerlemesini izle.

Sahne dosyası şu şekli dışa aktarır:
```js
export const meta = { title, duration, fps: 30, music: { off: true }, cues: [{ t, kind, gain }] };
export function build(S) { /* nesneleri kur */ return (t) => { /* t anındaki durum */ }; }
```
Zaman deterministiktir: `Date`, `Math.random`, `requestAnimationFrame` kullanılmaz; rastgelelik için `S.rng(seed)`.
Bir yapı taşı eksikse (pil, direnç, ampul, multimetre, ok, su borusu benzetmesi...) önce sahne dosyasında yaz; iki videoda tekrar ederse `tools/lib/stage.js`'e taşı.

## 3a. Zaman bütçesi ve parça parça render (zorunlu)

Bir çalışma yaklaşık 30–40 dakikada kesilebilir. Uzun bir video tek çalışmaya sığmaz; iş birden çok çalışmaya yayılır ve **hiçbir iş kaybolmaz**:

1. **Ara kayıt:** Çalışma başladıktan sonra en geç her 20 dakikada bir: `wip/<id>/`'deki her şeyi commit edip `claude/<id>` dalına push et, `NOTLAR.md`'ye "nerede kaldım, sıradaki adım" yaz, panelde `bolumler`'e (aynı çalışmanın belgesini güncelleyerek) `sonuc: "yarım kaldı"` ve kısa not yaz.
2. **Parça parça render:** Son render'ı tek seferde alma. Sahneyi 15–20 saniyelik parçalara böl:
   `node tools/render.mjs <sahne> --from <bas> --to <bit> --no-audio --out wip/<id>/parca-NN.mp4`
   Her parça bitince hemen commit + push et ve `NOTLAR.md`'de işaretle (`parca-03: tamam`). Parçalar küçük, sessiz MP4'lerdir; depoya konabilir.
3. **Devam:** Her çalışmanın başında `wip/` ve `NOTLAR.md`'yi oku; yarım işi kaldığı yerden sürdür (yeni konuya geçme).
4. **Birleştirme:** Tüm parçalar hazır olunca ffmpeg concat ile birleştir, animasyon seslerini (`tools/audio.py`) ekle, `loudnorm` uygula → `media/<id>/<id>.mp4`. Sonra kalite kontrolü (bölüm 7) ve yayın.
5. Parçalar ve kalite kontrolü bitip video yayınlanınca `wip/<id>/parca-*.mp4` dosyalarını sil (kontrol belgeleri kalır).
6. Kesilmeden önce yetişemezsen bile son ara kayıt zaten yapılmış olmalı; kanal sahibi panelde işin nerede olduğunu görür.

## 4. Ekran düzeni (9:16)

- Yazılar üstte, `y` %4–24 bandında; en fazla 2 satır, kalın; ana başlık 6–8 vw, açıklama 5–6 vw, etiket en az 4 vw. Vurgu renkleri: `hl` sarı, `rd` kırmızı, `gr` yeşil, `bl` mavi, `cu` bakır. Aynı kavram her yerde aynı renkte (ör. gerilim hep sarı, akım hep kırmızı, direnç hep mavi).
- Ana nesneler ekranın %25–75 yüksekliğinde. **Alt %20'ye önemli hiçbir şey konmaz** (YouTube başlık ve butonları). Sağ kenardan %12 içeride kal.
- Yazı hiçbir zaman ana nesnenin üstüne binmez.
- Formüller tek satır (`nowrap: true`).
- Nesnelerin üzerindeki etiketler (ör. "R = 100 Ω") nesneye yakın, okunur ve kamera hareketinde titremez.

## 5. Senaryo ve kurgu

1. **Senaryoyu önce yaz:** `wip/<id>/senaryo.md`. Her sahne için: süre, ekranda ne görünüyor, ekrandaki yazı (anlatım), efekt.
2. Yapı: **Kanca** (0–3 sn, ilk karede görünür soru/iddia) → **Kavramlar** (her biri tek tek, görselle) → **İlişki/kural** (formül + gerçek değerlerle örnek) → **Özet** (tek cümle).
3. Her yeni kavram önce görselle tanıtılır, sonra adı söylenir. Bir sahnede tek fikir.
4. Seslendirme yok: senaryodaki her sahnenin "ekran yazısı" sütunu anlatımın kendisidir; izleyici sesi kapalı izlese de konuyu tam anlamalı.
5. Konunun "gerekli bilgi" listesini senaryonun başına yaz ve videoda her maddenin geçtiğini işaretle.

## 6. Ses ve ekran yazıları (anlatım)

**Ses:** Kanal sahibinin kararı: **yalnızca animasyon sesleri.** Seslendirme (insan sesi, TTS) ve arka plan müziği yok.
- Efektler ekrandaki olaylara bağlıdır (anahtar kapanır → yumuşak tık, yük akmaya başlar → hafif uğultu, değer değişir → yumuşak pop, nesne yerine oturur → alçak "thud"). Olay yoksa ses yok; boş yerlere efekt serpiştirme.
- Efektlerde 4 kHz üstü keskin tonlar yok (ding, bip, sparkle, zap, tick kullanma; gerekiyorsa alçak geçiren filtreyle yumuşat). Ani yüksek ses yok. Son ses: -16 LUFS civarı, tepe -1,5 dBTP altında (render aracı `loudnorm` uygular; sessiz anların yükseltilmemesine dikkat et).
- Sahne `meta`: `music: { off: true }`, `voice` alanı yok.

**Anlatım = ekranda akan yazılar.** Seslendirmenin yaptığı işi yazılar yapar:
- Önemli her bilgi, sırası gelince ekranda yazı olarak belirir: kısa cümleler, bir anda tek fikir. Önceki satır yukarı kayarak/solarak yer açar; yeni satır aşağıdan akarak gelir (yumuşak geçiş, 0,3–0,4 sn).
- **Okuma süresi:** Her yazı ekranda en az `1,2 sn + 0,35 sn × kelime sayısı` kalır. Senaryonun süresini yazıların okunma süresi belirler; acele ettirme.
- Bir anda ekranda en fazla 2 satır anlatım yazısı + gerekirse 1 formül satırı.
- Yazı, anlattığı olayla **aynı anda** görünür (ör. "Akım: telde akan yük" yazısı yükler akarken).
- Anahtar kelimeler renkli: gerilim sarı (`hl`), akım kırmızı (`rd`), direnç mavi (`bl`). Sayılar ve birimler her zaman yazıyla da verilir (9 V, 450 Ω, 20 mA).
- Yazılar bölüm 4'teki boyut, konum ve güvenli alan kurallarına uyar.

## 7. Kalite kontrolü (yayından önce zorunlu)

Bir madde geçmezse düzelt ve kontrolü tekrarla. 3 turda geçmezse yayınlama; panelde kanal sahibine onay isteği aç (bölüm 13).

**A. İçerik doğruluğu ve eksiksizlik**
- Senaryodaki her iddia, tanım, formül ve sayı için `wip/<id>/dogruluk.md`'ye bir satır yaz: iddia → neden doğru (formül/hesap) → ✔.
- Ekrandaki her sayı sahne kodunda hesaplanır ve `console.assert` ile bağımsız olarak doğrulanır.
- "Gerekli bilgi" listesindeki her madde videoda var mı? Eksik varsa video eksiktir.
- Mümkünse ayrı bir alt ajana (Agent aracı) yalnızca senaryoyu, ekran yazılarını ve kareleri ver; konunun doğru ve eksiksiz anlatılıp anlatılmadığını bağımsız değerlendirsin. Bulduklarını düzelt.

**B. Görüntü**
- Son render'dan her 1–2 saniyede bir kare çıkar (ffmpeg `fps=1`, karelerden kontak sayfaları) ve hepsini Read ile incele. Bölüm 2 ve 4'teki her kuralı kare kare kontrol et.
- Render sırasında tarayıcı konsoluna hata düşmüş olmamalı.

**C. Ses**
- `ffmpeg -af ebur128` ile ölç: entegre ses yaklaşık -16 LUFS, tepe -1,5 dBTP altında.
- `astats` ile ani tepe ara; 4 kHz üstü bant enerjisini kontrol et (`highpass=f=4000,volumedetect`); keskin tepe varsa efekti düzelt.
- Videoda seslendirme veya müzik yok; yalnızca olaylara bağlı efektler var mı?
- Her ekran yazısı okuma süresi kuralına uyuyor mu (karelerden zamanla kontrol et)?

**D. Teknik**
- `ffprobe`: 1080×1920, 30 fps, H.264 + AAC, süre senaryodakiyle aynı.

Kontrollerin sonucunu `wip/<id>/kalite.md`'ye yaz; panelde de özetle.

## 8. Konular

- Konuları **kanal sahibi** verir; `konular.md` onun listesidir. Ajan listeye konu eklemez, çıkarmaz, sırasını değiştirmez.
- Durumu `bekliyor` olan **ilk** konu işlenir. `bekliyor` konu yoksa hiçbir şey üretme; panele "konu listesi bitti" yaz, kanal sahibine "Yeni konu listesi bekleniyor" diye kısa bildirim gönder ve dur.
- Durumu `yarım kaldı` olan bir konu varsa önce onu `wip/`'teki notlardan devam ettirerek bitir.
- Durumu `yeniden düzenle` olan bir konu varsa **her şeyden önce** onu ele al: mevcut sahneyi (`scenes/` veya `wip/`) ve kontrol belgelerini temel alarak kanal sahibinin yeni kurallarına göre düzenle, yeniden render et, kalite kontrolünden geçir. Metricool'da o konunun taslak gönderisi varsa (`konular.md` Notu'nda uuid yazar) yeni gönderi açma; `updateScheduledPost` ile o gönderinin videosunu yeni dosyayla değiştir, `draft: false`, `autoPublish: true` yap ve bölüm 9'daki sıradaki boş 16:00'a planla. Video kimliği: `NNN-kisa-ad` (ör. `001-akim-gerilim-direnc`).
- Konunun başlığında birden fazla soru varsa (ör. "Nedir ve aralarında nasıl bir ilişki vardır?") hepsi videoda cevaplanır.

## 9. Yayın takvimi ve stok kuralı

Kanal sahibinin kararı:
- **Günde 1 video, saat 16:00'da (Europe/London)** yayınlanır.
- Ajan **günde iki kez** çalışır: **08:00** ve **12:00** (Londra).
- **Stok kuralı:** Planlanmış ve henüz yayınlanmamış YouTube Short sayısı
  - **2 veya daha fazla** ise: yeni video üretme. Yalnızca kayıtları güncelle (bkz. aşağı) ve dur.
  - **1 veya 0** ise: **bir** yeni video üret ve planla (stok 2'ye doğru tamamlanır; bir çalışmada en fazla bir video).
- Yarım kalmış bir video varsa (`wip/` ve `NOTLAR.md`), yeni konuya geçmeden önce onu bitir; o da stok için üretilen video sayılır.

**Stoku sayma (her çalışmanın başında):** Metricool `getScheduledPosts` ile (marka: bölüm 11'deki `blogId`, `timezone: Europe/London`, bugünden 14 gün sonrasına kadar) YouTube gönderilerini al. `draft: true` olanları ve başka ağların gönderilerini sayma; yalnızca bu kanalın yayın bekleyen YouTube Short'larını say.

**Planlama saati:** Bugünden başlayarak 16:00'da (Europe/London) bu kanalın YouTube gönderisi olmayan **ilk gün**. Bugünün 16:00'ı geçtiyse ya da 30 dakikadan az kaldıysa bir sonraki günden başla. Aynı güne iki video planlama.

**Metricool `createScheduledPost`:** `draft: false`, `autoPublish: true`, `publicationDate: {dateTime: "<YYYY-MM-DD>T16:00:00", timezone: "Europe/London"}`. YouTube ayarları bölüm 11'deki gibi.

**Kayıtları güncelleme (her çalışmada):** Daha önce `planlandı` olarak kaydedilmiş ve yayın saati geçmiş videoları Metricool'da kontrol et; yayınlandıysa `konular.md` ve paneldeki `konular` belgesini `yayında`, `bolumler` belgesini `yayınlandı` yap.

Kalite kontrolünden (bölüm 7) geçmeyen video **asla** planlanmaz; kanal sahibi panelde onay verirse planlanır (bölüm 13).

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
2a. **Stok:** Bölüm 9'a göre planlanmış video sayısını say ve eski kayıtları güncelle. Stok 2 veya fazlaysa panelde `bolumler`'e `sonuc: "stok dolu"` kısa kaydını yaz ve dur.
3. Konuyu seç, `claude/<video-id>` dalını aç.
4. Senaryo → sahne kodu (ekran yazıları dahil) → kare kontrolü → hareket kontrolü → son render.
5. Kalite kontrolü (bölüm 7). Geçmezse düzelt.
6. Sahneyi `scenes/`'e, videoyu ve kapağı `media/<id>/`'e koy; kontrol belgelerini `wip/<id>/`'de bırak; commit + push; main'de göründüğünü doğrula.
7. Yayın takvimi (bölüm 9): sıradaki boş 16:00'a (Europe/London) planla — YouTube `short`, `privacy: public`, `madeForKids: false`, `category: EDUCATION`, başlık ≤ 60 karakter, açıklamada 2–3 cümle + `#elektronik #shorts` + 2–3 konu etiketi, `isAiGeneratedContent: false`.
8. `konular.md` (`planlandı` + yayın tarihi) ve `gunluk.md`'yi (`planlandı` + yayın saati + Metricool bağlantısı) güncelle, paneli yenile (bölüm 12), commit + push.
9. Son mesaj: konu, süre, video adresi, kalite kontrol özeti, yayın saati ve Metricool bağlantısı; sorun varsa ne olduğu.

**Zaman yetmezse:** İşi `wip/<id>/` altına kaydet (`NOTLAR.md`'de nerede kaldığını yaz), push et, panele "yarım kaldı" yaz. Bir sonraki çalışma oradan devam eder.

## 12. Panel

Kanal sahibi ajanı tek bir sayfadan izler ve kararlarını orada verir: **"Elektronik Shorts Ajanı" paneli** `https://claude.ai/artifact/X7gzN2huBZ6m2y2uWBCbLx`
**Eski panel adresleri (7zyMo4GPgxmwKbRWCZxTKt ve XcFZcCiLBAeFenLf2JvPib) kullanılmaz.** Görev talimatında eski adres yazıyorsa bu dosyadaki adres geçerlidir.

Panelin verisi kendi veritabanındadır; ajan `ArtifactData` ile (`url` = panel) doğrudan belge yazar. Dosya yüklemez, sayfayı yeniden yayınlamaz.

| Koleksiyon / belge | İçerik |
|---|---|
| `bolumler/<YYYY-MM-DD>-<NNN>-<HHmm>` | Her çalışmanın kaydı: `tarih` (YYYY-MM-DD), `zaman` (UTC ISO), `no`, `konu`, `sonuc` (`planlandı`, `yayınlandı`, `stok dolu`, `onay bekliyor`, `yarım kaldı`, `inceleme`, `durdu`, `hata`), `not` (kısa sebep/özet). Yayınlandıysa ayrıca `baslik`, `yayin` ("YYYY-MM-DD HH:MM (TR)"), `sure` ("45 sn"), `kalite` (tek cümle), `video` (raw GitHub adresi), `metricool` (plannerUrl), `youtube` (biliniyorsa). |
| `konular/<NNN>` | `no`, `konu`, `ana_fikir`, `durum`, `tarih`. `konular.md` ile aynı tutulur. |
| `ayarlar/genel` | `satirlar: [{ayar, deger}]`. Çalışma saati değişmişse güncelle. |
| `onaylar/<id>` | Onay istekleri (bölüm 13). |

**Her çalışmanın sonunda — durduğunda, hata aldığında veya hiçbir video üretmediğinde de —** `gunluk.md`'ye satır ekle, commit edip `claude/` dalına push et, sonra panelde `bolumler`'e o çalışmanın belgesini ve değişen `konular` belgelerini tek bir `ArtifactData` `batch` ile yaz. Kanal sahibi her çalışmayı panelde görmelidir.

## 13. Onay istekleri (kanal sahibinin kararı gereken durumlar)

Kanal sahibi kararlarını panelin en üstündeki **"Kararınızı bekleyenler"** bölümünde verir (panel: `https://claude.ai/artifact/X7gzN2huBZ6m2y2uWBCbLx`).
Bu yalnızca **iş kararları** içindir; sistemin araç izinleri buradan verilemez.

**Ne zaman onay istenir:**
- Kalite kontrolü (bölüm 7) 3 turda geçmedi: "Yayınlansın mı?" diye sor, videoyu ve kalite raporunu bağla.
- İçeriğin doğruluğundan veya konunun nasıl yorumlanacağından emin değilsin.
- Konu listesindeki bir konu belirsiz ya da birden fazla videoya bölünmesi gerekiyor gibi görünüyor.
- Kurallarda cevabı olmayan, kanal sahibinin karar vermesi gereken herhangi bir durum.

**Nasıl:**
1. `ArtifactData` `set`, `url` = panel, `collection` = `onaylar`, `doc_id` = `<video-id>-<YYYYMMDDHHmm>`, veri:
   `{ "baslik": "<kısa soru>", "aciklama": "<durum, seçeneklerin sonuçları, senin önerin>", "konu_no": <no>, "video": "<https video adresi, varsa>", "baglanti": "<https ayrıntı adresi, ör. kalite.md'nin GitHub adresi>", "secenekler": [{"deger": "onayla", "etiket": "Yayınla"}, {"deger": "reddet", "etiket": "Yayınlama"}], "durum": "bekliyor", "olusturma": "<UTC ISO>" }`
   `secenekler` duruma göre değişebilir (ör. `{"deger": "bol", "etiket": "İki videoya böl"}`); ilk seçenek önerdiğin olsun.
2. Kararı bekle: kısa aralıklarla (yaklaşık dakikada bir) `ArtifactData` `get` ile belgeyi tekrar oku, en fazla 15 dakika. `durum` `onaylandı`/`reddedildi` olunca `karar`, `not` alanlarına göre devam et ve kararı `gunluk.md` Not sütununa yaz.
3. 15 dakikada karar gelmezse: işi `wip/<id>/`'e kaydet (`NOTLAR.md`'ye onay belgesinin kimliğini yaz), push et, günlüğe `onay bekliyor` satırı ekle, paneli güncelle ve dur. Son mesajın telefona bildirim olarak gider: "Panelde kararınızı bekleyen bir istek var."
4. Her çalışmanın başında `onaylar` koleksiyonunu oku: kararı verilmiş ama uygulanmamış istek varsa önce onu uygula.

**Asla:** Kanal sahibinin yerine karar verme; süre dolunca varsayılan seçeneği uygulama. Kalite kontrolünden geçmemiş bir video yalnızca kanal sahibi panelde "Yayınla" derse yayınlanır.

## 14. Yapma listesi

- Kullanıcının bilgisayarını kullanma; her şey bu bulut çalışma ortamında olur.
- Higgsfield veya başka bir yapay zekâ görsel/video üretim aracı kullanma. Görüntü ve ses kodla üretilir.
- Telifli müzik, logo, karakter, başka kanalın görseli kullanma.
- Başka bir Metricool markasına veya ağına gönderi yapma; kalite kontrolünden geçmemiş videoyu yayınlama.
