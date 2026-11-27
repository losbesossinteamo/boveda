import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { MonthSelector } from '../components/MonthSelector';
import { RecurringRow } from '../components/RecurringRow';
import { SegmentedControl } from '../components/SegmentedControl';
import { TransactionRow } from '../components/TransactionRow';
import { colors, fonts, makeStyles } from '../theme';
import type { Recurring, Transaction } from '../types';

interface Props {
  month: string;
  onMonthChange: (m: string) => void;
  txs: Transaction[];
  recs: Recurring[];
  hidden: boolean;
  activeMonths: Set<string>;
  onDeleteTx: (id: string) => void;
  onDeleteRec: (id: string) => void;
}

export function HistoryScreen(p: Props) {
  const [view, setView] = useState<'txs' | 'recs'>('txs');
  return (
    <View style={{ gap: 14 }}>
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { key: 'txs', label: 'Historial' },
          { key: 'recs', label: `Automáticos (${p.recs.length})` },
        ]}
      />

      {view === 'txs' ? (
        <>
          <MonthSelector month={p.month} onChange={p.onMonthChange} activeMonths={p.activeMonths} />
          <Card label="MOVIMIENTOS DEL MES">
            {p.txs.length === 0 ? (
              <Text style={s.empty}>Sin movimientos este mes.</Text>
            ) : (
              p.txs.map((t) => <TransactionRow key={t.id} tx={t} hidden={p.hidden} onDelete={p.onDeleteTx} />)
            )}
          </Card>
        </>
      ) : (
        <Card label="REPETICIONES MENSUALES" hint="Se añaden solas">
          {p.recs.length === 0 ? (
            <Text style={s.empty}>Aún no tienes ninguna. Pulsa + y activa «Repetir cada mes» para tu sueldo, alquiler, suscripciones…</Text>
          ) : (
            p.recs.map((r) => <RecurringRow key={r.id} rec={r} hidden={p.hidden} onDelete={p.onDeleteRec} />)
          )}
        </Card>
      )}
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  empty: { color: colors.faint, fontSize: 13, fontFamily: fonts.medium, paddingVertical: 8, lineHeight: 19 },
}));
