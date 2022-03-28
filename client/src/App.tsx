import React from 'react';
import { useNetworkStatus } from './hooks/useNetworkStatus';

const App = () => {
  const { isOnline } = useNetworkStatus();
  console.log(isOnline ? 'Connection established' : 'No connection');

  return <div>App</div>;
};

export default App;
