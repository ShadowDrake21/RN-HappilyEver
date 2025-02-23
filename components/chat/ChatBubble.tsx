import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Bubble, BubbleProps, IMessage, LeftRightStyle } from 'react-native-gifted-chat';

import { COLORS } from '~/constants/colors';

const ChatBubble = (props: Readonly<BubbleProps<IMessage>>) => {
  return <Bubble {...props} wrapperStyle={wrapperStyle} textStyle={textStyle} />;
};

export default ChatBubble;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 8,
  },
});

const wrapperStyle: LeftRightStyle<ViewStyle> = {
  left: [
    {
      backgroundColor: COLORS.lightDark,
    },
    styles.wrapper,
  ],
  right: [{ backgroundColor: COLORS.messagePurple }, styles.wrapper],
};

const textStyle: LeftRightStyle<TextStyle> = {
  left: {
    color: '#fff',
  },
  right: {
    color: '#fff',
  },
};
