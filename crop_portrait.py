
from PIL import Image
from pathlib import Path

source = Path.home() / "Downloads" / "Modern Developer Portfolio Banner.png"
destination = Path("src/assets/godwin.png")

with Image.open(source) as image:
    image = image.convert("RGB")
    width, height = image.size

    # Crop a square from the right, but use a smaller area.
    crop_size = min(700, height)
    left = width - crop_size
    top = (height - crop_size) // 2

    portrait = image.crop((
        left,
        top,
        left + crop_size,
        top + crop_size
    ))

    portrait.save(destination, "PNG")

print(f"Created portrait: {destination}")
print(f"Size: {portrait.size}")
