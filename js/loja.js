/* ============ GrafiPrint — lógica compartilhada (home + páginas de categoria) ============ */

/* ---------- Formatação de preço ---------- */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ---------- Faixas de preço por quantidade ---------- */
function rotuloFaixa(faixas, i) {
  const f = faixas[i];
  const proxima = faixas[i + 1];
  if (proxima) return f.min === proxima.min - 1 ? `${f.min} un` : `${f.min} a ${proxima.min - 1} un`;
  return `${f.min}+ un`;
}

function resumoFaixas(faixas) {
  return faixas.map((f, i) => `${rotuloFaixa(faixas, i)}: R$ ${formatarPreco(f.preco)}/un`).join(' · ');
}

function precoDaFaixa(faixas, qtdTotal) {
  let preco = faixas[0].preco;
  faixas.forEach((f) => { if (qtdTotal >= f.min) preco = f.preco; });
  return preco;
}

function menorPrecoCombinacao(p) {
  return Math.min(...p.opcoesCombinacao.flatMap((o) => o.faixas.map((f) => f.preco)));
}

/* ---------- Card de produto ---------- */
function cardProduto(p, slugCategoria) {
  let areaOpcoes;
  let areaPreco;

  if (p.opcoesCombinacao) {
    // Produto com lista de combinações: o cliente escolhe a quantidade de cada
    areaOpcoes = `
      <label class="product-card__var-label">Combinações disponíveis:</label>
      <ul class="product-card__combs">
        ${p.opcoesCombinacao.map((o) => `<li><strong>${o.nome}</strong> — ${resumoFaixas(o.faixas)}</li>`).join('')}
      </ul>`;
    areaPreco = `
      <div class="product-card__price">
        <small>a partir de</small>
        <strong>R$ ${formatarPreco(menorPrecoCombinacao(p))}</strong>
      </div>`;
  } else {
    const opcoes = p.variacoes.map((v, i) =>
      `<option value="${v.preco}" data-label="${v.label}" ${i === 0 ? 'selected' : ''}>${v.label} — R$ ${formatarPreco(v.preco)}</option>`
    ).join('');
    const v0 = p.variacoes[0];
    areaOpcoes = `
      <label class="product-card__var-label">Escolha uma opção:</label>
      <select class="product-card__select" aria-label="Variações de ${p.nome}">${opcoes}</select>`;
    areaPreco = `
      <div class="product-card__price">
        <small>${v0.label} por</small>
        <strong>R$ ${formatarPreco(v0.preco)}</strong>
      </div>`;
  }

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
        ${areaOpcoes}
        ${areaPreco}
        <div class="product-card__prazo">
          <span>⏱️ Previsão de produção: até 5 dias úteis</span>
          <small>* Prazo informado refere-se apenas à produção. O tempo de entrega será adicionado após a finalização.</small>
        </div>
        <button class="product-card__btn">${p.opcoesCombinacao ? 'Escolher quantidades' : 'Comprar'}</button>
      </div>
    </article>`;
}

/* ---------- Modal de combinações (o cliente monta o pedido) ---------- */
function encontrarProduto(nome) {
  for (const cat of Object.values(CATALOGO)) {
    const p = cat.produtos.find((prod) => prod.nome === nome);
    if (p) return p;
  }
  return null;
}

function abrirCombinacoes(p) {
  const antigo = document.getElementById('modalComb');
  if (antigo) antigo.remove();

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'modalComb';
  modal.innerHTML = `
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Combinações de ${p.nome}">
      <button class="modal__close" aria-label="Fechar">×</button>
      <div class="modal__head">
        <div class="modal__thumb" style="background:${p.bg}">${p.emoji}</div>
        <div>
          <h3>${p.nome}</h3>
          <p>${p.spec}</p>
        </div>
      </div>
      <div class="modal__faixas">
        ${p.opcoesCombinacao.map((o) => `<p><strong>${o.nome}:</strong> ${resumoFaixas(o.faixas)}</p>`).join('')}
        <small>* O preço por unidade considera a quantidade total de copos da combinação.</small>
      </div>
      <div class="modal__rows">
        ${p.opcoesCombinacao.map((o, i) => `
          <div class="comb-row" data-idx="${i}">
            <div class="comb-row__nome">
              <strong>${o.nome}</strong>
              <small class="comb-row__unit">R$ ${formatarPreco(o.faixas[0].preco)}/un</small>
            </div>
            <div class="comb-row__stepper">
              <button type="button" class="comb-row__menos" aria-label="Diminuir">−</button>
              <input type="number" class="comb-row__qtd" min="0" value="0" inputmode="numeric" aria-label="Quantidade de ${o.nome}">
              <button type="button" class="comb-row__mais" aria-label="Aumentar">+</button>
            </div>
            <div class="comb-row__subtotal">R$ 0,00</div>
          </div>`).join('')}
      </div>
      <div class="modal__foot">
        <div class="modal__total">
          <small id="combResumo">Nenhum copo selecionado</small>
          <strong id="combTotal">R$ 0,00</strong>
        </div>
        <button class="btn btn--primary modal__add" disabled>Adicionar ao carrinho</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const linhas = [...modal.querySelectorAll('.comb-row')];

  function recalcular() {
    const qtds = linhas.map((l) => Math.max(0, parseInt(l.querySelector('.comb-row__qtd').value, 10) || 0));
    const total = qtds.reduce((a, b) => a + b, 0);
    let valorTotal = 0;
    linhas.forEach((linha, i) => {
      const unitario = precoDaFaixa(p.opcoesCombinacao[i].faixas, Math.max(total, 1));
      const subtotal = qtds[i] * unitario;
      valorTotal += subtotal;
      linha.querySelector('.comb-row__unit').textContent = `R$ ${formatarPreco(unitario)}/un`;
      linha.querySelector('.comb-row__subtotal').textContent = `R$ ${formatarPreco(subtotal)}`;
    });
    modal.querySelector('#combTotal').textContent = `R$ ${formatarPreco(valorTotal)}`;
    modal.querySelector('#combResumo').textContent = total === 0
      ? 'Nenhum copo selecionado'
      : `${total} copo${total > 1 ? 's' : ''} no total`;
    modal.querySelector('.modal__add').disabled = total === 0;
    return { qtds, total, valorTotal };
  }

  linhas.forEach((linha) => {
    const input = linha.querySelector('.comb-row__qtd');
    linha.querySelector('.comb-row__menos').addEventListener('click', () => {
      input.value = Math.max(0, (parseInt(input.value, 10) || 0) - 1);
      recalcular();
    });
    linha.querySelector('.comb-row__mais').addEventListener('click', () => {
      input.value = (parseInt(input.value, 10) || 0) + 1;
      recalcular();
    });
    input.addEventListener('input', recalcular);
  });

  function fecharModal() {
    modal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', aoTeclar);
  }
  function aoTeclar(e) {
    if (e.key === 'Escape') fecharModal();
  }
  modal.querySelector('.modal__close').addEventListener('click', fecharModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
  document.addEventListener('keydown', aoTeclar);

  modal.querySelector('.modal__add').addEventListener('click', () => {
    const { qtds, total, valorTotal } = recalcular();
    if (total === 0) return;
    const resumo = p.opcoesCombinacao
      .map((o, i) => (qtds[i] > 0 ? `${qtds[i]}× ${o.nome}` : null))
      .filter(Boolean)
      .join(' + ');
    itensCarrinho += total;
    localStorage.setItem('grafiprint_carrinho', itensCarrinho);
    if (cartBadge) cartBadge.textContent = itensCarrinho;
    fecharModal();
    mostrarToast(`✅ ${resumo} (R$ ${formatarPreco(valorTotal)}) adicionado ao carrinho!`);
  });
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
  const produto = encontrarProduto(nome);

  // Produto com lista de combinações abre a janela de quantidades
  if (produto && produto.opcoesCombinacao) {
    abrirCombinacoes(produto);
    return;
  }

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
