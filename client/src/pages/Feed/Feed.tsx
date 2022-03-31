import styles from './Feed.module.css';

// react
import { useState, useEffect } from 'react';

// hooks
import { useTimeout } from '../../hooks/useTimeout';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { Post } from '../../components/Post/Post';
import { NothingFound } from '../../components/NothingFound/NothingFound';
import { Spinner } from '../../components/Spinner/Spinner';

// utils
import { GetFeed } from '../../api/getFeed';

// redux
import { selectLogged } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

export const Feed = () => {
  const { start: startTimer, clear: clearTimer } = useTimeout(() => setError(true), 1000);
  const [error, setError] = useState<boolean>(false);

  const logged = useSelector(selectLogged);

  const { posts, getFeed } = GetFeed();

  useEffect(() => {
    clearTimer();
    startTimer();
  }, []);

  return (
    <>
      <div>
        {logged && <PostInput onSend={getFeed} />}
        {posts.map((result) => {
          return <Post key={result.uuid} data={result} />;
        })}
        {posts.length === 0 && error && <NothingFound />}
        {!error && posts.length === 0 && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};
