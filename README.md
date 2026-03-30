# Vite + Tailwind v4 + Vanilla — Hybrid SCSS Starter

Starter для **чистої верстки без фреймворків**.
Multi-page структура, Tailwind v4 для UI, SCSS для кастомних стилів, partials для повторного використання блоків та оптимізація зображень.

---

## Вимоги

- Node.js **18+** (рекомендовано 20 LTS)
- npm

Перевірка:
```bash
node -v
npm -v
```

---

## Запуск

```bash
npm i
npm run dev
```

Dev server: http://localhost:5173/

Build / preview:
```bash
npm run build
npm run preview
```

Форматування коду:
```bash
npm run format
```

---

## Pages (може бути багато)

Усі `*.html` файли в **корені** проєкту автоматично доступні.

Приклад:
```
contact.html → /contact.html
```

---

## Partials (header / footer)

Файли:
```
src/partials/header.hbs
src/partials/footer.hbs
```

Використання:
```hbs
{{> header}}
...контент...
{{> footer}}
```

`.hbs` — це Handlebars partials (перевикористовувані шматки HTML).

---

## JS

Підключення в кожній сторінці:
```html
<script type="module" src="/src/js/main.js"></script>
```

Структура:
```
src/js/main.js      — entry
src/js/vendor.js    — бібліотеки (swiper/gsap…)
src/js/modules/     — модулі
```

---

## Styles (Hybrid система)

### Tailwind (UI + @apply)

Файл:
```
src/styles/tailwind.css
```

Там:
- `@import "tailwindcss";`
- `@layer base`
- `@layer components`
- UI-класи через `@apply`

⚠️ `@apply` працює тільки з Tailwind утилітами.

---

### SCSS (твій кастом)

Файл:
```
src/styles/app.scss
```

Там:
- reset
- typography
- змінні
- міксіни
- сторінкові стилі

⚠️ Не вставляти `@import "tailwindcss"` у SCSS.

---

### Підключення стилів

У `main.js`:
```js
import "../styles/tailwind.css";
import "../styles/app.scss";
```

---

## Alias

`@` → `src`

Приклад:
```js
import "@/js/vendor.js";
```

---

## ENV

Є `.env.example`.

Створи `.env`:
```
VITE_API_URL=https://example.com/api
```

Доступ:
```js
import.meta.env.VITE_API_URL
```

---

## Зображення

Оригінали:
```
src/assets/img/raw/
```

Генерація:
```bash
npm run img:build
```

Створюються WebP + responsive версії (`-480/-768/-1280`) у:
```
src/assets/img/optimized/
```

---

## Що дає ця збірка

- Vite 7 (швидкий dev + build)
- Tailwind v4 + SCSS hybrid
- Multi-page без фреймворків
- Partial структура
- Оптимізація зображень
- Чиста масштабована архітектура
