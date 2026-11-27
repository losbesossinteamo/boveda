const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export const pad = (n: number) => String(n).padStart(2, '0');
export const toYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayYMD = () => toYMD(new Date());
export const currentMonth = () => todayYMD().slice(0, 7);

export const daysInMonth = (key: string) => new Date(+key.slice(0, 4), +key.slice(5, 7), 0).getDate();

export const addMonths = (key: string, n: number) => {
  const d = new Date(+key.slice(0, 4), +key.slice(5, 7) - 1 + n, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
};

export const monthLabel = (key: string) => `${MONTHS[+key.slice(5, 7) - 1]} ${key.slice(0, 4)}`;

/** «28 dic» */
export const formatDay = (ymd: string) => `${+ymd.slice(8, 10)} ${SHORT[+ymd.slice(5, 7) - 1]}`;

/** Fecha del día `day` en el mes `key`, ajustada si el mes es más corto. */
export const dateForDay = (key: string, day: number) => `${key}-${pad(Math.min(day, daysInMonth(key)))}`;

/** Primera fecha en que tocaría una repetición del día `day`, desde hoy. */
export function nextOccurrence(day: number, today = todayYMD()) {
  const key = today.slice(0, 7);
  const thisMonth = dateForDay(key, day);
  if (thisMonth >= today) return { key, date: thisMonth };
  const nextKey = addMonths(key, 1);
  return { key: nextKey, date: dateForDay(nextKey, day) };
}

export const MONTHS_SHORT = SHORT.map((m) => m[0].toUpperCase() + m.slice(1));
