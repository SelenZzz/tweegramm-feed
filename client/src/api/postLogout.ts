// react
import { UserContext } from '../App';
import { useContext } from 'react';

// hooks
import { useToken } from '../hooks/useToken';
import { usePostRequest } from '../hooks/usePostRequest';

// utils
import { url } from '../utils/config';

export const PostLogout = () => {
  const userContext = useContext(UserContext);
  const { postRequest } = usePostRequest(`${url}/logout.php`, (r) => {
    window.location.reload();
  });
  const { token, setToken } = useToken();

  const postLogout = async () => {
    userContext.setLogged(false);
    userContext.setUsername('');
    setToken({ token: '' });
    postRequest({ token: token || '' });
  };

  return { postLogout };
};
