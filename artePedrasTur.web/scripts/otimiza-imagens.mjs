// Converte as imagens de "imagens-originais/" para WebP redimensionado em
// "public/images/" — a pasta que o Vite copia pro dist e o Caddy serve.
//
// Motivo: as fotos dos guias estavam versionadas como PNG de 1536x1024
// (~3 MB cada) e exibidas num card de ~400px. PNG é sem perdas, feito pra
// logo e print; pra fotografia gasta de 5 a 15x mais bytes que WebP com
// qualidade visualmente equivalente. A página /passeios baixava 30,7 MB.
//
// Os originais ficam fora de "public/" de propósito: assim não entram no
// dist nem na imagem de produção, mas seguem versionados, o que mantém a
// conversão reproduzível (dá pra mudar qualidade/largura e rodar de novo).
//
// Uso: npm run otimiza-imagens

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ORIGINAIS = 'imagens-originais';
const DESTINO = 'public/images';
const LARGURA_PADRAO = 1200; // cards do carrossel têm ~400px; 1200 cobre telas retina
const QUALIDADE = 80;

// Exceções: imagens usadas como fundo de largura total precisam de mais pixels
// que um card de carrossel.
const LARGURAS = {
  'imagem-fundo-sobrenos.png': 1920,
};

const EXTENSOES = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const mb = (b) => (b / 1e6).toFixed(2);

await mkdir(DESTINO, { recursive: true });

const arquivos = (await readdir(ORIGINAIS)).filter((f) =>
  EXTENSOES.has(path.extname(f).toLowerCase()),
);

let totalAntes = 0;
let totalDepois = 0;
const linhas = [];

for (const arquivo of arquivos) {
  const origem = path.join(ORIGINAIS, arquivo);
  const saida = path.join(DESTINO, `${path.basename(arquivo, path.extname(arquivo))}.webp`);
  const largura = LARGURAS[arquivo] ?? LARGURA_PADRAO;

  const antes = (await stat(origem)).size;
  // withoutEnlargement: imagem menor que o limite não é esticada (só perderia
  // qualidade sem economizar nada).
  await sharp(origem)
    .resize({ width: largura, withoutEnlargement: true })
    .webp({ quality: QUALIDADE, effort: 5 })
    .toFile(saida);
  const depois = (await stat(saida)).size;

  totalAntes += antes;
  totalDepois += depois;
  linhas.push({ arquivo, antes, depois });
}

// O favicon era o logo em tamanho cheio (450 KB) para um ícone de 16px. Gerado
// aqui em PNG (não WebP) porque é o formato que todo navegador aceita como
// favicon sem ressalvas, e porque o logo tem transparência.
const faviconOrigem = path.join(ORIGINAIS, 'logo-arte-pedras.png');
await sharp(faviconOrigem).resize({ width: 64 }).png({ compressionLevel: 9 }).toFile('public/favicon.png');
const favicon = (await stat('public/favicon.png')).size;
console.log(`favicon: ${(await stat(faviconOrigem)).size / 1024} KB -> ${(favicon / 1024).toFixed(1)} KB
`);

linhas.sort((a, b) => b.antes - a.antes);
console.log(`${linhas.length} imagens convertidas (as 5 maiores):\n`);
for (const { arquivo, antes, depois } of linhas.slice(0, 5)) {
  console.log(
    `  ${arquivo.padEnd(28)} ${(antes / 1024).toFixed(0).padStart(5)} KB -> ` +
      `${(depois / 1024).toFixed(0).padStart(4)} KB`,
  );
}
console.log(
  `\ntotal: ${mb(totalAntes)} MB -> ${mb(totalDepois)} MB ` +
    `(${(totalAntes / totalDepois).toFixed(1)}x menor)`,
);
