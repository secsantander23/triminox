const ROMAN: Record<number, string> = {
  0: "NULLA",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
  12: "XII",
  13: "XIII",
  14: "XIV",
  15: "XV",
  16: "XVI",
  17: "XVII",
  18: "XVIII",
  19: "XIX",
  20: "XX",
  21: "XXI",
  22: "XXII",
  23: "XXIII",
  24: "XXIV",
  25: "XXV",
  26: "XXVI",
  27: "XXVII",
  28: "XXVIII",
};

/** Converte um inteiro em algarismo romano. Zero retorna string vazia (face vazia do dominó). */
export function toRoman(value: number): string {
  return ROMAN[value] ?? "";
}

/** Rótulo legível para leitores de tela: "6" vira "seis", 0 vira "face vazia". */
export function toRomanSpoken(value: number): string {
  if (value === 0) return "face vazia";
  const words = [
    "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito",
    "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis",
    "dezessete", "dezoito", "dezenove", "vinte",
  ];
  return words[value] ?? String(value);
}

/** Peças do baralho clássico de dominó duplo-seis (28 peças). */
export const TILE_SET: ReadonlyArray<{ a: number; b: number }> = (() => {
  const tiles: Array<{ a: number; b: number }> = [];
  for (let a = 0; a <= 6; a++) {
    for (let b = a; b <= 6; b++) tiles.push({ a, b });
  }
  return tiles;
})();

/** Nomes lendários dos pares mais conhecidos — as peças que todo jogador reconhece. */
export const TILE_LORE: Record<string, string> = {
  "6-6": "A peça-mãe. Não existe baralho sem ela.",
  "0-0": "O vazio absoluto. Dois nulos que se encontram — o início antes do jogo.",
  "6-0": "A modernidade contra a tradição. A peça que divide o baralho.",
  "1-6": "O eixo sobre o qual o tabuleiro inteiro gira.",
  "5-5": "A peça da virada. Duas metades iguais, nenhum lado mais forte.",
  "2-2": "A peça do equilíbrio: nenhuma metade leva vantagem.",
  "3-3": "A peça da paciência. Só se resolve no fim da partida.",
  "4-4": "A peça da conversa longa: uma ponta, um acordo.",
};