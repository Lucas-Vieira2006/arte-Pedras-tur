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
            // O Carousel do react-bootstrap monta TODOS os slides no DOM de uma
            // vez, então sem isso a página /passeios disparava o download das 40
            // imagens do catálogo de imediato — inclusive os slides 2 e 3 de cada
            // card, que ninguém vê nos primeiros segundos. Só o primeiro slide
            // precisa chegar junto com a página; o resto espera o carrossel girar.
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            // Decodificação fora da thread principal: com 13 cards na mesma tela,
            // decodificar em série travava a rolagem.
            decoding="async"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PasseioCarousel;
