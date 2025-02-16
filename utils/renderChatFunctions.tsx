import CustomActions from '@components/chat/CustomActions';
import CustomView from '@components/chat/CustomView';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { ActionsProps, IMessage, Send, SendProps, SystemMessage } from 'react-native-gifted-chat';

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

const renderCustomView = (props: any) => {
  return <CustomView {...props} />;
};

const renderSend = (props: SendProps<IMessage>) => {
  return (
    <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
      <MaterialIcons size={30} color="tomato" name="send" />
    </Send>
  );
};

export { renderCustomActions, renderCustomView, renderSend, renderSystemMessage };
