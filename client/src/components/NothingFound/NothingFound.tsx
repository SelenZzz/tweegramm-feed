import styles from './NothingFound.module.css';

import React from 'react';

export const NothingFound = () => {
  const str = "Sorry, but it's empty here :c".split(/(\s+)/);
  let i = 0;
  return (
    <div className={styles.container}>
      {str.map((e) => {
        return <div key={(i += 1)}>{e}</div>;
      })}
    </div>
  );
};
