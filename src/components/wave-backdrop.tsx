"use client";

import dynamic from "next/dynamic";
import type { PatternWavesProps } from "./pattern-waves";

/**
 * O padrão WebGL é carregado só no cliente e só quando entra na tela:
 * em servidor não há WebGL, e no mobile o custo de GPU não se justifica
 * antes de a seção aparecer.
 */
const PatternWaves = dynamic(() => import("./pattern-waves"), {
  ssr: false,
});

type Props = {
  className?: string;
} & Partial<
  Pick<
    PatternWavesProps,
    | "preset"
    | "pattern"
    | "wave"
    | "spacing"
    | "markSize"
    | "depth"
    | "shine"
    | "contrast"
    | "speed"
    | "scale"
    | "direction"
    | "color"
    | "backgroundColor"
    | "opacity"
    | "fade"
    | "fadeSize"
    | "characters"
    | "interactive"
    | "cursorSize"
    | "cursorStrength"
  >
>;

/**
 * Fundo da marca: malha de algarismos romanos ondulando sobre o mármore.
 * As cores vêm dos tokens do design system — travertina sobre tinta.
 */
export function WaveBackdrop({
  className = "",
  preset = "terminal",
  characters = "IVXLCDM",
  color = "#ede4d3",
  backgroundColor = "transparent",
  opacity = 0.2,
  fade = "edges",
  fadeSize = 0.58,
  spacing = 15,
  speed = 0.28,
  shine = 0.85,
  depth = 0.7,
  interactive = true,
  cursorSize = 80,
  cursorStrength = 0.45,
  ...rest
}: Props) {
  return (
    <PatternWaves
      preset={preset}
      characters={characters}
      color={color}
      backgroundColor={backgroundColor}
      opacity={opacity}
      fade={fade}
      fadeSize={fadeSize}
      spacing={spacing}
      speed={speed}
      shine={shine}
      depth={depth}
      interactive={interactive}
      cursorSize={cursorSize}
      cursorStrength={cursorStrength}
      className={className}
      {...rest}
    />
  );
}