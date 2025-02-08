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

const ProfileOptionsList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleSwitch = () => setIsDarkMode((prev) => !prev);

  return (
    <List.Section>
      <List.Item
        contentStyle={{}}
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        title="Settings"
        left={() => <Ionicons name="settings-outline" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
        onPress={() => console.log('Pressed')}
      />
      <List.Item
        title="Dark Mode"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => (
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.grayish} />
        )}
        right={() => (
          <Switch value={isDarkMode} onValueChange={onToggleSwitch} color={COLORS.mainPurple} />
        )}
      />
      <List.Item
        title="Language"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <FontAwesome name="language" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />

      <List.Item
        title="Subscription / Membership"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialIcons name="card-membership" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Block & Report"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <Entypo name="block" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Incognito Mode"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialCommunityIcons name="incognito" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Verification"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <Feather name="user-check" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Change Password"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialIcons name="password" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Linked Accounts"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <Ionicons name="logo-instagram" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Invite Friends"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <FontAwesome5 name="user-friends" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Dating Tips & Blog"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialIcons name="tips-and-updates" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Help Center"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialIcons name="support-agent" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />

      <List.Item
        title="Terms & Conditions"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <FontAwesome name="legal" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
      <List.Item
        title="Privacy Policy"
        titleStyle={{ color: COLORS.text, fontWeight: '600' }}
        left={() => <MaterialIcons name="privacy-tip" size={24} color={COLORS.grayish} />}
        right={() => <Entypo name="chevron-right" size={24} color={COLORS.grayish} />}
      />
    </List.Section>
  );
};

export default ProfileOptionsList;

const styles = StyleSheet.create({});
