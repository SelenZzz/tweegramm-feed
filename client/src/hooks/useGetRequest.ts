// react
import { useContext } from 'react';
import { UserContext } from '../App';

// hooks
import { useToken } from './useToken';

export const useGetRequest = (url: string, onResponse: (json: any) => void, onError?: () => void) => {
  const userContext = useContext(UserContext);
  const { token, setToken } = useToken();

  const toUrlParams = (urlStr: string, body: any) => {
    const url = new URL(urlStr);
    Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]));
    return url.toString();
  };

  const getRequest = async (body: any) => {
    const paramUrl = toUrlParams(url, body);

    fetch(paramUrl, { method: 'GET' })
      .then((response) => {
        if (response.status === 401) {
          userContext.setLogged(false);
          userContext.setUsername('');
          setToken({ token: '' });
          window.location.reload();
          return;
        }
        if (response.ok) return response.json();
      })
      .then((responseJson: any) => {
        onResponse(responseJson);
      })
      .catch((e) => {
        console.log('Error during GET request:', paramUrl, e);
        if (onError) onError();
      });
  };

  return { getRequest };
};
