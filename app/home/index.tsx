import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useAuthStore } from '~/store/store';
import { supabase } from '~/utils/supabase';

const Page = () => {
  const { logOut } = useAuthStore();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Failed to sign out', error);
      return;
    }

    logOut();
  };
  return (
    <View>
      <Text>Page</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
