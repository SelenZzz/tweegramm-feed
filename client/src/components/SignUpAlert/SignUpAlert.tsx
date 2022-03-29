import styles from './SignUpAlert.module.css';

export const SignUpAlert = ({
  onSignUpClick,
  onLoginClick,
}: {
  onSignUpClick: Function;
  onLoginClick: Function;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.header}>Don't miss what's happening</div>
        <div className={styles.small}>People on не скажу are the first to know.</div>
      </div>
      <div className={styles.buttons}>
        <input className={styles.login} type="button" value="Log in" onClick={() => onLoginClick()} />
        <input className={styles.signup} type="button" value="Sign up" onClick={() => onSignUpClick()} />
      </div>
    </div>
  );
};
