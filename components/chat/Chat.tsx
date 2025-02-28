import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker from 'rn-emoji-keyboard';

import CustomGiftedChat from './CustomGiftedChat';

import { COLORS } from '~/constants/colors';
import { useChatContext } from '~/context/ChatContext';
import { ActionKind } from '~/enums/chat.enum';
import { InterlocutorType } from '~/types/chat.types';

const Chat = ({ interlocutor }: { interlocutor: InterlocutorType | undefined }) => {
  const { bottom } = useSafeAreaInsets();
  const { state, dispatch } = useChatContext();

  return (
    <View style={[styles.fill, styles.container, { paddingBottom: bottom }]}>
      <CustomGiftedChat interlocutor={interlocutor} />
      <EmojiPicker
        onEmojiSelected={({ emoji }) =>
          dispatch({
            type: ActionKind.SET_CURRENT_MESSAGE,
            payload: state.currentMessage + emoji,
          })
        }
        open={state.emojiOpen}
        onClose={() => dispatch({ type: ActionKind.SET_EMOJI_OPEN, payload: false })}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.extraDark,
    flex: 1,
  },
});
