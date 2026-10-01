import { useEffect, useState } from 'react';
import PasseioService from '../../services/PasseioService';
import PasseioCard from '../../components/public/PasseioCardPublic';
import useSeo from '../../seo/useSeo';

const PasseiosList = () => {
  const [passeios, setPasseios] = useState([]);

  useSeo({
    titulo: 'Passeios e Pontos Turísticos em Foz do Iguaçu — Arte Pedras Tur',
    descricao:
      'Guias completos dos principais pontos turísticos de Foz do Iguaçu e região: horários, valores, documentos exigidos, acessibilidade e dicas de quem conhece.',
    caminho: '/passeios',
  });

  useEffect(() => {
    PasseioService.getAll().then(setPasseios);
  }, []);

  return (
    <div className="container py-5">
      {/* h1, não h2: é o título principal da página, e o Google usa isso pra
          entender o assunto dela. O tamanho visual continua o mesmo via classe. */}
      <h1 className="fw-bold mb-4 h2">🌎 Passeios e Pontos Turísticos</h1>

      <div className="row g-4">
        {passeios.map(p => (
          <div className="col-md-4" key={p.id}>
            <PasseioCard passeio={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasseiosList;
