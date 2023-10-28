import styles from '@/styles/pages/admin.module.scss';
import Tasks from '@/components/Tasks.jsx';
import Header from '@/components/Header.jsx';

const Admin = () => {
  return (
    <div className={ styles.admin }>
      <Header
        isAdmin={true}
      />
      <h1>ADMIN PANEL: {}</h1>
      <Tasks
        isAdmin={true}
      />
    </div>
  )
}

export default Admin;
