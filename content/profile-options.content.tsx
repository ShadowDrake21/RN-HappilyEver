import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { COLORS } from '~/constants/colors';

export const profileOptions = [
  {
    title: 'Settings',
    icon: <Ionicons name="settings-outline" size={24} color={COLORS.grayish} />,

    link: 'settings',
  },
  {
    title: 'Dark Mode',
    icon: <MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.grayish} />,
    isSwitch: true,
    link: 'dark-mode',
  },
  {
    title: 'Language',
    icon: <FontAwesome name="language" size={24} color={COLORS.grayish} />,

    link: 'language',
  },
  {
    title: 'Subscription / Membership',
    icon: <MaterialIcons name="card-membership" size={24} color={COLORS.grayish} />,

    link: 'subscription',
  },
  {
    title: 'Block & Report',
    icon: <Entypo name="block" size={24} color={COLORS.grayish} />,

    link: 'block-report',
  },
  {
    title: 'Incognito Mode',
    icon: <MaterialCommunityIcons name="incognito" size={24} color={COLORS.grayish} />,

    link: 'incognito',
  },
  {
    title: 'Verification',
    icon: <Feather name="user-check" size={24} color={COLORS.grayish} />,

    link: 'verification',
  },
  {
    title: 'Change Password',
    icon: <MaterialIcons name="password" size={24} color={COLORS.grayish} />,

    link: 'change-password',
  },
  {
    title: 'Linked Accounts',
    icon: <Ionicons name="logo-instagram" size={24} color={COLORS.grayish} />,

    link: 'linked-accounts',
  },
  {
    title: 'Invite Friends',
    icon: <FontAwesome5 name="user-friends" size={24} color={COLORS.grayish} />,

    link: 'invite-friends',
  },
  {
    title: 'Dating Tips & Blog',
    icon: <MaterialIcons name="tips-and-updates" size={24} color={COLORS.grayish} />,

    link: 'dating-tips-blog',
  },
  {
    title: 'Help Center',
    icon: <MaterialIcons name="support-agent" size={24} color={COLORS.grayish} />,

    link: 'help-center',
  },
  {
    title: 'Terms & Conditions',
    icon: <FontAwesome name="legal" size={24} color={COLORS.grayish} />,

    link: 'terms-conditions',
  },
  {
    title: 'Privacy Policy',
    icon: <MaterialIcons name="privacy-tip" size={24} color={COLORS.grayish} />,

    link: 'privacy-policy',
  },
];
