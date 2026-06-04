/**
 * Upscale + tone/sharpen the kids hero photo without regenerating faces.
 * Source must stay pixel-faithful (same people, same expressions).
 *
 * Usage: node scripts/enhance-kids-hero.mjs
 */
import sharp from "sharp";
import { copyFileSync, existsSync } from "node:fs";

const BACKUP = "public/kids/kids-brothers-smiling.original.png";
const OUT_WEBP = "public/kids/kids-brothers-smiling.webp";
const OUT_PNG = "public/kids/kids-brothers-smiling.png";
const OUT_OG = "public/kids/kids-brothers-smiling-og.jpg";

/** 3× from 500×720 → 1500×2160 for retina hero. */
const HERO_SCALE = 3;
/** OG / social preview (still sharp, smaller file). */
const OG_WIDTH = 1200;

async function buildPipeline(source) {
  const meta = await sharp(source).metadata();
  const width = Math.round(meta.width * HERO_SCALE);
  const height = Math.round(meta.height * HERO_SCALE);

  return sharp(source)
    .resize(width, height, { kernel: sharp.kernel.lanczos3 })
    .gamma(1.04)
    .modulate({ brightness: 1.04, saturation: 1.08 })
    .sharpen({ sigma: 1.15, m1: 0.65, m2: 2.4, x1: 2, y2: 10, y3: 20 });
}

async function main() {
  if (!existsSync(BACKUP)) {
    if (!existsSync(OUT_PNG)) {
      throw new Error(`Missing ${BACKUP}. Restore the original photo first.`);
    }
    copyFileSync(OUT_PNG, BACKUP);
    console.log(`Created backup from existing ${OUT_PNG}`);
  }

  const enhanced = await buildPipeline(BACKUP);

  await enhanced.clone().webp({ quality: 92, effort: 6, smartSubsample: true }).toFile(OUT_WEBP);

  await enhanced
    .clone()
    .resize({ width: OG_WIDTH, kernel: sharp.kernel.lanczos3 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(OUT_OG);

  const ogMeta = await sharp(OUT_OG).metadata();
  await sharp(OUT_OG)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(OUT_PNG);

  const heroMeta = await sharp(OUT_WEBP).metadata();
  console.log(`Wrote ${OUT_WEBP} (${heroMeta.width}×${heroMeta.height})`);
  console.log(`Wrote ${OUT_OG} (${ogMeta.width}×${ogMeta.height})`);
  console.log(`Wrote ${OUT_PNG} (OG-sized PNG for link previews)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
