// utils
import { url } from '../utils/config';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

// redux
import { userActions } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export const InitUser = () => {
  const { token, setToken } = useToken();
  const dispatch = useDispatch();

  const { getRequest } = useGetRequest(
    `${url}/init_user.php`,
    (r) => dispatch(userActions.login({ username: r })),
    () => {
      dispatch(userActions.logout());
      setToken({ token: '' });
      window.location.reload();
    },
  );

  const initUser = async () => {
    getRequest({ token: token || '' });
  };

  return { initUser };
};
