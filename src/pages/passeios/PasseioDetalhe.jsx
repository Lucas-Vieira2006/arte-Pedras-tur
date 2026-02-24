import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PasseioService from '../../services/passeioService';
import PasseioCarousel from '../../components/public/PasseioCarousel';

const PasseioDetalhe = () => {
  const { slug } = useParams();
  const [passeio, setPasseio] = useState(null);

  useEffect(() => {
    PasseioService.getBySlug(slug).then(setPasseio);
    window.scrollTo(0, 0); 
  }, [slug]);

  if (!passeio) return null;

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8">
          <div className="rounded-4 overflow-hidden shadow-sm mb-4">
            <PasseioCarousel imagens={passeio.imagens} />
          </div>
          <h1 className="fw-bold display-5">{passeio.nome}</h1>
          <p className="text-muted fs-5">
            <i className="bi bi-geo-alt-fill text-danger"></i> {passeio.local}
          </p>
        </div>

        
        <div className="col-lg-4">
          <div className="card border-0 bg-light rounded-4 p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
            <h5 className="fw-bold mb-3">Informações Rápidas</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-3">
                <small className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Horários</small>
                <span>{passeio.horarios}</span>
              </li>
              <li className="mb-3">
                <small className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Duração Média</small>
                <span>{passeio.duracao}</span>
              </li>
              <li className="mb-3">
                <small className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Acessibilidade</small>
                <span>{passeio.acessibilidade}</span>
              </li>
              <li>
                <small className="d-block text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Melhor Horário</small>
                <span className="text-primary fw-bold">{passeio.melhorHorario}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <section className="mb-5">
            <h3 className="fw-bold mb-3">Sobre a Experiência</h3>
            <p className="text-muted fs-5" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
              {passeio.descricao}
            </p>
          </section>
          {passeio.oqueEncontrar && (
            <section className="mb-5">
              <h4 className="fw-bold mb-4 text-primary">O que você vai encontrar:</h4>
              <div className="row g-3">
                {passeio.oqueEncontrar.map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-white border rounded-3 shadow-sm h-100">
                      <i className="bi bi-check2-circle text-success fs-4 me-3"></i>
                      <span className="small fw-bold">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {passeio.servicosExtras && (
             <section className="mb-5">
                <div className="p-4 rounded-4" style={{ backgroundColor: '#f0f7ff' }}>
                    <h5 className="fw-bold mb-3 text-primary">⭐ Atividades Opcionais</h5>
                    <ul className="mb-0">
                        {passeio.servicosExtras.map((servico, i) => (
                            <li key={i} className="mb-2">{servico}</li>
                        ))}
                    </ul>
                </div>
             </section>
          )}
        </div>

        <div className="col-lg-4">
          <div className="alert alert-warning border-0 rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-3"><i className="bi bi-file-earmark-text-fill"></i> Documentos</h5>
            <ul className="small ps-3 mb-0">
              {passeio.documentos.map((d, i) => (
                <li key={i} className="mb-2">{d}</li>
              ))}
            </ul>
          </div>

          <div className="text-white rounded-4 p-4" style={{ backgroundColor: '#003566' }}>
          <h5 className="fw-bold mb-3 text-warning">💡 Dicas de Ouro</h5>
            <ul className="list-unstyled mb-0">
              {passeio.dicas.map((d, i) => (
                <li key={i} className="mb-3 small d-flex">
                  <span className="me-2">✨</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasseioDetalhe;