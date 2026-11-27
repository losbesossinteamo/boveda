import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { MonthPickerModal } from '../modals/MonthPickerModal';
import { colors, fonts, makeStyles } from '../theme';
import { addMonths, currentMonth, monthLabel } from '../utils/dates';

interface Props {
  month: string;
  onChange: (month: string) => void;
  activeMonths?: Set<string>;
}

export function MonthSelector({ month, onChange, activeMonths }: Props) {
  const [open, setOpen] = useState(false);
  const atNow = month >= currentMonth();
  return (
    <View style={s.row}>
      <TouchableOpacity style={s.arrow} onPress={() => onChange(addMonths(month, -1))} accessibilityLabel="Mes anterior">
        <ChevronLeft color={colors.muted} size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={s.pill} onPress={() => setOpen(true)} activeOpacity={0.7} accessibilityLabel="Elegir mes">
        <Text style={s.label}>{monthLabel(month)}</Text>
        <ChevronDown color={colors.muted} size={16} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[s.arrow, atNow && { opacity: 0.3 }]}
        disabled={atNow}
        onPress={() => onChange(addMonths(month, 1))}
        accessibilityLabel="Mes siguiente"
      >
        <ChevronRight color={colors.muted} size={20} />
      </TouchableOpacity>

      <MonthPickerModal visible={open} month={month} activeMonths={activeMonths} onSelect={onChange} onClose={() => setOpen(false)} />
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 14, backgroundColor: colors.raised, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.text, fontSize: 15, fontFamily: fonts.semibold },
  arrow: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.raised, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
}));
