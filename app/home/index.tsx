import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import useMainSettingsOperations from '~/hooks/useMainSettingsOperations';

const Page = () => {
  const { signOut } = useAuth();
  const { session } = useSession();
  const { fetchMainSettingsAvalability } = useMainSettingsOperations();

  useEffect(() => {
    if (session) {
      console.log('session', !!session);

      fetchMainSettingsAvalability();
    }
  }, []);

  return (
    <View>
      <Text>Page</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
