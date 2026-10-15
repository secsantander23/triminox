import type { NextConfig } from "next";

/**
 * Site publicado como arquivos estáticos, no Vercel ou no GitHub Pages.
 *
 * - `output: "export"` gera a pasta `out/` com HTML/CSS/JS que qualquer
 *   servidor de arquivos estáticos consegue servir.
 * - `trailingSlash: true` emite `/regulamento/index.html` em vez de
 *   `/regulamento.html`. O GitHub Pages só resolve diretórios, então é isso que
 *   faz os links internos funcionarem sem configuração no servidor.
 *
 * ## basePath — leia antes de publicar
 *
 * O prefixo de caminho depende de ONDE o site mora, e errar aqui não quebra a
 * build: o build passa e o site só aparece sem estilo no navegador, com todo
 * CSS, JS e fonte devolvendo 404. Por isso ele vem de uma variável de ambiente
 * explícita, em vez de ser deduzido.
 *
 *   Vercel (triminox.vercel.app)  ->  ""                      (raiz, padrão)
 *   GitHub Pages em projeto
 *   (usuario.github.io/triminox/)  ->  "/triminox"
 *   domínio próprio                ->  ""
 *
 * No GitHub Pages, defina a variável no repositório:
 * Settings → Secrets and variables → Actions → New repository variable,
 * nome `NEXT_PUBLIC_BASE_PATH`, valor `/triminox`.
 *
 * `cacheComponents` e `partialPrefetching` foram removidos de propósito: eles
 * existem para renderização parcial e dinâmica, que um site estático não usa.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;