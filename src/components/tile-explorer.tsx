"use client";

import { useState } from "react";
import { TILE_SET, TILE_LORE, toRoman } from "@/lib/roman";
import { DominoTile } from "@/components/domino-tile";

/**
 * Explorador interativo: a peça central gira ao clicar e o jogador
 * navega pelas 28 peças do baralho.
 */
export function TileExplorer() {
  const [index, setIndex] = useState(27); // VI|VI — a peça-mãe
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState<"todos" | "altas" | "cheias">("todos");

  const tile = TILE_SET[index];
  const key = `${tile.a}-${tile.b}`;
  const lore = TILE_LORE[key];
  const [a, b] = flipped ? [tile.b, tile.a] : [tile.a, tile.b];

  const visible = TILE_SET.filter(({ a: x, b: y }) => {
    if (filter === "altas") return Math.max(x, y) >= 5;
    if (filter === "cheias") return x === y;
    return true;
  });

  const go = (dir: 1 | -1) => {
    const position = visible.findIndex(
      (t) => `${t.a}-${t.b}` === `${tile.a}-${tile.b}`,
    );
    const next = (position + dir + visible.length) % visible.length;
    setIndex(TILE_SET.indexOf(visible[next]));
    setFlipped(false);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
      {/* Peça em foco */}
      <div className="flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          className="group relative rounded-lg focus-visible:outline-3 focus-visible:outline-offset-8 focus-visible:outline-aureum-400"
        >
          <span className="sr-only">
            Girar a peça {toRoman(tile.a)} por {toRoman(tile.b)}
          </span>
          <div
            className="transition-transform duration-500 ease-out-quint group-hover:scale-[1.04]"
            style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
          >
            <DominoTile a={a} b={b} size="lg" />
          </div>
          <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] uppercase tracking-[0.18em] text-travertine-400 opacity-0 transition-opacity group-hover:opacity-100">
            Clique para girar
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex size-12 items-center justify-center rounded-full border border-travertine-300/25 text-travertine-100 transition-colors hover:border-aureum-400/70 hover:text-aureum-300"
          >
            <span className="sr-only">Peça anterior</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="numeral min-w-16 text-center text-sm text-travertine-300">
            {index + 1} / 28
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex size-12 items-center justify-center rounded-full border border-travertine-300/25 text-travertine-100 transition-colors hover:border-aureum-400/70 hover:text-aureum-300"
          >
            <span className="sr-only">Próxima peça</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="max-w-[34ch] text-center font-serif text-lg leading-relaxed text-travertine-200">
          <span className="numeral text-aureum-400">
            {toRoman(tile.a)} · {toRoman(tile.b)}
          </span>
          <span className="mt-2 block text-sm text-travertine-300">
            {lore ?? "Peça do baralho duplo-seis, como todas as outras."}
          </span>
        </p>
      </div>

      {/* Grade do baralho */}
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar baralho">
          {(
            [
              { id: "todos", label: "Todas as 28" },
              { id: "altas", label: "Pontas altas" },
              { id: "cheias", label: "Face dupla" },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors ${
                filter === f.id
                  ? "border-aureum-400 bg-aureum-500/15 text-aureum-300"
                  : "border-travertine-300/20 text-travertine-300 hover:border-travertine-300/45"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul
          className="grid max-h-[30rem] grid-cols-4 gap-2.5 overflow-y-auto pr-2 sm:grid-cols-5 lg:grid-cols-6"
          aria-label="Baralho duplo-seis, 28 peças"
        >
          {visible.map((t) => {
            const tKey = `${t.a}-${t.b}`;
            const active = tKey === key;
            return (
              <li key={tKey}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(TILE_SET.indexOf(t));
                    setFlipped(false);
                  }}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-md p-1 transition-transform duration-200 hover:scale-110 ${
                    active
                      ? "ring-2 ring-aureum-400 ring-offset-2 ring-offset-ink-950"
                      : ""
                  }`}
                >
                  <span className="sr-only">
                    Peça {toRoman(t.a)} por {toRoman(t.b)}
                  </span>
                  <DominoTile a={t.a} b={t.b} size="sm" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}