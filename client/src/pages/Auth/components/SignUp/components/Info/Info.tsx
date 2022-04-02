import styles from './Info.module.css';

// react
import { SignUpContext } from '../../SignUp';
import { useContext } from 'react';

// components
import { Input } from '../../../../../../components/Input/Input';
import { daysList, monthList, yearList } from './dates';
import { Selector } from '../../../../../../components/Selector/Selector';

//utils
import { monthNames } from '../../../../../../utils/months';

export const Info = () => {
  // prettier-ignore
  const {username, setUsername, isUsernameExists, setEmail, isEmailValid, setDay, month, setMonth, year, setYear } = useContext(SignUpContext);

  const alertText = () => {
    switch (username) {
      case !/^[a-zA-Z0-9]+$/.test(username) && username:
        return 'username can consist only of english letters and numbers';

      case username.length < 5 && username:
        return 'username must be at least 5 symbols';

      case isUsernameExists && username:
        return 'username is already exists';

      default:
        return '';
    }
  };

  return (
    <>
      <Input onChange={(v: string) => setUsername && setUsername(v)} type="text" placeholder="username" alertText={alertText()} maxLen={50} />
      <Input
        onChange={(v: string) => setEmail && setEmail(v)}
        type="email"
        placeholder="email"
        alertText={!isEmailValid ? 'email is not correct' : ''}
        maxLen={100}
      />
      <div className={styles.birthdayHeader}>Date of birth</div>
      <div className={styles.birthday}>
        <Selector onChange={(v: string) => setMonth && setMonth(monthNames.indexOf(v) + 1)} list={monthList()} placeholder={'month'} grow={2} />
        <Selector onChange={(v: string) => setDay && setDay(parseInt(v))} list={daysList(month, year)} placeholder={'day'} grow={1} />
        <Selector onChange={(v: string) => setYear && setYear(parseInt(v))} list={yearList()} placeholder={'year'} grow={1} />
      </div>
    </>
  );
};
