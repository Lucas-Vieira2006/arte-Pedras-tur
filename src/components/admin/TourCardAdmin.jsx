import React from 'react';
import { MapPin, Clock, Tag } from 'lucide-react';
import TourService from '../../services/tourService';
import '../../styles/TourCard.css';

const TourCardAdmin = ({ tour, aoExcluir, aoEditar }) => {

  const handleDelete = async () => {
    const confirmar = window.confirm(`Deseja realmente excluir o passeio "${tour.nome}"`);

    if (!confirmar) return;

    try {
      await TourService.deleteTour(tour.id);
      aoExcluir(tour.id);
    } catch (error) {
      console.error('Erro ao excluir passeio:', error);
      alert('Erro ao excluir passeio. Verifique se ele não possui reservas vinculadas.');
    }
  };
  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/600x400text=Sem+Imagem";
  };

  return (
 
    <div className="col-md-4 mb-4">
      <div className="card tour-card admin h-100 shadow-sm border-0 rounded-3 overflow-hidden">

        {/* Imagem + Badges */}
        <div className="position-relative">
          <img
            src={tour.imagemUrl || "https://placehold.co/600x400text=Sem+Imagem"}
            alt={tour.nome}
            className="card-img-top tour-img"
            onError={handleImageError}
            style={{ height: '200px', objectFit: 'cover' }}
          />

          <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
            {/* Badge de Categoria*/}
            <span className="badge bg-primary shadow-sm">
               {tour.categoria || 'Geral'}
            </span>
          </div>

          {tour.incluiTransporte && (
            <span className="badge bg-success position-absolute bottom-0 end-0 m-2 shadow-sm">
              <i className="bi bi-bus-front me-1"></i> Transfer Incluso
            </span>
          )}
        </div>
        <div className="card-body d-flex flex-column p-3">

          <h5 className="fw-bold mb-2 text-truncate" title={tour.nome}>{tour.nome}</h5>

          <div className="text-muted small mb-3 d-flex flex-column gap-2">
            <span className="d-flex align-items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-truncate">{tour.localizacao}</span>
            </span>

            <div className="d-flex gap-3">
                <span className="d-flex align-items-center gap-2">
                <Clock size={16} className="text-primary" />
                {tour.duracaoHoras}h
                </span>
                
                <span className="d-flex align-items-center gap-2">
                <Tag size={16} className="text-primary" />
                {tour.categoria || 'Geral'}
                </span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted small">Valor por pessoa</span>
                <span className="fs-5 fw-bold text-dark">
                    {formatarPreco(tour.precoBase)}
                </span>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary flex-grow-1 fw-bold"
                onClick={() => aoEditar(tour)}
              >
                <i className="bi bi-pencil-square me-1"></i> Editar
              </button>

              <button
                className="btn btn-outline-danger flex-grow-1 fw-bold"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-1"></i> Excluir
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCardAdmin;