/* ============ Print House — painel administrativo ============
   Edita o catálogo inteiro. "Salvar e aplicar" grava no navegador
   (localStorage); "Baixar produtos.js" gera o arquivo para publicar. */

/* Senha simples de acesso (troque aqui). Atenção: isso protege apenas
   contra curiosos — o painel roda no navegador, sem servidor. */
const SENHA_PAINEL = 'printhouse';

if (sessionStorage.getItem('printhouse_admin') !== 'ok') {
  const senha = prompt('Senha do painel administrativo:');
  if (senha !== SENHA_PAINEL) {
    document.body.innerHTML = '<p style="padding:3rem;text-align:center;font-family:sans-serif">Acesso negado. <a href="index.html">Voltar ao site</a></p>';
    throw new Error('acesso negado');
  }
  sessionStorage.setItem('printhouse_admin', 'ok');
}

/* Cópia de trabalho do catálogo (produtos.js já aplicou edições salvas) */
let catalogo = JSON.parse(JSON.stringify(CATALOGO));
let slugAtual = Object.keys(catalogo)[0];
let indiceProduto = -1;

/* ---------- Utilidades ---------- */
function slugify(texto) {
  return texto.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'categoria';
}

let toastTimer;
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Render: categorias ---------- */
function renderCategorias() {
  document.getElementById('listaCategorias').innerHTML = Object.entries(catalogo).map(([slug, cat]) =>
    `<button type="button" class="${slug === slugAtual ? 'ativa' : ''}" data-slug="${slug}">${cat.nome} (${cat.produtos.length})</button>`
  ).join('');
  document.querySelectorAll('#listaCategorias button').forEach((b) => {
    b.addEventListener('click', () => {
      slugAtual = b.dataset.slug;
      indiceProduto = -1;
      renderTudo();
    });
  });
}

/* ---------- Render: categoria atual + produtos ---------- */
function renderCategoria() {
  const cat = catalogo[slugAtual];
  document.getElementById('tituloCategoria').textContent = cat.nome;
  document.getElementById('catNome').value = cat.nome;
  document.getElementById('catDescricao').value = cat.descricao || '';

  document.getElementById('listaProdutos').innerHTML = cat.produtos.map((p, i) => `
    <div class="lista-prod__item">
      <span>${p.nome}</span>
      <button type="button" data-i="${i}">Editar</button>
    </div>`).join('') || '<p class="arte-nota">Nenhum produto nesta categoria.</p>';

  document.querySelectorAll('#listaProdutos button').forEach((b) => {
    b.addEventListener('click', () => {
      indiceProduto = Number(b.dataset.i);
      renderFormProduto();
    });
  });

  document.getElementById('formProduto').style.display = indiceProduto >= 0 ? '' : 'none';
}

/* ---------- Render: formulário do produto ---------- */
function linhaVariacao(v) {
  return `
    <div class="linha-dupla">
      <input type="text" class="var-label" placeholder="Opção (ex.: 100 un)" value="${v ? v.label : ''}">
      <input type="number" class="var-preco" placeholder="Preço" step="0.01" min="0" value="${v ? v.preco : ''}">
      <button type="button" class="remover-linha">×</button>
    </div>`;
}

function renderFormProduto() {
  const p = catalogo[slugAtual].produtos[indiceProduto];
  if (!p) return;
  document.getElementById('formProduto').style.display = '';
  document.getElementById('tituloProduto').textContent = p.nome;
  document.getElementById('prodNome').value = p.nome;
  document.getElementById('prodSpec').value = p.spec || '';
  document.getElementById('prodBadge').value = p.badge || '';
  document.getElementById('prodImagem').value = p.imagem || '';

  const tipo = p.cores ? 'cores' : 'variacoes';
  document.getElementById('prodTipo').value = tipo;
  alternarEditor(tipo);

  // aviso para produtos com estruturas avançadas (combinações ou tamanhos)
  document.getElementById('avisoCombinacao').textContent = p.opcoesCombinacao
    ? 'Este produto usa lista de combinações (ex.: laser + DTF). As combinações e faixas de preço são mantidas como estão; para alterá-las, me peça no chat ou edite js/produtos.js.'
    : (p.tamanhos
      ? 'Este produto usa seleção de tamanhos (ex.: flyer). Os tamanhos e preços são mantidos como estão; para alterá-los, me peça no chat ou edite js/produtos.js.'
      : '');

  const linhas = document.getElementById('linhasVariacoes');
  linhas.innerHTML = (p.variacoes || [{ label: '', preco: '' }]).map(linhaVariacao).join('');
  ligarRemocaoLinhas();

  document.getElementById('prodPrecoUnit').value = p.precoUnitario || '';
  document.getElementById('prodMinimo').value = p.minimo || 1;
  document.getElementById('prodCores').value = (p.cores || []).join('\n');
}

function alternarEditor(tipo) {
  document.getElementById('editorVariacoes').style.display = tipo === 'variacoes' ? '' : 'none';
  document.getElementById('editorCores').style.display = tipo === 'cores' ? '' : 'none';
}

function ligarRemocaoLinhas() {
  document.querySelectorAll('#linhasVariacoes .remover-linha').forEach((b) => {
    b.addEventListener('click', () => b.closest('.linha-dupla').remove());
  });
}

function renderTudo() {
  renderCategorias();
  renderCategoria();
  if (indiceProduto >= 0) renderFormProduto();
}

/* ---------- Ações: categoria ---------- */
document.getElementById('catNome').addEventListener('change', (e) => {
  catalogo[slugAtual].nome = e.target.value.trim() || catalogo[slugAtual].nome;
  renderTudo();
});
document.getElementById('catDescricao').addEventListener('change', (e) => {
  catalogo[slugAtual].descricao = e.target.value.trim();
});

document.getElementById('btnNovaCategoria').addEventListener('click', () => {
  const nome = prompt('Nome da nova categoria:');
  if (!nome) return;
  let slug = slugify(nome);
  while (catalogo[slug]) slug += '-2';
  catalogo[slug] = { nome, banner: 'linear-gradient(120deg,#1a1a1a,#4b5563)', descricao: '', produtos: [] };
  slugAtual = slug;
  indiceProduto = -1;
  renderTudo();
  mostrarToast(`Categoria "${nome}" criada.`);
});

document.getElementById('btnExcluirCategoria').addEventListener('click', () => {
  if (Object.keys(catalogo).length <= 1) return mostrarToast('É preciso ter ao menos uma categoria.');
  const cat = catalogo[slugAtual];
  if (!confirm(`Excluir a categoria "${cat.nome}" e seus ${cat.produtos.length} produto(s) dela?`)) return;
  delete catalogo[slugAtual];
  slugAtual = Object.keys(catalogo)[0];
  indiceProduto = -1;
  renderTudo();
  mostrarToast('Categoria excluída.');
});

/* ---------- Ações: produto ---------- */
document.getElementById('btnNovoProduto').addEventListener('click', () => {
  catalogo[slugAtual].produtos.push({
    bg: 'linear-gradient(135deg,#e2e8f0,#94a3b8)',
    badge: 'Novo',
    nome: 'Novo produto',
    spec: '',
    variacoes: [{ label: '1 un', preco: 0 }],
  });
  indiceProduto = catalogo[slugAtual].produtos.length - 1;
  renderTudo();
});

document.getElementById('prodTipo').addEventListener('change', (e) => alternarEditor(e.target.value));

document.getElementById('btnAddVariacao').addEventListener('click', () => {
  document.getElementById('linhasVariacoes').insertAdjacentHTML('beforeend', linhaVariacao(null));
  ligarRemocaoLinhas();
});

document.getElementById('btnSalvarProduto').addEventListener('click', () => {
  const p = catalogo[slugAtual].produtos[indiceProduto];
  if (!p) return;
  p.nome = document.getElementById('prodNome').value.trim() || p.nome;
  p.spec = document.getElementById('prodSpec').value.trim();
  const badge = document.getElementById('prodBadge').value;
  if (badge) p.badge = badge; else delete p.badge;
  const imagem = document.getElementById('prodImagem').value.trim();
  if (imagem) p.imagem = imagem; else delete p.imagem;

  if (!p.opcoesCombinacao && !p.tamanhos) {
    const tipo = document.getElementById('prodTipo').value;
    if (tipo === 'cores') {
      p.precoUnitario = parseFloat(document.getElementById('prodPrecoUnit').value) || 0;
      p.minimo = parseInt(document.getElementById('prodMinimo').value, 10) || 1;
      p.cores = document.getElementById('prodCores').value.split('\n').map((c) => c.trim()).filter(Boolean);
      delete p.variacoes;
    } else {
      p.variacoes = [...document.querySelectorAll('#linhasVariacoes .linha-dupla')]
        .map((l) => ({
          label: l.querySelector('.var-label').value.trim(),
          preco: parseFloat(l.querySelector('.var-preco').value) || 0,
        }))
        .filter((v) => v.label);
      if (p.variacoes.length === 0) p.variacoes = [{ label: '1 un', preco: 0 }];
      delete p.cores;
      delete p.precoUnitario;
      delete p.minimo;
    }
  }

  renderTudo();
  mostrarToast(`Produto "${p.nome}" salvo. Não esqueça de "Salvar e aplicar no site".`);
});

document.getElementById('btnExcluirProduto').addEventListener('click', () => {
  const p = catalogo[slugAtual].produtos[indiceProduto];
  if (!p || !confirm(`Excluir o produto "${p.nome}" desta categoria?`)) return;
  catalogo[slugAtual].produtos.splice(indiceProduto, 1);
  indiceProduto = -1;
  renderTudo();
  mostrarToast('Produto excluído.');
});

/* ---------- Ações globais ---------- */
document.getElementById('btnSalvar').addEventListener('click', () => {
  localStorage.setItem('printhouse_catalogo', JSON.stringify({ versao: CATALOGO_VERSAO, catalogo }));
  mostrarToast('Edições salvas! O site já usa o novo catálogo neste navegador.');
});

document.getElementById('btnDescartar').addEventListener('click', () => {
  if (!confirm('Descartar todas as edições e voltar ao catálogo padrão do site?')) return;
  localStorage.removeItem('printhouse_catalogo');
  location.reload();
});

document.getElementById('btnBaixar').addEventListener('click', () => {
  const conteudo = `/* ============ Print House — catálogo de produtos ============
   Arquivo gerado pelo painel administrativo (admin.html). */

const CATALOGO_VERSAO = ${CATALOGO_VERSAO + 1};

const CATALOGO = ${JSON.stringify(catalogo, null, 2)};

/* Sobrescreve o catálogo com as edições feitas no painel administrativo
   (admin.html) — apenas se forem da versão atual do catálogo. */
try {
  const catalogoEditado = localStorage.getItem('printhouse_catalogo');
  if (catalogoEditado) {
    const dados = JSON.parse(catalogoEditado);
    if (dados && dados.versao === CATALOGO_VERSAO && dados.catalogo && typeof dados.catalogo === 'object') {
      Object.keys(CATALOGO).forEach((k) => delete CATALOGO[k]);
      Object.assign(CATALOGO, dados.catalogo);
    } else {
      localStorage.removeItem('printhouse_catalogo');
    }
  }
} catch (e) { /* mantém o catálogo padrão */ }
`;
  const blob = new Blob([conteudo], { type: 'text/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'produtos.js';
  a.click();
  URL.revokeObjectURL(a.href);
  mostrarToast('produtos.js baixado — suba na pasta js/ do GitHub para publicar.');
});

renderTudo();
