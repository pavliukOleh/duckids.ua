/**
 * Простий слайдер відгуків: картка по контенту (fit-content), стрілки фіксовані — екран не стрибає.
 */
const NAV_AREA_PX = 56;

export function initTestimonialsSlider() {
  const section = document.querySelector(".testimonials");
  if (!section) return;

  const contentWrapper = section.querySelector(".testimonials__content");
  const slidesContainer = section.querySelector(".testimonials__slides");
  const slides = section.querySelectorAll(".testimonials__slide");
  const prevBtn = section.querySelector(".testimonials__btn--prev");
  const nextBtn = section.querySelector(".testimonials__btn--next");

  if (!contentWrapper || !slidesContainer || slides.length === 0 || !prevBtn || !nextBtn) return;

  let current = 0;
  let heights = [];
  let isTransitioning = false;
  const FADE_MS = 180;

  function measureHeights() {
    const width =
      slidesContainer.offsetWidth || section.offsetWidth || 400;
    const wrapper = document.createElement("div");
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.style.cssText =
      "position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;width:" +
      width +
      "px";
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.style.position = "relative";
      clone.style.inset = "auto";
      clone.classList.remove("is-active");
      clone.style.opacity = "1";
      wrapper.appendChild(clone);
    });
    document.body.appendChild(wrapper);
    const clones = wrapper.querySelectorAll(".testimonials__slide");
    heights = Array.from(clones).map((clone) => clone.offsetHeight);
    wrapper.remove();
  }

  function updateHeights() {
    if (heights.length === 0) return;
    const maxHeight = Math.max(...heights);
    contentWrapper.style.minHeight = `${maxHeight + NAV_AREA_PX}px`;
    slidesContainer.style.height = `${heights[current]}px`;
  }

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    if (index === current) return;
    if (isTransitioning) return;
    isTransitioning = true;
    const prevIndex = current;
    slides[prevIndex].classList.add("is-leaving");
    setTimeout(() => {
      slides[prevIndex].classList.remove("is-leaving");
      current = index;
      slidesContainer.style.height = `${heights[current] ?? Math.max(...heights)}px`;
      slides.forEach((el, i) => el.classList.toggle("is-active", i === current));
      isTransitioning = false;
    }, FADE_MS);
  }

  function onMeasure() {
    requestAnimationFrame(() => {
      measureHeights();
      updateHeights();
    });
  }

  onMeasure();
  window.addEventListener("resize", onMeasure);

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
}
