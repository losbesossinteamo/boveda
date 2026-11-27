import {
  Briefcase, Car, Coffee, CreditCard, DollarSign, Gamepad2, Package, Utensils,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { TxType } from '../types';

export interface CategoryInfo {
  label: string;
  color: string;
  Icon: LucideIcon;
}

export const EXPENSE_CATEGORIES: Record<string, CategoryInfo> = {
  comida: { label: 'Comida', color: '#F59E0B', Icon: Utensils },
  cafe: { label: 'Café / Snack', color: '#D97706', Icon: Coffee },
  transporte: { label: 'Transporte', color: '#3B82F6', Icon: Car },
  ocio: { label: 'Ocio', color: '#EC4899', Icon: Gamepad2 },
  suscripciones: { label: 'Suscripciones', color: '#8B5CF6', Icon: CreditCard },
  otros: { label: 'Otros', color: '#64748B', Icon: Package },
};

export const INCOME_CATEGORIES: Record<string, CategoryInfo> = {
  nomina: { label: 'Nómina / Sueldo', color: '#10B981', Icon: Briefcase },
  extra: { label: 'Ingreso extra', color: '#34D399', Icon: DollarSign },
  regalo: { label: 'Regalo / Venta', color: '#059669', Icon: Package },
  otros: { label: 'Otros', color: '#64748B', Icon: Package },
};

export const categoriesFor = (type: TxType) =>
  type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

export const firstCategory = (type: TxType) => Object.keys(categoriesFor(type))[0];

/** Devuelve la categoría o «otros» si la guardada ya no existe. */
export const getCategory = (type: TxType, key: string): CategoryInfo =>
  categoriesFor(type)[key] ?? categoriesFor(type).otros;
