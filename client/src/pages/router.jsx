import { Route, Routes } from 'react-router-dom';
import pagesData from '@/pages/pagesData';

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element, children }) => {
    return (
      <Route
        key={title}
        path={`/${path}`}
        Component={element}
      >
        {children?.length && children.map(({path, title, element}) => (
          <Route
            key={title}
            path={`/${path}`}
            element={element}
          />
        ))}
      </Route>
    )
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
