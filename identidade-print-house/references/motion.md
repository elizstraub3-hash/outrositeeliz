# Print House — elementos para abertura em motion

## Arquivos

- `assets/logo/logo-aprovada.png`: referência original com fundo claro.
- `assets/logo/logo-transparente.png`: marca completa sem fundo, 1254 × 1254 px.
- `assets/motion/print-house-camadas.svg`: 11 camadas nomeadas com recortes da imagem transparente incorporada. Abrir no Inkscape ou em editor compatível com SVG. Trata-se de raster em camadas, não de contornos vetoriais editáveis.
- `assets/motion/png/`: 11 PNGs com transparência e o mesmo canvas. Importar como imagens individuais no editor de vídeo.

## Camadas

| Arquivo | Elemento |
| --- | --- |
| 01-p-com-detalhes.png | p com suas marcações coloridas |
| 02-r.png | r |
| 03-i-caneta.png | caneta que forma o i |
| 04-i-ponto.png | ponto do i |
| 05-n.png | n |
| 06-t.png | t |
| 07-h.png | h |
| 08-o.png | o |
| 09-u.png | u |
| 10-s.png | s |
| 11-e-com-detalhes.png | e com suas marcações coloridas |

Todas as camadas mantêm a posição original. Sobrepor com a mesma escala e centro para montar a marca. Não usar recorte automático individual ao importar. Os detalhes de p/e permanecem junto das letras para preservar o desenho; não há hastes ou nós separados para morphing.

## Roteiro sugerido — 4 segundos

| Tempo | Ação |
| --- | --- |
| 0–0,5 s | A caneta aparece com deslocamento curto e suave. |
| 0,35–0,7 s | O ponto do i entra e se acomoda, sem deformação. |
| 0,5–1,4 s | As outras letras de print surgem em sequência com fade e leve subida. |
| 1–1,8 s | As letras de house acompanham, da esquerda para a direita. |
| 1,8–4 s | Marca completa permanece imóvel e legível. |

Usar fundo claro. Agrupar a composição completa antes de adaptar para 1920 × 1080 ou 1080 × 1920, mantendo a proporção; evitar ampliar o conjunto além de 1254 px de lado sem uma versão de maior resolução. Exportar vídeo no formato necessário ao canal. Este material contém os elementos e uma prévia HTML da animação; não contém um vídeo MP4 final.

## Preparação

Extração do fundo feita com o gerador de imagens integrado, a partir da logo aprovada. Instrução: remover apenas o fundo e manter tipografia, layout, caneta e marcações p/e, incluindo transparência nos vazados. Separação feita com recortes SVG e exportação de camadas. Manter a referência original ao fazer revisões futuras.
