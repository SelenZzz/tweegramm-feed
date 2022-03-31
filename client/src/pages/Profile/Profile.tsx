import styles from './Profile.module.css';

// react
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { User } from './components/User';
import { Post } from '../../components/Post/Post';
import { Spinner } from '../../components/Spinner/Spinner';
import { NothingFound } from '../../components/NothingFound/NothingFound';

// redux
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/userSlice';

// hooks
import { useToken } from '../../hooks/useToken';
import { useTimeout } from '../../hooks/useTimeout';

// utils
import { GetUserFeed } from '../../api/getUserFeed';

export const Profile = () => {
  const { start: startTimer, clear: clearTimer } = useTimeout(() => setError(true), 1000);

  const { token, setToken } = useToken();
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentUsername = useSelector(selectUserUsername);
  const pathname = location.pathname.split('/').pop();
  const profileName = pathname!.toLowerCase() === 'profile' ? currentUsername : pathname;

  const { posts, getUserFeed } = GetUserFeed();

  const currentUserPage =
    currentUsername?.toLowerCase() === pathname?.toLowerCase() ||
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
