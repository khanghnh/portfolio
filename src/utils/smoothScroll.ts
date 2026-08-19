/**
 * Lightweight, zero-dependency native smooth scroll utility.
 * Smoothly scrolls to target and synchronizes URL hash.
 */
export const smoothScrollTo = (target: string | HTMLElement, updateHash = true) => {
  const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetEl) return;

  targetEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  if (updateHash && typeof target === 'string' && target.startsWith('#')) {
    window.history.pushState(null, '', target);
  }
};
