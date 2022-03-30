import styles from './User.module.css';

import { useState, useEffect } from 'react';

import { Avatar } from '../../../../components/Avatar/Avatar';
import { useNavigate } from 'react-router-dom';

export const User = ({ name, info }: { name: string; info: string }) => {
  const [menu, setMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (menu) document.addEventListener('click', () => setMenu(!menu));
    else document.removeEventListener('click', () => setMenu(!menu));
  }, [menu]);

  const handleLink = () => {
    navigate(`/Friends/${name}`);
  };

  return (
    <div className={styles.container} onClick={handleLink}>
      <Avatar />
      <div className={styles.info}>
        <div>{name}</div>
        <div>{info}</div>
      </div>
    </div>
  );
};
