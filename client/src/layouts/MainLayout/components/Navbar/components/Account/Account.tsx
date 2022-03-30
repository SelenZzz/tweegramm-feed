import styles from './Account.module.css';

// react
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate('/Profile');
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div onClick={handleInfoClick}>
          <Avatar />
        </div>
        <div onClick={handleInfoClick}>{username}</div>
      </div>
      <div className={styles.logout} onClick={postLogout}>
        <LogoutIcon />
      </div>
    </div>
  );
};
