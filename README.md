# Bóveda — finanzas personales (Expo + React Native + TypeScript)

## Instalación
```bash
npx create-expo-app@latest boveda --template blank-typescript
cd boveda

npx expo install react-native-svg @react-native-async-storage/async-storage \
  react-native-safe-area-context expo-font @expo-google-fonts/outfit \
  react-native-web react-dom @expo/metro-runtime
npm install lucide-react-native
```
Copia `App.tsx` y la carpeta `src/` dentro del proyecto (sustituyendo el `App.tsx` generado).

## Ejecutar
```bash
npx expo start --web     # Chrome → F12 → icono de móvil (Ctrl+Shift+M)
npx expo start           # móvil real con Expo Go (escanea el QR)
```

## Estructura
```
App.tsx                      Pantalla raíz: fuentes, pestañas, modales
src/
  types.ts                   Tipos (Transaction, Recurring, QuickAction…)
  theme.ts                   Colores y fuentes
  storage.ts                 AsyncStorage + migración de la v6
  constants/                 Categorías y atajos por defecto
  utils/                     dates, format (dinero/teclado), recurring, stats
  hooks/useFinanceData.ts    Estado, persistencia, acciones y «deshacer»
  components/                Piezas de UI reutilizables
  modals/                    Nuevo movimiento, editar atajo
  screens/                   Resumen e Historial/Automáticos
```
