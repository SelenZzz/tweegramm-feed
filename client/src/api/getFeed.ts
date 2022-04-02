// react
import { useState, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetFeed = () => {
  const { token, setToken } = useToken();
  const [posts, setPosts] = useState<iPost[]>([]);
  const { getRequest } = useGetRequest(`${url}/feed.php`, (r) => {
    if (r) setPosts(r);
  });

  useEffect(() => {
    getFeed();
  }, [token]);

  const getFeed = async () => {
    getRequest({ token: token || '' });
  };

  return { posts, getFeed };
};
