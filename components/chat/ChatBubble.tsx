import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';
import { getRightStyles } from 'react-native-paper/lib/typescript/components/List/utils';

import { COLORS } from '~/constants/colors';

const ChatBubble = (props: Readonly<BubbleProps<IMessage>>) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: [
          {
            backgroundColor: COLORS.lightDark,
          },
          styles.wrapper,
        ],
        right: [{ backgroundColor: COLORS.messagePurple }, styles.wrapper],
      }}
      textStyle={{
        left: {
          color: '#fff',
        },
        right: {
          color: '#fff',
        },
      }}
    />
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 8,
  },
});
