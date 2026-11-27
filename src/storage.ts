import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_QUICK_ACTIONS } from './constants/quickActions';
import type { AppData } from './types';

const KEY = '@boveda_data_v7';
// Claves de la versión anterior (se migran la primera vez)
const OLD_TX = '@boveda_tx_v6';
const OLD_QUICK = '@boveda_quick_v6';

const EMPTY: AppData = { txs: [], recs: [], quick: DEFAULT_QUICK_ACTIONS };

export async function loadData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        txs: Array.isArray(p.txs) ? p.txs : [],
        recs: Array.isArray(p.recs) ? p.recs : [],
        quick: Array.isArray(p.quick) ? p.quick : DEFAULT_QUICK_ACTIONS,
      };
    }
    const [tx, quick] = await Promise.all([AsyncStorage.getItem(OLD_TX), AsyncStorage.getItem(OLD_QUICK)]);
    if (!tx && !quick) return EMPTY;
    const txs = tx ? (JSON.parse(tx) as any[]).map((t) => ({ ...t, date: String(t.date).slice(0, 10) })) : [];
    return { txs, recs: [], quick: quick ? JSON.parse(quick) : DEFAULT_QUICK_ACTIONS };
  } catch (e) {
    console.error('No se pudieron cargar los datos', e);
    return EMPTY;
  }
}

export async function saveData(data: AppData) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error('No se pudieron guardar los datos', e);
  }
}

const THEME_KEY = '@boveda_theme_v1';

export async function loadTheme(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

export async function saveTheme(id: string) {
  try {
    await AsyncStorage.setItem(THEME_KEY, id);
  } catch (e) {
    console.error('No se pudo guardar el tema', e);
  }
}
