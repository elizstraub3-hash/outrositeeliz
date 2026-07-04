/* ============ GrafiPrint — interações da página ============ */

/* ---------- Dados dos produtos (troque pelos seus produtos reais) ---------- */
const maisVendidos = [
  { emoji: '💼', bg: 'linear-gradient(135deg,#fde68a,#f59e0b)', badge: 'Mais vendido', nome: 'Cartão de Visita', spec: 'Couchê 300g · 4x4 cores · 1.000 un', nota: '4.9', avaliacoes: 2314, preco: '39,90' },
  { emoji: '📄', bg: 'linear-gradient(135deg,#bfdbfe,#3b82f6)', badge: 'Mais vendido', nome: 'Panfleto A5', spec: 'Couchê 115g · 4x4 cores · 2.500 un', nota: '4.8', avaliacoes: 1876, preco: '129,90' },
  { emoji: '🏷️', bg: 'linear-gradient(135deg,#bbf7d0,#22c55e)', badge: 'Oferta', nome: 'Adesivo Vinil', spec: 'Recorte especial · 500 un', nota: '4.9', avaliacoes: 1542, preco: '89,90' },
  { emoji: '🥤', bg: 'linear-gradient(135deg,#fbcfe8,#ec4899)', badge: 'Mais vendido', nome: 'Copo Personalizado', spec: 'Long drink 350ml · 50 un', nota: '4.7', avaliacoes: 987, preco: '149,90' },
];

const lancamentos = [
  { emoji: '👕', bg: 'linear-gradient(135deg,#ddd6fe,#8b5cf6)', badge: 'Novo', nome: 'Camiseta DTF UV', spec: 'Algodão premium · a partir de 10 un', nota: '5.0', avaliacoes: 132, preco: '34,90' },
  { emoji: '📦', bg: 'linear-gradient(135deg,#fed7aa,#f97316)', badge: 'Novo', nome: 'Caixa Delivery', spec: 'Papel kraft · impressão 1 cor · 100 un', nota: '4.9', avaliacoes: 214, preco: '189,90' },
  { emoji: '🪧', bg: 'linear-gradient(135deg,#a5f3fc,#06b6d4)', badge: 'Novo', nome: 'Banner em Lona', spec: '440g · com ilhós · 80x120cm', nota: '4.8', avaliacoes: 356, preco: '79,90' },
  { emoji: '🎁', bg: 'linear-gradient(135deg,#fecaca,#ef4444)', badge: 'Novo', nome: 'Ecobag Personalizada', spec: 'Algodão cru · serigrafia · 50 un', nota: '4.9', avaliacoes: 178, preco: '299,90' },
];

const categorias = [
  { emoji: '💼', nome: 'Cartões de Visita' },
  { emoji: '📄', nome: 'Panfletos' },
  { emoji: '🏷️', nome: 'Adesivos' },
  { emoji: '🎁', nome: 'Brindes' },
  { emoji: '📦', nome: 'Embalagens' },
  { emoji: '🪧', nome: 'Ponto de Venda' },
];

const posts = [
  { emoji: '🎨', bg: 'linear-gradient(135deg,#fde68a,#fb923c)', tag: 'Dicas de design', titulo: 'Como criar um cartão de visita que impressiona', resumo: 'Confira 7 dicas práticas para o seu cartão se destacar e gerar mais contatos.' },
  { emoji: '📈', bg: 'linear-gradient(135deg,#bfdbfe,#60a5fa)', tag: 'Marketing', titulo: 'Panfletagem ainda funciona? Veja os dados', resumo: 'Estudos mostram que o impresso continua entre os canais com melhor custo-benefício.' },
  { emoji: '🖨️', bg: 'linear-gradient(135deg,#bbf7d0,#4ade80)', tag: 'Novidades', titulo: 'DTF UV: a nova era da personalização', resumo: 'Entenda como a impressão DTF UV permite personalizar praticamente qualquer superfície.' },
];

/* ---------- Renderização ---------- */
function cardProduto(p) {
  return `
    <article class="product-card">
      <div class="product-card__img" style="background:${p.bg}">
        <span class="product-card__badge ${p.badge === 'Novo' ? 'product-card__badge--new' : ''}">${p.badge}</span>
        ${p.emoji}
      </div>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.nome}</h3>
        <p class="product-card__spec">${p.spec}</p>
        <p class="product-card__rating">★★★★★ ${p.nota} <span>(${p.avaliacoes.toLocaleString('pt-BR')} avaliações)</span></p>
        <div class="product-card__price">
          <small>a partir de</small>
          <strong>R$ ${p.preco}</strong>
        </div>
        <button class="product-card__btn" onclick="adicionarAoCarrinho('${p.nome}')">Adicionar ao carrinho</button>
      </div>
    </article>`;
}

document.getElementById('maisVendidos').innerHTML = maisVendidos.map(cardProduto).join('');
document.getElementById('produtosLancamentos').innerHTML = lancamentos.map(cardProduto).join('');

document.getElementById('categorias').innerHTML = categorias.map(c => `
  <div class="category-card">
    <div class="category-card__icon">${c.emoji}</div>
    <div class="category-card__name">${c.nome}</div>
  </div>`).join('');

document.getElementById('blogPosts').innerHTML = posts.map(p => `
  <article class="blog-card">
    <div class="blog-card__img" style="background:${p.bg}">${p.emoji}</div>
    <div class="blog-card__body">
      <span class="blog-card__tag">${p.tag}</span>
      <h3 class="blog-card__title">${p.titulo}</h3>
      <p class="blog-card__excerpt">${p.resumo}</p>
    </div>
  </article>`).join('');

/* ---------- Carrossel do hero ---------- */
const track = document.getElementById('heroTrack');
const slides = track.children.length;
const dotsWrap = document.getElementById('heroDots');
let slideAtual = 0;
let autoplay;

for (let i = 0; i < slides; i++) {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
  dot.addEventListener('click', () => irParaSlide(i));
  dotsWrap.appendChild(dot);
}

function irParaSlide(i) {
  slideAtual = (i + slides) % slides;
  track.style.transform = `translateX(-${slideAtual * 100}%)`;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === slideAtual));
  reiniciarAutoplay();
}

function reiniciarAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => irParaSlide(slideAtual + 1), 5000);
}

document.getElementById('heroPrev').addEventListener('click', () => irParaSlide(slideAtual - 1));
document.getElementById('heroNext').addEventListener('click', () => irParaSlide(slideAtual + 1));
irParaSlide(0);

/* ---------- Carrinho ---------- */
let itensCarrinho = 0;
function adicionarAoCarrinho(nome) {
  itensCarrinho++;
  document.getElementById('cartCount').textContent = itensCarrinho;
  mostrarToast(`✅ ${nome} adicionado ao carrinho!`);
}

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
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Menu mobile ---------- */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});
