import styles from './Post.module.css';

import { Avatar } from '../Avatar/Avatar';
import { Like } from './components/Like/Like';
import { Reply } from './components/Reply/Reply';

import { iPost } from '../../utils/types';
import { toLocalTime } from '../../utils/toLocalTime';

export const Post = ({ data }: { data: iPost }) => {
  const { username, createdAt, text, likes, uuid, liked } = data;

  return (
    <div className={styles.post}>
      <Avatar />
      <form className={styles.form}>
        <div className={styles.info}>
          <div className={styles.username}>{username}</div>
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
