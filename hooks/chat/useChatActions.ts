import { useUser } from '@clerk/clerk-expo';
import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';

const useChatActions = () => {
  const { user } = useUser();
  const { state, dispatch } = useChatContext();

  const onSetMessages = useCallback(
    (messages: IMessage[]) => {
      if (!messages) return;

      dispatch({ type: ActionKind.SET_MESSAGES, payload: messages });
    },
    [dispatch]
  );

  const onSend = useCallback(
    (messages: any[]) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      const newMessages = GiftedChat.append(state.messages, sentMessages, Platform.OS !== 'web');

      dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages });
    },
    [dispatch, state.messages]
  );

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
    onPressAvatar,
    onSendFromUser,
  };
};

export default useChatActions;
