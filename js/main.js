/* ============ Print House — página inicial ============ */

/* ---------- Vitrine "Os mais vendidos" (mesma lista curada do "Ver todos") ---------- */
const nomesMaisVendidos = (typeof COLECOES !== 'undefined' && COLECOES['mais-vendidos'].produtos) || [];
document.getElementById('maisVendidos').innerHTML = cardsPorNomes(nomesMaisVendidos.slice(0, 4));

/* ---------- Vitrine "Últimos lançamentos" ---------- */
document.getElementById('produtosLancamentos').innerHTML =
  CATALOGO['lancamentos'].produtos.map((p) => cardProduto(p, 'lancamentos')).join('');

/* ---------- Vitrine "Serviços Digitais & Online" ---------- */
const secaoDigitais = document.getElementById('produtosDigitais');
if (secaoDigitais) {
  const online = (CATALOGO['servicos-online'] && CATALOGO['servicos-online'].produtos.map((p) => [p, 'servicos-online'])) || [];
  const digitais = (CATALOGO['servicos-digitais'] && CATALOGO['servicos-digitais'].produtos.map((p) => [p, 'servicos-digitais'])) || [];
  secaoDigitais.innerHTML = [...online, ...digitais].slice(0, 4).map(([p, cat]) => cardProduto(p, cat)).join('');
}

/* ---------- Vitrine "Impressão Rápida & Balcão" ---------- */
const secaoImpressao = document.getElementById('produtosImpressaoRapida');
if (secaoImpressao && CATALOGO['grafica-rapida']) {
  secaoImpressao.innerHTML = CATALOGO['grafica-rapida'].produtos
    .slice(0, 4)
    .map((p) => cardProduto(p, 'grafica-rapida')).join('');
}

/* ---------- Categorias em dropdown (cada uma abre sua própria página) ---------- */
(function () {
  const wrap = document.getElementById('categorias');
  if (!wrap) return;
  const cats = Object.entries(CATALOGO).filter(([slug]) => slug !== 'lancamentos');
  wrap.innerHTML = `
    <div class="cat-dd" id="catDd">
      <button type="button" class="cat-dd__btn" aria-expanded="false" aria-haspopup="true">
        <span>Escolha uma categoria</span>
        <span class="cat-dd__arrow">▾</span>
      </button>
      <div class="cat-dd__menu">
        ${cats.map(([slug, cat]) => `<a class="cat-dd__item" href="categoria.html?cat=${slug}">${cat.emoji ? cat.emoji + ' ' : ''}${cat.nome}</a>`).join('')}
      </div>
    </div>`;
  const dd = wrap.querySelector('#catDd');
  const btn = dd.querySelector('.cat-dd__btn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();

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

/* ---------- Benefícios: marquee lateral no mobile (2 por vez, sem bolinhas) ---------- */
(function () {
  const grid = document.getElementById('benefitsGrid');
  if (!grid) return;
  // Duplica os itens uma vez para o loop contínuo do marquee (animação em CSS no mobile).
  // As cópias ficam ocultas no desktop via .benefit--clone.
  [...grid.children].forEach((el) => {
    const clone = el.cloneNode(true);
    clone.classList.add('benefit--clone');
    clone.setAttribute('aria-hidden', 'true');
    grid.appendChild(clone);
  });
})();
