import { useEffect, useState } from 'react';

import { url } from '../utils/config';

export const useNetworkStatus = () => {
  const [isOnline, setStatus] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const networkStatus = await fetch(url);
        setStatus(networkStatus.ok);
      } catch (error) {
        setStatus(false);
      }
    })();
  }, []);

  return { isOnline };
};
