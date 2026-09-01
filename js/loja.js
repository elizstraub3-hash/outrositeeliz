/* ============ Print House — lógica compartilhada (home + páginas de categoria) ============ */

/* ---------- Formatação de preço ---------- */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* Rótulo de preço: null/undefined = medida personalizada (a combinar) */
function precoLabel(preco) {
  return (preco == null) ? 'Sob consulta' : `R$ ${formatarPreco(preco)}`;
}

/* WhatsApp da gráfica (troque pelo número real, com DDI+DDD) */
const WHATSAPP_GRAFICA = 'https://wa.me/5541995282807';

/* Ícone neutro para produtos sem foto */
const ICONE_PRODUTO = `<svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>`;

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

function menorPrecoTamanhos(p) {
  const precos = Object.values(p.tamanhos).flat().map((v) => v.preco).filter((x) => x != null);
  return precos.length ? Math.min(...precos) : null;
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
  } else if (p.tamanhos) {
    hint = `<p class="product-card__comb-hint">${p.grupoLabel === 'Cor' ? 'Cores' : 'Tamanhos'}: ${Object.keys(p.tamanhos).join(' · ')}</p>`;
    precoSmall = 'a partir de';
    precoValor = menorPrecoTamanhos(p);
  } else if (p.cores) {
    hint = `<p class="product-card__comb-hint">${p.cores.length} cores disponíveis</p>`;
    precoSmall = p.minimo > 1 ? `por unidade · pedido mínimo ${p.minimo} un` : 'por unidade';
    precoValor = p.precoUnitario;
  } else {
    const v0 = p.variacoes[0];
    hint = `<p class="product-card__comb-hint">${p.variacoes.map((v) => v.label).join(' · ')}</p>`;
    precoSmall = `${v0.label} por`;
    precoValor = v0.preco;
  }

  // As informações completas do produto agora abrem dentro do modal de compra.
  const destino = `categoria.html?cat=${slugCategoria}`;
  const acao = `<button class="product-card__btn">Comprar</button>`;

  // Galeria: quando o produto tem várias imagens, o card vira um mini carrossel com bolinhas
  const galeria = (p.imagens && p.imagens.length) ? p.imagens : (p.imagem ? [p.imagem] : []);
  const badge = p.badge ? `<span class="product-card__badge ${p.badge === 'Novo' ? 'product-card__badge--new' : ''}">${p.badge}</span>` : '';
  const imgArea = galeria.length > 1
    ? `<div class="product-card__img product-card__img--galeria" style="background:${p.bg}">
        ${badge}
        <div class="product-card__slider">
          ${galeria.map((src) => `<img src="${src}" alt="${p.nome}" loading="lazy">`).join('')}
        </div>
        <div class="product-card__dots">
          ${galeria.map((_, i) => `<button type="button" class="product-card__dot${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-label="Imagem ${i + 1}"></button>`).join('')}
        </div>
      </div>`
    : `<a class="product-card__img" style="background:${p.bg}" href="${destino}" title="Ver categoria ${CATALOGO[slugCategoria].nome}">
        ${badge}
        ${galeria.length ? `<img src="${galeria[0]}" alt="${p.nome}" loading="lazy">` : ICONE_PRODUTO}
      </a>`;

  return `
    <article class="product-card">
      ${imgArea}
      <div class="product-card__body">
        <h3 class="product-card__title">${p.nome}</h3>
        <p class="product-card__spec">${p.spec}</p>
        ${hint}
        <div class="product-card__price">
          <small>${precoSmall}</small>
          <strong>${precoValor == null ? 'Sob consulta' : 'R$ ' + formatarPreco(precoValor)}</strong> ${precoValor == null ? '' : '<span class="pix">no Pix</span>'}
        </div>
        <div class="product-card__prazo">
          <span>Previsão de produção: ${p.prazoTexto || `até ${p.prazo || 5} dias úteis`}</span>
          <small>* Prazo informado refere-se apenas à produção. O tempo de entrega será adicionado após a finalização.</small>
        </div>
        ${acao}
      </div>
    </article>`;
}

/* Slug estável a partir do nome do produto (para a página de produto) */
function slugProduto(nome) {
  return nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* Localiza um produto pelo slug do nome (usado em produto.html) */
function encontrarProdutoPorSlug(slug) {
  for (const cat of Object.values(CATALOGO)) {
    const p = cat.produtos.find((prod) => slugProduto(prod.nome) === slug);
    if (p) return p;
  }
  return null;
}

/* Slug da categoria a que um produto pertence */
function categoriaDoProduto(p) {
  for (const [s, c] of Object.entries(CATALOGO)) if (c.produtos.includes(p)) return s;
  return Object.keys(CATALOGO)[0];
}

/* Renderiza cards de uma lista de nomes de produtos (para coleções/temas/home) */
function cardsPorNomes(nomes) {
  return nomes
    .map((nome) => encontrarProduto(nome))
    .filter(Boolean)
    .map((p) => cardProduto(p, categoriaDoProduto(p)))
    .join('');
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

/* Bloco "sobre a arte" exibido em todas as janelas de compra */
function blocoArte(p) {
  // Produtos sem personalização (ou serviços): mostra um aviso no lugar do envio de arte
  if (p && p.semArte) {
    const txt = typeof p.semArte === 'string'
      ? p.semArte
      : 'Este produto é vendido <strong>sem personalização</strong> — não é necessário enviar arte.';
    return `
    <div class="modal__arte">
      <label class="modal__label">Sobre a arte:</label>
      <p class="arte-restrita">${txt}</p>
    </div>`;
  }
  // Produtos com arte restrita: a arte é desenvolvida pela gráfica (detalhes técnicos)
  if (p && p.arteRestrita) {
    const txt = typeof p.arteRestrita === 'string'
      ? p.arteRestrita
      : '🎨 A arte deste produto é desenvolvida pela nossa equipe, pois envolve detalhes técnicos de modelagem e corte que só a gráfica domina. Você <strong>não precisa enviar arquivo</strong> — nós criamos a arte com você e enviamos a prévia para aprovação antes da produção.';
    return `
    <div class="modal__arte">
      <label class="modal__label">Sobre a arte:</label>
      <p class="arte-restrita">${txt}</p>
    </div>`;
  }
  return `
    <div class="modal__arte">
      <label class="modal__label">Sobre a arte:</label>
      <div class="arte-opcoes">
        <label class="arte-opcao"><input type="radio" name="arteOpcao" value="Tenho a arte" checked> Tenho a arte</label>
        <label class="arte-opcao"><input type="radio" name="arteOpcao" value="Não tenho a arte"> Não tenho a arte</label>
      </div>
      <div class="arte-envio" id="arteEnvio">
        <label class="modal__label" for="arteArquivo">Envie sua arte em PDF:</label>
        <input type="file" id="arteArquivo" class="arte-upload" accept=".pdf,.cdr,.ai">
        <small class="arte-nota">O arquivo deve ter um nome que identifique você ou sua empresa (ex.: minha-empresa-arte.pdf).</small>
        <small class="arte-nota">Se preferir, envie a arte pelo <a href="${WHATSAPP_GRAFICA}" target="_blank" rel="noopener" class="arte-link">WhatsApp da gráfica</a>.</small>
      </div>
      <p class="arte-gratis">${p && p.arteNota ? p.arteNota : 'Arte grátis para compras acima de R$ 250,00 — abaixo disso, cobramos R$ 25,00 por arte criada.'}</p>
      <button type="button" class="arte-link" onclick="abrirRegulamentoArte()">Dúvidas sobre sua arte? Leia aqui</button>
    </div>`;
}

function arteEscolhida(modal) {
  const marcado = modal.querySelector('input[name="arteOpcao"]:checked');
  if (marcado) return marcado.value;
  return modal.querySelector('.arte-restrita') ? 'Arte pela gráfica' : 'Tenho a arte';
}

function arquivoArte(modal) {
  const input = modal.querySelector('#arteArquivo');
  return input && input.files.length > 0 ? input.files[0].name : null;
}

/* Mostra o campo de upload só quando "Tenho a arte" está marcado */
document.addEventListener('change', (e) => {
  if (e.target.name !== 'arteOpcao') return;
  const painel = e.target.closest('.modal__panel');
  const envio = painel && painel.querySelector('#arteEnvio');
  if (envio) envio.style.display = e.target.value === 'Tenho a arte' ? '' : 'none';
});

/* Card fechável com o resumo do regulamento da arte */
function abrirRegulamentoArte() {
  const antigo = document.getElementById('modalArte');
  if (antigo) { antigo.remove(); return; }

  const card = document.createElement('div');
  card.className = 'modal modal--arte';
  card.id = 'modalArte';
  card.innerHTML = `
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Regulamento da arte">
      <button class="modal__close" aria-label="Fechar">×</button>
      <h3 class="arte-titulo">Regulamento da arte</h3>
      <ul class="arte-regras">
        <li><strong>Arte grátis</strong> para compras acima de <strong>R$ 250,00</strong>. Abaixo disso, cobramos <strong>R$ 25,00 por arte criada</strong>.</li>
        <li>Se você <strong>já tem a arte</strong>, envie em PDF (upload na compra) ou pelo <a href="${WHATSAPP_GRAFICA}" target="_blank" rel="noopener" class="arte-link">WhatsApp da gráfica</a>. O arquivo deve ter um nome que identifique você.</li>
        <li><strong>Não criamos identidades visuais nem logotipos</strong> na criação da arte — temos pacotes exclusivos para isso. <a href="pacotes-logo.html" class="arte-link">Confira aqui</a>.</li>
        <li>Nossa equipe <strong>não altera nenhuma arte sem a aprovação do cliente</strong>.</li>
        <li>A produção só começa <strong>após a aprovação da arte</strong> pelo cliente.</li>
        <li><strong>Erros aprovados pelo cliente são de responsabilidade do mesmo.</strong> Confira com atenção textos, telefones e cores antes de aprovar.</li>
      </ul>
      <a href="regulamento-arte.html" class="arte-link arte-link--pagina">Ver regulamento completo da arte →</a>
    </div>`;
  document.body.appendChild(card);

  function fechar() {
    card.remove();
    document.removeEventListener('keydown', aoTeclar);
  }
  function aoTeclar(e) {
    if (e.key === 'Escape') fechar();
  }
  card.querySelector('.modal__close').addEventListener('click', fechar);
  card.addEventListener('click', (e) => { if (e.target === card) fechar(); });
  document.addEventListener('keydown', aoTeclar);
}

function cabecalhoModal(p) {
  return `
    <div class="modal__head">
      <div class="modal__thumb" style="background:${p.bg}">${p.imagem ? `<img id="modalThumbImg" src="${p.imagem}" alt="${p.nome}">` : ''}</div>
      <div>
        <h3>${p.nome}</h3>
        <p>${p.spec}</p>
      </div>
    </div>
    ${infoProduto(p)}`;
}

/* Bloco "Mais informações sobre o produto" — abre um card com descrição, detalhes e FAQ */
function infoProduto(p) {
  // Aparece em todos os produtos. Quando não há descrição própria, usa o
  // resumo (spec) e o prazo, para manter a mesma linha em todos os cards.
  let corpo = `<p>${p.descricao || p.spec}</p>`;
  if (p.detalhes && p.detalhes.length) corpo += `<ul>${p.detalhes.map((d) => `<li>${d}</li>`).join('')}</ul>`;
  const prazoTxt = p.prazoTexto || `até ${p.prazo || 5} dias úteis`;
  corpo += `<p><strong>Previsão de produção:</strong> ${prazoTxt}. O prazo de entrega é somado após a finalização.</p>`;
  if (p.faq && p.faq.length) corpo += p.faq.map((f) => `<div class="modal__info-faq"><strong>${f.p}</strong><p>${f.r}</p></div>`).join('');
  return `
    <details class="modal__info">
      <summary>Mais informações sobre o produto</summary>
      <div class="modal__info-body">${corpo}</div>
    </details>`;
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
          <span class="var-row__preco">${precoLabel(v.preco)}</span>
        </button>`).join('')}
    </div>
    ${blocoArte(p)}
    <div class="modal__foot">
      <div class="modal__total">
        <small>valor da opção</small>
        <strong id="modalTotal">${precoLabel(p.variacoes[0].preco)}</strong> <span class="pix"></span>
      </div>
      <button class="btn btn--primary modal__add">Adicionar ao carrinho</button>
    </div>`);

  let selecionada = 0;
  modal.querySelectorAll('.var-row').forEach((row) => {
    row.addEventListener('click', () => {
      selecionada = Number(row.dataset.i);
      modal.querySelectorAll('.var-row').forEach((r) => r.classList.toggle('var-row--ativa', r === row));
      modal.querySelector('#modalTotal').textContent = precoLabel(p.variacoes[selecionada].preco);
    });
  });

  modal.querySelector('.modal__add').addEventListener('click', () => {
    const v = p.variacoes[selecionada];
    const arte = arteEscolhida(modal);
    const arquivo = arquivoArte(modal);
    adicionarItemCarrinho({ nome: p.nome, detalhe: v.label, qtd: 1, total: v.preco, arte, arquivo });
    fechar();
    mostrarToast(`${p.nome} (${v.label}) · ${arte}${arquivo ? ` (${arquivo})` : ''} — adicionado ao carrinho!`);
  });
}

/* ---------- Janela de tamanhos (dropdown de tamanho + quantidade) ---------- */
function abrirTamanhos(p) {
  const nomesTamanhos = Object.keys(p.tamanhos);
  const grupoLabel = p.grupoLabel || 'Tamanho';
  const opcaoLabel = p.opcaoLabel || 'Cor e quantidade';
  const { modal, fechar } = criarModal(`Opções de ${p.nome}`, `
    ${cabecalhoModal(p)}
    ${p.extra ? `
    <div class="modal__opcao">
      <label class="modal__label" for="modalExtra">${p.extra.label}:</label>
      <select class="modal__select" id="modalExtra">
        ${p.extra.opcoes.map((o) => `<option>${o}</option>`).join('')}
      </select>
    </div>` : ''}
    <div class="modal__opcao">
      <label class="modal__label" for="modalTamanho">${grupoLabel}:</label>
      <select class="modal__select" id="modalTamanho">
        ${nomesTamanhos.map((t) => `<option>${t}</option>`).join('')}
      </select>
    </div>
    ${p.coresPorTamanho ? `
    <div class="modal__opcao">
      <label class="modal__label" for="modalCorSacola">Cor da sacola:</label>
      <select class="modal__select" id="modalCorSacola"></select>
    </div>` : ''}
    ${p.coresEstampa ? `
    <div class="modal__opcao">
      <label class="modal__label" for="modalCorEstampa">${p.coresLabel || 'Cor da estampa'}:</label>
      <select class="modal__select" id="modalCorEstampa">
        ${p.coresEstampa.map((c) => `<option>${c}</option>`).join('')}
      </select>
    </div>` : ''}
    <div class="modal__opcao">
      <label class="modal__label" for="modalQtdOpcao">${opcaoLabel}:</label>
      <select class="modal__select" id="modalQtdOpcao"></select>
    </div>
    ${p.furos ? `
    <label class="modal__adicional">
      <input type="checkbox" id="modalFuro"> Furo 3mm (+ <span id="modalFuroPreco"></span>)
    </label>` : ''}
    ${blocoArte(p)}
    <div class="modal__foot">
      <div class="modal__total">
        <small id="modalResumo"></small>
        <strong id="modalTotal"></strong> <span class="pix">no Pix</span>
      </div>
      <button class="btn btn--primary modal__add">Adicionar ao carrinho</button>
    </div>`);

  const selTamanho = modal.querySelector('#modalTamanho');
  const selOpcao = modal.querySelector('#modalQtdOpcao');
  const selCorSacola = modal.querySelector('#modalCorSacola');
  const chkFuro = modal.querySelector('#modalFuro');

  function opcaoAtual() {
    return p.tamanhos[selTamanho.value][Number(selOpcao.value) || 0];
  }
  function qtdNumerica() {
    return parseInt(String(opcaoAtual().label).replace(/\D/g, ''), 10) || 0;
  }
  function furoPrecoParaQtd() {
    if (!p.furos) return 0;
    const q = qtdNumerica();
    const faixa = p.furos.find((f) => q <= f.ate) || p.furos[p.furos.length - 1];
    return faixa ? faixa.preco : 0;
  }
  function furoSelecionado() {
    return !!(chkFuro && chkFuro.checked) ? furoPrecoParaQtd() : 0;
  }
  function atualizarTotal() {
    const v = opcaoAtual();
    if (p.furos) modal.querySelector('#modalFuroPreco').textContent = `R$ ${formatarPreco(furoPrecoParaQtd())}`;
    const furo = furoSelecionado();
    const total = v.preco == null ? null : v.preco + furo;
    modal.querySelector('#modalResumo').textContent = `${selTamanho.value} · ${v.label}${furo ? ' · com furos' : ''}`;
    modal.querySelector('#modalTotal').textContent = precoLabel(total);
  }
  function preencherCoresSacola() {
    if (!selCorSacola) return;
    const cores = p.coresPorTamanho[selTamanho.value] || [];
    selCorSacola.innerHTML = cores.map((c) => `<option>${c}</option>`).join('');
  }
  function preencherOpcoes() {
    selOpcao.innerHTML = p.tamanhos[selTamanho.value]
      .map((v, i) => `<option value="${i}">${v.label} — ${precoLabel(v.preco)}</option>`)
      .join('');
    preencherCoresSacola();
    atualizarTotal();
  }
  selTamanho.addEventListener('change', preencherOpcoes);
  selOpcao.addEventListener('change', atualizarTotal);
  if (chkFuro) chkFuro.addEventListener('change', atualizarTotal);

  // Troca a foto do produto conforme a opção extra (ex.: gola da camiseta)
  const selExtraImg = modal.querySelector('#modalExtra');
  const thumbImg = modal.querySelector('#modalThumbImg');
  if (selExtraImg && thumbImg && p.extraImagens) {
    selExtraImg.addEventListener('change', () => {
      const nova = p.extraImagens[selExtraImg.value];
      if (nova) thumbImg.src = nova;
    });
  }

  preencherOpcoes();

  modal.querySelector('.modal__add').addEventListener('click', () => {
    const v = opcaoAtual();
    const extraSel = modal.querySelector('#modalExtra');
    const corEstampaSel = modal.querySelector('#modalCorEstampa');
    const furo = furoSelecionado();
    const partes = [];
    if (extraSel) partes.push(extraSel.value);
    partes.push(selTamanho.value, v.label);
    if (selCorSacola && selCorSacola.value) partes.push(`Sacola: ${selCorSacola.value}`);
    if (corEstampaSel) partes.push(`${p.coresLabel || 'Estampa'}: ${corEstampaSel.value}`);
    if (furo) partes.push('Com furos');
    const detalhe = partes.join(' · ');
    const arte = arteEscolhida(modal);
    const arquivo = arquivoArte(modal);
    const total = v.preco == null ? null : v.preco + furo;
    adicionarItemCarrinho({ nome: p.nome, detalhe, qtd: 1, total, arte, arquivo });
    fechar();
    mostrarToast(`${p.nome} (${detalhe}) · ${arte}${arquivo ? ` (${arquivo})` : ''} — adicionado ao carrinho!`);
  });
}

/* ---------- Janela de distribuição por tamanho (ex.: 3 G + 2 P) ---------- */
/* Para camisas, moletons e afins: o cliente informa a quantidade de cada
   tamanho e o preço por unidade segue a faixa da quantidade total. */
function abrirTamanhosDistribuir(p) {
  const sizes = Object.keys(p.tamanhos);
  const un = p.unidade || 'peça';
  const unp = p.unidadePlural || 'peças';
  const tiers = (sizes.length ? p.tamanhos[sizes[0]] : []).map((v) => {
    const min = parseInt(String(v.label).replace(/\D/g, ''), 10) || 1;
    return { min, precoUnit: v.preco / min };
  }).sort((a, b) => a.min - b.min);
  if (!tiers.length) tiers.push({ min: 1, precoUnit: 0 });

  function unitPara(total) {
    let pu = tiers[0].precoUnit;
    tiers.forEach((t) => { if (total >= t.min) pu = t.precoUnit; });
    return pu;
  }
  const resumoTiers = tiers.map((t, i) => {
    const prox = tiers[i + 1];
    const faixa = prox ? (t.min === prox.min - 1 ? `${t.min} un` : `${t.min} a ${prox.min - 1} un`) : `${t.min}+ un`;
    return `${faixa}: R$ ${formatarPreco(t.precoUnit)}/un`;
  }).join(' · ');

  const { modal, fechar } = criarModal(`Opções de ${p.nome}`, `
    ${cabecalhoModal(p)}
    ${p.extra ? `
    <div class="modal__opcao">
      <label class="modal__label" for="modalExtra">${p.extra.label}:</label>
      <select class="modal__select" id="modalExtra">${p.extra.opcoes.map((o) => `<option>${o}</option>`).join('')}</select>
    </div>` : ''}
    ${p.coresEstampa ? `
    <div class="modal__opcao">
      <label class="modal__label" for="modalCorEstampa">${p.coresLabel || 'Cor'}:</label>
      <select class="modal__select" id="modalCorEstampa">${p.coresEstampa.map((c) => `<option>${c}</option>`).join('')}</select>
    </div>` : ''}
    <div class="modal__faixas">
      <p><strong>Quantidade por tamanho</strong> — informe quantas de cada:</p>
      <small>* O preço por unidade segue a quantidade total: ${resumoTiers}</small>
    </div>
    <div class="modal__tam-grid">
      ${sizes.map((s) => `
        <label class="modal__tam-item">
          <span>${s}</span>
          <select class="modal__select modal__tam-qtd" data-tam="${s}" aria-label="Quantidade tamanho ${s}">
            ${Array.from({ length: 51 }, (_, n) => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>`).join('')}
    </div>
    ${blocoArte(p)}
    <div class="modal__foot">
      <div class="modal__total">
        <small id="modalResumo">Nenhuma ${un} selecionada</small>
        <strong id="modalTotal">R$ 0,00</strong> <span class="pix">no Pix</span>
      </div>
      <button class="btn btn--primary modal__add" disabled>Adicionar ao carrinho</button>
    </div>`);

  const selects = [...modal.querySelectorAll('.modal__tam-qtd')];
  function recalcular() {
    const qtds = selects.map((s) => parseInt(s.value, 10) || 0);
    const total = qtds.reduce((a, b) => a + b, 0);
    const unit = unitPara(Math.max(total, 1));
    modal.querySelector('#modalTotal').textContent = `R$ ${formatarPreco(total * unit)}`;
    modal.querySelector('#modalResumo').textContent = total === 0
      ? `Nenhuma ${un} selecionada`
      : `${total} ${total > 1 ? unp : un} · R$ ${formatarPreco(unit)}/un`;
    modal.querySelector('.modal__add').disabled = total === 0;
    return { qtds, total, unit };
  }
  selects.forEach((s) => s.addEventListener('change', recalcular));
  modal.querySelector('.modal__add').addEventListener('click', () => {
    const { qtds, total, unit } = recalcular();
    if (total === 0) return;
    const extraSel = modal.querySelector('#modalExtra');
    const corSel = modal.querySelector('#modalCorEstampa');
    const partes = [];
    if (extraSel) partes.push(extraSel.value);
    if (corSel) partes.push(`${p.coresLabel || 'Cor'}: ${corSel.value}`);
    partes.push(sizes.map((s, i) => (qtds[i] > 0 ? `${qtds[i]}× ${s}` : null)).filter(Boolean).join(' + '));
    const detalhe = partes.join(' · ');
    const arte = arteEscolhida(modal);
    const arquivo = arquivoArte(modal);
    adicionarItemCarrinho({ nome: p.nome, detalhe, qtd: total, total: total * unit, arte, arquivo });
    fechar();
    mostrarToast(`${p.nome} (${detalhe}) · ${arte}${arquivo ? ` (${arquivo})` : ''} — R$ ${formatarPreco(total * unit)} adicionado ao carrinho!`);
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
    ${blocoArte(p)}
    <div class="modal__foot">
      <div class="modal__total">
        <small id="modalResumo">${min} un</small>
        <strong id="modalTotal">R$ ${formatarPreco(min * p.precoUnitario)}</strong> <span class="pix">no Pix</span>
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
    const arte = arteEscolhida(modal);
    const arquivo = arquivoArte(modal);
    adicionarItemCarrinho({ nome: p.nome, detalhe: `${qtd} un · ${cor}`, qtd, total: qtd * p.precoUnitario, arte, arquivo });
    fechar();
    mostrarToast(`${qtd}× ${p.nome} (${cor}) · ${arte}${arquivo ? ` (${arquivo})` : ''} — R$ ${formatarPreco(qtd * p.precoUnitario)} adicionado ao carrinho!`);
  });
}

/* ---------- Janela de combinações (quantidade de cada personalização) ---------- */
function abrirCombinacoes(p) {
  const un = p.unidade || 'copo';
  const unp = p.unidadePlural || 'copos';
  const temFaixasMultiplas = p.opcoesCombinacao.some((o) => o.faixas.length > 1);
  const { modal, fechar } = criarModal(`Combinações de ${p.nome}`, `
    ${cabecalhoModal(p)}
    ${temFaixasMultiplas ? `
    <div class="modal__faixas">
      ${p.opcoesCombinacao.map((o) => `<p><strong>${o.nome}:</strong> ${resumoFaixas(o.faixas)}</p>`).join('')}
      <small>* O preço por unidade considera a quantidade total de ${unp} da combinação.</small>
    </div>` : ''}
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
    ${p.adicional ? `
    <label class="modal__adicional">
      <input type="checkbox" id="modalAdicional"> ${p.adicional.label} (+ R$ ${formatarPreco(p.adicional.preco)})
    </label>` : ''}
    ${blocoArte(p)}
    <div class="modal__foot">
      <div class="modal__total">
        <small id="modalResumo">Nenhum ${un} selecionado</small>
        <strong id="modalTotal">R$ 0,00</strong> <span class="pix">no Pix</span>
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
    const chk = modal.querySelector('#modalAdicional');
    const comAdicional = !!(chk && chk.checked);
    if (comAdicional) valorTotal += p.adicional.preco;
    const minTotal = p.minimoTotal || 0;
    modal.querySelector('#modalTotal').textContent = `R$ ${formatarPreco(valorTotal)}`;
    modal.querySelector('#modalResumo').textContent = total === 0
      ? `Nenhum ${un} selecionado`
      : `${total} ${total > 1 ? unp : un} no total${minTotal && total < minTotal ? ` · mínimo ${minTotal}` : ''}`;
    modal.querySelector('.modal__add').disabled = total === 0 || total < minTotal;
    return { qtds, total, valorTotal, comAdicional };
  }

  const chkAdicional = modal.querySelector('#modalAdicional');
  if (chkAdicional) chkAdicional.addEventListener('change', recalcular);

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
    const { qtds, total, valorTotal, comAdicional } = recalcular();
    if (total === 0) return;
    let resumo = p.opcoesCombinacao
      .map((o, i) => (qtds[i] > 0 ? `${qtds[i]}× ${o.nome}` : null))
      .filter(Boolean)
      .join(' + ');
    if (comAdicional) resumo += ` + ${p.adicional.label}`;
    const arte = arteEscolhida(modal);
    const arquivo = arquivoArte(modal);
    adicionarItemCarrinho({ nome: p.nome, detalhe: resumo, qtd: total, total: valorTotal, arte, arquivo });
    fechar();
    mostrarToast(`${resumo} · ${arte}${arquivo ? ` (${arquivo})` : ''} — R$ ${formatarPreco(valorTotal)} adicionado ao carrinho!`);
  });
}

/* ---------- Carrinho (itens persistem entre as páginas) ---------- */
let carrinho = [];
try {
  carrinho = JSON.parse(localStorage.getItem('printhouse_carrinho_itens') || '[]');
  if (!Array.isArray(carrinho)) carrinho = [];
} catch (e) {
  carrinho = [];
}
const cartBadge = document.getElementById('cartCount');
atualizarBadgeCarrinho();

function atualizarBadgeCarrinho() {
  if (cartBadge) cartBadge.textContent = carrinho.reduce((soma, item) => soma + item.qtd, 0);
}

function salvarCarrinho() {
  localStorage.setItem('printhouse_carrinho_itens', JSON.stringify(carrinho));
  atualizarBadgeCarrinho();
}

function adicionarItemCarrinho(item) {
  carrinho.push(item);
  salvarCarrinho();
}

/* Janela do carrinho: lista, remove, limpa e finaliza no WhatsApp */
function abrirCarrinho() {
  const totalValor = carrinho.reduce((soma, item) => soma + (item.total || 0), 0);
  const totalUnidades = carrinho.reduce((soma, item) => soma + item.qtd, 0);
  const temSobConsulta = carrinho.some((item) => item.total == null);
  const linhas = carrinho.length
    ? carrinho.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item__info">
            <strong>${item.nome}</strong>
            <small>${item.detalhe} · ${item.arte}${item.arquivo ? ` (${item.arquivo})` : ''}</small>
          </div>
          <span class="cart-item__preco">${item.total == null ? 'a combinar' : 'R$ ' + formatarPreco(item.total)}</span>
          <button type="button" class="cart-item__remover" data-i="${i}" aria-label="Remover item">×</button>
        </div>`).join('')
    : '<p class="cart-vazio">Seu carrinho está vazio.</p>';

  const { modal, fechar } = criarModal('Meu carrinho', `
    <h3 class="arte-titulo">Meu carrinho</h3>
    <div class="cart-lista">${linhas}</div>
    ${carrinho.length ? `
    <div class="cart-entrega">
      <span class="cart-entrega__titulo">Confira a forma de entrega</span>
      <label class="cart-entrega__opt">
        <input type="radio" name="entrega" value="Retirar na loja" checked>
        <span class="cart-entrega__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-5h5v5"/></svg>
        </span>
        <span class="cart-entrega__txt">
          <strong>Retirar na loja</strong>
          <small>Você retira pessoalmente no nosso ponto físico em Colombo/PR.</small>
        </span>
        <span class="cart-entrega__tag cart-entrega__tag--free">Grátis</span>
      </label>
      <label class="cart-entrega__opt">
        <input type="radio" name="entrega" value="Enviar por Uber (por conta do cliente)">
        <span class="cart-entrega__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5"/><path d="M3 13h18v4H3z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>
        </span>
        <span class="cart-entrega__txt">
          <strong>Enviar por Uber</strong>
          <small>Você chama o Uber e nós entregamos o pedido ao motorista após confirmar o <strong>nome</strong> e a <strong>placa</strong>. A corrida é por conta do cliente.</small>
        </span>
        <span class="cart-entrega__tag">Por sua conta</span>
      </label>
    </div>` : ''}
    <div class="modal__foot">
      <div class="modal__total">
        <small>${totalUnidades} unidade${totalUnidades === 1 ? '' : 's'}${temSobConsulta ? ' · + itens a combinar' : ''}</small>
        <strong>R$ ${formatarPreco(totalValor)}</strong> <span class="pix">no Pix</span>
      </div>
      <div class="cart-acoes">
        <button type="button" class="btn btn--claro cart-limpar" ${carrinho.length === 0 ? 'disabled' : ''}>Limpar</button>
        <button type="button" class="btn btn--primary cart-finalizar" ${carrinho.length === 0 ? 'disabled' : ''}>Finalizar no WhatsApp</button>
      </div>
    </div>`);

  modal.querySelectorAll('.cart-item__remover').forEach((btn) => {
    btn.addEventListener('click', () => {
      carrinho.splice(Number(btn.dataset.i), 1);
      salvarCarrinho();
      fechar();
      abrirCarrinho();
    });
  });

  const btnLimpar = modal.querySelector('.cart-limpar');
  if (btnLimpar) btnLimpar.addEventListener('click', () => {
    carrinho = [];
    salvarCarrinho();
    fechar();
    mostrarToast('Carrinho esvaziado.');
  });

  const btnFinalizar = modal.querySelector('.cart-finalizar');
  if (btnFinalizar) btnFinalizar.addEventListener('click', () => {
    const msg = ['Olá! Gostaria de fazer um pedido na Print House:', ''];
    const cliente = lerDadosCliente();
    const dadosCliente = [];
    if (cliente.nome) dadosCliente.push(`Cliente: ${cliente.nome}`);
    if (cliente.telefone) dadosCliente.push(`Tel: ${cliente.telefone}`);
    if (cliente.email) dadosCliente.push(`E-mail: ${cliente.email}`);
    if (dadosCliente.length) msg.push(dadosCliente.join(' | '), '');
    carrinho.forEach((item, i) => {
      msg.push(`${i + 1}) ${item.nome} — ${item.detalhe} — ${item.total == null ? 'valor a combinar' : 'R$ ' + formatarPreco(item.total)} — ${item.arte}${item.arquivo ? ` (arquivo: ${item.arquivo})` : ''}`);
    });
    msg.push('', `Total: R$ ${formatarPreco(totalValor)} no Pix${temSobConsulta ? ' (+ itens com medida personalizada a combinar)' : ''}`);
    const entregaSel = modal.querySelector('input[name="entrega"]:checked');
    if (entregaSel) {
      if (/uber/i.test(entregaSel.value)) {
        msg.push('', 'Entrega: Enviar por Uber (por conta do cliente). Vou chamar o Uber e vocês entregam o pedido ao motorista após confirmar o nome e a placa.');
      } else {
        msg.push('', `Entrega: ${entregaSel.value}`);
      }
    }
    if (carrinho.some((item) => item.arte === 'Tenho a arte')) {
      msg.push('', 'Vou enviar o arquivo da arte nesta conversa.');
    }
    window.open(`${WHATSAPP_GRAFICA}?text=${encodeURIComponent(msg.join('\n'))}`, '_blank');
    fechar();
    mostrarToast('Pedido aberto no WhatsApp!');
  });
}

/* ---------- Meus dados (salvos neste navegador) ---------- */
const DADOS_CLIENTE_KEY = 'printhouse_cliente';
function lerDadosCliente() {
  try { return JSON.parse(localStorage.getItem(DADOS_CLIENTE_KEY)) || {}; }
  catch (err) { return {}; }
}
function salvarDadosCliente(d) {
  localStorage.setItem(DADOS_CLIENTE_KEY, JSON.stringify(d));
}
function escaparAttr(v) {
  return String(v || '').replace(/"/g, '&quot;');
}
function abrirMeusDados() {
  const d = lerDadosCliente();
  const { modal, fechar } = criarModal('Meus dados', `
    <h3 class="arte-titulo">Meus dados</h3>
    <p class="meus-dados__intro">Preencha uma vez e o site guarda os seus dados para agilizar o pedido no WhatsApp. As informações ficam salvas <strong>só neste navegador</strong>.</p>
    <div class="modal__opcao">
      <label class="modal__label" for="mdNome">Nome ou empresa</label>
      <input class="modal__select" id="mdNome" type="text" value="${escaparAttr(d.nome)}" placeholder="Seu nome ou empresa">
    </div>
    <div class="modal__opcao">
      <label class="modal__label" for="mdTel">WhatsApp / Telefone</label>
      <input class="modal__select" id="mdTel" type="tel" value="${escaparAttr(d.telefone)}" placeholder="(41) 90000-0000">
    </div>
    <div class="modal__opcao">
      <label class="modal__label" for="mdEmail">E-mail</label>
      <input class="modal__select" id="mdEmail" type="email" value="${escaparAttr(d.email)}" placeholder="voce@email.com">
    </div>
    <div class="modal__foot">
      <div class="cart-acoes">
        <button type="button" class="btn btn--claro" id="mdLimpar">Apagar dados</button>
        <button type="button" class="btn btn--primary" id="mdSalvar">Salvar meus dados</button>
      </div>
    </div>`);

  modal.querySelector('#mdSalvar').addEventListener('click', () => {
    salvarDadosCliente({
      nome: modal.querySelector('#mdNome').value.trim(),
      telefone: modal.querySelector('#mdTel').value.trim(),
      email: modal.querySelector('#mdEmail').value.trim(),
    });
    fechar();
    mostrarToast('Seus dados foram salvos neste navegador!');
  });
  modal.querySelector('#mdLimpar').addEventListener('click', () => {
    localStorage.removeItem(DADOS_CLIENTE_KEY);
    fechar();
    mostrarToast('Seus dados foram apagados.');
  });
}

/* Ícone "Meus dados" do topo abre a janela em qualquer página */
document.querySelectorAll('.header__action--conta').forEach((el) => {
  el.addEventListener('click', (e) => { e.preventDefault(); abrirMeusDados(); });
});

/* Ícone do carrinho abre a janela em qualquer página */
document.querySelectorAll('.header__cart').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    abrirCarrinho();
  });
});

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
  if (!btn || btn.tagName === 'A') return; // links (Ver produto) navegam normalmente
  const nome = btn.closest('.product-card').querySelector('.product-card__title').textContent;
  const produto = encontrarProduto(nome);
  if (!produto) return;

  if (produto.distribuirTamanhos) abrirTamanhosDistribuir(produto);
  else if (produto.opcoesCombinacao) abrirCombinacoes(produto);
  else if (produto.tamanhos) abrirTamanhos(produto);
  else if (produto.cores) abrirCores(produto);
  else abrirVariacoes(produto);
});

/* ---------- Lightbox: ampliar a imagem do produto ---------- */
function abrirLightbox(src, alt) {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox__close" aria-label="Fechar">&times;</button><img class="lightbox__img" alt="">';
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.closest('.lightbox__close')) fecharLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharLightbox(); });
  }
  const img = lb.querySelector('.lightbox__img');
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function fecharLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* Clicar na foto do card abre o lightbox (quando há foto de verdade) */
document.addEventListener('click', (e) => {
  // Bolinhas do carrossel: rolam a galeria até a imagem escolhida
  const dot = e.target.closest('.product-card__dot');
  if (dot) {
    e.preventDefault();
    const galeria = dot.closest('.product-card__img--galeria');
    const slider = galeria && galeria.querySelector('.product-card__slider');
    if (slider) slider.scrollTo({ left: slider.clientWidth * Number(dot.dataset.i), behavior: 'smooth' });
    return;
  }
  const area = e.target.closest('.product-card__img');
  if (!area) return;
  const img = e.target.tagName === 'IMG' ? e.target : area.querySelector('img');
  if (!img) return; // cards com ícone (sem foto) seguem o link normalmente
  e.preventDefault();
  abrirLightbox(img.src, img.alt);
});

/* Atualiza a bolinha ativa conforme o carrossel do card é arrastado/rolado */
document.addEventListener('scroll', (e) => {
  const slider = e.target.closest && e.target.closest('.product-card__slider');
  if (!slider) return;
  const galeria = slider.closest('.product-card__img--galeria');
  const dots = galeria ? [...galeria.querySelectorAll('.product-card__dot')] : [];
  if (!dots.length) return;
  const atual = Math.round(slider.scrollLeft / slider.clientWidth);
  dots.forEach((d, i) => d.classList.toggle('is-active', i === atual));
}, true);

/* ---------- Cupom ---------- */
function copiarCupom() {
  if (navigator.clipboard) navigator.clipboard.writeText('BEMVINDO10');
  mostrarToast('Cupom BEMVINDO10 copiado!');
}

function copiarInauguracao() {
  if (navigator.clipboard) navigator.clipboard.writeText('INAUGURA5');
  mostrarToast('Cupom INAUGURA5 (5% OFF) copiado!');
}

/* ---------- Verificação de entrega por CEP ----------
   Site estático: identifica se o CEP é de Colombo/Curitiba (região com
   motoboy e frete grátis acima de R$ 299). Demais regiões: frete a combinar. */
function calcularFrete() {
  const input = document.getElementById('freteCep');
  const saida = document.getElementById('freteResultado');
  if (!input || !saida) return;
  const cep = (input.value || '').replace(/\D/g, '');
  if (cep.length !== 8) {
    saida.className = 'frete__result frete__result--erro';
    saida.textContent = 'Digite um CEP válido com 8 números.';
    return;
  }
  const n = parseInt(cep, 10);
  const curitiba = n >= 80000000 && n <= 82999999;
  const colombo = n >= 83400000 && n <= 83420999;
  saida.className = 'frete__result frete__result--ok';
  if (curitiba || colombo) {
    saida.innerHTML = '🎉 Sua região tem <strong>entrega por motoboy</strong> e <strong>frete grátis</strong> em pedidos acima de R$ 299! O valor exato é combinado no WhatsApp.';
  } else {
    saida.innerHTML = '📦 Enviamos para o seu CEP por Correios/transportadora. O frete é calculado no fechamento — é só fazer o pedido que combinamos pelo WhatsApp.';
  }
}

/* ---------- Newsletter ---------- */
function assinarNewsletter(e) {
  e.preventDefault();
  mostrarToast('Cadastro realizado! Fique de olho no seu e-mail.');
  e.target.reset();
}

/* ---------- Busca ---------- */
function irParaBusca(e) {
  e.preventDefault();
  const input = e.target.querySelector('.search__input');
  const q = (input && input.value || '').trim();
  if (q) window.location.href = 'busca.html?q=' + encodeURIComponent(q);
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

/* ---------- Dropdowns do menu (Produtos, Segmentos, Eventos) ---------- */

// Preenche o menu de "Todos os Produtos" a partir do catálogo
const menuProdutos = document.getElementById('dropdownMenu');
if (menuProdutos) {
  menuProdutos.innerHTML = Object.entries(CATALOGO).map(([slug, cat]) =>
    `<li><a href="categoria.html?cat=${slug}" class="dropdown__item ${slug === 'lancamentos' ? 'dropdown__item--new' : ''}">${cat.nome}</a></li>`
  ).join('');
}

// Preenche os menus de Segmentos e Eventos a partir de temas.js (se carregado)
if (typeof TEMAS !== 'undefined') {
  const menuSeg = document.getElementById('dropdownMenuSegmentos');
  if (menuSeg) menuSeg.innerHTML = TEMAS.segmento.lista.map((t) =>
    `<li><a href="tema.html?tipo=segmento&id=${t.slug}" class="dropdown__item">${t.nome}</a></li>`).join('');
  const menuEve = document.getElementById('dropdownMenuEventos');
  if (menuEve) menuEve.innerHTML = TEMAS.evento.lista.map((t) =>
    `<li><a href="tema.html?tipo=evento&id=${t.slug}" class="dropdown__item">${t.nome}</a></li>`).join('');
}

// Comportamento genérico: qualquer .dropdown com um .dropdown__toggle
const dropdowns = [...document.querySelectorAll('.dropdown')];

function fecharDropdowns(exceto) {
  dropdowns.forEach((d) => {
    if (d === exceto) return;
    d.classList.remove('open');
    const t = d.querySelector('.dropdown__toggle');
    if (t) t.setAttribute('aria-expanded', 'false');
  });
}

dropdowns.forEach((d) => {
  const toggle = d.querySelector('.dropdown__toggle');
  if (!toggle) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharDropdowns(d);
    const aberto = d.classList.toggle('open');
    toggle.setAttribute('aria-expanded', aberto);
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) fecharDropdowns();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharDropdowns();
});
