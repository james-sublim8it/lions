#!/usr/bin/env python3
"""Generate web-friendly thumbnails from source images.

Usage examples:
  python shrink_images.py --src images/family-fun-day --dest images/family-fun-day/thumbs
  python shrink_images.py --src images/family-fun-day --dest images/family-fun-day/thumbs --width 320 --quality 78
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


DEFAULT_PATTERNS = ("*.jpg", "*.jpeg", "*.png", "*.webp")


def make_thumbnail(source: Path, destination: Path, width: int, quality: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as img:
        rgb_image = img.convert("RGB")
        exif_safe = ImageOps.exif_transpose(rgb_image)

        target_height = int(width * 0.75)
        thumb = ImageOps.fit(
            exif_safe,
            (width, target_height),
            method=Image.Resampling.LANCZOS,
        )

        thumb.save(
            destination,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )


def collect_images(src_dir: Path) -> list[Path]:
    files: list[Path] = []
    for pattern in DEFAULT_PATTERNS:
        files.extend(src_dir.glob(pattern))
    return sorted([f for f in files if f.is_file()])


def main() -> None:
    parser = argparse.ArgumentParser(description="Create small thumbnails for static sites.")
    parser.add_argument("--src", required=True, type=Path, help="Source image folder")
    parser.add_argument("--dest", required=True, type=Path, help="Thumbnail output folder")
    parser.add_argument("--width", type=int, default=220, help="Thumbnail width in pixels")
    parser.add_argument("--quality", type=int, default=76, help="JPEG quality 1-95")
    args = parser.parse_args()

    if not args.src.exists() or not args.src.is_dir():
        raise SystemExit(f"Source folder not found: {args.src}")

    if args.quality < 1 or args.quality > 95:
        raise SystemExit("Quality must be between 1 and 95")

    images = collect_images(args.src)
    if not images:
        raise SystemExit(f"No supported images found in {args.src}")

    created = 0
    for source in images:
        target_name = source.stem + ".jpg"
        destination = args.dest / target_name
        make_thumbnail(source, destination, args.width, args.quality)
        created += 1

    print(f"Created {created} thumbnails in {args.dest}")


if __name__ == "__main__":
    main()
