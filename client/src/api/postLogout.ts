// react
import { UserContext } from '../App';
import { useContext } from 'react';

// hooks
import { useToken } from '../hooks/useToken';

export const PostLogout = () => {
  const userContext = useContext(UserContext);
  const { token, setToken } = useToken();

  const postLogout = () => {
    userContext.setLogged(false);
    userContext.setUsername('');
    setToken({ token: '' });
    window.location.reload();
  };

  return { postLogout };
};
