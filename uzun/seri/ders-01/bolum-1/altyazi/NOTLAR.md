# Ders 1 - Bölüm 1 — TR + EN altyazı (iş emri P, 20.11.2026)

Yayın sürümü: `media/uzun/devre-teorisi-1-ders-01-bolum-1-introlu.mp4` (927,32 sn). Çıktılar: `media/uzun/altyazi/devre-teorisi-1-ders-01-bolum-1.tr.srt` (276 kart), `.en.srt` (297 kart).

| Dosya | İş |
|---|---|
| `metinler.py` | Cümle anahtarı (`parça.sıra`, selam `s.*`) → (TR ekran metni veya `None` = seslendirme metni aynen, EN). TR'de yalnızca sözle okunan formül/sayı/birimler matematik olarak yazıldı. |
| `altyazi_yap.py` | `python3 altyazi_yap.py DEPO TR.srt EN.srt`. Zamanlar: `tahta/zamanlama-N.json` cümle/kelime başları + parça başlangıçları (p1 0; p2 54,76; p3 221,28; p4 270,11; p5 420,71; p6 687,29; p7 836,05; p1'de 32,96'da 8,4 sn ara) → asıl (D) zaman; 32,96'dan sonrası **+9,3 sn** (F +3, Blender intro +6,3) + parça başına kare yuvarlama düzeltmesi (p2 −0,02 … p7 −0,07, silencedetect ile ölçüldü). Selam: `ses/selam.mp3` 42,568 sn'de (`intro/gercekci/birlestir.py`). Kart: ≤ 42 karakter/satır, ≤ 2 satır, 1–6 sn; sayı+birim ve işlem işaretleri bölünmez; intro (32,97–42,57) ve bitiş ekranında altyazı yok. |
| `srt_dogrula.py` | Sıra no, zaman biçimi, çakışma, 1–6 sn, satır/karakter sınırı, UTF-8 (BOM/CR yok), boş aralık. `python3 srt_dogrula.py --bos 32.97 42.57 --sure 927.32 *.srt` → 0 hata. `srt` kütüphanesiyle de ayrıştırıldı. |

**Zamanlama doğrulaması (son video, silencedetect −40 dB / 0,35 sn):** 34 konuşma başlangıcının 32'si bir kart başlangıcıyla eşleşti, en büyük sapma 0,09 sn (çoğu ≤ 0,01). Kalan ikisi hata değil: 304,32 ("Peki teldeki akım…") "Hesap doğru." ile aynı karta birleştirilmiş, cümlenin kendi başlangıç tahmini −0,05 sn; 846,42 "Toparlayalım." kelimesinin içindeki duraklama.

**Bağımsız denetim (Agent, EE mühendisi + dil, 2 tur):** 1. tur: 2 TR ek hatası (mC'yi → mC'u), 2.24 tutarlılık, 2 EN dil bilgisi (7.13, 5.73) + 16 EN üslup önerisi + kart bölmeleri (sayı/birim ayrılması vb.) → hepsi uygulandı. 2. tur: kalan satır sonu artikel/edat ve bölme sorunları → bölme kuralına bağlanarak düzeltildi. Hesaplar ve TR–EN sayı/formül eşleşmesi: hata yok.
