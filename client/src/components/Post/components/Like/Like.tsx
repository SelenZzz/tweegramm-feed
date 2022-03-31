import styles from './Like.module.css';
import cx from 'classnames';

import React, { useState } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { PostLike } from '../../../../api/postLike';

export const Like = React.memo(
  ({ count, uuid, liked }: { count: number; uuid: string; liked: boolean }) => {
    const [active, setActive] = useState<boolean>(liked);
    const [likes, setLikes] = useState<number>(count);
    const { postLike } = PostLike((r) => {
      setActive(r.liked || false);
      setLikes(r.likes!);
    });

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      postLike(uuid);
    };

    return (
      <div className={styles.container}>
        <i className={cx(styles.i, active && styles.active)} onClick={handleClick}>
          <FavoriteBorderIcon />
        </i>
        <div className={styles.counter}>{likes}</div>
      </div>
    );
  },
);
