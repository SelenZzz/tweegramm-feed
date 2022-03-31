// react
import { useState, useCallback, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';

// redux
import { selectUserUid } from '../redux/userSlice';
import { useSelector } from 'react-redux';

export const GetUserFeed = (username: string) => {
  const { token, setToken } = useToken();
  const uuid = useSelector(selectUserUid);
  const [posts, setPosts] = useState<iPost[]>([]);

  useEffect(() => {
    if (uuid || !token) getUserFeed();
  }, [uuid]);

  const getUserFeed = useCallback(() => {
    fetch(`${url}/user_feed.php`, {
      method: 'POST',
      body: JSON.stringify({ uuid: uuid || '', username: username }),
    })
      .then((response) => response.json())
      .then((responseJson: iPost[]) => {
        setPosts(responseJson);
      });
  }, [uuid]);

  return { posts, getUserFeed };
};
