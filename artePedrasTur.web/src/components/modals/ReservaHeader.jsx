import { MapPin, X } from 'lucide-react';

const ReservaHeader = ({ tour, onClose }) => (
  <div
    className="position-relative"
    style={{
      aspectRatio: '21 / 9',
      minHeight: '200px',
      overflow: 'hidden',
      borderRadius: '15px 15px 0 0'
    }}
  >
    <img
      src={tour.imagemUrl}
      alt={tour.nome}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 65%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '20px'
      }}
    >
      <div className="text-white w-100">
        <h2 className="fw-bold mb-1">{tour.nome}</h2>
        <p className="mb-0 text-white-50 small d-flex align-items-center gap-1">
          <MapPin size={14} aria-hidden="true" focusable="false" />
          Foz do Iguaçu, PR
        </p>
      </div>
    </div>

    <button
      type="button"
      aria-label="Fechar"
      className="position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center border-0"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff'
      }}
      onClick={onClose}
    >
      <X size={18} aria-hidden="true" focusable="false" />
    </button>
  </div>
);

export default ReservaHeader;
