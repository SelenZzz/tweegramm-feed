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

export const GetFeed = () => {
  const { token, setToken } = useToken();
  const uuid = useSelector(selectUserUid);
  const [posts, setPosts] = useState<iPost[]>([]);

  useEffect(() => {
    if (uuid || !token) getFeed();
  }, [uuid]);

  const getFeed = useCallback(() => {
    const response = fetch(`${url}/feed.php`, {
      method: 'POST',
      body: JSON.stringify({ uuid: uuid }),
    })
      .then((response) => response.json())
      .then((responseJson: iPost[]) => {
        setPosts(responseJson);
      });
    return response;
  }, [uuid]);

  return { posts, getFeed };
};
