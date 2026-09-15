/* ============ Print House — segmentos e eventos ============
   Cada item vira uma página (tema.html?tipo=...&id=slug).
   Para publicar conteúdo, adicione produtos/textos na página do tema. */

function slugTema(texto) {
  return texto.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const SEGMENTOS = [
  'Advocacia',
  'Agência de Viagem',
  'Artesanato e Souvenirs',
  'Automotivo',
  'Beleza e Bem-Estar',
  'Cabeleireiro e Manicure',
  'Educação',
  'Escritórios',
  'Imobiliária',
  'Brindes e Kit Boas-Vindas',
  'Empresas e Treinamento',
  'Hotelaria',
  'Lojas e Varejo',
  'Restaurantes e Delivery',
  'Saúde',
  'Terceiro Setor',
].map((nome) => ({ nome, slug: slugTema(nome) }));

const EVENTOS = [
  'Aniversário Infantil',
  'Ano Novo',
  'Batizado',
  'Black Friday',
  'Carnaval',
  'Campeonato de Futebol 2026',
  'Casamento',
  'Congresso, Feiras e Exposições',
  'Dia da Mulher',
  'Dia das Crianças',
  'Dia das Mães',
  'Dia do Cliente',
  'Dia do Designer',
  'Dia do Professor',
  'Dia dos Namorados',
  'Dia dos Pais',
  'Dia Mundial do Autismo',
  'Eleições',
  'Férias',
  'Festa Junina',
  'Formatura',
  'Halloween',
  'Inauguração e Lançamento',
  'Liquidação Pós-Festas',
  'Meio Ambiente',
  'Natal',
  'Páscoa',
  'Volta às Aulas',
].map((nome) => ({ nome, slug: slugTema(nome) }));

/* Produtos associados a um segmento/evento (por slug). Quem não estiver
   aqui exibe "Em breve, mais conteúdos". Use os nomes exatos dos produtos. */
const PRODUTOS_TEMA = {
  /* ---------- Segmentos ---------- */
  'advocacia': ['Cartão de Visita Couchê 250g', 'Cartão de Visita Dois Cantos Arredondados 300g', 'Caneta de Metal Touch', 'Agenda Diária 2027', 'Apostila Personalizada', 'Impressão de Documentos (por página)'],
  'agencia-de-viagem': ['Flyer Couchê 80g', 'Banner Lona Brilho 440g', 'Cartão de Visita Couchê 250g', 'Ecobag Personalizada', 'Adesivos Personalizados', 'Wind Banner Personalizado'],
  'artesanato-e-souvenirs': ['Adesivos Personalizados', 'Sacola Kraft com Alça', 'Caixa de Presente Personalizada', 'Fita Adesiva Personalizada', 'Chaveiro Acrílico', 'Quadro MDF 3mm 20x30 cm'],
  'automotivo': ['Adesivo Troca de Óleo', 'Adesivos Personalizados', 'Adesivo DTF UV', 'Display de Retrovisor', 'Banner Lona Brilho 440g', 'Camiseta DTF UV'],
  'beleza-e-bem-estar': ['Cartão de Visita Couchê 250g', 'Cartão de Visita Dois Cantos Arredondados 300g', 'Sacola em Papel Silk Premium', 'Adesivos Personalizados', 'Wobbler', 'Display de Mesa'],
  'cabeleireiro-e-manicure': ['Cartão de Visita Couchê 250g', 'Cartão de Visita Dois Cantos Arredondados 300g', 'Sacola em Papel Silk Premium', 'Adesivos Personalizados', 'Display de Mesa', 'Wobbler'],
  'educacao': ['Apostila Personalizada', 'Agenda Diária 2027', 'Caderninho 7x10 cm', 'Cordão Personalizado', 'Camiseta Dry Fit Masculina', 'Kit Básico Plus – 4 Itens', 'Kit All Black – 3 Itens', 'Encadernação'],
  'escritorios': ['Cartão de Visita Couchê 250g', 'Caneta de Metal Touch', 'Agenda Diária 2027', 'Caderninho 7x10 cm', 'Copo Térmico Inox 500ml', 'Impressão de Documentos (por página)'],
  'imobiliaria': ['Cartão de Visita Couchê 250g', 'Flyer Couchê 80g', 'Banner Lona Brilho 440g', 'Wind Banner Personalizado', 'Bandeira', 'Caneta de Metal Touch', 'Chaveiro Acrílico'],
  'brindes-e-kit-boas-vindas': ['Kit Básico Plus – 4 Itens', 'Kit Luxo – 4 Itens', 'Kit All Black – 3 Itens', 'Caneta de Metal Touch', 'Chaveiro Acrílico', 'Copo Térmico Inox 500ml', 'Garrafa de Inox 750ml Opus', 'Squeeze Fosca 600ml', 'Ecobag Personalizada', 'Cordão Personalizado', 'Caderninho 7x10 cm'],
  'empresas-e-treinamento': ['Cordão Personalizado', 'Apostila Personalizada', 'Caderninho 7x10 cm', 'Copo Térmico Inox 500ml', 'Camiseta Dry Fit Masculina', 'Ecobag Personalizada', 'Kit Básico Plus – 4 Itens'],
  'hotelaria': ['Toalha de Banho Personalizada', 'Toalha de Rosto Personalizada', 'Sacola em Papel Silk Premium', 'Cardápio Mini com Wire-o 14,4x14,4 cm', 'Chaveiro Acrílico'],
  'lojas-e-varejo': ['Sacola Kraft com Alça', 'Sacola em Papel Silk Premium', 'Sacola Plástica com Alça Vazada', 'Wobbler', 'Display de Mesa', 'Banner Lona Brilho 440g', 'Fita Adesiva Personalizada', 'Adesivos Personalizados'],
  'restaurantes-e-delivery': ['Cardápio Mini com Wire-o 14,4x14,4 cm', 'Adesivos Personalizados', 'Sacola Kraft com Alça', 'Saco Kraft com Janela', 'Wobbler', 'Display de Mesa', 'Banner Lona Brilho 440g', 'Flyer Couchê 80g'],
  'saude': ['Cartão de Visita Couchê 250g', 'Cartão de Visita Dois Cantos Arredondados 300g', 'Adesivos Personalizados', 'Agenda Diária 2027', 'Impressão de Documentos (por página)'],
  'terceiro-setor': ['Ecobag Personalizada', 'Ecobag Algodão', 'Camiseta DTF UV', 'Cordão Personalizado', 'Banner Lona Brilho 440g', 'Adesivos Personalizados'],

  /* ---------- Eventos ---------- */
  'aniversario-infantil': ['Convite Digital Interativo', 'Topo de Bolo Personalizado', 'Forminhas para Doces (100 un)', 'Caixinha Milk Personalizada', 'Adesivos Personalizados', 'Sacola Kraft com Alça'],
  'ano-novo': ['Taça de Gin Personalizada', 'Copo Cuia com Tampa em Acrílico 360ml', 'Convite Digital Interativo', 'Adesivos Personalizados', 'Caixa de Presente Personalizada'],
  'batizado': ['Convite Digital Interativo', 'Topo de Bolo Personalizado', 'Forminhas para Doces (100 un)', 'Caixinha Milk Personalizada', 'Carta Elaborada em Papéis Premium', 'Caixa de Presente Personalizada'],
  'black-friday': ['Banner Lona Brilho 440g', 'Wind Banner Personalizado', 'Wobbler', 'Display de Mesa', 'Flyer Couchê 80g', 'Adesivos Personalizados'],
  'carnaval': ['Camiseta DTF UV', 'Adesivos Personalizados', 'Copo Cuia com Tampa em Acrílico 360ml', 'Bandeira'],
  'campeonato-de-futebol-2026': ['Camisa Copa Personalizada', 'Camisa Futebol Americano Titan', 'Bandeira', 'Camiseta DTF UV', 'Copo Cuia com Tampa em Acrílico 360ml', 'Adesivos Personalizados'],
  'casamento': ['Convite Digital Interativo', 'Carta Elaborada em Papéis Premium', 'Taça de Gin Personalizada', 'Caixa de Presente Personalizada', 'Topo de Bolo Personalizado', 'Forminhas para Doces (100 un)'],
  'congresso-feiras-e-exposicoes': ['Cordão Personalizado', 'Banner Lona Brilho 440g', 'Wind Banner Personalizado', 'Bandeira', 'Backdrop em Lona Brilho Frontlight 440g', 'Ecobag Personalizada', 'Display de Mesa'],
  'dia-da-mulher': ['Ecobag Personalizada', 'Taça de Gin Personalizada', 'Caixa de Presente Personalizada', 'Quadro MDF 3mm 20x30 cm'],
  'dia-das-criancas': ['Camiseta DTF UV', 'Chinelo Personalizado', 'Adesivos Personalizados', 'Chaveiro Acrílico', 'Caixa de Presente Personalizada'],
  'dia-das-maes': ['Caixa de Presente Personalizada', 'Taça de Gin Personalizada', 'Ecobag Personalizada', 'Toalha de Rosto Personalizada', 'Quadro MDF 3mm 20x30 cm'],
  'dia-do-cliente': ['Caixa de Presente Personalizada', 'Ecobag Personalizada', 'Chaveiro Acrílico', 'Sacola em Papel Silk Premium'],
  'dia-do-professor': ['Caneta de Metal Touch', 'Caixa de Presente Personalizada', 'Quadro MDF 3mm 20x30 cm', 'Agenda Diária 2027', 'Copo Térmico Inox 500ml'],
  'dia-dos-namorados': ['Caixa de Presente Personalizada', 'Taça de Gin Personalizada', 'Quadro MDF 3mm 20x30 cm', 'Convite Digital Interativo', 'Copo Térmico Inox 500ml'],
  'dia-dos-pais': ['Kit Churrasco', 'Jaqueta Corta Vento Misty', 'Caixa de Presente Personalizada', 'Caneta de Metal Touch', 'Copo Térmico Aço Inox'],
  'dia-mundial-do-autismo': ['Camiseta DTF UV', 'Adesivos Personalizados', 'Cordão Personalizado'],
  'festa-junina': ['Bandeira', 'Adesivos Personalizados', 'Copo Cuia com Tampa em Acrílico 360ml', 'Banner Lona Brilho 440g'],
  'formatura': ['Convite Digital Interativo', 'Quadro MDF 3mm 20x30 cm', 'Taça de Gin Personalizada', 'Caixa de Presente Personalizada', 'Cordão Personalizado', 'Camiseta DTF UV'],
  'halloween': ['Adesivo Brilha no Escuro', 'Adesivos Personalizados', 'Camiseta DTF UV'],
  'inauguracao-e-lancamento': ['Banner Lona Brilho 440g', 'Wind Banner Personalizado', 'Flyer Couchê 80g', 'Cartão de Visita Couchê 250g', 'Bandeira', 'Backdrop em Lona Brilho Frontlight 440g', 'Adesivos Personalizados'],
  'meio-ambiente': ['Ecobag Personalizada', 'Ecobag Algodão', 'Sacola Kraft com Alça', 'Squeeze Fosca 600ml', 'Garrafa de Inox 750ml Opus'],
  'natal': ['Caixa de Presente Personalizada', 'Carta Elaborada em Papéis Premium', 'Adesivos Personalizados', 'Quadro MDF 3mm 20x30 cm', 'Taça de Gin Personalizada', 'Sacola em Papel Silk Premium'],
  'pascoa': ['Caixinha Milk Personalizada', 'Forminhas para Doces (100 un)', 'Adesivos Personalizados', 'Caixa de Presente Personalizada', 'Fita Adesiva Personalizada', 'Sacola Kraft com Alça'],
  'volta-as-aulas': ['Caderninho 7x10 cm', 'Agenda Diária 2027', 'Apostila Personalizada', 'Adesivos Personalizados', 'Ecobag Personalizada'],
};

// anexa a lista de produtos ao item do tema correspondente
[...SEGMENTOS, ...EVENTOS].forEach((t) => {
  if (PRODUTOS_TEMA[t.slug]) t.produtos = PRODUTOS_TEMA[t.slug];
});

const TEMAS = {
  segmento: { titulo: 'Segmentos', descricao: 'Soluções de impressão pensadas para o seu ramo de atuação.', banner: 'linear-gradient(120deg,#1e3a5f,#2563eb)', lista: SEGMENTOS },
  evento: { titulo: 'Eventos', descricao: 'Materiais personalizados para cada data e ocasião especial.', banner: 'linear-gradient(120deg,#7c2d12,#ea580c)', lista: EVENTOS },
};

/* Coleções extras (não são categorias): "Ver todos" da home aponta para cá.
   A home mostra os primeiros itens; "Ver todos" abre a lista completa. */
const COLECOES = {
  'mais-vendidos': {
    titulo: 'Os mais vendidos',
    descricao: 'Os produtos que mais saem na Print House.',
    banner: 'linear-gradient(120deg,#b45309,#f59e0b)',
    produtos: [
      'Cartão de Visita Couchê 250g',
      'Flyer Couchê 80g',
      'Adesivos Personalizados',
      'Banner Lona Brilho 440g',
      'Copo Cuia com Tampa em Acrílico 360ml',
      'Kit Churrasco',
      'Camiseta DTF UV',
      'Jaqueta Corta Vento Misty',
      'Caneta de Metal Touch',
      'Ecobag Personalizada',
    ],
  },
};
