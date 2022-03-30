// redux
import { useDispatch } from 'react-redux';

// hooks
import { useToken } from '../hooks/useToken';
import { userActions } from '../redux/userSlice';

export const PostLogout = () => {
  const { token, setToken } = useToken();
  const dispatch = useDispatch();

  const postLogout = () => {
    setToken({ token: '' });
    dispatch(userActions.logout);
    window.location.reload();
  };

  return { postLogout };
};
