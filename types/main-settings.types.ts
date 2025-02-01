import { Control, FieldError } from 'react-hook-form';

export type MainSettingsStateType = {
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm | undefined;
  profileExtendedForm: IMainSettingsExtendedForm | undefined;
  photos: ProfilePhoto[];
  interests: ProfileInterestsIds[];
  idealMatch: ProfileIdealMatch | undefined;
};

export type MainSettingsActionType =
  | { type: 'SET_COUNTRY_ID'; payload: string }
  | { type: 'SET_PROFILE_BASIC_FORM'; payload: IMainSettingsBasicForm | undefined }
  | { type: 'SET_PROFILE_EXTENDED_FORM'; payload: IMainSettingsExtendedForm | undefined }
  | { type: 'SET_PHOTOS'; payload: ProfilePhoto[] }
  | { type: 'SET_INTERESTS'; payload: ProfileInterestsIds[] }
  | {
      type: 'SET_IDEAL_MATCH';
      payload: ProfileIdealMatch | undefined;
    };

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
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
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
