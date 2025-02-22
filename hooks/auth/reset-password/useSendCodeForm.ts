import { useForm } from 'react-hook-form';

const useSendCodeForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return { control, handleSubmit, getValues, errors };
};

export default useSendCodeForm;
