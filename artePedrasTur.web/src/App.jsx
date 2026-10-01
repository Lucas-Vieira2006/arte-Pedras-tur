import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexto e Segurança
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routes/PrivateRoute';

// Componentes Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/public/WhatsappButton';
import ScrollToTop from './components/layout/ScrollToTop';

// Páginas Públicas. Só a Home entra no bundle inicial — as outras são
// carregadas sob demanda (ver comentário no Suspense abaixo).
import Home from './pages/Home';
const PasseiosList = lazy(() => import('./pages/passeios/PasseiosList'));
const PasseioDetalhe = lazy(() => import('./pages/passeios/PasseioDetalhe'));
const Login = lazy(() => import('./pages/Login'));
const SobreNos = lazy(() => import('./pages/SobreNos'));

// Página Privada
const Admin = lazy(() => import('./pages/Admin'));
const NaoEncontrada = lazy(() => import('./pages/NaoEncontrada'));

// Exibido enquanto o código da rota está sendo baixado. Com a altura mínima do
// <main> já reservada, não há salto de layout quando o conteúdo chega.
const CarregandoRota = () => (
  <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '60vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Carregando...</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider> 

      <ScrollToTop />
      
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
        {/* Sem isto, um visitante da home baixava também a página de admin, o
            formulário de tours e os 55 KB de dados estáticos dos guias — tudo
            num chunk único de 474 KB. Dividido por rota, o primeiro acesso
            carrega 366 KB. */}
        <Suspense fallback={<CarregandoRota />}>
          <Routes>
  
            <Route path="/" element={<Home />} />
            <Route path="/passeios" element={<PasseiosList />} />
            <Route path="/passeios/:slug" element={<PasseioDetalhe />} />
            <Route path="/sobre" element={<SobreNos />} />

            <Route path="/login" element={<Login />} />

      
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              } 
            />

            {/* Rota coringa: sem ela, endereço inexistente renderizava tela
                vazia, que o Google trata como "soft 404". */}
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </Suspense>

      </main>
      <WhatsAppButton />

      <Footer />

    </AuthProvider>
  );
}

export default App;