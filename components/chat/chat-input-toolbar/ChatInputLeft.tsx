import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';

const ChatInputLeft = () => {
  const { dispatch } = useChatContext();

  return (
    <Pressable onPress={() => dispatch({ type: ActionKind.SET_EMOJI_OPEN, payload: true })}>
      <Entypo name="emoji-flirt" size={20} color={COLORS.grayish} />
    </Pressable>
  );
};

export default ChatInputLeft;
