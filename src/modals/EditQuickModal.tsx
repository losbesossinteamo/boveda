import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { AmountDisplay, NumPad } from '../components/NumPad';
import { CategoryPicker } from '../components/CategoryPicker';
import { getCategory } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import type { QuickAction } from '../types';
import { BottomSheet } from './BottomSheet';
import { ModalActions } from './ModalActions';

interface Props {
  /** null = cerrado */
  quick: QuickAction | null;
  /** true si ya existe (se puede borrar); false si es uno nuevo */
  exists: boolean;
  onSave: (q: QuickAction) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function EditQuickModal({ quick, exists, onSave, onDelete, onClose }: Props) {
  const [label, setLabel] = useState('');
  const [raw, setRaw] = useState('0');
  const [category, setCategory] = useState('otros');

  useEffect(() => {
    if (!quick) return;
    setLabel(quick.label);
    setRaw(String(quick.amount));
    setCategory(quick.category);
  }, [quick]);

  const amount = parseFloat(raw);
  const valid = amount > 0;

  const save = () => {
    if (!quick || !valid) return;
    onSave({
      ...quick,
      label: label.trim() || getCategory('expense', category).label,
      amount: Number(amount.toFixed(2)),
      category,
    });
    onClose();
  };

  return (
    <BottomSheet visible={!!quick} onClose={onClose} animation="fade">
      <Text style={s.title}>{exists ? 'Editar gasto rápido' : 'Nuevo gasto rápido'}</Text>
      <TextInput style={s.input} value={label} onChangeText={setLabel} placeholder="Nombre (ej. Café)" placeholderTextColor={colors.faint} maxLength={20} />
      <CategoryPicker type="expense" selected={category} onSelect={setCategory} />
      <AmountDisplay value={raw} />
      <NumPad value={raw} onChange={setRaw} />
      {exists && quick && (
        <TouchableOpacity style={s.delete} onPress={() => { onDelete(quick.id); onClose(); }}>
          <Trash2 color={colors.expense} size={15} />
          <Text style={s.deleteText}>Eliminar atajo</Text>
        </TouchableOpacity>
      )}
      <ModalActions onCancel={onClose} onSave={save} saveLabel={exists ? 'Actualizar' : 'Crear'} disabled={!valid} />
    </BottomSheet>
  );
}

const s = makeStyles(() => StyleSheet.create({
  title: { color: colors.text, fontSize: 17, fontFamily: fonts.bold, marginBottom: 14 },
  input: { backgroundColor: colors.inset, color: colors.text, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.border, fontFamily: fonts.medium, fontSize: 14, marginBottom: 12 },
  delete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, marginBottom: 10 },
  deleteText: { color: colors.expense, fontFamily: fonts.semibold, fontSize: 13 },
}));
