import type { QuickAction } from '../types';

export const MAX_QUICK_ACTIONS = 6;

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: 'q1', label: 'Café', amount: 1.8, category: 'cafe', type: 'expense' },
  { id: 'q2', label: 'Transporte', amount: 2.5, category: 'transporte', type: 'expense' },
  { id: 'q3', label: 'Menú', amount: 12, category: 'comida', type: 'expense' },
  { id: 'q4', label: 'Supermercado', amount: 25, category: 'comida', type: 'expense' },
];
