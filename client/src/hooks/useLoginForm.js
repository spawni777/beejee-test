import { useForm } from 'react-hook-form';

const useLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const validationSchemas = {
    username: {
      required: 'This field is required',
      minLength: {
        value: 4,
        message: 'Please enter a minimum of 4 characters'
      },
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 3,
        message: 'Please enter a minimum of 3 characters'
      },
    },
  };

  return {
    register,
    handleSubmit,
    errors,
    validationSchemas
  }
}

export default useLoginForm;
