import styles from './Input.module.css';
import cx from 'classnames';

import { useState } from 'react';

export const Input = ({
  onChange,
  type,
  placeholder,
  maxLen,
  alertText,
}: {
  onChange: Function;
  type: string;
  placeholder: string;
  maxLen: number;
  alertText?: string;
}) => {
  const [input, setInput] = useState<string>('');
  const [len, setLen] = useState<number>(0);

  const handleInput = (value: string) => {
    if (value.length <= maxLen) {
      setInput(value);
      setLen(value.length);
      onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={cx(input && alertText && styles.alert, styles.inputContainer)}>
        <input
          className={styles.input}
          type={type}
          onChange={(e) => handleInput(e.target.value)}
          value={input}
        />
        <div className={cx(styles.placeholder, input && styles.miniPlaceholder)}>
          {placeholder}
          <div className={cx(styles.len, len > maxLen - 20 && styles.lenDisplay)}>
            {len}/{maxLen}
          </div>
        </div>
      </div>
      {input && alertText && <div className={styles.alertText}>{alertText}</div>}
    </div>
  );
};
