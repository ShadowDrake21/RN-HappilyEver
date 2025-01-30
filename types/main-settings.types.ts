import { Control, FieldError } from 'react-hook-form';

export interface IMainSettingsBasicForm {
  fullName: string;
  username: string;
  gender: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  occupation: string;
}

export interface IMainSettingsExtendedForm {
  lifeGoals: {
    goals: string;
    idealLifestyle: string;
  };
  loveRelationships: {
    relationshipType: string;
    valuesInPartner: string;
    dealBreakers: string;
  };
  familyFuture: {
    marriagePerspective: string;
    childrenInFuture: string;
    familyLife: string;
  };
  personalConnection: {
    sharedInterests: string;
    emotionalConnection: string;
  };
}

export type SelectedFormItem = { title: string; icon: string };

export type ProfileBasicFormField = {
  control: Control<IMainSettingsBasicForm, any>;
  errors: FieldError | undefined;
};

export type ProfileExtendedField = {
  placeholder: string;
  name: string;
};

export type ProfilePhoto = {
  name: string;
  base64: string;
};

export type ProfileInterestsCategory = {
  id: string;
  category: string;
  interests: ProfileInterestItem[];
};

export type ProfileInterestItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ProfileInterestsIds = {
  categoryId: string;
  interestIds: string[];
};

export type ProfileIdealMatch = {
  id: 'relationship' | 'marriage' | 'companionship' | 'friendship';
  title: string;
  description: string;
};
