// react
import { useState, useCallback, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';

export const GetFeed = () => {
  const { token, setToken } = useToken();
  const [posts, setPosts] = useState<iPost[]>([]);

  useEffect(() => {
    getFeed();
  }, [token]);

  const getFeed = async () => {
    const response = fetch(`${url}/feed.php`, {
      method: 'POST',
      body: JSON.stringify({ token: token || '' }),
    })
      .then((response) => response.json())
      .then((responseJson: iPost[]) => {
        setPosts(responseJson);
      });
    return response;
  };

  return { posts, getFeed };
};
