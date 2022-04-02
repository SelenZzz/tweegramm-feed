import styles from './User.module.css';

// components
import { Avatar } from '../../../../components/Avatar/Avatar';
import { useState } from 'react';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';

export const User = ({ username, bio, editable }: { username: string; bio: string; editable?: boolean }) => {
  const [showEditProfileModal, setEditProfileModal] = useState<boolean>(false);

  return (
    <>
      {showEditProfileModal && <EditProfileModal onCloseRequest={() => setEditProfileModal(false)} />}
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Avatar size={80} />
        </div>
        <div className={styles.info}>
          {editable && (
            <div className={styles.buttonContainer}>
              <input className={styles.button} type="button" value="Edit profile" onClick={() => setEditProfileModal(true)} disabled={false} />
            </div>
          )}
          <div className={styles.username}>{username}</div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
    </>
  );
};
