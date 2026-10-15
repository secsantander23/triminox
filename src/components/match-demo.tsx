"use client";

import { useState } from "react";
import { TriminoPiece, type PieceTone } from "@/components/trimino-piece";
import { toRoman } from "@/lib/trimino";
import { useI18n } from "@/lib/i18n";

/** Peça fixa do enunciado. A aresta de encaixe é a das pontas III e I. */
const ANCHOR: [number, number, number] = [1, 3, 4];
const ANCHOR_EDGE: [number, number] = [3, 1];
const ANCHOR_HIGHLIGHT: [number, number] = [1, 0];

/** Três opções; apenas a primeira tem uma aresta que soma 4. */
const OPTIONS: Array<{
  tips: [number, number, number];
  correct: boolean;
  tone: PieceTone;
}> = [
  { tips: [2, 2, 5], correct: true, tone: "yellow" },
  { tips: [0, 1, 5], correct: false, tone: "cream" },
  { tips: [1, 2, 5], correct: false, tone: "cream" },
];

/** As três arestas possíveis de uma peça, como pares de pontas. */
function edgesOf(tips: [number, number, number]) {
  return [
    { a: tips[0], b: tips[1] },
    { a: tips[0], b: tips[2] },
    { a: tips[1], b: tips[2] },
  ];
}

/** Índice da aresta cuja soma mais se aproxima do alvo — a "tentativa mais próxima". */
function closestEdge(tips: [number, number, number], target: number) {
  return edgesOf(tips)
    .map((edge, index) => ({ ...edge, index, sum: edge.a + edge.b }))
    .sort((x, y) =>
      Math.abs(x.sum - target) === Math.abs(y.sum - target)
        ? x.index - y.index
        : Math.abs(x.sum - target) - Math.abs(y.sum - target),
    )[0];
}

/**
 * Mini-exercício da regra da soma: uma peça fixa com uma aresta destacada e
 * três candidatas. Só uma tem aresta com a mesma soma.
 */
export function MatchDemo() {
  const { dict, format } = useI18n();
  const [picked, setPicked] = useState<number | null>(null);
  const target = ANCHOR_EDGE[0] + ANCHOR_EDGE[1];

  const chosen = picked === null ? null : OPTIONS[picked];
  const tried = chosen ? closestEdge(chosen.tips, target) : null;

  const reset = () => setPicked(null);

  return (
    <div className="card-soft p-6 sm:p-8">
      <h4 className="font-display text-lg font-semibold text-graphite-900">
        {dict.how.matchDemoTitle}
      </h4>
      <p className="mt-2 leading-relaxed text-graphite-600">
        {dict.how.matchDemoBody}
      </p>

      <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Peça fixa com a aresta de encaixe marcada */}
        <div className="flex flex-col items-center">
          <TriminoPiece
            tips={ANCHOR}
            tone="red"
            size="lg"
            highlight={ANCHOR_HIGHLIGHT}
            label={format(dict.common.pieceAria, {
              tips: ANCHOR.map(toRoman).join(", "),
            })}
          />
          <p className="numeral mt-3 text-center text-sm font-semibold text-crimson">
            {ANCHOR_EDGE[0]} + {ANCHOR_EDGE[1]} = {target}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="font-display text-3xl font-bold text-graphite-300"
        >
          +
        </span>

        {/* Opções */}
        <ul className="flex flex-wrap justify-center gap-4">
          {OPTIONS.map((option, index) => {
            const isPicked = picked === index;
            const isSolved = picked !== null && option.correct;

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => setPicked(index)}
                  aria-pressed={isPicked}
                  className={`block rounded-2xl p-2 transition-all duration-200 ${
                    isPicked
                      ? "ring-3 ring-crimson"
                      : isSolved
                        ? "ring-3 ring-cobalt"
                        : "hover:bg-cream-200"
                  } ${picked !== null && !option.correct ? "opacity-45" : ""}`}
                >
                  <TriminoPiece
                    tips={option.tips}
                    tone={isSolved ? "blue" : option.tone}
                    size="md"
                    label={format(dict.common.pieceAria, {
                      tips: option.tips.map(toRoman).join(", "),
                    })}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-live="polite" className="mt-8 min-h-[5.5rem]">
        {chosen && tried ? (
          <div className="flex flex-col items-center gap-4">
            <p
              className={`text-center leading-relaxed font-medium ${
                chosen.correct ? "text-cobalt" : "text-crimson"
              }`}
            >
              {chosen.correct
                ? format(dict.how.matchCorrect, {
                    a: ANCHOR_EDGE[0],
                    b: ANCHOR_EDGE[1],
                    c: tried.a,
                    d: tried.b,
                  })
                : format(dict.how.matchWrong, {
                    a: ANCHOR_EDGE[0],
                    b: ANCHOR_EDGE[1],
                    c: tried.a,
                    d: tried.b,
                  })}
            </p>
            <button
              type="button"
              onClick={reset}
              className="font-display rounded-full border-2 border-graphite-200 px-5 py-2 text-sm font-semibold text-graphite-600 transition-colors hover:border-crimson hover:text-crimson"
            >
              {chosen.correct ? dict.how.matchReset : dict.how.matchTry}
            </button>
          </div>
        ) : (
          <p className="text-center text-sm text-graphite-500">
            {dict.how.matchPrompt}
          </p>
        )}
      </div>
    </div>
  );
}