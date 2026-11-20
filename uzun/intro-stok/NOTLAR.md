# İş emri L3 — stok intro 8 sn (20.11.2026, güncel)

Kanal sahibi: "çok hızlı bitiyor, önünde ve sonunda hemen ders sesi var" → intro 6 sn'den 8 sn'ye.
- `kurgu.py` (8 sn, 240 kare): 0–2,2 klip 1 · 2,2–3,5 klip 2 · 3,5–4,5 klip 3 · 4,5–8,0 klip 4 (4,6–6,6 bulanıklaşma, çip 5,05'te parlar);
  "Devre Teorisi I" 5,20'de belirir (5,50'de tam), alt yazı 5,40 (5,70'te tam) → 7,30'a kadar tam okunur (≥ 1,6 sn); 7,30–8,00 beyaz tahtaya geçiş.
  Müzik intro'nun 0,12 sn'sinde başlar; böylece kesimler vuruşlara denk gelir (2,19 / 3,49 / 4,54; çip 5,05).
- `birlestir.py`: Bölüm 1'e yerleştirme (görüntü + ses, tarif docstring'de). Kanca konuşması 32,81'de biter → 32,967 intro, müzik 33,09'da tek başına
  (−18,0 LUFS) → geçiş 40,967'de biter → 0,2 sn boş tahta (kartın ilk karesi) → **intro kartı baştan** yazılır (asıl videodaki 2× yavaş ilk 3 sn
  doğal hıza döndü) → selam konuşması 41,56'da (geçişten ~0,6 sn sonra). Asıl videoya göre +5,2 sn (15:26).
  Müzik kesintisiz: açılış kesiti 4,174 sn (2 ölçü) aralıkla 3 kez, 0,3 sn eşit güçlü çapraz geçişle; selamda 41,25–41,55'te konuşmanın 8 dB altına
  iner (−7,4 → −13,5 dB), son kopya kendi sonunda (~49,4) biter; ders 49,7'de başlar. Kapanış kesiti kullanılmadı.
- Drive: yeni `intro-stok-kurgu.mp4` (id `1bsB5p9zHaX1rltWYgIJe-29iQdOzJ8wN`, 8 sn, 2,95 MB, 2,75 Mbit/sn iki geçiş; bağlantı aracı çağrı başına ~3,1 MB
  sınırı; SSIM 0,994). Eski 6 sn'lik dosya `intro-stok-kurgu-6sn-eski.mp4` olarak adlandırıldı (silinmedi).
- Depo: `media/uzun/intro-stok/onizleme.mp4` (29,0–45,5 sn, 720p, iş emrindeki kontrol önizlemesi), `kare-1..3.jpg` (1,0 / 4,0 / 6,33 sn).
- Kontroller: toplam −16,2 LUFS, tepe −2,0 dBFS, LRA 3,0; intro tek başına −18,0 LUFS; selam bölgesi −16,5 LUFS; silencedetect (−45 dB, 1 sn) yalnızca
  473,7'de 1,8 sn (parça 5'teki bilinçli duraklama, asılda da var); freezedetect 28–60 sn: kanca 28,0–30,2 (asılda da var) ve selamdan sonra tam yazılmış
  kart üzerinde 46,9 / 50,4 / 54,0 (asıl videoyla aynı kareler; yalnızca vurgu yanıp sönmesi var). Kare eşlemesi (yeni = asıl + 156 kare) MSE < 1,2.

---

# İş emri L — stok klipli intro (20.11.2026, 6 sn, eski)

Ham klipler (Drive "Uzun Video Sesleri": klip-1…4.mp4) ve tek başına intro **depoda yok** (Canva lisansı).
Drive: `intro-stok-kurgu.mp4` (id `17OCLUvWZij80MXMz_k2dv32KH-rrywgi`, 2,8 MB, müzikli; bağlantı aracı çağrı başına ~3 MB sınırı nedeniyle 3,6 Mbit/sn).
Depoda: `kurgu.py` (kurgu tarifi), `media/uzun/intro-stok/kare-1..3.jpg`, `media/uzun/devre-teorisi-1-ders-01-bolum-1-introlu-stok.mp4`.

## Kurgu (`kurgu.py`)
- Zamanlama müziğin ölçülen vuruşlarına göre (seri-muzik-acilis.mp3, ~115 BPM): kesimler 1,267 / 2,567 / 3,500 sn (vuruşlar 1,277 / 2,577 / 3,495), başlık 4,17 (vuruş 4,15), alt yazı 4,43, beyaz tahtaya geçiş 5,47–6,00 (vuruş 5,46).
- Kesitler: klip 1 1,40–2,67 sn (hafif yaklaşma), klip 2 0,00–1,30, klip 3 0,30–1,23 (60→30 fps; sol üst 1280×720 kırpılıp büyütüldü, "VD15/W18" etiketleri kadraj dışı), klip 4 1,00–3,50 (yaklaşma 1,0→1,1).
- **Klip 1'deki entegrenin üstünde üretici logosu/yazısı vardı**: şablon eşlemeyle her karede izlenip inpaint ile silindi (düz siyah gövde).
- Renk: tek gradyan haritası (parlaklık → koyu turkuaz-yeşil … bakır); gri çip de aynı haritayla bu tona getirildi.
- Klip 4: 3,6–5,5 sn çip dışı alan bulanıklaşır (σ 1→14) ve %45 kararır, çip 4,05'te parlar; yazının arkasında yumuşak koyu alan.
- Yazı: Montserrat (OFL; SemiBold 128 px "Devre Teorisi I", 50 px "Öğr. Gör. Nuray SAĞLAM"), belirme + yukarı kayma + harf aralığı daralması.

## Bölüm 1 intro'lu sürüm (6-S)
- Asıl `devre-teorisi-1-ders-01-bolum-1.mp4`'ten: 0–32,967 sn kanca (kare 989'a kadar) → 6 sn intro → asıl videonun 35,967 sn'sinden sonrası (eski 3 sn'lik "müzik tek başına" aralığı çıkarıldı; toplam +3 sn, 15:24).
- Ses: kanca aynen; müzik intro başında (kanca sonu) başlar, intro boyunca −7,3 dB (tek başına −17,9 LUFS); selamda (yeni 39,27 sn) 0,3 sn'de −13,3 dB'e iner (konuşmanın ~8 dB altı), 7,7–8,04'te biter.
  Asıl karışımdaki eski müzik selamın altından çıkarılsın diye selam bölgesi `ses/selam.mp3`'ten yeniden kuruldu (kazanç ve konum asıl karışıma çapraz ilişkiyle eşlendi, 41,05–41,10'da asıl sese çapraz geçiş).
  Son: `alimiter` 0,78; sonuç −16,2 LUFS, tepe −2,0 dBTP. Kapanış müziği asıl videodaki gibi.
- Kontroller: freezedetect (yeni aralık 32–45 sn'de durağan an yok; kancadaki "donma" kayıtları asıl videoda da var — kalem ucu küçük hareketi), silencedetect (yalnızca 471,5 sn'de 1,8 sn: parça 5'teki bilinçli soru duraklaması, asılda da var), ebur128.
- Bilinen: beyaz geçişten sonra tahta intro kartı yarı yazılmış hâlde ("Devre Teorisi I: Ders") gelir, kalem yazmaya devam eder.
