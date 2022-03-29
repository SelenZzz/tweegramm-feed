// react
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// hooks
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useToken } from './hooks/useToken';

// redux
import { useDispatch, Provider } from 'react-redux';
import { userActions } from './redux/userSlice';
import { store } from './redux/store';
import jwt_decode from 'jwt-decode';
// layout
import { MainLayout } from './layouts/MainLayout/MainLayout';

// pages
import { NoPage } from './pages/NoPage/NoPage';
import { Feed } from './pages/Feed/Feed';
import { Profile } from './pages/Profile/Profile';
import { LoginModal, SignUpModal } from './pages/Auth/Auth';

const App = () => {
  const dispatch = useDispatch();
  const { token, setToken } = useToken();

  const { isOnline } = useNetworkStatus();
  console.log(isOnline ? 'Connection established' : 'No connection');

  useEffect(() => {
    if (token) {
      const user = jwt_decode<any>(token).data;
      dispatch(userActions.login({ user }));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<SignUpModal />} />
        <Route path="login" element={<LoginModal />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Feed />} />
          <Route path="profile" element={<Profile />} />
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
