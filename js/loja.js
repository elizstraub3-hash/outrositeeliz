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

/* ---------- Card de produto (compacto: opções abrem ao clicar) ---------- */
function cardProduto(p, slugCategoria) {
  let hint = '';
  let precoSmall;
  let precoValor;

  if (p.opcoesCombinacao) {
    hint = `<p class="product-card__comb-hint">${p.opcoesCombinacao.map((o) => o.nome).join(' · ')}</p>`;
    precoSmall = 'a partir de';
    precoValor = menorPrecoCombinacao(p);
  } else if (p.cores) {
    hint = `<p class="product-card__comb-hint">🎨 ${p.cores.length} cores disponíveis</p>`;
    precoSmall = p.minimo > 1 ? `por unidade · pedido mínimo ${p.minimo} un` : 'por unidade';
    precoValor = p.precoUnitario;
  } else {
    const v0 = p.variacoes[0];
    precoSmall = `${v0.label} por`;
    precoValor = v0.preco;
  }

  return `
    <article class="product-card">
      <a class="product-card__img" style="background:${p.bg}" href="categoria.html?cat=${slugCategoria}" title="Ver categoria ${CATALOGO[slugCategoria].nome}">
        ${p.badge ? `<span class="product-card__badge ${p.badge === 'Novo' ? 'product-card__badge--new' : ''}">${p.badge}</span>` : ''}
        ${p.imagem ? `<img src="${p.imagem}" alt="${p.nome}" loading="lazy">` : p.emoji}
      </a>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.nome}</h3>
        <p class="product-card__spec">${p.spec}</p>
        <p class="product-card__rating">★★★★★ ${p.nota} <span>(${p.avaliacoes.toLocaleString('pt-BR')} avaliações)</span></p>
        ${hint}
        <div class="product-card__price">
          <small>${precoSmall}</small>
          <strong>R$ ${formatarPreco(precoValor)}</strong>
        </div>
        <div class="product-card__prazo">
          <span>⏱️ Previsão de produção: até 5 dias úteis</span>
          <small>* Prazo informado refere-se apenas à produção. O tempo de entrega será adicionado após a finalização.</small>
        </div>
        <button class="product-card__btn">${p.opcoesCombinacao ? 'Escolher quantidades' : 'Comprar'}</button>
      </div>
    </article>`;
}

/* ---------- Estrutura base das janelas (modal) ---------- */
function criarModal(rotulo, conteudo) {
  const antigo = document.getElementById('modalProduto');
  if (antigo) antigo.remove();

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'modalProduto';
  modal.innerHTML = `
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="${rotulo}">
      <button class="modal__close" aria-label="Fechar">×</button>
      ${conteudo}
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  function fechar() {
    modal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', aoTeclar);
  }
  function aoTeclar(e) {
    if (e.key === 'Escape') fechar();
  }
  modal.querySelector('.modal__close').addEventListener('click', fechar);
  modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); });
  document.addEventListener('keydown', aoTeclar);

  return { modal, fechar };
}

function cabecalhoModal(p) {
  return `
    <div class="modal__head">
      <div class="modal__thumb" style="background:${p.bg}">${p.imagem ? `<img src="${p.imagem}" alt="${p.nome}">` : p.emoji}</div>
      <div>
        <h3>${p.nome}</h3>
        <p>${p.spec}</p>
      </div>
    </div>`;
}

/* ---------- Janela de variações (pacotes fixos) ---------- */
function abrirVariacoes(p) {
  const { modal, fechar } = criarModal(`Opções de ${p.nome}`, `
    ${cabecalhoModal(p)}
    <label class="modal__label">Escolha uma opção:</label>
    <div class="modal__rows">
      ${p.variacoes.map((v, i) => `
        <button type="button" class="var-row ${i === 0 ? 'var-row--ativa' : ''}" data-i="${i}">
          <span class="var-row__label">${v.label}</span>
          <span class="var-row__preco">R$ ${formatarPreco(v.preco)}</span>
        </button>`).join('')}
    </div>
    <div class="modal__foot">
      <div class="modal__total">
        <small>valor da opção</small>
        <strong id="modalTotal">R$ ${formatarPreco(p.variacoes[0].preco)}</strong>
      </div>
      <button class="btn btn--primary modal__add">Adicionar ao carrinho</button>
    </div>`);

  let selecionada = 0;
  modal.querySelectorAll('.var-row').forEach((row) => {
    row.addEventListener('click', () => {
      selecionada = Number(row.dataset.i);
      modal.querySelectorAll('.var-row').forEach((r) => r.classList.toggle('var-row--ativa', r === row));
      modal.querySelector('#modalTotal').textContent = `R$ ${formatarPreco(p.variacoes[selecionada].preco)}`;
    });
  });

  modal.querySelector('.modal__add').addEventListener('click', () => {
    const v = p.variacoes[selecionada];
    itensCarrinho++;
    localStorage.setItem('grafiprint_carrinho', itensCarrinho);
    if (cartBadge) cartBadge.textContent = itensCarrinho;
    fechar();
    mostrarToast(`✅ ${p.nome} (${v.label}) adicionado ao carrinho!`);
  });
}

/* ---------- Janela de cores + quantidade (preço unitário e pedido mínimo) ---------- */
function abrirCores(p) {
  const min = p.minimo || 1;
  const { modal, fechar } = criarModal(`Opções de ${p.nome}`, `
    ${cabecalhoModal(p)}
    <div class="modal__opcao">
      <label class="modal__label" for="modalCor">Cor:</label>
      <select class="modal__select" id="modalCor">
        ${p.cores.map((c) => `<option>${c}</option>`).join('')}
      </select>
    </div>
    <div class="modal__opcao">
      <label class="modal__label">Quantidade${min > 1 ? ` (pedido mínimo: ${min} un)` : ''}:</label>
      <div class="comb-row__stepper modal__stepper">
        <button type="button" class="qtd-menos" aria-label="Diminuir">−</button>
        <input type="number" class="comb-row__qtd" id="modalQtd" min="${min}" value="${min}" inputmode="numeric">
        <button type="button" class="qtd-mais" aria-label="Aumentar">+</button>
      </div>
      <small class="modal__unitario">R$ ${formatarPreco(p.precoUnitario)} por unidade</small>
    </div>
    <div class="modal__foot">
      <div class="modal__total">
        <small id="modalResumo">${min} un</small>
        <strong id="modalTotal">R$ ${formatarPreco(min * p.precoUnitario)}</strong>
      </div>
      <button class="btn btn--primary modal__add">Adicionar ao carrinho</button>
    </div>`);

  const input = modal.querySelector('#modalQtd');

  function qtdAtual() {
    return Math.max(min, parseInt(input.value, 10) || min);
  }
  function recalcular() {
    const qtd = qtdAtual();
    modal.querySelector('#modalResumo').textContent = `${qtd} un`;
    modal.querySelector('#modalTotal').textContent = `R$ ${formatarPreco(qtd * p.precoUnitario)}`;
  }

  modal.querySelector('.qtd-menos').addEventListener('click', () => {
    input.value = Math.max(min, qtdAtual() - 1);
    recalcular();
  });
  modal.querySelector('.qtd-mais').addEventListener('click', () => {
    input.value = qtdAtual() + 1;
    recalcular();
  });
  input.addEventListener('input', recalcular);
  input.addEventListener('blur', () => { input.value = qtdAtual(); recalcular(); });

  modal.querySelector('.modal__add').addEventListener('click', () => {
    const qtd = qtdAtual();
    const cor = modal.querySelector('#modalCor').value;
    itensCarrinho += qtd;
    localStorage.setItem('grafiprint_carrinho', itensCarrinho);
    if (cartBadge) cartBadge.textContent = itensCarrinho;
    fechar();
    mostrarToast(`✅ ${qtd}× ${p.nome} (${cor}) — R$ ${formatarPreco(qtd * p.precoUnitario)} adicionado ao carrinho!`);
  });
}

/* ---------- Janela de combinações (quantidade de cada personalização) ---------- */
function abrirCombinacoes(p) {
  const { modal, fechar } = criarModal(`Combinações de ${p.nome}`, `
    ${cabecalhoModal(p)}
    <div class="modal__faixas">
      ${p.opcoesCombinacao.map((o) => `<p><strong>${o.nome}:</strong> ${resumoFaixas(o.faixas)}</p>`).join('')}
      <small>* O preço por unidade considera a quantidade total de copos da combinação.</small>
    </div>
    <div class="modal__rows">
      ${p.opcoesCombinacao.map((o, i) => `
        <div class="comb-row" data-idx="${i}">
          ${o.imagem ? `<img class="comb-row__foto" src="${o.imagem}" alt="${o.nome}">` : ''}
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
        <small id="modalResumo">Nenhum copo selecionado</small>
        <strong id="modalTotal">R$ 0,00</strong>
      </div>
      <button class="btn btn--primary modal__add" disabled>Adicionar ao carrinho</button>
    </div>`);

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
    modal.querySelector('#modalTotal').textContent = `R$ ${formatarPreco(valorTotal)}`;
    modal.querySelector('#modalResumo').textContent = total === 0
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
    fechar();
    mostrarToast(`✅ ${resumo} (R$ ${formatarPreco(valorTotal)}) adicionado ao carrinho!`);
  });
}

/* ---------- Carrinho (contador persiste entre as páginas) ---------- */
let itensCarrinho = parseInt(localStorage.getItem('grafiprint_carrinho') || '0', 10);
const cartBadge = document.getElementById('cartCount');
if (cartBadge) cartBadge.textContent = itensCarrinho;

function encontrarProduto(nome) {
  for (const cat of Object.values(CATALOGO)) {
    const p = cat.produtos.find((prod) => prod.nome === nome);
    if (p) return p;
  }
  return null;
}

/* Botão do card abre a janela certa para o tipo de produto */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.product-card__btn');
  if (!btn) return;
  const nome = btn.closest('.product-card').querySelector('.product-card__title').textContent;
  const produto = encontrarProduto(nome);
  if (!produto) return;

  if (produto.opcoesCombinacao) abrirCombinacoes(produto);
  else if (produto.cores) abrirCores(produto);
  else abrirVariacoes(produto);
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
