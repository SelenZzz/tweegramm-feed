// react
import { useCallback, useEffect, useState } from 'react';

// utils
import { url } from '../utils/config';
import { iUser } from '../utils/types';

export const GetFriends = () => {
  const [friends, setFriends] = useState<iUser[]>([]);

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = useCallback(() => {
    fetch(`${url}/friends.php`)
      .then((response) => response.json())
      .then((responseJson: iUser[]) => {
        setFriends(responseJson);
      });
  }, []);

  return { friends, getFriends };
};
