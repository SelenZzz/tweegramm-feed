// react
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// hooks
import { useNetworkStatus } from './hooks/useNetworkStatus';

// redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// layout
import { MainLayout } from './layouts/MainLayout/MainLayout';

// pages
import { NoPage } from './pages/NoPage/NoPage';
import { Feed } from './pages/Feed/Feed';
import { Profile } from './pages/Profile/Profile';
import { LoginModal, SignUpModal } from './pages/Auth/Auth';
import { Friends } from './pages/Friends/Friends';
import { useToken } from './hooks/useToken';
import { InitUser } from './api/postInitUser';

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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
