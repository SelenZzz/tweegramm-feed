import styles from './CloseButton.module.css';

import CloseIcon from '@mui/icons-material/Close';

// prettier-ignore
export const CloseButton = ({className, onClick}: {className: string; onClick: Function;}) => {
  return (
    <div className={className}>
      <div className={styles.container} onClick={() => onClick()}>
        <CloseIcon />
      </div>
    </div>
  );
};
