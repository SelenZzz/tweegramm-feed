import styles from './MainLayout.module.css';

import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { SignUpAlert } from '../../components/SignUpAlert/SignUpAlert';

import { selectLogged } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

// components
import { LoginModal, SignUpModal } from '../../pages/Auth/Auth';
import { Navbar } from './components/Navbar/Navbar';
import { Tags } from './components/Tagbar/TagBar';
import { usePageName } from '../../hooks/usePageName';

export const MainLayout = () => {
  const logged = useSelector(selectLogged);

  const [showSignUpModal, setSignUpModal] = useState(false);
  const [showLoginModal, setLoginModal] = useState(false);

  const { pageName } = usePageName();

  return (
    <>
      {showSignUpModal && <SignUpModal onCloseRequest={() => setSignUpModal(false)} />}
      {showLoginModal && <LoginModal onCloseRequest={() => setLoginModal(false)} />}
      {!logged && (
        <SignUpAlert
          onSignUpClick={() => setSignUpModal(true)}
          onLoginClick={() => setLoginModal(true)}
        />
      )}
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
