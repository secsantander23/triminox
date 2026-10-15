import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { I18nProvider } from "@/lib/i18n";
import { pt } from "@/lib/content/pt";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: pt.meta.title,
    template: "%s · Triminó",
  },
  description: pt.meta.description,
  keywords: [
    "triminó",
    "trimino",
    "jogo de tabuleiro",
    "jogo de mesa",
    "dominó triangular",
    "peças triangulares",
    "jogo escolar",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Triminó",
    title: pt.meta.title,
    description: pt.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: pt.meta.title,
    description: pt.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#D92535",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${fredoka.variable} ${nunito.variable}`}
    >
      <body className="antialiased">
        <I18nProvider>
          <a href="#conteudo" className="skip-link">
            <span className="rounded-full bg-crimson px-5 py-3 font-display font-semibold text-cream-50">
              {pt.common.skipToContent}
            </span>
          </a>
          <Header />

          <main id="conteudo" className="relative z-10">
            {children}
          </main>

          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}