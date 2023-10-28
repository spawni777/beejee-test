import styles from '@/styles/components/header.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '@/components/UI/ButtonUI.jsx';
import { getLogoutAPI } from '@/api/users.js';
import useAppStore from '@/store/app.context.jsx';

const Header = ({isAdmin = false}) => {
  const [changeSortedBy, changeSortDirection] = useAppStore((state) => [state.changeSortedBy, state.changeSortDirection]);

  const onSortedByChange = (event) => {
    changeSortedBy(event.target.value);
  }

  const onSortedDirectionChange = (event) => {
    changeSortDirection(event.target.value);
  }

  /////////////////////////////////////
  const navigate = useNavigate();

  const onBtnPress = async () => {
    if (isAdmin) {
      await getLogoutAPI();
    }
    navigate('/login');
  }
  /////////////////////////////////////

  return (
    <div className={styles.header}>
      <div className={styles.sorting}>
        <div className={styles.sortingTitle}>Sorting</div>
        <select name="sorting" onChange={onSortedByChange}>
          <option value="username">By Username</option>
          <option value="email">By Email</option>
          <option value="completed">By Completed</option>
        </select>
        <select name="sortingDirection" onChange={onSortedDirectionChange}>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
      <div className={styles.btnContainer}>
        <ButtonUI onClick={onBtnPress}>{ isAdmin ? 'LOG OUT' : 'LOG IN' }</ButtonUI>
      </div>
    </div>
  )
}

export default Header;
