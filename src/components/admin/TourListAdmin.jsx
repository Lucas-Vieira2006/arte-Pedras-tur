import React, { useEffect, useState } from 'react';
import TourService from '../../services/tourService';
import TourCardAdmin from './TourCardAdmin';

const TourListAdmin = ({ aoClicarEditar }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPasseios = async () => {
      try {
        setLoading(true);
        const data = await TourService.getTours();
        setTours(data || []);
      } catch (error) {
        console.error('Erro ao carregar passeios (admin):', error);
        alert('Erro ao carregar passeios. Verifique a API.');
      } finally {
        setLoading(false);
      }
    };

    carregarPasseios();
  }, []);

  const removerTourDaLista = (id) => {
    setTours(prev => prev.filter(t => t.id !== id));
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Carregando passeios (admin)...</h4>
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">
            Gerenciar Passeios
          </h2>

          <span className="badge bg-secondary">
            {tours.length} cadastrados
          </span>
        </div>
        <div className="row g-4">
          {tours.map(tour => (
            <TourCardAdmin
              key={tour.id}
              tour={tour}
              aoEditar={aoClicarEditar}
              aoExcluir={removerTourDaLista}
            />
          ))}
        </div>

        {/* Estado vazio */}
        {tours.length === 0 && (
          <div className="text-center py-5 text-muted">
            Nenhum passeio cadastrado.
          </div>
        )}

      </div>
    </section>
  );
};

export default TourListAdmin;
