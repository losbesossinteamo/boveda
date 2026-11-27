import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List, Plus, Wallet } from 'lucide-react-native';
import { colors, fonts, makeStyles } from '../theme';
import type { Tab } from '../types';

interface Props {
  tab: Tab;
  onTab: (tab: Tab) => void;
  onAdd: () => void;
}

const TABS: { key: Tab; label: string; Icon: typeof Wallet }[] = [
  { key: 'dashboard', label: 'Resumen', Icon: Wallet },
  { key: 'history', label: 'Movimientos', Icon: List },
];

export function BottomDock({ tab, onTab, onAdd }: Props) {
  const renderTab = ({ key, label, Icon }: (typeof TABS)[number]) => {
    const on = tab === key;
    return (
      <View key={key} style={s.slot}>
        <TouchableOpacity style={s.tab} onPress={() => onTab(key)}>
          <Icon color={on ? colors.accent : colors.faint} size={21} />
          <Text style={[s.label, on && { color: colors.accent }]}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={s.dock}>
      {renderTab(TABS[0])}
      <View style={s.spacer} />
      {renderTab(TABS[1])}
      {/* Botón + centrado de verdad: posición absoluta en el centro exacto del dock */}
      <TouchableOpacity style={s.fab} activeOpacity={0.85} onPress={onAdd} accessibilityLabel="Nuevo movimiento">
        <Plus color={colors.onAccent} size={28} strokeWidth={2.6} />
      </TouchableOpacity>
    </View>
  );
}

const FAB = 56;
const s = makeStyles(() => StyleSheet.create({
  dock: { position: 'absolute', bottom: 18, left: 20, right: 20, height: 66, backgroundColor: colors.raised, borderRadius: 24, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  slot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  spacer: { width: FAB + 16 },
  tab: { alignItems: 'center', justifyContent: 'center', gap: 3 },
  label: { color: colors.faint, fontSize: 11, fontFamily: fonts.semibold },
  // Alto interior del dock = 66 - 2 de borde = 64 → (64 - 56) / 2 = 4
  fab: { position: 'absolute', left: '50%', marginLeft: -FAB / 2, top: (64 - FAB) / 2, width: FAB, height: FAB, borderRadius: FAB / 2, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', shadowColor: colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 8 },
}));
