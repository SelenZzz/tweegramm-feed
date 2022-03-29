// utils
import { url } from '../utils/config';

// redux
import { selectUserUid } from '../redux/userSlice';
import { useSelector } from 'react-redux';

export const PostPost = () => {
  const uuid = useSelector(selectUserUid);

  const sendPost = async (text: string) => {
    const response = await fetch(`${url}/send_post.php?u=${uuid}&t=${text}`);
    return response.ok;
  };

  return { sendPost };
};
