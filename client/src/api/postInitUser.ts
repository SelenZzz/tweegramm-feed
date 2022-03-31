// react
import { useCallback, useEffect } from 'react';

// utils
import { url } from '../utils/config';

//hooks
import { useToken } from '../hooks/useToken';

// redux
import { userActions } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export const InitUser = () => {
  const { token, setToken } = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) initUser();
  }, []);

  const initUser = useCallback(() => {
    fetch(`${url}/init_user.php`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((responseJson: string) => {
        if (responseJson !== '') dispatch(userActions.login({ username: responseJson }));
        else {
          dispatch(userActions.logout());
          setToken({ token: '' });
        }
      });
  }, [token]);

  return { initUser };
};
