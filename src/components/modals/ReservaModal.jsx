import React, { useEffect, useState } from 'react';
import ReservaHeader from './ReservaHeader';
import ReservaForm from './ReservaForm';
import { calcularCustos } from '../../services/ReservaService';

const ReservaModal = ({ tour, onClose }) => {
  const [activeTab, setActiveTab] = useState('reserva');
  const [data, setData] = useState();
  const [qtdInteira, setQtdInteira] = useState(1);
  const [qtdMeia, setQtdMeia] = useState(0);
  const [servico, setServico] = useState('completo');

  useEffect(() => {
    if (servico === 'transfer') setQtdMeia(0);
  }, [servico]);

  const custos = calcularCustos({
    servico,
    qtdInteira,
    qtdMeia,
    precoBase: tour.precoBase,
    valorTransfer: tour.valorTransfer
  });

  const enviarWhatsApp = () => {
    const { totalPessoas, isHighVolume, custoIngressos, custoTransfer, totalGeral } = custos;

    let resumoFinanceiro = "";

    if (servico === 'transfer' && isHighVolume) {
      resumoFinanceiro = `*Orçamento:* Transfer para ${totalPessoas} pessoas (Sob Consulta)`;
    } else {
      if (servico !== 'transfer') {
        resumoFinanceiro += `Ingressos: R$ ${custoIngressos.toFixed(2)}\n`;
      }

      if (servico !== 'ingresso') {
        resumoFinanceiro += `Transfer: ${
          isHighVolume ? 'Sob Consulta' : 'R$ ' + custoTransfer.toFixed(2)
        }\n`;
      }

      if (!isHighVolume || servico === 'ingresso') {
        resumoFinanceiro += `*Total Estimado:* R$ ${totalGeral.toFixed(2)}`;
      } else {
        resumoFinanceiro += `*Total:* Ingressos + Transfer (A cotar)`;
      }
    }

    const mensagem = `Olá, tudo bem? Gostaria de fazer uma reserva para o passeio *${tour.nome}*.

*Passeio:* ${tour.nome}
*Data:* ${data ? data.toLocaleDateString('pt-BR') : 'A definir'}
*Pessoas:* ${qtdInteira} Inteira(s) | ${qtdMeia} Meia(s)
*Opção:* ${servico.toUpperCase()}

----------------
${resumoFinanceiro}
----------------

_Aguardo confirmação de disponibilidade._`;

    window.open(
      `https://wa.me/5545991142748?text=${encodeURIComponent(mensagem)}`,
      '_blank'
    );
  };

  return (
    <div className="modal-overlay" style={overlayStyle} onClick={onClose}>
      <div
        className="modal-content shadow-lg border-0"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <ReservaHeader tour={tour} onClose={onClose} />

        {/* === TABS === */}
        <div className="d-flex border-bottom">
          <button
            className="btn flex-grow-1 py-3 fw-bold rounded-0"
            style={{
              backgroundColor: activeTab === 'reserva' ? '#ffffff' : '#e9ecef',
              color: activeTab === 'reserva' ? 'var(--primary)' : '#6c757d',
              borderBottom:
                activeTab === 'reserva'
                  ? '3px solid var(--primary)'
                  : '1px solid #dee2e6'
            }}
            onClick={() => setActiveTab('reserva')}
          >
            📅 Reservar Agora
          </button>

          <button
            className="btn flex-grow-1 py-3 fw-bold rounded-0"
            style={{
              backgroundColor: activeTab === 'detalhes' ? '#ffffff' : '#e9ecef',
              color: activeTab === 'detalhes' ? 'var(--primary)' : '#6c757d',
              borderBottom:
                activeTab === 'detalhes'
                  ? '3px solid var(--primary)'
                  : '1px solid #dee2e6'
            }}
            onClick={() => setActiveTab('detalhes')}
          >
            ℹ️ Detalhes & Regras
          </button>
        </div>

        {/* === CONTEÚDO === */}
        <div className="p-4 bg-white" style={{ overflowY: 'auto', flex: 1 }}>
          {activeTab === 'reserva' && (
            <ReservaForm
              data={data}
              setData={setData}
              qtdInteira={qtdInteira}
              setQtdInteira={setQtdInteira}
              qtdMeia={qtdMeia}
              setQtdMeia={setQtdMeia}
              servico={servico}
              setServico={setServico}
              custos={custos}
              tour={tour}
              onSubmit={enviarWhatsApp}
            />
          )}

          {activeTab === 'detalhes' && (
            <div className="fade-in">
              <div className="row">
                <div className="col-12 mb-4">
                  <h5 className="fw-bold text-primary mb-3">📝 Sobre o Passeio</h5>
                  <p className="text-muted" style={{ lineHeight: '1.8' }}>
                    {tour.descricao ||
                      'Descrição detalhada não disponível para este passeio no momento.'}
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="bg-light p-4 rounded h-100 border-start border-4 border-primary">
                    <h6 className="fw-bold text-dark mb-3">🎒 O que levar</h6>
                    <ul className="text-muted mb-0 ps-3">
                      <li className="mb-2">Protetor solar e repelente</li>
                      <li className="mb-2">Água e lanche leve</li>
                      <li className="mb-2">Roupas e calçados confortáveis (tênis)</li>
                      <li>Capa de chuva (recomendado)</li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="bg-light p-4 rounded h-100 border-start border-4 border-warning">
                    <h6 className="fw-bold text-dark mb-3">📄 Documentos Obrigatórios</h6>
                    <ul className="text-muted mb-0 ps-3">
                      <li className="mb-2">RG Original ou CNH (em bom estado)</li>
                      <li className="mb-2">Menores: Certidão de Nascimento</li>
                      <li>Estrangeiros: Passaporte válido</li>
                    </ul>
                  </div>
                </div>

                <div className="col-12">
                  <div className="alert alert-info border-0 d-flex align-items-center shadow-sm">
                    <span className="fs-1 me-4">🚌</span>
                    <div>
                      <h6 className="fw-bold mb-1">Logística de Transporte</h6>
                      <p className="small mb-0">
                        Buscamos na maioria dos hotéis do centro de Foz do Iguaçu. O horário
                        exato de saída será confirmado pela nossa equipe após a reserva.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// === ESTILOS ===
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.85)',
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px'
};

const modalStyle = {
  maxWidth: '900px',
  width: '100%',
  maxHeight: '90vh',
  borderRadius: '15px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

export default ReservaModal;
