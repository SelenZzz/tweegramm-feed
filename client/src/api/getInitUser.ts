// react
import { UserContext } from '../App';
import { useContext } from 'react';

// utils
import { url } from '../utils/config';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const InitUser = () => {
  const userContext = useContext(UserContext);
  const { token, setToken } = useToken();

  const { getRequest } = useGetRequest(
    `${url}/init_user.php`,
    (r) => {
      userContext.setLogged(true);
      userContext.setUsername(r);
    },
    () => {
      userContext.setLogged(false);
      userContext.setUsername('');

      setToken({ token: '' });
      window.location.reload();
    },
  );

  const initUser = async () => {
    getRequest({ token: token || '' });
  };

  return { initUser };
};
