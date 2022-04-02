// react
import { useState } from 'react';

// utils
import { url } from '../utils/config';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetUserBio = () => {
  const { token } = useToken();
  const [bio, setBio] = useState<string>('');
  const { getRequest } = useGetRequest(`${url}/bio.php`, (r: { bio: string }) => {
    if (r.bio) setBio(r.bio);
  });

  const getUserBio = async (username: string) => {
    getRequest({ token: token || '', username: username });
  };

  return { bio, getUserBio };
};
