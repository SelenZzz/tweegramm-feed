// react
import React from 'react';

// utils
import { GetFriends } from '../../api/getFriends';

// components
import { User } from './components/User/User';

const friendsList = [
  { uuid: '1', name: 'Александр', info: 'Listening to Secret Garden' },
  { uuid: '2', name: 'Юля', info: 'абобус' },
  { uuid: '3', name: 'Александр', info: 'абобус' },
  { uuid: '4', name: 'Юля', info: 'Listening to Secret Garden' },
];

export const Friends = () => {
  const { friends, getFriends } = GetFriends();

  return (
    <div>
      {friends.map((e) => {
        return <User key={e.uuid} name={e.username} info={e.info || ''} />;
      })}
    </div>
  );
};
