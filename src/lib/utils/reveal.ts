/**
 * MORCAT — Reveal al hacer scroll (IntersectionObserver).
 * Uso: elementos con [data-reveal] (y variantes fade/left/right/clip).
 * Respeto de prefers-reduced-motion: se muestran directamente.
 */
export function initReveal(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
  );

  els.forEach((el) => io.observe(el));
}
