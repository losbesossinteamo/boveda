import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { colors, makeStyles } from '../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  animation?: 'slide' | 'fade';
  children: React.ReactNode;
}

/** Contenedor común de los modales: fondo oscuro + hoja inferior con scroll. */
export function BottomSheet({ visible, onClose, animation = 'slide', children }: Props) {
  return (
    <Modal visible={visible} animationType={animation} transparent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.overlay}>
        <View style={s.sheet}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = makeStyles(() => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'flex-end' },
  sheet: { width: '100%', maxWidth: 520, alignSelf: 'center', maxHeight: '94%', backgroundColor: colors.surface, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 22, borderTopWidth: 1, borderColor: colors.border },
}));
