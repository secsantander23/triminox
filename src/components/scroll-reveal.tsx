"use client";

import { useEffect } from "react";

/**
 * Observer único para todos os elementos com `data-reveal` da página.
 * Evita um client component por seção — o conteúdo continua Server Component.
 */
export function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Sem JS de animação disponível: mostra tudo de imediato.
    if (reduced.matches || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return null;
}