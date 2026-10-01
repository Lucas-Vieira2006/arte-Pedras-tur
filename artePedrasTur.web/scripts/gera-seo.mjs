// Gera os artefatos de SEO a partir dos dados reais do catálogo:
//
//   public/sitemap.xml   — as 16 URLs públicas do site
//   public/og/*.jpg      — imagens de compartilhamento (Open Graph), 1200x630
//
// Derivar do PasseioService.js em vez de escrever à mão é o que impede o
// sitemap de desatualizar silenciosamente quando um guia novo for adicionado.
//
// As imagens de compartilhamento ficam em JPEG, não WebP: o WhatsApp — por onde
// esses links circulam — nem sempre gera prévia a partir de WebP.
//
// Uso: npm run gera-seo

import sharp from 'sharp';
import { readFile, readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://artepedrastur.com.br';
const ORIGINAIS = 'imagens-originais';
const DESTINO_OG = 'public/og';
const FONTE_PADRAO = 'Cataratas1';

// Rotas fixas, com a prioridade relativa que cada uma tem no site. /login e
// /admin ficam de fora de propósito (ver robots.txt).
const ROTAS_FIXAS = [
  { caminho: '/', prioridade: '1.0', frequencia: 'weekly' },
  { caminho: '/passeios', prioridade: '0.9', frequencia: 'weekly' },
  { caminho: '/sobre', prioridade: '0.5', frequencia: 'monthly' },
];

const fonte = await readFile('src/services/PasseioService.js', 'utf8');

// Cada bloco de passeio, na ordem do arquivo, com o slug e a primeira imagem.
const passeios = [...fonte.matchAll(/slug:\s*'([^']+)'[\s\S]*?imagens:\s*\[\s*"\/images\/([^"]+)"/g)].map(
  ([, slug, primeiraImagem]) => ({ slug, primeiraImagem }),
);

if (passeios.length === 0) {
  throw new Error('Nenhum passeio encontrado em PasseioService.js — o formato do arquivo mudou?');
}

// ---------- sitemap.xml ----------

const hoje = new Date().toISOString().slice(0, 10);
const url = (caminho, prioridade, frequencia) =>
  `  <url>\n    <loc>${SITE}${caminho}</loc>\n    <lastmod>${hoje}</lastmod>\n` +
  `    <changefreq>${frequencia}</changefreq>\n    <priority>${prioridade}</priority>\n  </url>`;

const entradas = [
  ...ROTAS_FIXAS.map((r) => url(r.caminho, r.prioridade, r.frequencia)),
  ...passeios.map((p) => url(`/passeios/${p.slug}`, '0.8', 'monthly')),
];

await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entradas.join('\n')}\n</urlset>\n`,
  'utf8',
);
console.log(`sitemap.xml: ${entradas.length} URLs (${ROTAS_FIXAS.length} fixas + ${passeios.length} guias)`);

// ---------- imagens de compartilhamento ----------

await mkdir(DESTINO_OG, { recursive: true });

// A referência no código é ".webp", mas o original pode ter qualquer extensão.
const arquivosOriginais = await readdir(ORIGINAIS);
const acharOriginal = (nomeWebp) => {
  const base = path.basename(nomeWebp, path.extname(nomeWebp));
  const achado = arquivosOriginais.find((f) => path.basename(f, path.extname(f)) === base);
  if (!achado) throw new Error(`Original de "${nomeWebp}" não encontrado em ${ORIGINAIS}/`);
  return path.join(ORIGINAIS, achado);
};

// 1200x630 é a proporção que o Facebook/WhatsApp recortam sem cortar errado.
const gerarOg = async (origem, saida) => {
  await sharp(origem)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(saida);
  return (await stat(saida)).size;
};

let total = 0;
for (const { slug, primeiraImagem } of passeios) {
  total += await gerarOg(acharOriginal(primeiraImagem), path.join(DESTINO_OG, `${slug}.jpg`));
}
total += await gerarOg(acharOriginal(`${FONTE_PADRAO}.webp`), path.join(DESTINO_OG, 'padrao.jpg'));

console.log(`og/: ${passeios.length + 1} imagens 1200x630 (${(total / 1e6).toFixed(2)} MB no total)`);
