// components
import { Input } from '../../../../../../components/Input/Input';

export const Password = ({
  password1,
  setPassword1,
  isPassword1Valid,
  password2,
  setPassword2,
  isPassword2Valid,
}: {
  password1: string;
  setPassword1: (v: string) => void;
  isPassword1Valid: boolean;
  password2: string;
  setPassword2: (v: string) => void;
  isPassword2Valid: boolean;
}) => {
  return (
    <>
      <Input
        onChange={(v: string) => setPassword1(v)}
        type="password"
        placeholder="password"
        maxLen={50}
        alert={password1.length !== 0 && !isPassword1Valid}
        alertText={'password must be at least 10 symbols'}
      />
      <Input
        onChange={(v: string) => setPassword2(v)}
        type="password"
        placeholder="repeat password"
        maxLen={100}
        alert={password2.length !== 0 && !isPassword2Valid}
        alertText={"passwords doesn't match"}
      />
    </>
  );
};
