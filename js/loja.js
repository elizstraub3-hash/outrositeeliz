/* ============ GrafiPrint — lógica compartilhada (home + páginas de categoria) ============ */

/* ---------- Formatação de preço ---------- */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ---------- Card de produto com seletor de variações ---------- */
function cardProduto(p, slugCategoria) {
  const opcoes = p.variacoes.map((v, i) =>
    `<option value="${v.preco}" data-label="${v.label}" ${i === 0 ? 'selected' : ''}>${v.label} — R$ ${formatarPreco(v.preco)}</option>`
  ).join('');
  const v0 = p.variacoes[0];
  return `
    <article class="product-card">
      <a class="product-card__img" style="background:${p.bg}" href="categoria.html?cat=${slugCategoria}" title="Ver categoria ${CATALOGO[slugCategoria].nome}">
        ${p.badge ? `<span class="product-card__badge ${p.badge === 'Novo' ? 'product-card__badge--new' : ''}">${p.badge}</span>` : ''}
        ${p.emoji}
      </a>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.nome}</h3>
        <p class="product-card__spec">${p.spec}</p>
        <p class="product-card__rating">★★★★★ ${p.nota} <span>(${p.avaliacoes.toLocaleString('pt-BR')} avaliações)</span></p>
        <label class="product-card__var-label">Escolha uma opção:</label>
        <select class="product-card__select" aria-label="Variações de ${p.nome}">${opcoes}</select>
        <div class="product-card__price">
          <small>${v0.label} por</small>
          <strong>R$ ${formatarPreco(v0.preco)}</strong>
        </div>
        <div class="product-card__prazo">
          <span>⏱️ Previsão de produção: até 5 dias úteis</span>
          <small>* Prazo informado refere-se apenas à produção. O tempo de entrega será adicionado após a finalização.</small>
        </div>
        <button class="product-card__btn">Comprar</button>
      </div>
    </article>`;
}

/* ---------- Troca de variação atualiza o preço do card ---------- */
document.addEventListener('change', (e) => {
  const select = e.target.closest('.product-card__select');
  if (!select) return;
  const opcao = select.selectedOptions[0];
  const price = select.closest('.product-card').querySelector('.product-card__price');
  price.querySelector('small').textContent = `${opcao.dataset.label} por`;
  price.querySelector('strong').textContent = `R$ ${formatarPreco(parseFloat(opcao.value))}`;
});

/* ---------- Carrinho (contador persiste entre as páginas) ---------- */
let itensCarrinho = parseInt(localStorage.getItem('grafiprint_carrinho') || '0', 10);
const cartBadge = document.getElementById('cartCount');
if (cartBadge) cartBadge.textContent = itensCarrinho;

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.product-card__btn');
  if (!btn) return;
  const card = btn.closest('.product-card');
  const nome = card.querySelector('.product-card__title').textContent;
  const opcao = card.querySelector('.product-card__select').selectedOptions[0].dataset.label;
  itensCarrinho++;
  localStorage.setItem('grafiprint_carrinho', itensCarrinho);
  if (cartBadge) cartBadge.textContent = itensCarrinho;
  mostrarToast(`✅ ${nome} (${opcao}) adicionado ao carrinho!`);
});

/* ---------- Cupom ---------- */
function copiarCupom() {
  if (navigator.clipboard) navigator.clipboard.writeText('BEMVINDO10');
  mostrarToast('🎁 Cupom BEMVINDO10 copiado!');
}

/* ---------- Newsletter ---------- */
function assinarNewsletter(e) {
  e.preventDefault();
  mostrarToast('📬 Cadastro realizado! Fique de olho no seu e-mail.');
  e.target.reset();
}

/* ---------- Toast ---------- */
let toastTimer;
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Menu mobile ---------- */
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('open');
  });
}

/* ---------- Dropdown "Todos os Produtos" ---------- */
const dropdown = document.getElementById('dropdownProdutos');
const dropdownToggle = document.getElementById('dropdownToggle');

if (dropdown && dropdownToggle) {
  // Monta os itens do dropdown a partir do catálogo (sem duplicar em lugar nenhum)
  const menu = document.getElementById('dropdownMenu');
  menu.innerHTML = Object.entries(CATALOGO).map(([slug, cat]) =>
    `<li><a href="categoria.html?cat=${slug}" class="dropdown__item ${slug === 'lancamentos' ? 'dropdown__item--new' : ''}">${cat.emoji} ${cat.nome}</a></li>`
  ).join('');

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', aberto);
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) fecharDropdown();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharDropdown();
  });
}

function fecharDropdown() {
  if (!dropdown) return;
  dropdown.classList.remove('open');
  dropdownToggle.setAttribute('aria-expanded', 'false');
}
