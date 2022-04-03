import styles from './Event.module.css';

// react
import { useNavigate } from 'react-router-dom';

// components
import { Avatar } from '../../../../components/Avatar/Avatar';
import { toLocalTime } from '../../../../utils/toLocalTime';

export const Event = ({ username, createdAt, text }: { username: string; createdAt: number; text: string }) => {
  const postContent = text.length > 10 ? `${text.slice(0, 9)}...` : text;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Avatar onClick={() => navigate(`/Friends/${username}`)} />
      <div className={styles.form}>
        <div className={styles.content}>
          <b className={styles.link} onClick={() => navigate(`/Friends/${username}`)}>
            {username}
          </b>
          {' liked  your post '}
          <b>{postContent}</b>
        </div>
        <div className={styles.date}>{toLocalTime(createdAt)}</div>
      </div>
    </div>
  );
};
