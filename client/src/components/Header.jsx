import styles from '@/styles/components/header.module.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppAPIContext } from '@/store/app.context.jsx';
import ButtonUI from './UI/ButtonUI.jsx';
import Cookies from 'js-cookie';

const Header = ({isAdmin = false}) => {
  const appAPICtx = useContext(AppAPIContext);

  /////////////////////////////////////

  const onSortedByChange = (event) => {
    appAPICtx.setTaskSortBy(event.target.value);
  }

  const onSortedDirectionChange = (event) => {
    appAPICtx.setTaskSortDirection(event.target.value);
  }

  /////////////////////////////////////

  const navigate = useNavigate();

  const onBtnPress = () => {
    if (isAdmin) {
      Cookies.remove('AUTH');

    }
    navigate('/login');
  }

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
