# Duckids UI Kit (Figma)

Джерело: [Duckids — Figma, фрейм Duckids UI Kit](https://www.figma.com/design/hxBjt0HLuCs0F4HwgLr46W/Duckids?node-id=154-956)

Фрейм `154:956` містить дизайн-токени та компоненти з варіантами (states / properties). Нижче — перелік для узгодження з кодом: **Handlebars partials** + **SCSS** (без React).

## Як це використовувати в проєкті

| У Figma | У проєкті |
|--------|-----------|
| Component / Symbol | `src/partials/*.hbs` або повторюваний блок у partial |
| Variant / State | BEM-модифікатори: `.btn--hover`, `.input--error`, `[data-state="open"]` |
| Стилі | `src/styles/components/_*.scss` + токени в змінних |

Нові секції краще підключати через існуючі патерни з `src/partials` і `src/styles/app.scss`.

---

## Кольори (frame: Duckids Colors)

У макеті зібрані зразки кольорів (прев’ю через іконки «Duck»). У коді вже є узгоджені токени в `.cursor/rules` та частково в `_header.scss`, `_footer.scss` тощо.

**Рекомендація:** тримати один файл змінних, наприклад `src/styles/_tokens.scss`, і звідти імпортувати в компоненти.

---

## Компоненти та стани

### Layout / секції

| Назва в Figma | Node (symbol) | Примітки |
|---------------|---------------|----------|
| Footer | `1:214` | Десктоп футер |
| Footer Mobile | `1:515` | Мобільний футер |
| Sticky Header | `1:244` | Хедер |
| Header/Mobile | `1:545` | `State=Default`, `State=Open` |

### Кнопки та навігація

| Назва | Варіанти (states / properties) |
|-------|----------------------------------|
| Primary button | `State=Default`, `Hover`, `Focuse`, `Disabled` |
| Header Nav | `Default`, `Hover` |
| Footer Nav | `Default`, `Hover`, `Pressed`, `Focus` |
| Arrow/Right | `Default`, `Hover`, `Pressed`, `Focus`, `Disable` |
| Arrow/Left | `Default`, `Hover`, `Pressed`, `Focus`, `Disable` |
| Icon/Dropdown | `Arrow=Down/Up` × `State=Default/Hover` |

### Форми

| Назва | Варіанти |
|-------|----------|
| Input | `Default`, `Hover`, `Focus`, `Active`, `Error`, `Disabled` |
| Input Mobile | `Default`, `Filled`, `Active`, `Disabled`, `Error` |
| Comment Field | `Default`, `Hover`, `Active`, `Focused`, `Disabled` |
| Comment Field Mobile | `Default`, `Hover`, `Active`, `Disabled` |
| Radiobutton label | комбінації `Selected=Yes/No` × `Default`, `Hover`, `Focus` |
| Icon (radio circle) | `Selected` × `Default`, `Hover`, `Focus` |

### Іконки соцмереж (окремі з станами)

| Назва | Стани |
|-------|-------|
| Icon Facebook | `Default`, `Hover`, `Pressed`, `Focus` |
| Icon Instagram | `Default`, `Hover`, `Pressed`, `Focus` |

### Іконки (загальний набір)

| Набір Icon | Варіанти |
|------------|----------|
| Icon (ряд 1) | `Instagram`, `Facebook`, `Phone`, `Location`, `Close`, `Arrow right`, `Burger` |

### Ілюстрації

Компонент **Illustration** з властивістю `Illustration=`:

- Speaking duck  
- Drawing duck  
- Duck with heart  
- Duck many hearts  
- Duck with mom  
- Duck with smartphone  
- Rating  
- Question  
- 404  

У коді: `src/assets/img` або шляхи з `/img/raw/…`.

### Картки та блоки контенту

| Назва | Примітки |
|-------|----------|
| Card | `1:401` |
| Team Card | `1:507` |
| Testimonials | `Testimonial=Default`, `1`, `2`, `3` |
| FAQ | `Desktop/Mobile` × `Default`, `Hover`, `Open`, `Open Hover` |
| Divider Waves | `Color=Blue/Beidge`, `Device=Desktop/Mobile` |

### Типографіка (text styles)

У фреймі **Typography/H1/Desktop** зібрані стилі з варіантами `Typography`, `Weight`, `Device` (H1–H4, Body, Label; Desktop / Mobile).

У проєкті: узгодити з `Design-System-Duckids.mdc` та `_typography.scss`.

### Складні секції

| Назва | Варіанти |
|-------|----------|
| Contact/Thank you | `Section=Contact us / Confirmation` × `Device=Desktop/Mobile` |

### Службове

| Назва | Стани |
|-------|-------|
| Cursor | `Shown`, `Hidden` |

---

## Подальші кроки

1. **Рефакторинг токенів** — винести кольори та радіуси в `_tokens.scss`.  
2. **Узгодити класи** — для кнопки, інпута, FAQ застосувати однакові модифікатори під ці стани.  
3. **Не дублювати** — нові блоки підключати через partials, стилі — через `@use` у `app.scss`.

Оновлення цього файлу: при зміні компонентів у Figma знову викликати `get_metadata` для `154:956` і дописати рядки в таблиці.
