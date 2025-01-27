import { useForm } from 'react-hook-form';

import { useMainSettings } from '~/context/MainSettingsContext';
import { IMainSettingsBasicForm } from '~/types/main-settings.types';

const useProfileBasicForm = () => {
  const { setProfileBasicForm } = useMainSettings();
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
    setProfileBasicForm(data);
  };

  return { control, submit: handleSubmit(onSubmit), getValues, setValue, errors };
};

export default useProfileBasicForm;
