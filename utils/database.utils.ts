import { callAlert } from './ui.utils';

import { IMainSettingsExtendedForm } from '~/types/main-settings.types';

export const formatProfileQuestions = (user_id: string, answers: IMainSettingsExtendedForm) => {
  const result: { user_id: string; category: string; question: string; answer: string }[] = [];
  Object.keys(answers).forEach((category) => {
    const fields = answers[category as keyof IMainSettingsExtendedForm];
    Object.keys(fields).forEach((field) => {
      result.push({
        user_id,
        category,
        question: `${category}.${field}`,
        answer: fields[field as keyof typeof fields] as string,
      });
    });
  });

  return result;
};

export const handleSupabaseError = (message: string, error: any) => {
  if (error) {
    callAlert({
      title: `${message}`,
      message: error.message,
      buttons: [{ text: 'OK', isPreferred: true, style: 'destructive' }],
    });
  }
};
