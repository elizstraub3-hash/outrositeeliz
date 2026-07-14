/* ============ Print House — catálogo de produtos ============
   Edite aqui suas categorias, produtos e variações (opção + preço). */

/* Versão do catálogo: aumente em 1 sempre que alterar este arquivo.
   Edições salvas pelo painel admin em versões antigas são descartadas
   automaticamente, para que as novidades daqui sempre apareçam. */
const CATALOGO_VERSAO = 9;

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

const kitChurrasco = {
  bg: 'linear-gradient(135deg,#fca5a5,#7f1d1d)', badge: 'Novo',
  imagem: 'img/kit-churrasco.png',
  nome: 'Kit Churrasco',
  spec: 'Estojo nylon + talheres aço inox · gravação a laser + DTF rígido',
  variacoes: [
    { label: '1 kit', preco: 95.90 },
    { label: '5 kits (Promoção)', preco: 335.00 },
  ],
};

const camisetaDtf = {
  bg: 'linear-gradient(135deg,#ddd6fe,#8b5cf6)', badge: 'Novo',
  nome: 'Camiseta DTF UV', spec: 'Algodão premium · cores vibrantes',
  variacoes: [
    { label: '10 un', preco: 349.90 },
    { label: '25 un', preco: 824.90 },
    { label: '50 un', preco: 1549.90 },
  ],
};

const ecobagPersonalizada = {
  bg: 'linear-gradient(135deg,#d9f99d,#4d7c0f)', badge: 'Novo',
  imagem: 'img/ecobag-personalizada.png',
  nome: 'Ecobag Personalizada',
  spec: 'Tecido microfibra · colorido só frente · 30x30 cm · com ou sem velcro',
  variacoes: [
    { label: '5 un · sem Velcro', preco: 97.90 },
    { label: '5 un · com Velcro Total', preco: 132.90 },
    { label: '10 un · sem Velcro', preco: 179.90 },
    { label: '10 un · com Velcro Total', preco: 215.90 },
    { label: '25 un · sem Velcro', preco: 412.90 },
    { label: '25 un · com Velcro Total', preco: 447.90 },
    { label: '50 un · sem Velcro', preco: 749.90 },
    { label: '50 un · com Velcro Total', preco: 785.90 },
    { label: '100 un · sem Velcro', preco: 1424.90 },
    { label: '100 un · com Velcro Total', preco: 1460.90 },
  ],
};

const toalhaBanho = {
  bg: 'linear-gradient(135deg,#bae6fd,#0284c7)', badge: 'Novo',
  imagem: 'img/toalha-banho.png',
  nome: 'Toalha de Banho Personalizada',
  spec: 'Atoalhado poliéster · colorido só frente',
  variacoes: [
    { label: '1 un', preco: 52.90 },
    { label: '5 un', preco: 254.90 },
    { label: '10 un', preco: 494.90 },
    { label: '25 un', preco: 1219.90 },
    { label: '50 un', preco: 2419.90 },
    { label: '100 un', preco: 4838.90 },
    { label: '200 un', preco: 9600.90 },
    { label: '500 un', preco: 23775.90 },
    { label: '1.000 un', preco: 47250.90 },
  ],
};

const toalhaRosto = {
  bg: 'linear-gradient(135deg,#a5f3fc,#0891b2)', badge: 'Novo',
  nome: 'Toalha de Rosto Personalizada',
  spec: 'Atoalhado poliéster 290g · colorido só frente · 40x65 cm',
  variacoes: [
    { label: '1 un', preco: 29.90 },
    { label: '5 un', preco: 134.90 },
    { label: '10 un', preco: 239.90 },
    { label: '25 un', preco: 524.90 },
    { label: '50 un', preco: 899.90 },
    { label: '100 un', preco: 1785.90 },
    { label: '200 un', preco: 3510.90 },
    { label: '500 un', preco: 8625.90 },
    { label: '1.000 un', preco: 17100.90 },
  ],
};

const bolsaHaste = {
  bg: 'linear-gradient(135deg,#fde68a,#d97706)', badge: 'Novo',
  imagem: 'img/bandeira.png',
  nome: 'Bolsa para Haste (Bandeira)',
  spec: 'Tecido gabardine · colorido só frente · sem verniz · 70x100 cm',
  variacoes: [
    { label: '1 un', preco: 89.90 },
  ],
};

const cordaoPersonalizado = {
  bg: 'linear-gradient(135deg,#fbcfe8,#9d174d)', badge: 'Novo',
  imagem: 'img/cordao.png',
  nome: 'Cordão Personalizado',
  spec: 'Poliéster acetinado 20mm · colorido frente e verso · sem verniz · 39x2 cm · escolha o acabamento',
  variacoes: [
    { label: '10 un · Argola com Jacaré', preco: 174.90 },
    { label: '10 un · Mosquetão', preco: 198.90 },
    { label: '10 un · Argola com Jacaré Duplo', preco: 204.90 },
    { label: '10 un · Mosquetão Duplo', preco: 222.90 },
  ],
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
    descricao: 'Cause uma ótima primeira impressão com cartões de alta qualidade.',
    produtos: [
      { bg: 'linear-gradient(135deg,#fef08a,#ca8a04)', badge: 'Novo', prazo: 3, destaque: true,
        imagem: 'img/cartao-visita.png',
        nome: 'Cartão de Visita Couchê 250g',
        spec: 'Couchê 250g · UV total frente · 8,8x4,8 cm · escolha a cor e a quantidade',
        grupoLabel: 'Cor', opcaoLabel: 'Quantidade',
        tamanhos: {
          'Colorido só frente': [
            { label: '500 un', preco: 70.90 },
            { label: '1.000 un', preco: 99.90 },
            { label: '3.000 un', preco: 286.90 },
            { label: '5.000 un', preco: 459.90 },
            { label: '10.000 un', preco: 909.90 },
          ],
          'Colorido frente e verso': [
            { label: '500 un', preco: 100.90 },
            { label: '1.000 un', preco: 114.90 },
            { label: '3.000 un', preco: 336.90 },
            { label: '5.000 un', preco: 546.90 },
            { label: '10.000 un', preco: 1090.90 },
          ],
          'Frente colorida + verso P&B': [
            { label: '500 un', preco: 75.90 },
            { label: '1.000 un', preco: 106.90 },
            { label: '3.000 un', preco: 304.90 },
            { label: '5.000 un', preco: 478.90 },
            { label: '10.000 un', preco: 955.90 },
          ],
        } },
      { bg: 'linear-gradient(135deg,#fbcfe8,#be185d)', badge: 'Novo',
        imagem: 'img/postal.png',
        nome: 'Postal Couchê 250g',
        spec: 'Couchê 250g · UV total frente · 8,8x9,94 cm · escolha a cor e a quantidade',
        grupoLabel: 'Cor', opcaoLabel: 'Quantidade',
        tamanhos: {
          'Colorido só frente': [
            { label: '100 un', preco: 76.90 },
            { label: '250 un', preco: 84.90 },
            { label: '500 un', preco: 106.90 },
            { label: '1.000 un', preco: 181.90 },
          ],
          'Colorido frente e verso': [
            { label: '100 un', preco: 90.90 },
            { label: '250 un', preco: 96.90 },
            { label: '500 un', preco: 133.90 },
            { label: '1.000 un', preco: 217.90 },
          ],
        } },
      { bg: 'linear-gradient(135deg,#ddd6fe,#6d28d9)', badge: 'Novo',
        imagem: 'img/solapa.png',
        nome: 'Solapa para Embalagem',
        spec: 'Cabeçalho de embalagem (solapa) · colorido só frente · escolha o tamanho e a quantidade',
        tamanhos: {
          'Tamanho padrão': [
            { label: '50 un', preco: 44.90 },
            { label: '100 un', preco: 82.90 },
            { label: '250 un', preco: 187.90 },
            { label: '500 un', preco: 243.90 },
            { label: '1.000 un', preco: 294.90 },
            { label: '3.000 un', preco: 822.90 },
            { label: '5.000 un', preco: 1258.90 },
          ],
          '17,9 x 9,94 cm': [
            { label: '50 un', preco: 82.90 },
            { label: '100 un', preco: 157.90 },
            { label: '250 un', preco: 367.90 },
            { label: '500 un', preco: 484.90 },
            { label: '1.000 un', preco: 588.90 },
            { label: '3.000 un', preco: 1621.90 },
            { label: '5.000 un', preco: 2511.90 },
          ],
          '18 x 20 cm': [
            { label: '50 un', preco: 159.90 },
            { label: '100 un', preco: 298.90 },
            { label: '250 un', preco: 698.90 },
            { label: '500 un', preco: 931.90 },
            { label: '1.000 un', preco: 1137.90 },
          ],
        } },
    ],
  },

  'panfletos': {
    nome: 'Panfletos',
    emoji: '📄',
    banner: 'linear-gradient(120deg,#1e40af,#3b82f6)',
    descricao: 'Flyers em couchê 80g para divulgar promoções e serviços — escolha o tamanho, a cor e a quantidade.',
    produtos: [
      { bg: 'linear-gradient(135deg,#bfdbfe,#2563eb)', badge: 'Novo', destaque: true,
        imagem: 'img/flyer.png',
        nome: 'Flyer Couchê 80g',
        spec: 'Couchê 80g · sem verniz · escolha o tamanho, a cor e a quantidade',
        /* Produto com tamanhos: o cliente escolhe o tamanho e a opção em dropdowns */
        tamanhos: {
          '7x10 cm': [
            { label: '2.000 un · Colorido frente e verso', preco: 237.90 },
            { label: '5.000 un · Colorido frente e verso', preco: 358.90 },
            { label: '10.000 un · Colorido frente e verso', preco: 493.90 },
            { label: '2.500 un · Colorido só frente', preco: 1559.90 },
            { label: '5.000 un · Colorido só frente', preco: 2850.90 },
            { label: '10.000 un · Colorido só frente', preco: 5553.90 },
          ],
          '14x10 cm': [
            { label: '1.000 un · Colorido só frente', preco: 139.90 },
            { label: '2.500 un · Colorido só frente', preco: 283.90 },
            { label: '5.000 un · Colorido só frente', preco: 382.90 },
            { label: '10.000 un · Colorido só frente', preco: 712.90 },
            { label: '2.500 un · Colorido frente e verso', preco: 310.90 },
            { label: '5.000 un · Colorido frente e verso', preco: 561.90 },
            { label: '10.000 un · Colorido frente e verso', preco: 1062.90 },
          ],
          '14x20 cm': [
            { label: '1.000 un · Colorido só frente', preco: 270.90 },
            { label: '2.500 un · Colorido só frente', preco: 492.90 },
            { label: '5.000 un · Colorido só frente', preco: 745.90 },
            { label: '10.000 un · Colorido só frente', preco: 1474.90 },
            { label: '1.000 un · Colorido frente e verso', preco: 330.90 },
            { label: '2.500 un · Colorido frente e verso', preco: 592.90 },
            { label: '5.000 un · Colorido frente e verso', preco: 874.90 },
            { label: '10.000 un · Colorido frente e verso', preco: 1698.90 },
          ],
          '15x10 cm': [
            { label: '1.000 un · Colorido só frente', preco: 148.90 },
            { label: '2.500 un · Colorido só frente', preco: 337.90 },
            { label: '5.000 un · Colorido só frente', preco: 519.90 },
            { label: '10.000 un · Colorido só frente', preco: 961.90 },
            { label: '1.000 un · Colorido frente e verso', preco: 183.90 },
            { label: '2.500 un · Colorido frente e verso', preco: 349.90 },
            { label: '5.000 un · Colorido frente e verso', preco: 571.90 },
            { label: '10.000 un · Colorido frente e verso', preco: 1081.90 },
          ],
          '15x21 cm': [
            { label: '1.000 un · Colorido só frente', preco: 277.90 },
            { label: '2.500 un · Colorido só frente', preco: 501.90 },
            { label: '5.000 un · Colorido só frente', preco: 781.90 },
            { label: '10.000 un · Colorido só frente', preco: 1534.90 },
            { label: '1.000 un · Colorido frente e verso', preco: 339.90 },
            { label: '2.500 un · Colorido frente e verso', preco: 601.90 },
            { label: '5.000 un · Colorido frente e verso', preco: 897.90 },
            { label: '10.000 un · Colorido frente e verso', preco: 1756.90 },
          ],
        } },
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
        nome: 'Adesivo Redondo 5cm', spec: 'Vinil brilho · colorido só frente',
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
      { bg: 'linear-gradient(135deg,#bbf7d0,#15803d)', badge: 'Novo',
        nome: 'Kit Etiquetas Escolares',
        spec: 'Adesivo vinil 90g · colorido só frente · UV total · 28x40 cm',
        variacoes: [
          { label: '1 un', preco: 31.90 },
          { label: '2 un', preco: 57.90 },
          { label: '5 un', preco: 127.90 },
          { label: '10 un', preco: 246.90 },
          { label: '50 un', preco: 1068.90 },
          { label: '100 un', preco: 2089.90 },
          { label: '250 un', preco: 5154.90 },
          { label: '500 un', preco: 10104.90 },
          { label: '1.000 un', preco: 18879.90 },
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
        imagem: 'img/banner-lona.png',
        nome: 'Banner Lona Brilho 440g',
        spec: 'Lona brilho 440g · colorido só frente · já com bastão e corda · escolha o formato',
        variacoes: [
          { label: '0,45 x 0,65 m', preco: 23.90 },
          { label: '0,62 x 0,80 m', preco: 26.90 },
          { label: '0,52 x 0,90 m', preco: 30.90 },
          { label: '0,79 x 1,20 m', preco: 56.90 },
          { label: '0,90 x 1,20 m', preco: 65.90 },
          { label: '1,05 x 1,20 m', preco: 75.90 },
          { label: '1,05 x 1,50 m', preco: 90.90 },
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
      { bg: 'linear-gradient(135deg,#a7f3d0,#059669)', badge: 'Novo',
        nome: 'Display Pix em Acrílico',
        spec: 'Acrílico cristal 2mm · colorido só frente · UV direta · 15x10 cm horizontal · arte única',
        variacoes: [
          { label: '1 un', preco: 39.90 },
        ] },
      { bg: 'linear-gradient(135deg,#fde68a,#b45309)', badge: 'Novo',
        nome: 'Cubo de Papel',
        spec: 'Couchê 300g · colorido só frente · UV total · 8x8 cm',
        variacoes: [
          { label: '50 un', preco: 867.90 },
          { label: '100 un', preco: 1288.90 },
          { label: '250 un', preco: 1786.90 },
          { label: '500 un', preco: 2049.90 },
          { label: '1.000 un', preco: 2773.90 },
        ] },
      { bg: 'linear-gradient(135deg,#c7d2fe,#4338ca)', badge: 'Novo',
        nome: 'Display de Retrovisor',
        spec: 'Couchê 300g · colorido só frente · UV total frente e verso · 8,5x19,88 cm',
        variacoes: [
          { label: '10 un', preco: 68.90 },
          { label: '25 un', preco: 157.90 },
          { label: '50 un', preco: 208.90 },
          { label: '100 un', preco: 382.90 },
          { label: '250 un', preco: 417.90 },
          { label: '500 un', preco: 457.90 },
          { label: '1.000 un', preco: 622.90 },
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
      kitChurrasco,
      { emoji: '🖋️', bg: 'linear-gradient(135deg,#cbd5e1,#475569)', badge: 'Novo',
        nome: 'Caneta de Metal Touch', spec: 'Metal · ponta touch · gravação a laser 4x0 (0,6x5 cm)',
        variacoes: [
          { label: '1 un', preco: 10.90 },
          { label: 'Combo 10 un', preco: 98.90 },
        ] },
      { emoji: '✒️', bg: 'linear-gradient(135deg,#e2e8f0,#64748b)', badge: 'Novo',
        nome: 'Caneta de Metal Slim Touch', spec: 'Metal slim · ponta touch · gravação a laser 4x0 (4x0,4 cm)',
        variacoes: [
          { label: '1 un', preco: 10.90 },
          { label: 'Combo 10 un', preco: 90.90 },
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

  'dtf': {
    nome: 'DTF',
    emoji: '👕',
    banner: 'linear-gradient(120deg,#6d28d9,#c026d3)',
    descricao: 'Estampas em DTF e DTF rígido com cores vibrantes, em tecidos e superfícies rígidas.',
    produtos: [
      kitChurrasco,
      copoCuia,
      camisetaDtf,
    ],
  },

  'textil': {
    nome: 'Linha Têxtil',
    emoji: '👕',
    banner: 'linear-gradient(120deg,#9d174d,#ec4899)',
    descricao: 'Ecobags, cordões, camisetas e outros itens em tecido personalizados.',
    produtos: [
      ecobagPersonalizada,
      cordaoPersonalizado,
      toalhaBanho,
      toalhaRosto,
      bolsaHaste,
      camisetaDtf,
    ],
  },

  'lancamentos': {
    nome: 'Lançamentos',
    emoji: '🔥',
    banner: 'linear-gradient(120deg,#7c3aed,#a78bfa)',
    descricao: 'As novidades que acabaram de chegar na Print House.',
    produtos: [
      camisetaDtf,
      kitChurrasco,
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

/* Sobrescreve o catálogo com as edições feitas no painel administrativo
   (admin.html) — apenas se forem da versão atual do catálogo. Edições de
   versões antigas são descartadas para não esconder produtos novos. */
try {
  const catalogoEditado = localStorage.getItem('printhouse_catalogo');
  if (catalogoEditado) {
    const dados = JSON.parse(catalogoEditado);
    if (dados && dados.versao === CATALOGO_VERSAO && dados.catalogo && typeof dados.catalogo === 'object') {
      Object.keys(CATALOGO).forEach((k) => delete CATALOGO[k]);
      Object.assign(CATALOGO, dados.catalogo);
    } else {
      localStorage.removeItem('printhouse_catalogo');
    }
  }
} catch (e) { /* mantém o catálogo padrão */ }
