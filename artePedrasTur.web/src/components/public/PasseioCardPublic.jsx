import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import PasseioCarousel from './PasseioCarousel';

const PasseioCard = ({ passeio }) => (
  <div className="card shadow-sm border-0 h-100 rounded-4 overflow-hidden">
    <PasseioCarousel imagens={passeio.imagens} />

    <div className="card-body d-flex flex-column p-4">
      <div className="mb-2">
        <h2 className="h4 fw-bold mb-1 text-dark">{passeio.nome}</h2>
        <span className="badge bg-light text-primary border border-primary-subtle">
          {passeio.categoria || 'Ponto Turístico'}
        </span>
      </div>

      <p className="text-muted small mb-2">
        <MapPin size={14} className="me-1" /> {passeio.local}
      </p>
      
      <p className="card-text text-muted small mb-4 line-clamp">
        {passeio.resumo || "Descubra as belezas e histórias deste ponto turístico incrível em Foz do Iguaçu."}
      </p>

      <div className="mt-auto">
        <Link
          to={`/passeios/${passeio.slug}`}
          className="btn btn-outline-primary w-100 py-2 fw-bold"
          style={{ borderRadius: '12px', borderWidth: '2px' }}
        >
          Explorar Guia Completo
        </Link>
      </div>
    </div>
  </div>
);

export default PasseioCard;