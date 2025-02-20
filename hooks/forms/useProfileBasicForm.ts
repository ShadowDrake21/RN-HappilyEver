import { useForm } from 'react-hook-form';

import { useMainSettings } from '~/context/MainSettingsContext';
import { IMainSettingsBasicForm } from '~/types/main-settings.types';

const useProfileBasicForm = () => {
  const { dispatch } = useMainSettings();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IMainSettingsBasicForm>({
    defaultValues: {
      fullName: '',
      username: '',
      gender: '',
      birthDate: undefined,
      phoneNumber: '',
      occupation: '',
    },
  });

  const onSubmit = (data: IMainSettingsBasicForm) => {
    dispatch({ type: 'SET_PROFILE_BASIC_FORM', payload: data });
  };

  return { control, submit: handleSubmit(onSubmit), getValues, setValue, errors };
};

export default useProfileBasicForm;
