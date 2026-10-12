export const VALUES = [
  {
    numeral: "I",
    title: "Acessibilidade",
    body: "Um projeto social não pode depender de quem tem. Financiamos mesas solidárias e material em Braille para que o dominó chegue a quem não enxerga.",
  },
  {
    numeral: "II",
    title: "Oficina local",
    body: "Cada peça é cortada e impressa à mão por ateliês parceiros. O projeto paga preço justo e mantém o dinheiro na comunidade.",
  },
  {
    numeral: "III",
    title: "Memória em construção",
    body: "Recontamos a história por um olhar romano — o de um império inteiro. Um dominó com algarismos romanos também é um convite a ensinar latinidade.",
  },
  {
    numeral: "IV",
    title: "Jogo que junta",
    body: "O Triminox funciona em mesas de dois, quatro ou oito. É o pretexto para a conversa que a gente adia há semanas.",
  },
] as const;

export const PILLARS = [
  {
    numeral: "I",
    title: "Peças",
    spec: "Baralho duplo-seis · 28 peças",
    detail:
      "Madeira laminada de alta densidade, faces em marfim e numerais gravados a laser em relevo. Resistente a café, vinho e a respingo de terra.",
  },
  {
    numeral: "II",
    title: "Mesa",
    spec: "Base em silicone · 60 × 60 cm",
    detail:
      "Base emborrachada que trava as peças no lugar. A peça não escorrega, não cai e não trava o giro. Jogue na mesa da cozinha sem cerimônia.",
  },
  {
    numeral: "III",
    title: "Caixa",
    spec: "Linho encerado · trava magnética",
    detail:
      "Caixa com trava magnética e revestimento em linho encerado. Sobrevive à mudança de casa, ao gato e ao carteiro.",
  },
] as const;

export const RULES = [
  {
    numeral: "I",
    title: "Formação",
    body: "Cada jogador recebe 7 peças de costas para baixo. O restante fica no fundo da mesa. A peça virada à sua frente é a primeira jogada.",
    hint: "Peças viradas para baixo, sempre.",
  },
  {
    numeral: "II",
    title: "A jogada",
    body: "Na sua vez, encaixe uma peça em uma das pontas abertas da mesa, casando os numerais correspondentes. Cada peça tem duas faces — qualquer uma pode ser a face da ligação.",
    hint: "Uma peça por vez, em uma ponta só.",
  },
  {
    numeral: "III",
    title: "Passar a vez",
    body: "Se você não tem peça que case com nenhuma ponta, passa a vez. Se tiver apenas uma opção e jogar, ganha o direito de comprar depois — a maldição do chinelo.",
    hint: "Passou, perdeu o direito de comprar.",
  },
  {
    numeral: "IV",
    title: "A contagem",
    body: "A pontuação é calculada no fim, somando os numerais de todas as peças que sobraram na sua mão. Vence a dupla com a menor soma. Bloquear as pontas do adversário é estratégia, não falta de educação.",
    hint: "Quem tem menos pontos, vence.",
  },
  {
    numeral: "V",
    title: "O bloqueio",
    body: "Se o adversário travar a mesa antes de você fechar, encerra-se aquela rodada de bloqueio e passa-se à contagem normal. Ninguém fica preso na partida.",
    hint: "A rodada é anulada, todos contam.",
  },
  {
    numeral: "VI",
    title: "A partida",
    body: "Joga-se até alguém fechar a mão. Uma dupla contra outra, sempre. Em mesa de quatro ou oito, as duplas se alternam a cada rodada.",
    hint: "A mão fechada encerra o round.",
  },
] as const;

export const FAQ = [
  {
    q: "O Triminox é um dominó comum?",
    a: "As regras são exatamente as do dominó tradicional duplo-seis. A diferença está na linguagem: cada face traz algarismos romanos em vez de pontos. Quem sabe dominó aprende em minutos; quem nunca jogou aprende junto.",
  },
  {
    q: "Quantas peças vêm no baralho?",
    a: "São 28 peças, o baralho duplo-seis clássico — todas as combinações de 0 a 6, sem repetir. Todo número de I a VI aparece em alguma face, com alta frequência nas pontas altas.",
  },
  {
    q: "Qual a diferença para um dominó de loja?",
    a: "As faces são gravadas em relevo, não impressas: a marca não sai com o uso. A base de silicone é o segundo diferencial — no dominó comum as peças escapam da mesa, e o Triminox não tem esse problema.",
  },
  {
    q: "O projeto é social? Como isso funciona?",
    a: "Parte da renda de cada lote financia oficinas de marcenaria e material em Braille, em parceria com ateliês locais. Você recebe o baralho e o nome de quem ajudou a fazê-lo.",
  },
  {
    q: "Dá para jogar com crianças?",
    a: "Pode. A regra é a mesma, mas as duplas jogam com as faces expostas até aprenderem a mecânica. Recomendado a partir de 8 anos.",
  },
] as const;

export const KIT_OPTIONS = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 129",
    description: "O baralho e a base de silicone. Para a mesa da casa.",
    includes: [
      "Baralho duplo-seis · 28 peças",
      "Base de silicone 60 × 60 cm",
      "Folha de regras ilustrada",
    ],
    featured: false,
  },
  {
    id: "imperial",
    name: "Imperial",
    price: "R$ 189",
    description: "Tudo do Essencial, em caixa de linho encerado com trava magnética.",
    includes: [
      "Baralho duplo-seis · 28 peças",
      "Base de silicone 60 × 60 cm",
      "Caixa de linho encerado",
      "Manual completo impresso",
    ],
    featured: true,
  },
  {
    id: "legiao",
    name: "Legião",
    price: "R$ 289",
    description: "Para mesas maiores: dois baralhos para oito jogadores e dois manuais.",
    includes: [
      "2 baralhos duplo-seis · 56 peças",
      "2 bases de silicone 60 × 60 cm",
      "2 manuais completos",
      "Convite para a feitura aberta do ateliê",
    ],
    featured: false,
  },
] as const;

export const STATS = [
  { value: 28, suffix: "", label: "Peças por baralho" },
  { value: 7, suffix: "", label: "Peças por jogador" },
  { value: 100, suffix: "%", label: "Da renda vai para a oficina" },
] as const;