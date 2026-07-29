// components/ReservaHeader.jsx
const ReservaHeader = ({ tour, onClose }) => (
  <div
    className="position-relative"
    style={{
      height: '350px',
      backgroundImage: `url(${tour.imagemUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '15px 15px 0 0'
    }}
  >
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '20px'
      }}
    >
      <div className="text-white w-100">
        <h2 className="fw-bold mb-1 text-shadow">{tour.nome}</h2>
        <p className="mb-0 text-white-50 small">
          <i className="bi bi-geo-alt-fill me-1"></i> Foz do Iguaçu, PR
        </p>
      </div>
    </div>

    <button
      className="btn-close btn-close-white position-absolute top-0 end-0 m-3 p-2"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
      onClick={onClose}
    />
  </div>
);

export default ReservaHeader;
