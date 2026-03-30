import "../styles/tailwind.css";
import "../styles/app.scss";
import "@/js/vendor.js";
import { initBurgerMenu } from "@/js/modules/burgerMenu.js";
import { initTestimonialsSlider } from "@/js/modules/testimonialsSlider.js";
import { initFaqAccordion } from "@/js/modules/faqAccordion.js";

initBurgerMenu();
initTestimonialsSlider();
initFaqAccordion();

// env приклад
// console.log("API:", import.meta.env.VITE_API_URL);

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

console.log("Starter ready ✅");

function pickResponsiveSrc(img) {
  const w = window.innerWidth;

  if (w <= 500) return img.getAttribute("data-src-480");
  if (w <= 900) return img.getAttribute("data-src-768");
  return img.getAttribute("data-src-1280");
}
function setupResponsiveImages() {
  const imgs = document.querySelectorAll('img[data-img="responsive"]');

  const update = () => {
    imgs.forEach((img) => {
      const next = pickResponsiveSrc(img);

      if (!next) {
        console.warn("Missing data-src-* on img:", img);
        return;
      }

      if (img.src !== new URL(next, window.location.origin).href) {
        img.src = next;
      }
    });
  };

  update();
  window.addEventListener("resize", update, { passive: true });
}
setupResponsiveImages();
