# Публікація на GitHub Pages

Сайт збирається як статичні файли в `dist/` і публікується на адресу:

**https://pavliukOleh.github.io/duckids.ua/**

(якщо репозиторій публічний і увімкнено Pages.)

## Що вже налаштовано в проєкті

- **`vite.config.js`** — для збірки з режимом `gh-pages` встановлюється `base: '/duckids.ua/'`, щоб усі шляхи (JS, CSS, зображення) коректно відкривались з підшляху репозиторію.
- **Handlebars** — у шаблонах використовується `{{baseUrl}}` для посилань на головну та картинки з `/img/...`.
- **`.github/workflows/github-pages.yml`** — після кожного push у гілку `main` GitHub Actions збирає проєкт і викладає результат на Pages.

## Одноразові налаштування на GitHub

1. Відкрий репозиторій: [pavliukOleh/duckids.ua](https://github.com/pavliukOleh/duckids.ua).
2. **Settings → Pages** (або **Settings → Code and automation → Pages**).
3. У блоці **Build and deployment**:
   - **Source**: **GitHub Actions** (не «Deploy from a branch»).
4. Збережи. Перший деплой запуститься після наступного push у `main`, або вручну: вкладка **Actions** → workflow **Deploy GitHub Pages** → **Run workflow**.

Після успішного запуску адреса сайту з’явиться у **Settings → Pages** і в підсумку job **deploy**.

## Локальна збірка «як на Pages»

```bash
npm install
npm run build:gh-pages
npm run preview
```

У браузері відкрий показаний URL — прев’ю також використовує `base`, тому поводиться як на GitHub Pages.

Звичайна команда `npm run build` залишається для збірки з кореневим шляхом `/` (зручно для іншого хостингу).

## Якщо перейменуєш репозиторій

1. У **`vite.config.js`** зміни рядок `GITHUB_PAGES_BASE` на `'/НОВА-НАЗВА-РЕПО/'` (з слешами на початку й в кінці).
2. Закоміть і запуш — workflow підхопить зміни.

## Якщо Pages не оновлюються

- Перевір **Actions**: чи зелені job **build** і **deploy**.
- Переконайся, що в **Settings → Pages** обрано джерело **GitHub Actions**.
- Почекай 1–2 хвилини після деплою й онови сторінку з очищенням кешу (Ctrl+F5).
