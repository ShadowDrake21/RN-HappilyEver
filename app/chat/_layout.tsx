import { Stack } from 'expo-router';

import { COLORS } from '~/constants/colors';
import { ChatProvider } from '~/context/ChatContext';

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerStyle: { backgroundColor: COLORS.extraDark } }} />
    </Stack>
  );
};

const Layout = () => (
  <ChatProvider>
    <ChatLayout />
  </ChatProvider>
);

export default Layout;
