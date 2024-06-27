import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createTables, resetAllTables } from './src/database/db';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  useEffect(() => {
    // resetAllTables();
    createTables();
  }, []);

  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
};

export default App;
