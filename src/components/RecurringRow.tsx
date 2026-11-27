import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { getCategory } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import type { Recurring } from '../types';
import { dateForDay, formatDay } from '../utils/dates';
import { money } from '../utils/format';

interface Props {
  rec: Recurring;
  hidden: boolean;
  onDelete: (id: string) => void;
}

export function RecurringRow({ rec, hidden, onDelete }: Props) {
  const cat = getCategory(rec.type, rec.category);
  const income = rec.type === 'income';
  return (
    <View style={s.row}>
      <View style={[s.icon, { backgroundColor: `${cat.color}20` }]}>
        <cat.Icon color={cat.color} size={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.note} numberOfLines={1}>{rec.note}</Text>
        <Text style={s.sub}>Día {rec.day} de cada mes · próximo {formatDay(dateForDay(rec.next, rec.day))}</Text>
      </View>
      <Text style={[s.amount, income && { color: colors.income }]}>{income ? '+' : '-'}{money(rec.amount, hidden)}</Text>
      <TouchableOpacity onPress={() => onDelete(rec.id)} style={{ padding: 6 }} accessibilityLabel="Eliminar repetición">
        <Trash2 color={colors.faint} size={16} />
      </TouchableOpacity>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  icon: { padding: 10, borderRadius: 14 },
  note: { color: colors.text, fontSize: 14, fontFamily: fonts.semibold },
  sub: { color: colors.faint, fontSize: 11, fontFamily: fonts.medium, marginTop: 2 },
  amount: { color: colors.text, fontSize: 15, fontFamily: fonts.bold },
}));
