// react
import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// hooks
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useToken } from './hooks/useToken';

// layout
import { MainLayout } from './layouts/MainLayout/MainLayout';

// pages
import { NoPage } from './pages/NoPage/NoPage';
import { Feed } from './pages/Feed/Feed';
import { Profile } from './pages/Profile/Profile';
import { LoginModal, SignUpModal } from './pages/Auth/Auth';
import { Friends } from './pages/Friends/Friends';
import { Notifications } from './pages/Notifications/Notifications';

// api
import { InitUser } from './api/getInitUser';

interface iUserContext {
  username: string;
  setUsername: (v: string) => void;
  logged: boolean;
  setLogged: (v: boolean) => void;
}

const defaultState: iUserContext = {
  username: '',
  setUsername: () => {},
  logged: false,
  setLogged: () => {},
};

export const UserContext = createContext<iUserContext>(defaultState);

const UserContextWrapper = () => {
  const [username, setUsername] = useState<string>('');
  const [logged, setLogged] = useState<boolean>(false);
  // prettier-ignore
  return (
    <UserContext.Provider value={{ username, setUsername, logged, setLogged }}>
      <App/>
    </UserContext.Provider>
  );
};

const LocationWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

const App = () => {
  const { token } = useToken();
  const { initUser } = InitUser();
  const { isOnline } = useNetworkStatus();
  console.log(isOnline ? 'Connection established' : 'No connection');

  useEffect(() => {
    if (token) initUser();
  }, []);

  return (
    <BrowserRouter>
      <LocationWrapper>
        <Routes>
          <Route path="Signup" element={<SignUpModal />} />
          <Route path="Login" element={<LoginModal />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Feed />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="Friends" element={<Friends />} />
            <Route path="Friends/*" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </LocationWrapper>
    </BrowserRouter>
  );
};

export default UserContextWrapper;
