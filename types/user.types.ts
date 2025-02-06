import {
  IMainSettingsBasicForm,
  ProfileIdealMatch,
  ProfileInterestsIds,
} from './main-settings.types';

export interface IUserProfile extends IMainSettingsBasicForm {
  id: string;
  countryId: string;
  profileUrl: string;
}

export interface IUserFullProfile {
  id: string;
  profileUrl: string;
  countryId: string;
  profileBasicForm: IMainSettingsBasicForm;
  profileExtendedForm: { category: string; question: string; answer: string }[] | undefined;
  photos: {
    name: string;
    url: string;
  }[];
  interests: ProfileInterestsIds[];
  idealMatch: ProfileIdealMatch;
}
