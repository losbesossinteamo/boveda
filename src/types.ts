export type TxType = 'expense' | 'income';
export type Tab = 'dashboard' | 'history';

export interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  category: string;
  note: string;
  /** Fecha local AAAA-MM-DD */
  date: string;
  /** Si viene de una repetición automática */
  recurringId?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  amount: number;
  category: string;
  type: TxType;
}

export interface Recurring {
  id: string;
  type: TxType;
  amount: number;
  category: string;
  note: string;
  /** Día del mes (1-31). En meses cortos se usa el último día. */
  day: number;
  /** Próximo mes pendiente de generar, AAAA-MM */
  next: string;
}

export interface AppData {
  txs: Transaction[];
  recs: Recurring[];
  quick: QuickAction[];
}
