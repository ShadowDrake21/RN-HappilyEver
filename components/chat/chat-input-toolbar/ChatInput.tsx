import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IMessage, InputToolbarProps } from 'react-native-gifted-chat';
import { TextInput, useTheme } from 'react-native-paper';

import ChatInputLeft from './ChatInputLeft';
import ChatInputRight from './ChatInputRight';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';

const ChatInput = ({ props }: { props: InputToolbarProps<IMessage> }) => {
  const { state, dispatch } = useChatContext();

  const theme = useTheme();
  const { colors } = theme;
  return (
    <View
      style={[{ backgroundColor: COLORS.dark }, styles.shadow]}
      className="flex-1 flex-row items-center rounded-full px-3">
      <ChatInputLeft />
      <TextInput
        underlineColor="transparent"
        theme={{ ...theme, colors: { ...colors, primary: 'transparent' } }}
        onChangeText={(text) => dispatch({ type: ActionKind.SET_CURRENT_MESSAGE, payload: text })}
        value={state.currentMessage}
        placeholder="Type your message..."
        placeholderTextColor={COLORS.grayish}
        textColor={COLORS.text}
        style={{ backgroundColor: COLORS.dark, flex: 1, fontSize: 14 }}
        autoCorrect={false}
        autoCapitalize="sentences"
        {...props}
      />
      <ChatInputRight />
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 4,
  },
});
