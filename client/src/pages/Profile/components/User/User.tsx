import styles from './User.module.css';

// components
import { Avatar } from '../../../../components/Avatar/Avatar';
import { useState } from 'react';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';

// icons
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const User = ({
  username,
  bio,
  birthday,
  joined,
  editable,
}: {
  username: string;
  bio: string;
  editable?: boolean;
  birthday: string;
  joined: string;
}) => {
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
          <div className={styles.dates}>
            <div>
              <CakeIcon />
              Born {birthday}
            </div>
            <div>
              <CalendarMonthIcon />
              Joined {joined}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
