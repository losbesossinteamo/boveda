import { useEffect, useState } from 'react';
import { loadTheme, saveTheme } from '../storage';
import { applyTheme, DEFAULT_THEME, isThemeId, ThemeId } from '../theme';

/** Carga el tema guardado, lo aplica y permite cambiarlo (se guarda solo). */
export function useAppTheme() {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTheme()
      .then((id) => {
        if (isThemeId(id)) {
          applyTheme(id);
          setThemeId(id);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const change = (id: ThemeId) => {
    applyTheme(id);
    setThemeId(id);
    saveTheme(id);
  };

  return { themeId, ready, change };
}
