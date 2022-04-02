// react
import { useState } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetUserFeed = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState<iPost[]>([]);
  const { getRequest } = useGetRequest(`${url}/user_feed.php`, (r) => {
    if (r) setPosts(r);
  });

  const getUserFeed = async (username: string) => {
    getRequest({ token: token || '', username: username });
  };

  return { posts, getUserFeed };
};
