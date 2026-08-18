import React, { useEffect, useState } from 'react';
import PublicTourService from '../../services/PublicTourService';
import TourCardPublic from './TourCardPublic';
import ReservaModal from '../modals/ReservaModal';
import { Search } from 'lucide-react'; // Ícone de Lupa

const TourListPublic = () => {

  const [toursFull, setToursFull] = useState([]);
 
  const [tours, setTours] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [tourSelecionado, setTourSelecionado] = useState(null);
  
  const [filtroCategoria, setFiltroCategoria] = useState('Todos'); 
  const [termoBusca, setTermoBusca] = useState(''); 
  
  const categorias = ['Todos', 'Natureza', 'Aventura', 'Compras', 'Cultura', 'Noturnos', 'Combos', 'Apenas Transfer'];

  useEffect(() => {
    const carregarPasseios = async () => {
      try {
        const data = await PublicTourService.getTours();
        if (data) {
           setToursFull(data);
           setTours(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarPasseios();
  }, []);

  useEffect(() => {
    let resultado = toursFull;


    if (filtroCategoria !== 'Todos') {
      resultado = resultado.filter(tour => 
        tour.categoria && tour.categoria.toLowerCase().includes(filtroCategoria.toLowerCase())
      );
    }

    if (termoBusca.trim() !== '') {
      const termo = termoBusca.toLowerCase();
      resultado = resultado.filter(tour => 
        tour.nome.toLowerCase().includes(termo) || 
        (tour.descricao && tour.descricao.toLowerCase().includes(termo))
      );
    }

    setTours(resultado);
  }, [filtroCategoria, termoBusca, toursFull]);


  if (loading) {
    return <h3 className="text-center py-5 text-muted">Carregando maravilhas...</h3>;
  }

  return (
    <>
      <section className="py-5 bg-white" id="passeios">
        <div className="container">
          
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase ls-wide" style={{ letterSpacing: '2px' }}>
              Explorar Destinos
            </h6>
            <h2 className="display-5 fw-bold mb-3">O que fazer em Foz do Iguaçu</h2>
            
            <div className="row justify-content-center mb-4">
              <div className="col-md-6 col-lg-5">
                <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                  <span className="input-group-text bg-white border-0 ps-4">
                    <Search size={20} className="text-muted" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 py-3 shadow-none" 
                    placeholder="Busque por 'Cataratas', 'Itaipu'..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                  {termoBusca && (
                    <button 
                      className="btn bg-white border-0 pe-4 text-muted"
                      onClick={() => setTermoBusca('')}
                      aria-label="Limpar busca"
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`btn px-4 py-2 rounded-pill fw-bold transition-all ${
                    filtroCategoria === cat
                      ? 'btn-primary shadow-sm'
                      : 'btn-outline-light text-dark border-secondary-subtle'
                  }`}
                  style={{ fontSize: '0.9rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* === GRID DE CARDS === */}
          <div className="row g-4 fade-in">
            {tours.length > 0 ? (
              tours.map((item) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item.id}>
                  <TourCardPublic 
                    tour={item} 
                    onReservar={() => setTourSelecionado(item)} 
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <Search size={48} className="text-muted opacity-25 mb-3" />
                <h4 className="text-muted">Nenhum passeio encontrado.</h4>
                <p className="text-secondary">
                  Não achamos nada com "<strong>{termoBusca}</strong>" na categoria <strong>{filtroCategoria}</strong>.
                </p>
                <button 
                  className="btn btn-outline-primary rounded-pill mt-2" 
                  onClick={() => { setFiltroCategoria('Todos'); setTermoBusca(''); }}
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {tourSelecionado && (
        <ReservaModal
          tour={tourSelecionado}
          onClose={() => setTourSelecionado(null)}
        />
      )}
    </>
  );
};

export default TourListPublic;
