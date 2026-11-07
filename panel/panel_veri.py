"""Panel verisini depodaki markdown dosyalarından üretir.

Kullanım (depo kökünden):
    python3 panel/panel_veri.py
Çıktılar: panel/bolumler.json (gunluk.md'den), panel/konular.json (konular.md'den).
panel/ayarlar.json elle (veya ajan tarafından) düzenlenir; bu betik ona dokunmaz.
"""
import json
import os
import re

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def tablo(path):
    satirlar = []
    for line in open(os.path.join(KOK, path), encoding="utf8"):
        line = line.rstrip("\n")
        if not line.startswith("|") or re.match(r"^\|\s*-", line):
            continue
        hucre = [h.strip() for h in line.strip("|").split("|")]
        satirlar.append(hucre)
    return satirlar[0], satirlar[1:]  # başlık, gövde


def bos(x):
    return None if x in ("", "—", "-") else x


def konular():
    _, govde = tablo("konular.md")
    return [dict(no=int(h[0]), konu=h[1], ana_fikir=h[2], durum=h[3], tarih=bos(h[4]))
            for h in govde if h and h[0].isdigit()]


def bolumler():
    # gunluk.md sütunları: Tarih | # | Konu | Başlık | Şablon | Sonuç | Yayın | Metricool | Video | Not
    _, govde = tablo("gunluk.md")
    out = []
    for h in govde:
        if len(h) < 10 or not re.match(r"\d{4}-\d{2}-\d{2}", h[0]):
            continue
        out.append(dict(tarih=h[0], no=int(h[1]) if h[1].isdigit() else None, konu=h[2], baslik=bos(h[3]),
                        sablon=bos(h[4]), sonuc=h[5], yayin=bos(h[6]), metricool=bos(h[7]),
                        video=bos(h[8]), **{"not": bos(h[9])}))
    return out


if __name__ == "__main__":
    k, b = konular(), bolumler()
    json.dump(k, open(os.path.join(KOK, "panel/konular.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    json.dump(b, open(os.path.join(KOK, "panel/bolumler.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(f"konular: {len(k)} satır, bölümler: {len(b)} satır")
