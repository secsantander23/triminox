import Link from "next/link";

export function Footer() {
  const ano = 2026;

  return (
    <footer className="relative z-10 border-t border-travertine-300/12 bg-ink-950/90 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-[0.2em] text-travertine-100">
              TRIMINOX
            </p>
            <p className="mt-4 max-w-[42ch] font-serif text-lg leading-relaxed text-travertine-300">
              Dominó com algarismos romanos. Um baralho clássico transformado em
              projeto social — feito na oficina, jogado na mesa.
            </p>
          </div>

          <nav aria-label="Rodapé — site">
            <h2 className="eyebrow mb-4">Site</h2>
            <ul className="space-y-1">
              {[
                { href: "/", label: "Início" },
                { href: "/#projeto", label: "O projeto" },
                { href: "/#valores", label: "Valores" },
                { href: "/manual", label: "Manual de regras" },
                { href: "/manual#catalogo", label: "Catálogo de peças" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-sm text-travertine-300 transition-colors hover:text-aureum-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4">Contato</h2>
            <ul className="space-y-1 text-sm text-travertine-300">
              <li>
                <a
                  href="mailto:pedido@triminox.com.br"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-aureum-300"
                >
                  pedido@triminox.com.br
                </a>
              </li>
              <li>
                <a
                  href="mailto:oficina@triminox.com.br"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-aureum-300"
                >
                  oficina@triminox.com.br
                </a>
              </li>
              <li className="pt-3 text-travertine-400">
                <p>Ateliês parceiros em</p>
                <p className="mt-1 text-travertine-300">
                  Belo Horizonte · São Paulo · Curitiba
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-travertine-300/12 pt-8 text-sm text-travertine-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} Triminox · Projeto social de cultura popular
          </p>
          <p className="numeral">
            MMXXVI — feito com ateliês locais
          </p>
        </div>
      </div>
    </footer>
  );
}