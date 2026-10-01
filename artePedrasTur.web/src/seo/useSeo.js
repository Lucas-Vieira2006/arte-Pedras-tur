import { useEffect } from 'react';

// Endereço canônico do site. Usado para montar as URLs absolutas que o Google e
// o WhatsApp exigem em canonical e og:image — caminho relativo não serve nesses
// dois casos.
export const SITE = 'https://artepedrastur.com.br';

// Imagem padrão de compartilhamento, para páginas que não têm uma própria.
export const IMAGEM_PADRAO = `${SITE}/og/padrao.jpg`;

/**
 * Reduz um texto longo ao tamanho que o Google costuma exibir numa descrição
 * (~155 caracteres), cortando na palavra inteira em vez de no meio dela.
 */
export const resumir = (texto, limite = 155) => {
  const limpo = (texto || '').replace(/\s+/g, ' ').trim();
  if (limpo.length <= limite) return limpo;
  const corte = limpo.slice(0, limite);
  return `${corte.slice(0, corte.lastIndexOf(' '))}...`;
};

const upsertMeta = (seletor, criar, conteudo) => {
  let el = document.head.querySelector(seletor);
  if (!el) {
    el = criar();
    document.head.appendChild(el);
  }
  el.setAttribute('content', conteudo);
};

const metaNome = (nome, conteudo) =>
  upsertMeta(`meta[name="${nome}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', nome);
    return el;
  }, conteudo);

const metaProp = (prop, conteudo) =>
  upsertMeta(`meta[property="${prop}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', prop);
    return el;
  }, conteudo);

/**
 * Define as tags de SEO da página atual.
 *
 * Como o projeto é uma SPA sem renderização no servidor, o <head> do index.html
 * é o mesmo para todas as rotas: sem isto, os 13 guias de passeios compartilham
 * um único título e nenhuma descrição, e disputam espaço entre si na busca.
 * O Google executa o JavaScript antes de indexar, então as tags definidas aqui
 * são lidas normalmente.
 *
 * Feito sem biblioteca (react-helmet e similares) de propósito: são três
 * operações de DOM, não justificam uma dependência a mais no bundle.
 */
export default function useSeo({ titulo, descricao, caminho, imagem, indexar = true }) {
  useEffect(() => {
    // Páginas que dependem de dados assíncronos chamam o hook antes de ter o
    // conteúdo (regra dos hooks: nada de chamada condicional). Sem título ainda,
    // não faz sentido sobrescrever o que está no head.
    if (!titulo) return;

    const url = `${SITE}${caminho}`;

    document.title = titulo;
    metaNome('description', descricao);

    // Evita que o Google trate endereços diferentes (com e sem barra final, com
    // parâmetros de campanha) como páginas duplicadas.
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Open Graph: é o que define como o link aparece quando alguém manda o
    // passeio no WhatsApp — sem isto, vai sem imagem, título ou descrição.
    metaProp('og:title', titulo);
    metaProp('og:description', descricao);
    metaProp('og:url', url);
    metaProp('og:image', imagem || IMAGEM_PADRAO);
    metaProp('og:type', 'website');
    metaProp('og:site_name', 'Arte Pedras Tur');
    metaProp('og:locale', 'pt_BR');
    metaNome('twitter:card', 'summary_large_image');

    // Painel e login não têm por que aparecer na busca.
    metaNome('robots', indexar ? 'index, follow' : 'noindex, nofollow');
  }, [titulo, descricao, caminho, imagem, indexar]);
}
