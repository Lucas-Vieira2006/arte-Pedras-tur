import { Link } from 'react-router-dom';
import useSeo from '../seo/useSeo';

// Antes, um endereço inexistente caía no fallback da SPA e devolvia a aplicação
// vazia com status 200 — o Google classifica isso como "soft 404" e passa a
// desconfiar da indexação do site inteiro. O status HTTP continua 200 (limitação
// de SPA servida estaticamente), mas a página agora é explícita e marcada como
// noindex, que é o sinal que o buscador usa para não indexá-la.
const NaoEncontrada = () => {
  useSeo({
    titulo: 'Página não encontrada — Arte Pedras Tur',
    descricao: 'O endereço acessado não existe ou foi movido.',
    caminho: '/404',
    indexar: false,
  });

  return (
    <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
      <h1 className="fw-bold display-5 mb-3">Página não encontrada</h1>
      <p className="text-muted mb-4">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        <Link to="/" className="btn btn-primary px-4 fw-bold">
          Voltar ao início
        </Link>
        <Link to="/passeios" className="btn btn-outline-primary px-4 fw-bold">
          Ver passeios
        </Link>
      </div>
    </div>
  );
};

export default NaoEncontrada;
