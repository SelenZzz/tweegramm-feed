import styles from './Profile.module.css';

// react
import { useLocation } from 'react-router-dom';

// components
import { PostInput } from '../../components/PostInput/PostInput';
import { User } from './components/User';
import { Post } from '../../components/Post/Post';

// redux
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/userSlice';

// utils
import { GetUserFeed } from '../../api/getUserFeed';

export const Profile = () => {
  const location = useLocation();
  const currentUsername = useSelector(selectUserUsername);
  const pathname = location.pathname.split('/').pop();
  const profileName = pathname!.toLowerCase() === 'profile' ? currentUsername : pathname;

  const { posts, getUserFeed } = GetUserFeed(profileName!);

  const currentUserPage =
    currentUsername?.toLowerCase() === pathname?.toLowerCase() ||
    pathname?.toLowerCase() === 'profile';

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
