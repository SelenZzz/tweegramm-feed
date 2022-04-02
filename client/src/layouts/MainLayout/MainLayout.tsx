import styles from './MainLayout.module.css';

// react
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// hooks
import { usePageName } from '../../hooks/usePageName';
import { useToken } from '../../hooks/useToken';

// components
import { LoginModal, SignUpModal } from '../../pages/Auth/Auth';
import { SignUpAlert } from '../../components/SignUpAlert/SignUpAlert';
import { Navbar } from './components/Navbar/Navbar';
import { Tags } from './components/Tagbar/TagBar';

export const MainLayout = () => {
  const { token } = useToken();

  const [showSignUpModal, setSignUpModal] = useState(false);
  const [showLoginModal, setLoginModal] = useState(false);

  const { pageName } = usePageName();

  return (
    <>
      {showSignUpModal && <SignUpModal onCloseRequest={() => setSignUpModal(false)} />}
      {showLoginModal && <LoginModal onCloseRequest={() => setLoginModal(false)} />}
      {(!token || token === '') && <SignUpAlert onSignUpClick={() => setSignUpModal(true)} onLoginClick={() => setLoginModal(true)} />}
      <div className={styles.container}>
        <Navbar />
        <div className={styles.outlet}>
          <div className={styles.header}>
            <div className={styles.title}>{pageName}</div>
          </div>
          <Outlet />
        </div>
        <Tags />
      </div>
      <footer>
        <p>:)</p>
      </footer>
    </>
  );
};
