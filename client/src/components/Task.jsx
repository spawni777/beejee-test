import styles from '@/styles/components/task.module.scss';
import { memo, useContext, useState } from 'react';
import InputUI from './UI/InputUI.jsx';
import ButtonUI from './UI/ButtonUI.jsx';
import { AppAPIContext } from '../store/app.context.jsx';

const Task = ({
  username,
  email,
  text,
  completed,
  isAdmin,
  id,
  edited
}) => {
  const completedClass = completed
    ? styles.completed
    : styles.notCompleted;

  const [updatedText, setUpdatedText] = useState(text);
  const [updatedCompleted, setUpdatedCompleted] = useState(completed);

  const onTextChange = (event) => setUpdatedText(event.target.value);
  const onCompletedChange = (event) => setUpdatedCompleted(event.target.checked);

  const appAPICtx = useContext(AppAPIContext);

  const updateTask = async () => {
    try {
      await appAPICtx.updateTask({
        id,
        completed: updatedCompleted,
        text: updatedText
      });

      console.log('Updated successfully...')
    } catch (err) {
      alert('Something went wrong...')
    }
  }

  return (
    <div className={styles.task}>
      <div className={styles.header}>
        {!isAdmin && (
          <div className={`${styles.status} ${completedClass}`} />
        )}
        {isAdmin && (
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxTitle}>STATUS</div>
            <input type="checkbox" className={styles.checkbox} onChange={onCompletedChange} defaultChecked={completed}/>
          </div>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldTitle}>username</div>
        <div className={styles.fieldValue}>{username}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldTitle}>email</div>
        <div className={styles.fieldValue}>{email}</div>
      </div>

      {!isAdmin && (
        <div className={styles.field}>
          <div className={styles.fieldTitle}>text</div>
          <div className={styles.fieldValue}>{text}</div>
        </div>
      )}

      {isAdmin && (
        <InputUI
          defaultValue={text}
          name="text"
          onChange={onTextChange}
        />
      )}

      <div className={styles.field}>
        <div className={styles.fieldTitle}>Edited By Admin</div>
        <div className={styles.fieldValue}>{String(edited)}</div>
      </div>

      {isAdmin && (
        <ButtonUI onClick={updateTask}>Save Changes</ButtonUI>
      )}
    </div>
  )
}

export default memo(Task);
