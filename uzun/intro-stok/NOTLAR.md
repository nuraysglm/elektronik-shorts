# İş emri L — stok klipli intro (20.11.2026)

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
