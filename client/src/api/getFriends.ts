// react
import { useState, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iUser } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetFriends = () => {
  const { token, setToken } = useToken();
  const [friends, setFriends] = useState<iUser[]>([]);
  const { getRequest } = useGetRequest(`${url}/friends.php`, (r) => setFriends(r));

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    getRequest({ token: token || '' });
  };

  return { friends, getFriends };
};
