import type { Dictionary } from "./pt";

/**
 * Dicionário de textos em inglês.
 *
 * A tipagem `Dictionary` obriga este arquivo a ter exatamente as mesmas chaves
 * de `pt.ts`. Se uma tradução faltar, o build falha — o que impede que uma
 * seção do site fique silenciosamente em português no modo inglês.
 */
export const en: Dictionary = {
  meta: {
    title: "Trimino — Three tips. A whole new way to play.",
    description:
      "Trimino is a board game inspired by traditional dominoes, played with triangular pieces that have three numbered tips. 59 pieces, three effect cards and a board that closes into a hexagon.",
  },

  common: {
    skipToContent: "Skip to content",
    language: "Language",
    languageSwitch: "Change language",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToHome: "Back to the presentation",
    primaryNav: "Main navigation",
    mobileNav: "Mobile navigation",
    breadcrumbHome: "Home",
    scroll: "Scroll",
    tipZero: "zero",
    pieceOf: "Piece {n} of {total}",
    pieceAria: "Trimino piece {tips}",
    wildcardAria: "Trimino wildcard piece",
    cardAria: "{name} card",
    comingSoon: "Coming soon",
  },

  nav: {
    home: "Home",
    about: "About",
    pieces: "Pieces",
    cards: "Cards",
    how: "How it works",
    gallery: "Gallery",
    rules: "Regulations",
    footerAbout: "The game",
    footerRules: "Regulations",
    footerCredits: "Credits",
  },

  hero: {
    eyebrow: "Board game · Triangular pieces",
    title: "Trimino",
    tagline: "Three tips. A whole new way to play.",
    body: "A domino that turned into a triangle. Fifty-nine pieces numbered in roman numerals, three effect cards and a board that closes into a hexagon.",
    ctaPrimary: "Learn the rules",
    ctaSecondary: "See the pieces",
    statPieces: "pieces in the set",
    statTips: "tips per piece",
    statNumbers: "numbers per tip",
  },

  about: {
    eyebrow: "Meet Trimino",
    title: "A domino with three tips",
    body1:
      "Trimino starts from a simple question: what if every domino piece had three tips instead of two? The answer is a game built on the very same idea of matching — add up the numbers that touch — but with a shape that changes everything.",
    body2:
      "Anyone who has played dominoes recognises the mechanics in seconds. Anyone who never has will learn the same way: by building one hexagon at a time. The difference is that here, every piece has one extra number to think about.",
    highlight:
      "The goal is simple: to be the first player left with no pieces when the game ends.",
    stats: [
      { value: 59, label: "pieces in total" },
      { value: 8, label: "pieces per player" },
      { value: 3, label: "effect cards" },
    ],
    countersCaption: "The set in numbers",
  },

  pieces: {
    eyebrow: "The pieces",
    title: "Numbered pieces and wildcards",
    lede: "Every piece is a triangle with three tips. The numbers run from 0 to 5 and are printed in roman numerals.",
    numberedTitle: "56 numbered pieces",
    numberedBody:
      "Every possible combination of three numbers between 0 and 5, without repeating equivalent combinations. The IV · II · V piece, for instance, appears exactly once — reordering the tips does not create a new piece.",
    wildcardTitle: "3 wildcard pieces",
    wildcardBody:
      "A wildcard fits any piece without having to respect the usual sum rule. It is the escape valve for a game that has closed in too early.",
    breakdownTitle: "Three parts of the set",
    catalogTitle: "Tap to inspect",
    catalogLede: "All 56 numbered pieces and the 3 wildcards, one by one.",
    filterAll: "All",
    filterHigh: "High sum",
    filterTriple: "Triple piece",
    filterWild: "Wildcards",
    emptyFilter: "No piece matches this filter.",
    selectedPiece: "Selected piece",
    rotationHint: "Click to rotate the piece",
    totalLabel: "Piece total",
    pieceNumber: "Piece no. {n}",
  },

  cards: {
    eyebrow: "Effect cards",
    title: "Three cards that change the game",
    lede: "When a player closes a hexagon with six pieces, they draw a random effect card. Once used, the card goes back to the centre of the table — it is never discarded.",
    keepNote:
      "A player does not have to resolve the effect the moment they receive the card. They can hold it and use it at the right time.",
    items: {
      wildcard: {
        name: "Wildcard",
        body: "Lets you connect a piece without having to respect the sum rule.",
      },
      "hand-swap": {
        name: "Hand Swap",
        body: "The player picks another player and the two of them swap every piece, without seeing what they will receive beforehand.",
      },
      "piece-swap": {
        name: "Piece Swap",
        body: "The player can look at the next player's pieces and pick one to exchange for one of their own.",
      },
    },
  },

  how: {
    eyebrow: "How it works",
    title: "The matching rule and the hexagon",
    lede: "Everything revolves around a single sum rule. Get that right and the rest falls into place.",
    matchTitle: "1. The sum rule",
    matchBody:
      "To connect two pieces, the sum of the numbers on the two tips on one side of a piece must equal the sum of the two tips on the matching side of the other piece.",
    matchDemoTitle: "Which piece fits?",
    matchDemoBody:
      "The III · I · IV piece has tips that sum to 3 + 1 = 4. Choose the piece that can be connected to it.",
    matchPrompt: "Choose a piece",
    matchCorrect: "That's it! The sums match: {a} + {b} = {c} + {d}.",
    matchWrong: "It does not fit. {a} + {b} is not equal to {c} + {d}.",
    matchReset: "Start over",
    matchTry: "Try again",
    hexagonTitle: "2. The hexagon",
    hexagonBody:
      "Six pieces around an empty centre close a hexagon. Every piece splits its three tips: two on one side of the shared edge, one on the other. The sum rule holds at all six joins — and the closed hexagon is what earns you the effect card.",
    hexagonCaption: "Six pieces, six joins, one effect card.",
    hexagonLegend: "Join between two pieces",
    hexagonSumLabel: "Sum on each side",
    hexagonMatches: "Both sides add up to {value}",
    setupTitle: "How a game begins",
    setupBody:
      "Each player is dealt eight pieces. The player holding the highest-value piece — measured by the sum of its three numbers — makes the first move.",
    setupItems: [
      "Each player starts with 8 pieces.",
      "The player with the highest-sum piece starts.",
      "The first player left with no pieces wins.",
    ],
    rulesListTitle: "The main rules",
    rulesList: [
      "The sum of the two tips on one side must equal the sum of the two tips on the matching side of the other piece.",
      "Closing a hexagon of six pieces earns a random effect card.",
      "The card goes back to the centre of the table once used — it is never discarded.",
      "A player does not have to resolve the effect immediately after drawing a card.",
      "Each player starts with eight pieces.",
      "The game starts with whoever holds the highest-value piece, measured by the sum of its three numbers.",
      "The first player left with no pieces wins.",
    ],
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Photos of the game",
    lede: "The real pieces, the cards and the assembled board.",
    captionPiece: "Numbered piece",
    captionPieceBody:
      "The IV · II · V combination, with the roman numerals on its three tips.",
    captionWildcard: "Wildcard piece",
    captionWildcardBody:
      "Fits any piece, without having to respect the sum rule.",
    captionCards: "The three effect cards",
    captionCardsBody: "Wildcard, Hand Swap and Piece Swap.",
    placeholder: "Reserved spot for the photo",
    placeholderHint:
      "The real photos go here. Just replace the files in this folder.",
    boardTitle: "The assembled board",
    boardBody: "A hexagon closed by six pieces.",
  },

  rules: {
    eyebrow: "Regulations",
    title: "Read the official regulations",
    body: "The complete Trimino regulations live on their own page, with the same look as this presentation. They bring together every rule, the board setup and what to do in each game situation.",
    cta: "Open the regulations",
    note: "The regulations are written and reviewed by the project team. This presentation page is a summary — if in doubt, the official regulations win.",
  },

  credits: {
    eyebrow: "Credits",
    title: "Created by",
    membersLabel: "Members",
    classLabel: "Class",
    schoolLabel: "School",
    courseLabel: "Course",
    yearLabel: "Year",
    placeholder: "To fill in",
    placeholderHint:
      "Replace these fields in `src/lib/content/pt.ts` and `src/lib/content/en.ts` with the group's names.",
    techLabel: "Built with",
    techBody:
      "HTML, CSS and JavaScript with a static build, published on GitHub Pages.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Frequently asked",
    items: [
      {
        q: "Is Trimino just a normal domino set?",
        a: "The idea is the same — fitting pieces together by matching numbers. The difference is the shape: every piece has three tips instead of two, the set has 59 pieces instead of 28, and there is hexagon building with the effect cards.",
      },
      {
        q: "How many pieces are in the set?",
        a: "There are 59 pieces: 56 numbered and 3 wildcards. The 56 numbered ones cover every combination of three numbers between 0 and 5, without repeating equivalent combinations.",
      },
      {
        q: "Why do the numbers only go from 0 to 5?",
        a: "With three tips and numbers from 0 to 5, the total number of combinations comes to exactly 56. That is small enough to hold in your hand and large enough that the game does not end in three moves.",
      },
      {
        q: "How does the sum rule work?",
        a: "Each edge of a piece separates one tip on one side from two tips on the other. To connect two pieces, the sum of the two tips on one side must equal the sum of the two tips on the matching side of the other piece.",
      },
      {
        q: "What happens when I complete a hexagon?",
        a: "You draw a random effect card. Once you have used it, the card goes back to the centre of the table — the card deck never shrinks. And you do not have to play it straight away.",
      },
      {
        q: "Can cards be played whenever you want?",
        a: "Yes. A player can hold the card and resolve the effect whenever it is most useful — there is no obligation to use it immediately.",
      },
    ],
  },

  regulamento: {
    eyebrow: "Official regulations",
    title: "Trimino regulations",
    lede: "The complete rules of Trimino, with the board setup, the sum rule, the hexagon and the effect cards.",
    backCta: "Back to the presentation",
    statusTitle: "Regulations in progress",
    statusBody:
      "This page is ready to receive the official text of the regulations, written by the project team. As soon as the final version is delivered it will be published here — in Portuguese and, once available, in English.",
    statusBadge: "Awaiting the final text",
    placeholderHeading: "Reserved space for the regulations",
    placeholderBody:
      "The official content goes here. It is written by the other member of the group and should be inserted exactly as approved, without changes.",
    howToFill: "How to fill in this page",
    howToFillSteps: [
      "Replace this block with the final text of the regulations.",
      "Keep the headings at section level so the table of contents builds itself.",
      "If there is an official PDF, put the file in `public/` and use the slot below.",
    ],
    pdfTitle: "Official document (PDF)",
    pdfSlotLabel: "Regulations PDF",
    pdfSlotHint: "No PDF linked yet.",
    pdfSlotFile: "Place the file at `public/regulamento.pdf` to display it here.",
    tocTitle: "On this page",
  },

  footer: {
    tagline:
      "Three tips, fifty-nine pieces and a hexagon in the middle of the table.",
    project: "The game",
    pages: "Pages",
    contact: "Contact",
    contactHint: "Get in touch with the project team.",
    emailLabel: "Project email",
    rights: "Trimino project",
    builtWith: "Static site hosted on GitHub Pages.",
  },
};