import { toRoman } from "@/lib/trimino";

/**
 * Hexágono de demonstração: seis peças triangulares em torno de um centro.
 *
 * As seis junçõesrespectam a regra da soma. Para cada junção, a soma das duas
 * pontas de um lado é igual à soma das duas pontas do lado correspondente da
 * peça vizinha. A junção destacada fica em P1: `1 + 3` de um lado, `2 + 2` do
 * outro — as duas somam 4.
 *
 * Cada peça carrega os seus próprios três números, então os dois lados de uma
 * junção mostram valores diferentes que somam o mesmo valor.
 */

const CENTER = { x: 60, y: 60 } as const;

/** Os seis cantos do hexágono. */
const RING = [
  { x: 60, y: 10 },
  { x: 103.3, y: 35 },
  { x: 103.3, y: 85 },
  { x: 60, y: 110 },
  { x: 16.7, y: 85 },
  { x: 16.7, y: 35 },
] as const;

/** `[centro, canto i, canto i+1]` de cada peça, com a cor da peça. */
const TRIANGLES = [
  { tips: [1, 2, 3], fill: "var(--color-crimson)", ink: "var(--color-cream-50)" },
  { tips: [2, 2, 5], fill: "var(--color-cobalt)", ink: "var(--color-cream-50)" },
  { tips: [4, 3, 2], fill: "var(--color-solar)", ink: "var(--color-graphite-800)" },
  { tips: [5, 1, 3], fill: "var(--color-crimson)", ink: "var(--color-cream-50)" },
  { tips: [3, 5, 2], fill: "var(--color-cobalt)", ink: "var(--color-cream-50)" },
  { tips: [0, 5, 3], fill: "var(--color-solar)", ink: "var(--color-graphite-800)" },
] as const;

/** Índice da junção destacada: entre a peça 0 e a peça 1, no canto P1. */
const HIGHLIGHT_JOIN = 0;

/** Percentual do caminho vértice → centroide usado para posicionar o algarismo. */
const LABEL_INSET = 0.62;

function labelPoint(
  vertex: { x: number; y: number },
  centroid: { x: number; y: number },
) {
  return {
    x: vertex.x + (centroid.x - vertex.x) * LABEL_INSET,
    y: vertex.y + (centroid.y - vertex.y) * LABEL_INSET,
  };
}

export type HexagonProps = {
  className?: string;
  /** Rótulo acessível do diagrama. */
  label: string;
  /** Resumo textual das duas somas da junção destacada. */
  joinSummary: string;
};

export function Hexagon({ className = "", label, joinSummary }: HexagonProps) {
  const joinPoint = RING[HIGHLIGHT_JOIN + 1] ?? RING[0];

  /*
   * As duas somas da junção são derivadas das próprias peças, para que os
   * rótulos nunca saiam de sincronia com o desenho. Os números ficam na ordem
   * `[centro, canto i, canto i+1]`; a aresta radial compartilhada é a que vai
   * do centro ao canto `i + 1`.
   */
  const side = TRIANGLES[HIGHLIGHT_JOIN].tips;
  const neighbour = TRIANGLES[(HIGHLIGHT_JOIN + 1) % TRIANGLES.length].tips;
  const left = { a: side[0], b: side[2] };
  const right = { a: neighbour[0], b: neighbour[1] };
  const leftSide = `${left.a} + ${left.b} = ${left.a + left.b}`;
  const rightSide = `${right.a} + ${right.b} = ${right.a + right.b}`;

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 120 120"
        role="img"
        aria-label={label}
        className="w-full max-w-sm drop-shadow-[0_18px_28px_rgba(41,42,50,0.2)]"
      >
        {TRIANGLES.map((piece, index) => {
          const vertices = [CENTER, RING[index], RING[(index + 1) % RING.length]];
          const centroid = {
            x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
            y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3,
          };

          return (
            <g
              key={index}
              className="hexagon-piece"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <polygon
                points={vertices.map((point) => `${point.x},${point.y}`).join(" ")}
                fill={piece.fill}
                stroke="var(--color-cream)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
              {piece.tips.map((value, tipIndex) => {
                const point = labelPoint(vertices[tipIndex], centroid);
                return value === 0 ? (
                  <circle
                    key={tipIndex}
                    cx={point.x}
                    cy={point.y}
                    r={3.4}
                    fill={piece.ink}
                  />
                ) : (
                  <text
                    key={tipIndex}
                    x={point.x}
                    y={point.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={9.5}
                    fontWeight={700}
                    fill={piece.ink}
                    className="numeral"
                  >
                    {toRoman(value)}
                  </text>
                );
              })}
            </g>
          );
        })}

        {/* Junção destacada: a aresta radial entre as duas peças. */}
        <line
          x1={CENTER.x}
          y1={CENTER.y}
          x2={joinPoint.x}
          y2={joinPoint.y}
          stroke="var(--color-graphite-800)"
          strokeWidth={3}
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <circle
          cx={joinPoint.x}
          cy={joinPoint.y}
          r={7}
          fill="var(--color-graphite-800)"
        />
      </svg>

      <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-graphite-800 px-4 py-2 font-display text-sm font-semibold text-solar">
          {leftSide}
        </span>
        <span
          aria-hidden="true"
          className="font-display text-lg font-bold text-graphite-400"
        >
          =
        </span>
        <span className="rounded-full bg-graphite-800 px-4 py-2 font-display text-sm font-semibold text-solar">
          {rightSide}
        </span>
      </figcaption>

      <p className="sr-only">{joinSummary}</p>
    </figure>
  );
}