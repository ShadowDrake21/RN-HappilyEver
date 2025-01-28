import { Alert, AlertButton, AlertOptions } from 'react-native';
import Toast, { ToastShowParams } from 'react-native-toast-message';

export const callAlert = ({
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

export const callToast = (
  toastProps: Partial<ToastShowParams> = {
    type: 'error',
    text1: 'Something went wrong',
    text2: 'Please try again',
  }
) => {
  return Toast.show(toastProps);
};
