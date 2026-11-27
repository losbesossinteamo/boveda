import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Repeat, Trash2 } from 'lucide-react-native';
import { getCategory } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import type { Transaction } from '../types';
import { formatDay } from '../utils/dates';
import { money } from '../utils/format';

interface Props {
  tx: Transaction;
  hidden: boolean;
  onDelete: (id: string) => void;
}

export function TransactionRow({ tx, hidden, onDelete }: Props) {
  const cat = getCategory(tx.type, tx.category);
  const income = tx.type === 'income';
  return (
    <View style={s.row}>
      <View style={[s.icon, { backgroundColor: `${cat.color}20` }]}>
        <cat.Icon color={cat.color} size={18} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.note} numberOfLines={1}>{tx.note}</Text>
        <View style={s.dateRow}>
          {tx.recurringId ? <Repeat color={colors.faint} size={11} /> : null}
          <Text style={s.date}>{formatDay(tx.date)}{tx.recurringId ? ' · automático' : ''}</Text>
        </View>
      </View>
      <Text style={[s.amount, income && { color: colors.income }]}>{income ? '+' : '-'}{money(tx.amount, hidden)}</Text>
      <TouchableOpacity onPress={() => onDelete(tx.id)} style={{ padding: 6 }} accessibilityLabel="Eliminar">
        <Trash2 color={colors.faint} size={16} />
      </TouchableOpacity>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  icon: { padding: 10, borderRadius: 14 },
  note: { color: colors.text, fontSize: 14, fontFamily: fonts.semibold },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  date: { color: colors.faint, fontSize: 11, fontFamily: fonts.medium },
  amount: { color: colors.text, fontSize: 15, fontFamily: fonts.bold },
}));
