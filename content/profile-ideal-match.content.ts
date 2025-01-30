import { ProfileIdealMatch } from '~/types/main-settings.types';

export const profileIdealMatchIcons = {
  relationship: require('assets/ideal-match/serious-relationship.png'),
  marriage: require('assets/ideal-match/marriage and family.png'),
  companionship: require('assets/ideal-match/companionship.png'),
  friendship: require('assets/ideal-match/friendship.png'),
};

export const profileIdealMatch: ProfileIdealMatch[] = [
  {
    id: 'relationship',
    title: 'Serious Relationship',
    description: 'Looking for a committed, long-term partner to build a future with.',
  },
  {
    id: 'marriage',
    title: 'Marriage & Family',
    description: 'Ready to settle down, start a family, and create a lifetime bond.',
  },
  {
    id: 'companionship',
    title: 'Companionship',
    description: 'Seeking a deep emotional connection and a supportive partner.',
  },
  {
    id: 'friendship',
    title: 'Friendship First',
    description: 'Start as friends and see where life takes you.',
  },
];
