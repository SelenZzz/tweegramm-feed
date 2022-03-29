// react
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// hooks
import { useNetworkStatus } from './hooks/useNetworkStatus';

// layout
import { MainLayout } from './layouts/MainLayout/MainLayout';

// pages
import { NoPage } from './pages/NoPage/NoPage';
import { Feed } from './pages/Feed/Feed';
import { Profile } from './pages/Profile/Profile';
import { LoginModal, SignUpModal } from './pages/Auth/Auth';

const App = () => {
  const { isOnline } = useNetworkStatus();
  console.log(isOnline ? 'Connection established' : 'No connection');

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

export default App;
