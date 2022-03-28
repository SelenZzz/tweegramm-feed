import styles from './MainLayout.module.css';

// react
import { Outlet } from 'react-router-dom';

// hooks
import { usePageName } from '../../hooks/usePageName';

export const MainLayout = () => {
  const { pageName } = usePageName();

  return (
    <>
      {pageName}
      <Outlet />
    </>
  );
};
