import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowRight, BadgeCheck, QrCode, Gem, ShoppingBag, Gift, Instagram } from 'lucide-react';
import logoOficial from '../assets/images/logo-arte-pedras.png';

const SobreNos = () => {
  return (
    <div className="bg-light">

      <div 
        className="position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `url('/images/imagem-fundo-sobrenos.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          minHeight: '200px'
        }}
      >
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.85))' }}
        ></div>

        <div className="position-relative container text-center z-1 d-flex flex-column align-items-center animate-fade-up">
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill border border-warning text-warning mb-4 backdrop-blur shadow-sm">
            <Gem size={18} fill="currentColor" className="opacity-75" />
            <span className="fw-bold text-uppercase ls-2" style={{ fontSize: '0.85rem' }}>Desde 2002</span>
          </div>

          <h1 className="display-2 fw-bold mb-3 text-white" style={{ textShadow: '2px 2px 15px rgba(61, 61, 61, 0.6)' }}>
            Nossa História
          </h1>
        
          <div className="bg-warning rounded-pill mb-4 shadow" style={{ width: '80px', height: '5px' }}></div>
        
          <p className="lead fw-light text-white-50 mb-0 fs-4" style={{ letterSpacing: '1px', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
            Lapidando memórias inesquecíveis em Foz do Iguaçu
          </p>
        </div>

        <div className="position-absolute bottom-0 mb-5 animate-bounce text-white-50 text-center">
          <small className="d-block text-uppercase fw-bold mb-2 ls-2" style={{ fontSize: '0.7rem' }}>Descubra</small>
          <ArrowRight className="rotate-90 text-warning" size={28} /> 
        </div>
      </div>

      <div className="container py-5 my-4">

        <div className="row align-items-center g-5 mb-5">
          
          <div className="col-lg-6 order-1 order-lg-1">
            <div className="d-flex align-items-center mb-3">
              <img 
                src={logoOficial} 
                alt="Logo Arte Pedras" 
                className="rounded-circle shadow-sm me-3 bg-white p-1"
                style={{ width: '70px', height: '70px', objectFit: 'contain' }} 
              />
              <h2 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>Quem é a Arte Pedras</h2>
            </div>

            <div className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              <p>
                Nossa história começa com as riquezas naturais da nossa terra. O que nasceu como uma 
                tradicional <strong>loja de varejo de pedras preciosas</strong>, dedicada a oferecer o melhor 
                do artesanato local, evoluiu para algo muito maior.
              </p>
              <p>
                Percebemos que Foz do Iguaçu é, em si, uma joia rara que precisava ser explorada com 
                segurança e conforto. Decidimos então ampliar nossa atuação para o turismo, oferecendo 
                 <strong> transfers executivos e venda de ingressos</strong> para os melhores atrativos da região.
              </p>
              <p className="mb-0 border-start border-4 border-warning p-3 fst-italic text-dark bg-white rounded shadow-sm">
                "O nome <strong>Arte Pedras</strong> honra nossa origem: hoje, lapidamos o seu roteiro de viagem 
                com o mesmo cuidado e precisão com que selecionamos nossas pedras preciosas."
              </p>
            </div>
          </div>

          <div className="col-lg-6 order-2 order-lg-2">
            <div className="position-relative">
              <div 
                className="position-absolute w-100 h-100 rounded-4"
                style={{ 
                  backgroundColor: 'var(--accent)', 
                  top: '20px', 
                  left: '20px', 
                  zIndex: 0 
                }}
              ></div>
              <img 
                src="/images/imagem-fundo-sobrenos.png"
                loading="lazy"
                alt="Fundo Arte Pedras"
                className="img-fluid rounded-4 shadow position-relative z-1 w-100"
                style={{ objectFit: 'cover', height: '450px',maxWidth: '100%', minHeight: '100px' }}
              />
            </div>
          </div>
        </div>

        <div className="row align-items-center g-5 mb-5 py-5 border-top border-bottom border-light">
          
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="position-relative">
               <div className="position-absolute bottom-0 end-0 bg-warning rounded-circle opacity-25" 
                    style={{ width: '150px', height: '150px', zIndex: 0, transform: 'translate(20%, 20%)' }}></div>
               
               <img 
                 src="/images/artesanato.jpeg"
                 alt="Artesanato de Pedras Preciosas" 
                 className="img-fluid rounded-5 shadow-lg position-relative z-1 w-100"
                 style={{ objectFit: 'cover', height: '450px',maxWidth: '100%', minHeight: '100px' }}
               />
               
               <div className="position-absolute bottom-0 start-0 m-4 z-2 bg-white p-3 rounded-3 shadow d-flex align-items-center gap-3">
                 <div className="bg-light p-2 rounded-circle">
                   <Gift size={24} className="text-warning" />
                 </div>
                 <div>
                   <p className="mb-0 fw-bold small">Souvenirs Exclusivos</p>
                   <small className="text-muted">Leve Foz com você</small>
                 </div>
               </div>
            </div>
          </div>

          {/* LADO TEXTO:
              Mobile: order-1 (Vai para cima)
              Desktop: order-lg-2 (Fica na direita)
          */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div className="d-inline-flex align-items-center gap-2 mb-3">
              <ShoppingBag className="text-warning" size={24} />
              <span className="text-uppercase text-muted fw-bold ls-2 small">Nossa Origem</span>
            </div>
            
            <h2 className="display-6 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
              Conheça a loja <span className="text-warning">Arte Pedras Brasil</span>
            </h2>
            
            <p className="lead text-secondary mb-4">
              Muito mais que uma agência, mantemos viva nossa tradição no artesanato. 
              Visite nosso espaço e encante-se com a beleza natural das pedras brasileiras.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <ul className="list-unstyled text-secondary">
                  <li className="d-flex align-items-center mb-2">
                    <Gem size={18} className="text-success me-2 flex-shrink-0" /> Pedras Brutas
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <Gem size={18} className="text-success me-2 flex-shrink-0" /> Colares e Pingentes
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled text-secondary">
                  <li className="d-flex align-items-center mb-2">
                    <Gem size={18} className="text-success me-2 flex-shrink-0" /> Passarinhos em Pedra
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <Gem size={18} className="text-success me-2 flex-shrink-0" /> Decoração Artesanal
                  </li>
                </ul>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link 
                to="#" 
                className="btn btn-outline-dark rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-2"
                onClick={(e) => {
                   e.preventDefault();
                   window.open("https://wa.me/5545991142748?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20catálogo%20de%20pedras%20da%20loja.", "_blank");
                }}
              >
                <ShoppingBag size={20} />
                Entre em contato
              </Link>
              <a 
                href="https://www.instagram.com/artepedrasbrasil/" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline-danger rounded-pill px-4 fw-bold d-inline-flex align-items-center gap-2"
              >
                <Instagram size={20} />
                Siga-nos
              </a>
            </div>
          </div>
        </div>


        {/* --- DIFERENCIAIS --- */}
        <div className="py-5">
          <div className="text-center mb-5">
            <h6 className="text-uppercase text-muted fw-bold ls-1">Por que nos escolher</h6>
            <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Sua viagem em boas mãos</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-up text-center p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4 mx-auto" style={{ width: '80px', height: '80px' }}>
                  <MapPin size={32} style={{ color: 'var(--primary)' }} />
                </div>
                <h4 className="fw-bold mb-3">Guias Nativos</h4>
                <p className="text-muted">
                  Conhecemos os atalhos, os melhores horários para fotos e as histórias 
                  que não estão nos livros. Viva Foz como um local.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-up text-center p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4 mx-auto" style={{ width: '80px', height: '80px' }}>
                  <ShieldCheck size={32} style={{ color: 'var(--primary)' }} />
                </div>
                <h4 className="fw-bold mb-3">Segurança Total</h4>
                <p className="text-muted">
                  Frota moderna e vistoriada. Motoristas experientes e credenciados. 
                  Sua tranquilidade e a da sua família são nossa prioridade #1.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-up text-center p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4 mx-auto" style={{ width: '80px', height: '80px' }}>
                  <Heart size={32} style={{ color: 'var(--primary)' }} />
                </div>
                <h4 className="fw-bold mb-3">Atendimento Humano</h4>
                <p className="text-muted">
                  Sem robôs. Nosso time de suporte está disponível no WhatsApp para 
                  ajudar você antes, durante e depois do passeio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEÇÃO CADASTUR --- */}
        <div className="bg-white rounded-4 shadow-sm p-5 my-5 border border-light">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <BadgeCheck className="text-success me-2" size={32} />
                <h3 className="fw-bold mb-0 text-dark">Empresa Credenciada</h3>
              </div>
              <p className="lead text-muted mb-4">
                A Arte Pedras Brasil é uma agencia de turismo legalizada e registrada no 
                Ministério do Turismo (CADASTUR).
              </p>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Garantia de segurança jurídica
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Guias credenciados e fiscalizados
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Compromisso com a qualidade do serviço
                </li>
              </ul>
            </div>
            
            <div className="col-lg-5 text-center">
              <div className="d-inline-block bg-light p-4 rounded-4 border border-2 border-warning position-relative">
                <div className="position-absolute top-0 start-50 translate-middle bg-warning px-3 py-1 rounded-pill fw-bold shadow-sm" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  Verificar Certificado
                </div>
                
                {/* QR CODE */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://cadastur.turismo.gov.br/cadastur/#!/public/qrcode/05324200000113')}`} 
                  alt="QR Code Cadastur" 
                  className="img-fluid mb-2"
                  style={{ width: '180px', height: '180px' }} 
               />
                
                <div className="d-flex align-items-center justify-content-center text-muted gap-2 mt-2">
                  <QrCode size={16} />
                  <small>Aponte a câmera</small>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- CTA FINAL --- */}
      <div style={{ backgroundColor: 'var(--primary)' }} className="text-white py-5">
        <div className="container text-center py-3">
          <h2 className="fw-bold mb-3">Pronto para viver o extraordinário</h2>
          <p className="lead mb-4 opacity-75">
            Cuidamos da logística para você focar apenas em criar memórias.
          </p>
          <Link 
            to="/" 
            aria-label="Ver passeios turísticos disponíveis em Foz do Iguaçu"
            onClick={() => window.scrollTo(0, 0)}
            className="btn btn-warning btn-lg px-5 rounded-pill fw-bold d-inline-flex align-items-center gap-2 shadow-lg scale-on-hover"
            style={{ color: 'var(--primary)' }}
          >
            Ver Passeios Disponíveis
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* --- ESTILOS & ANIMAÇÕES --- */}
      <style>{`
        .animate-fade-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .backdrop-blur {
          backdrop-filter: blur(8px);
          background-color: rgba(0,0,0,0.3);
        }

        .rotate-90 { transform: rotate(90deg); }
        .ls-2 { letter-spacing: 2px; }
        
        .hover-up { transition: transform 0.3s ease; }
        .hover-up:hover { transform: translateY(-10px); }
      `}</style>
    </div>
  );
};

export default SobreNos;