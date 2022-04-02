import styles from './EditProfileModal.module.css';
import cx from 'classnames';

// react
import { useState } from 'react';

// components
import { Modal } from '../../../../components/Modal/Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { PostUserBio } from '../../../../api/postUserBio';

export const EditProfileModal = ({ onCloseRequest }: { onCloseRequest?: Function }) => {
  const [showPlaceholder, setPlaceholder] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [input, setInput] = useState<string>('');
  const { sendUserBio } = PostUserBio();

  const handleInput = (value: string) => {
    if (value.length > 255) value = value.slice(0, 255);
    setInput(value);
    setButtonDisabled(value.trim().length === 0);
    setPlaceholder(value === '');
  };

  const handleSend = async () => {
    sendUserBio(input);
  };

  return (
    <Modal onCloseRequest={onCloseRequest}>
      <div className={styles.header}>
        <div>{'Edit bio'}</div>
        <input
          className={cx(styles.button, buttonDisabled ? styles.buttonDisabled : styles.buttonActive)}
          type="button"
          value="Save"
          onClick={handleSend}
          disabled={buttonDisabled}
        />
      </div>
      <div className={styles.textContainer}>
        <TextareaAutosize className={styles.textarea} value={input} onChange={(e) => handleInput(e.target.value)} minRows={1} />
        {showPlaceholder && <div className={styles.textarea__placeholder}>Tell something about you</div>}
      </div>
    </Modal>
  );
};
