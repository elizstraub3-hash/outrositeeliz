# Print House — Site estilo gráfica online

Site institucional/e-commerce inspirado no layout da GIV Online (gráfica online brasileira), construído com HTML, CSS e JavaScript puros — sem dependências, sem build.

## Como visualizar

Abra o arquivo `index.html` diretamente no navegador, ou rode um servidor local:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Estrutura

```
index.html      → página principal (todas as seções)
categoria.html  → página de categoria (recebe ?cat=slug na URL)
css/style.css   → estilos e responsividade
js/produtos.js  → catálogo: categorias, produtos e variações (edite aqui!)
js/loja.js      → lógica compartilhada: cards, variações, carrinho, dropdown
js/main.js      → específico da home: vitrines, carrossel, blog
js/categoria.js → específico da página de categoria
```

## Páginas de categoria

Cada categoria abre em sua própria página: `categoria.html?cat=cartoes-de-visita`,
`categoria.html?cat=panfletos`, `categoria.html?cat=adesivos`, `categoria.html?cat=brindes`,
`categoria.html?cat=embalagens`, `categoria.html?cat=ponto-de-venda`,
`categoria.html?cat=copos`, `categoria.html?cat=gravacao-a-laser` e
`categoria.html?cat=lancamentos`.

Um produto pode aparecer em mais de uma categoria: defina-o uma vez como
constante no topo de `js/produtos.js` e referencie nas categorias desejadas.

Os cards são compactos: as opções abrem numa janela ao clicar em "Comprar".
Há três formatos de produto no catálogo (`js/produtos.js`):

- `variacoes`: pacotes fixos (ex.: 100/500/1.000 un) — a janela lista as opções;
- `cores` + `precoUnitario` + `minimo`: dropdown de cor e quantidade com pedido
  mínimo (ex.: chaveiro a R$ 2,50/un, mínimo 25);
- `opcoesCombinacao`: o cliente escolhe a quantidade de cada personalização,
  com faixas de preço por quantidade total (ex.: Copo Cuia laser/DTF).

## Seções da página

- Barra de promoção com cupom de desconto
- Cabeçalho fixo com busca, login e carrinho
- Menu de categorias
- Carrossel de banners (autoplay)
- Faixa de benefícios (entrega, pagamento, qualidade, atendimento)
- Vitrine "Os mais vendidos"
- Grade de categorias
- Vitrine "Últimos lançamentos"
- Seção institucional com estatísticas
- Blog "Fique por dentro"
- Newsletter
- Rodapé completo com formas de pagamento
- Botão flutuante de WhatsApp

## Personalização

- **Produtos e textos:** edite as listas no início de `js/main.js`.
- **Cores:** altere as variáveis em `:root` no `css/style.css` (a cor principal é `--primary`).
- **Nome/logotipo:** procure por "Print House" no `index.html`.
- **Imagens reais:** substitua os emojis dos cards por `<img>` com fotos dos seus produtos.
