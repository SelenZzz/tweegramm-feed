import styles from './Profile.module.css';

// react
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { User } from './components/User';
import { Post } from '../../components/Post/Post';

// redux
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/userSlice';

// hooks
import { useToken } from '../../hooks/useToken';

// utils
import { GetUserFeed } from '../../api/postUserFeed';

export const Profile = () => {
  const { token, setToken } = useToken();
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
    if (pathname!.toLowerCase() === 'profile' && token === '') navigate('/');
  }, [pathname]);

  useEffect(() => {
    if (profileName) getUserFeed(profileName);
  }, [profileName]);

  return (
    <>
      <User username={profileName!} />
      <div className={styles.feed}>
        {currentUserPage && <PostInput onSend={getUserFeed} />}
        {posts.map((result) => {
          return <Post key={result.uuid} data={result} />;
        })}
      </div>
    </>
  );
};
