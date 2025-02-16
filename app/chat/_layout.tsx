import { Stack } from 'expo-router';

import { ChatProvider } from '~/context/ChatContext';

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

const Layout = () => (
  <ChatProvider>
    <ChatLayout />
  </ChatProvider>
);

export default Layout;
