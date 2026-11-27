import type { Transaction } from '../types';

export interface Stats {
  /** Saldo de todos los meses */
  balance: number;
  income: number;
  expense: number;
  byCategory: Record<string, number>;
  monthTxs: Transaction[];
}

export function computeStats(txs: Transaction[], month: string): Stats {
  let balance = 0, income = 0, expense = 0;
  const byCategory: Record<string, number> = {};
  const monthTxs: Transaction[] = [];

  for (const t of txs) {
    balance += t.type === 'income' ? t.amount : -t.amount;
    if (!t.date.startsWith(month)) continue;
    monthTxs.push(t);
    if (t.type === 'income') income += t.amount;
    else {
      expense += t.amount;
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    }
  }
  monthTxs.sort((a, b) => (a.date === b.date ? (a.id < b.id ? 1 : -1) : a.date < b.date ? 1 : -1));
  return { balance, income, expense, byCategory, monthTxs };
}
