import styles from './Avatar.module.css';

import logo from './logo.svg';

export const Avatar = ({ size, onClick }: { size?: number; onClick?: () => void }) => {
  const imgSize = size || 46;
  return <img className={styles.avatar} src={logo} alt="avatar" width={imgSize} height={imgSize} onClick={onClick} />;
};
