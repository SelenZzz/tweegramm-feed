import styles from './Like.module.css';
import cx from 'classnames';

import React, { useState } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { url } from '../../../../utils/config';

export const Like = ({ count, uuid }: { count: number; uuid: string }) => {
  const [active, setActive] = useState<Boolean>(false);
  const [likes, setLikes] = useState<number>(count);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLikes(+likes + (!active ? +1 : -1));
    fetch(`${url}/like.php?u=${uuid}&v=${!active ? +1 : -1}`).then(() => {});
    console.log(`${url}/like.php?u=${uuid}&v=${!active ? +1 : -1}`);
    setActive(!active);
  };

  return (
    <div className={styles.container}>
      <i className={cx(styles.i, active && styles.active)} onClick={handleClick}>
        <FavoriteBorderIcon />
      </i>
      <div className={styles.counter}>{likes}</div>
    </div>
  );
};
