/* ============ Print House — listagem de segmentos/eventos ============ */

const paramsTema = new URLSearchParams(window.location.search);
const tipoTema = TEMAS[paramsTema.get('tipo')] ? paramsTema.get('tipo') : 'segmento';
const dadosTema = TEMAS[tipoTema];

document.title = `${dadosTema.titulo} | Print House`;
document.getElementById('temaHero').style.background = dadosTema.banner;
document.getElementById('temaBreadcrumb').textContent = dadosTema.titulo;
document.getElementById('temaTitulo').textContent = dadosTema.titulo;
document.getElementById('temaDescricao').textContent = dadosTema.descricao;

document.getElementById('temaLista').innerHTML = dadosTema.lista.map((item) => `
  <a class="category-card" href="tema.html?tipo=${tipoTema}&id=${item.slug}">
    <div class="category-card__name">${item.nome}</div>
    <div class="category-card__tag">Em breve</div>
  </a>`).join('');
