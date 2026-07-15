/* ============ Print House — catálogo de produtos ============
   Edite aqui suas categorias, produtos e variações (opção + preço). */

/* Versão do catálogo: aumente em 1 sempre que alterar este arquivo.
   Edições salvas pelo painel admin em versões antigas são descartadas
   automaticamente, para que as novidades daqui sempre apareçam. */
const CATALOGO_VERSAO = 14;

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

const camisetaDryMasc = {
  bg: 'linear-gradient(135deg,#e0f2fe,#0369a1)', badge: 'Novo',
  nome: 'Camiseta Dry Fit Masculina',
  spec: 'Dry Fit · poliéster (rústico, sem elasticidade) · estampa personalizada · do P ao XL4',
  prazo: 10,
  paginaProduto: true,
  medidas: 'img/camiseta-medidas.png',
  descricao: 'Camiseta Dry Fit em poliéster, com toque rústico e sem elasticidade — ideal para esportes, corridas, times, eventos e uso no dia a dia. Estampa personalizada com a sua arte. Disponível do tamanho P ao XL4.',
  detalhes: ['Material: poliéster, tecido rústico e sem elasticidade. Modelagem do P ao XL4 (medidas podem variar 2 cm para mais ou para menos).'],
  grupoLabel: 'Tamanho', opcaoLabel: 'Quantidade',
  tamanhos: {
          'P': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'M': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'G': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'GG': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL1': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL2': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL3': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL4': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
  },
};

const camisetaDryFem = {
  bg: 'linear-gradient(135deg,#e0f2fe,#0369a1)', badge: 'Novo',
  nome: 'Camiseta Dry Fit Feminina',
  spec: 'Dry Fit · poliéster (rústico, sem elasticidade) · estampa personalizada · do P ao XL4',
  prazo: 10,
  paginaProduto: true,
  medidas: 'img/camiseta-medidas.png',
  descricao: 'Camiseta Dry Fit em poliéster, com toque rústico e sem elasticidade — ideal para esportes, corridas, times, eventos e uso no dia a dia. Estampa personalizada com a sua arte. Disponível do tamanho P ao XL4.',
  detalhes: ['Material: poliéster, tecido rústico e sem elasticidade. Modelagem do P ao XL4 (medidas podem variar 2 cm para mais ou para menos).'],
  grupoLabel: 'Tamanho', opcaoLabel: 'Quantidade',
  tamanhos: {
          'P': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'M': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'G': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'GG': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL1': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL2': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL3': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
          'XL4': [
            { label: '1 un', preco: 75.90 },
            { label: '5 un', preco: 299.90 },
            { label: '10 un', preco: 575.90 },
            { label: '20 un', preco: 1120.90 },
          ],
  },
};

const jaquetaMisty = {
  bg: 'linear-gradient(135deg,#e2e8f0,#334155)', badge: 'Novo',
  nome: 'Jaqueta Corta Vento Misty',
  spec: 'Tactel (92% poliéster · 8% elastano) · unissex · capuz e zíper 80 cm · do P ao XL4 · a partir de 1 un',
  paginaProduto: true,
  medidas: 'img/jaqueta-medidas.png',
  descricao: 'Buscando uma jaqueta para meia estação, que possa ser usada na academia, no pilates, no futebol de domingo ou em outros momentos do seu dia a dia? Você acabou de encontrar! Desenvolvida em tecido tactel (92% poliéster e 8% elastano) não respirável, a Jaqueta Corta Vento Misty da Print House é a opção perfeita para quem procura um casaco que proteja contra o vento e mantenha o corpo aquecido.',
  detalhes: ['A jaqueta leve corta vento tem zíper dentado jacaré de 80 cm e capuz, além de bolso frontal com forro, 8 recortes na frente, recorte em V nas costas e 3 recortes por manga. A costura é feita em máquina overloque, reta e à mão, garantindo um acabamento limpo, resistente e uniforme.', 'Uma jaqueta urbana corta vento da linha Premium, funcional para andar de moto, sair cedo pra academia ou fazer um cooper. Ideal para as mais variadas atividades físicas e do dia a dia, a Jaqueta Corta Vento Misty da Print House pode ser adquirida a partir de 1 unidade, do tamanho P ao XL4 — esse é o nosso grande diferencial. Fale com um dos nossos especialistas e faça seu orçamento!'],
  faq: [
          { p: 'A jaqueta é impermeável?', r: 'A jaqueta corta vento da Print House é feita em tactel (92% poliéster e 8% elastano), o que faz com que ela seque rápido e seja altamente resistente à água. Contudo, não é considerada totalmente impermeável.' },
          { p: 'Dá para usar o corta vento em dias frios?', r: 'Sim. É uma excelente opção para dias frios, sobretudo com vento, já que sua função é bloquear a brisa fria e evitar a perda de calor corporal.' },
          { p: 'O corta vento é indicado para corrida ou caminhada?', r: 'Sim, é super indicado para corrida ou caminhada, especialmente em dias ventosos ou frescos.' },
          { p: 'O tecido é respirável?', r: 'Não. A Jaqueta Misty não é respirável, devido à sua composição (92% poliéster e 8% elastano).' },
          { p: 'A modelagem é padrão ou slim?', r: 'A Jaqueta Corta Vento Misty tem modelagem padrão.' },
          { p: 'Como lavar a jaqueta?', r: 'Lave à mão ou no ciclo delicado com água fria e sabão líquido neutro. Feche os zíperes e vire do avesso, evitando amaciantes, alvejantes e secadora para preservar o tecido.' },
          { p: 'A jaqueta amassa fácil?', r: 'Não. O tactel é um material sintético conhecido pela praticidade e não amassa fácil.' },
          { p: 'Qual a diferença entre corta vento e jaqueta térmica?', r: 'O corta vento bloqueia o vento e é leve; a jaqueta térmica foca em reter o calor corporal para temperaturas baixas, sendo mais pesada e isolante.' },
          { p: 'A Misty é boa para viagens?', r: 'Sim. É leve, compacta e versátil, ideal para climas instáveis, atividades ao ar livre ou para usar sobre outras camadas em dias frios.' },
  ],
  grupoLabel: 'Tamanho', opcaoLabel: 'Quantidade',
  tamanhos: {
          'P': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'M': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'G': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'GG': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'XL1': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'XL2': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'XL3': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
          'XL4': [
            { label: '1 un', preco: 162.90 },
            { label: '5 un', preco: 799.90 },
            { label: '10 un', preco: 1584.90 },
            { label: '20 un', preco: 3136.90 },
            { label: '30 un', preco: 4659.90 },
            { label: '40 un', preco: 6150.90 },
            { label: '50 un', preco: 7611.90 },
            { label: '100 un', preco: 15067.90 },
          ],
  },
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
      { bg: 'linear-gradient(135deg,#bbf7d0,#22c55e)', badge: 'Novo', destaque: true,
        nome: 'Adesivos Personalizados',
        spec: 'Redondos e quadrados · impressão colorida em alta qualidade · corte especial · escolha o tamanho e a quantidade',
        grupoLabel: 'Tamanho', opcaoLabel: 'Quantidade',
        tamanhos: {
          '2×2 cm': [
            { label: '50 un', preco: 40.00 },
            { label: '100 un', preco: 45.00 },
            { label: '250 un', preco: 50.00 },
            { label: '500 un', preco: 58.00 },
            { label: '1.000 un', preco: 100.00 },
          ],
          '3×3 cm': [
            { label: '50 un', preco: 40.00 },
            { label: '100 un', preco: 45.00 },
            { label: '250 un', preco: 120.00 },
            { label: '500 un', preco: 160.00 },
            { label: '1.000 un', preco: 166.00 },
          ],
          '4×4 cm': [
            { label: '50 un', preco: 40.00 },
            { label: '100 un', preco: 58.00 },
            { label: '250 un', preco: 133.00 },
            { label: '500 un', preco: 150.00 },
            { label: '1.000 un', preco: 180.00 },
          ],
          '5×5 cm': [
            { label: '50 un', preco: 55.00 },
            { label: '100 un', preco: 60.00 },
            { label: '250 un', preco: 120.00 },
            { label: '500 un', preco: 130.00 },
            { label: '1.000 un', preco: 230.00 },
          ],
          '6×6 cm': [
            { label: '50 un', preco: 60.00 },
            { label: '100 un', preco: 65.00 },
            { label: '250 un', preco: 117.00 },
            { label: '500 un', preco: 170.00 },
            { label: '1.000 un', preco: 285.00 },
          ],
          '7×7 cm': [
            { label: '50 un', preco: 62.00 },
            { label: '100 un', preco: 68.00 },
            { label: '250 un', preco: 120.00 },
            { label: '500 un', preco: 230.00 },
            { label: '1.000 un', preco: 390.00 },
          ],
          '8×8 cm': [
            { label: '50 un', preco: 60.00 },
            { label: '100 un', preco: 80.00 },
            { label: '250 un', preco: 178.00 },
            { label: '500 un', preco: 280.00 },
            { label: '1.000 un', preco: 520.00 },
          ],
          '9×9 cm': [
            { label: '50 un', preco: 65.00 },
            { label: '100 un', preco: 98.00 },
            { label: '250 un', preco: 110.00 },
            { label: '500 un', preco: 340.00 },
            { label: '1.000 un', preco: 620.00 },
          ],
          '10×10 cm': [
            { label: '50 un', preco: 60.00 },
            { label: '100 un', preco: 115.00 },
            { label: '250 un', preco: 220.00 },
            { label: '500 un', preco: 365.00 },
            { label: '1.000 un', preco: 910.00 },
          ],
        } },
    ],
  },

  'brindes': {
    nome: 'Brindes',
    emoji: '🎁',
    banner: 'linear-gradient(120deg,#be185d,#ec4899)',
    descricao: 'Brindes personalizados que mantêm sua marca na memória (e na mão) dos clientes.',
    produtos: [
      copoCuia,
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
      jaquetaMisty,
      camisetaDryMasc,
      camisetaDryFem,
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
