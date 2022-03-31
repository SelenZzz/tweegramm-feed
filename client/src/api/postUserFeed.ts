// react
import { useState, useCallback, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';

export const GetUserFeed = () => {
  const { token, setToken } = useToken();

  const [posts, setPosts] = useState<iPost[]>([]);

  const getUserFeed = useCallback(
    (username: string) => {
      fetch(`${url}/user_feed.php`, {
        method: 'POST',
        body: JSON.stringify({ token: token || '', username: username }),
      })
        .then((response) => response.json())
        .then((responseJson: iPost[]) => {
          setPosts(responseJson);
        });
    },
    [token],
  );

  return { posts, getUserFeed };
};
