import * as Clipboard from 'expo-clipboard';
import React, { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import useChatState from './useChatState';

import earlierMessages from '~/content/earlierMessages';
import { ActionKind } from '~/enums/chat.enum';

const useChatActions = (user: any) => {
  const { dispatch, state } = useChatState();

  const onSend = useCallback(
    (messages: any[]) => {
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

  const onLongPressAvatar = useCallback((pressedUser: any) => {
    Alert.alert(JSON.stringify(pressedUser));
  }, []);

  const onPressAvatar = useCallback(() => {
    Alert.alert('On avatar press');
  }, []);

  const handleLongPress = useCallback((context: unknown, currentMessage: { text: string }) => {
    if (!currentMessage.text) return;

    const options = ['Copy text', 'Cancel'];

    const cancelButtonIndex = options.length - 1;

    (context as any).actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setStringAsync(currentMessage.text);
            break;
          default:
            break;
        }
      }
    );
  }, []);

  const onQuickReply = useCallback((replies: any[]) => {
    const createdAt = new Date();
    if (replies.length === 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    else if (replies.length > 1)
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply) => reply.title).join(', '),
          user,
        },
      ]);
    else console.warn('replies param is not set correctly');
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
    onSend,
    onLoadEarlier,
    onLongPressAvatar,
    onPressAvatar,
    handleLongPress,
    onQuickReply,
    onSendFromUser,
  };
};

export default useChatActions;
