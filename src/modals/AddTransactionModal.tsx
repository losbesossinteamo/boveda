import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FileText, Minus, Plus } from 'lucide-react-native';
import { AmountDisplay, NumPad } from '../components/NumPad';
import { CategoryPicker } from '../components/CategoryPicker';
import { SegmentedControl } from '../components/SegmentedControl';
import { firstCategory } from '../constants/categories';
import { colors, fonts, makeStyles, alpha } from '../theme';
import type { TxType } from '../types';
import { formatDay, nextOccurrence, todayYMD } from '../utils/dates';
import { BottomSheet } from './BottomSheet';
import { ModalActions } from './ModalActions';

export interface EntrySubmit {
  type: TxType;
  amount: number;
  category: string;
  note: string;
  /** Día del mes si es una repetición automática; null si es un movimiento normal */
  repeatDay: number | null;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (entry: EntrySubmit) => void;
}

export function AddTransactionModal({ visible, onClose, onSubmit }: Props) {
  const [type, setType] = useState<TxType>('expense');
  const [raw, setRaw] = useState('0');
  const [category, setCategory] = useState(firstCategory('expense'));
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [day, setDay] = useState(1);

  useEffect(() => {
    if (!visible) return;
    setType('expense'); setRaw('0'); setCategory(firstCategory('expense'));
    setNote(''); setShowNote(false); setRepeat(false); setDay(+todayYMD().slice(8));
  }, [visible]);

  const amount = parseFloat(raw);
  const valid = amount > 0;

  const changeType = (t: TxType) => { setType(t); setCategory(firstCategory(t)); };

  const submit = () => {
    if (!valid) return;
    onSubmit({ type, amount, category, note, repeatDay: repeat ? day : null });
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <SegmentedControl
        value={type}
        onChange={changeType}
        options={[
          { key: 'expense', label: 'Gasto', activeBg: alpha(colors.expense, 0.2) },
          { key: 'income', label: 'Ingreso', activeBg: alpha(colors.income, 0.2) },
        ]}
      />

      <View style={s.amountRow}>
        <AmountDisplay value={raw} />
        <TouchableOpacity
          style={[s.noteBtn, showNote && { backgroundColor: alpha(colors.accent, 0.13), borderColor: colors.accent }]}
          onPress={() => setShowNote(!showNote)}
          accessibilityLabel="Añadir nota"
        >
          <FileText color={showNote ? colors.accent : colors.faint} size={18} />
        </TouchableOpacity>
      </View>

      {showNote && (
        <TextInput
          style={s.noteInput}
          placeholder={type === 'expense' ? '¿En qué te lo has gastado? (opcional)' : '¿Por qué te han ingresado? (opcional)'}
          placeholderTextColor={colors.faint}
          value={note}
          onChangeText={setNote}
          autoFocus
        />
      )}

      <CategoryPicker type={type} selected={category} onSelect={setCategory} />

      <View style={s.repeatBox}>
        <View style={s.repeatRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={s.repeatTitle}>Repetir cada mes</Text>
            <Text style={s.repeatSub}>{type === 'income' ? 'Ideal para tu sueldo' : 'Alquiler, suscripciones…'}</Text>
          </View>
          <Switch value={repeat} onValueChange={setRepeat} trackColor={{ true: colors.accent, false: colors.border }} thumbColor="#fff" />
        </View>
        {repeat && (
          <View style={s.dayRow}>
            <Text style={s.repeatSub}>Día del mes</Text>
            <View style={s.stepper}>
              <TouchableOpacity style={s.stepBtn} onPress={() => setDay(day <= 1 ? 31 : day - 1)}><Minus color={colors.muted} size={16} /></TouchableOpacity>
              <Text style={s.dayText}>{day}</Text>
              <TouchableOpacity style={s.stepBtn} onPress={() => setDay(day >= 31 ? 1 : day + 1)}><Plus color={colors.muted} size={16} /></TouchableOpacity>
            </View>
            <Text style={[s.repeatSub, { flex: 1, textAlign: 'right' }]}>Primera vez: {formatDay(nextOccurrence(day).date)}</Text>
          </View>
        )}
      </View>

      <NumPad value={raw} onChange={setRaw} />
      <ModalActions onCancel={onClose} onSave={submit} saveLabel={repeat ? 'Guardar repetición' : 'Guardar movimiento'} disabled={!valid} />
    </BottomSheet>
  );
}

const s = makeStyles(() => StyleSheet.create({
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 12 },
  noteBtn: { width: 54, height: 54, backgroundColor: colors.inset, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  noteInput: { backgroundColor: colors.inset, color: colors.text, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: alpha(colors.accent, 0.4), fontFamily: fonts.medium, fontSize: 13, marginBottom: 10 },
  repeatBox: { backgroundColor: colors.inset, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 12 },
  repeatRow: { flexDirection: 'row', alignItems: 'center' },
  repeatTitle: { color: colors.text, fontSize: 14, fontFamily: fonts.semibold },
  repeatSub: { color: colors.faint, fontSize: 12, fontFamily: fonts.medium },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stepBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.raised, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  dayText: { color: colors.text, fontSize: 16, fontFamily: fonts.bold, minWidth: 30, textAlign: 'center' },
}));
