import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarDays, Users, Package, Ticket, Bus, Receipt, AlertTriangle, Minus, Plus } from 'lucide-react';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.86.514 3.7 1.487 5.297L2 22l4.828-1.463A9.953 9.953 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.19a8.17 8.17 0 0 1-4.166-1.14l-.299-.177-3.09.936.94-3.02-.194-.31A8.184 8.184 0 0 1 3.81 12c0-4.514 3.674-8.19 8.191-8.19 4.516 0 8.19 3.676 8.19 8.19 0 4.516-3.674 8.19-8.19 8.19z" />
  </svg>
);

const ReservaForm = ({
  data, setData,
  qtdInteira, setQtdInteira,
  qtdMeia, setQtdMeia,
  servico, setServico,
  custos,
  tour,
  onSubmit
}) => {
  const { isHighVolume, custoIngressos, custoTransfer, totalGeral } = custos;

  return (
    <div className="row fade-in">
      {/* COLUNA ESQUERDA */}
      <div className="col-md-6 border-end">
        <label className="fw-bold text-primary mb-2 d-flex align-items-center gap-2">
          <CalendarDays size={18} aria-hidden="true" focusable="false" />
          Selecione a Data
        </label>
        <div className="border rounded-3 p-3 mb-4 d-flex justify-content-center bg-white shadow-sm">
          <DayPicker
            mode="single"
            selected={data}
            onSelect={setData}
            fromDate={new Date()}
          />
        </div>

        <label className="fw-bold text-primary mb-2 d-flex align-items-center gap-2">
          <Users size={18} aria-hidden="true" focusable="false" />
          Passageiros
        </label>
        <div className="bg-light p-3 rounded-3 mb-4 border">
          {/* INTEIRA */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="d-block fw-bold">Inteira</span>
              {servico !== 'transfer' && (
                <small className="text-muted">R$ {tour.precoBase}</small>
              )}
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                aria-label="Diminuir quantidade de inteiras"
                className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setQtdInteira(Math.max(1, qtdInteira - 1))}
              >
                <Minus size={14} aria-hidden="true" focusable="false" />
              </button>
              <span className="fw-bold fs-5">{qtdInteira}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade de inteiras"
                className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setQtdInteira(qtdInteira + 1)}
              >
                <Plus size={14} aria-hidden="true" focusable="false" />
              </button>
            </div>
          </div>

          {/* MEIA */}
          {servico !== 'transfer' && (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="d-block fw-bold">Meia Entrada</span>
                <small className="text-muted">R$ {tour.precoBase / 2}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  aria-label="Diminuir quantidade de meias"
                  className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => setQtdMeia(Math.max(0, qtdMeia - 1))}
                >
                  <Minus size={14} aria-hidden="true" focusable="false" />
                </button>
                <span className="fw-bold fs-5">{qtdMeia}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade de meias"
                  className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => setQtdMeia(qtdMeia + 1)}
                >
                  <Plus size={14} aria-hidden="true" focusable="false" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div className="col-md-6 ps-md-4">
        <label className="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
          <Package size={18} aria-hidden="true" focusable="false" />
          O que incluir
        </label>
        <div className="d-grid gap-2 mb-4">
          <button
            type="button"
            className={`btn p-3 text-start border-2 d-flex align-items-center gap-2 ${
              servico === 'completo'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('completo')}
          >
            <Package size={18} aria-hidden="true" focusable="false" />
            <span className="fw-bold">Ingresso + Transfer</span>
          </button>

          <button
            type="button"
            className={`btn p-3 text-start border-2 d-flex align-items-center gap-2 ${
              servico === 'ingresso'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('ingresso')}
          >
            <Ticket size={18} aria-hidden="true" focusable="false" />
            <span className="fw-bold">Apenas Ingresso</span>
          </button>

          <button
            type="button"
            className={`btn p-3 text-start border-2 d-flex align-items-center gap-2 ${
              servico === 'transfer'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('transfer')}
          >
            <Bus size={18} aria-hidden="true" focusable="false" />
            <span className="fw-bold">Apenas Transfer</span>
          </button>
        </div>

        {/* RESUMO */}
        <div className="border rounded-3 p-3 mb-3 bg-light">
          <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
            <Receipt size={16} aria-hidden="true" focusable="false" />
            Resumo do orçamento
          </h6>

          {servico === 'transfer' && isHighVolume ? (
            <div className="alert alert-warning mb-0 small border-warning d-flex gap-2">
              <AlertTriangle size={18} className="flex-shrink-0" aria-hidden="true" focusable="false" />
              <div>
                <strong>Grupo acima de 4 pessoas.</strong>
                <br />
                Orçamento de transporte via WhatsApp.
              </div>
            </div>
          ) : (
            <>
              {servico !== 'transfer' && (
                <div className="d-flex justify-content-between">
                  <span>Ingressos</span>
                  <span>R$ {custoIngressos.toFixed(2)}</span>
                </div>
              )}

              {servico !== 'ingresso' && (
                <div className="d-flex justify-content-between mt-1">
                  <span>Transfer</span>
                  <span>
                    {isHighVolume ? 'Sob Consulta' : `R$ ${custoTransfer.toFixed(2)}`}
                  </span>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5 text-primary">
                <span>Total</span>
                <span>
                  {(!isHighVolume || servico === 'ingresso')
                    ? `R$ ${totalGeral.toFixed(2)}`
                    : 'A cotar'}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn btn-success w-100 py-3 fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2"
          onClick={onSubmit}
          disabled={!data || (qtdInteira === 0 && qtdMeia === 0)}
        >
          <WhatsAppIcon />
          FINALIZAR NO WHATSAPP
        </button>
      </div>
    </div>
  );
};

export default ReservaForm;
