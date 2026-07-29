import { useEffect, useState } from 'react';
import PasseioService from '../../services/PasseioService';
import PasseioCard from '../../components/public/PasseioCardPublic';

const PasseiosList = () => {
  const [passeios, setPasseios] = useState([]);

  useEffect(() => {
    PasseioService.getAll().then(setPasseios);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">🌎 Passeios e Pontos Turísticos</h2>

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
