import styles from '@/styles/components/taskAddingBlock.module.scss';
import InputUI from '@/components/UI/InputUI.jsx';
import useAddTaskForm from '@/hooks/useAddTaskForm.js';
import ButtonUI from '@/components/UI/ButtonUI.jsx';
import useAppStore from '@/store/app.context.jsx';

const TaskAddingContainer = () => {
  const createTask = useAppStore((state) => state.createTask);

  const {
    errors,
    handleSubmit,
    register,
    validationSchemas
  } = useAddTaskForm();

  const createTaskWrapped = async (form) => {
    try {
      await createTask(form);
      alert('Task has created successfully!');
    } catch (e) {
      console.log(e.message);
      alert('Something went wrong...');
    }
  }

  return (
    <>
      <h1>ADD NEW</h1>
      <form className={styles.addition} onSubmit={handleSubmit(createTaskWrapped)}>
        <InputUI
          placeholder="username"
          name="username"
          register={register}
          validationSchema={validationSchemas['username']}
        />
        {errors.username?.type === 'required' && <div className="formError"> {errors.username?.message}</div>}
        {errors.username?.type === 'minLength' && <div className="formError"> {errors.username?.message}</div>}

        <InputUI
          placeholder="email"
          name="email"
          register={register}
          validationSchema={validationSchemas['email']}
        />
        {errors.email?.type === 'required' && <div className="formError"> {errors.email?.message}</div>}
        {errors.email?.type === 'pattern' && <div className="formError"> {errors.email?.message}</div>}

        <InputUI
          placeholder="text"
          name="text"
          register={register}
          validationSchema={validationSchemas['text']}
        />
        {errors.text?.type === 'required' && <div className="formError"> {errors.text?.message}</div>}
        {errors.text?.type === 'minLength' && <div className="formError"> {errors.text?.message}</div>}

        <div className={styles.additionBtnContainer}>
          <ButtonUI type="submit">Create</ButtonUI>
        </div>
      </form>
    </>
  )
}

export default TaskAddingContainer;
