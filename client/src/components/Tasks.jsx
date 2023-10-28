import styles from '@/styles/components/tasks.module.scss';
import Task from '@/components/Task.jsx';
import useAppStore from '@/store/app.context.jsx';

const Tasks = ({isAdmin = false}) => {
  const {
    tasks,
    currentPage,
    isLastPage,
    goToPage,
  } = useAppStore();

  const goNextPage = () => {
    goToPage(currentPage + 1);
  }
  const goPrevPage = () => {
    goToPage(currentPage - 1);
  }

  return (
    <>
      <h1>TASKS PAGE: {currentPage}</h1>

      <div className={styles.tasks}>
        {tasks.map(task => (
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
        {(currentPage !== 0) && (
          <div
            className={styles.button}
            onClick={goPrevPage}
          >
            prev
          </div>
        )}
        <div/>

        {!isLastPage && (
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
