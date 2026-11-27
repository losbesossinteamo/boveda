/** 1234.5 -> «1.234,50 €» */
export function money(n: number, hidden = false) {
  if (hidden) return '•••• €';
  const neg = Math.round(n * 100) < 0;
  const [int, dec] = Math.abs(n).toFixed(2).split('.');
  return `${neg ? '-' : ''}${int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${dec} €`;
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/** Teclado numérico: aplica una tecla al texto actual (máx. 2 decimales). */
export function applyKey(current: string, key: string): string {
  if (key === 'del') return current.length <= 1 ? '0' : current.slice(0, -1);
  if (key === '.') return current.includes('.') ? current : current + '.';
  if (current === '0') return key;
  const dec = current.split('.')[1];
  if (dec && dec.length >= 2) return current;
  if (current.replace('.', '').length >= 9) return current;
  return current + key;
}
