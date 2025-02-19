import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import earlierMessages from '~/content/earlierMessages';
import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';
import { sendMessage } from '~/supabase/supabase-chatting';
import { FormattedMessage, RawMessage } from '~/types/chat.types';
import { formatMessages } from '~/utils/format.utils';

const useChatActions = (user: any) => {
  const { state, dispatch } = useChatContext();

  const onSetMessages = useCallback(
    (messages: IMessage[]) => {
      if (!messages) return;

      console.log('onSetMessages', messages);
      dispatch({ type: ActionKind.SET_MESSAGES, payload: messages });
    },
    [dispatch]
  );

  const onSend = useCallback(
    (messages: any[]) => {
      console.log('onSend', messages);
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      const newMessages = GiftedChat.append(state.messages, sentMessages, Platform.OS !== 'web');

      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
    },
    [dispatch, state.messages]
  );

  const onLoadEarlier = useCallback(() => {
    dispatch({ type: ActionKind.LOAD_EARLIER_START });
    setTimeout(() => {
      const newMessages = GiftedChat.prepend(
        state.messages,
        earlierMessages() as IMessage[],
        Platform.OS !== 'web'
      );

      dispatch({ type: ActionKind.LOAD_EARLIER_MESSAGES, payload: newMessages });
    }, 1500);
  }, [dispatch, state.messages]);

  const onPressAvatar = useCallback(() => {
    Alert.alert('On avatar press');
  }, []);

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        user,
        createdAt,
        _id: Math.round(Math.random() * 1000000),
      }));

      onSend(messagesToUpload);
    },
    [onSend]
  );

  return {
    onSetMessages,
    onSend,
    onLoadEarlier,
    onPressAvatar,
    onSendFromUser,
  };
};

export default useChatActions;
