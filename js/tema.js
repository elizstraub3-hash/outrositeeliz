/* ============ Print House — página individual de segmento/evento ============ */

const paramsTemaInd = new URLSearchParams(window.location.search);
const tipoInd = TEMAS[paramsTemaInd.get('tipo')] ? paramsTemaInd.get('tipo') : 'segmento';
const dadosInd = TEMAS[tipoInd];
const idInd = paramsTemaInd.get('id');
const item = dadosInd.lista.find((t) => t.slug === idInd) || dadosInd.lista[0];

document.title = `${item.nome} | Print House`;
document.getElementById('temaHero').style.background = dadosInd.banner;
document.getElementById('temaBreadcrumb').textContent = item.nome;
document.getElementById('temaTitulo').textContent = item.nome;
document.getElementById('temaNome').textContent = item.nome;

const voltar = document.getElementById('temaVoltar');
voltar.textContent = dadosInd.titulo;
voltar.href = `temas.html?tipo=${tipoInd}`;
