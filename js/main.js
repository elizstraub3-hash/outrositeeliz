/* ============ GrafiPrint — página inicial ============ */

/* ---------- Vitrine "Os mais vendidos" (produtos em destaque de cada categoria) ---------- */
const destaques = [];
for (const [slug, cat] of Object.entries(CATALOGO)) {
  cat.produtos.forEach((p) => { if (p.destaque) destaques.push([p, slug]); });
}
document.getElementById('maisVendidos').innerHTML =
  destaques.slice(0, 4).map(([p, slug]) => cardProduto(p, slug)).join('');

/* ---------- Vitrine "Últimos lançamentos" ---------- */
document.getElementById('produtosLancamentos').innerHTML =
  CATALOGO['lancamentos'].produtos.map((p) => cardProduto(p, 'lancamentos')).join('');

/* ---------- Grade de categorias (cada uma abre sua própria página) ---------- */
document.getElementById('categorias').innerHTML =
  Object.entries(CATALOGO)
    .filter(([slug]) => slug !== 'lancamentos')
    .map(([slug, cat]) => `
      <a class="category-card" href="categoria.html?cat=${slug}">
        <div class="category-card__icon">${cat.emoji}</div>
        <div class="category-card__name">${cat.nome}</div>
      </a>`).join('');

/* ---------- Blog ---------- */
const posts = [
  { emoji: '🎨', bg: 'linear-gradient(135deg,#fde68a,#fb923c)', tag: 'Dicas de design', titulo: 'Como criar um cartão de visita que impressiona', resumo: 'Confira 7 dicas práticas para o seu cartão se destacar e gerar mais contatos.' },
  { emoji: '📈', bg: 'linear-gradient(135deg,#bfdbfe,#60a5fa)', tag: 'Marketing', titulo: 'Panfletagem ainda funciona? Veja os dados', resumo: 'Estudos mostram que o impresso continua entre os canais com melhor custo-benefício.' },
  { emoji: '🖨️', bg: 'linear-gradient(135deg,#bbf7d0,#4ade80)', tag: 'Novidades', titulo: 'DTF UV: a nova era da personalização', resumo: 'Entenda como a impressão DTF UV permite personalizar praticamente qualquer superfície.' },
];

document.getElementById('blogPosts').innerHTML = posts.map((p) => `
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
