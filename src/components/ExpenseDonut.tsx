import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getCategory } from '../constants/categories';
import { colors, fonts, makeStyles } from '../theme';
import { money } from '../utils/format';
import { Card } from './Card';

interface Props {
  byCategory: Record<string, number>;
  total: number;
  hidden: boolean;
}

const R = 58;
const C = 2 * Math.PI * R;

export function ExpenseDonut({ byCategory, total, hidden }: Props) {
  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  if (total === 0) {
    return (
      <Card label="DISTRIBUCIÓN DE GASTOS">
        <Text style={s.empty}>Aún no hay gastos este mes.</Text>
      </Card>
    );
  }

  // Cada tramo empieza en la parte de arriba: offset = C/4 - acumulado
  let acc = 0;
  const segments = entries.map(([key, value]) => {
    const frac = value / total;
    const seg = { key, value, pct: Math.round(frac * 100), len: frac * C, offset: C / 4 - acc * C, color: getCategory('expense', key).color };
    acc += frac;
    return seg;
  });

  return (
    <Card label="DISTRIBUCIÓN DE GASTOS">
      <View style={s.donut}>
        <Svg width={160} height={160} viewBox="0 0 160 160">
          <Circle cx="80" cy="80" r={R} stroke={colors.inset} strokeWidth={18} fill="transparent" />
          {segments.map((g) => (
            <Circle key={g.key} cx="80" cy="80" r={R} stroke={g.color} strokeWidth={18} fill="transparent"
              strokeDasharray={`${g.len} ${C}`} strokeDashoffset={g.offset} />
          ))}
        </Svg>
        <View style={s.center}>
          <Text style={s.centerTotal}>{hidden ? '••••' : `${total.toFixed(0)}€`}</Text>
          <Text style={s.centerSub}>Gastado</Text>
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 14 }}>
        {segments.map((g) => (
          <View key={g.key} style={{ gap: 5 }}>
            <View style={s.legendRow}>
              <View style={[s.dot, { backgroundColor: g.color }]} />
              <Text style={s.name} numberOfLines={1}>{getCategory('expense', g.key).label}</Text>
              <Text style={s.value}>{money(g.value, hidden)} <Text style={s.pct}>({g.pct}%)</Text></Text>
            </View>
            <View style={s.barBg}>
              <View style={{ width: `${g.pct}%`, height: '100%', borderRadius: 3, backgroundColor: g.color }} />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

const s = makeStyles(() => StyleSheet.create({
  empty: { color: colors.faint, fontSize: 13, fontFamily: fonts.medium, paddingVertical: 8 },
  donut: { alignItems: 'center', justifyContent: 'center', marginVertical: 4 },
  center: { position: 'absolute', alignItems: 'center' },
  centerTotal: { color: colors.text, fontSize: 22, fontFamily: fonts.extrabold },
  centerSub: { color: colors.faint, fontSize: 11, fontFamily: fonts.semibold },
  legendRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 9, height: 9, borderRadius: 5, marginRight: 8 },
  name: { color: colors.textSoft, fontSize: 13, fontFamily: fonts.medium, flex: 1 },
  value: { color: colors.text, fontSize: 13, fontFamily: fonts.bold },
  pct: { color: colors.faint, fontSize: 11 },
  barBg: { height: 6, backgroundColor: colors.inset, borderRadius: 3, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
}));
