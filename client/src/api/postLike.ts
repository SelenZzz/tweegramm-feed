// react
import { useCallback } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';

// redux
import { selectUserUid } from '../redux/userSlice';
import { useSelector } from 'react-redux';

export const PostLike = () => {
  const { token, setToken } = useToken();
  const uuid = useSelector(selectUserUid);

  const postLike = useCallback(
    (post_uuid: string) => {
      if (token) {
        const response = fetch(`${url}/send_like.php`, {
          method: 'POST',
          body: JSON.stringify({ uuid: uuid, post_uuid: post_uuid }),
        })
          .then((response) => response.json())
          .then((responseJson: iPost) => responseJson);
        return response;
      }
      return false;
    },
    [token],
  );

  return { postLike };
};
