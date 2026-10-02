import React from 'react'; 
import "../../styles/TourCard.css";

const TourCardPublic = ({ tour, indice = 0, onReservar }) => {
    const precoBase = Number(tour.precoBase);
    
    // Pega o valor do transfer vindo da API
    const valorTransfer = Number(tour.valorTransfer); 

    // Lógica: Se precoBase for 0, usa o valorTransfer. Senão, usa o precoBase.
    const precoCalculado = precoBase === 0 ? valorTransfer : precoBase;
    
    const precoValido = Number.isFinite(precoCalculado) ? precoCalculado : null;

    return (
        <div className="card h-100 tour-card border-0 shadow-sm">
            <div className="position-relative">
                {/* As 19 imagens dos tours vinham todas de uma vez, de um host
                    externo. Só as 4 primeiras aparecem sem rolar a página; o resto
                    espera. A primeira é o elemento de LCP da home, então vai com
                    prioridade alta e sem lazy — o Lighthouse reprova LCP com
                    loading="lazy". */}
                <img
                    src={tour.imagemUrl || 'https://via.placeholder.com/300x200'}
                    className="card-img-top tour-img"
                    alt={tour.nome}
                    width="400"
                    height="200"
                    loading={indice < 4 ? 'eager' : 'lazy'}
                    fetchPriority={indice === 0 ? 'high' : 'auto'}
                    decoding="async"
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <span className="badge bg-primary position-absolute top-0 start-0 m-2 px-3 py-2" style={{ borderRadius: '20px' }}>
                    {tour.categoria || 'Geral'}
                </span>
            </div>

            <div className="card-body d-flex flex-column">
                {/* h2, não h5: o título do card vem logo abaixo do h1 da página, e pular
                    de h1 para h5 quebra a navegação por cabeçalhos em leitor de tela.
                    A classe h5 mantém o tamanho visual. */}
                <h2 className="h5 fw-bold text-truncate">{tour.nome}</h2>
                
                <p 
                    className="text-muted small flex-grow-1"
                    title={tour.descricao}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,   
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '3.6em'     
                    }}
                >
                    {tour.descricao || "Explore as maravilhas de Foz do Iguaçu com este passeio exclusivo."}
                </p>
                
                <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">A partir de</span>
                        <strong className="h4 mb-0 text-primary">
                            {precoValido !== null
                                ? precoValido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                : 'Sob consulta'}
                        </strong>
                    </div>

                    <button 
                        className="btn btn-primary w-100 fw-bold py-2" 
                        onClick={() => onReservar(tour)}
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCardPublic;