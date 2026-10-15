import type { CardId } from "@/lib/trimino";
import type { PieceTone } from "@/components/trimino-piece";

const CARD_TONE: Record<CardId, PieceTone> = {
  wildcard: "yellow",
  "hand-swap": "blue",
  "piece-swap": "red",
};

const CARD_TINT: Record<CardId, { bg: string; ink: string }> = {
  wildcard: { bg: "var(--color-solar-100)", ink: "var(--color-solar-600)" },
  "hand-swap": { bg: "var(--color-cobalt-100)", ink: "var(--color-cobalt-600)" },
  "piece-swap": { bg: "var(--color-crimson-100)", ink: "var(--color-crimson)" },
};

const STAR = (
  <path
    d="M50 26 L56 43 L74 43 L59 53 L65 70 L50 60 L35 70 L41 53 L26 43 L44 43 Z"
    fill="currentColor"
  />
);

/** Ícone de cada carta, desenhado no mesmo traço pesado do resto do site. */
function CardIcon({ id }: { id: CardId }) {
  if (id === "wildcard") {
    return <svg viewBox="0 0 100 96" className="size-full" aria-hidden="true">{STAR}</svg>;
  }

  if (id === "hand-swap") {
    // Duas mãos representadas por triângulos, com setas de mão dupla.
    return (
      <svg viewBox="0 0 100 96" className="size-full" aria-hidden="true">
        <path
          d="M22 30 L40 30 L31 46 Z M78 66 L60 66 L69 50 Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M34 38 H70 M64 32 L70 38 L64 44 M66 58 H30 M36 52 L30 58 L36 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Troca de peça: um triângulo sai, outro entra.
  return (
    <svg viewBox="0 0 100 96" className="size-full" aria-hidden="true">
      <path
        d="M50 22 L74 62 L26 62 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M50 52 L74 92 L26 92 Z"
        fill="currentColor"
      />
      <path
        d="M20 22 H34 M28 16 L34 22 L28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type EffectCardProps = {
  id: CardId;
  name: string;
  body: string;
  /** Rótulo acessível describing o card. */
  label: string;
  /** Posição exibida no canto da carta. */
  position: number;
};

/**
 * Uma carta de efeito. A carta é desenhada em HTML comum — a parte colorida de
 * cima carrega o ícone e o corpo traz nome e descrição vindos do dicionário.
 */
export function EffectCard({
  id,
  name,
  body,
  label,
  position,
}: EffectCardProps) {
  const tint = CARD_TINT[id];
  const tone = CARD_TONE[id];

  return (
    <article
      aria-label={label}
      className="card-soft group flex flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1.5"
    >
      <div
        className="relative flex items-center justify-center p-8"
        style={{ backgroundColor: tint.bg, color: tint.ink }}
      >
        <div className="size-20 transition-transform duration-500 group-hover:scale-110">
          <CardIcon id={id} />
        </div>
        <span
          aria-hidden="true"
          className="numeral absolute top-4 right-5 text-sm font-bold opacity-45"
        >
          {String(position).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span
          aria-hidden="true"
          className="mb-4 block h-1 w-12 rounded-full"
          style={{
            backgroundColor: `var(--color-${
              tone === "red"
                ? "crimson"
                : tone === "blue"
                  ? "cobalt"
                  : "solar"
            })`,
          }}
        />
        <h3 className="font-display text-xl font-semibold text-graphite-900">
          {name}
        </h3>
        <p className="mt-3 leading-relaxed text-graphite-600">{body}</p>
      </div>
    </article>
  );
}