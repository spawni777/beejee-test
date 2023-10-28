import styles from '@/styles/components/taskAddingBlock.module.scss';

import InputUI from './UI/InputUI.jsx';
import { useContext } from 'react';
import useAddTaskForm from '@/hooks/useAddTaskForm.js';
import { AppAPIContext } from '@/store/app.context.jsx';
import ButtonUI from './UI/ButtonUI.jsx';

const TaskAddingBlock = () => {
  const appAPICtx = useContext(AppAPIContext);

  const {
    errors,
    handleSubmit,
    register,
    validationSchemas
  } = useAddTaskForm();

  const createTask = async (form) => {
    try {
      await appAPICtx.createTask(form);
      alert('Task has created successfully!');
    } catch (e) {
      console.log(e.message);
      alert('Something went wrong...');
    }
  }

  return (
    <>
      <h1>ADD NEW</h1>
      <form className={styles.addition} onSubmit={handleSubmit(createTask)}>
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
        {errors.text?.type === 'pattern' && <div className="formError"> {errors.text?.message}</div>}

        <div className={styles.additionBtnContainer}>
          <ButtonUI type="submit">Create</ButtonUI>
        </div>
      </form>
    </>
  )
}

export default TaskAddingBlock;
