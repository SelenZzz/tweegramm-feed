import styles from './User.module.css';

// components
import { Avatar } from '../../../components/Avatar/Avatar';

export const User = ({ username }: { username: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar size={80} />
      </div>
      <div className={styles.info}>
        <div className={styles.username}>{username}</div>
        <div className={styles.bio}>
          {"Hello guys just a test bio, i'm programmer. ReactJS+TS and other stuff <3"}
        </div>
      </div>
    </div>
  );
};
