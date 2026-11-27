import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pencil, Plus } from 'lucide-react-native';
import { MAX_QUICK_ACTIONS } from '../constants/quickActions';
import { getCategory } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import type { QuickAction } from '../types';
import { money } from '../utils/format';
import { Card } from './Card';

interface Props {
  actions: QuickAction[];
  hidden: boolean;
  onUse: (a: QuickAction) => void;
  onEdit: (a: QuickAction) => void;
  onAdd: () => void;
}

export function QuickActions({ actions, hidden, onUse, onEdit, onAdd }: Props) {
  return (
    <Card label="GASTOS RÁPIDOS (1 TOQUE)" hint="Mantén para editar">
      <View style={s.grid}>
        {actions.map((a) => {
          const cat = getCategory(a.type, a.category);
          return (
            <TouchableOpacity key={a.id} style={s.chip} activeOpacity={0.75} onPress={() => onUse(a)} onLongPress={() => onEdit(a)}>
              <View style={s.top}>
                <cat.Icon color={cat.color} size={17} />
                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => onEdit(a)} accessibilityLabel="Editar">
                  <Pencil color={colors.faint} size={13} />
                </TouchableOpacity>
              </View>
              <Text style={s.label} numberOfLines={1}>{a.label}</Text>
              <Text style={s.amount}>-{money(a.amount, hidden)}</Text>
            </TouchableOpacity>
          );
        })}
        {actions.length < MAX_QUICK_ACTIONS && (
          <TouchableOpacity style={[s.chip, s.add]} onPress={onAdd} activeOpacity={0.75}>
            <Plus color={colors.faint} size={20} />
            <Text style={s.addText}>Nuevo atajo</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const s = makeStyles(() => StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  chip: { width: '48.3%', backgroundColor: colors.inset, padding: 13, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  label: { color: colors.text, fontSize: 14, fontFamily: fonts.semibold, marginBottom: 2 },
  amount: { color: colors.muted, fontSize: 13, fontFamily: fonts.bold },
  add: { borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 },
  addText: { color: colors.faint, fontSize: 12, fontFamily: fonts.semibold },
}));
