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
