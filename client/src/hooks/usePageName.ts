// react
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const pageNames = new Map<string, string>([
  ['/', 'Feed'],
  ['/explore', 'Explore'],
  ['/notifications', 'Notifications'],
  ['/friends', 'Friends'],
  ['/profile', 'Profile'],
]);

export const usePageName = () => {
  const [name, setName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const pathname = pageNames.get(location.pathname.toLocaleLowerCase());
    const pagename = typeof pathname === 'undefined' ? 'Not Found' : pathname;
    setName(pagename);
  });

  return { pageName: name };
};
