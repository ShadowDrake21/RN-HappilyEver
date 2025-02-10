import React, { PropsWithChildren } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

const TouchableKeyboardAvoidingView = ({
  offset,
  children,
  style,
}: { offset: number; style?: ViewStyle } & PropsWithChildren) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, ...style }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default TouchableKeyboardAvoidingView;
