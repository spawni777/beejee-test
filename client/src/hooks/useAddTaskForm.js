import { useForm } from 'react-hook-form';

const useAddTaskForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const validationSchemas = {
    email: {
      required: 'This field is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
    username: {
      required: 'This field is required',
      minLength: {
        value: 4,
        message: 'Please enter a minimum of 4 characters'
      },
    },
    text: {
      required: 'This field is required',
      minLength: {
        value: 5,
        message: 'Please enter a minimum of 5 characters'
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

export default useAddTaskForm;
