import styles from './Login.module.css';

// react
import { useState, useEffect } from 'react';

/// hooks
import { useStateValidation } from '../../../../hooks/useStateValidation';
import { useTimeout } from '../../../../hooks/useTimeout';

// utils
import { iUser } from '../../../../utils/types';

// components
import { Credentials } from './components/Credentials/Credentials';
import { BigButton } from '../../../../components/BigButton/BigButton';
import { Loading } from '../Loading/Loading';
import { GetAuth } from '../../../../api/getAuth';

export const Login = () => {
  // prettier-ignore
  const [username, setUsername, isUsernameValid] = useStateValidation<string>((v: string) => v.length > 5,'');
  // prettier-ignore
  const [password, setPassword, isPasswordValid] = useStateValidation<string>((v: string) => v.length > 5,'');

  const [step, setStep] = useState<number>(0);
  // prettier-ignore
  const { start: startTimer, clear: clearTimer  } = useTimeout(() => setError(true), 3000);
  const [error, setError] = useState<boolean>(false);

  const { signUp, login } = GetAuth();

  const headers = ['Login into your account', 'Almost done...', 'Something went wrong'];
  const buttonLabels = ['Log In', 'Wait a little bit', ':c'];
  const isStepDone = [isUsernameValid && isPasswordValid, false];

  useEffect(() => {
    if (step === 1) {
      const userInfo: iUser = {
        username: username,
        password: password,
      };
      login(userInfo);
      clearTimer();
      startTimer();
      setStep(step + 1);
    }
  }, [step]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>{headers[step]}</div>
      {step === 0 && Credentials({ setUsername, setPassword })}
      {step >= 1 && Loading({ error })}
      <BigButton
        label={buttonLabels[step]}
        active={isStepDone[step]}
        onClick={() => setStep(step + 1)}
      />
    </div>
  );
};
