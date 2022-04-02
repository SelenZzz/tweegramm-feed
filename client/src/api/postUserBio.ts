// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

// hooks
import { useToken } from '../hooks/useToken';
import { usePostRequest } from '../hooks/usePostRequest';

export const PostUserBio = () => {
  const { token } = useToken();
  const { postRequest } = usePostRequest(`${url}/send_bio.php`, () => window.location.reload());

  const sendUserBio = async (text: string) => {
    postRequest({ token: token, text: text });
  };

  return { sendUserBio };
};
