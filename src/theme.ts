import { StyleSheet } from 'react-native';

export interface Palette {
  bg: string;
  surface: string;
  raised: string;
  inset: string;
  border: string;
  text: string;
  textSoft: string;
  muted: string;
  faint: string;
  accent: string;
  /** Color del texto/icono encima del color de acento */
  onAccent: string;
  income: string;
  expense: string;
  /** true = tema oscuro (barra de estado clara) */
  dark: boolean;
}

/** Genera un tema oscuro tintado con un tono (hue) y un color de acento. */
const dark = (hue: number, accent: string, onAccent = '#090D16'): Palette => ({
  bg: `hsl(${hue}, 35%, 5%)`,
  surface: `hsl(${hue}, 28%, 9%)`,
  raised: `hsl(${hue}, 28%, 11%)`,
  inset: `hsl(${hue}, 32%, 7%)`,
  border: `hsl(${hue}, 25%, 17%)`,
  text: `hsl(${hue}, 60%, 97%)`,
  textSoft: `hsl(${hue}, 30%, 82%)`,
  muted: `hsl(${hue}, 18%, 65%)`,
  faint: `hsl(${hue}, 12%, 48%)`,
  accent,
  onAccent,
  income: '#10B981',
  expense: '#F43F5E',
  dark: true,
});

export type ThemeId = 'noche' | 'rosa' | 'verde' | 'rojo' | 'amarillo' | 'morado' | 'naranja' | 'blanco';

export const THEMES: Record<ThemeId, { name: string; colors: Palette }> = {
  noche: {
    name: 'Noche',
    colors: {
      bg: '#090D16', surface: '#111827', raised: '#131B2E', inset: '#0B101D', border: '#1E293B',
      text: '#F8FAFC', textSoft: '#CBD5E1', muted: '#94A3B8', faint: '#64748B',
      accent: '#38BDF8', onAccent: '#090D16', income: '#10B981', expense: '#F43F5E', dark: true,
    },
  },
  rosa: { name: 'Rosa', colors: dark(330, '#F472B6') },
  verde: { name: 'Verde', colors: dark(155, '#34D399') },
  rojo: { name: 'Rojo', colors: dark(0, '#EF4444', '#FFFFFF') },
  amarillo: { name: 'Amarillo', colors: dark(45, '#FACC15', '#1A1400') },
  morado: { name: 'Morado', colors: dark(262, '#A78BFA') },
  naranja: { name: 'Naranja', colors: dark(24, '#FB923C', '#1A0F00') },
  blanco: {
    name: 'Blanco',
    colors: {
      bg: '#F1F5F9', surface: '#FFFFFF', raised: '#FFFFFF', inset: '#F1F5F9', border: '#E2E8F0',
      text: '#0F172A', textSoft: '#334155', muted: '#64748B', faint: '#94A3B8',
      accent: '#2563EB', onAccent: '#FFFFFF', income: '#059669', expense: '#E11D48', dark: false,
    },
  },
};

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];
export const DEFAULT_THEME: ThemeId = 'noche';
export const isThemeId = (x: unknown): x is ThemeId => typeof x === 'string' && x in THEMES;

/**
 * Paleta ACTIVA. Es un objeto mutable: applyTheme() cambia sus valores y los
 * componentes la leen al renderizar, así que basta con volver a renderizar la app.
 */
export const colors: Palette = { ...THEMES[DEFAULT_THEME].colors };
let version = 0;

export function applyTheme(id: ThemeId) {
  Object.assign(colors, THEMES[id].colors);
  version++;
}

/**
 * Como StyleSheet.create, pero se recalcula cuando cambia el tema.
 * Uso: const s = makeStyles(() => StyleSheet.create({ ... }));
 */
export function makeStyles<T extends object>(factory: () => T): T {
  let cache: T | undefined;
  let seen = -1;
  return new Proxy({} as T, {
    get(_t, prop) {
      if (!cache || seen !== version) {
        cache = factory();
        seen = version;
      }
      return (cache as any)[prop];
    },
  });
}

/** Añade transparencia a un color #RRGGBB (a entre 0 y 1). */
export const alpha = (hex: string, a: number) => `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

export const fonts = {
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
  extrabold: 'Outfit_800ExtraBold',
};
