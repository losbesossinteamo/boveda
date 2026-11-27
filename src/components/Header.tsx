import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Eye, EyeOff, Settings } from 'lucide-react-native';
import { colors, fonts, makeStyles } from '../theme';

interface Props {
  hidden: boolean;
  onToggleHidden: () => void;
  onOpenSettings: () => void;
}

export function Header({ hidden, onToggleHidden, onOpenSettings }: Props) {
  const EyeIcon = hidden ? EyeOff : Eye;
  return (
    <View style={s.header}>
      <View>
        <Text style={s.title}>BÓVEDA</Text>
        <Text style={s.sub}>Control financiero personal</Text>
      </View>
      <View style={s.actions}>
        <TouchableOpacity style={s.btn} onPress={onToggleHidden} activeOpacity={0.7} accessibilityLabel="Ocultar importes">
          <EyeIcon color={colors.muted} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={onOpenSettings} activeOpacity={0.7} accessibilityLabel="Ajustes">
          <Settings color={colors.muted} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  title: { color: colors.text, fontSize: 20, fontFamily: fonts.extrabold, letterSpacing: 1.5 },
  sub: { color: colors.faint, fontSize: 12, fontFamily: fonts.medium, marginTop: 1 },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { backgroundColor: colors.raised, padding: 10, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
}));
