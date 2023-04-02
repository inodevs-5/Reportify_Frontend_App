import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './contexts/auth';

export const App = () =>{
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App