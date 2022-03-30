import styles from './TagBar.module.css';

// react
import { useNavigate } from 'react-router-dom';

// components
import { Tag } from './components/Tag/Tag';
import { NoTags } from './components/NoTags/NoTags';

export const Tags = () => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/Explore');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>trending hashtags</div>
      <NoTags />
      {/* <Tag />
      <Tag />
      <Tag />
      <Tag />
      <Tag />
      <Tag /> */}
      <div className={styles.href} onClick={handleMoreClick}>
        more tags
      </div>
    </div>
  );
};
