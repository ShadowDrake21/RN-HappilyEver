import { Stack } from 'expo-router';

import { COLORS } from '~/constants/colors';

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerStyle: { backgroundColor: COLORS.extraDark } }} />
    </Stack>
  );
};

const Layout = () => <ChatLayout />;

export default Layout;
