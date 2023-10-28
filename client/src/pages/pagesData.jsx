import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound/NotFound';
import Admin from '@/pages/Admin';

const pagesData = [
  {
    path: '',
    element: Home,
    title: 'home',
  },
  {
    path: '/login',
    element: Login,
    title: 'login',
  },
  {
    path: '/admin',
    element: Admin,
    title: 'admin',
  },
  {
    path: '*',
    element: NotFound,
    title: 'notFound',
  }
];

export default pagesData;
