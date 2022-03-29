//react
import { useNavigate } from 'react-router-dom';

// hook
import { useToken } from '../hooks/useToken';

// utils
import { url } from '../utils/config';
import { iUser } from '../utils/types';

export const GetSignUp = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const signUp = (newUser: iUser) => {
    const { username, password, email, birthday } = newUser;
    fetch(`${url}/signup.php?u=${username}&p=${password}&e=${email}&b=${birthday}`)
      .then((response) => response.json())
      .then((responseJson: { token: string }) => {
        if (responseJson.token.length > 0) {
          setToken(responseJson);
          navigate('/');
          window.location.reload();
        }
      });
  };
  return { signUp };
};

export const GetLogin = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const login = (user: iUser) => {
    const { username, password } = user;
    fetch(`${url}/login.php?u=${username}&p=${password}`)
      .then((response) => response.json())
      .then((responseJson: { token: string }) => {
        console.log(responseJson);
        if (responseJson.token.length > 0) {
          setToken(responseJson);
          navigate('/');
          window.location.reload();
        }
      });
  };
  return { login };
};
