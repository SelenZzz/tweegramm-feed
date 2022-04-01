// react
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const AppWrapper = () => {
  const [username, setUsername] = useState<string>('');
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ username, setUsername, logged, setLogged }}>
      <App />
    </UserContext.Provider>
  );
};

const App = () => {
  const { token, setToken } = useToken();
  const { initUser } = InitUser();
  const { isOnline } = useNetworkStatus();
  console.log(isOnline ? 'Connection established' : 'No connection');

  useEffect(() => {
    if (token) initUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="Signup" element={<SignUpModal />} />
        <Route path="Login" element={<LoginModal />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Feed />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Friends" element={<Friends />} />
          <Route path="Friends/*" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppWrapper;
