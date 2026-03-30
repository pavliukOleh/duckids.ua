/**
 * Бургер-меню: відкриття/закриття, блокування скролу body
 */
const BURGER_SELECTOR = "[data-burger]";
const MENU_SELECTOR = "[data-mobile-menu]";
const CLOSE_SELECTOR = "[data-menu-close]";
const OPEN_CLASS = "is-open";

function initBurgerMenu() {
  const burger = document.querySelector(BURGER_SELECTOR);
  const menu = document.querySelector(MENU_SELECTOR);
  const closeBtn = document.querySelector(CLOSE_SELECTOR);

  if (!burger || !menu) return;

  function openMenu() {
    menu.classList.add(OPEN_CLASS);
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove(OPEN_CLASS);
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains(OPEN_CLASS);
    if (isOpen) closeMenu();
    else openMenu();
  }

  burger.addEventListener("click", toggleMenu);
  closeBtn?.addEventListener("click", closeMenu);

  // Закрити при кліку по посиланню (перехід по якорю)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Закрити по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains(OPEN_CLASS)) {
      closeMenu();
    }
  });
}

export { initBurgerMenu };
