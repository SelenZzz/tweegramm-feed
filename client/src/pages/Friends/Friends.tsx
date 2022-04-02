import styles from './Friends.module.css';

// react
import { useEffect, useState } from 'react';

// utils
import { GetFriends } from '../../api/getFriends';

// components
import { User } from './components/User/User';

// hooks
import { useTimeout } from '../../hooks/useTimeout';
import { Spinner } from '../../components/Spinner/Spinner';
import { NothingFound } from '../../components/NothingFound/NothingFound';

export const Friends = () => {
  const { set: startTimer } = useTimeout(() => setError(true), 1000);
  const [error, setError] = useState<boolean>(false);
  const { friends } = GetFriends();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div>
      {friends.map((e) => {
        return <User key={e.uuid} name={e.username} info={e.info || ''} />;
      })}
      {friends.length === 0 && error && <NothingFound />}
      {!error && friends.length === 0 && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
