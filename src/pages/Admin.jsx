import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TourForm from '../components/admin/TourForm';
import TourListAdmin from '../components/admin/TourListAdmin';
import TourService from '../services/TourService';

const Admin = () => {
  const [tours, setTours] = useState([]);
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate(); 

  const carregar = async () => {
    try {
      const data = await TourService.getTours();
      setTours(data);
    } catch (error) {
      console.error("Erro ao carregar admin:", error);
      
      if (error.response && error.response.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Área Administrativa</h2>
          <button className="btn btn-outline-danger btn-sm" onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
          }}>Sair</button>
      </div>

      <TourForm
        tourParaEditar={editando}
        // CORREÇÃO 1: O TourForm espera 'aoFinalizarEdicao' e 'onSucesso'
        aoFinalizarEdicao={() => setEditando(null)}
        onSucesso={() => {
          setEditando(null);
          carregar();
        }}
      />

      <hr className="my-5" />

      <TourListAdmin
        tours={tours}
        setTours={setTours}
        // CORREÇÃO 2: O TourListAdmin espera 'aoClicarEditar'
        aoClicarEditar={setEditando}
      />
    </div>
  );
};

export default Admin;