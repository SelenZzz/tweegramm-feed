// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

// hooks
import { useToken } from '../hooks/useToken';
import { usePostRequest } from '../hooks/usePostRequest';

export const PostPost = (onResponse: (json: iPost) => void) => {
  const { token, setToken } = useToken();
  const { postRequest } = usePostRequest(`${url}/send_post.php`, (r) => onResponse(r));

  const sendPost = async (text: string) => {
    postRequest({ token: token, text: text });
  };

  return { sendPost };
};
