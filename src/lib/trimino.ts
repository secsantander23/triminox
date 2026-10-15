/**
 * Dados do jogo Triminó.
 *
 * A peça é um triângulo com três pontas numeradas. Os números vão de 0 a 5 e
 * são gravados em algarismos romanos. O baralho tem 56 peças numeradas — todas
 * as combinações de três números sem repetir equivalências — mais 3 coringas,
 * totalizando 59 peças.
 *
 * Este módulo é agnóstico de idioma: guarda apenas a estrutura do jogo. Todo o
 * texto legível vive nos dicionários em `src/lib/content`.
 */

export const MIN_NUMBER = 0;
export const MAX_NUMBER = 5;

/**
 * Algarismos romanos de 0 a 5.
 *
 * O zero não existe em algarismos romanos. No Triminó ele é desenhado como uma
 * ponta vazia (um disco no triângulo, como o "duplo branco" do dominó
 * tradicional), mas em contextos de texto puro — legendas, listas — ele aparece
 * como "0" para não deixar o número em branco.
 */
const ROMAN_NUMERALS = ["0", "I", "II", "III", "IV", "V"] as const;

export function toRoman(value: number): string {
  return ROMAN_NUMERALS[value] ?? "";
}

/** Os seis números do jogo, em ordem. */
export const NUMBERS: readonly number[] = ROMAN_NUMERALS.map(
  (_, index) => index,
);

/** Peça numerada do baralho. As pontas vêm sempre em ordem (a ≤ b ≤ c). */
export type Piece = {
  readonly a: number;
  readonly b: number;
  readonly c: number;
  /** Soma dos três números — usada para decidir quem começa a partida. */
  readonly sum: number;
};

/**
 * As 56 peças numeradas: toda combinação de três números entre 0 e 5,
 * sem repetir combinações equivalentes (a ordem das pontas não importa).
 * São C(6 + 3 − 1, 3) = C(8, 3) = 56 peças.
 */
export const PIECES: readonly Piece[] = (() => {
  const pieces: Piece[] = [];
  for (let a = MIN_NUMBER; a <= MAX_NUMBER; a++) {
    for (let b = a; b <= MAX_NUMBER; b++) {
      for (let c = b; c <= MAX_NUMBER; c++) {
        pieces.push({ a, b, c, sum: a + b + c });
      }
    }
  }
  return pieces;
})();

/** As três peças coringa: encaixam em qualquer peça, ignorando a regra da soma. */
export const WILDCARD_COUNT = 3;

/** Total de peças do baralho: 56 numeradas + 3 coringas. */
export const PIECE_COUNT = PIECES.length + WILDCARD_COUNT;

/** Identificadores das três cartas de efeito. */
export const CARD_IDS = [
  "wildcard",
  "hand-swap",
  "piece-swap",
] as const;

export type CardId = (typeof CARD_IDS)[number];

/** Cada jogador começa com oito peças. */
export const PIECES_PER_PLAYER = 8;

/** Um hexágono é fechado por seis peças. */
export const HEXAGON_SIDE_COUNT = 6;

/**
 * Soma das duas pontas de um lado da peça. É o valor que precisa casar com o
 * lado oposto da peça vizinha. `skip` é a ponta que fica do outro lado da
 * aresta compartilhada.
 */
export function edgeSum(piece: Piece, skip: number): number {
  const tips = [piece.a, piece.b, piece.c].filter((value) => value !== skip);
  return tips.reduce((total, value) => total + value, 0);
}

/** Índice da ponta oposta a uma aresta do triângulo. */
export const TIP_INDEX = { a: 0, b: 1, c: 2 } as const;