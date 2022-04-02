// react
import { useContext } from 'react';
import { UserContext } from '../App';

// hooks
import { useToken } from './useToken';

export const usePostRequest = (url: string, onResponse: (json: any) => void) => {
  const userContext = useContext(UserContext);
  const { token, setToken } = useToken();

  const postRequest = async (body: any) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 401) {
          userContext.setLogged(false);
          userContext.setUsername('');
          setToken({ token: '' });
          userContext.setNotifications(0);
          window.location.reload();
          return;
        }
        if (response.ok) return response.json();
      })
      .then((responseJson: any) => {
        onResponse(responseJson);
      })
      .catch((e) => {
        console.log('Error during POST request:', url, 'body:', body, e);
      });
  };

  return { postRequest };
};
