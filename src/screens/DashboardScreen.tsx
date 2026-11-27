import React from 'react';
import { View } from 'react-native';
import { BalanceCard } from '../components/BalanceCard';
import { ExpenseDonut } from '../components/ExpenseDonut';
import { MonthSelector } from '../components/MonthSelector';
import { QuickActions } from '../components/QuickActions';
import type { QuickAction } from '../types';
import type { Stats } from '../utils/stats';

interface Props {
  month: string;
  onMonthChange: (m: string) => void;
  stats: Stats;
  hidden: boolean;
  activeMonths: Set<string>;
  quick: QuickAction[];
  onUseQuick: (a: QuickAction) => void;
  onEditQuick: (a: QuickAction) => void;
  onAddQuick: () => void;
}

export function DashboardScreen(p: Props) {
  return (
    <View style={{ gap: 14 }}>
      <MonthSelector month={p.month} onChange={p.onMonthChange} activeMonths={p.activeMonths} />
      <BalanceCard balance={p.stats.balance} income={p.stats.income} expense={p.stats.expense} hidden={p.hidden} />
      <QuickActions actions={p.quick} hidden={p.hidden} onUse={p.onUseQuick} onEdit={p.onEditQuick} onAdd={p.onAddQuick} />
      <ExpenseDonut byCategory={p.stats.byCategory} total={p.stats.expense} hidden={p.hidden} />
    </View>
  );
}
