import type { AppData, Transaction } from '../types';
import { addMonths, dateForDay, todayYMD } from './dates';

/**
 * Crea los movimientos de las repeticiones que ya les toca, incluidos los de
 * meses en que la app no se abrió. El id `${recurringId}-${mes}` evita duplicados.
 * Devuelve el mismo objeto si no hay cambios.
 */
export function reconcile(data: AppData, today = todayYMD()): AppData {
  const nowKey = today.slice(0, 7);
  const ids = new Set(data.txs.map((t) => t.id));
  const created: Transaction[] = [];
  let changed = false;

  const recs = data.recs.map((r) => {
    let key = r.next;
    while (key <= nowKey) {
      const date = dateForDay(key, r.day);
      if (date > today) break;
      const id = `${r.id}-${key}`;
      if (!ids.has(id)) {
        created.push({ id, type: r.type, amount: r.amount, category: r.category, note: r.note, date, recurringId: r.id });
      }
      key = addMonths(key, 1);
    }
    if (key !== r.next) changed = true;
    return key === r.next ? r : { ...r, next: key };
  });

  return changed || created.length ? { ...data, txs: [...created, ...data.txs], recs } : data;
}
