import styles from './Account.module.css';

// components
import { Avatar } from '../../../../../../components/Avatar/Avatar';

// redux
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../../../../../redux/userSlice';

// icons
import LogoutIcon from '@mui/icons-material/Logout';

// api
import { PostLogout } from '../../../../../../api/postLogout';

export const Account = () => {
  const username = useSelector(selectUserUsername);

  const { postLogout } = PostLogout();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Avatar />
        <div>{username}</div>
      </div>
      <div onClick={postLogout}>
        <LogoutIcon />
      </div>
    </div>
  );
};
