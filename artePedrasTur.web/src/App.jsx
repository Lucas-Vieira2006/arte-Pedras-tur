import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexto e Segurança
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routes/PrivateRoute';

// Componentes Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/public/WhatsappButton';
import ScrollToTop from './components/layout/ScrollToTop';

// Páginas Públicas
import Home from './pages/Home';
import PasseiosList from './pages/passeios/PasseiosList';
import PasseioDetalhe from './pages/passeios/PasseioDetalhe';
import Login from './pages/Login';
import SobreNos from './pages/SobreNos';

// Página Privada
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider> 

      <ScrollToTop />
      
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
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
        </Routes>
        
      </main>
      <WhatsAppButton />

      <Footer />

    </AuthProvider>
  );
}

export default App;