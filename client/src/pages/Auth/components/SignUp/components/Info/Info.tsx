import styles from './Info.module.css';

// components
import { Input } from '../../../../../../components/Input/Input';
import { Selector } from '../../../../../../components/Selector/Selector';

import { daysList, monthList, yearList } from '../dates';

//utils

import { monthNames } from '../../../../../../utils/months';

export const Info = ({
  username,
  setUsername,
  isUsernameValid,
  email,
  setEmail,
  isEmailValid,
  setDay,
  month,
  setMonth,
  year,
  setYear,
}: {
  username: string;
  setUsername: (v: string) => void;
  isUsernameValid: boolean;
  email: string;
  setEmail: (v: string) => void;
  isEmailValid: boolean;
  setDay: (v: number) => void;
  month: number;
  setMonth: (v: number) => void;
  year: number;
  setYear: (v: number) => void;
}) => {
  return (
    <>
      <Input
        onChange={(v: string) => setUsername(v)}
        type="text"
        placeholder="username"
        alert={username.length !== 0 && !isUsernameValid}
        alertText={
          username.match(/^[a-zA-Z]+$/)
            ? 'username must be at least 5 symbols'
            : 'username can consist only of english letters and numbers'
        }
        maxLen={50}
      />
      <Input
        onChange={(v: string) => setEmail(v)}
        type="email"
        placeholder="email"
        alert={email.length !== 0 && !isEmailValid}
        alertText={'email is not correct'}
        maxLen={100}
      />
      <div className={styles.birthdayHeader}>Date of birth</div>
      <div className={styles.birthday}>
        <Selector
          onChange={(v: string) => setMonth(monthNames.indexOf(v) + 1)}
          list={monthList()}
          placeholder={'month'}
          grow={2}
        />
        <Selector
          onChange={(v: string) => setDay(parseInt(v))}
          list={daysList(month, year)}
          placeholder={'day'}
          grow={1}
        />
        <Selector
          onChange={(v: string) => setYear(parseInt(v))}
          list={yearList()}
          placeholder={'year'}
          grow={1}
        />
      </div>
    </>
  );
};
