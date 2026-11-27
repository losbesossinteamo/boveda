import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors, fonts, makeStyles } from '../theme';
import { currentMonth, MONTHS_SHORT, pad } from '../utils/dates';
import { BottomSheet } from './BottomSheet';
import { ModalActions } from './ModalActions';

interface Props {
  visible: boolean;
  month: string;
  /** Meses (AAAA-MM) que tienen movimientos: se marcan con un punto */
  activeMonths?: Set<string>;
  onSelect: (month: string) => void;
  onClose: () => void;
}

const MIN_YEAR = 2000;

export function MonthPickerModal({ visible, month, activeMonths, onSelect, onClose }: Props) {
  const now = currentMonth();
  const nowYear = +now.slice(0, 4);
  const [year, setYear] = useState(nowYear);

  useEffect(() => {
    if (visible) setYear(+month.slice(0, 4));
  }, [visible]);

  const pick = (key: string) => {
    onSelect(key);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} animation="fade">
      <Text style={s.title}>Elegir mes</Text>

      <View style={s.yearRow}>
        <TouchableOpacity style={[s.arrow, year <= MIN_YEAR && { opacity: 0.3 }]} disabled={year <= MIN_YEAR} onPress={() => setYear(year - 1)} accessibilityLabel="Año anterior">
          <ChevronLeft color={colors.muted} size={20} />
        </TouchableOpacity>
        <Text style={s.year}>{year}</Text>
        <TouchableOpacity style={[s.arrow, year >= nowYear && { opacity: 0.3 }]} disabled={year >= nowYear} onPress={() => setYear(year + 1)} accessibilityLabel="Año siguiente">
          <ChevronRight color={colors.muted} size={20} />
        </TouchableOpacity>
      </View>

      <View style={s.grid}>
        {MONTHS_SHORT.map((name, i) => {
          const key = `${year}-${pad(i + 1)}`;
          const disabled = key > now;
          const selected = key === month;
          const hasData = activeMonths?.has(key);
          return (
            <TouchableOpacity key={key} disabled={disabled} activeOpacity={0.7} onPress={() => pick(key)}
              style={[s.cell, selected && s.cellOn, disabled && { opacity: 0.25 }]}>
              <Text style={[s.cellText, selected && { color: colors.onAccent }]}>{name}</Text>
              <View style={[s.dot, { backgroundColor: hasData ? (selected ? colors.onAccent : colors.accent) : 'transparent' }]} />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={s.legend}>● Meses con movimientos</Text>
      <ModalActions onCancel={onClose} onSave={() => pick(now)} saveLabel="Ir al mes actual" />
    </BottomSheet>
  );
}

const s = makeStyles(() => StyleSheet.create({
  title: { color: colors.text, fontSize: 17, fontFamily: fonts.bold, marginBottom: 14 },
  yearRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  year: { color: colors.text, fontSize: 22, fontFamily: fonts.extrabold },
  arrow: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.raised, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '31%', paddingVertical: 14, borderRadius: 14, backgroundColor: colors.inset, borderWidth: 1, borderColor: colors.border, alignItems: 'center', marginBottom: 8, gap: 4 },
  cellOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  cellText: { color: colors.text, fontSize: 15, fontFamily: fonts.semibold },
  dot: { width: 5, height: 5, borderRadius: 3 },
  legend: { color: colors.faint, fontSize: 11, fontFamily: fonts.medium, marginVertical: 8 },
}));
