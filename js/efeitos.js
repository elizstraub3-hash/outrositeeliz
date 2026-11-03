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

/* ============ Print House — clima de Natal 🎄 ============ */
/* Decoração leve: árvores nos cantos, Papai Noel voando e neve.
   Overlay com pointer-events:none (nunca bloqueia cliques) e z-index
   abaixo do menu/botões. Respeita prefers-reduced-motion. */
(function () {
  try {
    if (document.getElementById('natal-overlay')) return;
    var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var css = ''
      + '#natal-overlay{position:fixed;inset:0;z-index:40;pointer-events:none;overflow:hidden}'
      + '.natal-flake{position:absolute;top:-6vh;color:#cfe3f5;opacity:.8;'
      +   'text-shadow:0 1px 2px rgba(80,120,170,.25);will-change:transform;'
      +   'animation:natal-cair linear infinite}'
      + '@keyframes natal-cair{0%{transform:translateY(-6vh) rotate(0)}'
      +   '100%{transform:translateY(112vh) rotate(360deg)}}'
      + '.natal-voa{position:absolute;left:0;font-size:2.2rem;line-height:1;white-space:nowrap;'
      +   'filter:drop-shadow(0 4px 6px rgba(0,0,0,.2));will-change:transform;'
      +   'animation:natal-voar linear infinite}'
      + '@keyframes natal-voar{0%{transform:translateX(-30vw) translateY(0)}'
      +   '50%{transform:translateX(50vw) translateY(-22px)}'
      +   '100%{transform:translateX(130vw) translateY(0)}}'
      + '.natal-arvore{position:fixed;bottom:6px;font-size:2.4rem;line-height:1;opacity:.92;'
      +   'transform-origin:bottom center;filter:drop-shadow(0 3px 4px rgba(0,0,0,.18));'
      +   'animation:natal-balanca 4s ease-in-out infinite}'
      + '.natal-arvore--esq{left:10px}.natal-arvore--dir{right:10px}'
      + '@keyframes natal-balanca{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}'
      + '@media (max-width:600px){.natal-voa{font-size:1.7rem}.natal-arvore{font-size:1.9rem}}';
    var st = document.createElement('style');
    st.id = 'natal-style';
    st.textContent = css;
    document.head.appendChild(st);

    var ov = document.createElement('div');
    ov.id = 'natal-overlay';
    ov.setAttribute('aria-hidden', 'true');

    // Árvores nos cantos de baixo (sempre, mesmo com movimento reduzido)
    ['esq', 'dir'].forEach(function (lado) {
      var t = document.createElement('span');
      t.className = 'natal-arvore natal-arvore--' + lado;
      t.textContent = '🎄';
      if (reduz) t.style.animation = 'none';
      ov.appendChild(t);
    });

    if (!reduz) {
      // Neve leve
      var flocos = ['❄', '❅', '❆', '•'];
      for (var i = 0; i < 16; i++) {
        var f = document.createElement('span');
        f.className = 'natal-flake';
        f.textContent = flocos[i % flocos.length];
        f.style.left = Math.round(Math.random() * 100) + 'vw';
        f.style.fontSize = (0.6 + Math.random() * 0.8).toFixed(2) + 'rem';
        var dur = 8 + Math.random() * 9;
        f.style.animationDuration = dur.toFixed(1) + 's';
        f.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
        f.style.opacity = (0.5 + Math.random() * 0.4).toFixed(2);
        ov.appendChild(f);
      }
      // Papai Noel voando (trenós em alturas e velocidades diferentes)
      var voos = [
        { txt: '🎅🛷', top: '11%', dur: 19, delay: 0 },
        { txt: '🦌🛷🎅', top: '20%', dur: 27, delay: -11 }
      ];
      voos.forEach(function (v) {
        var s = document.createElement('span');
        s.className = 'natal-voa';
        s.textContent = v.txt;
        s.style.top = v.top;
        s.style.animationDuration = v.dur + 's';
        s.style.animationDelay = v.delay + 's';
        ov.appendChild(s);
      });
    }

    (document.body || document.documentElement).appendChild(ov);
  } catch (err) { /* decoração nunca pode quebrar a página */ }
})();
