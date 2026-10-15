import type { NextConfig } from "next";

/**
 * Site publicado no GitHub Pages como arquivos estáticos.
 *
 * - `output: "export"` gera a pasta `out/` com HTML/CSS/JS que qualquer
 *   servidor de arquivos estáticos consegue servir.
 * - `trailingSlash: true` emite `/regulamento/index.html` em vez de
 *   `/regulamento.html`. O GitHub Pages só resolve diretórios, então é isso que
 *   faz os links internos funcionarem sem configuração no servidor.
 * - `basePath` só vale na build de produção. Em `npm run dev` fica vazio, para
 *   o site abrir em `localhost:3000/` sem o prefixo atrapalhar o desenvolvimento.
 *
 * Publicando em um subdomínio de projeto (`https://<usuario>.github.io/<repo>/`),
 * ajuste `REPO` abaixo. Para um domínio próprio, troque por `""`.
 *
 * `cacheComponents` e `partialPrefetching` foram removidos de propósito: eles
 * existem para renduização parcial e dinâmica, que um site estático não usa.
 */
const REPO = "triminox";

const basePath =
  process.env.NODE_ENV === "production" ? `/${REPO}` : "";

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