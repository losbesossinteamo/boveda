import React, { useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold, useFonts,
} from '@expo-google-fonts/outfit';
import { BottomDock } from './src/components/BottomDock';
import { Header } from './src/components/Header';
import { UndoBar } from './src/components/UndoBar';
import { useAppTheme } from './src/hooks/useAppTheme';
import { useFinanceData } from './src/hooks/useFinanceData';
import { AddTransactionModal, EntrySubmit } from './src/modals/AddTransactionModal';
import { EditQuickModal } from './src/modals/EditQuickModal';
import { SettingsModal } from './src/modals/SettingsModal';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { colors, makeStyles } from './src/theme';
import type { QuickAction, Tab } from './src/types';
import { currentMonth } from './src/utils/dates';
import { uid } from './src/utils/format';
import { computeStats } from './src/utils/stats';

export default function App() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold });
  const fin = useFinanceData();
  const theme = useAppTheme();

  const [tab, setTab] = useState<Tab>('dashboard');
  const [month, setMonth] = useState(currentMonth());
  const [hidden, setHidden] = useState(false);
  const [adding, setAdding] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingQuick, setEditingQuick] = useState<QuickAction | null>(null);

  const stats = useMemo(() => computeStats(fin.data.txs, month), [fin.data.txs, month]);

  const activeMonths = useMemo(() => new Set(fin.data.txs.map((t) => t.date.slice(0, 7))), [fin.data.txs]);

  // En web, el fondo de la página sigue al tema (evita bordes de otro color)
  useEffect(() => {
    if (Platform.OS === 'web') document.body.style.backgroundColor = colors.bg;
  }, [theme.themeId]);

  if (!fontsLoaded || !fin.loaded || !theme.ready) return <View style={s.root} />;

  const handleSubmit = (e: EntrySubmit) => {
    const { repeatDay, ...entry } = e;
    if (repeatDay) fin.addRecurring({ ...entry, day: repeatDay });
    else fin.addTransaction(entry);
  };

  const newQuick = (): QuickAction => ({ id: uid(), label: '', amount: 5, category: 'otros', type: 'expense' });

  return (
    <SafeAreaProvider>
      <View style={s.root}>
        <SafeAreaView style={s.app}>
          <StatusBar barStyle={colors.dark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />
          <Header hidden={hidden} onToggleHidden={() => setHidden(!hidden)} onOpenSettings={() => setSettingsOpen(true)} />
          <UndoBar undo={fin.undo} onUndo={fin.runUndo} />

          <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
            {tab === 'dashboard' ? (
              <DashboardScreen
                month={month} onMonthChange={setMonth} stats={stats} hidden={hidden} activeMonths={activeMonths} quick={fin.data.quick}
                onUseQuick={(a) => fin.addTransaction({ type: a.type, amount: a.amount, category: a.category, note: a.label })}
                onEditQuick={setEditingQuick}
                onAddQuick={() => setEditingQuick(newQuick())}
              />
            ) : (
              <HistoryScreen
                month={month} onMonthChange={setMonth} txs={stats.monthTxs} recs={fin.data.recs} hidden={hidden} activeMonths={activeMonths}
                onDeleteTx={fin.deleteTransaction} onDeleteRec={fin.deleteRecurring}
              />
            )}
          </ScrollView>

          <BottomDock tab={tab} onTab={setTab} onAdd={() => setAdding(true)} />
          <AddTransactionModal visible={adding} onClose={() => setAdding(false)} onSubmit={handleSubmit} />
          <EditQuickModal
            quick={editingQuick}
            exists={!!editingQuick && fin.data.quick.some((q) => q.id === editingQuick.id)}
            onSave={fin.saveQuick}
            onDelete={fin.deleteQuick}
            onClose={() => setEditingQuick(null)}
          />
          <SettingsModal visible={settingsOpen} themeId={theme.themeId} onChange={theme.change} onClose={() => setSettingsOpen(false)} />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const s = makeStyles(() => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  // En escritorio (Chrome) la app queda centrada con ancho de móvil
  app: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 120 },
}));
