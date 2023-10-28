import styles from '@/styles/pages/home.module.scss';
import Tasks from '@/components/Tasks.jsx';
import Header from '@/components/Header.jsx';
import TaskAddingContainer from '@/components/TaskAddingContainer.jsx';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Tasks />
      <TaskAddingContainer />
    </div>
  );
};

export default Home;
