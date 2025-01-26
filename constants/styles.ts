import { StyleProp, TextStyle } from 'react-native';

import { COLORS } from './colors';

export const defaultTitleStyles: StyleProp<TextStyle> = {
  color: COLORS.text,
  fontFamily: 'Poppins-Regular',
  fontWeight: '600',
  textAlign: 'center',
  paddingBottom: 20,
};
