// react
import { useNavigate } from 'react-router-dom';

// utils
import { url } from '../utils/config';
import { iUser } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetAuth = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const userAgent = navigator.userAgent.slice(0, 128);

  const { getRequest: loginRequest } = useGetRequest(`${url}/login.php`, (r) =>
    onResponse(r),
  );
  const { getRequest: signUpRequest } = useGetRequest(`${url}/signup.php`, (r) =>
    onResponse(r),
  );

  const login = async (user: iUser) => {
    const { username, password } = user;
    loginRequest({
      username: username,
      password: password,
      userAgent: userAgent,
    });
  };

  const signUp = async (newUser: iUser) => {
    const { username, password, email, birthday } = newUser;
    signUpRequest({
      username: username,
      password: password,
      email: email,
      birthday: birthday,
      userAgent: userAgent,
    });
  };

  const onResponse = (r: { token: string }) => {
    if (r.token.length > 0) {
      setToken(r);
      navigate('/');
      window.location.reload();
    }
  };

  return { signUp, login };
};
