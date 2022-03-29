import styles from './BigButton.module.css';

// react
import { MouseEventHandler } from 'react';
import cx from 'classnames';

export const BigButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      className={cx(styles.next, active && styles.nextActive)}
      onClick={onClick}
      disabled={!active}
      type="button"
      value={label}
    />
  );
};
