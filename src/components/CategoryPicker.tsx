import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { categoriesFor } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import type { TxType } from '../types';

interface Props {
  type: TxType;
  selected: string;
  onSelect: (key: string) => void;
}

export function CategoryPicker({ type, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12, flexGrow: 0 }}>
      {Object.entries(categoriesFor(type)).map(([key, cat]) => {
        const on = selected === key;
        return (
          <TouchableOpacity key={key} onPress={() => onSelect(key)}
            style={[s.chip, on && { borderColor: cat.color, backgroundColor: `${cat.color}20` }]}>
            <cat.Icon color={cat.color} size={16} />
            <Text style={s.text}>{cat.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = makeStyles(() => StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.inset, marginRight: 8 },
  text: { color: colors.textSoft, fontSize: 13, fontFamily: fonts.medium },
}));
