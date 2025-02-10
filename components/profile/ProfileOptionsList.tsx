import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

const options = [
  {
    title: 'Settings',
    icon: <Ionicons name="settings-outline" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Settings'),
  },
  {
    title: 'Dark Mode',
    icon: <MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.grayish} />,
    isSwitch: true,
  },
  {
    title: 'Language',
    icon: <FontAwesome name="language" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Language'),
  },
  {
    title: 'Subscription / Membership',
    icon: <MaterialIcons name="card-membership" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Subscription / Membership'),
  },
  {
    title: 'Block & Report',
    icon: <Entypo name="block" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Block & Report'),
  },
  {
    title: 'Incognito Mode',
    icon: <MaterialCommunityIcons name="incognito" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Incognito Mode'),
  },
  {
    title: 'Verification',
    icon: <Feather name="user-check" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Verification'),
  },
  {
    title: 'Change Password',
    icon: <MaterialIcons name="password" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Change Password'),
  },
  {
    title: 'Linked Accounts',
    icon: <Ionicons name="logo-instagram" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Linked Accounts'),
  },
  {
    title: 'Invite Friends',
    icon: <FontAwesome5 name="user-friends" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Invite Friends'),
  },
  {
    title: 'Dating Tips & Blog',
    icon: <MaterialIcons name="tips-and-updates" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Dating Tips & Blog'),
  },
  {
    title: 'Help Center',
    icon: <MaterialIcons name="support-agent" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Help Center'),
  },
  {
    title: 'Terms & Conditions',
    icon: <FontAwesome name="legal" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Terms & Conditions'),
  },
  {
    title: 'Privacy Policy',
    icon: <MaterialIcons name="privacy-tip" size={24} color={COLORS.grayish} />,
    onPress: () => console.log('Pressed Privacy Policy'),
  },
];

const ProfileOptionsList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleSwitch = () => setIsDarkMode((prev) => !prev);

  return (
    <List.Section>
      {options.map((option, index) => (
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
          onPress={option.onPress}
        />
      ))}
    </List.Section>
  );
};

export default ProfileOptionsList;

const styles = StyleSheet.create({
  listItemText: { color: COLORS.text, fontWeight: '600' },
});
