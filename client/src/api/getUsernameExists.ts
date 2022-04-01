// utils
import { url } from '../utils/config';

//hooks
import { useGetRequest } from '../hooks/useGetRequest';

export const GetUsernameExists = (onResponse: (exists: boolean) => void) => {
  const { getRequest } = useGetRequest(
    `${url}/check_username.php`,
    (r: { exists: number }) => {
      onResponse(!!r.exists);
    },
  );

  const checkUsernameExists = async (username: string) => {
    getRequest({ username: username });
  };

  return { checkUsernameExists };
};
