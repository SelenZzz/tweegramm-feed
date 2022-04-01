import styles from './SignUp.module.css';

// react
import { createContext, useEffect, useState } from 'react';

// hooks
import { useStateValidation } from '../../../../hooks/useStateValidation';
import { useTimeout } from '../../../../hooks/useTimeout';

// api
import { GetAuth } from '../../../../api/getAuth';
import { GetUsernameExists } from '../../../../api/getUsernameExists';

// utils
import { iUser } from '../../../../utils/types';

// components
import { BigButton } from '../../../../components/BigButton/BigButton';
import { Info } from './components/Info/Info';
import { Password } from './components/Password/Password';
import { Loading } from '../Loading/Loading';

interface iSignUpContext {
  username: string;
  setUsername?: (v: string) => void;
  isUsernameValid: boolean;
  isUsernameExists: boolean;
  email: string;
  setEmail?: (v: string) => void;
  isEmailValid: boolean;
  setDay?: (v: number) => void;
  month: number;
  setMonth?: (v: number) => void;
  year: number;
  setYear?: (v: number) => void;
  password1: string;
  setPassword1?: (v: string) => void;
  isPassword1Valid: boolean;
  password2: string;
  setPassword2?: (v: string) => void;
  isPassword2Valid: boolean;
}

const defaultSignUpState = {
  username: '',
  isUsernameValid: false,
  isUsernameExists: false,
  email: '',
  isEmailValid: false,
  month: -1,
  year: -1,
  password1: '',
  isPassword1Valid: false,
  password2: '',
  isPassword2Valid: false,
};

export const SignUpContext = createContext<iSignUpContext>(defaultSignUpState);

export const SignUp = () => {
  // prettier-ignore
  const [username, setUsername, isUsernameValid] = useStateValidation<string>((v: string) => v.length >= 5 && v.match(/^[a-zA-Z0-9]+$/),'');
  // prettier-ignore
  const [email, setEmail, isEmailValid] = useStateValidation<string>((v: string) => v.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/),'');
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
  const { start: startTimer, clear: clearTimer } = useTimeout(() => setStep(step + 1), 3000);

  const { signUp, login } = GetAuth();
  const { checkUsernameExists } = GetUsernameExists((r) => setUserNameExists(r));
  const [isUsernameExists, setUserNameExists] = useState<boolean>(false);

  // prettier-ignore
  const headers = ['Create your account', 'Setup a password', 'Almost done...','Something went wrong'];
  const buttonLabels = ['Next', 'Finish', 'Wait a little bit', ':c'];
  const isStepDone = [
    isUsernameValid &&
      !isUsernameExists &&
      isEmailValid &&
      isDayValid &&
      isMonthValid &&
      isYearValid,
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
    }
  }, [step]);

  useEffect(() => {
    if (username) checkUsernameExists(username);
  }, [username]);

  return (
    // prettier-ignore
    <SignUpContext.Provider value={{ username, setUsername, isUsernameValid, isUsernameExists, email, setEmail, isEmailValid, 
      setDay, month, setMonth, year, setYear, password1, setPassword1, isPassword1Valid, password2, setPassword2, isPassword2Valid }}>
      <div className={styles.container}>
        <div className={styles.header}>{headers[step]}</div>
        {step === 0 && <Info />}
        {step === 1 && <Password />}
        {step >= 2 && Loading({ error: step===3 })}
        <BigButton
          label={buttonLabels[step]}
          active={isStepDone[step]}
          onClick={() => setStep(step + 1)}
        />
      </div>
    </SignUpContext.Provider>
  );
};
