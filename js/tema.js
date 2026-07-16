/* ============ Print House — página de tema / coleção ============
   Mostra os produtos de um segmento/evento (ou de uma coleção como
   "mais vendidos"). Sem produtos, exibe "Em breve, mais conteúdos". */

const paramsTema = new URLSearchParams(window.location.search);
const slugColecao = paramsTema.get('colecao');

let titulo;
let banner;
let voltarTexto;
let voltarHref;
let breadcrumb;
let produtosNomes = null;
let filtro = null;

if (slugColecao && typeof COLECOES !== 'undefined' && COLECOES[slugColecao]) {
  const c = COLECOES[slugColecao];
  titulo = c.titulo;
  banner = c.banner;
  breadcrumb = c.titulo;
  voltarTexto = 'Início';
  voltarHref = 'index.html';
  filtro = c.filtro || null;
  produtosNomes = c.produtos || null;
} else {
  const tipoInd = TEMAS[paramsTema.get('tipo')] ? paramsTema.get('tipo') : 'segmento';
  const dados = TEMAS[tipoInd];
  const item = dados.lista.find((t) => t.slug === paramsTema.get('id')) || dados.lista[0];
  titulo = item.nome;
  banner = dados.banner;
  breadcrumb = item.nome;
  voltarTexto = dados.titulo;
  voltarHref = `temas.html?tipo=${tipoInd}`;
  produtosNomes = item.produtos || null;
}

document.title = `${titulo} | Print House`;
document.getElementById('temaHero').style.background = banner;
document.getElementById('temaBreadcrumb').textContent = breadcrumb;
document.getElementById('temaTitulo').textContent = titulo;
const voltar = document.getElementById('temaVoltar');
voltar.textContent = voltarTexto;
voltar.href = voltarHref;

// monta a lista de produtos (por nomes ou por filtro sobre o catálogo)
let cardsHTML = '';
if (filtro) {
  const nomes = [];
  Object.values(CATALOGO).forEach((cat) => cat.produtos.forEach((p) => {
    if (filtro(p) && !nomes.includes(p.nome)) nomes.push(p.nome);
  }));
  cardsHTML = cardsPorNomes(nomes);
} else if (produtosNomes && produtosNomes.length) {
  cardsHTML = cardsPorNomes(produtosNomes);
}

const conteudo = document.getElementById('temaConteudo');
if (cardsHTML) {
  conteudo.innerHTML = `<div class="products">${cardsHTML}</div>`;
} else {
  conteudo.className = 'container em-breve';
  conteudo.innerHTML = `
    <div class="em-breve__card">
      <div class="em-breve__icone">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      </div>
      <h2>Em breve, mais conteúdos</h2>
      <p>Estamos preparando materiais especiais para <strong>${titulo}</strong>. Enquanto isso, fale com a gente ou confira nossos produtos.</p>
      <div class="em-breve__acoes">
        <a href="index.html#produtos" class="btn btn--primary">Ver produtos</a>
        <a href="${WHATSAPP_GRAFICA}" target="_blank" rel="noopener" class="btn btn--claro">Falar no WhatsApp</a>
      </div>
    </div>`;
}
