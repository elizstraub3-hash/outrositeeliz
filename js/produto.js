/* ============ Print House — página de produto ============ */

const idProduto = new URLSearchParams(window.location.search).get('id');
const prod = encontrarProdutoPorSlug(idProduto);

if (!prod) {
  document.querySelector('.prod .container').innerHTML =
    '<p style="padding:2rem 0">Produto não encontrado. <a href="index.html" class="arte-link">Voltar ao início</a></p>';
} else {
  // categoria a que pertence (para o breadcrumb)
  let catSlug = 'cartoes-de-visita';
  for (const [s, c] of Object.entries(CATALOGO)) {
    if (c.produtos.includes(prod)) { catSlug = s; break; }
  }

  document.title = `${prod.nome} | Print House`;
  document.getElementById('prodCrumb').textContent = prod.nome;
  const catLink = document.getElementById('prodCatLink');
  catLink.textContent = CATALOGO[catSlug].nome;
  catLink.href = `categoria.html?cat=${catSlug}`;

  const foto = document.getElementById('prodFoto');
  foto.style.background = prod.bg;
  foto.innerHTML = prod.imagem ? `<img src="${prod.imagem}" alt="${prod.nome}">` : ICONE_PRODUTO;
  if (prod.imagem) {
    foto.style.cursor = 'zoom-in';
    foto.addEventListener('click', () => abrirLightbox(prod.imagem, prod.nome));
  }

  document.getElementById('prodNome').textContent = prod.nome;
  document.getElementById('prodSpec').textContent = prod.spec;

  // menor preço
  let menor;
  if (prod.tamanhos) menor = menorPrecoTamanhos(prod);
  else if (prod.opcoesCombinacao) menor = menorPrecoCombinacao(prod);
  else if (prod.cores) menor = prod.precoUnitario;
  else menor = prod.variacoes[0].preco;
  document.getElementById('prodPreco').textContent = `R$ ${formatarPreco(menor)}`;

  document.getElementById('prodPrazo').innerHTML =
    `<span>Previsão de produção: ${prod.prazoTexto || `até ${prod.prazo || 5} dias úteis`}</span>
     <small>* Prazo informado refere-se apenas à produção. O tempo de entrega será adicionado após a finalização.</small>`;

  if (prod.descricao) document.getElementById('prodDesc').textContent = prod.descricao;

  // botão comprar abre a janela certa
  document.getElementById('prodComprar').addEventListener('click', () => {
    if (prod.distribuirTamanhos) abrirTamanhosDistribuir(prod);
    else if (prod.opcoesCombinacao) abrirCombinacoes(prod);
    else if (prod.tamanhos) abrirTamanhos(prod);
    else if (prod.cores) abrirCores(prod);
    else abrirVariacoes(prod);
  });

  // parágrafos de detalhes
  if (prod.detalhes && prod.detalhes.length) {
    document.getElementById('prodDetalhes').innerHTML =
      '<h2>Sobre o produto</h2>' + prod.detalhes.map((d) => `<p>${d}</p>`).join('');
  }

  // tabela de medidas (imagem) — some se o arquivo ainda não existir
  if (prod.medidas) {
    const wrap = document.getElementById('prodMedidasWrap');
    const img = document.getElementById('prodMedidas');
    img.onload = () => { wrap.style.display = ''; };
    img.onerror = () => { wrap.style.display = 'none'; };
    img.src = prod.medidas;
  }

  // FAQ
  if (prod.faq && prod.faq.length) {
    document.getElementById('prodFaqWrap').style.display = '';
    document.getElementById('prodFaq').innerHTML = prod.faq.map((f) => `
      <details class="faq-item">
        <summary>${f.p}</summary>
        <p>${f.r}</p>
      </details>`).join('');
  }
}
