import { toRoman, toRomanSpoken } from "@/lib/roman";

export type TileSize = "sm" | "md" | "lg";

type HalfProps = {
  value: number;
  dark?: boolean;
  size: TileSize;
};

/* Largura de cada metade vs. maior algarismo possível (VIII).
   O texto nunca pode invadir o divisor central. */
const NUMERAL_SIZE: Record<TileSize, string> = {
  sm: "text-[0.625rem]",
  md: "text-xl",
  lg: "text-2xl sm:text-3xl",
};

/** Metade da peça: o algarismo romano gravado no mármore. */
function Half({ value, dark = false, size }: HalfProps) {
  const roman = toRoman(value);
  return (
    <div
      className={`flex min-w-0 flex-1 items-center justify-center overflow-hidden ${
        dark ? "text-travertine-100" : "text-porphyry-800"
      }`}
    >
      {value === 0 ? (
        <span
          aria-hidden="true"
          className={`block size-2 rounded-full ${
            dark ? "bg-travertine-300/60" : "bg-porphyry-800/35"
          }`}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`numeral font-semibold leading-none tracking-tight ${NUMERAL_SIZE[size]}`}
        >
          {roman}
        </span>
      )}
      <span className="sr-only">
        {value === 0 ? "face vazia" : `${toRomanSpoken(value)}, ${roman}`}
      </span>
    </div>
  );
}

type DominoTileProps = {
  a: number;
  b: number;
  dark?: boolean;
  className?: string;
  size?: TileSize;
};

const SIZES: Record<TileSize, string> = {
  // 56 × 96 px → cada metade tem 27 px de largura: "VIII" cabe com folga.
  sm: "h-24 w-14",
  md: "h-32 w-16",
  lg: "h-52 w-28 sm:h-60 sm:w-36",
};

/** Uma peça de dominó com numerais romanos. Server component — sem JS. */
export function DominoTile({
  a,
  b,
  dark = false,
  className = "",
  size = "md",
}: DominoTileProps) {
  return (
    <div
      role="img"
      aria-label={`Peça de dominó ${toRoman(a)} por ${toRoman(b)}`}
      className={`relative flex shrink-0 flex-col overflow-hidden rounded-[0.6rem] ${SIZES[size]} ${
        dark ? "tile-face-dark" : "tile-face"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-porphyry-900/25"
      />
      <div className="flex min-h-0 flex-1 items-stretch">
        <Half value={a} dark={dark} size={size} />
        <div
          aria-hidden="true"
          className="w-px shrink-0 self-stretch bg-porphyry-900/25"
        />
        <Half value={b} dark={dark} size={size} />
      </div>
    </div>
  );
}