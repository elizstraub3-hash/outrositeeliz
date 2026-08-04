/* ============ Print House — página de busca ============ */

const paramsBusca = new URLSearchParams(window.location.search);
const termoBruto = (paramsBusca.get('q') || '').trim();

function normalizar(texto) {
  return String(texto).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const termo = normalizar(termoBruto);

document.title = termoBruto ? `Busca: ${termoBruto} | Print House` : 'Busca | Print House';
document.getElementById('catHero').style.background = 'linear-gradient(120deg,#0f172a,#334155)';
document.getElementById('catBreadcrumb').textContent = 'Busca';
document.getElementById('catTitulo').textContent = termoBruto ? `Resultados para “${termoBruto}”` : 'Buscar produtos';
document.getElementById('catDescricao').textContent = termoBruto
  ? 'Confira os produtos que combinam com a sua busca.'
  : 'Digite o que você procura na barra de busca acima.';

/* Reúne todos os produtos (sem repetir os que aparecem em várias categorias) */
const resultados = [];
if (termo) {
  const vistos = new Set();
  for (const [slug, cat] of Object.entries(CATALOGO)) {
    for (const p of cat.produtos) {
      if (vistos.has(p)) continue;
      const alvo = normalizar(`${p.nome} ${p.spec || ''} ${cat.nome}`);
      if (alvo.includes(termo)) {
        resultados.push([p, slug]);
        vistos.add(p);
      }
    }
  }
}

document.getElementById('catSubtitulo').textContent = termoBruto
  ? `${resultados.length} resultado${resultados.length === 1 ? '' : 's'} para “${termoBruto}”`
  : 'Faça uma busca';

document.getElementById('catProdutos').innerHTML = resultados.length
  ? resultados.map(([p, slug]) => cardProduto(p, slug)).join('')
  : `<div class="em-breve" style="grid-column:1/-1">
       <div class="em-breve__card">
         <div class="em-breve__icone">
           <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
         </div>
         <h2>Nenhum produto encontrado</h2>
         <p>Não achamos resultados${termoBruto ? ` para <strong>${termoBruto}</strong>` : ''}. Tente outro termo ou fale com a gente que a gente te ajuda.</p>
         <div class="em-breve__acoes">
           <a href="index.html#produtos" class="btn btn--primary">Ver todos os produtos</a>
           <a href="${WHATSAPP_GRAFICA}" target="_blank" rel="noopener" class="btn btn--claro">Falar no WhatsApp</a>
         </div>
       </div>
     </div>`;

/* Todas as categorias em "Veja também" */
document.getElementById('outrasCategorias').innerHTML =
  Object.entries(CATALOGO)
    .map(([s, cat]) => `
      <a class="category-card" href="categoria.html?cat=${s}">
        <div class="category-card__name">${cat.nome}</div>
      </a>`).join('');

/* Preenche a barra de busca com o termo atual */
document.querySelectorAll('.search__input').forEach((i) => { i.value = termoBruto; });
