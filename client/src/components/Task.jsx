import styles from '@/styles/components/task.module.scss';
import { memo, useState } from 'react';
import InputUI from '@/components/UI/InputUI.jsx';
import ButtonUI from '@/components/UI/ButtonUI.jsx';
import useAppStore from '@/store/app.context.jsx';

const Task = ({
  username,
  email,
  text,
  completed,
  isAdmin,
  id,
  edited
}) => {
  const [updatedTextField, setUpdatedTextField] = useState(text);
  const [updatedCompletedField, setUpdatedCompletedField] = useState(completed);

  const onTextChange = (event) => setUpdatedTextField(event.target.value);
  const onCompletedChange = (event) => setUpdatedCompletedField(event.target.checked);

  const updateTask = useAppStore((state) => state.updateTask)
  const updateTaskWrapped = async () => {
    try {
      await updateTask({
        id,
        completed: updatedCompletedField,
        text: updatedTextField
      });

      alert('Updated successfully!')
    } catch (err) {
      alert('Something went wrong...')
    }
  }

  /////////////////////////////////

  const completedClass = completed
    ? styles.completed
    : styles.notCompleted;

  /////////////////////////////////

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
        <ButtonUI onClick={updateTaskWrapped}>Save Changes</ButtonUI>
      )}
    </div>
  )
}

export default memo(Task);
