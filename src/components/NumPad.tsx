import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Delete } from 'lucide-react-native';
import { colors, fonts, makeStyles } from '../theme';
import { applyKey } from '../utils/format';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function NumPad({ value, onChange }: Props) {
  return (
    <View style={s.pad}>
      {KEYS.map((k) => (
        <TouchableOpacity key={k} style={s.key} onPress={() => onChange(applyKey(value, k))} activeOpacity={0.7}>
          {k === 'del' ? <Delete color={colors.muted} size={22} /> : <Text style={s.text}>{k === '.' ? ',' : k}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function AmountDisplay({ value }: { value: string }) {
  return (
    <View style={s.display}>
      <Text style={s.displayText}>{value.replace('.', ',')} €</Text>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  pad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  key: { width: '31%', backgroundColor: colors.inset, paddingVertical: 12, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  text: { color: colors.text, fontSize: 18, fontFamily: fonts.bold },
  display: { flex: 1, backgroundColor: colors.inset, borderRadius: 16, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  displayText: { color: colors.text, fontSize: 34, fontFamily: fonts.extrabold, letterSpacing: -0.5 },
}));
