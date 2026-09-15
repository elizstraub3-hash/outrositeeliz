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
  'casamento': ['Convite Digital Interativo', 'Carta Elaborada em Papéis Premium'],
  'brindes-e-kit-boas-vindas': ['Kit Básico Plus – 4 Itens', 'Kit Luxo – 4 Itens', 'Kit All Black – 3 Itens', 'Caneta Personalizada', 'Caneta de Metal Touch', 'Chaveiro Acrílico', 'Copo Térmico Inox 500ml', 'Garrafa de Inox 750ml Opus', 'Squeeze Fosca 600ml', 'Ecobag Personalizada', 'Cordão Personalizado', 'Caderninho 7x10 cm'],
  'dia-dos-pais': ['Kit Churrasco', 'Jaqueta Corta Vento Misty'],
  'educacao': ['Kit All Black – 3 Itens', 'Kit Básico Plus – 4 Itens'],
  'aniversario-infantil': ['Convite Digital Interativo', 'Topo de Bolo Personalizado', 'Forminhas para Doces (100 un)', 'Caixinha Milk Personalizada'],
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
