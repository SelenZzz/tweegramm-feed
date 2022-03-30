import styles from './Item.module.css';
import cx from 'classnames';

import { useNavigate, useLocation } from 'react-router-dom';

interface iItem {
  href?: string;
  label?: string;
  iconFilled: JSX.Element;
  iconOutlined?: JSX.Element;
  unhoverable?: boolean;
}

export const Item = (data: iItem) => {
  const { href, label, iconFilled, iconOutlined, unhoverable } = data;

  const path = useLocation().pathname;
  const active = path === href;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href || './');
  };

  return (
    <div className={cx(styles.container, !unhoverable && styles.hoverable)} onClick={handleClick}>
      <div className={styles.icon}>{active ? iconFilled : iconOutlined || iconFilled}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
