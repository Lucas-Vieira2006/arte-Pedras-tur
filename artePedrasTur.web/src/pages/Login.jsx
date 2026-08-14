import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContextInstance.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin'); // Manda pro Admin após sucesso
    } catch {
      alert("Acesso negado! Verifique seus dados.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
      <div className="card shadow p-4 border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Acesso Restrito 🔒</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Login;