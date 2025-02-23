import { RegisterOptions } from 'react-hook-form';

import { getFormRule } from './forms.utils';

import { IMainSettingsBasicForm } from '~/types/main-settings.types';

export const profileUsernameRules:
  | Omit<
      RegisterOptions<IMainSettingsBasicForm, 'username'>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined = {
  required: getFormRule('required'),
  minLength: { value: 3, message: getFormRule('minLength', 3) },
  maxLength: {
    value: 25,
    message: getFormRule('maxLength', 25),
  },
};

export const profileFullnameRules:
  | Omit<
      RegisterOptions<IMainSettingsBasicForm, 'fullName'>,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
  | undefined = {
  required: getFormRule('required'),
  minLength: { value: 3, message: getFormRule('minLength', 3) },
  maxLength: { value: 40, message: getFormRule('maxLength', 40) },
};

export const profileOccupationRules:
  | Omit<
      RegisterOptions<IMainSettingsBasicForm, 'occupation'>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined = {
  required: getFormRule('required'),
  minLength: {
    value: 6,
    message: getFormRule('minLength', 6),
  },
  maxLength: {
    value: 30,
    message: getFormRule('maxLength', 30),
  },
};

export const profilePhoneRules:
  | Omit<
      RegisterOptions<IMainSettingsBasicForm, 'phoneNumber'>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined = {
  required: getFormRule('required'),
  pattern: {
    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    message: getFormRule('pattern'),
  },
  minLength: {
    value: 10,
    message: getFormRule('minLength', 10),
  },
  maxLength: {
    value: 15,
    message: getFormRule('maxLength', 15),
  },
};
