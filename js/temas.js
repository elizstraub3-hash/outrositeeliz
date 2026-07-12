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

const TEMAS = {
  segmento: { titulo: 'Segmentos', descricao: 'Soluções de impressão pensadas para o seu ramo de atuação.', banner: 'linear-gradient(120deg,#1e3a5f,#2563eb)', lista: SEGMENTOS },
  evento: { titulo: 'Eventos', descricao: 'Materiais personalizados para cada data e ocasião especial.', banner: 'linear-gradient(120deg,#7c2d12,#ea580c)', lista: EVENTOS },
};
