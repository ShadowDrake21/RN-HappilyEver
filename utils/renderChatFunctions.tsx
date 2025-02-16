import CustomActions from '@components/chat/CustomActions';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { IMessage, Send, SendProps, SystemMessage } from 'react-native-gifted-chat';

const renderCustomActions = (props: any, onSend: (messages?: IMessage[]) => void) =>
  Platform.OS === 'web' ? null : <CustomActions {...props} onSend={onSend} />;

const renderSystemMessage = (props: any) => {
  return (
    <SystemMessage
      {...props}
      containerStyle={{
        marginBottom: 15,
      }}
      textStyle={{
        fontSize: 14,
      }}
    />
  );
};

const renderSend = (props: SendProps<IMessage>) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
      <MaterialIcons size={30} color="tomato" name="send" />
    </Send>
  );
};

export { renderCustomActions, renderSend, renderSystemMessage };
