/**
 * Dicionário de textos em português do Brasil.
 *
 * Este arquivo define a *forma* do dicionário: `en.ts` precisa ter exatamente as
 * mesmas chaves, e o TypeScript falha o build se alguma tradução faltar.
 * Strings com `{chaves}` recebem substituição via `t()`.
 */

export const pt = {
  meta: {
    title: "Triminó — Três pontas. Uma nova forma de jogar.",
    description:
      "O Triminó é um jogo de mesa inspirado no dominó tradicional, com peças triangulares de três pontas numeradas. 59 peças, três cartas de efeito e uma mesa que vira hexágono.",
  },

  common: {
    skipToContent: "Pular para o conteúdo",
    language: "Idioma",
    languageSwitch: "Mudar idioma",
    menu: "Menu",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    backToHome: "Voltar para a apresentação",
    primaryNav: "Navegação principal",
    mobileNav: "Navegação móvel",
    breadcrumbHome: "Início",
    scroll: "Deslize",
    tipZero: "zero",
    pieceOf: "Peça {n} de {total}",
    pieceAria: "Peça de Triminó {tips}",
    wildcardAria: "Peça coringa do Triminó",
    cardAria: "Carta {name}",
    comingSoon: "Em breve",
  },

  nav: {
    home: "Início",
    about: "Conheça",
    pieces: "As peças",
    cards: "Cartas",
    how: "Como funciona",
    gallery: "Galeria",
    rules: "Regulamento",
    footerAbout: "O jogo",
    footerRules: "Regulamento",
    footerCredits: "Créditos",
  },

  hero: {
    eyebrow: "Jogo de mesa · Peças triangulares",
    title: "Triminó",
    tagline: "Três pontas. Uma nova forma de jogar.",
    body: "Um dominó que virou triângulo. Cinquenta e nove peças com números em algarismos romanos, três cartas de efeito e uma mesa que se fecha em hexágono.",
    ctaPrimary: "Conhecer as regras",
    ctaSecondary: "Ver as peças",
    statPieces: "peças no baralho",
    statTips: "pontas por peça",
    statNumbers: "números por ponta",
  },

  about: {
    eyebrow: "Conheça o Triminó",
    title: "Um dominó com três pontas",
    body1:
      "O Triminó nasce de uma pergunta simples: e se cada peça do dominó tivesse três pontas em vez de duas? A resposta é um jogo que usa a mesma ideia de encaixe de sempre — somar os números que se encostam — mas com uma geometria que muda tudo.",
    body2:
      "Quem já jogou dominó reconhece a mecânica em segundos. Quem nunca jogou aprende do mesmo jeito: montando um hexágono por vez. A diferença é que, aqui, cada peça traz um número a mais para pensar.",
    highlight: "O objetivo é simples: terminar a partida sendo o primeiro jogador a ficar sem peças.",
    stats: [
      { value: 59, label: "peças no total" },
      { value: 8, label: "peças por jogador" },
      { value: 3, label: "cartas de efeito" },
    ],
    countersCaption: "O baralho em números",
  },

  pieces: {
    eyebrow: "As peças",
    title: "Peças numeradas e coringas",
    lede: "Cada peça é um triângulo com três pontas. Os números vão de 0 a 5 e aparecem em algarismos romanos.",
    numberedTitle: "56 peças numeradas",
    numberedBody:
      "Todas as combinações possíveis de três números entre 0 e 5, sem repetir combinações equivalentes. A peça IV · II · V, por exemplo, aparece uma única vez — trocar a ordem das pontas não cria uma peça nova.",
    wildcardTitle: "3 peças coringa",
    wildcardBody:
      "O coringa encaixa em qualquer peça sem respeitar a regra habitual da soma. Ele é a válvula de escape de uma partida que fechou demais rápido.",
    breakdownTitle: "Três partes do baralho",
    catalogTitle: "Toque para inspecionar",
    catalogLede: "As 56 peças numeradas e as 3 coringas, uma por uma.",
    filterAll: "Todas",
    filterHigh: "Soma alta",
    filterTriple: "Peça tripla",
    filterWild: "Coringas",
    emptyFilter: "Nenhuma peça com esse filtro.",
    selectedPiece: "Peça selecionada",
    rotationHint: "Clique para girar a peça",
    totalLabel: "Soma da peça",
    pieceNumber: "Peça nº {n}",
  },

  cards: {
    eyebrow: "Cartas de efeito",
    title: "Três cartas que mudam a partida",
    lede: "Quando um jogador fecha um hexágono com seis peças, ganha uma carta de efeito sorteada. Depois de usada, a carta volta ao centro da mesa — nunca é descartada.",
    keepNote:
      "O jogador não precisa resolver o efeito assim que recebe a carta. Pode guardar e usar na hora certa.",
    items: {
      wildcard: {
        name: "Coringa",
        body: "Permite conectar uma peça sem respeitar a regra da soma.",
      },
      "hand-swap": {
        name: "Troca de Mão",
        body: "O jogador escolhe outro jogador e os dois trocam todas as peças, sem ver antecipadamente o que vão receber.",
      },
      "piece-swap": {
        name: "Troca de Peça",
        body: "O jogador pode ver as peças do próximo jogador e escolher uma para trocar por uma das suas.",
      },
    },
  },

  how: {
    eyebrow: "Como funciona",
    title: "A regra do encaixe e o hexágono",
    lede: "Tudo gira em torno de uma única regra de soma. Encaixada ela, o resto se resolve.",
    matchTitle: "1. A regra da soma",
    matchBody:
      "Para encaixar duas peças, a soma dos números nas duas pontas de um lado de uma peça precisa ser igual à soma das duas pontas do lado correspondente da outra.",
    matchDemoTitle: "Qual peça encaixa?",
    matchDemoBody:
      "A peça III · I · IV tem pontas cuja soma é 3 + 1 = 4. Escolha a peça que pode ser encaixada ao lado dela.",
    matchPrompt: "Escolha uma peça",
    matchCorrect: "Isso! A soma casa: {a} + {b} = {c} + {d}.",
    matchWrong: "Não encaixa. {a} + {b} é diferente de {c} + {d}.",
    matchReset: "Recomeçar",
    matchTry: "Tente de novo",
    hexagonTitle: "2. O hexágono",
    hexagonBody:
      "Seis peças em torno de um ponto vazio fecham um hexágono. Cada peça divide suas três pontas: duas de um lado da aresta compartilhada, uma do outro. A regra da soma vale em todas as seis junções — e é o hexágono fechado que dá a carta de efeito.",
    hexagonCaption: "Seis peças, seis junções, uma carta de efeito.",
    hexagonLegend: "Junção entre duas peças",
    hexagonSumLabel: "Soma de cada lado",
    hexagonMatches: "Os dois lados somam {value}",
    setupTitle: "Como a partida começa",
    setupBody:
      "Cada jogador recebe oito peças. Começa a partida quem tiver a peça de maior valor, calculado pela soma dos três números dela.",
    setupItems: [
      "Cada jogador começa com 8 peças.",
      "Começa quem tiver a peça de maior soma.",
      "Vence quem ficar com zero peças primeiro.",
    ],
    rulesListTitle: "As regras principais",
    rulesList: [
      "A soma das duas pontas de um lado deve ser igual à soma das duas pontas do lado correspondente da outra peça.",
      "Fechar um hexágono com seis peças dá direito a uma carta de efeito aleatória.",
      "A carta volta ao centro da mesa depois de utilizada — não é descartada.",
      "O jogador não precisa resolver o efeito imediatamente após receber a carta.",
      "Cada jogador começa com oito peças.",
      "Começa a partida quem tiver a peça de maior valor, pela soma dos três números.",
      "Vence quem ficar com zero peças primeiro.",
    ],
  },

  gallery: {
    eyebrow: "Galeria",
    title: "Fotografias do jogo",
    lede: "As peças reais, as cartas e a mesa montada.",
    captionPiece: "Peça numerada",
    captionPieceBody: "A combinação IV · II · V, com os algarismos romanos nas três pontas.",
    captionWildcard: "Peça coringa",
    captionWildcardBody: "Encaixa em qualquer peça, sem respeitar a regra da soma.",
    captionCards: "As três cartas de efeito",
    captionCardsBody: "Coringa, Troca de Mão e Troca de Peça.",
    placeholder: "Espaço reservado para a fotografia",
    placeholderHint:
      "As fotos reais entram aqui. Basta substituir os arquivos nesta pasta.",
    boardTitle: "A mesa montada",
    boardBody: "Um hexágono fechado por seis peças.",
  },

  rules: {
    eyebrow: "Regulamento",
    title: "Acesse o regulamento oficial",
    body: "O regulamento completo do Triminó está em uma página própria, com o mesmo visual desta apresentação. Ele reúne todas as regras, o setup da mesa e o que fazer em cada situação de partida.",
    cta: "Abrir o regulamento",
    note: "O regulamento é escrito e revisado pelo time do projeto. Esta página de apresentação é um resumo — em caso de dúvida, o regulamento oficial manda.",
  },

  credits: {
    eyebrow: "Créditos",
    title: "Feito por",
    membersLabel: "Integrantes",
    classLabel: "Turma",
    schoolLabel: "Escola",
    courseLabel: "Disciplina",
    yearLabel: "Ano",
    placeholder: "Preencher",
    placeholderHint:
      "Substitua estes campos em `src/lib/content/pt.ts` e `src/lib/content/en.ts` com os nomes do grupo.",
    techLabel: "Desenvolvido com",
    techBody: "HTML, CSS e JavaScript com saída estática, publicado no GitHub Pages.",
  },

  faq: {
    eyebrow: "Perguntas",
    title: "Dúvidas frequentes",
    items: [
      {
        q: "O Triminó é um dominó comum?",
        a: "A ideia é a mesma — encaixar peças casando números. A diferença está na forma: cada peça tem três pontas em vez de duas, o baralho tem 59 peças em vez de 28, e existe a formação de hexágono com as cartas de efeito.",
      },
      {
        q: "Quantas peças vêm no baralho?",
        a: "São 59 peças: 56 numeradas e 3 coringas. As 56 numeradas correspondem a todas as combinações de três números entre 0 e 5, sem repetir combinações equivalentes.",
      },
      {
        q: "Por que os números vão só de 0 a 5?",
        a: "Com três pontas e números de 0 a 5, o número total de combinações é exatamente 56. É um conjunto pequeno o bastante para caber na mão e grande o bastante para a partida não terminar em três jogadas.",
      },
      {
        q: "Como funciona a regra da soma?",
        a: "Cada aresta de uma peça separa uma ponta de um lado e duas pontas do outro. Para encaixar duas peças, a soma das duas pontas de um lado precisa ser igual à soma das duas pontas do lado correspondente da outra peça.",
      },
      {
        q: "O que acontece quando termino um hexágono?",
        a: "Você ganha uma carta de efeito aleatória. Depois de usar, a carta volta ao centro da mesa — o baralho de cartas nunca diminui. E você não precisa usar a carta na hora.",
      },
      {
        q: "As cartas podem ser usadas quando quiser?",
        a: "Sim. O jogador pode guardar a carta e resolver o efeito na hora que for mais vantajoso — não há obrigação de usá-la imediatamente.",
      },
    ],
  },

  regulamento: {
    eyebrow: "Regulamento oficial",
    title: "Regulamento do Triminó",
    lede: "O texto completo das regras do Triminó, com o setup da mesa, a regra da soma, o hexágono e as cartas de efeito.",
    backCta: "Voltar para a apresentação",
    statusTitle: "Regulamento em elaboração",
    statusBody:
      "Esta página está pronta para receber o texto oficial do regulamento, escrito pelo time do projeto. Assim que a versão final for entregue, ela é publicada aqui — em português e, quando disponível, em inglês.",
    statusBadge: "Aguardando o texto final",
    placeholderHeading: "Espaço reservado para o regulamento",
    placeholderBody:
      "O conteúdo oficial entra aqui. Ele é escrito pelo outro integrante do grupo e deve ser inserido exatamente como aprovado, sem alterações.",
    howToFill: "Como preencher esta página",
    howToFillSteps: [
      "Substitua este bloco pelo texto final do regulamento.",
      "Mantenha os títulos em nível de seção para gerar o sumário.",
      "Se houver um PDF oficial, coloque o arquivo em `public/` e use o espaço abaixo.",
    ],
    pdfTitle: "Documento oficial em PDF",
    pdfSlotLabel: "PDF do regulamento",
    pdfSlotHint: "Nenhum PDF vinculado ainda.",
    pdfSlotFile: "Coloque o arquivo em `public/regulamento.pdf` para exibi-lo aqui.",
    tocTitle: "Nesta página",
  },

  footer: {
    tagline:
      "Três pontas, cinquenta e nove peças e um hexágono no meio da mesa.",
    project: "O jogo",
    pages: "Páginas",
    contact: "Contato",
    contactHint: "Fale com o time do projeto.",
    emailLabel: "E-mail do projeto",
    rights: "Projeto Triminó",
    builtWith: "Site estático hospedado no GitHub Pages.",
  },
} as const;

/**
 * Amplia os literais de `as const` para `string`, preservando a *estrutura*.
 * Assim `en.ts` é obrigado a ter todas as chaves de `pt.ts` (o build falha se
 * faltar uma) mas pode usar textos diferentes em cada valor.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type Dictionary = Widen<typeof pt>;