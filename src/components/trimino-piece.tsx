import { toRoman } from "@/lib/trimino";

export type PieceTone = "cream" | "red" | "blue" | "yellow" | "graphite";
export type PieceSize = "sm" | "md" | "lg";

/** Geometria do triângulo. Os cantos arredondam sozinhos pelo `stroke-linejoin`. */
const TRIANGLE = "M60 14 L108 94 L12 94 Z";

/** Posições dos três algarismos dentro do triângulo. */
const TIP_POINTS = [
  { x: 60, y: 45 },
  { x: 36, y: 79 },
  { x: 84, y: 79 },
] as const;

const TONES: Record<
  PieceTone,
  { face: string; edge: string; ink: string }
> = {
  cream: {
    face: "var(--color-cream-100)",
    edge: "var(--color-graphite-200)",
    ink: "var(--color-graphite-700)",
  },
  red: {
    face: "var(--color-crimson)",
    edge: "var(--color-crimson-700)",
    ink: "var(--color-cream-50)",
  },
  blue: {
    face: "var(--color-cobalt)",
    edge: "var(--color-cobalt-600)",
    ink: "var(--color-cream-50)",
  },
  yellow: {
    face: "var(--color-solar)",
    edge: "var(--color-solar-600)",
    ink: "var(--color-graphite-800)",
  },
  graphite: {
    face: "var(--color-graphite-700)",
    edge: "var(--color-graphite-900)",
    ink: "var(--color-cream-100)",
  },
};

const WIDTHS: Record<PieceSize, { box: string; font: number }> = {
  sm: { box: "w-16", font: 13 },
  md: { box: "w-24", font: 17 },
  lg: { box: "w-36 sm:w-44", font: 22 },
};

/** Estrela de cinco pontas usada como marca da peça coringa. */
const STAR =
  "M60 41 L64.41 51.93 L76.17 52.75 L67.13 60.32 L69.99 71.75 " +
  "L60 65.5 L50.01 71.75 L52.87 60.32 L43.83 52.75 L55.59 51.93 Z";

export type TriminoPieceProps = {
  /**
   * As três pontas numeradas, em ordem. `null` desenha uma peça coringa.
   * A ordem controla apenas a posição visual dos algarismos.
   */
  tips?: readonly [number, number, number] | null;
  size?: PieceSize;
  tone?: PieceTone;
  className?: string;
  /** Rótulo acessível. Sem ele, cai nos algarismos romanos. */
  label?: string;
  /** Rotação em graus, para variar a composição das grades. */
  rotate?: number;
  /**
   * Índices das duas pontas cuja aresta deve ser destacada — é por essa
   * aresta que a peça se encaixa na seguinte. Ex.: `[0, 2]` destaca a aresta
   * entre a primeira e a terceira ponta.
   */
  highlight?: readonly [number, number] | null;
};

/**
 * Uma peça do Triminó: um triângulo com três pontas numeradas em algarismos
 * romanos, ou uma peça coringa marcada com uma estrela.
 *
 * Componente sem estado e sem JS — pode ser usado em Server ou Client
 * Components. O texto acessível vem do chamador (`label`), porque depende do
 * idioma ativo.
 */
export function TriminoPiece({
  tips,
  size = "md",
  tone = "cream",
  className = "",
  label,
  rotate = 0,
  highlight = null,
}: TriminoPieceProps) {
  const { box, font } = WIDTHS[size];
  const colors = TONES[tone];
  const isWildcard = !tips;

  const defaultLabel = isWildcard
    ? "Trimino wildcard piece"
    : `Trimino piece ${tips.map(toRoman).join(", ")}`;

  return (
    <svg
      viewBox="0 0 120 108"
      role="img"
      aria-label={label ?? defaultLabel}
      className={`piece-body ${box} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <path
        d={TRIANGLE}
        fill={colors.face}
        stroke={colors.edge}
        strokeWidth={6}
        strokeLinejoin="round"
      />

      {isWildcard ? (
        <path d={STAR} fill={colors.ink} opacity={0.9} />
      ) : (
        TIP_POINTS.map((point, index) => {
          const value = tips[index];

          // O zero não tem algarismo romano: a ponta fica vazia, marcada por um
          // disco — o mesmo desenho da peça "duplo branco" do dominó.
          if (value === 0) {
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={font * 0.34}
                fill={colors.ink}
              />
            );
          }

          return (
            <text
              key={index}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={font}
              fontWeight={700}
              fill={colors.ink}
              className="numeral"
            >
              {toRoman(value)}
            </text>
          );
        })
      )}

      {/* Aresta de encaixe destacada: liga as duas pontas que casam. */}
      {tips && highlight ? (
        <line
          x1={TIP_POINTS[highlight[0]].x}
          y1={TIP_POINTS[highlight[0]].y}
          x2={TIP_POINTS[highlight[1]].x}
          y2={TIP_POINTS[highlight[1]].y}
          stroke="var(--color-crimson)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}