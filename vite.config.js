import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "node:path";
import fs from "node:fs";

const projectRoot = resolve(__dirname);
const rawImgDir = resolve(projectRoot, "src/assets/img/raw");
const iconsDir = resolve(projectRoot, "src/assets/icons");

function htmlInputs() {
  const root = __dirname;
  const files = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => e.name);

  return Object.fromEntries(files.map((name) => [name.replace(/\.html$/, ""), resolve(root, name)]));
}

/** У dev подає /img/raw/* з src/assets/img/raw; при build копіює папку в dist. */
function serveRawImages() {
  return {
    name: "serve-raw-images",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/img\/raw\/([^/]+)$/);
        if (!match) return next();
        const file = resolve(rawImgDir, match[1]);
        if (!file.startsWith(rawImgDir) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
          return next();
        }
        res.setHeader("Content-Type", getMime(match[1]));
        fs.createReadStream(file).pipe(res);
      });
    },
    writeBundle(_, bundle) {
      const outDir = resolve(projectRoot, "dist");
      const dest = resolve(outDir, "img/raw");
      if (!fs.existsSync(rawImgDir)) return;
      fs.mkdirSync(dest, { recursive: true });
      for (const name of fs.readdirSync(rawImgDir)) {
        const src = resolve(rawImgDir, name);
        if (fs.statSync(src).isFile()) {
          fs.copyFileSync(src, resolve(dest, name));
        }
      }
    },
  };
}

/** У dev подає /icons/* з src/assets/icons; при build копіює папку в dist. */
function serveIcons() {
  return {
    name: "serve-icons",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/icons\/([^/]+)$/);
        if (!match) return next();
        const file = resolve(iconsDir, match[1]);
        if (!file.startsWith(iconsDir) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
          return next();
        }
        res.setHeader("Content-Type", match[1].endsWith(".svg") ? "image/svg+xml" : getMime(match[1]));
        fs.createReadStream(file).pipe(res);
      });
    },
    writeBundle() {
      const outDir = resolve(projectRoot, "dist");
      const dest = resolve(outDir, "icons");
      if (!fs.existsSync(iconsDir)) return;
      fs.mkdirSync(dest, { recursive: true });
      for (const name of fs.readdirSync(iconsDir)) {
        const src = resolve(iconsDir, name);
        if (fs.statSync(src).isFile()) {
          fs.copyFileSync(src, resolve(dest, name));
        }
      }
    },
  };
}

function getMime(filename) {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

export default defineConfig({
  plugins: [
    serveRawImages(),
    serveIcons(),
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context: {
        siteName: "Vite + Tailwind v4 (Hybrid SCSS)",
        metaDescription:
          "Швидка збірка для верстки: HTML/SCSS/JS, Tailwind v4, partials, vendor.js, env, оптимізація зображень.",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: htmlInputs(),
    },
  },
});
