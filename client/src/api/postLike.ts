// utils
import { url } from '../utils/config';

//hooks
import { useToken } from '../hooks/useToken';

// redux
import { selectUserUid } from '../redux/userSlice';
import { useSelector } from 'react-redux';

export const PostLike = () => {
  const { token, setToken } = useToken();
  const uuid = useSelector(selectUserUid);

  const postLike = async (post_uuid: string) => {
    if (token) {
      const response = await fetch(`${url}/send_like.php?u=${uuid}&p=${post_uuid}`);
      return response.ok;
    }
    return false;
  };

  return { postLike };
};
