/*
 * Renders the brand icon SVG into every raster the site needs:
 *   public/icon.png (192), public/icon-512.png, public/apple-icon.png (180),
 *   public/logo.png (512, used by Organization JSON-LD), app/favicon.ico.
 * ICO is a container of PNGs, assembled by hand - sharp can't write .ico.
 *
 * Run: node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../app/icon.svg", import.meta.url));

async function png(sizePx) {
  return sharp(svg, { density: 300 }).resize(sizePx, sizePx).png().toBuffer();
}

await writeFile("public/icon.png", await png(192));
await writeFile("public/icon-512.png", await png(512));
await writeFile("public/apple-icon.png", await png(180));
await writeFile("public/logo.png", await png(512));

// favicon.ico: pack 16/32/48 PNGs into an ICO directory.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

const entries = [];
let offset = 6 + 16 * images.length;
images.forEach((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0); // width
  e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bpp
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  entries.push(e);
});

await writeFile(
  "app/favicon.ico",
  Buffer.concat([header, ...entries, ...images]),
);

console.log("icons written");
