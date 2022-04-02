// react
import { UserContext } from '../App';
import { useContext } from 'react';

// utils
import { url } from '../utils/config';

// hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

// api
import { PostLogout } from './postLogout';

export const InitUser = () => {
  const userContext = useContext(UserContext);
  const { postLogout } = PostLogout();
  const { token, setToken } = useToken();

  const { getRequest } = useGetRequest(
    `${url}/init_user.php`,
    (r: { username: string; notifications: number }) => {
      if (r.username === '') {
        postLogout();
        return;
      }
      userContext.setLogged(true);
      userContext.setUsername(r.username);
      userContext.setNotifications(r.notifications);
    },
    () => postLogout(),
  );

  const initUser = async () => {
    getRequest({ token: token || '' });
  };

  return { initUser };
};
