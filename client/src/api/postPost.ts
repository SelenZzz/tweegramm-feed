// utils
import { url } from '../utils/config';

// redux
import { selectUserUid } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

export const PostPost = () => {
  const uuid = useSelector(selectUserUid);

  const sendPost = useCallback(
    (text: string) => {
      const response = fetch(`${url}/send_post.php`, {
        method: 'POST',
        body: JSON.stringify({ uuid, text }),
      }).then((response) => response.ok);
      return response;
    },
    [uuid],
  );

  return { sendPost };
};
