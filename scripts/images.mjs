import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "src/assets/img/raw");
const outDir = path.join(root, "src/assets/img/optimized");

const exts = new Set([".jpg", ".jpeg", ".png"]);
const widths = [480, 768, 1280];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

function outPath(file, suffix, ext) {
  const rel = path.relative(inputDir, file);
  const dir = path.dirname(rel);
  const base = path.basename(rel, path.extname(rel));
  return path.join(outDir, dir, `${base}${suffix}${ext}`);
}

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

async function buildOne(file) {
  const img = sharp(file).rotate();

  const fullWebp = outPath(file, "", ".webp");
  ensureDir(fullWebp);
  await img.clone().webp({ quality: 80 }).toFile(fullWebp);

  for (const w of widths) {
    const webp = outPath(file, `-${w}`, ".webp");
    ensureDir(webp);
    await img
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webp);
  }
}

(async () => {
  const files = walk(inputDir).filter((f) => exts.has(path.extname(f).toLowerCase()));

  if (!files.length) {
    console.log("No images found in", inputDir);
    process.exit(0);
  }

  for (const file of files) {
    await buildOne(file);
    console.log("✓", path.relative(root, file));
  }

  console.log("Done. Output:", path.relative(root, outDir));
})();
