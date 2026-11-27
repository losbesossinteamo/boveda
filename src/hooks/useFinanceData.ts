import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { DEFAULT_QUICK_ACTIONS } from '../constants/quickActions';
import { loadData, saveData } from '../storage';
import type { AppData, QuickAction, Recurring, Transaction, TxType } from '../types';
import { nextOccurrence, todayYMD } from '../utils/dates';
import { money, uid } from '../utils/format';
import { reconcile } from '../utils/recurring';

export interface UndoInfo {
  message: string;
  undo: () => void;
}

export interface NewEntry {
  type: TxType;
  amount: number;
  category: string;
  note?: string;
}

const EMPTY: AppData = { txs: [], recs: [], quick: DEFAULT_QUICK_ACTIONS };

export function useFinanceData() {
  const [data, setData] = useState<AppData>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [undo, setUndo] = useState<UndoInfo | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carga inicial + al volver a abrir la app se generan las repeticiones pendientes
  useEffect(() => {
    loadData().then((d) => setData(reconcile(d))).finally(() => setLoaded(true));
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') setData((d) => reconcile(d));
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (loaded) saveData(data);
  }, [data, loaded]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const offerUndo = (message: string, undoFn: () => void) => {
    if (timer.current) clearTimeout(timer.current);
    setUndo({ message, undo: undoFn });
    timer.current = setTimeout(() => setUndo(null), 5000);
  };

  const runUndo = () => {
    if (timer.current) clearTimeout(timer.current);
    undo?.undo();
    setUndo(null);
  };

  const addTransaction = (e: NewEntry) => {
    if (!(e.amount > 0)) return;
    const tx: Transaction = {
      id: uid(),
      type: e.type,
      amount: Number(e.amount.toFixed(2)),
      category: e.category,
      note: e.note?.trim() || 'Movimiento',
      date: todayYMD(),
    };
    setData((d) => ({ ...d, txs: [tx, ...d.txs] }));
    offerUndo(`Añadido: ${tx.note} (${money(tx.amount)})`, () =>
      setData((d) => ({ ...d, txs: d.txs.filter((t) => t.id !== tx.id) }))
    );
  };

  const deleteTransaction = (id: string) => {
    const tx = data.txs.find((t) => t.id === id);
    if (!tx) return;
    setData((d) => ({ ...d, txs: d.txs.filter((t) => t.id !== id) }));
    offerUndo(`Eliminado: ${tx.note}`, () => setData((d) => ({ ...d, txs: [tx, ...d.txs] })));
  };

  const addRecurring = (e: NewEntry & { day: number }) => {
    if (!(e.amount > 0)) return;
    const rec: Recurring = {
      id: uid(),
      type: e.type,
      amount: Number(e.amount.toFixed(2)),
      category: e.category,
      note: e.note?.trim() || 'Movimiento',
      day: e.day,
      next: nextOccurrence(e.day).key,
    };
    setData((d) => reconcile({ ...d, recs: [...d.recs, rec] }));
  };

  const deleteRecurring = (id: string) => {
    const rec = data.recs.find((r) => r.id === id);
    if (!rec) return;
    setData((d) => ({ ...d, recs: d.recs.filter((r) => r.id !== id) }));
    offerUndo(`Repetición eliminada: ${rec.note}`, () => setData((d) => ({ ...d, recs: [...d.recs, rec] })));
  };

  const saveQuick = (q: QuickAction) =>
    setData((d) => ({
      ...d,
      quick: d.quick.some((x) => x.id === q.id) ? d.quick.map((x) => (x.id === q.id ? q : x)) : [...d.quick, q],
    }));

  const deleteQuick = (id: string) => setData((d) => ({ ...d, quick: d.quick.filter((x) => x.id !== id) }));

  return {
    data, loaded, undo, runUndo,
    addTransaction, deleteTransaction, addRecurring, deleteRecurring, saveQuick, deleteQuick,
  };
}
