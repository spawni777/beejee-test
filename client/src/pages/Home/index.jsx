import styles from '@/styles/pages/home.module.scss';
import Tasks from '../../components/Tasks.jsx';
import Header from '../../components/Header.jsx';
import TaskAddingBlock from '@/components/TaskAddingBlock.jsx';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Tasks />
      <TaskAddingBlock />
    </div>
  );
};

export default Home;
