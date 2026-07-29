import { Carousel } from 'react-bootstrap';

const PasseioCarousel = ({ imagens }) => {
  if (!imagens || !Array.isArray(imagens) || imagens.length === 0) {
    return (
      <div style={{ height: '220px', backgroundColor: '#eee' }} className="d-flex align-items-center justify-content-center">
        <span className="text-muted">Imagem indisponível</span>
      </div>
    );
  }

  return (
    <Carousel interval={3000} indicators={true} controls={imagens.length > 1}>
      {imagens.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={img}
            className="d-block w-100"
            style={{ height: '450px', objectFit: 'cover' }}
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PasseioCarousel;