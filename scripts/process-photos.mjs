/*
 * Turns source photography into the site's treated WebP assets: crop to the
 * slot's ratio, pull saturation down toward the warm-gray palette, add a
 * little film grain, and write to public/photos/.
 *
 * Originals are not committed. Run with the source directory as the only
 * argument, e.g.  node scripts/process-photos.mjs ~/Downloads/nyro-photos
 *
 * Sources (Pexels licence - free for commercial use, no attribution needed):
 *   slabs-hook.jpg   Tiago Alves  https://www.pexels.com/photo/19302430/
 *   slab-yard.jpg    Deane Bayas  https://www.pexels.com/photo/30112371/
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("usage: node scripts/process-photos.mjs <source-dir>");
  process.exit(1);
}

const PHOTOS = [
  {
    src: "slabs-hook.jpg",
    out: "slabs-hook.webp",
    width: 1200,
    height: 1500, // 4:5, the home-page split
  },
  {
    src: "slab-yard.jpg",
    out: "slab-yard.webp",
    width: 2400,
    height: 800, // 21:7, the About story slab
  },
];

async function treat({ src, out, width, height }) {
  const grain = await sharp({
    create: {
      width,
      height,
      channels: 4,
      noise: { type: "gaussian", mean: 128, sigma: 18 },
    },
  })
    .png()
    .toBuffer();

  await sharp(join(srcDir, src))
    .rotate()
    .resize(width, height, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.32, brightness: 0.97 })
    // a whisper of the warm-gray ground so the photo sits in the palette
    .tint({ r: 214, g: 208, b: 194 })
    .composite([{ input: grain, blend: "soft-light" }])
    .webp({ quality: 78 })
    .toFile(join("public/photos", out));
  console.log(`wrote public/photos/${out} (${width}×${height})`);
}

await mkdir("public/photos", { recursive: true });
for (const photo of PHOTOS) await treat(photo);
