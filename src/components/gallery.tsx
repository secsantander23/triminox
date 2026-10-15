"use client";

import { Hexagon } from "@/components/hexagon";
import { TriminoPiece } from "@/components/trimino-piece";
import { useI18n } from "@/lib/i18n";

type Slot = {
  caption: string;
  body: string;
  /** Elemento ilustrativo mostrado enquanto não há fotografia. */
  art: React.ReactNode;
};

/**
 * Galeria. Enquanto as fotografias reais não entram em `public/`, cada espaço
 * mostra uma ilustração gerada por código — a mesma peça que a foto vai
 * retratar — para que o layout já fique definitivo.
 */
export function Gallery() {
  const { dict, format } = useI18n();

  const slots: Slot[] = [
    {
      caption: dict.gallery.captionPiece,
      body: dict.gallery.captionPieceBody,
      art: (
        <TriminoPiece tips={[4, 2, 5]} tone="red" size="lg" rotate={-6} />
      ),
    },
    {
      caption: dict.gallery.captionWildcard,
      body: dict.gallery.captionWildcardBody,
      art: <TriminoPiece tips={null} tone="yellow" size="lg" rotate={8} />,
    },
    {
      caption: dict.gallery.captionCards,
      body: dict.gallery.captionCardsBody,
      art: (
        <div className="flex gap-3">
          <TriminoPiece tips={[1, 2, 4]} tone="blue" size="md" rotate={-10} />
          <TriminoPiece tips={[3, 4, 5]} tone="graphite" size="md" />
          <TriminoPiece tips={[0, 2, 3]} tone="cream" size="md" rotate={10} />
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {slots.map((slot) => (
        <figure
          key={slot.caption}
          className="card-soft group flex flex-col overflow-hidden"
        >
          <div className="texture-paper relative flex aspect-4/3 items-center justify-center bg-cream-200 p-8">
            <div className="transition-transform duration-500 group-hover:scale-105">
              {slot.art}
            </div>
            <span className="absolute top-3 right-3 rounded-full bg-cream-50/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-graphite-500 uppercase">
              {dict.gallery.placeholder}
            </span>
          </div>
          <figcaption className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-lg font-semibold text-graphite-900">
              {slot.caption}
            </h3>
            <p className="mt-2 leading-relaxed text-graphite-600">{slot.body}</p>
            <p className="mt-4 border-t border-cream-300 pt-4 text-xs text-graphite-400">
              {dict.gallery.placeholderHint}
            </p>
          </figcaption>
        </figure>
      ))}

      <figure className="card-soft flex flex-col items-center justify-center gap-5 p-8 text-center lg:col-span-3 lg:flex-row lg:justify-between lg:text-left">
        <Hexagon
          label={dict.gallery.boardBody}
          joinSummary={format(dict.how.hexagonMatches, { value: 4 })}
          className="order-2 w-48 shrink-0 lg:order-1"
        />
        <div className="order-1 lg:order-2">
          <h3 className="font-display text-xl font-semibold text-graphite-900">
            {dict.gallery.boardTitle}
          </h3>
          <p className="mt-2 max-w-[40ch] leading-relaxed text-graphite-600">
            {dict.gallery.boardBody}
          </p>
        </div>
      </figure>
    </div>
  );
}