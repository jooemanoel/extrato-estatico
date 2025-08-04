export function normalizar(texto: string) {
  return texto
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z ]/g, '');
}

export function formatarParaReal(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarStringParaReal(valor: string): string {
  return parseFloat(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarTimestampParaData(timestamp: string) {
  const [ano, mes, dia] = timestamp.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
}

export function formatarDateParaString(data: Date = new Date()) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
