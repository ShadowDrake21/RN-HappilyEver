import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';

import { COLORS } from '~/constants/colors';
import { profileOptions } from '~/content/profile-options.content';

const ProfileOptionsList = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const onToggleSwitch = () => setIsDarkMode((prev) => !prev);

  return (
    <List.Section>
      {profileOptions.map((option, index) => (
        <List.Item
          key={index}
          titleStyle={styles.listItemText}
          title={option.title}
          left={() => option.icon}
          right={() =>
            option.isSwitch ? (
              <Switch value={isDarkMode} onValueChange={onToggleSwitch} />
            ) : (
              <Entypo name="chevron-right" size={24} color={COLORS.grayish} />
            )
          }
          onPress={() => router.push(`/profile/${option.link}`)}
        />
      ))}
    </List.Section>
  );
};

export default ProfileOptionsList;

const styles = StyleSheet.create({
  listItemText: { color: COLORS.text, fontWeight: '600' },
});
