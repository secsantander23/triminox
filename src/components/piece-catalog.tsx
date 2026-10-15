"use client";

import { useMemo, useState } from "react";
import { TriminoPiece, type PieceTone } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";
import {
  PIECES,
  WILDCARD_COUNT,
  toRoman,
  type Piece,
} from "@/lib/trimino";

type CatalogItem = {
  key: string;
  tips: [number, number, number] | null;
  sum: number | null;
  wildcard: boolean;
  position: number;
};

/** As 56 peças numeradas seguidas das 3 coringas. */
const CATALOG: CatalogItem[] = [
  ...PIECES.map((piece, index) => ({
    key: `n-${index}`,
    tips: [piece.a, piece.b, piece.c] as [number, number, number],
    sum: piece.sum,
    wildcard: false,
    position: index + 1,
  })),
  ...Array.from({ length: WILDCARD_COUNT }, (_, index) => ({
    key: `w-${index}`,
    tips: null,
    sum: null,
    wildcard: true,
    position: PIECES.length + index + 1,
  })),
];

type FilterId = "all" | "high" | "triple" | "wild";

/** Soma a partir da qual a peça é considerada "alta". */
const HIGH_SUM = 12;

function isTriple(piece: Piece) {
  return piece.a === piece.b && piece.b === piece.c;
}

/**
 * Explorador do baralho: as 56 peças numeradas e as 3 coringas, filtráveis e
 * inspecionáveis uma a uma.
 */
export function PieceCatalog() {
  const { dict, format } = useI18n();
  const [filter, setFilter] = useState<FilterId>("all");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const filters: Array<{ id: FilterId; label: string }> = [
    { id: "all", label: dict.pieces.filterAll },
    { id: "high", label: dict.pieces.filterHigh },
    { id: "triple", label: dict.pieces.filterTriple },
    { id: "wild", label: dict.pieces.filterWild },
  ];

  const visible = useMemo(() => {
    if (filter === "wild") return CATALOG.filter((item) => item.wildcard);
    if (filter === "high")
      return CATALOG.filter((item) => !item.wildcard && item.sum! >= HIGH_SUM);
    if (filter === "triple")
      return CATALOG.filter(
        (item) =>
          !item.wildcard && isTriple(PIECES[item.position - 1]),
      );
    return CATALOG;
  }, [filter]);

  const selected =
    visible.find((item) => item.key === selectedKey) ?? visible[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
      {/* Peça em foco */}
      <aside className="flex flex-col items-center lg:w-64">
        <div className="card-soft flex w-full flex-col items-center p-6">
          <TriminoPiece
            tips={selected?.tips ?? null}
            tone={selected?.wildcard ? "yellow" : "red"}
            size="lg"
            label={
              selected?.wildcard
                ? dict.common.wildcardAria
                : format(dict.common.pieceAria, {
                    tips: selected?.tips?.map(toRoman).join(", ") ?? "",
                  })
            }
          />
          <p className="mt-4 text-center text-xs text-graphite-500">
            {format(dict.pieces.pieceNumber, { n: selected?.position ?? 0 })}
          </p>
          <p className="numeral mt-1 text-center text-lg font-semibold text-graphite-800">
            {selected?.wildcard
              ? "★"
              : selected?.tips?.map(toRoman).join(" · ")}
          </p>
          {!selected?.wildcard && selected?.sum !== null && (
            <p className="mt-3 w-full rounded-full bg-cream-200 py-1.5 text-center text-sm text-graphite-600">
              {dict.pieces.totalLabel}:{" "}
              <span className="numeral font-bold text-crimson">
                {selected?.sum}
              </span>
            </p>
          )}
        </div>
      </aside>

      {/* Grade */}
      <div>
        <div
          className="mb-5 flex flex-wrap gap-2"
          role="group"
          aria-label={dict.pieces.catalogTitle}
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                setSelectedKey(null);
              }}
              aria-pressed={filter === item.id}
              className={`font-display min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                filter === item.id
                  ? "border-crimson bg-crimson text-cream-50"
                  : "border-cream-300 text-graphite-600 hover:border-crimson hover:text-crimson"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-graphite-500">{dict.pieces.emptyFilter}</p>
        ) : (
          <ul
            className="no-scrollbar grid max-h-[28rem] grid-cols-4 gap-2 overflow-y-auto pr-2 sm:grid-cols-6 lg:grid-cols-8"
            aria-label={dict.pieces.catalogLede}
          >
            {visible.map((item) => {
              const active = item.key === selected?.key;
              const tone: PieceTone = item.wildcard
                ? "yellow"
                : active
                  ? "red"
                  : "cream";

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setSelectedKey(item.key)}
                    aria-current={active ? "true" : undefined}
                    aria-label={
                      item.wildcard
                        ? dict.common.wildcardAria
                        : format(dict.common.pieceAria, {
                            tips: item.tips?.map(toRoman).join(", ") ?? "",
                          })
                    }
                    className={`w-full rounded-xl p-1 transition-transform duration-200 hover:scale-110 ${
                      active ? "bg-crimson/12 ring-2 ring-crimson" : ""
                    }`}
                  >
                    <TriminoPiece
                      tips={item.tips}
                      tone={tone}
                      size="sm"
                      label=""
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}