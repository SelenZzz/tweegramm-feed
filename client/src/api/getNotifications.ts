// react
import { useState, useEffect } from 'react';

// utils
import { url } from '../utils/config';
import { iNotification } from '../utils/types';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetNotifications = () => {
  const { token } = useToken();
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const { getRequest } = useGetRequest(`${url}/notifications.php`, (r) => {
    if (r) setNotifications(r);
  });

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    if (token) getRequest({ token: token });
  };

  return { notifications, getNotifications };
};
