"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { en } from "./content/en";
import { pt, type Dictionary } from "./content/pt";

export const LOCALES = ["pt", "en"] as const;

export type Locale = (typeof LOCALES)[number];

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en };

/** Texto curto do botão de troca. */
export const LOCALE_SHORT: Record<Locale, string> = { pt: "PT", en: "EN" };

/** Nome completo do idioma, usado no rótulo acessível do seletor. */
export const LOCALE_NAME: Record<Locale, string> = {
  pt: "Português (Brasil)",
  en: "English",
};

/** Valor do atributo `lang` do elemento `<html>`. */
export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };

const STORAGE_KEY = "trimino:locale";
const DEFAULT_LOCALE: Locale = "pt";

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}

/*
 * O idioma ativo é estado externo — mora no `localStorage`, não no React.
 * `useSyncExternalStore` é a primitive certa para isso: durante a hidratação
 * ela usa o snapshot do servidor (sempre português) e em seguida troca para o
 * valor guardado, sem passar por `setState` dentro de um efeito e sem risco de
 * divergência entre servidor e cliente.
 */

const listeners = new Set<() => void>();

function getSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(saved) ? saved : DEFAULT_LOCALE;
  } catch {
    // localStorage bloqueado (modo privativo): segue com o padrão.
    return DEFAULT_LOCALE;
  }
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  // Sincroniza abas diferentes: trocar o idioma numa aba muda a outra.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function persist(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Sem persistência, mas a troca funciona nesta sessão.
  }
  for (const listener of listeners) listener();
}

type Values = Record<string, string | number>;

type I18nValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Dicionário do idioma atual. Use como `dict.nav.home`. */
  dict: Dictionary;
  /** Substitui `{chave}` dentro de um texto do dicionário. */
  format: (template: string, values: Values) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Fornece o idioma ativo para toda a árvore.
 *
 * A troca acontece no cliente, sem navegação e sem recarregar a página: o
 * HTML exportado é gerado uma vez em português e, no navegador, os textos
 * trocam sozinhos. O idioma escolhido fica salvo no `localStorage`.
 *
 * Consequência consciente dessa escolha: com `output: "export"` não existem
 * cookies nem middleware para o servidor saber o idioma, então o HTML
 * pré-renderizado é sempre em português. Visitantes recorrentes que já escolheram
 * inglês veem o português por um instante, antes da hidratação.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    persist(next);
  }, []);

  // O atributo `lang` é estado do DOM, não do React: efeito é o caminho certo.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      dict: DICTIONARIES[locale],
      format: (template, values) =>
        template.replace(/\{(\w+)\}/g, (match, key: string) =>
          key in values ? String(values[key]) : match,
        ),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n precisa estar dentro de <I18nProvider>.");
  }
  return context;
}