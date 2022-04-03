// react
import { useState } from 'react';

// utils
import { url } from '../utils/config';
import { monthNames } from '../utils/months';

//hooks
import { useToken } from '../hooks/useToken';
import { useGetRequest } from '../hooks/useGetRequest';

export const GetUserBio = () => {
  const { token } = useToken();
  const [bio, setBio] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [joined, setJoined] = useState<string>('');
  const { getRequest } = useGetRequest(`${url}/user_info.php`, (r: { bio: string; birthday: string; joined: string }) => {
    if (r.bio) setBio(r.bio);
    if (r.birthday) {
      const date = new Date(r.birthday);
      setBirthday(`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
    }
    if (r.joined) {
      const date = new Date(r.joined);
      setJoined(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
    }
  });

  const getUserInfo = async (username: string) => {
    getRequest({ token: token || '', username: username });
  };

  return { bio, birthday, joined, getUserInfo };
};
