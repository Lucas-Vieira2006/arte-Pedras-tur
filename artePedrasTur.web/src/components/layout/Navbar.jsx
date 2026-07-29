import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react'; // Removi 'Gem' que não estava sendo usado
import logoArtePedras from '../../assets/images/logo-arte-pedras.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const getLinkClass = (path) => {
    const baseClass = "nav-link px-3 transition-colors";
    const activeClass = "fw-bold text-warning"; 
    return location.pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" 
      style={{ 
        backgroundColor: 'var(--primary)', 
        borderBottom: '3px solid var(--accent)',
        zIndex: 1050 
      }}
    >
      <div className="container py-1 d-flex align-items-center justify-content-between">
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
          onClick={closeMenu}
        >
          <img 
            src={logoArtePedras} 
            alt="Arte Pedras Tur" 
            height="50"
            className="me-2"
          />

          <span className="ls-1">ARTE PEDRAS <span className="fw-light ms-1">TUR</span></span>
        </Link>
        <button 
          className="navbar-toggler border-0 focus-ring-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          style={{ boxShadow: 'none' }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center my-3 my-lg-0">
            <li className="nav-item">
              <Link className={getLinkClass('/')} to="/" onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className={getLinkClass('/passeios')} to="/passeios" onClick={closeMenu}>
                Passeios
              </Link>
            </li>
            <li className="nav-item">
              <Link className={getLinkClass('/sobre')} to="/sobre" onClick={closeMenu}>
                Sobre Nós
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-center">
            <a 
              href="https://wa.me/5545991142748" 
              target="_blank" 
              rel="noreferrer" 
              className="btn fw-bold shadow-sm d-flex align-items-center gap-2 hover-scale" 
              style={{ 
                backgroundColor: 'var(--accent)', 
                color: 'var(--primary)', 
                borderRadius: '50px',
                padding: '10px 24px'
              }}
            >
              <MessageCircle size={20} />
              <span>Reservar Agora</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;