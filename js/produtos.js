/* ============ GrafiPrint — catálogo de produtos ============
   Edite aqui suas categorias, produtos e variações (opção + preço). */

/* Produtos que aparecem em mais de uma categoria são definidos uma única
   vez aqui e referenciados nas categorias — sem duplicar dados. */

const copoCuia = {
  emoji: '🧉', bg: 'linear-gradient(135deg,#e2e8f0,#94a3b8)', badge: 'Novo',
  imagem: 'img/copo-cuia-laser.png',
  nome: 'Copo Cuia com Tampa em Acrílico 360ml',
  spec: 'Metal · tampa acrílica · gravação a laser 4x0 (4x4 cm) ou estampa em DTF',
  /* Produto com lista de combinações: o cliente escolhe a quantidade de
     cada personalização. O preço unitário segue a faixa da quantidade
     total de copos ("min" = a partir de quantas unidades vale o preço). */
  opcoesCombinacao: [
    { nome: 'Gravação a Laser', imagem: 'img/copo-cuia-laser.png', faixas: [
      { min: 1, preco: 59.90 },
      { min: 5, preco: 55.90 },
    ] },
    { nome: 'Estampa em DTF', imagem: 'img/copo-cuia-dtf.png', faixas: [
      { min: 1, preco: 55.90 },
    ] },
  ],
};

const copoLongDrink = {
  emoji: '🥤', bg: 'linear-gradient(135deg,#fbcfe8,#ec4899)', badge: 'Mais vendido', destaque: true,
  nome: 'Copo Long Drink 350ml', spec: 'Impressão em silk · várias cores',
  variacoes: [
    { label: '50 un', preco: 149.90 },
    { label: '100 un', preco: 249.90 },
    { label: '200 un', preco: 429.90 },
  ],
};

const copoTermico = {
  emoji: '☕', bg: 'linear-gradient(135deg,#ddd6fe,#7c3aed)', badge: 'Novo',
  nome: 'Copo Térmico Inox 500ml', spec: 'Gravação a laser 4x0 · mantém a temperatura',
  variacoes: [
    { label: '25 un', preco: 549.90 },
    { label: '50 un', preco: 999.90 },
  ],
};

const copoInoxColorido = {
  emoji: '🥛', bg: 'linear-gradient(135deg,#f1f5f9,#94a3b8)', badge: 'Novo',
  imagem: 'img/copo-termico-inox.png',
  nome: 'Copo Térmico Aço Inox',
  spec: 'Aço inox · gravação a laser 4x0 (4x10 cm) · 10 cores',
  precoUnitario: 49.90,
  minimo: 1,
  cores: ['Laranja', 'Preto', 'Azul Marinho', 'Branco', 'Marrom', 'Pink', 'Rosa Claro', 'Tiffany', 'Verde Militar', 'Vermelho'],
};

const garrafaInox750 = {
  emoji: '🍶', bg: 'linear-gradient(135deg,#fed7aa,#ea580c)', badge: 'Novo',
  imagem: 'img/garrafa-inox-750.png',
  nome: 'Garrafa de Inox 750ml Opus',
  spec: 'Aço inox · gravação a laser 4x0 (4x10 cm) · 7 cores',
  precoUnitario: 69.90,
  minimo: 1,
  cores: ['Preto', 'Laranja', 'Branco', 'Vermelho', 'Rosa', 'Azul', 'Prata'],
};

const squeezeFosca = {
  emoji: '🧴', bg: 'linear-gradient(135deg,#bae6fd,#0369a1)', badge: 'Novo',
  nome: 'Squeeze Fosca 600ml',
  spec: 'Metal fosco · gravação a laser 4x0 (4x10 cm) · 6 cores',
  precoUnitario: 49.90,
  minimo: 1,
  cores: ['Preto', 'Verde', 'Vermelho', 'Rosa', 'Azul', 'Prata'],
};

const canetaPersonalizada = {
  emoji: '🖊️', bg: 'linear-gradient(135deg,#fce7f3,#f472b6)',
  nome: 'Caneta Personalizada', spec: 'Gravação a laser 4x0 ou silk',
  variacoes: [
    { label: '100 un', preco: 119.90 },
    { label: '250 un', preco: 249.90 },
    { label: '500 un', preco: 419.90 },
  ],
};

const CATALOGO = {
  'cartoes-de-visita': {
    nome: 'Cartões de Visita',
    emoji: '💼',
    banner: 'linear-gradient(120deg,#b45309,#f59e0b)',
    descricao: 'Cause uma ótima primeira impressão com cartões de alta qualidade em diversos papéis e acabamentos.',
    produtos: [
      { emoji: '💼', bg: 'linear-gradient(135deg,#fde68a,#f59e0b)', badge: 'Mais vendido', destaque: true,
        nome: 'Cartão de Visita Couchê', spec: 'Couchê 300g · 4x4 cores · verniz total',
        variacoes: [
          { label: '100 un', preco: 19.90 },
          { label: '500 un', preco: 29.90 },
          { label: '1.000 un', preco: 39.90 },
        ] },
      { emoji: '✨', bg: 'linear-gradient(135deg,#fef3c7,#fbbf24)',
        nome: 'Cartão com Verniz Localizado', spec: 'Couchê 300g · brilho só onde importa',
        variacoes: [
          { label: '250 un', preco: 49.90 },
          { label: '500 un', preco: 59.90 },
          { label: '1.000 un', preco: 79.90 },
        ] },
      { emoji: '🖤', bg: 'linear-gradient(135deg,#e5e7eb,#6b7280)',
        nome: 'Cartão Laminação Fosca', spec: 'Toque aveludado · 4x4 cores',
        variacoes: [
          { label: '250 un', preco: 59.90 },
          { label: '500 un', preco: 74.90 },
          { label: '1.000 un', preco: 99.90 },
        ] },
      { emoji: '📇', bg: 'linear-gradient(135deg,#fed7aa,#fb923c)',
        nome: 'Cartão Duplo (dobrado)', spec: 'Mais espaço para sua mensagem',
        variacoes: [
          { label: '100 un', preco: 39.90 },
          { label: '500 un', preco: 89.90 },
          { label: '1.000 un', preco: 129.90 },
        ] },
    ],
  },

  'panfletos': {
    nome: 'Panfletos',
    emoji: '📄',
    banner: 'linear-gradient(120deg,#1e40af,#3b82f6)',
    descricao: 'Divulgue promoções e serviços com panfletos, folders e cardápios de impressão vibrante.',
    produtos: [
      { emoji: '📄', bg: 'linear-gradient(135deg,#bfdbfe,#3b82f6)', badge: 'Mais vendido', destaque: true,
        nome: 'Panfleto A5', spec: 'Couchê 115g · 4x4 cores',
        variacoes: [
          { label: '1.000 un', preco: 79.90 },
          { label: '2.500 un', preco: 129.90 },
          { label: '5.000 un', preco: 199.90 },
        ] },
      { emoji: '📃', bg: 'linear-gradient(135deg,#dbeafe,#60a5fa)',
        nome: 'Panfleto A6', spec: 'Couchê 115g · tamanho bolso',
        variacoes: [
          { label: '1.000 un', preco: 59.90 },
          { label: '2.500 un', preco: 99.90 },
          { label: '5.000 un', preco: 159.90 },
        ] },
      { emoji: '📰', bg: 'linear-gradient(135deg,#c7d2fe,#6366f1)',
        nome: 'Folder A4 (2 dobras)', spec: 'Couchê 150g · 4x4 cores',
        variacoes: [
          { label: '500 un', preco: 149.90 },
          { label: '1.000 un', preco: 219.90 },
          { label: '2.500 un', preco: 399.90 },
        ] },
      { emoji: '🍽️', bg: 'linear-gradient(135deg,#bae6fd,#0ea5e9)',
        nome: 'Cardápio A4 Plastificado', spec: 'Resistente a líquidos · 4x4 cores',
        variacoes: [
          { label: '50 un', preco: 129.90 },
          { label: '100 un', preco: 199.90 },
          { label: '200 un', preco: 349.90 },
        ] },
    ],
  },

  'adesivos': {
    nome: 'Adesivos',
    emoji: '🏷️',
    banner: 'linear-gradient(120deg,#15803d,#22c55e)',
    descricao: 'Adesivos e rótulos em vinil resistente, com recorte no formato que você quiser.',
    produtos: [
      { emoji: '🏷️', bg: 'linear-gradient(135deg,#bbf7d0,#22c55e)', badge: 'Oferta', destaque: true,
        nome: 'Adesivo Vinil Recorte', spec: 'Recorte especial · resistente à água',
        variacoes: [
          { label: '100 un', preco: 39.90 },
          { label: '500 un', preco: 89.90 },
          { label: '1.000 un', preco: 139.90 },
        ] },
      { emoji: '⭕', bg: 'linear-gradient(135deg,#d9f99d,#84cc16)',
        nome: 'Adesivo Redondo 5cm', spec: 'Vinil brilho · 4x0 cores',
        variacoes: [
          { label: '100 un', preco: 29.90 },
          { label: '500 un', preco: 69.90 },
          { label: '1.000 un', preco: 109.90 },
        ] },
      { emoji: '🌈', bg: 'linear-gradient(135deg,#a7f3d0,#14b8a6)',
        nome: 'Adesivo Holográfico', spec: 'Efeito arco-íris premium',
        variacoes: [
          { label: '100 un', preco: 49.90 },
          { label: '500 un', preco: 119.90 },
          { label: '1.000 un', preco: 189.90 },
        ] },
      { emoji: '🫙', bg: 'linear-gradient(135deg,#bbf7d0,#4ade80)',
        nome: 'Rótulo para Embalagem', spec: 'Vinil fosco ou brilho · alta adesão',
        variacoes: [
          { label: '250 un', preco: 79.90 },
          { label: '500 un', preco: 129.90 },
          { label: '1.000 un', preco: 199.90 },
        ] },
    ],
  },

  'brindes': {
    nome: 'Brindes',
    emoji: '🎁',
    banner: 'linear-gradient(120deg,#be185d,#ec4899)',
    descricao: 'Brindes personalizados que mantêm sua marca na memória (e na mão) dos clientes.',
    produtos: [
      copoCuia,
      copoLongDrink,
      canetaPersonalizada,
      { emoji: '🔑', bg: 'linear-gradient(135deg,#fecdd3,#fb7185)',
        nome: 'Chaveiro Acrílico', spec: 'Formato personalizado · impressão UV',
        variacoes: [
          { label: '50 un', preco: 89.90 },
          { label: '100 un', preco: 149.90 },
          { label: '200 un', preco: 259.90 },
        ] },
      { emoji: '👜', bg: 'linear-gradient(135deg,#fecaca,#ef4444)',
        nome: 'Ecobag Algodão', spec: 'Algodão cru · serigrafia 1 cor',
        variacoes: [
          { label: '25 un', preco: 169.90 },
          { label: '50 un', preco: 299.90 },
          { label: '100 un', preco: 529.90 },
        ] },
    ],
  },

  'embalagens': {
    nome: 'Embalagens',
    emoji: '📦',
    banner: 'linear-gradient(120deg,#9a3412,#f97316)',
    descricao: 'Embalagens personalizadas que valorizam seu produto do delivery à prateleira.',
    produtos: [
      { emoji: '📦', bg: 'linear-gradient(135deg,#fed7aa,#f97316)', badge: 'Novo', destaque: true,
        nome: 'Caixa Delivery Kraft', spec: 'Papel kraft · impressão 1 cor',
        variacoes: [
          { label: '100 un', preco: 189.90 },
          { label: '250 un', preco: 399.90 },
          { label: '500 un', preco: 699.90 },
        ] },
      { emoji: '🛍️', bg: 'linear-gradient(135deg,#ffedd5,#fb923c)',
        nome: 'Sacola de Papel', spec: 'Alça torcida · impressão 4x0',
        variacoes: [
          { label: '100 un', preco: 249.90 },
          { label: '250 un', preco: 549.90 },
          { label: '500 un', preco: 949.90 },
        ] },
      { emoji: '🥖', bg: 'linear-gradient(135deg,#fde68a,#d97706)',
        nome: 'Saco Kraft com Janela', spec: 'Ideal para alimentos · visor transparente',
        variacoes: [
          { label: '250 un', preco: 179.90 },
          { label: '500 un', preco: 299.90 },
          { label: '1.000 un', preco: 499.90 },
        ] },
      { emoji: '🎀', bg: 'linear-gradient(135deg,#fef3c7,#f59e0b)',
        nome: 'Fita Adesiva Personalizada', spec: 'Sua marca em cada pacote',
        variacoes: [
          { label: '10 rolos', preco: 129.90 },
          { label: '25 rolos', preco: 279.90 },
          { label: '50 rolos', preco: 489.90 },
        ] },
    ],
  },

  'ponto-de-venda': {
    nome: 'Ponto de Venda',
    emoji: '🪧',
    banner: 'linear-gradient(120deg,#0e7490,#06b6d4)',
    descricao: 'Banners, displays e materiais de PDV para destacar sua marca onde a venda acontece.',
    produtos: [
      { emoji: '🪧', bg: 'linear-gradient(135deg,#a5f3fc,#06b6d4)', badge: 'Novo', destaque: true,
        nome: 'Banner em Lona 440g', spec: 'Com ilhós · impressão digital HD',
        variacoes: [
          { label: '60x90 cm', preco: 59.90 },
          { label: '80x120 cm', preco: 79.90 },
          { label: '100x150 cm', preco: 119.90 },
        ] },
      { emoji: '🏳️', bg: 'linear-gradient(135deg,#cffafe,#22d3ee)',
        nome: 'Wind Banner', spec: 'Estrutura + bandeira em tecido',
        variacoes: [
          { label: '2,0 m', preco: 249.90 },
          { label: '2,8 m', preco: 319.90 },
          { label: '3,4 m', preco: 399.90 },
        ] },
      { emoji: '🖼️', bg: 'linear-gradient(135deg,#bae6fd,#38bdf8)',
        nome: 'Display de Mesa', spec: 'Papel triplex 350g · faca especial',
        variacoes: [
          { label: '10 un', preco: 89.90 },
          { label: '25 un', preco: 169.90 },
          { label: '50 un', preco: 279.90 },
        ] },
      { emoji: '💬', bg: 'linear-gradient(135deg,#a5f3fc,#0ea5e9)',
        nome: 'Wobbler', spec: 'Chame atenção na gôndola',
        variacoes: [
          { label: '50 un', preco: 69.90 },
          { label: '100 un', preco: 109.90 },
          { label: '250 un', preco: 199.90 },
        ] },
    ],
  },

  'copos': {
    nome: 'Copos',
    emoji: '🥤',
    banner: 'linear-gradient(120deg,#065f46,#10b981)',
    descricao: 'Copos personalizados para brindes, eventos, bares e delivery.',
    produtos: [
      copoCuia,
      copoInoxColorido,
      copoLongDrink,
      copoTermico,
    ],
  },

  'gravacao-a-laser': {
    nome: 'Gravação a Laser',
    emoji: '🔆',
    banner: 'linear-gradient(120deg,#334155,#64748b)',
    descricao: 'Personalização premium com gravação a laser em metal, inox e outros materiais.',
    produtos: [
      copoCuia,
      { emoji: '🖋️', bg: 'linear-gradient(135deg,#cbd5e1,#475569)', badge: 'Novo',
        nome: 'Caneta de Metal Touch', spec: 'Metal · ponta touch · gravação a laser 4x0 (0,6x5 cm)',
        variacoes: [
          { label: '10 un', preco: 98.90 },
        ] },
      { emoji: '✒️', bg: 'linear-gradient(135deg,#e2e8f0,#64748b)', badge: 'Novo',
        nome: 'Caneta de Metal Slim Touch', spec: 'Metal slim · ponta touch · gravação a laser 4x0 (4x0,4 cm)',
        variacoes: [
          { label: '10 un', preco: 90.90 },
        ] },
      { emoji: '🍾', bg: 'linear-gradient(135deg,#d1d5db,#4b5563)', badge: 'Novo',
        imagem: 'img/chaveiro-abridor.png',
        nome: 'Chaveiro Abridor de Metal — Garrafa',
        spec: 'Metal · abridor de garrafa · gravação a laser 4x0 (3,8x0,7 cm)',
        precoUnitario: 2.50,
        minimo: 25,
        cores: ['Preto', 'Verde', 'Vermelho', 'Rosa', 'Azul', 'Prata'] },
      copoInoxColorido,
      garrafaInox750,
      squeezeFosca,
      copoTermico,
      canetaPersonalizada,
    ],
  },

  'lancamentos': {
    nome: 'Lançamentos',
    emoji: '🔥',
    banner: 'linear-gradient(120deg,#7c3aed,#a78bfa)',
    descricao: 'As novidades que acabaram de chegar na GrafiPrint.',
    produtos: [
      { emoji: '👕', bg: 'linear-gradient(135deg,#ddd6fe,#8b5cf6)', badge: 'Novo',
        nome: 'Camiseta DTF UV', spec: 'Algodão premium · cores vibrantes',
        variacoes: [
          { label: '10 un', preco: 349.90 },
          { label: '25 un', preco: 824.90 },
          { label: '50 un', preco: 1549.90 },
        ] },
      { emoji: '💡', bg: 'linear-gradient(135deg,#e9d5ff,#a855f7)', badge: 'Novo',
        nome: 'Banner Backlight', spec: 'Para caixa de luz · alta translucidez',
        variacoes: [
          { label: '80x120 cm', preco: 149.90 },
          { label: '100x150 cm', preco: 199.90 },
        ] },
      copoTermico,
      { emoji: '📲', bg: 'linear-gradient(135deg,#c4b5fd,#6d28d9)', badge: 'Novo',
        nome: 'Cartão de Visita NFC', spec: 'Compartilhe seu contato por aproximação',
        variacoes: [
          { label: '1 un', preco: 49.90 },
          { label: '5 un', preco: 199.90 },
          { label: '10 un', preco: 349.90 },
        ] },
    ],
  },
};
