import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, makeStyles } from '../theme';

interface Option<T extends string> {
  key: T;
  label: string;
  activeBg?: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (key: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={s.wrap}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <TouchableOpacity
            key={o.key}
            style={[s.btn, on && { backgroundColor: o.activeBg ?? colors.border }]}
            onPress={() => onChange(o.key)}
            activeOpacity={0.8}
          >
            <Text style={[s.text, !on && { color: colors.faint }]}>{o.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = makeStyles(() => StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: colors.bg, borderRadius: 16, padding: 4 },
  btn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  text: { color: colors.text, fontFamily: fonts.bold, fontSize: 14 },
}));
