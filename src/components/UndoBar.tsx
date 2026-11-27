import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { colors, fonts, makeStyles, alpha } from '../theme';
import type { UndoInfo } from '../hooks/useFinanceData';

export function UndoBar({ undo, onUndo }: { undo: UndoInfo | null; onUndo: () => void }) {
  if (!undo) return null;
  return (
    <View style={s.bar}>
      <Text style={s.text} numberOfLines={1}>{undo.message}</Text>
      <TouchableOpacity style={s.btn} onPress={onUndo}>
        <RotateCcw color={colors.accent} size={14} />
        <Text style={s.btnText}>Deshacer</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.raised, marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: alpha(colors.accent, 0.25) },
  text: { color: colors.textSoft, fontSize: 12, fontFamily: fonts.medium, flex: 1, marginRight: 8 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  btnText: { color: colors.accent, fontFamily: fonts.bold, fontSize: 12 },
}));
