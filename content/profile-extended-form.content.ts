import { ProfileExtendedField } from '~/types/main-settings.types';

export const lifeGoalsContent: ProfileExtendedField[] = [
  {
    placeholder: 'What are your life goals?',
    name: 'lifeGoals.goals',
  },
  {
    placeholder: 'How do you envision your ideal lifestyle?',
    name: 'lifeGoals.idealLifestyle',
  },
];

export const loveRelationshipsContent: ProfileExtendedField[] = [
  {
    placeholder: 'What kind of relationship are you looking for?',
    name: 'loveRelationships.relationshipType',
  },
  {
    placeholder: 'What values are most important to you in a partner?',
    name: 'loveRelationships.valuesInPartner',
  },
  {
    placeholder: 'Are there any dealbreakers in a relationship for you?',
    name: 'loveRelationships.dealBreakers',
  },
];

export const familyFutureContent: ProfileExtendedField[] = [
  {
    placeholder: 'What is your perspective on marriage?',
    name: 'familyFuture.marriagePerspective',
  },
  {
    placeholder: 'Do you see children in your future? If so, how many?',
    name: 'familyFuture.childrenInFuture',
  },
  {
    placeholder: 'What kind of family life do you envision?',
    name: 'familyFuture.familyLife',
  },
];

export const personalConnectionContent: ProfileExtendedField[] = [
  {
    placeholder: 'What shared interests or activities are important to you in a relationship?',
    name: 'personalConnection.sharedInterests',
  },
  {
    placeholder: 'How do you approach emotional connection and communication in relationships?',
    name: 'personalConnection.emotionalConnection',
  },
];
