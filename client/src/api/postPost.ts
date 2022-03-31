// utils
import { url } from '../utils/config';

// react
import { useCallback } from 'react';

// hooks
import { useToken } from '../hooks/useToken';

export const PostPost = () => {
  const { token, setToken } = useToken();

  const sendPost = useCallback(
    (text: string) => {
      if (token) {
        const response = fetch(`${url}/send_post.php`, {
          method: 'POST',
          body: JSON.stringify({ token: token, text: text }),
        }).then((response) => response.ok);
        return response;
      }
      return false;
    },
    [token],
  );

  return { sendPost };
};
