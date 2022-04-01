import styles from './Profile.module.css';

// react
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { User } from './components/User';
import { Post } from '../../components/Post/Post';
import { Spinner } from '../../components/Spinner/Spinner';
import { NothingFound } from '../../components/NothingFound/NothingFound';

// hooks
import { useToken } from '../../hooks/useToken';
import { useTimeout } from '../../hooks/useTimeout';

// utils
import { GetUserFeed } from '../../api/getUserFeed';

export const Profile = () => {
  const userContext = useContext(UserContext);
  const { start: startTimer, clear: clearTimer } = useTimeout(() => setError(true), 1000);

  const { token, setToken } = useToken();
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname.split('/').pop();
  const profileName =
    pathname!.toLowerCase() === 'profile' ? userContext.username : pathname;

  const { posts, getUserFeed } = GetUserFeed();

  const currentUserPage =
    userContext.username.toLowerCase() === pathname?.toLowerCase() ||
    pathname?.toLowerCase() === 'profile';

  useEffect(() => {
    clearTimer();
    startTimer();
  }, []);

  useEffect(() => {
    if (pathname!.toLowerCase() === 'profile' && token === '') navigate('/');
  }, [pathname]);

  useEffect(() => {
    if (profileName) getUserFeed(profileName);
  }, [profileName]);

  return (
    <>
      <User username={profileName!} />
      <div className={styles.feed}>
        {currentUserPage && <PostInput onSend={() => getUserFeed(profileName!)} />}
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
