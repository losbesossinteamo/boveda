import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, makeStyles } from '../theme';

interface Props {
  onCancel: () => void;
  onSave: () => void;
  saveLabel: string;
  disabled?: boolean;
}

export function ModalActions({ onCancel, onSave, saveLabel, disabled }: Props) {
  return (
    <View style={s.row}>
      <TouchableOpacity style={s.cancel} onPress={onCancel}>
        <Text style={s.cancelText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.save, disabled && { opacity: 0.4 }]} onPress={onSave} disabled={disabled}>
        <Text style={s.saveText}>{saveLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  cancel: { flex: 1, padding: 14, borderRadius: 16, backgroundColor: colors.border, alignItems: 'center' },
  cancelText: { color: colors.muted, fontFamily: fonts.bold },
  save: { flex: 2, padding: 14, borderRadius: 16, backgroundColor: colors.accent, alignItems: 'center' },
  saveText: { color: colors.onAccent, fontFamily: fonts.extrabold, fontSize: 15 },
}));
