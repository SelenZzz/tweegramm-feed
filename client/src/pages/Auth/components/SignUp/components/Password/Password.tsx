//react
import { useContext } from 'react';
import { SignUpContext } from '../../SignUp';

// components
import { Input } from '../../../../../../components/Input/Input';

export const Password = () => {
  // prettier-ignore
  const {password1, setPassword1, isPassword1Valid, password2, setPassword2, isPassword2Valid} = useContext(SignUpContext);
  return (
    <>
      <Input
        onChange={(v: string) => setPassword1 && setPassword1(v)}
        type="password"
        placeholder="password"
        maxLen={50}
        alertText={!isPassword1Valid ? 'password must be at least 10 symbols' : ''}
      />
      <Input
        onChange={(v: string) => setPassword2 && setPassword2(v)}
        type="password"
        placeholder="repeat password"
        maxLen={100}
        alertText={!isPassword2Valid ? "passwords doesn't match" : ''}
      />
    </>
  );
};
