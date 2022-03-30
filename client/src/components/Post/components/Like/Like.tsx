import styles from './Like.module.css';
import cx from 'classnames';

import React, { useState } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { PostLike } from '../../../../api/postLike';

// prettier-ignore
export const Like = ({ count, uuid, liked }: { count: number; uuid: string, liked: boolean }) => {
  const { postLike } = PostLike();

  const [active, setActive] = useState<boolean>(liked);
  const [likes, setLikes] = useState<number>(count);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await postLike(uuid);
    if (response) {
      setLikes(likes + (!active ? +1 : -1));
      setActive(!active);
    }
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
