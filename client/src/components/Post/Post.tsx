import styles from './Post.module.css';

// react
import { useNavigate } from 'react-router-dom';

// components
import { Avatar } from '../Avatar/Avatar';
import { Like } from './components/Like/Like';
import { Reply } from './components/Reply/Reply';

// utils
import { iPost } from '../../utils/types';
import { toLocalTime } from '../../utils/toLocalTime';

export const Post = ({ data }: { data: iPost }) => {
  const { username, createdAt, text, likes, uuid, liked } = data;

  const navigate = useNavigate();

  return (
    <div className={styles.post}>
      <Avatar onClick={() => navigate(`/Friends/${username}`)} />
      <form className={styles.form}>
        <div className={styles.info}>
          <div className={styles.username} onClick={() => navigate(`/Friends/${username}`)}>
            {username}
          </div>
          {createdAt && <div className={styles.date}>{toLocalTime(createdAt)}</div>}
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.buttonContainer}>
          <Reply />
          <Like count={likes || 0} uuid={uuid} liked={liked || false} />
        </div>
      </form>
    </div>
  );
};
