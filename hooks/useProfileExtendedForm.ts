import { useForm } from 'react-hook-form';

import { useMainSettings } from '~/context/MainSettingsContext';
import { IMainSettingsExtendedForm } from '~/types/main-settings.types';

const useProfileExtendedForm = () => {
  const { setProfileExtendedForm } = useMainSettings();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMainSettingsExtendedForm>({
    defaultValues: {
      lifeGoals: {
        goals: '',
        idealLifestyle: '',
      },
      loveRelationships: {
        relationshipType: '',
        valuesInPartner: '',
        dealBreakers: '',
      },
      familyFuture: {
        marriagePerspective: '',
        childrenInFuture: '',
        familyLife: '',
      },
      personalConnection: {
        sharedInterests: '',
        emotionalConnection: '',
      },
    },
  });

  const onSubmit = (data: IMainSettingsExtendedForm) => {
    setProfileExtendedForm(data);
  };

  return { control, submit: handleSubmit(onSubmit), errors };
};

export default useProfileExtendedForm;
