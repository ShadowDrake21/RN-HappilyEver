import { MainSettingsActionType, MainSettingsStateType } from '~/types/main-settings.types';

export const MainSettingsState: MainSettingsStateType = {
  countryId: '',
  profileBasicForm: undefined,
  profileExtendedForm: undefined,
  photos: [],
  interests: [],
  idealMatch: undefined,
};

export const mainSettingsReducer = (
  state: MainSettingsStateType,
  action: MainSettingsActionType
): MainSettingsStateType => {
  switch (action.type) {
    case 'SET_COUNTRY_ID':
      return { ...state, countryId: action.payload };
    case 'SET_PROFILE_BASIC_FORM':
      return { ...state, profileBasicForm: action.payload };
    case 'SET_PROFILE_EXTENDED_FORM':
      return { ...state, profileExtendedForm: action.payload };
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload };
    case 'SET_INTERESTS':
      return { ...state, interests: action.payload };
    case 'SET_IDEAL_MATCH':
      return { ...state, idealMatch: action.payload };
    default:
      return state;
  }
};
