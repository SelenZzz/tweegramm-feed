import styles from './Profile.module.css';

// react
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { User } from './components/User/User';
import { Post } from '../../components/Post/Post';
import { Spinner } from '../../components/Spinner/Spinner';
import { NothingFound } from '../../components/NothingFound/NothingFound';

// hooks
import { useTimeout } from '../../hooks/useTimeout';
import { useToken } from '../../hooks/useToken';

// api
import { GetUserFeed } from '../../api/getUserFeed';
import { GetUserBio } from '../../api/getUserInfo';

export const Profile = () => {
  const { token } = useToken();
  const userContext = useContext(UserContext);

  const { set: startTimer } = useTimeout(() => setError(true), 1000);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { posts, getUserFeed } = GetUserFeed();
  const { bio, birthday, joined, getUserInfo } = GetUserBio();

  const pathname = location.pathname.split('/').pop();
  const profileName = pathname!.toLowerCase() === 'profile' ? userContext.username : pathname;
  const currentUserPage = userContext.username.toLowerCase() === pathname?.toLowerCase() || pathname?.toLowerCase() === 'profile';

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (profileName) {
      getUserFeed(profileName);
      getUserInfo(profileName);
    } else if (!token) navigate('/');
  }, [profileName]);

  return (
    <>
      <User username={profileName!} editable={currentUserPage} bio={bio} birthday={birthday} joined={joined} />
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
