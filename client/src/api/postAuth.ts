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
  const userAgent = navigator.userAgent;

  const signUp = async (newUser: iUser) => {
    const { username, password, email, birthday } = newUser;
    fetch(`${url}/signup.php`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthday: birthday,
        userAgent: userAgent,
      }),
    })
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
  const userAgent = navigator.userAgent.slice(0, 32);

  const login = async (user: iUser) => {
    const { username, password } = user;
    fetch(`${url}/login.php`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        userAgent: userAgent,
      }),
    })
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
