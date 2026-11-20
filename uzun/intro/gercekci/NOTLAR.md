# İş emri K2 — Blender intro düzeltmesi (20.11.2026, güncel sürüm, 9,5 sn)

Kanal sahibi: "sonda kamera çipe açılı bakıyor, yazılar okunamadan ekran beyazlıyor." Sahne (malzemeler, ışık, ışık akışı, yazı tipi, renkler) aynı; yalnızca kamera sonu ve zamanlama değişti.
- **Akış (285 kare):** 0–3 sn eski açılış (elektrolitik yanından dolly + odak çekimi; müzik intro'nun 0,12 sn'sinde tek başına başlar); 2–3,6 sn yollarda akım darbeleri; 3–5 sn kamera çipe yaklaşırken küresel yayla tepeye yükselir (yükseklik açısı ~25° → 90°, smootherstep), **5,0 sn'de çipe tam üstten (dik) bakar**, çip kadraj ortasında (yüzeye 36 mm); 4,0 sn LED; 4,05–4,9 sn yazılar lazerle belirir; **4,9–8,5 sn yazılar tam, net, sabit (3,6 sn; tepeden bakışta 3,5 sn)**, odak çip yüzeyinde; sabit bölümde yollarda yavaş ışık "nefesi"; 8,5–9,2 sn beyaz tahtaya geçiş; 9,2–9,5 sn tahta.
- **Render süresinin kısaltılması:** 0–149 her kare ayrı (1280×720, 10 örnek, ~35 sn/kare, 88 dk). Kamera 5,0 sn'den sonra sabit → yalnızca ışığı değişen **16 anahtar kare** (150, 159, …, 285; 32 örnek, eşik 0,02, ~77 sn/kare, 20 dk) render edildi; aradakiler komşu iki anahtar karenin doğrusal çapraz geçişi (`intro_video.sh`). Toplam ~1 sa 50 dk (14:37–16:25).
- `sahne.py`: `k2_camera()` (TEPE_R=36 mm), sabit bölümde DARBE kazancı yavaş nefes (2,4 sn periyot). `intro_video.sh KARELER ANAHTAR SESSIZ.mp4`. `birlestir.py` (stok `birlestir.py`'nin Blender intro'ya uyarlanmış kopyası) hem müzikli intro'yu hem intro'lu Bölüm 1'i üretir.
- Eski 6 sn'lik sürüm: `media/uzun/devre-teorisi-1-intro-gercekci-v1.mp4` ve `-sessiz-v1.mp4`.
- Kareler: `kareler/intro-1.0.jpg`, `intro-3.5.jpg`, `intro-6.5.jpg` (tepeden bakış, yazılı).

## Intro'lu Bölüm 1 (K2)
- 0–32,967 kanca (müzik yok) → 32,967–42,167 intro (müzik 33,09'da tek başına, −18,0 LUFS) → 0,1 sn tahta + kalem → **intro kartı baştan** (asıl videodaki 2× yavaş ilk 3 sn doğal hıza döndü) → selam konuşması ~42,66'da (geçiş sonundan ~0,5 sn sonra).
- Müzik kesintisiz: açılış kesiti 4,174 sn (2 ölçü) aralıkla 4 kez, 0,3 sn eşit güçlü çapraz geçişle; selamda 42,36–42,66'da konuşmanın 8 dB altına iner (−7,7 → −13,7 dB); 49,9–50,5'te yumuşakça biter; ders 50,8'de.
- Asıl videoya göre **+6,3 sn** (927,32 sn = 15:27). `yayin.json`'daki 0:00 dışındaki zaman damgaları onaydan sonra **+6,3 sn** kaydırılmalı (bu çalışmada dokunulmadı).
- QC: toplam −16,0 LUFS, tepe −1,7 dBFS, LRA 3,0; intro bölümü −18,0 LUFS; selam bölümü −16,4; ders −16,1. silencedetect (−45 dB, 1 sn): yalnızca 474,8'de 1,8 sn (parça 5'teki bilinçli duraklama, asılda da var). freezedetect (−60 dB, 0,5 sn) 26–66 sn: intro aralığında (32,97–42,17) durağan an yok; 42,17–42,67 tahta + kalem (kart yazımı başlıyor), sonrası asıl videodaki kart duraklamalarıyla aynı.
- Müzikli intro (9,5 sn) tek başına −18,2 LUFS.

---

# (eski, 6 sn) Gerçekçi PCB intro'su — "Devre canlanıyor" (UZUN.md 4a-I, iş emri K — 20.11.2026)

Yöntem: **Blender Cycles 5.3** (`pip install bpy`), yol izleme, CPU. Sahne tamamen Python ile kurulur; yapay zekâ aracı, stok görüntü, fotoğraf, logo yok.

| Dosya | İş |
|---|---|
| `yerlesim.py` | Kart yerleşimi + prosedürel dokular (numpy/PIL/shapely, seed sabit): QFP-64 U1'den yelpaze yollar, 45° kırımlı "şehir haritası" yolları, dökme bakır (yalıtım boşluklu), dikiş viyaları, test noktaları, montaj delikleri, serigrafi (R1…, C1…, D1, Y1, U1–U3, TP…, "DT-1 REV A"), çip üstü lazer yazısı ("Devre Teorisi I", "Öğr. Gör. Nuray SAĞLAM", "DT1-2611 REV A"), akım darbesi varış haritası (16 bit). Dokular depoya girmez (her çalıştırmada aynı çıkar). |
| `sahne.py` | Cycles sahnesi: 1 birim = 1 mm (90×60 mm kart). Lehim maskesi: koyu yeşil, yeşil tonlu vernik katmanı (coat), bakır yolların kabartısı (bump), portakal kabuğu dokusu, toz zerreleri, ince çizikler; ENIG altın pad'ler; serigrafi; 0603 dirençler (siyah gövde, beyaz kod, kalay uçlar, lehim dolguları), 0603 seramik kondansatörler, QFP-64 ve SOIC-8/14 (mat epoksi, martı kanadı bacaklar), SMD elektrolitik (fırçalanmış alüminyum), 3225 kristal (nikel kapak), 0805 kırmızı LED (saydam epoksi + yonga ışığı). Işık: büyük yumuşak anahtar ışık + arka kenar şeridi + dolgu; makro 50 mm, sığ alan derinliği (f-sayısı 5 → 22), yedi bıçaklı diyafram. |
| `intro_video.sh` | Kareler (1280×720) → 1920×1080 lanczos + hafif keskinleştirme, ışık taşması (bloom), çok hafif renk sapması, vinyet, ince gren; 5,5–5,9 sn tahta rengine (#F7F7F3) hızlı geçiş. Sessiz + müzikli çıktı. |
| `bolum1_introlu.sh` | Ders 1 - Bölüm 1'in intro'lu sürümü (6-S: kanca → intro → selam). Asıl dosyaya dokunmaz. |

Zaman çizelgesi (6 sn): 0–2 sn elektrolitik kondansatörün yanından yavaş dolly + odak çekimi; 2–3,6 sn yollarda ince yeşilimsi akım ışığı darbeleri çipe doğru ilerler; 4,0 sn LED yanar; 4,05–4,9 sn çipin üstünde soldan sağa lazerle "Devre Teorisi I" ve "Öğr. Gör. Nuray SAĞLAM"; 5–5,5 sn çipe yaklaşma; 5,5–6 sn beyaz tahtaya geçiş.

Render ayarları: Cycles CPU (2 çekirdek), 1280×720, 10 örnek/piksel, uyarlamalı örnekleme eşiği 0,05, OpenImageDenoise (renk + albedo + normal), en çok 5 sekme (yansıma 2), AgX "Medium High Contrast", 178 kare, ~50–60 sn/kare.

Komutlar:
```
python3 yerlesim.py DOKU
python3 sahne.py --doku DOKU --out KARELER --kareler 0-177 --gen 1280 --spp 10 --esik 0.05
bash intro_video.sh KARELER acilis.mp3 media/uzun/devre-teorisi-1-intro-gercekci-sessiz.mp4 media/uzun/devre-teorisi-1-intro-gercekci.mp4
bash bolum1_introlu.sh media/uzun/devre-teorisi-1-ders-01-bolum-1.mp4 media/uzun/devre-teorisi-1-intro-gercekci-sessiz.mp4 acilis.mp3 uzun/seri/ders-01/bolum-1/ses/selam.mp3 media/uzun/devre-teorisi-1-ders-01-bolum-1-introlu.mp4
```
Müzik dosyası (Drive) depoya girmez.

## Intro'lu Bölüm 1 — zaman damgaları
Intro'lu sürüm asıl videodan **3 sn uzun** (intro 6 sn eklendi, eski 3 sn'lik "müzik tek başına" kart yavaşlatması kaldırıldı). `yayin.json`'daki 0:00 dışındaki bütün zaman damgaları **+3 sn** kayar (bu çalışmada `yayin.json`'a dokunulmadı; onaydan sonra genel müdür/planlama günceller).

## QC (20.11.2026)
- Intro: 6,000 sn, 180 kare, 1920×1080, 30 fps. Müzikli sürüm −18,0 LUFS (açılış kesiti tek başına, −7,3 dB).
- Intro'lu Bölüm 1: 924,02 sn (asıl 921,02 + 3), **−16,1 LUFS**, tepe −1,8 dBTP. Intro (32,96–38,96 sn) müzik tek başına −17,8 LUFS; selam + kısık müzik −14,7 LUFS (müzik konuşmanın ~8 dB altında); bitiş ekranı −20,0 LUFS.
- Selam kartta 39,27 sn'de başlar (kart 38,96'da). Kesme noktasında (47,16 sn) tık yok (örnekler arası en büyük fark 0,00015).
- freezedetect / silencedetect: intro bölgesinde durağan an veya sessizlik yok; bulunanlar asıl videodakilerle birebir aynı (+3 sn kaymış: tahtadaki hafif vurgu anları ve parça 5'teki bilinçli 1,5 sn'lik "tahmin et" duraklaması). Asıl videonun 222,8 sn karesi intro'lu sürümün 225,8 sn karesiyle aynı (ortalama piksel farkı 0,05).
