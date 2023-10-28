import styles from '@/styles/components/tasks.module.scss';
import { useContext } from 'react';
import { AppAPIContext, AppDataContext } from '@/store/app.context.jsx';
import Task from '@/components/Task.jsx';

const Tasks = ({isAdmin = false}) => {
  const appDataCtx = useContext(AppDataContext);
  const appAPICtx = useContext(AppAPIContext);

  const goNextPage = () => {
    appAPICtx.goToPage(appDataCtx.curTasksPage + 1);
  }
  const goPrevPage = () => {
    appAPICtx.goToPage(appDataCtx.curTasksPage - 1);
  }

  return (
    <>
      <h1>TASKS PAGE: {appDataCtx.curTasksPage}</h1>

      <div className={styles.tasks}>
        {appDataCtx.tasks.map(task => (
          <Task
            key={task.id}
            username={task.username}
            email={task.email}
            text={task.text}
            completed={task.completed}
            isAdmin={isAdmin}
            edited={task.edited}
            id={task.id}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        {(appDataCtx.curTasksPage !== 0) && (
          <div
            className={styles.button}
            onClick={goPrevPage}
          >
            prev
          </div>
        )}
        <div/>

        {!appDataCtx.isEnd && (
          <div
            className={styles.button}
            onClick={goNextPage}
          >
            next
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks;
