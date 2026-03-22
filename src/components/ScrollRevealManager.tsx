import { useEffect } from 'react';

export function ScrollRevealManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    if (sections.length === 0) return;

    sections.forEach((section) => {
      section.classList.add('scroll-reveal-ready');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('scroll-reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('scroll-reveal-ready', 'scroll-reveal-visible');
      });
    };
  }, []);

  return null;
}
