
export function calcularCustos({ servico, qtdInteira, qtdMeia, precoBase, valorTransfer }) {
  const totalPessoas = qtdInteira + qtdMeia;
  const isHighVolume = totalPessoas > 4;

  const custoIngressos =
    servico === 'transfer'
      ? 0
      : (qtdInteira * precoBase) + (qtdMeia * (precoBase / 2));

  let custoTransfer = 0;
  if (servico !== 'ingresso' && !isHighVolume) {
    custoTransfer = valorTransfer || 0;
  }

  return {
    totalPessoas,
    isHighVolume,
    custoIngressos,
    custoTransfer,
    totalGeral: custoIngressos + custoTransfer
  };
}
