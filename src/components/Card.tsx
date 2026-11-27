import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, makeStyles } from '../theme';

interface Props {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}

export function Card({ label, hint, children }: Props) {
  return (
    <View style={s.card}>
      {(label || hint) && (
        <View style={s.head}>
          <Text style={s.label}>{label}</Text>
          {hint ? <Text style={s.hint}>{hint}</Text> : null}
        </View>
      )}
      {children}
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 22, padding: 18, borderWidth: 1, borderColor: colors.border },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { color: colors.faint, fontSize: 11, fontFamily: fonts.bold, letterSpacing: 1.2 },
  hint: { color: colors.faint, fontSize: 11, fontFamily: fonts.medium },
}));
