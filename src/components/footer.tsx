"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-2 border-cream-300 bg-graphite-700">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-[0.12em] text-cream">
              {dict.hero.title.toUpperCase()}
            </p>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-cream-300/85">
              {dict.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-2" aria-hidden="true">
              {[
                { tips: [0, 1, 2] as const, tone: "var(--color-crimson)" },
                { tips: [3, 4, 5] as const, tone: "var(--color-cobalt)" },
                { tips: null, tone: "var(--color-solar)" },
              ].map((piece, index) => (
                <svg key={index} viewBox="0 0 120 108" className="w-11">
                  <path
                    d="M60 14 L108 94 L12 94 Z"
                    fill={piece.tone}
                    stroke="rgba(0,0,0,0.18)"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
            </div>
          </div>

          <nav aria-label={dict.common.primaryNav}>
            <h2 className="eyebrow!text-crimson mb-4">{dict.footer.pages}</h2>
            <ul className="space-y-1">
              {[
                { href: "/", label: dict.nav.home },
                { href: "/#sobre", label: dict.nav.about },
                { href: "/#pecas", label: dict.nav.pieces },
                { href: "/#cartas", label: dict.nav.cards },
                { href: "/#como-funciona", label: dict.nav.how },
                { href: "/#galeria", label: dict.nav.gallery },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-cream-300/85 transition-colors hover:text-solar"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow!text-crimson mb-4">{dict.nav.footerRules}</h2>
            <Link
              href="/regulamento"
              className="inline-flex min-h-11 items-center font-display font-semibold text-solar transition-colors hover:text-cream"
            >
              {dict.rules.cta}
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-cream-300/70">
              {dict.footer.builtWith}
            </p>
            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-300/15 pt-8 text-sm text-cream-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} · {dict.footer.rights}
          </p>
          <p className="numeral">
            {dict.credits.classLabel}: {dict.credits.placeholder}
          </p>
        </div>
      </div>
    </footer>
  );
}