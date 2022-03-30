import styles from './Tag.module.css';

export const Tag = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tag}>#tag</div>
      <small>posts: 4</small>
    </div>
  );
};
