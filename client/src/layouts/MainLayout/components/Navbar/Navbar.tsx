import styles from './Navbar.module.css';

// icons
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// icons outline
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

// components
import { Item } from './components/Item/Item';
import { Logo } from './components/Logo/Logo';
import { Account } from './components/Account/Account';

// redux
import { useSelector } from 'react-redux';
import { selectLogged } from '../../../../redux/userSlice';

export const Navbar = () => {
  const logged = useSelector(selectLogged);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Item label={'не скажу'} iconFilled={<Logo />} unhoverable={true} />
        </div>
        <Item
          href="/"
          label={'Home'}
          iconFilled={<HomeIcon />}
          iconOutlined={<HomeOutlinedIcon />}
        />
        <Item
          href="/Explore"
          label={'Explore'}
          iconFilled={<TagIcon />}
          iconOutlined={<TagOutlinedIcon />}
        />
        <Item
          href="/Notifications"
          label={'Notifications'}
          iconFilled={<NotificationsIcon />}
          iconOutlined={<NotificationsNoneOutlinedIcon />}
        />
        <Item
          href="/Friends"
          label={'Friends'}
          iconFilled={<PeopleAltIcon />}
          iconOutlined={<PeopleAltOutlinedIcon />}
        />
        {logged && (
          <Item
            href="/Profile"
            label={'Profile'}
            iconFilled={<AccountBoxIcon />}
            iconOutlined={<AccountBoxOutlinedIcon />}
          />
        )}
      </div>
      {logged && (
        <div className={styles.account}>
          <Account />
        </div>
      )}
    </div>
  );
};
