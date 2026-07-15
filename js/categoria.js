/* ============ Print House — página de categoria ============ */

const parametros = new URLSearchParams(window.location.search);
const slugAtual = parametros.get('cat');
const categoria = CATALOGO[slugAtual] || CATALOGO['cartoes-de-visita'];
const slug = CATALOGO[slugAtual] ? slugAtual : 'cartoes-de-visita';

/* Cabeçalho da categoria */
document.title = `${categoria.nome} | Print House`;
document.getElementById('catHero').style.background = categoria.banner;
document.getElementById('catBreadcrumb').textContent = categoria.nome;
document.getElementById('catTitulo').textContent = categoria.nome;
document.getElementById('catDescricao').textContent = categoria.descricao;
document.getElementById('catSubtitulo').textContent = categoria.produtos.length
  ? `${categoria.produtos.length} produto${categoria.produtos.length > 1 ? 's' : ''} em ${categoria.nome}`
  : categoria.nome;

/* Produtos da categoria (ou aviso quando ainda não há produtos) */
document.getElementById('catProdutos').innerHTML = categoria.produtos.length
  ? categoria.produtos.map((p) => cardProduto(p, slug)).join('')
  : `<div class="em-breve" style="grid-column:1/-1">
       <div class="em-breve__card">
         <div class="em-breve__icone">
           <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
         </div>
         <h2>Em breve, novos produtos</h2>
         <p>Estamos preparando novos itens para <strong>${categoria.nome}</strong>. Volte em breve ou fale com a gente.</p>
         <div class="em-breve__acoes">
           <a href="index.html#produtos" class="btn btn--primary">Ver outros produtos</a>
           <a href="${WHATSAPP_GRAFICA}" target="_blank" rel="noopener" class="btn btn--claro">Falar no WhatsApp</a>
         </div>
       </div>
     </div>`;

/* Outras categorias (todas menos a atual) */
document.getElementById('outrasCategorias').innerHTML =
  Object.entries(CATALOGO)
    .filter(([s]) => s !== slug)
    .map(([s, cat]) => `
      <a class="category-card" href="categoria.html?cat=${s}">
        <div class="category-card__name">${cat.nome}</div>
      </a>`).join('');
