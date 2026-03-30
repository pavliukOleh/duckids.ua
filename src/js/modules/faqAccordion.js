/**
 * FAQ акордеон: плавне відкриття/закриття по кліку, обертання стрілки через CSS.
 */
export function initFaqAccordion() {
  const section = document.querySelector(".faq");
  if (!section) return;

  const triggers = section.querySelectorAll("[data-faq-trigger]");

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq__item");
      if (!item) return;
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen);
    });
  });
}
