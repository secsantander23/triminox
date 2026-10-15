"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string };

/** Contador que anima uma única vez, quando entra na viewport. */
export function StatCounters({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [display, setDisplay] = useState(() =>
    stats.map(() => 0),
  );

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Sem animação: fixa os valores no próximo quadro, sem setState síncrono.
    const showFinal = () =>
      requestAnimationFrame(() => setDisplay(stats.map((s) => s.value)));

    const run = () => {
      if (reduced.matches) {
        showFinal();
        return;
      }

      const duration = 1100;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutQuint
        const eased = 1 - Math.pow(1 - t, 5);
        setDisplay(stats.map((s) => Math.round(s.value * eased)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      showFinal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [stats]);

  return (
    <dl ref={ref} className="grid gap-8 sm:grid-cols-3">
      {stats.map((s, i) => (
        <div key={s.label} className="text-center sm:text-left">
          <dd className="numeral font-display text-4xl font-bold text-crimson sm:text-5xl">
            {display[i]}
            {s.suffix}
          </dd>
          <dt className="mt-2 text-sm text-graphite-500">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}