/* ============ Print House — página inicial ============ */

/* ---------- Vitrine "Os mais vendidos" (mesma lista curada do "Ver todos") ---------- */
const nomesMaisVendidos = (typeof COLECOES !== 'undefined' && COLECOES['mais-vendidos'].produtos) || [];
document.getElementById('maisVendidos').innerHTML = cardsPorNomes(nomesMaisVendidos.slice(0, 4));

/* ---------- Vitrine "Últimos lançamentos" ---------- */
document.getElementById('produtosLancamentos').innerHTML =
  CATALOGO['lancamentos'].produtos.map((p) => cardProduto(p, 'lancamentos')).join('');

/* ---------- Vitrine "Especial Dia dos Pais" ---------- */
const secaoPais = document.getElementById('dia-dos-pais');
const nomesPais = (typeof PRODUTOS_TEMA !== 'undefined' && PRODUTOS_TEMA['dia-dos-pais']) || [];
if (nomesPais.length) {
  document.getElementById('produtosDiaDosPais').innerHTML = cardsPorNomes(nomesPais);
} else if (secaoPais) {
  secaoPais.remove();
}

/* ---------- Vitrine "Impressão Rápida & Balcão" ---------- */
const secaoImpressao = document.getElementById('produtosImpressaoRapida');
if (secaoImpressao && CATALOGO['grafica-rapida']) {
  secaoImpressao.innerHTML = CATALOGO['grafica-rapida'].produtos
    .slice(0, 4)
    .map((p) => cardProduto(p, 'grafica-rapida')).join('');
}

/* ---------- Grade de categorias (cada uma abre sua própria página) ---------- */
document.getElementById('categorias').innerHTML =
  Object.entries(CATALOGO)
    .filter(([slug]) => slug !== 'lancamentos')
    .map(([slug, cat]) => `
      <a class="category-card" href="categoria.html?cat=${slug}">
        <div class="category-card__name">${cat.nome}</div>
      </a>`).join('');

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

/* ---------- Carrossel automático dos benefícios (mobile) ---------- */
(function () {
  const grid = document.getElementById('benefitsGrid');
  const dotsWrap = document.getElementById('benefitsDots');
  if (!grid || !dotsWrap) return;
  const itens = [...grid.children];
  itens.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'benefits__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Benefício ${i + 1}`);
    dot.addEventListener('click', () => grid.scrollTo({ left: grid.clientWidth * i, behavior: 'smooth' }));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];
  grid.addEventListener('scroll', () => {
    const i = Math.round(grid.scrollLeft / grid.clientWidth);
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  });
  const mq = window.matchMedia('(max-width: 640px)');
  let timer;
  function autoplayBenefits() {
    clearInterval(timer);
    if (!mq.matches) return;
    timer = setInterval(() => {
      const atual = Math.round(grid.scrollLeft / grid.clientWidth);
      const prox = (atual + 1) % itens.length;
      grid.scrollTo({ left: grid.clientWidth * prox, behavior: 'smooth' });
    }, 4000);
  }
  if (mq.addEventListener) mq.addEventListener('change', autoplayBenefits);
  autoplayBenefits();
})();
