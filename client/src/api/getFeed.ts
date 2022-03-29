// react
import { useState } from 'react';

// utils
import { url } from '../utils/config';
import { iPost } from '../utils/types';

export const GetFeed = () => {
  const [posts, setPosts] = useState<iPost[]>([]);

  const getFeed = () => {
    fetch(`${url}/feed.php`)
      .then((response) => response.json())
      .then((responseJson: iPost[]) => {
        setPosts(responseJson);
      });
  };

  return { posts, getFeed };
};
