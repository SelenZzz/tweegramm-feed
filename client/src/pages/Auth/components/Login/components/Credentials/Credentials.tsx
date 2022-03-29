import { Input } from '../../../../../../components/Input/Input';

export const Credentials = ({
  setUsername,
  setPassword,
}: {
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
}) => {
  return (
    <>
      <Input
        onChange={(v: string) => setUsername(v)}
        type="text"
        placeholder="username"
        maxLen={50}
      />
      <Input
        onChange={(v: string) => setPassword(v)}
        type="password"
        placeholder="password"
        maxLen={50}
      />
    </>
  );
};
