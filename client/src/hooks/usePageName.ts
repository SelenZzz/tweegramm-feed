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
    const path = location.pathname.split('/');
    let pagename = 'Not found';
    if (path[1].toLowerCase() === 'friends' && path[2]) pagename = path[2];
    else pagename = pageNames.get(location.pathname.toLowerCase())!;
    setName(pagename);
  });

  return { pageName: name };
};
