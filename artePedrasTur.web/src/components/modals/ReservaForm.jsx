import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

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
        <label className="fw-bold text-primary mb-2">📅 Selecione a Data</label>
        <div className="border rounded-3 p-3 mb-4 d-flex justify-content-center bg-white shadow-sm">
          <DayPicker
            mode="single"
            selected={data}
            onSelect={setData}
            fromDate={new Date()}
          />
        </div>

        <label className="fw-bold text-primary mb-2">👥 Passageiros</label>
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
                className="btn btn-outline-primary btn-sm rounded-circle"
                onClick={() => setQtdInteira(Math.max(1, qtdInteira - 1))}
              >
                -
              </button>
              <span className="fw-bold fs-5">{qtdInteira}</span>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm rounded-circle"
                onClick={() => setQtdInteira(qtdInteira + 1)}
              >
                +
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
                  className="btn btn-outline-primary btn-sm rounded-circle"
                  onClick={() => setQtdMeia(Math.max(0, qtdMeia - 1))}
                >
                  -
                </button>
                <span className="fw-bold fs-5">{qtdMeia}</span>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-circle"
                  onClick={() => setQtdMeia(qtdMeia + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div className="col-md-6 ps-md-4">
        <label className="fw-bold text-primary mb-3">🚐 O que incluir</label>
        <div className="d-grid gap-2 mb-4">
          <button
            type="button"
            className={`btn p-3 text-start border-2 ${
              servico === 'completo'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('completo')}
          >
            <div className="fw-bold">🎟️ Ingresso + 🚐 Transfer</div>
          </button>

          <button
            type="button"
            className={`btn p-3 text-start border-2 ${
              servico === 'ingresso'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('ingresso')}
          >
            <div className="fw-bold">🎟️ Apenas Ingresso</div>
          </button>

          <button
            type="button"
            className={`btn p-3 text-start border-2 ${
              servico === 'transfer'
                ? 'btn-primary border-primary'
                : 'btn-outline-light text-dark border-light shadow-sm'
            }`}
            onClick={() => setServico('transfer')}
          >
            <div className="fw-bold">🚐 Apenas Transfer</div>
          </button>
        </div>

        {/* RESUMO */}
        <div className="border rounded-3 p-3 mb-3 bg-light">
          <h6 className="fw-bold mb-2">💰 Resumo do orçamento</h6>

          {servico === 'transfer' && isHighVolume ? (
            <div className="alert alert-warning mb-0 small border-warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Grupo acima de 4 pessoas.</strong>
              <br />
              Orçamento de transporte via WhatsApp.
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
          className="btn btn-success w-100 py-3 fw-bold shadow-lg"
          onClick={onSubmit}
          disabled={!data || (qtdInteira === 0 && qtdMeia === 0)}
        >
          <i className="bi bi-whatsapp me-2"></i>
          FINALIZAR NO WHATSAPP
        </button>
      </div>
    </div>
  );
};

export default ReservaForm;
