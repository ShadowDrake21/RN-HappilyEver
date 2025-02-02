import { IMainSettingsBasicForm } from './main-settings.types';

export interface IUserProfile extends IMainSettingsBasicForm {
  countryId: string;
  profileUrl: string;
}
