import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useAuthStore } from '~/store/store';
import { supabase } from '~/utils/supabase';

const Page = () => {
  const { signOut } = useAuth();
  const { session } = useSession();

  return (
    <View>
      <Text>Page</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
