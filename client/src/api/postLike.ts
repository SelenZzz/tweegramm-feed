// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { usePostRequest } from '../hooks/usePostRequest';

export const PostLike = (onResponse: (json: iPost) => void) => {
  const { token, setToken } = useToken();
  const { postRequest } = usePostRequest(`${url}/send_like.php`, (r) => onResponse(r));

  const postLike = async (post_uuid: string) => {
    postRequest({ token: token, post_uuid: post_uuid });
  };

  return { postLike };
};
