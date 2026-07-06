/* ============ GrafiPrint — página de categoria ============ */

const parametros = new URLSearchParams(window.location.search);
const slugAtual = parametros.get('cat');
const categoria = CATALOGO[slugAtual] || CATALOGO['cartoes-de-visita'];
const slug = CATALOGO[slugAtual] ? slugAtual : 'cartoes-de-visita';

/* Cabeçalho da categoria */
document.title = `${categoria.nome} | GrafiPrint`;
document.getElementById('catHero').style.background = categoria.banner;
document.getElementById('catBreadcrumb').textContent = categoria.nome;
document.getElementById('catTitulo').textContent = `${categoria.emoji} ${categoria.nome}`;
document.getElementById('catDescricao').textContent = categoria.descricao;
document.getElementById('catSubtitulo').textContent =
  `${categoria.produtos.length} produto${categoria.produtos.length > 1 ? 's' : ''} em ${categoria.nome}`;

/* Produtos da categoria */
document.getElementById('catProdutos').innerHTML =
  categoria.produtos.map((p) => cardProduto(p, slug)).join('');

/* Outras categorias (todas menos a atual) */
document.getElementById('outrasCategorias').innerHTML =
  Object.entries(CATALOGO)
    .filter(([s]) => s !== slug)
    .map(([s, cat]) => `
      <a class="category-card" href="categoria.html?cat=${s}">
        <div class="category-card__icon">${cat.emoji}</div>
        <div class="category-card__name">${cat.nome}</div>
      </a>`).join('');
