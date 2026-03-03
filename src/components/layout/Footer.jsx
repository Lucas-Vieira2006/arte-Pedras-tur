import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram,} from 'lucide-react';

const Footer = () => {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="pt-5 pb-3 mt-auto" style={{ backgroundColor: '#001d3d', color: '#f8f9fa' }}>
      <div className="container">
        <div className="row g-4 justify-content-between">
          
        
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--accent)' }}>ARTE PEDRAS TUR</h5>
            <p className="small opacity-75" style={{ lineHeight: '1.6' }}>
              Sua agência de turismo em Foz do Iguaçu. 
              Experiências inesquecíveis nas Cataratas e região com conforto, segurança e guias credenciados.
            </p>
            
            <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
              <span className="d-block small text-white fw-bold text-uppercase">Regularidade</span>
              <small className="opacity-75">CADASTUR: 05.324.200/0001-13</small><br />
              <small className="opacity-75">CNPJ: 05.324.200/0001-13</small>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Navegação</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-white-50 hover-white transition-all">Início</Link>
              </li>
              <li className="mb-2">
                <Link to="/passeios" className="text-decoration-none text-white-50 hover-white transition-all">Passeios</Link>
              </li>
              <li className="mb-2">
                <Link to="/sobre" className="text-decoration-none text-white-50 hover-white transition-all">Quem Somos</Link>
              </li>
              
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Fale Conosco</h5>
            <ul className="list-unstyled small opacity-75">
              <li className="mb-3 d-flex gap-2">
                <MapPin size={18} className="text-warning flex-shrink-0" aria-hidden="true" focusable="false" />
                <a
                  href="https://maps.google.com/q=Av.Brasil - 121, Centro - Foz do Iguaçu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none hover-underline"
                  aria-label="Endereço no Google Maps"
                >
                  Av.Brasil - 121, Centro<br />Foz do Iguaçu - PR
                </a>
              </li>
              <li className="mb-3 d-flex gap-2">
                <Phone size={18} className="text-warning flex-shrink-0" aria-hidden="true" focusable="false" />
                <a
                  href="https://wa.me/5545991142748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none hover-underline"
                  aria-label="Falar no WhatsApp"
                >
                  (45) 99114-2748
                </a>
              </li>
              <li className="mb-3 d-flex gap-2">
                <Mail size={18} className="text-warning flex-shrink-0" aria-hidden="true" focusable="false" />
                <a
                  href="mailto:artepedrastur@gmail.com"
                  className="text-white text-decoration-none hover-underline"
                  aria-label="Enviar e-mail"
                >
                  artepedrastur@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
               <h6 className="fw-bold mb-3 small text-uppercase text-white">Acompanhe nas redes</h6>
               <div className="d-flex gap-3">
                  <a href="https://www.instagram.com/artepedrastur/" target="_blank" rel="noopener noreferrer"
                     className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '35px', height: '35px' }}
                     aria-label="Instagram">
                     <Instagram size={18} aria-hidden="true" focusable="false" />
                  </a>
               </div>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary opacity-25" />
        
        <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start small opacity-50">
                <p className="mb-0">&copy; {anoAtual} Arte Pedras Tur. Todos os direitos reservados
                    <Link to="/login" className="secret-login-link">.</Link>
                </p>
            </div>
            <div className="col-md-6 text-center text-md-end small opacity-25 mt-2 mt-md-0">
                <p className="mb-0">Desenvolvido por Lucas Vieira</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
