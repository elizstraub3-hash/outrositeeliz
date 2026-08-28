/* ============ Print House — efeitos visuais ============ */
/* Aparecer ao rolar (scroll reveal) com IntersectionObserver.
   As classes são adicionadas via JS: se o JS não rodar, nada fica escondido. */
(function () {
  try {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var seletores = [
      '.product-card', '.category-card', '.depoimento', '.benefit',
      '.galeria__item', '.destaque', '.orcamento-cta', '.loja__info',
      '.loja__mapa', '.about__text', '.about__stats', '.section__head',
      '.regras h2', '.regras h3'
    ];
    var els = Array.prototype.slice.call(document.querySelectorAll(seletores.join(',')));
    if (!els.length) return;

    els.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 6) * 60) + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  } catch (err) { /* silencioso: nunca esconder conteúdo por causa de efeito */ }
})();
