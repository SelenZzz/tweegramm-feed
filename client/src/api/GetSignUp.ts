//react
import { useNavigate } from 'react-router-dom';

// hook
import { useToken } from '../hooks/useToken';

// utils
import { url } from '../utils/config';
import { newUser } from '../utils/types';

export const GetSignUp = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const signUp = (newUser: newUser) => {
    const { username, password, email, birthday } = newUser;
    fetch(`${url}/signup.php?u=${username}&p=${password}&e=${email}&b=${birthday}`)
      .then((response) => response.json())
      .then((responseJson: { token: string }) => {
        if (responseJson.token.length > 0) {
          setToken(responseJson);
          navigate('/');
        }
      });
  };
  return { signUp };
};
