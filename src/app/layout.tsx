import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WaveBackdrop } from "@/components/wave-backdrop";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://triminox.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Triminox — Dominó com algarismos romanos",
    template: "%s | Triminox",
  },
  description:
    "Baralho de dominó duplo-seis com 28 peças e algarismos romanos em relevo. Projeto social que financia oficinas de marcenaria e material em Braille. Peça o seu.",
  keywords: [
    "dominó romano",
    "jogo de dominó",
    "dominó duplo-seis",
    "projeto social",
    "jogo de tabuleiro",
    "brinde personalizado",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Triminox",
    title: "Triminox — Dominó com algarismos romanos",
    description:
      "28 peças, algarismos romanos em relevo, as mesmas regras de sempre. Um projeto social feito na oficina e jogado na mesa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triminox — Dominó com algarismos romanos",
    description:
      "28 peças, algarismos romanos em relevo, as mesmas regras de sempre.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0a09",
  colorScheme: "dark",
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <a href="#conteudo" className="skip-link">
          <span className="rounded-md bg-aureum-500 px-5 py-3 font-semibold text-ink-950">
            Pular para o conteúdo
          </span>
        </a>
        <Header />

        {/*
          Fundo do site inteiro: uma única malha de algarismos romanos,
          fixa atrás de todo o conteúdo. Uma só instância WebGL para o
          site — nunca duas.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <WaveBackdrop opacity={0.34} fadeSize={0.9} speed={0.22} />
        </div>

        <main id="conteudo" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}