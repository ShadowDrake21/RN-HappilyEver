import { Alert, AlertButton, AlertOptions } from 'react-native';

export const CustomAlert = ({
  title = 'Oops! Something Went Wrong',
  message,
  buttons = [
    { text: 'Alright!', style: 'destructive', isPreferred: true },
    { text: 'Cancel', style: 'cancel' },
  ],
  options,
}: {
  title?: string;
  message: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}) => {
  return Alert.alert(title, message, buttons, options);
};
