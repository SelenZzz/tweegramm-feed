import styles from './PostInput.module.css';
import cx from 'classnames';

// react
import { useEffect, useState } from 'react';

// hooks
import { useToken } from '../../hooks/useToken';

// utils
import { PostPost } from '../../api/postPost';
import { iPost } from '../../utils/types';

// components
import TextareaAutosize from 'react-textarea-autosize';
import { Avatar } from '../Avatar/Avatar';

export const PostInput = ({ onSend }: { onSend: any }) => {
  const { token, setToken } = useToken();
  const [showPlaceholder, setPlaceholder] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [input, setInput] = useState<string>('');
  const [sendResponse, setSendResponse] = useState<iPost>();
  const { sendPost } = PostPost((r) => setSendResponse(r));

  const handleInput = (value: string) => {
    if (value.length > 255) value = value.slice(0, 255);
    setInput(value);
    if (token) setButtonDisabled(value.trim().length === 0);
    setPlaceholder(value === '');
  };

  const handleSend = async () => {
    sendPost(input);
  };

  useEffect(() => {
    if (sendResponse) {
      setInput('');
      setPlaceholder(true);
      onSend();
    }
  }, [sendResponse]);

  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <Avatar />
      </div>
      <form className={styles.form}>
        <div className={styles.textContainer}>
          <TextareaAutosize
            className={styles.textarea}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            minRows={1}
          />
          {showPlaceholder && (
            <div className={styles.textarea__placeholder}>What's happening?</div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <input
            className={cx(
              styles.button,
              buttonDisabled ? styles.buttonDisabled : styles.buttonActive,
            )}
            type="button"
            value="Send"
            onClick={handleSend}
            disabled={buttonDisabled}
          />
        </div>
      </form>
    </div>
  );
};
