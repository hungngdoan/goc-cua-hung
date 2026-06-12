# Generates public/img/share-card.png (1200x630 OG share card) styled to the
# default "Dem Huyen" (den_dau) theme in StyleLab.jsx, using the first frame
# of src/banner_roses.gif.
#
# Needs: Pillow, plus the Lora variable font as scripts/Lora.ttf (not tracked):
#   curl -sL -o scripts/Lora.ttf "https://github.com/google/fonts/raw/main/ofl/lora/Lora%5Bwght%5D.ttf"
#
# Run from repo root:  python scripts/make-share-card.py

import os
import random

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(ROOT, "public", "img", "share-card.png")
BANNER = os.path.join(ROOT, "src", "banner_roses.gif")
LORA = os.path.join(os.path.dirname(__file__), "Lora.ttf")

W, H = 1200, 630

# den_dau theme tokens (StyleLab.jsx)
PAGE_BG = (0x08, 0x0B, 0x14)
PANEL_BG = (0x0E, 0x12, 0x20)
TEXT = (0xD4, 0xDA, 0xE8)
TEXT_SOFT = (0x7A, 0x83, 0x9A)
BORDER = (0x1C, 0x22, 0x36)
GLOW = (244, 184, 96)  # warm banner glow from the app's banner frame


def lora(size, weight):
    font = ImageFont.truetype(LORA, size)
    font.set_variation_by_axes([weight])
    return font


def main():
    img = Image.new("RGB", (W, H), PAGE_BG)
    draw = ImageDraw.Draw(img)

    # Vertical gradient pageBg -> panelBg
    for y in range(H):
        t = y / (H - 1)
        row = tuple(round(a + (b - a) * t) for a, b in zip(PAGE_BG, PANEL_BG))
        draw.line([(0, y), (W - 1, y)], fill=row)

    # Warm radial glow low-center, like the app's banner frame gradient
    glow = Image.new("L", (W, H), 0)
    gd = ImageDraw.Draw(glow)
    cx, cy, r = W // 2, H + 60, 560
    for i in range(r, 0, -4):
        gd.ellipse([cx - i, cy - i * 0.55, cx + i, cy + i * 0.55],
                   fill=round(26 * (1 - i / r)))
    img = Image.composite(Image.new("RGB", (W, H), GLOW), img, glow)
    draw = ImageDraw.Draw(img)

    # Soft sparse starfield
    rng = random.Random(2026)
    for _ in range(80):
        x, y = rng.randint(20, W - 20), rng.randint(20, 440)
        size = rng.choice((1, 1, 1, 2, 2, 3))
        color = rng.choice((TEXT, TEXT_SOFT, TEXT_SOFT, (255, 255, 255)))
        draw.ellipse([x, y, x + size, y + size], fill=color)

    # Roses banner, 2x nearest-neighbor, flush to the bottom edge
    banner = Image.open(BANNER)
    banner.seek(0)
    banner = banner.convert("RGB").resize((597 * 2, 50 * 2), Image.NEAREST)
    img.paste(banner, ((W - banner.width) // 2, H - banner.height))

    def center_text(text, y, font, fill, tracking=0):
        if tracking:
            widths = [draw.textlength(ch, font=font) for ch in text]
            total = sum(widths) + tracking * (len(text) - 1)
            x = (W - total) // 2
            for ch, w in zip(text, widths):
                draw.text((x, y), ch, font=font, fill=fill)
                x += w + tracking
        else:
            x = (W - draw.textlength(text, font=font)) // 2
            draw.text((x, y), text, font=font, fill=fill)

    center_text("Một Góc Đời", 150, lora(100, 900), TEXT)

    # Tagline chip, like the header badge: bordered, uppercase, letterspaced
    tag_font = lora(26, 500)
    tag = "ĐỜI LÀ VÔ THƯỜNG"
    tracking = 6
    tag_w = sum(draw.textlength(c, font=tag_font) for c in tag) + tracking * (len(tag) - 1)
    bx0, bx1 = (W - tag_w) // 2 - 26, (W + tag_w) // 2 + 26
    draw.rectangle([bx0, 318, bx1, 374], fill=PANEL_BG, outline=BORDER, width=2)
    center_text(tag, 330, tag_font, TEXT_SOFT, tracking=tracking)

    center_text("hungngdoan.github.io/goc-cua-hung", 425, lora(30, 400), TEXT_SOFT)

    # Thin panel-style frame
    draw.rectangle([0, 0, W - 1, H - 1], outline=BORDER, width=2)

    img.save(OUT, optimize=True)
    print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")


if __name__ == "__main__":
    main()
