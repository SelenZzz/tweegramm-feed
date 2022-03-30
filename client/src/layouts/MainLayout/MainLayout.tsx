import styles from './MainLayout.module.css';

import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { SignUpAlert } from '../../components/SignUpAlert/SignUpAlert';

import { selectLogged } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// components
import { LoginModal, SignUpModal } from '../../pages/Auth/Auth';
import { Navbar } from './components/Navbar/Navbar';
import { Tags } from './components/Tagbar/TagBar';

export const MainLayout = () => {
  const logged = useSelector(selectLogged);

  const [showSignUpModal, setSignUpModal] = useState(false);
  const [showLoginModal, setLoginModal] = useState(false);

  const location = useLocation();
  const title = () => {
    switch (location.pathname) {
      case '/':
        return 'Feed';

      case '/Profile':
        return 'Profile';

      case '/Friends':
        return 'Friends';

      default:
        return 'Not found';
    }
  };

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
            <div className={styles.title}>{title()}</div>
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
