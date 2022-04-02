import styles from './Notifications.module.css';

// react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import { GetNotifications } from '../../api/getNotifications';

// components
import { Spinner } from '../../components/Spinner/Spinner';
import { NothingFound } from '../../components/NothingFound/NothingFound';
import { Event } from './components/Event/Event';

// hooks
import { useTimeout } from '../../hooks/useTimeout';
import { useToken } from '../../hooks/useToken';

export const Notifications = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const { set: startTimer } = useTimeout(() => setError(true), 1000);
  const [error, setError] = useState<boolean>(false);
  const { notifications } = GetNotifications();

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (!token) navigate('/');
  }, [token]);

  return (
    <div>
      {notifications.map((e) => {
        return <Event key={e.uuid} username={e.username} createdAt={e.createdAt} text={e.text} />;
      })}
      {notifications.length === 0 && error && <NothingFound />}
      {!error && notifications.length === 0 && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
