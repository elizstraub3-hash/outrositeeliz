/* ============ Print House — página inicial ============ */

/* ---------- Vitrine "Os mais vendidos" (produtos em destaque de cada categoria) ---------- */
const destaques = [];
const jaListados = new Set();
for (const [slug, cat] of Object.entries(CATALOGO)) {
  cat.produtos.forEach((p) => {
    if (p.destaque && !jaListados.has(p.nome)) {
      jaListados.add(p.nome);
      destaques.push([p, slug]);
    }
  });
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
