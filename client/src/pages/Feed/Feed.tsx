import styles from './Feed.module.css';

// react
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

// hooks
import { useTimeout } from '../../hooks/useTimeout';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { Post } from '../../components/Post/Post';
import { NothingFound } from '../../components/NothingFound/NothingFound';
import { Spinner } from '../../components/Spinner/Spinner';

// utils
import { GetFeed } from '../../api/getFeed';

export const Feed = () => {
  const { set: startTimer } = useTimeout(() => setError(true), 1000);
  const [error, setError] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  const { posts, getFeed } = GetFeed();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div>
        {userContext.logged && <PostInput onSend={getFeed} />}
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
