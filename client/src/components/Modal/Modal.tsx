import styles from './Modal.module.css';

import React, { useEffect, useRef } from 'react';

import { CloseButton } from '../CloseButton/CloseButton';

// prettier-ignore
export const Modal = ({onCloseRequest, children}: {onCloseRequest?: Function; children: React.ReactNode;}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onCloseRequest) {
      window.addEventListener('keyup', handleKeyUp, false);
      document.addEventListener('click', handleOutsideClick, { capture: true });

      return () => {
        window.removeEventListener('keyup', handleKeyUp, false);
        document.removeEventListener('click', handleOutsideClick, { capture: true });
      };
    }
  }, []);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (onCloseRequest) onCloseRequest();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const { current } = modalRef;
    if (current && !current.contains(e.target as Node)) {
      if (onCloseRequest) onCloseRequest();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={modalRef} >
        {onCloseRequest && (
          <CloseButton className={styles.close} onClick={() => onCloseRequest()} />
        )}
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
