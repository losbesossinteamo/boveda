import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react-native';
import { colors, fonts, makeStyles } from '../theme';
import { money } from '../utils/format';
import { Card } from './Card';

interface Props {
  balance: number;
  income: number;
  expense: number;
  hidden: boolean;
}

export function BalanceCard({ balance, income, expense, hidden }: Props) {
  return (
    <Card label="SALDO TOTAL">
      <Text style={[s.balance, balance < 0 && { color: colors.expense }]}>{money(balance, hidden)}</Text>
      <View style={s.split}>
        <Metric label="Ingresos del mes" value={money(income, hidden)} color={colors.income} Icon={ArrowUpRight} />
        <Metric label="Gastos del mes" value={money(expense, hidden)} color={colors.expense} Icon={ArrowDownRight} />
      </View>
    </Card>
  );
}

function Metric({ label, value, color, Icon }: { label: string; value: string; color: string; Icon: typeof ArrowUpRight }) {
  return (
    <View style={s.metric}>
      <View style={s.metricHead}>
        <Icon color={color} size={15} />
        <Text style={s.metricLabel} numberOfLines={1}>{label}</Text>
      </View>
      <Text style={[s.metricValue, { color }]}>{value}</Text>
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  balance: { color: colors.text, fontSize: 36, fontFamily: fonts.extrabold, letterSpacing: -0.5, marginBottom: 16 },
  split: { flexDirection: 'row', gap: 12 },
  metric: { flex: 1, backgroundColor: colors.inset, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  metricHead: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  metricLabel: { color: colors.muted, fontSize: 12, fontFamily: fonts.medium, flexShrink: 1 },
  metricValue: { fontSize: 16, fontFamily: fonts.bold },
}));
