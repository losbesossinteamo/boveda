import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, fonts, makeStyles, THEME_IDS, ThemeId, THEMES } from '../theme';
import { BottomSheet } from './BottomSheet';

interface Props {
  visible: boolean;
  themeId: ThemeId;
  onChange: (id: ThemeId) => void;
  onClose: () => void;
}

export function SettingsModal({ visible, themeId, onChange, onClose }: Props) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={s.title}>Ajustes</Text>
      <Text style={s.section}>TEMA</Text>

      <View style={s.grid}>
        {THEME_IDS.map((id) => {
          const t = THEMES[id];
          const on = id === themeId;
          return (
            <TouchableOpacity key={id} style={[s.cell, on && { borderColor: colors.accent }]} onPress={() => onChange(id)} activeOpacity={0.8}>
              {/* Mini vista previa del tema: fondo, acento y texto */}
              <View style={[s.swatch, { backgroundColor: t.colors.bg, borderColor: t.colors.border }]}>
                <View style={[s.dot, { backgroundColor: t.colors.accent }]} />
                <View style={[s.bar, { backgroundColor: t.colors.muted }]} />
              </View>
              <Text style={s.name}>{t.name}</Text>
              {on && <Check color={colors.accent} size={16} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={s.done} onPress={onClose}>
        <Text style={s.doneText}>Listo</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

const s = makeStyles(() => StyleSheet.create({
  title: { color: colors.text, fontSize: 17, fontFamily: fonts.bold, marginBottom: 16 },
  section: { color: colors.faint, fontSize: 11, fontFamily: fonts.bold, letterSpacing: 1.2, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '48.5%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 16, backgroundColor: colors.inset, borderWidth: 1.5, borderColor: colors.border, marginBottom: 10 },
  swatch: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 5 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  bar: { width: 22, height: 5, borderRadius: 3 },
  name: { flex: 1, color: colors.text, fontSize: 14, fontFamily: fonts.semibold },
  done: { marginTop: 6, padding: 14, borderRadius: 16, backgroundColor: colors.accent, alignItems: 'center' },
  doneText: { color: colors.onAccent, fontFamily: fonts.extrabold, fontSize: 15 },
}));
