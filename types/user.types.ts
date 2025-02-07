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
  profileExtendedForm: IUserQuestion[] | undefined;
  photos: IUserPhoto[];
  interests: ProfileInterestsIds[];
  idealMatch: ProfileIdealMatch['id'];
}

export interface IUserPhoto {
  name: string;
  url: string;
}

export interface IUserQuestion {
  category: string;
  question: string;
  answer: string;
}
