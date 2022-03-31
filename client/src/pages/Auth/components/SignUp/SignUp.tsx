import styles from './SignUp.module.css';

// react
import { useEffect, useState } from 'react';

// hooks
import { useStateValidation } from '../../../../hooks/useStateValidation';
import { useTimeout } from '../../../../hooks/useTimeout';

// api
import { GetSignUp } from '../../../../api/postAuth';

// utils
import { iUser } from '../../../../utils/types';

// components
import { BigButton } from '../../../../components/BigButton/BigButton';
import { Info } from './components/Info/Info';
import { Password } from './components/Password/Password';
import { Loading } from '../Loading/Loading';

export const SignUp = () => {
  // prettier-ignore
  const [username, setUsername, isUsernameValid] = useStateValidation<string>((v: string) => v.length > 5,'');
  // prettier-ignore
  const [email, setEmail, isEmailValid] = useStateValidation<string>((v: string) => v.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),'');
  // prettier-ignore
  const [day, setDay, isDayValid] = useStateValidation<number>((v: number) => v >= 0 && v <= 31,-1);
  // prettier-ignore
  const [month, setMonth, isMonthValid] = useStateValidation<number>((v: number) => v > 0 && v <= 12,-1);
  // prettier-ignore
  const [year, setYear, isYearValid] = useStateValidation<number>((v: number) => v > new Date().getFullYear()-100 && v < new Date().getFullYear(),-1);
  // prettier-ignore
  const [password1, setPassword1, isPassword1Valid] = useStateValidation<string>((v: string) => v.length >= 10,'');
  // prettier-ignore
  const [password2, setPassword2, isPassword2Valid] = useStateValidation<string>((v: string) => v.length >= 10 && v === password1,'');

  const [step, setStep] = useState<number>(0);
  // prettier-ignore
  const { start: startTimer, clear: clearTimer } = useTimeout(() => setError(true), 3000);
  const [error, setError] = useState<boolean>(false);

  const { signUp } = GetSignUp();
  // prettier-ignore
  const headers = ['Create your account', 'Setup a password', 'Almost done...','Something went wrong'];
  const buttonLabels = ['Next', 'Finish', 'Wait a little bit', ':c'];
  const isStepDone = [
    isUsernameValid && isEmailValid && isDayValid && isMonthValid && isYearValid,
    isPassword1Valid && isPassword2Valid,
    false,
  ];

  useEffect(() => {
    if (step === 2) {
      const userInfo: iUser = {
        username: username,
        email: email,
        birthday: Math.floor(new Date(year, month, day).getTime() / 1000),
        password: password1,
      };
      signUp(userInfo);
      clearTimer();
      startTimer();
      setStep(step + 1);
    }
  }, [step]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>{headers[step]}</div>
      {step === 0 &&
        // prettier-ignore
        Info({username, setUsername, isUsernameValid, email, setEmail, isEmailValid, setDay, month, setMonth, year, setYear })}
      {step === 1 &&
        // prettier-ignore
        Password({password1, setPassword1, isPassword1Valid, password2, setPassword2, isPassword2Valid})}
      {step >= 2 && Loading({ error })}
      <BigButton
        label={buttonLabels[step]}
        active={isStepDone[step]}
        onClick={() => setStep(step + 1)}
      />
    </div>
  );
};
