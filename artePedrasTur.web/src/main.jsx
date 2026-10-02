import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// O Bootstrap vem primeiro de proposito: ele define --bs-body-font-family no
// :root, e o Theme.css redefine a mesma variavel. Com a mesma especificidade,
// quem for importado por ultimo vence — e o Bootstrap estava por ultimo,
// derrubando a fonte Inter do tema para a pilha de fontes do sistema.
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Theme.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
