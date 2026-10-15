"use client";

import {
  LOCALES,
  LOCALE_NAME,
  LOCALE_SHORT,
  useI18n,
  type Locale,
} from "@/lib/i18n";

/**
 * Seletor de idioma em dois segmentos. A troca é imediata e não recarrega a
 * página — o texto vem do contexto, não de outra rota.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useI18n();

  return (
    <div
      role="group"
      aria-label={dict.common.languageSwitch}
      className="inline-flex items-center rounded-full border-2 border-graphite-200 bg-cream-50 p-0.5"
    >
      {LOCALES.map((code: Locale) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={LOCALE_NAME[code]}
            lang={code}
            className={`font-display min-h-9 rounded-full px-3 text-sm font-semibold transition-colors duration-200 ${
              active
                ? "bg-crimson text-cream-50"
                : "text-graphite-600 hover:text-crimson"
            }`}
          >
            <span aria-hidden="true">{LOCALE_SHORT[code]}</span>
            <span className="sr-only">{LOCALE_NAME[code]}</span>
          </button>
        );
      })}
    </div>
  );
}